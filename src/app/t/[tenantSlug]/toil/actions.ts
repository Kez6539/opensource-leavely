'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import {
  assertAtLeast,
  isAtLeast,
  getDirectReportIds,
  canManageEmployeeId,
} from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

// (#180) Reason is bounded to match the client schema; everything else
// already had numeric guards.
const CreateToilSchema = z.object({
  employeeId: z.string().min(1),
  date: z.string().min(1),
  hours: z.number().positive().max(24),
  reason: z.string().trim().max(500).optional(),
})

export type CreateToilData = z.input<typeof CreateToilSchema>

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getToilAccruals(
  tenantSlug: string,
  filters: { status?: string; employeeId?: string } = {}
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const where: Record<string, unknown> = { tenantId: tenant.id }
  if (filters.status && filters.status !== 'ALL') where.status = filters.status
  if (filters.employeeId) where.employeeId = filters.employeeId

  // Non-managers can only see their own TOIL accruals
  if (!isAtLeast(membership, 'MANAGER')) {
    const emp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!emp) return []
    where.employeeId = emp.id
  }

  // Managers (not ADMIN/OWNER) can only see their direct reports' TOIL
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      if (filters.employeeId) {
        if (!reportIds.includes(filters.employeeId)) return []
      } else {
        // Also include the manager's own TOIL
        const myEmp = await prisma.employee.findFirst({
          where: { tenantId: tenant.id, userId: user.userId },
          select: { id: true },
        })
        const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
        where.employeeId = { in: visibleIds }
      }
    }
  }

  return prisma.toilAccrual.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Calculate TOIL balance for an employee.
 * Balance = sum of APPROVED accrual hours - hours used as TOIL leave.
 *
 * "Hours used as TOIL leave" = business days * 8 hours for APPROVED or PENDING
 * leave requests against a policy whose name contains "TOIL".
 */
export async function getToilBalance(tenantSlug: string, employeeId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Non-managers can only view their own balance
  if (!isAtLeast(membership, 'MANAGER')) {
    const caller = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!caller || caller.id !== employeeId) {
      throw new UserError('You can only view your own TOIL balance')
    }
  }

  const [accruals, toilPolicy] = await Promise.all([
    prisma.toilAccrual.aggregate({
      where: { tenantId: tenant.id, employeeId, status: 'APPROVED' },
      _sum: { hours: true },
    }),
    prisma.leavePolicy.findFirst({
      where: { tenantId: tenant.id, name: { contains: 'TOIL', mode: 'insensitive' } },
    }),
  ])

  const accrued = accruals._sum.hours ?? 0

  let used = 0
  if (toilPolicy) {
    const [toilLeave, emp] = await Promise.all([
      prisma.leaveBalance.findFirst({
        where: { employeeId, policyId: toilPolicy.id },
      }),
      prisma.employee.findFirst({
        where: { id: employeeId },
        select: { hoursPerDay: true },
      }),
    ])
    if (toilLeave) {
      const hpd = emp?.hoursPerDay ?? 7.5
      used = (toilLeave.used + toilLeave.pending) * hpd
    }
  }

  return { accrued, used, remaining: accrued - used }
}

/**
 * Get the current user's own TOIL balance (self-service, no manager role required).
 * Returns null when the caller has no employee record for this tenant.
 */
export async function getMyToilBalance(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)

  const emp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true, firstName: true, lastName: true, hoursPerDay: true },
  })
  if (!emp) return null

  const [accrualsSum, toilPolicy] = await Promise.all([
    prisma.toilAccrual.aggregate({
      where: { tenantId: tenant.id, employeeId: emp.id, status: 'APPROVED' },
      _sum: { hours: true },
    }),
    prisma.leavePolicy.findFirst({
      where: { tenantId: tenant.id, name: { contains: 'TOIL', mode: 'insensitive' } },
    }),
  ])

  const accrued = accrualsSum._sum.hours ?? 0
  let used = 0
  if (toilPolicy) {
    const toilLeave = await prisma.leaveBalance.findFirst({
      where: { employeeId: emp.id, policyId: toilPolicy.id },
    })
    if (toilLeave) {
      const hpd = emp.hoursPerDay ?? 7.5
      used = (toilLeave.used + toilLeave.pending) * hpd
    }
  }

  return {
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    accrued,
    used,
    remaining: accrued - used,
  }
}

/**
 * Get TOIL balances for all employees in the tenant.
 */
export async function getAllToilBalances(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // Build employee filter for manager hierarchy
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      empWhere.id = { in: visibleIds }
    }
  }

  const employees = await prisma.employee.findMany({
    where: empWhere,
    select: { id: true, firstName: true, lastName: true, hoursPerDay: true },
    orderBy: { lastName: 'asc' },
  })

  const [accrualsByEmployee, toilPolicy] = await Promise.all([
    prisma.toilAccrual.groupBy({
      by: ['employeeId'],
      where: { tenantId: tenant.id, status: 'APPROVED' },
      _sum: { hours: true },
    }),
    prisma.leavePolicy.findFirst({
      where: { tenantId: tenant.id, name: { contains: 'TOIL', mode: 'insensitive' } },
    }),
  ])

  const accrualMap = new Map(accrualsByEmployee.map(a => [a.employeeId, a._sum.hours ?? 0]))

  let usedMap = new Map<string, number>()
  if (toilPolicy) {
    const balances = await prisma.leaveBalance.findMany({
      where: { policyId: toilPolicy.id, employeeId: { in: employees.map(e => e.id) } },
    })
    const empHpdMap = new Map(employees.map(e => [e.id, e.hoursPerDay ?? 7.5]))
    usedMap = new Map(balances.map(b => [b.employeeId, (b.used + b.pending) * (empHpdMap.get(b.employeeId) ?? 7.5)]))
  }

  return employees
    .map(emp => {
      const accrued = accrualMap.get(emp.id) ?? 0
      const used = usedMap.get(emp.id) ?? 0
      return {
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        accrued,
        used,
        remaining: accrued - used,
      }
    })
    .filter(b => b.accrued > 0 || b.used > 0)
}

export async function getToilFormOptions(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // Build employee filter for manager hierarchy
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      empWhere.id = { in: visibleIds }
    }
  }

  const employees = await prisma.employee.findMany({
    where: empWhere,
    select: { id: true, firstName: true, lastName: true },
    orderBy: { lastName: 'asc' },
  })

  return { employees }
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function createToilAccrual(
  tenantSlug: string,
  data: CreateToilData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)
    const parsed = CreateToilSchema.parse(data)

    // Verify employee belongs to tenant
    const emp = await prisma.employee.findFirst({
      where: { id: parsed.employeeId, tenantId: tenant.id },
    })
    if (!emp) throw new UserError('Employee not found')

    // Scope guard — without this any plain MANAGER could grant TOIL hours
    // to any employee in the tenant. Mirrors the createLeaveRequest fix.
    const allowedToil = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      parsed.employeeId,
    )
    if (!allowedToil) {
      throw new UserError('You can only record TOIL for your direct reports')
    }

    const accrual = await prisma.toilAccrual.create({
      data: {
        employeeId: parsed.employeeId,
        tenantId: tenant.id,
        date: new Date(parsed.date),
        hours: parsed.hours,
        reason: parsed.reason || null,
      },
    })

    await logAudit({
      action: 'toil_accrual.created',
      entity: 'ToilAccrual',
      entityId: accrual.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { hours: parsed.hours, employeeId: parsed.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/toil`)
    return { id: accrual.id }
  })
}

export async function approveToilAccrual(
  tenantSlug: string,
  accrualId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Scope guard — must look up the accrual first to know which employee
    // the manager is acting on. Without this any MANAGER could approve any
    // tenant TOIL accrual.
    const target = await prisma.toilAccrual.findFirst({
      where: { id: accrualId, tenantId: tenant.id },
      select: { employeeId: true },
    })
    if (!target) {
      throw new UserError('TOIL accrual not found or already decided')
    }
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedAppr = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        target.employeeId,
      )
      if (!allowedAppr) {
        throw new UserError('You can only approve TOIL for your direct reports')
      }
    }

    // Atomic guard: only flip the row if it's still PENDING. Two managers
    // approving the same accrual at the same time would otherwise both think
    // they did the work and both write audit entries.
    const updated = await prisma.toilAccrual.updateMany({
      where: { id: accrualId, tenantId: tenant.id, status: 'PENDING' },
      data: {
        status: 'APPROVED',
        approvedById: user.userId,
        approvedAt: new Date(),
      },
    })
    if (updated.count === 0) {
      throw new UserError('TOIL accrual not found or already decided')
    }

    const accrual = await prisma.toilAccrual.findFirst({
      where: { id: accrualId, tenantId: tenant.id },
      select: { hours: true, employeeId: true },
    })

    await logAudit({
      action: 'toil_accrual.approved',
      entity: 'ToilAccrual',
      entityId: accrualId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { hours: accrual?.hours, employeeId: accrual?.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/toil`)
  })
}

export async function rejectToilAccrual(
  tenantSlug: string,
  accrualId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Same scope guard as approveToilAccrual.
    const target = await prisma.toilAccrual.findFirst({
      where: { id: accrualId, tenantId: tenant.id },
      select: { employeeId: true },
    })
    if (!target) {
      throw new UserError('TOIL accrual not found or already decided')
    }
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedRej = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        target.employeeId,
      )
      if (!allowedRej) {
        throw new UserError('You can only reject TOIL for your direct reports')
      }
    }

    // Same atomic guard as approveToilAccrual
    const updated = await prisma.toilAccrual.updateMany({
      where: { id: accrualId, tenantId: tenant.id, status: 'PENDING' },
      data: { status: 'REJECTED' },
    })
    if (updated.count === 0) {
      throw new UserError('TOIL accrual not found or already decided')
    }

    const accrual = await prisma.toilAccrual.findFirst({
      where: { id: accrualId, tenantId: tenant.id },
      select: { hours: true, employeeId: true },
    })

    await logAudit({
      action: 'toil_accrual.rejected',
      entity: 'ToilAccrual',
      entityId: accrualId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { hours: accrual?.hours, employeeId: accrual?.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/toil`)
  })
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { addUsedToBalance, cancelBalance } from '@/app/t/[tenantSlug]/leave/balance-helpers'
import { getEmployeeLeaveYearStartMonth } from '@/lib/leave-year'

export async function getCompanyLeaves(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.companyLeave.findMany({
    where: { tenantId: tenant.id },
    orderBy: { startDate: 'asc' },
    include: {
      policy: { select: { id: true, name: true, unit: true } },
      _count: { select: { leaveRequests: true } },
    },
  })
}

export async function getDeductiblePolicies(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.leavePolicy.findMany({
    where: { tenantId: tenant.id, isSystemType: null },
    select: { id: true, name: true, unit: true, defaultAllowance: true },
    orderBy: { defaultAllowance: 'desc' },
  })
}

const CompanyLeaveSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  deductFromAllowance: z.boolean().default(false),
  policyId: z.string().nullable().optional(),
})

export type CompanyLeaveFormData = z.infer<typeof CompanyLeaveSchema>

export async function createCompanyLeave(tenantSlug: string, data: CompanyLeaveFormData) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const parsed = CompanyLeaveSchema.parse(data)
  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)

  if (endDate < startDate) {
    throw new Error('End date must be on or after start date')
  }

  let policyIdToUse: string | null = null
  if (parsed.deductFromAllowance) {
    if (!parsed.policyId) {
      throw new Error('Choose a policy to deduct from')
    }
    const policy = await prisma.leavePolicy.findFirst({
      where: { id: parsed.policyId, tenantId: tenant.id },
      select: { id: true },
    })
    if (!policy) throw new Error('Selected policy not found')
    policyIdToUse = policy.id
  }

  const cl = await prisma.companyLeave.create({
    data: {
      name: parsed.name,
      startDate,
      endDate,
      deductFromAllowance: parsed.deductFromAllowance,
      policyId: policyIdToUse,
      tenantId: tenant.id,
    },
  })

  let createdRequests = 0
  let skippedOverlapping = 0

  if (parsed.deductFromAllowance && policyIdToUse) {
    const employees = await prisma.employee.findMany({
      where: { tenantId: tenant.id, status: 'ACTIVE' },
      select: { id: true, leaveYearStartMonth: true, startDate: true },
    })

    for (const emp of employees) {
      const overlap = await prisma.leaveRequest.findFirst({
        where: {
          tenantId: tenant.id,
          employeeId: emp.id,
          status: { in: ['PENDING', 'APPROVED'] },
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
        select: { id: true },
      })
      if (overlap) {
        skippedOverlapping++
        continue
      }

      const effectiveStartMonth = getEmployeeLeaveYearStartMonth(emp, tenant)

      await prisma.leaveRequest.create({
        data: {
          startDate,
          endDate,
          reason: `Company closure: ${parsed.name}`,
          employeeId: emp.id,
          policyId: policyIdToUse,
          tenantId: tenant.id,
          companyLeaveId: cl.id,
          status: 'APPROVED',
          decidedAt: new Date(),
          decidedBy: user.userId,
        },
      })

      await addUsedToBalance(
        tenant.id, emp.id, policyIdToUse,
        startDate, endDate, effectiveStartMonth,
      )
      createdRequests++
    }
  }

  await logAudit({
    action: 'company_leave.created',
    entity: 'CompanyLeave',
    entityId: cl.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      name: parsed.name,
      deductFromAllowance: parsed.deductFromAllowance,
      createdRequests,
      skippedOverlapping,
    },
  })

  revalidatePath(`/t/${tenantSlug}/settings/company-leave`)
  return { success: true, createdRequests, skippedOverlapping }
}

export async function deleteCompanyLeave(tenantSlug: string, id: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const cl = await prisma.companyLeave.findFirst({
    where: { id, tenantId: tenant.id },
  })
  if (!cl) throw new Error('Company leave not found')

  // Reverse any auto-generated leave requests + balance deductions before
  // dropping the parent row. Doing this in two steps (rather than relying
  // on the FK SetNull cascade) keeps the leaveRequest rows + balance in
  // lockstep — orphaning them would leave used-days on the books with no
  // matching leave record.
  const autoRequests = await prisma.leaveRequest.findMany({
    where: { companyLeaveId: id, tenantId: tenant.id },
    select: {
      id: true,
      employeeId: true,
      policyId: true,
      startDate: true,
      endDate: true,
      status: true,
      employee: { select: { leaveYearStartMonth: true, startDate: true } },
    },
  })

  for (const lr of autoRequests) {
    if (lr.status === 'APPROVED' || lr.status === 'PENDING') {
      const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)
      await cancelBalance(
        tenant.id, lr.employeeId, lr.policyId,
        lr.startDate, lr.endDate, effectiveStartMonth,
        false, false,
        lr.status,
      )
    }
    await prisma.leaveRequest.delete({ where: { id: lr.id } })
  }

  await prisma.companyLeave.delete({ where: { id } })

  await logAudit({
    action: 'company_leave.deleted',
    entity: 'CompanyLeave',
    entityId: id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: cl.name, reversedRequests: autoRequests.length },
  })

  revalidatePath(`/t/${tenantSlug}/settings/company-leave`)
  return { success: true, reversedRequests: autoRequests.length }
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, getDirectReportIds, canManageEmployeeId } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import {
  getLeaveYear,
  getLeaveYearRange,
  getEmployeeLeaveYearStartMonth,
} from '@/lib/leave-year'

// ── Ensure Lateness Policy ──

/**
 * Get or create the "Lateness" system policy for a tenant.
 * Returns the policy id.
 */
export async function ensureLatenessPolicy(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)

  // First try to find by isSystemType
  let policy = await prisma.leavePolicy.findFirst({
    where: { tenantId: tenant.id, isSystemType: 'lateness' },
  })

  if (policy) return policy

  // Fall back to name-based detection
  policy = await prisma.leavePolicy.findFirst({
    where: { tenantId: tenant.id, name: { contains: 'late', mode: 'insensitive' } },
  })

  if (policy) {
    // Upgrade it to a system type
    await prisma.leavePolicy.update({
      where: { id: policy.id },
      data: { isSystemType: 'lateness' },
    })
    return policy
  }

  // Create a new lateness policy
  policy = await prisma.leavePolicy.create({
    data: {
      name: 'Lateness',
      unit: 'occurrences',
      allowHalfDay: false,
      defaultAllowance: 0,
      maxCarryoverDays: 0,
      isSystemType: 'lateness',
      tenantId: tenant.id,
    },
  })

  return policy
}

// ── Record Lateness ──

const RecordLatenessSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  date: z.string().min(1, 'Date is required'),
  duration: z.string().min(1, 'Duration is required'),
  reason: z.string().optional(),
})

export type RecordLatenessData = z.input<typeof RecordLatenessSchema>

export async function recordLateness(
  tenantSlug: string,
  data: RecordLatenessData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = RecordLatenessSchema.parse(data)

  // Verify employee belongs to tenant
  const emp = await prisma.employee.findFirst({
    where: { id: parsed.employeeId, tenantId: tenant.id },
    select: { id: true, firstName: true, lastName: true },
  })
  if (!emp) throw new UserError('Employee not found')

  // Scope guard — without this any plain MANAGER could record a
  // lateness occurrence (a disciplinary record) against any employee
  // in the tenant. Mirrors the round-4 leave action manager-scope
  // pattern. ADMIN+ keeps the tenant-wide reach.
  const allowedRecord = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    parsed.employeeId,
  )
  if (!allowedRecord) {
    throw new UserError('You can only record lateness for your direct reports')
  }

  // Ensure lateness policy exists
  const policy = await ensureLatenessPolicy(tenantSlug)

  const date = new Date(parsed.date)

  // Create a leave request record for the lateness occurrence
  // Start and end date are the same day for lateness
  const lr = await prisma.leaveRequest.create({
    data: {
      startDate: date,
      endDate: date,
      halfDayStart: false,
      halfDayEnd: false,
      reason: parsed.reason || null,
      status: 'APPROVED',
      decidedBy: user.userId,
      decidedAt: new Date(),
      latenessDuration: parsed.duration,
      employeeId: parsed.employeeId,
      policyId: policy.id,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'lateness.recorded',
    entity: 'LeaveRequest',
    entityId: lr.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { employeeId: parsed.employeeId, duration: parsed.duration },
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/employees/${parsed.employeeId}`)

    return { id: lr.id }
  })
}

// ── Get Lateness Count ──

/**
 * Get the number of lateness occurrences for an employee in the current leave year.
 *
 * Uses the employee's effective leave year (their override, falling back to
 * the tenant default) to compute the date window. Previously this function
 * was lifetime-wide, so a 3-year employee with 4 lates/year showed 12.
 */
export async function getEmployeeLatenessCount(
  tenantSlug: string,
  employeeId: string
): Promise<number> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Lateness count is a disciplinary metric. ADMIN+ can read for any
  // employee. Plain MANAGERs are restricted to their direct reports /
  // delegates / themselves. Plain employees can only see their own.
  // Without this gate any tenant employee could enumerate everyone's
  // lateness count via the dashboard tile path.
  const allowedRead = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    employeeId,
  )
  if (!allowedRead) {
    return 0
  }

  // Find lateness policy
  const policy = await prisma.leavePolicy.findFirst({
    where: {
      tenantId: tenant.id,
      OR: [
        { isSystemType: 'lateness' },
        { name: { contains: 'late', mode: 'insensitive' } },
      ],
    },
  })

  if (!policy) return 0

  // Resolve the effective leave-year window for this employee.
  const employee = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
    select: { leaveYearStartMonth: true },
  })
  const startMonth = getEmployeeLeaveYearStartMonth(
    { leaveYearStartMonth: employee?.leaveYearStartMonth ?? null },
    { leaveYearStartMonth: tenant.leaveYearStartMonth }
  )
  const year = getLeaveYear(startMonth, new Date())
  const { start, end } = getLeaveYearRange(startMonth, year)

  return prisma.leaveRequest.count({
    where: {
      tenantId: tenant.id,
      employeeId,
      policyId: policy.id,
      status: { in: ['APPROVED', 'PENDING'] },
      startDate: { gte: start, lte: end },
    },
  })
}

// ── Get Dashboard Lateness Stats ──

/**
 * Get lateness occurrences in the last 30 days across all employees.
 */
export async function getLatenessLast30Days(tenantSlug: string): Promise<number> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const policy = await prisma.leavePolicy.findFirst({
    where: {
      tenantId: tenant.id,
      OR: [
        { isSystemType: 'lateness' },
        { name: { contains: 'late', mode: 'insensitive' } },
      ],
    },
  })

  if (!policy) return 0

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Scope to the caller's report set so a plain MANAGER doesn't see a
  // tenant-wide count that includes employees they have no visibility
  // over. ADMIN+ keeps the full tenant count. (Round 5 dashboard scope.)
  const isAdminOrAbove = isAtLeast(membership, 'ADMIN')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    tenantId: tenant.id,
    policyId: policy.id,
    status: { in: ['APPROVED', 'PENDING'] },
    startDate: { gte: thirtyDaysAgo },
  }
  if (!isAdminOrAbove) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      if (visibleIds.length === 0) return 0
      where.employeeId = { in: visibleIds }
    }
  }

  return prisma.leaveRequest.count({ where })
}

// ── Get Employees for Lateness Form ──

export async function getActiveEmployeesForLateness(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)

  return prisma.employee.findMany({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
    select: { id: true, firstName: true, lastName: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })
}

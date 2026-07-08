'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast, assertAtLeast, canManageEmployeeId } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { getLeaveYear, getEmployeeLeaveYearStartMonth, getAccruedAllowance } from '@/lib/leave-year'
import { ensureStandardHolidaysForLeaveYear } from '@/lib/holidays'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// Internal balance helpers — see balance-helpers.ts for the security
// rationale (they MUST NOT live in this 'use server' file). User-facing
// actions in this file (getEmployeeBalances, getMyBalances,
// adjustLeaveBalance) call them internally; other server-side callers
// (leave/actions.ts approve / reject / cancel / extend / edit /
// terminate, dashboard render, expense reports, etc) import them
// directly from `./balance-helpers`.
import { ensureBalances } from './balance-helpers'

// All balance helpers (ensureBalances, calculateLeaveDays,
// calculateLeaveAmount, addUsedToBalance, addPendingToBalance,
// approveBalance, rejectBalance, cancelBalance) live exclusively in
// `./balance-helpers` and are NOT re-exported from this file. Re-
// exporting them here would re-expose them as public Server Actions —
// the whole point of the split is that they stay callable from
// server-side imports only. If you need to expose any of them as a
// user-facing action, write a wrapper here that does requireTenant +
// canManageEmployeeId first.

export async function getEmployeeBalances(tenantSlug: string, employeeId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Verify employee belongs to tenant
  const emp = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
    select: { id: true, leaveYearStartMonth: true, userId: true, startDate: true },
  })
  if (!emp) throw new Error('Employee not found')

  // Non-managers can only view their own balances
  if (!isAtLeast(membership, 'MANAGER') && emp.userId !== user.userId) {
    throw new Error('You can only view your own leave balances')
  }

  const startMonth = getEmployeeLeaveYearStartMonth(emp, tenant)
  const year = getLeaveYear(startMonth, new Date())

  await ensureBalances(tenant.id, employeeId, year, startMonth)

  const balances = await prisma.leaveBalance.findMany({
    where: { tenantId: tenant.id, employeeId, year },
    include: { policy: true },
  })

  // Calculate years of service for service bonus display
  const yearsOfService = emp.startDate
    ? Math.floor((Date.now() - new Date(emp.startDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0

  // Count bank holidays for the current leave year. We surface this to staff
  // either way so they know what they're getting:
  //   deductBankHolidays = true  → "Including N bank holidays" (eat into balance)
  //   deductBankHolidays = false → "+ N bank holidays paid on top" (extra)
  // Self-heal any tenant whose holiday table is missing standard dates for the
  // current/next leave year (e.g. tenants onboarded before newer years existed).
  await ensureStandardHolidaysForLeaveYear(
    tenant.id,
    tenant.country,
    startMonth,
    new Date()
  )
  const deductBankHolidays = tenant.deductBankHolidays ?? false
  const yearStart = new Date(year, startMonth - 1, 1)
  const yearEnd = new Date(year + 1, startMonth - 1, 0)
  const bankHolidayCount = await prisma.publicHoliday.count({
    where: {
      tenantId: tenant.id,
      date: { gte: yearStart, lte: yearEnd },
    },
  })

  return Promise.all(balances.map(async (b) => {
    const accrued = getAccruedAllowance(b.policy.accrualType, b.allowance, startMonth, year)

    // Determine service bonus for display
    let serviceBonusDays = 0
    if (b.policy.serviceBonusDays && emp.startDate) {
      const bonuses = b.policy.serviceBonusDays as { years: number; days: number }[]
      const applicableBonus = bonuses
        .filter(bn => yearsOfService >= bn.years)
        .sort((a, bn) => bn.years - a.years)[0]
      if (applicableBonus) {
        serviceBonusDays = applicableBonus.days
      }
    }

    return {
      id: b.id,
      policyId: b.policyId,
      policyName: b.policy.name,
      policyUnit: b.policy.unit,
      accrualType: b.policy.accrualType,
      isSystemType: b.policy.isSystemType,
      year: b.year,
      allowance: b.allowance,
      accrued,
      used: b.used,
      pending: b.pending,
      remaining: accrued - b.used - b.pending,
      isProRated: (b.allowance - b.carryoverDays) < b.policy.defaultAllowance,
      serviceBonusDays,
      deductBankHolidays,
      bankHolidayCount,
    }
  }))
}

export async function getMyBalances(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)

  const employee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
  })
  if (!employee) throw new Error('No employee record found for current user')

  return getEmployeeBalances(tenantSlug, employee.id)
}

/**
 * Manually adjust an employee's leave allowance.
 * Requires MANAGER+ role.
 * adjustment can be positive (adding days) or negative (removing days).
 */
export async function adjustLeaveBalance(
  tenantSlug: string,
  employeeId: string,
  policyId: string,
  year: number,
  adjustment: number,
  reason: string
): Promise<ActionResult<{ oldAllowance: number; newAllowance: number }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  if (adjustment === 0) throw new UserError('Adjustment cannot be zero')
  if (!reason.trim()) throw new UserError('A reason is required for balance adjustments')

  // Verify employee belongs to this tenant
  const emp = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
    select: { id: true, firstName: true, lastName: true },
  })
  if (!emp) throw new UserError('Employee not found')

  // Scope guard: a plain MANAGER may only adjust balances for their own
  // direct reports / active delegations, not the whole tenant. Every other
  // employee mutation runs this check — this one was missing it.
  if (!isAtLeast(membership, 'ADMIN')) {
    const allowed = await canManageEmployeeId(tenant.id, user.userId, membership, employeeId)
    if (!allowed) throw new UserError("You do not have permission to adjust this employee's leave balance")
  }

  // Ensure balance exists
  await ensureBalances(tenant.id, employeeId, year)

  // Fetch the balance first so we can (a) surface policy name in the audit
  // log and (b) reject adjustments that would drive allowance negative
  // using the most recent value. We still apply the actual write as an
  // atomic `{ increment }` below so that two concurrent +5 and +3
  // adjustments both land (previous code used an absolute write which
  // silently lost one of them).
  const existing = await prisma.leaveBalance.findUnique({
    where: {
      employeeId_policyId_year: { employeeId, policyId, year },
    },
    include: { policy: true },
  })
  if (!existing) throw new UserError('Leave balance not found')

  if (existing.allowance + adjustment < 0) {
    throw new UserError('Adjustment would result in a negative allowance')
  }

  // Atomic increment — Prisma turns this into a single UPDATE with
  // `allowance = allowance + $adjustment` so concurrent writers compose
  // instead of clobbering each other. The returned row holds the new
  // allowance; derive oldAllowance from it so the audit log stays accurate
  // even if another adjustment landed between the findUnique above and
  // this update (old = new - adjustment).
  const balance = await prisma.leaveBalance.update({
    where: {
      employeeId_policyId_year: { employeeId, policyId, year },
    },
    data: { allowance: { increment: adjustment } },
    include: { policy: true },
  })

  const newAllowance = balance.allowance
  const oldAllowance = newAllowance - adjustment

  // Log audit trail
  await logAudit({
    action: 'leave_balance.adjusted',
    entity: 'LeaveBalance',
    entityId: balance.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      employeeId,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      policyName: balance.policy.name,
      policyId,
      year,
      adjustment,
      oldAllowance,
      newAllowance,
      reason: reason.trim(),
    },
  })

  revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    return { oldAllowance, newAllowance }
  })
}

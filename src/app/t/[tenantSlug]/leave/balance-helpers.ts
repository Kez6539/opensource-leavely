// NOT a 'use server' module. Functions here are intentionally internal —
// they are only callable from server-side imports, NOT from the browser.
//
// Why this exists: Next.js exposes EVERY function exported from a file
// that starts with `'use server'` as a Server Action callable from the
// client. The balance-mutation helpers (ensureBalances, addUsedToBalance,
// addPendingToBalance, approveBalance, rejectBalance, cancelBalance,
// calculateLeaveDays, calculateLeaveAmount) used to live in the same
// file as the user-facing actions, which meant any authenticated browser
// could POST `cancelBalance(myTenantId, anyEmployeeId, anyPolicyId, ...)`
// or `addUsedToBalance(...)` directly and corrupt any employee's balance
// in any tenant they had membership in.
//
// By moving them here we keep them callable from server-side imports
// (leave/actions.ts approve/reject/cancel/extend/edit, employees/[employeeId]
// terminate, dashboard balance render, etc) without exposing them as
// public mutations. The user-facing wrappers in `./balance-actions.ts`
// (getEmployeeBalances, getMyBalances, adjustLeaveBalance) still go
// through requireTenant + assertAtLeast and import these helpers
// internally.
//
// Same anti-pattern as the round-4 `getExpenseReceipt` fix in
// commit 7a30654 and the createNotification fix in 207f136.

import { prisma } from '@/lib/db'
import { calculateProRataAllowance, splitDateRangeByLeaveYear } from '@/lib/leave-year'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'
import { calculateCarryover, getCarryoverExpiryDate } from '@/lib/carryover'

const DEFAULT_HOURS_PER_DAY_CALC = 7.5

/**
 * Lazily initialize leave balances for an employee for the current year.
 * Creates a balance record for each policy if one doesn't already exist.
 */
export async function ensureBalances(
  tenantId: string,
  employeeId: string,
  year: number,
  leaveYearStartMonthOverride?: number,
) {
  const [policies, existingBalances] = await Promise.all([
    prisma.leavePolicy.findMany({ where: { tenantId } }),
    prisma.leaveBalance.findMany({
      where: { tenantId, employeeId, year },
      select: { policyId: true },
    }),
  ])

  const existingPolicyIds = new Set(existingBalances.map((b) => b.policyId))
  const missing = policies.filter((p) => !existingPolicyIds.has(p.id))

  if (missing.length > 0) {
    const [employee, prevBalances, tenantForProRata, workingPattern] = await Promise.all([
      prisma.employee.findUnique({
        where: { id: employeeId },
        select: { startDate: true, leaveYearStartMonth: true, hoursPerDay: true },
      }),
      prisma.leaveBalance.findMany({
        where: { tenantId, employeeId, year: year - 1 },
      }),
      prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { leaveYearStartMonth: true },
      }),
      prisma.workingTimePattern.findMany({
        where: { employeeId },
      }),
    ])
    const prevBalanceMap = new Map(prevBalances.map((b) => [b.policyId, b]))

    const leaveYearStartMonth =
      leaveYearStartMonthOverride
      ?? employee?.leaveYearStartMonth
      ?? tenantForProRata?.leaveYearStartMonth
      ?? 1

    const DEFAULT_HOURS_PER_DAY = 7.5

    await Promise.all(
      missing.map((policy) => {
        let allowance: number = policy.defaultAllowance
        let carryoverDays = 0
        const isHoursBased = policy.unit === 'hours'
        const isSystemPolicy = policy.isSystemType !== null

        const STANDARD_WORKING_DAYS = 5
        let workingDaysPerWeek = STANDARD_WORKING_DAYS
        if (!isSystemPolicy && workingPattern.length > 0) {
          const wd = workingPattern.filter((p) => p.isWorkingDay).length
          if (wd > 0) workingDaysPerWeek = wd
        }
        const workingPatternFactor = workingDaysPerWeek / STANDARD_WORKING_DAYS

        if (isHoursBased) {
          const hpd = employee?.hoursPerDay ?? DEFAULT_HOURS_PER_DAY
          allowance = policy.defaultAllowance * hpd
        } else if (!isSystemPolicy && workingPatternFactor < 1) {
          allowance = Math.round(allowance * workingPatternFactor * 100) / 100
        }

        if (!isSystemPolicy && employee?.startDate) {
          allowance = calculateProRataAllowance(
            allowance,
            new Date(employee.startDate),
            leaveYearStartMonth,
            year,
          )
        }

        if (!isSystemPolicy && policy.serviceBonusDays && employee?.startDate) {
          const bonuses = policy.serviceBonusDays as { years: number; days: number }[]
          const yearsOfService = Math.floor(
            (Date.now() - new Date(employee.startDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
          )
          const applicableBonus = bonuses
            .filter((b) => yearsOfService >= b.years)
            .sort((a, b) => b.years - a.years)[0]
          if (applicableBonus) {
            if (isHoursBased) {
              const hpd = employee?.hoursPerDay ?? DEFAULT_HOURS_PER_DAY
              allowance += applicableBonus.days * hpd
            } else {
              allowance += applicableBonus.days * workingPatternFactor
              allowance = Math.round(allowance * 100) / 100
            }
          }
        }

        if (!isSystemPolicy && policy.maxCarryoverDays > 0) {
          const prev = prevBalanceMap.get(policy.id)
          if (prev) {
            carryoverDays = calculateCarryover(prev.allowance, prev.used, policy.maxCarryoverDays, prev.pending)
            allowance += carryoverDays
          }
        }

        return prisma.leaveBalance.upsert({
          where: {
            employeeId_policyId_year: { employeeId, policyId: policy.id, year },
          },
          update: {},
          create: {
            employeeId,
            policyId: policy.id,
            tenantId,
            year,
            allowance,
            carryoverDays,
          },
        })
      }),
    )
  }

  // Enforce carryover expiry for existing balances
  const allBalances = await prisma.leaveBalance.findMany({
    where: { tenantId, employeeId, year },
    include: { policy: true },
  })

  let effectiveStartMonth = leaveYearStartMonthOverride
  if (!effectiveStartMonth) {
    const tenantRecord = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { leaveYearStartMonth: true },
    })
    if (!tenantRecord) return
    effectiveStartMonth = tenantRecord.leaveYearStartMonth
  }

  const now = new Date()
  for (const balance of allBalances) {
    if (balance.carryoverDays > 0 && balance.policy.carryoverExpiryMonths) {
      const expiryDate = getCarryoverExpiryDate(
        effectiveStartMonth,
        year,
        balance.policy.carryoverExpiryMonths,
      )
      if (expiryDate && now >= expiryDate) {
        await prisma.leaveBalance.update({
          where: { id: balance.id },
          data: {
            allowance: { decrement: balance.carryoverDays },
            carryoverDays: 0,
          },
        })
      }
    }
  }
}

/**
 * Calculate business days between two dates, excluding non-working days
 * and public holidays. If an employeeId is provided, looks up the
 * employee's working pattern. Otherwise defaults to Mon-Fri.
 *
 * When deductBankHolidays is enabled for the tenant, public holidays are
 * NOT excluded from the count (they count as used leave days).
 */
export async function calculateLeaveDays(
  tenantId: string,
  startDate: Date,
  endDate: Date,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
  employeeId?: string,
): Promise<number> {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { deductBankHolidays: true },
  })

  let holidayDates = new Set<string>()
  if (!tenant?.deductBankHolidays) {
    const holidays = await prisma.publicHoliday.findMany({
      where: {
        tenantId,
        date: { gte: startDate, lte: endDate },
      },
    })
    holidayDates = new Set(holidays.map((h) => toLocalDayKey(h.date)))
  }

  let workingDays: Set<number> | undefined
  if (employeeId) {
    const pattern = await prisma.workingTimePattern.findMany({
      where: { employeeId },
    })
    if (pattern.length > 0) {
      workingDays = new Set(pattern.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek))
    }
  }

  return countBusinessDays(startDate, endDate, holidayDates, halfDayStart, halfDayEnd, workingDays)
}

/**
 * Calculate leave amount in the correct unit (days or hours) for a given
 * policy. For hours-based policies: business days × employee's
 * hoursPerDay. For days-based policies: returns business days as before.
 */
export async function calculateLeaveAmount(
  tenantId: string,
  startDate: Date,
  endDate: Date,
  policyId: string,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
  employeeId?: string,
): Promise<number> {
  const days = await calculateLeaveDays(
    tenantId,
    startDate,
    endDate,
    halfDayStart,
    halfDayEnd,
    employeeId,
  )

  const policy = await prisma.leavePolicy.findUnique({
    where: { id: policyId },
    select: { unit: true },
  })

  if (policy?.unit === 'hours' && employeeId) {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      select: { hoursPerDay: true },
    })
    const hpd = employee?.hoursPerDay ?? DEFAULT_HOURS_PER_DAY_CALC
    return days * hpd
  }

  return days
}

/**
 * Calculate the leave amount for each leave year segment a request
 * touches. Returns one entry per affected leave year. Half-day flags
 * only apply to the first/last segment respectively.
 */
async function amountPerYear(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number,
  halfDayStart: boolean,
  halfDayEnd: boolean,
): Promise<Array<{ year: number; amount: number }>> {
  const segments = splitDateRangeByLeaveYear(startDate, endDate, leaveYearStartMonth)
  const out: Array<{ year: number; amount: number }> = []
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    const isFirst = i === 0
    const isLast = i === segments.length - 1
    const amount = await calculateLeaveAmount(
      tenantId,
      seg.start,
      seg.end,
      policyId,
      isFirst ? halfDayStart : false,
      isLast ? halfDayEnd : false,
      employeeId,
    )
    if (amount > 0) out.push({ year: seg.year, amount })
  }
  return out
}

/**
 * Directly increment used balance (skip pending step). Used for
 * auto-approved sickness self-reports. Splits across leave years.
 */
export async function addUsedToBalance(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number = 1,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
) {
  const perYear = await amountPerYear(
    tenantId,
    employeeId,
    policyId,
    startDate,
    endDate,
    leaveYearStartMonth,
    halfDayStart,
    halfDayEnd,
  )
  for (const { year, amount } of perYear) {
    await ensureBalances(tenantId, employeeId, year, leaveYearStartMonth)
    await prisma.leaveBalance.update({
      where: { employeeId_policyId_year: { employeeId, policyId, year } },
      data: { used: { increment: amount } },
    })
  }
}

/**
 * Update balance when a leave request is created (PENDING). Splits
 * across leave years.
 */
export async function addPendingToBalance(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number = 1,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
) {
  const perYear = await amountPerYear(
    tenantId,
    employeeId,
    policyId,
    startDate,
    endDate,
    leaveYearStartMonth,
    halfDayStart,
    halfDayEnd,
  )
  for (const { year, amount } of perYear) {
    await ensureBalances(tenantId, employeeId, year, leaveYearStartMonth)
    await prisma.leaveBalance.update({
      where: { employeeId_policyId_year: { employeeId, policyId, year } },
      data: { pending: { increment: amount } },
    })
  }
}

/**
 * Move pending to used when approved. Splits across leave years.
 */
export async function approveBalance(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number = 1,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
) {
  const perYear = await amountPerYear(
    tenantId,
    employeeId,
    policyId,
    startDate,
    endDate,
    leaveYearStartMonth,
    halfDayStart,
    halfDayEnd,
  )
  for (const { year, amount } of perYear) {
    await prisma.leaveBalance.update({
      where: { employeeId_policyId_year: { employeeId, policyId, year } },
      data: {
        pending: { decrement: amount },
        used: { increment: amount },
      },
    })
  }
}

/**
 * Remove pending when rejected. Splits across leave years.
 */
export async function rejectBalance(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number = 1,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
) {
  const perYear = await amountPerYear(
    tenantId,
    employeeId,
    policyId,
    startDate,
    endDate,
    leaveYearStartMonth,
    halfDayStart,
    halfDayEnd,
  )
  for (const { year, amount } of perYear) {
    await prisma.leaveBalance.update({
      where: { employeeId_policyId_year: { employeeId, policyId, year } },
      data: { pending: { decrement: amount } },
    })
  }
}

/**
 * Reverse balance changes when a leave request is cancelled.
 *  - If it was APPROVED: decrement `used`
 *  - If it was PENDING:  decrement `pending`
 * Splits across leave years.
 */
export async function cancelBalance(
  tenantId: string,
  employeeId: string,
  policyId: string,
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number = 1,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
  previousStatus: 'APPROVED' | 'PENDING',
) {
  const perYear = await amountPerYear(
    tenantId,
    employeeId,
    policyId,
    startDate,
    endDate,
    leaveYearStartMonth,
    halfDayStart,
    halfDayEnd,
  )
  for (const { year, amount } of perYear) {
    if (previousStatus === 'APPROVED') {
      await prisma.leaveBalance.update({
        where: { employeeId_policyId_year: { employeeId, policyId, year } },
        data: { used: { decrement: amount } },
      })
    } else {
      await prisma.leaveBalance.update({
        where: { employeeId_policyId_year: { employeeId, policyId, year } },
        data: { pending: { decrement: amount } },
      })
    }
  }
}

/**
 * Leave year utilities.
 *
 * A "leave year" starts on the 1st of `startMonth` and runs for 12 months.
 * When startMonth=1 (January) the leave year equals the calendar year.
 * When startMonth=4 (April, UK standard) a date in Feb 2026 belongs to
 * leave year 2025 (1 Apr 2025 – 31 Mar 2026).
 */

import { toLocalDayKey } from './business-days'

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/**
 * Return the leave-year integer for the leave year that contains `date`.
 * The leave year integer is the calendar year in which the leave year starts.
 *
 * Uses the canonical local-day interpretation (`toLocalDayKey`) so a
 * BST-stored 1 Apr (2026-03-31T23:00Z) correctly lands in leave year 2026,
 * not 2025, regardless of server timezone.
 */
export function getLeaveYear(startMonth: number, date: Date = new Date()): number {
  const [ys, ms] = toLocalDayKey(date).split('-').map(Number)
  return ms >= startMonth ? ys : ys - 1
}

/**
 * Return the start and end dates for a given leave year.
 *
 * Boundaries are constructed in UTC to avoid local-DST drift. On a server
 * that happens to be in BST, `new Date(year, month, day, ...)` yields a
 * UTC instant one hour early, which can misfile a 1 Apr request (stored
 * BST-style at 2026-03-31T23:00Z) as belonging to the previous leave year.
 */
export function getLeaveYearRange(startMonth: number, leaveYear: number): { start: Date; end: Date } {
  // Start: first millisecond of the first day of the leave year, in UTC.
  const start = new Date(Date.UTC(leaveYear, startMonth - 1, 1, 0, 0, 0, 0))
  // End: last millisecond of the last day before the next leave year starts, in UTC.
  // Day 0 of `(leaveYear + 1, startMonth - 1)` is the last day of the previous month.
  const end = new Date(Date.UTC(leaveYear + 1, startMonth - 1, 0, 23, 59, 59, 999))
  return { start, end }
}

/**
 * Split a date range into one segment per leave year it touches. Used to debit
 * a leave request's balance against the correct year(s) when the request spans
 * a leave-year boundary (e.g. Mar 30 → Apr 3 on a tenant whose leave year
 * starts in April: 2 days against year N, 3 days against year N+1).
 *
 * Returns segments in chronological order. Each segment has its own (start, end)
 * clipped to the relevant leave year. If the input range fits inside a single
 * leave year, returns a single segment.
 */
export function splitDateRangeByLeaveYear(
  startDate: Date,
  endDate: Date,
  leaveYearStartMonth: number
): Array<{ year: number; start: Date; end: Date }> {
  const segments: Array<{ year: number; start: Date; end: Date }> = []
  let cursor = startDate
  let safety = 0
  while (cursor <= endDate && safety++ < 100) {
    const year = getLeaveYear(leaveYearStartMonth, cursor)
    const { end: yearEnd } = getLeaveYearRange(leaveYearStartMonth, year)
    const segmentEnd = endDate < yearEnd ? endDate : yearEnd
    segments.push({ year, start: cursor, end: segmentEnd })
    if (segmentEnd >= endDate) break
    // Advance to the first millisecond of the next leave year
    cursor = new Date(segmentEnd.getTime() + 1)
  }
  return segments
}

/**
 * Human-readable label for a leave year.
 * - startMonth=1 → "2026"
 * - startMonth=4, leaveYear=2025 → "1 Apr 2025 – 31 Mar 2026"
 */
/**
 * Return the effective leave year start month for an employee.
 * Uses the employee's override if set, otherwise falls back to the tenant default.
 */
export function getEmployeeLeaveYearStartMonth(
  employee: { leaveYearStartMonth: number | null },
  tenant: { leaveYearStartMonth: number }
): number {
  return employee.leaveYearStartMonth ?? tenant.leaveYearStartMonth
}

/**
 * Calculate pro-rata allowance for an employee who started mid-leave-year.
 * Returns the allowance rounded to the nearest 0.5 day.
 *
 * - If employee started before the leave year → full allowance
 * - If employee started during the leave year → pro-rated amount
 * - If employee started after the leave year → 0
 *
 * The employee start date is interpreted via `toLocalDayKey` so that a
 * BST-stored 1 Apr hire (2026-03-31T23:00Z) resolves to 1 Apr — not 31 Mar —
 * and the full allowance / pro-rata boundary is correct.
 */
export function calculateProRataAllowance(
  defaultAllowance: number,
  employeeStartDate: Date,
  leaveYearStartMonth: number,
  leaveYear: number
): number {
  const { start, end } = getLeaveYearRange(leaveYearStartMonth, leaveYear)

  // Normalise the employee start date to its intended calendar day, then
  // compare via UTC-noon markers so BST/GMT storage doesn't shift the bucket.
  const [sy, sm, sd] = toLocalDayKey(employeeStartDate).split('-').map(Number)
  const empStartUtc = new Date(Date.UTC(sy, sm - 1, sd, 0, 0, 0, 0))

  // Employee started before this leave year — full allowance
  if (empStartUtc < start) {
    return defaultAllowance
  }

  // Employee started after this leave year — no allowance
  if (empStartUtc > end) {
    return 0
  }

  // Employee started during this leave year — pro-rate.
  // Count full months remaining from employee start date to end of leave year,
  // using UTC components on both sides so the arithmetic is consistent.
  const startYear = sy
  const startMonth = sm - 1 // 0-based
  const endYear = end.getUTCFullYear()
  const endMonth = end.getUTCMonth() // 0-based

  // Months from start of the month the employee joins to the end of the leave year
  let monthsRemaining = (endYear - startYear) * 12 + (endMonth - startMonth) + 1

  // If the employee starts after the 1st of the month, don't count it as a full month
  if (sd > 1) {
    monthsRemaining -= 1
  }

  // Clamp to 0-12
  monthsRemaining = Math.max(0, Math.min(12, monthsRemaining))

  const proRata = defaultAllowance * monthsRemaining / 12

  // Round to nearest 0.5
  return Math.round(proRata * 2) / 2
}

/**
 * Calculate the accrued allowance for a monthly accrual policy.
 * Returns the full allowance for "upfront" policies.
 */
export function getAccruedAllowance(
  accrualType: string,
  totalAllowance: number,
  leaveYearStartMonth: number,
  year: number
): number {
  if (accrualType !== 'monthly') return totalAllowance

  // Calculate months elapsed in the leave year. Use UTC throughout so a BST
  // server doesn't flip the result on the boundary of a month.
  const now = new Date()
  const nowYear = now.getUTCFullYear()
  const nowMonth = now.getUTCMonth()
  const monthsElapsed = Math.min(12,
    Math.max(0, (nowYear - year) * 12 + (nowMonth - (leaveYearStartMonth - 1)) + 1)
  )

  return Math.round((totalAllowance * monthsElapsed / 12) * 100) / 100
}

export function formatLeaveYearLabel(startMonth: number, leaveYear: number): string {
  if (startMonth === 1) return String(leaveYear)
  const { start, end } = getLeaveYearRange(startMonth, leaveYear)
  // Read UTC components because getLeaveYearRange constructs the range in UTC.
  const s = `${start.getUTCDate()} ${MONTH_ABBR[start.getUTCMonth()]} ${start.getUTCFullYear()}`
  const e = `${end.getUTCDate()} ${MONTH_ABBR[end.getUTCMonth()]} ${end.getUTCFullYear()}`
  return `${s} – ${e}`
}

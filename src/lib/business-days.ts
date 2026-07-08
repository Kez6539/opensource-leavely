/**
 * Pure utility for counting business days between two dates.
 * Excludes non-working days and any dates in the provided holiday set.
 */

/** Default Mon-Fri working days (1=Monday through 5=Friday) */
const DEFAULT_WORKING_DAYS = new Set([1, 2, 3, 4, 5])

const MS_PER_DAY = 24 * 60 * 60 * 1000

/**
 * Normalise a Date that represents a "local day" into the canonical
 * `YYYY-MM-DD` string for that day, regardless of storage convention.
 *
 * LeaveRequest dates have a storage asymmetry:
 *   - Older records are at UTC 00:00 (GMT midnight — the intended day's UTC
 *     components already equal the intended local day).
 *   - Newer records are at UTC 23:00 (and sometimes 22:00) of the previous
 *     day (BST midnight — the intended day is the UTC day AFTER the stored
 *     UTC components).
 *
 * Rule:
 *   - UTC hour 22 or 23 → the intended local day is UTC day + 1
 *   - UTC hour 0        → the intended local day is the UTC day
 *   - Any other hour    → treat the UTC day as the intended day (fallback;
 *                         covers hand-constructed Dates in tests).
 *
 * Returns a `YYYY-MM-DD` string in UTC terms of the normalised day.
 */
export function toLocalDayKey(date: Date): string {
  const hour = date.getUTCHours()
  let y = date.getUTCFullYear()
  let m = date.getUTCMonth()
  let d = date.getUTCDate()
  if (hour >= 22) {
    // BST storage — shift forward one UTC day to reach the intended local day
    const shifted = new Date(Date.UTC(y, m, d + 1))
    y = shifted.getUTCFullYear()
    m = shifted.getUTCMonth()
    d = shifted.getUTCDate()
  }
  const mm = String(m + 1).padStart(2, '0')
  const dd = String(d).padStart(2, '0')
  return `${y}-${mm}-${dd}`
}

/**
 * Return the JavaScript day-of-week (0=Sun..6=Sat) for the canonical local
 * day represented by `date`. Uses `toLocalDayKey` so it's immune to the
 * BST-vs-GMT storage asymmetry.
 */
export function localDayOfWeek(date: Date): number {
  const key = toLocalDayKey(date)
  // Construct at UTC noon to avoid any TZ rounding
  const [ys, ms, ds] = key.split('-')
  const utc = new Date(Date.UTC(Number(ys), Number(ms) - 1, Number(ds), 12, 0, 0))
  return utc.getUTCDay()
}

/**
 * Count the number of business days between startDate and endDate (inclusive).
 *
 * @param startDate    - First day of the range
 * @param endDate      - Last day of the range
 * @param holidayDates - Set of ISO date strings (YYYY-MM-DD) to exclude
 * @param halfDayStart - Deduct 0.5 for a half-day on the start date
 * @param halfDayEnd   - Deduct 0.5 for a half-day on the end date
 * @param workingDays  - Set of dayOfWeek numbers (0=Sun..6=Sat) that are working days.
 *                       Defaults to Mon-Fri (1-5) if not provided.
 */
export function countBusinessDays(
  startDate: Date,
  endDate: Date,
  holidayDates: Set<string>,
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false,
  workingDays?: Set<number>
): number {
  const working = workingDays ?? DEFAULT_WORKING_DAYS
  let days = 0

  // Canonical local-day keys. Uses toLocalDayKey so BST-stored (UTC 23:00 of
  // the previous day) dates still resolve to the intended calendar day.
  const startStr = toLocalDayKey(startDate)
  const endStr = toLocalDayKey(endDate)

  const startIsWorking =
    working.has(localDayOfWeek(startDate)) && !holidayDates.has(startStr)
  const endIsWorking =
    working.has(localDayOfWeek(endDate)) && !holidayDates.has(endStr)

  // Iterate over canonical local days by advancing a UTC-constructed cursor.
  // We derive the starting UTC noon from the canonical key so we don't drift
  // across DST when stepping day-by-day.
  const [sy, sm, sd] = startStr.split('-').map(Number)
  const [ey, em, ed] = endStr.split('-').map(Number)
  let cursorUtc = Date.UTC(sy, sm - 1, sd, 12, 0, 0)
  const endUtc = Date.UTC(ey, em - 1, ed, 12, 0, 0)

  while (cursorUtc <= endUtc) {
    const cur = new Date(cursorUtc)
    const dayOfWeek = cur.getUTCDay()
    const mm = String(cur.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(cur.getUTCDate()).padStart(2, '0')
    const dateStr = `${cur.getUTCFullYear()}-${mm}-${dd}`
    if (working.has(dayOfWeek) && !holidayDates.has(dateStr)) {
      days++
    }
    cursorUtc += MS_PER_DAY
  }

  // Apply half-day adjustments — but only if the day in question was actually
  // counted. A half-day flag on a weekend or bank holiday is meaningless and
  // would otherwise double-discount (the day is already 0, then we'd take
  // another 0.5 off). When start === end (single-day request), both flags
  // mean one half-day, not two.
  const sameDay = startStr === endStr
  if (sameDay && halfDayStart && halfDayEnd) {
    if (startIsWorking && days > 0) days -= 0.5
  } else {
    if (halfDayStart && startIsWorking && days > 0) days -= 0.5
    if (halfDayEnd && endIsWorking && days > 0) days -= 0.5
  }

  return Math.max(0, days)
}

/**
 * Inclusive count of calendar days between two dates. DST-safe — operates
 * on the canonical local-day keys (so a leave that crosses a DST boundary
 * is still counted correctly), and rounds via floor on the day-key delta
 * rather than dividing milliseconds. (#197)
 *
 * @param start - First day (inclusive)
 * @param end   - Last day (inclusive)
 */
export function calendarDaysBetween(start: Date, end: Date): number {
  const startKey = toLocalDayKey(start)
  const endKey = toLocalDayKey(end)
  const [sy, sm, sd] = startKey.split('-').map(Number)
  const [ey, em, ed] = endKey.split('-').map(Number)
  // Use UTC noon to avoid DST jitter when computing the delta.
  const startUtc = Date.UTC(sy, sm - 1, sd, 12, 0, 0)
  const endUtc = Date.UTC(ey, em - 1, ed, 12, 0, 0)
  if (endUtc < startUtc) return 0
  return Math.round((endUtc - startUtc) / MS_PER_DAY) + 1
}

/**
 * Format a stored date as DD/MM/YYYY for server-rendered display, emails
 * and notifications. Server code runs in UTC on Cloudflare Workers, so a
 * raw toLocaleDateString('en-GB') renders BST-stored dates (UTC 23:00 of
 * the previous day) one day early. Formats from the canonical local day
 * key instead, so GMT- and BST-stored records both show the intended day.
 */
export function formatLocalDayGB(date: Date): string {
  const [y, m, d] = toLocalDayKey(date).split('-')
  return `${d}/${m}/${y}`
}

/**
 * Count working days using a custom working pattern.
 * This is a convenience wrapper around countBusinessDays that accepts
 * an array of working day numbers instead of a Set.
 *
 * @param startDate      - First day of the range
 * @param endDate        - Last day of the range
 * @param holidayDates   - Set of ISO date strings (YYYY-MM-DD) to exclude
 * @param workingDayNums - Array of dayOfWeek numbers (0=Sun..6=Sat) that are working days
 * @param halfDayStart   - Deduct 0.5 for a half-day on the start date
 * @param halfDayEnd     - Deduct 0.5 for a half-day on the end date
 */
export function countWorkingDays(
  startDate: Date,
  endDate: Date,
  holidayDates: Set<string>,
  workingDayNums: number[],
  halfDayStart: boolean = false,
  halfDayEnd: boolean = false
): number {
  return countBusinessDays(
    startDate,
    endDate,
    holidayDates,
    halfDayStart,
    halfDayEnd,
    new Set(workingDayNums)
  )
}

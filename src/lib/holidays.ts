import { prisma } from '@/lib/db'
import { getStandardHolidaysForYears, getCountryConfig } from '@/lib/countries'
import { toLocalDayKey } from '@/lib/business-days'

/**
 * Compute Easter Sunday for a given Gregorian year via the Anonymous
 * Gregorian algorithm. Returns a `YYYY-MM-DD` string.
 *
 * Verified against known values:
 *   2024 → 2024-03-31
 *   2025 → 2025-04-20
 *   2026 → 2026-04-05
 *   2027 → 2027-03-28
 *   2028 → 2028-04-16
 */
export function computeEasterSunday(year: number): string {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const rawMonth = h + l - 7 * m + 114
  const month = Math.floor(rawMonth / 31) // 3 = March, 4 = April
  const day = (rawMonth % 31) + 1
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

/**
 * Return Easter-related UK bank holidays for a year: Good Friday (Easter
 * Sunday - 2 days) and Easter Monday (Easter Sunday + 1 day).
 */
export function computeEasterHolidays(year: number): { goodFriday: string; easterMonday: string } {
  const easter = computeEasterSunday(year)
  const [y, m, d] = easter.split('-').map(Number)
  const easterUtc = Date.UTC(y, m - 1, d)
  const msPerDay = 24 * 60 * 60 * 1000
  const gf = new Date(easterUtc - 2 * msPerDay)
  const em = new Date(easterUtc + 1 * msPerDay)
  const fmt = (date: Date) =>
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`
  return { goodFriday: fmt(gf), easterMonday: fmt(em) }
}

/**
 * Lazily ensure the tenant's PublicHoliday table has all standard public holidays
 * from the country config that fall within the given calendar years. Existing rows
 * are matched on (tenantId, date) and left untouched (so admin-edited names survive).
 *
 * Existed because tenants onboarded before the country config grew newer years end
 * up missing 2027/2028 dates, which made dashboards under-count "+ N bank holidays".
 * This runs cheaply on dashboard/balance loads and self-heals stale tenants.
 */
export async function ensureStandardHolidaysForYears(
  tenantId: string,
  countryCode: string,
  years: number[]
): Promise<void> {
  if (years.length === 0) return

  const standard = getStandardHolidaysForYears(countryCode, years)
  if (standard.length === 0) return

  // Pull existing rows for the years in question and key them by ISO date so we can
  // skip any date that's already present (regardless of name).
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  const rangeStart = new Date(`${minYear}-01-01T00:00:00.000Z`)
  const rangeEnd = new Date(`${maxYear}-12-31T23:59:59.999Z`)

  const existing = await prisma.publicHoliday.findMany({
    where: { tenantId, date: { gte: rangeStart, lte: rangeEnd } },
    select: { date: true },
  })
  // Normalise each stored date to its canonical local-day key. A holiday
  // edited in a BST window can be written as `2026-03-31T23:00Z` but
  // represents 1 Apr — without normalisation the dedupe would miss it and
  // a duplicate row would be inserted on the next dashboard hit.
  const existingKeys = new Set(existing.map((h) => toLocalDayKey(h.date)))

  const toCreate = standard.filter((h) => !existingKeys.has(h.date))
  if (toCreate.length === 0) return

  await prisma.publicHoliday.createMany({
    data: toCreate.map((h) => ({
      name: h.name,
      date: new Date(h.date),
      country: countryCode,
      tenantId,
    })),
  })
}

/**
 * Ensure standard holidays exist for the leave year that contains `referenceDate`
 * (and the next one), based on the tenant's country + leaveYearStartMonth.
 */
export async function ensureStandardHolidaysForLeaveYear(
  tenantId: string,
  countryCode: string,
  leaveYearStartMonth: number,
  referenceDate: Date = new Date()
): Promise<void> {
  // Determine the leave year that referenceDate currently sits in
  const refYear = referenceDate.getFullYear()
  const refMonth = referenceDate.getMonth() + 1
  const leaveYearStart = refMonth >= leaveYearStartMonth ? refYear : refYear - 1

  // The leave year spans calendar years leaveYearStart and leaveYearStart+1
  // (unless leaveYearStartMonth is January, in which case it's just leaveYearStart).
  // Also seed the next leave year so the upcoming roll-over is covered.
  const yearsNeeded = new Set<number>()
  yearsNeeded.add(leaveYearStart)
  if (leaveYearStartMonth !== 1) yearsNeeded.add(leaveYearStart + 1)
  yearsNeeded.add(leaveYearStart + 1)
  if (leaveYearStartMonth !== 1) yearsNeeded.add(leaveYearStart + 2)

  // Skip countries with no config
  const config = getCountryConfig(countryCode)
  if (!config) return

  await ensureStandardHolidaysForYears(tenantId, countryCode, [...yearsNeeded])
}

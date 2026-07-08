import { prisma } from '@/lib/db'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'

export interface BradfordResult {
  score: number
  spells: number
  totalDays: number
  riskLevel: string
  riskColor: string
}

const MS_PER_DAY = 24 * 60 * 60 * 1000
const DEFAULT_WORKING_DAYS = [1, 2, 3, 4, 5] // Mon-Fri

export function getRisk(score: number): { riskLevel: string; riskColor: string } {
  if (score < 50) return { riskLevel: 'Low', riskColor: 'text-green-600' }
  if (score < 125) return { riskLevel: 'Medium', riskColor: 'text-amber-600' }
  if (score < 400) return { riskLevel: 'High', riskColor: 'text-orange-600' }
  return { riskLevel: 'Critical', riskColor: 'text-red-600' }
}

/**
 * Number of calendar days from a to b (inclusive semantics depend on caller).
 * Derived from the canonical local-day key so BST-stored dates (UTC 23:00
 * of the previous day) still produce the correct calendar delta.
 */
export function calendarDays(a: Date, b: Date): number {
  const keyA = toLocalDayKey(a)
  const keyB = toLocalDayKey(b)
  const [ay, am, ad] = keyA.split('-').map(Number)
  const [by, bm, bd] = keyB.split('-').map(Number)
  const aUTC = Date.UTC(ay, am - 1, ad)
  const bUTC = Date.UTC(by, bm - 1, bd)
  return Math.round((bUTC - aUTC) / MS_PER_DAY)
}

/**
 * Compute a Bradford Factor result from a list of sickness requests, using
 * the employee's working pattern + the tenant's holidays so that weekends
 * and bank holidays are NOT counted as sickness and part-timers aren't
 * penalised for non-working days.
 */
export function computeFromRequests(
  requests: { startDate: Date; endDate: Date; halfDayStart?: boolean; halfDayEnd?: boolean }[],
  holidayDates: Set<string> = new Set(),
  workingDays: Set<number> = new Set(DEFAULT_WORKING_DAYS)
): BradfordResult {
  if (requests.length === 0) {
    return { score: 0, spells: 0, totalDays: 0, riskLevel: 'Low', riskColor: 'text-green-600' }
  }

  let spells = 0
  let totalDays = 0

  for (let i = 0; i < requests.length; i++) {
    const start = requests[i].startDate
    const end = requests[i].endDate
    const days = countBusinessDays(
      start,
      end,
      holidayDates,
      requests[i].halfDayStart ?? false,
      requests[i].halfDayEnd ?? false,
      workingDays
    )

    // Only count this request as a spell if it contributes any working days.
    // A 'sickness' that falls entirely on a weekend/bank holiday shouldn't
    // inflate the score.
    if (days <= 0) continue
    totalDays += days

    if (spells === 0) {
      spells = 1
    } else {
      // Compare against the previous contributing spell's end date.
      const prevEnd = requests[i - 1].endDate
      const gapDays = calendarDays(prevEnd, start)
      if (gapDays > 1) spells++
    }
  }

  const score = spells * spells * totalDays
  return { score, spells, totalDays, ...getRisk(score) }
}

/**
 * Return a Set of tenant holiday date keys (YYYY-MM-DD) for use with
 * countBusinessDays. Uses canonical local-day normalisation on stored rows.
 */
async function loadHolidaySet(tenantId: string, from: Date, to: Date): Promise<Set<string>> {
  const holidays = await prisma.publicHoliday.findMany({
    where: { tenantId, date: { gte: from, lte: to } },
    select: { date: true },
  })
  return new Set(holidays.map((h: { date: Date }) => toLocalDayKey(h.date)))
}

/**
 * Load an employee's working pattern as a Set of dayOfWeek numbers
 * (0=Sun..6=Sat). Falls back to Mon-Fri if no pattern exists.
 */
async function loadWorkingDays(employeeId: string): Promise<Set<number>> {
  const pattern = await prisma.workingTimePattern.findMany({
    where: { employeeId },
    select: { dayOfWeek: true, isWorkingDay: true },
  })
  if (pattern.length === 0) return new Set(DEFAULT_WORKING_DAYS)
  const days = pattern
    .filter((p: { isWorkingDay: boolean }) => p.isWorkingDay)
    .map((p: { dayOfWeek: number }) => p.dayOfWeek)
  if (days.length === 0) return new Set(DEFAULT_WORKING_DAYS)
  return new Set(days)
}

/**
 * Rolling 12-month window anchored to "now", computed in UTC to avoid any
 * DST drift from `setDate(-364)`. Exactly 365 days.
 */
function oneYearAgo(): Date {
  return new Date(Date.now() - 365 * MS_PER_DAY)
}

export async function calculateBradfordFactor(
  tenantId: string,
  employeeId: string
): Promise<BradfordResult> {
  // System-type lookup, not name matching — renaming "Sickness" to "Wellbeing"
  // should not obliterate scores across the directory.
  const sickPolicies = await prisma.leavePolicy.findMany({
    where: { tenantId, isSystemType: 'sickness' },
    select: { id: true },
  })

  if (sickPolicies.length === 0) {
    return { score: 0, spells: 0, totalDays: 0, riskLevel: 'Low', riskColor: 'text-green-600' }
  }

  const windowStart = oneYearAgo()
  const now = new Date()

  const requests = await prisma.leaveRequest.findMany({
    where: {
      tenantId, // defense-in-depth; previously only transitive via policyId
      employeeId,
      policyId: { in: sickPolicies.map((p) => p.id) },
      status: 'APPROVED',
      startDate: { gte: windowStart },
    },
    orderBy: { startDate: 'asc' },
    select: {
      startDate: true,
      endDate: true,
      halfDayStart: true,
      halfDayEnd: true,
    },
  })

  const [holidaySet, workingDays] = await Promise.all([
    loadHolidaySet(tenantId, windowStart, now),
    loadWorkingDays(employeeId),
  ])

  return computeFromRequests(requests, holidaySet, workingDays)
}

export async function calculateBradfordFactorBatch(
  tenantId: string,
  employeeIds: string[]
): Promise<Map<string, BradfordResult>> {
  const results = new Map<string, BradfordResult>()

  const sickPolicies = await prisma.leavePolicy.findMany({
    where: { tenantId, isSystemType: 'sickness' },
    select: { id: true },
  })

  if (sickPolicies.length === 0) {
    const empty: BradfordResult = { score: 0, spells: 0, totalDays: 0, riskLevel: 'Low', riskColor: 'text-green-600' }
    for (const id of employeeIds) results.set(id, empty)
    return results
  }

  const windowStart = oneYearAgo()
  const now = new Date()

  const allRequests = await prisma.leaveRequest.findMany({
    where: {
      tenantId, // defense-in-depth
      employeeId: { in: employeeIds },
      policyId: { in: sickPolicies.map((p) => p.id) },
      status: 'APPROVED',
      startDate: { gte: windowStart },
    },
    orderBy: { startDate: 'asc' },
    select: {
      employeeId: true,
      startDate: true,
      endDate: true,
      halfDayStart: true,
      halfDayEnd: true,
    },
  })

  const byEmployee = new Map<string, typeof allRequests>()
  for (const req of allRequests) {
    const existing = byEmployee.get(req.employeeId) || []
    existing.push(req)
    byEmployee.set(req.employeeId, existing)
  }

  // Load holidays once for the tenant window (shared across all employees).
  const holidaySet = await loadHolidaySet(tenantId, windowStart, now)

  // Load working patterns for the whole cohort in a single query so batch
  // calculation stays O(1) round-trips regardless of employee count.
  const patterns = await prisma.workingTimePattern.findMany({
    where: { employeeId: { in: employeeIds } },
    select: { employeeId: true, dayOfWeek: true, isWorkingDay: true },
  })
  const workingDaysByEmployee = new Map<string, Set<number>>()
  for (const p of patterns) {
    if (!p.isWorkingDay) continue
    const existing = workingDaysByEmployee.get(p.employeeId) ?? new Set<number>()
    existing.add(p.dayOfWeek)
    workingDaysByEmployee.set(p.employeeId, existing)
  }

  for (const empId of employeeIds) {
    const workingDays = workingDaysByEmployee.get(empId) ?? new Set(DEFAULT_WORKING_DAYS)
    const reqsForEmp = byEmployee.get(empId) || []
    results.set(empId, computeFromRequests(reqsForEmp, holidaySet, workingDays))
  }

  return results
}

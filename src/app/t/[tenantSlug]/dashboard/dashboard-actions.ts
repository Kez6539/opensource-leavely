'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'

export interface TeamAnalyticsData {
  absenceRate: number // percentage of working days lost this month (annual + sickness)
  absenceDaysThisMonth: number
  possibleWorkingDaysThisMonth: number // per-employee working-pattern-aware total
  headcount: number
  departmentBreakdown: Array<{ department: string; count: number }>
  topSickness: Array<{ name: string; days: number; employeeId: string }>
  upcomingAbsences: {
    next7: { count: number; days: number }
    next14: { count: number; days: number }
    next30: { count: number; days: number }
  }
  topAbsentees: Array<{ name: string; days: number; employeeId: string }>
}

const POLICY_COLORS: Record<string, string> = {
  annual: '#3b82f6',   // blue-500
  holiday: '#3b82f6',  // blue-500
  sick: '#ef4444',     // red-500
  sickness: '#ef4444', // red-500
  maternity: '#ec4899', // pink-500
  paternity: '#8b5cf6', // violet-500
  compassionate: '#f59e0b', // amber-500
  unpaid: '#6b7280',   // gray-500
  toil: '#10b981',     // emerald-500
  lateness: '#f97316',  // orange-500
}

function getPolicyColor(policyName: string): string {
  const lower = policyName.toLowerCase()
  for (const [key, color] of Object.entries(POLICY_COLORS)) {
    if (lower.includes(key)) return color
  }
  return '#6366f1' // indigo-500 fallback
}

export async function getTeamAnalytics(tenantSlug: string): Promise<TeamAnalyticsData | null> {
  const { tenant, membership } = await requireTenant(tenantSlug)
  const canApprove = isAtLeast(membership, 'MANAGER')

  if (!canApprove) return null

  const tenantId = tenant.id
  const now = new Date()

  // Start and end of current month
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  // Day-precision "today" so the next 7/14/30 day windows include leave that
  // starts at midnight UTC today (otherwise it gets dropped after midday UTC).
  const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

  // Dates for upcoming absence counts
  const in7Days = new Date(startOfTodayUTC)
  in7Days.setUTCDate(in7Days.getUTCDate() + 7)
  const in14Days = new Date(startOfTodayUTC)
  in14Days.setUTCDate(in14Days.getUTCDate() + 14)
  const in30Days = new Date(startOfTodayUTC)
  in30Days.setUTCDate(in30Days.getUTCDate() + 30)

  // Start of leave year for top absentees (uses tenant's leave year start month)
  const leaveYearMonth = tenant.leaveYearStartMonth - 1 // 0-indexed (April = 3)
  const yearStart = now.getMonth() >= leaveYearMonth
    ? new Date(now.getFullYear(), leaveYearMonth, 1)
    : new Date(now.getFullYear() - 1, leaveYearMonth, 1)
  const yearEnd = new Date(yearStart.getFullYear() + 1, yearStart.getMonth(), 0, 23, 59, 59, 999)
  // Outer end of every range we'll do business-day math against — used to
  // size the holiday fetch so a holiday in October doesn't get missed when
  // we're counting absence in September. Previously the holiday fetch was
  // current-month-only, so the holidaySet was wrong for the leave-year-wide
  // calculations below. (Round 5 #4.)
  const farthestEnd = in30Days > yearEnd ? in30Days : yearEnd

  const [
    activeEmployees,
    approvedThisMonth,
    publicHolidays,
    upcomingRequests,
    approvedThisYear,
    sicknessThisYear,
  ] = await Promise.all([
    // Active employees with department + working pattern for per-employee
    // denominator math (#63). Part-timers should count fewer possible days.
    prisma.employee.findMany({
      where: { tenantId, status: 'ACTIVE' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        department: true,
        workingPattern: { select: { dayOfWeek: true, isWorkingDay: true } },
      },
    }),
    // Approved leave overlapping this month. Include sickness (isSystemType
    // 'sickness') in the absence rate; exclude lateness (single-day records
    // that would spike the rate and don't represent a day off) and TOIL/
    // compassionate etc are included via the null isSystemType already.
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        startDate: { lte: monthEnd },
        endDate: { gte: monthStart },
        NOT: { policy: { isSystemType: 'lateness' } },
      },
      include: { policy: true, employee: true },
    }),
    // Public holidays for the entire window we'll do business-day math
    // against — leave year start through the farthest upcoming-window end.
    // The previous current-month-only fetch silently broke the holiday
    // exclusion for leave-year-wide top sickness / top absentees / and the
    // upcoming windows that span future months. (Round 5 #4.)
    prisma.publicHoliday.findMany({
      where: {
        tenantId,
        date: { gte: yearStart, lte: farthestEnd },
      },
    }),
    // Upcoming approved leave (next 30 days, including today) — excludes
    // lateness entirely. We fetch the full window once and bucket in JS.
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        startDate: { gte: startOfTodayUTC, lte: in30Days },
        NOT: { policy: { isSystemType: 'lateness' } },
      },
      include: { policy: true },
    }),
    // Approved leave overlapping this leave year that has ALREADY STARTED
    // (for top absentees, not lateness). Future-booked leave is excluded
    // so booking 10 days for next quarter doesn't immediately push someone
    // up the "most absence days this year" ranking before they've taken
    // any. (Round 5 #5.)
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        endDate: { gte: yearStart },
        startDate: { lte: now },
        NOT: { policy: { isSystemType: 'lateness' } },
      },
      include: { policy: true, employee: true },
    }),
    // Approved sickness overlapping this leave year that has already started
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        endDate: { gte: yearStart },
        startDate: { lte: now },
        OR: [
          { policy: { isSystemType: 'sickness' } },
          { policy: { name: { contains: 'sick', mode: 'insensitive' } } },
        ],
      },
      include: { policy: true, employee: true },
    }),
  ])

  const headcount = activeEmployees.length

  // Holiday set for business day calculations. toLocalDayKey, NOT raw
  // toISOString().split — BST-stored dates (UTC 23:00 of the previous day)
  // need to resolve to the intended local calendar day. (Round 5 #4.)
  // Gated on deductBankHolidays to mirror calculateLeaveDays: when the
  // tenant counts bank holidays as leave days, the balance deducts them,
  // so dashboard day counts (and the possible-working-days denominator)
  // must include them too. Previously excluded unconditionally, which
  // under-counted every metric for deductBankHolidays=true tenants.
  const holidaySet: Set<string> = tenant.deductBankHolidays
    ? new Set()
    : new Set(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        publicHolidays.map((h: any) => toLocalDayKey(h.date))
      )

  // Build a lookup of each employee's working pattern so we can compute
  // possible days per-employee (#63). An empty pattern defaults to Mon-Fri.
  const employeePatternMap = new Map<string, Set<number> | undefined>()
  for (const emp of activeEmployees) {
    if (emp.workingPattern.length > 0) {
      const days = new Set<number>(
        emp.workingPattern
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((p: any) => p.isWorkingDay)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((p: any) => p.dayOfWeek as number)
      )
      employeePatternMap.set(emp.id, days.size > 0 ? days : undefined)
    } else {
      employeePatternMap.set(emp.id, undefined)
    }
  }

  // Possible working days this month = sum over each active employee of
  // countBusinessDays(monthStart, monthEnd, holidaySet, _, _, theirPattern).
  // Part-timers contribute fewer days; full-timers contribute the default.
  let possibleWorkingDaysThisMonth = 0
  for (const emp of activeEmployees) {
    possibleWorkingDaysThisMonth += countBusinessDays(
      monthStart,
      monthEnd,
      holidaySet,
      false,
      false,
      employeePatternMap.get(emp.id)
    )
  }

  // Calculate absence days this month (includes sickness, excludes lateness).
  // Use the booking employee's working pattern so a part-timer with 3 working
  // days off isn't counted as 5.
  let absenceDaysThisMonth = 0
  const policyDaysMap = new Map<string, { name: string; days: number }>()

  for (const req of approvedThisMonth) {
    // Clamp to the month boundaries
    const effectiveStart = req.startDate > monthStart ? req.startDate : monthStart
    const effectiveEnd = req.endDate < monthEnd ? req.endDate : monthEnd
    const days = countBusinessDays(
      effectiveStart,
      effectiveEnd,
      holidaySet,
      req.halfDayStart && req.startDate >= monthStart,
      req.halfDayEnd && req.endDate <= monthEnd,
      employeePatternMap.get(req.employeeId)
    )
    absenceDaysThisMonth += days

    // Aggregate by policy type
    const existing = policyDaysMap.get(req.policyId)
    if (existing) {
      existing.days += days
    } else {
      policyDaysMap.set(req.policyId, { name: req.policy.name, days })
    }
  }

  // Absence rate = (absence days / possible working days) * 100
  const absenceRate = possibleWorkingDaysThisMonth > 0
    ? (absenceDaysThisMonth / possibleWorkingDaysThisMonth) * 100
    : 0

  // Department breakdown
  const deptMap = new Map<string, number>()
  for (const emp of activeEmployees) {
    const dept = emp.department || 'Unassigned'
    deptMap.set(dept, (deptMap.get(dept) || 0) + 1)
  }
  const departmentBreakdown = Array.from(deptMap.entries())
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count)

  // Top sickness this leave year (clamp to [yearStart, today]). Clamping
  // the END to today means an in-progress sickness only counts the days
  // already taken — the ranking reflects actual absence, not "expected
  // absence if this person stays sick the full booked length".
  const sickMap = new Map<string, { name: string; days: number; employeeId: string }>()
  const todayClamp = startOfTodayUTC
  for (const req of sicknessThisYear) {
    const empId = req.employeeId
    const effectiveStart = req.startDate > yearStart ? req.startDate : yearStart
    const effectiveEnd = req.endDate < todayClamp ? req.endDate : todayClamp
    if (effectiveEnd < effectiveStart) continue
    const days = countBusinessDays(
      effectiveStart,
      effectiveEnd,
      holidaySet,
      req.halfDayStart && req.startDate >= yearStart,
      req.halfDayEnd && req.endDate <= todayClamp,
      employeePatternMap.get(empId)
    )
    const existing = sickMap.get(empId)
    if (existing) {
      existing.days += days
    } else {
      sickMap.set(empId, {
        name: `${req.employee.firstName} ${req.employee.lastName}`,
        days,
        employeeId: empId,
      })
    }
  }
  const topSickness = Array.from(sickMap.values())
    .sort((a, b) => b.days - a.days)
    .slice(0, 5)
    .map(e => ({ ...e, days: Math.round(e.days * 10) / 10 }))

  // Top absentees this year — sum ALL absence (including sickness) by
  // isSystemType (#15). Lateness is already excluded by the Prisma query.
  // We include sickness because the card claims "most absence days this year"
  // and users expect the worst offenders to surface even if they're off sick.
  // Clamp to [yearStart, today] so future-booked leave doesn't inflate
  // someone's "absence so far this year" ranking. (Round 5 #5.)
  const employeeAbsenceMap = new Map<string, { name: string; days: number; employeeId: string }>()
  for (const req of approvedThisYear) {
    const empId = req.employeeId
    const effectiveStart = req.startDate > yearStart ? req.startDate : yearStart
    const effectiveEnd = req.endDate < todayClamp ? req.endDate : todayClamp
    if (effectiveEnd < effectiveStart) continue
    const days = countBusinessDays(
      effectiveStart,
      effectiveEnd,
      holidaySet,
      req.halfDayStart && req.startDate >= yearStart,
      req.halfDayEnd && req.endDate <= todayClamp,
      employeePatternMap.get(empId)
    )
    const existing = employeeAbsenceMap.get(empId)
    if (existing) {
      existing.days += days
    } else {
      employeeAbsenceMap.set(empId, {
        name: `${req.employee.firstName} ${req.employee.lastName}`,
        days,
        employeeId: empId,
      })
    }
  }
  const topAbsentees = Array.from(employeeAbsenceMap.values())
    .sort((a, b) => b.days - a.days)
    .slice(0, 5)
    .map(e => ({ ...e, days: Math.round(e.days * 10) / 10 }))

  // Upcoming tiles — sum business days of annual leave only for each
  // window, plus a request count. Lateness is already excluded by the query
  // (which includes sickness), but the "Upcoming Absences" tile is aimed at
  // "who's going to be out" so we include sickness too. Count + days both
  // surfaced so the tile can show "3 requests, 12 days".
  const bucket = { next7: { count: 0, days: 0 }, next14: { count: 0, days: 0 }, next30: { count: 0, days: 0 } }
  for (const req of upcomingRequests) {
    // Treat lateness records as already excluded by the query; defensively
    // skip any that slip through.
    if (req.policy.isSystemType === 'lateness') continue
    const days = countBusinessDays(
      req.startDate,
      req.endDate,
      holidaySet,
      req.halfDayStart,
      req.halfDayEnd,
      employeePatternMap.get(req.employeeId)
    )
    if (req.startDate <= in7Days) {
      bucket.next7.count += 1
      bucket.next7.days += days
    }
    if (req.startDate <= in14Days) {
      bucket.next14.count += 1
      bucket.next14.days += days
    }
    if (req.startDate <= in30Days) {
      bucket.next30.count += 1
      bucket.next30.days += days
    }
  }

  return {
    absenceRate: Math.round(absenceRate * 10) / 10,
    absenceDaysThisMonth: Math.round(absenceDaysThisMonth * 10) / 10,
    possibleWorkingDaysThisMonth,
    headcount,
    departmentBreakdown,
    topSickness,
    upcomingAbsences: {
      next7: { count: bucket.next7.count, days: Math.round(bucket.next7.days * 10) / 10 },
      next14: { count: bucket.next14.count, days: Math.round(bucket.next14.days * 10) / 10 },
      next30: { count: bucket.next30.count, days: Math.round(bucket.next30.days * 10) / 10 },
    },
    topAbsentees,
  }
}

export interface MonthlySicknessRow {
  employeeId: string
  name: string
  days: number
}

export interface MonthlySicknessSummary {
  monthLabel: string
  rows: MonthlySicknessRow[]
}

// Per-employee sickness day count for the current calendar month — all
// staff with > 0 sick days, sorted by name. Designed for copy/paste into
// payroll/accountant emails.
export async function getMonthlySicknessSummary(
  tenantSlug: string
): Promise<MonthlySicknessSummary | null> {
  const { tenant, membership } = await requireTenant(tenantSlug)
  if (!isAtLeast(membership, 'MANAGER')) return null

  const tenantId = tenant.id
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  const monthLabel = monthStart.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })

  const [activeEmployees, sicknessThisMonth, publicHolidays] = await Promise.all([
    prisma.employee.findMany({
      where: { tenantId, status: 'ACTIVE' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        workingPattern: { select: { dayOfWeek: true, isWorkingDay: true } },
      },
    }),
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        startDate: { lte: monthEnd },
        endDate: { gte: monthStart },
        OR: [
          { policy: { isSystemType: 'sickness' } },
          { policy: { name: { contains: 'sick', mode: 'insensitive' } } },
        ],
      },
      include: { policy: true },
    }),
    prisma.publicHoliday.findMany({
      where: { tenantId, date: { gte: monthStart, lte: monthEnd } },
      select: { date: true },
    }),
  ])

  // Gated on deductBankHolidays — mirrors calculateLeaveDays (see
  // getTeamAnalytics above for the full rationale).
  const holidaySet = tenant.deductBankHolidays
    ? new Set<string>()
    : new Set(publicHolidays.map((h) => toLocalDayKey(h.date)))

  const employeePatternMap = new Map<string, Set<number> | undefined>()
  const nameMap = new Map<string, string>()
  for (const emp of activeEmployees) {
    nameMap.set(emp.id, `${emp.firstName} ${emp.lastName}`)
    if (emp.workingPattern.length > 0) {
      const days = new Set<number>(
        emp.workingPattern.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek)
      )
      employeePatternMap.set(emp.id, days.size > 0 ? days : undefined)
    } else {
      employeePatternMap.set(emp.id, undefined)
    }
  }

  const daysByEmployee = new Map<string, number>()
  for (const req of sicknessThisMonth) {
    const effStart = req.startDate > monthStart ? req.startDate : monthStart
    const effEnd = req.endDate < monthEnd ? req.endDate : monthEnd
    const days = countBusinessDays(
      effStart,
      effEnd,
      holidaySet,
      req.halfDayStart && req.startDate >= monthStart,
      req.halfDayEnd && req.endDate <= monthEnd,
      employeePatternMap.get(req.employeeId)
    )
    if (days <= 0) continue
    daysByEmployee.set(
      req.employeeId,
      (daysByEmployee.get(req.employeeId) ?? 0) + days
    )
  }

  // Include EVERY active employee, even those with 0 sick days, so the
  // manager can copy a complete roll-call to payroll. Sort by name.
  const rows: MonthlySicknessRow[] = activeEmployees
    .map((emp) => ({
      employeeId: emp.id,
      name: nameMap.get(emp.id) ?? `${emp.firstName} ${emp.lastName}`,
      days: Math.round((daysByEmployee.get(emp.id) ?? 0) * 10) / 10,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return { monthLabel, rows }
}

export interface MySicknessTrendBucket {
  monthKey: string // YYYY-MM
  monthLabel: string // e.g. "May"
  yearLabel: string // e.g. "2026"
  days: number
}

// 12-month rolling sickness for the calling user's own employee record only.
// Always self-scoped — never returns another employee's data, regardless of
// role. Returns null if the user has no Employee record in this tenant
// (e.g. solo OWNER who hasn't added themselves to the directory yet).
export async function getMySicknessTrend(
  tenantSlug: string
): Promise<MySicknessTrendBucket[] | null> {
  const { tenant, user } = await requireTenant(tenantSlug)
  const tenantId = tenant.id

  const myEmployee = await prisma.employee.findFirst({
    where: { tenantId, userId: user.userId },
    select: {
      id: true,
      workingPattern: { select: { dayOfWeek: true, isWorkingDay: true } },
    },
  })
  if (!myEmployee) return null

  const now = new Date()
  // 12 months ending with the current month, oldest → newest.
  const buckets: MySicknessTrendBucket[] = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    buckets.push({
      monthKey: `${d.getFullYear()}-${mm}`,
      monthLabel: d.toLocaleDateString('en-GB', { month: 'short' }),
      yearLabel: String(d.getFullYear()),
      days: 0,
    })
  }
  const windowStart = new Date(now.getFullYear(), now.getMonth() - 11, 1)
  const windowEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  const [requests, publicHolidays] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        employeeId: myEmployee.id,
        status: 'APPROVED',
        startDate: { lte: windowEnd },
        endDate: { gte: windowStart },
        OR: [
          { policy: { isSystemType: 'sickness' } },
          { policy: { name: { contains: 'sick', mode: 'insensitive' } } },
        ],
      },
      include: { policy: true },
    }),
    prisma.publicHoliday.findMany({
      where: { tenantId, date: { gte: windowStart, lte: windowEnd } },
      select: { date: true },
    }),
  ])

  // Gated on deductBankHolidays — mirrors calculateLeaveDays (see
  // getTeamAnalytics above for the full rationale).
  const holidaySet = tenant.deductBankHolidays
    ? new Set<string>()
    : new Set(publicHolidays.map((h) => toLocalDayKey(h.date)))
  const pattern: Set<number> | undefined =
    myEmployee.workingPattern.length > 0
      ? (() => {
          const s = new Set<number>(
            myEmployee.workingPattern.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek)
          )
          return s.size > 0 ? s : undefined
        })()
      : undefined

  // Walk each month in the window, clamp every request to the month, count
  // business days using the employee's own pattern.
  for (const bucket of buckets) {
    const [yStr, mStr] = bucket.monthKey.split('-')
    const y = Number(yStr)
    const m = Number(mStr) - 1
    const mStart = new Date(y, m, 1)
    const mEnd = new Date(y, m + 1, 0, 23, 59, 59, 999)
    let total = 0
    for (const req of requests) {
      if (req.startDate > mEnd || req.endDate < mStart) continue
      const effStart = req.startDate > mStart ? req.startDate : mStart
      const effEnd = req.endDate < mEnd ? req.endDate : mEnd
      total += countBusinessDays(
        effStart,
        effEnd,
        holidaySet,
        req.halfDayStart && req.startDate >= mStart,
        req.halfDayEnd && req.endDate <= mEnd,
        pattern
      )
    }
    bucket.days = Math.round(total * 10) / 10
  }

  return buckets
}


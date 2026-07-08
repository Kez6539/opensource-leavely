'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, getDirectReportIds } from '@/lib/rbac'
import { computeFromRequests } from '@/app/t/[tenantSlug]/employees/bradford-factor'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'

interface ReportFilters {
  startDate?: string
  endDate?: string
  employeeId?: string
}

/**
 * `null` means no restriction (ADMIN+). An array (possibly empty) means the
 * caller is a non-admin MANAGER and may only see those employee IDs.
 */
type VisibleEmployeeIds = string[] | null

/**
 * Apply the caller's visible-employee scope to a report `where` clause.
 * If the caller already specified a single employee filter, verifies it is
 * visible (otherwise returns false so the caller can short-circuit).
 * Otherwise, adds `<field>: { in: visibleEmployeeIds }` to the where clause.
 */
function applyVisibilityToEmployeeIdField(
  where: Record<string, unknown>,
  filters: ReportFilters,
  visibleEmployeeIds: VisibleEmployeeIds,
  employeeIdField: string = 'employeeId'
): boolean {
  if (visibleEmployeeIds === null) return true
  if (filters.employeeId) {
    return visibleEmployeeIds.includes(filters.employeeId)
  }
  where[employeeIdField] = { in: visibleEmployeeIds }
  return true
}

function parseDateRange(filters: ReportFilters, leaveYearStartMonth = 4) {
  let startDate: Date
  if (filters.startDate) {
    startDate = new Date(filters.startDate)
  } else {
    // Default to tenant's leave year start (e.g. April 1st)
    const now = new Date()
    const yearMonth = leaveYearStartMonth - 1 // 0-indexed
    startDate = now.getMonth() >= yearMonth
      ? new Date(now.getFullYear(), yearMonth, 1)
      : new Date(now.getFullYear() - 1, yearMonth, 1)
  }
  const endDate = filters.endDate
    ? new Date(filters.endDate + 'T23:59:59.999Z')
    : new Date()
  return { startDate, endDate }
}

// ── Absence report ──
async function absenceReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'policy', label: 'Absence Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'status', label: 'Status' },
    { key: 'reason', label: 'Reason' },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  // Overlap semantics: include leave that straddles the period boundary.
  // Previously used `startDate >= start AND endDate <= end` which silently
  // dropped a leave from 30 Mar to 5 Apr from BOTH March and April reports.
  const where: Record<string, unknown> = {
    tenantId,
    startDate: { lte: endDate },
    endDate: { gte: startDate },
    status: { in: ['APPROVED', 'PENDING'] },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const requests = await prisma.leaveRequest.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true, policy: true },
    orderBy: [{ employee: { lastName: 'asc' } }, { startDate: 'asc' }],
  })

  return {
    columns,
    rows: requests.map((r) => ({
      employee: `${r.employee.firstName} ${r.employee.lastName}`,
      policy: r.policy.name,
      startDate: r.startDate.toLocaleDateString('en-GB'),
      endDate: r.endDate.toLocaleDateString('en-GB'),
      status: r.status,
      reason: r.reason || '',
    })),
  }
}

// ── Annual leave summary ──
async function annualLeaveSummaryReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'policy', label: 'Leave Type' },
    { key: 'allowance', label: 'Allowance', align: 'right' as const },
    { key: 'used', label: 'Used', align: 'right' as const },
    { key: 'pending', label: 'Pending', align: 'right' as const },
    { key: 'remaining', label: 'Remaining', align: 'right' as const },
    { key: 'carryover', label: 'Carryover', align: 'right' as const },
  ]

  // Resolve the leave year from the filter using the tenant's leave-year
  // start month, NOT the calendar year. LeaveBalance.year is keyed on the
  // leave year (e.g. for an April-start tenant, March 2027 falls in leave
  // year 2026). Using `new Date(filter).getFullYear()` returned 2027 and
  // missed the row entirely — the report came back empty for any tenant
  // whose leave year didn't align with January.
  const { getLeaveYear } = await import('@/lib/leave-year')
  const refDate = filters.startDate ? new Date(filters.startDate) : new Date()
  const year = getLeaveYear(_leaveYearStartMonth ?? 1, refDate)

  const where: Record<string, unknown> = {
    tenantId,
    year,
    // Only include real annual-leave-style policies. Sickness/lateness
    // (isSystemType !== null) have allowance 0 and pollute the report.
    policy: { isSystemType: null },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const balances = await prisma.leaveBalance.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true, policy: true },
    orderBy: [{ employee: { lastName: 'asc' } }],
  })

  return {
    columns,
    // Convention: `LeaveBalance.allowance` ALREADY includes any carried-over
    // days from the previous leave year (see balance-actions.ts ~line 133:
    // `allowance += carryoverDays`). The previous report computed
    // `allowance + carryoverDays - used - pending` which double-counted
    // carryover and showed employees with MORE remaining than they
    // actually had. We now return `allowance - used - pending` to match
    // the dashboard tile and the leave balances page, and show carryover
    // as a separate column for context.
    rows: balances.map((b) => ({
      employee: `${b.employee.firstName} ${b.employee.lastName}`,
      policy: b.policy.name,
      allowance: b.allowance,
      used: b.used,
      pending: b.pending,
      remaining: Number((b.allowance - b.used - b.pending).toFixed(1)),
      carryover: b.carryoverDays,
    })),
  }
}

// ── Employee details (single employee) ──
async function employeeDetailsReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'department', label: 'Department' },
    { key: 'phone', label: 'Phone' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'manager', label: 'Manager' },
    { key: 'status', label: 'Status' },
  ]

  const where: Record<string, unknown> = { tenantId, status: 'ACTIVE' }
  if (filters.employeeId) where.id = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds, 'id')) {
    return { columns, rows: [] }
  }

  const employees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { manager: { select: { firstName: true, lastName: true } } },
    orderBy: { lastName: 'asc' },
  })

  return {
    columns,
    rows: employees.map((e) => ({
      name: `${e.firstName} ${e.lastName}`,
      email: e.email || '',
      jobTitle: e.jobTitle || '',
      department: e.department || '',
      phone: e.phone || '',
      startDate: e.startDate ? e.startDate.toLocaleDateString('en-GB') : '',
      manager: e.manager ? `${e.manager.firstName} ${e.manager.lastName}` : '',
      status: e.status,
    })),
  }
}

// ── Employee information (personal + contract) ──
async function employeeInformationReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'address', label: 'Address' },
    { key: 'phone', label: 'Phone' },
    { key: 'emergencyName', label: 'Emergency Contact' },
    { key: 'emergencyPhone', label: 'Emergency Phone' },
    { key: 'hoursPerDay', label: 'Hours/Day', align: 'right' as const },
  ]

  const where: Record<string, unknown> = { tenantId }
  if (filters.employeeId) where.id = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds, 'id')) {
    return { columns, rows: [] }
  }

  const employees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { manager: { select: { firstName: true, lastName: true } } },
    orderBy: { lastName: 'asc' },
  })

  return {
    columns,
    rows: employees.map((e) => ({
      name: `${e.firstName} ${e.lastName}`,
      email: e.email || '',
      dateOfBirth: e.dateOfBirth ? e.dateOfBirth.toLocaleDateString('en-GB') : '',
      address: e.address || '',
      phone: e.phone || '',
      emergencyName: e.emergencyContactName || '',
      emergencyPhone: e.emergencyContactPhone || '',
      hoursPerDay: e.hoursPerDay ?? '',
    })),
  }
}

// ── Lateness report (using leave requests with "late" policies) ──
async function latenessReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const latenessColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Date' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status' },
    { key: 'reason', label: 'Reason' },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  // Look for a lateness policy by isSystemType or name
  const latePolicies = await prisma.leavePolicy.findMany({
    where: {
      tenantId,
      OR: [
        { isSystemType: 'lateness' },
        { name: { contains: 'late', mode: 'insensitive' } },
      ],
    },
  })

  if (latePolicies.length === 0) {
    return {
      columns: [
        { key: 'info', label: 'Information' },
      ],
      rows: [
        { info: 'No lateness policy found. Create a "Lateness" leave type in Settings > Leave Policies to track lateness.' },
      ],
    }
  }

  const policyIds = latePolicies.map((p) => p.id)

  // Overlap semantics — match the absence/sickness/payroll exception
  // reports. The previous strict-within filter (`startDate >= start AND
  // endDate <= end`) silently dropped any lateness whose window touched
  // the period boundary. Lateness records are typically single-point but
  // can span multiple days for "ongoing pattern" entries. (Round 5 #6.)
  const where: Record<string, unknown> = {
    tenantId,
    policyId: { in: policyIds },
    startDate: { lte: endDate },
    endDate: { gte: startDate },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns: latenessColumns, rows: [] }
  }

  const requests = await prisma.leaveRequest.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true },
    orderBy: [{ employee: { lastName: 'asc' } }, { startDate: 'asc' }],
  })

  return {
    columns: latenessColumns,
    rows: requests.map((r) => ({
      employee: `${r.employee.firstName} ${r.employee.lastName}`,
      date: r.startDate.toLocaleDateString('en-GB'),
      duration: r.latenessDuration || '',
      status: r.status,
      reason: r.reason || '',
    })),
  }
}

// ── Length of service ──
async function lengthOfServiceReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'department', label: 'Department' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'years', label: 'Years', align: 'right' as const },
    { key: 'months', label: 'Months', align: 'right' as const },
    { key: 'totalMonths', label: 'Total Months', align: 'right' as const },
  ]

  const where: Record<string, unknown> = { tenantId, status: 'ACTIVE' }
  if (filters.employeeId) where.id = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds, 'id')) {
    return { columns, rows: [] }
  }

  const employees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    orderBy: { startDate: 'asc' },
  })

  const now = new Date()

  return {
    columns,
    rows: employees.map((e) => {
      if (!e.startDate) {
        return {
          employee: `${e.firstName} ${e.lastName}`,
          jobTitle: e.jobTitle || '',
          department: e.department || '',
          startDate: 'Not set',
          years: '',
          months: '',
          totalMonths: '',
        }
      }
      const start = new Date(e.startDate)
      const totalMonths =
        (now.getFullYear() - start.getFullYear()) * 12 +
        (now.getMonth() - start.getMonth())
      const years = Math.floor(totalMonths / 12)
      const months = totalMonths % 12

      return {
        employee: `${e.firstName} ${e.lastName}`,
        jobTitle: e.jobTitle || '',
        department: e.department || '',
        startDate: start.toLocaleDateString('en-GB'),
        years,
        months,
        totalMonths,
      }
    }),
  }
}

// ── Overtime / TOIL ──
async function overtimeReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'date', label: 'Date' },
    { key: 'hours', label: 'Hours', align: 'right' as const },
    { key: 'reason', label: 'Reason' },
    { key: 'status', label: 'Status' },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  const where: Record<string, unknown> = {
    tenantId,
    date: { gte: startDate, lte: endDate },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const accruals = await prisma.toilAccrual.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true },
    orderBy: [{ employee: { lastName: 'asc' } }, { date: 'asc' }],
  })

  return {
    columns,
    rows: accruals.map((a) => ({
      employee: `${a.employee.firstName} ${a.employee.lastName}`,
      date: a.date.toLocaleDateString('en-GB'),
      hours: a.hours,
      reason: a.reason || '',
      status: a.status,
    })),
  }
}

// ── Sickness report ──
async function sicknessReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  const sicknessColumns = [
    { key: 'employee', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'totalDays', label: 'Total Sick Days', align: 'right' as const },
    { key: 'occurrences', label: 'Occurrences', align: 'right' as const },
    { key: 'bradfordFactor', label: 'Bradford Factor', align: 'right' as const },
    { key: 'longestAbsence', label: 'Longest Absence' },
  ]

  // Find sickness policies — keep the `unit` so we can apply the
  // hours-based multiplier in-process instead of the old per-request
  // calculateLeaveAmount → findUnique round trip.
  const sickPolicies = await prisma.leavePolicy.findMany({
    where: {
      tenantId,
      OR: [
        { isSystemType: 'sickness' },
        { name: { contains: 'sick', mode: 'insensitive' } },
      ],
    },
    select: { id: true, unit: true },
  })

  if (sickPolicies.length === 0) {
    return {
      columns: [{ key: 'info', label: 'Information' }],
      rows: [
        {
          info: 'No sickness policy found. Create a "Sickness" leave type in Settings > Leave Policies to track sickness.',
        },
      ],
    }
  }

  const policyIds = sickPolicies.map((p) => p.id)
  const policyUnitById = new Map(sickPolicies.map((p) => [p.id, p.unit]))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId }
  if (filters.employeeId) empWhere.id = filters.employeeId
  if (visibleEmployeeIds !== null) {
    if (filters.employeeId) {
      if (!visibleEmployeeIds.includes(filters.employeeId)) {
        return { columns: sicknessColumns, rows: [] }
      }
    } else {
      empWhere.id = { in: visibleEmployeeIds }
    }
  }

  // Pre-fetch tenant (for deductBankHolidays), holidays, working patterns,
  // and the employee list in parallel. This mirrors calculateBradfordFactorBatch
  // in employees/bradford-factor.ts so a 25-employee x 10-request report
  // runs in a handful of queries instead of the old ~1000 round trips.
  const [tenant, employees, requests] = await Promise.all([
    prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { deductBankHolidays: true },
    }),
    prisma.employee.findMany({
      where: empWhere,
      orderBy: { lastName: 'asc' },
    }),
    prisma.leaveRequest.findMany({
      where: {
        tenantId,
        policyId: { in: policyIds },
        status: 'APPROVED',
        // Overlap semantics — match the absence report. The previous
        // strict-within filter (`startDate >= start AND endDate <= end`)
        // silently dropped any sickness that straddled the period
        // boundary, so a Mar 30 → Apr 5 sickness was missing from BOTH
        // March and April reports. Now we include any sickness that
        // touches the period at all.
        startDate: { lte: endDate },
        endDate: { gte: startDate },
        ...(filters.employeeId
          ? { employeeId: filters.employeeId }
          : visibleEmployeeIds !== null
            ? { employeeId: { in: visibleEmployeeIds } }
            : {}),
      },
      orderBy: { startDate: 'asc' },
    }),
  ])

  const employeeIds = employees.map((e) => e.id)

  // Load holidays + working patterns once. Only exclude holidays from the
  // business-day count if the tenant is NOT configured to deduct them
  // from leave, matching calculateLeaveDays' semantics.
  const [holidays, patterns] = await Promise.all([
    tenant?.deductBankHolidays
      ? Promise.resolve([] as { date: Date }[])
      : prisma.publicHoliday.findMany({
          where: {
            tenantId,
            date: { gte: startDate, lte: endDate },
          },
          select: { date: true },
        }),
    employeeIds.length > 0
      ? prisma.workingTimePattern.findMany({
          where: { employeeId: { in: employeeIds } },
          select: { employeeId: true, dayOfWeek: true, isWorkingDay: true },
        })
      : Promise.resolve([] as { employeeId: string; dayOfWeek: number; isWorkingDay: boolean }[]),
  ])

  const holidaySet = new Set(
    holidays.map((h: { date: Date }) => toLocalDayKey(h.date))
  )

  const workingDaysByEmployee = new Map<string, Set<number>>()
  for (const p of patterns) {
    if (!p.isWorkingDay) continue
    const existing = workingDaysByEmployee.get(p.employeeId) ?? new Set<number>()
    existing.add(p.dayOfWeek)
    workingDaysByEmployee.set(p.employeeId, existing)
  }

  // Group sickness requests by employee
  const byEmployee = new Map<string, typeof requests>()
  for (const req of requests) {
    const existing = byEmployee.get(req.employeeId) || []
    existing.push(req)
    byEmployee.set(req.employeeId, existing)
  }

  // Compute sickness stats per employee entirely in-process.
  //
  //  - "Total Sick Days" still uses the canonical countBusinessDays so
  //    Fri–Mon counts as 2, half days and working patterns are honoured,
  //    and hours-based policies are scaled by the employee's hoursPerDay
  //    — exactly the same shape as calculateLeaveAmount, just without
  //    re-fetching tenant/holidays/pattern/policy for every single row.
  //  - Bradford Factor is delegated to the canonical computeFromRequests
  //    helper in employees/bradford-factor.ts so the number matches the
  //    employee profile.
  const DEFAULT_HOURS_PER_DAY = 7.5
  const DEFAULT_WORKING_DAYS = new Set([1, 2, 3, 4, 5]) // Mon-Fri
  const rowsMaybe = employees.map((emp) => {
    const empRequests = byEmployee.get(emp.id) || []
    if (empRequests.length === 0 && filters.employeeId !== emp.id) return null

    const workingDays =
      workingDaysByEmployee.get(emp.id) ?? DEFAULT_WORKING_DAYS
    const hoursPerDay = emp.hoursPerDay ?? DEFAULT_HOURS_PER_DAY

    let totalBusinessDays = 0
    let longestAbsence = 0

    for (const req of empRequests) {
      const days = countBusinessDays(
        req.startDate,
        req.endDate,
        holidaySet,
        req.halfDayStart,
        req.halfDayEnd,
        workingDays
      )
      const unit = policyUnitById.get(req.policyId) ?? 'days'
      const amount = unit === 'hours' ? days * hoursPerDay : days
      totalBusinessDays += amount
      if (amount > longestAbsence) longestAbsence = amount
    }

    // Match the previous Bradford computation exactly: no holidays,
    // default Mon-Fri working days. Keeping this call identical to the
    // pre-refactor version avoids surprising customers with a silent
    // change to their Bradford scores on the first report run after
    // deployment. The N+1 fix above is orthogonal to Bradford's inputs.
    const bradford = computeFromRequests(
      empRequests.map((r: { startDate: Date; endDate: Date }) => ({
        startDate: r.startDate,
        endDate: r.endDate,
      }))
    )

    const totalDisplay = Number(totalBusinessDays.toFixed(1))
    const longestDisplay = Number(longestAbsence.toFixed(1))

    return {
      employee: `${emp.firstName} ${emp.lastName}`,
      department: emp.department || '',
      totalDays: totalDisplay,
      occurrences: bradford.spells,
      bradfordFactor: bradford.score,
      longestAbsence:
        longestAbsence > 0 ? `${longestDisplay} day${longestDisplay !== 1 ? 's' : ''}` : '',
    }
  })
  const rows = rowsMaybe.filter(Boolean) as Record<string, string | number | null>[]

  return {
    columns: sicknessColumns,
    rows,
  }
}

// ── Turnover & Retention report ──
async function turnoverReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  // All employees who were active at start or joined during the period
  const empWhere: Record<string, unknown> = { tenantId }
  if (visibleEmployeeIds !== null) {
    empWhere.id = { in: visibleEmployeeIds }
  }
  const allEmployees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: empWhere as any,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      department: true,
      status: true,
      startDate: true,
      terminationDate: true,
    },
  })

  // Headcount at start of period: employees with startDate before/on startDate and either still active or terminated after startDate
  const headcountStart = allEmployees.filter((e) => {
    if (!e.startDate || e.startDate > startDate) return false
    if (e.status === 'ACTIVE') return true
    // INACTIVE: was still active at period start if terminated after start
    if (e.terminationDate && e.terminationDate >= startDate) return true
    return false
  }).length

  // New starters: employees with startDate within the period
  const newStarters = allEmployees.filter(
    (e) => e.startDate && e.startDate >= startDate && e.startDate <= endDate
  )

  // Leavers: INACTIVE employees terminated during the period
  const leavers = allEmployees.filter(
    (e) =>
      e.status === 'INACTIVE' &&
      e.terminationDate &&
      e.terminationDate >= startDate &&
      e.terminationDate <= endDate
  )

  const headcountEnd = headcountStart + newStarters.length - leavers.length
  const avgHeadcount = (headcountStart + headcountEnd) / 2
  const turnoverRate = avgHeadcount > 0 ? ((leavers.length / avgHeadcount) * 100) : 0

  // Average length of service for active employees (in months)
  const activeWithStart = allEmployees.filter(
    (e) => e.status === 'ACTIVE' && e.startDate
  )
  let avgServiceMonths = 0
  if (activeWithStart.length > 0) {
    const now = new Date()
    const totalMonths = activeWithStart.reduce((sum, e) => {
      const s = new Date(e.startDate!)
      return (
        sum +
        (now.getFullYear() - s.getFullYear()) * 12 +
        (now.getMonth() - s.getMonth())
      )
    }, 0)
    avgServiceMonths = Math.round(totalMonths / activeWithStart.length)
  }

  // Summary row
  const summaryRows: Record<string, string | number | null>[] = [
    {
      metric: 'Headcount at start of period',
      value: headcountStart,
      _detail: '',
    },
    {
      metric: 'Headcount at end of period',
      value: headcountEnd,
      _detail: '',
    },
    {
      metric: 'New starters',
      value: newStarters.length,
      _detail: newStarters.map((e) => `${e.firstName} ${e.lastName}`).join(', ') || '',
    },
    {
      metric: 'Leavers',
      value: leavers.length,
      _detail: leavers.map((e) => `${e.firstName} ${e.lastName}`).join(', ') || '',
    },
    {
      metric: 'Turnover rate',
      value: `${turnoverRate.toFixed(1)}%`,
      _detail: '',
    },
    {
      metric: 'Average length of service',
      value:
        avgServiceMonths >= 12
          ? `${Math.floor(avgServiceMonths / 12)} yr${Math.floor(avgServiceMonths / 12) !== 1 ? 's' : ''}, ${avgServiceMonths % 12} mo`
          : `${avgServiceMonths} months`,
      _detail: '',
    },
  ]

  // Department breakdown
  const departments = new Map<string, { start: number; starters: number; leavers: number }>()
  for (const emp of allEmployees) {
    const dept = emp.department || 'No department'
    if (!departments.has(dept)) departments.set(dept, { start: 0, starters: 0, leavers: 0 })
    const d = departments.get(dept)!

    // Was in headcount at start?
    if (emp.startDate && emp.startDate <= startDate) {
      if (emp.status === 'ACTIVE' || (emp.terminationDate && emp.terminationDate >= startDate)) {
        d.start++
      }
    }
    // New starter?
    if (emp.startDate && emp.startDate >= startDate && emp.startDate <= endDate) {
      d.starters++
    }
    // Leaver?
    if (emp.status === 'INACTIVE' && emp.terminationDate && emp.terminationDate >= startDate && emp.terminationDate <= endDate) {
      d.leavers++
    }
  }

  for (const [dept, data] of departments) {
    const deptEnd = data.start + data.starters - data.leavers
    const deptAvg = (data.start + deptEnd) / 2
    const deptTurnover = deptAvg > 0 ? ((data.leavers / deptAvg) * 100).toFixed(1) : '0.0'
    summaryRows.push({
      metric: `${dept}`,
      value: `${data.start} → ${deptEnd}`,
      _detail: `+${data.starters} starters, -${data.leavers} leavers, ${deptTurnover}% turnover`,
    })
  }

  return {
    columns: [
      { key: 'metric', label: 'Metric' },
      { key: 'value', label: 'Value', align: 'right' as const },
      { key: '_detail', label: 'Details' },
    ],
    rows: summaryRows,
  }
}

// ── Payroll exceptions ──
async function payrollExceptionsReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'policy', label: 'Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'status', label: 'Status' },
    { key: 'reason', label: 'Notes' },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  // Overlap semantics so leaves that straddle the period boundary
  // (e.g. 30 Mar – 5 Apr) are still included in each period's payroll run.
  const where: Record<string, unknown> = {
    tenantId,
    status: { in: ['APPROVED', 'PENDING'] },
    startDate: { lte: endDate },
    endDate: { gte: startDate },
    // Only sickness / lateness (the two isSystemType values). Previously
    // this used a name-based `contains: 'annual'` exclusion which missed
    // renamed policies (e.g. 'PTO' or 'Holiday' leaked into the report).
    policy: { isSystemType: { not: null } },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const requests = await prisma.leaveRequest.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: { employee: true, policy: true },
    orderBy: [{ employee: { lastName: 'asc' } }, { startDate: 'asc' }],
  })

  return {
    columns,
    rows: requests.map((r) => ({
      employee: `${r.employee.firstName} ${r.employee.lastName}`,
      policy: r.policy.name,
      startDate: r.startDate.toLocaleDateString('en-GB'),
      endDate: r.endDate.toLocaleDateString('en-GB'),
      status: r.status,
      reason: r.reason || '',
    })),
  }
}

// ── Working status report ──
async function workingStatusReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'status', label: 'Current Status' },
    { key: 'location', label: 'Working Location' },
    { key: 'updatedAt', label: 'Last Updated' },
  ]

  const where: Record<string, unknown> = { tenantId, status: 'ACTIVE' }
  if (filters.employeeId) where.id = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds, 'id')) {
    return { columns, rows: [] }
  }

  const employees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    orderBy: { lastName: 'asc' },
  })

  const statusLabels: Record<string, string> = {
    office: 'In Office',
    home: 'Working from Home',
    hybrid: 'Hybrid',
    away: 'Away',
    sick: 'Sick',
    leave: 'On Leave',
  }

  return {
    columns,
    rows: employees.map((e) => ({
      employee: `${e.firstName} ${e.lastName}`,
      department: e.department || '',
      jobTitle: e.jobTitle || '',
      status: statusLabels[e.workingStatus || 'office'] || e.workingStatus || 'Unknown',
      location: e.workingLocation || '',
      updatedAt: e.updatedAt.toLocaleDateString('en-GB'),
    })),
  }
}

// ── Rota report ──
async function rotaReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'totalScheduledHours', label: 'Total Scheduled Hours', align: 'right' as const },
    { key: 'shiftsCount', label: 'Shifts', align: 'right' as const },
    { key: 'daysWorked', label: 'Days Worked', align: 'right' as const },
    { key: 'avgHoursPerDay', label: 'Avg Hours/Day', align: 'right' as const },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  const where: Record<string, unknown> = {
    rota: { tenantId },
    date: { gte: startDate, lte: endDate },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const entries = await prisma.rotaEntry.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      employee: { select: { id: true, firstName: true, lastName: true, department: true } },
      shiftTemplate: { select: { startTime: true, endTime: true } },
    },
    orderBy: [{ employee: { lastName: 'asc' } }, { date: 'asc' }],
  })

  // Group by employee and compute stats
  const byEmployee = new Map<
    string,
    {
      name: string
      department: string
      shifts: number
      totalHours: number
      daysWorked: Set<string>
    }
  >()

  for (const entry of entries) {
    const key = entry.employee.id
    if (!byEmployee.has(key)) {
      byEmployee.set(key, {
        name: `${entry.employee.firstName} ${entry.employee.lastName}`,
        department: entry.employee.department || '',
        shifts: 0,
        totalHours: 0,
        daysWorked: new Set(),
      })
    }
    const data = byEmployee.get(key)!
    data.shifts++
    data.daysWorked.add(entry.date.toISOString().slice(0, 10))

    // Calculate hours from start/end time
    const start = entry.startTime || entry.shiftTemplate?.startTime
    const end = entry.endTime || entry.shiftTemplate?.endTime
    if (start && end) {
      const [sh, sm] = start.split(':').map(Number)
      const [eh, em] = end.split(':').map(Number)
      const hours = eh + em / 60 - (sh + sm / 60)
      if (hours > 0) data.totalHours += hours
    }
  }

  const rows = Array.from(byEmployee.values()).map((data) => ({
    employee: data.name,
    department: data.department,
    totalScheduledHours: Number(data.totalHours.toFixed(1)),
    shiftsCount: data.shifts,
    daysWorked: data.daysWorked.size,
    avgHoursPerDay:
      data.daysWorked.size > 0
        ? Number((data.totalHours / data.daysWorked.size).toFixed(1))
        : 0,
  }))

  return {
    columns,
    rows,
  }
}

// ── Expenses report ──
async function expensesReport(
  tenantId: string,
  filters: ReportFilters,
  leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'claims', label: 'Claims', align: 'right' as const },
    { key: 'totalClaimed', label: 'Total Claimed', align: 'right' as const },
    { key: 'totalApproved', label: 'Total Approved', align: 'right' as const },
    { key: 'totalPaid', label: 'Total Paid', align: 'right' as const },
    { key: 'breakdown', label: 'Category Breakdown' },
  ]

  const { startDate, endDate } = parseDateRange(filters, leaveYearStartMonth)

  const where: Record<string, unknown> = {
    tenantId,
    date: { gte: startDate, lte: endDate },
  }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds)) {
    return { columns, rows: [] }
  }

  const claims = await prisma.expenseClaim.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      employee: { select: { id: true, firstName: true, lastName: true, department: true } },
    },
    orderBy: [{ employee: { lastName: 'asc' } }, { date: 'asc' }],
  })

  // Group by employee
  const byEmployee = new Map<
    string,
    {
      name: string
      department: string
      totalClaimed: number
      totalApproved: number
      totalPaid: number
      claimCount: number
      byCategory: Map<string, number>
    }
  >()

  for (const claim of claims) {
    const key = claim.employee.id
    if (!byEmployee.has(key)) {
      byEmployee.set(key, {
        name: `${claim.employee.firstName} ${claim.employee.lastName}`,
        department: claim.employee.department || '',
        totalClaimed: 0,
        totalApproved: 0,
        totalPaid: 0,
        claimCount: 0,
        byCategory: new Map(),
      })
    }
    const data = byEmployee.get(key)!
    const amount = Number(claim.amount)
    data.claimCount++
    data.totalClaimed += amount

    if (claim.status === 'APPROVED') data.totalApproved += amount
    if (claim.status === 'PAID') {
      data.totalApproved += amount
      data.totalPaid += amount
    }

    const cat = claim.category || 'OTHER'
    data.byCategory.set(cat, (data.byCategory.get(cat) || 0) + amount)
  }

  const rows = Array.from(byEmployee.values()).map((data) => {
    const categories = Array.from(data.byCategory.entries())
      .map(([cat, amt]) => `${cat}: ${amt.toFixed(2)}`)
      .join(', ')
    return {
      employee: data.name,
      department: data.department,
      claims: data.claimCount,
      totalClaimed: Number(data.totalClaimed.toFixed(2)),
      totalApproved: Number(data.totalApproved.toFixed(2)),
      totalPaid: Number(data.totalPaid.toFixed(2)),
      breakdown: categories,
    }
  })

  return {
    columns,
    rows,
  }
}

// ── Document expiry report ──
async function documentExpiryReport(
  tenantId: string,
  filters: ReportFilters,
  _leaveYearStartMonth?: number,
  visibleEmployeeIds: VisibleEmployeeIds = null
) {
  const columns = [
    { key: 'employee', label: 'Employee' },
    { key: 'department', label: 'Department' },
    { key: 'jobTitle', label: 'Job Title' },
    { key: 'probationEndDate', label: 'Probation End Date' },
    { key: 'probationStatus', label: 'Probation Status' },
    { key: 'contractType', label: 'Contract Type' },
    { key: 'flags', label: 'Flags' },
  ]

  const where: Record<string, unknown> = { tenantId, status: 'ACTIVE' }
  if (filters.employeeId) where.id = filters.employeeId
  if (!applyVisibilityToEmployeeIdField(where, filters, visibleEmployeeIds, 'id')) {
    return { columns, rows: [] }
  }

  const employees = await prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    orderBy: { lastName: 'asc' },
  })

  const now = new Date()
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const rows: Record<string, string | number | null>[] = []

  for (const emp of employees) {
    const issues: string[] = []
    let probationStatus = ''
    let contractStatus = ''

    // Probation end date check
    if (emp.probationEndDate) {
      const probEnd = new Date(emp.probationEndDate)
      if (probEnd < now) {
        probationStatus = `Ended ${probEnd.toLocaleDateString('en-GB')}`
      } else if (probEnd <= thirtyDaysFromNow) {
        probationStatus = `Ending ${probEnd.toLocaleDateString('en-GB')}`
        issues.push('Probation ending soon')
      } else {
        probationStatus = `Ends ${probEnd.toLocaleDateString('en-GB')}`
      }
    }

    // Contract type check
    if (emp.contractType) {
      contractStatus = emp.contractType
      if (
        emp.contractType.toLowerCase().includes('fixed') ||
        emp.contractType.toLowerCase().includes('temporary')
      ) {
        issues.push('Fixed/temporary contract')
      }
    }

    // Only include employees with relevant data
    if (emp.probationEndDate || contractStatus) {
      rows.push({
        employee: `${emp.firstName} ${emp.lastName}`,
        department: emp.department || '',
        jobTitle: emp.jobTitle || '',
        probationEndDate: emp.probationEndDate
          ? emp.probationEndDate.toLocaleDateString('en-GB')
          : '',
        probationStatus,
        contractType: contractStatus,
        flags: issues.join('; '),
      })
    }
  }

  return {
    columns,
    rows,
  }
}

// ── Report dispatcher ──

const REPORT_GENERATORS: Record<
  string,
  (
    tenantId: string,
    filters: ReportFilters,
    leaveYearStartMonth?: number,
    visibleEmployeeIds?: VisibleEmployeeIds
  ) => Promise<{
    columns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[]
    rows: Record<string, string | number | null>[]
  }>
> = {
  absence: absenceReport,
  'annual-leave-summary': annualLeaveSummaryReport,
  'employee-details': employeeDetailsReport,
  'employee-information': employeeInformationReport,
  lateness: latenessReport,
  'length-of-service': lengthOfServiceReport,
  overtime: overtimeReport,
  'payroll-exceptions': payrollExceptionsReport,
  sickness: sicknessReport,
  'turnover-retention': turnoverReport,
  'working-status': workingStatusReport,
  rota: rotaReport,
  expenses: expensesReport,
  'document-expiry': documentExpiryReport,
}

/**
 * Compute the set of employee IDs the caller can see in reports.
 *
 *  - ADMIN+ → `null` (no restriction).
 *  - Non-admin MANAGER → direct reports + active delegations + their own
 *    employee record (so a manager sees themselves in reports).
 *
 * Mirrors the visibility pattern in `src/app/t/[tenantSlug]/leave/actions.ts`.
 */
async function resolveVisibleEmployeeIds(
  tenantId: string,
  userId: string,
  membership: { role: Parameters<typeof assertAtLeast>[0]['role'] }
): Promise<VisibleEmployeeIds> {
  if (isAtLeast(membership, 'ADMIN')) return null

  const reportIds = await getDirectReportIds(tenantId, userId, membership)
  if (reportIds === null) return null // belt-and-braces

  const myEmp = await prisma.employee.findFirst({
    where: { tenantId, userId },
    select: { id: true },
  })

  let delegatedEmployeeIds: string[] = []
  if (myEmp) {
    const now = new Date()
    const activeDelegations = await prisma.approvalDelegate.findMany({
      where: {
        delegateId: myEmp.id,
        tenantId,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      select: { managerId: true },
    })
    if (activeDelegations.length > 0) {
      const delegatedManagerIds = activeDelegations.map(
        (d: { managerId: string }) => d.managerId
      )
      const delegatedEmps = await prisma.employee.findMany({
        where: { tenantId, managerId: { in: delegatedManagerIds } },
        select: { id: true },
      })
      delegatedEmployeeIds = delegatedEmps.map((e: { id: string }) => e.id)
    }
  }

  const own = myEmp ? [myEmp.id] : []
  return Array.from(new Set([...reportIds, ...delegatedEmployeeIds, ...own]))
}

export async function generateReport(
  tenantSlug: string,
  reportType: string,
  filters: ReportFilters
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const generator = REPORT_GENERATORS[reportType]
  if (!generator) throw new Error(`Unknown report type: ${reportType}`)

  const visibleEmployeeIds = await resolveVisibleEmployeeIds(
    tenant.id,
    user.userId,
    membership
  )

  return generator(tenant.id, filters, tenant.leaveYearStartMonth, visibleEmployeeIds)
}

export async function exportReportCsv(
  tenantSlug: string,
  reportType: string,
  filters: ReportFilters
): Promise<string> {
  const { columns, rows } = await generateReport(tenantSlug, reportType, filters)

  const headers = columns.map((c) => c.label)
  const csvRows = rows.map((row) =>
    columns
      .map((col) => {
        const val = row[col.key]
        const str = val == null ? '' : String(val)
        return `"${str.replace(/"/g, '""')}"`
      })
      .join(',')
  )

  return [headers.join(','), ...csvRows].join('\n')
}

export async function getEmployeesForFilter(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const visibleEmployeeIds = await resolveVisibleEmployeeIds(
    tenant.id,
    user.userId,
    membership
  )

  const where: Record<string, unknown> = { tenantId: tenant.id, status: 'ACTIVE' }
  if (visibleEmployeeIds !== null) {
    where.id = { in: visibleEmployeeIds }
  }

  return prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    select: { id: true, firstName: true, lastName: true },
    orderBy: { lastName: 'asc' },
  })
}

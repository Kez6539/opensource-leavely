'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast, getDirectReportIds } from '@/lib/rbac'
import { getLeaveYear, formatLeaveYearLabel, calculateProRataAllowance } from '@/lib/leave-year'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'
import { ensureStandardHolidaysForLeaveYear } from '@/lib/holidays'

export async function getDashboardData(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const tenantId = tenant.id
  const canApprove = isAtLeast(membership, 'MANAGER')

  // Determine if this is a MANAGER (not ADMIN/OWNER) who needs hierarchy filtering
  const isManagerOnly = isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')
  const reportIds = isManagerOnly
    ? await getDirectReportIds(tenantId, user.userId, membership)
    : null
  // For managers, build a combined list including themselves.
  // For EMPLOYEEs (no approval rights), scope to self — they should never
  // see other people's leave or sickness on the dashboard.
  let visibleEmployeeIds: string[] | null = null
  if (isManagerOnly && reportIds !== null) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId, userId: user.userId },
      select: { id: true },
    })
    visibleEmployeeIds = myEmp ? [...reportIds, myEmp.id] : reportIds
  } else if (!canApprove) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId, userId: user.userId },
      select: { id: true },
    })
    visibleEmployeeIds = myEmp ? [myEmp.id] : []
  }

  // Helper: add employeeId filter for manager hierarchy
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withManagerFilter = (where: any) => {
    if (visibleEmployeeIds !== null) {
      return { ...where, employeeId: { in: visibleEmployeeIds } }
    }
    return where
  }

  const now = new Date()
  // Day-bounded comparators for "today" queries. Leave dates are stored
  // inconsistently — some at UTC midnight (00:00Z), others at BST midnight
  // (23:00Z the previous day) depending on which code path created them.
  // The window must cover BOTH so a BST-stored "Apr 10" (which is
  // 2026-04-09T23:00Z) still counts as "today = Apr 10".
  //
  // We widen the query window by 2 hours on each side, then post-filter
  // in JS using toLocalDayKey so only the correct calendar day survives.
  const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const queryWindowStart = new Date(startOfTodayUTC.getTime() - 2 * 60 * 60 * 1000)
  const queryWindowEnd = new Date(startOfTodayUTC.getTime() + 26 * 60 * 60 * 1000 - 1)

  // Stage 1: Fire ALL independent queries in parallel
  const [
    employeeCount,
    pendingLeaveCount,
    upcomingAbsences,
    pendingApprovals,
    leavePolicyCount,
    activeEmployees,
    myEmployee,
    activeAnnouncements,
    onboardingChecklists,
    offToday,
  ] = await Promise.all([
    prisma.employee.count({ where: { tenantId, status: 'ACTIVE' } }),
    prisma.leaveRequest.count({ where: withManagerFilter({ tenantId, status: 'PENDING' }) }),
    prisma.leaveRequest.findMany({
      where: withManagerFilter({
        tenantId,
        status: 'APPROVED',
        startDate: { gte: new Date() },
      }),
      include: {
        employee: true,
        policy: true,
        companyLeave: { select: { id: true, name: true } },
      },
      orderBy: { startDate: 'asc' },
      // Higher cap because the dashboard now collapses company-closure rows
      // (e.g. one Christmas Shutdown row instead of N per-employee rows).
      // Without this, a 10-person closure would consume the entire window
      // and hide individual leave coming up afterwards.
      take: 60,
    }),
    canApprove
      ? prisma.leaveRequest.findMany({
          where: withManagerFilter({ tenantId, status: 'PENDING' }),
          include: { employee: true, policy: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        })
      : Promise.resolve([]),
    prisma.leavePolicy.count({ where: { tenantId } }),
    prisma.employee.findMany({
      where: { tenantId, status: 'ACTIVE' },
      select: { id: true, firstName: true, lastName: true, dateOfBirth: true, startDate: true },
    }),
    prisma.employee.findFirst({
      where: { tenantId, userId: membership.userId },
    }),
    prisma.announcement.findMany({
      where: {
        tenantId,
        publishedAt: { lte: new Date() },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    }),
    prisma.onboardingChecklist.findMany({
      where: { tenantId },
      include: {
        employee: { select: { id: true, firstName: true, lastName: true } },
        tasks: { select: { id: true, completedAt: true } },
      },
    }),
    prisma.leaveRequest.findMany({
      // "Off today" — widened window to catch BST-stored dates, then
      // post-filtered in JS using toLocalDayKey (see below).
      where: withManagerFilter({
        tenantId,
        status: 'APPROVED',
        startDate: { lte: queryWindowEnd },
        endDate: { gte: queryWindowStart },
      }),
      include: { employee: true, policy: true },
    }),
  ])

  // Build a per-employee working-day set for the "back on" date calc.
  // Post-filter: the DB query used a widened window to catch BST-stored
  // dates. Now narrow to records whose local-day range actually covers
  // today. toLocalDayKey handles the BST/UTC midnight asymmetry.
  const todayKey = toLocalDayKey(startOfTodayUTC)
  const offTodayFiltered = offToday.filter((r) => {
    const startKey = toLocalDayKey(r.startDate)
    const endKey = toLocalDayKey(r.endDate)
    return startKey <= todayKey && endKey >= todayKey
  })

  // Build a per-employee working-day set for the "back on" date calc.
  // Employees without a pattern default to Mon-Fri (1-5). Batch-fetch
  // all patterns for the employees who are off today so we don't N+1.
  const DEFAULT_WORKING_DOW = new Set([1, 2, 3, 4, 5]) // Mon-Fri
  const workingPatternMap = new Map<string, Set<number>>()
  if (offTodayFiltered.length > 0) {
    const offEmpIds = [...new Set(offTodayFiltered.map((r) => r.employee.id))]
    const patterns = await prisma.workingTimePattern.findMany({
      where: { employeeId: { in: offEmpIds }, isWorkingDay: true },
      select: { employeeId: true, dayOfWeek: true },
    })
    for (const p of patterns) {
      let set = workingPatternMap.get(p.employeeId)
      if (!set) { set = new Set(); workingPatternMap.set(p.employeeId, set) }
      set.add(p.dayOfWeek)
    }
  }

  // Compute upcoming birthdays and work anniversaries (next 30 days)
  const upcomingBirthdays: Array<{ id: string; name: string; date: string; age: number }> = []
  const workAnniversaries: Array<{ id: string; name: string; date: string; years: number }> = []

  for (const emp of activeEmployees) {
    if (emp.dateOfBirth) {
      const dob = new Date(emp.dateOfBirth)
      const nextBirthday = new Date(Date.UTC(now.getUTCFullYear(), dob.getUTCMonth(), dob.getUTCDate()))
      if (nextBirthday < now) {
        nextBirthday.setUTCFullYear(nextBirthday.getUTCFullYear() + 1)
      }
      const diffDays = Math.floor((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays >= 0 && diffDays <= 30) {
        const age = nextBirthday.getUTCFullYear() - dob.getUTCFullYear()
        upcomingBirthdays.push({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          date: nextBirthday.toISOString(),
          age,
        })
      }
    }
    if (emp.startDate) {
      const start = new Date(emp.startDate)
      const nextAnniversary = new Date(Date.UTC(now.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()))
      if (nextAnniversary < now) {
        nextAnniversary.setUTCFullYear(nextAnniversary.getUTCFullYear() + 1)
      }
      const diffDays = Math.floor((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays >= 0 && diffDays <= 30) {
        const years = nextAnniversary.getUTCFullYear() - start.getUTCFullYear()
        if (years > 0) {
          workAnniversaries.push({
            id: emp.id,
            name: `${emp.firstName} ${emp.lastName}`,
            date: nextAnniversary.toISOString(),
            years,
          })
        }
      }
    }
  }

  // Sort by date and take top 5
  upcomingBirthdays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  workAnniversaries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Resolve announcement author names
  const announcementAuthorIds = [...new Set(activeAnnouncements.map(a => a.authorId))]

  // Stage 2: Resolve author names + next leave in parallel. The hand-rolled
  // balance fetch that used to live here was replaced by a call to
  // getEmployeeBalances below (round 5 #1) — see comment there for why.
  const year = getLeaveYear(tenant.leaveYearStartMonth, new Date())
  const [announcementAuthors, myNextLeaveRaw] = await Promise.all([
    announcementAuthorIds.length > 0
      ? prisma.user.findMany({
          where: { id: { in: announcementAuthorIds } },
          select: { id: true, name: true, email: true },
        })
      : Promise.resolve([]),
    myEmployee
      ? prisma.leaveRequest.findFirst({
          where: {
            tenantId,
            employeeId: myEmployee.id,
            status: 'APPROVED',
            // Day-precision so leave starting today still shows as "next leave"
            // (otherwise it disappears from My Summary the morning it starts).
            startDate: { gte: startOfTodayUTC },
          },
          include: {
            policy: true,
            companyLeave: { select: { name: true } },
          },
          orderBy: { startDate: 'asc' },
        })
      : Promise.resolve(null),
  ])
  const announcementAuthorMap = new Map(announcementAuthors.map(a => [a.id, a.name || a.email]))

  // TOIL balance for the current user. Policy lookup tries the structural
  // `isSystemType: 'toil'` flag first, falling back to a case-insensitive
  // name match for legacy data. Pure name matching missed any tenant who
  // renamed their TOIL policy to "Time off in lieu" or "Comp time".
  let myToilBalance: { accrued: number; used: number; remaining: number } | null = null
  if (myEmployee) {
    const [toilAgg, toilPolicy] = await Promise.all([
      prisma.toilAccrual.aggregate({
        where: { tenantId, employeeId: myEmployee.id, status: 'APPROVED' },
        _sum: { hours: true },
      }),
      prisma.leavePolicy.findFirst({
        where: {
          tenantId,
          OR: [
            { isSystemType: 'toil' },
            { name: { contains: 'TOIL', mode: 'insensitive' } },
            { name: { contains: 'time off in lieu', mode: 'insensitive' } },
            { name: { contains: 'comp time', mode: 'insensitive' } },
          ],
        },
      }),
    ])
    const accrued = toilAgg._sum.hours ?? 0
    let toilUsed = 0
    if (toilPolicy) {
      const toilBal = await prisma.leaveBalance.findFirst({
        where: { employeeId: myEmployee.id, policyId: toilPolicy.id },
      })
      if (toilBal) toilUsed = (toilBal.used + toilBal.pending) * (myEmployee.hoursPerDay ?? 7.5)
    }
    if (accrued > 0 || toilUsed > 0) {
      myToilBalance = { accrued, used: toilUsed, remaining: accrued - toilUsed }
    }
  }

  let myBalances: Array<{
    id: string
    policyName: string
    policyUnit: string
    allowance: number
    used: number
    pending: number
    remaining: number
    isProRated: boolean
    deductBankHolidays?: boolean
    bankHolidayCount?: number
  }> = []

  // Count bank holidays for the current leave year. We surface this either way:
  // ON  → "Including N bank holidays" (count toward allowance)
  // OFF → "+ N bank holidays paid on top" (extra free days)
  // First self-heal any tenant whose holiday table is missing standard dates for
  // the current/next leave year (e.g. tenants onboarded before newer years were added).
  await ensureStandardHolidaysForLeaveYear(
    tenantId,
    tenant.country,
    tenant.leaveYearStartMonth,
    now
  )
  const deductBankHolidays = tenant.deductBankHolidays ?? false
  const yearStart = new Date(year, tenant.leaveYearStartMonth - 1, 1)
  const yearEnd = new Date(year + 1, tenant.leaveYearStartMonth - 1, 0)
  const bankHolidayCount = await prisma.publicHoliday.count({
    where: { tenantId, date: { gte: yearStart, lte: yearEnd } },
  })

  if (myEmployee) {
    // Delegate to the canonical balance helper instead of the hand-rolled
    // upsert path that used to live here. The previous code:
    //   1. Ignored employee leaveYearStartMonth overrides — staff with a
    //      custom leave year saw the wrong year's balances on the dashboard.
    //   2. Skipped carryover, service bonus, and ensureBalances' self-heal
    //      logic, persisting LeaveBalance rows that disagreed with every
    //      other page.
    //   3. Returned `remaining = allowance - used - pending` for monthly
    //      accrual policies, which OVER-states what the employee can take
    //      (they've only accrued part of the annual allowance so far). The
    //      My Summary tile and progress bar were both wrong for accrual.
    // getEmployeeBalances handles all of the above: it routes through
    // ensureBalances, applies the leave-year override, computes accrued-to
    // -date for monthly accrual, and returns `remaining = accrued - used -
    // pending`. We map `allowance → accrued` on the dashboard payload for
    // accrual policies so the percentage bar is correct too. (Round 5 #1)
    const { getEmployeeBalances } = await import('../leave/balance-actions')
    const fullBalances = await getEmployeeBalances(tenantSlug, myEmployee.id)
    myBalances = fullBalances
      .filter((b) => b.isSystemType === null)
      .map((b) => {
        // For monthly-accrual policies, the upper bound the user can spend
        // RIGHT NOW is the accrued-to-date amount, not the full year
        // allowance. Project it onto `allowance` so the existing component
        // (which computes `remaining/allowance`) renders correctly.
        const upperBound = b.accrualType === 'monthly' ? b.accrued : b.allowance
        return {
          id: b.id,
          policyName: b.policyName,
          policyUnit: b.policyUnit,
          allowance: upperBound,
          used: b.used,
          pending: b.pending,
          remaining: b.remaining,
          isProRated: b.isProRated,
          deductBankHolidays,
          bankHolidayCount,
        }
      })
  }

  // Check for pending RTW interviews (managers/admins only)
  let pendingRTWCount = 0
  let pendingRTWs: Array<{ id: string; leaveId: string; employeeName: string; endDate: string }> = []
  if (canApprove) {
    // Auto-create RTW placeholders for sick leave that has fully ended (endDate
    // is before TODAY, day-precision — not before the current instant, which
    // would prematurely create RTW for someone whose last sick day is today).
    // Match by isSystemType OR name so renamed sickness policies still work.
    const sickLeaveWithoutRTW = await prisma.leaveRequest.findMany({
      where: {
        tenantId,
        status: 'APPROVED',
        endDate: { lt: startOfTodayUTC },
        policy: {
          OR: [
            { isSystemType: 'sickness' },
            { name: { contains: 'sick', mode: 'insensitive' } },
          ],
        },
        returnToWork: null,
      },
      select: { id: true },
    })

    if (sickLeaveWithoutRTW.length > 0) {
      await prisma.returnToWork.createMany({
        data: sickLeaveWithoutRTW.map((lr) => ({ leaveRequestId: lr.id })),
        skipDuplicates: true,
      })
    }

    // Fetch all pending RTW records, scoped to the caller's report set so
    // a plain MANAGER doesn't see RTW interviews for employees they have
    // no visibility over. ADMIN+ keeps the tenant-wide view.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rtwLeaveRequestFilter: any = { tenantId }
    if (visibleEmployeeIds !== null) {
      rtwLeaveRequestFilter.employeeId = { in: visibleEmployeeIds }
    }
    const pendingRTWRecords = await prisma.returnToWork.findMany({
      where: {
        completedAt: null,
        leaveRequest: rtwLeaveRequestFilter,
      },
      include: {
        leaveRequest: {
          include: { employee: true },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 10,
    })

    // The list above is capped at 10 for the UI; the count needs to
    // reflect the TRUE total in scope so the dashboard banner doesn't say
    // "10" when there are actually 23. Run a separate count query with
    // the same scoping filter.
    pendingRTWCount = await prisma.returnToWork.count({
      where: {
        completedAt: null,
        leaveRequest: rtwLeaveRequestFilter,
      },
    })
    pendingRTWs = pendingRTWRecords.map((rtw) => ({
      id: rtw.id,
      leaveId: rtw.leaveRequest.id,
      employeeName: `${rtw.leaveRequest.employee.firstName} ${rtw.leaveRequest.employee.lastName}`,
      endDate: rtw.leaveRequest.endDate.toISOString(),
    }))
  }

  // ── Enrich pending approvals with balance + clash data ──
  type EnrichedApproval = {
    id: string
    employeeName: string
    policyName: string
    startDate: string
    endDate: string
    reason: string | null
    totalAllowance: number
    balanceAfter: number
    requestDays: number
    clashCount: number
    clashNames: string[]
  }

  let enrichedApprovals: EnrichedApproval[] = []

  if (canApprove && pendingApprovals.length > 0) {
    const year = getLeaveYear(tenant.leaveYearStartMonth, new Date())

    // Get public holidays for business day calculation
    const publicHolidays = await prisma.publicHoliday.findMany({
      where: { tenantId },
      select: { date: true },
    })
    // (#199) Use toLocalDayKey so BST-stored dates (UTC 23:00 of the
    // previous day) still resolve to the intended local day. The raw
    // toISOString().split() pattern was off-by-one near midnight.
    // Gated on deductBankHolidays to mirror calculateLeaveDays — when
    // the tenant counts bank holidays as leave days, the "(N days)" on a
    // pending approval must include them, matching what approval will
    // actually deduct.
    const holidaySet = tenant.deductBankHolidays
      ? new Set<string>()
      : new Set(publicHolidays.map(h => toLocalDayKey(h.date)))

    // Batch-fetch balances and employee data for all pending approval employees
    const employeeIds = [...new Set(pendingApprovals.map(a => a.employeeId))]
    const policyIds = [...new Set(pendingApprovals.map(a => a.policyId))]

    const [balances, employees] = await Promise.all([
      prisma.leaveBalance.findMany({
        where: { tenantId, employeeId: { in: employeeIds }, policyId: { in: policyIds }, year },
        include: { policy: true },
      }),
      prisma.employee.findMany({
        where: { tenantId, id: { in: employeeIds } },
        select: {
          id: true,
          department: true,
          startDate: true,
          workingPattern: { select: { dayOfWeek: true, isWorkingDay: true } },
        },
      }),
    ])

    // Build lookup maps
    const balanceMap = new Map(balances.map(b => [`${b.employeeId}:${b.policyId}`, b]))
    const employeeMap = new Map(employees.map(e => [e.id, e]))

    // Pre-fetch ALL clashing leave for the relevant departments + date span in
    // ONE query. Previously the per-approval loop fired a separate findMany per
    // approval (N+1) — at 50 pending approvals that was 50 sequential round
    // trips. Now: 1 query, then group/filter in JS.
    const departments = [
      ...new Set(
        Array.from(employeeMap.values())
          .map((e) => e.department)
          .filter((d): d is string => !!d)
      ),
    ]
    type ClashRow = {
      id: string
      employeeId: string
      startDate: Date
      endDate: Date
      employee: { firstName: string; lastName: string; department: string | null }
    }
    const clashesByDept = new Map<string, ClashRow[]>()
    if (departments.length > 0 && pendingApprovals.length > 0) {
      const minStart = pendingApprovals.reduce(
        (m, a) => (a.startDate < m ? a.startDate : m),
        pendingApprovals[0].startDate
      )
      const maxEnd = pendingApprovals.reduce(
        (m, a) => (a.endDate > m ? a.endDate : m),
        pendingApprovals[0].endDate
      )
      const allClashes = await prisma.leaveRequest.findMany({
        where: {
          tenantId,
          status: { in: ['APPROVED', 'PENDING'] },
          employee: { department: { in: departments } },
          startDate: { lte: maxEnd },
          endDate: { gte: minStart },
        },
        select: {
          id: true,
          employeeId: true,
          startDate: true,
          endDate: true,
          employee: { select: { firstName: true, lastName: true, department: true } },
        },
      })
      for (const c of allClashes) {
        const dept = c.employee.department
        if (!dept) continue
        const list = clashesByDept.get(dept) ?? []
        list.push(c)
        clashesByDept.set(dept, list)
      }
    }

    enrichedApprovals = await Promise.all(
      pendingApprovals.map(async (a) => {
        const emp = employeeMap.get(a.employeeId)
        const balKey = `${a.employeeId}:${a.policyId}`
        let balance = balanceMap.get(balKey)

        // If no balance record exists, create one lazily
        if (!balance) {
          let allowance: number = a.policy.defaultAllowance
          if (a.policy.unit === 'hours') {
            const hpd = a.employee.hoursPerDay ?? 7.5
            allowance = a.policy.defaultAllowance * hpd
          }
          if (emp?.startDate) {
            allowance = calculateProRataAllowance(
              allowance,
              new Date(emp.startDate),
              tenant.leaveYearStartMonth,
              year
            )
          }
          balance = {
            allowance,
            used: 0,
            pending: 0,
            policyId: a.policyId,
            employeeId: a.employeeId,
            policy: a.policy,
          } as typeof balances[0]
        }

        // Calculate days in this request — pass the employee's working
        // pattern so a part-timer's request shows the days approval will
        // actually deduct, not a Mon-Fri assumption.
        const empPatternRows = emp?.workingPattern ?? []
        const empWorkingDays =
          empPatternRows.length > 0
            ? new Set(empPatternRows.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek))
            : undefined
        const requestDays = countBusinessDays(
          a.startDate,
          a.endDate,
          holidaySet,
          a.halfDayStart,
          a.halfDayEnd,
          empWorkingDays
        )

        const totalAllowance = balance.allowance
        // Balance after = allowance - used - pending (pending already includes this request)
        const balanceAfter = totalAllowance - balance.used - balance.pending

        // Find department clashes from the pre-fetched map (was N+1 per
        // approval; now O(1) per approval against an in-memory map).
        let clashCount = 0
        const clashNames: string[] = []
        const dept = emp?.department

        if (dept) {
          const deptClashes = clashesByDept.get(dept) ?? []
          const overlapping = deptClashes.filter(
            (cr) =>
              cr.id !== a.id &&
              cr.employeeId !== a.employeeId &&
              cr.startDate <= a.endDate &&
              cr.endDate >= a.startDate
          )
          clashCount = overlapping.length
          for (const cr of overlapping.slice(0, 5)) {
            clashNames.push(`${cr.employee.firstName} ${cr.employee.lastName}`)
          }
        }

        return {
          id: a.id,
          employeeName: `${a.employee.firstName} ${a.employee.lastName}`,
          policyName: a.policy.name,
          startDate: a.startDate.toISOString(),
          endDate: a.endDate.toISOString(),
          reason: a.reason,
          totalAllowance: Math.round(totalAllowance * 10) / 10,
          balanceAfter: Math.round(balanceAfter * 10) / 10,
          requestDays: Math.round(requestDays * 10) / 10,
          clashCount,
          clashNames,
        }
      })
    )
  }

  const onboardingInProgress = onboardingChecklists
    .map((cl) => {
      const total = cl.tasks.length
      const completed = cl.tasks.filter((t) => t.completedAt).length
      return {
        employeeId: cl.employee.id,
        employeeName: `${cl.employee.firstName} ${cl.employee.lastName}`,
        completed,
        total,
      }
    })
    .filter((o) => o.total > 0 && o.completed < o.total)

  const leaveYearLabel = formatLeaveYearLabel(tenant.leaveYearStartMonth, year)

  return {
    employeeCount,
    pendingLeaveCount,
    myBalances,
    myToilBalance,
    leaveYearLabel,
    hasEmployeeRecord: !!myEmployee,
    upcomingAbsencesCount: upcomingAbsences.length,
    upcomingAbsences: upcomingAbsences.map((a) => ({
      id: a.id,
      employeeName: `${a.employee.firstName} ${a.employee.lastName}`,
      policyName: a.policy.name,
      // Thread isSystemType so the page can pick the correct icon per entry
      // instead of always using the blue CalendarDays (#49).
      isSystemType: a.policy.isSystemType,
      // Company-closure auto-bookings — UI collapses these into a single row
      // per closure so a 10-person mandatory shutdown doesn't flood the feed.
      companyLeaveId: a.companyLeaveId,
      companyLeaveName: a.companyLeave?.name ?? null,
      startDate: a.startDate.toISOString(),
      endDate: a.endDate.toISOString(),
    })),
    pendingApprovals: enrichedApprovals.length > 0
      ? enrichedApprovals
      : pendingApprovals.map((a) => ({
          id: a.id,
          employeeName: `${a.employee.firstName} ${a.employee.lastName}`,
          policyName: a.policy.name,
          startDate: a.startDate.toISOString(),
          endDate: a.endDate.toISOString(),
          reason: a.reason,
          totalAllowance: 0,
          balanceAfter: 0,
          requestDays: 0,
          clashCount: 0,
          clashNames: [] as string[],
        })),
    isOnboarded: !!tenant.onboardedAt,
    canApprove,
    hasLeavePolicies: leavePolicyCount > 0,
    upcomingBirthdays: upcomingBirthdays.slice(0, 5),
    workAnniversaries: workAnniversaries.slice(0, 5),
    activeAnnouncements: activeAnnouncements.map(a => ({
      id: a.id,
      title: a.title,
      content: a.content,
      publishedAt: a.publishedAt?.toISOString() ?? new Date().toISOString(),
      authorName: announcementAuthorMap.get(a.authorId) || 'Unknown',
    })),
    onboardingInProgress,
    whoIsOffToday: offTodayFiltered.map((r) => {
      // Skip non-working days based on the employee's actual working
      // pattern. Falls back to Mon-Fri when no pattern is set. Without
      // this, a Friday finish showed "Back Sat" for office staff, and
      // shift workers who work weekends would show "Back Mon" even
      // though they're due in on Saturday.
      const empPattern = workingPatternMap.get(r.employee.id)
      const workingDays = empPattern ?? DEFAULT_WORKING_DOW
      // Resolve the canonical end day via toLocalDayKey FIRST — r.endDate
      // is stored at UTC 23:00 of the previous day for BST-period leave,
      // so walking from the raw stored instant started one day behind and
      // showed "Back" a day early. Walk forward at UTC noon so day-of-week
      // checks are unambiguous.
      const [ey, em, ed] = toLocalDayKey(r.endDate).split('-').map(Number)
      const returnDate = new Date(Date.UTC(ey, em - 1, ed, 12))
      returnDate.setUTCDate(returnDate.getUTCDate() + 1)
      // Advance until we hit a working day (cap at 7 to avoid infinite loop on empty patterns)
      let guard = 0
      while (!workingDays.has(returnDate.getUTCDay()) && guard < 7) {
        returnDate.setUTCDate(returnDate.getUTCDate() + 1)
        guard++
      }
      return {
        id: r.id,
        employeeId: r.employee.id,
        employeeName: `${r.employee.firstName} ${r.employee.lastName}`,
        policyName: r.policy.name,
        // Thread isSystemType through so the UI can bucket by policy type
        // instead of string-matching the policy name (#17). Renaming a
        // policy to 'Wellbeing' used to drop it into 'Other'.
        isSystemType: r.policy.isSystemType,
        returnDate: returnDate.toISOString(),
      }
    }),
    myNextLeave: myNextLeaveRaw
      ? {
          policyName: myNextLeaveRaw.companyLeave
            ? `${myNextLeaveRaw.policy.name} (${myNextLeaveRaw.companyLeave.name})`
            : myNextLeaveRaw.policy.name,
          startDate: myNextLeaveRaw.startDate.toISOString(),
          endDate: myNextLeaveRaw.endDate.toISOString(),
        }
      : null,
    pendingRTWCount,
    pendingRTWs,
  }
}

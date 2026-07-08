import { BackLink } from '@/components/shared/back-link'
import { CardSection } from '@/components/shared/card-section'
import { getEmployee, getWorkingPattern } from '../actions'
import { getEmployeeBalances } from '../../leave/balance-actions'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'
import { calculateBradfordFactor } from '../bradford-factor'
import { BradfordFactorCard } from './bradford-factor-card'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { getLeaveYear, formatLeaveYearLabel } from '@/lib/leave-year'
import { notFound } from 'next/navigation'
import { getToilAccruals, getToilBalance } from '../../toil/actions'
import { getEmployeeLatenessCount } from '../../leave/lateness-actions'
import { getEmployeeChecklist } from '../actions'
import { ProfileHeader } from './_components/profile-header'
import { ProfileTabs } from './profile-tabs'
import { AbsenceTab } from './_components/absence-tab'
import { EmploymentTab } from './_components/employment-tab'
import { OvertimeTab } from './_components/overtime-tab'
import { PersonalTab } from './_components/personal-tab'
import { EmergenciesTab } from './_components/emergencies-tab'
import { OnboardingProgress } from './onboarding-progress'
import { EmployeeNotes } from './employee-notes'

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; employeeId: string }>
}) {
  const { tenantSlug, employeeId } = await params
  let employee: Awaited<ReturnType<typeof getEmployee>>
  let balances: Awaited<ReturnType<typeof getEmployeeBalances>> = []
  let canManage = false
  let isAdmin = false
  let isOwnProfile = false
  let bradfordResult: Awaited<ReturnType<typeof calculateBradfordFactor>> | null = null
  let checklist: Awaited<ReturnType<typeof getEmployeeChecklist>> = null
  let authorMap = new Map<string, string>()
  let leaveYearLabel = ''
  let workingDaysLabel = ''
  // Working day-of-week numbers (0=Sun..6=Sat) for the absence calendar so it
  // only colours leave on actual working days. Defaults to Mon–Fri.
  let calendarWorkingDays: number[] = [1, 2, 3, 4, 5]
  let toilAccruals: { id: string; date: string; hours: number; reason: string | null; status: string; createdAt: string }[] = []
  let toilBalance = { accrued: 0, used: 0, remaining: 0 }
  let emergencyContacts: { id: string; name: string; relationship: string; phone: string; email: string | null; isPrimary: boolean }[] = []
  let latenessCount = 0
  let upcomingHolidays: { id: string; name: string; date: string }[] = []
  let upcomingCompanyLeave: { id: string; name: string; startDate: string; endDate: string }[] = []
  let shouldHideEmail = false
  let shouldHideWorkingStatus = false
  let leaveHistoryHolidays = new Set<string>()
  let leaveHistoryWorkingDays: Set<number> | undefined

  try {
    const { membership, tenant, user } = await requireTenant(tenantSlug)
    canManage = isAtLeast(membership, 'MANAGER')
    isAdmin = isAtLeast(membership, 'ADMIN')
    const isEmployeeRole = !isAtLeast(membership, 'MANAGER')
    shouldHideEmail = tenant.hideEmployeeEmails && isEmployeeRole
    shouldHideWorkingStatus = !tenant.showWorkingStatus
    const lyYear = getLeaveYear(tenant.leaveYearStartMonth, new Date())
    leaveYearLabel = formatLeaveYearLabel(tenant.leaveYearStartMonth, lyYear)
    employee = await getEmployee(tenantSlug, employeeId)
    isOwnProfile = !!employee.userId && employee.userId === user.userId
    balances = await getEmployeeBalances(tenantSlug, employeeId)
    if (canManage) {
      bradfordResult = await calculateBradfordFactor(tenant.id, employeeId)
    }
    checklist = await getEmployeeChecklist(tenantSlug, employeeId).catch(() => null)

    // Working pattern
    const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const wpPattern = await getWorkingPattern(tenantSlug, employeeId)
    const workingDayNums = wpPattern.filter((d) => d.isWorkingDay).map((d) => d.dayOfWeek)
    const sortOrder = [1, 2, 3, 4, 5, 6, 0]
    workingDayNums.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
    workingDaysLabel = workingDayNums.map((d) => DAY_SHORT[d]).join(', ')
    if (workingDayNums.length > 0) calendarWorkingDays = workingDayNums

    // Working days + holiday sets for leave-history business-day math.
    // Mirrors calculateLeaveDays in leave/balance-actions.ts so the row
    // totals reconcile with the balance KPIs above.
    if (workingDayNums.length > 0) {
      leaveHistoryWorkingDays = new Set(workingDayNums)
    }
    if (!tenant.deductBankHolidays) {
      const allHolidays = await prisma.publicHoliday.findMany({
        where: { tenantId: tenant.id },
        select: { date: true },
      })
      leaveHistoryHolidays = new Set(
        // (#199) toLocalDayKey, not raw toISOString().split.
        allHolidays.map((h: { date: Date }) => toLocalDayKey(h.date))
      )
    }

    // Resolve author names
    const noteAuthorIds = employee.notes.map((n) => n.authorId)
    const decidedByIds = employee.leaveRequests
      .map((lr) => lr.decidedBy)
      .filter((id): id is string => id !== null)
    const authorIds = [...new Set([...noteAuthorIds, ...decidedByIds])]
    const authors = authorIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: authorIds } },
          select: { id: true, name: true, email: true },
        })
      : []
    authorMap = new Map(authors.map((a) => [a.id, a.name || a.email]))

    // TOIL data
    try {
      const rawAccruals = await getToilAccruals(tenantSlug, { employeeId })
      toilAccruals = rawAccruals.map((a) => ({
        id: a.id,
        date: a.date.toISOString(),
        hours: a.hours,
        reason: a.reason,
        status: a.status,
        createdAt: a.createdAt.toISOString(),
      }))
      toilBalance = await getToilBalance(tenantSlug, employeeId)
    } catch {
      // TOIL not configured
    }

    // Emergency contacts
    const rawContacts = await prisma.emergencyContact.findMany({
      where: { employeeId, tenantId: tenant.id },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    })
    emergencyContacts = rawContacts.map((c) => ({
      id: c.id,
      name: c.name,
      relationship: c.relationship,
      phone: c.phone,
      email: c.email,
      isPrimary: c.isPrimary,
    }))

    // Lateness count
    latenessCount = await getEmployeeLatenessCount(tenantSlug, employeeId)

    // Public holidays and company close days for the calendar view.
    // Previously this only loaded holidays from today forward, so past
    // bank holidays (Easter, etc.) didn't show blue on the calendar
    // grid. Load the full display range — current leave year + next.
    const today = new Date()
    const leaveYearStart = new Date(
      today.getMonth() + 1 >= (tenant.leaveYearStartMonth || 4)
        ? today.getFullYear()
        : today.getFullYear() - 1,
      (tenant.leaveYearStartMonth || 4) - 1,
      1,
    )
    const displayEnd = new Date(leaveYearStart)
    displayEnd.setFullYear(displayEnd.getFullYear() + 2)
    const [rawHolidays, rawCompanyLeave] = await Promise.all([
      prisma.publicHoliday.findMany({
        where: { tenantId: tenant.id, date: { gte: leaveYearStart, lte: displayEnd } },
        orderBy: { date: 'asc' },
      }),
      prisma.companyLeave.findMany({
        where: { tenantId: tenant.id, endDate: { gte: today } },
        orderBy: { startDate: 'asc' },
      }),
    ])
    upcomingHolidays = rawHolidays.map((h) => ({
      id: h.id,
      name: h.name,
      date: h.date.toISOString(),
    }))
    upcomingCompanyLeave = rawCompanyLeave.map((c) => ({
      id: c.id,
      name: c.name,
      startDate: c.startDate.toISOString(),
      endDate: c.endDate.toISOString(),
    }))
  } catch {
    notFound()
  }

  const notesWithAuthors = employee.notes.map((n) => ({
    id: n.id,
    content: n.content,
    authorId: n.authorId,
    authorName: authorMap.get(n.authorId) || 'Unknown',
    createdAt: n.createdAt.toISOString(),
  }))

  // Leave KPIs — pick the PRIMARY annual leave policy (the one with the
  // largest allowance, as a heuristic for "the main holiday entitlement")
  // and report only its numbers. The previous implementation summed every
  // non-system policy's used/remaining into one tile, which mixed together
  // hours-based policies, study leave, unpaid leave, parental leave, and
  // TOIL — producing a number with no clean unit and no clear meaning.
  // Using a single primary policy keeps the tile honest. Tenants with
  // multiple equal-weight policies get the right number on the per-policy
  // table further down the page (LeaveBalances component). (Round 5 #3.)
  const nonSystemBalances = balances.filter((b) => !b.isSystemType)
  // Prefer days-based policies when picking the primary so an hours-based
  // policy doesn't outrank annual leave just because hours-per-day
  // multiplication makes its allowance appear larger.
  const sortedForPrimary = [...nonSystemBalances].sort((a, b) => {
    const aDays = a.policyUnit !== 'hours'
    const bDays = b.policyUnit !== 'hours'
    if (aDays !== bDays) return aDays ? -1 : 1
    return b.allowance - a.allowance
  })
  const primaryAnnual = sortedForPrimary[0] ?? null
  const totalUsed = primaryAnnual ? primaryAnnual.used : 0
  const totalRemaining = primaryAnnual
    ? Number((primaryAnnual.remaining ?? primaryAnnual.allowance - primaryAnnual.used - primaryAnnual.pending).toFixed(1))
    : 0
  const pendingCount = employee.leaveRequests.filter((lr) => lr.status === 'PENDING').length

  // Sickness count: number of distinct sickness episodes (APPROVED + PENDING)
  // across ALL TIME, computed from the actual leave requests rather than the
  // current-year LeaveBalance row. Two reasons:
  //   1) The previous implementation summed `used + pending` from sickness
  //      LeaveBalance rows, which Prisma scopes to the current leave year
  //      only via getEmployeeBalances → year filter. Anything older was
  //      silently invisible — an employee on the live tenant showed "1"
  //      while several historical sickness reports existed.
  //   2) The KPI tile is labelled "Sickness" with no unit, so a number that
  //      represents days is read as incidents by humans. Switching to a
  //      true incident count + a "Sickness episodes" label removes the
  //      ambiguity. The Bradford Factor card alongside also operates on
  //      incidents, so the two now agree.
  // We deliberately use isSystemType (the structural flag) and NOT a name
  // substring like "sick" — tenants who renamed their policy used to fall
  // outside the substring filter.
  const sicknessCount = employee.leaveRequests.filter(
    (lr) =>
      lr.policy.isSystemType === 'sickness' &&
      (lr.status === 'APPROVED' || lr.status === 'PENDING'),
  ).length

  // Map leave requests. Use business-day math (same inputs as calculateLeaveDays
  // in leave/balance-actions.ts) so the row daysCount reconciles with the
  // balance KPIs above — a Fri–Mon request should show 2 days, not 4.
  const mappedLeaveRequests = employee.leaveRequests.map((lr) => {
    const start = new Date(lr.startDate)
    const end = new Date(lr.endDate)
    const daysCount = countBusinessDays(
      start,
      end,
      leaveHistoryHolidays,
      lr.halfDayStart,
      lr.halfDayEnd,
      leaveHistoryWorkingDays
    )
    return {
      id: lr.id,
      policyName: lr.policy.name,
      // (#196) Carry isSystemType through so the absence tab can match
      // sickness/lateness without name substring guessing.
      policyIsSystemType: lr.policy.isSystemType,
      status: lr.status,
      startDate: lr.startDate.toISOString(),
      endDate: lr.endDate.toISOString(),
      daysCount,
      reason: lr.reason,
      decidedByName: lr.decidedBy ? (authorMap.get(lr.decidedBy) || null) : null,
      decidedAt: lr.decidedAt ? lr.decidedAt.toISOString() : null,
    }
  })

  // Serialize employee data for client components
  const employeeForEmployment = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    jobTitle: employee.jobTitle,
    department: employee.department,
    startDate: employee.startDate ? employee.startDate.toISOString() : null,
    contractType: employee.contractType,
    noticePeriod: employee.noticePeriod,
    probationEndDate: employee.probationEndDate ? employee.probationEndDate.toISOString() : null,
    workingLocation: employee.workingLocation,
    hoursPerDay: employee.hoursPerDay,
    salary: employee.salary ? employee.salary.toString() : null,
    salaryFrequency: employee.salaryFrequency,
    payrollNumber: employee.payrollNumber,
    taxCode: employee.taxCode,
    niNumber: employee.niNumber,
    pensionProvider: employee.pensionProvider,
    pensionNumber: employee.pensionNumber,
    bankName: employee.bankName,
    bankAccountNumber: employee.bankAccountNumber,
    bankSortCode: employee.bankSortCode,
    status: employee.status,
    managerId: employee.managerId,
    managerName: employee.manager ? `${employee.manager.firstName} ${employee.manager.lastName}` : null,
    terminationDate: employee.terminationDate ? employee.terminationDate.toISOString() : null,
    terminationReason: employee.terminationReason,
    exitInterview: employee.exitInterview,
  }

  const employeeForPersonal = {
    title: employee.title,
    firstName: employee.firstName,
    middleName: employee.middleName,
    lastName: employee.lastName,
    dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toISOString() : null,
    gender: employee.gender,
    ethnicity: employee.ethnicity,
    email: shouldHideEmail && !isOwnProfile ? null : employee.email,
    personalEmail: shouldHideEmail && !isOwnProfile ? null : employee.personalEmail,
    phone: employee.phone,
    homePhone: employee.homePhone,
    workPhone: employee.workPhone,
    workExtension: employee.workExtension,
    address: employee.address,
    covidVaccinated: employee.covidVaccinated,
    medicalNotes: employee.medicalNotes,
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/employees`} label="Employees" />

      <ProfileHeader
        tenantSlug={tenantSlug}
        employeeId={employeeId}
        firstName={employee.firstName}
        lastName={employee.lastName}
        email={shouldHideEmail && !isOwnProfile ? null : employee.email}
        jobTitle={employee.jobTitle}
        department={employee.department}
        workingStatus={shouldHideWorkingStatus ? null : employee.workingStatus}
        canManage={canManage}
      />

      {checklist && checklist.tasks.length > 0 && (
        <div className="mb-6">
          <OnboardingProgress tenantSlug={tenantSlug} tasks={checklist.tasks} />
        </div>
      )}

      <ProfileTabs tabs={[
        {
          id: 'absence',
          label: 'Absence',
          content: (
            <AbsenceTab
              tenantSlug={tenantSlug}
              employeeId={employeeId}
              balances={balances}
              leaveRequests={mappedLeaveRequests}
              totalUsed={totalUsed}
              totalRemaining={totalRemaining}
              pendingCount={pendingCount}
              sicknessCount={sicknessCount}
              latenessCount={latenessCount}
              canManage={canManage}
              leaveYearLabel={leaveYearLabel}
              upcomingHolidays={upcomingHolidays}
              upcomingCompanyLeave={upcomingCompanyLeave}
              workingDays={calendarWorkingDays}
            />
          ),
        },
        {
          id: 'employment',
          label: 'Employment',
          content: (
            <div className="space-y-6">
              <EmploymentTab
                tenantSlug={tenantSlug}
                employeeId={employeeId}
                employee={employeeForEmployment}
                workingDaysLabel={workingDaysLabel}
                leaveYearLabel={leaveYearLabel}
                canManage={canManage}
                isAdmin={isAdmin}
              />
              {canManage && bradfordResult && (
                <BradfordFactorCard result={bradfordResult} />
              )}
            </div>
          ),
        },
        {
          id: 'overtime',
          label: 'Overtime',
          content: (
            <OvertimeTab
              tenantSlug={tenantSlug}
              employeeId={employeeId}
              toilAccruals={toilAccruals}
              toilBalance={toilBalance}
              canManage={canManage}
            />
          ),
        },
        {
          id: 'personal',
          label: 'Personal',
          content: (
            <PersonalTab
              tenantSlug={tenantSlug}
              employeeId={employeeId}
              employee={employeeForPersonal}
              canManage={canManage}
              isOwnProfile={isOwnProfile}
            />
          ),
        },
        {
          id: 'emergencies',
          label: 'Emergencies',
          content: (
            <EmergenciesTab
              tenantSlug={tenantSlug}
              employeeId={employeeId}
              contacts={emergencyContacts}
              canManage={canManage}
            />
          ),
        },
        // NOTE: the Documents tab is intentionally hidden (route files kept)
        // until R2-backed document storage lands (#76) — prospects kept
        // hitting the "feature is being rebuilt" empty state via this tab.
      ]} />

      {canManage && (
        <div className="mt-6">
          <CardSection title="Notes">
            <EmployeeNotes
              tenantSlug={tenantSlug}
              employeeId={employeeId}
              notes={notesWithAuthors}
              canAdd={canManage}
            />
          </CardSection>
        </div>
      )}
    </div>
  )
}

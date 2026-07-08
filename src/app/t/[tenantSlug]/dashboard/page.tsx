import { Users, CalendarDays, Clock, Cake, Megaphone, ClipboardCheck, ClipboardList, UserCheck, Palmtree, Circle, CheckCircle2, FileWarning, Thermometer, AlarmClock, Plus, UserPlus, AlertTriangle, Building2 } from 'lucide-react'
import { getDashboardData } from './actions'
import { getOutstandingFitNoteCount } from '../leave/actions'
import { getLatenessLast30Days, getActiveEmployeesForLateness } from '../leave/lateness-actions'
import { getTeamAnalytics, getMonthlySicknessSummary, getMySicknessTrend } from './dashboard-actions'
import { MySummary } from './my-balance-summary'
import { TeamAnalytics } from './team-analytics'
import { MonthlySicknessSummary } from './monthly-sickness-summary'
import { MySicknessTrend } from './my-sickness-trend'
import { RecordLatenessDialog } from './record-lateness-dialog'
import { BroadcastAlertDialog } from './broadcast-alert-dialog'
import Link from 'next/link'
import { toLocalDayKey } from '@/lib/business-days'

// Tiny local helper — pluralise a noun based on count (#35). Kept inline
// because src/lib is owned by another pack.
function pluralise(n: number, singular: string, plural: string): string {
  return n === 1 ? singular : plural
}

// Format a stored leave date for display. This page is a server component
// (UTC runtime on Workers), so raw toLocaleDateString rendered BST-stored
// dates (UTC 23:00 of the previous day) one day early — the date range
// next to a correct "(N days)" count visibly disagreed with the leave
// pages. Normalise via toLocalDayKey, then format at UTC noon.
function formatStoredDay(iso: string, opts: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = toLocalDayKey(new Date(iso)).split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-GB', {
    ...opts,
    timeZone: 'UTC',
  })
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const [data, outstandingFitNotes, latenessLast30Days, activeEmployees, teamAnalytics, monthlySickness, mySicknessTrend] = await Promise.all([
    getDashboardData(tenantSlug),
    getOutstandingFitNoteCount(tenantSlug),
    getLatenessLast30Days(tenantSlug),
    getActiveEmployeesForLateness(tenantSlug),
    getTeamAnalytics(tenantSlug),
    getMonthlySicknessSummary(tenantSlug),
    getMySicknessTrend(tenantSlug),
  ])

  return (
    <div>
      <h1 className="sr-only">Dashboard</h1>

      {/* Solo-owner nudge: OWNER/ADMIN with only themselves on the team can't
          properly test Leavely — so surface a prominent "Invite your team"
          banner until they add anyone else. Dismissible via the /employees
          route once they have more than 1 person. */}
      {data.canApprove && data.employeeCount <= 1 && (
        <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 dark:border-emerald-900 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Add your team to see Leavely work properly</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">Approvals, balances, the calendar — none of it makes sense with a team of one. Add a couple of people and poke around.</p>
          </div>
          <div className="flex gap-2 shrink-0 w-full sm:w-auto">
            <Link
              href={`/t/${tenantSlug}/employees/new`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add teammate
            </Link>
            <Link
              href={`/t/${tenantSlug}/onboarding?step=1`}
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border bg-white dark:bg-gray-900 hover:bg-accent transition-colors"
            >
              Import CSV
            </Link>
          </div>
        </div>
      )}

      {/* Two-column layout: People overview (managers only) + My summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" data-tour="dashboard-overview">
        {/* People overview — managers only. Regular employees shouldn't see
            other people's holidays / sickness, so we hide the whole card and
            let My summary span the full row. */}
        {data.canApprove && (
        <div className="lg:col-span-2 rounded-lg border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold mb-4">People overview</h2>

          <div className="mb-4">
            <div className="flex flex-wrap gap-3 mb-4">
              {/*
                Chip labels were wrong. The "Annual leave" chip was
                counting EVERY non-system policy (study leave, unpaid
                leave, parental leave, TOIL — all rolled in under "Annual
                leave"). The "Other" chip was counting things with
                isSystemType ≠ null AND ≠ sickness, which only ever
                catches lateness — but lateness is a single-point record
                that doesn't represent "off today". Relabelled to
                "Off (paid)" / "Sickness" so the meaning matches what's
                actually being counted, and dropped the misleading
                "Other" chip. (Round 5 #6.)
              */}
              <span className="flex items-center gap-1.5 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Off (paid) {data.whoIsOffToday.filter((p: { isSystemType?: string | null }) => p.isSystemType === null).length}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Sickness {data.whoIsOffToday.filter((p: { isSystemType?: string | null }) => p.isSystemType === 'sickness').length}
              </span>
            </div>
          </div>

          {data.whoIsOffToday.length === 0 ? (
            <div className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <span>Nobody is off today</span>
            </div>
          ) : (
            <ul className="space-y-1">
              {data.whoIsOffToday.map((person: { id: string; employeeId: string; employeeName: string; policyName: string; isSystemType?: string | null; returnDate: string }) => {
                const isSick = person.isSystemType === 'sickness'
                const isLate = person.isSystemType === 'lateness'
                return (
                <li key={person.id}>
                  <Link
                    href={`/t/${tenantSlug}/employees/${person.employeeId}`}
                    className="flex items-center justify-between gap-2 text-sm hover:bg-accent rounded-lg p-2.5 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {isSick ? (
                        <Thermometer className="h-4 w-4 text-red-500 shrink-0" />
                      ) : isLate ? (
                        <AlarmClock className="h-4 w-4 text-orange-500 shrink-0" />
                      ) : (
                        <Palmtree className="h-4 w-4 text-amber-500 shrink-0" />
                      )}
                      <span className="font-medium truncate">{person.employeeName}</span>
                      <span className="text-muted-foreground truncate">{person.policyName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                      Back {formatStoredDay(person.returnDate, { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </Link>
                </li>
                )
              })}
            </ul>
          )}

          {data.upcomingAbsences.length > 0 && (() => {
            type Absence = {
              id: string
              employeeName: string
              policyName: string
              isSystemType?: string | null
              companyLeaveId?: string | null
              companyLeaveName?: string | null
              startDate: string
              endDate: string
            }
            type DisplayRow =
              | { kind: 'leave'; data: Absence }
              | {
                  kind: 'closure'
                  id: string
                  closureName: string
                  staffCount: number
                  startDate: string
                  endDate: string
                }

            // Collapse company-closure auto-bookings: 10 rows of "Alex · Holiday"
            // for the Christmas Shutdown become one "Christmas Shutdown · 10 staff"
            // row. Counts are computed across the full fetched window so the
            // collapsed row reflects everyone, even if the un-collapsed list
            // would have been truncated.
            const closureCounts = new Map<string, number>()
            for (const a of data.upcomingAbsences as Absence[]) {
              if (a.companyLeaveId) {
                closureCounts.set(a.companyLeaveId, (closureCounts.get(a.companyLeaveId) ?? 0) + 1)
              }
            }
            const seen = new Set<string>()
            const rows: DisplayRow[] = []
            for (const a of data.upcomingAbsences as Absence[]) {
              if (a.companyLeaveId) {
                if (seen.has(a.companyLeaveId)) continue
                seen.add(a.companyLeaveId)
                rows.push({
                  kind: 'closure',
                  id: 'cl-' + a.companyLeaveId,
                  closureName: a.companyLeaveName ?? 'Company closure',
                  staffCount: closureCounts.get(a.companyLeaveId) ?? 0,
                  startDate: a.startDate,
                  endDate: a.endDate,
                })
              } else {
                rows.push({ kind: 'leave', data: a })
              }
            }

            return (
              <>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-5 mb-2">Upcoming</h4>
                <ul className="space-y-1">
                  {rows.slice(0, 20).map((row) => {
                    if (row.kind === 'closure') {
                      return (
                        <li key={row.id}>
                          <div className="flex items-center justify-between gap-2 text-sm rounded-lg p-2.5 -mx-2 bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                              <span className="font-medium truncate">{row.closureName}</span>
                              <span className="text-muted-foreground truncate">
                                · {row.staffCount} staff (mandatory closure)
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                              {formatStoredDay(row.startDate, { day: 'numeric', month: 'short' })} – {formatStoredDay(row.endDate, { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                        </li>
                      )
                    }
                    const a = row.data
                    const isSick = a.isSystemType === 'sickness'
                    const isLate = a.isSystemType === 'lateness'
                    return (
                      <li key={a.id}>
                        <Link
                          href={`/t/${tenantSlug}/leave/${a.id}`}
                          className="flex items-center justify-between gap-2 text-sm hover:bg-accent rounded-lg p-2.5 -mx-2 transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            {isSick ? (
                              <Thermometer className="h-4 w-4 text-red-500 shrink-0" />
                            ) : isLate ? (
                              <AlarmClock className="h-4 w-4 text-orange-500 shrink-0" />
                            ) : (
                              <CalendarDays className="h-4 w-4 text-blue-500 shrink-0" />
                            )}
                            <span className="font-medium truncate">{a.employeeName}</span>
                            <span className="text-muted-foreground truncate">{a.policyName}</span>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                            {formatStoredDay(a.startDate, { day: 'numeric', month: 'short' })} – {formatStoredDay(a.endDate, { day: 'numeric', month: 'short' })}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                  {rows.length > 20 && (
                    <li>
                      <Link
                        href={`/t/${tenantSlug}/leave/calendar`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline p-2.5 -mx-2"
                      >
                        <CalendarDays className="h-4 w-4" />
                        +{rows.length - 20} more — view calendar
                      </Link>
                    </li>
                  )}
                </ul>
              </>
            )
          })()}

          <Link
            href={`/t/${tenantSlug}/leave/calendar`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-4"
          >
            <CalendarDays className="h-4 w-4" />
            View absences for the week ahead
          </Link>
        </div>
        )}

        {/* My summary — 1/3 width for managers, full row for employees */}
        <div className={data.canApprove ? '' : 'lg:col-span-3'}>
        <MySummary
          balances={data.myBalances}
          toilBalance={data.myToilBalance}
          nextLeave={data.myNextLeave}
          leaveYearLabel={data.leaveYearLabel}
          hasEmployeeRecord={data.hasEmployeeRecord}
          tenantSlug={tenantSlug}
        />
        </div>
      </div>

      {/* Quick actions panel (MANAGER+) */}
      {data.canApprove && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">Quick actions</span>
          <Link
            href={`/t/${tenantSlug}/leave/new`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-accent transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            {/* (#200) Unified to "Book leave" — was previously
                "Add leave" / "Add time off" / "New Leave Request"
                across pages. */}
            Book leave
          </Link>
          <Link
            href={`/t/${tenantSlug}/leave/report-sickness`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-accent transition-colors"
          >
            <Thermometer className="h-3.5 w-3.5" />
            Report sickness
          </Link>
          {/*
            (#155) Removed the RecordLatenessQuickAction pill — the
            quick-access cards row below renders RecordLatenessDialog
            and they were both showing on the same dashboard.
          */}
          <Link
            href={`/t/${tenantSlug}/employees/new`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-accent transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Add employee
          </Link>
          {/*
            (#158) Removed the duplicate "View calendar" pill — the
            quick-access cards row below already has a Calendar card
            linking to the same route.
          */}
          <BroadcastAlertDialog tenantSlug={tenantSlug} />
        </div>
      )}

      {/* Quick-access cards row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {/*
          The two flagship actions: Book leave + Report sickness. Both
          are always visible to everyone (the previous quick-actions
          chip strip was gated on canApprove and hid these from regular
          employees, who are the people most likely to use them).
        */}
        <Link href={`/t/${tenantSlug}/leave/new`} className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900 p-4 shadow-sm hover:shadow-md transition-shadow">
          <Palmtree className="h-5 w-5 text-emerald-600 mb-2" />
          <p className="text-sm font-medium">Book leave</p>
          <p className="text-xs text-muted-foreground">Request time off</p>
        </Link>
        <Link href={`/t/${tenantSlug}/leave/report-sickness`} className="rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900 p-4 shadow-sm hover:shadow-md transition-shadow">
          <Thermometer className="h-5 w-5 text-orange-600 mb-2" />
          <p className="text-sm font-medium">Report sickness</p>
          <p className="text-xs text-muted-foreground">Log an absence</p>
        </Link>

        {data.canApprove && (
          <RecordLatenessDialog tenantSlug={tenantSlug} employees={activeEmployees} />
        )}

        <Link href={`/t/${tenantSlug}/leave/calendar`} className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
          <CalendarDays className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">Calendar</p>
          <p className="text-xs text-muted-foreground">Absences & holidays</p>
        </Link>

        {/* My leave — /leave route filters to the employee's own records for
            non-managers, so this is safe for everyone and gives EMPLOYEEs a
            useful tile on the dashboard instead of a 3-tile graveyard. */}
        <Link href={`/t/${tenantSlug}/leave`} className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
          <Clock className="h-5 w-5 text-sky-500 mb-2" />
          <p className="text-sm font-medium">{data.canApprove ? 'Leave requests' : 'My leave'}</p>
          <p className="text-xs text-muted-foreground">{data.canApprove ? 'All team activity' : 'History & upcoming'}</p>
        </Link>

        {/* Pending approvals + Employees are MANAGER+ only. EMPLOYEEs don't
            approve leave and shouldn't browse the directory — the /employees
            route already redirects them, but the tile was leaking the head-
            count and tempting URL manipulation. */}
        {data.canApprove && (
          <Link href={`/t/${tenantSlug}/leave?status=PENDING`} className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
            <Clock className="h-5 w-5 text-amber-500 mb-2" />
            <p className="text-sm font-medium">Pending approvals</p>
            <p className="text-xs text-muted-foreground">{data.pendingLeaveCount} awaiting review</p>
          </Link>
        )}

        {data.canApprove && (
          <Link href={`/t/${tenantSlug}/employees`} className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
            <Users className="h-5 w-5 text-emerald-500 mb-2" />
            <p className="text-sm font-medium">Employees</p>
            <p className="text-xs text-muted-foreground">{data.employeeCount} {pluralise(data.employeeCount, 'person', 'people')}</p>
          </Link>
        )}

        {data.activeAnnouncements && data.activeAnnouncements.length > 0 ? (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <Megaphone className="h-5 w-5 text-purple-500 mb-2" />
            <p className="text-sm font-medium">Announcements</p>
            <p className="text-xs text-muted-foreground">{data.activeAnnouncements.length} active</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <Cake className="h-5 w-5 text-pink-500 mb-2" />
            <p className="text-sm font-medium">Birthdays</p>
            <p className="text-xs text-muted-foreground">{data.upcomingBirthdays.length} upcoming</p>
          </div>
        )}
      </div>

      {/* Lateness indicator (last 30 days, for managers) */}
      {data.canApprove && latenessLast30Days > 0 && (
        <div className="rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800 p-5 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <AlarmClock className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200 truncate">
                Lateness in the last 30 days
              </h3>
              <p className="text-sm text-orange-600 dark:text-orange-400 truncate">
                {latenessLast30Days} lateness occurrence{latenessLast30Days !== 1 ? 's' : ''} recorded across the team.
              </p>
            </div>
            <Link
              href={`/t/${tenantSlug}/reports/lateness`}
              className="shrink-0 whitespace-nowrap text-sm text-orange-700 hover:underline dark:text-orange-300 sm:ml-auto"
            >
              View report
            </Link>
          </div>
        </div>
      )}

      {/* Outstanding fit notes warning (for managers) */}
      {data.canApprove && outstandingFitNotes > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <FileWarning className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 truncate">
                Outstanding fit notes
              </h3>
              <p className="text-sm text-amber-600 dark:text-amber-400 truncate">
                {outstandingFitNotes} sickness absence{outstandingFitNotes !== 1 ? 's' : ''} exceeding 7 days {outstandingFitNotes !== 1 ? 'are' : 'is'} missing a fit note.
              </p>
            </div>
            <Link
              href={`/t/${tenantSlug}/leave?status=APPROVED`}
              className="shrink-0 whitespace-nowrap text-sm text-amber-700 hover:underline dark:text-amber-300 sm:ml-auto"
            >
              View leave requests
            </Link>
          </div>
        </div>
      )}

      {/* Outstanding return to work interviews (for managers) */}
      {data.canApprove && data.pendingRTWCount > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-5 shadow-sm mb-6">
          <div className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                {data.pendingRTWCount} return to work interview{data.pendingRTWCount !== 1 ? 's' : ''} outstanding
              </h3>
              <ul className="mt-2 space-y-1">
                {data.pendingRTWs.map((rtw: { id: string; leaveId: string; employeeName: string; endDate: string }) => (
                  <li key={rtw.id}>
                    <Link
                      href={`/t/${tenantSlug}/leave/${rtw.leaveId}/return-to-work`}
                      className="flex items-center justify-between text-sm hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg p-2 -mx-2 transition-colors"
                    >
                      <span className="font-medium text-amber-800 dark:text-amber-200">{rtw.employeeName}</span>
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        Ended {formatStoredDay(rtw.endDate, { day: 'numeric', month: 'short' })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Pending approvals detail (for managers) */}
      {data.canApprove && data.pendingApprovals.length > 0 && (
        <div className="rounded-lg border bg-card p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold mb-4">Pending approvals</h3>
          <div className="space-y-3">
            {data.pendingApprovals.map((a: {
              id: string
              employeeName: string
              policyName: string
              startDate: string
              endDate: string
              totalAllowance: number
              balanceAfter: number
              requestDays: number
              clashCount: number
              clashNames: string[]
            }) => {
              const pct = a.totalAllowance > 0 ? (a.balanceAfter / a.totalAllowance) * 100 : 100
              const balanceColor = pct > 50 ? 'text-emerald-600' : pct > 25 ? 'text-amber-600' : 'text-red-600'
              const balanceBg = pct > 50 ? 'bg-emerald-50 dark:bg-emerald-950/20' : pct > 25 ? 'bg-amber-50 dark:bg-amber-950/20' : 'bg-red-50 dark:bg-red-950/20'

              return (
                <Link
                  key={a.id}
                  href={`/t/${tenantSlug}/leave/${a.id}`}
                  className="block rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-medium text-sm">{a.employeeName}</span>
                      <span className="text-muted-foreground text-sm ml-2">{a.policyName}</span>
                      {a.requestDays > 0 && (
                        <span className="text-muted-foreground text-xs ml-2">({a.requestDays} {a.requestDays === 1 ? 'day' : 'days'})</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatStoredDay(a.startDate, { day: 'numeric', month: 'short' })} – {formatStoredDay(a.endDate, { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    {/* Balance after approval */}
                    {a.totalAllowance > 0 && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${balanceBg} ${balanceColor} font-medium`}>
                        Will have {a.balanceAfter} of {a.totalAllowance} remaining
                      </span>
                    )}

                    {/* Clash status */}
                    {a.clashCount === 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        No clashes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 font-medium" title={a.clashNames.join(', ')}>
                        <AlertTriangle className="h-3 w-3" />
                        {a.clashCount} {a.clashCount === 1 ? 'clash' : 'clashes'}{a.clashNames.length > 0 ? `: ${a.clashNames.slice(0, 2).join(', ')}${a.clashNames.length > 2 ? '...' : ''}` : ''}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Getting started (new tenants only) */}
      {!data.isOnboarded && (
        <div className="rounded-lg border bg-card p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold mb-3">Getting started</h3>
          <div className="space-y-1">
            {[
              // #36: was 'Create your organization' with href='#' — UK spelling,
              // and link to Settings → General now that the tenant exists.
              { done: true, label: 'Create your organisation', href: `/t/${tenantSlug}/settings/general` },
              { done: data.employeeCount > 0, label: 'Add your first employee', href: `/t/${tenantSlug}/employees/new` },
              { done: data.hasLeavePolicies, label: 'Set up leave policies', href: `/t/${tenantSlug}/settings/leave-policies` },
              // #37: was hardcoded `done: false` — never tickable. Tie to onboarding state.
              { done: data.isOnboarded, label: 'Complete onboarding', href: `/t/${tenantSlug}/onboarding` },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-sm hover:bg-accent rounded-lg p-2.5 -mx-2 transition-colors"
              >
                {item.done ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/30 flex-shrink-0" />
                )}
                <span className={item.done ? 'text-muted-foreground line-through' : 'font-medium'}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* My sickness — last 12 months. Shown to EVERY user on their own
          dashboard, scoped to their own employee record only (server
          enforces this — never returns another employee's data). */}
      {mySicknessTrend && (
        <MySicknessTrend data={mySicknessTrend} />
      )}

      {/* Monthly sickness summary (MANAGER+ only) — list of staff with
          sick days this calendar month, with a copy-to-clipboard button
          for emailing accountant / payroll. */}
      {monthlySickness && (
        <MonthlySicknessSummary data={monthlySickness} />
      )}

      {/* Team Analytics (MANAGER+ only) */}
      {teamAnalytics && (
        <TeamAnalytics data={teamAnalytics} tenantSlug={tenantSlug} />
      )}
    </div>
  )
}

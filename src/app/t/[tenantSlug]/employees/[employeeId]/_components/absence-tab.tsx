'use client'

import { KpiTile } from '@/components/shared/kpi-tile'
import { CardSection } from '@/components/shared/card-section'
import { StatusBadge } from '@/components/shared/status-badge'
import { CalendarDays, Clock, CheckCircle2, Plus, Sun, Thermometer, AlertTriangle, AlarmClock, Flag, Building2, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { recordLateness } from '../../../leave/lateness-actions'
import { adjustLeaveBalance } from '../../../leave/balance-actions'
import { calendarDaysBetween } from '@/lib/business-days'

interface Balance {
  id: string
  policyId: string
  policyName: string
  policyUnit?: string
  year: number
  allowance: number
  // Accrued-to-date (for monthly-accrual policies this can be < allowance).
  // Used as the progress-bar denominator so the bar matches the 'remaining'
  // number users see — previously it used `allowance` which made the KPI
  // tile and balance row disagree (#64).
  accrued?: number
  // `isSystemType` lets us render a different layout for sickness/lateness
  // balances that have allowance 0 — a plain 'days taken' stat rather than
  // a broken '0 of 0 days remaining' bar (#23, #53).
  isSystemType?: string | null
  used: number
  pending: number
  remaining: number
  serviceBonusDays?: number
}

interface LeaveItem {
  id: string
  policyName: string
  // (#196) Carry the structural sickness/lateness flag through so the
  // calendar colouring + sick/non-sick filters don't have to substring
  // policy names.
  policyIsSystemType: string | null
  status: string
  startDate: string
  endDate: string
  daysCount: number
  reason: string | null
  decidedByName: string | null
  decidedAt: string | null
}

interface HolidayItem {
  id: string
  name: string
  date: string
}

interface CompanyLeaveItem {
  id: string
  name: string
  startDate: string
  endDate: string
}

interface AbsenceTabProps {
  tenantSlug: string
  employeeId: string
  balances: Balance[]
  leaveRequests: LeaveItem[]
  totalUsed: number
  totalRemaining: number
  pendingCount: number
  sicknessCount: number
  latenessCount: number
  canManage: boolean
  leaveYearLabel: string
  upcomingHolidays?: HolidayItem[]
  upcomingCompanyLeave?: CompanyLeaveItem[]
  // Employee's working days as JS day-of-week numbers (0=Sun..6=Sat).
  // The calendar only colours leave/sickness on these days so non-working
  // days (e.g. weekends) inside a Fri–Mon block aren't painted red — they
  // aren't charged as leave either (countBusinessDays excludes them), so
  // colouring them was purely misleading. Defaults to Mon–Fri.
  workingDays?: number[]
}

function formatDateGB(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getMonthCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDow = firstDay.getDay() // 0=Sun

  const weeks: (number | null)[][] = []
  let currentWeek: (number | null)[] = []

  // Fill in empty cells before the first day
  for (let i = 0; i < startDow; i++) {
    currentWeek.push(null)
  }

  for (let d = 1; d <= daysInMonth; d++) {
    currentWeek.push(d)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // Fill in the last week
  while (currentWeek.length > 0 && currentWeek.length < 7) {
    currentWeek.push(null)
  }
  if (currentWeek.length === 7) weeks.push(currentWeek)

  return weeks
}

function getBarColor(remaining: number, allowance: number) {
  if (allowance === 0) return 'bg-gray-300'
  const pct = remaining / allowance
  if (pct > 0.5) return 'bg-emerald-500'
  if (pct > 0.25) return 'bg-amber-500'
  return 'bg-red-500'
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function AbsenceTab({
  tenantSlug,
  employeeId,
  balances,
  leaveRequests,
  totalUsed,
  totalRemaining,
  pendingCount,
  sicknessCount,
  latenessCount,
  canManage,
  leaveYearLabel,
  upcomingHolidays = [],
  upcomingCompanyLeave = [],
  workingDays,
}: AbsenceTabProps) {
  // Set of working day-of-week numbers (0=Sun..6=Sat). Falls back to Mon–Fri
  // when no pattern is configured — same default as countBusinessDays, so the
  // calendar colouring and the day counts stay in agreement.
  const workingDaySet = new Set(
    workingDays && workingDays.length > 0 ? workingDays : [1, 2, 3, 4, 5]
  )
  const [showAllMonths, setShowAllMonths] = useState(false)
  const [showAllUpcoming, setShowAllUpcoming] = useState(false)
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Build a local-date key in YYYY-MM-DD format. Using toISOString() would
  // convert to UTC and shift BST-era dates into the previous day, causing
  // the calendar to highlight the wrong cell (#25). `getDayColor` below
  // constructs its lookup key the same way so they match.
  const toLocalKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

  // Build map of leave dates → all entries for that date (#54). A single
  // date can be in both a PENDING annual request and an APPROVED sickness
  // — previously the last-written entry won, so the colour flipped
  // unpredictably. Store an array and pick the dominant entry below.
  const leaveDateMap = new Map<string, Array<{ policyName: string; policyIsSystemType: string | null; status: string }>>()
  for (const lr of leaveRequests) {
    if (lr.status === 'REJECTED' || lr.status === 'CANCELLED') continue
    const start = new Date(lr.startDate)
    const end = new Date(lr.endDate)
    const current = new Date(start)
    while (current <= end) {
      // Skip non-working days (e.g. weekends). A Fri–Mon leave block only
      // charges Fri + Mon, so only those should be coloured — painting the
      // Sat/Sun red made the absence look longer than it is (live report:
      // Darren Heaps' calendar showed weekends red for a Mon–Fri worker).
      if (workingDaySet.has(current.getDay())) {
        const key = toLocalKey(current)
        const list = leaveDateMap.get(key) ?? []
        list.push({ policyName: lr.policyName, policyIsSystemType: lr.policyIsSystemType, status: lr.status })
        leaveDateMap.set(key, list)
      }
      current.setDate(current.getDate() + 1)
    }
  }

  // Build sets for holidays and company close days — also use local keys
  // for consistency (#25).
  const holidayDateSet = new Set<string>()
  for (const h of upcomingHolidays) {
    // Holiday date is a plain ISO string; parsing + local-key keeps it
    // consistent with leave dates on the same calendar.
    holidayDateSet.add(toLocalKey(new Date(h.date)))
  }
  const companyLeaveDateSet = new Set<string>()
  for (const cl of upcomingCompanyLeave) {
    const start = new Date(cl.startDate)
    const end = new Date(cl.endDate)
    const current = new Date(start)
    while (current <= end) {
      companyLeaveDateSet.add(toLocalKey(current))
      current.setDate(current.getDate() + 1)
    }
  }

  function getDayColor(year: number, month: number, day: number): string {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const entries = leaveDateMap.get(dateStr)
    if (entries && entries.length > 0) {
      // Priority: APPROVED sickness > APPROVED annual > PENDING any > other.
      // A date covered by an approved sickness record should always look
      // red even if there's a pending annual overlap.
      const approvedSick = entries.find(
        e => e.status === 'APPROVED' && e.policyIsSystemType === 'sickness'
      )
      if (approvedSick) return 'bg-red-200 text-red-800 rounded'
      const approvedAnnual = entries.find(
        e => e.status === 'APPROVED' && e.policyIsSystemType !== 'sickness'
      )
      if (approvedAnnual) return 'bg-emerald-200 text-emerald-800 rounded'
      const pending = entries.find(e => e.status === 'PENDING')
      if (pending) return 'bg-amber-200 text-amber-800 rounded'
      // Fallback — some other status (shouldn't happen since we filter
      // REJECTED/CANCELLED above).
      return 'bg-muted text-muted-foreground rounded'
    }
    if (holidayDateSet.has(dateStr)) return 'bg-blue-200 text-blue-800 rounded'
    if (companyLeaveDateSet.has(dateStr)) return 'bg-purple-200 text-purple-800 rounded'
    return ''
  }

  const monthsToShow = showAllMonths ? 12 : 3
  const months: { year: number; month: number }[] = []
  for (let i = 0; i < monthsToShow; i++) {
    const m = currentMonth - i
    const y = currentYear + Math.floor(m / 12)
    const adjM = ((m % 12) + 12) % 12
    months.push({ year: y, month: adjM })
  }

  const currentAndUpcoming = leaveRequests.filter(
    (lr) => new Date(lr.endDate) >= now || lr.status === 'PENDING'
  )
  const history = leaveRequests.filter(
    (lr) => new Date(lr.endDate) < now && lr.status !== 'PENDING'
  )

  // Re-derive "remaining" from the balance rows' `remaining` field so the
  // KPI tile matches the per-row number (#64). The parent page computes
  // The primary annual leave total is computed in the page (page.tsx)
  // using the LARGEST days-based non-system policy. The previous
  // implementation here re-derived it by SUMMING every non-system policy
  // — that mixed in TOIL hours, study leave, unpaid leave, parental
  // leave, etc, producing a number with no clean unit. Trust the page's
  // value so the tile matches the row totals further down. (Round 5 #3.)
  const remainingFromBalances = totalRemaining

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile
          label="Annual Leave Used"
          value={totalUsed}
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="border-l-emerald-500"
          iconBg="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600"
        />
        <KpiTile
          label="Remaining"
          value={remainingFromBalances}
          icon={<CalendarDays className="h-5 w-5" />}
          accent="border-l-indigo-500"
          iconBg="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600"
        />
        <KpiTile
          label="Pending"
          value={pendingCount}
          icon={<Clock className="h-5 w-5" />}
          accent="border-l-amber-500"
          iconBg="bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600"
        />
        <KpiTile
          // "Sickness episodes" rather than "Sickness" — the value is now a
          // count of approved+pending sickness REQUESTS across all time
          // (matches Bradford Factor's incident-based semantics). The
          // previous "Sickness" label with a current-year days value was
          // ambiguous and missed historical episodes.
          label="Sickness episodes"
          value={sicknessCount}
          icon={<Thermometer className="h-5 w-5" />}
          accent="border-l-red-500"
          iconBg="bg-gradient-to-br from-red-100 to-red-50 text-red-600"
        />
        <KpiTile
          label="Lateness"
          value={latenessCount}
          icon={<AlertTriangle className="h-5 w-5" />}
          accent="border-l-orange-500"
          iconBg="bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600"
        />
      </div>

      {/* Action buttons */}
      {canManage && (
        <div className="flex flex-wrap gap-2">
          <Link href={`/t/${tenantSlug}/leave/new?employeeId=${employeeId}`}>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add annual leave
            </Button>
          </Link>
          {/*
            Sickness has its own dedicated form at /leave/report-sickness
            with auto-approval and fit-note prompts. The previous link
            went to the regular /leave/new form, which doesn't auto-
            approve and was missing the sickness-specific UX. (Live bug
            report: a manager couldn't submit a sickness for an AWOL
            employee from the regular leave form.)
          */}
          <Link href={`/t/${tenantSlug}/leave/report-sickness?employeeId=${employeeId}`}>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Report sickness
            </Button>
          </Link>
          <RecordLatenessInline tenantSlug={tenantSlug} employeeId={employeeId} />
        </div>
      )}

      {/* Leave Balances */}
      <CardSection title="Leave Balances" description={leaveYearLabel}>
        {balances.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No leave balances configured</p>
        ) : (
          <div className="space-y-4">
            {balances.map((b) => {
              const unitShort = b.policyUnit === 'hours' ? 'h' : 'd'
              const unitLong = b.policyUnit === 'hours' ? 'hours' : 'days'
              // Sickness / lateness / any zero-allowance balance shouldn't
              // render a progress bar — it reads as '0 of 0 days remaining'
              // with an empty grey bar (#23, #53). Show a plain stat instead.
              const isUnlimited = b.isSystemType !== null && b.isSystemType !== undefined
              if (isUnlimited || b.allowance === 0) {
                return (
                  <div key={b.id} className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{b.policyName}</span>
                      {canManage && (
                        <AdjustBalanceDialog
                          tenantSlug={tenantSlug}
                          employeeId={employeeId}
                          balance={b}
                        />
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-muted-foreground">Days taken this year:</span>
                      <span className="text-base font-semibold">{b.used}</span>
                      {b.pending > 0 && (
                        <span className="text-[11px] text-amber-600">(+{b.pending} pending)</span>
                      )}
                    </div>
                  </div>
                )
              }

              // For monthly-accrual policies `accrued` < `allowance`. Use
              // `accrued` as the denominator so the bar matches the
              // 'remaining' number the user sees (#64). For standard/upfront
              // policies `accrued === allowance`, no change.
              const denom = b.accrued ?? b.allowance
              const usedPct = denom > 0 ? (b.used / denom) * 100 : 0
              const pendingPct = denom > 0 ? (b.pending / denom) * 100 : 0
              const remainingPct = denom > 0 ? (b.remaining / denom) * 100 : 0
              const barColor = getBarColor(b.remaining, denom)
              const showAccruedHint = b.accrued !== undefined && b.accrued < b.allowance
              return (
                <div key={b.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{b.policyName}</span>
                      {canManage && (
                        <AdjustBalanceDialog
                          tenantSlug={tenantSlug}
                          employeeId={employeeId}
                          balance={b}
                        />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {b.remaining} of {denom} {unitLong} remaining
                      {showAccruedHint && <span className="ml-1 text-[10px]">(accrued; {b.allowance} full year)</span>}
                    </span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden flex">
                    {b.used > 0 && (
                      <div className="bg-slate-400 h-full transition-all" style={{ width: `${usedPct}%` }} title={`Used: ${b.used}`} />
                    )}
                    {b.pending > 0 && (
                      <div className="bg-amber-300 h-full transition-all" style={{ width: `${pendingPct}%` }} title={`Pending: ${b.pending}`} />
                    )}
                    {b.remaining > 0 && (
                      <div className={`${barColor} h-full transition-all`} style={{ width: `${remainingPct}%` }} title={`Remaining: ${b.remaining}`} />
                    )}
                  </div>
                  <div className="flex gap-4 mt-1 text-[11px] text-muted-foreground">
                    <span>Used: {b.used}{unitShort}</span>
                    <span>Pending: {b.pending}{unitShort}</span>
                    <span>Remaining: {b.remaining}{unitShort}</span>
                    {b.serviceBonusDays !== undefined && b.serviceBonusDays > 0 && (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        +{b.serviceBonusDays}d service bonus
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardSection>

      {/* Calendar grid */}
      <CardSection title="Absence Calendar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map(({ year, month }) => {
            const weeks = getMonthCalendarDays(year, month)
            return (
              <div key={`${year}-${month}`} className="border rounded-lg p-3">
                <h4 className="text-xs font-semibold text-center mb-2">{MONTH_NAMES[month]} {year}</h4>
                <div className="grid grid-cols-7 gap-px text-center text-[10px]">
                  {DAY_HEADERS.map((d, i) => (
                    <div key={i} className="font-medium text-muted-foreground py-1">{d}</div>
                  ))}
                  {weeks.flat().map((day, i) => (
                    <div key={i} className={`py-0.5 text-[10px] ${day ? getDayColor(year, month, day) : ''}`}>
                      {day || ''}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        {!showAllMonths && (
          <div className="text-center mt-3">
            <Button variant="ghost" size="sm" onClick={() => setShowAllMonths(true)}>
              Show all months
            </Button>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded bg-emerald-200" /> Annual leave</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded bg-red-200" /> Sickness</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded bg-amber-200" /> Pending</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded bg-blue-200" /> Bank holiday</span>
          <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded bg-purple-200" /> Company close</span>
        </div>
      </CardSection>

      {/* Upcoming Bank Holidays & Company Close Days. Merged into one
          chronologically-sorted list and collapsed to the next 5 by
          default — the old list dumped 16+ rows spanning 2+ years on page
          load and mixed bank holidays and company closures out of order. */}
      {(() => {
        type UpcomingRow =
          | { kind: 'holiday'; id: string; sortDate: string; data: HolidayItem }
          | { kind: 'company'; id: string; sortDate: string; data: CompanyLeaveItem }
        const rows: UpcomingRow[] = [
          ...upcomingHolidays.map((h): UpcomingRow => ({
            kind: 'holiday',
            id: `h-${h.id}`,
            sortDate: h.date,
            data: h,
          })),
          ...upcomingCompanyLeave.map((cl): UpcomingRow => ({
            kind: 'company',
            id: `c-${cl.id}`,
            sortDate: cl.startDate,
            data: cl,
          })),
        ].sort((a, b) => a.sortDate.localeCompare(b.sortDate))
        if (rows.length === 0) return null
        const INITIAL = 5
        const visible = showAllUpcoming ? rows : rows.slice(0, INITIAL)
        const hiddenCount = rows.length - visible.length
        return (
          <CardSection title="Upcoming Dates">
            <div className="space-y-2">
              {visible.map((row) => {
                if (row.kind === 'holiday') {
                  const h = row.data
                  return (
                    <div key={row.id} className="flex items-center gap-3 text-sm p-2 rounded-lg border-b border-border/50 last:border-0">
                      <Flag className="h-4 w-4 text-blue-500 shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium">{h.name}</span>
                        <span className="text-muted-foreground ml-2">{formatDateGB(h.date)}</span>
                      </div>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-950/30 dark:text-blue-400">Bank holiday</span>
                    </div>
                  )
                }
                const cl = row.data
                const start = new Date(cl.startDate)
                const end = new Date(cl.endDate)
                const days = calendarDaysBetween(start, end)
                return (
                  <div key={row.id} className="flex items-center gap-3 text-sm p-2 rounded-lg border-b border-border/50 last:border-0">
                    <Building2 className="h-4 w-4 text-purple-500 shrink-0" />
                    <div className="flex-1">
                      <span className="font-medium">{cl.name}</span>
                      <span className="text-muted-foreground ml-2">
                        {formatDateGB(cl.startDate)}
                        {days > 1 && <> &ndash; {formatDateGB(cl.endDate)} ({days} days)</>}
                      </span>
                    </div>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded dark:bg-purple-950/30 dark:text-purple-400">Company close</span>
                  </div>
                )
              })}
            </div>
            {rows.length > INITIAL && (
              <div className="text-center mt-3">
                <Button variant="ghost" size="sm" onClick={() => setShowAllUpcoming((v) => !v)}>
                  {showAllUpcoming ? 'Show less' : `Show all (${hiddenCount} more)`}
                </Button>
              </div>
            )}
          </CardSection>
        )
      })()}

      {/* Absence History */}
      <CardSection title="Absence History">
        {leaveRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No absences recorded</p>
        ) : (
          <div className="space-y-4">
            {currentAndUpcoming.length > 0 && (
              <details open>
                <summary className="cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wider select-none mb-2">
                  Current &amp; upcoming ({currentAndUpcoming.length})
                </summary>
                <div className="space-y-2">
                  {currentAndUpcoming.map((lr) => (
                    <LeaveRow key={lr.id} lr={lr} tenantSlug={tenantSlug} />
                  ))}
                </div>
              </details>
            )}
            {history.length > 0 && (
              <details>
                <summary className="cursor-pointer text-sm font-semibold text-muted-foreground uppercase tracking-wider select-none mb-2">
                  History ({history.length})
                </summary>
                <div className="space-y-2">
                  {history.map((lr) => (
                    <LeaveRow key={lr.id} lr={lr} tenantSlug={tenantSlug} />
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </CardSection>
    </div>
  )
}

function LeaveRow({ lr, tenantSlug }: { lr: LeaveItem; tenantSlug: string }) {
  const duration = lr.daysCount === 1 ? '(1 day)' : `(${lr.daysCount} days)`
  // (#196) Use the structural flag — name substring matching breaks for
  // tenants who renamed their sickness/lateness policies.
  const isSick = lr.policyIsSystemType === 'sickness'
  const isLateness = lr.policyIsSystemType === 'lateness'
  return (
    <Link
      href={`/t/${tenantSlug}/leave/${lr.id}`}
      className="flex items-start gap-3 text-sm hover:bg-accent rounded-lg p-3 -mx-2 transition-all duration-150 border-b border-border/50 last:border-0"
    >
      <div className="mt-0.5 shrink-0">
        {isLateness ? (
          <AlarmClock className="h-5 w-5 text-orange-400" />
        ) : isSick ? (
          <Thermometer className="h-5 w-5 text-red-400" />
        ) : (
          <Sun className="h-5 w-5 text-amber-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-primary">{lr.policyName}</span>
        <div className="text-muted-foreground mt-0.5">
          <span className="font-medium text-foreground">
            {formatDateGB(lr.startDate)}
            {lr.startDate !== lr.endDate && <> &ndash; {formatDateGB(lr.endDate)}</>}
          </span>
          {!isLateness && <> {duration}</>}
        </div>
        {lr.reason && <div className="text-muted-foreground mt-0.5">{lr.reason}</div>}
        <div className="flex items-center gap-2 mt-1.5">
          <StatusBadge status={lr.status} />
          {lr.decidedByName && lr.decidedAt && (
            <span className="text-xs text-muted-foreground/70">
              on {formatDateGB(lr.decidedAt)} by {lr.decidedByName}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Inline Record Lateness Dialog ──

const LATENESS_DURATIONS = [
  '5 minutes', '10 minutes', '15 minutes', '20 minutes',
  '30 minutes', '45 minutes', '1 hour', '1.5 hours', '2 hours', '2+ hours',
]

function RecordLatenessInline({ tenantSlug, employeeId }: { tenantSlug: string; employeeId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState('')
  const [reason, setReason] = useState('')

  async function handleSubmit() {
    if (!date || !duration) {
      toast.error('Please fill in date and duration')
      return
    }
    setLoading(true)
    const result = await recordLateness(tenantSlug, { employeeId, date, duration, reason })
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Lateness recorded')
    setOpen(false)
    setDate(new Date().toISOString().split('T')[0])
    setDuration('')
    setReason('')
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30">
          <AlarmClock className="mr-2 h-4 w-4" />
          Record lateness
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Lateness</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Date *</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Duration *</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="How late?" />
              </SelectTrigger>
              <SelectContent>
                {LATENESS_DURATIONS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Traffic, overslept" />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Recording...' : 'Record lateness'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Adjust Balance Dialog ──

function AdjustBalanceDialog({ tenantSlug, employeeId, balance }: {
  tenantSlug: string
  employeeId: string
  balance: Balance
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [adjustment, setAdjustment] = useState('')
  const [reason, setReason] = useState('')

  async function handleSubmit() {
    const adj = parseFloat(adjustment)
    if (isNaN(adj) || adj === 0) {
      toast.error('Please enter a non-zero adjustment amount')
      return
    }
    if (!reason.trim()) {
      toast.error('Please provide a reason for the adjustment')
      return
    }
    setLoading(true)
    const result = await adjustLeaveBalance(
      tenantSlug,
      employeeId,
      balance.policyId,
      balance.year,
      adj,
      reason.trim()
    )
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success(`Allowance adjusted: ${result.data.oldAllowance} \u2192 ${result.data.newAllowance}`)
    setOpen(false)
    setAdjustment('')
    setReason('')
    router.refresh()
  }

  const unit = balance.policyUnit === 'hours' ? 'hours' : 'days'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="xs" className="h-5 px-1.5 text-[11px] text-muted-foreground hover:text-foreground">
          <SlidersHorizontal className="h-3 w-3 mr-1" />
          Adjust
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust {balance.policyName} Allowance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current allowance</span>
              <span className="font-medium">{balance.allowance} {unit}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Used</span>
              <span>{balance.used} {unit}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Remaining</span>
              <span>{balance.remaining} {unit}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Adjustment ({unit}) *</Label>
            <Input
              type="number"
              step="0.5"
              value={adjustment}
              onChange={(e) => setAdjustment(e.target.value)}
              placeholder="e.g. 2 to add, -1 to remove"
            />
            {adjustment && !isNaN(parseFloat(adjustment)) && parseFloat(adjustment) !== 0 && (
              <p className="text-xs text-muted-foreground">
                New allowance will be: <span className="font-medium">{balance.allowance + parseFloat(adjustment)} {unit}</span>
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Reason *</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Overtime compensation, annual adjustment, correction"
              rows={2}
            />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Apply Adjustment'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState, useSyncExternalStore } from 'react'

interface LeaveEntry {
  id: string
  employeeName: string
  department: string | null
  policyName: string
  // Canonical system-type flag from the policy (e.g. 'sickness', 'lateness').
  // Passed through so we can colour sickness reliably without name matching
  // (issue #47). Optional so the type stays backwards-compatible.
  isSystemType?: string | null
  // Leave request status. PENDING requests are rendered amber to match the
  // calendar legend (issue #48). Optional for backwards compatibility.
  status?: string
  startDate: string
  endDate: string
}

interface CompanyLeaveEntry {
  id: string
  name: string
  startDate: string
  endDate: string
}

interface PublicHolidayEntry {
  id: string
  name: string
  date: string
}

interface Props {
  data: LeaveEntry[]
  companyLeaves?: CompanyLeaveEntry[]
  publicHolidays?: PublicHolidayEntry[]
  year: number
  month: number
  tenantSlug: string
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const ALL_DEPARTMENTS = '__all__'

// Colour scheme by leave type. PENDING requests are always amber so they
// match the legend (issue #48). Sickness is keyed off the canonical
// `isSystemType` flag so renamed sickness policies still render red
// (issue #47); other categories fall back to name matching since they don't
// have a corresponding system-type flag yet.
function getBarStyle(
  entry: Pick<LeaveEntry, 'policyName' | 'isSystemType' | 'status'>
): { bg: string; text: string; border: string } {
  if (entry.status === 'PENDING') {
    return { bg: 'bg-amber-400 dark:bg-amber-600', text: 'text-white', border: 'border-amber-500' }
  }
  if (entry.isSystemType === 'sickness') {
    return { bg: 'bg-red-400 dark:bg-red-600', text: 'text-white', border: 'border-red-500' }
  }
  const lower = entry.policyName.toLowerCase()
  if (lower.includes('sick')) return { bg: 'bg-red-400 dark:bg-red-600', text: 'text-white', border: 'border-red-500' }
  if (lower.includes('annual') || lower.includes('holiday')) return { bg: 'bg-emerald-400 dark:bg-emerald-600', text: 'text-white', border: 'border-emerald-500' }
  if (lower.includes('parental') || lower.includes('maternity') || lower.includes('paternity')) return { bg: 'bg-purple-400 dark:bg-purple-600', text: 'text-white', border: 'border-purple-500' }
  if (lower.includes('unpaid')) return { bg: 'bg-gray-400 dark:bg-gray-600', text: 'text-white', border: 'border-gray-500' }
  return { bg: 'bg-sky-400 dark:bg-sky-600', text: 'text-white', border: 'border-sky-500' }
}

const COMPANY_LEAVE_STYLE = { bg: 'bg-purple-300 dark:bg-purple-700', text: 'text-purple-900 dark:text-purple-100', border: 'border-purple-400' }
const HOLIDAY_STYLE = { bg: 'bg-blue-300 dark:bg-blue-700', text: 'text-blue-900 dark:text-blue-100', border: 'border-blue-400' }

interface BarSegment {
  key: string
  startDay: number
  endDay: number
  style: { bg: string; text: string; border: string }
}

interface BarRow {
  id: string
  label: string
  segments: BarSegment[]
  type: 'leave' | 'holiday' | 'company'
}

const MOBILE_MQ = '(max-width: 639px)'

function subscribeToMobileMq(callback: () => void) {
  const mq = window.matchMedia(MOBILE_MQ)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

export function LeaveCalendar({ data, companyLeaves = [], publicHolidays = [], year, month, tenantSlug }: Props) {
  const router = useRouter()
  // useSyncExternalStore instead of useState + setState-in-effect — the
  // media query IS an external store, and the lint (react-hooks/
  // set-state-in-effect) rightly flags the old pattern. Server snapshot
  // is `false` (desktop-first render), matching the previous initial state.
  const isMobile = useSyncExternalStore(
    subscribeToMobileMq,
    () => window.matchMedia(MOBILE_MQ).matches,
    () => false
  )
  const [selectedDepartment, setSelectedDepartment] = useState<string>(ALL_DEPARTMENTS)

  const departments = useMemo(() => {
    const deptSet = new Set<string>()
    for (const entry of data) {
      if (entry.department) deptSet.add(entry.department)
    }
    return Array.from(deptSet).sort()
  }, [data])

  const filteredData = useMemo(() => {
    if (selectedDepartment === ALL_DEPARTMENTS) return data
    return data.filter((e) => e.department === selectedDepartment)
  }, [data, selectedDepartment])

  const now = new Date()
  const todayDay = now.getFullYear() === year && now.getMonth() + 1 === month ? now.getDate() : null

  const daysInMonth = new Date(year, month, 0).getDate()

  // Day -> holiday name lookup for the current month. Bank holidays are
  // rendered as a column-wide tint behind every employee row (the office
  // closes — everyone has the day off), with the holiday name shown in
  // the day-number header. We no longer render a separate top row per
  // holiday since the column shade conveys the same info more usefully.
  const holidayByDay = useMemo(() => {
    const map = new Map<number, string>()
    for (const h of publicHolidays) {
      // h.date is a canonical YYYY-MM-DD day key from the server — parse
      // the components directly rather than round-tripping through
      // `new Date(...)`, whose local-time accessors shift the day for
      // browsers west of UTC.
      const [hy, hm, hd] = h.date.split('-').map(Number)
      if (hy === year && hm === month) {
        map.set(hd, h.name)
      }
    }
    return map
  }, [publicHolidays, year, month])

  // Build bar rows for the Gantt view
  const barRows = useMemo(() => {
    const rows: BarRow[] = []

    // Company leave blocks
    for (const cl of companyLeaves) {
      const clStart = new Date(cl.startDate)
      const clEnd = new Date(cl.endDate)
      const startDay = clStart.getFullYear() === year && clStart.getMonth() + 1 === month
        ? clStart.getDate() : 1
      const endDay = clEnd.getFullYear() === year && clEnd.getMonth() + 1 === month
        ? clEnd.getDate() : daysInMonth
      rows.push({
        id: `company-${cl.id}`,
        label: cl.name,
        segments: [{ key: cl.id, startDay, endDay, style: COMPANY_LEAVE_STYLE }],
        type: 'company',
      })
    }

    // Employee leave entries — group by employee so someone with multiple
    // bookings in the same month appears on a single row with multiple
    // bars (was: one row per request, so 5 leaves = 5 duplicate name rows).
    const byEmployee = new Map<string, { name: string; segments: BarSegment[] }>()
    for (const entry of filteredData) {
      const entryStart = new Date(entry.startDate)
      const entryEnd = new Date(entry.endDate)
      const startDay = entryStart.getFullYear() === year && entryStart.getMonth() + 1 === month
        ? entryStart.getDate() : 1
      const endDay = entryEnd.getFullYear() === year && entryEnd.getMonth() + 1 === month
        ? entryEnd.getDate() : daysInMonth
      // Key by name (calendar already shows by name; entries don't carry an
      // employeeId yet). Tie-break is fine since two people with identical
      // full names would already collide visually elsewhere.
      const key = entry.employeeName
      let row = byEmployee.get(key)
      if (!row) {
        row = { name: entry.employeeName, segments: [] }
        byEmployee.set(key, row)
      }
      row.segments.push({
        key: entry.id,
        startDay,
        endDay,
        style: getBarStyle(entry),
      })
    }
    // Sort each employee's segments by startDay so renders are stable
    // and predictable (oldest leave on the left, newest on the right).
    for (const [key, row] of byEmployee) {
      row.segments.sort((a, b) => a.startDay - b.startDay)
      rows.push({
        id: `emp-${key}`,
        label: row.name,
        segments: row.segments,
        type: 'leave',
      })
    }

    return rows
  }, [filteredData, companyLeaves, publicHolidays, year, month, daysInMonth])

  function navigate(dir: -1 | 1) {
    let m = month + dir
    let y = year
    if (m < 1) { m = 12; y-- }
    if (m > 12) { m = 1; y++ }
    router.push(`/t/${tenantSlug}/leave/calendar?year=${y}&month=${m}`)
  }

  function goToToday() {
    const today = new Date()
    router.push(`/t/${tenantSlug}/leave/calendar?year=${today.getFullYear()}&month=${today.getMonth() + 1}`)
  }

  // Day column headers
  const dayNumbers: number[] = []
  for (let d = 1; d <= daysInMonth; d++) dayNumbers.push(d)

  // Determine weekends
  function isWeekend(day: number): boolean {
    const dow = new Date(year, month - 1, day).getDay()
    return dow === 0 || dow === 6
  }

  // Build list of days with events for mobile view
  const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const daysWithEvents: { day: number; entries: LeaveEntry[]; dayCompanyLeaves: CompanyLeaveEntry[]; dayHolidays: PublicHolidayEntry[] }[] = []
  const pad2 = (n: number) => n.toString().padStart(2, '0')
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d)
    const entries = filteredData.filter((e) => {
      const start = new Date(e.startDate)
      const end = new Date(e.endDate)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return date >= start && date <= end
    })
    const cl = companyLeaves.filter((c) => {
      const start = new Date(c.startDate)
      const end = new Date(c.endDate)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      return date >= start && date <= end
    })
    // Build the date key directly from the local y/m/d — never round-trip
    // through toISOString on a date that was constructed in local time.
    // On a UK BST client `new Date(2026, 3, 1).toISOString()` is
    // '2026-03-31T23:00:00Z', which flips back to '2026-03-31' and hides
    // the 1 April bank holiday (stored as '2026-04-01T00:00Z') from the
    // April mobile list.
    const dateStr = `${year}-${pad2(month)}-${pad2(d)}`
    // ph.date is already a canonical YYYY-MM-DD key from the server.
    const h = publicHolidays.filter((ph) => ph.date === dateStr)
    if (entries.length > 0 || cl.length > 0 || h.length > 0) {
      daysWithEvents.push({ day: d, entries, dayCompanyLeaves: cl, dayHolidays: h })
    }
  }

  return (
    <div data-tour="leave-calendar">
      {/* Header: navigation + department filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} title="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <h2 className="text-xl font-semibold tracking-tight">
            {MONTH_NAMES[month - 1]} {year}
          </h2>
          <Button variant="outline" size="sm" onClick={goToToday} className="text-xs">
            Today
          </Button>
          {departments.length > 0 && (
            // Native <select> rather than Radix — Radix's portalled popover
            // was getting clipped by the calendar's overflow-hidden wrapper
            // on some browsers, so the dropdown silently never appeared.
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-8 w-[160px] sm:w-[180px] rounded-md border bg-background px-2 text-sm"
            >
              <option value={ALL_DEPARTMENTS}>All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => navigate(1)} title="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-xs text-muted-foreground bg-muted/50 rounded-lg px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-emerald-400 dark:bg-emerald-600" />
          <span>Annual Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-red-400 dark:bg-red-600" />
          <span>Sick Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-amber-400 dark:bg-amber-600" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-blue-300 dark:bg-blue-700" />
          <span>Bank Holiday</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-purple-300 dark:bg-purple-700" />
          <span>Company Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-6 rounded bg-sky-400 dark:bg-sky-600" />
          <span>Other Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-2 border-indigo-500" />
          <span>Today</span>
        </div>
      </div>

      {/* Mobile: list view */}
      {isMobile ? (
        <div className="space-y-2">
          {daysWithEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No leave or events this month.</p>
          ) : (
            daysWithEvents.map(({ day, entries, dayCompanyLeaves, dayHolidays }) => {
              const isToday = day === todayDay
              const dateObj = new Date(year, month - 1, day)
              return (
                <div
                  key={day}
                  className={`rounded-lg border p-3 ${isToday ? 'ring-2 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'bg-card'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                      {DAY_NAMES_FULL[dateObj.getDay()]} {day}
                    </span>
                    {isToday && <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full px-2 py-0.5">Today</span>}
                  </div>
                  <div className="space-y-1.5">
                    {dayHolidays.map((h) => (
                      <div key={h.id} className="flex items-center gap-2">
                        <div className="h-4 flex-1 rounded bg-blue-300 dark:bg-blue-700 px-2 flex items-center">
                          <span className="text-xs text-blue-900 dark:text-blue-100 truncate">{h.name}</span>
                        </div>
                      </div>
                    ))}
                    {dayCompanyLeaves.map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <div className="h-4 flex-1 rounded bg-purple-300 dark:bg-purple-700 px-2 flex items-center">
                          <span className="text-xs text-purple-900 dark:text-purple-100 truncate">{c.name}</span>
                        </div>
                      </div>
                    ))}
                    {entries.map((e) => {
                      const style = getBarStyle(e)
                      return (
                        <div key={e.id + day} className="flex items-center gap-2">
                          <div className={`h-5 flex-1 rounded ${style.bg} px-2 flex items-center`}>
                            <span className={`text-xs ${style.text} truncate`}>{e.employeeName}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      ) : (
        /* Desktop: Gantt chart view */
        <div className="border rounded-lg overflow-hidden">
          {/* Day number header row */}
          <div className="flex bg-muted border-b sticky top-0 z-10">
            <div className="w-44 min-w-44 shrink-0 px-3 py-2 text-xs font-medium text-muted-foreground border-r">
              Employee / Event
            </div>
            <div className="flex-1 flex">
              {dayNumbers.map((d) => {
                const weekend = isWeekend(d)
                const isToday = d === todayDay
                const holidayName = holidayByDay.get(d)
                const dow = new Date(year, month - 1, d).getDay()
                const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                return (
                  <div
                    key={d}
                    title={holidayName ?? undefined}
                    className={`flex-1 min-w-[28px] text-center py-1 border-r last:border-r-0 ${
                      holidayName
                        ? 'bg-blue-200/70 dark:bg-blue-800/50'
                        : weekend
                        ? 'bg-muted-foreground/10'
                        : ''
                    } ${isToday ? 'ring-2 ring-inset ring-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : ''}`}
                  >
                    <div className="text-[9px] text-muted-foreground leading-none">{dayLetters[dow]}</div>
                    <div className={`text-[11px] font-medium leading-tight ${isToday ? 'text-indigo-600 dark:text-indigo-400 font-bold' : holidayName ? 'text-blue-900 dark:text-blue-100' : ''}`}>
                      {d}
                    </div>
                    {holidayName && (
                      <div className="text-[8px] leading-tight text-blue-900/80 dark:text-blue-100/80 truncate px-0.5">
                        {holidayName.split(' ')[0]}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bar rows */}
          {barRows.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              No leave or events this month.
            </div>
          ) : (
            barRows.map((row, rowIndex) => (
              <div
                key={row.id}
                className={`flex border-b last:border-b-0 hover:bg-accent/40 transition-colors ${
                  rowIndex % 2 === 1 ? 'bg-muted/30 dark:bg-muted/10' : ''
                }`}
              >
                {/* Label column */}
                <div className="w-44 min-w-44 shrink-0 px-3 py-1.5 border-r flex items-center">
                  <span className="text-xs font-medium truncate">{row.label}</span>
                </div>
                {/* Day cells — each segment renders as its own coloured bar
                    inside the same row (was: one row per segment). Bank
                    holiday columns are tinted across every row because
                    the office closes and everyone has the day off. */}
                <div className="flex-1 flex relative">
                  {dayNumbers.map((d) => {
                    const weekend = isWeekend(d)
                    const isHoliday = holidayByDay.has(d)
                    const segment = row.segments.find((s) => d >= s.startDay && d <= s.endDay)
                    const isInRange = !!segment
                    const isStart = segment ? d === segment.startDay : false
                    const isEnd = segment ? d === segment.endDay : false
                    const isToday = d === todayDay

                    return (
                      <div
                        key={d}
                        className={`flex-1 min-w-[28px] h-8 relative border-r last:border-r-0 ${
                          isHoliday
                            ? 'bg-blue-200/60 dark:bg-blue-800/40'
                            : weekend && !isInRange
                            ? 'bg-muted-foreground/5'
                            : ''
                        } ${isToday && !isInRange ? 'ring-2 ring-inset ring-indigo-500/40' : ''}`}
                      >
                        {segment && (
                          <div
                            className={`absolute top-1 bottom-1 ${segment.style.bg} ${segment.style.text} flex items-center overflow-hidden ${
                              isStart ? 'left-0.5 rounded-l' : 'left-0'
                            } ${
                              isEnd ? 'right-0.5 rounded-r' : 'right-0'
                            }`}
                          >
                            {isStart && (
                              <span className="text-[10px] font-medium px-1 truncate whitespace-nowrap">
                                {row.label}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

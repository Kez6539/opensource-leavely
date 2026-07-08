'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, getDirectReportIds } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { toLocalDayKey } from '@/lib/business-days'

/**
 * Resolve the set of employee IDs the caller can see in the clock-in
 * views. ADMIN+ → null (no restriction). Plain MANAGER → direct
 * reports + active delegations + their own employee row. Mirrors the
 * pattern in lib/rbac.ts and the dashboard counter scoping. (Round 6.)
 */
async function resolveVisibleEmployeeIdsForClock(
  tenantId: string,
  userId: string,
  membership: { role: 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE' },
): Promise<string[] | null> {
  if (isAtLeast(membership, 'ADMIN')) return null
  const reportIds = await getDirectReportIds(tenantId, userId, membership)
  if (reportIds === null) return null
  const myEmp = await prisma.employee.findFirst({
    where: { tenantId, userId },
    select: { id: true },
  })
  const own = myEmp ? [myEmp.id] : []
  return Array.from(new Set([...reportIds, ...own]))
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function startOfWeek(d: Date): Date {
  const day = d.getDay() // 0=Sun
  const diff = day === 0 ? 6 : day - 1 // Monday-based
  const monday = new Date(d)
  monday.setDate(d.getDate() - diff)
  return startOfDay(monday)
}

function endOfWeek(mondayStart: Date): Date {
  const sunday = new Date(mondayStart)
  sunday.setDate(mondayStart.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)
  return sunday
}

function calcTotalHours(clockIn: Date, clockOut: Date, breakMinutes: number): number {
  const diffMs = clockOut.getTime() - clockIn.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)
  const breakHours = breakMinutes / 60
  return Math.max(0, Math.round((diffHours - breakHours) * 100) / 100)
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** Get the current user's employee record for this tenant */
async function getMyEmployee(tenantId: string, userId: string) {
  const emp = await prisma.employee.findFirst({
    where: { tenantId, userId },
    select: { id: true, firstName: true, lastName: true },
  })
  return emp
}

/** Get the current user's clock status.
 *
 * Codex regression review flagged an end-to-end gap: the round-6 fix
 * made clockOut look for ANY open entry (not just today's), but this
 * getter still filtered to today's date only. After midnight, an
 * employee with yesterday's still-open shift saw "Clock In" and the
 * UI offered a second clock-in (which the today-only guard let through),
 * creating a duplicate open entry.
 *
 * Fix: first look for an OPEN entry (clockOut == null) across ALL days,
 * falling back to today's closed entry if none. This way the UI renders
 * "Clock Out" when yesterday's shift is still open, and the user
 * doesn't accidentally create a duplicate. */
export async function getMyClockStatus(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)
  const emp = await getMyEmployee(tenant.id, user.userId)
  if (!emp) return null

  // Priority 1: any OPEN entry (yesterday's overnight or today's)
  let entry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: emp.id,
      tenantId: tenant.id,
      clockOut: null,
    },
    orderBy: { clockIn: 'desc' },
  })

  // Priority 2: today's entry (may already be closed out)
  if (!entry) {
    const today = startOfDay(new Date())
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    entry = await prisma.clockEntry.findFirst({
      where: {
        employeeId: emp.id,
        tenantId: tenant.id,
        date: { gte: today, lt: tomorrow },
      },
    })
  }

  return entry
    ? {
        id: entry.id,
        clockIn: entry.clockIn.toISOString(),
        clockOut: entry.clockOut?.toISOString() ?? null,
        breakMinutes: entry.breakMinutes,
        totalHours: entry.totalHours ? Number(entry.totalHours) : null,
        notes: entry.notes,
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
      }
    : { employeeId: emp.id, employeeName: `${emp.firstName} ${emp.lastName}` }
}

/** Get this week's timesheet for the current user */
export async function getMyWeeklyTimesheet(tenantSlug: string, weekStartStr?: string) {
  const { tenant, user } = await requireTenant(tenantSlug)
  const emp = await getMyEmployee(tenant.id, user.userId)
  if (!emp) return []

  const baseDate = weekStartStr ? new Date(weekStartStr) : new Date()
  const monday = startOfWeek(baseDate)
  const sunday = endOfWeek(monday)

  const entries = await prisma.clockEntry.findMany({
    where: {
      employeeId: emp.id,
      tenantId: tenant.id,
      date: { gte: monday, lte: sunday },
    },
    orderBy: { date: 'asc' },
  })

  return entries.map((e) => ({
    id: e.id,
    date: e.date.toISOString(),
    clockIn: e.clockIn.toISOString(),
    clockOut: e.clockOut?.toISOString() ?? null,
    breakMinutes: e.breakMinutes,
    totalHours: e.totalHours ? Number(e.totalHours) : null,
    notes: e.notes,
  }))
}

/** Get all employees' clock entries for a specific date (MANAGER+) */
export async function getTeamClockEntries(tenantSlug: string, dateStr?: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // Plain MANAGERs see only their report set + delegations + self.
  // ADMIN+ keeps the tenant-wide view. Same pattern as the round-5
  // dashboard counter scoping. (Round 6 follow-up.)
  const visibleEmployeeIds = await resolveVisibleEmployeeIdsForClock(
    tenant.id,
    user.userId,
    membership,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entryWhere: any = { tenantId: tenant.id }
  if (visibleEmployeeIds !== null) {
    if (visibleEmployeeIds.length === 0) {
      return []
    }
    empWhere.id = { in: visibleEmployeeIds }
    entryWhere.employeeId = { in: visibleEmployeeIds }
  }

  const targetDate = dateStr ? new Date(dateStr) : new Date()
  const dayStart = startOfDay(targetDate)
  const dayEnd = new Date(dayStart)
  dayEnd.setDate(dayEnd.getDate() + 1)
  entryWhere.date = { gte: dayStart, lt: dayEnd }

  const [employees, entries] = await Promise.all([
    prisma.employee.findMany({
      where: empWhere,
      select: { id: true, firstName: true, lastName: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.clockEntry.findMany({
      where: entryWhere,
      include: {
        employee: { select: { id: true, firstName: true, lastName: true } },
        location: { select: { name: true } },
      },
    }),
  ])

  const entryMap = new Map(entries.map((e) => [e.employeeId, e]))

  return employees.map((emp) => {
    const entry = entryMap.get(emp.id)
    return {
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      clockIn: entry?.clockIn?.toISOString() ?? null,
      clockOut: entry?.clockOut?.toISOString() ?? null,
      breakMinutes: entry?.breakMinutes ?? 0,
      totalHours: entry?.totalHours ? Number(entry.totalHours) : null,
      notes: entry?.notes ?? null,
      locationName: entry?.location?.name ?? null,
      status: entry ? (entry.clockOut ? 'OUT' : 'IN') : 'NOT_CLOCKED',
      isLate: entry ? entry.clockIn.getHours() > 9 || (entry.clockIn.getHours() === 9 && entry.clockIn.getMinutes() > 0) : false,
    }
  })
}

/** Get weekly summary: total hours per employee (MANAGER+) */
export async function getWeeklySummary(tenantSlug: string, weekStartStr?: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const visibleEmployeeIds = await resolveVisibleEmployeeIdsForClock(
    tenant.id,
    user.userId,
    membership,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entryWhere: any = { tenantId: tenant.id, clockOut: { not: null } }
  if (visibleEmployeeIds !== null) {
    if (visibleEmployeeIds.length === 0) return []
    empWhere.id = { in: visibleEmployeeIds }
    entryWhere.employeeId = { in: visibleEmployeeIds }
  }

  const baseDate = weekStartStr ? new Date(weekStartStr) : new Date()
  const monday = startOfWeek(baseDate)
  const sunday = endOfWeek(monday)
  entryWhere.date = { gte: monday, lte: sunday }

  const [employees, entries] = await Promise.all([
    prisma.employee.findMany({
      where: empWhere,
      select: { id: true, firstName: true, lastName: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.clockEntry.findMany({
      where: entryWhere,
      select: { employeeId: true, totalHours: true },
    }),
  ])

  const hoursMap = new Map<string, number>()
  const daysMap = new Map<string, number>()
  for (const e of entries) {
    const h = e.totalHours ? Number(e.totalHours) : 0
    hoursMap.set(e.employeeId, (hoursMap.get(e.employeeId) ?? 0) + h)
    daysMap.set(e.employeeId, (daysMap.get(e.employeeId) ?? 0) + 1)
  }

  return employees.map((emp) => ({
    employeeId: emp.id,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    totalHours: Math.round((hoursMap.get(emp.id) ?? 0) * 100) / 100,
    daysWorked: daysMap.get(emp.id) ?? 0,
  }))
}

/** Export clock report as CSV string (MANAGER+) */
export async function exportClockReport(
  tenantSlug: string,
  startDateStr: string,
  endDateStr: string
) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const start = startOfDay(new Date(startDateStr))
  const end = new Date(startDateStr === endDateStr ? start : new Date(endDateStr))
  end.setHours(23, 59, 59, 999)

  const entries = await prisma.clockEntry.findMany({
    where: {
      tenantId: tenant.id,
      date: { gte: start, lte: end },
    },
    include: {
      employee: { select: { firstName: true, lastName: true } },
      location: { select: { name: true } },
    },
    orderBy: [{ date: 'asc' }, { employee: { lastName: 'asc' } }],
  })

  const rows = [
    ['Employee', 'Date', 'Clock In', 'Clock Out', 'Break (mins)', 'Total Hours', 'Location', 'Notes'].join(','),
    ...entries.map((e) =>
      [
        `"${e.employee.firstName} ${e.employee.lastName}"`,
        toLocalDayKey(e.date),
        e.clockIn.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        e.clockOut
          ? e.clockOut.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          : '',
        e.breakMinutes,
        e.totalHours ? Number(e.totalHours) : '',
        `"${e.location?.name ?? ''}"`,
        `"${(e.notes ?? '').replace(/"/g, '""')}"`,
      ].join(',')
    ),
  ]

  return rows.join('\n')
}

// ---------------------------------------------------------------------------
// Who's In
// ---------------------------------------------------------------------------

/** Get today's clock status for all employees, split into sections */
export async function getWhosIn(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const visibleEmployeeIds = await resolveVisibleEmployeeIdsForClock(
    tenant.id,
    user.userId,
    membership,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entryWhere: any = { tenantId: tenant.id }
  if (visibleEmployeeIds !== null) {
    if (visibleEmployeeIds.length === 0) {
      return { employees: [], locations: [] }
    }
    empWhere.id = { in: visibleEmployeeIds }
    entryWhere.employeeId = { in: visibleEmployeeIds }
  }

  const today = startOfDay(new Date())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  entryWhere.date = { gte: today, lt: tomorrow }

  const [employees, entries, locations] = await Promise.all([
    prisma.employee.findMany({
      where: empWhere,
      select: { id: true, firstName: true, lastName: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.clockEntry.findMany({
      where: entryWhere,
      include: {
        location: { select: { id: true, name: true } },
      },
    }),
    prisma.location.findMany({
      where: { tenantId: tenant.id, isActive: true },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ])

  const entryMap = new Map(entries.map((e) => [e.employeeId, e]))

  const all = employees.map((emp) => {
    const entry = entryMap.get(emp.id)
    const initials = `${emp.firstName.charAt(0)}${emp.lastName.charAt(0)}`.toUpperCase()
    return {
      employeeId: emp.id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      initials,
      clockIn: entry?.clockIn?.toISOString() ?? null,
      clockOut: entry?.clockOut?.toISOString() ?? null,
      locationName: entry?.location?.name ?? null,
      locationId: entry?.location?.id ?? null,
      status: entry ? (entry.clockOut ? 'OUT' as const : 'IN' as const) : 'NOT_CLOCKED' as const,
    }
  })

  return {
    employees: all,
    locations,
  }
}

// ---------------------------------------------------------------------------
// Timesheets (weekly grid for all employees)
// ---------------------------------------------------------------------------

/** Get weekly hours grid: each employee + each day of the week (MANAGER+) */
export async function getTimesheets(tenantSlug: string, weekStartStr?: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const visibleEmployeeIds = await resolveVisibleEmployeeIdsForClock(
    tenant.id,
    user.userId,
    membership,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id, status: 'ACTIVE' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entryWhere: any = { tenantId: tenant.id }
  if (visibleEmployeeIds !== null) {
    if (visibleEmployeeIds.length === 0) {
      return { weekStart: '', employees: [] }
    }
    empWhere.id = { in: visibleEmployeeIds }
    entryWhere.employeeId = { in: visibleEmployeeIds }
  }

  const baseDate = weekStartStr ? new Date(weekStartStr) : new Date()
  const monday = startOfWeek(baseDate)
  const sunday = endOfWeek(monday)
  entryWhere.date = { gte: monday, lte: sunday }

  const [employees, entries] = await Promise.all([
    prisma.employee.findMany({
      where: empWhere,
      select: { id: true, firstName: true, lastName: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.clockEntry.findMany({
      where: entryWhere,
      select: { employeeId: true, date: true, totalHours: true, clockOut: true },
    }),
  ])

  // Build a map: employeeId -> dayIndex (0=Mon) -> hours
  const grid = new Map<string, Map<number, number>>()
  for (const e of entries) {
    if (!grid.has(e.employeeId)) grid.set(e.employeeId, new Map())
    const dayOfWeek = e.date.getDay() // 0=Sun
    const dayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Mon=0..Sun=6
    const hours = e.totalHours ? Number(e.totalHours) : (e.clockOut ? 0 : null)
    if (hours !== null) {
      grid.get(e.employeeId)!.set(dayIdx, hours)
    }
  }

  const weekStart = toLocalDayKey(monday)

  return {
    weekStart,
    employees: employees.map((emp) => {
      const dayMap = grid.get(emp.id) ?? new Map()
      const days = Array.from({ length: 7 }, (_, i) => dayMap.get(i) ?? null)
      const total = days.reduce<number>((acc, h) => acc + (h ?? 0), 0)
      return {
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        days,
        total: Math.round(total * 100) / 100,
      }
    }),
  }
}

/** Export timesheet CSV for a given week (MANAGER+) */
export async function exportTimesheetsCsv(tenantSlug: string, weekStartStr?: string) {
  const data = await getTimesheets(tenantSlug, weekStartStr)

  const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const rows = [
    ['Employee', ...dayHeaders, 'Total Hours'].join(','),
    ...data.employees.map((emp) =>
      [
        `"${emp.employeeName}"`,
        ...emp.days.map((h) => (h !== null ? h.toString() : '')),
        emp.total.toString(),
      ].join(',')
    ),
  ]

  return rows.join('\n')
}

// ---------------------------------------------------------------------------
// Clock-in History (paginated)
// ---------------------------------------------------------------------------

export async function getClockHistory(
  tenantSlug: string,
  filters: {
    employeeId?: string
    locationId?: string
    startDate?: string
    endDate?: string
    page?: number
  }
) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const page = filters.page ?? 1
  const perPage = 50
  const skip = (page - 1) * perPage

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { tenantId: tenant.id }
  if (filters.employeeId) where.employeeId = filters.employeeId
  if (filters.locationId) where.locationId = filters.locationId
  if (filters.startDate || filters.endDate) {
    where.date = {}
    if (filters.startDate) where.date.gte = startOfDay(new Date(filters.startDate))
    if (filters.endDate) {
      const end = new Date(filters.endDate)
      end.setHours(23, 59, 59, 999)
      where.date.lte = end
    }
  }

  const [entries, totalCount, employees, locations] = await Promise.all([
    prisma.clockEntry.findMany({
      where,
      include: {
        employee: { select: { firstName: true, lastName: true } },
        location: { select: { name: true } },
      },
      orderBy: [{ date: 'desc' }, { clockIn: 'desc' }],
      skip,
      take: perPage,
    }),
    prisma.clockEntry.count({ where }),
    prisma.employee.findMany({
      where: { tenantId: tenant.id, status: 'ACTIVE' },
      select: { id: true, firstName: true, lastName: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.location.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
  ])

  return {
    entries: entries.map((e) => ({
      id: e.id,
      employeeName: `${e.employee.firstName} ${e.employee.lastName}`,
      employeeId: e.employeeId,
      date: toLocalDayKey(e.date),
      clockIn: e.clockIn.toISOString(),
      clockOut: e.clockOut?.toISOString() ?? null,
      breakMinutes: e.breakMinutes,
      totalHours: e.totalHours ? Number(e.totalHours) : null,
      locationName: e.location?.name ?? null,
    })),
    totalCount,
    page,
    totalPages: Math.ceil(totalCount / perPage),
    employees: employees.map((e) => ({ id: e.id, name: `${e.firstName} ${e.lastName}` })),
    locations: locations.map((l) => ({ id: l.id, name: l.name })),
  }
}

// ---------------------------------------------------------------------------
// Clock-in Settings
// ---------------------------------------------------------------------------

export async function getClockInSettings(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  return {
    clockInRequireLocation: tenant.clockInRequireLocation,
    clockInAutoClockOut: tenant.clockInAutoClockOut,
    clockInAutoClockOutTime: tenant.clockInAutoClockOutTime,
    clockInMinBreak: tenant.clockInMinBreak,
    clockInAllowManualEntry: tenant.clockInAllowManualEntry,
  }
}

export async function updateClockInSettings(
  tenantSlug: string,
  data: {
    clockInRequireLocation: boolean
    clockInAutoClockOut: boolean
    clockInAutoClockOutTime: string | null
    clockInMinBreak: number
    clockInAllowManualEntry: boolean
  }
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      clockInRequireLocation: data.clockInRequireLocation,
      clockInAutoClockOut: data.clockInAutoClockOut,
      clockInAutoClockOutTime: data.clockInAutoClockOutTime,
      clockInMinBreak: data.clockInMinBreak,
      clockInAllowManualEntry: data.clockInAllowManualEntry,
    },
  })

  await logAudit({
    action: 'tenant.clock_in_settings_updated',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: data,
  })

  revalidatePath(`/t/${tenantSlug}/clock-ins`)
  return { success: true }
}

// ---------------------------------------------------------------------------
// Locations (re-exported for the Locations tab)
// ---------------------------------------------------------------------------

export async function getLocations(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)

  const locations = await prisma.location.findMany({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: 'desc' },
  })

  return locations.map((l) => ({
    id: l.id,
    name: l.name,
    address: l.address,
    latitude: l.latitude ? Number(l.latitude) : null,
    longitude: l.longitude ? Number(l.longitude) : null,
    qrToken: l.qrToken,
    isActive: l.isActive,
    createdAt: l.createdAt.toISOString(),
  }))
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export interface ClockInOptions {
  lat?: number | null
  lng?: number | null
  locationId?: string | null
  qrToken?: string | null
}

export async function clockIn(
  tenantSlug: string,
  options: ClockInOptions = {}
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  const emp = await getMyEmployee(tenant.id, user.userId)
  if (!emp) throw new UserError('No employee record found for your account')

  const hasCoords =
    typeof options.lat === 'number' &&
    typeof options.lng === 'number' &&
    Number.isFinite(options.lat) &&
    Number.isFinite(options.lng)

  // Enforce the tenant's "require location" toggle. If the setting is on and
  // the client didn't (or couldn't) provide GPS, bail out with a clear message
  // so the user can allow location access and try again.
  if (tenant.clockInRequireLocation && !hasCoords) {
    throw new UserError(
      'Location is required to clock in. Please allow location access and try again.'
    )
  }

  // Resolve locationId: either the caller passed one explicitly, or they
  // scanned a QR token. Verify the location belongs to this tenant either way.
  let resolvedLocationId: string | null = null
  if (options.locationId) {
    const loc = await prisma.location.findFirst({
      where: { id: options.locationId, tenantId: tenant.id },
      select: { id: true },
    })
    if (!loc) throw new UserError('Unknown clock-in location')
    resolvedLocationId = loc.id
  } else if (options.qrToken) {
    const loc = await prisma.location.findFirst({
      where: { qrToken: options.qrToken, tenantId: tenant.id },
      select: { id: true },
    })
    if (!loc) throw new UserError('Unknown clock-in location')
    resolvedLocationId = loc.id
  }

  const now = new Date()
  const today = startOfDay(now)

  // Block clock-in when there's an existing OPEN entry — from ANY day,
  // not just today. The round-6 cross-midnight fix made clockOut look
  // for open entries across all days, but left clockIn checking today
  // only. Codex's regression review caught that this gap lets a user
  // with yesterday's open shift clock in again today (today is a new
  // date so the @@unique doesn't fire), creating a duplicate open
  // entry. The stale one then stays stranded forever because clockOut
  // picks the most recent. Fix: block the new clock-in until the
  // previous one is closed. (Codex regression #1.)
  const openEntry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: emp.id,
      tenantId: tenant.id,
      clockOut: null,
    },
  })
  if (openEntry) {
    throw new UserError(
      'You have an open clock-in that hasn\u2019t been clocked out. Please clock out first before clocking in again.'
    )
  }

  // Also check today specifically for a CLOSED entry — you can't
  // clock in twice on the same day even if the first is already closed.
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const todayEntry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: emp.id,
      tenantId: tenant.id,
      date: { gte: today, lt: tomorrow },
    },
  })
  if (todayEntry) {
    throw new UserError('Already clocked in today')
  }

  // findFirst + create races under a double-click / parallel tab: two calls
  // can both see "no existing entry" and both try to insert. The schema has
  // @@unique([employeeId, date]) so the second insert throws a raw Prisma
  // P2002 which used to leak verbatim into the user's toast. Catch it and
  // surface the same friendly message as the happy-path duplicate guard.
  let entry
  try {
    entry = await prisma.clockEntry.create({
      data: {
        employeeId: emp.id,
        tenantId: tenant.id,
        date: today,
        clockIn: now,
        locationId: resolvedLocationId,
        clockInLat: hasCoords ? options.lat! : null,
        clockInLng: hasCoords ? options.lng! : null,
      },
    })
  } catch (err) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code?: unknown }).code === 'P2002'
    ) {
      throw new UserError('Already clocked in today')
    }
    throw err
  }

  await logAudit({
    action: 'clock_entry.clock_in',
    entity: 'ClockEntry',
    entityId: entry.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      clockIn: now.toISOString(),
      locationId: resolvedLocationId,
      lat: hasCoords ? options.lat : undefined,
      lng: hasCoords ? options.lng : undefined,
    },
  })

  revalidatePath(`/t/${tenantSlug}/clock-ins`)
    return { id: entry.id }
  })
}

export interface ClockOutOptions {
  lat?: number | null
  lng?: number | null
}

export async function clockOut(
  tenantSlug: string,
  options: ClockOutOptions = {}
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  const emp = await getMyEmployee(tenant.id, user.userId)
  if (!emp) throw new UserError('No employee record found for your account')

  const hasCoords =
    typeof options.lat === 'number' &&
    typeof options.lng === 'number' &&
    Number.isFinite(options.lat) &&
    Number.isFinite(options.lng)

  if (tenant.clockInRequireLocation && !hasCoords) {
    throw new UserError(
      'Location is required to clock out. Please allow location access and try again.'
    )
  }

  const now = new Date()

  // Look for ANY open clock entry, not just today's. The previous
  // "today only" filter meant that anyone who clocked in before
  // midnight and tried to clock out after midnight got "No active
  // clock-in found for today" and couldn't close their shift. Pick
  // the most recent open entry to handle multi-shift edge cases.
  // (Round 6 #4.)
  const entry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: emp.id,
      tenantId: tenant.id,
      clockOut: null,
    },
    orderBy: { clockIn: 'desc' },
  })

  if (!entry) {
    throw new UserError('No active clock-in found')
  }

  const totalHours = calcTotalHours(entry.clockIn, now, entry.breakMinutes)

  await prisma.clockEntry.update({
    where: { id: entry.id },
    data: {
      clockOut: now,
      totalHours,
      clockOutLat: hasCoords ? options.lat! : null,
      clockOutLng: hasCoords ? options.lng! : null,
    },
  })

  await logAudit({
    action: 'clock_entry.clock_out',
    entity: 'ClockEntry',
    entityId: entry.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      clockOut: now.toISOString(),
      totalHours,
      lat: hasCoords ? options.lat : undefined,
      lng: hasCoords ? options.lng : undefined,
    },
  })

  revalidatePath(`/t/${tenantSlug}/clock-ins`)
  })
}

export async function updateBreak(tenantSlug: string, entryId: string, minutes: number) {
  const { tenant, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  // Bounds: 0 to 600 minutes (10 hours). Without these guards a user
  // could pass negative minutes (under-stating their break, OVER-
  // crediting their totalHours via the calcTotalHours subtraction)
  // or absurd values like 99999 (zeroing their totalHours via the
  // Math.max(0, …) clamp). The break field is a self-service input
  // so it has to be validated here, not just in the form. (Round 6.)
  if (
    typeof minutes !== 'number' ||
    !Number.isFinite(minutes) ||
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes > 600
  ) {
    throw new Error('Break minutes must be between 0 and 600')
  }

  const emp = await getMyEmployee(tenant.id, user.userId)
  if (!emp) throw new Error('No employee record found for your account')

  const entry = await prisma.clockEntry.findFirst({
    where: { id: entryId, tenantId: tenant.id, employeeId: emp.id },
  })
  if (!entry) throw new Error('Clock entry not found')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = { breakMinutes: minutes }

  // Recalculate total hours if already clocked out
  if (entry.clockOut) {
    updateData.totalHours = calcTotalHours(entry.clockIn, entry.clockOut, minutes)
  }

  await prisma.clockEntry.update({
    where: { id: entryId },
    data: updateData,
  })

  await logAudit({
    action: 'clock_entry.break_updated',
    entity: 'ClockEntry',
    entityId: entryId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { breakMinutes: minutes },
  })

  revalidatePath(`/t/${tenantSlug}/clock-ins`)
  return { success: true }
}

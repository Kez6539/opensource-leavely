'use server'

import { prisma } from '@/lib/db'
import { Prisma } from '@/generated/prisma/client'
import { getSession } from '@/lib/session'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Day-bucketing for clock entries. Made explicit-UTC so the bucket
// is stable across runtimes (Cloudflare Workers run in UTC anyway, so
// the previous local-time constructor was equivalent in production —
// but could drift in dev/test environments).
//
// KNOWN LIMITATION (round 6): for UK users clocking in between
// 00:00–01:00 BST in summer (= 23:00–00:00 UTC the previous day), the
// bucket is the PREVIOUS calendar day in UTC, not Monday in the user's
// local view. A proper fix needs to bucket by London-local time, ideally
// by sending the local day key from the browser at click time. Logged
// for follow-up — out of scope for this audit pass because it requires
// schema/form plumbing.
function startOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
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

/** Look up a location by its QR token. Public query — no auth required. */
export async function getLocationByToken(token: string) {
  const location = await prisma.location.findUnique({
    where: { qrToken: token },
    include: {
      tenant: {
        select: {
          id: true,
          name: true,
          slug: true,
          clockInEnabled: true,
        },
      },
    },
  })

  if (!location) return null

  return {
    id: location.id,
    name: location.name,
    address: location.address,
    isActive: location.isActive,
    tenantId: location.tenant.id,
    tenantName: location.tenant.name,
    tenantSlug: location.tenant.slug,
    clockInEnabled: location.tenant.clockInEnabled,
  }
}

/** Get the current user's clock status for this location today. */
export async function getClockStatusForLocation(token: string) {
  const session = await getSession()
  if (!session.userId) return { authenticated: false as const }

  const location = await prisma.location.findUnique({
    where: { qrToken: token },
    select: { id: true, tenantId: true },
  })

  if (!location) return { authenticated: true as const, employee: null }

  // Find employee record for this user in this tenant
  const employee = await prisma.employee.findFirst({
    where: { tenantId: location.tenantId, userId: session.userId },
    select: { id: true, firstName: true, lastName: true },
  })

  if (!employee) return { authenticated: true as const, employee: null }

  // Get today's clock entry
  const today = startOfDay(new Date())
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const entry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: employee.id,
      tenantId: location.tenantId,
      date: { gte: today, lt: tomorrow },
    },
  })

  return {
    authenticated: true as const,
    employee: {
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
    },
    entry: entry
      ? {
          id: entry.id,
          clockIn: entry.clockIn.toISOString(),
          clockOut: entry.clockOut?.toISOString() ?? null,
          locationId: entry.locationId,
          totalHours: entry.totalHours ? Number(entry.totalHours) : null,
        }
      : null,
  }
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function qrClockIn(
  token: string,
  gps: { lat: number; lng: number } | null
) {
  const session = await getSession()
  if (!session.userId) throw new Error('Not authenticated')

  const location = await prisma.location.findUnique({
    where: { qrToken: token },
    include: { tenant: { select: { id: true, slug: true, clockInEnabled: true } } },
  })

  if (!location) throw new Error('Location not found')
  if (!location.isActive) throw new Error('This location is not active')
  if (!location.tenant.clockInEnabled) throw new Error('Clock-in is not enabled for this organisation')

  const employee = await prisma.employee.findFirst({
    where: { tenantId: location.tenant.id, userId: session.userId },
    select: { id: true },
  })

  if (!employee) throw new Error('No employee record found for your account in this organisation')

  const now = new Date()
  const today = startOfDay(now)
  const tomorrow = new Date(today)
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)

  // Wrap the duplicate-check + insert in a transaction with a per-employee
  // advisory lock so two parallel taps (double-press, network retry,
  // two devices) can't both pass the existence check and both create a
  // clock entry. Same pattern as createLeaveRequest in leave/actions.ts.
  let entry: Awaited<ReturnType<typeof prisma.clockEntry.create>>
  try {
    entry = await prisma.$transaction(async (tx) => {
      await tx.$queryRaw(
        Prisma.sql`SELECT pg_advisory_xact_lock(hashtext(${employee.id + ':clock'}))`
      )
      const existing = await tx.clockEntry.findFirst({
        where: {
          employeeId: employee.id,
          tenantId: location.tenant.id,
          date: { gte: today, lt: tomorrow },
        },
      })
      if (existing) {
        throw new Error('ALREADY_CLOCKED_IN')
      }
      return tx.clockEntry.create({
        data: {
          employeeId: employee.id,
          tenantId: location.tenant.id,
          date: today,
          clockIn: now,
          locationId: location.id,
          clockInLat: gps?.lat ?? null,
          clockInLng: gps?.lng ?? null,
        },
      })
    })
  } catch (err) {
    if (err instanceof Error && err.message === 'ALREADY_CLOCKED_IN') {
      throw new Error('Already clocked in today. Use the Clock Out button to clock out.')
    }
    throw err
  }

  await logAudit({
    action: 'clock_entry.qr_clock_in',
    entity: 'ClockEntry',
    entityId: entry.id,
    userId: session.userId,
    tenantId: location.tenant.id,
    metadata: {
      clockIn: now.toISOString(),
      locationId: location.id,
      locationName: location.name,
      lat: gps?.lat,
      lng: gps?.lng,
    },
  })

  revalidatePath(`/clock/${token}`)
  revalidatePath(`/t/${location.tenant.slug}/clock-ins`)
  return {
    success: true,
    clockIn: now.toISOString(),
  }
}

export async function qrClockOut(
  token: string,
  gps: { lat: number; lng: number } | null
) {
  const session = await getSession()
  if (!session.userId) throw new Error('Not authenticated')

  const location = await prisma.location.findUnique({
    where: { qrToken: token },
    include: { tenant: { select: { id: true, slug: true, clockInEnabled: true } } },
  })

  if (!location) throw new Error('Location not found')
  if (!location.tenant.clockInEnabled) throw new Error('Clock-in is not enabled for this organisation')

  const employee = await prisma.employee.findFirst({
    where: { tenantId: location.tenant.id, userId: session.userId },
    select: { id: true },
  })

  if (!employee) throw new Error('No employee record found for your account in this organisation')

  const now = new Date()

  // Look for ANY open clock entry (clockOut == null) for this employee,
  // not just today's. The previous "today only" filter meant that
  // anyone who clocked in before midnight and tried to clock out after
  // midnight got "No active clock-in found" and couldn't close their
  // shift. Night shift, late-running events, and people clocking out
  // at 12:05am are all the realistic case. Pick the most recent open
  // entry to handle the (rare) case of multiple open shifts.
  // (Round 6 #4.)
  const entry = await prisma.clockEntry.findFirst({
    where: {
      employeeId: employee.id,
      tenantId: location.tenant.id,
      clockOut: null,
    },
    orderBy: { clockIn: 'desc' },
  })

  if (!entry) throw new Error('No active clock-in found')

  const totalHours = calcTotalHours(entry.clockIn, now, entry.breakMinutes)

  await prisma.clockEntry.update({
    where: { id: entry.id },
    data: {
      clockOut: now,
      totalHours,
      clockOutLat: gps?.lat ?? null,
      clockOutLng: gps?.lng ?? null,
    },
  })

  await logAudit({
    action: 'clock_entry.qr_clock_out',
    entity: 'ClockEntry',
    entityId: entry.id,
    userId: session.userId,
    tenantId: location.tenant.id,
    metadata: {
      clockOut: now.toISOString(),
      totalHours,
      locationId: location.id,
      locationName: location.name,
      lat: gps?.lat,
      lng: gps?.lng,
    },
  })

  revalidatePath(`/clock/${token}`)
  revalidatePath(`/t/${location.tenant.slug}/clock-ins`)
  return {
    success: true,
    clockOut: now.toISOString(),
    totalHours,
  }
}

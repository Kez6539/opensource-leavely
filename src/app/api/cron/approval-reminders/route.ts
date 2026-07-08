import { prisma } from '@/lib/db'
import { logAudit } from '@/lib/audit'
import { toLocalDayKey } from '@/lib/business-days'
import {
  sendPendingApprovalReminderEmail,
  PendingRequestSummary,
} from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

// Constant-time string comparison. Avoids leaking the expected auth header
// through response-time side channels.
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

export async function GET(request: NextRequest) {
  // Protect with a secret header
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    // Dedupe window: we only remind about a given request if it hasn't been
    // reminded in the last 20 hours. Slightly less than 24h so an accidental
    // late-by-a-few-hours cron run still catches stale requests that slipped
    // past the previous day.
    const twentyHoursAgo = new Date(now.getTime() - 20 * 60 * 60 * 1000)

    // Find all PENDING leave requests older than 24 hours where either:
    //   (a) we've never sent a reminder, or
    //   (b) the last reminder is older than 20h.
    // Also filter to ACTIVE employees — no point nagging the manager about a
    // terminated employee's leftover request.
    const pendingRequests = await prisma.leaveRequest.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lte: twentyFourHoursAgo },
        OR: [
          { lastReminderSentAt: null },
          { lastReminderSentAt: { lt: twentyHoursAgo } },
        ],
        employee: { status: 'ACTIVE' },
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            managerId: true,
          },
        },
        policy: {
          select: { name: true },
        },
        tenant: {
          select: { id: true, slug: true },
        },
      },
    })

    if (pendingRequests.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 })
    }

    // Group by manager. We also hold on to the request IDs so we can stamp
    // `lastReminderSentAt` after the email goes out.
    const byManager = new Map<
      string,
      {
        managerId: string
        tenantId: string
        tenantSlug: string
        requests: {
          id: string
          employeeName: string
          dates: string
          policyName: string
        }[]
      }
    >()

    for (const req of pendingRequests) {
      const managerId = req.employee.managerId
      if (!managerId) continue // Skip if employee has no manager

      const key = `${managerId}:${req.tenant.id}`
      if (!byManager.has(key)) {
        byManager.set(key, {
          managerId,
          tenantId: req.tenant.id,
          tenantSlug: req.tenant.slug,
          requests: [],
        })
      }

      // Format from the canonical local day key — this cron runs in UTC,
      // so raw toLocaleDateString rendered BST-stored leave dates (UTC
      // 23:00 of the previous day) one day early in the reminder email.
      const formatDay = (d: Date) => {
        const [y, m, day] = toLocalDayKey(d).split('-').map(Number)
        return new Date(Date.UTC(y, m - 1, day, 12)).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        })
      }
      const startStr = formatDay(req.startDate)
      const endStr = formatDay(req.endDate)
      const dates = startStr === endStr ? startStr : `${startStr} to ${endStr}`

      byManager.get(key)!.requests.push({
        id: req.id,
        employeeName: `${req.employee.firstName} ${req.employee.lastName}`,
        dates,
        policyName: req.policy.name,
      })
    }

    const { shouldSendEmail } = await import('@/lib/email-preferences')

    // For each manager, look up their details and send an email
    let sentCount = 0
    for (const [, group] of byManager) {
      const manager = await prisma.employee.findUnique({
        where: { id: group.managerId },
        select: { firstName: true, lastName: true, email: true, userId: true },
      })

      if (!manager?.email) continue

      // Respect the manager's "leave updates" opt-out. They've opted out of
      // similar notifications from the app, so the scheduled nag should
      // also defer to that preference.
      if (manager.userId) {
        const canSend = await shouldSendEmail(manager.userId, 'leaveUpdates')
        if (!canSend) continue
      }

      const summaries: PendingRequestSummary[] = group.requests.map((r) => ({
        employeeName: r.employeeName,
        dates: r.dates,
        policyName: r.policyName,
      }))

      try {
        await sendPendingApprovalReminderEmail(
          manager.email,
          `${manager.firstName} ${manager.lastName}`,
          summaries,
          group.tenantSlug
        )

        // Stamp every request in this batch so retries skip them. Done after
        // the send succeeds so a transient Resend failure doesn't cause us
        // to permanently drop the reminder.
        await prisma.leaveRequest.updateMany({
          where: { id: { in: group.requests.map((r) => r.id) } },
          data: { lastReminderSentAt: now },
        })

        await logAudit({
          action: 'APPROVAL_REMINDER_SENT',
          entity: 'LeaveRequest',
          metadata: {
            managerEmail: manager.email,
            pendingCount: summaries.length,
          },
          tenantId: group.tenantId,
        })

        sentCount++
      } catch (err) {
        console.error(
          `Failed to send reminder to ${manager.email}:`,
          err
        )
      }
    }

    return NextResponse.json({ ok: true, sent: sentCount })
  } catch (err) {
    console.error('Approval reminders cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

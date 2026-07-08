import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { toLocalDayKey } from '@/lib/business-days'

function formatDateForICal(date: Date): string {
  // toLocalDayKey, not raw getUTC* — BST-stored leave dates sit at UTC
  // 23:00 of the PREVIOUS day, so reading UTC components directly put
  // every summer leave one day early in subscribed Google/Outlook/Apple
  // calendars. GMT-stored (UTC 00:00) dates were unaffected, which is
  // why the feed looked right in winter.
  return toLocalDayKey(date).replace(/-/g, '')
}

function formatDateTimeForICal(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + days)
  return result
}

function escapeICalText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    const calendarToken = await prisma.calendarToken.findUnique({
      where: { token },
    })

    if (!calendarToken) {
      return new NextResponse('Calendar not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
    }

    // Best-effort fetch-stamp so admins can see whether the URL is being
    // polled. Fire-and-forget — never block the feed response on this.
    prisma.calendarToken
      .update({ where: { id: calendarToken.id }, data: { lastFetchedAt: new Date() } })
      .catch(() => undefined)

    // For ALL scopes, verify the token's user still has membership in this
    // tenant. Without this check a personal calendar URL keeps working
    // forever even after the user is removed from the tenant — leaking
    // their leave history (and potentially sickness/medical reasons before
    // we redacted the DESCRIPTION field) to whoever has the link. (Codex
    // round 4 #13.)
    const tokenMembership = await prisma.membership.findUnique({
      where: {
        tenantId_userId: {
          tenantId: calendarToken.tenantId,
          userId: calendarToken.userId,
        },
      },
      select: { role: true },
    })
    if (!tokenMembership) {
      return new NextResponse('Calendar not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
    }

    // For TEAM scope, additionally require MANAGER+ — anyone demoted to
    // plain EMPLOYEE loses their team-scope feed even if the membership
    // itself is still active.
    if (calendarToken.scope === 'team') {
      const allowed = ['OWNER', 'ADMIN', 'MANAGER'].includes(tokenMembership.role)
      if (!allowed) {
        return new NextResponse('Calendar not found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
      }
    }

    // Fetch approved leave requests based on scope
    let leaveRequests
    if (calendarToken.scope === 'personal') {
      // Find the employee linked to this user in this tenant
      const employee = await prisma.employee.findFirst({
        where: { tenantId: calendarToken.tenantId, userId: calendarToken.userId },
        select: { id: true },
      })

      if (!employee) {
        return new NextResponse(generateEmptyCalendar(), {
          headers: getICalHeaders(),
        })
      }

      leaveRequests = await prisma.leaveRequest.findMany({
        where: {
          tenantId: calendarToken.tenantId,
          employeeId: employee.id,
          status: 'APPROVED',
        },
        include: { employee: true, policy: true },
        orderBy: { startDate: 'desc' },
        take: 500,
      })
    } else {
      // Team scope: all approved leave for the tenant
      leaveRequests = await prisma.leaveRequest.findMany({
        where: {
          tenantId: calendarToken.tenantId,
          status: 'APPROVED',
        },
        include: { employee: true, policy: true },
        orderBy: { startDate: 'desc' },
        take: 1000,
      })
    }

    const calendarName = calendarToken.scope === 'personal'
      ? 'Leavely - My Leave'
      : 'Leavely - Team Leave'

    const events = leaveRequests.map((lr) => {
      const empName = `${lr.employee.firstName} ${lr.employee.lastName}`
      // Sickness uses a generic label so the iCal feed (which gets cached
      // by Google Calendar / Outlook / Apple Calendar / phone backups, often
      // in plaintext) never advertises which employees were off sick. The
      // policy name is fine on personal scope but on team scope we squash
      // sickness to "Out of office" so a leaked URL doesn't expose health
      // data.
      const isSickness = lr.policy.isSystemType === 'sickness'
      const policyLabel =
        isSickness && calendarToken.scope === 'team'
          ? 'Out of office'
          : lr.policy.name
      const summary = `${empName} - ${policyLabel}`
      const dtStart = formatDateForICal(lr.startDate)
      // DTEND is exclusive for all-day events (day after last day)
      const dtEnd = formatDateForICal(addDays(lr.endDate, 1))

      // The leave reason often contains sensitive medical info ("migraine",
      // "pregnancy complication", "depression"). Calendar URLs leak via
      // sync caches, browser history, MDM exports, mail forwarders. Never
      // emit the reason in the iCal feed regardless of scope — viewers who
      // need the detail can open the request in-app where the audit trail
      // and access controls apply.
      return [
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${escapeICalText(summary)}`,
        'STATUS:CONFIRMED',
        `UID:leave-${lr.id}@leavely.com`,
        `DTSTAMP:${formatDateTimeForICal(lr.createdAt)}`,
        'END:VEVENT',
      ].join('\r\n')
    })

    const ical = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Leavely//Leave Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${escapeICalText(calendarName)}`,
      ...events,
      'END:VCALENDAR',
    ].join('\r\n')

    return new NextResponse(ical, {
      headers: getICalHeaders(),
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getICalHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="leavely-calendar.ics"',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  }
}

function generateEmptyCalendar(): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Leavely//Leave Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Leavely Leave Calendar',
    'END:VCALENDAR',
  ].join('\r\n')
}

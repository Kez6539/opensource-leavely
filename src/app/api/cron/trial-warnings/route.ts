import { prisma } from '@/lib/db'
import { sendTrialExpiryEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

// Constant-time string comparison. Mirrors the helper in approval-reminders —
// duplicated here rather than extracted because this file is tiny and sharing
// would require a new lib module just for one comparator.
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

/**
 * Nightly cron that emails tenant owners whose trial is about to end.
 *
 * Selection criteria:
 *   - status is TRIALING
 *   - trialEndsAt is within the next 3 days (inclusive)
 *   - lastTrialWarningAt is null OR older than 24h (so we don't spam)
 *
 * Protected by CRON_SECRET via `Authorization: Bearer <secret>` header.
 * Previously this email was sent from the `/t/[slug]` layout render path,
 * which caused:
 *   (a) duplicate sends (multiple tabs / stale caches firing in parallel),
 *   (b) latency on every page load for every trialing tenant, and
 *   (c) silent drops on Cloudflare Workers when the request ended before
 *       Resend responded.
 * Moving it to a cron lets us dedupe via `lastTrialWarningAt` atomically
 * and lets the Workers runtime keep the request alive for the full send.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const threeDaysOut = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const sequenceStart = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000)

    // Pull candidate tenants with their billing + the OWNER membership in a
    // single query. We can't do the whole thing as a SQL update because we
    // need to look up the owner's email and respect the per-user
    // trialWarnings preference first.
    const candidates = await prisma.tenantBilling.findMany({
      where: {
        status: 'TRIALING',
        trialEndsAt: { gte: now, lte: threeDaysOut },
        // The day 10/12/14 trial-expiry sequence owns normal 14-day trials.
        // Keep this older warning job only as a fallback for unusually short
        // or manually adjusted trials that reach the 3-day window before day 10.
        tenant: { is: { createdAt: { gt: sequenceStart } } },
        OR: [
          { lastTrialWarningAt: null },
          { lastTrialWarningAt: { lt: dayAgo } },
        ],
      },
      include: {
        tenant: { select: { id: true, slug: true, name: true } },
      },
    })

    let sent = 0
    let skipped = 0
    let failed = 0
    const { shouldSendEmail } = await import('@/lib/email-preferences')

    for (const billing of candidates) {
      if (!billing.trialEndsAt) {
        skipped++
        continue
      }
      const daysLeft = Math.max(
        0,
        Math.ceil((billing.trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
      )

      const ownerMembership = await prisma.membership.findFirst({
        where: { tenantId: billing.tenantId, role: 'OWNER' },
        include: { user: { select: { id: true, email: true, name: true } } },
      })
      if (!ownerMembership?.user.email) {
        skipped++
        continue
      }

      const canSend = await shouldSendEmail(ownerMembership.user.id, 'trialWarnings')
      if (!canSend) {
        skipped++
        continue
      }

      try {
        await sendTrialExpiryEmail(
          ownerMembership.user.email,
          ownerMembership.user.name ?? 'there',
          billing.tenant.slug,
          daysLeft,
        )
        // Update AFTER the send succeeds so a transient Resend failure
        // doesn't cause us to skip the tenant on the next run.
        await prisma.tenantBilling.update({
          where: { tenantId: billing.tenantId },
          data: { lastTrialWarningAt: new Date() },
        })
        sent++
      } catch (err) {
        console.error(
          `[trial-warnings] failed for tenant ${billing.tenant.slug}:`,
          err,
        )
        failed++
      }
    }

    return NextResponse.json({ ok: true, sent, skipped, failed, considered: candidates.length })
  } catch (err) {
    console.error('[trial-warnings] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

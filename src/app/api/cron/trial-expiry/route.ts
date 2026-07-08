import { prisma } from '@/lib/db'
import { logAudit } from '@/lib/audit'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'

/**
 * Constant-time string comparison. Same helper as the approval-reminders
 * cron — kept local so this route is self-contained and we don't have to
 * touch a shared lib.
 */
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

/**
 * Nightly trial-expiry job (issues #91 and #104).
 *
 * The old admin dashboard queried TRIALING tenants with `trialEndsAt ≤ now +
 * 7d` to flag "trials expiring soon", but nothing actually expired them —
 * runtime checks in `getPaywallStatus` also ignored `trialEndsAt`, so a new
 * tenant who never added a card got free access forever.
 *
 * This cron closes the loop: find every TRIALING row where the trial end
 * has already passed, flip it to CANCELED, and log an audit row per tenant
 * so the admin panel reflects reality. `getPaywallStatus` now has its own
 * runtime check (issue #91) so there's no user-visible gap between cron
 * ticks, but we still need this job to keep the admin tallies honest.
 *
 * Schedule: trigger via Cloudflare Workers cron or GitHub Actions once a
 * day with `Authorization: Bearer ${CRON_SECRET}`.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()

    // Narrow the query to tenants that are still in TRIALING but whose
    // deadline has passed. Tenants with `trialEndsAt === null` are
    // intentionally skipped — that's the legacy/manual override path and
    // should only be touched by hand from the admin panel.
    const expired = await prisma.tenantBilling.findMany({
      where: {
        status: 'TRIALING',
        trialEndsAt: { lt: now },
      },
      select: { id: true, tenantId: true, trialEndsAt: true, tenant: { select: { slug: true } } },
    })

    if (expired.length === 0) {
      return NextResponse.json({ ok: true, expired: 0 })
    }

    // One row at a time so we can audit-log per tenant. Scale: we only
    // onboard ~10 tenants/day so the row count here is tiny; if this ever
    // grows past a few hundred per tick we can batch the updateMany +
    // insert audit rows in bulk.
    let expiredCount = 0
    for (const billing of expired) {
      try {
        await prisma.tenantBilling.update({
          where: { id: billing.id },
          data: { status: 'CANCELED' },
        })
        await logAudit({
          action: 'billing.trial_expired',
          entity: 'TenantBilling',
          entityId: billing.id,
          tenantId: billing.tenantId,
          metadata: {
            trialEndsAt: billing.trialEndsAt?.toISOString() ?? null,
            source: 'cron',
          },
        })
        fireAndForget(
          trackServerEvent('trial_expired', {
            distinctId: billing.tenantId,
            tenantId: billing.tenantId,
            properties: {
              tenant_slug: billing.tenant.slug,
              billing_id: billing.id,
              trial_ends_at: billing.trialEndsAt?.toISOString() ?? null,
              source: 'cron',
            },
          }),
          'analytics.trial-expired',
        )
        expiredCount++
      } catch (err) {
        console.error(`[trial-expiry] failed to expire tenant ${billing.tenantId}:`, err)
      }
    }

    return NextResponse.json({ ok: true, expired: expiredCount })
  } catch (err) {
    console.error('[trial-expiry] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

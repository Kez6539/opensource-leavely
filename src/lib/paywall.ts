import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { UserError } from '@/lib/action-result'

export type PaywallStatus = 'active' | 'readonly' | 'past_due'

// Stable sentinel codes carried on `error.digest`. Next.js masks every thrown
// server-action/RSC error MESSAGE in production ("An error occurred in the
// Server Components render…"), but it forwards an existing string `digest`
// untouched — so client error boundaries match on digest, not message.
export const DEMO_READONLY_DIGEST = 'DEMO_READONLY'
export const SUBSCRIPTION_REQUIRED_DIGEST = 'SUBSCRIPTION_REQUIRED'

/**
 * Thrown when a public /demo session attempts a write. Extends UserError so
 * actions wrapped in withUserErrors() return the friendly message as a
 * structured `{ ok: false, error }` result; unwrapped actions bubble to the
 * tenant error boundary which matches on `digest`.
 */
export class DemoReadOnlyError extends UserError {
  readonly digest = DEMO_READONLY_DIGEST
  constructor() {
    super(
      "This is a shared demo workspace, so changes are disabled. Sign up for a free trial to manage your own team's leave."
    )
    this.name = 'DemoReadOnlyError'
  }
}

/** Thrown when a read-only (expired/canceled) tenant attempts a write. */
export class SubscriptionRequiredError extends UserError {
  readonly digest = SUBSCRIPTION_REQUIRED_DIGEST
  constructor() {
    super(
      'Your trial has ended or your subscription is inactive. Reactivate billing in Settings to make changes.'
    )
    this.name = 'SubscriptionRequiredError'
  }
}

/**
 * Throw if the current session is a public demo session. The /demo route
 * grants a real session bound to the OWNER of the shared `acme` tenant so
 * prospects can explore every admin screen — but a public visitor must not
 * be able to mutate that shared tenant (delete employees, cancel leave,
 * post announcements, change settings, etc.). Reads stay fully functional
 * because read-only actions never call requireWriteAccess.
 */
export async function assertNotDemo(): Promise<void> {
  const session = await getSession()
  if (session.isDemo) {
    throw new DemoReadOnlyError()
  }
}

/**
 * Check whether a tenant has write access based on billing status.
 * - ACTIVE → full access
 * - TRIALING with trialEndsAt in the future (or null) → full access
 * - TRIALING with trialEndsAt in the past → read-only (issue #91 —
 *   previously returned 'active' regardless of the timestamp, which meant
 *   a non-paying tenant could use the product forever after signup). The
 *   nightly cron at /api/cron/trial-expiry flips the DB row to CANCELED
 *   so admin dashboards tally correctly; this check is the runtime guard
 *   that closes the gap between cron ticks.
 * - PAST_DUE → full access + banner (handled in layout)
 * - CANCELED / INCOMPLETE → read-only
 * - No billing row → read-only (fail-closed). Every signup flow creates a
 *   TenantBilling row, so missing rows mean either legacy/manual tenants or
 *   data corruption — neither should silently get free access.
 */
export async function getPaywallStatus(tenantId: string): Promise<PaywallStatus> {
  const billing = await prisma.tenantBilling.findUnique({
    where: { tenantId },
  })

  // Fail closed on missing billing row to prevent free-tier escape hatches.
  if (!billing) return 'readonly'

  if (billing.status === 'ACTIVE') {
    return 'active'
  }

  if (billing.status === 'TRIALING') {
    // Runtime trial-expiry check. trialEndsAt is nullable — a null value
    // means "no deadline" (legacy / manual billing override) and stays
    // active. A timestamp in the past means the cron hasn't caught up yet
    // but the user should already be read-only.
    if (billing.trialEndsAt && billing.trialEndsAt.getTime() < Date.now()) {
      return 'readonly'
    }
    return 'active'
  }

  if (billing.status === 'PAST_DUE') {
    return 'past_due'
  }

  // CANCELED or INCOMPLETE
  return 'readonly'
}

/**
 * Throw if tenant is in read-only mode (canceled/incomplete subscription).
 * Call this at the top of any write server action.
 */
export async function requireWriteAccess(tenantId: string): Promise<void> {
  // Public demo sessions are read-only: block every mutating action that
  // routes through this central write guard so a visitor can't alter the
  // shared `acme` demo tenant.
  await assertNotDemo()

  const status = await getPaywallStatus(tenantId)
  if (status === 'readonly') {
    throw new SubscriptionRequiredError()
  }
}

import { prisma } from '@/lib/db'
import { sendNewSignupNotification } from '@/lib/email'
import { fireAndForget } from '@/lib/cloudflare-ctx'

/**
 * Send the founder's "new signup" notification at most once per tenant.
 *
 * Intentionally deferred from the moment of account creation — email-
 * scanner prefetches and abandoned signups were generating dozens of
 * ghost notifications. We only fire when the tenant proves they're a
 * real human:
 *   - completeOnboarding() runs (they finished the wizard)
 *   - the Stripe webhook receives checkout.session.completed (they
 *     entered card details)
 *
 * Idempotency: an UPDATE with a `signupNotifiedAt: null` guard means
 * concurrent callers race for the row and only one wins. The Stripe
 * webhook can race with completeOnboarding without double-sending.
 */
export async function notifyFounderOfSignupOnce(tenantId: string): Promise<void> {
  // Race-safe claim: only proceed if signupNotifiedAt is still null.
  // updateMany returns the count so we know whether we won the race.
  const claim = await prisma.tenant.updateMany({
    where: { id: tenantId, signupNotifiedAt: null },
    data: { signupNotifiedAt: new Date() },
  })
  if (claim.count === 0) return

  // Load just enough to render the email — owner membership for the
  // human name + email, tenant name for the subject.
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: {
      name: true,
      memberships: {
        where: { role: 'OWNER' },
        orderBy: { createdAt: 'asc' },
        take: 1,
        select: { user: { select: { name: true, email: true } } },
      },
    },
  })
  const owner = tenant?.memberships[0]?.user
  if (!tenant || !owner) {
    // Roll the flag back so a later call can retry — better to risk a
    // duplicate than to silently lose the notification on a transient
    // missing-membership state.
    await prisma.tenant.updateMany({
      where: { id: tenantId, signupNotifiedAt: { not: null } },
      data: { signupNotifiedAt: null },
    })
    console.error('[signup-notify] tenant or owner missing, rolling back claim:', tenantId)
    return
  }

  fireAndForget(
    sendNewSignupNotification(owner.name || 'User', tenant.name, owner.email).catch((err) =>
      console.error('[signup-notify] send failed:', err),
    ),
    'signup-notify.send',
  )
}

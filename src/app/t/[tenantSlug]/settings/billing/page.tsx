import { getBillingInfo, pollForCheckoutCompletion } from './actions'
import { BillingClient } from './billing-client'
import { CheckoutPolling } from './checkout-polling'

/**
 * Issue #96 — when Stripe redirects the user back after a successful
 * checkout, the `checkout.session.completed` webhook may not have landed
 * in our DB yet. Previously we rendered the billing page immediately and
 * the user saw "Trial — Subscribe" even though they had just paid, which
 * tempted them into a second checkout attempt.
 *
 * Now:
 *   1. If ?session_id= is present we poll server-side for up to ~3s,
 *      looking for the webhook to populate stripeSubId + flip the status.
 *   2. If the poll resolves, render the real billing page straight away.
 *   3. If the poll times out, render a transient client polling UI that
 *      auto-refreshes every 1.5s, so the user gets a spinner instead of
 *      a stale "Trial" state and a misleading "Subscribe" button.
 */
export default async function BillingPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ session_id?: string }>
}) {
  const { tenantSlug } = await params
  const { session_id: sessionId } = await searchParams

  if (sessionId) {
    const settled = await pollForCheckoutCompletion(tenantSlug, sessionId)
    if (!settled) {
      return <CheckoutPolling tenantSlug={tenantSlug} />
    }
  }

  const billing = await getBillingInfo(tenantSlug)

  return <BillingClient billing={billing} tenantSlug={tenantSlug} />
}

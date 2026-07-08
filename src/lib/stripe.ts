import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { Prisma } from '@/generated/prisma/client'

let _stripe: Stripe | null = null

export function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _stripe = new Stripe(key, { apiVersion: '2024-12-18.acacia' as any })
  }
  return _stripe
}

/**
 * Reconcile the Stripe subscription quantity with our active-employee count
 * for a tenant. Called (fire-and-forget) from every employee mutation path.
 *
 * Issue #71 — the naive read-then-write pattern races under concurrent
 * activations: two create-employee calls both read `count=10`, both PUT
 * `10` to Stripe, and the final quantity is 10 when the true post-commit
 * count is 11. Fix: wrap the whole thing in a `$transaction` and take a
 * Postgres advisory xact lock keyed on the tenantId. Concurrent calls
 * serialise on the lock, each one observing the committed count as of
 * their own serialisation point. The lock is released automatically when
 * the transaction ends (xact_lock, not session_lock).
 *
 * Issue #97 — we used to `Math.max(employeeCount, 1)` to dodge Stripe's
 * zero-seat rejection, which meant a tenant who terminated their last
 * employee kept paying £8/mo for a phantom seat with no UI hint. Now:
 * if the active count drops to zero, cancel the subscription at
 * period end (via `stripe.subscriptions.update({cancel_at_period_end})`)
 * rather than clamping. The tenant keeps read access to the billing page
 * where they can resubscribe, and we stop charging them for nobody.
 */
export async function syncSeatCount(tenantId: string) {
  // We fetch billing inside the transaction so the advisory lock also
  // serialises against any other path that reads/writes billing for this
  // tenant. The hashtext() call coerces the tenantId (string cuid) into an
  // int4 that pg_advisory_xact_lock wants.
  await prisma.$transaction(async (tx) => {
    // Serialise per-tenant. Two concurrent syncs for the same tenantId
    // will block here until the first commits, guaranteeing the second
    // sees the first's employee writes before it re-counts.
    await tx.$queryRaw(
      Prisma.sql`SELECT pg_advisory_xact_lock(hashtext(${tenantId}))`
    )

    const billing = await tx.tenantBilling.findUnique({ where: { tenantId } })
    if (!billing?.stripeSubId) return // No active Stripe subscription

    const employeeCount = await tx.employee.count({
      where: { tenantId, status: 'ACTIVE' },
    })

    const stripe = getStripe()
    const subscription = await stripe.subscriptions.retrieve(billing.stripeSubId)
    const item = subscription.items.data[0]
    if (!item) return

    // Zero-seat case: cancel at period end so the tenant keeps access
    // until their already-paid month runs out, then stops billing. We
    // explicitly do NOT pass a new quantity here — Stripe rejects
    // `quantity: 0` — and we avoid `stripe.subscriptions.cancel` so the
    // tenant gets a grace window rather than an immediate lockout.
    if (employeeCount === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(subscription as any).cancel_at_period_end) {
        await stripe.subscriptions.update(billing.stripeSubId, {
          cancel_at_period_end: true,
          metadata: {
            ...(subscription.metadata ?? {}),
            leavely_cancel_reason: 'zero_active_employees',
          },
        })
      }
      return
    }

    // If WE previously scheduled a cancel for the zero-seat case and the
    // tenant has now re-added an employee, undo the scheduled cancel
    // before updating the quantity — otherwise Stripe would happily bill
    // the new quantity and still cancel the sub at period end.
    //
    // CRITICAL: only un-cancel if our `leavely_cancel_reason` metadata
    // says we set it for zero employees. A paying customer who cancels
    // via the Stripe Billing Portal also has `cancel_at_period_end=true`,
    // and silently reversing a human-initiated cancellation on the next
    // employee add is the kind of billing horror that becomes a chargeback
    // and a Twitter post. If the cancel came from anywhere other than our
    // zero-seat path (portal, Stripe dashboard, manual API), leave it alone.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scheduledToCancel = !!(subscription as any).cancel_at_period_end
    const ourCancelReason = subscription.metadata?.leavely_cancel_reason
    if (scheduledToCancel && ourCancelReason === 'zero_active_employees') {
      await stripe.subscriptions.update(billing.stripeSubId, {
        cancel_at_period_end: false,
        metadata: {
          ...(subscription.metadata ?? {}),
          leavely_cancel_reason: '', // clear our reason flag
        },
      })
    } else if (scheduledToCancel) {
      // User-initiated cancel; don't touch their schedule. We'll keep
      // syncing the quantity below so any mid-period employee changes
      // are still reflected on the final invoice, but the cancellation
      // stays in place.
    }

    if (item.quantity === employeeCount) return // Already correct

    await stripe.subscriptions.update(billing.stripeSubId, {
      items: [{ id: item.id, quantity: employeeCount }],
      proration_behavior: 'create_prorations',
    })
  })
}

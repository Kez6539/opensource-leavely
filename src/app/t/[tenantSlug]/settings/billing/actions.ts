'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { assertNotDemo } from '@/lib/paywall'
import { getStripe } from '@/lib/stripe'
import { is50PercentDiscount, STARTUP_PLAN_KEY } from '@/lib/plans'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'

export async function getBillingInfo(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const billing = await prisma.tenantBilling.findUnique({
    where: { tenantId: tenant.id },
  })

  const employeeCount = await prisma.employee.count({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
  })

  return {
    status: billing?.status ?? 'TRIALING',
    planKey: billing?.planKey ?? 'free',
    currentPeriodEnd: billing?.currentPeriodEnd?.toISOString() ?? null,
    trialEndsAt: billing?.trialEndsAt?.toISOString() ?? null,
    hasStripe: !!billing?.stripeCustomerId,
    employeeCount,
  }
}

function resolveStripePriceId(planKey: string | null): string {
  if (is50PercentDiscount(planKey)) {
    const id = process.env.STRIPE_CHARITY_PRICE_ID
    if (!id) throw new Error('Charity/discount price not configured')
    return id
  }
  if (planKey === STARTUP_PLAN_KEY) {
    const id = process.env.STRIPE_STARTUP_PRICE_ID
    if (!id) throw new Error('Startup price not configured')
    return id
  }
  const id = process.env.STRIPE_PRICE_ID
  if (!id) throw new Error('Stripe price not configured')
  return id
}

/**
 * Single source of truth for creating a Stripe checkout session for an
 * existing tenant. Both the billing settings page and the
 * `/api/stripe/checkout` HTTP route delegate here so VAT / address /
 * currency settings can't drift between call sites (issue #103).
 *
 * Issue #93 — every checkout.sessions.create call on Leavely must:
 *   - assert GBP so we never accidentally bill a multi-currency account
 *   - enable automatic tax so we can issue a compliant UK VAT invoice
 *   - collect tax ID and billing address so the invoice is valid
 *   - auto-update the Stripe customer with the collected address + name
 *     so the tenant's billing portal + any future invoices inherit them
 *
 * Issue #96 — the success URL embeds `{CHECKOUT_SESSION_ID}` so the
 * billing page can poll `stripe.checkout.sessions.retrieve` server-side
 * before rendering, closing the gap where the webhook lands after the
 * redirect.
 */
export async function createCheckoutSession(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'OWNER')

  const billing = await prisma.tenantBilling.findUnique({ where: { tenantId: tenant.id } })
  const priceId = resolveStripePriceId(billing?.planKey ?? null)

  const stripe = getStripe()

  const employeeCount = await prisma.employee.count({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
  })
  // Issue #97 — refuse to start a checkout for zero seats. The old
  // Math.max(...,1) meant a tenant with no employees could subscribe to
  // 1 phantom seat and bleed £8/mo. Forcing them to add someone first
  // makes intent explicit.
  if (employeeCount === 0) {
    throw new Error('Add at least one active employee before subscribing.')
  }
  const seatCount = employeeCount

  // Get or create Stripe customer
  let customerId = billing?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { tenantId: tenant.id, tenantSlug: tenant.slug },
    })
    customerId = customer.id

    if (billing) {
      await prisma.tenantBilling.update({
        where: { tenantId: tenant.id },
        data: { stripeCustomerId: customerId },
      })
    } else {
      await prisma.tenantBilling.create({
        data: { tenantId: tenant.id, stripeCustomerId: customerId },
      })
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    currency: 'gbp',
    line_items: [{ price: priceId, quantity: seatCount }],
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    billing_address_collection: 'required',
    customer_update: { address: 'auto', name: 'auto' },
    custom_text: {
      submit: {
        message:
          'UK GDPR-ready | SSL secured | Encrypted payments by Stripe. Card details are processed by Stripe.',
      },
    },
    success_url: `${baseUrl}/t/${tenantSlug}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/t/${tenantSlug}/settings/billing`,
    metadata: { tenantId: tenant.id, employeeCount: String(seatCount) },
  })

  fireAndForget(
    trackServerEvent('payment_attempt', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        tenant_slug: tenant.slug,
        source: 'billing_settings',
        plan_key: billing?.planKey ?? null,
        seats: seatCount,
        stripe_checkout_session_id: session.id,
      },
    }),
    'analytics.payment-attempt',
  )

  return { url: session.url! }
}

/**
 * Issue #96 — server-side poll that waits for the `checkout.session.completed`
 * webhook to land. Stripe redirects back to the billing page instantly, but
 * the webhook lands a few hundred ms later over a separate connection, so
 * the first page render would otherwise see the pre-checkout state and
 * tempt the owner into a double-subscribe.
 *
 * We do a quick `stripe.checkout.sessions.retrieve` up-front to confirm the
 * payment actually succeeded, then poll our own DB at ~300ms intervals for
 * up to 3 seconds, looking for the webhook to populate stripeSubId on the
 * billing row. Returns `true` if the DB reflects the completion, `false`
 * if it times out (the page will fall back to a client-side polling UI).
 */
export async function pollForCheckoutCompletion(
  tenantSlug: string,
  sessionId: string
): Promise<boolean> {
  // Audit follow-up: this action queries Stripe and the local billing
  // table without role enforcement, mirror the OWNER gate that
  // createCheckoutSession() / createPortalSession() use.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'OWNER')

  const stripe = getStripe()
  let checkoutSession
  try {
    checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
  } catch (err) {
    console.error('[pollForCheckoutCompletion] failed to retrieve session:', err)
    return false
  }

  // If Stripe itself doesn't consider the session complete, there's no
  // point waiting for our webhook — the user bounced or the payment
  // failed. Render the page normally so they see the current state.
  if (checkoutSession.payment_status !== 'paid' && checkoutSession.status !== 'complete') {
    return false
  }

  // The expected subscription ID from the checkout session — once the
  // webhook lands this should appear on the billing row.
  const expectedSubId =
    typeof checkoutSession.subscription === 'string'
      ? checkoutSession.subscription
      : (checkoutSession.subscription?.id ?? null)

  const deadline = Date.now() + 3000
  while (Date.now() < deadline) {
    const billing = await prisma.tenantBilling.findUnique({
      where: { tenantId: tenant.id },
      select: { stripeSubId: true, status: true },
    })
    if (billing?.stripeSubId && (!expectedSubId || billing.stripeSubId === expectedSubId)) {
      return true
    }
    // Short sleep; we stay on the server the whole time so the client
    // doesn't see a flash of stale state.
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
  return false
}

export async function createPortalSession(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'OWNER')

  const billing = await prisma.tenantBilling.findUnique({ where: { tenantId: tenant.id } })
  if (!billing?.stripeCustomerId) throw new Error('No billing account found')

  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

  const session = await stripe.billingPortal.sessions.create({
    customer: billing.stripeCustomerId,
    return_url: `${baseUrl}/t/${tenantSlug}/settings/billing`,
  })

  return { url: session.url }
}

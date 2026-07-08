import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/app/t/[tenantSlug]/settings/billing/actions'

/**
 * Thin HTTP wrapper around the billing server action (issue #103).
 *
 * Historically this route re-implemented the entire Stripe checkout flow
 * (customer lookup, seat count, price selection, session creation) in
 * parallel with `createCheckoutSession` in the server action file. The
 * two copies drifted — neither had VAT/address/currency fixes from #93
 * until both got touched individually — so we've consolidated on the
 * server action and left this route as a call site for any legacy
 * client that still POSTs to `/api/stripe/checkout`. Auth, RBAC, seat
 * count, tax + address collection, and error handling all happen inside
 * the server action now, so the route body is just a delegator.
 */
export async function POST(req: NextRequest) {
  try {
    const { tenantSlug } = (await req.json()) as { tenantSlug?: string }

    if (!tenantSlug) {
      return NextResponse.json({ error: 'Missing tenantSlug' }, { status: 400 })
    }

    const { url } = await createCheckoutSession(tenantSlug)
    return NextResponse.json({ url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (msg === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // Authorization errors from assertAtLeast/requireTenant come through
    // as thrown Errors; surface them as 403 so the client sees the
    // permission problem instead of a generic 500.
    if (msg === 'FORBIDDEN' || msg.includes('OWNER') || msg.includes('owners can manage billing')) {
      return NextResponse.json({ error: msg }, { status: 403 })
    }
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/session'
import { assertNotDemo } from '@/lib/paywall'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    await assertNotDemo()
    const { userId } = await requireUser()
    const { tenantSlug } = await req.json()

    if (!tenantSlug) {
      return NextResponse.json({ error: 'Missing tenantSlug' }, { status: 400 })
    }

    const tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } })
    if (!tenant) return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })

    const membership = await prisma.membership.findUnique({
      where: { tenantId_userId: { tenantId: tenant.id, userId } },
    })
    if (!membership || membership.role !== 'OWNER') {
      return NextResponse.json({ error: 'Only owners can manage billing' }, { status: 403 })
    }

    const billing = await prisma.tenantBilling.findUnique({ where: { tenantId: tenant.id } })
    if (!billing?.stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin

    const session = await stripe.billingPortal.sessions.create({
      customer: billing.stripeCustomerId,
      return_url: `${baseUrl}/t/${tenantSlug}/settings/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error'
    const digest = (err as { digest?: string } | null)?.digest
    if (msg === 'UNAUTHORIZED') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (digest === 'DEMO_READONLY' || msg === 'DEMO_READONLY') {
      return NextResponse.json({ error: 'Demo mode is read-only' }, { status: 403 })
    }
    console.error('Stripe portal error:', err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

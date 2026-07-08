import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'

// Public unauthenticated endpoint — capture intent from the marketing site
// before someone finishes the full registration flow. This is reachable by
// anyone on the internet, so all the safeguards live here. Without them
// the previous implementation accepted unbounded strings, did no email
// validation beyond looking for an `@`, had no rate limiting, and would
// happily let a script flood signupLead with garbage rows.
const LeadSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(200)
    .email('Invalid email'),
  name: z.string().trim().max(120).optional().nullable(),
  company: z.string().trim().max(160).optional().nullable(),
  industry: z.string().trim().max(80).optional().nullable(),
})

export async function POST(request: NextRequest) {
  // Best-effort client IP from CF / common proxy headers. We rate-limit on
  // both IP and email so a single attacker can't quietly cycle through
  // 1000 disposable addresses, and a leaked tracking pixel can't get one
  // legit prospect throttled by hammering them from another origin.
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    // Don't echo Zod errors back — this is a marketing endpoint, the form
    // already does its own client-side validation. Just 400.
    return NextResponse.json({ ok: false, error: 'Invalid lead data' }, { status: 400 })
  }
  const { email, name, company, industry } = parsed.data

  try {
    // 20 lead writes per IP per hour, 5 per email per hour. Generous enough
    // for legit "user changed their mind and resubmitted" cases.
    await rateLimit(`lead:ip:${ip}`, 20, 60 * 60 * 1000)
    await rateLimit(`lead:email:${email}`, 5, 60 * 60 * 1000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 })
    }
    throw e
  }

  try {
    const existing = await prisma.signupLead.findFirst({ where: { email } })
    if (existing) {
      await prisma.signupLead.update({
        where: { id: existing.id },
        data: {
          name: name ?? existing.name,
          company: company ?? existing.company,
          industry: industry ?? existing.industry,
        },
      })
    } else {
      await prisma.signupLead.create({
        data: {
          email,
          name: name ?? null,
          company: company ?? null,
          industry: industry ?? null,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/lead] write failed:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

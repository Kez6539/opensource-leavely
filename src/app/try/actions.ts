'use server'

import { prisma } from '@/lib/db'
import { z } from 'zod'
import * as arctic from 'arctic'
import { appBaseUrl, sendMagicLinkEmail } from '@/lib/email'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { headers } from 'next/headers'
import { uploadGoogleAdsConversion } from '@/lib/google-ads'
import { DEMO_TRIAL_SEQUENCE_PENDING } from '@/lib/demo-trial-sequence'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'

const GCLID_RE = /^[A-Za-z0-9_-]{10,256}$/

const MAGIC_LINK_TTL_MIN = 20
const EmailSchema = z.string().trim().toLowerCase().min(3).max(200).email()

type Result =
  | { ok: true; email: string; newAccount: boolean }
  | { ok: false; error: string }

// "sarah.jones@acme.co.uk" -> { first: "Sarah", last: "Jones" }
function nameFromEmail(email: string): { firstName: string; lastName: string } {
  const local = (email.split('@')[0] || 'there').replace(/\+.*$/, '')
  const parts = local.split(/[._-]+/).filter(Boolean)
  const firstName = (parts[0] || 'There').replace(/^./, (c) => c.toUpperCase())
  const lastName = parts.length > 1 ? parts.slice(1).join(' ').replace(/^./, (c) => c.toUpperCase()) : ''
  return { firstName, lastName: lastName || firstName }
}

export async function startMagicLinkSignup(
  input: {
    email: string
    utmCampaign?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmContent?: string | null
    gclid?: string | null
    source?: string | null
  },
): Promise<Result> {
  const parsed = EmailSchema.safeParse(input.email)
  if (!parsed.success) return { ok: false, error: 'Please enter a valid work email.' }
  const email = parsed.data

  const h = await headers()
  const ip =
    h.get('cf-connecting-ip') ||
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  try {
    await rateLimit(`magic:ip:${ip}`, 10, 60 * 60 * 1000)
    await rateLimit(`magic:email:${email}`, 4, 60 * 60 * 1000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { ok: false, error: 'Too many attempts — please try again in an hour.' }
    }
    throw e
  }

  let user = await prisma.user.findUnique({ where: { email } })
  let newAccount = false

  // Defer the tenant + membership + employee + billing chain to the magic-
  // link redeem in /auth/magic/[token]/route.ts. Creating it here meant
  // every email entered into /try left an orphan workspace even when the
  // user never clicked the link. We still create the User row up front
  // because MagicLink.userId is a non-null FK — but a User with no
  // membership is invisible to every tenant query in the app, so it's a
  // cheap, harmless placeholder until the click happens.
  if (!user) {
    newAccount = true
    const { firstName, lastName } = nameFromEmail(email)
    try {
      user = await prisma.user.create({
        data: {
          email,
          name: `${firstName}${lastName && lastName !== firstName ? ` ${lastName}` : ''}`,
          authProvider: 'CREDENTIALS',
        },
      })
    } catch (e) {
      console.error('[try/magic] user create failed:', e)
      return { ok: false, error: 'Something went wrong — please try again.' }
    }
  }

  // Track the lead for attribution. Stored before the click so we can see
  // the funnel even when the magic link is never used.
  const leadSource = input.source === 'demo' ? DEMO_TRIAL_SEQUENCE_PENDING : 'try'
  await prisma.signupLead
    .create({ data: { email, industry: input.utmCampaign ?? undefined, source: leadSource } })
    .catch((err) => console.error('[try/magic] signup lead insert failed:', err))

  // Keep one outstanding link per user — invalidate older unused tokens so
  // the latest click is the one that authenticates.
  await prisma.magicLink.updateMany({
    where: { userId: user.id, usedAt: null, expiresAt: { gt: new Date() } },
    data: { usedAt: new Date() },
  })

  const token = arctic.generateState() // 256-bit URL-safe random
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_MIN * 60 * 1000)
  await prisma.magicLink.create({ data: { token, userId: user.id, expiresAt } })

  const magicUrl = `${appBaseUrl()}/auth/magic/${token}`
  try {
    await sendMagicLinkEmail(email, magicUrl, newAccount)
  } catch (e) {
    console.error('[try/magic] email send failed:', e)
    return { ok: false, error: "We couldn't send the email — please try again." }
  }

  // Fire-and-forget offline conversion upload. Submitting the magic-link form
  // is the conversion event we want Google Ads to bid on, not the eventual
  // magic-link click (which depends on the user opening their inbox).
  const gclid = typeof input.gclid === 'string' && GCLID_RE.test(input.gclid) ? input.gclid : null
  if (gclid) {
    uploadGoogleAdsConversion(gclid).catch((err) =>
      console.error('[try/magic] gads upload threw:', err),
    )
  }
  fireAndForget(
    trackServerEvent('trial_requested', {
      distinctId: user.id,
      userId: user.id,
      properties: {
        email,
        new_account: newAccount,
        source: input.source ?? 'try',
        method: 'magic_link',
        utm_campaign: input.utmCampaign ?? null,
        utm_source: input.utmSource ?? null,
        utm_medium: input.utmMedium ?? null,
        utm_content: input.utmContent ?? null,
        gclid,
      },
    }),
    'analytics.trial-requested',
  )

  return { ok: true, email, newAccount }
}

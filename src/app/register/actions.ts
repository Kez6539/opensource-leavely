'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { PLAN_KEY, DISCOUNT_CAMPAIGNS, isDiscountCampaign, TRIAL_DAYS } from '@/lib/plans'
import { sendWelcomeEmail } from '@/lib/email'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { uploadGoogleAdsConversion } from '@/lib/google-ads'
import { trackServerEvent } from '@/lib/server-analytics'

const GCLID_RE = /^[A-Za-z0-9_-]{10,256}$/

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

export type RegisterState = {
  error: string
  values?: { name?: string; company?: string; email?: string }
}

export async function registerAction(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const name = (formData.get('name') as string)?.trim()
  const company = (formData.get('company') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const refCode = (formData.get('ref') as string)?.trim() || null
  const utmCampaign = (formData.get('utm_campaign') as string)?.trim() || null
  const utmSource = (formData.get('utm_source') as string)?.trim() || null
  const utmMedium = (formData.get('utm_medium') as string)?.trim() || null
  const utmContent = (formData.get('utm_content') as string)?.trim() || null
  const discountRef = (formData.get('discountRef') as string)?.trim() || null
  const gclidRaw = (formData.get('gclid') as string)?.trim() || null
  const gclid = gclidRaw && GCLID_RE.test(gclidRaw) ? gclidRaw : null

  // Submitted values are echoed back on every error path so the form can
  // re-render with the user's input intact instead of clearing.
  const values = { name, company, email }

  // Determine discount plan
  const hasDiscount = isDiscountCampaign(utmCampaign) && (!!discountRef || utmCampaign === 'startup')
  const planKey = hasDiscount ? DISCOUNT_CAMPAIGNS[utmCampaign] : PLAN_KEY

  if (!name || !company || !email || !password) {
    return { error: 'All fields are required', values }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters', values }
  }

  try {
    await rateLimit('register:' + email, 3, 60_000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { error: 'Too many attempts. Please try again later.', values }
    }
    throw e
  }

  // Check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'An account with this email already exists', values }
  }

  // Look up referral partner (with anti-fraud checks)
  let partnerId: string | null = null
  if (refCode) {
    const partner = await prisma.partner.findUnique({ where: { referralCode: refCode } })
    if (partner && partner.status === 'active') {
      const partnerDomain = partner.email.split('@')[1]
      const signupDomain = email.split('@')[1]
      // Block self-referral: same email or same company domain
      const isSelfReferral = partner.email === email || partnerDomain === signupDomain
      if (!isSelfReferral) {
        partnerId = partner.id
      }
    }
  }

  // Pre-compute slug (the inner unique check stays inside the txn for safety)
  let slug = slugify(company)
  const existingTenant = await prisma.tenant.findUnique({ where: { slug } })
  if (existingTenant) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ') || firstName

  // Sequential queries instead of an interactive $transaction. Prisma
  // interactive transactions blow up on Cloudflare Workers + Neon with
  // P2028 "Transaction not found" because the underlying HTTP/WebSocket
  // connection drops mid-flight (same workaround as leave/actions.ts).
  // To keep signup all-or-nothing we track which rows we've created so
  // far and best-effort delete them if any step fails — Tenant cascades
  // via onDelete: Cascade to Membership / Employee / TenantBilling, so
  // deleting Tenant + User on rollback fully cleans the slate.
  let user: { id: string; email: string; name: string | null }
  let createdUserId: string | null = null
  let createdTenantId: string | null = null
  let createdTenant: { id: string; slug: string; name: string } | null = null
  try {
    const u = await prisma.user.create({
      data: { email, name, passwordHash, authProvider: 'CREDENTIALS' },
    })
    createdUserId = u.id

    const t = await prisma.tenant.create({
      data: {
        name: company,
        slug,
        onboardingStep: 0,
        referredBy: partnerId,
      },
    })
    createdTenantId = t.id
    createdTenant = { id: t.id, slug: t.slug, name: t.name }

    await prisma.membership.create({
      data: { tenantId: t.id, userId: u.id, role: 'OWNER' },
    })
    await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        jobTitle: 'Owner',
        department: 'Management',
        startDate: new Date(),
        tenantId: t.id,
        userId: u.id,
      },
    })
    await prisma.tenantBilling.create({
      data: {
        tenantId: t.id,
        status: 'TRIALING',
        planKey,
        trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000),
      },
    })

    user = { id: u.id, email: u.email, name: u.name }
  } catch (e) {
    if (createdTenantId) {
      await prisma.tenant.delete({ where: { id: createdTenantId } }).catch((cleanupErr) => {
        console.error('[register] tenant cleanup after failed signup:', cleanupErr)
      })
    }
    if (createdUserId) {
      await prisma.user.delete({ where: { id: createdUserId } }).catch((cleanupErr) => {
        console.error('[register] user cleanup after failed signup:', cleanupErr)
      })
    }
    console.error('[register] sequential signup failed:', e)
    let msg = 'Sign-up failed. Please try again.'
    // Surface the actual reason instead of the generic catch-all so users
    // (and we) can see why. Prisma errors carry a code + structured meta.
    if (e && typeof e === 'object' && 'code' in e) {
      const code = (e as { code: string }).code
      const target = (e as { meta?: { target?: string[] | string } }).meta?.target
      const targetStr = Array.isArray(target) ? target.join(', ') : (target ?? '')
      if (code === 'P2002') {
        if (targetStr.includes('email')) msg = 'An account with this email already exists.'
        else if (targetStr.includes('slug')) msg = 'That company name is already taken — try adding your initials or a different name.'
        else msg = `Sign-up failed: duplicate ${targetStr || 'value'}.`
      } else {
        const errMsg = e instanceof Error ? e.message : ''
        msg = `Sign-up failed (${code})${errMsg ? `: ${errMsg}` : ''}`
      }
    } else if (e instanceof Error) {
      msg = `Sign-up failed: ${e.message}`
    }
    return { error: msg, values }
  }

  // Create session. We MUST overwrite isSuperAdmin / impersonatingFrom /
  // isDemo explicitly — the registerAction can be hit by a browser that
  // already has a super-admin or impersonation session (e.g. Keiron
  // signing up a fresh test account in the same browser). Without these
  // explicit resets, the new account inherits the previous session's
  // super-admin flag and sees the See Clients sidebar entry.
  const session = await getSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name ?? undefined
  session.isSuperAdmin = false // newly-created account, schema default
  session.impersonatingFrom = undefined
  session.isDemo = false
  session.loggedInAt = Date.now()
  await session.save()

  // Mark lead as converted + send emails. Wrapped in fireAndForget() so the
  // promises survive the Workers request boundary (waitUntil) instead of
  // being GC'd mid-flight, and so dev still exercises them.
  fireAndForget(
    prisma.signupLead.updateMany({ where: { email }, data: { convertedAt: new Date(), industry: utmCampaign } }),
    'register.signupLead.update',
  )
  if (gclid) {
    fireAndForget(uploadGoogleAdsConversion(gclid), 'register.gads-conversion')
  }
  fireAndForget(sendWelcomeEmail(email, name, slug), 'register.welcome-email')
  if (createdTenant) {
    fireAndForget(
      trackServerEvent('signup', {
        distinctId: user.id,
        tenantId: createdTenant.id,
        userId: user.id,
        properties: {
          method: 'email',
          tenant_slug: createdTenant.slug,
          plan_key: planKey,
          referred: Boolean(partnerId),
          referral_code: refCode,
          referral_source: partnerId ? 'partner' : utmCampaign === 'trial_referral' ? 'trial_referral' : null,
          discount_campaign: utmCampaign,
          utm_campaign: utmCampaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_content: utmContent,
          gclid,
        },
      }),
      'analytics.signup',
    )
    fireAndForget(
      trackServerEvent('org_created', {
        distinctId: user.id,
        tenantId: createdTenant.id,
        userId: user.id,
        properties: {
          tenant_slug: createdTenant.slug,
          org_name: createdTenant.name,
          source: 'register',
          plan_key: planKey,
          utm_campaign: utmCampaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_content: utmContent,
        },
      }),
      'analytics.org-created',
    )
  }
  // Founder's "new signup" notification is now deferred to
  // notifyFounderOfSignupOnce(), which fires on the FIRST of
  // completeOnboarding() or the Stripe checkout-completed webhook.
  // Avoids burning founder attention on accounts that register but never
  // actually do anything.

  redirect(`/t/${slug}/onboarding`)
}

'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PLAN_KEY, TRIAL_DAYS } from '@/lib/plans'
import type { AuthProvider } from '@/generated/prisma/client'
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

export async function completeOAuthRegistration(_prev: { error: string }, formData: FormData) {
  const company = (formData.get('company') as string)?.trim()
  if (!company) {
    return { error: 'Company name is required' }
  }

  const cookieStore = await cookies()
  const pendingRaw = cookieStore.get('pending_oauth')?.value
  if (!pendingRaw) {
    return { error: 'OAuth session expired. Please try signing up again.' }
  }

  let pending: { provider: string; providerId: string; email: string; name: string }
  try {
    pending = JSON.parse(pendingRaw)
  } catch {
    return { error: 'Invalid OAuth data. Please try again.' }
  }

  // Check if email already taken (race condition guard)
  const existing = await prisma.user.findUnique({ where: { email: pending.email } })
  if (existing) {
    cookieStore.delete('pending_oauth')
    return { error: 'An account with this email already exists. Please sign in instead.' }
  }

  // Look up referral partner from cookie (with anti-fraud checks). This is
  // read-only and safe to run before the transaction.
  let partnerId: string | null = null
  const utmCampaign = cookieStore.get('utm_campaign')?.value || null
  const utmSource = cookieStore.get('utm_source')?.value || null
  const utmMedium = cookieStore.get('utm_medium')?.value || null
  const utmContent = cookieStore.get('utm_content')?.value || null
  const gclidRaw = cookieStore.get('gclid')?.value || null
  const gclid = gclidRaw && GCLID_RE.test(gclidRaw) ? gclidRaw : null

  const refCode = cookieStore.get('referral_code')?.value
  if (refCode) {
    const partner = await prisma.partner.findUnique({ where: { referralCode: refCode } })
    if (partner && partner.status === 'active') {
      const partnerDomain = partner.email.split('@')[1]
      const signupDomain = pending.email.split('@')[1]
      const isSelfReferral = partner.email === pending.email || partnerDomain === signupDomain
      if (!isSelfReferral) {
        partnerId = partner.id
      }
    }
    cookieStore.delete('referral_code')
  }

  // Pre-compute the slug. The inner uniqueness check stays in the txn so a
  // concurrent signup can't steal the slug between the pre-check and create.
  let slug = slugify(company)
  const existingTenant = await prisma.tenant.findUnique({ where: { slug } })
  if (existingTenant) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`
  }

  const [firstName, ...rest] = (pending.name || 'User').split(' ')
  const lastName = rest.join(' ') || firstName

  // Wrap the 5 writes (user + tenant + membership + employee + billing) in a
  // single transaction so OAuth signup is all-or-nothing. Previously a mid-way
  // failure (e.g. TenantBilling.create throws) would leave an orphaned user
  // with no tenant, or a tenant without billing, which after the paywall
  // fail-closed change would lock the tenant in read-only mode forever.
  let user: { id: string; email: string; name: string | null }
  let createdTenant: { id: string; slug: string; name: string } | null = null
  try {
    const registration = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: {
          email: pending.email,
          name: pending.name,
          authProvider: pending.provider as AuthProvider,
          providerId: pending.providerId,
        },
      })

      const t = await tx.tenant.create({
        data: {
          name: company,
          slug,
          onboardingStep: 0,
          referredBy: partnerId,
        },
      })

      await tx.membership.create({
        data: { tenantId: t.id, userId: u.id, role: 'OWNER' },
      })

      await tx.employee.create({
        data: {
          firstName,
          lastName,
          email: pending.email,
          jobTitle: 'Owner',
          department: 'Management',
          startDate: new Date(),
          tenantId: t.id,
          userId: u.id,
        },
      })

      await tx.tenantBilling.create({
        data: {
          tenantId: t.id,
          status: 'TRIALING',
          planKey: PLAN_KEY,
          trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000),
        },
      })

      return {
        user: { id: u.id, email: u.email, name: u.name },
        tenant: { id: t.id, slug: t.slug, name: t.name },
      }
    })
    user = registration.user
    createdTenant = registration.tenant
  } catch (e) {
    console.error('[register/complete] transaction failed:', e)
    return { error: 'Sign-up failed. Please try again.' }
  }

  // Create session after the txn commits so an aborted transaction can't
  // leave the user holding a cookie pointing at a non-existent account.
  const session = await getSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name ?? undefined
  session.loggedInAt = Date.now()
  await session.save()

  // Mark lead as converted + send welcome emails. These are best-effort
  // background tasks — we don't want a Resend outage to block the redirect,
  // but on Workers we MUST hand them to waitUntil() or they get cancelled.
  if (utmCampaign) cookieStore.delete('utm_campaign')
  if (utmSource) cookieStore.delete('utm_source')
  if (utmMedium) cookieStore.delete('utm_medium')
  if (utmContent) cookieStore.delete('utm_content')
  if (gclidRaw) cookieStore.delete('gclid')
  fireAndForget(
    prisma.signupLead.updateMany({ where: { email: pending.email }, data: { convertedAt: new Date(), industry: utmCampaign } }),
    'register.signupLead.update',
  )
  if (gclid) {
    fireAndForget(uploadGoogleAdsConversion(gclid), 'register.complete.gads-conversion')
  }
  fireAndForget(
    sendWelcomeEmail(pending.email, pending.name || 'User', slug),
    'register.welcome-email',
  )
  if (createdTenant) {
    const method =
      pending.provider === 'GOOGLE'
        ? 'google'
        : pending.provider === 'LINKEDIN'
          ? 'linkedin'
          : pending.provider === 'MICROSOFT'
            ? 'microsoft'
            : 'oauth'
    fireAndForget(
      trackServerEvent('signup', {
        distinctId: user.id,
        tenantId: createdTenant.id,
        userId: user.id,
        properties: {
          method,
          tenant_slug: createdTenant.slug,
          plan_key: PLAN_KEY,
          referred: Boolean(partnerId),
          referral_code: refCode ?? null,
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
          source: 'oauth_register',
          plan_key: PLAN_KEY,
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

  // Clean up cookie
  cookieStore.delete('pending_oauth')

  redirect(`/t/${slug}/onboarding`)
}

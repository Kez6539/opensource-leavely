'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { PLAN_KEY, TRIAL_DAYS } from '@/lib/plans'
import { getCountryConfig } from '@/lib/countries'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'
import { sendWelcomeEmail } from '@/lib/email'

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48)
}

function nameFromEmail(email: string): { firstName: string; lastName: string } {
  const local = (email.split('@')[0] || 'there').replace(/\+.*$/, '')
  const parts = local.split(/[._-]+/).filter(Boolean)
  const firstName = (parts[0] || 'There').replace(/^./, (c) => c.toUpperCase())
  const lastName = parts.length > 1 ? parts.slice(1).join(' ').replace(/^./, (c) => c.toUpperCase()) : ''
  return { firstName, lastName: lastName || firstName }
}

const SetupSchema = z.object({
  companyName: z.string().trim().min(1, 'Please add your company name').max(80),
  countryCode: z.string().trim().min(2).max(8),
  leaveYearMonth: z.coerce.number().int().min(1).max(12),
})

export type SetupState = {
  error: string
  values?: { companyName?: string; countryCode?: string; leaveYearMonth?: number }
}

export async function createWorkspaceAction(_prev: SetupState, formData: FormData): Promise<SetupState> {
  const session = await getSession()
  if (!session.userId || !session.email) {
    redirect('/login')
  }
  const userId = session.userId
  const email = session.email

  const rawValues = {
    companyName: (formData.get('companyName') as string) ?? '',
    countryCode: (formData.get('countryCode') as string) ?? 'GB',
    leaveYearMonth: Number(formData.get('leaveYearMonth') ?? 4),
  }

  const parsed = SetupSchema.safeParse(rawValues)
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || 'Please check the form and try again.',
      values: rawValues,
    }
  }
  const { companyName, countryCode, leaveYearMonth } = parsed.data

  // Already has a workspace from a previous session? Send them in. Stops a
  // duplicate tenant being created if someone re-submits this form via the
  // back button after we've already provisioned one.
  const existingMembership = await prisma.membership.findFirst({
    where: { userId },
    include: { tenant: { select: { slug: true, onboardedAt: true } } },
  })
  if (existingMembership) {
    const t = existingMembership.tenant
    redirect(t.onboardedAt ? `/t/${t.slug}/dashboard` : `/t/${t.slug}/onboarding`)
  }

  const config = getCountryConfig(countryCode)

  let slug = slugify(companyName) || 'team'
  const taken = await prisma.tenant.findUnique({ where: { slug } })
  if (taken) slug = `${slug}-${Date.now().toString(36).slice(-4)}`

  const { firstName, lastName } = nameFromEmail(email)

  // Mirrors the sequential-create + manual-rollback pattern in
  // register/actions.ts and the old magic-link route — Prisma interactive
  // transactions die with P2028 on Workers + Neon.
  let createdTenantId: string | null = null
  let createdTenant: { id: string; slug: string; name: string } | null = null
  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: companyName,
        slug,
        country: config.code,
        leaveYearStartMonth: leaveYearMonth,
        onboardingStep: 0,
      },
    })
    createdTenantId = tenant.id
    createdTenant = { id: tenant.id, slug: tenant.slug, name: tenant.name }

    await prisma.membership.create({
      data: { tenantId: tenant.id, userId, role: 'OWNER' },
    })

    await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        jobTitle: 'Owner',
        department: 'Management',
        startDate: new Date(),
        tenantId: tenant.id,
        userId,
      },
    })

    await prisma.tenantBilling.create({
      data: {
        tenantId: tenant.id,
        status: 'TRIALING',
        planKey: PLAN_KEY,
        trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000),
      },
    })

    const allHolidays = [...config.holidays2026, ...config.holidays2027]
    if (allHolidays.length > 0) {
      await prisma.publicHoliday.createMany({
        data: allHolidays.map((h) => ({
          name: h.name,
          date: new Date(h.date),
          country: config.code,
          tenantId: tenant.id,
        })),
      })
    }
  } catch (e) {
    console.error('[setup] provisioning failed:', e)
    if (createdTenantId) {
      await prisma.tenant.delete({ where: { id: createdTenantId } }).catch(() => undefined)
    }
    return {
      error: 'Could not set up your workspace — please try again.',
      values: rawValues,
    }
  }

  const signupLead = await prisma.signupLead.findFirst({
    where: { email },
    orderBy: { createdAt: 'desc' },
    select: { source: true, industry: true },
  })

  fireAndForget(
    prisma.signupLead.updateMany({ where: { email }, data: { convertedAt: new Date() } }),
    'setup.signupLead.update',
  )
  fireAndForget(
    sendWelcomeEmail(email, firstName, slug),
    'setup.welcome-email',
  )
  if (createdTenant) {
    fireAndForget(
      trackServerEvent('signup', {
        distinctId: userId,
        tenantId: createdTenant.id,
        userId,
        properties: {
          method: 'magic_link',
          tenant_slug: createdTenant.slug,
          plan_key: PLAN_KEY,
          source: signupLead?.source ?? 'setup',
          utm_campaign: signupLead?.industry ?? null,
        },
      }),
      'analytics.signup',
    )
    fireAndForget(
      trackServerEvent('org_created', {
        distinctId: userId,
        tenantId: createdTenant.id,
        userId,
        properties: {
          tenant_slug: createdTenant.slug,
          org_name: createdTenant.name,
          country: countryCode,
          leave_year_start_month: leaveYearMonth,
          source: signupLead?.source ?? 'setup',
          plan_key: PLAN_KEY,
          utm_campaign: signupLead?.industry ?? null,
        },
      }),
      'analytics.org-created',
    )
  }
  // Founder's "new signup" notification is now deferred to
  // notifyFounderOfSignupOnce(), which fires on the FIRST of
  // completeOnboarding() or the Stripe checkout-completed webhook.

  redirect(`/t/${slug}/onboarding?step=0`)
}

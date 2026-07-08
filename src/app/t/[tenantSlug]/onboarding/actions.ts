'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { assertNotDemo } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'
import { PLAN_KEY, TRIAL_DAYS } from '@/lib/plans'
import { getCountryConfig } from '@/lib/countries'
import { getStripe, syncSeatCount } from '@/lib/stripe'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { notifyFounderOfSignupOnce } from '@/lib/signup-notify'
import { trackServerEvent } from '@/lib/server-analytics'

export async function getOnboardingState(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)
  const u = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { authProvider: true },
  })
  return {
    step: tenant.onboardingStep,
    isOnboarded: !!tenant.onboardedAt,
    tenantName: tenant.name,
    country: tenant.country,
    leaveYearStartMonth: tenant.leaveYearStartMonth,
    authProvider: u?.authProvider ?? 'CREDENTIALS',
  }
}

export async function saveOnboardingStep(tenantSlug: string, step: number) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  // Bound the step to the wizard's actual range. Without this, callers can
  // push the wizard to step=99 (or negative) and render a broken page.
  if (!Number.isInteger(step) || step < 0 || step > 2) {
    return { success: false as const, error: 'Invalid onboarding step' }
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { onboardingStep: step },
  })

  revalidatePath(`/t/${tenantSlug}/onboarding`)
  return { success: true as const }
}

export async function completeOnboarding(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  // Verify core setup actually exists before flipping the tenant to
  // "onboarded". Policies are now part of the secondary setup flow, so the
  // quick-start wizard only gates on the owner employee.
  const employeeCount = await prisma.employee.count({ where: { tenantId: tenant.id, status: 'ACTIVE' } })
  if (employeeCount === 0) {
    return { success: false as const, error: 'Add at least one employee before completing onboarding.' }
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { onboardedAt: new Date(), onboardingStep: 2 },
  })

  await logAudit({
    action: 'tenant.onboarding_completed',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
  })
  const existingMilestone = await prisma.auditLog.findFirst({
    where: { tenantId: tenant.id, action: 'trial_milestone.account_setup' },
    select: { id: true },
  })
  if (!existingMilestone) {
    const occurredAt = new Date()
    await logAudit({
      action: 'trial_milestone.account_setup',
      entity: 'Tenant',
      entityId: tenant.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: {
        milestone: 'account_setup',
        occurredAt: occurredAt.toISOString(),
        source: 'onboarding-complete',
      },
    })
    fireAndForget(
      trackServerEvent('trial_milestone_completed', {
        distinctId: user.userId,
        tenantId: tenant.id,
        userId: user.userId,
        properties: {
          tenant_slug: tenantSlug,
          milestone: 'account_setup',
          occurred_at: occurredAt.toISOString(),
          source: 'onboarding-complete',
        },
      }),
      'analytics.trial-milestone.account-setup',
    )
  }

  // Fire the founder's "new signup" notification now that we've got a
  // real activated tenant. Idempotent flag on Tenant prevents a duplicate
  // if the Stripe checkout webhook races us.
  await notifyFounderOfSignupOnce(tenant.id)

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true as const }
}

export async function selectPlan(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  await prisma.tenantBilling.upsert({
    where: { tenantId: tenant.id },
    update: { planKey: PLAN_KEY },
    create: {
      tenantId: tenant.id,
      status: 'TRIALING',
      planKey: PLAN_KEY,
      trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000),
    },
  })

  return { success: true }
}

export async function createTrialCheckout(
  tenantSlug: string
): Promise<ActionResult<{ url: string }>> {
  return withUserErrors(async () => {
  await assertNotDemo()
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const priceId = process.env.STRIPE_PRICE_ID
  if (!priceId) throw new UserError('Billing is not set up yet — please contact support')

  const stripe = getStripe()

  const employeeCount = await prisma.employee.count({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
  })
  const seatCount = Math.max(employeeCount, 1)

  // Get or create Stripe customer
  const billing = await prisma.tenantBilling.findUnique({ where: { tenantId: tenant.id } })
  let customerId = billing?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: tenant.name,
      metadata: { tenantId: tenant.id, tenantSlug: tenant.slug },
    })
    customerId = customer.id

    await prisma.tenantBilling.upsert({
      where: { tenantId: tenant.id },
      update: { stripeCustomerId: customerId, planKey: PLAN_KEY },
      create: {
        tenantId: tenant.id,
        stripeCustomerId: customerId,
        status: 'TRIALING',
        planKey: PLAN_KEY,
        trialEndsAt: new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000),
      },
    })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || ''

  // Intentionally NOT passing subscription_data.trial_period_days (issue
  // #92). The in-app 14-day trial is the single source of truth — Stripe's
  // trial was stacking a second 14 days on top, so a tenant who subscribed
  // on day 10 got 24 free days instead of 14. VAT + address + currency
  // settings come from shared stripe config below (issue #93).
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
    success_url: `${baseUrl}/t/${tenantSlug}/onboarding?step=2&checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/t/${tenantSlug}/onboarding?step=2`,
    metadata: { tenantId: tenant.id, employeeCount: String(seatCount) },
  })

  if (!session.url) {
    throw new UserError('Stripe did not return a checkout URL — please try again')
  }
  fireAndForget(
    trackServerEvent('payment_attempt', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        tenant_slug: tenant.slug,
        source: 'onboarding',
        plan_key: PLAN_KEY,
        seats: seatCount,
        stripe_checkout_session_id: session.id,
      },
    }),
    'analytics.payment-attempt',
  )
    return { url: session.url }
  })
}

export async function saveLeaveYearStart(tenantSlug: string, month: number) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  if (month < 1 || month > 12) throw new Error('Invalid month')

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { leaveYearStartMonth: month },
  })

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

export async function saveCountryAndLeaveYear(tenantSlug: string, countryCode: string, leaveYearMonth: number) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  if (leaveYearMonth < 1 || leaveYearMonth > 12) throw new Error('Invalid month')

  const config = getCountryConfig(countryCode)

  // Update tenant with country and leave year
  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      country: config.code,
      leaveYearStartMonth: leaveYearMonth,
    },
  })

  // Seed public holidays for this country (clear existing first)
  await prisma.publicHoliday.deleteMany({ where: { tenantId: tenant.id } })

  const allHolidays = [...config.holidays2026, ...config.holidays2027]
  await prisma.publicHoliday.createMany({
    data: allHolidays.map((h) => ({
      name: h.name,
      date: new Date(h.date),
      country: config.code,
      tenantId: tenant.id,
    })),
  })

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

export interface LeaveSetupData {
  allowanceDays: number
  includesBankHolidays: boolean
  paysSickPay: boolean
  christmasShutdown: boolean
  shutdownStart?: string // ISO date
  shutdownEnd?: string   // ISO date
}

export async function saveLeaveSetup(tenantSlug: string, data: LeaveSetupData) {
  await assertNotDemo()
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  // Calculate bookable holiday days using tenant's country config
  const config = getCountryConfig(tenant.country)
  const bookableDays = data.includesBankHolidays
    ? data.allowanceDays - config.publicHolidayCount
    : data.allowanceDays

  if (bookableDays <= 0) {
    return {
      success: false,
      error: `Total allowance (${data.allowanceDays} days) must be greater than the number of bank holidays (${config.publicHolidayCount}) when bank holidays are included in the allowance.`,
    }
  }

  // Create or update Holiday policy
  await prisma.leavePolicy.upsert({
    where: {
      id: `${tenant.id}-holiday`,
    },
    update: {
      defaultAllowance: Math.max(bookableDays, 0),
    },
    create: {
      id: `${tenant.id}-holiday`,
      name: 'Holiday',
      unit: 'days',
      allowHalfDay: true,
      defaultAllowance: Math.max(bookableDays, 0),
      tenantId: tenant.id,
    },
  })

  // Sick leave policy
  if (data.paysSickPay) {
    await prisma.leavePolicy.upsert({
      where: { id: `${tenant.id}-sick` },
      update: {},
      create: {
        id: `${tenant.id}-sick`,
        name: 'Sick Leave',
        unit: 'days',
        allowHalfDay: false,
        defaultAllowance: 10,
        tenantId: tenant.id,
      },
    })
  }

  // Christmas shutdown — keep the row in sync with the toggle. If the
  // toggle is OFF on save, ALWAYS remove any existing Christmas Shutdown
  // CompanyLeave row. The previous code only created/replaced when the
  // toggle was on, so unticking the box left a stale shutdown that
  // continued to block leave requests. (Round 6 #8.)
  if (data.christmasShutdown && data.shutdownStart && data.shutdownEnd) {
    await prisma.companyLeave.deleteMany({
      where: { tenantId: tenant.id, name: 'Christmas Shutdown' },
    })
    await prisma.companyLeave.create({
      data: {
        name: 'Christmas Shutdown',
        startDate: new Date(data.shutdownStart),
        endDate: new Date(data.shutdownEnd),
        tenantId: tenant.id,
      },
    })
  } else {
    // Toggle off — remove any pre-existing shutdown so it doesn't
    // silently survive in the calendar / leave clash checks.
    await prisma.companyLeave.deleteMany({
      where: { tenantId: tenant.id, name: 'Christmas Shutdown' },
    })
  }

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

const InviteRowSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Invalid email'),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).default('EMPLOYEE'),
})
export type InviteRow = z.infer<typeof InviteRowSchema>

export async function inviteEmployeesByEmail(tenantSlug: string, rows: InviteRow[]) {
  await assertNotDemo()
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  if (!Array.isArray(rows) || rows.length === 0) {
    return { success: false as const, error: 'Add at least one person' }
  }

  let invitesCreated = 0
  let employeesCreated = 0
  const skipped: string[] = []

  for (const raw of rows) {
    let parsed: InviteRow
    try {
      parsed = InviteRowSchema.parse(raw)
    } catch {
      skipped.push(raw?.email ?? '(invalid row)')
      continue
    }

    const [firstName, ...rest] = parsed.name.split(' ')
    const lastName = rest.join(' ') || firstName

    // Skip if an employee with this email already exists in the tenant
    const existingEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, email: parsed.email },
      select: { id: true },
    })
    if (existingEmp) {
      skipped.push(parsed.email)
      continue
    }

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email: parsed.email,
        tenantId: tenant.id,
        startDate: new Date(),
      },
    })
    employeesCreated++
    fireAndForget(
      trackServerEvent('employee_added', {
        distinctId: user.userId,
        tenantId: tenant.id,
        userId: user.userId,
        properties: {
          employee_id: employee.id,
          tenant_slug: tenantSlug,
          employee_status: employee.status,
          has_user_account: Boolean(employee.userId),
          has_manager: Boolean(employee.managerId),
          department: employee.department,
          job_title: employee.jobTitle,
          created_by_role: membership.role,
          source: 'onboarding_invite',
        },
      }),
      'analytics.employee-added',
    )

    // Send a magic-link style invite if there isn't already one outstanding
    const existingInvite = await prisma.invite.findFirst({
      where: { tenantId: tenant.id, email: parsed.email, usedAt: null },
      select: { id: true },
    })
    if (!existingInvite) {
      const { randomBytes } = await import('crypto')
      await prisma.invite.create({
        data: {
          email: parsed.email,
          role: parsed.role,
          token: randomBytes(32).toString('hex'),
          tenantId: tenant.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      })
      invitesCreated++
    }
  }

  await logAudit({
    action: 'onboarding.invited_team',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { invitesCreated, employeesCreated, skipped: skipped.length },
  })

  revalidatePath(`/t/${tenantSlug}/onboarding`)
  return { success: true as const, invitesCreated, employeesCreated, skipped }
}

const CsvRowSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
})

export async function importEmployeesCsv(tenantSlug: string, rows: z.infer<typeof CsvRowSchema>[]) {
  await assertNotDemo()
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  // Validate ALL rows before any DB writes — bail out early on bad data so
  // we don't half-import.
  const parsedRows = rows.map((row, idx) => {
    try {
      return { ok: true as const, row: CsvRowSchema.parse(row) }
    } catch (e) {
      return { ok: false as const, idx, error: e instanceof Error ? e.message : 'Invalid row' }
    }
  })
  const invalid = parsedRows.find((p) => !p.ok)
  if (invalid && !invalid.ok) {
    return { success: false as const, error: `Row ${invalid.idx + 1}: ${invalid.error}` }
  }
  const validRows = parsedRows.filter((p): p is { ok: true; row: z.infer<typeof CsvRowSchema> } => p.ok).map((p) => p.row)

  // Wrap inserts in a transaction so a partial failure (DB error mid-batch)
  // rolls back instead of half-importing — admins won't have to manually
  // hunt down which rows actually got created.
  let createdCount = 0
  try {
    await prisma.$transaction(async (tx) => {
      for (const row of validRows) {
        await tx.employee.create({
          data: {
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email || null,
            jobTitle: row.jobTitle || null,
            department: row.department || null,
            tenantId: tenant.id,
          },
        })
        createdCount++
      }
    })
  } catch (e) {
    console.error('[importEmployeesCsv] transaction failed:', e)
    return { success: false as const, error: 'Failed to import employees. No rows were created.' }
  }

  await logAudit({
    action: 'employees.csv_imported',
    entity: 'Employee',
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { count: createdCount },
  })
  if (createdCount > 0) {
    fireAndForget(
      trackServerEvent('employee_added', {
        distinctId: user.userId,
        tenantId: tenant.id,
        userId: user.userId,
        properties: {
          tenant_slug: tenantSlug,
          created_by_role: membership.role,
          source: 'onboarding_csv_import',
          imported_count: createdCount,
        },
      }),
      'analytics.employee-added',
    )
  }

  revalidatePath(`/t/${tenantSlug}/employees`)

  // Sync seat count to Stripe (fire-and-forget)
  fireAndForget(syncSeatCount(tenant.id), 'onboarding.seat-sync')

  return { success: true as const, count: createdCount }
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { requireWriteAccess } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'
import { ensureStandardHolidaysForLeaveYear } from '@/lib/holidays'
import { getCountryConfig } from '@/lib/countries'

export async function getGeneralSettings(tenantSlug: string) {
  // Audit follow-up: tenant config (privacy toggles, leave year, etc.)
  // is admin-only — match the gate on every mutation in this file.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  // Find the primary annual-leave policy so the bank-holiday toggle can show
  // a numeric example using the tenant's actual allowance instead of 28.
  const annualPolicy = await prisma.leavePolicy.findFirst({
    where: {
      tenantId: tenant.id,
      OR: [
        { name: { contains: 'annual', mode: 'insensitive' } },
        { name: { contains: 'holiday', mode: 'insensitive' } },
      ],
    },
    select: { defaultAllowance: true, unit: true },
    orderBy: { createdAt: 'asc' },
  })

  // Count public holidays for the current leave year for the example.
  // First self-heal any tenant whose holiday table is missing standard dates for
  // the current/next leave year (e.g. tenants onboarded before newer years existed).
  const now = new Date()
  const startMonth = tenant.leaveYearStartMonth ?? 1
  await ensureStandardHolidaysForLeaveYear(tenant.id, tenant.country, startMonth, now)

  const yearStart =
    now.getMonth() + 1 >= startMonth
      ? new Date(now.getFullYear(), startMonth - 1, 1)
      : new Date(now.getFullYear() - 1, startMonth - 1, 1)
  const yearEnd = new Date(yearStart.getFullYear() + 1, yearStart.getMonth(), 0)
  const bankHolidayCount = await prisma.publicHoliday.count({
    where: { tenantId: tenant.id, date: { gte: yearStart, lte: yearEnd } },
  })

  const countryConfig = getCountryConfig(tenant.country)

  // requireTenant() no longer returns the ~80KB base64 logo, so fetch it
  // explicitly for the settings form preview.
  const logoRow = await prisma.tenant.findUnique({
    where: { id: tenant.id },
    select: { logoDataUri: true },
  })

  return {
    leaveYearStartMonth: tenant.leaveYearStartMonth,
    clockInEnabled: tenant.clockInEnabled,
    deductBankHolidays: tenant.deductBankHolidays,
    hideEmployeeEmails: tenant.hideEmployeeEmails,
    hideEmployeeList: tenant.hideEmployeeList,
    preventLeaveCancellation: tenant.preventLeaveCancellation,
    showWorkingStatus: tenant.showWorkingStatus,
    primaryAllowance: annualPolicy?.defaultAllowance ?? null,
    primaryAllowanceUnit: annualPolicy?.unit ?? 'days',
    bankHolidayCount,
    statutoryMinimumDays: countryConfig.statutoryMinimumDays,
    publicHolidayTerm: countryConfig.publicHolidayTerm,
    countryCode: countryConfig.code,
    logoDataUri: logoRow?.logoDataUri ?? null,
  }
}

const ALLOWED_LOGO_MIME = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
const MAX_LOGO_BYTES = 80 * 1024 // 80KB encoded — keeps Tenant rows lean

export async function updateTenantLogo(tenantSlug: string, dataUri: string | null) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  if (dataUri !== null) {
    // Validate the data URI shape + mime + size before persisting. Without
    // this an admin (or anyone abusing the action) could store a 5MB blob
    // that ships in every layout render.
    const match = /^data:([^;,]+);base64,(.+)$/.exec(dataUri)
    if (!match) throw new Error('Invalid image data')
    const mime = match[1].toLowerCase()
    if (!ALLOWED_LOGO_MIME.includes(mime)) {
      throw new Error('Use a PNG, JPG, SVG, or WebP image')
    }
    // base64 length × 0.75 ≈ raw byte count
    const approxBytes = Math.ceil((match[2].length * 3) / 4)
    if (approxBytes > MAX_LOGO_BYTES) {
      throw new Error('Logo must be under 60KB. Try a smaller image or compress it.')
    }
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { logoDataUri: dataUri },
  })

  await logAudit({
    action: dataUri ? 'tenant.logo_updated' : 'tenant.logo_removed',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}`, 'layout')
  return { success: true }
}

export async function toggleClockIn(tenantSlug: string, enabled: boolean) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { clockInEnabled: enabled },
  })

  await logAudit({
    action: enabled ? 'tenant.clock_in_enabled' : 'tenant.clock_in_disabled',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { clockInEnabled: enabled },
  })

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

// Allowlist of tenant boolean columns this generic toggle endpoint is
// allowed to flip. The TypeScript union below already constrains the
// key at compile time, but TypeScript types are NOT enforced at the
// Server Action wire — runtime values pass straight through to the
// Prisma update. Without this allowlist an admin (or anyone with an
// admin session) could call togglePrivacySetting with ANY boolean
// column on Tenant — `clockInEnabled`, `notifyProbationEnding`,
// `clockInRequireLocation`, etc — bypassing the dedicated toggle
// helpers and their audit logs. (Round 6 #15.)
const ALLOWED_PRIVACY_KEYS = [
  'hideEmployeeEmails',
  'hideEmployeeList',
  'preventLeaveCancellation',
  'showWorkingStatus',
  'deductBankHolidays',
] as const
type PrivacyKey = (typeof ALLOWED_PRIVACY_KEYS)[number]

export async function togglePrivacySetting(
  tenantSlug: string,
  key: PrivacyKey,
  value: boolean
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  // Runtime allowlist enforcement — see comment above.
  if (!ALLOWED_PRIVACY_KEYS.includes(key as PrivacyKey)) {
    throw new Error('Invalid privacy setting key')
  }
  if (typeof value !== 'boolean') {
    throw new Error('Privacy setting value must be a boolean')
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { [key]: value },
  })

  await logAudit({
    action: `tenant.${key}_updated`,
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { [key]: value },
  })

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

export async function updateLeaveYearStartMonth(tenantSlug: string, month: number) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  if (month < 1 || month > 12) throw new Error('Invalid month')

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { leaveYearStartMonth: month },
  })

  await logAudit({
    action: 'tenant.leave_year_start_month_updated',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { leaveYearStartMonth: month },
  })

  revalidatePath(`/t/${tenantSlug}`)
  return { success: true }
}

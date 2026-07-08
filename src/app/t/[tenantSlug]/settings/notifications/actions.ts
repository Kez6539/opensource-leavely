'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { requireWriteAccess } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'

export async function getEmailPreferences(tenantSlug: string) {
  const { user } = await requireTenant(tenantSlug)
  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { emailPreferences: true },
  })
  return (dbUser?.emailPreferences ?? {}) as Record<string, boolean>
}

export async function updateEmailPreferences(
  tenantSlug: string,
  preferences: Record<string, boolean>
) {
  const { user } = await requireTenant(tenantSlug)
  await prisma.user.update({
    where: { id: user.userId },
    data: { emailPreferences: preferences },
  })
  revalidatePath(`/t/${tenantSlug}/settings/notifications`)
  return { success: true }
}

// ── Tenant-level notification settings ──

export interface TenantNotificationSettings {
  notifyProbationEnding: boolean
  notifyProbationDays: number
  notifyWorkAnniversaries: boolean
  notifyBirthdays: boolean
  notifyDocumentExpiry: boolean
  notifyDocumentExpiryDays: number
}

export async function getTenantNotificationSettings(
  tenantSlug: string
): Promise<TenantNotificationSettings> {
  const { tenant } = await requireTenant(tenantSlug)
  return {
    notifyProbationEnding: tenant.notifyProbationEnding,
    notifyProbationDays: tenant.notifyProbationDays,
    notifyWorkAnniversaries: tenant.notifyWorkAnniversaries,
    notifyBirthdays: tenant.notifyBirthdays,
    notifyDocumentExpiry: tenant.notifyDocumentExpiry,
    notifyDocumentExpiryDays: tenant.notifyDocumentExpiryDays,
  }
}

export async function updateTenantNotificationSettings(
  tenantSlug: string,
  settings: Partial<TenantNotificationSettings>
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  // Validate the day-count fields. Without these guards an admin (or
  // any direct Server Action call as admin) could write a negative or
  // absurdly large value (e.g. 99999), which would either silently
  // disable the notification entirely or generate a flood of pre-
  // expiry warnings. 0–365 days is sensible for both probation and
  // document expiry. (Round 6.5 follow-up.)
  if (settings.notifyProbationDays !== undefined) {
    if (
      typeof settings.notifyProbationDays !== 'number' ||
      !Number.isInteger(settings.notifyProbationDays) ||
      settings.notifyProbationDays < 0 ||
      settings.notifyProbationDays > 365
    ) {
      throw new Error('notifyProbationDays must be an integer between 0 and 365')
    }
  }
  if (settings.notifyDocumentExpiryDays !== undefined) {
    if (
      typeof settings.notifyDocumentExpiryDays !== 'number' ||
      !Number.isInteger(settings.notifyDocumentExpiryDays) ||
      settings.notifyDocumentExpiryDays < 0 ||
      settings.notifyDocumentExpiryDays > 365
    ) {
      throw new Error('notifyDocumentExpiryDays must be an integer between 0 and 365')
    }
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      ...(settings.notifyProbationEnding !== undefined && {
        notifyProbationEnding: settings.notifyProbationEnding,
      }),
      ...(settings.notifyProbationDays !== undefined && {
        notifyProbationDays: settings.notifyProbationDays,
      }),
      ...(settings.notifyWorkAnniversaries !== undefined && {
        notifyWorkAnniversaries: settings.notifyWorkAnniversaries,
      }),
      ...(settings.notifyBirthdays !== undefined && {
        notifyBirthdays: settings.notifyBirthdays,
      }),
      ...(settings.notifyDocumentExpiry !== undefined && {
        notifyDocumentExpiry: settings.notifyDocumentExpiry,
      }),
      ...(settings.notifyDocumentExpiryDays !== undefined && {
        notifyDocumentExpiryDays: settings.notifyDocumentExpiryDays,
      }),
    },
  })

  await logAudit({
    action: 'tenant.notification_settings_updated',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: settings as Record<string, unknown>,
  })

  revalidatePath(`/t/${tenantSlug}/settings/notifications`)
  return { success: true }
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertNotDemo } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'

// NOTE: `createNotification` used to live here. Every function exported
// from a `'use server'` module becomes a public Server Action callable
// from the client, so the previous shape let any authenticated browser
// inject phishing-style notifications onto any user in any tenant by
// posting `createNotification(targetTenantId, anyUserId, ...)` directly.
// It now lives in `./internal.ts` (a regular .ts module, NOT a 'use
// server' module), so it's callable from server-side imports only.
// Server-side callers (leave/actions.ts approve/reject/cancel/extend
// notifications, announcements/actions.ts publish-time fan-out) all
// import directly from `./internal`. (Round 5 follow-up.)

export async function getNotifications(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)
  return prisma.notification.findMany({
    where: { tenantId: tenant.id, userId: user.userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

export async function getAllNotifications(tenantSlug: string, filter?: 'all' | 'unread') {
  const { tenant, user } = await requireTenant(tenantSlug)
  const where: { tenantId: string; userId: string; read?: boolean } = {
    tenantId: tenant.id,
    userId: user.userId,
  }
  if (filter === 'unread') where.read = false
  return prisma.notification.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
}

export async function getUnreadCount(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)
  return prisma.notification.count({
    where: { tenantId: tenant.id, userId: user.userId, read: false },
  })
}

export async function markAllRead(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, user } = await requireTenant(tenantSlug)
  await prisma.notification.updateMany({
    where: { tenantId: tenant.id, userId: user.userId, read: false },
    data: { read: true },
  })
  revalidatePath(`/t/${tenantSlug}/notifications`)
  return { success: true }
}

export async function markRead(tenantSlug: string, notificationId: string) {
  await assertNotDemo()
  const { tenant, user } = await requireTenant(tenantSlug)
  await prisma.notification.updateMany({
    where: { id: notificationId, tenantId: tenant.id, userId: user.userId },
    data: { read: true },
  })
  revalidatePath(`/t/${tenantSlug}/notifications`)
  return { success: true }
}

export async function deleteNotification(tenantSlug: string, notificationId: string) {
  await assertNotDemo()
  const { tenant, user } = await requireTenant(tenantSlug)
  const result = await prisma.notification.deleteMany({
    where: { id: notificationId, tenantId: tenant.id, userId: user.userId },
  })
  if (result.count > 0) {
    // (#203) Tenant support couldn't see who dismissed which notification.
    await logAudit({
      action: 'notification.dismissed',
      entity: 'Notification',
      entityId: notificationId,
      userId: user.userId,
      tenantId: tenant.id,
    })
  }
  revalidatePath(`/t/${tenantSlug}/notifications`)
  return { success: true }
}

export async function clearAllNotifications(tenantSlug: string) {
  await assertNotDemo()
  const { tenant, user } = await requireTenant(tenantSlug)
  const result = await prisma.notification.deleteMany({
    where: { tenantId: tenant.id, userId: user.userId },
  })
  if (result.count > 0) {
    // (#203) Audit clear-all so we can answer "where did my notifications go?"
    await logAudit({
      action: 'notification.cleared_all',
      entity: 'Notification',
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { deletedCount: result.count },
    })
  }
  revalidatePath(`/t/${tenantSlug}/notifications`)
  return { success: true }
}

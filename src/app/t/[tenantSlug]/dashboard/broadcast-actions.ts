'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { requireWriteAccess } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'

export async function sendBroadcastAlert(
  tenantSlug: string,
  message: string
): Promise<{ success: true; count: number }> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const trimmed = message.trim()
  if (!trimmed) {
    throw new Error('Message cannot be empty')
  }
  if (trimmed.length > 500) {
    throw new Error('Message must be 500 characters or fewer')
  }

  // Get sender name
  const sender = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { name: true, email: true },
  })
  const senderName = sender?.name || sender?.email || 'A manager'

  // Get all memberships for this tenant (all users)
  const memberships = await prisma.membership.findMany({
    where: { tenantId: tenant.id },
    select: { userId: true },
  })

  if (memberships.length === 0) {
    return { success: true, count: 0 }
  }

  // Create a Notification for every user in the tenant
  await prisma.notification.createMany({
    data: memberships.map((m) => ({
      userId: m.userId,
      tenantId: tenant.id,
      type: 'broadcast_alert',
      title: `Alert from ${senderName}`,
      message: trimmed,
    })),
  })

  // Audit trail
  await logAudit({
    action: 'broadcast_alert.sent',
    entity: 'Notification',
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      recipientCount: memberships.length,
      messagePreview: trimmed.slice(0, 100),
    },
  })

  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/notifications`)

  return { success: true, count: memberships.length }
}

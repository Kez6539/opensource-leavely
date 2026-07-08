'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertNotDemo } from '@/lib/paywall'
import { z } from 'zod'

const SubscriptionSchema = z.object({
  endpoint: z.string().url(),
  p256dh: z.string().min(1),
  auth: z.string().min(1),
})

export async function subscribeToPush(
  tenantSlug: string,
  subscription: { endpoint: string; p256dh: string; auth: string }
) {
  await assertNotDemo()
  const { tenant, user } = await requireTenant(tenantSlug)
  const parsed = SubscriptionSchema.parse(subscription)

  await prisma.pushSubscription.upsert({
    where: {
      userId_endpoint: {
        userId: user.userId,
        endpoint: parsed.endpoint,
      },
    },
    create: {
      userId: user.userId,
      endpoint: parsed.endpoint,
      p256dh: parsed.p256dh,
      auth: parsed.auth,
      tenantId: tenant.id,
    },
    update: {
      p256dh: parsed.p256dh,
      auth: parsed.auth,
      tenantId: tenant.id,
    },
  })

  return { success: true }
}

export async function unsubscribeFromPush(tenantSlug: string, endpoint: string) {
  await assertNotDemo()
  const { user } = await requireTenant(tenantSlug)

  await prisma.pushSubscription.deleteMany({
    where: {
      userId: user.userId,
      endpoint,
    },
  })

  return { success: true }
}

export async function getPushSubscriptionStatus(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)

  const count = await prisma.pushSubscription.count({
    where: {
      userId: user.userId,
      tenantId: tenant.id,
    },
  })

  return { subscribed: count > 0 }
}

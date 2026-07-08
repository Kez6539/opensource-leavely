'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { randomBytes } from 'crypto'

/**
 * Generate a strong, URL-safe calendar token.
 *
 * Why this exists: the Prisma schema defaults `CalendarToken.token` to
 * `cuid()`, which is an *identifier* generator (monotonic, partly derived
 * from time + a counter). It is not a secret-token generator and is
 * guessable enough that an adversary who learns one tenant's calendar URL
 * can plausibly enumerate adjacent ones. The calendar feed is the only
 * thing protecting that URL — there's no session check — so it has to be
 * a real secret. (Codex round 4 #14.)
 *
 * 32 random bytes = 256 bits, base64url-encoded for URL friendliness.
 */
function newCalendarToken(): string {
  return randomBytes(32).toString('base64url')
}

export async function getCalendarTokens(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const tokens = await prisma.calendarToken.findMany({
    where: { userId: user.userId, tenantId: tenant.id },
  })

  const canManage = isAtLeast(membership, 'MANAGER')

  return {
    personalToken: tokens.find((t) => t.scope === 'personal') || null,
    teamToken: canManage ? tokens.find((t) => t.scope === 'team') || null : null,
    canManage,
    isTrialing: (await prisma.tenantBilling.findUnique({
      where: { tenantId: tenant.id },
      select: { status: true },
    }))?.status === 'TRIALING',
  }
}

export async function getOrCreateCalendarToken(
  tenantSlug: string,
  scope: 'personal' | 'team'
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  // Team tokens require MANAGER+
  if (scope === 'team' && !isAtLeast(membership, 'MANAGER')) {
    throw new Error('Only managers can create team calendar feeds')
  }

  // Check for existing token
  const existing = await prisma.calendarToken.findFirst({
    where: { userId: user.userId, tenantId: tenant.id, scope },
  })
  if (existing) return existing

  const token = await prisma.calendarToken.create({
    data: {
      token: newCalendarToken(),
      userId: user.userId,
      tenantId: tenant.id,
      scope,
    },
  })

  await logAudit({
    action: 'calendar_token.created',
    entity: 'CalendarToken',
    entityId: token.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { scope },
  })

  revalidatePath(`/t/${tenantSlug}/settings/calendar-sync`)
  return token
}

export async function regenerateCalendarToken(
  tenantSlug: string,
  scope: 'personal' | 'team'
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  if (scope === 'team' && !isAtLeast(membership, 'MANAGER')) {
    throw new Error('Only managers can regenerate team calendar feeds')
  }

  // Delete existing token
  const existing = await prisma.calendarToken.findFirst({
    where: { userId: user.userId, tenantId: tenant.id, scope },
  })
  if (existing) {
    await prisma.calendarToken.delete({ where: { id: existing.id } })
  }

  // Create new token
  const token = await prisma.calendarToken.create({
    data: {
      token: newCalendarToken(),
      userId: user.userId,
      tenantId: tenant.id,
      scope,
    },
  })

  await logAudit({
    action: 'calendar_token.regenerated',
    entity: 'CalendarToken',
    entityId: token.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { scope },
  })

  revalidatePath(`/t/${tenantSlug}/settings/calendar-sync`)
  return token
}

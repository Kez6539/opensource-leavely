'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { requireWriteAccess } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getLocations(tenantSlug: string) {
  // Audit follow-up: ADMIN+ only — admin location management page,
  // not the same as the clock-ins location getter (which is open to
  // all roles for the clock-in flow).
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const locations = await prisma.location.findMany({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { clockEntries: true } },
    },
  })

  return locations.map((l) => ({
    id: l.id,
    name: l.name,
    address: l.address,
    latitude: l.latitude ? Number(l.latitude) : null,
    longitude: l.longitude ? Number(l.longitude) : null,
    qrToken: l.qrToken,
    isActive: l.isActive,
    createdAt: l.createdAt.toISOString(),
    clockEntryCount: l._count.clockEntries,
  }))
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function createLocation(
  tenantSlug: string,
  data: { name: string; address?: string; latitude?: number; longitude?: number }
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  if (!data.name || data.name.trim().length === 0) {
    throw new UserError('Location name is required')
  }

  // Generate a strong, URL-safe qrToken explicitly. The schema default
  // is `cuid()` which is an *identifier* generator (monotonic + time +
  // counter), not a secret-token generator. Anyone who can guess a
  // valid cuid for an active tenant + tenant member could land on
  // /clock/${token}, which is the same anti-pattern Codex flagged for
  // CalendarToken in round 4. Crypto-random 32 bytes = 256 bits.
  // (Round 6 follow-up.)
  const { randomBytes } = await import('crypto')
  const qrToken = randomBytes(32).toString('base64url')

  const location = await prisma.location.create({
    data: {
      tenantId: tenant.id,
      name: data.name.trim(),
      address: data.address?.trim() || null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      qrToken,
    },
  })

  await logAudit({
    action: 'location.created',
    entity: 'Location',
    entityId: location.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: location.name, address: location.address },
  })

  revalidatePath(`/t/${tenantSlug}/settings/locations`)
    return { id: location.id }
  })
}

export async function toggleLocationActive(
  tenantSlug: string,
  locationId: string,
  isActive: boolean
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const location = await prisma.location.findFirst({
    where: { id: locationId, tenantId: tenant.id },
  })

  if (!location) throw new UserError('Location not found')

  await prisma.location.update({
    where: { id: locationId },
    data: { isActive },
  })

  await logAudit({
    action: isActive ? 'location.reactivated' : 'location.deactivated',
    entity: 'Location',
    entityId: locationId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: location.name, isActive },
  })

  revalidatePath(`/t/${tenantSlug}/settings/locations`)
  })
}

export async function deleteLocation(
  tenantSlug: string,
  locationId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const location = await prisma.location.findFirst({
    where: { id: locationId, tenantId: tenant.id },
  })

  if (!location) throw new UserError('Location not found')

  // Check if there are clock entries using this location
  const entryCount = await prisma.clockEntry.count({
    where: { locationId },
  })

  if (entryCount > 0) {
    throw new UserError(
      `Cannot delete this location because it has ${entryCount} clock entries. Deactivate it instead.`
    )
  }

  await prisma.location.delete({ where: { id: locationId } })

  await logAudit({
    action: 'location.deleted',
    entity: 'Location',
    entityId: locationId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: location.name },
  })

  revalidatePath(`/t/${tenantSlug}/settings/locations`)
  })
}

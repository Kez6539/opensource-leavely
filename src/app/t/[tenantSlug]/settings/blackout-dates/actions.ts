'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function getBlackoutDates(tenantSlug: string) {
  // Audit follow-up: ADMIN+ only.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.blackoutDate.findMany({
    where: { tenantId: tenant.id },
    orderBy: { startDate: 'asc' },
  })
}

// (#190, #193) Trim before length-checking so whitespace-only names get
// rejected at the schema level. Also enforce endDate >= startDate so the
// server matches the client guard.
const BlackoutDateSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(120),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
  })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  })

export type BlackoutDateFormData = z.infer<typeof BlackoutDateSchema>

export async function createBlackoutDate(
  tenantSlug: string,
  data: BlackoutDateFormData
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const parsed = BlackoutDateSchema.parse(data)

  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)
  if (endDate < startDate) throw new UserError('End date cannot be before start date')

  const blackout = await prisma.blackoutDate.create({
    data: {
      name: parsed.name,
      startDate,
      endDate,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'blackout_date.created',
    entity: 'BlackoutDate',
    entityId: blackout.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: parsed.name, startDate: parsed.startDate, endDate: parsed.endDate },
  })

  revalidatePath(`/t/${tenantSlug}/settings/blackout-dates`)
  })
}

export async function deleteBlackoutDate(
  tenantSlug: string,
  blackoutId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const blackout = await prisma.blackoutDate.findFirst({
    where: { id: blackoutId, tenantId: tenant.id },
  })
  if (!blackout) throw new UserError('Blackout date not found')

  await prisma.blackoutDate.delete({ where: { id: blackoutId } })

  await logAudit({
    action: 'blackout_date.deleted',
    entity: 'BlackoutDate',
    entityId: blackoutId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: blackout.name },
  })

  revalidatePath(`/t/${tenantSlug}/settings/blackout-dates`)
  })
}

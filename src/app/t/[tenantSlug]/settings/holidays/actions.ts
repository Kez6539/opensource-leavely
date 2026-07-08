'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function getPublicHolidays(tenantSlug: string) {
  // Audit follow-up: holidays are visible via the leave calendar to
  // anyone, but the raw settings list is admin-managed. Gate the
  // direct getter so a non-admin can't enumerate the list via a
  // server-action call.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.publicHoliday.findMany({
    where: { tenantId: tenant.id },
    orderBy: { date: 'asc' },
  })
}

const HolidaySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date: z.string().min(1, 'Date is required'),
  country: z.string().min(1).default('GB'),
})

export type HolidayFormData = z.infer<typeof HolidaySchema>

export async function createPublicHoliday(
  tenantSlug: string,
  data: HolidayFormData
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const parsed = HolidaySchema.parse(data)

    const holiday = await prisma.publicHoliday.create({
      data: {
        name: parsed.name,
        date: new Date(parsed.date),
        country: parsed.country,
        tenantId: tenant.id,
      },
    })

    await logAudit({
      action: 'public_holiday.created',
      entity: 'PublicHoliday',
      entityId: holiday.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { name: parsed.name, date: parsed.date },
    })

    revalidatePath(`/t/${tenantSlug}/settings/holidays`)
  })
}

export async function deletePublicHoliday(
  tenantSlug: string,
  holidayId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const holiday = await prisma.publicHoliday.findFirst({
      where: { id: holidayId, tenantId: tenant.id },
    })
    if (!holiday) throw new UserError('Holiday not found')

    await prisma.publicHoliday.delete({ where: { id: holidayId } })

    await logAudit({
      action: 'public_holiday.deleted',
      entity: 'PublicHoliday',
      entityId: holidayId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { name: holiday.name },
    })

    revalidatePath(`/t/${tenantSlug}/settings/holidays`)
  })
}

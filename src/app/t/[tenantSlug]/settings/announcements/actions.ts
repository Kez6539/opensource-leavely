'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function getAnnouncements(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)
  return prisma.announcement.findMany({
    where: { tenantId: tenant.id },
    orderBy: { createdAt: 'desc' },
  })
}

// (#187) Trim before length-checking so a whitespace-only title is
// rejected, and cap content at 5000 characters so a giant HTML paste
// can't reach the DB unbounded. Title cap of 200 keeps it dashboard-safe.
const AnnouncementSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(200),
    content: z.string().trim().min(1, 'Content is required').max(5000),
    publishedAt: z.string().optional(),
    expiresAt: z.string().optional(),
  })
  // Reject instantly-expired or backwards announcements. Without this
  // an admin could save an announcement with expiresAt < publishedAt and
  // it would vanish from the dashboard immediately. (Codex round 6 #11.)
  .refine(
    (d) => {
      if (!d.publishedAt || !d.expiresAt) return true
      return new Date(d.expiresAt) > new Date(d.publishedAt)
    },
    { message: 'Expiry must be after the publish date', path: ['expiresAt'] },
  )

// Distinct schema for updates so we can tell "field absent" (preserve existing)
// apart from "field explicitly null" (clear it). On update a blank string
// preserves the existing publishedAt/expiresAt rather than silently nulling
// it, which previously caused an edit to hide the announcement.
const UpdateAnnouncementSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(200),
    content: z.string().trim().min(1, 'Content is required').max(5000),
    publishedAt: z.string().nullable().optional(),
    expiresAt: z.string().nullable().optional(),
  })
  .refine(
    (d) => {
      if (!d.publishedAt || !d.expiresAt) return true
      return new Date(d.expiresAt) > new Date(d.publishedAt)
    },
    { message: 'Expiry must be after the publish date', path: ['expiresAt'] },
  )

export type AnnouncementFormData = z.infer<typeof AnnouncementSchema>
export type UpdateAnnouncementFormData = z.infer<typeof UpdateAnnouncementSchema>

// (#201) All three actions wrapped in withUserErrors so a Zod or Prisma
// failure surfaces as a friendly toast instead of a stack trace. Pre-fix,
// the announcement save error spammed the user with a 500 message.
export async function createAnnouncement(
  tenantSlug: string,
  data: AnnouncementFormData,
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)
    const parsed = AnnouncementSchema.parse(data)

    const announcement = await prisma.announcement.create({
      data: {
        title: parsed.title,
        content: parsed.content,
        publishedAt: parsed.publishedAt ? new Date(parsed.publishedAt) : new Date(),
        expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : null,
        authorId: user.userId,
        tenantId: tenant.id,
      },
    })

    await logAudit({
      action: 'announcement.created',
      entity: 'Announcement',
      entityId: announcement.id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/settings/announcements`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)

    // Only fan out notifications when the announcement is ACTUALLY
    // visible right now. The previous code notified the whole company
    // immediately even when publishedAt was set in the future, which
    // pinged everyone before the announcement appeared on their
    // dashboard. A future-scheduled announcement will be picked up by
    // a follow-up scheduled cron when its publishedAt arrives (TBD).
    // (Codex round 6 #12.)
    const isPublishedNow =
      !announcement.publishedAt || announcement.publishedAt <= new Date()
    if (isPublishedNow) {
      prisma.membership
        .findMany({
          where: { tenantId: tenant.id, userId: { not: user.userId } },
          select: { userId: true },
        })
        .then(async (members) => {
          const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
          for (const m of members) {
            createNotification(
              tenant.id, m.userId, 'announcement',
              parsed.title,
              parsed.content.slice(0, 100),
              `/t/${tenantSlug}/dashboard`
            ).catch(() => {})
          }
        })
        .catch(() => {})
    }

    return { id: announcement.id }
  })
}

export async function updateAnnouncement(
  tenantSlug: string,
  id: string,
  data: UpdateAnnouncementFormData,
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)
    const parsed = UpdateAnnouncementSchema.parse(data)

    const existing = await prisma.announcement.findFirst({
      where: { id, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Announcement not found')

    // Only write publishedAt if it was explicitly present in the payload.
    // `undefined` = "preserve existing", `null` = "explicitly clear".
    // Previously a form submit with a blank publish date would null out
    // publishedAt and silently hide the announcement.
    const updateData: {
      title: string
      content: string
      publishedAt?: Date | null
      expiresAt?: Date | null
    } = {
      title: parsed.title,
      content: parsed.content,
    }
    if (parsed.publishedAt !== undefined) {
      updateData.publishedAt = parsed.publishedAt ? new Date(parsed.publishedAt) : null
    }
    if (parsed.expiresAt !== undefined) {
      updateData.expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : null
    }

    await prisma.announcement.update({
      where: { id },
      data: updateData,
    })

    await logAudit({
      action: 'announcement.updated',
      entity: 'Announcement',
      entityId: id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/settings/announcements`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
  })
}

export async function deleteAnnouncement(
  tenantSlug: string,
  id: string,
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const existing = await prisma.announcement.findFirst({
      where: { id, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Announcement not found')

    await prisma.announcement.delete({ where: { id } })

    await logAudit({
      action: 'announcement.deleted',
      entity: 'Announcement',
      entityId: id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/settings/announcements`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
  })
}

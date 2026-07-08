'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { randomBytes } from 'crypto'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { sendInviteEmail, appBaseUrl } from '@/lib/email'

export async function getMembers(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  const memberships = await prisma.membership.findMany({
    where: { tenantId: tenant.id },
    include: { user: { select: { id: true, email: true, name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  // Resolve each member's Employee row, then look up active outgoing
  // delegations (manager → delegate). Done as one batched query rather
  // than N queries so the Users page isn't N+1.
  const userIds = memberships.map((m) => m.user.id)
  const employees = await prisma.employee.findMany({
    where: { tenantId: tenant.id, userId: { in: userIds } },
    select: { id: true, userId: true, firstName: true, lastName: true },
  })
  const empByUserId = new Map(employees.map((e) => [e.userId, e]))
  const empIds = employees.map((e) => e.id)

  const now = new Date()
  const activeDelegations = empIds.length
    ? await prisma.approvalDelegate.findMany({
        where: {
          tenantId: tenant.id,
          managerId: { in: empIds },
          startDate: { lte: now },
          endDate: { gte: now },
        },
        include: {
          delegate: { select: { firstName: true, lastName: true } },
        },
      })
    : []
  const delegationByManagerId = new Map(
    activeDelegations.map((d) => [
      d.managerId,
      {
        delegateName: `${d.delegate.firstName} ${d.delegate.lastName}`,
        endDate: d.endDate.toISOString(),
      },
    ]),
  )

  return memberships.map((m) => {
    const emp = empByUserId.get(m.user.id)
    const delegation = emp ? delegationByManagerId.get(emp.id) : undefined
    return {
      id: m.id,
      userId: m.user.id,
      email: m.user.email,
      name: m.user.name,
      role: m.role,
      createdAt: m.createdAt.toISOString(),
      activeDelegation: delegation ?? null,
    }
  })
}

export async function getInvites(tenantSlug: string) {
  // Audit follow-up: a non-admin could enumerate every pending invite
  // (email + role) by calling this server action directly. ADMIN+ only.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.invite.findMany({
    where: { tenantId: tenant.id, usedAt: null },
    orderBy: { createdAt: 'desc' },
  })
}

// (#186) Trim + lowercase before validating. Chrome autofill of
// "Colleague@Company.com " (trailing space, mixed case) used to fail
// .email() and reject a perfectly valid invite.
const InviteSchema = z.object({
  email: z
    .string()
    .transform((s) => s.trim().toLowerCase())
    .pipe(z.string().email().max(200)),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']),
})

export async function createInvite(
  tenantSlug: string,
  data: { email: string; role: string }
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)
  const parsed = InviteSchema.parse(data)

  // Invites expire 7 days after creation. Without an explicit expiry an
  // unread invite from a year ago could still grant access.
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const invite = await prisma.invite.create({
    data: {
      email: parsed.email,
      role: parsed.role as 'ADMIN' | 'MANAGER' | 'EMPLOYEE',
      token: randomBytes(32).toString('hex'),
      tenantId: tenant.id,
      expiresAt,
    },
  })

  await logAudit({
    action: 'invite.created',
    entity: 'Invite',
    entityId: invite.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { email: parsed.email, role: parsed.role },
  })

  // Actually send the invite email. Previous versions of this action only
  // created the DB row and relied on admins to copy the link manually, which
  // defeated the whole point of the feature. We surface send failures via
  // UserError so the admin sees a clear message (and can use the "Resend"
  // action to retry) rather than finding out days later.
  const inviteUrl = `${appBaseUrl()}/invite/${invite.token}`
  const inviterName = user.name || user.email || 'A Leavely admin'
  try {
    await sendInviteEmail(
      parsed.email,
      inviterName,
      tenant.name,
      parsed.role,
      inviteUrl,
    )
  } catch (err) {
    console.error('[invite] sendInviteEmail failed:', err)
    // The invite row is still valid — the admin can resend from the UI.
    throw new UserError(
      'Invite was created but the email could not be sent. Use "Resend" from the invites list to try again.',
    )
  }

  revalidatePath(`/t/${tenantSlug}/settings/users`)
  })
}

export async function removeMember(
  tenantSlug: string,
  membershipId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const target = await prisma.membership.findFirst({
    where: { id: membershipId, tenantId: tenant.id },
  })
  if (!target) throw new UserError('Member not found')
  if (target.role === 'OWNER') throw new UserError('Cannot remove the owner')

  await prisma.membership.delete({ where: { id: membershipId } })

  await logAudit({
    action: 'member.removed',
    entity: 'Membership',
    entityId: membershipId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/users`)
  })
}

export async function deleteInvite(
  tenantSlug: string,
  inviteId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const invite = await prisma.invite.findFirst({
      where: { id: inviteId, tenantId: tenant.id },
    })
    if (!invite) throw new UserError('Invite not found')
    if (invite.usedAt) throw new UserError('Invite has already been accepted')

    await prisma.invite.delete({ where: { id: inviteId } })

    await logAudit({
      action: 'invite.revoked',
      entity: 'Invite',
      entityId: inviteId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { email: invite.email },
    })

    revalidatePath(`/t/${tenantSlug}/settings/users`)
  })
}

export async function resendInvite(
  tenantSlug: string,
  inviteId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const invite = await prisma.invite.findFirst({
      where: { id: inviteId, tenantId: tenant.id },
    })
    if (!invite) throw new UserError('Invite not found')
    if (invite.usedAt) throw new UserError('Invite has already been accepted')

    // Refresh the expiry so the resent link is usable for a full 7 days.
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await prisma.invite.update({
      where: { id: inviteId },
      data: { expiresAt: newExpiry },
    })

    // Look up the inviter's display name. Pack η owns wiring up the initial
    // createInvite email send; this resend path uses the same helper so both
    // flows go through one code path. See issue #124 for the createInvite
    // email wiring.
    const inviter = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { name: true, email: true },
    })
    const inviterName = inviter?.name || inviter?.email || 'A teammate'

    try {
      await sendInviteEmail(
        invite.email,
        inviterName,
        tenant.name,
        invite.role,
        invite.token,
      )
    } catch (err) {
      // Fire-and-forget style: surface a user-friendly error if Resend rejects
      // rather than spewing a raw stack trace into the UI.
      console.error('Failed to resend invite email', err)
      throw new UserError('Could not resend invite email. Please try again.')
    }

    await logAudit({
      action: 'invite.resent',
      entity: 'Invite',
      entityId: inviteId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { email: invite.email },
    })

    revalidatePath(`/t/${tenantSlug}/settings/users`)
  })
}

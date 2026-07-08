'use server'

import { prisma } from '@/lib/db'
import { getSession, requireUser } from '@/lib/session'
import { logAudit } from '@/lib/audit'
import { syncSeatCount } from '@/lib/stripe'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function getInviteByToken(token: string) {
  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { tenant: { select: { id: true, name: true, slug: true } } },
  })
  if (!invite) return null
  const isExpired = !!(invite.expiresAt && invite.expiresAt < new Date())
  if (invite.usedAt) return { ...invite, used: true, expired: false }
  if (isExpired) return { ...invite, used: false, expired: true }
  return { ...invite, used: false, expired: false }
}

export async function acceptInvite(token: string) {
  const { userId } = await requireUser()

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { tenant: true },
  })
  if (!invite) throw new Error('Invalid invite')
  if (invite.usedAt) throw new Error('Invite already used')
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    throw new Error('Invite has expired. Please ask an admin to send a new one.')
  }

  // Invite is bound to a specific email address. Reject if the logged-in
  // user's email doesn't match — otherwise anyone with the leaked URL could
  // claim the membership.
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, name: true },
  })
  if (!currentUser) throw new Error('UNAUTHORIZED')
  if (currentUser.email.toLowerCase() !== invite.email.toLowerCase()) {
    throw new Error('This invite was sent to a different email address. Please sign in with the invited account.')
  }

  // Check if already a member
  const existing = await prisma.membership.findUnique({
    where: { tenantId_userId: { tenantId: invite.tenantId, userId } },
  })
  if (existing) throw new Error('You are already a member of this organization')

  // Parse a sensible firstName/lastName fallback for the Employee row. The
  // invite-with-signup path takes the name from the form; here we have to
  // make do with whatever is on the existing User. Email local-part is the
  // last-resort fallback so we never insert empty strings into NOT NULL
  // columns.
  const emailLocal = currentUser.email.split('@')[0] || 'Member'
  const [firstName, ...rest] = (currentUser.name || emailLocal).trim().split(/\s+/)
  const lastName = rest.join(' ') || firstName

  // Atomically claim the invite, create the membership AND the matching
  // Employee row in one transaction. Without the Employee row, downstream
  // actions like createLeaveRequest / createExpenseClaim / dashboard "my
  // summary" all fail with "No employee record found" because they look up
  // the caller via prisma.employee.findFirst({ tenantId, userId }). The
  // signup-and-accept path already creates one — this path used to skip it.
  const accepted = await prisma.$transaction(async (tx) => {
    const claimed = await tx.invite.updateMany({
      where: { id: invite.id, usedAt: null },
      data: { usedAt: new Date() },
    })
    if (claimed.count === 0) throw new Error('Invite already used')

    await tx.membership.create({
      data: {
        tenantId: invite.tenantId,
        userId,
        role: invite.role,
      },
    })

    // It's possible an Employee row already exists for this user in this
    // tenant (e.g. an admin pre-created it before sending the invite, in
    // which case the Employee.userId may already be set). Use upsert-style
    // logic so the second case is a no-op rather than a unique-constraint
    // failure that rolls back the whole accept.
    const existingEmp = await tx.employee.findFirst({
      where: { tenantId: invite.tenantId, userId },
      select: { id: true },
    })
    let createdEmployeeId: string | null = null
    if (!existingEmp) {
      // Also check for a placeholder row keyed by email but with no userId,
      // which is the common pattern when an admin pre-creates the employee
      // and then invites them. Bind it to this user instead of creating a
      // duplicate.
      const orphan = await tx.employee.findFirst({
        where: {
          tenantId: invite.tenantId,
          userId: null,
          email: invite.email,
        },
        select: { id: true },
      })
      if (orphan) {
        await tx.employee.update({
          where: { id: orphan.id },
          data: { userId },
        })
      } else {
        const employee = await tx.employee.create({
          data: {
            firstName,
            lastName,
            email: invite.email,
            tenantId: invite.tenantId,
            userId,
          },
        })
        createdEmployeeId = employee.id
      }
    }

    return { createdEmployeeId }
  })

  await logAudit({
    action: 'invite.accepted',
    entity: 'Invite',
    entityId: invite.id,
    userId,
    tenantId: invite.tenantId,
  })

  // Accepting an invite can create a new ACTIVE Employee row, so the Stripe
  // seat quantity must be reconciled here just like every employees/actions.ts
  // mutation — otherwise invited members ride along unbilled until the next
  // unrelated employee change.
  fireAndForget(syncSeatCount(invite.tenantId), 'acceptInvite.seat-sync')
  if (accepted.createdEmployeeId) {
    fireAndForget(
      trackServerEvent('employee_added', {
        distinctId: userId,
        tenantId: invite.tenantId,
        userId,
        properties: {
          employee_id: accepted.createdEmployeeId,
          tenant_slug: invite.tenant.slug,
          source: 'invite_accept',
          created_by_role: invite.role,
          has_user_account: true,
        },
      }),
      'analytics.employee-added',
    )
  }

  return { success: true, tenantSlug: invite.tenant.slug }
}

/**
 * Create a new user account AND accept an invite in one step. Used when an
 * unregistered recipient clicks the invite link — the previous flow dead-ended
 * at the accept button because requireUser() threw with no path forward.
 *
 * Returns { error } on validation failure; redirects on success.
 */
export async function acceptInviteWithSignup(
  _prev: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const token = formData.get('token') as string
  const name = (formData.get('name') as string)?.trim()
  const password = formData.get('password') as string

  if (!token || !name || !password) {
    return { error: 'All fields are required' }
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }

  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { tenant: true },
  })
  if (!invite) return { error: 'Invalid invite link' }
  if (invite.usedAt) return { error: 'Invite has already been used' }
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    return { error: 'Invite has expired. Please ask an admin to send a new one.' }
  }

  // The new account's email is taken from the invite, not the form. Accepting
  // arbitrary form input would let anyone with the URL register under any
  // address and become a member.
  const email = invite.email.toLowerCase()

  // If a user with this email already exists, ask them to log in instead.
  // Linking an existing account to a freshly-supplied password would let an
  // attacker hijack the account.
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'An account with this email already exists. Please sign in to accept this invite.' }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ') || firstName

  let created: { userId: string; employeeId: string } | null = null
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Atomically claim the invite. If two simultaneous accepts race, only
      // one wins; the other gets count === 0 and throws.
      const claimed = await tx.invite.updateMany({
        where: { id: invite.id, usedAt: null },
        data: { usedAt: new Date() },
      })
      if (claimed.count === 0) {
        throw new Error('Invite already used')
      }

      const u = await tx.user.create({
        data: {
          email,
          name,
          passwordHash,
          authProvider: 'CREDENTIALS',
        },
      })

      await tx.membership.create({
        data: {
          tenantId: invite.tenantId,
          userId: u.id,
          role: invite.role,
        },
      })

      // Create an Employee record so leave / dashboard work immediately
      const employee = await tx.employee.create({
        data: {
          firstName,
          lastName,
          email,
          tenantId: invite.tenantId,
          userId: u.id,
        },
      })

      return { userId: u.id, employeeId: employee.id }
    })
    created = result
  } catch (e) {
    console.error('[invite] signup transaction failed:', e)
    return { error: 'Failed to create account. Please try again.' }
  }
  if (!created) {
    return { error: 'Failed to create account. Please try again.' }
  }

  await logAudit({
    action: 'invite.accepted_with_signup',
    entity: 'Invite',
    entityId: invite.id,
    userId: created.userId,
    tenantId: invite.tenantId,
  })

  // Same seat reconcile as acceptInvite — this path always creates a new
  // Employee row inside an existing (possibly subscribed) tenant.
  fireAndForget(syncSeatCount(invite.tenantId), 'acceptInviteWithSignup.seat-sync')
  fireAndForget(
    trackServerEvent('signup', {
      distinctId: created.userId,
      tenantId: invite.tenantId,
      userId: created.userId,
      properties: {
        method: 'invite',
        tenant_slug: invite.tenant.slug,
        invite_role: invite.role,
        source: 'invite',
      },
    }),
    'analytics.signup',
  )
  fireAndForget(
    trackServerEvent('employee_added', {
      distinctId: created.userId,
      tenantId: invite.tenantId,
      userId: created.userId,
      properties: {
        employee_id: created.employeeId,
        tenant_slug: invite.tenant.slug,
        source: 'invite_signup',
        created_by_role: invite.role,
        has_user_account: true,
      },
    }),
    'analytics.employee-added',
  )

  // Create session
  const session = await getSession()
  session.userId = created.userId
  session.email = email
  session.name = name
  session.loggedInAt = Date.now()
  await session.save()

  redirect(`/t/${invite.tenant.slug}/dashboard`)
}

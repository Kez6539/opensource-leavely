'use server'

import { prisma } from '@/lib/db'
import { requireSuperAdmin } from '@/lib/admin'
import { getSession } from '@/lib/session'
import { logAudit } from '@/lib/audit'
import { redirect } from 'next/navigation'

export async function getAdminDashboard() {
  await requireSuperAdmin()

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    tenantCount,
    userCount,
    signupsThisWeek,
    trialsExpiringSoon,
    recentUsers,
    unconvertedLeads,
    totalLeads,
  ] = await Promise.all([
    prisma.tenant.count(),
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.tenantBilling.count({
      where: {
        status: 'TRIALING',
        trialEndsAt: { lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) },
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        authProvider: true,
        memberships: {
          take: 1,
          include: { tenant: { select: { name: true, slug: true } } },
        },
      },
    }),
    prisma.signupLead.findMany({
      where: { convertedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    prisma.signupLead.count(),
  ])

  const activeSubscriptions = await prisma.tenantBilling.count({ where: { status: 'ACTIVE' } })

  return {
    tenantCount,
    userCount,
    signupsThisWeek,
    trialsExpiringSoon,
    activeSubscriptions,
    recentUsers: recentUsers.map((u) => ({
      ...u,
      companyName: u.memberships[0]?.tenant.name ?? null,
      companySlug: u.memberships[0]?.tenant.slug ?? null,
      createdAt: u.createdAt.toISOString(),
    })),
    unconvertedLeads: unconvertedLeads.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
    })),
    totalLeads,
  }
}

export async function getAdminTenants(search?: string) {
  await requireSuperAdmin()

  const where = search
    ? { OR: [{ name: { contains: search, mode: 'insensitive' as const } }, { slug: { contains: search, mode: 'insensitive' as const } }] }
    : {}

  const tenants = await prisma.tenant.findMany({
    where,
    include: {
      billing: { select: { planKey: true, status: true, trialEndsAt: true } },
      _count: { select: { memberships: true, employees: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return tenants.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    plan: t.billing?.planKey ?? 'none',
    status: t.billing?.status ?? 'TRIALING',
    trialEndsAt: t.billing?.trialEndsAt?.toISOString() ?? null,
    members: t._count.memberships,
    employees: t._count.employees,
    createdAt: t.createdAt.toISOString(),
  }))
}

export async function getAdminTenantDetail(tenantId: string) {
  await requireSuperAdmin()

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: {
      billing: true,
      memberships: {
        include: { user: { select: { id: true, email: true, name: true } } },
        orderBy: { role: 'asc' },
      },
      auditLogs: {
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { id: true, action: true, createdAt: true, userId: true },
      },
    },
  })

  return tenant
}

export async function getAdminUsers(search?: string) {
  await requireSuperAdmin()

  const where = search
    ? { OR: [{ email: { contains: search, mode: 'insensitive' as const } }, { name: { contains: search, mode: 'insensitive' as const } }] }
    : {}

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      authProvider: true,
      isSuperAdmin: true,
      createdAt: true,
      lastLoginAt: true,
      disabledAt: true,
      memberships: {
        select: {
          role: true,
          tenant: { select: { name: true, slug: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return users
}

export async function setUserDisabledAction(userId: string, disabled: boolean) {
  const { session } = await requireSuperAdmin()

  // Don't let an admin lock themselves out via this UI — they can only
  // be re-enabled with a direct DB write, which is far more painful than
  // accidentally clicking "Disable" on the wrong row.
  if (userId === session.userId) {
    return { error: 'You cannot disable your own account.' }
  }

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, isSuperAdmin: true, memberships: { select: { tenantId: true }, take: 1 } },
  })
  if (!target) return { error: 'User not found.' }

  await prisma.user.update({
    where: { id: userId },
    data: { disabledAt: disabled ? new Date() : null },
  })

  // Audit against the user's primary tenant if they have one. logAudit
  // requires a tenantId, so an orphan user (no memberships) just skips
  // the audit row — failure is non-fatal anyway.
  const tenantId = target.memberships[0]?.tenantId
  if (tenantId) {
    await logAudit({
      action: disabled ? 'admin.user_disabled' : 'admin.user_enabled',
      entity: 'User',
      entityId: userId,
      tenantId,
      userId: session.userId!,
      metadata: { targetEmail: target.email },
    }).catch((err) => console.error('[admin] user disable audit failed:', err))
  }

  return { ok: true }
}

export async function getAdminPartners() {
  await requireSuperAdmin()

  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      referrals: {
        include: {
          billing: { select: { status: true } },
          _count: { select: { employees: true } },
        },
      },
      commissions: true,
    },
  })

  return partners.map((p) => {
    const activeReferrals = p.referrals.filter((r) => r.billing?.status === 'ACTIVE')
    // (#142) Commission.amount is Prisma.Decimal — coerce to Number for sums.
    const totalCommission = p.commissions.reduce((sum, c) => sum + Number(c.amount), 0)
    const pendingCommission = p.commissions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + Number(c.amount), 0)

    return {
      id: p.id,
      name: p.name,
      email: p.email,
      company: p.company,
      referralCode: p.referralCode,
      commissionRate: p.commissionRate,
      status: p.status,
      totalReferrals: p.referrals.length,
      activeClients: activeReferrals.length,
      totalCommission,
      pendingCommission,
      createdAt: p.createdAt.toISOString(),
    }
  })
}

export async function impersonateOwner(tenantId: string) {
  const { session } = await requireSuperAdmin()

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    include: {
      memberships: {
        where: { role: 'OWNER' },
        include: { user: true },
        take: 1,
      },
    },
  })

  if (!tenant || tenant.memberships.length === 0) {
    return { error: 'No owner found for this tenant' }
  }

  const owner = tenant.memberships[0].user
  const adminUserId = session.userId!

  // Audit BEFORE we mutate the session so the row's userId is the real
  // admin's id, not the target. Customers reasonably expect to see when
  // a Leavely operator stepped into their tenant — without this row the
  // tenant audit log shows zero trace of the impersonation.
  await logAudit({
    action: 'admin.impersonation_started',
    entity: 'User',
    entityId: owner.id,
    userId: adminUserId,
    tenantId: tenant.id,
    metadata: { targetEmail: owner.email },
  })

  // Store admin's userId so we can restore later
  session.impersonatingFrom = adminUserId
  session.userId = owner.id
  session.email = owner.email
  session.name = owner.name ?? undefined
  session.isSuperAdmin = false
  session.loggedInAt = Date.now()
  await session.save()

  redirect(`/t/${tenant.slug}/dashboard`)
}

/**
 * Hard-delete a tenant + everything tied to it. Super-admin only. Used to
 * clean up test signups / abandoned trials so the same email/company can
 * sign up fresh. Tenant has onDelete: Cascade on Membership / Employee /
 * LeavePolicy / LeaveRequest / etc, so dropping the tenant row removes
 * the rest. Stand-alone User accounts (not bound to any other tenant)
 * are also removed so the email can be reused for a new signup.
 */
export async function deleteTenantAction(
  tenantId: string,
  confirmSlug: string,
): Promise<{ success: true; redirect: string } | { error: string }> {
  const { session } = await requireSuperAdmin()

  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
    select: { id: true, slug: true, name: true },
  })
  if (!tenant) return { error: 'Tenant not found' }

  if (confirmSlug !== tenant.slug) {
    return { error: `Type the tenant slug "${tenant.slug}" to confirm.` }
  }

  // Collect users tied ONLY to this tenant — they can be safely removed
  // alongside the tenant. Users with memberships in other tenants are
  // left intact.
  const memberships = await prisma.membership.findMany({
    where: { tenantId: tenant.id },
    select: { userId: true },
  })
  const userIds = memberships.map((m) => m.userId)
  let usersToDelete: string[] = []
  if (userIds.length) {
    const otherMemberships = await prisma.membership.findMany({
      where: { userId: { in: userIds }, tenantId: { not: tenant.id } },
      select: { userId: true },
    })
    const usersWithOtherTenants = new Set(otherMemberships.map((m) => m.userId))
    usersToDelete = userIds.filter((uid) => !usersWithOtherTenants.has(uid))
  }

  // Audit BEFORE deletion so the row outlives the tenant. Logged on the
  // surviving admin's tenantId would be wrong (we don't know it); accept
  // the tenant being gone — the admin's own User row is still there for
  // attribution.
  await logAudit({
    action: 'admin.tenant_deleted',
    entity: 'Tenant',
    entityId: tenant.id,
    userId: session.userId!,
    tenantId: tenant.id,
    metadata: { slug: tenant.slug, name: tenant.name, usersDeleted: usersToDelete.length },
  })

  // Cascades drop Membership, Employee, LeavePolicy, LeaveRequest,
  // LeaveBalance, AuditLog, Invite, TenantBilling, etc.
  await prisma.tenant.delete({ where: { id: tenant.id } })

  if (usersToDelete.length) {
    await prisma.user.deleteMany({ where: { id: { in: usersToDelete } } })
  }

  return { success: true, redirect: '/admin/tenants' }
}

export async function endImpersonationAction() {
  const session = await getSession()
  const adminUserId = session.impersonatingFrom

  if (!adminUserId) {
    redirect('/admin')
  }

  const admin = await prisma.user.findUnique({ where: { id: adminUserId } })
  if (!admin || !admin.isSuperAdmin) {
    // The previously-superadmin user has lost their privilege mid-session.
    // Destroy the session BEFORE redirecting — without the await the cookie
    // mutation may not flush before the response is finalised on Workers,
    // leaving the impersonated session usable for one more request.
    await session.destroy()
    redirect('/login')
  }

  // Best-effort audit of the end-impersonation transition. We log against
  // the impersonated user's tenant so the tenant audit trail closes the
  // bracket for the start row above. Failures are non-fatal — never block
  // the operator's exit on a logging hiccup.
  const impersonatedUserId = session.userId
  if (impersonatedUserId && impersonatedUserId !== adminUserId) {
    const tenantMembership = await prisma.membership.findFirst({
      where: { userId: impersonatedUserId },
      select: { tenantId: true },
    })
    if (tenantMembership) {
      await logAudit({
        action: 'admin.impersonation_ended',
        entity: 'User',
        entityId: impersonatedUserId,
        userId: adminUserId,
        tenantId: tenantMembership.tenantId,
      }).catch((err) =>
        console.error('[admin] failed to log impersonation_ended:', err),
      )
    }
  }

  session.userId = admin.id
  session.email = admin.email
  session.name = admin.name ?? undefined
  session.isSuperAdmin = true
  session.impersonatingFrom = undefined
  session.loggedInAt = Date.now()
  await session.save()

  redirect('/admin')
}

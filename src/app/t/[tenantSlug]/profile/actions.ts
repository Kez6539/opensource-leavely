'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess, assertNotDemo } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function getMyProfile(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)

  const employee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: membership.userId },
  })

  return employee
}

// (#189, #191) Server mirror of the client form: phone shape, DOB past,
// addresses trimmed and capped.
const PHONE_RE = /^[\d\s+()-]{5,20}$/
const UpdateProfileSchema = z.object({
  dateOfBirth: z
    .string()
    .optional()
    .refine((v) => !v || new Date(v) <= new Date(), 'DOB must be in the past'),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
  address: z.string().trim().max(500).optional(),
  emergencyContactName: z.string().trim().max(200).optional(),
  emergencyContactPhone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
})

export type ProfileFormData = z.infer<typeof UpdateProfileSchema>

export async function updateMyProfile(
  tenantSlug: string,
  data: ProfileFormData
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    await requireWriteAccess(tenant.id)

    const parsed = UpdateProfileSchema.parse(data)

    const employee = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: membership.userId },
    })
    if (!employee) throw new UserError('No linked employee record found')

    await prisma.employee.update({
      where: { id: employee.id },
      data: {
        dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : null,
        phone: parsed.phone || null,
        address: parsed.address || null,
        emergencyContactName: parsed.emergencyContactName || null,
        emergencyContactPhone: parsed.emergencyContactPhone || null,
      },
    })

    await logAudit({
      action: 'employee.self_updated',
      entity: 'Employee',
      entityId: employee.id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/profile`)
  })
}

// Hannah's bug: there was no password-change form in the entire app.
// Welcome email tells new users to "head to Settings → My account and
// change your password" but that page didn't exist. Now it does — on the
// profile page, gated by current-password verification, rate-limited per
// user, and bumps `passwordChangedAt` so any other live sessions are
// invalidated by the requireUser() guard added in sweep 3 pack A.
const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters').max(128),
    confirm: z.string().min(1, 'Please confirm the new password'),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: "New passwords don't match",
    path: ['confirm'],
  })
  .refine((d) => d.currentPassword !== d.newPassword, {
    message: 'New password must be different from your current password',
    path: ['newPassword'],
  })

export type ChangePasswordData = z.input<typeof ChangePasswordSchema>

export async function changeMyPassword(
  tenantSlug: string,
  data: ChangePasswordData,
): Promise<ActionResult> {
  return withUserErrors(async () => {
    await assertNotDemo()
    const { user } = await requireTenant(tenantSlug)
    const parsed = ChangePasswordSchema.parse(data)

    // Per-user rate limit on password-change attempts. Same lock-out
    // semantics as the login flow — 5 attempts per 5-minute window.
    try {
      await rateLimit('change-password:' + user.userId, 5, 5 * 60_000)
    } catch (e) {
      if (e instanceof RateLimitError) {
        throw new UserError('Too many attempts. Please try again in a few minutes.')
      }
      throw e
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { id: true, passwordHash: true, authProvider: true },
    })
    if (!dbUser) throw new UserError('Account not found')

    // OAuth-only accounts have no password hash to verify against. They
    // need to manage credentials with their identity provider.
    if (!dbUser.passwordHash) {
      throw new UserError(
        'This account uses social sign-in. Manage your password with your identity provider.',
      )
    }

    const valid = await bcrypt.compare(parsed.currentPassword, dbUser.passwordHash)
    if (!valid) {
      throw new UserError('Current password is incorrect')
    }

    const newHash = await bcrypt.hash(parsed.newPassword, 10)

    await prisma.user.update({
      where: { id: dbUser.id },
      // Bump passwordChangedAt so other live sessions are invalidated on
      // next requireUser() call. (See sweep 3 pack A.)
      data: { passwordHash: newHash, passwordChangedAt: new Date() },
    })

    await logAudit({
      action: 'user.password_changed',
      entity: 'User',
      entityId: dbUser.id,
      userId: user.userId,
      tenantId: (await requireTenant(tenantSlug)).tenant.id,
    })
  })
}

export async function exportMyData(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)

  const employee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: membership.userId },
  })
  if (!employee) throw new Error('No linked employee record found')

  const [leaveRequests, leaveBalances] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: { employeeId: employee.id },
      include: { policy: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.leaveBalance.findMany({
      where: { employeeId: employee.id },
      include: { policy: { select: { name: true } } },
      orderBy: { year: 'desc' },
    }),
  ])

  return {
    exportedAt: new Date().toISOString(),
    tenant: tenant.name,
    personalData: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      dateOfBirth: employee.dateOfBirth?.toISOString().split('T')[0] ?? null,
      address: employee.address,
      emergencyContactName: employee.emergencyContactName,
      emergencyContactPhone: employee.emergencyContactPhone,
      jobTitle: employee.jobTitle,
      department: employee.department,
      status: employee.status,
      startDate: employee.startDate?.toISOString().split('T')[0] ?? null,
    },
    leaveRequests: leaveRequests.map(r => ({
      policy: r.policy.name,
      startDate: r.startDate.toISOString().split('T')[0],
      endDate: r.endDate.toISOString().split('T')[0],
      halfDayStart: r.halfDayStart,
      halfDayEnd: r.halfDayEnd,
      status: r.status,
      reason: r.reason,
      createdAt: r.createdAt.toISOString(),
    })),
    leaveBalances: leaveBalances.map(b => ({
      policy: b.policy.name,
      year: b.year,
      allowance: b.allowance,
      used: b.used,
      pending: b.pending,
      remaining: b.allowance - b.used - b.pending,
    })),
  }
}

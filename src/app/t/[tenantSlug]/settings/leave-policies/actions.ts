'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Prisma } from '@/generated/prisma/client'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

const ServiceBonusSchema = z.object({
  years: z.number().int().min(1),
  days: z.number().int().min(1),
})

// (#183) Cap allowance at 365 days, notice at 90 days, carryover at 365.
// Without these caps a typo (`9999` instead of `99`) silently saved an
// allowance the UI then has to render forever.
const PolicySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  unit: z.enum(['days', 'hours']).default('days'),
  allowHalfDay: z.boolean().default(false),
  defaultAllowance: z.number().int().min(1).max(365).default(28),
  maxCarryoverDays: z.number().int().min(0).max(365).default(0),
  carryoverExpiryMonths: z.number().int().min(0).max(36).nullable().default(null),
  minNoticeDays: z.number().int().min(0).max(90).default(0),
  accrualType: z.enum(['upfront', 'monthly']).default('upfront'),
  serviceBonusDays: z.array(ServiceBonusSchema).nullable().default(null),
})

export type PolicyFormData = z.infer<typeof PolicySchema>

export async function getLeavePolicies(tenantSlug: string) {
  // Audit follow-up: ADMIN+ for the settings list. The leave booking
  // form pulls policies via getFormOptions() in leave/actions.ts, not
  // through this getter, so locking this down doesn't break employees.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const { getLeaveYear } = await import('@/lib/leave-year')
  const currentYear = getLeaveYear(tenant.leaveYearStartMonth, new Date())

  const [policies, balances] = await Promise.all([
    prisma.leavePolicy.findMany({
      where: { tenantId: tenant.id },
      orderBy: { name: 'asc' },
    }),
    prisma.leaveBalance.findMany({
      where: { tenantId: tenant.id, year: currentYear },
      select: { policyId: true, allowance: true, used: true, pending: true },
    }),
  ])

  const usageByPolicy = new Map<string, { employees: number; allowance: number; used: number; pending: number }>()
  for (const b of balances) {
    const cur = usageByPolicy.get(b.policyId) ?? { employees: 0, allowance: 0, used: 0, pending: 0 }
    cur.employees += 1
    cur.allowance += b.allowance
    cur.used += b.used
    cur.pending += b.pending
    usageByPolicy.set(b.policyId, cur)
  }

  return policies.map((p) => {
    const u = usageByPolicy.get(p.id)
    const consumedPct = u && u.allowance > 0
      ? Math.round(((u.used + u.pending) / u.allowance) * 100)
      : null
    return {
      ...p,
      usage: {
        employees: u?.employees ?? 0,
        consumedPct,
      },
    }
  })
}

export async function createLeavePolicy(
  tenantSlug: string,
  data: PolicyFormData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)
  const parsed = PolicySchema.parse(data)

  const { serviceBonusDays, ...rest } = parsed
  const policy = await prisma.leavePolicy.create({
    data: {
      ...rest,
      tenantId: tenant.id,
      serviceBonusDays: serviceBonusDays && serviceBonusDays.length > 0
        ? serviceBonusDays
        : Prisma.JsonNull,
    },
  })

  await logAudit({
    action: 'leave_policy.created',
    entity: 'LeavePolicy',
    entityId: policy.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/leave-policies`)
    return { id: policy.id }
  })
}

export async function deleteLeavePolicy(
  tenantSlug: string,
  policyId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const existing = await prisma.leavePolicy.findFirst({
    where: { id: policyId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Policy not found')

  // Prevent deletion if policy has any leave requests or balances
  const [requestCount, balanceCount] = await Promise.all([
    prisma.leaveRequest.count({ where: { policyId } }),
    prisma.leaveBalance.count({ where: { policyId } }),
  ])
  if (requestCount > 0 || balanceCount > 0) {
    throw new UserError(`Cannot delete this policy. It has ${requestCount} leave request${requestCount !== 1 ? 's' : ''} and ${balanceCount} balance record${balanceCount !== 1 ? 's' : ''} associated with it. Remove these first or deactivate the policy instead.`)
  }

  await prisma.leavePolicy.delete({ where: { id: policyId } })

  await logAudit({
    action: 'leave_policy.deleted',
    entity: 'LeavePolicy',
    entityId: policyId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/leave-policies`)
  })
}

export async function updateLeavePolicy(
  tenantSlug: string,
  policyId: string,
  data: PolicyFormData
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)
  const parsed = PolicySchema.parse(data)

  const existing = await prisma.leavePolicy.findFirst({
    where: { id: policyId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Policy not found')

  await prisma.leavePolicy.update({
    where: { id: policyId },
    data: {
      name: parsed.name,
      unit: parsed.unit,
      allowHalfDay: parsed.allowHalfDay,
      defaultAllowance: parsed.defaultAllowance,
      maxCarryoverDays: parsed.maxCarryoverDays,
      carryoverExpiryMonths: parsed.carryoverExpiryMonths || null,
      minNoticeDays: parsed.minNoticeDays,
      accrualType: parsed.accrualType,
      serviceBonusDays: parsed.serviceBonusDays && parsed.serviceBonusDays.length > 0
        ? parsed.serviceBonusDays
        : Prisma.JsonNull,
    },
  })

  await logAudit({
    action: 'leave_policy.updated',
    entity: 'LeavePolicy',
    entityId: policyId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/leave-policies`)
  })
}

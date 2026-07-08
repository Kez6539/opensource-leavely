'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast, assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

/**
 * Get all active delegations for the current user (as manager).
 * ADMINs can see all delegations in the tenant.
 */
export async function getMyDelegations(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const myEmp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })

  // Build the query - admins see all, managers see only their own
  const where: Record<string, unknown> = { tenantId: tenant.id }
  if (!isAtLeast(membership, 'ADMIN')) {
    if (!myEmp) return []
    where.managerId = myEmp.id
  }

  const delegations = await prisma.approvalDelegate.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      manager: { select: { id: true, firstName: true, lastName: true } },
      delegate: { select: { id: true, firstName: true, lastName: true } },
    },
    orderBy: { startDate: 'desc' },
  })

  return delegations.map((d) => ({
    id: d.id,
    managerId: d.managerId,
    managerName: `${d.manager.firstName} ${d.manager.lastName}`,
    delegateId: d.delegateId,
    delegateName: `${d.delegate.firstName} ${d.delegate.lastName}`,
    startDate: d.startDate.toISOString(),
    endDate: d.endDate.toISOString(),
    isActive: new Date() >= d.startDate && new Date() <= d.endDate,
  }))
}

/**
 * Get list of eligible delegates: other managers/admins in the tenant.
 * Excludes the current user.
 */
export async function getDelegateOptions(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // Get all employees who are managers or admins (have a userId linked to a MANAGER+ membership)
  const managerMemberships = await prisma.membership.findMany({
    where: {
      tenantId: tenant.id,
      role: { in: ['OWNER', 'ADMIN', 'MANAGER'] },
      userId: { not: user.userId },
    },
    select: { userId: true },
  })

  const managerUserIds = managerMemberships.map((m) => m.userId)
  if (managerUserIds.length === 0) return []

  const employees = await prisma.employee.findMany({
    where: {
      tenantId: tenant.id,
      userId: { in: managerUserIds },
      status: 'ACTIVE',
    },
    select: { id: true, firstName: true, lastName: true },
    orderBy: { lastName: 'asc' },
  })

  return employees.map((e) => ({
    id: e.id,
    name: `${e.firstName} ${e.lastName}`,
  }))
}

const CreateDelegationSchema = z.object({
  delegateId: z.string().min(1, 'Delegate is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
})

export type CreateDelegationData = z.infer<typeof CreateDelegationSchema>

export async function createDelegation(
  tenantSlug: string,
  data: CreateDelegationData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = CreateDelegationSchema.parse(data)

  const myEmp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })
  if (!myEmp) throw new UserError('No employee record found for your account')

  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)

  if (endDate <= startDate) throw new UserError('End date must be after start date')
  if (parsed.delegateId === myEmp.id) throw new UserError('You cannot delegate to yourself')

  // Verify the delegate is actually a MANAGER+ in this tenant. The dropdown
  // already filters for this, but a direct POST to the action would otherwise
  // create a useless delegation row pointing at an EMPLOYEE who can't approve
  // anything.
  const delegateEmployee = await prisma.employee.findFirst({
    where: { id: parsed.delegateId, tenantId: tenant.id, status: 'ACTIVE' },
    select: { userId: true },
  })
  if (!delegateEmployee?.userId) {
    throw new UserError('Delegate not found or no longer active')
  }
  const delegateMembership = await prisma.membership.findUnique({
    where: { tenantId_userId: { tenantId: tenant.id, userId: delegateEmployee.userId } },
    select: { role: true },
  })
  if (!delegateMembership || !['OWNER', 'ADMIN', 'MANAGER'].includes(delegateMembership.role)) {
    throw new UserError('You can only delegate to other managers')
  }

  // Check for overlapping delegations
  const overlapping = await prisma.approvalDelegate.findFirst({
    where: {
      managerId: myEmp.id,
      tenantId: tenant.id,
      startDate: { lte: endDate },
      endDate: { gte: startDate },
    },
  })
  if (overlapping) throw new UserError('You already have a delegation active during this period')

  const delegation = await prisma.approvalDelegate.create({
    data: {
      managerId: myEmp.id,
      delegateId: parsed.delegateId,
      startDate,
      endDate,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'approval_delegate.created',
    entity: 'ApprovalDelegate',
    entityId: delegation.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { delegateId: parsed.delegateId, startDate: parsed.startDate, endDate: parsed.endDate },
  })

  revalidatePath(`/t/${tenantSlug}/settings/delegation`)
    return { id: delegation.id }
  })
}

export async function deleteDelegation(
  tenantSlug: string,
  delegationId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const delegation = await prisma.approvalDelegate.findFirst({
    where: { id: delegationId, tenantId: tenant.id },
  })
  if (!delegation) throw new UserError('Delegation not found')

  // Only the owning manager or an ADMIN+ can delete
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!myEmp || myEmp.id !== delegation.managerId) {
      throw new UserError('You can only delete your own delegations')
    }
  }

  await prisma.approvalDelegate.delete({ where: { id: delegationId } })

  await logAudit({
    action: 'approval_delegate.deleted',
    entity: 'ApprovalDelegate',
    entityId: delegationId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/delegation`)
  })
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast } from '@/lib/rbac'
import { assertNotDemo } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function getReturnToWork(tenantSlug: string, leaveId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const leaveRequest = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id },
    include: {
      employee: true,
      policy: true,
      returnToWork: true,
    },
  })
  if (!leaveRequest) throw new Error('Leave request not found')

  // Admins and owners can see any RTW in the tenant. Plain MANAGERs must be
  // the employee's direct manager or an active approval delegate, so they
  // can't enumerate RTW records (which include sickness reason) for employees
  // outside their report tree.
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    const isDirectManager = !!myEmp && leaveRequest.employee.managerId === myEmp.id
    let isDelegate = false
    if (!isDirectManager && myEmp && leaveRequest.employee.managerId) {
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: leaveRequest.employee.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      isDelegate = !!delegation
    }
    if (!isDirectManager && !isDelegate) {
      throw new Error('Leave request not found')
    }
  }

  // (#196) Auto-create RTW placeholder for sick leave only. Use the
  // structural isSystemType flag — name-based matching broke for tenants
  // who renamed the policy.
  const isSick = leaveRequest.policy.isSystemType === 'sickness'
  if (
    isSick &&
    leaveRequest.status === 'APPROVED' &&
    !leaveRequest.returnToWork
  ) {
    // Upsert (not create) so two managers opening the page simultaneously
    // don't crash on the unique (leaveRequestId) constraint.
    const rtw = await prisma.returnToWork.upsert({
      where: { leaveRequestId: leaveRequest.id },
      create: { leaveRequestId: leaveRequest.id },
      update: {},
    })
    return {
      leaveRequest: {
        id: leaveRequest.id,
        employeeName: `${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`,
        policyName: leaveRequest.policy.name,
        startDate: leaveRequest.startDate.toISOString(),
        endDate: leaveRequest.endDate.toISOString(),
        reason: leaveRequest.reason,
        status: leaveRequest.status,
      },
      returnToWork: {
        id: rtw.id,
        notes: rtw.notes,
        conductedById: rtw.conductedById,
        completedAt: rtw.completedAt?.toISOString() ?? null,
        conductedByName: null as string | null,
      },
    }
  }

  if (!leaveRequest.returnToWork) {
    throw new Error('No return to work record found for this leave request')
  }

  // Resolve who conducted the interview
  let conductedByName: string | null = null
  if (leaveRequest.returnToWork.conductedById) {
    const conductor = await prisma.user.findUnique({
      where: { id: leaveRequest.returnToWork.conductedById },
      select: { name: true, email: true },
    })
    conductedByName = conductor?.name || conductor?.email || null
  }

  return {
    leaveRequest: {
      id: leaveRequest.id,
      employeeName: `${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`,
      policyName: leaveRequest.policy.name,
      startDate: leaveRequest.startDate.toISOString(),
      endDate: leaveRequest.endDate.toISOString(),
      reason: leaveRequest.reason,
      status: leaveRequest.status,
    },
    returnToWork: {
      id: leaveRequest.returnToWork.id,
      notes: leaveRequest.returnToWork.notes,
      conductedById: leaveRequest.returnToWork.conductedById,
      completedAt: leaveRequest.returnToWork.completedAt?.toISOString() ?? null,
      conductedByName,
    },
  }
}

export async function completeReturnToWork(
  tenantSlug: string,
  leaveId: string,
  notes: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    await assertNotDemo()
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')

    const leaveRequest = await prisma.leaveRequest.findFirst({
      where: { id: leaveId, tenantId: tenant.id },
      include: { returnToWork: true },
    })
    if (!leaveRequest) throw new UserError('Leave request not found')
    if (!leaveRequest.returnToWork) throw new UserError('No return to work record found')
    if (leaveRequest.returnToWork.completedAt) throw new UserError('Return to work already completed')

    // Atomic update: only mark complete if no one else has done it since we read.
    // Prevents two managers submitting simultaneously and silently overwriting
    // each other's notes.
    const updated = await prisma.returnToWork.updateMany({
      where: { id: leaveRequest.returnToWork.id, completedAt: null },
      data: {
        notes: notes.trim() || null,
        conductedById: user.userId,
        completedAt: new Date(),
      },
    })
    if (updated.count === 0) {
      throw new UserError('This return to work interview has already been completed')
    }

    await logAudit({
      action: 'return_to_work.completed',
      entity: 'ReturnToWork',
      entityId: leaveRequest.returnToWork.id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
    revalidatePath(`/t/${tenantSlug}/leave/${leaveId}/return-to-work`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
  })
}

/**
 * Check for approved sick leave where endDate < today and no ReturnToWork record exists,
 * then create placeholder RTW records. Called from dashboard page load.
 */
export async function checkPendingRTW(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)

  // Only managers/admins need to see RTW data
  const { isAtLeast } = await import('@/lib/rbac')
  if (!isAtLeast(membership, 'MANAGER')) return { pendingCount: 0, pendingRTWs: [] }

  const now = new Date()
  // Day-precision comparator: only auto-create RTW for sick leave whose last
  // day is BEFORE today (i.e. they should already be back at work). Comparing
  // against `now` (a wall-clock instant) wrongly creates RTW for someone whose
  // last day is today, because the stored endDate is midnight UTC and now is
  // mid-morning UTC.
  const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

  // Find approved sick leave requests where endDate is before today and no RTW record exists.
  // Match by isSystemType OR name so renamed sickness policies still surface RTW prompts.
  const sickLeaveWithoutRTW = await prisma.leaveRequest.findMany({
    where: {
      tenantId: tenant.id,
      status: 'APPROVED',
      endDate: { lt: startOfTodayUTC },
      policy: {
        OR: [
          { isSystemType: 'sickness' },
          { name: { contains: 'sick', mode: 'insensitive' } },
        ],
      },
      returnToWork: null,
    },
    include: { employee: true, policy: true },
  })

  // Create placeholder RTW records. Use createMany with skipDuplicates so two
  // simultaneous dashboard loads don't both try to create the same row and
  // crash on the unique (leaveRequestId) constraint.
  if (sickLeaveWithoutRTW.length > 0) {
    await prisma.returnToWork.createMany({
      data: sickLeaveWithoutRTW.map((lr) => ({ leaveRequestId: lr.id })),
      skipDuplicates: true,
    })
  }

  // Now fetch all pending (incomplete) RTW records
  const pendingRTWs = await prisma.returnToWork.findMany({
    where: {
      completedAt: null,
      leaveRequest: {
        tenantId: tenant.id,
      },
    },
    include: {
      leaveRequest: {
        include: { employee: true, policy: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return {
    pendingCount: pendingRTWs.length,
    pendingRTWs: pendingRTWs.map((rtw) => ({
      id: rtw.id,
      leaveId: rtw.leaveRequest.id,
      employeeName: `${rtw.leaveRequest.employee.firstName} ${rtw.leaveRequest.employee.lastName}`,
      employeeId: rtw.leaveRequest.employee.id,
      policyName: rtw.leaveRequest.policy.name,
      startDate: rtw.leaveRequest.startDate.toISOString(),
      endDate: rtw.leaveRequest.endDate.toISOString(),
    })),
  }
}

'use server'

import { prisma } from '@/lib/db'
import { Prisma } from '@/generated/prisma/client'
import { requireTenant } from '@/lib/tenant'
import {
  isAtLeast,
  assertAtLeast,
  getDirectReportIds,
  canManageEmployeeId,
} from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { addPendingToBalance, addUsedToBalance, approveBalance, rejectBalance, cancelBalance, calculateLeaveAmount, ensureBalances } from './balance-helpers'
import { getEmployeeLeaveYearStartMonth, getAccruedAllowance } from '@/lib/leave-year'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { captureServerError } from '@/lib/error-capture'
import {
  sendNewLeaveRequestEmail,
  sendLeaveApprovedEmail,
  sendLeaveRejectedEmail,
  sendLeaveExtendedEmail,
  sendLeaveDatesUpdatedEmail,
  sendLeaveCancelledEmail,
  appBaseUrl,
} from '@/lib/email'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { trackServerEvent } from '@/lib/server-analytics'
import { calendarDaysBetween, countBusinessDays, formatLocalDayGB, toLocalDayKey } from '@/lib/business-days'

export async function getLeaveRequests(
  tenantSlug: string,
  filters: { status?: string; employeeId?: string }
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const where: Record<string, unknown> = { tenantId: tenant.id }
  if (filters.status && filters.status !== 'ALL') where.status = filters.status
  if (filters.employeeId) where.employeeId = filters.employeeId

  // Non-managers can only see their own leave requests
  if (!isAtLeast(membership, 'MANAGER')) {
    const emp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!emp) return []
    where.employeeId = emp.id
  }

  // Managers (not ADMIN/OWNER) can only see their direct reports' leave + delegated employees
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      // Find active delegations where I am the delegate
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })

      let delegatedEmployeeIds: string[] = []
      if (myEmp) {
        const now = new Date()
        const activeDelegations = await prisma.approvalDelegate.findMany({
          where: {
            delegateId: myEmp.id,
            tenantId: tenant.id,
            startDate: { lte: now },
            endDate: { gte: now },
          },
          select: { managerId: true },
        })
        if (activeDelegations.length > 0) {
          const delegatedManagerIds = activeDelegations.map(d => d.managerId)
          const delegatedEmps = await prisma.employee.findMany({
            where: { tenantId: tenant.id, managerId: { in: delegatedManagerIds } },
            select: { id: true },
          })
          delegatedEmployeeIds = delegatedEmps.map(e => e.id)
        }
      }

      const allVisibleIds = [...reportIds, ...delegatedEmployeeIds]

      // If a specific employee filter was provided, verify it's a visible employee
      if (filters.employeeId) {
        if (!allVisibleIds.includes(filters.employeeId)) return []
      } else {
        // Also include the manager's own leave requests
        const visibleIds = myEmp ? [...allVisibleIds, myEmp.id] : allVisibleIds
        where.employeeId = { in: visibleIds }
      }
    }
  }

  const requests = await prisma.leaveRequest.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      employee: {
        include: { workingPattern: { select: { dayOfWeek: true, isWorkingDay: true } } },
      },
      policy: true,
    },
    orderBy: { createdAt: 'desc' },
    // Hard cap so the leave list doesn't load every leave request in the
    // tenant. Most users only need recent ones; older history is reachable
    // via reports / per-employee detail.
    take: 200,
  })

  // Per-row day counts for the list, mirroring calculateLeaveDays
  // (balance-helpers): holiday exclusion gated on deductBankHolidays,
  // per-employee working pattern, toLocalDayKey for the BST/GMT storage
  // asymmetry. The page previously estimated this itself with raw UTC
  // weekday math, which rendered "-" for BST-stored single-day requests
  // and ignored bank holidays + part-time patterns.
  let holidaySet = new Set<string>()
  if (!tenant.deductBankHolidays) {
    const holidays = await prisma.publicHoliday.findMany({
      where: { tenantId: tenant.id },
      select: { date: true },
    })
    holidaySet = new Set(holidays.map((h) => toLocalDayKey(h.date)))
  }

  return requests.map((r) => {
    const pattern = r.employee.workingPattern
    const workingDays =
      pattern.length > 0
        ? new Set(pattern.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek))
        : undefined
    return {
      ...r,
      daysCount: countBusinessDays(
        r.startDate,
        r.endDate,
        holidaySet,
        r.halfDayStart,
        r.halfDayEnd,
        workingDays
      ),
    }
  })
}

export async function getLeaveRequest(tenantSlug: string, leaveId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id },
    include: { employee: true, policy: true },
  })
  if (!lr) throw new Error('Leave request not found')

  // Lookup the caller's own employee record once — used by both the
  // employee-scoped and manager-scoped checks below.
  const myEmp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })

  // Non-managers can only view their own leave requests
  if (!isAtLeast(membership, 'MANAGER')) {
    if (!myEmp || myEmp.id !== lr.employeeId) {
      throw new Error('Leave request not found')
    }
    return lr
  }

  // Admins and owners can view any leave in the tenant. Plain MANAGERs must be
  // the employee's direct manager, an active approval delegate, or the owner
  // of the request (their own leave). Without this check a manager could
  // enumerate leave IDs and read sickness reasons for anyone.
  if (!isAtLeast(membership, 'ADMIN')) {
    const isOwnLeave = !!myEmp && myEmp.id === lr.employeeId
    const isDirectManager = !!myEmp && lr.employee.managerId === myEmp.id
    let isDelegate = false
    if (!isOwnLeave && !isDirectManager && myEmp && lr.employee.managerId) {
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: lr.employee.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      isDelegate = !!delegation
    }
    if (!isOwnLeave && !isDirectManager && !isDelegate) {
      throw new Error('Leave request not found')
    }
  }

  return lr
}

const CreateLeaveSchema = z
  .object({
    employeeId: z.string().min(1),
    policyId: z.string().min(1),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    reason: z.string().trim().max(2000).optional(),
    halfDayStart: z.boolean().default(false),
    halfDayEnd: z.boolean().default(false),
  })
  // Guard against reversed dates. Without this the row persists as e.g.
  // '3 Jan - 1 Jan' and every downstream day calculation returns 0. The
  // sickness form already refines the same way.
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  })
  // (#173) Reject leave requests outside a sane window. Without these
  // bounds, leave can land in 1066 (corrupting historical reports) or in
  // 2099 (silently allocating from a future year's auto-created balance).
  // 2 years forward / 1 year back is enough headroom for advance booking
  // and retroactive entry without enabling clearly broken values.
  .refine(
    (d) => {
      const start = new Date(d.startDate)
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return start >= oneYearAgo
    },
    { message: 'Leave cannot start more than 1 year ago.', path: ['startDate'] },
  )
  .refine(
    (d) => {
      const end = new Date(d.endDate)
      const twoYearsAhead = new Date()
      twoYearsAhead.setFullYear(twoYearsAhead.getFullYear() + 2)
      return end <= twoYearsAhead
    },
    { message: 'Leave can be booked up to 2 years ahead.', path: ['endDate'] },
  )

export type CreateLeaveData = z.input<typeof CreateLeaveSchema>

export async function createLeaveRequest(
  tenantSlug: string,
  data: CreateLeaveData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)
  const parsed = CreateLeaveSchema.parse(data)

  // Verify employee belongs to tenant
  const emp = await prisma.employee.findFirst({
    where: { id: parsed.employeeId, tenantId: tenant.id },
    select: { id: true, firstName: true, lastName: true, email: true, userId: true, leaveYearStartMonth: true },
  })
  if (!emp) throw new UserError('Employee not found')

  // Scope guard. ADMIN+ can book for anyone in the tenant. EMPLOYEE can
  // only book for themselves. Plain MANAGER must be the target's direct
  // manager or an active ApprovalDelegate. Without this, any MANAGER could
  // submit leave on behalf of unrelated tenant staff (Codex round 4 #1).
  const allowed = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    parsed.employeeId,
  )
  if (!allowed) {
    if (!isAtLeast(membership, 'MANAGER')) {
      throw new UserError('You can only submit leave requests for yourself')
    }
    throw new UserError(
      "You can only submit leave requests for your own direct reports.",
    )
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(emp, tenant)
  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)

  // Overlap check lives inside the transaction below — hoisting it here
  // would re-introduce the double-click race this fix closes (#66). See
  // the prisma.$transaction block around the create below.

  // Check for blackout dates (admins/owners can bypass)
  if (!isAtLeast(membership, 'ADMIN')) {
    const blackout = await prisma.blackoutDate.findFirst({
      where: {
        tenantId: tenant.id,
        startDate: { lte: endDate },
        endDate: { gte: startDate },
      },
    })
    if (blackout) {
      throw new UserError(`Leave cannot be booked during "${blackout.name}" (${formatLocalDayGB(blackout.startDate)} - ${formatLocalDayGB(blackout.endDate)})`)
    }
  }

  // Fetch policy for accrual check and fit note detection (scoped to current
  // tenant so a tampered policyId from another tenant can't bypass our rules).
  const policy = await prisma.leavePolicy.findFirst({
    where: { id: parsed.policyId, tenantId: tenant.id },
  })
  if (!policy) throw new UserError('Selected leave policy does not exist')

  // Enforce accrued balance for monthly accrual policies
  if (policy?.accrualType === 'monthly') {
    const { getLeaveYear } = await import('@/lib/leave-year')
    const year = getLeaveYear(effectiveStartMonth, startDate)
    // Ensure the balance exists before checking (first request of year edge case)
    await ensureBalances(tenant.id, parsed.employeeId, year, effectiveStartMonth)
    const leaveAmount = await calculateLeaveAmount(
      tenant.id, startDate, endDate, parsed.policyId,
      parsed.halfDayStart, parsed.halfDayEnd, parsed.employeeId
    )
    const balance = await prisma.leaveBalance.findUnique({
      where: {
        employeeId_policyId_year: { employeeId: parsed.employeeId, policyId: parsed.policyId, year },
      },
    })
    if (balance) {
      const accrued = getAccruedAllowance('monthly', balance.allowance, effectiveStartMonth, year)
      const availableAccrued = accrued - balance.used - balance.pending
      if (leaveAmount > availableAccrued) {
        throw new UserError(
          `Insufficient accrued balance. You have ${availableAccrued.toFixed(1)} ${policy.unit} accrued so far, but this request needs ${leaveAmount.toFixed(1)} ${policy.unit}.`
        )
      }
    }
  }

  // Auto-detect fit note requirement for sick leave > 7 calendar days

  // Enforce minimum notice period (using UTC to avoid timezone issues)
  if (policy && policy.minNoticeDays > 0) {
    const now = new Date()
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
    const minDateUTC = new Date(todayUTC)
    minDateUTC.setUTCDate(minDateUTC.getUTCDate() + policy.minNoticeDays)
    if (startDate < minDateUTC) {
      throw new UserError(`This policy requires at least ${policy.minNoticeDays} days notice`)
    }
  }

  // (#196) Use the structural isSystemType flag instead of guessing from
  // the policy name. Tenant renaming "Sick leave" to "Illness" used to
  // silently break sickness-specific behaviour (fit-note prompts, audit
  // event name, notification copy).
  const isSickPolicy = policy?.isSystemType === 'sickness'
  // (#197) Use the shared calendarDaysBetween helper instead of dividing
  // milliseconds — DST-safe and consistent with countBusinessDays.
  const calendarDays = calendarDaysBetween(startDate, endDate)
  const fitNoteRequired = isSickPolicy && calendarDays > 7

  // Wrap the overlap check + create in a $transaction so that a
  // double-click or network retry can't both pass the check and both
  // insert (see #66). Without this, two concurrent submissions each saw
  // no overlap, each created a row, and each called
  // addPendingToBalance — pending went up by 2x.
  //
  // The transaction throws OVERLAPPING_LEAVE with the existing row's
  // dates on a conflict so we can surface the same friendly message the
  // non-transactional path used. The balance update runs OUTSIDE the tx
  // because (a) it's already atomic (Prisma `{ increment }`) and (b) it
  // touches multiple leave-year buckets via its own upsert chain, and
  // the failure mode we care about (double-counting pending) is already
  // closed by gating the create.
  // Sequential queries instead of interactive transaction. Prisma
  // interactive transactions crash on Neon serverless with "Transaction
  // not found" because the HTTP connection drops mid-transaction.
  const overlapping = await prisma.leaveRequest.findFirst({
    where: {
      tenantId: tenant.id,
      employeeId: parsed.employeeId,
      status: { in: ['PENDING', 'APPROVED'] },
      startDate: { lte: endDate },
      endDate: { gte: startDate },
    },
    select: { startDate: true, endDate: true, policy: { select: { name: true } } },
  })
  if (overlapping) {
    const overlapStart = formatLocalDayGB(overlapping.startDate)
    const overlapEnd = formatLocalDayGB(overlapping.endDate)
    const overlapPolicy = overlapping.policy.name
    throw new UserError(
      `This employee already has ${overlapPolicy} booked from ${overlapStart} to ${overlapEnd}, which overlaps with the dates you selected. Cancel the existing record first, then rebook.`
    )
  }

  // Wrap the insert so the unique partial index on
  // (tenantId, employeeId, startDate, endDate) WHERE status IN
  // ('PENDING','APPROVED') turns the racing-double-tap case into the same
  // user-facing message instead of a generic Internal Server Error +
  // unbalanced `pending` counter. Balance update only runs after a
  // successful insert, so the second request never touches the balance.
  let lr: { id: string }
  try {
    lr = await prisma.leaveRequest.create({
      data: {
        startDate,
        endDate,
        halfDayStart: parsed.halfDayStart,
        halfDayEnd: parsed.halfDayEnd,
        reason: parsed.reason || null,
        employeeId: parsed.employeeId,
        policyId: parsed.policyId,
        tenantId: tenant.id,
        fitNoteRequired,
        ...(isSickPolicy
          ? {
              status: 'APPROVED' as const,
              decidedAt: new Date(),
              decidedBy: user.userId,
              reportedById: user.userId,
            }
          : {}),
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('P2002') || msg.includes('LeaveRequest_no_duplicate_active')) {
      throw new UserError(
        'This request was already submitted — looks like a duplicate. Refresh the page to see the existing request.'
      )
    }
    throw err
  }

  if (isSickPolicy) {
    await addUsedToBalance(
      tenant.id, parsed.employeeId, parsed.policyId,
      startDate, endDate, effectiveStartMonth,
      parsed.halfDayStart, parsed.halfDayEnd
    )
  } else {
    await addPendingToBalance(
      tenant.id, parsed.employeeId, parsed.policyId,
      startDate, endDate, effectiveStartMonth,
      parsed.halfDayStart, parsed.halfDayEnd
    )
  }

  await logAudit({
    action: isSickPolicy ? 'sickness.reported' : 'leave_request.created',
    entity: 'LeaveRequest',
    entityId: lr.id,
    userId: user.userId,
    tenantId: tenant.id,
  })
  fireAndForget(
    recordTrialMilestone(tenant.id, tenantSlug, user.userId, 'first_leave_request', 'leave-request-create'),
    'trial-milestone.first-leave-request',
  )
  fireAndForget(
    trackServerEvent('leave_created', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        leave_request_id: lr.id,
        employee_id: parsed.employeeId,
        policy_id: parsed.policyId,
        policy_name: policy.name,
        tenant_slug: tenantSlug,
        status: isSickPolicy ? 'APPROVED' : 'PENDING',
        is_sickness: isSickPolicy,
        fit_note_required: fitNoteRequired,
        calendar_days: calendarDays,
      },
    }),
    'analytics.leave-created',
  )
  if (isSickPolicy) {
    fireAndForget(
      recordTrialMilestone(tenant.id, tenantSlug, user.userId, 'first_approval', 'auto-sickness-approval'),
      'trial-milestone.first-approval',
    )
    fireAndForget(
      trackServerEvent('leave_approved', {
        distinctId: user.userId,
        tenantId: tenant.id,
        userId: user.userId,
        properties: {
          leave_request_id: lr.id,
          employee_id: parsed.employeeId,
          policy_id: parsed.policyId,
          policy_name: policy.name,
          tenant_slug: tenantSlug,
          approval_type: 'auto_sickness',
          calendar_days: calendarDays,
        },
      }),
      'analytics.leave-approved',
    )
  }

  revalidatePath(`/t/${tenantSlug}/leave`)

  // Notify managers/admins of new leave request. Wrapped in fireAndForget()
  // so the background work survives the Workers request boundary (previously
  // the promise was GC'd mid-flight on Cloudflare) while still returning the
  // response promptly to the caller.
  const dates = `${formatLocalDayGB(startDate)} – ${formatLocalDayGB(endDate)}`
  const empName = `${emp.firstName} ${emp.lastName}`
  const policyName = policy?.name || 'Leave'
  const leaveReviewUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${lr.id}`
  fireAndForget(
    (async () => {
      const managers = await prisma.membership.findMany({
        where: {
          tenantId: tenant.id,
          role: { in: ['OWNER', 'ADMIN', 'MANAGER'] },
          // Don't notify the actor about their own action
          userId: { not: user.userId },
        },
        include: { user: true },
      })

      const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
      const { shouldSendEmail } = await import('@/lib/email-preferences')

      // Filter to managers who still have an ACTIVE employee record in this
      // tenant. Otherwise we nag terminated staff who are no longer in scope.
      const activeEmpByUser = new Map<string, boolean>()
      const activeEmps = await prisma.employee.findMany({
        where: {
          tenantId: tenant.id,
          status: 'ACTIVE',
          userId: { in: managers.map((m) => m.userId) },
        },
        select: { userId: true },
      })
      for (const e of activeEmps) if (e.userId) activeEmpByUser.set(e.userId, true)

      for (const m of managers) {
        // OWNER/ADMIN are account holders who may not have an Employee
        // record — don't silently skip them, or they won't receive
        // leave request emails. Only MANAGER is filtered on active-
        // employee status so we don't nag terminated staff.
        if (m.role === 'MANAGER' && !activeEmpByUser.get(m.userId)) continue
        if (m.user.email && !isSickPolicy) {
          // Sickness is recorded immediately — no review needed, so skip the
          // "please review" email entirely. The notification below is enough.
          const canSend = await shouldSendEmail(m.userId, 'leaveUpdates').catch((err) => {
            captureServerError(err, { where: 'leave.notification' })
            return false
          })
          if (canSend) {
            await sendNewLeaveRequestEmail(m.user.email!, m.user.name || 'Manager', empName, dates, policyName, leaveReviewUrl).catch((err) => {
              console.error('[leave] notification error:', err)
              captureServerError(err, { where: 'leave.notification' })
            })
          }
        }
        await createNotification(
          tenant.id, m.userId,
          isSickPolicy ? 'sickness_reported' : 'leave_submitted',
          isSickPolicy ? 'Sickness reported' : 'New leave request',
          isSickPolicy
            ? `${empName} reported sickness for ${dates}${fitNoteRequired ? ' (fit note required)' : ''}`
            : `${empName} submitted a ${policyName} request for ${dates}`,
          `/t/${tenantSlug}/leave/${lr.id}`
        ).catch((err) => {
          console.error('[leave] notification error:', err)
          captureServerError(err, { where: 'leave.notification' })
        })
      }
    })(),
    'leave.create-notifications',
  )

  // Push fan-out. excludeUserId keeps the submitter from receiving their own
  // alert (previously a manager who submitted leave for themselves would get
  // buzzed on their own phone).
  fireAndForget(
    (async () => {
      const { sendPushToTenantManagers } = await import('@/lib/web-push')
      await sendPushToTenantManagers(
        tenant.id,
        `New leave request from ${empName}`,
        `${empName} submitted a ${policyName} request for ${dates}`,
        `/t/${tenantSlug}/leave`,
        { excludeUserId: user.userId },
      )
    })(),
    'leave.create-push',
  )

    return { id: lr.id }
  })
}

export async function approveLeaveRequest(tenantSlug: string, leaveId: string): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id, status: 'PENDING' },
    include: { employee: { select: { leaveYearStartMonth: true, managerId: true } } },
  })
  if (!lr) throw new UserError('Leave request not found or already decided')

  // For non-admin managers, verify they are the direct manager or an active delegate
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!myEmp) throw new UserError('No employee record found')
    const isDirectManager = lr.employee.managerId === myEmp.id
    if (!isDirectManager) {
      // If employee has no manager, only ADMIN+ can approve
      if (!lr.employee.managerId) {
        throw new UserError('This employee has no assigned manager. An admin must approve.')
      }
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: lr.employee.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      if (!delegation) throw new UserError('You do not have permission to approve this leave request')
    }
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)

  // Atomic update: only approve if still PENDING (prevents race condition)
  const updated = await prisma.leaveRequest.updateMany({
    where: { id: leaveId, status: 'PENDING' },
    data: { status: 'APPROVED', decidedBy: user.userId, decidedAt: new Date() },
  })
  if (updated.count === 0) {
    throw new UserError('This leave request has already been decided')
  }

  // Move pending → used
  await approveBalance(tenant.id, lr.employeeId, lr.policyId, lr.startDate, lr.endDate, effectiveStartMonth, lr.halfDayStart, lr.halfDayEnd)

  await logAudit({
    action: 'leave_request.approved',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
  })
  fireAndForget(
    recordTrialMilestone(tenant.id, tenantSlug, user.userId, 'first_approval', 'leave-request-approve'),
    'trial-milestone.first-approval',
  )
  fireAndForget(
    trackServerEvent('leave_approved', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        leave_request_id: leaveId,
        employee_id: lr.employeeId,
        policy_id: lr.policyId,
        tenant_slug: tenantSlug,
        approval_type: 'manager',
      },
    }),
    'analytics.leave-approved',
  )

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
  // Approving leave affects the dashboard "Who's off today" tile + the
  // calendar view as soon as today is inside the approved range. Bust
  // both so the UI doesn't lag until the next hard reload.
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/leave/calendar`)

  // Notify employee of approval. Wrapped in fireAndForget() so the background
  // send survives the Workers request boundary — previously a raw
  // .then().catch() here could be GC'd mid-flight on Cloudflare, silently
  // dropping the approval email to the employee. Same bug η fixed for
  // extend/cancel/sickness; approve was missed at the time.
  fireAndForget(
    (async () => {
      const emp = await prisma.employee.findFirst({
        where: { id: lr.employeeId, tenantId: tenant.id, status: 'ACTIVE' },
      })
      if (!emp) return
      const policy = await prisma.leavePolicy.findFirst({ where: { id: lr.policyId, tenantId: tenant.id } })
      const dates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
      const policyName = policy?.name || 'Leave'
      if (emp.email && emp.userId) {
        const { shouldSendEmail } = await import('@/lib/email-preferences')
        const canSend = await shouldSendEmail(emp.userId, 'leaveUpdates').catch(() => false)
        if (canSend) {
          const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${leaveId}`
          await sendLeaveApprovedEmail(
            emp.email,
            `${emp.firstName} ${emp.lastName}`,
            dates,
            policyName,
            leaveUrl,
          ).catch((err) => {
            console.error('[leave] approve email error:', err)
            captureServerError(err, { where: 'leave.approve-email' })
          })
        }
      }
      if (emp.userId) {
        const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
        await createNotification(
          tenant.id, emp.userId, 'leave_approved',
          'Leave approved',
          `Your ${policyName} request for ${dates} has been approved`,
          `/t/${tenantSlug}/leave`,
        ).catch((err) => {
          console.error('[leave] approve notification error:', err)
          captureServerError(err, { where: 'leave.approve-notification' })
        })
      }
    })(),
    'leave.approve-notify',
  )

  })
}

export async function rejectLeaveRequest(
  tenantSlug: string,
  leaveId: string,
  reason?: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id, status: 'PENDING' },
    include: { employee: { select: { leaveYearStartMonth: true, managerId: true } } },
  })
  if (!lr) throw new UserError('Leave request not found or already decided')

  // For non-admin managers, verify they are the direct manager or an active delegate
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!myEmp) throw new UserError('No employee record found')
    const isDirectManager = lr.employee.managerId === myEmp.id
    if (!isDirectManager) {
      if (!lr.employee.managerId) {
        throw new UserError('This employee has no assigned manager. An admin must reject.')
      }
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: lr.employee.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      if (!delegation) throw new UserError('You do not have permission to reject this leave request')
    }
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)

  // Atomic update: only reject if still PENDING (prevents race condition)
  const updated = await prisma.leaveRequest.updateMany({
    where: { id: leaveId, status: 'PENDING' },
    data: { status: 'REJECTED', decidedBy: user.userId, decidedAt: new Date(), declineReason: reason || null },
  })
  if (updated.count === 0) {
    throw new UserError('This leave request has already been decided')
  }

  // Remove pending
  await rejectBalance(tenant.id, lr.employeeId, lr.policyId, lr.startDate, lr.endDate, effectiveStartMonth, lr.halfDayStart, lr.halfDayEnd)

  await logAudit({
    action: 'leave_request.rejected',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
  // Rejecting removes a pending block from the calendar and updates the
  // dashboard "Pending approvals" KPI. Bust both so the UI doesn't lag.
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/leave/calendar`)

  // Notify employee of rejection via fireAndForget() — same Workers
  // request-boundary fix as approveLeaveRequest. Raw .then() used to drop.
  fireAndForget(
    (async () => {
      const emp = await prisma.employee.findFirst({
        where: { id: lr.employeeId, tenantId: tenant.id, status: 'ACTIVE' },
      })
      if (!emp) return
      const policy = await prisma.leavePolicy.findFirst({ where: { id: lr.policyId, tenantId: tenant.id } })
      const dates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
      const policyName = policy?.name || 'Leave'
      if (emp.email && emp.userId) {
        const { shouldSendEmail } = await import('@/lib/email-preferences')
        const canSend = await shouldSendEmail(emp.userId, 'leaveUpdates').catch(() => false)
        if (canSend) {
          const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${leaveId}`
          await sendLeaveRejectedEmail(
            emp.email,
            `${emp.firstName} ${emp.lastName}`,
            dates,
            policyName,
            reason,
            leaveUrl,
          ).catch((err) => {
            console.error('[leave] reject email error:', err)
            captureServerError(err, { where: 'leave.reject-email' })
          })
        }
      }
      if (emp.userId) {
        const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
        await createNotification(
          tenant.id, emp.userId, 'leave_rejected',
          'Leave declined',
          `Your ${policyName} request for ${dates} has been declined${reason ? `: ${reason}` : ''}`,
          `/t/${tenantSlug}/leave`,
        ).catch((err) => {
          console.error('[leave] reject notification error:', err)
          captureServerError(err, { where: 'leave.reject-notification' })
        })
      }
    })(),
    'leave.reject-notify',
  )

  })
}

export async function cancelLeaveRequest(
  tenantSlug: string,
  leaveId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id, status: { in: ['PENDING', 'APPROVED'] } },
    include: { employee: { select: { id: true, leaveYearStartMonth: true, userId: true, firstName: true, lastName: true } } },
  })
  if (!lr) throw new UserError('Leave request not found or cannot be cancelled')

  // Allow if user is the employee who owns the request, or a manager/admin/owner.
  // Plain MANAGERs are still bound to their direct-report / delegation scope —
  // without this gate any MANAGER could cancel any tenant employee's leave.
  // (Codex round 4 #4.)
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')
  const isAdminOrAbove = isAtLeast(membership, 'ADMIN')
  if (!isManagerOrAbove) {
    if (!lr.employee.userId || lr.employee.userId !== user.userId) {
      throw new UserError('You can only cancel your own leave requests')
    }
  } else if (!isAdminOrAbove) {
    const canManageCancel = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      lr.employeeId,
    )
    if (!canManageCancel) {
      throw new UserError('You can only cancel leave for your direct reports')
    }
  }
  // Enforce preventLeaveCancellation for approved leave. Previously this was
  // skipped entirely for managers, defeating the purpose of the lock — only
  // ADMIN+ should be able to override the tenant's "approved leave is final"
  // policy. Plain MANAGERs are still bound by it.
  if (
    tenant.preventLeaveCancellation &&
    lr.status === 'APPROVED' &&
    !isAdminOrAbove
  ) {
    throw new UserError(
      isManagerOrAbove
        ? 'Approved leave cannot be cancelled (locked by tenant policy). Ask an admin to override.'
        : 'Employees cannot cancel approved leave. Please contact your manager.'
    )
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)
  const previousStatus = lr.status as 'APPROVED' | 'PENDING'

  // Atomic update: only cancel if still in the same status we read. Prevents
  // a race where two cancel actions both pass the findFirst check above and
  // each call cancelBalance, double-debiting the balance.
  const updated = await prisma.leaveRequest.updateMany({
    where: { id: leaveId, status: previousStatus },
    data: { status: 'CANCELLED', decidedBy: user.userId, decidedAt: new Date() },
  })
  if (updated.count === 0) {
    throw new UserError('This leave request has already been cancelled or its status changed')
  }

  // Reverse balance changes based on previous status
  await cancelBalance(
    tenant.id, lr.employeeId, lr.policyId,
    lr.startDate, lr.endDate, effectiveStartMonth,
    lr.halfDayStart, lr.halfDayEnd, previousStatus
  )

  await logAudit({
    action: 'leave_request.cancelled',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
  // Cancelling a leave that's happening today removes the employee from
  // the dashboard "Who's off today" tile and clears their calendar block.
  // Bust both so the UI doesn't lag until the next hard reload.
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/leave/calendar`)

  // Notify managers + (if applicable) the affected employee.
  fireAndForget(
    (async () => {
      const emp = await prisma.employee.findFirst({ where: { id: lr.employeeId, tenantId: tenant.id } })
      if (!emp) return
      const policy = await prisma.leavePolicy.findFirst({ where: { id: lr.policyId, tenantId: tenant.id } })
      const dates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
      const empName = `${emp.firstName} ${emp.lastName}`
      const policyName = policy?.name || 'Leave'

      const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
      const { shouldSendEmail } = await import('@/lib/email-preferences')

      // Email the employee whose leave was cancelled — but only if someone
      // ELSE cancelled it. If the employee cancelled it themselves they
      // obviously know, and a self-notification would be noise.
      const cancelledByOther = emp.userId && emp.userId !== user.userId
      if (cancelledByOther && emp.email && emp.userId && emp.status === 'ACTIVE') {
        const canSend = await shouldSendEmail(emp.userId, 'leaveUpdates')
        if (canSend) {
          const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${leaveId}`
          const cancellerName = user.name || user.email || 'A manager'
          await sendLeaveCancelledEmail(
            emp.email,
            empName,
            dates,
            policyName,
            cancellerName,
            leaveUrl,
          ).catch((err) => {
            console.error('[leave] cancel email error:', err)
            captureServerError(err, { where: 'leave.cancel.employee-email' })
          })
        }
        await createNotification(
          tenant.id, emp.userId, 'leave_cancelled',
          'Leave cancelled',
          `Your ${policyName} request for ${dates} was cancelled by ${user.name || 'a manager'}`,
          `/t/${tenantSlug}/leave/${leaveId}`,
        ).catch((err) => {
          console.error('[leave] cancel notification error:', err)
          captureServerError(err, { where: 'leave.cancel.employee-notification' })
        })
      }

      // Manager fan-out. Filter to managers who still have an ACTIVE
      // employee record in this tenant so we don't nag ex-staff whose
      // memberships weren't cleaned up.
      const managers = await prisma.membership.findMany({
        where: {
          tenantId: tenant.id,
          role: { in: ['OWNER', 'ADMIN', 'MANAGER'] },
          // Don't notify the user who cancelled
          userId: { not: user.userId },
        },
        include: { user: true },
      })
      const activeEmps = await prisma.employee.findMany({
        where: {
          tenantId: tenant.id,
          status: 'ACTIVE',
          userId: { in: managers.map((m) => m.userId) },
        },
        select: { userId: true },
      })
      const activeByUser = new Set<string>()
      for (const e of activeEmps) if (e.userId) activeByUser.add(e.userId)

      for (const m of managers) {
        if (!activeByUser.has(m.userId)) continue
        await createNotification(
          tenant.id, m.userId, 'leave_cancelled',
          'Leave cancelled',
          `${empName} cancelled their ${policyName} request for ${dates}`,
          `/t/${tenantSlug}/leave`,
        ).catch((err) => {
          console.error('[leave] notification error:', err)
          captureServerError(err, { where: 'leave.notification' })
        })
      }
    })(),
    'leave.cancel-notify',
  )

  })
}

export async function getLeaveCalendarData(tenantSlug: string, year: number, month: number) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  fireAndForget(
    recordTrialMilestone(tenant.id, tenantSlug, user.userId, 'calendar_view', 'leave-calendar-page'),
    'trial-milestone.calendar-view',
  )

  const startOfMonth = new Date(year, month - 1, 1)
  const endOfMonth = new Date(year, month, 0, 23, 59, 59)

  // Build employee visibility filter. ADMIN+ see everything. Plain MANAGER /
  // EMPLOYEE respect `tenant.hideEmployeeList` — when that's on, they should
  // only see their own leave + their direct reports. Otherwise the calendar
  // endpoint is a back-door around the privacy setting.
  //
  // Include PENDING requests too — the calendar legend advertises a Pending
  // colour, and planners need visibility into not-yet-approved requests when
  // working out who's around.
  const calendarWhere: Record<string, unknown> = {
    tenantId: tenant.id,
    status: { in: ['APPROVED', 'PENDING'] },
    OR: [
      { startDate: { lte: endOfMonth }, endDate: { gte: startOfMonth } },
    ],
  }

  if (tenant.hideEmployeeList && !isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    const visibleIds: string[] = []
    if (myEmp) visibleIds.push(myEmp.id)
    if (isAtLeast(membership, 'MANAGER')) {
      const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
      if (reportIds) visibleIds.push(...reportIds)
    }
    calendarWhere.employeeId = { in: visibleIds }
  }

  const requests = await prisma.leaveRequest.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: calendarWhere as any,
    include: { employee: true, policy: true },
  })

  // Fetch public holidays for this month
  const publicHolidays = await prisma.publicHoliday.findMany({
    where: {
      tenantId: tenant.id,
      date: { gte: startOfMonth, lte: endOfMonth },
    },
  })

  // Also fetch company leave blocks for this month
  const companyLeaves = await prisma.companyLeave.findMany({
    where: {
      tenantId: tenant.id,
      OR: [
        { startDate: { lte: endOfMonth }, endDate: { gte: startOfMonth } },
      ],
    },
  })

  return {
    leaveRequests: requests.map((r) => ({
      id: r.id,
      employeeName: `${r.employee.firstName} ${r.employee.lastName}`,
      department: r.employee.department || null,
      policyName: r.policy.name,
      // Surface the canonical system-type flag so the calendar can colour
      // sickness reliably (issue #47) without relying on name matching that
      // breaks for tenants who renamed their sickness policy.
      isSystemType: r.policy.isSystemType,
      // Include request status so the UI can render PENDING in amber to
      // match the legend (issue #48).
      status: r.status,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
    })),
    companyLeaves: companyLeaves.map((c) => ({
      id: c.id,
      name: c.name,
      startDate: c.startDate.toISOString(),
      endDate: c.endDate.toISOString(),
    })),
    publicHolidays: publicHolidays.map((h) => ({
      id: h.id,
      name: h.name,
      // Canonical YYYY-MM-DD day key, not a raw ISO timestamp. BST-stored
      // holidays sit at UTC 23:00 of the PREVIOUS day, so the client's
      // string-compare (`ph.date.split('T')[0]`) matched the wrong cell
      // and painted/hid the bank holiday one day off.
      date: toLocalDayKey(h.date),
    })),
  }
}

type TrialMilestoneKey = 'first_leave_request' | 'first_approval' | 'calendar_view'

async function recordTrialMilestone(
  tenantId: string,
  tenantSlug: string,
  userId: string,
  milestone: TrialMilestoneKey,
  source: string,
): Promise<void> {
  const billing = await prisma.tenantBilling.findUnique({
    where: { tenantId },
    select: { status: true, trialEndsAt: true },
  })
  if (billing?.status !== 'TRIALING') return
  if (billing.trialEndsAt && billing.trialEndsAt < new Date()) return

  const action = `trial_milestone.${milestone}`
  const existing = await prisma.auditLog.findFirst({
    where: { tenantId, action },
    select: { id: true },
  })
  if (existing) return

  const now = new Date()
  await prisma.auditLog.create({
    data: {
      action,
      entity: 'Tenant',
      entityId: tenantId,
      tenantId,
      userId,
      metadata: {
        milestone,
        occurredAt: now.toISOString(),
        source,
      },
    },
  })
  await trackServerEvent('trial_milestone_completed', {
    distinctId: userId,
    tenantId,
    userId,
    properties: {
      tenant_slug: tenantSlug,
      milestone,
      occurred_at: now.toISOString(),
      source,
    },
  })
}

export async function getFormOptions(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const [allEmployees, allPolicies] = await Promise.all([
    prisma.employee.findMany({
      where: { tenantId: tenant.id, status: 'ACTIVE' },
      select: { id: true, firstName: true, lastName: true, hoursPerDay: true, userId: true },
      orderBy: { lastName: 'asc' },
    }),
    prisma.leavePolicy.findMany({
      where: { tenantId: tenant.id },
      select: { id: true, name: true, allowHalfDay: true, unit: true, isSystemType: true },
      orderBy: { name: 'asc' },
    }),
  ])

  // Hide sickness and lateness policies — they have dedicated forms
  // (/leave/report-sickness and the lateness dialog) with the right
  // auto-approval / fit-note UX. A customer test failed because they
  // picked sickness from this dropdown instead of using the dedicated
  // form, and the page silently swallowed the submission.
  const policies = allPolicies
    .filter((p) => !p.isSystemType)
    .map(({ isSystemType: _s, ...rest }) => rest)

  // Non-managers can only book for themselves
  // Managers (not ADMIN/OWNER) can only book for their direct reports + themselves
  let employees: typeof allEmployees
  if (!canManage) {
    employees = allEmployees.filter(e => e.userId === user.userId)
  } else if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      employees = allEmployees.filter(e => reportIds.includes(e.id) || e.userId === user.userId)
    } else {
      employees = allEmployees
    }
  } else {
    employees = allEmployees
  }
  const mappedEmployees = employees.map(({ userId: _u, ...rest }) => rest)

  return { employees: mappedEmployees, policies }
}

export async function getLeaveRequestsForExport(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { tenantId: tenant.id }

  // Managers (not ADMIN/OWNER) can only export their direct reports' leave
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      where.employeeId = { in: visibleIds }
    }
  }

  const requests = await prisma.leaveRequest.findMany({
    where,
    include: { employee: true, policy: true },
    orderBy: { createdAt: 'desc' },
  })

  return requests.map(r => ({
    employee: `${r.employee.firstName} ${r.employee.lastName}`,
    policy: r.policy.name,
    // (#199) toLocalDayKey handles the BST/GMT storage asymmetry that
    // raw toISOString().split() got wrong.
    startDate: toLocalDayKey(r.startDate),
    endDate: toLocalDayKey(r.endDate),
    status: r.status,
    reason: r.reason || '',
  }))
}

export async function updateFitNote(
  tenantSlug: string,
  leaveId: string,
  fitNoteUrl: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id },
    include: { employee: true },
  })
  if (!lr) throw new UserError('Leave request not found')

  // Scope guard. ADMIN+ → any. MANAGER → only direct reports / delegates.
  // EMPLOYEE → only their own. Without this gate any plain MANAGER could
  // overwrite the fit-note URL on any sickness request tenant-wide, which
  // is sensitive medical-document metadata. (Codex round 4 #3.)
  const allowed = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    lr.employeeId,
  )
  if (!allowed) {
    throw new UserError('You do not have permission to update this fit note')
  }

  // Validate the URL — only http(s) links are allowed. The rendered
  // <a href={fitNoteUrl}> would otherwise execute `javascript:` URIs as
  // stored XSS for whichever manager clicks "View fit note".
  let parsedUrl: URL
  try {
    parsedUrl = new URL(fitNoteUrl)
  } catch {
    throw new UserError('Fit note URL is not a valid URL')
  }
  if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
    throw new UserError('Fit note URL must be an http(s) link')
  }

  await prisma.leaveRequest.update({
    where: { id: leaveId },
    data: { fitNoteUrl },
  })

  await logAudit({
    action: 'leave_request.fit_note_uploaded',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { fitNoteUrl },
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)

  })
}

export async function extendLeaveRequest(
  tenantSlug: string,
  leaveId: string,
  newEndDate: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id, status: 'APPROVED' },
    include: { employee: { select: { id: true, leaveYearStartMonth: true } }, policy: true },
  })
  if (!lr) throw new UserError('Leave request not found or not in APPROVED status')

  // Scope guard — same pattern as approveLeaveRequest. Without this any
  // MANAGER could extend any other employee's approved leave tenant-wide.
  // (Codex round 4 #4.)
  const canManage = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    lr.employeeId,
  )
  if (!canManage) {
    throw new UserError('You do not have permission to extend this leave request')
  }

  const parsedNewEnd = new Date(newEndDate)
  if (Number.isNaN(parsedNewEnd.getTime())) {
    throw new UserError('Please choose a valid date.')
  }
  if (parsedNewEnd <= lr.endDate) {
    // Show the existing end date in the message so the user knows what
    // they're extending FROM. Without this, "must be after the current end
    // date" leaves them guessing whether the leave is currently a single
    // day or a multi-day block — which is exactly what tripped up the
    // "extend an employee's sickness through tomorrow" demo.
    const current = formatLocalDayGB(lr.endDate)
    throw new UserError(
      `This leave currently ends on ${current}. To extend it, pick a date after ${current}. (Use "Edit dates" if you need to move the leave to a completely different range.)`
    )
  }

  // Check the extension doesn't retro-clash with another leave. Without this
  // guard, extending Alice's Apr 1-5 leave to Apr 1-11 when Alice has
  // ANOTHER approved leave on Apr 10-12 silently double-books. Skip the
  // leave being extended itself.
  const extensionClash = await prisma.leaveRequest.findFirst({
    where: {
      tenantId: tenant.id,
      employeeId: lr.employeeId,
      id: { not: leaveId },
      status: { in: ['PENDING', 'APPROVED'] },
      startDate: { lte: parsedNewEnd },
      endDate: { gte: lr.startDate },
    },
    select: { startDate: true, endDate: true },
  })
  if (extensionClash) {
    const s = formatLocalDayGB(extensionClash.startDate)
    const e = formatLocalDayGB(extensionClash.endDate)
    throw new UserError(
      `The extension overlaps with another leave request for this employee (${s} – ${e}).`
    )
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)

  // Calculate the additional days from the day after the old end date to the
  // new end date. Use millisecond arithmetic rather than
  // `setDate(getDate()+1)` — the latter runs in the server's local TZ and
  // loses/gains an hour across DST boundaries (last Sunday of March / October
  // in the UK), which can push the extra-range by one full day when the
  // stored endDate is at 23:00Z.
  const dayAfterOldEnd = new Date(lr.endDate.getTime() + 24 * 60 * 60 * 1000)
    const additionalAmount = await calculateLeaveAmount(
    tenant.id, dayAfterOldEnd, parsedNewEnd, lr.policyId, false, false, lr.employeeId
  )

  // (#196) Sickness is "unlimited" — no fixed allowance, so no balance
  // gate. Use the structural isSystemType flag, NOT a substring of the
  // policy name. A tenant renaming "Sick leave" to "Illness" used to
  // silently break this branch.
  const isSickPolicy = lr.policy.isSystemType === 'sickness'

  // Balance sufficiency check (skip for sickness). The extension may straddle a
  // leave-year boundary, so check the year(s) the new days actually fall in
  // rather than guessing from one date.
  if (additionalAmount > 0 && !isSickPolicy) {
    const { splitDateRangeByLeaveYear } = await import('@/lib/leave-year')
    const segments = splitDateRangeByLeaveYear(dayAfterOldEnd, parsedNewEnd, effectiveStartMonth)
    for (const seg of segments) {
      await ensureBalances(tenant.id, lr.employeeId, seg.year, effectiveStartMonth)
      const segAmount = await calculateLeaveAmount(
        tenant.id, seg.start, seg.end, lr.policyId, false, false, lr.employeeId
      )
      if (segAmount <= 0) continue
      const balance = await prisma.leaveBalance.findUnique({
        where: { employeeId_policyId_year: { employeeId: lr.employeeId, policyId: lr.policyId, year: seg.year } },
      })
      if (balance) {
        const remaining = balance.allowance - balance.used - balance.pending
        if (segAmount > remaining) {
          // Use the policy unit (days/hours) in the message — was previously
          // hardcoded to 'days' which lied about hours-based policies.
          const unit = lr.policy.unit === 'hours' ? 'hours' : 'days'
          throw new UserError(
            `Insufficient balance for the ${seg.year} leave year. ${remaining} ${unit} remaining but extension needs ${segAmount} more ${unit} in that year.`
          )
        }
      }
    }
  }

  // Re-check fit note requirement based on new total calendar days. (#197)
  const calendarDays = calendarDaysBetween(lr.startDate, parsedNewEnd)
  const fitNoteRequired = isSickPolicy && calendarDays > 7

  // Atomic update: only extend if still APPROVED. Without this guard, a
  // concurrent cancel between findFirst and update would silently re-extend
  // a cancelled request and corrupt the balance.
  const updated = await prisma.leaveRequest.updateMany({
    where: { id: leaveId, status: 'APPROVED' },
    data: { endDate: parsedNewEnd, fitNoteRequired },
  })
  if (updated.count === 0) {
    throw new UserError('This leave request was changed by someone else. Reload and try again.')
  }

  // Increment used balance for the extra days. addUsedToBalance now splits per
  // leave year, so cross-year extensions debit the right buckets automatically.
  if (additionalAmount > 0) {
    await addUsedToBalance(
      tenant.id, lr.employeeId, lr.policyId,
      dayAfterOldEnd, parsedNewEnd, effectiveStartMonth
    )
  }

  await logAudit({
    action: 'leave_request.extended',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { previousEndDate: lr.endDate.toISOString(), newEndDate: parsedNewEnd.toISOString() },
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
  // Extension moves people's dates around — the dashboard "off today" tile
  // and the calendar both cache the old range, so they need busting too.
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/leave/calendar`)

  // Notify the affected employee. Previously this was silent — the manager
  // extended the leave and the employee only found out next time they
  // logged in. Mirrors approveLeaveRequest's notify-employee pattern.
  const previousDates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
  const newDatesStr = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(parsedNewEnd)}`
  const policyName = lr.policy.name
  fireAndForget(
    (async () => {
      const targetEmp = await prisma.employee.findFirst({
        where: { id: lr.employeeId, tenantId: tenant.id, status: 'ACTIVE' },
      })
      if (!targetEmp) return
      const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
      if (targetEmp.email && targetEmp.userId) {
        const { shouldSendEmail } = await import('@/lib/email-preferences')
        const canSend = await shouldSendEmail(targetEmp.userId, 'leaveUpdates')
        if (canSend) {
          const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${leaveId}`
          await sendLeaveExtendedEmail(
            targetEmp.email,
            `${targetEmp.firstName} ${targetEmp.lastName}`,
            previousDates,
            newDatesStr,
            policyName,
            leaveUrl,
          )
        }
      }
      if (targetEmp.userId) {
        await createNotification(
          tenant.id, targetEmp.userId, 'leave_extended',
          'Leave extended',
          `Your ${policyName} leave has been extended to ${newDatesStr}`,
          `/t/${tenantSlug}/leave/${leaveId}`,
        )
      }
    })(),
    'leave.extend-notify',
  )

  })
}

export async function editLeaveRequestDates(
  tenantSlug: string,
  leaveId: string,
  newStartDate: string,
  newEndDate: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const lr = await prisma.leaveRequest.findFirst({
    where: { id: leaveId, tenantId: tenant.id, status: { in: ['PENDING', 'APPROVED'] } },
    include: { employee: { select: { id: true, leaveYearStartMonth: true } }, policy: true },
  })
  if (!lr) throw new UserError('Leave request not found or not in PENDING/APPROVED status')

  // Scope guard — see extendLeaveRequest above. Without this any MANAGER
  // could rewrite any other employee's leave dates tenant-wide. (Codex
  // round 4 #4.)
  const canManageEdit = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    lr.employeeId,
  )
  if (!canManageEdit) {
    throw new UserError('You do not have permission to edit this leave request')
  }

  const parsedNewStart = new Date(newStartDate)
  const parsedNewEnd = new Date(newEndDate)

  if (parsedNewEnd < parsedNewStart) throw new UserError('End date cannot be before start date')

  // Check the NEW range doesn't overlap with another pending/approved leave
  // request for the same employee. Without this guard, a manager editing
  // Alice's leave from Apr 1-5 to Apr 10-12 when Alice has ANOTHER approved
  // leave on Apr 11-14 silently creates a double-booking — balance debits
  // twice for Apr 11-12 and the calendar shows overlapping blocks. Skip the
  // leave being edited (obviously — it's allowed to overlap with itself).
  const overlapping = await prisma.leaveRequest.findFirst({
    where: {
      tenantId: tenant.id,
      employeeId: lr.employeeId,
      id: { not: leaveId },
      status: { in: ['PENDING', 'APPROVED'] },
      startDate: { lte: parsedNewEnd },
      endDate: { gte: parsedNewStart },
    },
    select: { startDate: true, endDate: true },
  })
  if (overlapping) {
    const s = formatLocalDayGB(overlapping.startDate)
    const e = formatLocalDayGB(overlapping.endDate)
    throw new UserError(
      `The new dates overlap with another leave request for this employee (${s} – ${e}).`
    )
  }

  const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)

  // Calculate old and new business day amounts (for the audit log + sufficiency check)
    const oldAmount = await calculateLeaveAmount(
    tenant.id, lr.startDate, lr.endDate, lr.policyId, lr.halfDayStart, lr.halfDayEnd, lr.employeeId
  )
  const newAmount = await calculateLeaveAmount(
    tenant.id, parsedNewStart, parsedNewEnd, lr.policyId, lr.halfDayStart, lr.halfDayEnd, lr.employeeId
  )

  // (#196) Sickness is unlimited — use isSystemType only.
  const isSickPolicy = lr.policy.isSystemType === 'sickness'

  // Balance sufficiency check (skip for sickness). The new range may straddle a
  // leave-year boundary, so check each year separately. We do this BEFORE we
  // touch any balances, so a failed check leaves state untouched.
  if (!isSickPolicy && newAmount > 0) {
    const { splitDateRangeByLeaveYear } = await import('@/lib/leave-year')
    // Per-year debit that the OLD request has already booked, so we can subtract it
    // before checking what's free in each year.
    const oldSegments = splitDateRangeByLeaveYear(lr.startDate, lr.endDate, effectiveStartMonth)
    const oldByYear = new Map<number, number>()
    for (let i = 0; i < oldSegments.length; i++) {
      const seg = oldSegments[i]
      const isFirst = i === 0
      const isLast = i === oldSegments.length - 1
      const segAmount = await calculateLeaveAmount(
        tenant.id, seg.start, seg.end, lr.policyId,
        isFirst ? lr.halfDayStart : false,
        isLast ? lr.halfDayEnd : false,
        lr.employeeId
      )
      oldByYear.set(seg.year, (oldByYear.get(seg.year) ?? 0) + segAmount)
    }

    const newSegments = splitDateRangeByLeaveYear(parsedNewStart, parsedNewEnd, effectiveStartMonth)
    for (let i = 0; i < newSegments.length; i++) {
      const seg = newSegments[i]
      const isFirst = i === 0
      const isLast = i === newSegments.length - 1
      const segNewAmount = await calculateLeaveAmount(
        tenant.id, seg.start, seg.end, lr.policyId,
        isFirst ? lr.halfDayStart : false,
        isLast ? lr.halfDayEnd : false,
        lr.employeeId
      )
      const segDelta = segNewAmount - (oldByYear.get(seg.year) ?? 0)
      if (segDelta <= 0) continue
      await ensureBalances(tenant.id, lr.employeeId, seg.year, effectiveStartMonth)
      const balance = await prisma.leaveBalance.findUnique({
        where: { employeeId_policyId_year: { employeeId: lr.employeeId, policyId: lr.policyId, year: seg.year } },
      })
      if (balance) {
        const remaining = balance.allowance - balance.used - balance.pending
        if (segDelta > remaining) {
          // Hours-aware unit label, was previously hardcoded to 'days'.
          const unit = lr.policy.unit === 'hours' ? 'hours' : 'days'
          throw new UserError(
            `Insufficient balance for the ${seg.year} leave year. ${remaining} ${unit} remaining but date change needs ${segDelta} more ${unit} in that year.`
          )
        }
      }
    }
  }

  // Re-check fit note requirement based on new total calendar days. (#197)
  const calendarDays = calendarDaysBetween(parsedNewStart, parsedNewEnd)
  const fitNoteRequired = isSickPolicy && calendarDays > 7

  // Atomic update: only proceed if the request is still in the SAME status
  // we read at the top. Without this guard, a concurrent approve/reject/
  // cancel between findFirst and update would silently succeed and leave the
  // balance double-debited or stuck pointing at the wrong status.
  const previousStatus = lr.status as 'PENDING' | 'APPROVED'
  const updated = await prisma.leaveRequest.updateMany({
    where: { id: leaveId, status: previousStatus },
    data: { startDate: parsedNewStart, endDate: parsedNewEnd, fitNoteRequired },
  })
  if (updated.count === 0) {
    throw new UserError('This leave request was changed by someone else. Reload and try again.')
  }

  // Adjust balance: revert the OLD range from the right year(s), then apply
  // the NEW range to the right year(s). cancelBalance/addUsedToBalance/
  // addPendingToBalance now split per year automatically.
  if (lr.status === 'APPROVED') {
    await cancelBalance(
      tenant.id, lr.employeeId, lr.policyId,
      lr.startDate, lr.endDate, effectiveStartMonth,
      lr.halfDayStart, lr.halfDayEnd, 'APPROVED'
    )
    await addUsedToBalance(
      tenant.id, lr.employeeId, lr.policyId,
      parsedNewStart, parsedNewEnd, effectiveStartMonth,
      lr.halfDayStart, lr.halfDayEnd
    )
  } else {
    await cancelBalance(
      tenant.id, lr.employeeId, lr.policyId,
      lr.startDate, lr.endDate, effectiveStartMonth,
      lr.halfDayStart, lr.halfDayEnd, 'PENDING'
    )
    await addPendingToBalance(
      tenant.id, lr.employeeId, lr.policyId,
      parsedNewStart, parsedNewEnd, effectiveStartMonth,
      lr.halfDayStart, lr.halfDayEnd
    )
  }

  await logAudit({
    action: 'leave_request.dates_edited',
    entity: 'LeaveRequest',
    entityId: leaveId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      previousStartDate: lr.startDate.toISOString(),
      previousEndDate: lr.endDate.toISOString(),
      newStartDate: parsedNewStart.toISOString(),
      newEndDate: parsedNewEnd.toISOString(),
      oldAmount,
      newAmount,
    },
  })

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
  // Moving a leave's dates changes what shows on the dashboard "off today"
  // tile and on the calendar. Bust both so users don't see stale blocks.
  revalidatePath(`/t/${tenantSlug}/dashboard`)
  revalidatePath(`/t/${tenantSlug}/leave/calendar`)

  // Notify the affected employee. Previously this was silent — the manager
  // changed Alice's approved leave dates and Alice had no idea until the
  // next time she logged in, at which point she may already have booked
  // travel on the original dates. Mirrors extendLeaveRequest's pattern.
  const previousDates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
  const newDatesStr = `${formatLocalDayGB(parsedNewStart)} \u2013 ${formatLocalDayGB(parsedNewEnd)}`
  const policyName = lr.policy.name
  fireAndForget(
    (async () => {
      const targetEmp = await prisma.employee.findFirst({
        where: { id: lr.employeeId, tenantId: tenant.id, status: 'ACTIVE' },
      })
      if (!targetEmp) return
      const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
      if (targetEmp.email && targetEmp.userId) {
        const { shouldSendEmail } = await import('@/lib/email-preferences')
        const canSend = await shouldSendEmail(targetEmp.userId, 'leaveUpdates').catch(() => false)
        if (canSend) {
          const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave/${leaveId}`
          await sendLeaveDatesUpdatedEmail(
            targetEmp.email,
            `${targetEmp.firstName} ${targetEmp.lastName}`,
            previousDates,
            newDatesStr,
            policyName,
            leaveUrl,
          ).catch((err) => {
            console.error('[leave] dates-updated email error:', err)
            captureServerError(err, { where: 'leave.dates-updated-email' })
          })
        }
      }
      if (targetEmp.userId) {
        await createNotification(
          tenant.id, targetEmp.userId, 'leave_dates_updated',
          'Leave dates updated',
          `Your ${policyName} leave dates have been updated to ${newDatesStr}`,
          `/t/${tenantSlug}/leave/${leaveId}`,
        )
      }
    })(),
    'leave.edit-dates-notify',
  )

  })
}

export async function checkLeaveClashes(
  tenantSlug: string,
  employeeId: string,
  startDate: string,
  endDate: string,
  policyId?: string
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Scope guard. The clash check leaks colleague names + dates, and even
  // when `hideEmployeeList` is on it still leaks "this person has overlapping
  // leave". Plain employees can only run the check against themselves;
  // managers must be in scope of the target. ADMIN+ can check anyone.
  // (Codex round 4 #10.)
  const allowedClash = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    employeeId,
  )
  if (!allowedClash) {
    return {
      selfOverlap: false,
      colleagueClashes: [] as { employeeName: string; policyName: string; startDate: string; endDate: string; reason: string }[],
      blackoutDates: [] as { name: string; startDate: string; endDate: string }[],
      noticeWarning: null as string | null,
    }
  }

  const start = new Date(startDate)
  const end = new Date(endDate)

  // Get the employee with the relationships we need to scope the clash search.
  // department alone misses small companies that haven't filled in departments,
  // so we also use the management hierarchy (same manager, your direct reports,
  // and your own manager) to find colleagues whose absence would matter.
  const emp = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
    select: { id: true, department: true, managerId: true },
  })
  if (!emp) return { selfOverlap: false, colleagueClashes: [], blackoutDates: [] as { name: string; startDate: string; endDate: string }[], noticeWarning: null as string | null }

  // Check self-overlap
  const selfOverlap = await prisma.leaveRequest.findFirst({
    where: {
      employeeId,
      status: { in: ['PENDING', 'APPROVED'] },
      startDate: { lte: end },
      endDate: { gte: start },
    },
  })

  // Build the union of colleague filters: same department, same manager (peers),
  // direct reports of the requestor (if they manage anyone), and the requestor's
  // own manager. We `OR` them so a small SMB without departments still gets
  // useful clash warnings via the management tree.
  // Skip entirely for EMPLOYEE role when hideEmployeeList is enabled (privacy).
  type ClashRow = { employeeName: string; policyName: string; startDate: string; endDate: string; reason: string }
  let colleagueClashes: ClashRow[] = []
  const skipClashNames = tenant.hideEmployeeList && !isAtLeast(membership, 'MANAGER')
  if (!skipClashNames) {
    const employeeFilters: Record<string, unknown>[] = []
    if (emp.department) employeeFilters.push({ department: emp.department })
    if (emp.managerId) employeeFilters.push({ managerId: emp.managerId })
    employeeFilters.push({ managerId: emp.id }) // direct reports
    if (emp.managerId) employeeFilters.push({ id: emp.managerId }) // own manager

    if (employeeFilters.length > 0) {
      const clashing = await prisma.leaveRequest.findMany({
        where: {
          tenantId: tenant.id,
          employeeId: { not: employeeId },
          status: { in: ['PENDING', 'APPROVED'] },
          startDate: { lte: end },
          endDate: { gte: start },
          employee: {
            status: 'ACTIVE',
            OR: employeeFilters,
          },
        },
        include: { employee: true, policy: true },
        orderBy: { startDate: 'asc' },
      })

      // Dedupe by leave request id (an employee may match multiple filters,
      // e.g. same department AND same manager) and pick the most informative reason.
      const seen = new Set<string>()
      colleagueClashes = clashing
        .filter((lr) => {
          if (seen.has(lr.id)) return false
          seen.add(lr.id)
          return true
        })
        .map((lr) => {
          let reason = 'Same team'
          if (emp.department && lr.employee.department === emp.department) {
            reason = `Same department (${emp.department})`
          } else if (emp.managerId && lr.employee.managerId === emp.managerId) {
            reason = 'Reports to the same manager'
          } else if (lr.employee.managerId === emp.id) {
            reason = 'Your direct report'
          } else if (emp.managerId && lr.employee.id === emp.managerId) {
            reason = 'Your manager'
          }
          return {
            employeeName: `${lr.employee.firstName} ${lr.employee.lastName}`,
            policyName: lr.policy.name,
            startDate: lr.startDate.toISOString(),
            endDate: lr.endDate.toISOString(),
            reason,
          }
        })
    }
  }

  // Check blackout dates
  const blackouts = await prisma.blackoutDate.findMany({
    where: {
      tenantId: tenant.id,
      startDate: { lte: end },
      endDate: { gte: start },
    },
    orderBy: { startDate: 'asc' },
  })
  const blackoutDates = blackouts.map((b) => ({
    name: b.name,
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
  }))

  // Check minimum notice period
  let noticeWarning: string | null = null
  if (policyId) {
    const policy = await prisma.leavePolicy.findFirst({
      where: { id: policyId, tenantId: tenant.id },
    })
    if (policy && policy.minNoticeDays > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const minDate = new Date(today)
      minDate.setDate(minDate.getDate() + policy.minNoticeDays)
      if (start < minDate) {
        noticeWarning = `This policy requires at least ${policy.minNoticeDays} days notice. The earliest start date is ${formatLocalDayGB(minDate)}.`
      }
    }
  }

  return {
    selfOverlap: !!selfOverlap,
    colleagueClashes,
    blackoutDates,
    noticeWarning,
  }
}

export async function getOutstandingFitNoteCount(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Scope to the caller's report set so a plain MANAGER doesn't see a
  // tenant-wide count that includes employees they have no visibility
  // over. ADMIN+ keeps the full tenant count. (Round 5 dashboard scope.)
  const isAdminOrAbove = isAtLeast(membership, 'ADMIN')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    tenantId: tenant.id,
    fitNoteRequired: true,
    fitNoteUrl: null,
    status: { in: ['PENDING', 'APPROVED'] },
  }
  if (!isAdminOrAbove) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      if (visibleIds.length === 0) return 0
      where.employeeId = { in: visibleIds }
    }
  }

  return prisma.leaveRequest.count({ where })
}

// --- Sickness self-reporting ---

// (#178) Description trimmed and capped at 2000 chars to match the
// client schema and stop multi-MB medical-history pastes from reaching
// the DB unbounded.
const ReportSicknessSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().trim().max(2000).optional(),
  employeeId: z.string().optional(),
})

export type ReportSicknessData = z.input<typeof ReportSicknessSchema>

export async function reportSickness(
  tenantSlug: string,
  data: ReportSicknessData
): Promise<ActionResult<{ id: string }>> {
  // Temporary: catch ALL errors so the real message surfaces instead of
  // the generic Next.js production error. Remove once the root cause is
  // identified and fixed.
  try {
  return await withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)
  const parsed = ReportSicknessSchema.parse(data)

  // Resolve target employee. If an employeeId is supplied and isn't the
  // caller's own record, the caller must be MANAGER+ AND must scope-check
  // against the target — otherwise any plain MANAGER could record sickness
  // for any unrelated tenant employee. (Codex round 4 #2.)
  let emp
  if (parsed.employeeId) {
    emp = await prisma.employee.findFirst({
      where: { id: parsed.employeeId, tenantId: tenant.id },
    })
    if (!emp) throw new UserError('Employee not found')
    if (emp.userId !== user.userId) {
      assertAtLeast(membership, 'MANAGER')
      const allowedSick = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        parsed.employeeId,
      )
      if (!allowedSick) {
        throw new UserError(
          "You can only record sickness for your own direct reports.",
        )
      }
    }
  } else {
    emp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
    })
    if (!emp) throw new UserError('No employee record found for your account')
  }

  // Auto-detect sick leave policy — prefer isSystemType, fallback to name match
  let sickPolicy = await prisma.leavePolicy.findFirst({
    where: { tenantId: tenant.id, isSystemType: 'sickness' },
  })
  if (!sickPolicy) {
    sickPolicy = await prisma.leavePolicy.findFirst({
      where: { tenantId: tenant.id, name: { contains: 'sick', mode: 'insensitive' } },
    })
    // Tag it as system type so dashboard excludes it from top absentees
    if (sickPolicy) {
      await prisma.leavePolicy.update({
        where: { id: sickPolicy.id },
        data: { isSystemType: 'sickness' },
      })
    }
  }
  if (!sickPolicy) throw new UserError('No sickness policy found. Please ask your administrator to create one.')

  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)

  if (endDate < startDate) throw new UserError('End date cannot be before start date')

  // (#197) Calculate calendar days for fit note check via the shared helper.
  const calendarDays = calendarDaysBetween(startDate, endDate)
  const fitNoteRequired = calendarDays > 7

  // Overlap check + create as sequential queries. Prisma interactive
  // transactions ($transaction(async (tx) => ...)) crash on Neon
  // serverless with "Transaction not found" because the HTTP connection
  // drops mid-transaction. Sequential queries accept a tiny race window
  // (two identical submissions at the exact same ms) but that's
  // effectively impossible in real-world usage.
  const policyId = sickPolicy.id
  const employeeId = emp.id

  const overlapping = await prisma.leaveRequest.findFirst({
    where: {
      tenantId: tenant.id,
      employeeId,
      status: { in: ['PENDING', 'APPROVED'] },
      startDate: { lte: endDate },
      endDate: { gte: startDate },
    },
    select: { id: true, startDate: true, endDate: true, policy: { select: { name: true } } },
  })
  if (overlapping) {
    const overlapStart = formatLocalDayGB(overlapping.startDate)
    const overlapEnd = formatLocalDayGB(overlapping.endDate)
    const overlapPolicy = overlapping.policy.name
    const isSelfReport = emp.userId === user.userId
    const who = isSelfReport ? 'You' : `${emp.firstName} ${emp.lastName}`
    throw new UserError(
      `${who} already ${isSelfReport ? 'have' : 'has'} ${overlapPolicy} booked from ${overlapStart} to ${overlapEnd}, which overlaps with the dates you selected. To fix this, cancel the existing ${overlapPolicy} record first, then rebook.`,
    )
  }

  // Same race guard as createLeaveRequest: the unique partial index on
  // active LeaveRequest rows catches concurrent identical submissions
  // (double-tap, retried POST) and surfaces a friendly message instead
  // of a generic 500 + a stuck `used` balance.
  let lr: { id: string }
  try {
    lr = await prisma.leaveRequest.create({
      data: {
        startDate,
        endDate,
        halfDayStart: false,
        halfDayEnd: false,
        reason: parsed.description || null,
        status: 'APPROVED',
        decidedAt: new Date(),
        reportedById: user.userId,
        fitNoteRequired,
        employeeId,
        policyId,
        tenantId: tenant.id,
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('P2002') || msg.includes('LeaveRequest_no_duplicate_active')) {
      throw new UserError(
        'This sickness was already reported — looks like a duplicate. Refresh the page to see the existing record.'
      )
    }
    throw err
  }

  // Directly increment used balance (no pending step). Use the employee's
  // override leaveYearStartMonth so staff on a custom leave year don't have
  // their sick days dumped into the wrong year's balance.
  const sickEffectiveStartMonth = getEmployeeLeaveYearStartMonth(emp, tenant)
  await addUsedToBalance(
    tenant.id, emp.id, sickPolicy.id,
    startDate, endDate, sickEffectiveStartMonth
  )

  await logAudit({
    action: 'sickness.reported',
    entity: 'LeaveRequest',
    entityId: lr.id,
    userId: user.userId,
    tenantId: tenant.id,
  })
  fireAndForget(
    trackServerEvent('leave_created', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        leave_request_id: lr.id,
        employee_id: emp.id,
        policy_id: sickPolicy.id,
        policy_name: sickPolicy.name,
        tenant_slug: tenantSlug,
        status: 'APPROVED',
        is_sickness: true,
        fit_note_required: fitNoteRequired,
        calendar_days: calendarDays,
      },
    }),
    'analytics.leave-created',
  )
  fireAndForget(
    trackServerEvent('leave_approved', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        leave_request_id: lr.id,
        employee_id: emp.id,
        policy_id: sickPolicy.id,
        policy_name: sickPolicy.name,
        tenant_slug: tenantSlug,
        approval_type: 'auto_sickness',
        calendar_days: calendarDays,
      },
    }),
    'analytics.leave-approved',
  )

  revalidatePath(`/t/${tenantSlug}/leave`)
  revalidatePath(`/t/${tenantSlug}/dashboard`)

  // Notify managers of sickness report. Wrapped in fireAndForget so the
  // background work survives the Workers request boundary. Filters managers
  // by an ACTIVE employee record in the tenant so terminated managers don't
  // get notifications after they've left.
  const empName = `${emp.firstName} ${emp.lastName}`
  const dates = `${formatLocalDayGB(startDate)} \u2013 ${formatLocalDayGB(endDate)}`
  fireAndForget(
    (async () => {
      const managers = await prisma.membership.findMany({
        where: {
          tenantId: tenant.id,
          role: { in: ['OWNER', 'ADMIN', 'MANAGER'] },
          // Don't notify the user who reported their own sickness
          userId: { not: user.userId },
        },
        include: { user: true },
      })
      const activeEmps = await prisma.employee.findMany({
        where: {
          tenantId: tenant.id,
          status: 'ACTIVE',
          userId: { in: managers.map((m) => m.userId) },
        },
        select: { userId: true },
      })
      const activeByUser = new Set<string>()
      for (const e of activeEmps) if (e.userId) activeByUser.add(e.userId)

      const { createNotification } = await import('@/app/t/[tenantSlug]/notifications/internal')
      for (const m of managers) {
        if (!activeByUser.has(m.userId)) continue
        await createNotification(
          tenant.id, m.userId, 'sickness_reported',
          'Sickness reported',
          `${empName} reported sickness for ${dates}${fitNoteRequired ? ' (fit note required)' : ''}`,
          `/t/${tenantSlug}/leave/${lr.id}`
        ).catch((err) => {
          console.error('[leave] notification error:', err)
          captureServerError(err, { where: 'leave.notification' })
        })
      }
    })(),
    'leave.sickness-notify',
  )

    return { id: lr.id }
  })
  } catch (err) {
    // Surface the REAL error so we can diagnose. Without this, Next.js
    // production strips the message to a generic "Server Components render"
    // error and the user has no idea what went wrong.
    console.error('[reportSickness] UNCAUGHT ERROR:', err)
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false as const, error: `Sickness report failed: ${msg}` }
  }
}

// --- Convert sickness to a different leave type ---
//
// Real-world UK payroll workflow: when an employee goes off sick, dropping
// to Statutory Sick Pay (SSP) often costs them most of their day rate. Some
// employers let staff "convert" a short sick episode to annual leave (or
// another paid leave policy) so they stay on full pay. This action
// reassigns an existing approved sickness LeaveRequest to a different
// (non-system) policy, debits the new policy's balance, and refunds the
// sickness "used" bucket. Also drops fit-note metadata + RTW row since
// neither applies to annual leave.
//
// Auth: MANAGER+ in scope of the target employee. EMPLOYEE cannot
// self-convert (the conversion is a payroll concession, not a personal
// preference) — admins/managers approve the swap.

const ConvertSicknessSchema = z.object({
  targetPolicyId: z.string().min(1, 'Pick a policy to convert to'),
})

export async function convertSicknessToLeave(
  tenantSlug: string,
  leaveId: string,
  data: z.input<typeof ConvertSicknessSchema>,
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)
    const parsed = ConvertSicknessSchema.parse(data)

    const lr = await prisma.leaveRequest.findFirst({
      where: { id: leaveId, tenantId: tenant.id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            userId: true,
            leaveYearStartMonth: true,
          },
        },
        policy: true,
      },
    })
    if (!lr) throw new UserError('Leave request not found')

    // Source must be sickness. We use the structural isSystemType flag (NOT
    // a substring of the policy name) so a tenant who renamed their
    // sickness policy still gets a correct check.
    if (lr.policy.isSystemType !== 'sickness') {
      throw new UserError('Only sickness records can be converted to another leave type')
    }
    if (lr.status !== 'APPROVED') {
      throw new UserError('Only approved sickness records can be converted')
    }

    // Manager scope check — same pattern as the rest of the leave actions.
    const allowedConvert = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      lr.employeeId,
    )
    if (!allowedConvert) {
      throw new UserError('You can only convert sickness for your direct reports')
    }

    // Validate the target policy. Must belong to this tenant. Must NOT be a
    // system policy (sickness/lateness) — converting sickness to lateness
    // makes no sense and converting sickness to sickness is a no-op.
    const targetPolicy = await prisma.leavePolicy.findFirst({
      where: { id: parsed.targetPolicyId, tenantId: tenant.id },
    })
    if (!targetPolicy) {
      throw new UserError('Target leave policy not found')
    }
    if (targetPolicy.isSystemType) {
      throw new UserError(
        'Cannot convert to a system policy. Pick an annual leave (or other non-sickness) policy.',
      )
    }
    if (targetPolicy.id === lr.policyId) {
      throw new UserError('That policy is the current sickness policy — pick a different one.')
    }

    const effectiveStartMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)

    // Per-leave-year balance gate. Conversion debits the target policy
    // (typically annual leave) by the same business-day count the sickness
    // already used. If the employee doesn't have enough remaining in the
    // target policy for any year the conversion touches, refuse cleanly so
    // we never partially apply the swap.
    const { splitDateRangeByLeaveYear } = await import('@/lib/leave-year')
    const segments = splitDateRangeByLeaveYear(lr.startDate, lr.endDate, effectiveStartMonth)
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]
      const isFirst = i === 0
      const isLast = i === segments.length - 1
      const segAmount = await calculateLeaveAmount(
        tenant.id,
        seg.start,
        seg.end,
        parsed.targetPolicyId,
        isFirst ? lr.halfDayStart : false,
        isLast ? lr.halfDayEnd : false,
        lr.employeeId,
      )
      if (segAmount <= 0) continue
      await ensureBalances(tenant.id, lr.employeeId, seg.year, effectiveStartMonth)
      const balance = await prisma.leaveBalance.findUnique({
        where: {
          employeeId_policyId_year: {
            employeeId: lr.employeeId,
            policyId: parsed.targetPolicyId,
            year: seg.year,
          },
        },
      })
      if (balance) {
        const remaining = balance.allowance - balance.used - balance.pending
        if (segAmount > remaining) {
          throw new UserError(
            `Insufficient ${targetPolicy.name} balance for the ${seg.year} leave year. ` +
              `${remaining.toFixed(1)} ${targetPolicy.unit} remaining but the conversion needs ${segAmount.toFixed(1)} ${targetPolicy.unit}.`,
          )
        }
      }
    }

    // Atomic policy swap. We use updateMany so a concurrent cancel between
    // findFirst above and the update can't silently overwrite a cancelled
    // request. Append a one-line audit note to the reason so the trail
    // survives in-row even if AuditLog is later filtered.
    const conversionNote =
      `[Converted from sickness to ${targetPolicy.name} on ${formatLocalDayGB(new Date())} ` +
      `by ${user.name || user.email || 'a manager'}]`
    const newReason = lr.reason ? `${lr.reason}\n\n${conversionNote}` : conversionNote

    const updated = await prisma.leaveRequest.updateMany({
      where: { id: leaveId, tenantId: tenant.id, status: 'APPROVED', policyId: lr.policyId },
      data: {
        policyId: parsed.targetPolicyId,
        // Annual leave doesn't carry fit-note state.
        fitNoteRequired: false,
        fitNoteUrl: null,
        reason: newReason,
      },
    })
    if (updated.count === 0) {
      throw new UserError('This leave was modified by someone else. Reload and try again.')
    }

    // Move the balance: refund the sickness "used" bucket for these days,
    // then debit the target policy's "used" bucket for the same days. Both
    // helpers split per leave year automatically. Failures here are loud:
    // we can't roll back the policyId update without re-introducing the
    // race we just closed, so we capture the error and tell the manager
    // to ask an admin to manually reconcile.
    try {
      await cancelBalance(
        tenant.id,
        lr.employeeId,
        lr.policyId,
        lr.startDate,
        lr.endDate,
        effectiveStartMonth,
        lr.halfDayStart,
        lr.halfDayEnd,
        'APPROVED',
      )
      await addUsedToBalance(
        tenant.id,
        lr.employeeId,
        parsed.targetPolicyId,
        lr.startDate,
        lr.endDate,
        effectiveStartMonth,
        lr.halfDayStart,
        lr.halfDayEnd,
      )
    } catch (err) {
      console.error('[convertSicknessToLeave] balance update failed:', err)
      captureServerError(err, {
        where: 'leave.convert.balance',
        leaveRequestId: leaveId,
        employeeId: lr.employeeId,
        tenantId: tenant.id,
      })
      throw new UserError(
        'Conversion was applied but balances did not update cleanly. ' +
          'Please ask an admin to reconcile this employee\u2019s sickness and ' +
          `${targetPolicy.name} balances for ${formatLocalDayGB(lr.startDate)}\u2013${formatLocalDayGB(lr.endDate)}.`,
      )
    }

    // Drop the return-to-work record (if any) — RTW only applies to
    // sickness. Best-effort: a missing or already-deleted row is fine.
    await prisma.returnToWork
      .deleteMany({ where: { leaveRequestId: leaveId } })
      .catch(() => {})

    await logAudit({
      action: 'leave_request.converted_from_sickness',
      entity: 'LeaveRequest',
      entityId: leaveId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: {
        fromPolicyId: lr.policyId,
        fromPolicyName: lr.policy.name,
        toPolicyId: parsed.targetPolicyId,
        toPolicyName: targetPolicy.name,
        employeeId: lr.employeeId,
        startDate: lr.startDate.toISOString(),
        endDate: lr.endDate.toISOString(),
      },
    })

    revalidatePath(`/t/${tenantSlug}/leave`)
    revalidatePath(`/t/${tenantSlug}/leave/${leaveId}`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
    revalidatePath(`/t/${tenantSlug}/leave/calendar`)
    revalidatePath(`/t/${tenantSlug}/employees/${lr.employeeId}`)

    // Notify the affected employee. Wrapped in fireAndForget so the
    // notification survives the Workers request boundary.
    const dates = `${formatLocalDayGB(lr.startDate)} \u2013 ${formatLocalDayGB(lr.endDate)}`
    fireAndForget(
      (async () => {
        if (!lr.employee.userId) return
        const { createNotification } = await import(
          '@/app/t/[tenantSlug]/notifications/internal'
        )
        await createNotification(
          tenant.id,
          lr.employee.userId,
          'leave_converted',
          'Sickness converted to leave',
          `Your sickness on ${dates} has been converted to ${targetPolicy.name}.`,
          `/t/${tenantSlug}/leave/${leaveId}`,
        ).catch((err) => {
          console.error('[leave] convert notification error:', err)
          captureServerError(err, { where: 'leave.convert.notification' })
        })
      })(),
      'leave.convert-notify',
    )
  })
}

/**
 * Return the list of non-system leave policies a manager can convert a
 * sickness record into. Used by the convert dialog on the leave detail
 * page. Excludes sickness/lateness — those would be no-ops or nonsense.
 */
export async function getConvertibleLeavePolicies(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  const policies = await prisma.leavePolicy.findMany({
    where: { tenantId: tenant.id, isSystemType: null },
    select: { id: true, name: true, unit: true },
    orderBy: { name: 'asc' },
  })
  return policies
}

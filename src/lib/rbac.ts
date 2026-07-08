import { Role } from '@/generated/prisma/client'
import { prisma } from '@/lib/db'

export class ForbiddenError extends Error {
  // Sentinel forwarded to client error boundaries. In production Next.js
  // masks both `message` and `name` on server errors, so the tenant
  // error.tsx matches on `digest` (which Next forwards untouched).
  readonly digest = 'FORBIDDEN'
  constructor(message?: string) {
    super(message || 'You do not have permission to perform this action')
    this.name = 'ForbiddenError'
  }
}

const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 4,
  ADMIN: 3,
  MANAGER: 2,
  EMPLOYEE: 1,
}

export function assertRole(
  membership: { role: Role },
  allowedRoles: Role[]
) {
  if (!allowedRoles.includes(membership.role)) {
    throw new ForbiddenError(
      `Role '${membership.role}' is not allowed. Required: ${allowedRoles.join(', ')}`
    )
  }
}

export function hasRole(membership: { role: Role }, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(membership.role)
}

export function isAtLeast(membership: { role: Role }, minimumRole: Role): boolean {
  return ROLE_HIERARCHY[membership.role] >= ROLE_HIERARCHY[minimumRole]
}

export function assertAtLeast(membership: { role: Role }, minimumRole: Role) {
  if (!isAtLeast(membership, minimumRole)) {
    throw new ForbiddenError(
      `Role '${membership.role}' is insufficient. Minimum required: ${minimumRole}`
    )
  }
}

/**
 * Get the employee IDs that a user can see based on their role.
 *
 * - ADMIN / OWNER → returns `null` (meaning "see all")
 * - MANAGER       → returns array of direct-report employee IDs, PLUS
 *                   the direct reports of any manager they are currently
 *                   an active ApprovalDelegate for (so a designated
 *                   backup can approve on behalf of a manager on leave).
 * - EMPLOYEE      → should be handled separately (own data only)
 *
 * This function is the tenant's visibility boundary for manager-scoped
 * lists (dashboard KPIs, leave approvals, reports, employee directory).
 * An incomplete set here silently hides data from legitimate viewers.
 *
 * We intentionally do NOT filter by `Employee.status === 'ACTIVE'` here —
 * some callers (reports/historical views) want terminated employees'
 * past data included. Callers that want active-only should filter
 * downstream.
 */
export async function getDirectReportIds(
  tenantId: string,
  userId: string,
  membership: { role: Role }
): Promise<string[] | null> {
  // ADMIN and OWNER see everything
  if (isAtLeast(membership, 'ADMIN')) return null

  // MANAGER sees their own direct reports plus any they're covering via
  // an active ApprovalDelegate. Fetch my Employee row first — we need
  // its id to resolve both.
  const myEmp = await prisma.employee.findFirst({
    where: { tenantId, userId },
    select: { id: true },
  })
  if (!myEmp) return []

  // Active delegations TO me (I'm the delegate, covering someone else).
  // The window check (startDate <= now <= endDate) means a delegation
  // set up for a manager's annual leave is automatically active during
  // that window and drops off afterwards with no manual cleanup.
  const now = new Date()
  const activeDelegations = await prisma.approvalDelegate.findMany({
    where: {
      tenantId,
      delegateId: myEmp.id,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    select: { managerId: true },
  })

  // Collect the set of manager-employee-ids whose reports I can see:
  // me (direct reports) + every manager I'm currently delegated for.
  const visibleManagerIds = new Set<string>([myEmp.id])
  for (const d of activeDelegations) visibleManagerIds.add(d.managerId)

  const reports = await prisma.employee.findMany({
    where: {
      tenantId,
      managerId: { in: Array.from(visibleManagerIds) },
    },
    select: { id: true },
  })

  // Dedupe (two delegations could overlap on the same manager).
  const ids = new Set(reports.map((r) => r.id))
  return Array.from(ids)
}

/**
 * Check whether the caller is allowed to act on a specific employee record.
 *
 * - ADMIN / OWNER → always allowed
 * - MANAGER       → allowed when the target is the caller's own employee row,
 *                   their direct report, or covered by an active
 *                   ApprovalDelegate the caller is the delegate of
 * - EMPLOYEE      → only allowed for their own employee row
 *
 * Returns true/false rather than throwing so callers can mix it with
 * existing UserError messaging. Most call sites will combine it with the
 * `assertCanManageEmployeeId` wrapper below.
 *
 * Why this exists: server actions like createLeaveRequest, reportSickness,
 * updateFitNote, cancelLeaveRequest, extendLeaveRequest,
 * editLeaveRequestDates, updateWorkingStatus, and the entire expenses
 * module previously gated only on `assertAtLeast(membership, 'MANAGER')`,
 * letting any MANAGER mutate ANY employee's data tenant-wide. This helper
 * is the missing scope check.
 */
export async function canManageEmployeeId(
  tenantId: string,
  callerUserId: string,
  membership: { role: Role },
  targetEmployeeId: string,
): Promise<boolean> {
  if (isAtLeast(membership, 'ADMIN')) return true

  // Resolve the target's tenant + manager in a single round trip. Tenant
  // mismatch always fails closed — we never let cross-tenant ids leak
  // through even if Postgres FK enforcement happened to allow it.
  const target = await prisma.employee.findFirst({
    where: { id: targetEmployeeId, tenantId },
    select: { id: true, userId: true, managerId: true },
  })
  if (!target) return false

  const myEmp = await prisma.employee.findFirst({
    where: { tenantId, userId: callerUserId },
    select: { id: true },
  })
  if (!myEmp) {
    // Plain employees with no employee row can never manage anyone.
    return false
  }

  // Self-management always allowed for the actions that use this helper
  // (book your own leave, update your own profile, etc.). Tighter actions
  // can re-gate after this check returns true.
  if (target.userId && target.userId === callerUserId) return true
  if (target.id === myEmp.id) return true

  // EMPLOYEE role: only self, no further escalation.
  if (!isAtLeast(membership, 'MANAGER')) return false

  // Direct manager?
  if (target.managerId && target.managerId === myEmp.id) return true

  // Active delegation covering the target's direct manager?
  if (target.managerId) {
    const now = new Date()
    const delegation = await prisma.approvalDelegate.findFirst({
      where: {
        tenantId,
        delegateId: myEmp.id,
        managerId: target.managerId,
        startDate: { lte: now },
        endDate: { gte: now },
      },
      select: { id: true },
    })
    if (delegation) return true
  }

  return false
}

/**
 * Throwing wrapper around `canManageEmployeeId`. Throws ForbiddenError so
 * callers can either catch it (action wrappers convert to UserError) or
 * let it propagate as a 403.
 */
export async function assertCanManageEmployeeId(
  tenantId: string,
  callerUserId: string,
  membership: { role: Role },
  targetEmployeeId: string,
  message = 'You do not have permission to act on this employee',
): Promise<void> {
  const allowed = await canManageEmployeeId(
    tenantId,
    callerUserId,
    membership,
    targetEmployeeId,
  )
  if (!allowed) throw new ForbiddenError(message)
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import {
  assertAtLeast,
  isAtLeast,
  getDirectReportIds,
  canManageEmployeeId,
} from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

// (#181) Amount is parsed identically to the client schema — strip
// currency / comma noise then bound 0 < n ≤ 1,000,000. Free-text fields
// trimmed and capped to stop pasted blobs reaching the DB.
const cleanCurrency = (v: string) => v.replace(/[£,\s]/g, '')
const CreateExpenseSchema = z.object({
  description: z.string().trim().min(1, 'Description is required').max(500),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => {
      const n = Number(cleanCurrency(v))
      return Number.isFinite(n) && n > 0 && n <= 1_000_000
    }, 'Enter an amount between £0.01 and £1,000,000'),
  category: z.enum(['TRAVEL', 'MEALS', 'EQUIPMENT', 'ACCOMMODATION', 'TRAINING', 'OTHER']),
  date: z.string().min(1, 'Date is required'),
  receiptUrl: z.string().trim().max(2000).optional(),
  receiptData: z.string().optional(),         // base64 encoded file
  receiptFilename: z.string().trim().max(255).optional(),     // original filename
  receiptMimeType: z.string().trim().max(100).optional(),     // e.g. image/jpeg, application/pdf
  notes: z.string().trim().max(1000).optional(),
})

export type CreateExpenseData = z.input<typeof CreateExpenseSchema>

const UpdateExpenseSchema = z.object({
  description: z.string().trim().min(1, 'Description is required').max(500).optional(),
  amount: z
    .string()
    .min(1)
    .refine((v) => {
      const n = Number(cleanCurrency(v))
      return Number.isFinite(n) && n > 0 && n <= 1_000_000
    }, 'Enter an amount between £0.01 and £1,000,000')
    .optional(),
  category: z.enum(['TRAVEL', 'MEALS', 'EQUIPMENT', 'ACCOMMODATION', 'TRAINING', 'OTHER']).optional(),
  date: z.string().min(1).optional(),
  receiptUrl: z.string().trim().max(2000).optional(),
  receiptData: z.string().optional(),
  receiptFilename: z.string().trim().max(255).optional(),
  receiptMimeType: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(1000).optional(),
})

export type UpdateExpenseData = z.input<typeof UpdateExpenseSchema>

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getExpenseClaims(
  tenantSlug: string,
  filters: { status?: string; employeeId?: string; view?: string } = {}
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { tenantId: tenant.id }
  if (filters.status && filters.status !== 'ALL') where.status = filters.status

  // Visibility scoping. ADMIN+ see all claims. Plain MANAGER sees their
  // direct reports + delegated managers' reports + their own. EMPLOYEE
  // sees only their own. Without these filters every MANAGER (and the
  // legacy "view=all" path) could browse every expense claim in the
  // tenant — potentially private/medical/personal expenses. (Codex
  // round 4 #6.)
  const isAdminOrAbove = isAtLeast(membership, 'ADMIN')
  const isManagerOnly = isAtLeast(membership, 'MANAGER') && !isAdminOrAbove

  // If "my" view or employee role, only show own claims
  if (filters.view === 'my' || !isAtLeast(membership, 'MANAGER')) {
    const emp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (emp) {
      where.employeeId = emp.id
    } else {
      return []
    }
  } else if (isManagerOnly) {
    // Constrain plain managers to their report scope. Build the visible
    // employee id set from getDirectReportIds (which already includes
    // active delegations). Add the manager's own employee id so they can
    // still see their own claims under "all".
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      if (visibleIds.length === 0) return []
      if (filters.employeeId) {
        if (!visibleIds.includes(filters.employeeId)) return []
        where.employeeId = filters.employeeId
      } else {
        where.employeeId = { in: visibleIds }
      }
    }
  } else if (filters.employeeId) {
    // ADMIN+ branch — allow filtering by any employee in the tenant.
    where.employeeId = filters.employeeId
  }

  return prisma.expenseClaim.findMany({
    where,
    include: { employee: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getExpenseClaim(tenantSlug: string, expenseId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const claim = await prisma.expenseClaim.findFirst({
    where: { id: expenseId, tenantId: tenant.id },
    include: { employee: true },
  })
  if (!claim) throw new Error('Expense claim not found')

  // Visibility scope. ADMIN+ → any claim in the tenant. Plain MANAGER →
  // claim must belong to a direct report or delegated manager's report,
  // OR to the manager themselves. EMPLOYEE → only their own. (Codex
  // round 4 #6.)
  const allowedView = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    claim.employeeId,
  )
  if (!allowedView) {
    throw new Error('Expense claim not found')
  }

  return claim
}

// NOTE: receipt fetching lives behind the authenticated route at
// `/api/expenses/[expenseId]/receipt` (which checks tenant + role + ownership).
// A previous version of this file exposed an unauthenticated `getExpenseReceipt`
// server action that returned receipt bytes given just an expenseId — any
// authenticated user could enumerate receipts across tenants. The function has
// no callers and has been removed; use the API route instead.

// NOTE: a previous version exposed `getExpenseFormOptions(tenantSlug)`
// returning every active employee in the tenant for an expense-on-behalf
// dropdown. The function had no callers (the new-expense form derives
// the employee from the session), and as a Server Action it leaked the
// full tenant employee roster to any authenticated user. Removed for
// the same reason getExpenseReceipt was removed in round 4.

export async function getExpenseStats(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Scope to the caller's report set so a plain MANAGER sees stats for
  // claims they can actually act on, not the whole tenant. ADMIN+ keeps
  // the tenant-wide rollup. Same pattern as the round-5 dashboard
  // counter scoping.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseWhere: any = { tenantId: tenant.id }
  if (!isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      if (visibleIds.length === 0) {
        return { pendingCount: 0, approvedCount: 0, totalPaid: '0' }
      }
      baseWhere.employeeId = { in: visibleIds }
    }
  }

  const [pending, approved, totalPaid] = await Promise.all([
    prisma.expenseClaim.count({
      where: { ...baseWhere, status: 'PENDING' },
    }),
    prisma.expenseClaim.count({
      where: { ...baseWhere, status: 'APPROVED' },
    }),
    prisma.expenseClaim.aggregate({
      where: { ...baseWhere, status: 'PAID' },
      _sum: { amount: true },
    }),
  ])

  return {
    pendingCount: pending,
    approvedCount: approved,
    totalPaid: totalPaid._sum.amount?.toString() ?? '0',
  }
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function createExpenseClaim(
  tenantSlug: string,
  data: CreateExpenseData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)
  const parsed = CreateExpenseSchema.parse(data)

  // Find employee record for current user
  const emp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
  })
  if (!emp) throw new UserError('No employee record found for your account')

  // Validate receipt file size if provided (5MB limit for base64)
  if (parsed.receiptData) {
    const sizeBytes = Math.ceil((parsed.receiptData.length * 3) / 4)
    if (sizeBytes > 5 * 1024 * 1024) {
      throw new UserError('Receipt file must be under 5MB')
    }
  }

  const claim = await prisma.expenseClaim.create({
    data: {
      description: parsed.description,
      amount: Number(cleanCurrency(parsed.amount)),
      category: parsed.category,
      date: new Date(parsed.date),
      receiptUrl: parsed.receiptUrl || null,
      receiptData: parsed.receiptData || null,
      receiptFilename: parsed.receiptFilename || null,
      receiptMimeType: parsed.receiptMimeType || null,
      notes: parsed.notes || null,
      employeeId: emp.id,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'expense_claim.created',
    entity: 'ExpenseClaim',
    entityId: claim.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { amount: parsed.amount, category: parsed.category },
  })

  revalidatePath(`/t/${tenantSlug}/expenses`)
    return { id: claim.id }
  })
}

export async function updateExpenseClaim(
  tenantSlug: string,
  expenseId: string,
  data: UpdateExpenseData
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)
  const parsed = UpdateExpenseSchema.parse(data)

  const claim = await prisma.expenseClaim.findFirst({
    where: { id: expenseId, tenantId: tenant.id },
    include: { employee: true },
  })
  if (!claim) throw new UserError('Expense claim not found')

  // Only the employee who created it can update, and only if PENDING
  if (claim.status !== 'PENDING') {
    throw new UserError('Only pending expense claims can be updated')
  }
  const isOwner = claim.employee.userId === user.userId
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')
  if (!isOwner && !isManagerOrAbove) {
    throw new UserError('You do not have permission to update this expense claim')
  }
  // Plain MANAGER must still be in scope of the claimant — Codex round 4 #6.
  if (!isOwner && isManagerOrAbove) {
    const allowedUpdate = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      claim.employeeId,
    )
    if (!allowedUpdate) {
      throw new UserError('You do not have permission to update this expense claim')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = {}
  if (parsed.description) updateData.description = parsed.description
  if (parsed.amount) updateData.amount = Number(cleanCurrency(parsed.amount))
  if (parsed.category) updateData.category = parsed.category
  if (parsed.date) updateData.date = new Date(parsed.date)
  if (parsed.receiptUrl !== undefined) updateData.receiptUrl = parsed.receiptUrl || null
  if (parsed.receiptData !== undefined) {
    // Same 5MB limit as create (line 159) — without this check, an attacker
    // can create a tiny claim then PATCH 50MB of base64 into it.
    if (parsed.receiptData) {
      const sizeBytes = Math.ceil((parsed.receiptData.length * 3) / 4)
      if (sizeBytes > 5 * 1024 * 1024) {
        throw new UserError('Receipt file must be under 5MB')
      }
    }
    updateData.receiptData = parsed.receiptData || null
    updateData.receiptFilename = parsed.receiptFilename || null
    updateData.receiptMimeType = parsed.receiptMimeType || null
  }
  if (parsed.notes !== undefined) updateData.notes = parsed.notes || null

  // TOCTOU guard: the findFirst above races against approveExpenseClaim.
  // Without the status guard on the UPDATE itself, an employee hitting
  // "Save" at the exact moment a manager clicks "Approve" could mutate
  // the amount / receipt of an already-approved claim. Switch to
  // updateMany so the WHERE clause is evaluated in the same UPDATE that
  // writes the changes. We require status='PENDING' and, for the
  // employee case, also pin employeeId to their own record so a
  // lower-privileged user can't use this action to modify someone
  // else's claim even if they race around earlier checks.
  const where: {
    id: string
    tenantId: string
    status: 'PENDING'
    employeeId?: string
  } = { id: expenseId, tenantId: tenant.id, status: 'PENDING' }
  if (!isManagerOrAbove) {
    where.employeeId = claim.employeeId
  }

  const updated = await prisma.expenseClaim.updateMany({
    where,
    data: updateData,
  })
  if (updated.count === 0) {
    throw new UserError('This expense claim has already been decided')
  }

  await logAudit({
    action: 'expense_claim.updated',
    entity: 'ExpenseClaim',
    entityId: expenseId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: updateData,
  })

  revalidatePath(`/t/${tenantSlug}/expenses`)
  revalidatePath(`/t/${tenantSlug}/expenses/${expenseId}`)
  })
}

export async function approveExpenseClaim(
  tenantSlug: string,
  expenseId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Prevent self-approval: a manager cannot approve their own claim.
    const existing = await prisma.expenseClaim.findFirst({
      where: { id: expenseId, tenantId: tenant.id },
      select: { employeeId: true },
    })
    if (!existing) {
      throw new UserError('Expense claim not found or already decided')
    }
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (myEmp && existing.employeeId === myEmp.id) {
      throw new UserError('You cannot approve your own expense claim')
    }
    // Scope guard — plain MANAGER can only approve claims for their own
    // direct reports / delegated managers' reports. ADMIN+ may approve any
    // tenant claim. Without this check any MANAGER could approve any tenant
    // employee's expense claim. (Codex round 4 #6.)
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedApprove = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        existing.employeeId,
      )
      if (!allowedApprove) {
        throw new UserError('You can only approve claims for your direct reports')
      }
    }

    // Atomic guard: only flip if still PENDING.
    const updated = await prisma.expenseClaim.updateMany({
      where: { id: expenseId, tenantId: tenant.id, status: 'PENDING' },
      data: {
        status: 'APPROVED',
        approvedById: user.userId,
        approvedAt: new Date(),
      },
    })
    if (updated.count === 0) {
      throw new UserError('Expense claim not found or already decided')
    }

    const claim = await prisma.expenseClaim.findFirst({
      where: { id: expenseId, tenantId: tenant.id },
      select: { amount: true, employeeId: true },
    })

    await logAudit({
      action: 'expense_claim.approved',
      entity: 'ExpenseClaim',
      entityId: expenseId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { amount: claim?.amount.toString(), employeeId: claim?.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/expenses`)
    revalidatePath(`/t/${tenantSlug}/expenses/${expenseId}`)
  })
}

export async function rejectExpenseClaim(
  tenantSlug: string,
  expenseId: string,
  reason?: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Read the row first only so we can preserve existing notes if no reason
    // is given. The actual transition is atomic via updateMany below.
    const existing = await prisma.expenseClaim.findFirst({
      where: { id: expenseId, tenantId: tenant.id },
      select: { notes: true, amount: true, employeeId: true },
    })
    if (!existing) {
      throw new UserError('Expense claim not found or already decided')
    }

    // Prevent self-rejection (same restriction as self-approval — a manager
    // cannot decide their own claim).
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (myEmp && existing.employeeId === myEmp.id) {
      throw new UserError('You cannot reject your own expense claim')
    }
    // Scope guard — same as approveExpenseClaim. (Codex round 4 #6.)
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedReject = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        existing.employeeId,
      )
      if (!allowedReject) {
        throw new UserError('You can only reject claims for your direct reports')
      }
    }

    // Append the rejection reason to the existing notes rather than
    // overwriting them. The previous behaviour nuked the claimant's
    // original note ("Hotel booking for client meeting") and replaced it
    // with just the rejection reason ("Rejected: missing receipt"),
    // destroying context the accountant might need to understand what
    // was claimed in the first place. Append-with-separator preserves
    // both. (Codex round 3 nice-to-have #2 — promoted because it's
    // silent data loss on a high-frequency path.)
    const existingNotes = existing?.notes?.trim() ?? ''
    const rejectionLine = reason ? `— Rejected: ${reason}` : '— Rejected'
    const mergedNotes = existingNotes
      ? `${existingNotes}\n\n${rejectionLine}`
      : rejectionLine
    const updated = await prisma.expenseClaim.updateMany({
      where: { id: expenseId, tenantId: tenant.id, status: 'PENDING' },
      data: {
        status: 'REJECTED',
        notes: mergedNotes,
      },
    })
    if (updated.count === 0) {
      throw new UserError('Expense claim not found or already decided')
    }

    await logAudit({
      action: 'expense_claim.rejected',
      entity: 'ExpenseClaim',
      entityId: expenseId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { amount: existing?.amount.toString(), employeeId: existing?.employeeId, reason },
    })

    revalidatePath(`/t/${tenantSlug}/expenses`)
    revalidatePath(`/t/${tenantSlug}/expenses/${expenseId}`)
  })
}

export async function markExpensePaid(
  tenantSlug: string,
  expenseId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const updated = await prisma.expenseClaim.updateMany({
      where: { id: expenseId, tenantId: tenant.id, status: 'APPROVED' },
      data: { status: 'PAID' },
    })
    if (updated.count === 0) {
      throw new UserError('Expense claim not found or not approved')
    }

    const claim = await prisma.expenseClaim.findFirst({
      where: { id: expenseId, tenantId: tenant.id },
      select: { amount: true, employeeId: true },
    })

    await logAudit({
      action: 'expense_claim.paid',
      entity: 'ExpenseClaim',
      entityId: expenseId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { amount: claim?.amount.toString(), employeeId: claim?.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/expenses`)
    revalidatePath(`/t/${tenantSlug}/expenses/${expenseId}`)
  })
}

export async function deleteExpenseClaim(
  tenantSlug: string,
  expenseId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  await requireWriteAccess(tenant.id)

  const claim = await prisma.expenseClaim.findFirst({
    where: { id: expenseId, tenantId: tenant.id },
    include: { employee: true },
  })
  if (!claim) throw new UserError('Expense claim not found')

  // Only the owner can delete their own PENDING claim, or managers+ can
  // delete any PENDING claim. Nobody (not even an ADMIN) can hard-delete
  // an APPROVED, REJECTED or PAID claim — those are part of the audit
  // trail and the reimbursement history. If an approved claim was wrong,
  // the right move is to reject a subsequent correction claim or issue
  // a reversing claim, not silently remove it. Hard delete of a paid
  // claim also orphans the Stripe/accounting record on whichever side
  // actually pushed the money. (Codex round 3 #5.)
  if (claim.status !== 'PENDING') {
    throw new UserError(
      `Cannot delete a ${claim.status.toLowerCase()} claim — only pending claims can be deleted.`
    )
  }
  const isOwner = claim.employee.userId === user.userId
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')
  if (!isOwner && !isManagerOrAbove) {
    throw new UserError('You do not have permission to delete this expense claim')
  }
  // Plain MANAGER must still be in scope of the claimant — Codex round 4 #6.
  if (!isOwner && isManagerOrAbove && !isAtLeast(membership, 'ADMIN')) {
    const allowedDelete = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      claim.employeeId,
    )
    if (!allowedDelete) {
      throw new UserError('You do not have permission to delete this expense claim')
    }
  }

  // Atomic guard — only delete if still PENDING. Prevents a race where
  // the claim is approved between our findFirst and the delete.
  const deleted = await prisma.expenseClaim.deleteMany({
    where: { id: expenseId, tenantId: tenant.id, status: 'PENDING' },
  })
  if (deleted.count === 0) {
    throw new UserError('This claim was just updated — reload and try again.')
  }

  await logAudit({
    action: 'expense_claim.deleted',
    entity: 'ExpenseClaim',
    entityId: expenseId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { amount: claim.amount.toString(), category: claim.category },
  })

  revalidatePath(`/t/${tenantSlug}/expenses`)
  })
}

'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// --------------- Schemas ---------------

// (#193) endDate must follow startDate. Cycles also bounded to a sane
// 50-year window so YYYY-9999 cycles can't be saved.
const CreateReviewCycleSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(150),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
  })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  })

const CompleteReviewSchema = z.object({
  overallRating: z.number().min(1).max(5),
  strengths: z.string().trim().max(2000).optional(),
  improvements: z.string().trim().max(2000).optional(),
  notes: z.string().trim().max(2000).optional(),
})

export type CreateReviewCycleData = z.infer<typeof CreateReviewCycleSchema>
export type CompleteReviewData = z.infer<typeof CompleteReviewSchema>

// --------------- Queries ---------------

export async function getReviewCycles(tenantSlug: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  // MANAGER+ only — review cycles expose tenant-wide stats and
  // individual review outcomes. Plain employees should never see this
  // page or its data even via direct server-action call. (Round 6 #1.)
  assertAtLeast(membership, 'MANAGER')

  const cycles = await prisma.reviewCycle.findMany({
    where: { tenantId: tenant.id },
    include: {
      reviews: {
        select: { status: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return cycles.map((cycle) => {
    const total = cycle.reviews.length
    const completed = cycle.reviews.filter((r) => r.status === 'completed').length
    return {
      id: cycle.id,
      name: cycle.name,
      startDate: cycle.startDate,
      endDate: cycle.endDate,
      status: cycle.status,
      totalReviews: total,
      completedReviews: completed,
      completionPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
      createdAt: cycle.createdAt,
    }
  })
}

export async function getReviewCycleDetail(tenantSlug: string, cycleId: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  // MANAGER+ only — see getReviewCycles. (Round 6 #1.)
  assertAtLeast(membership, 'MANAGER')

  const cycle = await prisma.reviewCycle.findFirst({
    where: { id: cycleId, tenantId: tenant.id },
    include: {
      reviews: {
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              jobTitle: true,
              department: true,
              managerId: true,
            },
          },
        },
        orderBy: { employee: { lastName: 'asc' } },
      },
    },
  })

  if (!cycle) throw new Error('Review cycle not found')

  // Resolve reviewer names from Employee records (reviewerId is now nullable
  // because we set it to null on reviewer delete to preserve the audit trail).
  const reviewerIds = [...new Set(
    cycle.reviews.map((r) => r.reviewerId).filter((id): id is string => id !== null)
  )]
  const reviewers = await prisma.employee.findMany({
    where: { id: { in: reviewerIds } },
    select: { id: true, firstName: true, lastName: true },
  })
  const reviewerMap = new Map(
    reviewers.map((r) => [r.id, `${r.firstName} ${r.lastName}`])
  )

  const total = cycle.reviews.length
  const completed = cycle.reviews.filter((r) => r.status === 'completed').length

  return {
    id: cycle.id,
    name: cycle.name,
    startDate: cycle.startDate,
    endDate: cycle.endDate,
    status: cycle.status,
    totalReviews: total,
    completedReviews: completed,
    completionPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
    reviews: cycle.reviews.map((r) => ({
      id: r.id,
      status: r.status,
      overallRating: r.overallRating,
      strengths: r.strengths,
      improvements: r.improvements,
      notes: r.notes,
      completedAt: r.completedAt,
      employeeId: r.employeeId,
      employeeName: `${r.employee.firstName} ${r.employee.lastName}`,
      employeeJobTitle: r.employee.jobTitle,
      employeeDepartment: r.employee.department,
      reviewerId: r.reviewerId,
      reviewerName: r.reviewerId ? (reviewerMap.get(r.reviewerId) || 'Unknown reviewer') : 'Unassigned',
    })),
  }
}

// --------------- Mutations ---------------

export async function createReviewCycle(
  tenantSlug: string,
  data: CreateReviewCycleData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = CreateReviewCycleSchema.parse(data)

    const startDate = new Date(parsed.startDate)
    const endDate = new Date(parsed.endDate)

    if (endDate <= startDate) {
      throw new UserError('End date must be after start date')
    }

    // Get all active employees with their managers
    const employees = await prisma.employee.findMany({
      where: { tenantId: tenant.id, status: 'ACTIVE' },
      select: { id: true, managerId: true },
    })

    if (employees.length === 0) {
      throw new UserError('No active employees found to create reviews for')
    }

    // Determine fallback reviewer for employees with no assigned manager.
    // Previously we fell back to `emp.id` which made an employee review
    // themselves. Instead, fall back to any ADMIN or OWNER in the tenant who
    // has an Employee record.
    const employeesMissingManager = employees.filter(
      (emp: { id: string; managerId: string | null }) => !emp.managerId
    )
    let fallbackReviewerId: string | null = null
    if (employeesMissingManager.length > 0) {
      const adminMemberships = await prisma.membership.findMany({
        where: { tenantId: tenant.id, role: { in: ['OWNER', 'ADMIN'] } },
        select: { userId: true },
      })
      if (adminMemberships.length > 0) {
        const adminUserIds = adminMemberships.map(
          (m: { userId: string }) => m.userId
        )
        // Pick any admin employee record to be the reviewer. We exclude the
        // employee themselves so we never auto-assign self-review.
        const candidate = await prisma.employee.findFirst({
          where: {
            tenantId: tenant.id,
            userId: { in: adminUserIds },
            status: 'ACTIVE',
          },
          select: { id: true },
        })
        if (candidate) {
          fallbackReviewerId = candidate.id
        }
      }
      if (!fallbackReviewerId) {
        throw new UserError(
          'Some active employees have no assigned manager and no admin is available to review them. Assign a manager to these employees or add an admin first.'
        )
      }
    }

    // Create cycle and review records in a transaction
    const cycle = await prisma.$transaction(async (tx) => {
      const newCycle = await tx.reviewCycle.create({
        data: {
          name: parsed.name,
          startDate,
          endDate,
          status: 'draft',
          tenantId: tenant.id,
        },
      })

      // Auto-create Review records for each active employee. When an
      // employee has no manager, assign an admin as the fallback reviewer
      // (never the employee themselves — that was the old bug).
      type EmpRow = { id: string; managerId: string | null }
      const reviewData = (employees as EmpRow[])
        .filter((emp: EmpRow) => {
          // If the fallback reviewer themselves has no manager, skip them
          // entirely rather than creating a self-review.
          return !(emp.id === fallbackReviewerId && !emp.managerId)
        })
        .map((emp: EmpRow) => {
          let reviewerId: string
          if (emp.managerId) {
            reviewerId = emp.managerId
          } else {
            // fallbackReviewerId is guaranteed non-null here because we
            // throw UserError above if any employee lacks a manager and no
            // admin exists. TypeScript can't infer that though.
            reviewerId = fallbackReviewerId!
          }
          return {
            cycleId: newCycle.id,
            employeeId: emp.id,
            reviewerId,
            status: 'pending',
            tenantId: tenant.id,
          }
        })

      await tx.review.createMany({ data: reviewData })

      return newCycle
    })

    await logAudit({
      action: 'review_cycle.created',
      entity: 'ReviewCycle',
      entityId: cycle.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { name: parsed.name, employeeCount: employees.length },
    })

    revalidatePath(`/t/${tenantSlug}/performance/reviews`)
    return { id: cycle.id }
  })
}

export async function activateReviewCycle(
  tenantSlug: string,
  cycleId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Atomic guard — only flip if still draft
    const updated = await prisma.reviewCycle.updateMany({
      where: { id: cycleId, tenantId: tenant.id, status: 'draft' },
      data: { status: 'active' },
    })
    if (updated.count === 0) {
      throw new UserError('Review cycle not found or not in draft status')
    }

    await logAudit({
      action: 'review_cycle.activated',
      entity: 'ReviewCycle',
      entityId: cycleId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/performance/reviews`)
    revalidatePath(`/t/${tenantSlug}/performance/reviews/${cycleId}`)
  })
}

export async function completeReviewCycle(
  tenantSlug: string,
  cycleId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const updated = await prisma.reviewCycle.updateMany({
      where: { id: cycleId, tenantId: tenant.id, status: 'active' },
      data: { status: 'completed' },
    })
    if (updated.count === 0) {
      throw new UserError('Review cycle not found or not active')
    }

    await logAudit({
      action: 'review_cycle.completed',
      entity: 'ReviewCycle',
      entityId: cycleId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/performance/reviews`)
    revalidatePath(`/t/${tenantSlug}/performance/reviews/${cycleId}`)
  })
}

export async function completeReview(
  tenantSlug: string,
  reviewId: string,
  data: CompleteReviewData
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = CompleteReviewSchema.parse(data)

    // Only the assigned reviewer (or an admin+) may complete a review. A
    // random manager on the team should not be able to submit a rating for
    // someone else's review.
    const review = await prisma.review.findFirst({
      where: { id: reviewId, tenantId: tenant.id },
      select: { reviewerId: true, cycleId: true, status: true },
    })
    if (!review) throw new UserError('Review not found')

    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (review.reviewerId !== (myEmp?.id ?? null) && !isAtLeast(membership, 'ADMIN')) {
      throw new UserError('Only the assigned reviewer can complete this review')
    }

    // Atomic guard — only complete if not already completed.
    const updated = await prisma.review.updateMany({
      where: { id: reviewId, tenantId: tenant.id, status: { not: 'completed' } },
      data: {
        overallRating: parsed.overallRating,
        strengths: parsed.strengths || null,
        improvements: parsed.improvements || null,
        notes: parsed.notes || null,
        status: 'completed',
        completedAt: new Date(),
      },
    })
    if (updated.count === 0) {
      throw new UserError('Review not found or already completed')
    }

    await logAudit({
      action: 'review.completed',
      entity: 'Review',
      entityId: reviewId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { overallRating: parsed.overallRating },
    })

    revalidatePath(`/t/${tenantSlug}/performance/reviews/${review.cycleId}`)
    revalidatePath(`/t/${tenantSlug}/performance/reviews`)
  })
}

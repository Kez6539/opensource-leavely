'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, canManageEmployeeId } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// (#192) Don't accept past due dates server-side; mirror the client guard.
const CreateGoalSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(2000).optional(),
  assigneeId: z.string().min(1, 'Assignee is required'),
  dueDate: z
    .string()
    .optional()
    .refine((v) => {
      if (!v) return true
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(v) >= today
    }, 'Due date must be today or later'),
})

export type CreateGoalData = z.infer<typeof CreateGoalSchema>

export async function createGoal(
  tenantSlug: string,
  data: CreateGoalData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = CreateGoalSchema.parse(data)

    // Verify assignee belongs to tenant
    const emp = await prisma.employee.findFirst({
      where: { id: parsed.assigneeId, tenantId: tenant.id },
    })
    if (!emp) throw new UserError('Employee not found')

    // Scope guard — same pattern as the round-4 leave action fixes.
    // Without this any plain MANAGER could set goals on any tenant
    // employee they have no reporting relationship with.
    const allowedAssign = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      parsed.assigneeId,
    )
    if (!allowedAssign) {
      throw new UserError('You can only set goals for your direct reports')
    }

    const goal = await prisma.goal.create({
      data: {
        title: parsed.title,
        description: parsed.description || null,
        assigneeId: parsed.assigneeId,
        createdById: user.userId,
        tenantId: tenant.id,
        dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null,
      },
    })

    await logAudit({
      action: 'goal.created',
      entity: 'Goal',
      entityId: goal.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { title: parsed.title, assigneeId: parsed.assigneeId },
    })

    revalidatePath(`/t/${tenantSlug}/performance`)
    return { id: goal.id }
  })
}

const UpdateProgressSchema = z.object({
  progress: z.number().min(0).max(100),
  note: z.string().optional(),
})

export async function updateGoalProgress(
  tenantSlug: string,
  goalId: string,
  data: { progress: number; note?: string }
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    await requireWriteAccess(tenant.id)

    const parsed = UpdateProgressSchema.parse(data)

    const goal = await prisma.goal.findFirst({
      where: { id: goalId, tenantId: tenant.id },
    })
    if (!goal) throw new UserError('Goal not found')

    // Allow the goal's own assignee (the employee the goal was set for) to
    // update progress on their own goal. Otherwise require manager+ AND
    // they must be in scope of the assignee — without this scope check
    // any plain MANAGER could rewrite any goal's progress tenant-wide.
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    const isAssignee = myEmp?.id === goal.assigneeId
    if (!isAssignee) {
      if (!isAtLeast(membership, 'MANAGER')) {
        throw new UserError('You do not have permission to update this goal')
      }
      const allowedProgress = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        goal.assigneeId,
      )
      if (!allowedProgress) {
        throw new UserError('You can only update goals for your direct reports')
      }
    }

    // Determine new status based on progress
    let newStatus = goal.status
    if (parsed.progress >= 100) {
      newStatus = 'COMPLETED'
    } else if (parsed.progress > 0 && goal.status === 'NOT_STARTED') {
      newStatus = 'ON_TRACK'
    }

    // Check if overdue. dueDate is stored at midnight UTC for the calendar day,
    // so we need to compare against the END of that day — otherwise a goal due
    // today flips to OVERDUE the moment the day starts in UTC, instead of at
    // end of day, which is what users expect.
    if (goal.dueDate && parsed.progress < 100) {
      const endOfDueDate = new Date(goal.dueDate.getTime() + 24 * 60 * 60 * 1000 - 1)
      if (new Date() > endOfDueDate) {
        newStatus = 'OVERDUE'
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.goal.update({
        where: { id: goalId },
        data: {
          progress: parsed.progress,
          status: newStatus,
        },
      })

      await tx.goalUpdate.create({
        data: {
          goalId,
          progress: parsed.progress,
          note: parsed.note || null,
          userId: user.userId,
        },
      })
    })

    await logAudit({
      action: 'goal.progress_updated',
      entity: 'Goal',
      entityId: goalId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { progress: parsed.progress, note: parsed.note },
    })

    revalidatePath(`/t/${tenantSlug}/performance`)
    revalidatePath(`/t/${tenantSlug}/performance/${goalId}`)
  })
}

export async function completeGoal(
  tenantSlug: string,
  goalId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const goal = await prisma.goal.findFirst({
      where: { id: goalId, tenantId: tenant.id },
    })
    if (!goal) throw new UserError('Goal not found')

    // Scope guard — manager must be in the assignee's reporting chain.
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedComplete = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        goal.assigneeId,
      )
      if (!allowedComplete) {
        throw new UserError('You can only complete goals for your direct reports')
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.goal.update({
        where: { id: goalId },
        data: { status: 'COMPLETED', progress: 100 },
      })

      await tx.goalUpdate.create({
        data: {
          goalId,
          progress: 100,
          note: 'Goal marked as completed',
          userId: user.userId,
        },
      })
    })

    await logAudit({
      action: 'goal.completed',
      entity: 'Goal',
      entityId: goalId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/performance`)
    revalidatePath(`/t/${tenantSlug}/performance/${goalId}`)
  })
}

export async function deleteGoal(
  tenantSlug: string,
  goalId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const goal = await prisma.goal.findFirst({
      where: { id: goalId, tenantId: tenant.id },
    })
    if (!goal) throw new UserError('Goal not found')

    // Scope guard — manager must be in the assignee's reporting chain.
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowedDelete = await canManageEmployeeId(
        tenant.id,
        user.userId,
        membership,
        goal.assigneeId,
      )
      if (!allowedDelete) {
        throw new UserError('You can only delete goals for your direct reports')
      }
    }

    await prisma.goal.delete({ where: { id: goalId } })

    await logAudit({
      action: 'goal.deleted',
      entity: 'Goal',
      entityId: goalId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { title: goal.title },
    })

    revalidatePath(`/t/${tenantSlug}/performance`)
  })
}

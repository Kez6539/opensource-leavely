import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BackLink, CardSection, FieldRow, StatusBadge } from '@/components/shared'
import { GoalActions } from './goal-actions'
import { GoalTimeline } from './goal-timeline'
import { UpdateProgressForm } from './update-progress-form'
import { cn } from '@/lib/utils'

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; goalId: string }>
}) {
  const { tenantSlug, goalId } = await params
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const goal = await prisma.goal.findFirst({
    where: { id: goalId, tenantId: tenant.id },
    include: {
      assignee: { select: { id: true, firstName: true, lastName: true, jobTitle: true } },
      updates: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!goal) notFound()

  // Employees can update progress on goals assigned to them.
  const myEmployee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })
  const isAssignee = myEmployee?.id === goal.assigneeId
  const canUpdateProgress = canManage || isAssignee

  // Resolve user names for updates and creator
  const userIds = [...new Set([goal.createdById, ...goal.updates.map((u) => u.userId)])]
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  })
  const userMap = new Map(users.map((u) => [u.id, u.name || u.email]))

  const assigneeName = `${goal.assignee.firstName} ${goal.assignee.lastName}`
  const creatorName = userMap.get(goal.createdById) || 'Unknown'

  const mappedUpdates = goal.updates.map((u) => ({
    id: u.id,
    note: u.note,
    progress: u.progress,
    userName: userMap.get(u.userId) || 'Unknown',
    createdAt: u.createdAt.toISOString(),
  }))

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/performance`} label="Performance" />

      {/* Goal Header */}
      <CardSection className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold">{goal.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <StatusBadge status={goal.status} />
              <span className="text-sm text-muted-foreground">
                Assigned to {assigneeName}
              </span>
            </div>
          </div>
          {canManage && goal.status !== 'COMPLETED' && (
            <GoalActions tenantSlug={tenantSlug} goalId={goalId} />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{goal.progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                goal.progress >= 100
                  ? 'bg-emerald-500'
                  : goal.status === 'OVERDUE'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
              )}
              style={{ width: `${Math.min(100, goal.progress)}%` }}
            />
          </div>
        </div>
      </CardSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details & Update Form */}
        <div className="lg:col-span-2 space-y-6">
          {goal.description && (
            <CardSection title="Description">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{goal.description}</p>
            </CardSection>
          )}

          {canUpdateProgress && goal.status !== 'COMPLETED' && (
            <CardSection title="Update Progress">
              <UpdateProgressForm
                tenantSlug={tenantSlug}
                goalId={goalId}
                currentProgress={goal.progress}
              />
            </CardSection>
          )}

          <CardSection title="Activity">
            {mappedUpdates.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No updates yet. Update the progress to track activity.
              </p>
            ) : (
              <GoalTimeline updates={mappedUpdates} />
            )}
          </CardSection>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <CardSection title="Details">
            <FieldRow label="Assignee" value={assigneeName} />
            {goal.assignee.jobTitle && (
              <FieldRow label="Role" value={goal.assignee.jobTitle} />
            )}
            <FieldRow label="Created by" value={creatorName} />
            <FieldRow
              label="Created"
              value={goal.createdAt.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            />
            <FieldRow
              label="Due date"
              value={
                goal.dueDate
                  ? goal.dueDate.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '\u2014'
              }
            />
            <FieldRow label="Status" value={<StatusBadge status={goal.status} />} />
          </CardSection>

          {canManage && (
            <CardSection title="Danger Zone">
              <GoalActions tenantSlug={tenantSlug} goalId={goalId} showDelete />
            </CardSection>
          )}
        </div>
      </div>
    </div>
  )
}

import { requireTenant } from '@/lib/tenant'
import { isAtLeast, getDirectReportIds } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { PageHeader, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Target } from 'lucide-react'
import { GoalsTable } from './goals-table'

export default async function PerformancePage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ view?: string; status?: string; assignee?: string }>
}) {
  const { tenantSlug } = await params
  const { view, status, assignee } = await searchParams
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  // Find the employee record for this user (if any) — used for "My Goals" view
  const myEmployee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })

  // Reported bug: she reported seeing "1 performance goal" before any
  // had been assigned to her. Defensively bail straight to an empty
  // state for non-managers without a linked Employee row — there's no
  // way to scope queries by "her" if we don't know which Employee she
  // is, and the previous code path silently let `visibleAssigneeIds`
  // become `[]` (which a Prisma `{ in: [] }` filter handles correctly,
  // but only if every code path is careful).
  if (!isAtLeast(membership, 'MANAGER') && !myEmployee) {
    return (
      <div>
        <PageHeader
          title="Performance"
          description="Track your goals and progress"
        />
        <EmptyState
          icon={<Target className="h-10 w-10" />}
          title="No goals yet"
          description="Once your manager assigns you a goal it'll show up here."
        />
      </div>
    )
  }

  const showAll = view === 'all' || !myEmployee

  // Resolve the set of assignee IDs this user is allowed to see. ADMIN+ sees
  // everything (null = no filter). Non-admin managers see their direct reports
  // + any active delegations + themselves. EMPLOYEE only sees their own.
  let visibleAssigneeIds: string[] | null = null
  if (!isAtLeast(membership, 'ADMIN')) {
    if (isAtLeast(membership, 'MANAGER')) {
      const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
      const baseReportIds = reportIds ?? []

      let delegatedEmployeeIds: string[] = []
      if (myEmployee) {
        const now = new Date()
        const activeDelegations = await prisma.approvalDelegate.findMany({
          where: {
            delegateId: myEmployee.id,
            tenantId: tenant.id,
            startDate: { lte: now },
            endDate: { gte: now },
          },
          select: { managerId: true },
        })
        if (activeDelegations.length > 0) {
          const delegatedManagerIds = activeDelegations.map(
            (d: { managerId: string }) => d.managerId
          )
          const delegatedEmps = await prisma.employee.findMany({
            where: { tenantId: tenant.id, managerId: { in: delegatedManagerIds } },
            select: { id: true },
          })
          delegatedEmployeeIds = delegatedEmps.map((e: { id: string }) => e.id)
        }
      }

      const own = myEmployee ? [myEmployee.id] : []
      visibleAssigneeIds = Array.from(
        new Set([...baseReportIds, ...delegatedEmployeeIds, ...own])
      )
    } else {
      // Non-manager (EMPLOYEE) — own goals only.
      visibleAssigneeIds = myEmployee ? [myEmployee.id] : []
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseWhere: Record<string, any> = { tenantId: tenant.id }
  if (visibleAssigneeIds !== null) {
    baseWhere.assigneeId = { in: visibleAssigneeIds }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = { ...baseWhere }
  if (!showAll && myEmployee) {
    // "My goals" view — narrow further to just this user's assignments.
    where.assigneeId = myEmployee.id
  }
  if (status && status !== 'ALL') {
    where.status = status
  }
  if (assignee && assignee !== 'ALL') {
    where.assigneeId = assignee
  }

  const [goals, employees, counts] = await Promise.all([
    prisma.goal.findMany({
      where,
      include: {
        assignee: { select: { id: true, firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.employee.findMany({
      where:
        visibleAssigneeIds !== null
          ? { tenantId: tenant.id, status: 'ACTIVE', id: { in: visibleAssigneeIds } }
          : { tenantId: tenant.id, status: 'ACTIVE' },
      select: { id: true, firstName: true, lastName: true },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    }),
    prisma.goal.groupBy({
      by: ['status'],
      where: baseWhere,
      _count: true,
    }),
  ])

  // Reported bug: defence in depth — even if the where-clause filter
  // somehow lets a row through, post-filter the results in JS so a
  // non-manager only ever sees goals assigned to themselves.
  const allowedSet =
    visibleAssigneeIds === null ? null : new Set(visibleAssigneeIds)
  const safeGoals =
    allowedSet === null
      ? goals
      : goals.filter((g) => allowedSet.has(g.assigneeId))

  // The KPI tiles must show the SCOPED rollup (everything the user is
  // allowed to see), not the currently-filtered subset. Previously the
  // tiles were re-derived from `safeGoals`, which is the ALREADY-status-
  // filtered list — so applying a status=OVERDUE filter dropped the
  // ON_TRACK / COMPLETED tiles to 0 and left the user with no
  // orientation. Use the groupBy result (which uses `baseWhere`, scope-
  // only, no status filter) directly so the tiles stay stable when
  // filtering. (Round 6.)
  const totalScoped = counts.reduce((sum, c) => sum + c._count, 0)
  const statusCounts = {
    total: totalScoped,
    NOT_STARTED: counts.find((c) => c.status === 'NOT_STARTED')?._count ?? 0,
    ON_TRACK: counts.find((c) => c.status === 'ON_TRACK')?._count ?? 0,
    OVERDUE: counts.find((c) => c.status === 'OVERDUE')?._count ?? 0,
    COMPLETED: counts.find((c) => c.status === 'COMPLETED')?._count ?? 0,
  }

  return (
    <div>
      <PageHeader
        title="Performance"
        description="Track goals and monitor progress across your team"
        action={
          canManage ? (
            <Link href={`/t/${tenantSlug}/performance/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create goal
              </Button>
            </Link>
          ) : undefined
        }
      />

      {statusCounts.total === 0 ? (
        <EmptyState
          icon={<Target className="h-10 w-10" />}
          title="No goals yet"
          description="Set performance goals for your team to track progress and drive results."
          action={
            canManage ? (
              <Link href={`/t/${tenantSlug}/performance/new`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create first goal
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <GoalsTable
          goals={safeGoals.map((g) => ({
            id: g.id,
            title: g.title,
            status: g.status,
            progress: g.progress,
            dueDate: g.dueDate ? g.dueDate.toISOString() : null,
            assigneeName: `${g.assignee.firstName} ${g.assignee.lastName}`,
            assigneeId: g.assignee.id,
            createdAt: g.createdAt.toISOString(),
          }))}
          employees={employees}
          tenantSlug={tenantSlug}
          canManage={canManage}
          hasMyEmployee={!!myEmployee}
          filters={{ view: view || (myEmployee ? 'my' : 'all'), status, assignee }}
          statusCounts={statusCounts}
        />
      )}
    </div>
  )
}

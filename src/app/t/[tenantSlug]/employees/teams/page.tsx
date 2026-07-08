import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { PageHeader, BackLink, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Users, Crown } from 'lucide-react'
import { CreateTeamDialog } from './create-team-dialog'

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { tenant, membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const teams = await prisma.team.findMany({
    where: { tenantId: tenant.id },
    include: {
      manager: { select: { id: true, firstName: true, lastName: true } },
      _count: { select: { members: true } },
    },
    orderBy: { name: 'asc' },
  })

  const employees = canManage
    ? await prisma.employee.findMany({
        where: { tenantId: tenant.id, status: 'ACTIVE' },
        select: { id: true, firstName: true, lastName: true, jobTitle: true },
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
      })
    : []

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/employees`} label="Employees" />
      <PageHeader
        title="Teams"
        description={`${teams.length} team${teams.length !== 1 ? 's' : ''}`}
        action={
          canManage ? (
            <CreateTeamDialog tenantSlug={tenantSlug} employees={employees} />
          ) : undefined
        }
      />

      {teams.length === 0 ? (
        <EmptyState
          icon={<Users className="h-10 w-10" />}
          title="No teams yet"
          description="Create your first team to organise employees into groups."
          action={
            canManage ? (
              <CreateTeamDialog tenantSlug={tenantSlug} employees={employees} />
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/t/${tenantSlug}/employees/teams/${team.id}`}
              className="group block"
            >
              <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {team._count.members} member{team._count.members !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {team.manager && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Crown className="h-3.5 w-3.5 text-amber-500" />
                    <span>
                      {team.manager.firstName} {team.manager.lastName}
                    </span>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t">
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    View team
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

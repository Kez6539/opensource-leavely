import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PageHeader, BackLink } from '@/components/shared'
import { TeamDetailClient } from './team-detail-client'

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; teamId: string }>
}) {
  const { tenantSlug, teamId } = await params
  const { tenant, membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')
  const isAdmin = isAtLeast(membership, 'ADMIN')

  const team = await prisma.team.findFirst({
    where: { id: teamId, tenantId: tenant.id },
    include: {
      manager: {
        select: { id: true, firstName: true, lastName: true, jobTitle: true },
      },
      members: {
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              jobTitle: true,
              department: true,
              email: true,
            },
          },
        },
        orderBy: { employee: { firstName: 'asc' } },
      },
    },
  })

  if (!team) notFound()

  // Get all active employees for the add member dropdown
  const allEmployees = canManage
    ? await prisma.employee.findMany({
        where: { tenantId: tenant.id, status: 'ACTIVE' },
        select: { id: true, firstName: true, lastName: true, jobTitle: true },
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
      })
    : []

  // Serialise dates
  const serializedTeam = {
    id: team.id,
    name: team.name,
    managerId: team.managerId,
    manager: team.manager,
    members: team.members.map((m) => ({
      id: m.id,
      employeeId: m.employeeId,
      employee: m.employee,
    })),
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/employees/teams`} label="Teams" />
      <TeamDetailClient
        tenantSlug={tenantSlug}
        team={serializedTeam}
        employees={allEmployees}
        canManage={canManage}
        isAdmin={isAdmin}
      />
    </div>
  )
}

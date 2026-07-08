import { PageHeader, BackLink } from '@/components/shared'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { GoalForm } from '../goal-form'

export default async function NewGoalPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { tenant, membership } = await requireTenant(tenantSlug)

  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/performance`)
  }

  const employees = await prisma.employee.findMany({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
    select: { id: true, firstName: true, lastName: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/performance`} label="Performance" />
      <PageHeader title="Create Goal" description="Set a new performance goal for a team member" />
      <GoalForm tenantSlug={tenantSlug} employees={employees} />
    </div>
  )
}

import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getRota, getShiftTemplates, getActiveEmployees, getLeaveConflicts } from '../actions'
import { PageHeader, BackLink } from '@/components/shared'
import { RotaDetail } from './rota-detail'

export default async function RotaDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; rotaId: string }>
}) {
  const { tenantSlug, rotaId } = await params
  const { membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const [rota, shiftTemplates, employees] = await Promise.all([
    getRota(tenantSlug, rotaId),
    getShiftTemplates(tenantSlug),
    getActiveEmployees(tenantSlug),
  ])

  // Get leave conflicts for all employees in the rota date range
  const employeeIds = employees.map((e) => e.id)
  const leaveConflicts = employeeIds.length > 0
    ? await getLeaveConflicts(
        tenantSlug,
        employeeIds,
        new Date(rota.startDate).toISOString().split('T')[0],
        new Date(rota.endDate).toISOString().split('T')[0]
      )
    : {}

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/rotas`} label="Rotas & Shifts" />
      <PageHeader
        title={rota.name}
        description={`${new Date(rota.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} - ${new Date(rota.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      />
      <RotaDetail
        rota={rota}
        shiftTemplates={shiftTemplates}
        employees={employees}
        tenantSlug={tenantSlug}
        canManage={canManage}
        leaveConflicts={leaveConflicts}
      />
    </div>
  )
}

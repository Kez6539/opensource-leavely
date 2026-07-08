import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getRotas, getShiftTemplates } from './actions'
import { RotasTabs } from './rotas-tabs'

export default async function RotasPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { tenantSlug } = await params
  const { tab } = await searchParams
  const { membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const [allRotas, shiftTemplates] = await Promise.all([
    getRotas(tenantSlug),
    getShiftTemplates(tenantSlug),
  ])

  const activeRotas = allRotas.filter(
    (r) => r.status === 'DRAFT' || r.status === 'PUBLISHED'
  )
  const archivedRotas = allRotas.filter((r) => r.status === 'ARCHIVED')

  return (
    <RotasTabs
      tenantSlug={tenantSlug}
      activeRotas={activeRotas}
      archivedRotas={archivedRotas}
      shiftTemplates={shiftTemplates}
      canManage={canManage}
      currentTab={tab}
    />
  )
}

import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getLocations } from './actions'
import { LocationsClient } from './locations-client'

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { tenant, membership } = await requireTenant(tenantSlug)
  const isAdmin = isAtLeast(membership, 'ADMIN')
  const locations = await getLocations(tenantSlug)

  return (
    <LocationsClient
      tenantSlug={tenantSlug}
      locations={locations}
      isAdmin={isAdmin}
      clockInEnabled={tenant.clockInEnabled}
    />
  )
}

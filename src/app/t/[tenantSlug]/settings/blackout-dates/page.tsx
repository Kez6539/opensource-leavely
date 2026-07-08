import { getBlackoutDates } from './actions'
import { BlackoutDatesClient } from './blackout-dates-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function BlackoutDatesPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const blackoutDates = await getBlackoutDates(tenantSlug)
  const admin = isAtLeast(membership, 'ADMIN')

  return <BlackoutDatesClient blackoutDates={blackoutDates} tenantSlug={tenantSlug} isAdmin={admin} />
}

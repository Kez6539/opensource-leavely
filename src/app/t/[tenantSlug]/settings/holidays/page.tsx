import { getPublicHolidays } from './actions'
import { HolidaysClient } from './holidays-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function HolidaysPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const holidays = await getPublicHolidays(tenantSlug)
  const admin = isAtLeast(membership, 'ADMIN')

  return <HolidaysClient holidays={holidays} tenantSlug={tenantSlug} isAdmin={admin} />
}

import { getMyDelegations, getDelegateOptions } from './actions'
import { DelegationClient } from './delegation-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function DelegationPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const isAdmin = isAtLeast(membership, 'ADMIN')

  const [delegations, delegateOptions] = await Promise.all([
    getMyDelegations(tenantSlug),
    getDelegateOptions(tenantSlug),
  ])

  return (
    <DelegationClient
      delegations={delegations}
      delegateOptions={delegateOptions}
      tenantSlug={tenantSlug}
      isAdmin={isAdmin}
    />
  )
}

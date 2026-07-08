import { getCompanyLeaves, getDeductiblePolicies } from './actions'
import { CompanyLeaveClient } from './company-leave-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function CompanyLeavePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const [leaves, policies] = await Promise.all([
    getCompanyLeaves(tenantSlug),
    getDeductiblePolicies(tenantSlug),
  ])
  const admin = isAtLeast(membership, 'ADMIN')

  return (
    <CompanyLeaveClient
      leaves={leaves}
      policies={policies}
      tenantSlug={tenantSlug}
      isAdmin={admin}
    />
  )
}

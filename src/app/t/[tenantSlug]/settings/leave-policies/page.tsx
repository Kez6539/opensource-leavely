import { getLeavePolicies } from './actions'
import { LeavePoliciesClient } from './leave-policies-client'

export default async function LeavePoliciesPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const policies = await getLeavePolicies(tenantSlug)

  const hasLatenessPolicy = policies.some(
    (p) => p.isSystemType === 'lateness' || p.name.toLowerCase().includes('late')
  )

  return <LeavePoliciesClient policies={policies} tenantSlug={tenantSlug} hasLatenessPolicy={hasLatenessPolicy} />
}

import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { redirect } from 'next/navigation'
import { PageHeader, BackLink } from '@/components/shared'
import { CreateReviewCycleForm } from './create-review-cycle-form'

export default async function NewReviewCyclePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)

  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/performance/reviews`)
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/performance/reviews`} label="Review Cycles" />
      <PageHeader
        title="Create Review Cycle"
        description="Set up a new performance review cycle. Reviews will be automatically created for all active employees."
      />
      <CreateReviewCycleForm tenantSlug={tenantSlug} />
    </div>
  )
}

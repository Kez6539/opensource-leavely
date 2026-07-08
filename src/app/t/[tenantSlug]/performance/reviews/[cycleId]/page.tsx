import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getReviewCycleDetail } from '../actions'
import { PageHeader, BackLink } from '@/components/shared'
import { ReviewCycleDetail } from './review-cycle-detail'

export default async function ReviewCycleDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; cycleId: string }>
}) {
  const { tenantSlug, cycleId } = await params
  const { membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const cycle = await getReviewCycleDetail(tenantSlug, cycleId)

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/performance/reviews`} label="Review Cycles" />
      <PageHeader
        title={cycle.name}
        description={`${new Date(cycle.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} - ${new Date(cycle.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      />
      <ReviewCycleDetail
        cycle={{
          ...cycle,
          startDate: cycle.startDate.toISOString(),
          endDate: cycle.endDate.toISOString(),
          reviews: cycle.reviews.map((r) => ({
            ...r,
            completedAt: r.completedAt ? r.completedAt.toISOString() : null,
          })),
        }}
        tenantSlug={tenantSlug}
        canManage={canManage}
      />
    </div>
  )
}

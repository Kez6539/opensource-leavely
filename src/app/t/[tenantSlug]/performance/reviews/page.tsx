import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getReviewCycles } from './actions'
import { PageHeader, BackLink, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, ClipboardList } from 'lucide-react'
import { ReviewCyclesList } from './review-cycles-list'

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  const cycles = await getReviewCycles(tenantSlug)

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/performance`} label="Performance" />
      <PageHeader
        title="Review Cycles"
        description="Manage performance review cycles for your team"
        action={
          canManage ? (
            <Link href={`/t/${tenantSlug}/performance/reviews/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create review cycle
              </Button>
            </Link>
          ) : undefined
        }
      />

      {cycles.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="h-10 w-10" />}
          title="No review cycles"
          description="Create your first review cycle to start evaluating team performance."
          action={
            canManage ? (
              <Link href={`/t/${tenantSlug}/performance/reviews/new`}>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create first review cycle
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <ReviewCyclesList
          cycles={cycles.map((c) => ({
            ...c,
            startDate: c.startDate.toISOString(),
            endDate: c.endDate.toISOString(),
            createdAt: c.createdAt.toISOString(),
          }))}
          tenantSlug={tenantSlug}
        />
      )}
    </div>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { StatusBadge, ConfirmDialog, KpiTile } from '@/components/shared'
import { cn } from '@/lib/utils'
import {
  Play,
  CheckCircle2,
  Users,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react'
import { activateReviewCycle, completeReviewCycle } from '../actions'
import { ReviewForm } from './review-form'

interface ReviewData {
  id: string
  status: string
  overallRating: number | null
  strengths: string | null
  improvements: string | null
  notes: string | null
  completedAt: string | null
  employeeId: string
  employeeName: string
  employeeJobTitle: string | null
  employeeDepartment: string | null
  reviewerId: string | null
  reviewerName: string
}

interface CycleData {
  id: string
  name: string
  startDate: string
  endDate: string
  status: string
  totalReviews: number
  completedReviews: number
  completionPercent: number
  reviews: ReviewData[]
}

interface ReviewCycleDetailProps {
  cycle: CycleData
  tenantSlug: string
  canManage: boolean
}

const statusMap: Record<string, string> = {
  draft: 'DRAFT',
  active: 'PUBLISHED',
  completed: 'COMPLETED',
  pending: 'PENDING',
  in_progress: 'IN_PROGRESS',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  )
}

export function ReviewCycleDetail({
  cycle,
  tenantSlug,
  canManage,
}: ReviewCycleDetailProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirmAction, setConfirmAction] = useState<'activate' | 'complete' | null>(null)
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const handleActivate = () => {
    startTransition(async () => {
      try {
        const result = await activateReviewCycle(tenantSlug, cycle.id)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        setConfirmAction(null)
        toast.success('Review cycle activated')
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to activate')
      }
    })
  }

  const handleComplete = () => {
    startTransition(async () => {
      try {
        const result = await completeReviewCycle(tenantSlug, cycle.id)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        setConfirmAction(null)
        toast.success('Review cycle completed')
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to complete')
      }
    })
  }

  const pendingCount = cycle.reviews.filter((r) => r.status === 'pending').length
  const avgRating = (() => {
    const completed = cycle.reviews.filter((r) => r.overallRating != null)
    if (completed.length === 0) return 0
    return Math.round(
      (completed.reduce((sum, r) => sum + (r.overallRating || 0), 0) / completed.length) * 10
    ) / 10
  })()

  const filteredReviews = cycle.reviews.filter((r) => {
    if (filter === 'all') return true
    return r.status === filter
  })

  return (
    <div>
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <StatusBadge status={statusMap[cycle.status] || cycle.status.toUpperCase()} />
        <div className="flex-1" />

        {canManage && cycle.status === 'draft' && (
          <Button onClick={() => setConfirmAction('activate')} disabled={isPending}>
            <Play className="mr-2 h-4 w-4" />
            Activate cycle
          </Button>
        )}
        {canManage && cycle.status === 'active' && (
          <Button onClick={() => setConfirmAction('complete')} disabled={isPending}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete cycle
          </Button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <KpiTile
          label="Total Reviews"
          value={cycle.totalReviews}
          icon={<Users className="h-4 w-4" />}
        />
        <KpiTile
          label="Completed"
          value={cycle.completedReviews}
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="border-l-emerald-500"
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <KpiTile
          label="Pending"
          value={pendingCount}
          icon={<Clock className="h-4 w-4" />}
          accent="border-l-amber-500"
          iconBg="bg-amber-50 text-amber-600"
        />
        <KpiTile
          label="Avg Rating"
          value={avgRating > 0 ? `${avgRating}/5` : '--'}
          icon={<Star className="h-4 w-4" />}
          accent="border-l-blue-500"
          iconBg="bg-blue-50 text-blue-600"
        />
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="flex items-center gap-1.5 font-medium">
            <TrendingUp className="h-4 w-4" />
            Overall completion
          </span>
          <span className="text-muted-foreground">
            {cycle.completedReviews}/{cycle.totalReviews} ({cycle.completionPercent}%)
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              cycle.completionPercent >= 100
                ? 'bg-emerald-500'
                : cycle.completionPercent >= 50
                ? 'bg-blue-500'
                : 'bg-amber-500'
            )}
            style={{ width: `${cycle.completionPercent}%` }}
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 mb-4">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'in_progress', label: 'In Progress' },
          { key: 'completed', label: 'Completed' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filter === f.key
                ? 'bg-foreground text-background border-foreground'
                : 'text-muted-foreground border-border hover:border-foreground/50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Reviews table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left font-medium px-4 py-3">Employee</th>
              <th className="text-left font-medium px-4 py-3 hidden sm:table-cell">Department</th>
              <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Reviewer</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Rating</th>
              <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Completed</th>
              {canManage && cycle.status !== 'completed' && (
                <th className="text-right font-medium px-4 py-3">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                  No reviews match your filter.
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{review.employeeName}</div>
                    {review.employeeJobTitle && (
                      <div className="text-xs text-muted-foreground">{review.employeeJobTitle}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {review.employeeDepartment || '--'}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {review.reviewerName}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={statusMap[review.status] || review.status.toUpperCase()} />
                  </td>
                  <td className="px-4 py-3">
                    {review.overallRating ? (
                      <StarRating rating={review.overallRating} />
                    ) : (
                      <span className="text-muted-foreground/50">--</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {review.completedAt
                      ? new Date(review.completedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '--'}
                  </td>
                  {canManage && cycle.status !== 'completed' && (
                    <td className="px-4 py-3 text-right">
                      {review.status !== 'completed' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedReview(review)}
                        >
                          Complete review
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedReview(review)}
                        >
                          View
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review form dialog */}
      {selectedReview && (
        <ReviewForm
          review={selectedReview}
          tenantSlug={tenantSlug}
          onClose={() => {
            setSelectedReview(null)
            router.refresh()
          }}
        />
      )}

      {/* Confirm dialogs */}
      <ConfirmDialog
        open={confirmAction === 'activate'}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Activate this review cycle?"
        description="Activating the cycle signals that reviews can now be conducted. Reviewers will be able to submit their evaluations."
        confirmLabel="Activate"
        variant="default"
        onConfirm={handleActivate}
        loading={isPending}
      />
      <ConfirmDialog
        open={confirmAction === 'complete'}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Complete this review cycle?"
        description={`${cycle.totalReviews - cycle.completedReviews} review(s) are still pending. Completing the cycle will close it. Are you sure?`}
        confirmLabel="Complete cycle"
        variant="default"
        onConfirm={handleComplete}
        loading={isPending}
      />
    </div>
  )
}

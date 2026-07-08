'use client'

import Link from 'next/link'
import { StatusBadge } from '@/components/shared'
import { CalendarDays, Users, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReviewCycleSummary {
  id: string
  name: string
  startDate: string
  endDate: string
  status: string
  totalReviews: number
  completedReviews: number
  completionPercent: number
  createdAt: string
}

interface ReviewCyclesListProps {
  cycles: ReviewCycleSummary[]
  tenantSlug: string
}

const statusMap: Record<string, string> = {
  draft: 'DRAFT',
  active: 'PUBLISHED',
  completed: 'COMPLETED',
}

export function ReviewCyclesList({ cycles, tenantSlug }: ReviewCyclesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cycles.map((cycle) => (
        <Link key={cycle.id} href={`/t/${tenantSlug}/performance/reviews/${cycle.id}`}>
          <div className="rounded-lg border bg-card p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {cycle.name}
              </h3>
              <StatusBadge status={statusMap[cycle.status] || cycle.status.toUpperCase()} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(cycle.startDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
                {' - '}
                {new Date(cycle.endDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {cycle.totalReviews} review{cycle.totalReviews !== 1 ? 's' : ''}
              </div>

              {/* Completion progress */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Completion
                  </span>
                  <span className="font-medium">
                    {cycle.completedReviews}/{cycle.totalReviews} ({cycle.completionPercent}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

import { PageHeader, SkeletonBlock } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function PerformanceLoading() {
  return (
    <div>
      <PageHeader title="Performance" description="Track goals and monitor progress across your team" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <div className="flex gap-3 mb-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="rounded-lg border shadow-sm">
        <SkeletonBlock lines={6} />
      </div>
    </div>
  )
}

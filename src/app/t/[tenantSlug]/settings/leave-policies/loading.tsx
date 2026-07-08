import { SkeletonBlock } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function LeavePoliciesLoading() {
  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <SkeletonBlock lines={2} />
          </div>
        ))}
      </div>
    </div>
  )
}

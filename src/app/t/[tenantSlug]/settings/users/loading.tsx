import { SkeletonBlock } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function UsersLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="rounded-xl border shadow-sm">
        <SkeletonBlock lines={6} />
      </div>
    </div>
  )
}

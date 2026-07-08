import { PageHeader, SkeletonBlock } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function LeaveLoading() {
  return (
    <div>
      <PageHeader title="Leave Requests" description="Manage time-off requests" />
      <div className="flex gap-3 mb-4">
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="rounded-xl border shadow-sm p-4">
        <SkeletonBlock lines={6} />
      </div>
    </div>
  )
}

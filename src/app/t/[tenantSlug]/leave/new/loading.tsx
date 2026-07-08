import { PageHeader } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function NewLeaveRequestLoading() {
  return (
    <div>
      <PageHeader title="Book leave" description="Submit a leave request for approval" />
      <div className="max-w-2xl">
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  )
}

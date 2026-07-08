import { PageHeader } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditEmployeeLoading() {
  return (
    <div>
      <PageHeader title="Edit Employee" />
      <div className="max-w-2xl space-y-6">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
      </div>
    </div>
  )
}

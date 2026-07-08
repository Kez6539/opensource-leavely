import { PageHeader } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function EmployeeDetailLoading() {
  return (
    <div>
      <PageHeader title="Loading…" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    </div>
  )
}

import { PageHeader, SkeletonBlock } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function EmployeesLoading() {
  return (
    <div>
      <PageHeader title="Employees" description="Manage your team members" />
      <div className="flex gap-3 mb-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="rounded-xl border shadow-sm">
        <SkeletonBlock lines={8} />
      </div>
    </div>
  )
}

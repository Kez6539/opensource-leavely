import { PageHeader } from '@/components/shared'
import { Skeleton } from '@/components/ui/skeleton'

export default function CalendarLoading() {
  return (
    <div>
      <PageHeader title="Leave Calendar" description="Monthly overview of approved absences" />
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-8" />
      </div>
      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  )
}

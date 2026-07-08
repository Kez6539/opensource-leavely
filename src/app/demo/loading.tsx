import { Skeleton } from '@/components/ui/skeleton'

export default function DemoLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5" aria-busy="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <Skeleton className="mx-auto h-12 w-12 rounded-full bg-emerald-100" />
        <div className="mt-5 space-y-3">
          <Skeleton className="mx-auto h-5 w-40 bg-gray-100" />
          <Skeleton className="mx-auto h-4 w-56 bg-gray-100" />
          <Skeleton className="h-11 w-full rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  )
}

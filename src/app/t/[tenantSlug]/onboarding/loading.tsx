import { Skeleton } from '@/components/ui/skeleton'

export default function OnboardingLoading() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-16 ml-2 hidden sm:block" />
          </div>
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  )
}

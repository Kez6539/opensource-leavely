import { Logo } from '@/components/shared/logo'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, Star } from 'lucide-react'

export default function BookADemoLoading() {
  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-b from-emerald-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 w-[320px] h-[320px] rounded-full bg-teal-300/15 blur-3xl"
      />

      <header className="relative px-5 sm:px-8 pt-5 pb-2 flex items-center justify-between">
        <Logo className="h-16 brightness-0 invert" />
        <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
          <div className="flex -space-x-0.5">
            {[0, 1, 2, 3, 4].map((item) => (
              <Star key={item} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <span className="hidden sm:inline">Rated 4.9 by UK teams</span>
        </div>
      </header>

      <main className="relative flex-1 px-5 sm:px-8 pt-4 pb-12" aria-busy="true">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-start">
          <div className="max-w-xl">
            <Skeleton className="h-7 w-44 rounded-full bg-white/20" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-10 w-full bg-white/20" />
              <Skeleton className="h-10 w-9/12 bg-white/20" />
              <Skeleton className="h-5 w-10/12 bg-white/20" />
              <Skeleton className="h-5 w-7/12 bg-white/20" />
            </div>
            <div className="mt-7 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 shadow-xl max-w-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-white/70" />
                  <Skeleton className="h-4 w-20 bg-white/20" />
                </div>
                <Skeleton className="h-3 w-16 bg-white/20" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-9 rounded-lg bg-white/20" />
                ))}
              </div>
            </div>
            <div className="mt-7 space-y-2">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-5 w-10/12 bg-white/20" />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl bg-white text-gray-900 p-5 sm:p-7 shadow-2xl shadow-black/20 border border-white/30">
              <Skeleton className="h-6 w-48 bg-gray-100" />
              <Skeleton className="mt-2 h-4 w-10/12 bg-gray-100" />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="space-y-2">
                    <Skeleton className="h-4 w-24 bg-gray-100" />
                    <Skeleton className="h-10 w-full bg-gray-100" />
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-28 bg-gray-100" />
                <Skeleton className="h-10 w-full bg-gray-100" />
              </div>
              <Skeleton className="mt-5 h-11 w-full bg-gray-100" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

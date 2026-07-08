import { Logo } from '@/components/shared/logo'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, ShieldCheck } from 'lucide-react'

export default function TryLoading() {
  return (
    <div className="min-h-[100svh] flex flex-col bg-[#FAF8F4] text-stone-900 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[680px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(5, 150, 105, 0.10), rgba(5, 150, 105, 0) 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      <header className="relative px-5 pt-5 pb-2 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Logo className="h-12" />
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white border border-stone-200 px-3 py-1 text-[11px] font-semibold text-stone-700 shadow-sm">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          UK-built · GDPR-ready
        </div>
      </header>

      <main className="relative flex-1 flex flex-col px-5 pt-6 pb-12" aria-busy="true">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <Skeleton className="h-7 w-36 rounded-full bg-emerald-100" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-10 w-full bg-stone-200" />
              <Skeleton className="h-10 w-10/12 bg-stone-200" />
              <Skeleton className="h-5 w-11/12 bg-stone-200" />
              <Skeleton className="h-5 w-8/12 bg-stone-200" />
            </div>
            <Skeleton className="mt-5 h-10 w-full max-w-sm rounded-xl bg-white" />
            <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
              <Skeleton className="h-5 w-56 bg-stone-100" />
              <Skeleton className="mt-2 h-4 w-10/12 bg-stone-100" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-14 w-full rounded-lg bg-stone-100" />
                <Skeleton className="h-14 w-full rounded-lg bg-stone-100" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-11/12 bg-stone-100" />
                <Skeleton className="h-3 w-9/12 bg-stone-100" />
                <Skeleton className="h-3 w-10/12 bg-stone-100" />
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:mt-2">
            <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xl shadow-stone-900/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-stone-400" />
                  <Skeleton className="h-4 w-32 bg-stone-100" />
                </div>
                <Skeleton className="h-3 w-16 bg-stone-100" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} className="h-10 w-full rounded-lg bg-stone-100" />
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-28 rounded-xl bg-white" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

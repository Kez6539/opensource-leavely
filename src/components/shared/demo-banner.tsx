import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'

export function DemoBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-sm">
      <div className="inline-flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
        <span className="text-amber-800">
          <strong>Shared demo workspace</strong> &mdash; do not enter real employee data.
          Other visitors can see what you do here.
        </span>
        <Link
          href="/register"
          className="inline-flex items-center gap-1 text-amber-700 font-semibold hover:underline ml-2"
        >
          Start your own free trial
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

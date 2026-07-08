'use client'

import { Thermometer } from 'lucide-react'
import type { MySicknessTrendBucket } from './dashboard-actions'

export function MySicknessTrend({ data }: { data: MySicknessTrendBucket[] }) {
  const total = data.reduce((s, b) => s + b.days, 0)
  // y-axis ceiling: at least 5, rounded up to a whole day so an empty
  // chart still looks like a chart and the bars don't cap out at the top.
  const max = Math.max(5, Math.ceil(Math.max(...data.map((d) => d.days), 0)))
  const currentKey = data[data.length - 1]?.monthKey

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Thermometer className="h-4 w-4 text-red-500 shrink-0" />
          <h3 className="text-sm font-semibold truncate">My sickness — last 12 months</h3>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {Math.round(total * 10) / 10} {total === 1 ? 'day' : 'days'} total
        </span>
      </div>

      <div className="flex items-end gap-2 h-40">
        {data.map((b) => {
          const heightPct = max > 0 ? (b.days / max) * 100 : 0
          const isCurrent = b.monthKey === currentKey
          return (
            <div
              key={b.monthKey}
              className="flex-1 flex flex-col items-center gap-1.5 min-w-0"
              title={`${b.monthLabel} ${b.yearLabel}: ${b.days} ${b.days === 1 ? 'day' : 'days'}`}
            >
              <div className="text-[10px] text-muted-foreground tabular-nums leading-none h-3">
                {b.days > 0 ? b.days : ''}
              </div>
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`w-full rounded-t-sm transition-colors ${
                    b.days === 0
                      ? 'bg-muted'
                      : isCurrent
                      ? 'bg-red-500'
                      : 'bg-red-300 dark:bg-red-900/60'
                  }`}
                  style={{ height: `${Math.max(heightPct, b.days > 0 ? 4 : 2)}%` }}
                />
              </div>
              <div className="text-[10px] text-muted-foreground leading-none truncate w-full text-center">
                {b.monthLabel}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

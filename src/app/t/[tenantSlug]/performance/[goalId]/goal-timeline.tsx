'use client'

import { cn } from '@/lib/utils'

interface GoalUpdate {
  id: string
  note: string | null
  progress: number
  userName: string
  createdAt: string
}

interface GoalTimelineProps {
  updates: GoalUpdate[]
}

export function GoalTimeline({ updates }: GoalTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

      <div className="space-y-4">
        {updates.map((update, idx) => (
          <div key={update.id} className="relative flex gap-3 pl-0">
            {/* Dot */}
            <div
              className={cn(
                'relative z-10 mt-1.5 h-[9px] w-[9px] rounded-full border-2 shrink-0',
                update.progress >= 100
                  ? 'bg-emerald-500 border-emerald-500'
                  : idx === 0
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-muted-foreground/40'
              )}
              style={{ marginLeft: '4px' }}
            />

            {/* Content */}
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-sm font-medium">{update.userName}</span>
                <span className="text-xs text-muted-foreground">
                  updated progress to {update.progress}%
                </span>
                <span className="text-xs text-muted-foreground/60">
                  {new Date(update.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  at{' '}
                  {new Date(update.createdAt).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {update.note && (
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                  {update.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

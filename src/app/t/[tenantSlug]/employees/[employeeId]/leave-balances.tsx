'use client'

import { CardSection } from '@/components/shared/card-section'

interface Balance {
  id: string
  policyName: string
  policyUnit?: string
  allowance: number
  used: number
  pending: number
  remaining: number
  serviceBonusDays?: number
  deductBankHolidays?: boolean
  bankHolidayCount?: number
}

function getBarColor(remaining: number, allowance: number) {
  if (allowance === 0) return 'bg-gray-300'
  const pct = remaining / allowance
  if (pct > 0.5) return 'bg-emerald-500'
  if (pct > 0.25) return 'bg-amber-500'
  return 'bg-red-500'
}

export function LeaveBalances({ balances, leaveYearLabel }: { balances: Balance[]; leaveYearLabel?: string }) {
  if (balances.length === 0) {
    return (
      <CardSection title="Leave Balances">
        <p className="text-sm text-muted-foreground py-4">No leave balances found</p>
      </CardSection>
    )
  }

  return (
    <CardSection title="Leave Balances">
      {leaveYearLabel && (
        <p className="text-xs text-muted-foreground -mt-1 mb-3">{leaveYearLabel}</p>
      )}
      <div className="space-y-4">
        {balances.map((b) => {
          const usedPct = b.allowance > 0 ? (b.used / b.allowance) * 100 : 0
          const pendingPct = b.allowance > 0 ? (b.pending / b.allowance) * 100 : 0
          const remainingPct = b.allowance > 0 ? (b.remaining / b.allowance) * 100 : 0
          const barColor = getBarColor(b.remaining, b.allowance)

          return (
            <div key={b.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{b.policyName}</span>
                <span className="text-xs text-muted-foreground">
                  {b.remaining} of {b.allowance} {b.policyUnit === 'hours' ? 'hours' : 'days'} remaining
                </span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden flex">
                {b.used > 0 && (
                  <div
                    className="bg-slate-400 h-full transition-all"
                    style={{ width: `${usedPct}%` }}
                    title={`Used: ${b.used}`}
                  />
                )}
                {b.pending > 0 && (
                  <div
                    className="bg-amber-300 h-full transition-all"
                    style={{ width: `${pendingPct}%` }}
                    title={`Pending: ${b.pending}`}
                  />
                )}
                {b.remaining > 0 && (
                  <div
                    className={`${barColor} h-full transition-all`}
                    style={{ width: `${remainingPct}%` }}
                    title={`Remaining: ${b.remaining}`}
                  />
                )}
              </div>
              <div className="flex gap-4 mt-1 text-[11px] text-muted-foreground">
                {(() => { const u = b.policyUnit === 'hours' ? 'h' : 'd'; return (<>
                  <span>Used: {b.used}{u}</span>
                  <span>Pending: {b.pending}{u}</span>
                  <span>Remaining: {b.remaining}{u}</span>
                  {b.serviceBonusDays !== undefined && b.serviceBonusDays > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      +{b.serviceBonusDays}d service bonus
                    </span>
                  )}
                  {b.bankHolidayCount !== undefined && b.bankHolidayCount > 0 && (
                    b.deductBankHolidays ? (
                      <span className="text-blue-600 dark:text-blue-400">
                        Including {b.bankHolidayCount} bank holiday{b.bankHolidayCount !== 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        + {b.bankHolidayCount} bank holiday{b.bankHolidayCount !== 1 ? 's' : ''} paid on top
                      </span>
                    )
                  )}
                </>)})()}
              </div>
            </div>
          )
        })}
      </div>
    </CardSection>
  )
}

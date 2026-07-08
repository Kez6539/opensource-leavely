'use client'

import { CalendarDays, Clock, UserX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Balance {
  id: string
  policyName: string
  policyUnit?: string
  allowance: number
  used: number
  pending: number
  remaining: number
  isProRated?: boolean
  deductBankHolidays?: boolean
  bankHolidayCount?: number
}

interface ToilBalance {
  accrued: number
  used: number
  remaining: number
}

interface NextLeave {
  policyName: string
  startDate: string
  endDate: string
}

export function MySummary({
  balances,
  toilBalance,
  nextLeave,
  leaveYearLabel,
  hasEmployeeRecord,
  tenantSlug,
}: {
  balances: Balance[]
  toilBalance?: ToilBalance | null
  nextLeave?: NextLeave | null
  leaveYearLabel?: string
  hasEmployeeRecord?: boolean
  tenantSlug?: string
}) {
  if (!hasEmployeeRecord) {
    return (
      <div className="rounded-lg border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-4">My summary</h3>
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <UserX className="h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm">No employee record linked</p>
          {tenantSlug && (
            <Link href={`/t/${tenantSlug}/employees/new`}>
              <Button variant="outline" size="sm">Create my profile</Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Show Holiday/Annual Leave as primary, falling back to highest allowance
  const sorted = [...balances].sort((a, b) => {
    const aIsHoliday = a.policyName.toLowerCase().includes('holiday') || a.policyName.toLowerCase().includes('annual') ? 1 : 0
    const bIsHoliday = b.policyName.toLowerCase().includes('holiday') || b.policyName.toLowerCase().includes('annual') ? 1 : 0
    if (aIsHoliday !== bIsHoliday) return bIsHoliday - aIsHoliday
    return b.allowance - a.allowance
  })
  const primary = sorted[0]

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4">My summary</h3>

      {primary && (() => {
        const unitLabel = primary.policyUnit === 'hours' ? 'hours' : 'days'
        return (
        <div className="mb-5">
          <p className="text-sm font-medium text-foreground mb-1">{primary.policyName}</p>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-2xl font-bold">{primary.remaining} {unitLabel}</span>
            <span className="text-sm text-muted-foreground">remaining</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {primary.allowance} {unitLabel} allowance
            {primary.isProRated && (
              <span className="ml-1.5 text-xs text-amber-600 font-medium">(pro-rata)</span>
            )}
          </p>
          {primary.bankHolidayCount !== undefined && primary.bankHolidayCount > 0 ? (
            primary.deductBankHolidays ? (
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-3">
                Including {primary.bankHolidayCount} bank holiday{primary.bankHolidayCount !== 1 ? 's' : ''}
              </p>
            ) : (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3 font-medium">
                + {primary.bankHolidayCount} bank holiday{primary.bankHolidayCount !== 1 ? 's' : ''} paid on top
              </p>
            )
          ) : (
            <div className="mb-3" />
          )}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${primary.allowance > 0 ? (primary.remaining / primary.allowance) * 100 : 0}%` }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {primary.allowance > 0 ? Math.round((primary.remaining / primary.allowance) * 100) : 0}%
            </span>
          </div>
        </div>
        )
      })()}

      {sorted.slice(1).map((b) => {
        const unit = b.policyUnit === 'hours' ? 'hours' : 'days'
        return (
        <div key={b.id} className="border-t pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{b.policyName}</span>
            <span className="text-sm text-muted-foreground">
              {b.remaining} / {b.allowance} {unit}
              {b.isProRated && <span className="ml-1 text-xs text-amber-600 font-medium">(pro-rata)</span>}
            </span>
          </div>
        </div>
        )
      })}

      {toilBalance && (
        <div className="border-t pt-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm font-medium">TOIL Balance</span>
            </div>
            <span className="text-sm font-bold">{toilBalance.remaining}h</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 ml-5">
            {toilBalance.accrued}h accrued &middot; {toilBalance.used}h used
          </p>
          {tenantSlug && (
            <Link
              href={`/t/${tenantSlug}/toil`}
              className="text-xs text-primary hover:underline ml-5 mt-1 inline-block"
            >
              View TOIL details
            </Link>
          )}
        </div>
      )}

      {nextLeave && (
        <div className="border-t pt-3 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Next up</p>
              <p className="text-sm font-medium">
                {nextLeave.policyName} &middot;{' '}
                {new Date(nextLeave.startDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      )}

      {leaveYearLabel && (
        <p className="text-xs text-muted-foreground mt-3">{leaveYearLabel}</p>
      )}
    </div>
  )
}

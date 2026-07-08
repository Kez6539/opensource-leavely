'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardSection } from '@/components/shared'
import { COUNTRY_LIST, getCountryConfig } from '@/lib/countries'
import { createWorkspaceAction, type SetupState } from './actions'

const initial: SetupState = { error: '' }

interface Props {
  defaultCompanyName: string
}

export function SetupForm({ defaultCompanyName }: Props) {
  const [state, formAction, pending] = useActionState<SetupState, FormData>(createWorkspaceAction, initial)
  const companyInputRef = useRef<HTMLInputElement>(null)
  const [country, setCountry] = useState(state.values?.countryCode || 'GB')
  const [leaveYearMonth, setLeaveYearMonth] = useState<number>(
    state.values?.leaveYearMonth ?? getCountryConfig('GB').defaultLeaveYear,
  )
  const countryConfig = getCountryConfig(country)

  useEffect(() => {
    const input = companyInputRef.current
    if (!input || input.value.trim()) return

    const savedCompanyName = window.localStorage.getItem('leavely:setup-company')
    if (!savedCompanyName || savedCompanyName.length > 80) return

    input.value = savedCompanyName
    window.localStorage.removeItem('leavely:setup-company')
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Almost there</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Set up your workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">Just a few details and we&apos;ll get you in.</p>
      </div>

      <form action={formAction}>
        <CardSection title="Your workspace">
          {state.error ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
          ) : null}

          <div className="mb-5">
            <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company name</label>
            <Input
              id="companyName"
              name="companyName"
              ref={companyInputRef}
              defaultValue={state.values?.companyName ?? defaultCompanyName}
              required
              maxLength={80}
              autoFocus
            />
          </div>

          <input type="hidden" name="countryCode" value={country} />
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Where is your company based?</label>
            <div className="flex flex-wrap gap-2">
              {COUNTRY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c.code)
                    setLeaveYearMonth(getCountryConfig(c.code).defaultLeaveYear)
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    country === c.code
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                      : 'border-muted bg-background text-muted-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="leaveYearMonth" className="block text-sm font-medium mb-1">Leave year starts in</label>
            <select
              id="leaveYearMonth"
              name="leaveYearMonth"
              value={leaveYearMonth}
              onChange={(e) => setLeaveYearMonth(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const m = i + 1
                const monthName = new Date(2026, i).toLocaleString('en', { month: 'long' })
                const isDefault = m === countryConfig.defaultLeaveYear
                return (
                  <option key={m} value={m}>
                    {monthName}{isDefault ? ` (${countryConfig.leaveYearLabel})` : ''}
                  </option>
                )
              })}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              We&apos;ll add {countryConfig.publicHolidayCount} {countryConfig.publicHolidayTerm} for {countryConfig.name} automatically.
            </p>
          </div>

          <Button type="submit" disabled={pending}>
            {pending ? 'Setting up…' : 'Create my workspace'}
          </Button>
        </CardSection>
      </form>
    </div>
  )
}

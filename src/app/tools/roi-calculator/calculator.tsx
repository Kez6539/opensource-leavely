'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Banknote, Clock, RotateCcw, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PRICE_PER_SEAT_GBP } from '@/lib/plans'
import { trackCtaClicked, trackRoiCalculatorUsed } from '@/lib/analytics'
import { formatGBPWhole } from '@/lib/formatters'

interface CalculatorState {
  employees: number
  hourlyCost: number
  requestsPerEmployeePerMonth: number
  manualMinutesPerRequest: number
  leavelyMinutesPerRequest: number
  adminHoursPerMonth: number
}

const DEFAULT_STATE: CalculatorState = {
  employees: 25,
  hourlyCost: 22,
  requestsPerEmployeePerMonth: 1.5,
  manualMinutesPerRequest: 12,
  leavelyMinutesPerRequest: 3,
  adminHoursPerMonth: 6,
}

const ADMIN_HOURS_SAVED_RATE = 0.7

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

function round(value: number, decimals = 0): number {
  const multiplier = 10 ** decimals
  return Math.round(value * multiplier) / multiplier
}

function pluralise(value: number, singular: string, plural: string): string {
  return value === 1 ? singular : plural
}

export function RoiCalculator() {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE)
  const hasInteractedRef = useRef(false)
  const trackedRef = useRef(false)
  const trackTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const update = (partial: Partial<CalculatorState>) => {
    hasInteractedRef.current = true
    setState((previous) => ({ ...previous, ...partial }))
  }

  const results = useMemo(() => {
    const employees = clamp(state.employees, 1, 500)
    const hourlyCost = clamp(state.hourlyCost, 1, 200)
    const requestsPerEmployeePerMonth = clamp(state.requestsPerEmployeePerMonth, 0, 10)
    const manualMinutesPerRequest = clamp(state.manualMinutesPerRequest, 1, 120)
    const leavelyMinutesPerRequest = clamp(state.leavelyMinutesPerRequest, 0, 60)
    const adminHoursPerMonth = clamp(state.adminHoursPerMonth, 0, 200)

    const monthlyRequests = employees * requestsPerEmployeePerMonth
    const minutesSavedPerRequest = Math.max(0, manualMinutesPerRequest - leavelyMinutesPerRequest)
    const requestHoursSaved = (monthlyRequests * minutesSavedPerRequest) / 60
    const recurringAdminHoursSaved = adminHoursPerMonth * ADMIN_HOURS_SAVED_RATE
    const monthlyHoursSaved = requestHoursSaved + recurringAdminHoursSaved
    const monthlyGrossSaving = monthlyHoursSaved * hourlyCost
    const monthlyLeavelyCost = employees * PRICE_PER_SEAT_GBP
    const monthlyNetSaving = monthlyGrossSaving - monthlyLeavelyCost
    const annualNetSaving = monthlyNetSaving * 12
    const annualHoursSaved = monthlyHoursSaved * 12
    const annualLeavelyCost = monthlyLeavelyCost * 12
    const roiPercent = annualLeavelyCost > 0
      ? (annualNetSaving / annualLeavelyCost) * 100
      : 0

    return {
      monthlyRequests: round(monthlyRequests, 1),
      minutesSavedPerRequest: round(minutesSavedPerRequest, 1),
      monthlyHoursSaved: round(monthlyHoursSaved, 1),
      annualHoursSaved: round(annualHoursSaved, 0),
      monthlyGrossSaving,
      monthlyLeavelyCost,
      monthlyNetSaving,
      annualNetSaving,
      roiPercent: round(roiPercent, 0),
      requestHoursSaved: round(requestHoursSaved, 1),
      recurringAdminHoursSaved: round(recurringAdminHoursSaved, 1),
    }
  }, [state])

  useEffect(() => {
    if (trackedRef.current || !hasInteractedRef.current) return

    if (trackTimerRef.current) clearTimeout(trackTimerRef.current)
    trackTimerRef.current = setTimeout(() => {
      trackRoiCalculatorUsed({
        employees: state.employees,
        monthlyHoursSaved: results.monthlyHoursSaved,
        monthlyNetSaving: Math.round(results.monthlyNetSaving),
      })
      trackedRef.current = true
    }, 1200)

    return () => {
      if (trackTimerRef.current) clearTimeout(trackTimerRef.current)
    }
  }, [results.monthlyHoursSaved, results.monthlyNetSaving, state])

  const reset = () => {
    setState(DEFAULT_STATE)
    hasInteractedRef.current = false
    trackedRef.current = false
  }

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-emerald-500/5">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ROI Calculator</h2>
              <p className="text-sm text-emerald-100">
                Estimate the time and money Leavely can save each month
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-gray-700">
                  Number of employees
                </Label>
                <Input
                  id="employees"
                  type="number"
                  min={1}
                  max={500}
                  value={state.employees}
                  onChange={(event) => update({ employees: clamp(Number(event.target.value), 1, 500) })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyCost" className="text-gray-700">
                  Admin hourly cost
                </Label>
                <Input
                  id="hourlyCost"
                  type="number"
                  min={1}
                  max={200}
                  value={state.hourlyCost}
                  onChange={(event) => update({ hourlyCost: clamp(Number(event.target.value), 1, 200) })}
                  className="h-11"
                />
                <p className="text-xs text-gray-400">
                  Include salary, NI, pension, and management overhead.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests" className="text-gray-700">
                  Leave requests per employee/month
                </Label>
                <Input
                  id="requests"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={state.requestsPerEmployeePerMonth}
                  onChange={(event) => update({ requestsPerEmployeePerMonth: clamp(Number(event.target.value), 0, 10) })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminHours" className="text-gray-700">
                  Other absence admin hours/month
                </Label>
                <Input
                  id="adminHours"
                  type="number"
                  min={0}
                  max={200}
                  step={0.5}
                  value={state.adminHoursPerMonth}
                  onChange={(event) => update({ adminHoursPerMonth: clamp(Number(event.target.value), 0, 200) })}
                  className="h-11"
                />
                <p className="text-xs text-gray-400">
                  Chasing balances, updating spreadsheets, and answering availability questions.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Time per leave request
              </h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="manualMinutes" className="text-gray-700">
                    Manual process
                  </Label>
                  <Input
                    id="manualMinutes"
                    type="number"
                    min={1}
                    max={120}
                    value={state.manualMinutesPerRequest}
                    onChange={(event) => update({ manualMinutesPerRequest: clamp(Number(event.target.value), 1, 120) })}
                    className="h-11 bg-white"
                  />
                  <p className="text-xs text-gray-400">Minutes per request today.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leavelyMinutes" className="text-gray-700">
                    With Leavely
                  </Label>
                  <Input
                    id="leavelyMinutes"
                    type="number"
                    min={0}
                    max={60}
                    value={state.leavelyMinutesPerRequest}
                    onChange={(event) => update({ leavelyMinutesPerRequest: clamp(Number(event.target.value), 0, 60) })}
                    className="h-11 bg-white"
                  />
                  <p className="text-xs text-gray-400">Minutes per request after automation.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={reset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset assumptions
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-emerald-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
            <div className="grid gap-4">
              <div className="rounded-xl border border-emerald-200 bg-white p-5 text-center shadow-sm">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Annual net saving
                </p>
                <p className="text-4xl font-extrabold text-gray-900 tabular-nums">
                  {formatGBPWhole(results.annualNetSaving)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  After Leavely at {formatGBPWhole(PRICE_PER_SEAT_GBP)} per employee/month.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    Time saved
                  </div>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">
                    {results.annualHoursSaved} hours/year
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {results.monthlyHoursSaved} hours each month.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Banknote className="h-4 w-4 text-emerald-600" />
                    ROI
                  </div>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">
                    {results.roiPercent}%
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Net return after subscription cost.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Users className="h-4 w-4 text-emerald-600" />
                  Monthly breakdown
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Estimated leave requests</dt>
                    <dd className="font-semibold text-gray-900">
                      {results.monthlyRequests} {pluralise(results.monthlyRequests, 'request', 'requests')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Request handling saved</dt>
                    <dd className="font-semibold text-gray-900">{results.requestHoursSaved} hrs</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Admin follow-up saved</dt>
                    <dd className="font-semibold text-gray-900">{results.recurringAdminHoursSaved} hrs</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
                    <dt className="text-gray-500">Gross time value</dt>
                    <dd className="font-semibold text-gray-900">{formatGBPWhole(results.monthlyGrossSaving)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500">Leavely cost</dt>
                    <dd className="font-semibold text-gray-900">{formatGBPWhole(results.monthlyLeavelyCost)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-emerald-100 pt-3">
                    <dt className="font-semibold text-emerald-800">Monthly net saving</dt>
                    <dd className="font-bold text-emerald-800">{formatGBPWhole(results.monthlyNetSaving)}</dd>
                  </div>
                </dl>
              </div>

              <div className="text-center">
                <Link href="/register" onClick={() => trackCtaClicked('start_free_trial', 'roi_calculator')}>
                  <Button
                    size="lg"
                    className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-500">
                  No credit card required. Your assumptions stay in this browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
        This estimate values saved admin time at your hourly cost and assumes Leavely removes 70%
        of recurring spreadsheet, balance, and follow-up work. Adjust the assumptions to match your
        current process.
      </div>
    </div>
  )
}

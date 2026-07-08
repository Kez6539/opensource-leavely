'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RotateCcw, CheckCircle2, AlertTriangle, Calculator, Info } from 'lucide-react'

interface CalculatorState {
  daysPerWeek: number
  fullTimeAllowance: number
  useMidYearStart: boolean
  startDate: string
  leaveYearStart: string
}

const DEFAULT_STATE: CalculatorState = {
  daysPerWeek: 5,
  fullTimeAllowance: 28,
  useMidYearStart: false,
  startDate: '',
  leaveYearStart: `${new Date().getFullYear()}-01-01`,
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export function ProRataCalculator() {
  const [state, setState] = useState<CalculatorState>(DEFAULT_STATE)

  const update = (partial: Partial<CalculatorState>) =>
    setState((prev) => ({ ...prev, ...partial }))

  const results = useMemo(() => {
    const { daysPerWeek, fullTimeAllowance, useMidYearStart, startDate, leaveYearStart } = state

    if (daysPerWeek < 1 || daysPerWeek > 7) return null
    if (fullTimeAllowance < 1 || fullTimeAllowance > 60) return null

    // Basic pro rata entitlement
    const proRataFull = (daysPerWeek / 5) * fullTimeAllowance

    // Statutory minimum: 5.6 weeks × days per week, capped at 28
    const statutoryMinimum = Math.min(daysPerWeek * 5.6, 28)

    let finalEntitlement = proRataFull
    let midYearFraction: number | null = null

    if (useMidYearStart && startDate && leaveYearStart) {
      const start = new Date(startDate)
      const yearStart = new Date(leaveYearStart)

      if (isNaN(start.getTime()) || isNaN(yearStart.getTime())) return null

      // Calculate leave year end (one year from leave year start)
      const yearEnd = new Date(yearStart)
      yearEnd.setFullYear(yearEnd.getFullYear() + 1)

      // If start date is before the leave year start, use full entitlement
      if (start <= yearStart) {
        midYearFraction = 1
      } else if (start >= yearEnd) {
        midYearFraction = 0
      } else {
        const totalDaysInYear = daysBetween(yearStart, yearEnd)
        const remainingDays = daysBetween(start, yearEnd)
        midYearFraction = remainingDays / totalDaysInYear
      }

      finalEntitlement = proRataFull * midYearFraction

      // Statutory minimum also needs to be pro-rated for mid-year start
    }

    const statutoryMinForPeriod = useMidYearStart && midYearFraction !== null
      ? statutoryMinimum * midYearFraction
      : statutoryMinimum

    const meetsStatutory = finalEntitlement >= statutoryMinForPeriod - 0.05 // small tolerance for floating point

    return {
      proRataFull: Math.round(proRataFull * 10) / 10,
      finalEntitlement: Math.round(finalEntitlement * 10) / 10,
      statutoryMinimum: Math.round(statutoryMinimum * 10) / 10,
      statutoryMinForPeriod: Math.round(statutoryMinForPeriod * 10) / 10,
      meetsStatutory,
      midYearFraction,
    }
  }, [state])

  const reset = () => setState(DEFAULT_STATE)

  // Reference table data
  const referenceTable = [1, 2, 3, 4, 5, 6, 7].map((days) => {
    const statutory = Math.min(days * 5.6, 28)
    const proRata28 = (days / 5) * 28
    const proRata33 = (days / 5) * 33
    return {
      days,
      statutory: Math.round(statutory * 10) / 10,
      proRata28: Math.round(proRata28 * 10) / 10,
      proRata33: Math.round(proRata33 * 10) / 10,
    }
  })

  return (
    <div className="space-y-10">
      {/* Calculator card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pro Rata Leave Calculator</h2>
              <p className="text-sm text-emerald-100">Calculate annual leave entitlement for part-time or mid-year starters</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Input fields */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="daysPerWeek" className="text-gray-700">
                Days worked per week
              </Label>
              <Input
                id="daysPerWeek"
                type="number"
                min={1}
                max={7}
                step={0.5}
                value={state.daysPerWeek}
                onChange={(e) => update({ daysPerWeek: parseFloat(e.target.value) || 0 })}
                className="h-11"
              />
              <p className="text-xs text-gray-400">Between 1 and 7 (supports half days, e.g. 2.5)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullTimeAllowance" className="text-gray-700">
                Full-time annual leave allowance (days)
              </Label>
              <Input
                id="fullTimeAllowance"
                type="number"
                min={1}
                max={60}
                value={state.fullTimeAllowance}
                onChange={(e) => update({ fullTimeAllowance: parseFloat(e.target.value) || 0 })}
                className="h-11"
              />
              <p className="text-xs text-gray-400">UK statutory minimum is 28 days (inc. bank holidays) for 5 days/week</p>
            </div>
          </div>

          {/* Mid-year start toggle */}
          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.useMidYearStart}
                onChange={(e) => update({ useMidYearStart: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Employee starts mid-year (calculate remaining entitlement)
              </span>
            </label>

            {state.useMidYearStart && (
              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <div className="space-y-2">
                  <Label htmlFor="leaveYearStart" className="text-gray-700">
                    Leave year start date
                  </Label>
                  <Input
                    id="leaveYearStart"
                    type="date"
                    value={state.leaveYearStart}
                    onChange={(e) => update({ leaveYearStart: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-700">
                    Employee start date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={state.startDate}
                    onChange={(e) => update({ startDate: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-6">
                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-emerald-700 mb-1">Pro rata annual leave entitlement</p>
                  <p className="text-4xl font-extrabold text-emerald-800">
                    {results.finalEntitlement} <span className="text-xl font-semibold">days</span>
                  </p>
                  {results.midYearFraction !== null && results.midYearFraction < 1 && (
                    <p className="text-xs text-emerald-600 mt-1">
                      Full-year pro rata would be {results.proRataFull} days
                      (adjusted to {Math.round(results.midYearFraction * 100)}% for remaining leave year)
                    </p>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-4 border-t border-emerald-200">
                  <div className="rounded-lg bg-white/60 p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Full-year pro rata</p>
                    <p className="text-lg font-bold text-gray-900">{results.proRataFull} days</p>
                  </div>
                  <div className="rounded-lg bg-white/60 p-3">
                    <p className="text-xs text-gray-500 mb-0.5">Statutory minimum{results.midYearFraction !== null && results.midYearFraction < 1 ? ' (pro rata)' : ''}</p>
                    <p className="text-lg font-bold text-gray-900">{results.statutoryMinForPeriod} days</p>
                  </div>
                </div>
              </div>

              {/* Statutory compliance check */}
              <div className={`rounded-xl border p-4 flex items-start gap-3 ${
                results.meetsStatutory
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}>
                {results.meetsStatutory ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className={`text-sm font-semibold ${results.meetsStatutory ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {results.meetsStatutory
                      ? 'Meets UK statutory minimum'
                      : 'Below UK statutory minimum'}
                  </p>
                  <p className={`text-xs mt-0.5 ${results.meetsStatutory ? 'text-emerald-600' : 'text-amber-700'}`}>
                    {results.meetsStatutory
                      ? `The entitlement of ${results.finalEntitlement} days meets or exceeds the statutory minimum of ${results.statutoryMinForPeriod} days.`
                      : `The entitlement of ${results.finalEntitlement} days is below the statutory minimum of ${results.statutoryMinForPeriod} days. You must provide at least the statutory minimum.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reset */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Reference table */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/50 overflow-hidden">
        <div className="px-6 py-5 sm:px-8 border-b bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900">Quick Reference: Pro Rata Leave Entitlements</h3>
          <p className="text-sm text-gray-500 mt-1">Common entitlements for different work patterns (full leave year)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 sm:px-8 font-semibold text-gray-700">Days per week</th>
                <th className="text-left p-3 font-semibold text-gray-700">Statutory minimum (5.6 weeks)</th>
                <th className="text-left p-3 font-semibold text-gray-700">Pro rata of 28 days</th>
                <th className="text-left p-3 sm:pr-8 font-semibold text-gray-700">Pro rata of 33 days</th>
              </tr>
            </thead>
            <tbody>
              {referenceTable.map((row) => (
                <tr key={row.days} className="border-b last:border-0 hover:bg-gray-50/50">
                  <td className="p-3 sm:px-8 font-medium text-gray-900">{row.days} day{row.days !== 1 ? 's' : ''}</td>
                  <td className="p-3 text-gray-600">{row.statutory} days</td>
                  <td className="p-3 text-gray-600">{row.proRata28} days</td>
                  <td className="p-3 sm:pr-8 text-gray-600">{row.proRata33} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 sm:px-8 bg-gray-50/50 border-t">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            Statutory minimum is capped at 28 days. 33 days = 25 days + 8 bank holidays.
          </p>
        </div>
      </div>
    </div>
  )
}

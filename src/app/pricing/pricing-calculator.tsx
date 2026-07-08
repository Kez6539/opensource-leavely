'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trackPricingCalculatorUsed, trackCtaClicked } from '@/lib/analytics'
import { formatGBP as fmtGBP, formatGBPWhole } from '@/lib/formatters'

const PRICE_PER_USER = 8
const WORKING_DAYS_PER_MONTH = 22
const ALT_MIN = 12
const ALT_MAX = 15

function useAnimatedNumber(target: number, duration = 300) {
  const [display, setDisplay] = useState(target)
  const frameRef = useRef<number>(0)
  const startRef = useRef(target)
  const startTimeRef = useRef(0)

  useEffect(() => {
    startRef.current = display
    startTimeRef.current = performance.now()

    function animate(now: number) {
      const elapsed = now - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startRef.current + (target - startRef.current) * eased
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return display
}

// (#198) Use the shared formatters from lib/formatters.ts. Local helper
// kept as a thin shim that forwards to whichever variant the caller asked
// for so the rest of the file doesn't have to change.
function formatGBP(value: number, decimals = 0) {
  return decimals === 0 ? formatGBPWhole(value) : fmtGBP(value)
}

export function PricingCalculator() {
  const [employees, setEmployees] = useState(10)

  const monthly = employees * PRICE_PER_USER
  const annual = monthly * 12
  const perDay = PRICE_PER_USER / WORKING_DAYS_PER_MONTH
  const altMinMonthly = employees * ALT_MIN
  const altMaxMonthly = employees * ALT_MAX
  const savingsMin = (altMinMonthly - monthly) * 12
  const savingsMax = (altMaxMonthly - monthly) * 12

  const animatedMonthly = useAnimatedNumber(monthly)
  const animatedAnnual = useAnimatedNumber(annual)
  const animatedSavingsMin = useAnimatedNumber(savingsMin)
  const animatedSavingsMax = useAnimatedNumber(savingsMax)

  // Track calculator interaction (debounced — fires once after user stops adjusting)
  const calcTimerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const calcTrackedRef = useRef(false)
  useEffect(() => {
    if (employees === 10) return // skip default value
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current)
    calcTimerRef.current = setTimeout(() => {
      trackPricingCalculatorUsed(employees, monthly)
      calcTrackedRef.current = true
    }, 1500)
    return () => { if (calcTimerRef.current) clearTimeout(calcTimerRef.current) }
  }, [employees, monthly])

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmployees(Number(e.target.value))
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    if (val === '') {
      setEmployees(1)
      return
    }
    const num = parseInt(val, 10)
    if (!isNaN(num)) {
      setEmployees(Math.max(1, Math.min(250, num)))
    }
  }

  return (
    <div className="rounded-2xl border bg-white shadow-xl shadow-emerald-500/5 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          Pricing Calculator
        </h3>
        <p className="text-emerald-100 text-sm mt-1">
          See exactly what Leavely costs for your team
        </p>
      </div>

      <div className="p-8">
        {/* Slider input */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="employee-count" className="text-sm font-semibold text-gray-700">
              Number of employees
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="employee-count"
                type="number"
                min={1}
                max={250}
                value={employees}
                onChange={handleInputChange}
                className="w-20 h-9 text-center text-sm font-semibold border-emerald-200 focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={250}
            value={employees}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-500/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
            aria-label="Number of employees"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1.5 px-0.5">
            <span>1</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>200</span>
            <span>250</span>
          </div>
        </div>

        {/* Cost outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5 text-center">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
              Monthly cost
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
              {formatGBP(animatedMonthly)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {employees} {employees === 1 ? 'employee' : 'employees'} &times; £8/mo
            </p>
          </div>

          <div className="rounded-xl bg-teal-50 border border-teal-100 p-5 text-center">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
              Annual cost
            </p>
            <p className="text-3xl font-extrabold text-gray-900 tabular-nums">
              {formatGBP(animatedAnnual)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatGBP(monthly)} &times; 12 months
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Per employee per day
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {formatGBP(perDay, 2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Based on ~22 working days/mo
            </p>
          </div>
        </div>

        {/* Savings comparison */}
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-5 mb-8">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-100 p-2 shrink-0">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Compared to typical alternatives
              </p>
              <p className="text-sm text-gray-600">
                Most leave management tools charge{' '}
                <span className="font-semibold text-gray-900">£12&ndash;£15 per employee/month</span>.
                With {employees} {employees === 1 ? 'employee' : 'employees'}, Leavely saves you{' '}
                <span className="font-semibold text-emerald-700">
                  {formatGBP(animatedSavingsMin)}&ndash;{formatGBP(animatedSavingsMax)}
                </span>{' '}
                per year.
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Leavely</span>
                    <span className="font-semibold text-emerald-600">{formatGBP(monthly)}/mo</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Others</span>
                    <span>{formatGBP(altMinMonthly)}&ndash;{formatGBP(altMaxMonthly)}/mo</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/register" onClick={() => trackCtaClicked('start_free_trial', 'pricing_calculator')}>
            <Button
              size="lg"
              className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
            >
              Start free trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            14 days free. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

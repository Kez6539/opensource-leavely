'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface TrialOnboardingTourProps {
  tenantSlug: string
  enabled: boolean
}

interface TourStep {
  title: string
  body: string
  route: string
  selector: string
  fallbackSelector?: string
}

interface TargetRect {
  top: number
  left: number
  width: number
  height: number
}

const TOUR_VERSION = 'v2'
const DEFAULT_PANEL_POSITION = { top: 16, left: 16 }

function getStorageKey(tenantSlug: string): string {
  return `leavely.trial-onboarding-tour.${TOUR_VERSION}.${tenantSlug}`
}

function readTourState(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeTourState(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore storage failures. The tour still works for the current page view.
  }
}

function getElementRect(selector: string, fallbackSelector?: string): TargetRect | null {
  const element = document.querySelector<HTMLElement>(selector)
    ?? (fallbackSelector ? document.querySelector<HTMLElement>(fallbackSelector) : null)

  if (!element) return null

  const rect = element.getBoundingClientRect()
  return {
    top: Math.max(8, rect.top - 8),
    left: Math.max(8, rect.left - 8),
    width: rect.width + 16,
    height: rect.height + 16,
  }
}

function getPanelPosition(rect: TargetRect | null): { top: number; left: number } {
  const margin = 16
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const panelWidth = Math.min(320, viewportWidth - margin * 2)

  if (!rect) {
    return {
      top: Math.max(margin, Math.round(viewportHeight / 2 - 140)),
      left: Math.max(margin, Math.round(viewportWidth / 2 - panelWidth / 2)),
    }
  }

  const preferredTop = rect.top + rect.height + 12
  const top = preferredTop + 220 < viewportHeight
    ? preferredTop
    : Math.max(margin, rect.top - 236)

  return {
    top,
    left: Math.min(Math.max(margin, rect.left), viewportWidth - panelWidth - margin),
  }
}

export function TrialOnboardingTour({ tenantSlug, enabled }: TrialOnboardingTourProps) {
  const pathname = usePathname()
  const router = useRouter()
  const storageKey = useMemo(() => getStorageKey(tenantSlug), [tenantSlug])
  const steps = useMemo<TourStep[]>(() => [
    {
      title: 'Start from the dashboard',
      body: 'Use Home to see who is off, upcoming absences, open actions, and the quick links your team uses most.',
      route: `/t/${tenantSlug}/dashboard`,
      selector: '[data-tour="dashboard-overview"]',
      fallbackSelector: 'main',
    },
    {
      title: 'Add an employee',
      body: 'Start by adding a teammate. Once people are in Leavely, balances, approvals, and calendars become useful.',
      route: `/t/${tenantSlug}/employees`,
      selector: '[data-tour="add-employee"]',
    },
    {
      title: 'Approve leave',
      body: 'Pending requests appear in Awaiting approval. Open a request to approve or decline it.',
      route: `/t/${tenantSlug}/leave`,
      selector: '[data-tour="approve-leave"]',
      fallbackSelector: '[data-tour="leave-requests"]',
    },
    {
      title: 'View the calendar',
      body: 'Use the calendar to spot overlaps, sickness, bank holidays, and company closures before approving time off.',
      route: `/t/${tenantSlug}/leave/calendar`,
      selector: '[data-tour="leave-calendar"]',
    },
    {
      title: 'Export reports',
      body: 'Reports turn leave, sickness, payroll exceptions, rotas, and employee details into clean exports for reviews or payroll.',
      route: `/t/${tenantSlug}/reports`,
      selector: '[data-tour="reports-grid"]',
      fallbackSelector: '[data-tour="reports-header"]',
    },
  ], [tenantSlug])

  const [active, setActive] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null)
  const [panelPosition, setPanelPosition] = useState(DEFAULT_PANEL_POSITION)

  const currentStep = steps[stepIndex]

  const closeTour = useCallback((state: 'completed' | 'dismissed') => {
    writeTourState(storageKey, state)
    setActive(false)
  }, [storageKey])

  useEffect(() => {
    if (!enabled) return
    if (readTourState(storageKey)) return

    const startTimer = window.setTimeout(() => {
      setActive(true)
    }, 700)

    return () => window.clearTimeout(startTimer)
  }, [enabled, storageKey])

  useEffect(() => {
    if (!active || pathname === currentStep.route) return
    router.push(currentStep.route)
  }, [active, currentStep.route, pathname, router])

  useEffect(() => {
    if (!active) return

    let frameId = 0
    let settleTimer = 0
    const updateTarget = (shouldScroll: boolean) => {
      frameId = window.requestAnimationFrame(() => {
        const rect = getElementRect(currentStep.selector, currentStep.fallbackSelector)
        setTargetRect(rect)
        setPanelPosition(getPanelPosition(rect))
        if (rect && shouldScroll) {
          window.scrollTo({
            top: Math.max(0, window.scrollY + rect.top - 96),
            behavior: 'smooth',
          })
          settleTimer = window.setTimeout(() => {
            const settledRect = getElementRect(currentStep.selector, currentStep.fallbackSelector)
            setTargetRect(settledRect)
            setPanelPosition(getPanelPosition(settledRect))
          }, 350)
        }
      })
    }

    const refreshTarget = () => updateTarget(false)
    const timer = window.setTimeout(() => updateTarget(true), 150)
    window.addEventListener('resize', refreshTarget)
    window.addEventListener('scroll', refreshTarget, { passive: true })

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(settleTimer)
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', refreshTarget)
      window.removeEventListener('scroll', refreshTarget)
    }
  }, [active, currentStep.fallbackSelector, currentStep.selector, pathname])

  if (!active) return null

  const isLastStep = stepIndex === steps.length - 1

  const goToNextStep = () => {
    if (isLastStep) {
      closeTour('completed')
      return
    }
    setTargetRect(null)
    setStepIndex((current) => current + 1)
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none" aria-live="polite">
      <div className="absolute inset-0 bg-black/45" />
      {targetRect && (
        <div
          className="absolute rounded-xl border-2 border-emerald-400 bg-transparent shadow-[0_0_0_9999px_rgb(0_0_0/0.45),0_0_0_4px_rgb(16_185_129/0.18)] transition-all"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
        />
      )}
      <section
        className="pointer-events-auto absolute w-[min(320px,calc(100vw-32px))] rounded-lg border bg-card p-4 text-card-foreground shadow-xl"
        style={{ top: panelPosition.top, left: panelPosition.left }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-tour-title"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <h2 id="trial-tour-title" className="mt-1 text-base font-semibold">
              {currentStep.title}
            </h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={() => closeTour('dismissed')}
            aria-label="Dismiss tour"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{currentStep.body}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex gap-1.5" aria-hidden>
            {steps.map((step, index) => (
              <span
                key={step.title}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  index === stepIndex ? 'w-6 bg-emerald-600' : 'w-1.5 bg-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => closeTour('dismissed')}>
              Skip
            </Button>
            <Button type="button" size="sm" onClick={goToNextStep}>
              {isLastStep ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

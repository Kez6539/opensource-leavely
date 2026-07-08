'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'

const trialCtaHref = '/register?utm_source=website&utm_campaign=sticky_trial_cta&utm_content=no_demo_ab_variant'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.45)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible || dismissed) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 pointer-events-none md:p-4">
      <div className="mx-auto max-w-3xl pointer-events-auto">
        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-2xl shadow-black/15 backdrop-blur-md sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-gray-950">Replace holiday spreadsheets with Leavely</p>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />14-day trial</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />No credit card</span>
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />£8/user/month</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-semibold text-gray-500 sm:inline">No demo required</span>
            <Link
              href={trialCtaHref}
              className="flex-1 sm:flex-none"
              data-experiment="sticky_trial_cta"
              data-variant="no_demo"
            >
              <Button size="sm" className="w-full bg-emerald-600 font-bold hover:bg-emerald-700 sm:w-auto">
                Start trial <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Dismiss trial signup reminder"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

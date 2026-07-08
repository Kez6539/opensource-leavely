'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCtaClicked } from '@/lib/analytics'

const trialHref = '/register?utm_source=blog&utm_medium=sticky_cta&utm_campaign=blog_to_trial'

function getScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

  if (scrollableHeight <= 0) {
    return 0
  }

  return window.scrollY / scrollableHeight
}

export function BlogScrollActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [isStickyCtaDismissed, setIsStickyCtaDismissed] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 480)
      setShowStickyCta(getScrollProgress() >= 0.5)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isCtaVisible = showStickyCta && !isStickyCtaDismissed

  return (
    <>
      {showBackToTop ? (
        <button
          aria-label="Back to top"
          className={`fixed right-4 z-50 inline-flex size-11 items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-700 shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
            isCtaVisible ? 'bottom-32 sm:bottom-24' : 'bottom-5'
          }`}
          onClick={scrollToTop}
          type="button"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
      ) : null}

      {isCtaVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-100 bg-white/95 px-4 py-3 shadow-2xl shadow-slate-950/15 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-950">Ready to replace holiday spreadsheets?</p>
              <p className="mt-1 text-xs text-gray-600">Start a 14-day Leavely trial. No credit card required.</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                asChild
                className="flex-1 bg-emerald-600 font-semibold hover:bg-emerald-700 sm:flex-none"
                size="sm"
              >
                <Link
                  href={trialHref}
                  onClick={() => trackCtaClicked('blog_sticky_start_free_trial', 'blog')}
                >
                  Start Free Trial
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <button
                aria-label="Dismiss free trial reminder"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                onClick={() => setIsStickyCtaDismissed(true)}
                type="button"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

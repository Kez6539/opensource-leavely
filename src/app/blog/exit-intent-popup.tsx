'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCtaClicked } from '@/lib/analytics'

const STORAGE_KEY = 'leavely-blog-exit-intent-shown-at'
const FREQUENCY_CAP_MS = 7 * 24 * 60 * 60 * 1000
const EXIT_THRESHOLD_PX = 8
const TITLE_ID = 'blog-exit-intent-title'

function isFrequencyCapped() {
  try {
    const shownAt = window.localStorage.getItem(STORAGE_KEY)
    if (!shownAt) return false

    const shownAtTime = Number(shownAt)
    if (!Number.isFinite(shownAtTime)) return false

    return Date.now() - shownAtTime < FREQUENCY_CAP_MS
  } catch {
    return true
  }
}

function markShown() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
  } catch {
    // Ignore storage failures so private browsing modes do not break the CTA.
  }
}

export function BlogExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    function handleMouseOut(event: MouseEvent) {
      if (event.relatedTarget !== null || event.clientY > EXIT_THRESHOLD_PX || isFrequencyCapped()) {
        return
      }

      markShown()
      setIsOpen(true)
    }

    window.addEventListener('mouseout', handleMouseOut)

    return () => window.removeEventListener('mouseout', handleMouseOut)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      aria-labelledby={TITLE_ID}
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm"
      role="dialog"
    >
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
        <button
          aria-label="Close free trial offer"
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-600">Before you go</p>
        <h2 id={TITLE_ID} className="pr-8 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Try Leavely free before you go back to spreadsheets.
        </h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Set up holiday tracking, approvals, sick leave, and team calendars in minutes. No card required.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-teal-700"
            size="lg"
          >
            <Link href="/register" onClick={() => trackCtaClicked('exit_intent_start_free_trial', 'blog')}>
              Start free trial
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setIsOpen(false)}>
            Keep reading
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check, Copy, Gift, Mail } from 'lucide-react'

interface TrialReferralCardProps {
  referralUrl: string
  daysLeft: number | null
}

export function TrialReferralCard({ referralUrl, daysLeft }: TrialReferralCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const subject = encodeURIComponent('Try Leavely for leave management')
  const body = encodeURIComponent(
    `I thought Leavely might be useful for your team. You can start a free trial here:\n\n${referralUrl}`
  )

  return (
    <section className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
            <Gift className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">
                Refer teams while your trial is active
              </h2>
              {daysLeft !== null && (
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-800">
                  {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-emerald-900/80 dark:text-emerald-100/75">
              Share this link with another founder, ops lead, or HR team. Referral signups are attributed automatically.
            </p>
          </div>
        </div>
        <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row md:max-w-xl">
          <Input
            readOnly
            value={referralUrl}
            aria-label="Trial referral link"
            className="h-10 bg-white font-mono text-xs text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50"
            onFocus={(event) => event.currentTarget.select()}
          />
          <div className="flex gap-2">
            <Button type="button" onClick={handleCopy} className="h-10 shrink-0 bg-emerald-700 hover:bg-emerald-800">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button asChild variant="outline" className="h-10 shrink-0 border-emerald-300 bg-white text-emerald-900 hover:bg-emerald-100">
              <a href={`mailto:?subject=${subject}&body=${body}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

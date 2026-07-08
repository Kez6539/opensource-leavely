'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { BarChart3, CalendarCheck, CheckCircle2, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { trackConversionPromptClicked, trackConversionPromptShown } from '@/lib/analytics'

export type ConversionPromptMoment = 'first-approval' | 'first-report-view' | 'calendar-setup'

interface ConversionPromptProps {
  tenantSlug: string
  moment: ConversionPromptMoment
  enabled?: boolean
  autoOpen?: boolean
  openSignal?: number
  onClose?: () => void
}

const promptCopy: Record<
  ConversionPromptMoment,
  {
    title: string
    description: string
    detail: string
    icon: typeof CheckCircle2
  }
> = {
  'first-approval': {
    title: 'Your approval workflow is live',
    description: 'You have approved a real leave request. Subscribe now to keep approvals, balances, and employee notifications running after the trial.',
    detail: 'Keep the leave history you just created and avoid moving the team back to spreadsheets.',
    icon: CheckCircle2,
  },
  'first-report-view': {
    title: 'Reports are ready for payroll and planning',
    description: 'You have seen the reporting view. Subscribe now to keep exporting absence, leave, and payroll data after the trial.',
    detail: 'Managers can keep using filters and CSV exports without rebuilding reports manually.',
    icon: BarChart3,
  },
  'calendar-setup': {
    title: 'Your calendar sync is set up',
    description: 'You have generated a calendar feed. Subscribe now to keep team availability visible in Google Calendar, Outlook, and Apple Calendar.',
    detail: 'The feed keeps approved leave visible where your team already plans work.',
    icon: CalendarCheck,
  },
}

export function conversionPromptStorageKey(tenantSlug: string, moment: ConversionPromptMoment) {
  return `leavely:conversion-prompt:${tenantSlug}:${moment}`
}

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function readPromptStorage(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function markPromptShown(key: string) {
  try {
    window.localStorage.setItem(key, 'shown')
  } catch {
    // localStorage can be disabled; in-memory dismissal still hides the prompt in this tree.
  }
}

export function ConversionPrompt({
  tenantSlug,
  moment,
  enabled = true,
  autoOpen = false,
  openSignal = 0,
  onClose,
}: ConversionPromptProps) {
  const [dismissed, setDismissed] = useState(false)
  const trackedKeyRef = useRef<string | null>(null)
  const copy = promptCopy[moment]
  const Icon = copy.icon
  const key = conversionPromptStorageKey(tenantSlug, moment)
  const storedPrompt = useSyncExternalStore(
    subscribeToStorage,
    () => readPromptStorage(key),
    () => 'shown'
  )
  const shouldOpen =
    enabled &&
    (autoOpen || openSignal > 0) &&
    storedPrompt !== 'shown' &&
    !dismissed

  useEffect(() => {
    if (!shouldOpen || trackedKeyRef.current === key) return

    trackedKeyRef.current = key
    trackConversionPromptShown(moment, tenantSlug)
  }, [key, moment, shouldOpen, tenantSlug])

  if (!enabled) return null

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      markPromptShown(key)
      setDismissed(true)
      onClose?.()
    }
  }

  function handleSubscribeClick() {
    markPromptShown(key)
    trackConversionPromptClicked(moment, tenantSlug)
  }

  return (
    <Dialog open={shouldOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <Icon className="h-5 w-5" />
          </div>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
          {copy.detail}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Later
          </Button>
          <Button asChild onClick={handleSubscribeClick}>
            <Link href={`/t/${tenantSlug}/settings/billing`}>
              <CreditCard className="h-4 w-4" />
              Subscribe now
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

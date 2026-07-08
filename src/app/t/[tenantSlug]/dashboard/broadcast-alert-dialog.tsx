'use client'

import { useState, useTransition } from 'react'
import { Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { sendBroadcastAlert } from './broadcast-actions'

const MAX_CHARS = 500

interface BroadcastAlertDialogProps {
  tenantSlug: string
}

export function BroadcastAlertDialog({ tenantSlug }: BroadcastAlertDialogProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ count: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const charCount = message.length
  const isOverLimit = charCount > MAX_CHARS
  const canSend = message.trim().length > 0 && !isOverLimit && !isPending

  function handleSend() {
    setError(null)
    setResult(null)
    startTransition(async () => {
      try {
        const res = await sendBroadcastAlert(tenantSlug, message)
        setResult({ count: res.count })
        setMessage('')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to send alert')
      }
    })
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset state when closing
      setMessage('')
      setResult(null)
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium hover:bg-accent transition-colors"
        >
          <Megaphone className="h-3.5 w-3.5" />
          Send alert
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send alert to all employees</DialogTitle>
          <DialogDescription>
            This will send a notification to every member of your organisation. Use this for important announcements or urgent updates.
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Alert sent successfully
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              {result.count} notification{result.count !== 1 ? 's' : ''} delivered.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={MAX_CHARS + 50} // Allow slight overshoot so we can show the error
                disabled={isPending}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-muted-foreground">
                  This will be sent to all employees in your organisation.
                </span>
                <span
                  className={`text-xs tabular-nums ${
                    isOverLimit
                      ? 'text-red-600 font-medium'
                      : charCount > MAX_CHARS * 0.9
                        ? 'text-amber-600'
                        : 'text-muted-foreground'
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          {result ? (
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button onClick={handleSend} disabled={!canSend}>
                {isPending ? 'Sending...' : 'Send notification'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

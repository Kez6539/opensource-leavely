'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Ban, CheckCircle2 } from 'lucide-react'
import { setUserDisabledAction } from '../actions'

export function DisableUserButton({
  userId,
  userEmail,
  isDisabled,
}: {
  userId: string
  userEmail: string
  isDisabled: boolean
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleClick() {
    const willDisable = !isDisabled
    const verb = willDisable ? 'disable' : 'enable'
    const confirmed = window.confirm(
      `Are you sure you want to ${verb} ${userEmail}?` +
        (willDisable
          ? '\n\nThey will be signed out immediately and unable to log back in until re-enabled.'
          : '')
    )
    if (!confirmed) return
    startTransition(async () => {
      const res = await setUserDisabledAction(userId, willDisable)
      if ('error' in res && res.error) {
        toast.error(res.error)
        return
      }
      toast.success(willDisable ? 'User disabled' : 'User enabled')
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors disabled:opacity-50 ${
        isDisabled
          ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/30'
          : 'border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30'
      }`}
    >
      {isDisabled ? <CheckCircle2 className="h-3 w-3" /> : <Ban className="h-3 w-3" />}
      {pending ? 'Working…' : isDisabled ? 'Enable' : 'Disable'}
    </button>
  )
}

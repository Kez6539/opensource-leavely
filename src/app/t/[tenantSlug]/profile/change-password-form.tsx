'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { CardSection, FormErrorBanner } from '@/components/shared'
import { changeMyPassword } from './actions'

interface Props {
  tenantSlug: string
}

export function ChangePasswordForm({ tenantSlug }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [currentPassword, setCurrent] = useState('')
  const [newPassword, setNew] = useState('')
  const [confirm, setConfirm] = useState('')

  const showMismatch = confirm.length > 0 && newPassword !== confirm
  const valid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    confirm === newPassword

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (!valid) return
    startTransition(async () => {
      const result = await changeMyPassword(tenantSlug, {
        currentPassword,
        newPassword,
        confirm,
      })
      if (!result.ok) {
        setError(result.error)
        toast.error(result.error)
        return
      }
      setSuccess(true)
      setCurrent('')
      setNew('')
      setConfirm('')
      toast.success('Password updated')
    })
  }

  return (
    <CardSection title="Change password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormErrorBanner message={error} />
        {success && (
          <div
            role="status"
            className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
          >
            Password updated successfully.
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="current-password">Current password</Label>
          <PasswordInput
            id="current-password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <PasswordInput
            id="new-password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-new-password">Confirm new password</Label>
          <PasswordInput
            id="confirm-new-password"
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Type it again"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={showMismatch}
          />
          {showMismatch && (
            <p className="text-xs text-destructive">Passwords don&apos;t match</p>
          )}
        </div>
        <Button type="submit" disabled={!valid || isPending}>
          {isPending ? 'Updating…' : 'Update password'}
        </Button>
        <p className="text-xs text-muted-foreground">
          Changing your password will sign you out of any other devices.
        </p>
      </form>
    </CardSection>
  )
}

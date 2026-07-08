'use client'

import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { FormErrorBanner } from '@/components/shared/form-error-banner'
import { useActionState, useState } from 'react'
import { resetPasswordAction } from './actions'

export function ResetForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, {
    error: '',
  })
  // Mirror the password values into local state so we can show an inline
  // mismatch warning before submit. The server still re-validates. (#184)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const showMismatch = confirm.length > 0 && password !== confirm

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          New password
        </Label>
        <PasswordInput
          id="password"
          name="password"
          placeholder="Minimum 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm" className="text-sm font-medium">
          Confirm new password
        </Label>
        <PasswordInput
          id="confirm"
          name="confirm"
          placeholder="Type it again"
          required
          minLength={8}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          aria-invalid={showMismatch}
          className="h-10"
        />
        {showMismatch && (
          <p className="text-xs text-destructive">Passwords don&apos;t match</p>
        )}
      </div>
      <FormErrorBanner message={state.error} />
      <Button
        type="submit"
        className="w-full h-10 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150"
        disabled={pending || showMismatch || !password || !confirm}
      >
        {pending ? 'Resetting...' : 'Reset password'}
      </Button>
    </form>
  )
}

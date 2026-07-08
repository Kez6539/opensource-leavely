'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { acceptInviteWithSignup } from './actions'

export function InviteSignupForm({
  token,
  inviteEmail,
}: {
  token: string
  inviteEmail: string
}) {
  const [state, formAction, pending] = useActionState(
    acceptInviteWithSignup,
    { error: '' }
  )

  return (
    <form action={formAction} className="space-y-3 text-left">
      <input type="hidden" name="token" value={token} />

      <div className="space-y-1.5">
        <Label htmlFor="invite-name">Your name</Label>
        <Input
          id="invite-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="invite-email">Email</Label>
        {/*
          (#177) The server always uses the invite's email — letting the user
          type a different one and silently overwriting it locked them out
          of their newly created account. Show the invite email as a
          read-only field with helper text instead.
        */}
        <Input
          id="invite-email"
          type="email"
          value={inviteEmail}
          disabled
          readOnly
          autoComplete="username"
          className="cursor-not-allowed opacity-80"
        />
        <p className="text-xs text-muted-foreground">
          This invite is for <strong>{inviteEmail}</strong>.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="invite-password">Password</Label>
        <PasswordInput
          id="invite-password"
          name="password"
          required
          autoComplete="new-password"
          minLength={8}
          placeholder="At least 8 characters"
        />
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Creating account…' : 'Create account & accept invite'}
      </Button>
    </form>
  )
}

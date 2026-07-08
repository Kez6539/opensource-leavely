'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { forgotPasswordAction } from './actions'
import Link from 'next/link'

export function ForgotForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, {
    error: '',
    success: false,
  })

  if (state.success) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-sm p-4 font-medium">
          If an account exists with that email, we&apos;ve sent a password reset link. Please check your inbox.
        </div>
        <Link
          href="/login"
          className="text-sm text-emerald-600 hover:underline font-medium"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          autoComplete="username"
          className="h-10"
        />
      </div>
      {state.error && (
        <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3 font-medium">
          {state.error}
        </div>
      )}
      <Button
        type="submit"
        className="w-full h-10 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150"
        disabled={pending}
      >
        {pending ? 'Sending...' : 'Send reset link'}
      </Button>
      <div className="text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Back to sign in
        </Link>
      </div>
    </form>
  )
}

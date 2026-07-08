'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { FormErrorBanner } from '@/components/shared/form-error-banner'
import { GoogleIcon, MicrosoftIcon } from '@/components/shared/oauth-icons'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loginAction } from './actions'

export function LoginForm({ hideOAuth, showMicrosoft }: { hideOAuth?: boolean; showMicrosoft?: boolean } = {}) {
  const [state, formAction, pending] = useActionState(loginAction, { error: '' })
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get('redirect')

  return (
    <div className="space-y-4">
      {!hideOAuth && (
        <>
          {/* OAuth buttons */}
          <div className="space-y-2">
            <a href="/api/auth/google?intent=login">
              <Button variant="outline" className="w-full h-11 md:h-10 font-medium gap-2" type="button">
                <GoogleIcon />
                Continue with Google
              </Button>
            </a>
            {showMicrosoft && (
              <a href="/api/auth/microsoft?intent=login">
                <Button variant="outline" className="w-full h-11 md:h-10 font-medium gap-2" type="button">
                  <MicrosoftIcon />
                  Continue with Microsoft
                </Button>
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
        </>
      )}

      {/* Email/password form */}
      <form action={formAction} className="space-y-4">
        {redirectParam && <input type="hidden" name="redirect" value={redirectParam} />}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required autoComplete="username" className="h-11 md:h-10" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <a href="/forgot-password" className="text-xs text-emerald-600 hover:underline font-medium">
              Forgot password?
            </a>
          </div>
          <PasswordInput id="password" name="password" required autoComplete="current-password" className="h-11 md:h-10" />
        </div>
        <FormErrorBanner message={state.error} />
        <Button
          type="submit"
          className="w-full h-11 md:h-10 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150"
          disabled={pending}
        >
          {pending ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

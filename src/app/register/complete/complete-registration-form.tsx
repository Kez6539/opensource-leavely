'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { completeOAuthRegistration } from './actions'

interface Props {
  email: string
  name: string
  provider: string
}

export function CompleteRegistrationForm({ email, name, provider }: Props) {
  const [state, formAction, pending] = useActionState(completeOAuthRegistration, { error: '' })

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Name</Label>
        <Input value={name} disabled className="h-10 bg-muted" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Email</Label>
        <Input value={email} disabled className="h-10 bg-muted" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-muted-foreground">Signed in with</Label>
        <Input value={provider} disabled className="h-10 bg-muted" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">Company name</Label>
        <Input id="company" name="company" placeholder="Acme Inc." required className="h-10" autoFocus />
      </div>
      {state.error && (
        <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3 font-medium">{state.error}</div>
      )}
      <Button
        type="submit"
        className="w-full h-10 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150"
        disabled={pending}
      >
        {pending ? 'Creating workspace...' : 'Create workspace'}
      </Button>
    </form>
  )
}

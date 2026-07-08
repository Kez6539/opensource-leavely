'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { registerPartner } from '../actions'

export function PartnerRegisterForm() {
  const [state, formAction, pending] = useActionState(registerPartner, { error: '' })

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Your name</Label>
        <Input id="name" name="name" placeholder="Jane Smith" required className="h-10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">Company name</Label>
        <Input id="company" name="company" placeholder="Smith & Co Accountants" className="h-10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@company.com" required className="h-10" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">Phone (optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="07700 900000" className="h-10" />
      </div>
      <div className="flex items-start gap-2">
        <input type="checkbox" id="terms" name="terms" required className="mt-1 rounded border-gray-300" />
        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
          I agree to the{' '}
          <a href="/partners/terms" target="_blank" className="text-purple-600 hover:underline font-medium">
            Partner Programme Terms
          </a>
          , including the self-referral and prohibited conduct policies.
        </label>
      </div>
      {state.error && (
        <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3 font-medium">{state.error}</div>
      )}
      <Button
        type="submit"
        className="w-full h-10 font-semibold shadow-md shadow-purple-500/20 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-150"
        disabled={pending}
      >
        {pending ? 'Creating account...' : 'Join Partner Programme'}
      </Button>
    </form>
  )
}

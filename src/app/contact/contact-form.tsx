'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { trackContactSubmitted } from '@/lib/analytics'
import { submitContactMessage } from './actions'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const result = await submitContactMessage({ name, email, company, message })
      if (result.ok) {
        trackContactSubmitted()
        setSubmitted(true)
      } else {
        setError(result.error)
      }
    } catch {
      setError('Something went wrong sending your message. Please try again, or email hello@leavely.online directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 mb-6">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
        <p className="text-gray-500 max-w-sm">
          Thanks! We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company name</Label>
        <Input
          id="company"
          placeholder="Your company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="How can we help?"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full text-base font-semibold h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20"
      >
        {submitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}

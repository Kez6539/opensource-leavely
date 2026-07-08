'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Input as TextInput } from '@/components/ui/input'
import { submitDemoLead } from './actions'

const EMPLOYEE_COUNTS = ['1-10', '11-25', '26-50', '51-100', '100+']

const CURRENT_SYSTEMS = [
  'Spreadsheets',
  'BrightHR',
  'Timetastic',
  'Charlie HR',
  'Other HR software',
  'None',
]

const PAIN_POINTS = [
  'Tracking leave on spreadsheets is a nightmare',
  'Current software is too expensive',
  'No visibility of who\'s off when',
  'Managing sickness absence',
  'Need to automate approvals',
  'Other',
]

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function DemoForm() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [employeeCount, setEmployeeCount] = useState('')
  const [currentSystem, setCurrentSystem] = useState('')
  const [industry, setIndustry] = useState('')
  const [painPoint, setPainPoint] = useState('')
  const [painPointOther, setPainPointOther] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [fieldError, setFieldError] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Please enter your name'
    if (!company.trim()) errs.company = 'Please enter your company name'
    if (!email.trim()) errs.email = 'Please enter your business email'
    else if (!EMAIL_RX.test(email.trim())) errs.email = 'That email address doesn\'t look right'
    if (!phone.trim()) errs.phone = 'Please enter your phone number'
    if (!employeeCount) errs.employeeCount = 'Please pick a team size'
    if (!painPoint) errs.painPoint = 'Tell us what we can help with'
    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const errs = validate()
    setFieldError(errs)
    if (Object.keys(errs).length > 0) {
      // Jump focus to the first invalid field for keyboard users.
      const first = Object.keys(errs)[0]
      const el = document.getElementById(first) as HTMLInputElement | null
      el?.focus()
      return
    }
    setSubmitting(true)
    try {
      const result = await submitDemoLead({
        name,
        company,
        email,
        phone,
        employeeCount,
        currentSystem: currentSystem || undefined,
        industry: industry || undefined,
        painPoint,
        painPointOther: painPoint === 'Other' ? painPointOther : undefined,
      })
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error)
      }
    } catch (err) {
      // Server action error messages are masked by Next.js in production, so
      // rendering err.message would show technical boilerplate to a prospect.
      console.error('[book-a-demo] submit failed:', err)
      setError('Something went wrong. Please try again, or email hello@leavely.online.')
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
        <h3 className="text-xl font-bold text-gray-900 mb-2">Demo request received!</h3>
        <p className="text-gray-500 max-w-sm">
          Thanks {name}, we&apos;ll call you within 24 hours to arrange your personalised demo.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-busy={submitting}>
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!fieldError.name}
          />
          {fieldError.name && <p className="text-xs text-red-600">{fieldError.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company name *</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Your company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            aria-invalid={!!fieldError.company}
          />
          {fieldError.company && <p className="text-xs text-red-600">{fieldError.company}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Business email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!fieldError.email}
          />
          {fieldError.email && <p className="text-xs text-red-600">{fieldError.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="07xxx xxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!fieldError.phone}
          />
          {fieldError.phone && <p className="text-xs text-red-600">{fieldError.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeCount">Number of employees *</Label>
          <Select value={employeeCount} onValueChange={setEmployeeCount}>
            <SelectTrigger id="employeeCount" aria-invalid={!!fieldError.employeeCount}>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYEE_COUNTS.map((count) => (
                <SelectItem key={count} value={count}>{count}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldError.employeeCount && <p className="text-xs text-red-600">{fieldError.employeeCount}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentSystem">Current system</Label>
          <Select value={currentSystem} onValueChange={setCurrentSystem}>
            <SelectTrigger id="currentSystem">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {CURRENT_SYSTEMS.map((sys) => (
                <SelectItem key={sys} value={sys}>{sys}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <TextInput
          id="industry"
          name="industry"
          autoComplete="organization-title"
          placeholder="e.g. Construction, Retail, Healthcare..."
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="painPoint">Biggest challenge *</Label>
        <Select value={painPoint} onValueChange={setPainPoint}>
          <SelectTrigger id="painPoint" aria-invalid={!!fieldError.painPoint}>
            <SelectValue placeholder="What's your biggest pain point?" />
          </SelectTrigger>
          <SelectContent>
            {PAIN_POINTS.map((point) => (
              <SelectItem key={point} value={point}>{point}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldError.painPoint && <p className="text-xs text-red-600">{fieldError.painPoint}</p>}
      </div>

      {painPoint === 'Other' && (
        <div className="space-y-2">
          <Label htmlFor="painPointOther">Tell us more</Label>
          <TextInput
            id="painPointOther"
            name="painPointOther"
            placeholder="Describe your challenge..."
            value={painPointOther}
            onChange={(e) => setPainPointOther(e.target.value)}
          />
        </div>
      )}

      {/*
        Submit always enabled — disabled-with-no-feedback was the worst form
        pattern for conversion. Validation runs on click and the first
        invalid field gets focus + an inline message.
      */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full text-base font-semibold h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20"
      >
        {submitting ? 'Submitting...' : 'Book your free demo'}
      </Button>

      {submitting && (
        <div className="space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-3" aria-hidden>
          <Skeleton className="h-3 w-10/12 bg-gray-200" />
          <Skeleton className="h-3 w-8/12 bg-gray-200" />
          <Skeleton className="h-3 w-6/12 bg-gray-200" />
        </div>
      )}

      <p className="text-[11px] text-center text-gray-500 leading-relaxed">
        By submitting, you agree we may contact you about your demo. See our{' '}
        <Link href="/privacy" className="underline hover:text-gray-700">privacy policy</Link>.
        We don&apos;t share your details.
      </p>
    </form>
  )
}

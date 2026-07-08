'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useId, useState, useMemo, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardSection, FormErrorBanner } from '@/components/shared'
import { AlertTriangle } from 'lucide-react'
import { createLeaveRequest, checkLeaveClashes } from '../actions'

// (#173, #182) Mirror the server bounds (2 years forward, 1 year back)
// in client-side helpers used for the date input attributes.
function leaveDateMin(): string {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 1)
  return d.toISOString().split('T')[0]
}
function leaveDateMax(): string {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 2)
  return d.toISOString().split('T')[0]
}

const schema = z.object({
  employeeId: z.string().min(1, 'Select an employee'),
  policyId: z.string().min(1, 'Select a leave policy'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().trim().max(2000).optional(),
  reasonDetails: z.string().trim().max(1800).optional(),
  halfDayStart: z.boolean(),
  halfDayEnd: z.boolean(),
}).refine((d) => d.endDate >= d.startDate, {
  message: 'End date must be on or after start date',
  path: ['endDate'],
})

type FormValues = z.infer<typeof schema>

interface Props {
  tenantSlug: string
  employees: { id: string; firstName: string; lastName: string; hoursPerDay: number | null }[]
  policies: { id: string; name: string; allowHalfDay: boolean; unit: string }[]
  defaultEmployeeId?: string
  defaultPolicyId?: string
  // Pre-fetched on the page so the duration preview matches what the
  // server will compute. holidayKeys are local-day strings (yyyy-MM-dd).
  // workingPatterns is a map of employeeId → array of working day-of-week
  // numbers (0=Sun, 1=Mon, ..., 6=Sat). An employeeId with no entry falls
  // back to Mon-Fri.
  holidayKeys?: string[]
  workingPatterns?: Record<string, number[]>
}

export function LeaveRequestForm({
  tenantSlug,
  employees,
  policies,
  defaultEmployeeId,
  defaultPolicyId,
  holidayKeys = [],
  workingPatterns = {},
}: Props) {
  const router = useRouter()
  const reactId = useId()
  const ids = {
    employee: `${reactId}-employee`,
    policy: `${reactId}-policy`,
    startDate: `${reactId}-start`,
    endDate: `${reactId}-end`,
    halfDayStart: `${reactId}-half-start`,
    halfDayEnd: `${reactId}-half-end`,
    reason: `${reactId}-reason`,
    reasonDetails: `${reactId}-reason-details`,
  }
  const [error, setError] = useState<string | null>(null)
  const [clashes, setClashes] = useState<{
    selfOverlap: boolean
    colleagueClashes: { employeeName: string; policyName: string; startDate: string; endDate: string; reason: string }[]
    blackoutDates: { name: string; startDate: string; endDate: string }[]
    noticeWarning: string | null
  }>({ selfOverlap: false, colleagueClashes: [], blackoutDates: [], noticeWarning: null })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { employeeId: defaultEmployeeId ?? '', policyId: defaultPolicyId ?? '', startDate: '', endDate: '', reason: '', reasonDetails: '', halfDayStart: false, halfDayEnd: false },
  })

  const selectedPolicyId = watch('policyId')
  const selectedEmployeeId = watch('employeeId')
  const startDateStr = watch('startDate')
  const endDateStr = watch('endDate')
  const halfDayStart = watch('halfDayStart')
  const halfDayEnd = watch('halfDayEnd')
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId)
  const showHalfDay = selectedPolicy?.allowHalfDay ?? false
  const isHoursBased = selectedPolicy?.unit === 'hours'

  // Pre-compute the holiday set + per-day-of-week format for fast lookup
  // inside the duration loop. Built once per render of holidayKeys.
  const holidaySet = useMemo(() => new Set(holidayKeys), [holidayKeys])

  // Calculate estimated duration for display. The previous version was a
  // hardcoded Mon-Fri count that ignored bank holidays AND per-employee
  // working patterns — so a part-time employee or a holiday-week request
  // saw a visibly wrong number until they submitted and the server
  // recalculated. Now uses the holiday set + working pattern passed from
  // the page so the preview matches what the server will compute.
  // (Round 5 follow-up.)
  const durationPreview = useMemo(() => {
    if (!startDateStr || !endDateStr) return null
    const start = new Date(startDateStr)
    const end = new Date(endDateStr)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return null

    // Resolve the employee's working pattern. Empty/missing → fall back
    // to Mon-Fri (1..5).
    const empPatternRaw = selectedEmployeeId ? workingPatterns[selectedEmployeeId] : undefined
    const empPattern = empPatternRaw && empPatternRaw.length > 0
      ? new Set(empPatternRaw)
      : new Set([1, 2, 3, 4, 5])

    // Iterate the date range day-by-day. For each calendar day:
    //   - skip non-working days for THIS employee
    //   - skip public holidays
    //   - otherwise count it
    // Mirrors countBusinessDays in src/lib/business-days.ts so the
    // preview reconciles with the server-side calculation.
    let days = 0
    const current = new Date(start)
    while (current <= end) {
      const dow = current.getDay()
      if (empPattern.has(dow)) {
        // Build the local-day key the same way toLocalDayKey does on the
        // server, so a BST holiday matches.
        const y = current.getFullYear()
        const m = String(current.getMonth() + 1).padStart(2, '0')
        const d = String(current.getDate()).padStart(2, '0')
        const key = `${y}-${m}-${d}`
        if (!holidaySet.has(key)) {
          days++
        }
      }
      current.setDate(current.getDate() + 1)
    }
    const sameDay = startDateStr === endDateStr
    if (sameDay && halfDayStart && halfDayEnd) {
      if (days > 0) days -= 0.5
    } else {
      if (halfDayStart && days > 0) days -= 0.5
      if (halfDayEnd && days > 0) days -= 0.5
    }
    days = Math.max(0, days)

    if (isHoursBased) {
      const employee = employees.find((e) => e.id === selectedEmployeeId)
      const hpd = employee?.hoursPerDay ?? 7.5
      const hours = Number((days * hpd).toFixed(2))
      return `${hours} hours (${days} working day${days !== 1 ? 's' : ''} × ${hpd} hrs/day)`
    }
    return `${days} working day${days !== 1 ? 's' : ''}`
  }, [
    startDateStr,
    endDateStr,
    halfDayStart,
    halfDayEnd,
    isHoursBased,
    selectedEmployeeId,
    employees,
    holidaySet,
    workingPatterns,
  ])

  // Check for clashes when dates or employee change
  const checkClashes = useCallback(async () => {
    if (!selectedEmployeeId || !startDateStr || !endDateStr) {
      setClashes({ selfOverlap: false, colleagueClashes: [], blackoutDates: [], noticeWarning: null })
      return
    }
    try {
      const result = await checkLeaveClashes(tenantSlug, selectedEmployeeId, startDateStr, endDateStr, selectedPolicyId || undefined)
      setClashes(result)
    } catch {
      // Silently fail — clash check is advisory
    }
  }, [tenantSlug, selectedEmployeeId, startDateStr, endDateStr, selectedPolicyId])

  useEffect(() => { checkClashes() }, [checkClashes])

  async function onSubmit(data: FormValues) {
    setError(null)
    // Merge category + free-text details into the single `reason` column
    // so there's an auditable typed reason if the employee later disputes
    // booking it. "Medical appointment — MRI scan, Royal Shrewsbury" etc.
    const category = (data.reason ?? '').trim()
    const details = (data.reasonDetails ?? '').trim()
    const mergedReason = category && details
      ? `${category} — ${details}`
      : category || details || undefined
    const payload = { ...data, reason: mergedReason, reasonDetails: undefined }
    // Live bug fix: a customer reported the form silently swallowing
    // submissions when the server action threw a non-UserError (e.g.
    // SUBSCRIPTION_REQUIRED, ForbiddenError). Wrap in a catch so any
    // failure surfaces a visible message instead of leaving the user
    // staring at an unchanged form.
    try {
      const result = await createLeaveRequest(tenantSlug, payload)
      if (!result.ok) {
        setError(result.error)
        toast.error(result.error)
        return
      }
      toast.success('Leave request submitted')
      router.push(`/t/${tenantSlug}/leave`)
      router.refresh()
    } catch (err) {
      console.error('[leave/new] submit failed:', err)
      const msg = err instanceof Error ? err.message : ''
      // In production Next.js masks server error messages, but the sentinel
      // survives on error.digest (see src/lib/paywall.ts) — match that first.
      const digest = (err as { digest?: string } | null)?.digest
      setError(
        digest === 'DEMO_READONLY' || msg === 'DEMO_READONLY'
          ? 'Demo mode is read-only. Sign up for a free trial to submit leave.'
          : digest === 'SUBSCRIPTION_REQUIRED' || msg === 'SUBSCRIPTION_REQUIRED'
          ? 'Your subscription is inactive. Update billing to keep submitting leave.'
          : digest === 'FORBIDDEN' || msg === 'FORBIDDEN'
          ? 'You do not have permission to submit leave for this employee.'
          : 'Failed to submit leave request. Please try again.',
      )
    }
  }

  // Surface any field-level validation errors that don't have an inline
  // display next to the field (e.g. cross-field refines). Without this
  // a refine failure leaves the submit button looking dead.
  const firstFormError =
    errors.root?.message ||
    errors.endDate?.message ||
    errors.startDate?.message ||
    errors.policyId?.message ||
    errors.employeeId?.message ||
    null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={error || firstFormError} />

      <CardSection title="Request Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={ids.employee}>Employee *</Label>
            <Select
              value={selectedEmployeeId || ''}
              onValueChange={(v) => setValue('employeeId', v, { shouldValidate: true })}
            >
              <SelectTrigger id={ids.employee}>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.firstName} {e.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={ids.policy}>Leave Policy *</Label>
            {/* Live bug fix: control the Select with the watched form
                value so a URL-prefilled `defaultPolicyId` shows up
                visually. The previous uncontrolled Select rendered the
                placeholder even when react-hook-form's state had the
                policy set. */}
            <Select
              value={selectedPolicyId || ''}
              onValueChange={(v) => setValue('policyId', v, { shouldValidate: true })}
            >
              <SelectTrigger id={ids.policy}>
                <SelectValue placeholder="Select policy" />
              </SelectTrigger>
              <SelectContent>
                {policies.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.policyId && <p className="text-sm text-red-500">{errors.policyId.message}</p>}
          </div>

          {/* (#173, #182) Bound the date pickers to the same window the
              server enforces — 1 year back, 2 years forward. */}
          <div className="space-y-2">
            <Label htmlFor={ids.startDate}>Start date *</Label>
            <Input
              id={ids.startDate}
              type="date"
              min={leaveDateMin()}
              max={leaveDateMax()}
              {...register('startDate')}
            />
            {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={ids.endDate}>End date *</Label>
            <Input
              id={ids.endDate}
              type="date"
              min={leaveDateMin()}
              max={leaveDateMax()}
              {...register('endDate')}
            />
            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
          </div>

          {showHalfDay && (
            <div className="sm:col-span-2 flex gap-6">
              <label htmlFor={ids.halfDayStart} className="flex items-center gap-2 text-sm">
                <input
                  id={ids.halfDayStart}
                  type="checkbox"
                  {...register('halfDayStart')}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Half day (start date)
              </label>
              <label htmlFor={ids.halfDayEnd} className="flex items-center gap-2 text-sm">
                <input
                  id={ids.halfDayEnd}
                  type="checkbox"
                  {...register('halfDayEnd')}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Half day (end date)
              </label>
            </div>
          )}

          {durationPreview && (
            <div className="sm:col-span-2">
              <p className="text-sm text-muted-foreground">
                Estimated duration: <span className="font-medium text-foreground">{durationPreview}</span>
              </p>
            </div>
          )}

          {clashes.selfOverlap && (
            <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2 dark:bg-red-950/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                This employee already has leave booked during these dates. The request will be rejected.
              </p>
            </div>
          )}

          {clashes.blackoutDates.length > 0 && (
            <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2 dark:bg-red-950/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <div className="text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">
                  Leave cannot be booked during the following blackout period{clashes.blackoutDates.length !== 1 ? 's' : ''}:
                </p>
                <ul className="list-disc ml-4 space-y-0.5">
                  {clashes.blackoutDates.map((b, i) => (
                    <li key={i}>
                      {b.name} — {new Date(b.startDate).toLocaleDateString('en-GB')} to {new Date(b.endDate).toLocaleDateString('en-GB')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {clashes.noticeWarning && (
            <div className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2 dark:bg-red-950/20 dark:border-red-800">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                {clashes.noticeWarning}
              </p>
            </div>
          )}

          {clashes.colleagueClashes.length > 0 && (
            <div className="sm:col-span-2 rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-2 dark:bg-amber-950/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <p className="font-medium mb-1">
                  {clashes.colleagueClashes.length} colleague{clashes.colleagueClashes.length !== 1 ? 's' : ''} {clashes.colleagueClashes.length !== 1 ? 'are' : 'is'} already off during these dates:
                </p>
                <ul className="list-disc ml-4 space-y-0.5">
                  {clashes.colleagueClashes.map((c, i) => (
                    <li key={i}>
                      <span className="font-medium">{c.employeeName}</span> — {new Date(c.startDate).toLocaleDateString('en-GB')} to {new Date(c.endDate).toLocaleDateString('en-GB')}
                      <span className="text-xs opacity-75"> ({c.reason})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={ids.reason}>Reason (optional)</Label>
            <Select onValueChange={(v) => setValue('reason', v)}>
              <SelectTrigger id={ids.reason}>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Holiday',
                  'Sick leave',
                  'Medical appointment',
                  'Family / Personal',
                  'Bereavement',
                  'Jury duty',
                  'Training / Conference',
                  'Other',
                ].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={ids.reasonDetails}>Details (optional)</Label>
            <Textarea
              id={ids.reasonDetails}
              rows={2}
              placeholder="e.g. MRI scan at Royal Shrewsbury, 10am"
              maxLength={1800}
              {...register('reasonDetails')}
            />
          </div>
        </div>
      </CardSection>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Submitting…' : 'Submit request'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

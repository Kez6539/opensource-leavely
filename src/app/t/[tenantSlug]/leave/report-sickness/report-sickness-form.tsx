'use client'

import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
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
import { reportSickness } from '../actions'
import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'
import { calendarDaysBetween } from '@/lib/business-days'

// (#178) Description was unbounded — pasting a long medical history
// landed unmodified in Postgres. 2000 chars is enough for any realistic
// note. Trim too so whitespace-only input is treated as empty.
const schema = z.object({
  employeeId: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().trim().max(2000, 'Notes must be 2000 characters or fewer').optional(),
}).refine((data) => data.endDate >= data.startDate, {
  message: 'End date must be on or after start date',
  path: ['endDate'],
})

type FormValues = z.infer<typeof schema>

interface ReportSicknessFormProps {
  tenantSlug: string
  canReportForOthers?: boolean
  employees?: { id: string; firstName: string; lastName: string; userId: string | null }[]
  defaultEmployeeId?: string
}

// LOCAL today, not UTC. The previous `new Date().toISOString().split('T')[0]`
// returned the UTC calendar day, which after midnight UTC (e.g. ~1am BST in
// summer) is yesterday in the user's local time. The sickness form was
// pre-filling and capping at the wrong day around BST/midnight boundaries.
// (Round 5 #7.)
function todayString() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function dateMinusYearsString(years: number) {
  const d = new Date()
  d.setFullYear(d.getFullYear() - years)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function ReportSicknessForm({
  tenantSlug,
  canReportForOthers = false,
  employees = [],
  defaultEmployeeId,
}: ReportSicknessFormProps) {
  const router = useRouter()
  const reactId = useId()
  const ids = {
    employee: `${reactId}-employee`,
    startDate: `${reactId}-start`,
    endDate: `${reactId}-end`,
    description: `${reactId}-description`,
  }

  const today = todayString()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: defaultEmployeeId ?? '',
      startDate: today,
      endDate: today,
      description: '',
    },
  })

  const selectedEmployeeId = watch('employeeId')

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  // (#197) Calendar-day delta via the shared DST-safe helper.
  let calendarDays = 0
  if (startDate && endDate) {
    const s = new Date(startDate)
    const e = new Date(endDate)
    if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e >= s) {
      calendarDays = calendarDaysBetween(s, e)
    }
  }
  const showFitNoteWarning = calendarDays > 7

  // Live bug fix: a customer reported submit doing nothing when
  // logging sickness for an employee. Same shape as an employee's leave/new
  // bug — the action throws a non-UserError (RBAC, billing, schema),
  // the rejection bubbles past handleSubmit, and the user sees
  // nothing. Wrap with try/catch and surface failures via the same
  // FormErrorBanner the leave form uses.
  const [submitError, setSubmitError] = useState<string | null>(null)
  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    // Defence in depth: when the on-behalf form is shown, the employee
    // dropdown MUST be picked. Without this gate the form silently
    // submitted with no employeeId, the server fell back to the
    // calling user's own employee record, and if the caller had no
    // record (e.g. an OWNER without an Employee row) the server threw
    // a UserError that the user might miss.
    if (canReportForOthers && !data.employeeId) {
      setSubmitError('Please select the employee you are reporting sickness for.')
      toast.error('Please select an employee')
      return
    }
    const payload = {
      ...data,
      employeeId: canReportForOthers ? data.employeeId || undefined : undefined,
    }
    try {
      const result = await reportSickness(tenantSlug, payload)
      if (!result.ok) {
        setSubmitError(result.error)
        toast.error(result.error)
        return
      }
      if (showFitNoteWarning) {
        toast.success('Sickness reported. A fit note will be required for this absence (over 7 days).')
      } else {
        toast.success('Sickness reported successfully.')
      }
      router.push(`/t/${tenantSlug}/leave`)
    } catch (err) {
      console.error('[leave/report-sickness] submit failed:', err)
      const msg = err instanceof Error ? err.message : ''
      // Prod masks server error messages; the sentinel survives on
      // error.digest (see src/lib/paywall.ts) — match that first.
      const digest = (err as { digest?: string } | null)?.digest
      const friendly =
        digest === 'DEMO_READONLY' || msg === 'DEMO_READONLY'
          ? 'Demo mode is read-only. Sign up for a free trial to record sickness.'
          : digest === 'SUBSCRIPTION_REQUIRED' || msg === 'SUBSCRIPTION_REQUIRED'
          ? 'Your subscription is inactive. Update billing to keep recording sickness.'
          : digest === 'FORBIDDEN' || msg === 'FORBIDDEN'
          ? 'You do not have permission to report sickness for this employee.'
          : 'Failed to report sickness. Please try again.'
      setSubmitError(friendly)
      toast.error(friendly)
    }
  }

  // Surface any field-level validation errors that don't have an inline
  // display next to the field. Without this an `errors.employeeId` or
  // a cross-field refine error leaves the submit button looking dead.
  const firstFormError =
    errors.root?.message ||
    errors.employeeId?.message ||
    errors.endDate?.message ||
    errors.startDate?.message ||
    errors.description?.message ||
    null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={submitError || firstFormError} />
      <CardSection title="Sickness Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {canReportForOthers && employees.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={ids.employee}>Employee *</Label>
              <Select
                value={selectedEmployeeId || ''}
                onValueChange={(value) => setValue('employeeId', value, { shouldValidate: true })}
              >
                <SelectTrigger id={ids.employee}>
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                As a manager you can log sickness on behalf of any team member.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor={ids.startDate}>First day of sickness *</Label>
            {/* (#182) Sickness can be logged up to 2 years back, no
                future-dated entries. */}
            <Input
              id={ids.startDate}
              type="date"
              min={dateMinusYearsString(2)}
              max={todayString()}
              {...register('startDate')}
            />
            {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={ids.endDate}>Last day of sickness *</Label>
            {/* End date may be in the future when the employee has a
                fit note covering a forward-dated period (e.g. signed
                off until X). Start date stays capped at today. */}
            <Input
              id={ids.endDate}
              type="date"
              min={dateMinusYearsString(2)}
              {...register('endDate')}
            />
            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={ids.description}>Description / reason (optional)</Label>
            <Textarea
              id={ids.description}
              {...register('description')}
              placeholder="e.g. Flu, migraine, stomach bug..."
              rows={3}
            />
          </div>
        </div>

        {showFitNoteWarning && (
          <div className="mt-4 flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium">Fit note required</p>
              <p>This absence is over 7 calendar days. You will need to provide a fit note from your GP.</p>
            </div>
          </div>
        )}
      </CardSection>

      <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
        This sickness absence will be recorded immediately. No manager approval is needed.
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-600/20 font-semibold"
        >
          {isSubmitting ? 'Reporting...' : 'Report sickness'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

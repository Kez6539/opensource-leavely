'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { createToilAccrual } from '../actions'

// (#180) Hours used to be `z.string().min(1)` then parseFloat at submit
// — 'abc' passed validation and produced NaN at the server, '1,5' parsed
// to 1, and there was no upper bound. Now: strip £/comma noise on input,
// coerce to number, enforce a sane positive max-24 range. Reason gets
// trimmed and capped too.
const schema = z.object({
  employeeId: z.string().min(1, 'Select an employee'),
  date: z.string().min(1, 'Date is required'),
  hours: z
    .string()
    .min(1, 'Hours are required')
    .refine((v) => {
      const cleaned = v.replace(/[£,\s]/g, '')
      const n = Number(cleaned)
      return Number.isFinite(n) && n > 0 && n <= 24
    }, 'Enter a number of hours between 0 and 24'),
  reason: z.string().trim().max(500).optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  tenantSlug: string
  employees: { id: string; firstName: string; lastName: string }[]
  defaultEmployeeId?: string
}

export function ToilForm({ tenantSlug, employees, defaultEmployeeId }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: defaultEmployeeId ?? '',
      date: '',
      hours: '',
      reason: '',
    },
  })

  async function onSubmit(data: FormValues) {
    setError(null)
    try {
      const result = await createToilAccrual(tenantSlug, {
        employeeId: data.employeeId,
        date: data.date,
        hours: Number(data.hours.replace(/[£,\s]/g, '')),
        reason: data.reason,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push(`/t/${tenantSlug}/toil`)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={error} />

      <CardSection title="Overtime Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Employee *</Label>
            <Select defaultValue={defaultEmployeeId} onValueChange={(v) => setValue('employeeId', v)}>
              <SelectTrigger>
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
            <Label>Date of overtime *</Label>
            {/* (#182) Past 2 years to today; can't log future TOIL. */}
            <Input
              type="date"
              min={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 2); return d.toISOString().split('T')[0] })()}
              max={new Date().toISOString().split('T')[0]}
              {...register('date')}
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Hours worked *</Label>
            <Input
              type="number"
              step="0.5"
              min="0.5"
              max="24"
              placeholder="e.g. 2.5"
              {...register('hours')}
            />
            {errors.hours && <p className="text-sm text-red-500">{errors.hours.message}</p>}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Describe the overtime work..."
              rows={3}
              {...register('reason')}
            />
          </div>
        </div>
      </CardSection>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Submitting...' : 'Submit TOIL request'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

'use client'

import { useId, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Loader2 } from 'lucide-react'

const schema = z.object({
  employeeId: z.string().min(1, 'Select an employee'),
  policyId: z.string().min(1, 'Select a leave policy'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().optional(),
  halfDayStart: z.boolean(),
  halfDayEnd: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface AddTimeOffDialogProps {
  tenantSlug: string
}

export function AddTimeOffDialog({ tenantSlug }: AddTimeOffDialogProps) {
  const router = useRouter()
  const reactId = useId()
  const employeeFieldId = `${reactId}-employee`
  const policyFieldId = `${reactId}-policy`
  const startDateId = `${reactId}-start`
  const endDateId = `${reactId}-end`
  const reasonFieldId = `${reactId}-reason`
  const halfDayStartId = `${reactId}-half-start`
  const halfDayEndId = `${reactId}-half-end`
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<{ id: string; firstName: string; lastName: string }[]>([])
  const [policies, setPolicies] = useState<{ id: string; name: string; allowHalfDay: boolean }[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { employeeId: '', policyId: '', startDate: '', endDate: '', reason: '', halfDayStart: false, halfDayEnd: false },
  })

  const selectedPolicyId = watch('policyId')
  const selectedPolicy = policies.find(p => p.id === selectedPolicyId)
  const showHalfDay = selectedPolicy?.allowHalfDay ?? false

  useEffect(() => {
    if (open && employees.length === 0) {
      setLoading(true)
      import('@/app/t/[tenantSlug]/leave/actions')
        .then((m) => m.getFormOptions(tenantSlug))
        .then((options) => {
          setEmployees(options.employees)
          setPolicies(options.policies)
        })
        .catch(() => setError('Failed to load form data'))
        .finally(() => setLoading(false))
    }
  }, [open, tenantSlug, employees.length])

  async function onSubmit(data: FormValues) {
    setError(null)
    try {
      const { createLeaveRequest } = await import('@/app/t/[tenantSlug]/leave/actions')
      await createLeaveRequest(tenantSlug, data)
      setOpen(false)
      reset()
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) {
      reset()
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold shadow-sm sm:px-4 px-2.5"
          aria-label="Add time off"
        >
          <Plus className="h-4 w-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Add time off</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add time off</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            {error && <div role="alert" aria-live="polite" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={employeeFieldId}>Employee *</Label>
                <Select onValueChange={(v) => setValue('employeeId', v)}>
                  <SelectTrigger id={employeeFieldId}>
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
                {errors.employeeId && <p className="text-xs text-red-500">{errors.employeeId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={policyFieldId}>Leave policy *</Label>
                <Select onValueChange={(v) => setValue('policyId', v)}>
                  <SelectTrigger id={policyFieldId}>
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
                {errors.policyId && <p className="text-xs text-red-500">{errors.policyId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={startDateId}>Start date *</Label>
                <Input id={startDateId} type="date" {...register('startDate')} />
                {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor={endDateId}>End date *</Label>
                <Input id={endDateId} type="date" {...register('endDate')} />
                {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
              </div>

              {showHalfDay && (
                <div className="col-span-2 flex gap-6">
                  <label htmlFor={halfDayStartId} className="flex items-center gap-2 text-sm">
                    <input
                      id={halfDayStartId}
                      type="checkbox"
                      {...register('halfDayStart')}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    Half day (start date)
                  </label>
                  <label htmlFor={halfDayEndId} className="flex items-center gap-2 text-sm">
                    <input
                      id={halfDayEndId}
                      type="checkbox"
                      {...register('halfDayEnd')}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    Half day (end date)
                  </label>
                </div>
              )}

              <div className="space-y-2 col-span-2">
                <Label htmlFor={reasonFieldId}>Reason (optional)</Label>
                <Select onValueChange={(v) => setValue('reason', v)}>
                  <SelectTrigger id={reasonFieldId}>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Holiday / Vacation', 'Sick leave', 'Medical appointment', 'Family / Personal', 'Bereavement', 'Jury duty', 'Training / Conference', 'Other'].map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting} className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold">
                {isSubmitting ? 'Submitting...' : 'Submit request'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

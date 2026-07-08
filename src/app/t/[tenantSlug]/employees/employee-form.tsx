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
import { createEmployee, updateEmployee, type EmployeeFormData } from './actions'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// (#179, #189, #191, #194) Every free-form string is .trim()ed and capped
// — pasting a 50k-char address used to throw 500 — and the date / phone /
// hours fields get format and bounds guards. The matching server schema in
// employees/actions.ts mirrors these limits.
const PHONE_RE = /^[\d\s+()-]{5,20}$/
const today = () => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

const schema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(200)
    .email('Invalid email')
    .optional()
    .or(z.literal('')),
  jobTitle: z.string().trim().max(150).optional(),
  department: z.string().trim().max(150).optional(),
  startDate: z.string().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (v) => !v || new Date(v) <= today(),
      'Date of birth must be in the past',
    )
    .refine(
      (v) => !v || new Date(v) >= new Date('1900-01-01'),
      'Date of birth must be after 1900',
    ),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
  address: z.string().trim().max(500).optional(),
  emergencyContactName: z.string().trim().max(200).optional(),
  emergencyContactPhone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
  managerId: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  onboardingTemplateId: z.string().optional(),
  leaveYearStartMonth: z.string().optional(),
  // hoursPerDay is rendered as a number input but RHF passes the raw
  // string. Empty becomes null on submit; otherwise must parse to a
  // positive number ≤ 24.
  hoursPerDay: z
    .string()
    .optional()
    .refine(
      (v) => !v || (Number.isFinite(parseFloat(v)) && parseFloat(v) > 0 && parseFloat(v) <= 24),
      'Hours per day must be between 0 and 24',
    ),
})

type FormValues = z.infer<typeof schema>

interface Manager {
  id: string
  firstName: string
  lastName: string
}

interface OnboardingTemplate {
  id: string
  name: string
}

interface EmployeeFormProps {
  tenantSlug: string
  employeeId?: string
  defaultValues?: Partial<FormValues>
  managers?: Manager[]
  onboardingTemplates?: OnboardingTemplate[]
  showLeaveYearOverride?: boolean
}

export function EmployeeForm({ tenantSlug, employeeId, defaultValues, managers = [], onboardingTemplates = [], showLeaveYearOverride = false }: EmployeeFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const isEditing = !!employeeId

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      department: '',
      startDate: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      managerId: '',
      status: 'ACTIVE',
      onboardingTemplateId: '',
      leaveYearStartMonth: '',
      hoursPerDay: '',
      ...defaultValues,
    },
  })

  const status = watch('status')
  const managerId = watch('managerId')
  const onboardingTemplateId = watch('onboardingTemplateId')
  const leaveYearStartMonth = watch('leaveYearStartMonth')

  async function onSubmit(data: FormValues) {
    setError(null)
    try {
      // Convert leaveYearStartMonth from string to number|null for the server action
      const formData: EmployeeFormData = {
        ...data,
        leaveYearStartMonth: data.leaveYearStartMonth && data.leaveYearStartMonth !== ''
          ? parseInt(data.leaveYearStartMonth, 10)
          : null,
        hoursPerDay: data.hoursPerDay && data.hoursPerDay !== ''
          ? parseFloat(data.hoursPerDay)
          : null,
      }
      if (isEditing) {
        const result = await updateEmployee(tenantSlug, employeeId!, formData)
        if (!result.ok) {
          setError(result.error)
          return
        }
        router.push(`/t/${tenantSlug}/employees/${employeeId}`)
      } else {
        const result = await createEmployee(tenantSlug, formData)
        if (!result.ok) {
          setError(result.error)
          return
        }
        router.push(`/t/${tenantSlug}/employees/${result.data.id}`)
      }
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={error} />

      <CardSection title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name *</Label>
            <Input id="firstName" {...register('firstName')} />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name *</Label>
            <Input id="lastName" {...register('lastName')} />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              min="1900-01-01"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register('phone')} />
          </div>
        </div>
      </CardSection>

      <CardSection title="Address">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" rows={3} placeholder="Full address" {...register('address')} />
        </div>
      </CardSection>

      <CardSection title="Emergency Contact">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactName">Contact name</Label>
            <Input id="emergencyContactName" {...register('emergencyContactName')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Contact phone</Label>
            <Input id="emergencyContactPhone" type="tel" {...register('emergencyContactPhone')} />
          </div>
        </div>
      </CardSection>

      <CardSection title="Job Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job title</Label>
            <Input id="jobTitle" {...register('jobTitle')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input id="department" {...register('department')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start date</Label>
            <Input id="startDate" type="date" {...register('startDate')} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setValue('status', v as 'ACTIVE' | 'INACTIVE')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hoursPerDay">Hours per day</Label>
            <Input
              id="hoursPerDay"
              type="number"
              step="0.5"
              min="0"
              max="24"
              placeholder="7.5"
              {...register('hoursPerDay')}
            />
            <p className="text-xs text-muted-foreground">
              Used for hours-based leave policies. Leave blank for default (7.5 hours).
            </p>
          </div>
          {managers.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <Label>Manager</Label>
              <Select value={managerId || ''} onValueChange={(v) => setValue('managerId', v === 'none' ? '' : v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No manager</SelectItem>
                  {managers.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.firstName} {m.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {!isEditing && onboardingTemplates.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <Label>Onboarding Template</Label>
              <Select
                value={onboardingTemplateId || ''}
                onValueChange={(v) => setValue('onboardingTemplateId', v === 'none' ? '' : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No template</SelectItem>
                  {onboardingTemplates.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {showLeaveYearOverride && (
            <div className="space-y-2 sm:col-span-2">
              <Label>Leave Year Start Month</Label>
              <Select
                value={leaveYearStartMonth || ''}
                onValueChange={(v) => setValue('leaveYearStartMonth', v === 'default' ? '' : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Use company default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Use company default</SelectItem>
                  {MONTH_NAMES.map((name, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Override the company leave year start month for this employee. Leave as default to use the company setting.
              </p>
            </div>
          )}
        </div>
      </CardSection>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Saving...' : isEditing ? 'Update employee' : 'Create employee'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="font-medium">
          Cancel
        </Button>
      </div>
    </form>
  )
}

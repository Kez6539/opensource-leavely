'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CardSection, FormErrorBanner } from '@/components/shared'
import { updateMyProfile } from './actions'

// (#189, #191) Phone fields are shape-checked, address/contact fields
// trimmed and capped, DOB rejected if in the future.
const PHONE_RE = /^[\d\s+()-]{5,20}$/
const schema = z.object({
  dateOfBirth: z
    .string()
    .optional()
    .refine((v) => !v || new Date(v) <= new Date(), 'DOB must be in the past'),
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
})

type FormValues = z.infer<typeof schema>

interface Props {
  tenantSlug: string
  defaultValues: FormValues
}

export function ProfileEditForm({ tenantSlug, defaultValues }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  async function onSubmit(data: FormValues) {
    setError(null)
    setSuccess(false)
    try {
      const result = await updateMyProfile(tenantSlug, data)
      if (!result.ok) {
        setError(result.error)
        toast.error(result.error)
        return
      }
      setSuccess(true)
      router.refresh()
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
      toast.error(msg)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormErrorBanner message={error} />
      {success && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-300"
        >
          Profile updated successfully.
        </div>
      )}

      <CardSection title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              min="1900-01-01"
              {...register('dateOfBirth')}
            />
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

      <div className="pt-2">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Saving...' : 'Update profile'}
        </Button>
      </div>
    </form>
  )
}

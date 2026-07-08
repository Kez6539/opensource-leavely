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
import { createGoal } from './actions'

// (#192) A goal that's already overdue on the day it's created is a UX
// trap — block past dates client-side and on the server. Title /
// description trimmed and capped to stop unbounded paste.
const schema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(2000).optional(),
  assigneeId: z.string().min(1, 'Assignee is required'),
  dueDate: z
    .string()
    .optional()
    .refine((v) => {
      if (!v) return true
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return new Date(v) >= today
    }, 'Due date must be today or later'),
})

type FormValues = z.infer<typeof schema>

interface GoalFormProps {
  tenantSlug: string
  employees: { id: string; firstName: string; lastName: string }[]
}

export function GoalForm({ tenantSlug, employees }: GoalFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      assigneeId: '',
      dueDate: '',
    },
  })

  const assigneeId = watch('assigneeId')

  async function onSubmit(data: FormValues) {
    setError(null)
    try {
      const result = await createGoal(tenantSlug, data)
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push(`/t/${tenantSlug}/performance/${result.data.id}`)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={error} />

      <CardSection title="Goal Details">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="e.g. Complete Q2 sales targets" {...register('title')} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe what success looks like for this goal..."
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assignee *</Label>
              <Select
                value={assigneeId}
                onValueChange={(v) => setValue('assigneeId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.firstName} {e.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assigneeId && <p className="text-sm text-red-500">{errors.assigneeId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due date</Label>
              <Input
                id="dueDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                max="2100-12-31"
                {...register('dueDate')}
              />
              {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
            </div>
          </div>
        </div>
      </CardSection>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Creating...' : 'Create goal'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="font-medium">
          Cancel
        </Button>
      </div>
    </form>
  )
}

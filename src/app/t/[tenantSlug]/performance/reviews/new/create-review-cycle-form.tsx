'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CardSection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createReviewCycle } from '../actions'

interface CreateReviewCycleFormProps {
  tenantSlug: string
}

export function CreateReviewCycleForm({ tenantSlug }: CreateReviewCycleFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Defaults: current quarter
  const now = new Date()
  const quarter = Math.floor(now.getMonth() / 3) + 1
  const year = now.getFullYear()
  const quarterStart = new Date(year, (quarter - 1) * 3, 1)
  const quarterEnd = new Date(year, quarter * 3, 0) // last day of quarter

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    name: `Q${quarter} ${year} Review`,
    startDate: formatDate(quarterStart),
    endDate: formatDate(quarterEnd),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // (#193) Reject reversed date ranges client-side.
    if (formData.endDate < formData.startDate) {
      setError('End date must be on or after the start date.')
      return
    }

    startTransition(async () => {
      try {
        const result = await createReviewCycle(tenantSlug, {
          ...formData,
          name: formData.name.trim(),
        })
        if (!result.ok) {
          setError(result.error)
          return
        }
        router.push(`/t/${tenantSlug}/performance/reviews/${result.data.id}`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create review cycle')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection className="max-w-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="cycle-name">Cycle Name</Label>
            <Input
              id="cycle-name"
              placeholder="e.g. Q1 2026 Review, Annual Review 2026"
              value={formData.name}
              onChange={(e) =>
                setFormData((d) => ({ ...d, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                min="2000-01-01"
                max="2100-12-31"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, startDate: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                min={formData.startDate || '2000-01-01'}
                max="2100-12-31"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, endDate: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              A review record will be automatically created for every active employee, with their line manager assigned as reviewer.
            </p>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create review cycle'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/t/${tenantSlug}/performance/reviews`)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardSection>
    </form>
  )
}

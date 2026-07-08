'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CardSection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createRota } from '../actions'

interface CreateRotaFormProps {
  tenantSlug: string
}

export function CreateRotaForm({ tenantSlug }: CreateRotaFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Default: start = next Monday, end = following Sunday
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
  const nextMonday = new Date(today)
  nextMonday.setDate(today.getDate() + daysUntilMonday)
  const followingSunday = new Date(nextMonday)
  followingSunday.setDate(nextMonday.getDate() + 6)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    name: '',
    startDate: formatDate(nextMonday),
    endDate: formatDate(followingSunday),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // (#193) Reject reversed date ranges before submitting.
    if (formData.endDate < formData.startDate) {
      setError('End date must be on or after the start date.')
      return
    }

    startTransition(async () => {
      const result = await createRota(tenantSlug, {
        ...formData,
        name: formData.name.trim(),
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      router.push(`/t/${tenantSlug}/rotas/${result.data.id}`)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection className="max-w-lg">
        <div className="space-y-4">
          <div>
            <Label htmlFor="rota-name">Rota Name</Label>
            <Input
              id="rota-name"
              placeholder="e.g. Week 12 - March 2026"
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
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create rota'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/t/${tenantSlug}/rotas`)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardSection>
    </form>
  )
}

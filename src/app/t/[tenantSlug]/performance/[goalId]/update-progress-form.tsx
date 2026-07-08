'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FormErrorBanner } from '@/components/shared'
import { updateGoalProgress } from '../actions'

interface UpdateProgressFormProps {
  tenantSlug: string
  goalId: string
  currentProgress: number
}

export function UpdateProgressForm({ tenantSlug, goalId, currentProgress }: UpdateProgressFormProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(currentProgress)
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const result = await updateGoalProgress(tenantSlug, goalId, { progress, note: note || undefined })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setNote('')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* (#161) Use the shared FormErrorBanner so dark mode is handled
          for free — the previous bare red-50/red-700 div was almost
          invisible on a dark background. */}
      <FormErrorBanner message={error} />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="progress">Progress</Label>
          <span className="text-sm font-medium text-muted-foreground">{progress}%</span>
        </div>
        <Input
          id="progress"
          type="range"
          min={0}
          max={100}
          step={5}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="h-2 cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea
          id="note"
          rows={3}
          placeholder="What progress has been made?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={submitting} className="shadow-md shadow-primary/20 font-semibold">
        {submitting ? 'Updating...' : 'Update progress'}
      </Button>
    </form>
  )
}

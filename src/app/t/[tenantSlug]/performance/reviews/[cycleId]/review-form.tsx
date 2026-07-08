'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Star, X } from 'lucide-react'
import { completeReview } from '../actions'

interface ReviewData {
  id: string
  status: string
  overallRating: number | null
  strengths: string | null
  improvements: string | null
  notes: string | null
  employeeName: string
  employeeJobTitle: string | null
  reviewerName: string
}

interface ReviewFormProps {
  review: ReviewData
  tenantSlug: string
  onClose: () => void
}

export function ReviewForm({ review, tenantSlug, onClose }: ReviewFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(review.overallRating || 0)
  const [hoverRating, setHoverRating] = useState(0)
  const [strengths, setStrengths] = useState(review.strengths || '')
  const [improvements, setImprovements] = useState(review.improvements || '')
  const [notes, setNotes] = useState(review.notes || '')

  const isCompleted = review.status === 'completed'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating')
      return
    }
    setError(null)

    startTransition(async () => {
      try {
        const result = await completeReview(tenantSlug, review.id, {
          overallRating: rating,
          strengths: strengths || undefined,
          improvements: improvements || undefined,
          notes: notes || undefined,
        })
        if (!result.ok) {
          setError(result.error)
          return
        }
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit review')
      }
    })
  }

  const ratingLabels = ['', 'Needs Improvement', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Outstanding']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card rounded-xl shadow-xl border w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b">
          <div>
            <h2 className="text-lg font-bold">
              {isCompleted ? 'Review Details' : 'Complete Review'}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {review.employeeName}
              {review.employeeJobTitle && ` \u00B7 ${review.employeeJobTitle}`}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Reviewer: {review.reviewerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Rating */}
          <div className="space-y-2">
            <Label>Overall Rating *</Label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={isCompleted}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5 transition-transform hover:scale-110 disabled:cursor-default"
                  >
                    <Star
                      className={cn(
                        'h-7 w-7 transition-colors',
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      )}
                    />
                  </button>
                ))}
              </div>
              {(hoverRating || rating) > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {ratingLabels[hoverRating || rating]}
                </span>
              )}
            </div>
          </div>

          {/* Strengths */}
          <div className="space-y-2">
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              rows={3}
              placeholder="What has this employee done well?"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              disabled={isCompleted}
            />
          </div>

          {/* Areas for improvement */}
          <div className="space-y-2">
            <Label htmlFor="improvements">Areas for Improvement</Label>
            <Textarea
              id="improvements"
              rows={3}
              placeholder="Where can this employee improve?"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              disabled={isCompleted}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Any other feedback or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isCompleted}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {!isCompleted && (
              <Button
                type="submit"
                disabled={isPending || rating === 0}
                className="shadow-md shadow-primary/20 font-semibold"
              >
                {isPending ? 'Submitting...' : 'Submit review'}
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              {isCompleted ? 'Close' : 'Cancel'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

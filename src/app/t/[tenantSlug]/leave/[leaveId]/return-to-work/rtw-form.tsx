'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { completeReturnToWork } from './actions'

const SUGGESTED_QUESTIONS = [
  'How are you feeling now? Are you fit to return to your normal duties?',
  'Can you tell me about the reason for your absence?',
  'Did you see a GP or receive any medical treatment?',
  'Is there anything at work that contributed to your absence?',
  'Is there anything we can do to support your return, such as a phased return or adjusted duties?',
  'Are there any ongoing health concerns we should be aware of?',
  'Do you have any upcoming medical appointments that may require time off?',
  'Is there anything else you would like to discuss?',
]

interface Props {
  tenantSlug: string
  leaveId: string
}

export function RTWForm({ tenantSlug, leaveId }: Props) {
  const router = useRouter()
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await completeReturnToWork(tenantSlug, leaveId, notes)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Return to work interview completed')
      router.refresh()
    } catch {
      toast.error('Failed to complete return to work interview')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button
        type="button"
        onClick={() => setShowQuestions(!showQuestions)}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <HelpCircle className="h-4 w-4" />
        Suggested interview questions
        {showQuestions ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>

      {showQuestions && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <ol className="space-y-2.5 text-sm text-muted-foreground list-decimal list-inside">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <li key={i} className="leading-relaxed">{q}</li>
            ))}
          </ol>
        </div>
      )}

      <div>
        <label htmlFor="rtw-notes" className="block text-sm font-medium mb-1.5">
          Interview Notes
        </label>
        <Textarea
          id="rtw-notes"
          placeholder="Record the return to work discussion, including any support needed, adjustments, or follow-up actions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
        />
      </div>
      <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
        <CheckCircle2 className="mr-2 h-4 w-4" />
        {loading ? 'Completing...' : 'Mark as Complete'}
      </Button>
    </form>
  )
}

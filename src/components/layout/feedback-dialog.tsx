'use client'

import { useState, useTransition } from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { submitFeedback } from '@/app/t/[tenantSlug]/feedback/actions'

interface FeedbackDialogProps {
  tenantSlug: string
}

export function FeedbackDialog({ tenantSlug }: FeedbackDialogProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('general')
  const [isPending, startTransition] = useTransition()

  const canSubmit = message.trim().length > 0 && !isPending

  function handleSubmit() {
    startTransition(async () => {
      const result = await submitFeedback(tenantSlug, category, message)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Thanks for your feedback!')
      setMessage('')
      setCategory('general')
      setOpen(false)
    })
  }

  function handleOpenChange(newOpen: boolean) {
    setOpen(newOpen)
    if (!newOpen) {
      setMessage('')
      setCategory('general')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <MessageSquare className="h-4 w-4" />
          <span className="sr-only">Send feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            We read every message. Let us know how we can improve Leavely for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="general">General Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <Textarea
              placeholder="Tell us what you think, report a bug, or request a feature..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {isPending ? 'Sending...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link as LinkIcon } from 'lucide-react'
import { updateFitNote } from '../actions'

interface Props {
  tenantSlug: string
  leaveId: string
}

export function FitNoteForm({ tenantSlug, leaveId }: Props) {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    try {
      await updateFitNote(tenantSlug, leaveId, url.trim())
      toast.success('Fit note link saved')
      setUrl('')
      router.refresh()
    } catch {
      toast.error('Failed to save fit note link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="fit-note-url" className="sr-only">
          Fit note link
        </label>
        <Input
          id="fit-note-url"
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !url.trim()} size="sm">
          <LinkIcon className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save link'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground">
        Paste a link to the fit note (Google Drive, Dropbox, OneDrive, or any shareable URL).
      </p>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Trash2 } from 'lucide-react'
import { addEmployeeNote, deleteEmployeeNote } from '../actions'

interface Note {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
}

interface EmployeeNotesProps {
  tenantSlug: string
  employeeId: string
  notes: Note[]
  canAdd: boolean
}

export function EmployeeNotes({ tenantSlug, employeeId, notes, canAdd }: EmployeeNotesProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleAdd() {
    if (!content.trim()) return
    setIsSubmitting(true)
    setError(null)
    try {
      const result = await addEmployeeNote(tenantSlug, employeeId, content)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setContent('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add note')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(noteId: string) {
    try {
      const result = await deleteEmployeeNote(tenantSlug, noteId)
      if (!result.ok) {
        setError(result.error)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete note')
    }
  }

  return (
    <div className="space-y-4">
      {canAdd && (
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? 'Adding...' : 'Add note'}
          </Button>
        </div>
      )}

      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">No notes yet</p>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-3 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                {canAdd && (
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="shrink-0 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {note.authorName} &middot; {new Date(note.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CardSection, EmptyState, ConfirmDialog } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Pencil, Megaphone } from 'lucide-react'
import { createAnnouncement, updateAnnouncement, deleteAnnouncement } from './actions'
import type { Announcement } from '@/generated/prisma/client'

interface Props {
  announcements: Announcement[]
  tenantSlug: string
}

export function AnnouncementsClient({ announcements, tenantSlug }: Props) {
  const router = useRouter()
  const [createOpen, setCreateOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [publishedAt, setPublishedAt] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<string | null>(null)

  function resetForm() {
    setTitle('')
    setContent('')
    setPublishedAt('')
    setExpiresAt('')
  }

  function openEdit(a: Announcement) {
    setEditId(a.id)
    setTitle(a.title)
    setContent(a.content)
    setPublishedAt(a.publishedAt ? new Date(a.publishedAt).toISOString().split('T')[0] : '')
    setExpiresAt(a.expiresAt ? new Date(a.expiresAt).toISOString().split('T')[0] : '')
  }

  // (#201) Actions now return ActionResult — surface result.error to
  // the user instead of swallowing into a generic toast.
  async function handleCreate() {
    if (!title.trim() || !content.trim()) return
    setLoading(true)
    try {
      const result = await createAnnouncement(tenantSlug, {
        title,
        content,
        publishedAt: publishedAt || undefined,
        expiresAt: expiresAt || undefined,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      resetForm()
      setCreateOpen(false)
      router.refresh()
      toast.success('Announcement created')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate() {
    if (!editId || !title.trim() || !content.trim()) return
    setLoading(true)
    try {
      const result = await updateAnnouncement(tenantSlug, editId, {
        title,
        content,
        publishedAt: publishedAt || undefined,
        expiresAt: expiresAt || undefined,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      resetForm()
      setEditId(null)
      router.refresh()
      toast.success('Announcement updated')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteAnnouncement(tenantSlug, id)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    router.refresh()
  }

  const now = new Date()

  function getStatus(a: Announcement) {
    if (!a.publishedAt || new Date(a.publishedAt) > now) return 'draft'
    if (a.expiresAt && new Date(a.expiresAt) < now) return 'expired'
    return 'active'
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-muted-foreground">
          Manage company-wide announcements shown on the dashboard.
        </p>
        {/*
          (#188) Reset the shared form state when the create dialog opens
          so a leftover edit state can't bleed across into the new draft.
          This is a single source of state shared by both dialogs; the
          alternative (separate state per dialog) would balloon the file.
        */}
        <Dialog
          open={createOpen}
          onOpenChange={(open) => {
            setCreateOpen(open)
            if (open) {
              setEditId(null)
              resetForm()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea maxLength={5000} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Announcement content" rows={4} />
                <p className="text-xs text-muted-foreground">{content.length}/5000</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Publish date</Label>
                  <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Expires (optional)</Label>
                  <Input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleCreate} disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Create announcement'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editId} onOpenChange={(open) => { if (!open) { setEditId(null); resetForm() } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea maxLength={5000} value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
              <p className="text-xs text-muted-foreground">{content.length}/5000</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Publish date</Label>
                <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Expires (optional)</Label>
                <Input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
              </div>
            </div>
            <Button onClick={handleUpdate} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {announcements.length === 0 ? (
        <EmptyState
          icon={<Megaphone className="h-10 w-10" />}
          title="No announcements"
          description="Create your first announcement to share news with your team."
        />
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => {
            const status = getStatus(a)
            return (
              <CardSection key={a.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{a.title}</p>
                      {status === 'draft' && (
                        <Badge variant="secondary" className="text-xs">Draft</Badge>
                      )}
                      {status === 'expired' && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">Expired</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{a.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {a.publishedAt ? `Published: ${new Date(a.publishedAt).toLocaleDateString('en-GB')}` : 'Not published'}
                      {a.expiresAt && ` \u00b7 Expires: ${new Date(a.expiresAt).toLocaleDateString('en-GB')}`}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(a)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteAnnouncementId(a.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardSection>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteAnnouncementId}
        onOpenChange={(open) => !open && setDeleteAnnouncementId(null)}
        title="Delete this announcement?"
        description="This action cannot be undone."
        onConfirm={() => { handleDelete(deleteAnnouncementId!); setDeleteAnnouncementId(null) }}
      />
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { uploadDocument } from './actions'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  tenantSlug: string
}

// (#185) Front-end validation mirrors the new server schema. The R2
// upload backend isn't wired in yet, so this dialog only saves metadata
// — but a 50MB .exe with HTML in the category used to land in Postgres
// without anyone noticing.
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPT_ATTR = 'image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt'

export function UploadDialog({ open, onOpenChange, tenantSlug }: Props) {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)

  function pickFile(f: File | null) {
    if (!f) return setFile(null)
    if (f.size > MAX_FILE_SIZE) {
      toast.error('File must be 10MB or smaller')
      return
    }
    setFile(f)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) pickFile(dropped)
  }, [])

  async function handleUpload() {
    if (!file) return
    setLoading(true)
    try {
      const result = await uploadDocument(tenantSlug, {
        name: file.name,
        category: category || 'Uncategorized',
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setFile(null)
      setCategory('')
      onOpenChange(false)
      router.refresh()
      toast.success('Document uploaded')
    } catch {
      toast.error('Failed to upload document')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            {file ? (
              <p className="text-sm font-medium">{file.name}</p>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop a file here, or
                </p>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    accept={ACCEPT_ATTR}
                    onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                  />
                  <Button variant="outline" size="sm" asChild>
                    <span>Browse files</span>
                  </Button>
                </label>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={category}
              maxLength={60}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Contracts, Policies, Onboarding"
            />
          </div>

          <Button onClick={handleUpload} disabled={!file || loading} className="w-full">
            {loading ? 'Uploading\u2026' : 'Upload'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Paperclip, ExternalLink, Eye } from 'lucide-react'

interface Props {
  expenseId: string
  filename: string
  mimeType: string
}

export function ReceiptViewer({ expenseId, filename, mimeType }: Props) {
  const [open, setOpen] = useState(false)
  const receiptUrl = `/api/expenses/${expenseId}/receipt`
  const isImage = mimeType.startsWith('image/')
  const isPdf = mimeType === 'application/pdf'

  if (isPdf) {
    return (
      <a
        href={receiptUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:underline"
      >
        <Paperclip className="h-3 w-3" />
        {filename}
        <ExternalLink className="h-3 w-3" />
      </a>
    )
  }

  if (isImage) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          <Eye className="h-3 w-3" />
          {filename}
        </button>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Receipt</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={receiptUrl}
                alt="Receipt"
                className="max-h-[70vh] rounded-lg object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Fallback for other types
  return (
    <a
      href={receiptUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary hover:underline"
    >
      <Paperclip className="h-3 w-3" />
      {filename}
      <ExternalLink className="h-3 w-3" />
    </a>
  )
}

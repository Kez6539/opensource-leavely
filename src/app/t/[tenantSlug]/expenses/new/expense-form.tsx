'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardSection, FormErrorBanner } from '@/components/shared'
import { createExpenseClaim } from '../actions'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// (#181) Amount used to accept '£1,234.56' literally — parseFloat saw
// the leading non-digit and returned 1. Now: strip currency / comma
// noise on input and refine to a positive number ≤ £1,000,000.
const schema = z.object({
  description: z.string().trim().min(1, 'Description is required').max(500),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => {
      const cleaned = v.replace(/[£,\s]/g, '')
      const n = Number(cleaned)
      return Number.isFinite(n) && n > 0 && n <= 1_000_000
    }, 'Enter an amount between £0.01 and £1,000,000'),
  category: z.enum(['TRAVEL', 'MEALS', 'EQUIPMENT', 'ACCOMMODATION', 'TRAINING', 'OTHER'], {
    message: 'Select a category',
  }),
  date: z.string().min(1, 'Date is required'),
  receiptUrl: z.string().trim().max(2000).optional(),
  notes: z.string().trim().max(1000).optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  tenantSlug: string
}

export function ExpenseForm({ tenantSlug }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [receiptMode, setReceiptMode] = useState<'upload' | 'url'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      amount: '',
      category: undefined,
      date: new Date().toISOString().split('T')[0],
      receiptUrl: '',
      notes: '',
    },
  })

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null)
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File must be under 5MB')
      e.target.value = ''
      return
    }

    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
    if (!allowed.includes(file.type)) {
      setFileError('Only images (JPEG, PNG, GIF, WebP) and PDFs are accepted')
      e.target.value = ''
      return
    }

    setSelectedFile(file)

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => setFilePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  function clearFile() {
    setSelectedFile(null)
    setFilePreview(null)
    setFileError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Strip the data:...;base64, prefix
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function onSubmit(data: FormValues) {
    setError(null)
    let receiptData: string | undefined
    let receiptFilename: string | undefined
    let receiptMimeType: string | undefined

    if (receiptMode === 'upload' && selectedFile) {
      receiptData = await fileToBase64(selectedFile)
      receiptFilename = selectedFile.name
      receiptMimeType = selectedFile.type
    }

    const result = await createExpenseClaim(tenantSlug, {
      description: data.description,
      amount: data.amount,
      category: data.category,
      date: data.date,
      receiptUrl: receiptMode === 'url' ? data.receiptUrl : undefined,
      receiptData,
      receiptFilename,
      receiptMimeType,
      notes: data.notes,
    })
    if (!result.ok) {
      setError(result.error)
      return
    }
    router.push(`/t/${tenantSlug}/expenses`)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <FormErrorBanner message={error} />

      <CardSection title="Expense Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label>Description *</Label>
            <Input
              placeholder="e.g. Train ticket to London for client meeting"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Amount (GBP) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                &pound;
              </span>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-7"
                {...register('amount')}
              />
            </div>
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Category *</Label>
            <Select onValueChange={(v) => setValue('category', v as FormValues['category'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TRAVEL">Travel</SelectItem>
                <SelectItem value="MEALS">Meals</SelectItem>
                <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                <SelectItem value="ACCOMMODATION">Accommodation</SelectItem>
                <SelectItem value="TRAINING">Training</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Date of expense *</Label>
            {/* (#182) Bound to a sane range — past expenses up to 2 years
                back, no future-dated claims. */}
            <Input
              type="date"
              min={(() => { const d = new Date(); d.setFullYear(d.getFullYear() - 2); return d.toISOString().split('T')[0] })()}
              max={new Date().toISOString().split('T')[0]}
              {...register('date')}
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Receipt section */}
          <div className="space-y-3 sm:col-span-2">
            <div className="flex items-center justify-between">
              <Label>Receipt (optional)</Label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => { setReceiptMode('upload'); clearFile() }}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    receiptMode === 'upload'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Upload file
                </button>
                <button
                  type="button"
                  onClick={() => { setReceiptMode('url'); clearFile() }}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    receiptMode === 'url'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  Enter URL
                </button>
              </div>
            </div>

            {receiptMode === 'upload' ? (
              <div>
                {!selectedFile ? (
                  <label
                    htmlFor="receipt-upload"
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload receipt
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Images or PDF, max 5MB
                    </span>
                    <input
                      ref={fileInputRef}
                      id="receipt-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
                      className="sr-only"
                      onChange={handleFileSelect}
                    />
                  </label>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border bg-accent/30 p-3">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Receipt preview"
                        className="h-16 w-16 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted border">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {fileError && <p className="text-sm text-red-500 mt-1">{fileError}</p>}
              </div>
            ) : (
              <Input
                type="url"
                placeholder="https://..."
                {...register('receiptUrl')}
              />
            )}
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Notes (optional)</Label>
            <Textarea
              placeholder="Any additional details about this expense..."
              rows={3}
              {...register('notes')}
            />
          </div>
        </div>
      </CardSection>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="shadow-md shadow-primary/20 font-semibold">
          {isSubmitting ? 'Submitting...' : 'Submit expense claim'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

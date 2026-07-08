'use client'

import { useState } from 'react'
import { CardSection } from '@/components/shared/card-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileText, Search, Upload, FolderPlus, Eye, EyeOff, Download, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface DocumentItem {
  id: string
  name: string
  category: string | null
  mimeType: string | null
  size: number | null
  createdAt: string
}

interface DocumentsTabProps {
  tenantSlug: string
  employeeId: string
  employeeName: string
  documents: DocumentItem[]
  canManage: boolean
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return '\u2014'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDateGB(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getFileIcon(mimeType: string | null) {
  if (!mimeType) return <FileText className="h-5 w-5 text-gray-400" />
  if (mimeType.includes('pdf')) return <FileText className="h-5 w-5 text-red-400" />
  if (mimeType.includes('image')) return <FileText className="h-5 w-5 text-blue-400" />
  if (mimeType.includes('word') || mimeType.includes('document')) return <FileText className="h-5 w-5 text-blue-600" />
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return <FileText className="h-5 w-5 text-emerald-600" />
  return <FileText className="h-5 w-5 text-gray-400" />
}

export function DocumentsTab({
  tenantSlug,
  employeeId,
  employeeName,
  documents,
  canManage,
}: DocumentsTabProps) {
  const [search, setSearch] = useState('')
  const [visibleDocs, setVisibleDocs] = useState<Set<string>>(new Set())

  const filtered = search
    ? documents.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    : documents

  function toggleVisibility(docId: string) {
    setVisibleDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href={`/t/${tenantSlug}/documents`} className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-3.5 w-3.5" />
          Documents
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{employeeName}</span>
      </div>

      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Link href={`/t/${tenantSlug}/documents`}>
              <Button size="sm" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </Link>
            <Button size="sm" variant="outline" disabled>
              <FolderPlus className="mr-2 h-4 w-4" />
              New folder
            </Button>
          </div>
        )}
      </div>

      {/* Documents table */}
      <CardSection>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-400 shadow-sm">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold">No documents</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {search
                ? 'No documents match your search. Try a different term.'
                : 'No documents have been uploaded for this employee yet.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Size</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Added</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className="border-b last:border-0 hover:bg-accent/50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.mimeType)}
                        <span className="font-medium truncate max-w-[200px]">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{doc.category || '\u2014'}</td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell">{formatFileSize(doc.size)}</td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell">{formatDateGB(doc.createdAt)}</td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => toggleVisibility(doc.id)}
                          aria-label={visibleDocs.has(doc.id) ? 'Hide from employee' : 'Show to employee'}
                          title={visibleDocs.has(doc.id) ? 'Hide from employee' : 'Show to employee'}
                        >
                          {visibleDocs.has(doc.id) ? <Eye className="h-3 w-3 text-emerald-600" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                        <Link href={`/api/documents/${doc.id}/download`} aria-label={`Download ${doc.name}`}>
                          <Button variant="ghost" size="icon-xs" aria-label={`Download ${doc.name}`}>
                            <Download className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardSection>
    </div>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, FilterX } from 'lucide-react'
import { toast } from 'sonner'
import { exportAuditLogsCsv } from './actions'

interface Props {
  tenantSlug: string
  actionOptions: string[]
  entityOptions: string[]
  current: { action?: string; entity?: string; from?: string; to?: string }
}

export function AuditLogFilters({ tenantSlug, actionOptions, entityOptions, current }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [exporting, setExporting] = useState(false)

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    next.delete('page')
    startTransition(() => {
      router.push(`${pathname}?${next.toString()}`)
    })
  }

  function clearAll() {
    startTransition(() => {
      router.push(pathname)
    })
  }

  async function handleExport() {
    setExporting(true)
    try {
      const csv = await exportAuditLogsCsv(tenantSlug, current)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('CSV downloaded')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Export failed')
    } finally {
      setExporting(false)
    }
  }

  const hasFilter = !!(current.action || current.entity || current.from || current.to)

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Label htmlFor="filter-action" className="text-xs">Action</Label>
          <select
            id="filter-action"
            value={current.action ?? ''}
            onChange={(e) => setParam('action', e.target.value)}
            disabled={isPending}
            className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            <option value="">All actions</option>
            {actionOptions.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="filter-entity" className="text-xs">Entity</Label>
          <select
            id="filter-entity"
            value={current.entity ?? ''}
            onChange={(e) => setParam('entity', e.target.value)}
            disabled={isPending}
            className="mt-1 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm"
          >
            <option value="">All entities</option>
            {entityOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="filter-from" className="text-xs">From</Label>
          <Input
            id="filter-from"
            type="date"
            value={current.from ?? ''}
            onChange={(e) => setParam('from', e.target.value)}
            disabled={isPending}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="filter-to" className="text-xs">To</Label>
          <Input
            id="filter-to"
            type="date"
            value={current.to ?? ''}
            onChange={(e) => setParam('to', e.target.value)}
            disabled={isPending}
            className="mt-1"
          />
        </div>

        <div className="flex items-end gap-2">
          {hasFilter && (
            <Button variant="ghost" size="sm" onClick={clearAll} disabled={isPending}>
              <FilterX className="mr-1.5 h-3.5 w-3.5" />
              Clear
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleExport} disabled={exporting}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            {exporting ? 'Exporting…' : 'CSV'}
          </Button>
        </div>
      </div>
    </div>
  )
}

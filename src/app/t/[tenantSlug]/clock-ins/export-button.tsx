'use client'

import { useState, useTransition } from 'react'
import { exportClockReport } from './actions'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface ExportButtonProps {
  tenantSlug: string
  startDate: string
  endDate: string
}

export function ExportButton({ tenantSlug, startDate, endDate }: ExportButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleExport = () => {
    startTransition(async () => {
      try {
        const csv = await exportClockReport(tenantSlug, startDate, endDate)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `clock-report-${startDate}-to-${endDate}.csv`
        link.click()
        URL.revokeObjectURL(url)
      } catch {
        // silently fail
      }
    })
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} disabled={isPending}>
      <Download className="mr-2 h-4 w-4" />
      {isPending ? 'Exporting...' : 'Export CSV'}
    </Button>
  )
}

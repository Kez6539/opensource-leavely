'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { getLeaveRequestsForExport } from './actions'

function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function ExportLeaveButton({ tenantSlug }: { tenantSlug: string }) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const data = await getLeaveRequestsForExport(tenantSlug)
      const headers = ['Employee', 'Policy', 'Start Date', 'End Date', 'Status', 'Reason']
      const rows = data.map(r => [r.employee, r.policy, r.startDate, r.endDate, r.status, r.reason])
      downloadCsv(`leave-requests-${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
      Export CSV
    </Button>
  )
}

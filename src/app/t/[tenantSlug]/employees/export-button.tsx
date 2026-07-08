'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { getEmployeesForExport } from './actions'

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

export function ExportEmployeesButton({ tenantSlug }: { tenantSlug: string }) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const data = await getEmployeesForExport(tenantSlug)
      const headers = ['First Name', 'Last Name', 'Email', 'Job Title', 'Department', 'Status', 'Start Date', 'Phone']
      const rows = data.map(e => [e.firstName, e.lastName, e.email, e.jobTitle, e.department, e.status, e.startDate, e.phone])
      downloadCsv(`employees-${new Date().toISOString().split('T')[0]}.csv`, headers, rows)
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

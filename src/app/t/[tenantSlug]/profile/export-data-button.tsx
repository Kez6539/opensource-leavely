'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { exportMyData } from './actions'
import { toast } from 'sonner'

export function ExportDataButton({ tenantSlug }: { tenantSlug: string }) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const data = await exportMyData(tenantSlug)
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `my-data-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Failed to export data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleExport} disabled={loading}>
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
      Download my data
    </Button>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarPlus } from 'lucide-react'
import { extendLeaveRequest } from '../../actions'

interface Props {
  tenantSlug: string
  leaveId: string
  currentEndDate: string
}

export function ExtendLeaveForm({ tenantSlug, leaveId, currentEndDate }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newEndDate, setNewEndDate] = useState('')

  const minDate = new Date(new Date(currentEndDate).getTime() + 86400000)
    .toISOString()
    .split('T')[0]

  async function handleExtend() {
    if (!newEndDate) return
    setLoading(true)
    const result = await extendLeaveRequest(tenantSlug, leaveId, newEndDate)
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave extended successfully')
    setNewEndDate('')
    router.refresh()
  }

  return (
    <div className="flex items-end gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="extendEndDate">New end date</Label>
        <Input
          id="extendEndDate"
          type="date"
          value={newEndDate}
          onChange={(e) => setNewEndDate(e.target.value)}
          min={minDate}
        />
      </div>
      <Button
        onClick={handleExtend}
        disabled={loading || !newEndDate}
        className="bg-green-600 hover:bg-green-700"
      >
        <CalendarPlus className="mr-2 h-4 w-4" />
        {loading ? 'Extending\u2026' : 'Extend'}
      </Button>
    </div>
  )
}

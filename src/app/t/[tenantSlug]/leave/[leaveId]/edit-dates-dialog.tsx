'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { editLeaveRequestDates } from '../actions'

interface Props {
  tenantSlug: string
  leaveId: string
  currentStartDate: string // ISO string
  currentEndDate: string // ISO string
}

export function EditDatesDialog({ tenantSlug, leaveId, currentStartDate, currentEndDate }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState(currentStartDate.split('T')[0])
  const [endDate, setEndDate] = useState(currentEndDate.split('T')[0])
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    const result = await editLeaveRequestDates(tenantSlug, leaveId, startDate, endDate)
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave dates updated')
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-3.5 w-3.5" />
          Edit dates
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit leave dates</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Start date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>End date</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlarmClock } from 'lucide-react'
import { recordLateness } from '../leave/lateness-actions'

interface Props {
  tenantSlug: string
  employees: { id: string; firstName: string; lastName: string }[]
}

const DURATION_OPTIONS = [
  '5 minutes',
  '10 minutes',
  '15 minutes',
  '20 minutes',
  '30 minutes',
  '45 minutes',
  '1 hour',
  '1.5 hours',
  '2 hours',
  '2+ hours',
]

export function RecordLatenessDialog({ tenantSlug, employees }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [employeeId, setEmployeeId] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [duration, setDuration] = useState('')
  const [reason, setReason] = useState('')

  async function handleSubmit() {
    if (!employeeId || !date || !duration) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      await recordLateness(tenantSlug, { employeeId, date, duration, reason })
      toast.success('Lateness recorded')
      setOpen(false)
      setEmployeeId('')
      setDate(new Date().toISOString().split('T')[0])
      setDuration('')
      setReason('')
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to record lateness')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <AlarmClock className="h-5 w-5 text-orange-600 mb-2" />
          <p className="text-sm font-medium">Record lateness</p>
          <p className="text-xs text-muted-foreground">Log an occurrence</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Lateness</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Employee *</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.firstName} {e.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date *</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Duration *</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="How late?" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Traffic, overslept"
            />
          </div>

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? 'Recording...' : 'Record lateness'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

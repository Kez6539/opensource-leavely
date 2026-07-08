'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConversionPrompt, conversionPromptStorageKey } from '@/components/shared/conversion-prompt'
import { Check, X, Ban, CalendarPlus } from 'lucide-react'
import { approveLeaveRequest, rejectLeaveRequest, cancelLeaveRequest, extendLeaveRequest } from '../actions'

interface Props {
  tenantSlug: string
  leaveId: string
  showApproveReject?: boolean
  showCancel?: boolean
  showExtend?: boolean
  currentEndDate?: string
  conversionPromptEnabled?: boolean
}

export function LeaveActions({
  tenantSlug,
  leaveId,
  showApproveReject = true,
  showCancel = false,
  showExtend = false,
  currentEndDate,
  conversionPromptEnabled = false,
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [extendOpen, setExtendOpen] = useState(false)
  const [newEndDate, setNewEndDate] = useState('')
  const [approvalPromptSignal, setApprovalPromptSignal] = useState(0)

  async function handleApprove() {
    setLoading('approve')
    const result = await approveLeaveRequest(tenantSlug, leaveId)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave request approved')
    if (conversionPromptEnabled) {
      try {
        const promptKey = conversionPromptStorageKey(tenantSlug, 'first-approval')
        if (!window.localStorage.getItem(promptKey)) {
          setApprovalPromptSignal((value) => value + 1)
          return
        }
      } catch {
        setApprovalPromptSignal((value) => value + 1)
        return
      }
    }
    router.refresh()
  }

  async function handleReject() {
    setLoading('reject')
    const result = await rejectLeaveRequest(tenantSlug, leaveId, declineReason.trim() || undefined)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave request rejected')
    setRejectOpen(false)
    setDeclineReason('')
    router.refresh()
  }

  async function handleCancel() {
    setLoading('cancel')
    const result = await cancelLeaveRequest(tenantSlug, leaveId)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave request cancelled')
    router.refresh()
  }

  async function handleExtend() {
    if (!newEndDate) return
    setLoading('extend')
    const result = await extendLeaveRequest(tenantSlug, leaveId, newEndDate)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Leave extended successfully')
    setExtendOpen(false)
    setNewEndDate('')
    router.refresh()
  }

  return (
    <>
      <div className="flex gap-3">
        {showApproveReject && (
          <>
            <Button
              onClick={handleApprove}
              disabled={loading !== null}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              {loading === 'approve' ? 'Approving\u2026' : 'Approve'}
            </Button>
            <Button
              variant="destructive"
              onClick={() => setRejectOpen(true)}
              disabled={loading !== null}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </>
        )}
        {showExtend && (
          <Button variant="outline" onClick={() => setExtendOpen(true)} disabled={loading !== null}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Extend
          </Button>
        )}
        {showCancel && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={loading !== null}>
                <Ban className="mr-2 h-4 w-4" />
                {loading === 'cancel' ? 'Cancelling\u2026' : 'Cancel Request'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel leave request?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will cancel the leave request and restore the balance. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep request</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel}>
                  Yes, cancel it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>
              Provide a reason for declining this request. This will be shared with the employee.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for declining (optional)"
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)} disabled={loading === 'reject'}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={loading === 'reject'}>
              <X className="mr-2 h-4 w-4" />
              {loading === 'reject' ? 'Rejecting\u2026' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={extendOpen} onOpenChange={setExtendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Extend Leave</DialogTitle>
            <DialogDescription>
              Select a new end date to extend this absence. The balance will be adjusted automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="newEndDate">New end date</Label>
            <Input
              id="newEndDate"
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              min={currentEndDate ? (() => { const d = currentEndDate.split('T')[0].split('-'); const next = new Date(Date.UTC(+d[0], +d[1] - 1, +d[2] + 1)); return next.toISOString().split('T')[0]; })() : undefined}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExtendOpen(false)} disabled={loading === 'extend'}>
              Cancel
            </Button>
            <Button onClick={handleExtend} disabled={loading === 'extend' || !newEndDate} className="bg-green-600 hover:bg-green-700">
              <CalendarPlus className="mr-2 h-4 w-4" />
              {loading === 'extend' ? 'Extending\u2026' : 'Confirm Extension'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConversionPrompt
        tenantSlug={tenantSlug}
        moment="first-approval"
        enabled={conversionPromptEnabled}
        openSignal={approvalPromptSignal}
        onClose={() => router.refresh()}
      />
    </>
  )
}

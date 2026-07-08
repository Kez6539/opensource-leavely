'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { Check, X, Banknote, Trash2 } from 'lucide-react'
import { approveExpenseClaim, rejectExpenseClaim, markExpensePaid, deleteExpenseClaim } from './actions'
import { toast } from 'sonner'

interface Props {
  tenantSlug: string
  expenseId: string
  status: string
  showApproveReject?: boolean
  showMarkPaid?: boolean
  showDelete?: boolean
}

export function ExpenseActions({
  tenantSlug,
  expenseId,
  status,
  showApproveReject = false,
  showMarkPaid = false,
  showDelete = false,
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  async function handleApprove() {
    setLoading('approve')
    const result = await approveExpenseClaim(tenantSlug, expenseId)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Expense claim approved')
    router.refresh()
  }

  async function handleReject() {
    setLoading('reject')
    const result = await rejectExpenseClaim(tenantSlug, expenseId, rejectReason.trim() || undefined)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Expense claim rejected')
    setRejectOpen(false)
    setRejectReason('')
    router.refresh()
  }

  async function handleMarkPaid() {
    setLoading('paid')
    const result = await markExpensePaid(tenantSlug, expenseId)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Expense marked as paid')
    router.refresh()
  }

  async function handleDelete() {
    setLoading('delete')
    const result = await deleteExpenseClaim(tenantSlug, expenseId)
    setLoading(null)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success('Expense claim deleted')
    router.push(`/t/${tenantSlug}/expenses`)
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {showApproveReject && status === 'PENDING' && (
          <>
            <Button
              onClick={handleApprove}
              disabled={loading !== null}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" />
              {loading === 'approve' ? 'Approving...' : 'Approve'}
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
        {showMarkPaid && status === 'APPROVED' && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={loading !== null} className="bg-blue-600 hover:bg-blue-700">
                <Banknote className="mr-2 h-4 w-4" />
                {loading === 'paid' ? 'Processing...' : 'Mark as Paid'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark expense as paid?</AlertDialogTitle>
                <AlertDialogDescription>
                  This confirms the expense has been reimbursed to the employee.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleMarkPaid}>
                  Yes, mark as paid
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {showDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={loading !== null}>
                <Trash2 className="mr-2 h-4 w-4" />
                {loading === 'delete' ? 'Deleting...' : 'Delete'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete expense claim?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete this expense claim. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Yes, delete it
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Expense Claim</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this claim. This will be visible to the employee.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection (optional)"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={3}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)} disabled={loading === 'reject'}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={loading === 'reject'}>
              <X className="mr-2 h-4 w-4" />
              {loading === 'reject' ? 'Rejecting...' : 'Confirm Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

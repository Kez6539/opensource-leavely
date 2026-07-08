'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { approveToilAccrual, rejectToilAccrual } from './actions'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
  tenantSlug: string
  accrualId: string
}

export function ToilApproveButton({ tenantSlug, accrualId }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleApprove() {
    setLoading(true)
    try {
      const result = await approveToilAccrual(tenantSlug, accrualId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('TOIL accrual approved')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to approve')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="sm" variant="ghost" disabled={loading} onClick={handleApprove} title="Approve">
      <Check className="h-4 w-4 text-emerald-600" />
    </Button>
  )
}

export function ToilRejectButton({ tenantSlug, accrualId }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleReject() {
    setLoading(true)
    try {
      const result = await rejectToilAccrual(tenantSlug, accrualId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('TOIL accrual rejected')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to reject')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button size="sm" variant="ghost" disabled={loading} onClick={handleReject} title="Reject">
      <X className="h-4 w-4 text-red-600" />
    </Button>
  )
}

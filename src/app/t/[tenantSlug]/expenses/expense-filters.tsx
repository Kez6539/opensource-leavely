'use client'

import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  currentStatus?: string
  currentView?: string
  tenantSlug: string
  canApprove: boolean
}

export function ExpenseFilters({ currentStatus, currentView, tenantSlug, canApprove }: Props) {
  const router = useRouter()

  function buildUrl(params: { status?: string; view?: string }) {
    const sp = new URLSearchParams()
    const status = params.status ?? currentStatus
    const view = params.view ?? currentView
    if (status && status !== 'ALL') sp.set('status', status)
    if (view && view !== 'my') sp.set('view', view)
    const qs = sp.toString()
    return `/t/${tenantSlug}/expenses${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex gap-3 mb-6">
      {canApprove && (
        <Select
          defaultValue={currentView ?? 'my'}
          onValueChange={(v) => router.push(buildUrl({ view: v }))}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="my">My expenses</SelectItem>
            <SelectItem value="all">All expenses</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Select
        defaultValue={currentStatus ?? 'ALL'}
        onValueChange={(v) => router.push(buildUrl({ status: v }))}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="APPROVED">Approved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

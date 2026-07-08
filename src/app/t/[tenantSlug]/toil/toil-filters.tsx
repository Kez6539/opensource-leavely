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
  tenantSlug: string
}

export function ToilFilters({ currentStatus, tenantSlug }: Props) {
  const router = useRouter()

  return (
    <div className="flex gap-3 mb-6">
      <Select
        defaultValue={currentStatus ?? 'ALL'}
        onValueChange={(v) => {
          const params = v === 'ALL' ? '' : `?status=${v}`
          router.push(`/t/${tenantSlug}/toil${params}`)
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="APPROVED">Approved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

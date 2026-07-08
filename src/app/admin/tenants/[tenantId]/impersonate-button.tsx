'use client'

import { Button } from '@/components/ui/button'
import { UserCheck } from 'lucide-react'
import { impersonateOwner } from '../../actions'

export function ImpersonateButton({ tenantId }: { tenantId: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-2"
      onClick={() => impersonateOwner(tenantId)}
    >
      <UserCheck className="h-4 w-4" />
      Impersonate Owner
    </Button>
  )
}

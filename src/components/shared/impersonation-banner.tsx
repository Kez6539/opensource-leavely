'use client'

import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export function ImpersonationBanner({ tenantName }: { tenantName: string }) {
  async function endImpersonation() {
    const { endImpersonationAction } = await import('@/app/admin/actions')
    await endImpersonationAction()
  }

  return (
    <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
      <Shield className="h-4 w-4 text-rose-600" />
      <span className="text-rose-800 font-medium">
        Impersonating {tenantName}
      </span>
      <Button
        variant="outline"
        size="sm"
        className="h-6 text-xs border-rose-300 text-rose-700 hover:bg-rose-100"
        onClick={endImpersonation}
      >
        End
      </Button>
    </div>
  )
}

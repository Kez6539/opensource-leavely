'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { deleteTenantAction } from '../../actions'

export function DeleteTenantButton({
  tenantId,
  tenantSlug,
  tenantName,
  memberCount,
}: {
  tenantId: string
  tenantSlug: string
  tenantName: string
  memberCount: number
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteTenantAction(tenantId, confirmText.trim())
      if ('error' in res) {
        toast.error(res.error)
        return
      }
      toast.success(`"${tenantName}" deleted`)
      router.push(res.redirect)
    })
  }

  const matches = confirmText.trim() === tenantSlug

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setConfirmText('') }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete tenant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete &ldquo;{tenantName}&rdquo;?
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <span className="block">
              This permanently removes the tenant and everything tied to it:
              employees, leave history, balances, policies, billing record, audit logs.
            </span>
            <span className="block">
              {memberCount} member account{memberCount === 1 ? '' : 's'} will be deleted
              if they don&rsquo;t belong to any other tenant — freeing those email addresses
              for fresh signups.
            </span>
            <span className="block font-semibold text-red-600 dark:text-red-400">
              This cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 pt-2">
          <Label htmlFor="confirm-slug">
            Type <span className="font-mono font-bold">{tenantSlug}</span> to confirm
          </Label>
          <Input
            id="confirm-slug"
            autoFocus
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={tenantSlug}
            className="font-mono"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!matches || isPending}
          >
            {isPending ? 'Deleting…' : 'Delete tenant'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

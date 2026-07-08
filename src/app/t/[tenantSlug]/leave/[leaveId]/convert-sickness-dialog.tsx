'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeftRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { convertSicknessToLeave } from '../actions'

interface Policy {
  id: string
  name: string
  unit: string
}

interface Props {
  tenantSlug: string
  leaveId: string
  employeeName: string
  policies: Policy[]
}

/**
 * Manager-only "convert sickness to leave" dialog. Shown on the leave
 * detail page for approved sickness records. The real-world workflow:
 * employees who go off sick drop to SSP and lose pay. Some employers let
 * staff convert short sick episodes to annual leave so they stay on full
 * pay. The action handles the balance bookkeeping atomically.
 */
export function ConvertSicknessDialog({ tenantSlug, leaveId, employeeName, policies }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [policyId, setPolicyId] = useState(policies[0]?.id ?? '')
  const [loading, setLoading] = useState(false)

  async function handleConvert() {
    if (!policyId) return
    setLoading(true)
    const result = await convertSicknessToLeave(tenantSlug, leaveId, { targetPolicyId: policyId })
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    toast.success(`Sickness converted to ${policies.find((p) => p.id === policyId)?.name ?? 'leave'}`)
    setOpen(false)
    router.refresh()
  }

  if (policies.length === 0) {
    // No non-system policies exist on this tenant — there's nothing to
    // convert into. Render nothing rather than a disabled button so the
    // affordance doesn't confuse managers.
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Convert to leave
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert sickness to annual leave</DialogTitle>
          <DialogDescription>
            Reassign this sickness record for {employeeName} to a paid leave policy.
            The sickness balance is refunded and the chosen policy is debited
            for the same days. Use this when you want to keep the employee on
            full pay rather than dropping them to SSP.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 pt-2">
          <Label htmlFor="convertPolicy">Convert to</Label>
          <select
            id="convertPolicy"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {policies.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.unit})
              </option>
            ))}
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConvert} disabled={loading || !policyId}>
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            {loading ? 'Converting…' : 'Confirm conversion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

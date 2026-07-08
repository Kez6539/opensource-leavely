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
import { CardSection, EmptyState, ConfirmDialog } from '@/components/shared'
import { Plus, Trash2, Users } from 'lucide-react'
import { createDelegation, deleteDelegation } from './actions'

interface Delegation {
  id: string
  managerId: string
  managerName: string
  delegateId: string
  delegateName: string
  startDate: string
  endDate: string
  isActive: boolean
}

interface DelegateOption {
  id: string
  name: string
}

interface Props {
  delegations: Delegation[]
  delegateOptions: DelegateOption[]
  tenantSlug: string
  isAdmin: boolean
}

function formatDateGB(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function DelegationClient({ delegations, delegateOptions, tenantSlug, isAdmin }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [delegateId, setDelegateId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleCreate() {
    if (!delegateId || !startDate || !endDate) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    const result = await createDelegation(tenantSlug, { delegateId, startDate, endDate })
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    setDelegateId('')
    setStartDate('')
    setEndDate('')
    setOpen(false)
    router.refresh()
    toast.success('Delegation created')
  }

  async function handleDelete(id: string) {
    const result = await deleteDelegation(tenantSlug, id)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    router.refresh()
    toast.success('Delegation removed')
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-muted-foreground">
          Delegate your leave approval responsibilities to another manager while you are away.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add delegation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Approval Delegation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Delegate to</Label>
                <Select value={delegateId} onValueChange={setDelegateId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a manager..." />
                  </SelectTrigger>
                  <SelectContent>
                    {delegateOptions.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This person will be able to approve/reject leave for your direct reports during the delegation period.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Start date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Create delegation'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {delegations.length === 0 ? (
        <EmptyState
          icon={<Users className="h-10 w-10" />}
          title="No delegations"
          description="You haven't set up any approval delegations. Create one to allow another manager to approve leave on your behalf."
        />
      ) : (
        <div className="space-y-3">
          {delegations.map((d) => (
            <CardSection key={d.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {isAdmin && <span className="text-muted-foreground">{d.managerName} &rarr; </span>}
                      {d.delegateName}
                    </p>
                    {d.isActive ? (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                        Active
                      </span>
                    ) : new Date(d.startDate) > new Date() ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        Upcoming
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        Expired
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDateGB(d.startDate)} &ndash; {formatDateGB(d.endDate)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteId(d.id)}
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardSection>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Remove this delegation?"
        description="The delegate will no longer be able to approve leave on your behalf for this period."
        onConfirm={() => { handleDelete(deleteId!); setDeleteId(null) }}
      />
    </div>
  )
}

'use client'

import { useState, useTransition } from 'react'
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
import { Plus } from 'lucide-react'
import { createTeam } from './actions'

interface Props {
  tenantSlug: string
  employees: { id: string; firstName: string; lastName: string; jobTitle: string | null }[]
}

export function CreateTeamDialog({ tenantSlug, employees }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [managerId, setManagerId] = useState<string>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function resetForm() {
    setName('')
    setManagerId('')
  }

  function handleCreate() {
    if (!name.trim()) {
      toast.error('Team name is required')
      return
    }

    startTransition(async () => {
      try {
        const result = await createTeam(tenantSlug, name.trim(), managerId === '_none' ? null : (managerId || null))
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        toast.success('Team created')
        setOpen(false)
        resetForm()
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to create team')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm() }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="team-name">Team name</Label>
            <Input
              id="team-name"
              placeholder="e.g. Engineering, Sales, Marketing"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="team-manager">Manager (optional)</Label>
            <Select value={managerId} onValueChange={setManagerId}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select a manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_none">No manager</SelectItem>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                    {emp.jobTitle ? ` (${emp.jobTitle})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isPending}>
              {isPending ? 'Creating...' : 'Create team'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

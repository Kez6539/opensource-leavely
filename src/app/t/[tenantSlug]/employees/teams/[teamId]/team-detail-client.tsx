'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { PageHeader, CardSection, ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Users,
  Crown,
  Plus,
  UserMinus,
  Pencil,
  Trash2,
  UserPlus,
} from 'lucide-react'
import { addTeamMember, removeTeamMember, updateTeam, deleteTeam } from '../actions'

interface TeamMember {
  id: string
  employeeId: string
  employee: {
    id: string
    firstName: string
    lastName: string
    jobTitle: string | null
    department: string | null
    email: string | null
  }
}

interface TeamData {
  id: string
  name: string
  managerId: string | null
  manager: { id: string; firstName: string; lastName: string; jobTitle: string | null } | null
  members: TeamMember[]
}

interface EmployeeOption {
  id: string
  firstName: string
  lastName: string
  jobTitle: string | null
}

interface Props {
  tenantSlug: string
  team: TeamData
  employees: EmployeeOption[]
  canManage: boolean
  isAdmin: boolean
}

export function TeamDetailClient({ tenantSlug, team, employees, canManage, isAdmin }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Edit form state
  const [editName, setEditName] = useState(team.name)
  const [editManagerId, setEditManagerId] = useState(team.managerId || '')

  // Add member state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')

  const memberIds = new Set(team.members.map((m) => m.employeeId))
  const availableEmployees = employees.filter((e) => !memberIds.has(e.id))

  function handleAddMember() {
    if (!selectedEmployeeId) {
      toast.error('Please select an employee')
      return
    }

    startTransition(async () => {
      try {
        const result = await addTeamMember(tenantSlug, team.id, selectedEmployeeId)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        toast.success('Member added')
        setShowAddMemberDialog(false)
        setSelectedEmployeeId('')
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to add member')
      }
    })
  }

  function handleRemoveMember(employeeId: string, employeeName: string) {
    startTransition(async () => {
      try {
        const result = await removeTeamMember(tenantSlug, team.id, employeeId)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        toast.success(`${employeeName} removed from team`)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to remove member')
      }
    })
  }

  function handleUpdate() {
    if (!editName.trim()) {
      toast.error('Team name is required')
      return
    }

    startTransition(async () => {
      try {
        const result = await updateTeam(tenantSlug, team.id, {
          name: editName.trim(),
          managerId: editManagerId === '_none' ? null : editManagerId || null,
        })
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        toast.success('Team updated')
        setShowEditDialog(false)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update team')
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deleteTeam(tenantSlug, team.id)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        toast.success('Team deleted')
        router.push(`/t/${tenantSlug}/employees/teams`)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to delete team')
      }
    })
  }

  return (
    <div>
      <PageHeader
        title={team.name}
        description={`${team.members.length} member${team.members.length !== 1 ? 's' : ''}`}
        action={
          canManage ? (
            <div className="flex gap-2">
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit team</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label htmlFor="edit-name">Team name</Label>
                      <Input
                        id="edit-name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-manager">Manager</Label>
                      <Select value={editManagerId} onValueChange={setEditManagerId}>
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
                      <Button
                        variant="outline"
                        onClick={() => setShowEditDialog(false)}
                        disabled={isPending}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdate} disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save changes'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {isAdmin && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          ) : undefined
        }
      />

      {/* Manager card */}
      {team.manager && (
        <CardSection title="Team manager" className="mb-6">
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <Link
                href={`/t/${tenantSlug}/employees/${team.manager.id}`}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                {team.manager.firstName} {team.manager.lastName}
              </Link>
              {team.manager.jobTitle && (
                <p className="text-xs text-muted-foreground">{team.manager.jobTitle}</p>
              )}
            </div>
          </div>
        </CardSection>
      )}

      {/* Members */}
      <CardSection
        title="Members"
        action={
          canManage && availableEmployees.length > 0 ? (
            <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="add-employee">Employee</Label>
                    <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEmployees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.firstName} {emp.lastName}
                            {emp.jobTitle ? ` (${emp.jobTitle})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddMemberDialog(false)}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember} disabled={isPending}>
                      {isPending ? 'Adding...' : 'Add member'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : undefined
        }
      >
        {team.members.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No members yet. Add employees to this team.
          </div>
        ) : (
          <div className="divide-y">
            {team.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {member.employee.firstName[0]}
                    {member.employee.lastName[0]}
                  </div>
                  <div>
                    <Link
                      href={`/t/${tenantSlug}/employees/${member.employee.id}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {member.employee.firstName} {member.employee.lastName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {member.employee.jobTitle || member.employee.department || 'No role set'}
                    </p>
                  </div>
                </div>

                {canManage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleRemoveMember(
                        member.employee.id,
                        `${member.employee.firstName} ${member.employee.lastName}`
                      )
                    }
                    disabled={isPending}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="Delete team"
        description={`Are you sure you want to delete "${team.name}"? This will remove all member assignments. This cannot be undone.`}
        confirmLabel="Delete team"
        variant="destructive"
        onConfirm={handleDelete}
        loading={isPending}
      />
    </div>
  )
}

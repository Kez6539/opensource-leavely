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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge, ConfirmDialog } from '@/components/shared'
import Link from 'next/link'
import { Plus, UserMinus, Mail, RefreshCw, Trash2, UserCog } from 'lucide-react'
import { createInvite, removeMember, deleteInvite, resendInvite } from './actions'
import type { Invite } from '@/generated/prisma/client'

interface Member {
  id: string
  userId: string
  email: string
  name: string | null
  role: string
  createdAt: string
  activeDelegation: { delegateName: string; endDate: string } | null
}

interface Props {
  members: Member[]
  invites: Invite[]
  tenantSlug: string
}

export function UsersClient({ members, invites, tenantSlug }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('EMPLOYEE')
  const [loading, setLoading] = useState(false)
  const [removeMemberId, setRemoveMemberId] = useState<string | null>(null)
  const [revokeInvite, setRevokeInvite] = useState<Invite | null>(null)
  const [inviteActionPending, startInviteActionTransition] = useTransition()

  async function handleInvite() {
    if (!email.trim()) return
    setLoading(true)
    const result = await createInvite(tenantSlug, { email, role })
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    setEmail('')
    setRole('EMPLOYEE')
    setOpen(false)
    router.refresh()
    toast.success('Invite sent')
  }

  async function handleRemove(membershipId: string) {
    const result = await removeMember(tenantSlug, membershipId)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    router.refresh()
  }

  function handleResend(inviteId: string) {
    startInviteActionTransition(async () => {
      const result = await resendInvite(tenantSlug, inviteId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Invite resent')
      router.refresh()
    })
  }

  function handleRevoke(inviteId: string) {
    startInviteActionTransition(async () => {
      const result = await deleteInvite(tenantSlug, inviteId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setRevokeInvite(null)
      toast.success('Invite revoked')
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Manage team members and invitations.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInvite} disabled={loading} className="w-full">
                {loading ? 'Sending\u2026' : 'Send invite'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border shadow-sm overflow-x-auto mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Delegation</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id} className="hover:bg-accent/50 transition-colors duration-150">
                <TableCell className="font-medium">{m.name || '\u2014'}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>
                  <StatusBadge status={m.role} />
                </TableCell>
                <TableCell className="text-sm">
                  {(m.role === 'OWNER' || m.role === 'ADMIN' || m.role === 'MANAGER') ? (
                    m.activeDelegation ? (
                      <Link
                        href={`/t/${tenantSlug}/settings/delegation`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
                        title={`Active until ${new Date(m.activeDelegation.endDate).toLocaleDateString('en-GB')}`}
                      >
                        <UserCog className="h-3 w-3" />
                        \u2192 {m.activeDelegation.delegateName}
                      </Link>
                    ) : (
                      <Link
                        href={`/t/${tenantSlug}/settings/delegation`}
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                      >
                        Set up
                      </Link>
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground/50">\u2014</span>
                  )}
                </TableCell>
                <TableCell>
                  {m.role !== 'OWNER' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setRemoveMemberId(m.id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {invites.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Pending Invites</h3>
          <div className="space-y-2">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-3 text-sm text-muted-foreground rounded-md border px-3 py-2"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{inv.email}</span>
                <StatusBadge status={inv.role} />
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Resend invite"
                    disabled={inviteActionPending}
                    onClick={() => handleResend(inv.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Revoke invite"
                    disabled={inviteActionPending}
                    onClick={() => setRevokeInvite(inv)}
                    className="h-8 w-8 text-muted-foreground hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!removeMemberId}
        onOpenChange={(open) => !open && setRemoveMemberId(null)}
        title="Remove this member?"
        description="They will lose access to this workspace."
        confirmLabel="Remove"
        onConfirm={() => { handleRemove(removeMemberId!); setRemoveMemberId(null) }}
      />

      <ConfirmDialog
        open={!!revokeInvite}
        onOpenChange={(open) => !open && setRevokeInvite(null)}
        title={revokeInvite ? `Revoke invite for "${revokeInvite.email}"?` : 'Revoke invite?'}
        description="The pending invitation link will stop working immediately."
        confirmLabel="Revoke"
        variant="destructive"
        loading={inviteActionPending}
        onConfirm={() => revokeInvite && handleRevoke(revokeInvite.id)}
      />
    </div>
  )
}

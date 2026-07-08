'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EmptyState } from '@/components/shared/empty-state'
import { ConfirmDialog } from '@/components/shared'
import { Plus, Trash2, ShieldOff } from 'lucide-react'
import { createBlackoutDate, deleteBlackoutDate } from './actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface BlackoutDate {
  id: string
  name: string
  startDate: Date | string
  endDate: Date | string
}

export function BlackoutDatesClient({
  blackoutDates,
  tenantSlug,
  isAdmin,
}: {
  blackoutDates: BlackoutDate[]
  tenantSlug: string
  isAdmin: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isPending, startTransition] = useTransition()
  const [deleteTarget, setDeleteTarget] = useState<BlackoutDate | null>(null)

  // (#193) Reject reversed date ranges before hitting the server, which
  // would otherwise return a generic Zod error.
  const trimmedName = name.trim()
  const datesValid = !!(startDate && endDate && endDate >= startDate)
  const formValid = !!trimmedName && datesValid

  function handleCreate() {
    if (!formValid) return
    startTransition(async () => {
      const result = await createBlackoutDate(tenantSlug, {
        name: trimmedName,
        startDate,
        endDate,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setName('')
      setStartDate('')
      setEndDate('')
      setShowForm(false)
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteBlackoutDate(tenantSlug, id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setDeleteTarget(null)
    })
  }

  return (
    <div>
      {isAdmin && (
        <div className="mb-4">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Blackout Date
            </Button>
          ) : (
            <div className="rounded-xl border p-4 space-y-3 max-w-lg">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} maxLength={120} onChange={(e) => setName(e.target.value)} placeholder="e.g. Year-End Freeze" />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" value={startDate} min="2000-01-01" max="2100-12-31" onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" value={endDate} min={startDate || '2000-01-01'} max="2100-12-31" onChange={(e) => setEndDate(e.target.value)} />
                {startDate && endDate && endDate < startDate && (
                  <p className="text-xs text-destructive mt-1">End date must be on or after the start date.</p>
                )}
              </div>
              <div className="flex gap-2">
                {/*
                  (#190) The previous disabled-check was `!name`, which let
                  whitespace-only strings through and saved a blank-named
                  blackout. Now we trim before checking and disable on
                  reversed dates too.
                */}
                <Button onClick={handleCreate} disabled={isPending || !formValid}>
                  {isPending ? 'Saving…' : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {blackoutDates.length === 0 ? (
        <EmptyState
          icon={<ShieldOff className="h-10 w-10" />}
          title="No blackout dates"
          description="Add blackout dates to prevent leave requests during specific periods."
          action={isAdmin ? (
            <Button size="lg" className="shadow-md shadow-primary/20" onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add blackout date
            </Button>
          ) : undefined}
        />
      ) : (
        <div className="rounded-xl border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Name</TableHead>
                {isAdmin && <TableHead className="w-10" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {blackoutDates.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="text-sm">{new Date(b.startDate).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell className="text-sm">{new Date(b.endDate).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(b)} disabled={isPending}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={deleteTarget ? `Delete "${deleteTarget.name}"?` : 'Delete blackout date?'}
        description="This will remove the blackout period so leave requests can be booked during those dates again. This cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        loading={isPending}
      />
    </div>
  )
}

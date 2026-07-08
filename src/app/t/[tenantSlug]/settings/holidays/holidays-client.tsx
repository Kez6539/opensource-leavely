'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EmptyState } from '@/components/shared/empty-state'
import { GlobeIllustration } from '@/components/shared/illustrations'
import { Plus, Trash2 } from 'lucide-react'
import { createPublicHoliday, deletePublicHoliday } from './actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Holiday {
  id: string
  name: string
  date: Date | string
  country: string
}

export function HolidaysClient({
  holidays,
  tenantSlug,
  isAdmin,
}: {
  holidays: Holiday[]
  tenantSlug: string
  isAdmin: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [country, setCountry] = useState('GB')
  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | null>(null)

  function handleCreate() {
    setError(null)
    startTransition(async () => {
      const result = await createPublicHoliday(tenantSlug, { name, date, country })
      if (!result.ok) {
        setError(result.error)
        return
      }
      setName('')
      setDate('')
      setCountry('GB')
      setShowForm(false)
    })
  }

  function handleDelete(id: string) {
    setError(null)
    startTransition(async () => {
      const result = await deletePublicHoliday(tenantSlug, id)
      if (!result.ok) {
        setError(result.error)
      }
    })
  }

  return (
    <div>
      {isAdmin && (
        <div className="mb-4">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {/* (#204) Sentence case to match the rest of the project. */}
              Add holiday
            </Button>
          ) : (
            <div className="rounded-xl border p-4 space-y-3 max-w-lg">
              <div>
                <Label htmlFor="name">Holiday Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Christmas Day" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="DE" />
              </div>
              {error && (
                <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>
              )}
              <div className="flex gap-2">
                <Button onClick={handleCreate} disabled={isPending || !name || !date}>
                  {isPending ? 'Saving…' : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
          {!showForm && error && (
            <div className="mt-2 rounded-md bg-red-50 p-2 text-sm text-red-700 max-w-lg">{error}</div>
          )}
        </div>
      )}

      {holidays.length === 0 ? (
        <EmptyState
          illustration={<GlobeIllustration className="w-36 h-36" />}
          title="No public holidays"
          description="Add public holidays to exclude them from leave day calculations."
          action={isAdmin ? (
            <Button size="lg" className="shadow-md shadow-primary/20" onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add holiday
            </Button>
          ) : undefined}
        />
      ) : (
        <div className="rounded-xl border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Country</TableHead>
                {isAdmin && <TableHead className="w-10" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((h) => (
                <TableRow key={h.id}>
                  <TableCell className="text-sm">{new Date(h.date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell className="font-medium">{h.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{h.country}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(h.id)} disabled={isPending}>
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
    </div>
  )
}

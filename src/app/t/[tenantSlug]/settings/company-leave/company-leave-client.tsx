'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { EmptyState } from '@/components/shared/empty-state'
import { Plus, Trash2, Building2, Info, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { createCompanyLeave, deleteCompanyLeave } from './actions'
import { calendarDaysBetween } from '@/lib/business-days'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PolicyOption {
  id: string
  name: string
  unit: string
  defaultAllowance: number
}

interface CompanyLeave {
  id: string
  name: string
  startDate: Date | string
  endDate: Date | string
  deductFromAllowance: boolean
  policy: { id: string; name: string; unit: string } | null
  _count: { leaveRequests: number }
}

function calcDuration(start: Date | string, end: Date | string) {
  return calendarDaysBetween(new Date(start), new Date(end))
}

export function CompanyLeaveClient({
  leaves,
  policies,
  tenantSlug,
  isAdmin,
}: {
  leaves: CompanyLeave[]
  policies: PolicyOption[]
  tenantSlug: string
  isAdmin: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [deductFromAllowance, setDeductFromAllowance] = useState(true)
  const [policyId, setPolicyId] = useState<string>(policies[0]?.id ?? '')
  const [isPending, startTransition] = useTransition()

  function handleCreate() {
    startTransition(async () => {
      try {
        const res = await createCompanyLeave(tenantSlug, {
          name,
          startDate,
          endDate,
          deductFromAllowance,
          policyId: deductFromAllowance ? policyId : null,
        })
        if (deductFromAllowance) {
          toast.success(
            `Closure saved · ${res.createdRequests} staff deducted` +
              (res.skippedOverlapping > 0
                ? ` · ${res.skippedOverlapping} skipped (existing leave on those dates)`
                : ''),
          )
        } else {
          toast.success('Company closure saved')
        }
        setName('')
        setStartDate('')
        setEndDate('')
        setShowForm(false)
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  function handleDelete(id: string, hasDeductions: boolean) {
    const confirmMsg = hasDeductions
      ? 'This will reverse the auto-generated leave for every employee. Continue?'
      : 'Delete this company closure?'
    if (!window.confirm(confirmMsg)) return
    startTransition(async () => {
      try {
        const res = await deleteCompanyLeave(tenantSlug, id)
        if (res.reversedRequests > 0) {
          toast.success(`Closure deleted · ${res.reversedRequests} requests reversed`)
        } else {
          toast.success('Closure deleted')
        }
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed to delete')
      }
    })
  }

  const noPoliciesAvailable = policies.length === 0

  return (
    <div>
      {isAdmin && (
        <div className="mb-4">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Company Leave
            </Button>
          ) : (
            <div className="rounded-xl border p-4 space-y-4 max-w-lg">
              <div>
                <Label htmlFor="name">Closure Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Christmas Closure" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="deduct" className="text-sm font-medium">
                      Deduct from staff allowance
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Auto-creates an approved leave request for every active employee and takes the days off their balance.
                    </p>
                  </div>
                  <Switch
                    id="deduct"
                    checked={deductFromAllowance}
                    onCheckedChange={setDeductFromAllowance}
                    disabled={noPoliciesAvailable}
                  />
                </div>

                {deductFromAllowance && !noPoliciesAvailable && (
                  <div>
                    <Label htmlFor="policy" className="text-xs">Deduct from policy</Label>
                    <select
                      id="policy"
                      value={policyId}
                      onChange={(e) => setPolicyId(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {policies.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.defaultAllowance} {p.unit})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {noPoliciesAvailable && (
                  <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-500">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>No standard leave policies exist yet — create one first under <strong>Leave Policies</strong> if you want to deduct.</span>
                  </div>
                )}

                {deductFromAllowance && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <span>Staff with leave already booked across these dates will be skipped.</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCreate}
                  disabled={isPending || !name || !startDate || !endDate || (deductFromAllowance && !policyId)}
                >
                  {isPending ? 'Saving…' : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {leaves.length === 0 ? (
        <EmptyState
          icon={<Building2 className="h-10 w-10" />}
          title="No company closures"
          description="Add company-wide closure days (e.g. holiday shutdowns)."
        />
      ) : (
        <div className="rounded-xl border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Deduction</TableHead>
                {isAdmin && <TableHead className="w-10" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((l) => {
                const duration = calcDuration(l.startDate, l.endDate)
                return (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(l.startDate).toLocaleDateString('en-GB')}
                      <span className="text-muted-foreground"> → </span>
                      {new Date(l.endDate).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {duration} day{duration !== 1 ? 's' : ''}
                    </TableCell>
                    <TableCell className="text-sm">
                      {l.deductFromAllowance ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {l._count.leaveRequests} staff · {l.policy?.name ?? 'policy removed'}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Calendar only</span>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(l.id, l._count.leaveRequests > 0)}
                          disabled={isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

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
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2, Shield, Pencil, AlarmClock } from 'lucide-react'
import { createLeavePolicy, deleteLeavePolicy, updateLeavePolicy } from './actions'
import { ensureLatenessPolicy } from '../../leave/lateness-actions'
import type { LeavePolicy } from '@/generated/prisma/client'

type PolicyWithUsage = LeavePolicy & {
  usage: { employees: number; consumedPct: number | null }
}

interface Props {
  policies: PolicyWithUsage[]
  tenantSlug: string
  hasLatenessPolicy: boolean
}

export function LeavePoliciesClient({ policies, tenantSlug, hasLatenessPolicy }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [unit, setUnit] = useState<'days' | 'hours'>('days')
  const [defaultAllowance, setDefaultAllowance] = useState(28)
  const [loading, setLoading] = useState(false)
  const [deletePolicyId, setDeletePolicyId] = useState<string | null>(null)

  // Create dialog new fields
  const [allowHalfDay, setAllowHalfDay] = useState(false)
  const [maxCarryoverDays, setMaxCarryoverDays] = useState(0)
  const [carryoverExpiryMonths, setCarryoverExpiryMonths] = useState<number | null>(null)
  const [minNoticeDays, setMinNoticeDays] = useState(0)
  const [accrualType, setAccrualType] = useState<'upfront' | 'monthly'>('upfront')
  const [serviceBonuses, setServiceBonuses] = useState<{ years: number; days: number }[]>([])

  // Edit dialog state
  const [editPolicy, setEditPolicy] = useState<LeavePolicy | null>(null)
  const [editName, setEditName] = useState('')
  const [editUnit, setEditUnit] = useState<'days' | 'hours'>('days')
  const [editAllowance, setEditAllowance] = useState(28)
  const [editAllowHalfDay, setEditAllowHalfDay] = useState(false)
  const [editMaxCarryover, setEditMaxCarryover] = useState(0)
  const [editExpiryMonths, setEditExpiryMonths] = useState<number | null>(null)
  const [editMinNoticeDays, setEditMinNoticeDays] = useState(0)
  const [editAccrualType, setEditAccrualType] = useState<'upfront' | 'monthly'>('upfront')
  const [editServiceBonuses, setEditServiceBonuses] = useState<{ years: number; days: number }[]>([])
  const [editLoading, setEditLoading] = useState(false)
  const [enablingLateness, setEnablingLateness] = useState(false)

  async function handleEnableLateness() {
    setEnablingLateness(true)
    try {
      await ensureLatenessPolicy(tenantSlug)
      router.refresh()
      toast.success('Lateness tracking enabled')
    } catch {
      toast.error('Failed to enable lateness tracking')
    } finally {
      setEnablingLateness(false)
    }
  }

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    const result = await createLeavePolicy(tenantSlug, {
      name, unit, allowHalfDay, defaultAllowance, maxCarryoverDays, carryoverExpiryMonths, minNoticeDays,
      accrualType,
      serviceBonusDays: serviceBonuses.length > 0 ? serviceBonuses : null,
    })
    setLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    setName('')
    setAllowHalfDay(false)
    setMaxCarryoverDays(0)
    setCarryoverExpiryMonths(null)
    setMinNoticeDays(0)
    setAccrualType('upfront')
    setServiceBonuses([])
    setOpen(false)
    router.refresh()
    toast.success('Policy created')
  }

  function openEdit(p: LeavePolicy) {
    setEditPolicy(p)
    setEditName(p.name)
    setEditUnit(p.unit as 'days' | 'hours')
    setEditAllowance(p.defaultAllowance)
    setEditAllowHalfDay(p.allowHalfDay)
    setEditMaxCarryover(p.maxCarryoverDays)
    setEditExpiryMonths(p.carryoverExpiryMonths)
    setEditMinNoticeDays(p.minNoticeDays)
    setEditAccrualType((p.accrualType as 'upfront' | 'monthly') || 'upfront')
    setEditServiceBonuses(
      Array.isArray(p.serviceBonusDays)
        ? (p.serviceBonusDays as { years: number; days: number }[])
        : []
    )
  }

  async function handleUpdate() {
    if (!editPolicy || !editName.trim()) return
    setEditLoading(true)
    const result = await updateLeavePolicy(tenantSlug, editPolicy.id, {
      name: editName,
      unit: editUnit,
      allowHalfDay: editAllowHalfDay,
      defaultAllowance: editAllowance,
      maxCarryoverDays: editMaxCarryover,
      carryoverExpiryMonths: editExpiryMonths,
      minNoticeDays: editMinNoticeDays,
      accrualType: editAccrualType,
      serviceBonusDays: editServiceBonuses.length > 0 ? editServiceBonuses : null,
    })
    setEditLoading(false)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    setEditPolicy(null)
    router.refresh()
    toast.success('Policy updated')
  }

  async function handleDelete(policyId: string) {
    const result = await deleteLeavePolicy(tenantSlug, policyId)
    if (!result.ok) {
      toast.error(result.error)
      return
    }
    router.refresh()
    toast.success('Policy deleted')
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-muted-foreground">
          Define leave types employees can request.
        </p>
        <div className="flex gap-2">
          {!hasLatenessPolicy && (
            <Button variant="outline" onClick={handleEnableLateness} disabled={enablingLateness}>
              <AlarmClock className="mr-2 h-4 w-4" />
              {enablingLateness ? 'Enabling...' : 'Enable lateness tracking'}
            </Button>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add policy
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Leave Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Policy name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Annual Leave"
                />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select value={unit} onValueChange={(v) => setUnit(v as 'days' | 'hours')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default annual allowance</Label>
                {/* (#183) Cap allowance at 365 — anything beyond a year of
                    days is meaningless and exposes downstream rounding bugs. */}
                <Input
                  type="number"
                  min={0}
                  max={365}
                  value={defaultAllowance}
                  onChange={(e) => {
                    const n = parseInt(e.target.value)
                    if (Number.isFinite(n)) setDefaultAllowance(Math.min(365, Math.max(0, n)))
                    else setDefaultAllowance(0)
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow half-day requests</Label>
                <Switch checked={allowHalfDay} onCheckedChange={setAllowHalfDay} />
              </div>
              <div className="space-y-2">
                <Label>Max carryover days</Label>
                <Input
                  type="number"
                  min={0}
                  value={maxCarryoverDays}
                  onChange={(e) => setMaxCarryoverDays(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Max unused days that roll into next year. 0 = no carryover.
                </p>
              </div>
              {maxCarryoverDays > 0 && (
                <div className="space-y-2">
                  <Label>Carryover expiry (months)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={carryoverExpiryMonths ?? ''}
                    onChange={(e) => setCarryoverExpiryMonths(e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="e.g. 3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Months after leave year start when carried days expire. Leave empty for no expiry.
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <Label>Minimum notice (days)</Label>
                {/* (#183) 90 days max — anything beyond 3 months is
                    practically a refusal, not a notice period. */}
                <Input
                  type="number"
                  min={0}
                  max={90}
                  value={minNoticeDays}
                  onChange={(e) => {
                    const n = parseInt(e.target.value)
                    if (Number.isFinite(n)) setMinNoticeDays(Math.min(90, Math.max(0, n)))
                    else setMinNoticeDays(0)
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum days in advance leave must be requested. 0 = no minimum.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Accrual type</Label>
                <Select value={accrualType} onValueChange={(v) => setAccrualType(v as 'upfront' | 'monthly')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upfront">Upfront</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Upfront: full allowance from day one. Monthly: accrues 1/12th per month.
                </p>
              </div>
              {/* Service Bonuses */}
              <div className="space-y-2">
                <Label>Service bonuses</Label>
                <p className="text-xs text-muted-foreground">
                  Award extra leave days based on length of service. The highest qualifying tier applies.
                </p>
                {serviceBonuses.map((bonus, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      value={bonus.years}
                      onChange={(e) => {
                        const updated = [...serviceBonuses]
                        updated[i] = { ...updated[i], years: parseInt(e.target.value) || 1 }
                        setServiceBonuses(updated)
                      }}
                      className="w-20"
                      placeholder="Years"
                    />
                    <span className="text-xs text-muted-foreground shrink-0">years =</span>
                    <Input
                      type="number"
                      min={1}
                      value={bonus.days}
                      onChange={(e) => {
                        const updated = [...serviceBonuses]
                        updated[i] = { ...updated[i], days: parseInt(e.target.value) || 1 }
                        setServiceBonuses(updated)
                      }}
                      className="w-20"
                      placeholder="Days"
                    />
                    <span className="text-xs text-muted-foreground shrink-0">extra days</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setServiceBonuses(serviceBonuses.filter((_, j) => j !== i))}
                      className="text-muted-foreground hover:text-red-600 shrink-0"
                      aria-label="Remove service bonus tier"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServiceBonuses([...serviceBonuses, { years: 2, days: 1 }])}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add tier
                </Button>
              </div>
              <Button onClick={handleCreate} disabled={loading} className="w-full">
                {loading ? 'Creating\u2026' : 'Create policy'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {policies.length === 0 ? (
        <EmptyState
          icon={<Shield className="h-10 w-10" />}
          title="No leave policies"
          description="Create your first leave policy to allow employees to request time off."
        />
      ) : (
        <div className="space-y-3">
          {policies.map((p) => {
            const isSystem = !!p.isSystemType
            const consumed = p.usage.consumedPct
            const consumedColor =
              consumed === null
                ? 'bg-muted'
                : consumed >= 90
                  ? 'bg-red-500'
                  : consumed >= 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
            return (
              <CardSection key={p.id}>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{p.name}</p>
                      {isSystem && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          System
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Unit: {p.unit} · Half-day: {p.allowHalfDay ? 'Yes' : 'No'}
                      {p.unit !== 'occurrences' && <> · Allowance: {p.defaultAllowance} {p.unit}/year</>}
                      {p.maxCarryoverDays > 0 && ` · Carryover: up to ${p.maxCarryoverDays} ${p.unit}${p.carryoverExpiryMonths ? ` (expires after ${p.carryoverExpiryMonths}mo)` : ''}`}
                      {p.accrualType === 'monthly' && ' · Accrual: Monthly'}
                      {p.minNoticeDays > 0 && ` · Min notice: ${p.minNoticeDays} days`}
                      {Array.isArray(p.serviceBonusDays) && p.serviceBonusDays.length > 0 && (
                        <> · Service bonuses: {(p.serviceBonusDays as { years: number; days: number }[]).map(
                          (b) => `+${b.days}d at ${b.years}yr`
                        ).join(', ')}</>
                      )}
                    </p>
                  </div>
                  <div className="hidden sm:block w-44 shrink-0">
                    {p.usage.employees === 0 ? (
                      <p className="text-xs text-muted-foreground text-right">No employees on this policy yet</p>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="text-muted-foreground">{p.usage.employees} on policy</span>
                          {consumed !== null && (
                            <span className="font-semibold tabular-nums">{consumed}% used</span>
                          )}
                        </div>
                        {consumed !== null && (
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full ${consumedColor} transition-all`}
                              style={{ width: `${Math.min(100, consumed)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!isSystem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(p)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`Edit ${p.name} policy`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                    {!isSystem && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletePolicyId(p.id)}
                        className="text-muted-foreground hover:text-red-600"
                        aria-label={`Delete ${p.name} policy`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardSection>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        open={!!deletePolicyId}
        onOpenChange={(open) => !open && setDeletePolicyId(null)}
        title="Delete this policy?"
        description="Existing leave requests using it will be affected. This action cannot be undone."
        onConfirm={() => { handleDelete(deletePolicyId!); setDeletePolicyId(null) }}
      />

      <Dialog open={!!editPolicy} onOpenChange={(open) => !open && setEditPolicy(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Policy name</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={editUnit} onValueChange={(v) => setEditUnit(v as 'days' | 'hours')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default annual allowance</Label>
              <Input
                type="number"
                min={0}
                value={editAllowance}
                onChange={(e) => setEditAllowance(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Allow half-day requests</Label>
              <Switch checked={editAllowHalfDay} onCheckedChange={setEditAllowHalfDay} />
            </div>
            <div className="space-y-2">
              <Label>Max carryover days</Label>
              <Input
                type="number"
                min={0}
                value={editMaxCarryover}
                onChange={(e) => setEditMaxCarryover(parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Max unused days that roll into next year. 0 = no carryover.
              </p>
            </div>
            {editMaxCarryover > 0 && (
              <div className="space-y-2">
                <Label>Carryover expiry (months)</Label>
                <Input
                  type="number"
                  min={0}
                  value={editExpiryMonths ?? ''}
                  onChange={(e) => setEditExpiryMonths(e.target.value ? parseInt(e.target.value) : null)}
                  placeholder="e.g. 3"
                />
                <p className="text-xs text-muted-foreground">
                  Months after leave year start when carried days expire. Leave empty for no expiry.
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label>Minimum notice (days)</Label>
              <Input
                type="number"
                min={0}
                value={editMinNoticeDays}
                onChange={(e) => setEditMinNoticeDays(parseInt(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                Minimum days in advance leave must be requested. 0 = no minimum.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Accrual type</Label>
              <Select value={editAccrualType} onValueChange={(v) => setEditAccrualType(v as 'upfront' | 'monthly')}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="upfront">Upfront</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Upfront: full allowance from day one. Monthly: accrues 1/12th per month.
              </p>
            </div>
            {/* Service Bonuses */}
            <div className="space-y-2">
              <Label>Service bonuses</Label>
              <p className="text-xs text-muted-foreground">
                Award extra leave days based on length of service. The highest qualifying tier applies.
              </p>
              {editServiceBonuses.map((bonus, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={bonus.years}
                    onChange={(e) => {
                      const updated = [...editServiceBonuses]
                      updated[i] = { ...updated[i], years: parseInt(e.target.value) || 1 }
                      setEditServiceBonuses(updated)
                    }}
                    className="w-20"
                    placeholder="Years"
                  />
                  <span className="text-xs text-muted-foreground shrink-0">years =</span>
                  <Input
                    type="number"
                    min={1}
                    value={bonus.days}
                    onChange={(e) => {
                      const updated = [...editServiceBonuses]
                      updated[i] = { ...updated[i], days: parseInt(e.target.value) || 1 }
                      setEditServiceBonuses(updated)
                    }}
                    className="w-20"
                    placeholder="Days"
                  />
                  <span className="text-xs text-muted-foreground shrink-0">extra days</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditServiceBonuses(editServiceBonuses.filter((_, j) => j !== i))}
                    className="text-muted-foreground hover:text-red-600 shrink-0"
                    aria-label="Remove service bonus tier"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditServiceBonuses([...editServiceBonuses, { years: 2, days: 1 }])}
              >
                <Plus className="mr-1 h-3 w-3" />
                Add tier
              </Button>
            </div>
            <Button onClick={handleUpdate} disabled={editLoading} className="w-full">
              {editLoading ? 'Saving\u2026' : 'Save changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

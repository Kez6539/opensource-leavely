'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PageHeader, EmptyState, StatusBadge, CardSection, ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  Plus,
  CalendarClock,
  Clock,
  Archive,
  Users,
  CalendarDays,
  Trash2,
  Palette,
} from 'lucide-react'
import { createShiftTemplate, deleteShiftTemplate } from './actions'

interface RotaSummary {
  id: string
  name: string
  startDate: string | Date
  endDate: string | Date
  status: string
  _count: { entries: number }
}

interface ShiftTemplateData {
  id: string
  name: string
  startTime: string
  endTime: string
  color: string
}

interface RotasTabsProps {
  tenantSlug: string
  activeRotas: RotaSummary[]
  archivedRotas: RotaSummary[]
  shiftTemplates: ShiftTemplateData[]
  canManage: boolean
  currentTab?: string
}

const tabs = [
  { key: 'active', label: 'Active', icon: CalendarClock },
  { key: 'old', label: 'Archived', icon: Archive },
  { key: 'shifts', label: 'Shift Templates', icon: Clock },
]

export function RotasTabs({
  tenantSlug,
  activeRotas,
  archivedRotas,
  shiftTemplates,
  canManage,
  currentTab,
}: RotasTabsProps) {
  const [tab, setTab] = useState(currentTab || 'active')
  const router = useRouter()

  return (
    <div>
      <PageHeader
        title="Rotas & Shifts"
        description="Schedule shifts and manage your team's rota"
        action={
          canManage ? (
            <Link href={`/t/${tenantSlug}/rotas/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create rota
              </Button>
            </Link>
          ) : undefined
        }
      />

      {/* Tab bar */}
      <div className="flex gap-1 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key)
              router.replace(`/t/${tenantSlug}/rotas?tab=${t.key}`, { scroll: false })
            }}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-[1px]',
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'active' && (
        <ActiveRotasTab
          rotas={activeRotas}
          tenantSlug={tenantSlug}
          canManage={canManage}
        />
      )}
      {tab === 'old' && (
        <ArchivedRotasTab rotas={archivedRotas} tenantSlug={tenantSlug} />
      )}
      {tab === 'shifts' && (
        <ShiftTemplatesTab
          templates={shiftTemplates}
          tenantSlug={tenantSlug}
          canManage={canManage}
        />
      )}
    </div>
  )
}

// ---- Active Rotas Tab ----
function ActiveRotasTab({
  rotas,
  tenantSlug,
  canManage,
}: {
  rotas: RotaSummary[]
  tenantSlug: string
  canManage: boolean
}) {
  if (rotas.length === 0) {
    return (
      <div>
        {/* Info blocks */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <CardSection>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 shrink-0">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Create Rotas</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Build weekly or fortnightly rotas with drag-and-drop shift assignment.
                </p>
              </div>
            </div>
          </CardSection>
          <CardSection>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Assign Employees</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Assign team members to shifts with an easy-to-read weekly grid view.
                </p>
              </div>
            </div>
          </CardSection>
          <CardSection>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500 shrink-0">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Publish & Share</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Publish rotas so your team can see their upcoming shifts at a glance.
                </p>
              </div>
            </div>
          </CardSection>
        </div>

        <EmptyState
          icon={<CalendarClock className="h-10 w-10" />}
          title="No active rotas"
          description="Create your first rota to start scheduling shifts for your team."
          action={
            canManage ? (
              <Link href={`/t/${tenantSlug}/rotas/new`}>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first rota
                </Button>
              </Link>
            ) : undefined
          }
        />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rotas.map((rota) => (
        <Link key={rota.id} href={`/t/${tenantSlug}/rotas/${rota.id}`}>
          <CardSection
            className="hover:shadow-md transition-shadow cursor-pointer group"
            title={
              <span className="group-hover:text-primary transition-colors">
                {rota.name}
              </span>
            }
            action={<StatusBadge status={rota.status} />}
          >
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(rota.startDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
                {' - '}
                {new Date(rota.endDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {rota._count.entries} shift{rota._count.entries !== 1 ? 's' : ''} assigned
              </p>
            </div>
          </CardSection>
        </Link>
      ))}
    </div>
  )
}

// ---- Archived Rotas Tab ----
function ArchivedRotasTab({
  rotas,
  tenantSlug,
}: {
  rotas: RotaSummary[]
  tenantSlug: string
}) {
  if (rotas.length === 0) {
    return (
      <EmptyState
        icon={<Archive className="h-10 w-10" />}
        title="No archived rotas"
        description="Archived rotas will appear here after you archive them."
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rotas.map((rota) => (
        <Link key={rota.id} href={`/t/${tenantSlug}/rotas/${rota.id}`}>
          <CardSection
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            title={rota.name}
            action={<StatusBadge status={rota.status} />}
          >
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(rota.startDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
                {' - '}
                {new Date(rota.endDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {rota._count.entries} shift{rota._count.entries !== 1 ? 's' : ''} assigned
              </p>
            </div>
          </CardSection>
        </Link>
      ))}
    </div>
  )
}

// ---- Shift Templates Tab ----
function ShiftTemplatesTab({
  templates,
  tenantSlug,
  canManage,
}: {
  templates: ShiftTemplateData[]
  tenantSlug: string
  canManage: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    startTime: '09:00',
    endTime: '17:00',
    color: '#6366f1',
  })

  const handleCreate = () => {
    startTransition(async () => {
      try {
        const result = await createShiftTemplate(tenantSlug, formData)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        setFormData({ name: '', startTime: '09:00', endTime: '17:00', color: '#6366f1' })
        setShowForm(false)
        toast.success('Shift template created')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to create shift template')
      }
    })
  }

  const handleDelete = () => {
    if (!deleteId) return
    startTransition(async () => {
      try {
        const result = await deleteShiftTemplate(tenantSlug, deleteId)
        if (!result.ok) {
          toast.error(result.error)
          return
        }
        setDeleteId(null)
        toast.success('Shift template deleted')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to delete shift template')
      }
    })
  }

  const presetColors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6',
  ]

  return (
    <div>
      {canManage && (
        <div className="mb-6">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add shift template
            </Button>
          ) : (
            <CardSection title="New Shift Template">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="shift-name">Name</Label>
                  <Input
                    id="shift-name"
                    placeholder="e.g. Morning Shift"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shift-start">Start Time</Label>
                  <Input
                    id="shift-start"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, startTime: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="shift-end">End Time</Label>
                  <Input
                    id="shift-end"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, endTime: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Colour</Label>
                  <div className="flex gap-1.5 mt-1.5">
                    {presetColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFormData((d) => ({ ...d, color: c }))}
                        className={cn(
                          'h-7 w-7 rounded-full border-2 transition-transform hover:scale-110',
                          formData.color === c ? 'border-foreground scale-110' : 'border-transparent'
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleCreate} disabled={isPending || !formData.name}>
                  {isPending ? 'Saving...' : 'Save template'}
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardSection>
          )}
        </div>
      )}

      {templates.length === 0 ? (
        <EmptyState
          icon={<Palette className="h-10 w-10" />}
          title="No shift templates"
          description="Create reusable shift templates to quickly assign shifts to your rotas."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <CardSection key={t.id} className="flex items-center gap-4">
              <div
                className="h-10 w-10 rounded-lg shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.startTime} - {t.endTime}
                </p>
              </div>
              {canManage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteId(t.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardSection>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete shift template?"
        description="This will remove the template. Existing rota entries using it will keep their times but lose the template reference."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={isPending}
      />
    </div>
  )
}


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
import { CardSection, ConfirmDialog } from '@/components/shared'
import { Plus, Trash2, ChevronDown, ChevronRight, Sparkles } from 'lucide-react'
import {
  createOnboardingTemplate,
  deleteOnboardingTemplate,
  addTemplateItem,
  deleteTemplateItem,
  createTemplateFromStarter,
} from './actions'
import type { OnboardingTemplate, OnboardingTemplateItem, OnboardingAssignTo } from '@/generated/prisma/client'

interface Starter {
  key: string
  name: string
  description: string
  emoji: string
  itemCount: number
}

const ASSIGN_COLORS: Record<string, string> = {
  HR: 'bg-indigo-100 text-indigo-700',
  MANAGER: 'bg-emerald-100 text-emerald-700',
  EMPLOYEE: 'bg-amber-100 text-amber-700',
  IT: 'bg-purple-100 text-purple-700',
}

interface Props {
  templates: (OnboardingTemplate & { items: OnboardingTemplateItem[] })[]
  starters: Starter[]
  tenantSlug: string
}

export function OnboardingSettingsClient({ templates, starters, tenantSlug }: Props) {
  const [importingStarter, setImportingStarter] = useState<string | null>(null)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [addingItem, setAddingItem] = useState<string | null>(null)
  const [itemTitle, setItemTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemAssignTo, setItemAssignTo] = useState<OnboardingAssignTo>('HR')
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    try {
      await createOnboardingTemplate(tenantSlug, { name })
      setName('')
      setOpen(false)
      router.refresh()
      toast.success('Template created')
    } catch {
      toast.error('Failed to create template')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteTemplate(templateId: string) {
    try {
      await deleteOnboardingTemplate(tenantSlug, templateId)
      router.refresh()
    } catch {
      toast.error('Failed to delete template')
    }
  }

  async function handleAddItem(templateId: string) {
    if (!itemTitle.trim()) return
    setLoading(true)
    try {
      await addTemplateItem(tenantSlug, templateId, {
        title: itemTitle,
        description: itemDescription || undefined,
        assignTo: itemAssignTo,
      })
      setItemTitle('')
      setItemDescription('')
      setItemAssignTo('HR')
      setAddingItem(null)
      router.refresh()
      toast.success('Task added')
    } catch {
      toast.error('Failed to add task')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteItem(itemId: string) {
    try {
      await deleteTemplateItem(tenantSlug, itemId)
      router.refresh()
    } catch {
      toast.error('Failed to delete task')
    }
  }

  async function handleImportStarter(starterKey: string) {
    setImportingStarter(starterKey)
    try {
      const result = await createTemplateFromStarter(tenantSlug, starterKey)
      router.refresh()
      toast.success(`Imported "${result.name}"`)
    } catch {
      toast.error('Failed to import template')
    } finally {
      setImportingStarter(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm text-muted-foreground">
          Create onboarding templates to assign to new hires.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Onboarding Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Template name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Engineering Starter Pack"
                />
              </div>
              <Button onClick={handleCreate} disabled={loading} className="w-full">
                {loading ? 'Creating...' : 'Create template'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Starter library — always visible. Empty tenants get the prominent
          "pick a starter" experience; tenants with existing templates still
          see this as a quick way to add a new flow without typing every
          item. */}
      <div className="mb-6 rounded-xl border bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20 p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Start from a template</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {templates.length === 0
                ? "We've put together a few common starting points so you don't have to build from scratch. Tweak after import."
                : 'Add another ready-made template — fully editable once imported.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {starters.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => handleImportStarter(s.key)}
              disabled={importingStarter === s.key}
              className="text-left rounded-lg border bg-card p-4 hover:border-emerald-400 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-wait flex flex-col gap-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl" aria-hidden="true">{s.emoji}</span>
                <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
                  {s.itemCount} {s.itemCount === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              <p className="text-sm font-semibold leading-tight">{s.name}</p>
              <p className="text-xs text-muted-foreground leading-snug">{s.description}</p>
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1 group-hover:underline">
                {importingStarter === s.key ? 'Importing…' : '+ Use this template'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Or click <strong>Add template</strong> above to build one from scratch.
        </div>
      ) : (
        <div className="space-y-3">
          {templates.map((t) => (
            <CardSection key={t.id}>
              <div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(t.id)}
                    className="flex items-center gap-2 text-left"
                  >
                    {expanded.has(t.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.items.length} {t.items.length === 1 ? 'task' : 'tasks'}
                      </p>
                    </div>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTemplateId(t.id)}
                    className="text-muted-foreground hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {expanded.has(t.id) && (
                  <div className="mt-4 space-y-2 pl-6">
                    {t.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            {item.description && (
                              <p className="text-xs text-muted-foreground">{item.description}</p>
                            )}
                          </div>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ASSIGN_COLORS[item.assignTo]}`}
                          >
                            {item.assignTo}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteItemId(item.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}

                    {addingItem === t.id ? (
                      <div className="rounded-lg border p-3 space-y-3">
                        <div className="space-y-2">
                          <Input
                            value={itemTitle}
                            onChange={(e) => setItemTitle(e.target.value)}
                            placeholder="Task title"
                          />
                          <Input
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            placeholder="Description (optional)"
                          />
                          <Select
                            value={itemAssignTo}
                            onValueChange={(v) => setItemAssignTo(v as OnboardingAssignTo)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="MANAGER">Manager</SelectItem>
                              <SelectItem value="EMPLOYEE">Employee</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddItem(t.id)}
                            disabled={loading}
                          >
                            {loading ? 'Adding...' : 'Add task'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAddingItem(null)
                              setItemTitle('')
                              setItemDescription('')
                              setItemAssignTo('HR')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAddingItem(t.id)}
                      >
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add task
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardSection>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTemplateId}
        onOpenChange={(open) => !open && setDeleteTemplateId(null)}
        title="Delete this template and all its items?"
        description="This action cannot be undone."
        onConfirm={() => { handleDeleteTemplate(deleteTemplateId!); setDeleteTemplateId(null) }}
      />

      <ConfirmDialog
        open={!!deleteItemId}
        onOpenChange={(open) => !open && setDeleteItemId(null)}
        title="Delete this task?"
        description="This action cannot be undone."
        onConfirm={() => { handleDeleteItem(deleteItemId!); setDeleteItemId(null) }}
      />
    </div>
  )
}

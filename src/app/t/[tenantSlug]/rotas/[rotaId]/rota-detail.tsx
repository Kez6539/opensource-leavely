'use client'

import { useState, useTransition, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { StatusBadge, CardSection, ConfirmDialog } from '@/components/shared'
import { cn } from '@/lib/utils'
import {
  Send,
  Archive,
  Download,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  AlertTriangle,
  Clock,
} from 'lucide-react'
import {
  publishRota,
  archiveRota,
  addRotaEntry,
  removeRotaEntry,
  exportRotaReport,
  copyWeekShifts,
} from '../actions'

interface Employee {
  id: string
  firstName: string
  lastName: string
  department: string | null
}

interface ShiftTemplate {
  id: string
  name: string
  startTime: string
  endTime: string
  color: string
}

interface RotaEntryType {
  id: string
  rotaId: string
  employeeId: string
  shiftTemplateId: string | null
  date: string | Date
  startTime: string | null
  endTime: string | null
  notes: string | null
  employee: { id: string; firstName: string; lastName: string }
  shiftTemplate: ShiftTemplate | null
}

interface RotaData {
  id: string
  name: string
  startDate: string | Date
  endDate: string | Date
  status: string
  entries: RotaEntryType[]
}

// leaveConflicts: { employeeId: { "YYYY-MM-DD": "Leave Type" } }
type LeaveConflictsMap = Record<string, Record<string, string>>

interface RotaDetailProps {
  rota: RotaData
  shiftTemplates: ShiftTemplate[]
  employees: Employee[]
  tenantSlug: string
  canManage: boolean
  leaveConflicts: LeaveConflictsMap
}

function getDaysBetween(start: Date, end: Date): Date[] {
  const days: Date[] = []
  const current = new Date(start)
  current.setHours(0, 0, 0, 0)
  const endDate = new Date(end)
  endDate.setHours(0, 0, 0, 0)
  while (current <= endDate) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return days
}

// (#199) Use the canonical helper so the rota cell keys agree with the
// keys produced by server-side toLocalDayKey calls. The previous raw
// toISOString().split() approach broke around midnight in BST.
import { toLocalDayKey as _toLocalDayKey } from '@/lib/business-days'
function dateKey(d: Date): string {
  return _toLocalDayKey(d)
}

function calculateShiftHours(
  entry: RotaEntryType
): number {
  const start = entry.startTime || entry.shiftTemplate?.startTime
  const end = entry.endTime || entry.shiftTemplate?.endTime
  if (!start || !end) return 0

  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let hours = eh - sh + (em - sm) / 60
  if (hours < 0) hours += 24 // overnight shift
  return hours
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function RotaDetail({
  rota,
  shiftTemplates,
  employees,
  tenantSlug,
  canManage,
  leaveConflicts,
}: RotaDetailProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [confirmAction, setConfirmAction] = useState<'publish' | 'archive' | null>(null)
  const [addingCell, setAddingCell] = useState<{ employeeId: string; date: string } | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('')
  const [showCopyConfirm, setShowCopyConfirm] = useState(false)
  const [conflictWarning, setConflictWarning] = useState<{
    employeeId: string
    date: string
    leaveType: string
    templateId?: string
  } | null>(null)

  // Calculate all days in the rota range
  const allDays = useMemo(
    () => getDaysBetween(new Date(rota.startDate), new Date(rota.endDate)),
    [rota.startDate, rota.endDate]
  )

  // Split into weeks of 7 days for pagination
  const weeks = useMemo(() => {
    const result: Date[][] = []
    for (let i = 0; i < allDays.length; i += 7) {
      result.push(allDays.slice(i, i + 7))
    }
    return result
  }, [allDays])

  const [weekIdx, setWeekIdx] = useState(0)
  const currentWeek = useMemo(() => weeks[weekIdx] || [], [weeks, weekIdx])

  // Build entry lookup: key = `employeeId|dateKey`
  const entryMap = useMemo(() => {
    const map = new Map<string, RotaEntryType[]>()
    for (const entry of rota.entries) {
      const dk = dateKey(new Date(entry.date))
      const key = `${entry.employeeId}|${dk}`
      const existing = map.get(key) || []
      existing.push(entry)
      map.set(key, existing)
    }
    return map
  }, [rota.entries])

  // Get unique employee IDs from entries + all active employees
  const rotaEmployeeIds = new Set(rota.entries.map((e) => e.employeeId))
  const allEmployeeIds = new Set([
    ...rotaEmployeeIds,
    ...employees.map((e) => e.id),
  ])
  const employeeMap = new Map(employees.map((e) => [e.id, e]))

  // Get employees that have entries or are active
  const displayEmployees = Array.from(allEmployeeIds)
    .map((id) => {
      const emp = employeeMap.get(id)
      if (emp) return emp
      const entry = rota.entries.find((e) => e.employeeId === id)
      if (entry) {
        return {
          id,
          firstName: entry.employee.firstName,
          lastName: entry.employee.lastName,
          department: null,
        }
      }
      return null
    })
    .filter(Boolean) as Employee[]

  displayEmployees.sort((a, b) => a.lastName.localeCompare(b.lastName))

  // Calculate weekly hours per employee (for current week)
  const weeklyHours = useMemo(() => {
    const hours: Record<string, number> = {}
    for (const emp of displayEmployees) {
      let total = 0
      for (const day of currentWeek) {
        const dk = dateKey(day)
        const key = `${emp.id}|${dk}`
        const entries = entryMap.get(key) || []
        for (const entry of entries) {
          total += calculateShiftHours(entry)
        }
      }
      hours[emp.id] = Math.round(total * 10) / 10
    }
    return hours
  }, [displayEmployees, currentWeek, entryMap])

  // (#149) Replace every native alert() with sonner toasts so the rota
  // page stops looking 10 years older than the rest of the product.
  const handlePublish = () => {
    startTransition(async () => {
      const result = await publishRota(tenantSlug, rota.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setConfirmAction(null)
      toast.success('Rota published')
    })
  }

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveRota(tenantSlug, rota.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setConfirmAction(null)
      router.push(`/t/${tenantSlug}/rotas`)
    })
  }

  const attemptAddEntry = (employeeId: string, date: string, templateId?: string) => {
    // Check leave conflict
    const empLeave = leaveConflicts[employeeId]
    if (empLeave && empLeave[date]) {
      setConflictWarning({
        employeeId,
        date,
        leaveType: empLeave[date],
        templateId: templateId || selectedTemplateId || undefined,
      })
      return
    }

    proceedAddEntry(employeeId, date, templateId)
  }

  const proceedAddEntry = (employeeId: string, date: string, templateId?: string) => {
    const tid = templateId || selectedTemplateId || undefined

    startTransition(async () => {
      const result = await addRotaEntry(tenantSlug, {
        rotaId: rota.id,
        employeeId,
        date,
        shiftTemplateId: tid,
      })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setAddingCell(null)
      setConflictWarning(null)
    })
  }

  const handleAddWithTemplate = (templateId: string) => {
    if (!addingCell) return
    setAddingCell(null)
    attemptAddEntry(addingCell.employeeId, addingCell.date, templateId)
  }

  const handleRemoveEntry = (entryId: string) => {
    startTransition(async () => {
      const result = await removeRotaEntry(tenantSlug, entryId)
      if (!result.ok) {
        toast.error(result.error)
      }
    })
  }

  const handleCopyWeek = () => {
    if (weekIdx >= weeks.length - 1) {
      toast.error('There is no next week in this rota to copy to.')
      return
    }
    setShowCopyConfirm(true)
  }

  const confirmCopyWeek = () => {
    const sourceStart = dateKey(currentWeek[0])
    const nextWeek = weeks[weekIdx + 1]
    if (!nextWeek || nextWeek.length === 0) return

    const targetStart = dateKey(nextWeek[0])

    startTransition(async () => {
      const result = await copyWeekShifts(tenantSlug, rota.id, sourceStart, targetStart)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setShowCopyConfirm(false)
      setWeekIdx(weekIdx + 1)
      toast.success(`Copied ${result.data.entriesCopied} shifts to the next week.`)
    })
  }

  const handleExport = () => {
    startTransition(async () => {
      try {
        const csv = await exportRotaReport(tenantSlug, rota.id)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${rota.name.replace(/[^a-zA-Z0-9]/g, '_')}_rota.csv`
        a.click()
        URL.revokeObjectURL(url)
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to export')
      }
    })
  }

  const isEditable = rota.status !== 'ARCHIVED'

  return (
    <div>
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <StatusBadge status={rota.status} />

        <div className="flex-1" />

        {canManage && isEditable && weeks.length > 1 && (
          <Button variant="outline" onClick={handleCopyWeek} disabled={isPending || weekIdx >= weeks.length - 1}>
            <Copy className="mr-2 h-4 w-4" />
            Copy week to next
          </Button>
        )}
        {canManage && rota.status === 'DRAFT' && (
          <Button onClick={() => setConfirmAction('publish')} disabled={isPending}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        )}
        {canManage && rota.status !== 'ARCHIVED' && (
          <Button
            variant="outline"
            onClick={() => setConfirmAction('archive')}
            disabled={isPending}
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
        )}
        <Button variant="outline" onClick={handleExport} disabled={isPending}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Shift template selector (if templates exist) */}
      {canManage && isEditable && shiftTemplates.length > 0 && (
        <div className="mb-4">
          <CardSection title="Quick Assign Shift">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTemplateId('')}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                  !selectedTemplateId
                    ? 'bg-foreground text-background border-foreground'
                    : 'text-muted-foreground border-border hover:border-foreground/50'
                )}
              >
                Custom
              </button>
              {shiftTemplates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                    selectedTemplateId === t.id
                      ? 'text-white border-transparent'
                      : 'border-border hover:border-foreground/50'
                  )}
                  style={
                    selectedTemplateId === t.id
                      ? { backgroundColor: t.color, borderColor: t.color }
                      : undefined
                  }
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full mr-1.5"
                    style={{ backgroundColor: t.color }}
                  />
                  {t.name} ({t.startTime}-{t.endTime})
                </button>
              ))}
            </div>
          </CardSection>
        </div>
      )}

      {/* Week pagination */}
      {weeks.length > 1 && (
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekIdx((i) => Math.max(0, i - 1))}
            disabled={weekIdx === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev week
          </Button>
          <span className="text-sm text-muted-foreground">
            Week {weekIdx + 1} of {weeks.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWeekIdx((i) => Math.min(weeks.length - 1, i + 1))}
            disabled={weekIdx === weeks.length - 1}
          >
            Next week
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Weekly grid */}
      <div className="rounded-lg border shadow-sm overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left text-xs font-semibold text-muted-foreground p-3 border-b w-[180px] sticky left-0 bg-muted/50 z-10">
                Employee
              </th>
              {currentWeek.map((day) => {
                const isToday = dateKey(day) === dateKey(new Date())
                const isWeekend = day.getDay() === 0 || day.getDay() === 6
                return (
                  <th
                    key={dateKey(day)}
                    className={cn(
                      'text-center text-xs font-semibold p-3 border-b min-w-[110px]',
                      isToday
                        ? 'text-primary bg-primary/5'
                        : isWeekend
                        ? 'text-muted-foreground/60 bg-muted/30'
                        : 'text-muted-foreground'
                    )}
                  >
                    <div>{DAY_NAMES[day.getDay()]}</div>
                    <div className="text-[11px] font-normal mt-0.5">
                      {day.getDate()}/{day.getMonth() + 1}
                    </div>
                  </th>
                )
              })}
              <th className="text-center text-xs font-semibold text-muted-foreground p-3 border-b w-[80px] bg-muted/50">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  Hours
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayEmployees.map((emp) => (
              <tr key={emp.id} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                <td className="p-3 text-sm font-medium sticky left-0 bg-card z-10 border-r">
                  <div className="truncate max-w-[160px]">
                    {emp.firstName} {emp.lastName}
                  </div>
                  {emp.department && (
                    <div className="text-[11px] text-muted-foreground truncate">
                      {emp.department}
                    </div>
                  )}
                </td>
                {currentWeek.map((day) => {
                  const dk = dateKey(day)
                  const key = `${emp.id}|${dk}`
                  const entries = entryMap.get(key) || []
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6
                  const isAddingHere =
                    addingCell?.employeeId === emp.id && addingCell?.date === dk

                  // Check leave conflict for this cell
                  const empLeave = leaveConflicts[emp.id]
                  const hasLeave = empLeave && empLeave[dk]
                  const leaveType = hasLeave ? empLeave[dk] : null

                  return (
                    <td
                      key={dk}
                      className={cn(
                        'p-1.5 align-top border-r last:border-r-0 min-h-[60px]',
                        isWeekend && 'bg-muted/20',
                        hasLeave && 'bg-red-50 dark:bg-red-950/20'
                      )}
                    >
                      {/* Leave warning indicator */}
                      {hasLeave && (
                        <div className="flex items-center gap-1 rounded px-1.5 py-0.5 mb-1 text-[10px] font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30">
                          <AlertTriangle className="h-2.5 w-2.5 shrink-0" />
                          <span className="truncate">{leaveType}</span>
                        </div>
                      )}

                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="relative group rounded px-2 py-1 mb-1 text-xs text-white"
                          style={{
                            backgroundColor:
                              entry.shiftTemplate?.color || '#6b7280',
                          }}
                        >
                          <div className="font-medium truncate">
                            {entry.shiftTemplate?.name || 'Custom'}
                          </div>
                          <div className="text-[10px] opacity-80">
                            {entry.startTime ||
                              entry.shiftTemplate?.startTime ||
                              ''}{' '}
                            -{' '}
                            {entry.endTime ||
                              entry.shiftTemplate?.endTime ||
                              ''}
                          </div>
                          {entry.notes && (
                            <div className="text-[10px] opacity-70 truncate">
                              {entry.notes}
                            </div>
                          )}
                          {canManage && isEditable && (
                            <button
                              onClick={() => handleRemoveEntry(entry.id)}
                              className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white rounded-full items-center justify-center text-[10px] hidden group-hover:flex"
                              disabled={isPending}
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Add shift button */}
                      {canManage && isEditable && !isAddingHere && entries.length === 0 && (
                        <button
                          onClick={() => {
                            if (selectedTemplateId) {
                              attemptAddEntry(emp.id, dk)
                            } else if (shiftTemplates.length > 0) {
                              setAddingCell({ employeeId: emp.id, date: dk })
                            } else {
                              attemptAddEntry(emp.id, dk)
                            }
                          }}
                          disabled={isPending}
                          className="w-full h-6 rounded border border-dashed border-transparent hover:border-muted-foreground/30 flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      )}

                      {/* Template picker popup */}
                      {isAddingHere && (
                        <div className="rounded border bg-popover shadow-lg p-2 mt-1 space-y-1 z-20 relative">
                          {shiftTemplates.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => handleAddWithTemplate(t.id)}
                              disabled={isPending}
                              className="w-full text-left px-2 py-1 rounded text-xs hover:bg-accent transition-colors flex items-center gap-2"
                            >
                              <span
                                className="h-2.5 w-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: t.color }}
                              />
                              {t.name}
                            </button>
                          ))}
                          <button
                            onClick={() => setAddingCell(null)}
                            className="w-full text-left px-2 py-1 rounded text-xs text-muted-foreground hover:bg-accent transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  )
                })}
                {/* Hours total column */}
                <td className="p-3 text-center text-sm font-semibold border-l bg-muted/10">
                  {weeklyHours[emp.id] > 0 ? (
                    <span className={cn(
                      weeklyHours[emp.id] > 48 ? 'text-red-600 dark:text-red-400' :
                      weeklyHours[emp.id] > 40 ? 'text-amber-600 dark:text-amber-400' :
                      'text-foreground'
                    )}>
                      {weeklyHours[emp.id]}h
                    </span>
                  ) : (
                    <span className="text-muted-foreground/40">0h</span>
                  )}
                </td>
              </tr>
            ))}

            {displayEmployees.length === 0 && (
              <tr>
                <td
                  colSpan={currentWeek.length + 2}
                  className="text-center py-12 text-muted-foreground text-sm"
                >
                  No employees found. Add employees first to start scheduling shifts.
                </td>
              </tr>
            )}

            {/* Summary row */}
            {displayEmployees.length > 0 && (
              <tr className="bg-muted/30 border-t-2">
                <td className="p-3 text-xs font-semibold text-muted-foreground sticky left-0 bg-muted/30 z-10 border-r">
                  Daily totals
                </td>
                {currentWeek.map((day) => {
                  const dk = dateKey(day)
                  let dayHours = 0
                  let dayShifts = 0
                  for (const emp of displayEmployees) {
                    const key = `${emp.id}|${dk}`
                    const entries = entryMap.get(key) || []
                    dayShifts += entries.length
                    for (const entry of entries) {
                      dayHours += calculateShiftHours(entry)
                    }
                  }
                  dayHours = Math.round(dayHours * 10) / 10
                  return (
                    <td key={dk} className="p-2 text-center text-[11px] text-muted-foreground border-r last:border-r-0">
                      <div className="font-semibold">{dayShifts} shift{dayShifts !== 1 ? 's' : ''}</div>
                      <div>{dayHours}h total</div>
                    </td>
                  )
                })}
                <td className="p-3 text-center text-xs font-bold text-muted-foreground border-l bg-muted/30">
                  {(() => {
                    const total = Object.values(weeklyHours).reduce((s, h) => s + h, 0)
                    return `${Math.round(total * 10) / 10}h`
                  })()}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Leave conflict warning dialog */}
      <ConfirmDialog
        open={!!conflictWarning}
        onOpenChange={(open) => !open && setConflictWarning(null)}
        title="Leave conflict detected"
        description={
          conflictWarning
            ? `This employee has approved ${conflictWarning.leaveType} on this date. Are you sure you want to assign a shift?`
            : ''
        }
        confirmLabel="Assign anyway"
        variant="default"
        onConfirm={() => {
          if (conflictWarning) {
            proceedAddEntry(
              conflictWarning.employeeId,
              conflictWarning.date,
              conflictWarning.templateId
            )
          }
        }}
        loading={isPending}
      />

      {/* Copy week confirm dialog */}
      <ConfirmDialog
        open={showCopyConfirm}
        onOpenChange={(open) => !open && setShowCopyConfirm(false)}
        title="Copy week to next?"
        description={
          currentWeek.length > 0 && weekIdx < weeks.length - 1
            ? `This will copy all ${
                (() => {
                  let count = 0
                  for (const emp of displayEmployees) {
                    for (const day of currentWeek) {
                      const dk = dateKey(day)
                      const key = `${emp.id}|${dk}`
                      count += (entryMap.get(key) || []).length
                    }
                  }
                  return count
                })()
              } shifts from Week ${weekIdx + 1} to Week ${weekIdx + 2}. Existing shifts in the target week will not be removed.`
            : ''
        }
        confirmLabel="Copy shifts"
        variant="default"
        onConfirm={confirmCopyWeek}
        loading={isPending}
      />

      {/* Confirm dialogs */}
      <ConfirmDialog
        open={confirmAction === 'publish'}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Publish this rota?"
        description="Once published, your team will be able to see their scheduled shifts. You can still make changes after publishing."
        confirmLabel="Publish"
        variant="default"
        onConfirm={handlePublish}
        loading={isPending}
      />
      <ConfirmDialog
        open={confirmAction === 'archive'}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title="Archive this rota?"
        description="Archiving will move this rota to the archived tab. You won't be able to edit it further."
        confirmLabel="Archive"
        variant="destructive"
        onConfirm={handleArchive}
        loading={isPending}
      />
    </div>
  )
}

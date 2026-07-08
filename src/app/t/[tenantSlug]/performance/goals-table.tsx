'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/shared'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { KpiTile } from '@/components/shared'
import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface GoalRow {
  id: string
  title: string
  status: string
  progress: number
  dueDate: string | null
  assigneeName: string
  assigneeId: string
  createdAt: string
}

interface GoalsTableProps {
  goals: GoalRow[]
  employees: { id: string; firstName: string; lastName: string }[]
  tenantSlug: string
  canManage: boolean
  hasMyEmployee: boolean
  filters: { view: string; status?: string; assignee?: string }
  statusCounts: {
    total: number
    NOT_STARTED: number
    ON_TRACK: number
    OVERDUE: number
    COMPLETED: number
  }
}

export function GoalsTable({
  goals,
  employees,
  tenantSlug,
  hasMyEmployee,
  filters,
  statusCounts,
}: GoalsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'ALL' && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/t/${tenantSlug}/performance?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiTile
          label="Total Goals"
          value={statusCounts.total}
          icon={<Target className="h-4 w-4" />}
        />
        <KpiTile
          label="On Track"
          value={statusCounts.ON_TRACK}
          icon={<TrendingUp className="h-4 w-4" />}
          accent="border-l-blue-500"
          iconBg="bg-blue-50 text-blue-600"
        />
        <KpiTile
          label="Overdue"
          value={statusCounts.OVERDUE}
          icon={<AlertTriangle className="h-4 w-4" />}
          accent="border-l-red-500"
          iconBg="bg-red-50 text-red-600"
        />
        <KpiTile
          label="Completed"
          value={statusCounts.COMPLETED}
          icon={<CheckCircle2 className="h-4 w-4" />}
          accent="border-l-emerald-500"
          iconBg="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {hasMyEmployee && (
          <div className="flex rounded-lg border bg-card overflow-hidden">
            <button
              onClick={() => updateFilter('view', 'my')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                filters.view === 'my' || !filters.view
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              My Goals
            </button>
            <button
              onClick={() => updateFilter('view', 'all')}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                filters.view === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              All Goals
            </button>
          </div>
        )}

        <Select
          value={filters.status || 'ALL'}
          onValueChange={(v) => updateFilter('status', v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="NOT_STARTED">Not Started</SelectItem>
            <SelectItem value="ON_TRACK">On Track</SelectItem>
            <SelectItem value="OVERDUE">Overdue</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>

        {(filters.view === 'all' || !hasMyEmployee) && (
          <Select
            value={filters.assignee || 'ALL'}
            onValueChange={(v) => updateFilter('assignee', v)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All employees</SelectItem>
              {employees.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.firstName} {e.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="text-left font-medium px-4 py-3">Goal</th>
              <th className="text-left font-medium px-4 py-3 hidden sm:table-cell">Assignee</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Progress</th>
              <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {goals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                  No goals match your filters.
                </td>
              </tr>
            ) : (
              goals.map((goal) => (
                <tr
                  key={goal.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => router.push(`/t/${tenantSlug}/performance/${goal.id}`)}
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/t/${tenantSlug}/performance/${goal.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {goal.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {goal.assigneeName}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={goal.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            goal.progress >= 100
                              ? 'bg-emerald-500'
                              : goal.status === 'OVERDUE'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                          )}
                          style={{ width: `${Math.min(100, goal.progress)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {goal.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {goal.dueDate
                      ? new Date(goal.dueDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '\u2014'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

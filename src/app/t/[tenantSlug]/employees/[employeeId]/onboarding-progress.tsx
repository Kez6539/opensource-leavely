'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CardSection } from '@/components/shared'
import { ClipboardCheck } from 'lucide-react'
import { completeOnboardingTask, uncompleteOnboardingTask } from '../actions'

const ASSIGN_COLORS: Record<string, string> = {
  HR: 'bg-indigo-100 text-indigo-700',
  MANAGER: 'bg-emerald-100 text-emerald-700',
  EMPLOYEE: 'bg-amber-100 text-amber-700',
  IT: 'bg-purple-100 text-purple-700',
}

interface Task {
  id: string
  title: string
  description: string | null
  assignTo: string
  completedAt: string | null
  sortOrder: number
}

interface Props {
  tenantSlug: string
  tasks: Task[]
}

export function OnboardingProgress({ tenantSlug, tasks }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const completed = tasks.filter((t) => t.completedAt).length
  const total = tasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  async function handleToggle(task: Task) {
    setLoading(task.id)
    try {
      const result = task.completedAt
        ? await uncompleteOnboardingTask(tenantSlug, task.id)
        : await completeOnboardingTask(tenantSlug, task.id)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      router.refresh()
    } catch {
      toast.error('Failed to update task')
    } finally {
      setLoading(null)
    }
  }

  return (
    <CardSection title="Onboarding Progress">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">{completed} of {total} tasks complete</span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <label
              key={task.id}
              className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={!!task.completedAt}
                disabled={loading === task.id}
                onChange={() => handleToggle(task)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${task.completedAt ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ASSIGN_COLORS[task.assignTo]}`}>
                    {task.assignTo}
                  </span>
                </div>
                {task.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </CardSection>
  )
}

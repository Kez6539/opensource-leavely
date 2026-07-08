'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/shared'
import { CheckCircle2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { completeGoal, deleteGoal } from '../actions'

interface GoalActionsProps {
  tenantSlug: string
  goalId: string
  showDelete?: boolean
}

export function GoalActions({ tenantSlug, goalId, showDelete }: GoalActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [completeOpen, setCompleteOpen] = useState(false)

  async function handleComplete() {
    setLoading(true)
    try {
      const result = await completeGoal(tenantSlug, goalId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to complete goal')
    } finally {
      setLoading(false)
      setCompleteOpen(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const result = await deleteGoal(tenantSlug, goalId)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      router.push(`/t/${tenantSlug}/performance`)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to delete goal')
    } finally {
      setLoading(false)
      setDeleteOpen(false)
    }
  }

  if (showDelete) {
    return (
      <>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          className="w-full"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete goal
        </Button>
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete goal?"
          description="This will permanently delete this goal and all its update history. This action cannot be undone."
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={handleDelete}
          loading={loading}
        />
      </>
    )
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setCompleteOpen(true)}>
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Complete
      </Button>
      <ConfirmDialog
        open={completeOpen}
        onOpenChange={setCompleteOpen}
        title="Mark as completed?"
        description="This will set the goal progress to 100% and mark it as completed."
        confirmLabel="Complete"
        variant="default"
        onConfirm={handleComplete}
        loading={loading}
      />
    </div>
  )
}

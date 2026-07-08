'use client'

import { useState, useTransition } from 'react'
import { updateBreak } from './actions'
import { Input } from '@/components/ui/input'

interface BreakInputProps {
  entryId: string
  tenantSlug: string
  currentMinutes: number
}

export function BreakInput({ entryId, tenantSlug, currentMinutes }: BreakInputProps) {
  const [value, setValue] = useState(currentMinutes.toString())
  const [isPending, startTransition] = useTransition()

  const handleBlur = () => {
    const mins = parseInt(value, 10)
    if (isNaN(mins) || mins < 0 || mins === currentMinutes) {
      setValue(currentMinutes.toString())
      return
    }
    startTransition(async () => {
      try {
        await updateBreak(tenantSlug, entryId, mins)
      } catch {
        setValue(currentMinutes.toString())
      }
    })
  }

  return (
    <Input
      type="number"
      min={0}
      max={480}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      className="w-20 h-8 text-sm tabular-nums"
      disabled={isPending}
    />
  )
}

'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/shared'
import { updateWorkingPattern, type WorkingPatternDay } from './actions'

const ORDERED_DAYS = [1, 2, 3, 4, 5, 6, 0] // Mon-Sun display order

interface WorkingPatternEditorProps {
  tenantSlug: string
  employeeId: string
  initialPattern: WorkingPatternDay[]
}

export function WorkingPatternEditor({
  tenantSlug,
  employeeId,
  initialPattern,
}: WorkingPatternEditorProps) {
  const [pattern, setPattern] = useState<WorkingPatternDay[]>(initialPattern)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function updateDay(dayOfWeek: number, updates: Partial<WorkingPatternDay>) {
    setPattern((prev) =>
      prev.map((d) => (d.dayOfWeek === dayOfWeek ? { ...d, ...updates } : d))
    )
  }

  function toggleWorkingDay(dayOfWeek: number, checked: boolean) {
    updateDay(dayOfWeek, {
      isWorkingDay: checked,
      startTime: checked ? '09:00' : null,
      endTime: checked ? '17:00' : null,
    })
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    try {
      const result = await updateWorkingPattern(
        tenantSlug,
        employeeId,
        pattern.map((d) => ({
          dayOfWeek: d.dayOfWeek,
          isWorkingDay: d.isWorkingDay,
          startTime: d.startTime,
          endTime: d.endTime,
        }))
      )
      if (!result.ok) {
        setMessage({ type: 'error', text: result.error })
        return
      }
      setMessage({ type: 'success', text: 'Working pattern saved' })
    } catch (e) {
      setMessage({ type: 'error', text: e instanceof Error ? e.message : 'Failed to save' })
    } finally {
      setSaving(false)
    }
  }

  const orderedPattern = ORDERED_DAYS.map((dow) => pattern.find((d) => d.dayOfWeek === dow)!)

  return (
    <CardSection title="Working Pattern">
      <p className="text-sm text-muted-foreground mb-4">
        Set which days this employee works. This affects how leave days are calculated.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 pr-4 font-medium">Day</th>
              <th className="py-2 px-4 font-medium">Working</th>
              <th className="py-2 px-4 font-medium">Start</th>
              <th className="py-2 px-4 font-medium">End</th>
            </tr>
          </thead>
          <tbody>
            {orderedPattern.map((day) => (
              <tr key={day.dayOfWeek} className="border-b last:border-0">
                <td className="py-3 pr-4 font-medium">{day.dayName}</td>
                <td className="py-3 px-4">
                  <Switch
                    checked={day.isWorkingDay}
                    onCheckedChange={(checked) => toggleWorkingDay(day.dayOfWeek, !!checked)}
                  />
                </td>
                <td className="py-3 px-4">
                  {day.isWorkingDay ? (
                    <Input
                      type="time"
                      value={day.startTime || ''}
                      onChange={(e) => updateDay(day.dayOfWeek, { startTime: e.target.value || null })}
                      className="w-28"
                    />
                  ) : (
                    <span className="text-muted-foreground">{'\u2014'}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {day.isWorkingDay ? (
                    <Input
                      type="time"
                      value={day.endTime || ''}
                      onChange={(e) => updateDay(day.dayOfWeek, { endTime: e.target.value || null })}
                      className="w-28"
                    />
                  ) : (
                    <span className="text-muted-foreground">{'\u2014'}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && (
        <div
          className={`mt-4 rounded-md p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mt-4">
        <Button onClick={handleSave} disabled={saving} className="shadow-md shadow-primary/20 font-semibold">
          {saving ? 'Saving...' : 'Save working pattern'}
        </Button>
      </div>
    </CardSection>
  )
}

'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { CardSection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { updateClockInSettings } from '../actions'

interface Props {
  settings: {
    clockInRequireLocation: boolean
    clockInAutoClockOut: boolean
    clockInAutoClockOutTime: string | null
    clockInMinBreak: number
    clockInAllowManualEntry: boolean
  }
  tenantSlug: string
}

export function SettingsTab({ settings, tenantSlug }: Props) {
  const [isPending, startTransition] = useTransition()

  const [requireLocation, setRequireLocation] = useState(settings.clockInRequireLocation)
  const [autoClockOut, setAutoClockOut] = useState(settings.clockInAutoClockOut)
  const [autoClockOutTime, setAutoClockOutTime] = useState(settings.clockInAutoClockOutTime ?? '18:00')
  const [minBreak, setMinBreak] = useState(settings.clockInMinBreak.toString())
  const [allowManualEntry, setAllowManualEntry] = useState(settings.clockInAllowManualEntry)

  function handleSave() {
    startTransition(async () => {
      try {
        await updateClockInSettings(tenantSlug, {
          clockInRequireLocation: requireLocation,
          clockInAutoClockOut: autoClockOut,
          clockInAutoClockOutTime: autoClockOut ? autoClockOutTime : null,
          clockInMinBreak: parseInt(minBreak, 10) || 0,
          clockInAllowManualEntry: allowManualEntry,
        })
        toast.success('Clock-in settings saved')
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed to save settings')
      }
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <CardSection title="Clock-in Settings" description="Configure how employees clock in and out">
        <div className="space-y-6 pt-2">
          {/* Require Location */}
          <div className="flex items-center justify-between gap-4 py-3 border-b">
            <div>
              <Label className="text-sm font-medium">Require location</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Employees must select a location when clocking in
              </p>
            </div>
            <Switch
              checked={requireLocation}
              onCheckedChange={setRequireLocation}
            />
          </div>

          {/* Auto Clock-Out */}
          <div className="flex items-center justify-between gap-4 py-3 border-b">
            <div className="flex-1">
              <Label className="text-sm font-medium">Auto clock-out</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatically clock out employees at end of day if they forget
              </p>
              {autoClockOut && (
                <div className="mt-2">
                  <Label htmlFor="auto-time" className="text-xs text-muted-foreground">
                    Clock-out time
                  </Label>
                  <Input
                    id="auto-time"
                    type="time"
                    value={autoClockOutTime}
                    onChange={(e) => setAutoClockOutTime(e.target.value)}
                    className="w-[130px] h-8 text-sm mt-1"
                  />
                </div>
              )}
            </div>
            <Switch
              checked={autoClockOut}
              onCheckedChange={setAutoClockOut}
            />
          </div>

          {/* Minimum Break */}
          <div className="flex items-center justify-between gap-4 py-3 border-b">
            <div className="flex-1">
              <Label className="text-sm font-medium">Minimum break (minutes)</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Minimum break time required by UK Working Time Regulations (typically 20 minutes for shifts over 6 hours)
              </p>
              <Input
                type="number"
                min={0}
                max={120}
                value={minBreak}
                onChange={(e) => setMinBreak(e.target.value)}
                className="w-[100px] h-8 text-sm mt-2"
                placeholder="0"
              />
            </div>
          </div>

          {/* Allow Manual Entry */}
          <div className="flex items-center justify-between gap-4 py-3 border-b">
            <div>
              <Label className="text-sm font-medium">Allow manual time entry</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Let managers manually add or edit clock-in entries for employees
              </p>
            </div>
            <Switch
              checked={allowManualEntry}
              onCheckedChange={setAllowManualEntry}
            />
          </div>

          {/* Save */}
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </CardSection>
    </div>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CardSection } from '@/components/shared'
import { Timer, Users, Clock, History, MapPin, Settings } from 'lucide-react'
import { ClockButton } from './clock-button'
import { WhosInTab } from './tabs/whos-in-tab'
import { TimesheetsTab } from './tabs/timesheets-tab'
import { HistoryTab } from './tabs/history-tab'
import { LocationsTab } from './tabs/locations-tab'
import { SettingsTab } from './tabs/settings-tab'
import { MyTimesheetCard } from './tabs/my-timesheet-card'

interface ClockStatus {
  id?: string
  clockIn?: string
  clockOut?: string | null
  breakMinutes?: number
  totalHours?: number | null
  notes?: string | null
  employeeId: string
  employeeName: string
}

interface TimesheetEntry {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  breakMinutes: number
  totalHours: number | null
  notes: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WhosInData = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TimesheetsData = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HistoryData = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SettingsData = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocationsData = any

interface Props {
  tenantSlug: string
  isManager: boolean
  isAdmin: boolean
  requireLocation: boolean
  activeTab: string
  clockStatus: ClockStatus | null
  myTimesheet: TimesheetEntry[]
  whosInData: WhosInData
  timesheetsData: TimesheetsData
  historyData: HistoryData
  settingsData: SettingsData
  locationsData: LocationsData
}

export function ClockInsClient({
  tenantSlug,
  isManager,
  isAdmin,
  requireLocation,
  activeTab,
  clockStatus,
  myTimesheet,
  whosInData,
  timesheetsData,
  historyData,
  settingsData,
  locationsData,
}: Props) {
  const router = useRouter()

  const isClockedIn = !!(clockStatus && 'clockIn' in clockStatus && clockStatus.clockIn && !clockStatus.clockOut)

  function handleTabChange(tab: string) {
    const params = new URLSearchParams()
    params.set('tab', tab)
    router.push(`/t/${tenantSlug}/clock-ins?${params.toString()}`)
  }

  // For non-managers, show simplified view
  if (!isManager) {
    return (
      <div className="space-y-6">
        {/* Clock button */}
        {clockStatus ? (
          <CardSection>
            <div className="flex flex-col items-center py-6">
              <ClockButton
                tenantSlug={tenantSlug}
                isClockedIn={isClockedIn}
                clockInTime={clockStatus && 'clockIn' in clockStatus ? clockStatus.clockIn : null}
                requireLocation={requireLocation}
              />
              {isClockedIn && 'clockIn' in clockStatus && clockStatus.clockIn && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Break: {'breakMinutes' in clockStatus ? clockStatus.breakMinutes : 0} mins
                    {clockStatus && 'totalHours' in clockStatus && clockStatus.totalHours !== null && (
                      <span> | Total: {clockStatus.totalHours}h</span>
                    )}
                  </p>
                </div>
              )}
              {'clockOut' in clockStatus && clockStatus.clockOut && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Clocked out at{' '}
                    <span className="font-semibold text-foreground">
                      {new Date(clockStatus.clockOut).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {' '}| Total: {'totalHours' in clockStatus && clockStatus.totalHours !== null ? `${clockStatus.totalHours}h` : '\u2014'}
                  </p>
                </div>
              )}
            </div>
          </CardSection>
        ) : (
          <CardSection>
            <div className="flex flex-col items-center py-8 text-center">
              <Timer className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-medium">No employee record</p>
              <p className="text-sm text-muted-foreground mt-1">You need an employee record linked to your account to use clock-ins.</p>
            </div>
          </CardSection>
        )}

        {/* My timesheet */}
        {clockStatus && (
          <MyTimesheetCard entries={myTimesheet} tenantSlug={tenantSlug} />
        )}
      </div>
    )
  }

  // Manager+ view with tabs
  return (
    <div className="space-y-6">
      {/* Clock button for all users (compact for managers) */}
      {clockStatus && (
        <CardSection>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <ClockButton
                tenantSlug={tenantSlug}
                isClockedIn={isClockedIn}
                clockInTime={clockStatus && 'clockIn' in clockStatus ? clockStatus.clockIn : null}
                requireLocation={requireLocation}
              />
            </div>
            {isClockedIn && 'clockIn' in clockStatus && clockStatus.clockIn && (
              <div className="text-sm text-muted-foreground">
                Break: {'breakMinutes' in clockStatus ? clockStatus.breakMinutes : 0} mins
                {clockStatus && 'totalHours' in clockStatus && clockStatus.totalHours !== null && (
                  <span> | Total: {clockStatus.totalHours}h</span>
                )}
              </div>
            )}
            {'clockOut' in clockStatus && clockStatus.clockOut && (
              <div className="text-sm text-muted-foreground">
                Clocked out at{' '}
                <span className="font-semibold text-foreground">
                  {new Date(clockStatus.clockOut).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {' '}| Total: {'totalHours' in clockStatus && clockStatus.totalHours !== null ? `${clockStatus.totalHours}h` : '\u2014'}
              </div>
            )}
          </div>
        </CardSection>
      )}

      {/* Tabbed interface */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 h-auto p-1 flex-wrap">
          <TabsTrigger value="whos-in" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Who&apos;s In</span>
            <span className="sm:hidden">In</span>
          </TabsTrigger>
          <TabsTrigger value="timesheets" className="gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Timesheets</span>
            <span className="sm:hidden">Time</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            <History className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clock-in History</span>
            <span className="sm:hidden">History</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Locations</span>
            <span className="sm:hidden">Locs</span>
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="settings" className="gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Set</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="whos-in">
          {whosInData ? (
            <WhosInTab data={whosInData} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          )}
        </TabsContent>

        <TabsContent value="timesheets">
          {timesheetsData ? (
            <TimesheetsTab
              data={timesheetsData}
              tenantSlug={tenantSlug}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          )}
        </TabsContent>

        <TabsContent value="history">
          {historyData ? (
            <HistoryTab
              data={historyData}
              tenantSlug={tenantSlug}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          )}
        </TabsContent>

        <TabsContent value="locations">
          {locationsData ? (
            <LocationsTab
              locations={locationsData}
              tenantSlug={tenantSlug}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          )}
        </TabsContent>

        {isAdmin && (
          <TabsContent value="settings">
            {settingsData ? (
              <SettingsTab
                settings={settingsData}
                tenantSlug={tenantSlug}
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

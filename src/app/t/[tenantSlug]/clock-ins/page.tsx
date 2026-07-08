import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { PageHeader } from '@/components/shared'
import {
  getMyClockStatus,
  getMyWeeklyTimesheet,
  getWhosIn,
  getTimesheets,
  getClockHistory,
  getClockInSettings,
  getLocations,
} from './actions'
import { ClockInsClient } from './clock-ins-client'

export default async function ClockInsPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ tab?: string; page?: string; employee?: string; location?: string; startDate?: string; endDate?: string; week?: string }>
}) {
  const { tenantSlug } = await params
  const sp = await searchParams
  const { tenant, membership } = await requireTenant(tenantSlug)
  const isManager = isAtLeast(membership, 'MANAGER')
  const isAdmin = isAtLeast(membership, 'ADMIN')
  const requireLocation = tenant.clockInRequireLocation

  const activeTab = sp.tab ?? 'whos-in'

  // Always fetch clock status for the clock button
  const clockStatus = await getMyClockStatus(tenantSlug)
  const myTimesheet = await getMyWeeklyTimesheet(tenantSlug)

  // Manager-only data, fetched based on active tab
  let whosInData = null
  let timesheetsData = null
  let historyData = null
  let settingsData = null
  let locationsData = null

  if (isManager) {
    if (activeTab === 'whos-in' || activeTab === undefined) {
      whosInData = await getWhosIn(tenantSlug)
    }
    if (activeTab === 'timesheets') {
      timesheetsData = await getTimesheets(tenantSlug, sp.week)
    }
    if (activeTab === 'history') {
      historyData = await getClockHistory(tenantSlug, {
        employeeId: sp.employee,
        locationId: sp.location,
        startDate: sp.startDate,
        endDate: sp.endDate,
        page: sp.page ? parseInt(sp.page, 10) : 1,
      })
    }
    if (activeTab === 'locations') {
      locationsData = await getLocations(tenantSlug)
    }
    if (activeTab === 'settings' && isAdmin) {
      settingsData = await getClockInSettings(tenantSlug)
    }
  }

  return (
    <div>
      <PageHeader
        title="Clock-ins"
        description="Track working hours, view timesheets, and manage clock-in settings"
      />
      <ClockInsClient
        tenantSlug={tenantSlug}
        isManager={isManager}
        isAdmin={isAdmin}
        requireLocation={requireLocation}
        activeTab={activeTab}
        clockStatus={clockStatus}
        myTimesheet={myTimesheet}
        whosInData={whosInData}
        timesheetsData={timesheetsData}
        historyData={historyData}
        settingsData={settingsData}
        locationsData={locationsData}
      />
    </div>
  )
}

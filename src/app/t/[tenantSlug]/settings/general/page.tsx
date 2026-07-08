import { getGeneralSettings } from './actions'
import { GeneralSettingsClient } from './general-settings-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function GeneralSettingsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const settings = await getGeneralSettings(tenantSlug)
  const isAdmin = isAtLeast(membership, 'ADMIN')

  return (
    <GeneralSettingsClient
      tenantSlug={tenantSlug}
      leaveYearStartMonth={settings.leaveYearStartMonth}
      clockInEnabled={settings.clockInEnabled}
      deductBankHolidays={settings.deductBankHolidays}
      hideEmployeeEmails={settings.hideEmployeeEmails}
      hideEmployeeList={settings.hideEmployeeList}
      preventLeaveCancellation={settings.preventLeaveCancellation}
      showWorkingStatus={settings.showWorkingStatus}
      primaryAllowance={settings.primaryAllowance}
      primaryAllowanceUnit={settings.primaryAllowanceUnit}
      bankHolidayCount={settings.bankHolidayCount}
      statutoryMinimumDays={settings.statutoryMinimumDays}
      publicHolidayTerm={settings.publicHolidayTerm}
      countryCode={settings.countryCode}
      logoDataUri={settings.logoDataUri}
      isAdmin={isAdmin}
    />
  )
}

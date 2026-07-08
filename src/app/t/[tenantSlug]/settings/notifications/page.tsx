import { getEmailPreferences, getTenantNotificationSettings } from './actions'
import { getPushSubscriptionStatus } from './push-actions'
import { NotificationsClient } from './notifications-client'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function NotificationsSettingsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)
  const isAdmin = isAtLeast(membership, 'ADMIN')

  const [prefs, pushStatus, tenantNotifications] = await Promise.all([
    getEmailPreferences(tenantSlug),
    getPushSubscriptionStatus(tenantSlug),
    getTenantNotificationSettings(tenantSlug),
  ])

  return (
    <NotificationsClient
      tenantSlug={tenantSlug}
      initialPrefs={prefs}
      initialPushSubscribed={pushStatus.subscribed}
      tenantNotifications={tenantNotifications}
      isAdmin={isAdmin}
    />
  )
}

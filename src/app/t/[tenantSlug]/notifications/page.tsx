import { PageHeader } from '@/components/shared'
import { getAllNotifications } from './actions'
import { NotificationsPageClient } from './notifications-page-client'

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const notifications = await getAllNotifications(tenantSlug)

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="All your notifications in one place"
      />
      <NotificationsPageClient
        tenantSlug={tenantSlug}
        initialNotifications={notifications.map((n) => ({
          ...n,
          createdAt: n.createdAt.toISOString(),
        }))}
      />
    </div>
  )
}

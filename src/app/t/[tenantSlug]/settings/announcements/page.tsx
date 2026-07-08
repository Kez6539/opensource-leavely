import { getAnnouncements } from './actions'
import { AnnouncementsClient } from './announcements-client'

export default async function AnnouncementsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const announcements = await getAnnouncements(tenantSlug)

  return <AnnouncementsClient announcements={announcements} tenantSlug={tenantSlug} />
}

import { getCalendarTokens } from './actions'
import { CalendarSyncClient } from './calendar-sync-client'

export default async function CalendarSyncPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { personalToken, teamToken, canManage, isTrialing } = await getCalendarTokens(tenantSlug)

  const serialise = (
    t: { id: string; token: string; createdAt: Date; lastFetchedAt: Date | null } | null,
  ) =>
    t
      ? {
          id: t.id,
          token: t.token,
          createdAt: t.createdAt.toISOString(),
          lastFetchedAt: t.lastFetchedAt ? t.lastFetchedAt.toISOString() : null,
        }
      : null

  return (
    <CalendarSyncClient
      tenantSlug={tenantSlug}
      personalToken={serialise(personalToken)}
      teamToken={serialise(teamToken)}
      canManage={canManage}
      conversionPromptEnabled={isTrialing}
    />
  )
}

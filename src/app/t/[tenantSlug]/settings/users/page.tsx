import { getMembers, getInvites } from './actions'
import { UsersClient } from './users-client'

export default async function UsersPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const [members, invites] = await Promise.all([
    getMembers(tenantSlug),
    getInvites(tenantSlug),
  ])

  return <UsersClient members={members} invites={invites} tenantSlug={tenantSlug} />
}

import { getAdminUsers } from '../actions'
import { Shield, Ban, CheckCircle2 } from 'lucide-react'
import { DisableUserButton } from './disable-user-button'

const ROLE_STYLES: Record<string, string> = {
  OWNER: 'bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300',
  ADMIN: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300',
  MANAGER: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300',
  EMPLOYEE: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

function formatRelative(date: Date | null): string {
  if (!date) return 'Never'
  const ms = Date.now() - date.getTime()
  const mins = Math.floor(ms / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const users = await getAdminUsers(q)

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Users</h1>

      <form className="mb-4">
        <input
          name="q"
          type="search"
          placeholder="Search by email or name..."
          defaultValue={q}
          className="w-full max-w-sm rounded-lg border px-3 py-2 text-sm"
        />
      </form>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left px-4 py-3 font-medium">User</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Provider</th>
              <th className="text-left px-4 py-3 font-medium">Last login</th>
              <th className="text-left px-4 py-3 font-medium">Joined</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => {
              const isDisabled = !!u.disabledAt
              return (
              <tr key={u.id} className={`hover:bg-muted/20 ${isDisabled ? 'opacity-60' : ''}`}>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{u.name ?? '—'}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {u.isSuperAdmin && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-300 px-2 py-0.5 rounded-full">
                        <Shield className="h-3 w-3" />
                        Super Admin
                      </span>
                    )}
                    {u.memberships.length === 0 && !u.isSuperAdmin && (
                      <span className="text-xs text-muted-foreground">No tenant</span>
                    )}
                    {u.memberships.map((m, i) => (
                      <span
                        key={`${u.id}-${m.tenant.slug}-${i}`}
                        className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                          ROLE_STYLES[m.role] ?? ROLE_STYLES.EMPLOYEE
                        }`}
                        title={m.tenant.name}
                      >
                        {m.role}
                        <span className="ml-1 text-[10px] opacity-70">· {m.tenant.slug}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs rounded-full bg-muted px-2 py-0.5">{u.authProvider}</span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground" title={u.lastLoginAt?.toISOString() ?? ''}>
                  {formatRelative(u.lastLoginAt)}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {u.createdAt.toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3">
                  {isDisabled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 dark:bg-red-950/30 dark:text-red-300 px-2 py-0.5 rounded-full">
                      <Ban className="h-3 w-3" />
                      Disabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <DisableUserButton userId={u.id} userEmail={u.email} isDisabled={isDisabled} />
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No users found.
          </div>
        )}
      </div>
    </div>
  )
}

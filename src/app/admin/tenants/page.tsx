import { getAdminTenants } from '../actions'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function trialDaysLeft(iso: string | null) {
  if (!iso) return null
  const diff = new Date(iso).getTime() - Date.now()
  const days = Math.ceil(diff / (24 * 60 * 60 * 1000))
  if (days < 0) return 'Expired'
  if (days === 0) return 'Today'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  TRIALING: 'bg-blue-50 text-blue-700',
  PAST_DUE: 'bg-amber-50 text-amber-700',
  CANCELED: 'bg-red-50 text-red-700',
  INCOMPLETE: 'bg-gray-100 text-gray-600',
}

export default async function AdminTenantsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const tenants = await getAdminTenants(q)

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Tenants</h1>

      <form className="mb-4">
        <input
          name="q"
          type="search"
          placeholder="Search by name or slug..."
          defaultValue={q}
          className="w-full max-w-sm rounded-lg border px-3 py-2 text-sm"
        />
      </form>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left px-4 py-3 font-medium">Tenant</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Trial</th>
              <th className="text-right px-4 py-3 font-medium">Employees</th>
              <th className="text-right px-4 py-3 font-medium">Members</th>
              <th className="text-right px-4 py-3 font-medium">Signed up</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tenants.map((t) => {
              const trial = t.status === 'TRIALING' ? trialDaysLeft(t.trialEndsAt) : null
              const trialUrgent = trial && (trial === 'Expired' || trial === 'Today' || trial === '1 day left')
              return (
                <tr key={t.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <Link href={`/admin/tenants/${t.id}`} className="flex items-center gap-2 font-medium text-emerald-600 hover:underline">
                      <Building2 className="h-4 w-4" />
                      {t.name}
                    </Link>
                    <span className="text-xs text-muted-foreground font-mono">{t.slug}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[t.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {trial ? (
                      <span className={`text-xs font-medium ${trialUrgent ? 'text-red-600' : 'text-blue-600'}`}>
                        {trial}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">{t.employees}</td>
                  <td className="px-4 py-3 text-right">{t.members}</td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">{timeAgo(t.createdAt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {tenants.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No tenants found.
          </div>
        )}
      </div>
    </div>
  )
}

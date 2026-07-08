import { getAdminDashboard } from './actions'
import { Building2, Users, TrendingUp, Clock, UserPlus, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default async function AdminDashboardPage() {
  const {
    tenantCount,
    userCount,
    signupsThisWeek,
    trialsExpiringSoon,
    activeSubscriptions,
    recentUsers,
    unconvertedLeads,
    totalLeads,
  } = await getAdminDashboard()

  const conversionRate = totalLeads > 0 ? Math.round((tenantCount / totalLeads) * 100) : 0

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Building2} iconBg="bg-indigo-50 text-indigo-600" label="Tenants" value={tenantCount} />
        <KpiCard icon={Users} iconBg="bg-emerald-50 text-emerald-600" label="Users" value={userCount} />
        <KpiCard icon={UserPlus} iconBg="bg-blue-50 text-blue-600" label="Signups this week" value={signupsThisWeek} />
        <KpiCard icon={TrendingUp} iconBg="bg-purple-50 text-purple-600" label="Paying" value={activeSubscriptions} />
      </div>

      {/* Alerts row */}
      {trialsExpiringSoon > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span><strong>{trialsExpiringSoon}</strong> trial{trialsExpiringSoon === 1 ? '' : 's'} expiring in the next 7 days</span>
          <Link href="/admin/tenants" className="ml-auto text-amber-700 underline text-xs font-medium">View</Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent signups */}
        <div className="rounded-xl border">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-sm">Recent Signups</h2>
            <Link href="/admin/users" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>
          </div>
          <div className="divide-y">
            {recentUsers.map((u) => (
              <div key={u.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{u.name ?? u.email}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {u.companyName ? `${u.companyName} · ` : ''}{u.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 ml-3">
                  <span className="rounded-full bg-muted px-2 py-0.5">{u.authProvider}</span>
                  <span>{timeAgo(u.createdAt)}</span>
                </div>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">No users yet.</div>
            )}
          </div>
        </div>

        {/* Hot leads — didn't complete signup */}
        <div className="rounded-xl border">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-sm">
              Hot Leads
              <span className="ml-2 text-xs font-normal text-muted-foreground">Clicked sign up but didn&apos;t finish</span>
            </h2>
            {totalLeads > 0 && (
              <span className="text-xs text-muted-foreground">{conversionRate}% conversion</span>
            )}
          </div>
          <div className="divide-y">
            {unconvertedLeads.map((l) => (
              <div key={l.id} className="px-5 py-3 flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{l.company || l.name || l.email}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {l.company && l.name ? `${l.name} · ` : ''}{l.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-xs text-orange-600 font-medium bg-orange-50 rounded-full px-2 py-0.5">Not converted</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(l.createdAt)}</span>
                </div>
              </div>
            ))}
            {unconvertedLeads.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground/50" />
                No unconverted leads yet. They&apos;ll appear when someone starts the sign-up form but doesn&apos;t finish.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ icon: Icon, iconBg, label, value }: { icon: typeof Building2; iconBg: string; label: string; value: number }) {
  return (
    <div className="rounded-xl border p-5 flex items-center gap-4">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

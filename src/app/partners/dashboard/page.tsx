import { getPartnerDashboard } from '../actions'
import { Building2, Users, TrendingUp, Banknote, Copy, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import Link from 'next/link'
import { CopyButton } from './copy-button'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  TRIALING: 'bg-blue-50 text-blue-700',
  PAST_DUE: 'bg-amber-50 text-amber-700',
  CANCELED: 'bg-red-50 text-red-700',
}

export default async function PartnerDashboardPage() {
  const { partner, stats, referrals, commissions } = await getPartnerDashboard()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-28" />
            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Partner</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">{partner.name}</span>
            <Link href="/" className="text-purple-600 hover:underline text-xs">Back to site</Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Partner Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back, {partner.name}. Here&apos;s how your referrals are performing.
          </p>
        </div>

        {/* Referral link card */}
        <div className="rounded-xl border bg-gradient-to-r from-violet-50 to-purple-50 p-5">
          <p className="text-sm font-medium mb-2">Your referral link</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white rounded-lg border px-4 py-2.5 text-sm font-mono truncate">
              {partner.referralLink}
            </code>
            <CopyButton text={partner.referralLink} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Share this link with clients. They sign up, you earn {Math.round(partner.commissionRate * 100)}% commission every month.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={Building2} iconBg="bg-purple-50 text-purple-600" label="Total Referrals" value={stats.totalReferrals} />
          <KpiCard icon={Users} iconBg="bg-emerald-50 text-emerald-600" label="Active Clients" value={stats.activeClients} />
          <KpiCard icon={TrendingUp} iconBg="bg-blue-50 text-blue-600" label="Monthly Commission" value={`\u00A3${stats.monthlyCommission.toFixed(2)}`} />
          <KpiCard icon={Banknote} iconBg="bg-amber-50 text-amber-600" label="Total Earned" value={`\u00A3${stats.totalEarned.toFixed(2)}`} />
        </div>

        {/* Earnings summary */}
        {(stats.totalPending > 0 || stats.totalPaid > 0) && (
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">Pending payout</p>
              <p className="text-2xl font-bold text-amber-600">{'\u00A3'}{stats.totalPending.toFixed(2)}</p>
            </div>
            <div className="rounded-xl border p-5">
              <p className="text-sm text-muted-foreground">Total paid out</p>
              <p className="text-2xl font-bold text-emerald-600">{'\u00A3'}{stats.totalPaid.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Referred clients */}
          <div className="rounded-xl border">
            <div className="px-5 py-4 border-b">
              <h2 className="font-semibold text-sm">Your Clients</h2>
            </div>
            <div className="divide-y">
              {referrals.map((r) => (
                <div key={r.id} className="px-5 py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.employees} employees</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyles[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {r.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{timeAgo(r.createdAt)}</span>
                  </div>
                </div>
              ))}
              {referrals.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  No referrals yet. Share your link to get started!
                </div>
              )}
            </div>
          </div>

          {/* Commission history */}
          <div className="rounded-xl border">
            <div className="px-5 py-4 border-b">
              <h2 className="font-semibold text-sm">Commission History</h2>
            </div>
            <div className="divide-y">
              {commissions.map((c) => (
                <div key={c.id} className="px-5 py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">{'\u00A3'}{c.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      From {'\u00A3'}{c.revenue.toFixed(2)} revenue &middot; {c.period}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    c.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {c.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              ))}
              {commissions.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Commission will appear here once your clients subscribe.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ icon: Icon, iconBg, label, value }: { icon: typeof Building2; iconBg: string; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-white p-5 flex items-center gap-4">
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

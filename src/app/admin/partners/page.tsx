import { getAdminPartners } from '../actions'
import { Handshake } from 'lucide-react'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default async function AdminPartnersPage() {
  const partners = await getAdminPartners()

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Partners</h1>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left px-4 py-3 font-medium">Partner</th>
              <th className="text-left px-4 py-3 font-medium">Code</th>
              <th className="text-left px-4 py-3 font-medium">Rate</th>
              <th className="text-right px-4 py-3 font-medium">Referrals</th>
              <th className="text-right px-4 py-3 font-medium">Active</th>
              <th className="text-right px-4 py-3 font-medium">Earned</th>
              <th className="text-right px-4 py-3 font-medium">Pending</th>
              <th className="text-right px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {partners.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Handshake className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.company || p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.referralCode}</td>
                <td className="px-4 py-3 text-xs">{Math.round(p.commissionRate * 100)}%</td>
                <td className="px-4 py-3 text-right">{p.totalReferrals}</td>
                <td className="px-4 py-3 text-right">{p.activeClients}</td>
                <td className="px-4 py-3 text-right font-medium">{'\u00A3'}{p.totalCommission.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">
                  {p.pendingCommission > 0 ? (
                    <span className="text-amber-600 font-medium">{'\u00A3'}{p.pendingCommission.toFixed(2)}</span>
                  ) : (
                    <span className="text-muted-foreground">{'\u00A3'}0.00</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">{timeAgo(p.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {partners.length === 0 && (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            No partners yet.
          </div>
        )}
      </div>
    </div>
  )
}

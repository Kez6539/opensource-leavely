import Link from 'next/link'
import { Info } from 'lucide-react'

export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-gray-500 leading-relaxed">
        Some links on this page are partner / affiliate links. If you buy through them we may earn a small commission, at no extra cost to you. Read our full <Link href="/affiliate-disclosure" className="underline hover:text-gray-700">affiliate disclosure</Link>.
      </p>
    )
  }

  return (
    <aside className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm text-amber-900">
      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold mb-1">Affiliate disclosure</p>
        <p className="leading-relaxed">
          Leavely Perks is funded in part by partner commissions. When you click through to a merchant and complete a purchase, the merchant may pay us a small fee — this never costs you more. We only recommend deals we genuinely believe are good value. Read our full <Link href="/affiliate-disclosure" className="underline font-medium">affiliate disclosure</Link> and <Link href="/editorial-guidelines" className="underline font-medium">editorial guidelines</Link>.
        </p>
      </div>
    </aside>
  )
}

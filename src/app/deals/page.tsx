import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_URL } from '@/lib/seo'
import { OFFERS } from '@/lib/perks/data'
import { OfferCard } from '@/components/perks/offer-card'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'

const url = `${SITE_URL}/deals`

export const metadata: Metadata = {
  title: 'Live UK Deals & Discount Codes 2026',
  description:
    'Live UK deals and employee discount codes — refreshed weekly. Gym, tech, fuel, supermarket, fashion, travel and more. No paid placements.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Live UK Deals & Discount Codes 2026',
    description: 'Live UK deals and employee discount codes — refreshed weekly.',
    url,
    type: 'website',
  },
}

function expiryDays(date?: string): number | null {
  if (!date) return null
  const ms = new Date(date).getTime() - Date.now()
  return Math.max(0, Math.round(ms / 86400000))
}

const sortedByExpiry = [...OFFERS].sort((a, b) => {
  if (!a.expires) return 1
  if (!b.expires) return -1
  return new Date(a.expires).getTime() - new Date(b.expires).getTime()
})

const expiringSoon = sortedByExpiry.filter((o) => {
  const d = expiryDays(o.expires)
  return d !== null && d <= 60
})

const newest = [...OFFERS].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 8)

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-3 py-1 text-xs font-semibold text-orange-700 mb-4">
                <Clock className="h-3.5 w-3.5" /> Refreshed weekly
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Live UK deals
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Every active perk in the Leavely directory, sorted by what is newest and what is about to expire. Bookmark this page — it changes every week.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/employee-discounts"><Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 shadow-lg shadow-orange-500/20">Browse by category <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {expiringSoon.length > 0 && (
            <section className="mb-16">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">⏰ Expiring soon</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Last chance offers</h2>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {expiringSoon.map((o) => <OfferCard key={o.id} offer={o} />)}
              </div>
            </section>
          )}

          <section className="mb-16">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">🆕 Just added</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">New this week</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {newest.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">All deals</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {OFFERS.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </section>

          <AffiliateDisclosure />
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}

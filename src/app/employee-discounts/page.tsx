import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, TrendingUp } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_URL } from '@/lib/seo'
import { OFFERS } from '@/lib/perks/data'
import { CATEGORIES } from '@/lib/perks/categories'
import { CategoryGrid } from '@/components/perks/category-grid'
import { FeaturedStrip, TrendingStrip } from '@/components/perks/featured-strip'
import { PerksSearch } from '@/components/perks/perks-search'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'

const url = `${SITE_URL}/employee-discounts`

export const metadata: Metadata = {
  title: 'UK Employee Discounts & Perks 2026',
  description:
    'Hand-picked employee discount codes, perks and benefit deals for UK staff — gym, tech, fuel, supermarket, family days out, mobile phones and more. Updated weekly.',
  alternates: { canonical: url },
  keywords: [
    'employee discounts UK',
    'staff discounts',
    'employee perks',
    'UK employee benefits',
    'employee discount codes',
    'staff perks platform',
  ],
  openGraph: {
    title: 'UK Employee Discounts & Perks 2026',
    description: 'Hand-picked employee discount codes, perks and benefit deals for UK staff. Updated weekly.',
    url,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'UK Employee Discounts & Perks',
  url,
  description: 'Curated employee discounts and perks across gym, tech, fuel, supermarket, fashion, travel, family and wellbeing categories.',
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
}

export default function EmployeeDiscountsPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Updated weekly · {OFFERS.length} live deals
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">
                Employee discounts your team will <span className="text-emerald-600">actually use</span>.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Hand-picked perks, deals and discount codes for UK employees. Gym memberships, tech, fuel, family days out, mobile phones, food delivery and more — all in one editorial directory.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#all-deals">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/20">
                    Browse all deals <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-leavely-perks-works">
                  <Button size="lg" variant="outline">How Leavely Perks works</Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-600" /> No paid placements</div>
                <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-emerald-600" /> Curated by editors</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <FeaturedStrip />

          <section className="mb-12">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Browse by category</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{CATEGORIES.length} perk categories</h2>
              </div>
            </div>
            <CategoryGrid />
          </section>

          <TrendingStrip />

          <section id="all-deals" className="mb-12 scroll-mt-20">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">All deals</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Search every live perk</h2>
              </div>
            </div>
            <PerksSearch offers={OFFERS} />
          </section>

          <AffiliateDisclosure />

          <section className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 p-7 bg-gradient-to-br from-emerald-50 to-white">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For employers</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Roll out a perks portal in an afternoon. Leavely customers get a co-branded perks page that staff log into through their existing leave dashboard — zero extra HR admin.
              </p>
              <Link href="/register" className="text-sm font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1">Start a free trial <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="rounded-2xl border border-gray-200 p-7 bg-gradient-to-br from-blue-50 to-white">
              <h3 className="text-xl font-bold text-gray-900 mb-2">For employees</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Browse, click and save. Every offer here is publicly accessible — no login required to use the codes. You can still ask your employer about Leavely as their HR platform.
              </p>
              <Link href="/guides" className="text-sm font-semibold text-blue-700 hover:underline inline-flex items-center gap-1">Read our guides <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}

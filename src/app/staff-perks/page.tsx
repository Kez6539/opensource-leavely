import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Wallet } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_URL } from '@/lib/seo'
import { OFFERS } from '@/lib/perks/data'
import { OfferCard } from '@/components/perks/offer-card'
import { CategoryGrid } from '@/components/perks/category-grid'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'

const url = `${SITE_URL}/staff-perks`

export const metadata: Metadata = {
  title: 'Staff Perks UK 2026 — Discounts, Wellbeing, Family',
  description:
    'A free staff perks platform for UK businesses. Curated discount codes, wellbeing benefits and family savings, with editorial guides — no paid placements.',
  alternates: { canonical: url },
  openGraph: {
    title: 'Staff Perks UK 2026 — Discounts, Wellbeing, Family',
    description: 'A free staff perks platform for UK businesses. Curated discount codes and editorial guides.',
    url,
    type: 'website',
  },
}

const sample = OFFERS.slice(0, 6)

const pillars = [
  {
    icon: Wallet,
    title: 'Save on the things employees actually buy',
    desc: 'Fuel, mobile, food delivery, weekly shop, gym, kids days out. The deals you would use yourself, all in one place.',
  },
  {
    icon: Heart,
    title: 'Wellbeing benefits that materially affect retention',
    desc: 'Subsidised therapy apps, free DSE eyetests, discounted health checks. Used right, these reduce sickness absence — they pay for themselves.',
  },
  {
    icon: Users,
    title: 'Zero admin for HR',
    desc: 'No portal to maintain, no codes to email out, no negotiated single-merchant deals to renew. The benefits hub updates itself.',
  },
]

export default function StaffPerksPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-white inline-block border border-purple-200 rounded-full px-3 py-1 mb-4">For UK Businesses</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">
                Staff perks that punch above your headcount.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                You do not need 200 employees to offer enterprise-grade perks. Leavely Perks gives every UK business — from a 5-person studio to a 500-person agency — a curated benefits hub their staff genuinely use.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/employee-discounts"><Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20">Browse perks <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                <Link href="/how-leavely-perks-works"><Button size="lg" variant="outline">How it works</Button></Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-7">
                    <Icon className="h-6 w-6 text-purple-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">A taste of the perks library</h2>
            <p className="text-gray-600 mb-8">Six examples from across the catalogue — gym, tech, fuel, food, family. <Link href="/employee-discounts" className="text-purple-700 font-semibold hover:underline">See all {OFFERS.length} →</Link></p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sample.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Browse perks by category</h2>
            <p className="text-gray-600 mb-8">Pick a category — each one is an editorial mini-site.</p>
            <CategoryGrid />
          </section>

          <AffiliateDisclosure />
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}

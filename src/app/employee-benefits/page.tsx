import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_URL } from '@/lib/seo'
import { OFFERS } from '@/lib/perks/data'
import { CategoryGrid } from '@/components/perks/category-grid'
import { OfferCard } from '@/components/perks/offer-card'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'

const url = `${SITE_URL}/employee-benefits`

export const metadata: Metadata = {
  title: 'UK Employee Benefits Platform 2026',
  description:
    'A modern UK employee benefits hub — discounts, perks, wellbeing tools and family savings. Editorial-grade reviews, no paid placements. Updated weekly.',
  alternates: { canonical: url },
  openGraph: {
    title: 'UK Employee Benefits Platform 2026',
    description: 'A modern UK employee benefits hub — discounts, perks, wellbeing tools and family savings.',
    url,
    type: 'website',
  },
}

const featured = OFFERS.filter((o) => o.featured).slice(0, 6)

const stats = [
  { number: `${OFFERS.length}+`, label: 'Live deals' },
  { number: '10', label: 'Categories' },
  { number: 'Weekly', label: 'Editorial review' },
  { number: '£0', label: 'Cost to employees' },
]

const benefits = [
  { title: 'Discount portal', desc: 'A curated directory of employee discount codes covering gym, tech, fuel, food, family, fashion and travel.' },
  { title: 'Wellbeing benefits', desc: 'EAP, counselling apps, sleep tools, eyetests and subsidised therapy — the modern wellbeing stack.' },
  { title: 'Mobile & broadband savings', desc: 'Negotiated business mobile plans and home connectivity perks worth hundreds of pounds a year.' },
  { title: 'Family days out', desc: 'Theme park passes, kidswear, days-out partners and weekend break discounts that retain working parents.' },
  { title: 'Fuel & supermarket', desc: 'The most-used category in any benefits portal. Rewards employees on every payday.' },
  { title: 'Editorial guides', desc: 'Long-form, independent guides explaining what works, what fails, and what is worth the admin overhead.' },
]

export default function EmployeeBenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-white inline-block border border-emerald-200 rounded-full px-3 py-1 mb-4">UK Employee Benefits Platform</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">
                Employee benefits, but actually used.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Most benefits portals look great in onboarding and gather dust forever after. Leavely Perks is a public, editorial-led UK benefits hub. Real deals on the things employees actually buy — fuel, mobile, food, gym, family days out, tech.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/employee-discounts">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20">
                    Browse discounts <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline">Start free trial</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{s.number}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">What&apos;s in the benefits hub</h2>
            <p className="text-gray-600 mb-8">Six pillars, one platform. Everything browsable from a single dashboard.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Featured benefits this month</h2>
            <p className="text-gray-600 mb-8">Editorially picked — the best of the current crop. <Link href="/employee-discounts" className="text-emerald-700 font-semibold hover:underline">See all {OFFERS.length} deals →</Link></p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((o) => <OfferCard key={o.id} offer={o} />)}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Browse by category</h2>
            <p className="text-gray-600 mb-8">Each category is an editorial mini-site with hand-picked deals and an explainer guide.</p>
            <CategoryGrid />
          </section>

          <AffiliateDisclosure />
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Search, Users, ShieldCheck, Star } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_URL } from '@/lib/seo'

const url = `${SITE_URL}/how-leavely-perks-works`

export const metadata: Metadata = {
  title: 'How Leavely Perks Works | Editorial Process & Inclusion Policy',
  description: 'How we choose which UK employee discounts and perks to feature, how merchants get included, and how the directory stays editorially independent.',
  alternates: { canonical: url },
  openGraph: {
    title: 'How Leavely Perks Works | Editorial Process & Inclusion Policy',
    description: 'How we choose which UK employee discounts and perks to feature.',
    url,
    type: 'website',
  },
}

const steps = [
  {
    icon: Search,
    title: '1. Editorial scouting',
    body: 'Our editors monitor major UK retailers, affiliate-network feeds, employee-benefit platforms and reader submissions. We track around 600 active UK consumer brands across the categories employees actually spend money in.',
  },
  {
    icon: ShieldCheck,
    title: '2. Quality and value review',
    body: 'Before a deal goes live we check three things: is the discount genuinely better than the public-facing price; are the terms employee-friendly (single use vs reusable, expiry); and is the merchant reputable. Anything that fails any of the three is rejected.',
  },
  {
    icon: Star,
    title: '3. Editorial decision on inclusion',
    body: 'Inclusion and category placement are decided editorially. A merchant offering a higher commission rate does not earn higher placement. Some featured slots are rotated weekly and some are anchored in place because the offer is the best in its category.',
  },
  {
    icon: Users,
    title: '4. Quarterly re-review',
    body: 'Every offer is re-reviewed at least every 90 days. Expired deals are removed. Reduced or worsened deals are flagged. New deals from existing partners are checked the same way as a brand-new merchant.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-white inline-block border border-emerald-200 rounded-full px-3 py-1 mb-4">Editorial Process</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">How Leavely Perks works.</h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Leavely Perks is a free, public directory of UK employee discounts, perks and benefits. This page is the inside view: who chooses what gets featured, how we make money, and how we stay editorially independent.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/employee-discounts"><Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/20">Browse the directory <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">The four steps every offer goes through</h2>
          <div className="space-y-6 mb-16">
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-2xl border border-gray-200 p-6 flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4">
            <h2>How merchants get featured</h2>
            <p>
              We do not accept paid placements. A merchant cannot pay to be on Leavely Perks, to be featured, or to be ranked higher in a category. The two routes to inclusion are:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Editorial scouting — our team finds the deal independently and proposes it.</li>
              <li>Merchant outreach — a brand pitches us. The pitch is reviewed against the same quality and value bar as anything else.</li>
            </ul>
            <p>
              We earn affiliate commission on outbound clicks that result in a purchase. The commission rate does not influence inclusion or ranking. <Link href="/affiliate-disclosure" className="text-emerald-600 hover:underline font-medium">Read our full affiliate disclosure</Link> for the financial detail.
            </p>

            <h2>How readers can suggest deals</h2>
            <p>
              If you have a discount your employer or a merchant offers and you think it belongs in the directory, email <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link> with the merchant name and a link to the discount page. We aim to respond within five working days.
            </p>

            <h2>Reporting an inaccurate or expired deal</h2>
            <p>
              We do our best to keep the directory current, but offers change without notice. If you find a deal that has expired, changed terms or is otherwise misrepresented, please email <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link>. We typically remove or update inaccurate listings within 48 hours.
            </p>

            <h2>Who runs Leavely Perks?</h2>
            <p>
              Leavely Perks is published by Leavely, a UK leave-management SaaS company. The editorial team is small — a handful of UK-based writers and an editor — and is separated organisationally from the commercial and engineering teams. Editorial decisions are not shared with merchants or commercial partners before publication.
            </p>

            <h2>Want a perks page for your team?</h2>
            <p>
              Leavely customers get a co-branded perks page their staff log into through their existing leave dashboard. There is no extra charge — it is included in our standard per-seat plan. <Link href="/register" className="text-emerald-600 hover:underline font-medium">Start a 14-day free trial</Link> to see it.
            </p>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}

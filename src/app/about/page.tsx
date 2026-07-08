import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  MapPin,
  PoundSterling,
  ShieldCheck,
  CalendarDays,
  MousePointerClick,
  BarChart3,
  MessageSquare,
  Flag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Leavely — Leave Management Software Built for UK Businesses',
  description:
    'Leavely was built to replace spreadsheets and manual leave tracking for small and medium businesses in the UK. Simple, affordable leave management for teams of 5-250.',
  alternates: { canonical: `${SITE_URL}/about` },
  keywords: [
    'about Leavely',
    'leave management software UK',
    'leave management for small business',
    'UK absence management',
    'employee leave tracker UK',
    'holiday tracker for SMBs',
    'simple leave management',
    'affordable leave management software',
  ],
  openGraph: {
    title: 'About Leavely — Leave Management That Just Works',
    description:
      'Simple, affordable leave management software designed for UK teams of 5-250. Replace spreadsheets with one-click approvals, visual calendars, and automatic balance tracking.',
    url: `${SITE_URL}/about`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Leavely',
  description:
    'Leavely is modern leave management software built for UK small and medium businesses.',
  url: `${SITE_URL}/about`,
  isPartOf: { '@type': 'WebSite', name: 'Leavely', url: SITE_URL },
}

const values = [
  {
    icon: Sparkles,
    title: 'Simplicity over complexity',
    description:
      'Leave management should take seconds, not hours. We strip away the bloat so your team can request, approve, and track leave without a training manual.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: MapPin,
    title: 'Built for the UK',
    description:
      'Bank holidays pre-loaded for England, Scotland, Wales, and Northern Ireland. Statutory leave entitlements, Working Time Regulations, and Bradford Factor tracking built in.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: PoundSterling,
    title: 'Fair pricing',
    description:
      'Flat per-employee pricing at £8/user/month. No hidden fees, no premium tiers, no feature gates. Every customer gets everything. Cancel anytime.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    description:
      'Your employee data stays in the UK. Fully GDPR compliant with encrypted connections, hashed passwords, and minimal cookies. No third-party tracking.',
    color: 'from-rose-500 to-pink-600',
  },
]

const highlights = [
  {
    icon: CalendarDays,
    title: 'Visual leave calendar',
    description:
      'See who\'s off at a glance. Filter by department, team, or leave type to spot coverage gaps before they happen.',
  },
  {
    icon: MousePointerClick,
    title: 'One-click approvals',
    description:
      'Managers approve or decline requests in a single click. Employees are notified instantly — no email chains required.',
  },
  {
    icon: BarChart3,
    title: 'Bradford Factor tracking',
    description:
      'Automatically calculate Bradford Factor scores to identify absence patterns and have informed conversations early.',
  },
  {
    icon: MessageSquare,
    title: 'Browser push notifications',
    description:
      'Get instant push notifications for new leave requests, approvals, and team alerts.',
  },
  {
    icon: Flag,
    title: 'Bank holidays pre-loaded',
    description:
      'All UK bank holidays are loaded out of the box for every region. Leave allowances calculate correctly from day one.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
          <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Built for UK businesses that want
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                leave management to just work
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              No more spreadsheets. No more email chains. Leavely gives your team a simple,
              modern way to request, approve, and track leave — so you can focus on running
              your business.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border bg-gradient-to-br from-emerald-50/60 to-teal-50/60 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
              Our mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Leavely was built to replace spreadsheets and manual leave tracking for small and
              medium businesses in the UK. We know that most teams don&apos;t need a complex HR
              platform — they need one thing that works brilliantly: a way to manage who&apos;s
              off and when.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Simple, affordable, and designed for teams of 5&ndash;250. Set up in two minutes,
              not two weeks. Every feature included from day one — because leave management
              shouldn&apos;t come with a feature matrix.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What we believe in
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Every decision we make at Leavely is guided by these principles.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border bg-white p-7 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${v.color} text-white mb-5 shadow-sm`}
                  >
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              What you get with Leavely
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Purpose-built tools for UK leave management — everything your team
              needs from day one.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex gap-4 rounded-xl border bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{h.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to ditch the spreadsheets?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Start your free 14-day trial today. No credit card required — set up your
              workspace in 2 minutes.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg"
                >
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calculator, Calendar, PoundSterling } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

/* ─── SEO Metadata ──────────────────────────────────────────────────── */

const pageUrl = `${SITE_URL}/tools`

export const metadata: Metadata = {
  title: 'Free HR Tools for UK Employers — Calculators & Templates',
  description:
    'Free HR tools for UK businesses. Bradford Factor calculator, pro rata leave calculator, holiday pay calculator, and more. No sign-up required — get instant results.',
  alternates: { canonical: pageUrl },
  keywords: [
    'free HR tools UK',
    'leave calculator UK',
    'Bradford Factor calculator free',
    'pro rata leave calculator',
    'holiday pay calculator UK',
    'notice period calculator UK',
    'HR calculators free',
    'absence management tools',
    'annual leave calculator UK',
    'employee leave tools',
    'free HR calculator',
    'UK employment calculators',
  ],
  openGraph: {
    title: 'Free HR Tools for UK Employers',
    description:
      'Bradford Factor calculator, pro rata leave calculator, and more free HR tools for UK businesses. Instant results, no sign-up required.',
    url: pageUrl,
    type: 'website',
  },
}

/* ─── JSON-LD Structured Data ───────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free HR Tools for UK Employers',
  description:
    'Free HR calculators and templates for UK businesses. Bradford Factor calculator, pro rata leave calculator, holiday pay calculator, and notice period calculator.',
  url: pageUrl,
  isPartOf: {
    '@type': 'WebSite',
    name: 'Leavely',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Leavely',
    url: SITE_URL,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Bradford Factor Calculator',
        url: `${SITE_URL}/tools/bradford-factor-calculator`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pro Rata Leave Calculator',
        url: `${SITE_URL}/tools/pro-rata-leave-calculator`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'HR Software ROI Calculator',
        url: `${SITE_URL}/tools/roi-calculator`,
      },
    ],
  },
}

/* ─── Tool Data ─────────────────────────────────────────────────────── */

const tools = [
  {
    title: 'Bradford Factor Calculator',
    description:
      'Calculate Bradford Factor scores instantly. Enter absence spells and total days to get a colour-coded risk level with recommended HR actions.',
    href: '/tools/bradford-factor-calculator',
    icon: Calculator,
    gradient: 'from-emerald-500 to-teal-600',
    shadowColor: 'shadow-emerald-500/20',
    available: true,
  },
  {
    title: 'Pro Rata Leave Calculator',
    description:
      'Work out holiday entitlement for part-time employees. Supports weekly hours, days per week, and mid-year start dates with UK statutory minimums.',
    href: '/tools/pro-rata-leave-calculator',
    icon: Calendar,
    gradient: 'from-teal-500 to-cyan-600',
    shadowColor: 'shadow-teal-500/20',
    available: true,
  },
  {
    title: 'HR Software ROI Calculator',
    description:
      'Estimate how much time and money Leavely can save by replacing leave spreadsheets, manual approvals, and absence admin.',
    href: '/tools/roi-calculator',
    icon: PoundSterling,
    gradient: 'from-cyan-500 to-sky-600',
    shadowColor: 'shadow-cyan-500/20',
    available: true,
  },
]

// (#146) `comingSoonTools` array deleted along with the marketing
// section that rendered it. Advertising "coming soon" features on a
// public marketing page is a turn-off for prospects evaluating the
// product — we should only ship features we already have.

const popularGuides = [
  {
    title: 'Annual Leave Entitlement UK',
    description: 'Complete guide to statutory and contractual holiday entitlement for UK employees.',
    href: '/blog/annual-leave-entitlement-uk',
  },
  {
    title: 'Sick Leave Policy UK',
    description: 'How to write a compliant sick leave policy, including SSP rates and triggers.',
    href: '/blog/sick-leave-policy-uk',
  },
  {
    title: 'Maternity Leave UK',
    description: 'Everything employers need to know about statutory maternity leave and pay.',
    href: '/blog/maternity-leave-uk',
  },
  {
    title: 'Bradford Factor Explained',
    description: 'What the Bradford Factor is, how to calculate it, and when to use it in your business.',
    href: '/blog/bradford-factor-explained',
  },
  {
    title: 'Leave Policy Template UK',
    description: 'Free downloadable leave policy template tailored for UK small businesses.',
    href: '/blog/leave-policy-template-uk',
  },
  {
    title: 'Bank Holidays UK 2026',
    description: 'Full list of 2026 bank holidays for England, Wales, Scotland, and Northern Ireland.',
    href: '/blog/bank-holidays-uk-2026',
  },
]

/* ─── Page Component ────────────────────────────────────────────────── */

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* ── Hero Section ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />
          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-100/80 px-4 py-1.5 rounded-full mb-6">
              <Calculator className="h-4 w-4" />
              100% Free — No Sign-Up Required
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Free HR Tools for{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                UK Employers
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Instant calculators and templates to help you manage leave, track absences, and stay
              compliant with UK employment law. No account needed.
            </p>
          </div>
        </section>

        {/* ── Active Tools ──────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Calculators
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Get instant answers to common HR questions. Pick a tool and start calculating.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1"
                >
                  <div
                    className={`inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg ${tool.shadowColor} mb-6`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:gap-2.5 transition-all">
                    Use free tool <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* (#146) "Coming Soon" section removed — see comment above
            comingSoonTools deletion in the data block. */}

        {/* ── Popular Guides ────────────────────────────────────────── */}
        <section className="bg-gray-50 border-t border-b">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Popular Guides
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                In-depth articles on UK leave law, absence management, and HR best practices.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 px-8 py-14 md:px-16 md:py-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to automate leave management?
              </h2>
              <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Leavely replaces spreadsheets with a visual leave calendar, one-click approvals,
                and automatic balance tracking. Start your free 14-day trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg shadow-black/10 px-8"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-semibold px-8"
                  >
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="text-emerald-200 text-sm mt-4">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

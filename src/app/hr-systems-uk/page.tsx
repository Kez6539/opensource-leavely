import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Shield,
  Users,
  Calendar,
  BarChart3,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/hr-systems-uk`

export const metadata: Metadata = {
  title: 'HR Systems UK: Best HR Systems for Small Businesses (2026)',
  description:
    'Compare the best HR systems for UK businesses with 5 to 100 employees. Leave management, sickness tracking, Bradford Factor, TOIL, and absence reports. £8/user/month, all features included. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'HR systems',
    'HR systems UK',
    'HR systems for small businesses',
    'best HR systems UK',
    'HR management systems UK',
    'affordable HR systems',
    'HR systems for SMEs UK',
    'small business HR systems',
    'people management systems UK',
    'HR platforms UK',
  ],
  openGraph: {
    title: 'HR Systems for UK Small Businesses — Leavely',
    description:
      'All in one HR systems for 5 to 100 employees. Leave management, sickness tracking, and absence reports. £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Is Leavely a full HR system?',
    a: 'Leavely covers the core HR functions that small and medium UK businesses need most: leave management, sickness absence tracking, Bradford Factor monitoring, return to work forms, TOIL tracking, employee records, and absence reporting. It is designed to replace spreadsheets and basic tools with a proper HR system, without the complexity of enterprise platforms.',
  },
  {
    q: 'How many employees can HR systems like Leavely support?',
    a: 'Leavely is built for businesses with 5 to 100 employees. The system scales smoothly across that range with no performance issues. The pricing stays at £8 per user per month regardless of team size, so a team of 10 pays £80 per month and a team of 50 pays £400 per month.',
  },
  {
    q: 'Do HR systems handle UK employment law requirements?',
    a: 'The best HR systems for the UK include bank holidays, statutory leave entitlements (5.6 weeks for full time employees), pro rata calculations for part time workers, Bradford Factor scoring for sickness management, and carry over rules. Leavely has all of these built in and calculated automatically.',
  },
  {
    q: 'Can an HR system replace our current spreadsheets?',
    a: 'Absolutely. Most of our customers switch from Excel, Google Sheets, or paper based tracking. HR systems like Leavely automate everything that spreadsheets cannot: real time balance calculations, pro rata adjustments, Bradford Factor scoring, approval workflows, team calendars, and absence reporting. Setup takes 2 minutes.',
  },
  {
    q: 'Do I need an HR department to use an HR system?',
    a: 'No. Leavely is designed for businesses that do not have a dedicated HR team. The system is intuitive enough for business owners, office managers, or team leaders to run. Leave calculations, compliance rules, and balance tracking are all handled automatically.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — HR System UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is an HR system built for UK businesses with 5 to 100 employees. Leave management, sickness tracking, Bradford Factor, and absence reports all in one platform.',
      datePublished: '2026-04-06',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly. 14-day free trial included.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@type': 'WebPage',
      datePublished: '2026-04-06',
      dateModified: '2026-04-06',
    },
  ],
}

export default function HRSystemsUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=hr_systems_uk'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <Zap className="h-4 w-4" />
                HR systems for UK businesses
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                HR Systems
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Built for UK Small Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Your business has 5 to 100 employees. You do not need enterprise HR systems with 200 features you will never use. You need something that handles leave, sickness, and absence management properly. That is Leavely.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">5 to 100</p>
                  <p className="text-sm text-gray-500">employees</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All in</p>
                  <p className="text-sm text-gray-500">every feature</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Leavely covers */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                The HR essentials that actually matter
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Enterprise HR systems try to do everything and end up being complex and expensive. Leavely focuses on the core functions that UK small businesses use every single day.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: 'Leave management',
                  description: 'Visual calendar, one click approvals, automatic balance tracking, pro rata, carry over, custom leave types, and UK bank holidays. The complete leave management toolkit.',
                },
                {
                  icon: BarChart3,
                  title: 'Sickness and absence',
                  description: 'Bradford Factor scoring, return to work forms, fit note tracking, trigger point alerts, and absence pattern reporting. Manage sickness absence properly without the admin burden.',
                },
                {
                  icon: Users,
                  title: 'People management',
                  description: 'Employee records, TOIL tracking, document storage, employee onboarding, and self service dashboards. Everything your team needs in one place.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full feature list */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Everything included at £8 per user per month
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Visual team leave calendar',
                'One click leave approvals',
                'Automatic balance tracking',
                'Pro rata for part time employees',
                'UK bank holidays built in',
                'Bradford Factor monitoring',
                'Sick leave and absence tracking',
                'Return to work interview forms',
                'TOIL (time off in lieu) tracking',
                'Carry over rules',
                'Custom leave types',
                'Absence reports and analytics',
                'Employee self service portal',
                'Manager and admin dashboards',
                'Document storage',
                'Employee onboarding',
                'Trigger point alerts',
                'Fit note recording',
                'Multi department support',
                'Audit trail',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-500">
              One plan. One price. Every feature. No tiers, no add ons, no surprises.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Set up your HR system in 2 minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              No demos to book. No sales calls. No implementation projects. Sign up, add your team, and start managing leave and absence properly today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-12">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Who Leavely is for */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              HR systems for every type of UK business
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              Leavely works for any UK business with 5 to 100 employees, across every industry.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                'Professional services',
                'Retail and hospitality',
                'Healthcare and care homes',
                'Construction',
                'Education',
                'Manufacturing',
                'Charities and nonprofits',
                'Technology startups',
                'Accountancy firms',
                'Legal practices',
                'Recruitment agencies',
                'Creative agencies',
              ].map((industry) => (
                <div key={industry} className="flex items-center gap-2 py-2">
                  <Building2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose Leavely */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why UK businesses choose Leavely over other HR systems
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Built specifically for UK businesses', description: 'UK bank holidays, statutory 5.6 weeks entitlement, pro rata for part time, and Bradford Factor scoring are all built in. Leavely understands UK employment law so you do not need to configure complex rules yourself.' },
                { title: 'Affordable and transparent pricing', description: 'At £8 per user per month with every feature included, Leavely is priced for small business budgets. A team of 20 costs £160 per month. A team of 50 costs £400 per month. No setup fees, no annual contract, cancel anytime.' },
                { title: 'No HR expertise required', description: 'You do not need a dedicated HR team to use Leavely. Business owners, office managers, and team leaders can all run the system effectively. Leave calculations, compliance rules, and balance tracking are handled automatically.' },
                { title: 'Replaces spreadsheets and paper', description: 'If you are currently tracking leave with Excel, WhatsApp messages, or paper forms, Leavely replaces all of that with a proper HR system. Automatic calculations, approval workflows, and a team calendar that everyone can access.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white shadow-sm">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              No credit card. No sales calls. No annual contract. Just the HR system your UK business actually needs.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25">
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

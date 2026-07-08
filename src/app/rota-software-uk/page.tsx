import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Calendar,
  Clock,
  Shield,
  Copy,
  AlertTriangle,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/rota-software-uk`

export const metadata: Metadata = {
  title: 'Rota Software UK: Build Staff Rotas in Minutes (2026)',
  description:
    'Build weekly staff rotas in minutes with shift templates, conflict detection, and hours tracking. Leavely combines rota software with leave management so you see the full picture. £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'rota software UK',
    'staff rota software',
    'shift rota software',
    'rota planning software UK',
    'employee rota app',
    'rota management software',
    'shift scheduling software UK',
  ],
  openGraph: {
    title: 'Rota Software UK — Leavely',
    description:
      'Build weekly rotas with shift templates, conflict detection, and leave integration. £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does rota planning work in Leavely?',
    a: 'You create shift templates (e.g. Early 7am to 3pm, Late 2pm to 10pm) and assign them to employees on a weekly calendar view. You can copy a week and paste it forward, drag shifts to reassign them, and see total hours per employee. If someone is on leave that day, Leavely highlights the conflict so you do not accidentally schedule them.',
  },
  {
    q: 'Can I see leave and rotas in one place?',
    a: 'Yes. That is the main advantage of using Leavely for rotas instead of a standalone tool. When you build a rota, you can see who is on leave, who is sick, and who has requested time off. This prevents double-booking and ensures you always have enough cover.',
  },
  {
    q: 'Does Leavely track hours worked?',
    a: 'Yes. Leavely calculates scheduled hours from the rota and also supports clock-in/clock-out via QR code or GPS. You can compare scheduled hours against actual hours and export weekly timesheets as CSV for payroll.',
  },
  {
    q: 'How much does Leavely rota software cost?',
    a: 'Rota planning is included in the standard Leavely price of £8 per user per month. There are no add-on fees for shift scheduling. You also get leave management, time tracking, performance reviews, expenses, and onboarding in the same price.',
  },
  {
    q: 'Can I copy a rota from one week to the next?',
    a: 'Yes. Leavely has a copy-week feature that duplicates the entire rota to the following week. You can then make adjustments for that specific week. This saves significant time for businesses with consistent shift patterns.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Rota Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Rota software for UK businesses. Build weekly staff rotas with shift templates, leave conflict detection, and hours tracking. Part of Leavely HR platform.',
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
  ],
}

const features = [
  {
    icon: Calendar,
    title: 'Weekly rota view',
    description: 'See the full week at a glance. Assign shifts by dragging and dropping. Each employee has a row showing their shifts, leave, and total hours.',
  },
  {
    icon: Copy,
    title: 'Copy week forward',
    description: 'Running the same pattern next week? Copy the entire rota in one click and adjust only what has changed. Saves hours of manual rescheduling.',
  },
  {
    icon: AlertTriangle,
    title: 'Leave conflict detection',
    description: 'If you assign a shift to someone who is on leave, sick, or has a pending request, Leavely flags it immediately. No more accidental double-bookings.',
  },
  {
    icon: Clock,
    title: 'Hours tracking',
    description: 'Leavely calculates total scheduled hours per employee per week. Compare against contracted hours to spot overtime or underscheduling before it becomes a problem.',
  },
  {
    icon: Shield,
    title: 'Shift templates',
    description: 'Create reusable shift templates (Early, Late, Night, Split) with start and end times. Assign them in seconds instead of typing times manually each week.',
  },
  {
    icon: BarChart3,
    title: 'Timesheet export',
    description: 'Export weekly timesheets as CSV for payroll. Includes scheduled hours, actual clock-in/out times, and any adjustments. Ready for your accountant or payroll provider.',
  },
]

export default function RotaSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=rota_software_uk'

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
                Rota software UK
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Rota Software for
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Build weekly staff rotas in minutes using shift templates, drag and drop scheduling, and one-click week copying. Unlike standalone rota tools, Leavely connects your rotas directly to leave management so you always know who is available and who is off.
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
                  <p className="text-3xl font-extrabold text-emerald-600">Rotas</p>
                  <p className="text-sm text-gray-500">+ leave in one tool</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Minutes</p>
                  <p className="text-sm text-gray-500">to build a week</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Everything you need to plan staff rotas
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                No spreadsheets. No WhatsApp messages. Just a clear, visual rota that everyone can access from their phone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why not standalone */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why combine rotas with leave management?
            </h2>
            <div className="space-y-6">
              {[
                { title: 'No more scheduling people who are off', description: 'Standalone rota tools do not know who is on annual leave, who is sick, or who has a pending time-off request. Leavely connects your rota directly to the leave calendar, so conflicts are flagged the moment you create the schedule.' },
                { title: 'One tool instead of three', description: 'Most businesses use a spreadsheet for rotas, a different tool for leave, and email for timesheets. Leavely replaces all three. Your team logs in to one place for their shifts, leave requests, and time tracking.' },
                { title: 'Accurate hours for payroll', description: 'Because Leavely tracks both scheduled shifts and actual clock-in times, you can export a complete weekly timesheet that accounts for leave, overtime, and absences. Your payroll person gets clean data without manual reconciliation.' },
                { title: 'Employees see everything on their phone', description: 'Staff can check next week s rota, request a shift swap, book leave, and clock in from the same mobile interface. No app download required. It works in the browser on any phone.' },
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

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Build your first rota in under 5 minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up for free, create your shift templates, and start scheduling. Rota planning is included in the £8/user/month price alongside leave management, time tracking, and more.
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

        {/* Who it's for */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              Built for shift-based UK businesses
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              If your team works shifts, Leavely is built for you. Here are some of the industries that use our rota software every day.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Hospitality', 'Retail', 'Care homes', 'Healthcare', 'Warehousing', 'Manufacturing', 'Construction', 'Professional services'].map((industry) => (
                <div key={industry} className="rounded-xl border bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50/50 border-y">
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
              Rota software, leave management, time tracking, and more. All for £8 per user per month. No credit card needed to start.
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

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  AlertTriangle,
  FileText,
  Shield,
  TrendingDown,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/absence-management-software-uk`

export const metadata: Metadata = {
  title: 'Absence Management Software UK: Track & Reduce Employee Absence',
  description:
    'Absence management software for UK employers. Bradford Factor monitoring, trigger points, return-to-work interviews, and absence reports. Reduce sickness absence and stay compliant. £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'absence management software UK',
    'absence tracker',
    'absence management system',
    'employee absence software',
    'sickness absence management software',
    'absence tracking software UK',
    'Bradford Factor software',
    'employee absence tracker UK',
  ],
  openGraph: {
    title: 'Absence Management Software for UK Employers — Leavely',
    description:
      'Track and reduce employee absence with Bradford Factor monitoring, trigger points, and return-to-work interviews. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What is the Bradford Factor and how does Leavely calculate it?',
    a: 'The Bradford Factor is a formula used to measure the impact of short-term absence. It is calculated as S x S x D, where S is the number of separate absence spells and D is the total number of days absent. Leavely calculates this automatically for every employee based on their recorded sick leave and updates the score in real time.',
  },
  {
    q: 'Can Leavely send alerts when an employee hits an absence trigger point?',
    a: 'Yes. You can set custom trigger points based on Bradford Factor scores, number of absences, or total days absent. When an employee reaches a threshold, their manager is notified automatically so they can take appropriate action.',
  },
  {
    q: 'Does Leavely support return-to-work interviews?',
    a: 'Yes. When an employee returns from sick leave, Leavely prompts the manager to complete a return-to-work interview. The record is stored against the employee profile as part of their absence history, creating a documented audit trail.',
  },
  {
    q: 'How much does absence management software cost?',
    a: 'Leavely costs £8 per user per month with all features included. There are no tiers, no setup fees, and no annual contracts. The 14-day free trial includes everything with no credit card required.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Absence Management Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Absence management software for UK employers. Bradford Factor monitoring, trigger points, return-to-work interviews, and absence reporting.',
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
  { icon: BarChart3, title: 'Bradford Factor monitoring', description: 'Automatically calculated for every employee. See scores on the dashboard, set trigger thresholds, and identify patterns of short-term absence before they become a problem.' },
  { icon: AlertTriangle, title: 'Trigger point alerts', description: 'Set custom thresholds for Bradford Factor scores, number of absences, or total days off. Managers receive automatic notifications when an employee hits a trigger point.' },
  { icon: FileText, title: 'Return-to-work interviews', description: 'Leavely prompts managers to complete a return-to-work interview when an employee comes back from sick leave. Every record is stored and auditable.' },
  { icon: TrendingDown, title: 'Absence trend reports', description: 'See absence patterns across your organisation. Filter by department, team, or individual. Export reports for board meetings, HR reviews, or occupational health referrals.' },
  { icon: Shield, title: 'Fit note tracking', description: 'Record fit note details, expiry dates, and any workplace adjustments recommended by the GP. Never lose track of when a fit note needs renewing.' },
  { icon: Users, title: 'Department-level visibility', description: 'HR managers see the whole organisation. Line managers see only their direct reports. Employees see only their own records. Role-based access keeps data secure.' },
]

const costData = [
  { label: 'Average cost of absence per employee per year (UK)', value: '£695' },
  { label: 'Average sick days per employee per year (UK)', value: '7.8 days' },
  { label: 'Percentage of absence that is short-term', value: '65%' },
]

export default function AbsenceManagementSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=absence_management_software_uk'

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
                <BarChart3 className="h-4 w-4" />
                Absence management for UK employers
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Absence Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Employers
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Track every absence, spot patterns early, and take action before problems escalate. Leavely gives HR managers the tools to measure, manage, and reduce employee absence across the organisation.
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
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required. £8/user/month after.</p>
            </div>
          </div>
        </section>

        {/* Cost of absence */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                The real cost of unmanaged absence
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Absence costs UK employers billions every year. Most of the impact comes from short-term, frequent absences that go untracked until they become a serious problem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {costData.map((item) => (
                <div key={item.label} className="rounded-2xl border bg-white p-8 text-center shadow-sm">
                  <p className="text-3xl font-extrabold text-emerald-600 mb-2">{item.value}</p>
                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">Source: CIPD Health and Wellbeing at Work survey 2025</p>
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Tools to track, measure, and reduce absence
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature included at £8 per user per month. No tiers, no add-on charges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works for HR */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              How Leavely helps HR managers reduce absence
            </h2>
            <div className="space-y-8">
              {[
                { step: '1', title: 'Record every absence consistently', description: 'When an employee calls in sick, record it in Leavely. The reason, dates, and any supporting documentation are stored against their profile. No more sticky notes or forgotten emails.' },
                { step: '2', title: 'Spot patterns with the Bradford Factor', description: 'Leavely calculates the Bradford Factor automatically. Frequent short-term absences score higher than a single long absence, helping you identify employees who may need support or a formal conversation.' },
                { step: '3', title: 'Act on trigger points', description: 'Set thresholds that align with your absence policy. When an employee crosses a threshold, their manager is notified. This ensures a consistent, fair approach across the whole organisation.' },
                { step: '4', title: 'Document everything', description: 'Return-to-work interviews, fit notes, and management actions are all recorded in Leavely. If a situation ever reaches a disciplinary or tribunal, you have a complete, timestamped record.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Leavely vs alternatives */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why choose Leavely for absence management?
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Purpose-built, not bolted on', description: 'Many HR platforms treat absence tracking as an afterthought. Leavely is built around leave and absence management from the ground up, so every feature is designed with this workflow in mind.' },
                { title: 'Affordable for mid-size teams', description: '£8 per user per month with everything included. Enterprise tools like Personio or HiBob charge 3x to 5x more. Leavely gives you the absence management tools you need without the enterprise price tag.' },
                { title: 'No sales calls, no implementation', description: 'Sign up, add your team, and start using Leavely in minutes. There is no demo requirement, no onboarding project, and no minimum contract length.' },
                { title: 'UK compliance built in', description: 'Statutory sick pay thresholds, fit note tracking, Bradford Factor calculations, and return-to-work interviews are all included and configured for UK employment law.' },
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Start managing absence properly
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Free 14-day trial. No credit card. No sales calls. Set up in 2 minutes.
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
      </main>

      <MarketingFooter />
    </div>
  )
}

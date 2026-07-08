import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Shield,
  AlertTriangle,
  FileText,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/absence-trackers-uk`

export const metadata: Metadata = {
  title: 'Absence Trackers UK: Bradford Factor, Fit Notes & RTW Forms (2026)',
  description:
    'Compare the best absence trackers for UK businesses. Bradford Factor scoring, fit note management, return to work forms, and trigger point alerts. £8/user/month, all features included. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/absence-management-software-uk` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'absence trackers',
    'sickness absence trackers',
    'absence trackers UK',
    'absence tracking tools',
    'Bradford Factor software',
    'absence management trackers',
    'employee absence trackers',
    'sick leave trackers UK',
  ],
  openGraph: {
    title: 'Absence Trackers UK — Leavely',
    description:
      'Bradford Factor scoring, fit note tracking, return to work forms, and trigger point alerts. £8/user/month, all included.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What should absence trackers include?',
    a: 'The best absence trackers include Bradford Factor scoring, fit note management, return to work forms, trigger point alerts, and sickness pattern reporting. Leavely includes all of these at £8 per user per month with no add-ons or premium tiers required.',
  },
  {
    q: 'How do absence trackers calculate the Bradford Factor?',
    a: 'The Bradford Factor is calculated as S x S x D, where S is the number of separate absence spells and D is the total number of days absent. Good absence trackers like Leavely calculate Bradford Factor scores automatically for every employee and update them in real time as sickness absence is recorded.',
  },
  {
    q: 'Can absence trackers send alerts when sickness reaches trigger points?',
    a: 'Yes. With Leavely, you can set trigger points based on Bradford Factor scores, total days absent, or number of absence spells. When an employee reaches a trigger point, the relevant manager is notified so they can take appropriate action such as a welfare meeting or return to work interview.',
  },
  {
    q: 'Do absence trackers support fit notes and return to work forms?',
    a: 'Yes. Leavely includes digital return to work forms that managers can complete after an employee comes back from sickness absence. You can also record fit note details including the dates covered and any workplace adjustments recommended by the GP.',
  },
  {
    q: 'How much do absence trackers cost?',
    a: 'Absence trackers vary widely in price. Many HR platforms charge extra for sickness tracking or lock it behind premium tiers. With Leavely, Bradford Factor, fit notes, return to work forms, and trigger alerts are all included at the standard £8 per user per month price.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Absence Tracker`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is one of the best absence trackers for UK businesses. Bradford Factor scoring, fit note management, return to work forms, and trigger point alerts.',
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

export default function AbsenceTrackersUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=absence_trackers_uk'

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
                Absence trackers
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Absence Trackers
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Track sickness absence properly with the right tools. Leavely is one of the best absence trackers available, giving you Bradford Factor scoring, fit note tracking, return to work forms, and trigger point alerts. All included at £8 per user per month with no extra modules to buy.
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
                  <p className="text-3xl font-extrabold text-emerald-600">Bradford</p>
                  <p className="text-sm text-gray-500">Factor included</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Alerts</p>
                  <p className="text-sm text-gray-500">trigger points</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core sickness features */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What the best absence trackers offer
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Most businesses know they should be tracking sickness absence properly but struggle with the admin. Good absence trackers automate the entire process so nothing falls through the cracks.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Bradford Factor scoring',
                  description: 'Automatically calculated for every employee. Scores update in real time as sickness is recorded. Set thresholds to flag employees who need attention.',
                },
                {
                  icon: FileText,
                  title: 'Return to work forms',
                  description: 'Digital return to work interviews that managers can complete when an employee comes back. Record the reason for absence, any ongoing issues, and actions agreed.',
                },
                {
                  icon: AlertTriangle,
                  title: 'Trigger point alerts',
                  description: 'Set trigger points based on absence frequency, total days, or Bradford Factor score. Managers receive notifications when employees hit a threshold so they can intervene early.',
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
              Complete absence tracking in one tool
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Bradford Factor scoring (automatic)',
                'Return to work interview forms',
                'Fit note recording and tracking',
                'Trigger point alerts for managers',
                'Short term sickness tracking',
                'Long term sickness monitoring',
                'Absence pattern detection',
                'Sickness absence reports',
                'Self certification recording',
                'Absence reason categorisation',
                'Manager notifications on sick calls',
                'Full absence history per employee',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-500">
              All included at £8 per user per month. No add ons. No higher tiers.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Start using a proper absence tracker today
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Set up in 2 minutes. Bradford Factor, fit notes, return to work forms, and trigger alerts are all ready to use from day one.
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

        {/* Why choose Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why businesses choose Leavely over other absence trackers
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Bradford Factor without the spreadsheet', description: 'Bradford Factor calculations are complex when done manually. Leavely calculates them automatically for every employee and updates scores in real time. You see the numbers instantly without maintaining formulas.' },
                { title: 'Catch patterns before they become problems', description: 'Trigger point alerts notify managers when an employee hits a sickness threshold. This allows you to have welfare conversations early, before patterns become entrenched and before the impact on your business grows.' },
                { title: 'Proper return to work process', description: 'Digital return to work forms ensure every absence is properly documented. Record the reason, any support needed, and actions agreed. This creates a clear audit trail if you ever need to escalate.' },
                { title: 'All included, no extra cost', description: 'Many HR systems charge extra for sickness absence features or lock them behind premium tiers. With Leavely, Bradford Factor, fit notes, return to work forms, and trigger alerts are all included at £8 per user per month.' },
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
              No credit card. No sales calls. No annual contract. Just proper absence tracking for your business.
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

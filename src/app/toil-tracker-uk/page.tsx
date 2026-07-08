import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, FileText, AlertTriangle, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/toil-tracker-uk`

export const metadata: Metadata = {
  title: 'TOIL Tracker UK: Time Off In Lieu Software & Employer Guide 2026',
  description:
    'Track Time Off In Lieu (TOIL) properly across your UK team. What TOIL is, when employers must offer it, the law on accrual + expiry, and how to manage it without spreadsheets. £8/user/month, 14-day free trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'TOIL tracker',
    'time off in lieu UK',
    'TOIL software',
    'TOIL policy UK',
    'TOIL rules UK employer',
    'time off in lieu tracker',
    'TOIL agreement UK',
    'TOIL government website',
    'TOIL in deputy alternative',
    'TOIL accrual rules UK',
  ],
  openGraph: {
    title: 'TOIL Tracker UK — Time Off In Lieu Software',
    description: 'Track TOIL across your team. UK employer guide + £8/user/month software with no spreadsheets.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What is TOIL (Time Off In Lieu) under UK employment law?',
    a: 'TOIL is paid time off given to an employee in exchange for extra hours worked, instead of overtime pay. It is not a statutory entitlement in the UK — TOIL only exists if the employment contract or company policy provides for it. Where TOIL is offered, it must be tracked accurately so the employee can take the time they have earned.',
  },
  {
    q: 'Is an employer required to offer TOIL in the UK?',
    a: 'No. There is no UK law requiring employers to offer TOIL. However, if your contract or staff handbook says employees can earn TOIL, you must honour it. Most UK employers offer TOIL because it controls overtime costs while still recognising extra hours worked.',
  },
  {
    q: 'How does TOIL accrual work?',
    a: 'TOIL is usually accrued hour-for-hour: an employee works one extra hour, they earn one hour of paid time off. Some employers offer enhanced TOIL rates (1.5x or 2x) for weekend or out-of-hours work, mirroring overtime rates. The exact rate must be defined in your TOIL policy.',
  },
  {
    q: 'Does TOIL expire if not taken?',
    a: 'Most TOIL policies set an expiry window — commonly 3 months from the date the time was earned. After that, the unused TOIL is forfeited. Set this clearly in your policy or you risk an employee accumulating large balances they later expect to be paid out for.',
  },
  {
    q: 'How do you track TOIL without spreadsheets?',
    a: 'Use a TOIL tracker that lets employees log extra hours, requires manager approval, automatically adds the time to their TOIL balance, and lets them book it back as time off. Leavely handles the full cycle in one place at £8 per user per month.',
  },
  {
    q: 'Can TOIL be paid out instead of taken as time off?',
    a: 'Only if your policy specifically allows it. By default TOIL is meant to be time off, not money. If you allow buy-out, set the rules clearly: who can request it, the rate, and the deadline.',
  },
  {
    q: 'Does TOIL count toward Working Time Regulations rest entitlements?',
    a: 'Yes. The hours an employee works to earn TOIL still count toward the 48-hour weekly working time average. If staff regularly accrue TOIL, check that their average working week is not exceeding 48 hours unless they have signed an opt-out.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — TOIL Tracker`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Leavely is a Time Off In Lieu (TOIL) tracker for UK businesses. Hour-for-hour accrual, manager approval, expiry rules, and TOIL booking in one place.',
      datePublished: '2026-05-15',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    },
    { '@type': 'WebPage', datePublished: '2026-05-15', dateModified: '2026-05-15', url: pageUrl },
  ],
}

export default function TOILTrackerPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=toil_tracker'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-indigo-100/40 to-purple-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-4 py-1.5 text-sm text-indigo-700 font-medium mb-6">
                <Clock className="h-4 w-4" />
                TOIL tracker
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Time Off In Lieu
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">tracking that actually works</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Stop tracking TOIL on a spreadsheet that nobody updates. Leavely lets staff log extra hours, gets manager approval, adds the time to their TOIL balance, and lets them book it back — all at £8 per user per month.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">Book a demo</Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-indigo-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-indigo-600">Hour-for-hour</p>
                  <p className="text-sm text-gray-500">or custom rate</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-indigo-600">Auto expiry</p>
                  <p className="text-sm text-gray-500">no rolling debt</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">What TOIL actually is, and why most policies leak</h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Time Off In Lieu is paid time off given in exchange for extra hours worked, instead of overtime pay. It is not a statutory entitlement — it only exists if your contract or staff handbook says it does. The leak is in the tracking.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: BarChart3, title: 'Hour-for-hour accrual', description: 'Staff log extra time worked. Manager approves. Time lands in their TOIL balance automatically. No two systems, no email approvals, no double-counting.' },
                { icon: AlertTriangle, title: 'Expiry rules built in', description: 'Set a 3-month or 6-month expiry on accrued TOIL. Balances expire automatically — no employee accumulates 80 hours then asks for a payout.' },
                { icon: FileText, title: 'Booked like normal leave', description: 'When staff want to use TOIL, they book it through the same calendar as their annual leave. Manager sees it. Payroll sees it. Nothing slips.' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <f.icon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">UK TOIL rules every employer should know</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">It is not statutory — write it down</h3>
                <p>UK law does not require you to offer TOIL. But if your contract, handbook or even consistent custom and practice creates an expectation that staff can earn TOIL, courts will treat it as a contractual term. Decide your policy and put it in writing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Accrual rate is up to you</h3>
                <p>Most UK employers offer hour-for-hour TOIL: 1 hour worked extra = 1 hour off. Some pay enhanced TOIL (1.5x or 2x) for weekend or unsocial hours, mirroring overtime rates. State the rate clearly per hours worked at different times.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Set an expiry window</h3>
                <p>Without an expiry, TOIL balances grow forever. The standard practice is 3 months from the date the time was earned. Some employers use 6 months. After that, the time is lost. This protects the business and motivates staff to take the time off.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">It still counts toward the 48-hour week</h3>
                <p>The hours an employee works to earn TOIL count toward their average working time under the Working Time Regulations 1998. If staff regularly accrue TOIL, check that no one is averaging over 48 hours per week without a signed opt-out.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Buy-out should be the exception</h3>
                <p>TOIL is meant to be time off, not extra pay. If you allow buy-out (paying for unused TOIL), set strict rules: who can request it, at what rate, and by when. Otherwise it becomes a way for staff to demand cash for time they should have taken.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-lg border border-gray-200 p-5">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Get TOIL out of the spreadsheet</h2>
            <p className="text-lg text-gray-500 mb-8">All the leave types your team needs in one place. Annual leave, sickness, TOIL, parental — £8 per user per month, 14-day free trial.</p>
            <Link href={registerUrl}>
              <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/leave-management-small-business`

export const metadata: Metadata = {
  title: 'Leave Management for Small Business UK: Simple, Affordable, Powerful',
  description:
    'Leave management software built for small businesses. Set up in 2 minutes, £8/user/month, no HR department required. Track holidays, sick leave, and absences without the complexity. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/leave-management-software-uk` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'leave management small business',
    'small business leave tracker',
    'SMB leave management',
    'holiday management small business',
    'leave management for small business UK',
    'small business holiday tracker',
    'simple leave management',
    'affordable leave management',
  ],
  openGraph: {
    title: 'Leave Management for Small Business UK — Leavely',
    description:
      'Set up in 2 minutes, £8/user/month. No HR department required. Track holidays, sick leave, and absences without the complexity.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Is Leavely really suitable for small businesses?',
    a: 'Yes. Leavely is built specifically for UK businesses with 5 to 100 employees. You do not need an HR department or any technical knowledge to get started. The setup takes under 2 minutes, and your team can start requesting leave immediately.',
  },
  {
    q: 'How much does Leavely cost for a small business?',
    a: 'Leavely is £8 per user per month, all features included. For a team of 10, that is £80 per month. There are no setup fees, no annual contracts, and no hidden charges. You can cancel anytime from your account settings.',
  },
  {
    q: 'Can I use Leavely without an HR department?',
    a: 'Absolutely. Most of our customers do not have a dedicated HR team. The business owner or office manager typically acts as the admin. Leavely handles the leave calculations, balance tracking, and compliance automatically so you do not need HR expertise.',
  },
  {
    q: 'What if I currently use spreadsheets to track leave?',
    a: 'Many small businesses start with spreadsheets and switch to Leavely when the spreadsheet becomes hard to maintain. Leavely automates everything that spreadsheets cannot: automatic balance calculations, pro rata adjustments, bank holiday handling, approval workflows, and team calendar views. Setup takes 2 minutes.',
  },
  {
    q: 'Does Leavely handle UK employment law requirements?',
    a: 'Yes. Leavely includes UK bank holidays, statutory leave entitlements (5.6 weeks for full time), pro rata calculations for part time employees, Bradford Factor monitoring for sickness absence, and carry over rules. All of this is built in and automatic.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Leave Management for Small Business`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is leave management software built for small businesses. Set up in 2 minutes, £8/user/month, no HR department required.',
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
      datePublished: '2026-04-05',
      dateModified: '2026-04-05',
    },
  ],
}

export default function LeaveManagementSmallBusinessPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=leave_management_small_business'

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
                Built for small businesses
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Leave Management
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Built for Small Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Your small business does not need enterprise HR software. You need something simple that just works. Leavely sets up in 2 minutes, costs £8 per user per month, and requires no HR department to run.
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
                  <p className="text-3xl font-extrabold text-emerald-600">2 min</p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Zero</p>
                  <p className="text-sm text-gray-500">HR expertise needed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems small businesses face */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Stop managing leave with spreadsheets and WhatsApp messages
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Small businesses waste hours every month tracking leave manually. Missed messages, double bookings, and incorrect balances cause real problems. Leavely fixes all of this.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: 'One calendar for everything',
                  description: 'See who is off at a glance. No more checking multiple spreadsheets or asking around. The team calendar shows all leave, sickness, and company holidays in one view.',
                },
                {
                  icon: Clock,
                  title: 'Automatic balance tracking',
                  description: 'Leavely calculates remaining holiday allowances automatically. Pro rata for part time, carry over, bank holidays, and TOIL are all handled without you lifting a finger.',
                },
                {
                  icon: Users,
                  title: 'Self-service for your team',
                  description: 'Employees request leave themselves. Managers approve with one click. No emails, no WhatsApp messages, no paper forms. Everyone can see their own balance anytime.',
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

        {/* What you get */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Everything a small business needs, nothing it does not
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Visual team leave calendar',
                'One-click leave approvals',
                'Automatic holiday balance tracking',
                'Pro rata calculations for part time staff',
                'UK bank holidays built in',
                'Sick leave and absence recording',
                'Bradford Factor sickness monitoring',
                'TOIL (time off in lieu) tracking',
                'Return to work forms',
                'Shift rota management',
                'Employee clock in and out',
                'Expense management',
                'Performance reviews',
                'Document storage',
                'Employee onboarding',
                'Absence reports and analytics',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-500">
              All features included at £8 per user per month. No tiers, no add ons, no hidden costs.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Set up your leave management in 2 minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              No demos to book. No sales calls. No contracts. Sign up, add your team, and start managing leave properly today.
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

        {/* Why small businesses choose Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why small businesses choose Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'No HR expertise required', description: 'Leavely is designed to be used by business owners and office managers who do not have an HR background. The system handles leave calculations, statutory entitlements, and compliance rules automatically.' },
                { title: 'Affordable and transparent', description: 'At £8 per user per month with no setup fees or annual contracts, Leavely is priced for small business budgets. A team of 10 costs £80 per month. A team of 25 costs £200 per month. The price per user never changes.' },
                { title: 'Replace spreadsheets instantly', description: 'If you are currently tracking leave in Excel, Google Sheets, or paper diaries, you can switch to Leavely in minutes. Set your leave year start date and allowances, add your team, and everything is calculated from there.' },
                { title: 'Grows with your business', description: 'Start with 5 employees and scale to 100 without changing plans or renegotiating pricing. Every feature is available from day one. When you add a new employee, they automatically get the right leave allowance.' },
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
              No credit card. No sales calls. No annual contract. Just simple leave management for your small business.
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

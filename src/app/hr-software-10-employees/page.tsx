import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  Zap,
  Calendar,
  Clock,
  Shield,
  Users,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/hr-software-10-employees`

export const metadata: Metadata = {
  title: 'HR Software for 10 Employees UK: What You Actually Need (2026)',
  description:
    'HR software for teams of 10 employees. Leave tracking, team calendar, sick absence monitoring, and basic onboarding at £80/month total. No enterprise complexity needed.',
  alternates: { canonical: pageUrl },
  keywords: [
    'HR software 10 employees',
    'HR software for small teams',
    'HR software 5-20 employees',
    'small team HR',
    'HR software small business UK',
    'leave management 10 employees',
  ],
  openGraph: {
    title: 'HR Software for 10 Employees UK — Leavely',
    description:
      'Leave tracking, team calendar, sick absence monitoring. £80/month total for 10 employees. No enterprise overhead.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'At what point do you need HR software?',
    a: 'Most businesses hit the tipping point at around 5 to 10 employees. That is when tracking leave on a spreadsheet starts breaking, sick absences get forgotten, and onboarding new hires becomes chaotic. If you are spending more than 30 minutes a week managing leave and attendance manually, HR software will save you time and reduce mistakes.',
  },
  {
    q: 'Is Leavely worth it for just 10 employees?',
    a: 'At £80 per month total (£8 per user), Leavely replaces your leave spreadsheet, WhatsApp absence messages, paper forms, and manual onboarding checklists. For the cost of a single team lunch, you get a professional HR system that works on any device. Most businesses see a return in the first week through time saved alone.',
  },
  {
    q: 'Will I outgrow Leavely as my team grows?',
    a: 'Leavely works for teams from 2 to 200 employees. As you grow from 10 to 20 to 50, you do not need to switch to a different platform. The price stays at £8 per user per month and every feature is available regardless of team size. There are no per-tier limits or upgrade gates.',
  },
  {
    q: 'What features does a team of 10 actually need?',
    a: 'For a team of 10, the essentials are: leave tracking with a visual calendar, one-click approvals, sick absence recording, bank holiday management, and a simple onboarding checklist for new hires. Leavely covers all of these and also includes rotas, time tracking, performance reviews, and expenses if you need them later.',
  },
  {
    q: 'How quickly can I set up Leavely for 10 people?',
    a: 'You can have your entire team set up in under 15 minutes. Sign up (2 minutes), add your leave policies (5 minutes), and add your 10 employees (5 to 10 minutes). Employees receive an invite email and can start using the system immediately.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — HR Software for 10 Employees`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'HR software designed for teams of 10 employees. Leave tracking, team calendar, sick absence monitoring, and onboarding at £80 per month total.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly. £80/month for 10 employees. 14-day free trial included.',
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

export default function HRSoftware10EmployeesPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=hr_software_10_employees'

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
                HR for small teams
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                HR Software for Teams of
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  10 Employees
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                At 10 employees, you have outgrown the spreadsheet but you do not need enterprise HR. What you actually need is leave tracking, a team calendar, sick absence monitoring, and basic onboarding. That is exactly what Leavely does, at £80 per month total for your whole team.
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
                  <p className="text-3xl font-extrabold text-emerald-600">£80</p>
                  <p className="text-sm text-gray-500">per month (10 users)</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">15 min</p>
                  <p className="text-sm text-gray-500">to set up</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All</p>
                  <p className="text-sm text-gray-500">features included</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What you need at 10 employees */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What a team of 10 actually needs from HR software
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                You do not need payroll integration, AI analytics, or compensation benchmarking. You need these four things working reliably.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Calendar,
                  title: 'Leave tracking with a team calendar',
                  description: 'See who is off this week at a glance. Employees request leave in one click, managers approve it, and balances update automatically. No more spreadsheet formulas or email chains.',
                },
                {
                  icon: Shield,
                  title: 'Sick absence monitoring',
                  description: 'Record sick days, track patterns with the Bradford Factor, and know when someone s absence level needs a conversation. Leavely handles return-to-work forms too.',
                },
                {
                  icon: ClipboardList,
                  title: 'Simple onboarding checklists',
                  description: 'When you hire employee number 11 or 12, have a checklist ready: send contract, set up payroll, order equipment, schedule induction. Never forget a step again.',
                },
                {
                  icon: Users,
                  title: 'Employee directory',
                  description: 'A single place with everyone s contact details, start dates, job titles, and reporting lines. Beats the shared Google Sheet that nobody updates.',
                },
              ].map((feature) => (
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

        {/* Spreadsheet vs Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Spreadsheet vs Leavely: what changes for a team of 10
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Before Leavely (the spreadsheet life)</h3>
                <ul className="space-y-3">
                  {[
                    'Employees email or message you to request leave',
                    'You check a spreadsheet to see if dates clash',
                    'You manually update the spreadsheet after approving',
                    'Sick days get forgotten or recorded inconsistently',
                    'New starters miss steps because there is no checklist',
                    'Nobody knows their remaining leave balance',
                    'You spend 2+ hours per week on admin',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">After Leavely</h3>
                <ul className="space-y-3">
                  {[
                    'Employees request leave from their phone',
                    'You see the team calendar and approve in one click',
                    'Balances update automatically',
                    'Sick days are recorded with Bradford Factor tracking',
                    'Onboarding checklists ensure nothing is missed',
                    'Everyone can check their own balance anytime',
                    'HR admin takes minutes, not hours',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              £80 per month for your whole team
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              That is £8 per employee per month for leave tracking, team calendar, sick absence monitoring, onboarding, and more. Less than the cost of a single team lunch.
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

        {/* What you also get */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              You also get these features at no extra cost
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              You might not need all of these today, but they are included when you do. No upgrade required.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Rota and shift planning', description: 'If your team works shifts, build weekly rotas with shift templates and conflict detection. See rotas and leave in one view.' },
                { title: 'QR code and GPS clock-in', description: 'Track actual hours worked with phone-based clock-in. Export timesheets for payroll. No hardware needed.' },
                { title: 'Performance reviews', description: 'Run quarterly or annual review cycles with star ratings, written feedback, and goal tracking. Auto-assign reviewers based on your org structure.' },
                { title: 'Expense management', description: 'Employees submit expenses with receipt photos. Managers approve them. Export for reimbursement. Simple.' },
                { title: 'Document management', description: 'Store contracts, handbooks, and policies. Assign documents to employees. Track who has read what.' },
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
              Set up your team of 10 in under 15 minutes. No credit card needed. Cancel anytime.
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

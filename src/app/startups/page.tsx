import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Shield,
  Users,
  Percent,
  Building2,
  Zap,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/startups`

export const metadata: Metadata = {
  title: 'Startup Pricing — 25% Off Leave Management Software for UK Startups',
  description:
    'Leavely backs UK startups with 25% off leave management software. Just £6/user/month for startups under 10 employees in their first 2 years. Track leave, manage absences, and get HR right from day one. Companies House number optional.',
  alternates: { canonical: pageUrl },
  keywords: [
    'startup leave management software',
    'startup HR software UK',
    'small business leave tracker',
    'startup absence management',
    'startup staff management software',
    'startup discount HR software',
    'leave management for startups',
    'affordable HR software startups',
    'early stage business absence tracker UK',
    'startup employee management',
  ],
  openGraph: {
    title: 'Startup Pricing — 25% Off for UK Startups',
    description:
      '25% off for UK startups. Just £6/user/month — all features included. Leave management built for businesses starting out.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Pricing — 25% Off for UK Startups',
    description:
      '25% off for UK startups. Just £6/user/month — all features included. Leave management built for businesses starting out.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} for Startups`,
      url: pageUrl,
      description:
        'Leavely startup pricing — 25% off leave management software for UK startups under 10 employees in their first 2 years.',
    },
    {
      '@type': 'Product',
      name: `${SITE_NAME} Startup Plan`,
      description:
        'Leave management software for UK startups at 25% off. £6 per user per month.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '6.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 25% startup discount. Under 10 employees, under 2 years old, UK-based.',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who qualifies for the startup discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'UK-based startups with fewer than 10 employees that are in their first 2 years of trading. Companies House number is optional — pre-incorporation startups can also apply.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for startups?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Startups pay £6 per user per month — 25% off the standard £8/user/month price. All features are included, no tiers or hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do startups get the same features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Startup accounts get full access to every Leavely feature — leave calendar, approvals, TOIL tracking, Bradford Factor, document management, reports, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens when we grow past 10 employees?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You move to the standard £8/user/month pricing. There is no disruption to your account — your data, settings, and policies all stay exactly as they are.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a Companies House number?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Companies House number is optional. We understand that some startups are pre-incorporation or operate as sole traders. We verify eligibility on a case-by-case basis.',
          },
        },
      ],
    },
  ],
}

const benefits = [
  {
    icon: Percent,
    title: '25% off — just £6/user/month',
    desc: 'Enterprise-grade leave management at a price that makes sense for your runway.',
  },
  {
    icon: Zap,
    title: 'Set up in 2 minutes',
    desc: 'No lengthy onboarding. Add your team, configure policies, and you\'re live. It really is that fast.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant from day one',
    desc: 'Built-in compliance so you don\'t have to bolt it on later. Full audit trail included.',
  },
  {
    icon: Users,
    title: 'Grow into full pricing',
    desc: 'Start at £6, move to £8 when you scale past 10 employees. No cliffs, no surprises.',
  },
]

const included = [
  'Visual leave calendar',
  'One-click leave approvals',
  'Automatic balance tracking',
  'Employee profiles & directory',
  'Custom leave policies',
  'UK public holidays built in',
  'TOIL (time off in lieu) tracking',
  'Bradford Factor monitoring',
  'Return-to-work forms',
  'Sick leave & absence tracking',
  'Role-based access control',
  'Company-wide leave blocks',
  'Email notifications',
  'Full audit trail',
  'Document management',
  'Team invitations via email',
  'GDPR compliant',
  'Email support',
  'Reports & analytics',
]

const steps = [
  {
    step: '1',
    title: 'Sign up for a free trial',
    desc: 'Start your 14-day free trial — no credit card required.',
  },
  {
    step: '2',
    title: 'Tell us you\'re a startup',
    desc: 'Let us know your company details during setup. Companies House number is optional.',
  },
  {
    step: '3',
    title: 'Get 25% off automatically',
    desc: 'Once verified, your plan drops to £6/user/month. All features included.',
  },
]

export default function StartupsPage() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 via-white to-white" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700 mb-6">
                <Rocket className="h-4 w-4" />
                Backing UK Startups
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Get HR right
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  from day one.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                UK startups get <strong className="text-gray-900">25% off</strong> Leavely.
                Just <strong className="text-gray-900">£6/user/month</strong> — all features included.
                Proper leave management without the enterprise price tag.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register?utm_campaign=startup">
                  <Button
                    size="lg"
                    className="text-base font-semibold h-12 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25"
                  >
                    Start free for 14 days
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  Companies House number optional
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="border-y bg-gray-50/50">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">25%</p>
                <p className="text-sm text-gray-500 mt-1">Off for eligible UK startups</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">£6</p>
                <p className="text-sm text-gray-500 mt-1">Per user per month, all features</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">800k+</p>
                <p className="text-sm text-gray-500 mt-1">Startups in the UK right now</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why we do this */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Startups drive UK innovation.
                <br />
                <span className="text-indigo-600">We want to fuel yours.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Over 800,000 startups launch in the UK every year. They create jobs, challenge
                the status quo, and build the products and services that shape our future. But
                in those early days, every pound matters.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Getting HR right from the start isn&apos;t a nice-to-have — it&apos;s how you
                build a team that lasts. But you shouldn&apos;t need enterprise budgets to track
                leave properly. That&apos;s why every eligible UK startup gets{' '}
                <strong>25% off Leavely</strong> while you&apos;re finding your feet.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Leavely is proudly built in the UK, for UK businesses. Supporting startups
                isn&apos;t just good business — it&apos;s investing in the companies that will
                shape the UK economy for decades to come.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 mb-4">
                    <b.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Same software. Startup price.
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Startup accounts get full access to every feature — nothing is locked or limited.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Standard plan */}
              <div className="rounded-2xl border bg-white p-8 text-center">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Standard
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-300 line-through">£8</span>
                  <span className="text-lg text-gray-400">/user/month</span>
                </div>
                <p className="text-sm text-gray-400">For established businesses</p>
              </div>

              {/* Startup plan */}
              <div className="rounded-2xl border-2 border-indigo-500 bg-white p-8 text-center shadow-xl shadow-indigo-500/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  25% OFF
                </div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                  Startup
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">£6</span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">For UK startups under 10 employees</p>
                <Link href="/register?utm_campaign=startup">
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-400">
                  14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              How to claim your startup discount
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps. No paperwork, no lengthy approval process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Who qualifies?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Under 10 employees',
                  desc: 'Your team is fewer than 10 people. Full-time, part-time, or contractors all count.',
                },
                {
                  icon: BadgeCheck,
                  title: 'Under 2 years old',
                  desc: 'Your business has been trading for less than 2 years. We check from your incorporation or trading start date.',
                },
                {
                  icon: Building2,
                  title: 'UK-based',
                  desc: 'Your business is registered or primarily operating in the United Kingdom.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border bg-indigo-50 p-6 text-center">
              <p className="text-sm text-indigo-800">
                <strong>Companies House number is optional.</strong>{' '}
                We know many early-stage startups are pre-incorporation or operating as sole traders.
                If you don&apos;t have a Companies House number yet, that&apos;s fine — we verify
                eligibility on a case-by-case basis.{' '}
                <Link href="/contact" className="underline font-semibold hover:text-indigo-900">Contact us</Link> if
                you&apos;re unsure whether you qualify.
              </p>
            </div>
          </div>
        </section>

        {/* Features included */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Every feature, startup pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Startup accounts get the exact same platform as every other customer. No downgrades.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-lg bg-white border p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Startup pricing questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Who qualifies for the startup discount?',
                  a: 'UK-based startups with fewer than 10 employees that have been trading for under 2 years. You don\'t need a Companies House number — pre-incorporation startups and sole traders can also apply. We verify eligibility on a case-by-case basis.',
                },
                {
                  q: 'How much does Leavely cost for startups?',
                  a: 'Startups pay £6 per user per month — 25% off the standard £8/user/month price. All features are included, no tiers or hidden fees. Every account starts with a free 14-day trial.',
                },
                {
                  q: 'Do startups get the same features?',
                  a: 'Yes, absolutely. Startup accounts get full access to every Leavely feature — visual leave calendar, one-click approvals, automatic balance tracking, TOIL, Bradford Factor, document management, reports, and email support. Nothing is locked or limited.',
                },
                {
                  q: 'What happens when we grow past 10 employees?',
                  a: 'You move to the standard £8/user/month pricing. There\'s no disruption to your account — your data, settings, policies, and team all stay exactly as they are. It\'s a seamless transition, and a sign your startup is doing well.',
                },
                {
                  q: 'Do I need a Companies House number to qualify?',
                  a: 'No. Companies House registration is optional. We understand that many early-stage startups haven\'t incorporated yet. If you\'re pre-incorporation or operating as a sole trader, you can still apply. We\'ll verify your eligibility based on the information you provide.',
                },
                {
                  q: 'How long does the startup discount last?',
                  a: 'The startup discount applies while your business meets the eligibility criteria — under 10 employees and under 2 years old. Once you grow past either threshold, you move to standard pricing. It\'s designed to give you a leg up while you\'re getting started.',
                },
                {
                  q: 'Can I still get the free trial?',
                  a: 'Yes! Every startup gets the same 14-day free trial with full access to all features. No credit card required. The startup discount is applied when you subscribe after the trial.',
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border bg-white shadow-sm"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-gray-900 [&::-webkit-details-marker]:hidden list-none">
                    <span>{faq.q}</span>
                    <span className="text-gray-400 ml-4 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <Rocket className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              The best time to get HR right
              <br />
              is right at the start
            </h2>
            <p className="mt-4 text-lg text-indigo-100">
              25% off for UK startups. 14-day free trial. No credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register?utm_campaign=startup">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-indigo-700 hover:bg-gray-50 shadow-lg"
                >
                  Get started free <ArrowRight className="ml-2 h-4 w-4" />
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

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Shield,
  Users,
  Percent,
  Building2,
  HandHeart,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/charities`

export const metadata: Metadata = {
  title: 'Charity Pricing — 50% Off Leave Management Software for UK Charities',
  description:
    'Leavely supports UK charities with 50% off leave management software. Just £4/user/month for registered charities. Track leave, manage absences, and support your team — so you can focus on your mission. Charity number required.',
  alternates: { canonical: pageUrl },
  keywords: [
    'charity leave management software',
    'charity HR software UK',
    'nonprofit leave tracker',
    'charity absence management',
    'charity staff management software',
    'charity discount HR software',
    'leave management for charities',
    'affordable HR software charities',
    'nonprofit absence tracker UK',
    'charity employee management',
  ],
  openGraph: {
    title: 'Charity Pricing — 50% Off for UK Charities',
    description:
      '50% off for registered UK charities. Just £4/user/month — all features included. Leave management built for organisations that make a difference.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charity Pricing — 50% Off for UK Charities',
    description:
      '50% off for registered UK charities. Just £4/user/month — all features included. Leave management built for organisations that make a difference.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} for Charities`,
      url: pageUrl,
      description:
        'Leavely charity pricing — 50% off leave management software for registered UK charities.',
    },
    {
      '@type': 'Product',
      name: `${SITE_NAME} Charity Plan`,
      description:
        'Leave management software for UK charities at 50% off. £4 per user per month.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '4.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 50% charity discount. Valid registered charity number required.',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who qualifies for the charity discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Any organisation registered with the Charity Commission for England and Wales, OSCR (Scotland), or CCNI (Northern Ireland). You must provide your registered charity number when signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for charities?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Charities pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do charities get the same features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Charity accounts get full access to every Leavely feature — leave calendar, approvals, TOIL tracking, Bradford Factor, document management, reports, and more.',
          },
        },
      ],
    },
  ],
}

const benefits = [
  {
    icon: Percent,
    title: '50% off — just £4/user/month',
    desc: 'Half the price, all the features. Because your budget should go to your cause, not your admin.',
  },
  {
    icon: Users,
    title: 'Built for teams of every size',
    desc: 'Whether you have 3 volunteers or 300 staff, Leavely scales with you. No minimums, no lock-in.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant & secure',
    desc: 'Your staff data is protected with enterprise-grade security. Full audit trail for governance.',
  },
  {
    icon: HandHeart,
    title: 'More time for your mission',
    desc: 'Automate leave tracking, approvals, and reporting. Less admin, more impact.',
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
    title: 'Provide your charity number',
    desc: 'Enter your registered charity number (Charity Commission, OSCR, or CCNI) during setup.',
  },
  {
    step: '3',
    title: 'Get 50% off automatically',
    desc: 'Once verified, your plan drops to £4/user/month. All features included.',
  },
]

export default function CharitiesPage() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/60 via-white to-white" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-700 mb-6">
                <Heart className="h-4 w-4" />
                Supporting UK Charities
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Your mission matters.
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  We&apos;re here to help.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                UK charities get <strong className="text-gray-900">50% off</strong> Leavely.
                Just <strong className="text-gray-900">£4/user/month</strong> — all features included.
                Spend less on admin, more on the work that changes lives.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register?utm_campaign=charity">
                  <Button
                    size="lg"
                    className="text-base font-semibold h-12 px-8 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 shadow-lg shadow-purple-500/25"
                  >
                    Start free for 14 days
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  Registered charity number required
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
                <p className="text-3xl font-extrabold text-gray-900">50%</p>
                <p className="text-sm text-gray-500 mt-1">Off for registered UK charities</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">£4</p>
                <p className="text-sm text-gray-500 mt-1">Per user per month, all features</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">200k+</p>
                <p className="text-sm text-gray-500 mt-1">Registered charities in the UK</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why we do this */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Charities power the UK.
                <br />
                <span className="text-purple-600">We want to power yours.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Over 200,000 charities across the UK work tirelessly to support communities, protect
                the vulnerable, and drive positive change. From local food banks to national
                healthcare charities, your work is essential.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe the tools you use to manage your people shouldn&apos;t eat into the funds
                meant for your mission. That&apos;s why every registered UK charity gets{' '}
                <strong>50% off Leavely</strong> — permanently, not just a trial discount.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Leavely is proudly built in the UK, for UK organisations. Supporting charities
                isn&apos;t a marketing exercise for us — it&apos;s how we contribute to the
                communities we&apos;re part of.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 mb-4">
                    <b.icon className="h-5 w-5 text-purple-600" />
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
                Same software. Half the price.
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Charity accounts get full access to every feature — nothing is locked or limited.
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
                <p className="text-sm text-gray-400">For businesses</p>
              </div>

              {/* Charity plan */}
              <div className="rounded-2xl border-2 border-purple-500 bg-white p-8 text-center shadow-xl shadow-purple-500/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  50% OFF
                </div>
                <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-2">
                  Charity
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">£4</span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">For registered UK charities</p>
                <Link href="/register?utm_campaign=charity">
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 shadow-lg shadow-purple-500/25"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-400">
                  14-day free trial. Charity number required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              How to claim your charity discount
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps. No paperwork, no lengthy approval process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-emerald-600 text-white text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-purple-500/20">
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
                  icon: Building2,
                  title: 'Charity Commission',
                  desc: 'Charities registered with the Charity Commission for England and Wales.',
                },
                {
                  icon: BadgeCheck,
                  title: 'OSCR (Scotland)',
                  desc: 'Charities registered with the Office of the Scottish Charity Regulator.',
                },
                {
                  icon: Shield,
                  title: 'CCNI (Northern Ireland)',
                  desc: 'Charities registered with the Charity Commission for Northern Ireland.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border bg-purple-50 p-6 text-center">
              <p className="text-sm text-purple-800">
                <strong>You&apos;ll need your registered charity number to claim the discount.</strong>{' '}
                We verify all charity numbers against the official register to ensure the discount
                goes to genuine charitable organisations. CICs, social enterprises, and community
                groups may also qualify — <Link href="/contact" className="underline font-semibold hover:text-purple-900">contact us</Link> to discuss.
              </p>
            </div>
          </div>
        </section>

        {/* Features included */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Every feature, half the price
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Charity accounts get the exact same platform as every other customer. No downgrades.
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
              Charity pricing questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Who qualifies for the charity discount?',
                  a: 'Any organisation registered with the Charity Commission for England and Wales, OSCR (Scotland), or CCNI (Northern Ireland). You must provide your registered charity number when signing up. CICs and social enterprises may also qualify — contact us to discuss.',
                },
                {
                  q: 'How much does Leavely cost for charities?',
                  a: 'Charities pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees. Every account starts with a free 14-day trial.',
                },
                {
                  q: 'Do charities get the same features?',
                  a: 'Yes, absolutely. Charity accounts get full access to every Leavely feature — visual leave calendar, one-click approvals, automatic balance tracking, TOIL, Bradford Factor, document management, reports, and email support. Nothing is locked or limited.',
                },
                {
                  q: 'Is the discount permanent?',
                  a: 'Yes. The charity discount applies for as long as your organisation maintains its registered charity status. It\'s not a limited-time offer or introductory discount.',
                },
                {
                  q: 'How do you verify charity status?',
                  a: 'We verify your registered charity number against the official Charity Commission, OSCR, or CCNI registers. Verification is typically completed within one working day.',
                },
                {
                  q: 'Can we still get the free trial?',
                  a: 'Yes! Every charity gets the same 14-day free trial with full access to all features. No credit card required. The charity discount is applied when you subscribe after the trial.',
                },
                {
                  q: 'What if we\'re a CIC or social enterprise?',
                  a: 'Community Interest Companies (CICs) and social enterprises may qualify for the charity discount on a case-by-case basis. Contact us with your organisation details and we\'ll be happy to discuss.',
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-emerald-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <Heart className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let&apos;s support the organisations
              <br />
              that support the UK
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              50% off for registered charities. 14-day free trial. No credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register?utm_campaign=charity">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-purple-700 hover:bg-gray-50 shadow-lg"
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

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  HandHeart,
  Shield,
  Users,
  Percent,
  Building2,
  Sprout,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/social-enterprises`

export const metadata: Metadata = {
  title: 'Social Enterprise Pricing — 50% Off Leave Management for CICs & Social Enterprises',
  description:
    'Leavely supports UK social enterprises, CICs, and B Corps with 50% off leave management software. Just £4/user/month. Track leave, manage absences, and focus on your social mission. CIC number or registration reference required.',
  alternates: { canonical: pageUrl },
  keywords: [
    'social enterprise leave management software',
    'CIC HR software UK',
    'community interest company leave tracker',
    'social enterprise absence management',
    'B Corp leave management software',
    'CIC discount HR software',
    'leave management for social enterprises',
    'affordable HR software CICs',
    'social enterprise absence tracker UK',
    'community interest company employee management',
  ],
  openGraph: {
    title: 'Social Enterprise Pricing — 50% Off for CICs & Social Enterprises',
    description:
      '50% off for UK social enterprises, CICs, and B Corps. Just £4/user/month — all features included. Leave management built for organisations driving social change.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Enterprise Pricing — 50% Off for CICs & Social Enterprises',
    description:
      '50% off for UK social enterprises, CICs, and B Corps. Just £4/user/month — all features included. Leave management built for organisations driving social change.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} for Social Enterprises`,
      url: pageUrl,
      description:
        'Leavely social enterprise pricing — 50% off leave management software for UK CICs, social enterprises, and B Corps.',
    },
    {
      '@type': 'Product',
      name: `${SITE_NAME} Social Enterprise Plan`,
      description:
        'Leave management software for UK social enterprises at 50% off. £4 per user per month.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '4.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 50% social enterprise discount. Valid CIC number or registration reference required.',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who qualifies for the social enterprise discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'UK Community Interest Companies (CICs), registered social enterprises, certified B Corps, and community organisations with a social purpose. You must provide your Companies House CIC number or registration reference when signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for social enterprises?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Social enterprises pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do social enterprises get the same features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Social enterprise accounts get full access to every Leavely feature — leave calendar, approvals, TOIL tracking, Bradford Factor, document management, reports, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a CIC number?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A CIC number is your Companies House registration number for your Community Interest Company. It is the same company number used for any limited company, but CICs are specifically regulated by the CIC Regulator.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the social enterprise discount permanent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The discount applies for as long as your organisation maintains its CIC status, social enterprise registration, or B Corp certification. It is not a limited-time offer.',
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
    desc: 'Half the price, all the features. Keep your budget focused on social impact, not software costs.',
  },
  {
    icon: Users,
    title: 'Built for teams of every size',
    desc: 'Whether you have 5 team members or 500, Leavely scales with you. No minimums, no lock-in.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant & secure',
    desc: 'Your staff data is protected with enterprise-grade security. Full audit trail for governance.',
  },
  {
    icon: Sprout,
    title: 'More time for social impact',
    desc: 'Automate leave tracking, approvals, and reporting. Less admin, more time driving positive change.',
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
    title: 'Provide your CIC number or reference',
    desc: 'Enter your Companies House CIC number, social enterprise registration, or B Corp certification during setup.',
  },
  {
    step: '3',
    title: 'Get 50% off automatically',
    desc: 'Once verified, your plan drops to £4/user/month. All features included.',
  },
]

export default function SocialEnterprisesPage() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/60 via-white to-white" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700 mb-6">
                <HandHeart className="h-4 w-4" />
                Supporting Social Enterprises
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Business with purpose
                <br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  deserves better tools.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                UK social enterprises and CICs get <strong className="text-gray-900">50% off</strong> Leavely.
                Just <strong className="text-gray-900">£4/user/month</strong> — all features included.
                Spend less on admin, more on the work that strengthens communities.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register?utm_campaign=social_enterprise">
                  <Button
                    size="lg"
                    className="text-base font-semibold h-12 px-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg shadow-orange-500/25"
                  >
                    Start free for 14 days
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  CIC number or registration reference required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y bg-gray-50/50">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">50%</p>
                <p className="text-sm text-gray-500 mt-1">Off for UK social enterprises & CICs</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">£4</p>
                <p className="text-sm text-gray-500 mt-1">Per user per month, all features</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">25,000+</p>
                <p className="text-sm text-gray-500 mt-1">CICs in the UK driving social change</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why we do this */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Social enterprises drive change.
                <br />
                <span className="text-orange-600">We want to support yours.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Over 25,000 Community Interest Companies across the UK are combining business
                with purpose — reinvesting profits into communities, tackling inequality, and
                creating lasting social impact. From local cooperatives to national B Corps,
                your work matters.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe the tools you use to manage your people shouldn&apos;t drain the
                resources meant for your mission. That&apos;s why every UK CIC, social
                enterprise, and B Corp gets{' '}
                <strong>50% off Leavely</strong> — permanently, not just a trial discount.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Leavely is proudly built in the UK, for UK organisations. Supporting social
                enterprises isn&apos;t a marketing exercise for us — it&apos;s how we
                contribute to the communities we&apos;re part of.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 mb-4">
                    <b.icon className="h-5 w-5 text-orange-600" />
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
                Social enterprise accounts get full access to every feature — nothing is locked or limited.
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

              {/* Social Enterprise plan */}
              <div className="rounded-2xl border-2 border-orange-500 bg-white p-8 text-center shadow-xl shadow-orange-500/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  50% OFF
                </div>
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
                  Social Enterprise
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">£4</span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">For UK CICs, social enterprises & B Corps</p>
                <Link href="/register?utm_campaign=social_enterprise">
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg shadow-orange-500/25"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-400">
                  14-day free trial. CIC number or reference required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              How to claim your social enterprise discount
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps. No paperwork, no lengthy approval process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 text-white text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-orange-500/20">
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
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Building2,
                  title: 'Community Interest Companies',
                  desc: 'CICs registered with Companies House and regulated by the CIC Regulator.',
                },
                {
                  icon: Sprout,
                  title: 'Social Enterprises',
                  desc: 'Organisations that trade for social or environmental purposes and reinvest profits.',
                },
                {
                  icon: BadgeCheck,
                  title: 'Certified B Corps',
                  desc: 'Businesses certified by B Lab that meet high standards of social and environmental performance.',
                },
                {
                  icon: HandHeart,
                  title: 'Community Organisations',
                  desc: 'Community benefit societies, cooperatives, and organisations with a clear social mission.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border bg-orange-50 p-6 text-center">
              <p className="text-sm text-orange-800">
                <strong>You&apos;ll need your Companies House CIC number or registration reference to claim the discount.</strong>{' '}
                We verify all registrations against official records to ensure the discount
                goes to genuine social enterprises. If you&apos;re unsure whether your organisation qualifies — <Link href="/contact" className="underline font-semibold hover:text-orange-900">contact us</Link> to discuss.
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
              Social enterprise accounts get the exact same platform as every other customer. No downgrades.
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
              Social enterprise pricing questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Who qualifies for the social enterprise discount?',
                  a: 'UK Community Interest Companies (CICs), registered social enterprises, certified B Corps, and community organisations with a demonstrable social purpose. You must provide your Companies House CIC number or relevant registration reference when signing up.',
                },
                {
                  q: 'How much does Leavely cost for social enterprises?',
                  a: 'Social enterprises pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees. Every account starts with a free 14-day trial.',
                },
                {
                  q: 'Do social enterprises get the same features?',
                  a: 'Yes, absolutely. Social enterprise accounts get full access to every Leavely feature — visual leave calendar, one-click approvals, automatic balance tracking, TOIL, Bradford Factor, document management, reports, and email support. Nothing is locked or limited.',
                },
                {
                  q: 'What is a CIC and how do I know if I am one?',
                  a: 'A Community Interest Company (CIC) is a special type of limited company designed for social enterprises that want to use their profits and assets for the public good. CICs are registered with Companies House and regulated by the CIC Regulator. If your company name ends in "CIC" or "Community Interest Company", or you were registered as one, you qualify.',
                },
                {
                  q: 'Is the discount permanent?',
                  a: 'Yes. The social enterprise discount applies for as long as your organisation maintains its CIC status, social enterprise registration, or B Corp certification. It\'s not a limited-time offer or introductory discount.',
                },
                {
                  q: 'How do you verify social enterprise status?',
                  a: 'We verify your CIC number against Companies House records, or check your B Corp certification with B Lab. For other social enterprises, we review your registration reference and organisational structure. Verification is typically completed within one working day.',
                },
                {
                  q: 'Can we still get the free trial?',
                  a: 'Yes! Every social enterprise gets the same 14-day free trial with full access to all features. No credit card required. The discount is applied when you subscribe after the trial.',
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
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <HandHeart className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let&apos;s support the organisations
              <br />
              that strengthen our communities
            </h2>
            <p className="mt-4 text-lg text-orange-100">
              50% off for social enterprises & CICs. 14-day free trial. No credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register?utm_campaign=social_enterprise">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-orange-700 hover:bg-gray-50 shadow-lg"
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

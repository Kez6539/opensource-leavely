import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Shield,
  Users,
  Percent,
  Building2,
  BookOpen,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/education-discount`

export const metadata: Metadata = {
  title: 'Education Pricing — 50% Off Leave Management Software for UK Schools & Universities',
  description:
    'Leavely supports UK schools, academies, colleges, and universities with 50% off leave management software. Just £4/user/month for education institutions. Track staff leave, manage absences, plan cover — so your budget stays in the classroom. URN, UKPRN, or institution reference required.',
  alternates: { canonical: pageUrl },
  keywords: [
    'school leave management software',
    'education HR software UK',
    'school absence management',
    'teacher leave tracker',
    'academy leave management',
    'MAT leave management software',
    'university staff leave software',
    'school staff management software',
    'education discount HR software',
    'college absence tracker UK',
  ],
  openGraph: {
    title: 'Education Pricing — 50% Off for UK Schools & Universities',
    description:
      '50% off for UK education institutions. Just £4/user/month — all features included. Leave management built for schools, academies, and universities.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Pricing — 50% Off for UK Schools & Universities',
    description:
      '50% off for UK education institutions. Just £4/user/month — all features included. Leave management built for schools, academies, and universities.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} for Education`,
      url: pageUrl,
      description:
        'Leavely education pricing — 50% off leave management software for UK schools, academies, colleges, and universities.',
    },
    {
      '@type': 'Product',
      name: `${SITE_NAME} Education Plan`,
      description:
        'Leave management software for UK education institutions at 50% off. £4 per user per month.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '4.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 50% education discount. Valid URN, UKPRN, or institution reference required.',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who qualifies for the education discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'UK state schools, academies, free schools, multi-academy trusts (MATs), sixth form colleges, further education colleges, and universities. You must provide a URN, UKPRN, or institution reference when signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for schools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Education institutions pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do education accounts get the same features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Education accounts get full access to every Leavely feature — leave calendar, approvals, TOIL tracking, Bradford Factor, document management, reports, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely handle term-time patterns and INSET days?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can set up custom leave policies for term-time staff, configure INSET days as company-wide leave blocks, and manage different allowances for teaching and support staff.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the discount apply to multi-academy trusts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Multi-academy trusts can set up Leavely with multiple schools under one account or separate accounts per school — the 50% discount applies either way.',
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
    desc: 'Half the price, all the features. Because your budget should go to education, not admin software.',
  },
  {
    icon: Users,
    title: 'Built for schools of every size',
    desc: 'Whether you have 10 staff or 1,000 across a MAT, Leavely scales with you. No minimums, no lock-in.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant & secure',
    desc: 'Staff data is protected with enterprise-grade security. Full audit trail for Ofsted and governance.',
  },
  {
    icon: BookOpen,
    title: 'Less admin, more teaching',
    desc: 'Automate leave tracking, cover planning, and reporting. Free up SLT time for what matters most.',
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
    title: 'Provide your institution reference',
    desc: 'Enter your URN, UKPRN, or institution reference number during setup.',
  },
  {
    step: '3',
    title: 'Get 50% off automatically',
    desc: 'Once verified, your plan drops to £4/user/month. All features included.',
  },
]

export default function EducationDiscountPage() {
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
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-sky-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6">
                <GraduationCap className="h-4 w-4" />
                Supporting UK Education
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Every penny should go
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  to education.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                UK schools and universities get <strong className="text-gray-900">50% off</strong> Leavely.
                Just <strong className="text-gray-900">£4/user/month</strong> — all features included.
                Spend less on admin, more on your students.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register?utm_campaign=education">
                  <Button
                    size="lg"
                    className="text-base font-semibold h-12 px-8 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-lg shadow-blue-500/25"
                  >
                    Start free for 14 days
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  URN, UKPRN, or institution reference required
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
                <p className="text-sm text-gray-500 mt-1">Off for UK education institutions</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">£4</p>
                <p className="text-sm text-gray-500 mt-1">Per user per month, all features</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">32,000+</p>
                <p className="text-sm text-gray-500 mt-1">Schools and colleges across the UK</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why we do this */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Schools face tight budgets.
                <br />
                <span className="text-blue-600">We want to help.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Teachers and support staff are the backbone of every community. But school budgets are
                stretched thin, and every pound spent on software is a pound taken away from the
                classroom. We don&apos;t think that&apos;s right.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                That&apos;s why every UK school, academy, college, and university gets{' '}
                <strong>50% off Leavely</strong> — permanently, not just an introductory offer.
                Teachers and support staff deserve proper leave management without the premium price
                tag.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                From term-time patterns and INSET days to staff cover planning, Leavely understands
                how education works. Built in the UK, for UK organisations — supporting the people
                who shape the next generation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 mb-4">
                    <b.icon className="h-5 w-5 text-blue-600" />
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
                Education accounts get full access to every feature — nothing is locked or limited.
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

              {/* Education plan */}
              <div className="rounded-2xl border-2 border-blue-500 bg-white p-8 text-center shadow-xl shadow-blue-500/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-sky-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  50% OFF
                </div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Education
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">£4</span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">For UK schools & universities</p>
                <Link href="/register?utm_campaign=education">
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 shadow-lg shadow-blue-500/25"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-400">
                  14-day free trial. Institution reference required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              How to claim your education discount
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps. No paperwork, no lengthy approval process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-600 text-white text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-blue-500/20">
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
                  title: 'Schools & Academies',
                  desc: 'State schools, academies, free schools, and multi-academy trusts (MATs) across England, Wales, Scotland, and Northern Ireland.',
                },
                {
                  icon: BookOpen,
                  title: 'Colleges & Sixth Forms',
                  desc: 'Further education colleges, sixth form colleges, and other post-16 education providers with a valid UKPRN.',
                },
                {
                  icon: BadgeCheck,
                  title: 'Universities & HE',
                  desc: 'Higher education institutions, university departments, and research bodies registered with the OfS or equivalent.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border bg-blue-50 p-6 text-center">
              <p className="text-sm text-blue-800">
                <strong>You&apos;ll need your URN, UKPRN, or institution reference to claim the discount.</strong>{' '}
                We verify all references against official registers (Get Information About Schools, UKRLP)
                to ensure the discount goes to genuine education institutions. Independent schools and
                training providers may also qualify — <Link href="/contact" className="underline font-semibold hover:text-blue-900">contact us</Link> to discuss.
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
              Education accounts get the exact same platform as every other customer. No downgrades.
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
              Education pricing questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Who qualifies for the education discount?',
                  a: 'UK state schools, academies, free schools, multi-academy trusts (MATs), sixth form colleges, further education colleges, and universities. You must provide a URN, UKPRN, or institution reference number when signing up. Independent schools and training providers may also qualify — contact us to discuss.',
                },
                {
                  q: 'How much does Leavely cost for schools?',
                  a: 'Education institutions pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees. Every account starts with a free 14-day trial.',
                },
                {
                  q: 'Do education accounts get the same features?',
                  a: 'Yes, absolutely. Education accounts get full access to every Leavely feature — visual leave calendar, one-click approvals, automatic balance tracking, TOIL, Bradford Factor, document management, reports, and email support. Nothing is locked or limited.',
                },
                {
                  q: 'Can Leavely handle term-time patterns and INSET days?',
                  a: 'Yes. You can set up custom leave policies for term-time staff with different allowances, configure INSET days and training days as company-wide leave blocks, and manage separate policies for teaching staff, support staff, and admin teams. The calendar makes it easy to see who\'s available for cover.',
                },
                {
                  q: 'Is the discount permanent?',
                  a: 'Yes. The education discount applies for as long as your institution remains a registered education provider. It\'s not a limited-time offer or introductory discount.',
                },
                {
                  q: 'Does the discount apply to multi-academy trusts?',
                  a: 'Yes. Multi-academy trusts can set up Leavely with multiple schools under one account or separate accounts per school — the 50% discount applies either way. Contact us for MAT-level onboarding support.',
                },
                {
                  q: 'Can we still get the free trial?',
                  a: 'Yes! Every education institution gets the same 14-day free trial with full access to all features. No credit card required. The education discount is applied when you subscribe after the trial.',
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <GraduationCap className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let&apos;s support the people
              <br />
              who shape the future
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              50% off for UK education institutions. 14-day free trial. No credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register?utm_campaign=education">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-blue-700 hover:bg-gray-50 shadow-lg"
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

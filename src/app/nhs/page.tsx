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
  Stethoscope,
  BadgeCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/nhs`

export const metadata: Metadata = {
  title: 'NHS Pricing — 50% Off Leave Management Software for NHS Organisations',
  description:
    'Leavely supports NHS organisations with 50% off leave management software. Just £4/user/month for NHS trusts, GP practices, and healthcare providers. Track shifts, manage absences, monitor Bradford Factor — built for UK healthcare. ODS code or NHS organisation name required.',
  alternates: { canonical: pageUrl },
  keywords: [
    'NHS leave management software',
    'NHS HR software UK',
    'NHS absence management',
    'NHS staff management software',
    'NHS discount HR software',
    'leave management for NHS',
    'affordable HR software NHS',
    'NHS absence tracker UK',
    'NHS employee management',
    'NHS trust leave management',
    'GP practice leave tracking',
    'healthcare staff management',
    'NHS Bradford Factor',
    'NHS sickness tracking',
  ],
  openGraph: {
    title: 'NHS Pricing — 50% Off for NHS Organisations',
    description:
      '50% off for NHS organisations. Just £4/user/month — all features included. Leave management built for the people who keep the nation healthy.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHS Pricing — 50% Off for NHS Organisations',
    description:
      '50% off for NHS organisations. Just £4/user/month — all features included. Leave management built for the people who keep the nation healthy.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} for NHS`,
      url: pageUrl,
      description:
        'Leavely NHS pricing — 50% off leave management software for NHS trusts, GP practices, and healthcare providers.',
    },
    {
      '@type': 'Product',
      name: `${SITE_NAME} NHS Plan`,
      description:
        'Leave management software for NHS organisations at 50% off. £4 per user per month.',
      url: pageUrl,
      offers: {
        '@type': 'Offer',
        price: '4.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 50% NHS discount. Valid ODS code or NHS organisation name required.',
        eligibleCustomerType: 'https://schema.org/Business',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who qualifies for the NHS discount?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NHS trusts, NHS foundation trusts, GP practices, CCGs (Clinical Commissioning Groups), ICBs (Integrated Care Boards), ambulance services, and other NHS-funded organisations. You must provide your ODS code or NHS organisation name when signing up.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for NHS organisations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NHS organisations pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do NHS organisations get the same features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. NHS accounts get full access to every Leavely feature — leave calendar, approvals, TOIL tracking, Bradford Factor monitoring, document management, reports, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely handle shift patterns and on-call rotas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports custom leave policies, flexible working patterns, and TOIL tracking — ideal for NHS shift workers, on-call staff, and part-time employees.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the NHS discount permanent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The NHS discount applies for as long as your organisation remains an NHS body. It is not a limited-time offer or introductory discount.',
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
    desc: 'Half the price, all the features. Because NHS budgets should go to patient care, not admin software.',
  },
  {
    icon: Stethoscope,
    title: 'Built for healthcare teams',
    desc: 'Shift patterns, on-call rotas, sickness tracking, and Bradford Factor monitoring — designed for how NHS teams actually work.',
  },
  {
    icon: Shield,
    title: 'GDPR compliant & secure',
    desc: 'Enterprise-grade security with full audit trail. Your staff data is protected to the standards the NHS demands.',
  },
  {
    icon: Heart,
    title: 'Less admin, more patient care',
    desc: 'Automate leave tracking, approvals, and reporting. Give your HR team time back for what really matters.',
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
    title: 'Provide your ODS code or NHS name',
    desc: 'Enter your ODS code or NHS organisation name during setup so we can verify your eligibility.',
  },
  {
    step: '3',
    title: 'Get 50% off automatically',
    desc: 'Once verified, your plan drops to £4/user/month. All features included.',
  },
]

export default function NhsPage() {
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6">
                <Heart className="h-4 w-4" />
                Supporting NHS Teams
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                You care for the nation.
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  We&apos;ll care for your admin.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                NHS organisations get <strong className="text-gray-900">50% off</strong> Leavely.
                Just <strong className="text-gray-900">£4/user/month</strong> — all features included.
                Spend less on admin software, more on patient care.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register?utm_campaign=nhs">
                  <Button
                    size="lg"
                    className="text-base font-semibold h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25"
                  >
                    Start free for 14 days
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-400">
                  ODS code or NHS organisation name required
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
                <p className="text-sm text-gray-500 mt-1">Off for NHS organisations</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">£4</p>
                <p className="text-sm text-gray-500 mt-1">Per user per month, all features</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gray-900">1.4M+</p>
                <p className="text-sm text-gray-500 mt-1">NHS employees across England</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why we do this */}
        <section className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                NHS staff are the backbone
                <br />
                <span className="text-blue-600">of UK healthcare.</span>
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Over 1.4 million people work for the NHS in England alone — from nurses and
                doctors to porters, paramedics, and admin staff. They keep the country healthy,
                often under immense pressure and with stretched resources.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe the software NHS teams use to manage leave, track absences, and
                monitor sickness patterns shouldn&apos;t be a luxury. NHS budgets are tight —
                every pound saved on admin is a pound that can go towards patient care.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                That&apos;s why every NHS organisation gets{' '}
                <strong>50% off Leavely</strong> — permanently, not just a trial discount.
                Leavely is proudly built in the UK, for UK organisations. Supporting the NHS
                is the right thing to do.
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
                NHS accounts get full access to every feature — nothing is locked or limited.
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

              {/* NHS plan */}
              <div className="rounded-2xl border-2 border-blue-500 bg-white p-8 text-center shadow-xl shadow-blue-500/10 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  50% OFF
                </div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  NHS
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">£4</span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">For NHS organisations</p>
                <Link href="/register?utm_campaign=nhs">
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-gray-400">
                  14-day free trial. ODS code or NHS name required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              How to claim your NHS discount
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Three simple steps. No paperwork, no lengthy approval process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-xl font-extrabold mx-auto mb-4 shadow-lg shadow-blue-500/20">
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
                  title: 'NHS Trusts & Foundation Trusts',
                  desc: 'Acute trusts, mental health trusts, community trusts, and NHS foundation trusts across England.',
                },
                {
                  icon: Stethoscope,
                  title: 'GP Practices & Primary Care',
                  desc: 'GP surgeries, dental practices, pharmacies, and other primary care providers within the NHS.',
                },
                {
                  icon: BadgeCheck,
                  title: 'CCGs, ICBs & Ambulance Services',
                  desc: 'Clinical Commissioning Groups, Integrated Care Boards, ambulance services, and NHS-funded bodies.',
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
                <strong>You&apos;ll need your ODS code or NHS organisation name to claim the discount.</strong>{' '}
                We verify all NHS organisations against the ODS register to ensure the discount
                goes to genuine NHS bodies. Private healthcare providers and NHS subcontractors
                may also qualify — <Link href="/contact" className="underline font-semibold hover:text-blue-900">contact us</Link> to discuss.
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
              NHS accounts get the exact same platform as every other customer. No downgrades.
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
              NHS pricing questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Who qualifies for the NHS discount?',
                  a: 'NHS trusts, NHS foundation trusts, GP practices, CCGs, ICBs, ambulance services, and other NHS-funded organisations. You must provide your ODS code or NHS organisation name when signing up. Private healthcare providers and NHS subcontractors may also qualify — contact us to discuss.',
                },
                {
                  q: 'How much does Leavely cost for NHS organisations?',
                  a: 'NHS organisations pay £4 per user per month — 50% off the standard £8/user/month price. All features are included, no tiers or hidden fees. Every account starts with a free 14-day trial.',
                },
                {
                  q: 'Do NHS organisations get the same features?',
                  a: 'Yes, absolutely. NHS accounts get full access to every Leavely feature — visual leave calendar, one-click approvals, automatic balance tracking, TOIL, Bradford Factor monitoring, document management, reports, and email support. Nothing is locked or limited.',
                },
                {
                  q: 'Can Leavely handle NHS shift patterns and on-call rotas?',
                  a: 'Yes. Leavely supports custom leave policies, flexible working patterns, and TOIL (time off in lieu) tracking — ideal for NHS shift workers, on-call staff, part-time employees, and bank staff. You can create different leave policies for different teams and working patterns.',
                },
                {
                  q: 'How does Bradford Factor monitoring help NHS teams?',
                  a: 'The Bradford Factor helps NHS managers identify absence patterns by weighting frequent short-term absences more heavily than longer single absences. This is critical in healthcare settings where unexpected absences directly impact patient care and require costly agency cover.',
                },
                {
                  q: 'Is the discount permanent?',
                  a: 'Yes. The NHS discount applies for as long as your organisation remains an NHS body. It\'s not a limited-time offer or introductory discount.',
                },
                {
                  q: 'What is an ODS code?',
                  a: 'An ODS (Organisation Data Service) code is a unique identifier assigned to NHS organisations by NHS Digital. It\'s used across the NHS to identify trusts, GP practices, and other healthcare bodies. If you don\'t know your ODS code, you can provide your full NHS organisation name instead and we\'ll look it up.',
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <Heart className="h-10 w-10 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Let&apos;s support the people
              <br />
              who keep the nation healthy
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              50% off for NHS organisations. 14-day free trial. No credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register?utm_campaign=nhs">
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

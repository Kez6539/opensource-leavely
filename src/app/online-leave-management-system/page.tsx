import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Shield,
  Cloud,
  Smartphone,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/online-leave-management-system`

export const metadata: Metadata = {
  title: 'Online Leave Management System UK: Cloud Based, No Install Required',
  description:
    'Cloud based online leave management system for UK businesses. No software to install, works on any device, accessible from anywhere. £8/user/month, set up in 2 minutes. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/leave-management-software-uk` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'online leave management system',
    'online leave management system UK',
    'cloud based leave management',
    'cloud leave tracker',
    'web based leave management',
    'online holiday management system',
    'leave management software online',
    'cloud HR software UK',
    'online absence management',
    'SaaS leave management',
  ],
  openGraph: {
    title: 'Online Leave Management System UK — Leavely',
    description:
      'Cloud based, no install required, works on any device. £8/user/month, set up in 2 minutes.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Does Leavely require any software installation?',
    a: 'No. Leavely is entirely cloud based and runs in your web browser. There is nothing to install, no software to download, and no IT department needed. You access it from any device with an internet connection, including phones, tablets, laptops, and desktops.',
  },
  {
    q: 'Can my team access Leavely from their phones?',
    a: 'Yes. Leavely is fully responsive and works on any mobile device. Employees can request leave, check their balance, and view the team calendar from their phone. Managers can approve or decline requests on the go. No app download is required.',
  },
  {
    q: 'Is my data secure with a cloud based system?',
    a: 'Yes. Leavely uses industry standard encryption for all data in transit and at rest. Your data is hosted on secure, UK compliant infrastructure. We perform regular backups and all access is protected by authentication. You retain full ownership of your data at all times.',
  },
  {
    q: 'Can I access Leavely from multiple locations?',
    a: 'Yes. Because Leavely is cloud based, you can access it from any location with an internet connection. This makes it ideal for businesses with remote workers, multiple office locations, or field based employees. Everyone sees the same real time data.',
  },
  {
    q: 'How quickly can I get started with Leavely?',
    a: 'You can sign up and start using Leavely in under 2 minutes. Create your account, set your leave year dates and allowances, and invite your team. There is no onboarding process, no demo required, and no waiting period. You are up and running immediately.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Online Leave Management System`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a cloud based online leave management system for UK businesses. No software to install, works on any device, accessible from anywhere.',
      datePublished: '2026-04-05',
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

export default function OnlineLeaveManagementSystemPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=online_leave_management_system'

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
                Online leave management
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Online Leave Management
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  System for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                No software to install. No IT department required. Leavely is a cloud based leave management system that works on any device, from anywhere. Sign up and start using it in under 2 minutes.
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
                  <p className="text-3xl font-extrabold text-emerald-600">Cloud</p>
                  <p className="text-sm text-gray-500">no install needed</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Any device</p>
                  <p className="text-sm text-gray-500">mobile friendly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud benefits */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Why cloud based leave management is the smart choice
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Spreadsheets live on one computer. Desktop software needs installing and updating. A cloud based system like Leavely works everywhere, always has the latest version, and requires zero maintenance from you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Cloud,
                  title: 'Nothing to install',
                  description: 'Open your browser and log in. That is it. No downloads, no installations, no updates to manage. Leavely is always the latest version with the newest features.',
                },
                {
                  icon: Smartphone,
                  title: 'Works on any device',
                  description: 'Phone, tablet, laptop, or desktop. Leavely adapts to your screen size automatically. Employees can request leave from their phone. Managers can approve from anywhere.',
                },
                {
                  icon: Globe,
                  title: 'Access from anywhere',
                  description: 'Office, home, or on the road. If you have an internet connection, you can access Leavely. Perfect for remote teams, multi site businesses, and field based workers.',
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
              Full featured online leave management
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Visual team leave calendar',
                'One click leave approvals',
                'Automatic balance tracking',
                'Pro rata calculations',
                'UK bank holidays built in',
                'Bradford Factor monitoring',
                'Sick leave and absence recording',
                'TOIL (time off in lieu) tracking',
                'Return to work forms',
                'Carry over rules',
                'Custom leave types',
                'Absence reports and analytics',
                'Employee self service portal',
                'Manager dashboard',
                'Document storage',
                'Multi department support',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-gray-500">
              Every feature included at £8 per user per month. No hidden costs.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Get started with online leave management in 2 minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              No installation. No configuration. No IT support needed. Sign up, add your team, and manage leave from anywhere.
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
              Why businesses choose Leavely as their online leave management system
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Zero IT overhead', description: 'There is no software to install, no servers to maintain, and no updates to manage. Leavely runs entirely in the cloud. Your IT team (or lack of one) will thank you.' },
                { title: 'Always up to date', description: 'Because Leavely is cloud based, you always have the latest version with the newest features. There are no manual updates, no version mismatches, and no compatibility issues to worry about.' },
                { title: 'Secure and reliable', description: 'Your data is encrypted in transit and at rest. Leavely uses industry standard security practices with automatic backups. You retain full ownership of your data and can export it at any time.' },
                { title: 'Built for UK businesses', description: 'UK bank holidays, statutory entitlements (5.6 weeks for full time), pro rata for part time, and Bradford Factor scoring are all built in. Leavely understands UK employment law so you do not have to configure it yourself.' },
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
              No credit card. No sales calls. No annual contract. Just online leave management that works.
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

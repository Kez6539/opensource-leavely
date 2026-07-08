import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  QrCode,
  MapPin,
  Clock,
  FileSpreadsheet,
  Smartphone,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/employee-clock-in-app`

export const metadata: Metadata = {
  title: 'Employee Clock-In App UK: QR Code & GPS Time Tracking',
  description:
    'Employee clock-in app for UK teams. QR code or GPS clock-in from any phone. Track hours, breaks, and locations. Weekly timesheets with CSV export for payroll. Part of Leavely at £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'employee clock in app',
    'clock in app UK',
    'staff clock in system',
    'QR code clock in',
    'GPS time tracking app',
    'employee time tracking UK',
    'clock in clock out app',
  ],
  openGraph: {
    title: 'Employee Clock-In App UK — Leavely',
    description:
      'QR code or GPS clock-in from any phone. Track hours, breaks, and locations. No hardware needed.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does the QR code clock-in work?',
    a: 'You print a unique QR code and display it at your workplace (reception, kitchen, entrance). Employees scan it with their phone camera to clock in and out. The QR code is tied to your Leavely account, so scans are automatically logged against the right employee. There is no app to download.',
  },
  {
    q: 'How does GPS clock-in work?',
    a: 'If your employees work at multiple sites or remotely, they can clock in using GPS location from their phone browser. Leavely records the location and time of each clock-in event, so you can verify where and when staff started their shift.',
  },
  {
    q: 'Do employees need to install an app?',
    a: 'No. Leavely works entirely through the web browser on any smartphone. Employees visit the Leavely site, log in, and clock in. There is nothing to download, install, or update. This also means it works on any phone regardless of operating system.',
  },
  {
    q: 'Can I export timesheets for payroll?',
    a: 'Yes. Leavely generates weekly timesheets that show clock-in times, clock-out times, total hours worked, and break deductions. You can export these as CSV files and send them directly to your payroll provider or accountant.',
  },
  {
    q: 'Is the clock-in feature included in the £8/user/month price?',
    a: 'Yes. Time tracking and clock-in is part of the standard Leavely plan. There are no add-on fees. You also get leave management, rota planning, performance reviews, expenses, and onboarding in the same price.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Employee Clock-In App`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Employee clock-in app for UK businesses. QR code and GPS time tracking from any phone. Weekly timesheet export for payroll.',
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
  ],
}

const features = [
  {
    icon: QrCode,
    title: 'QR code clock-in',
    description: 'Print a QR code for your workplace. Employees scan it with their phone to clock in and out. No hardware, no special equipment, no app downloads.',
  },
  {
    icon: MapPin,
    title: 'GPS location tracking',
    description: 'For remote or multi-site teams, employees clock in using GPS. You can see exactly where and when each clock-in happened on a map view.',
  },
  {
    icon: Clock,
    title: 'Break tracking',
    description: 'Employees can log breaks separately. Leavely deducts break time from total hours automatically, giving you accurate net working hours for payroll.',
  },
  {
    icon: FileSpreadsheet,
    title: 'CSV timesheet export',
    description: 'Export weekly or monthly timesheets as CSV. Includes clock-in/out times, total hours, breaks, and overtime. Ready for your payroll provider.',
  },
  {
    icon: Smartphone,
    title: 'Works on any phone',
    description: 'No app to install. Leavely runs in the browser on iPhone, Android, or any device with a camera and internet. Staff are set up in seconds.',
  },
  {
    icon: Shield,
    title: 'Connected to leave and rotas',
    description: 'Clock-in data ties into your rota schedule and leave calendar. See scheduled vs actual hours side by side. Spot patterns and discrepancies instantly.',
  },
]

export default function EmployeeClockInAppPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=employee_clock_in_app'

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
                Employee clock-in app
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Employee Clock-In App
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Teams
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Track employee hours with QR code or GPS clock-in from any phone. No hardware needed, no app to install. Employees scan a code or tap a button, and their hours are recorded automatically. Export weekly timesheets as CSV for payroll. All part of Leavely at £8 per user per month.
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
                  <p className="text-3xl font-extrabold text-emerald-600">QR + GPS</p>
                  <p className="text-sm text-gray-500">clock-in options</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£0</p>
                  <p className="text-sm text-gray-500">hardware cost</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Simple time tracking that actually works
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Forget expensive hardware and complicated systems. Leavely turns any smartphone into a time clock.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
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

        {/* How it works */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              How it works in 3 steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Set up in 2 minutes', description: 'Sign up for Leavely, add your employees, and print a QR code for your workplace. Or enable GPS clock-in for remote teams.' },
                { step: '2', title: 'Employees clock in', description: 'Staff scan the QR code or tap the clock-in button on their phone. Leavely records the time, location, and break periods automatically.' },
                { step: '3', title: 'Export for payroll', description: 'At the end of each week, export a CSV timesheet with all hours worked. Send it to your payroll provider or accountant. Done.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-extrabold text-emerald-600">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ditch the paper sign-in sheet
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              QR code and GPS clock-in is included in every Leavely plan at £8 per user per month. No hardware to buy. No app to download.
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

        {/* Why not standalone */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why use Leavely instead of a standalone clock-in app?
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Time tracking connected to leave management', description: 'When an employee is on annual leave or sick, Leavely knows. You will never wonder why someone did not clock in because the system already shows they are off. Standalone clock-in apps do not have this context.' },
                { title: 'Rotas and actual hours side by side', description: 'Compare scheduled shifts against actual clock-in times. Spot late arrivals, early departures, and overtime at a glance. One integrated view instead of cross-referencing two separate systems.' },
                { title: 'One tool, one login, one price', description: 'Instead of paying for a separate time tracking app, rota tool, and leave management system, Leavely combines all three. Your employees log in once and have everything they need.' },
                { title: 'No hardware investment', description: 'Traditional clock-in systems require wall-mounted terminals, fingerprint scanners, or RFID cards. Leavely uses QR codes (print for free) and GPS (already on every phone). Zero hardware cost.' },
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
              Clock-in, leave management, rotas, and more. All for £8 per user per month. No credit card needed to start.
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

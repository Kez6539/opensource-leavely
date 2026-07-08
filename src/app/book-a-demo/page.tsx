import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { DemoForm } from './demo-form'
import {
  Check,
  Star,
  CalendarDays,
  Plane,
  Thermometer,
  Clock,
  Shield,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Demo — See Leavely in Action',
  description:
    'Book a free personalised demo of Leavely. See how our leave management software can save your HR team hours every week.',
  alternates: { canonical: `${SITE_URL}/book-a-demo` },
  openGraph: {
    title: 'Book a Demo — See Leavely in Action',
    description:
      'Book a free personalised demo. See how Leavely can simplify leave management for your team.',
    url: `${SITE_URL}/book-a-demo`,
  },
}

export default function BookADemoPage() {
  return (
    <div className="min-h-[100svh] flex flex-col bg-gradient-to-b from-emerald-700 via-emerald-600 to-teal-700 text-white relative overflow-hidden">
      {/* Decorative blobs — pure CSS, no image cost */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -left-32 w-[320px] h-[320px] rounded-full bg-teal-300/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[260px] h-[260px] rounded-full bg-emerald-300/15 blur-3xl"
      />

      {/* Lightweight header — replaces heavy MarketingNav */}
      <header className="relative px-5 sm:px-8 pt-5 pb-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-16 brightness-0 invert" />
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
          <div className="flex -space-x-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <span>Rated 4.9 by UK teams</span>
        </div>
      </header>

      <main className="relative flex-1 px-5 sm:px-8 pt-4 pb-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-start">
          {/* Left: pitch + inline product preview */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              <Plane className="h-3 w-3" />
              Free demo · no obligation
            </div>
            <h1 className="mt-4 text-[32px] sm:text-[42px] leading-[1.05] font-extrabold tracking-tight text-balance">
              See how Leavely runs leave for your team.
            </h1>
            <p className="mt-4 text-[15px] sm:text-base text-emerald-50/90 leading-relaxed max-w-lg">
              A 20-minute personalised walkthrough with a real person — tailored to your
              team size, industry, and what&apos;s driving you mad right now.
            </p>

            {/* Mini product preview — pure CSS/SVG, no image load, matches /try */}
            <div className="mt-7 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 shadow-xl max-w-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-white/80" />
                  <span className="text-xs font-semibold text-white/80">This week</span>
                </div>
                <span className="text-[10px] text-white/60">APR 20 – 26</span>
              </div>
              <div className="space-y-2">
                <PreviewRow
                  colour="bg-emerald-400"
                  name="Sarah — Annual leave"
                  days="Mon – Wed"
                  icon={<Plane className="h-3 w-3" />}
                />
                <PreviewRow
                  colour="bg-amber-400"
                  name="Tom — Sickness"
                  days="Tue"
                  icon={<Thermometer className="h-3 w-3" />}
                />
                <PreviewRow
                  colour="bg-teal-300"
                  name="Priya — Half day"
                  days="Fri PM"
                  icon={<CalendarDays className="h-3 w-3" />}
                />
              </div>
            </div>

            {/* Short trust bullets */}
            <ul className="mt-7 space-y-2 text-[14px] text-emerald-50/95">
              {[
                { icon: Clock, text: 'Personalised walkthrough in 20 minutes' },
                { icon: Users, text: 'Shows how Leavely fits your team size and industry' },
                { icon: Shield, text: 'No sales pressure · decide in your own time' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 h-5 w-5 rounded-md bg-white/15 border border-white/20 flex items-center justify-center mt-0.5">
                    <Icon className="h-3 w-3 text-white" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Testimonial */}
            <figure className="mt-7 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 max-w-md">
              <blockquote className="text-[14px] text-white/95 leading-relaxed italic">
                &ldquo;We switched from spreadsheets to Leavely and it&apos;s saved us hours
                every week. The team actually enjoys booking leave now.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[12px] font-medium text-emerald-50/80">
                HR Manager · 35 employees
              </figcaption>
            </figure>
          </div>

          {/* Right: elevated white form card */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl bg-white text-gray-900 p-5 sm:p-7 shadow-2xl shadow-black/20 border border-white/30">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Request your demo
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-5">
                Takes less than a minute. We&apos;ll be in touch within 24 hours.
              </p>
              <DemoForm />
              <ul className="mt-5 space-y-1.5 text-[13px] text-gray-600">
                {[
                  'Free 20-minute walkthrough',
                  'No credit card · no obligation',
                  'Live in the same day if you like it',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-1.5">
                    <Check
                      className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-600"
                      aria-hidden
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-[12px] text-center text-emerald-50/80">
              Trusted by UK teams from 5 to 250 staff · GDPR-ready · Made in the UK
            </p>
          </div>
        </div>
      </main>

      <footer className="relative px-5 sm:px-8 pb-6 pt-2 text-center text-[11px] text-white/60">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-white/90 transition-colors">
            Home
          </Link>
          <span aria-hidden>·</span>
          <Link href="/privacy" className="hover:text-white/90 transition-colors">
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link href="/terms" className="hover:text-white/90 transition-colors">
            Terms
          </Link>
        </div>
        <p className="mt-2">
          © {new Date().getFullYear()} Leavely · UK leave management software
        </p>
      </footer>
    </div>
  )
}

function PreviewRow({
  colour,
  name,
  days,
  icon,
}: {
  colour: string
  name: string
  days: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2">
      <span
        className={`h-2 w-2 rounded-full ${colour} shadow-[0_0_0_3px_rgba(255,255,255,0.12)]`}
      />
      <span className="text-[13px] font-medium text-white flex-1 truncate">{name}</span>
      <span className="flex items-center gap-1 text-[11px] text-white/70 shrink-0">
        {icon}
        {days}
      </span>
    </div>
  )
}

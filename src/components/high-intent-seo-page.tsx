import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_NAME } from '@/lib/seo'

export type SeoLandingFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export type SeoLandingStat = {
  value: string
  label: string
}

export type SeoLandingFaq = {
  q: string
  a: string
}

export type SeoLandingPageData = {
  pageUrl: string
  campaign: string
  eyebrow: string
  title: string
  highlightedTitle: string
  description: string
  searchIntent: string
  stats: SeoLandingStat[]
  painPoints: SeoLandingFeature[]
  features: SeoLandingFeature[]
  proofPoints: string[]
  faqs: SeoLandingFaq[]
}

type HighIntentSeoPageProps = {
  data: SeoLandingPageData
}

export function HighIntentSeoPage({ data }: HighIntentSeoPageProps) {
  const registerUrl = `/register?utm_source=website&utm_campaign=${data.campaign}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `${SITE_NAME} — ${data.title}`,
        url: data.pageUrl,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: data.description,
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
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'WebPage',
        url: data.pageUrl,
        name: data.title,
        datePublished: '2026-06-28',
        dateModified: '2026-06-28',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
          <div className="absolute left-1/2 top-0 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-100/50 to-teal-100/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-20 md:grid-cols-[1.05fr_0.95fr] md:pb-20 md:pt-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                <Sparkles className="h-4 w-4" />
                {data.eyebrow}
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                {data.title}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {data.highlightedTitle}
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl">
                {data.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={registerUrl}>
                  <Button size="lg" className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required. £8/user/month.</p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-xl shadow-emerald-900/10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">Team leave snapshot</p>
                  <p className="text-xs text-gray-500">Live requests and balances</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Synced
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-gray-50 p-4">
                    <p className="text-2xl font-extrabold text-emerald-600">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                {['Holiday request', 'Sick leave record', 'Balance update'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{item}</span>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-gray-50/60">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Search intent</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Built for buyers who need a working leave system now
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">{data.searchIntent}</p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Replace manual leave admin with a simple system
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Leavely keeps requests, approvals, balances, sickness records, and team visibility in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {data.painPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-gray-50/60">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Everything included at one clear price
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                No HR suite bloat, no feature tiers, no implementation project. Just the leave tools UK teams actually use.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
            <div>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Made for UK small businesses
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Set up your leave year, invite your employees, and move requests out of spreadsheets and inboxes without changing payroll, billing, or your existing HR process.
              </p>
              <div className="mt-8">
                <Link href={registerUrl}>
                  <Button size="lg" className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold hover:from-emerald-700 hover:to-teal-700">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.proofPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-xl border bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <p className="text-sm leading-relaxed text-gray-600">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-gray-50/60">
          <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white p-6 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-900">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Start tracking leave properly today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
              Create your workspace, add your team, and let employees request leave from day one.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={registerUrl}>
                <Button size="lg" className="h-12 bg-white px-8 text-base font-semibold text-emerald-700 shadow-lg hover:bg-gray-50">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="h-12 border-white/30 px-8 text-base text-white hover:bg-white/10">
                  View pricing
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

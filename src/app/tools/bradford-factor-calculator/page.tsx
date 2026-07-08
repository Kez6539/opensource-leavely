import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import BradfordFactorCalculator from './calculator'

const pageUrl = `${SITE_URL}/tools/bradford-factor-calculator`

export const metadata: Metadata = {
  title: 'Bradford Factor Calculator — Free Online Tool',
  description:
    'Calculate Bradford Factor scores instantly with our free online calculator. Enter absence spells and total days to get a colour-coded risk level with recommended HR actions. Used by UK businesses.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Bradford Factor calculator',
    'Bradford Factor calculator online',
    'Bradford Factor calculator free',
    'Bradford Factor score calculator',
    'Bradford Factor formula calculator',
    'calculate Bradford Factor',
    'Bradford Factor tool',
    'absence management calculator',
    'Bradford Factor trigger points',
    'Bradford Factor thresholds UK',
    'employee absence calculator',
    'Bradford Factor explained',
  ],
  openGraph: {
    title: 'Bradford Factor Calculator — Free Online Tool',
    description:
      'Calculate Bradford Factor scores instantly. Enter absence spells and days to get a colour-coded risk level with recommended actions.',
    url: pageUrl,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bradford Factor Calculator',
  description:
    'Free online Bradford Factor calculator. Enter the number of absence spells and total days absent to calculate the Bradford Factor score with colour-coded risk levels and recommended HR actions.',
  url: pageUrl,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
  },
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
}

export default function BradfordFactorCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/blog/bradford-factor-explained"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Bradford Factor explained
          </Link>

          <div className="mb-10">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Free Tool
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Bradford Factor Calculator
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Enter the number of absence spells and total days absent to calculate an employee&apos;s Bradford Factor score. Results update instantly with a colour-coded risk level and recommended action.
          </p>

          <BradfordFactorCalculator />
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}

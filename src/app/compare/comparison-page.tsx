import Link from 'next/link'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export interface ComparisonFeature {
  name: string
  leavely: boolean | string
  competitor: boolean | string
}

export interface ComparisonData {
  competitor: string
  tagline: string
  competitorPrice: string
  leavelyPrice: string
  intro: string
  features: ComparisonFeature[]
  whySwitch: string[]
  disclaimer: string
  relatedComparisons: { name: string; slug: string }[]
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
  if (value === false) return <X className="h-5 w-5 text-red-300 mx-auto" />
  return <span className="text-sm text-amber-600 font-medium">{value}</span>
}

export function ComparisonPage({ data }: { data: ComparisonData }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Leavely vs ${data.competitor} — Leave Management Software Comparison`,
    description: `Compare Leavely and ${data.competitor}. Feature-by-feature breakdown of two UK leave management tools.`,
    url: `${SITE_URL}/compare/${data.competitor.toLowerCase().replace(/\s+/g, '-')}`,
  }

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
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
          <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
            <Link href="/compare" className="text-sm text-emerald-600 hover:underline font-medium mb-4 inline-block">
              &larr; All comparisons
            </Link>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Leavely vs {data.competitor}
            </h1>
            <p className="mt-4 text-sm text-gray-400">{data.tagline}</p>
            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 p-6 text-center">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-1">Leavely</p>
              <p className="text-3xl font-extrabold text-gray-900">{data.leavelyPrice}</p>
              <p className="text-sm text-gray-500 mt-1">All features included. No tiers.</p>
            </div>
            <div className="rounded-2xl border bg-white p-6 text-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{data.competitor}</p>
              <p className="text-3xl font-extrabold text-gray-900">{data.competitorPrice}</p>
              <p className="text-sm text-gray-400 mt-1">Pricing at time of writing</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border bg-white p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-gray-900">Ready to compare with your own team?</p>
              <p className="text-sm text-gray-500 mt-1">
                Start a 14-day trial with every Leavely feature included.
              </p>
            </div>
            <Link href="/register" className="shrink-0">
              <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Table */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              Feature comparison
            </h2>
            <p className="text-center text-xs text-gray-400 mb-10">
              {data.disclaimer}
            </p>
            <div className="rounded-2xl border bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Feature</th>
                    <th className="text-center px-6 py-4 font-semibold text-emerald-600 bg-emerald-50/50 w-32">Leavely</th>
                    <th className="text-center px-6 py-4 font-semibold text-gray-500 w-32">{data.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((f, i) => (
                    <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                      <td className="px-6 py-3.5 font-medium text-gray-700">{f.name}</td>
                      <td className="text-center px-6 py-3.5 bg-emerald-50/20"><Cell value={f.leavely} /></td>
                      <td className="text-center px-6 py-3.5"><Cell value={f.competitor} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why Switch */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-10">
            Why teams choose Leavely over {data.competitor}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.whySwitch.map((reason) => (
              <div key={reason} className="flex items-start gap-3 rounded-xl border p-5">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              See for yourself. No credit card, no commitment.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h3 className="font-bold text-gray-900 mb-4">Other comparisons</h3>
          <div className="flex flex-wrap gap-3">
            {data.relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
              >
                Leavely vs {c.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

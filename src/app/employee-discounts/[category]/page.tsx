import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { CATEGORIES } from '@/lib/perks/categories'
import { OFFERS } from '@/lib/perks/data'
import { OfferCard } from '@/components/perks/offer-card'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'
import type { CategorySlug } from '@/lib/perks/types'

interface Params { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.slug === category)
  if (!cat) return { title: 'Category not found' }
  const url = `${SITE_URL}/employee-discounts/${cat.slug}`
  return {
    title: `${cat.name} Employee Discounts UK | Leavely Perks`,
    description: `${cat.description}. Curated UK employee discount codes and perks. Updated weekly.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${cat.name} Employee Discounts UK | Leavely Perks`,
      description: cat.description,
      url,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params
  const cat = CATEGORIES.find((c) => c.slug === category as CategorySlug)
  if (!cat) notFound()

  const offers = OFFERS.filter((o) => o.category === cat.slug)
  const otherCats = CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 6)

  const url = `${SITE_URL}/employee-discounts/${cat.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cat.name} Employee Discounts`,
    url,
    description: cat.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: offers.map((o, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: o.title,
        url: o.ctaUrl,
      })),
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className={`relative overflow-hidden bg-gradient-to-br ${cat.accent} text-white`}>
          <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
            <Link href="/employee-discounts" className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-5">
              <ArrowLeft className="h-4 w-4" /> All employee discounts
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{cat.emoji}</span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-1">Category</p>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{cat.name} discounts for UK employees</h1>
              </div>
            </div>
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed">{cat.intro}</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          {offers.length === 0 ? (
            <p className="text-gray-500">No live offers in this category right now — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}

          <AffiliateDisclosure />

          <section className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Browse other categories</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {otherCats.map((c) => (
                <Link key={c.slug} href={`/employee-discounts/${c.slug}`} className="rounded-xl border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all flex items-center gap-3">
                  <span className="text-2xl">{c.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}

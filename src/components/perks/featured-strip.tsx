import { OfferCard } from './offer-card'
import { getFeaturedOffers, getTrendingOffers } from '@/lib/perks/data'

export function FeaturedStrip() {
  const featured = getFeaturedOffers()
  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Featured deals</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Highest-value perks this month</h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {featured.slice(0, 4).map((offer) => (
          <OfferCard key={offer.id} offer={offer} size="lg" />
        ))}
      </div>
    </section>
  )
}

export function TrendingStrip() {
  const trending = getTrendingOffers()
  if (trending.length === 0) return null
  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mb-1">🔥 Trending</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">What employees are using right now</h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {trending.slice(0, 4).map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  )
}

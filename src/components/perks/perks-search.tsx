'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { OfferCard } from './offer-card'
import { CATEGORIES } from '@/lib/perks/categories'
import type { Offer } from '@/lib/perks/types'

interface Props {
  offers: Offer[]
}

export function PerksSearch({ offers }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return offers.filter((o) => {
      if (activeCategory !== 'all' && o.category !== activeCategory) return false
      if (!q) return true
      return (
        o.merchant.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q)
      )
    })
  }, [query, activeCategory, offers])

  return (
    <div>
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search merchants, brands or deals..."
          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-gray-900 placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${activeCategory === 'all' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}
        >
          All ({offers.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = offers.filter((o) => o.category === cat.slug).length
          if (count === 0) return null
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${activeCategory === cat.slug ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}
            >
              {cat.emoji} {cat.shortName} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-gray-50">
          <p className="text-gray-500">No deals match that search. Try fewer keywords or pick a different category.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  )
}

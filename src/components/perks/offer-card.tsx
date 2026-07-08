import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { Offer } from '@/lib/perks/types'

interface OfferCardProps {
  offer: Offer
  size?: 'sm' | 'md' | 'lg'
}

export function OfferCard({ offer, size = 'md' }: OfferCardProps) {
  const isLarge = size === 'lg'
  return (
    <article className="group relative bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col">
      {(offer.featured || offer.trending) && (
        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          {offer.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-600 text-white">Featured</span>
          )}
          {offer.trending && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-orange-500 text-white">Trending</span>
          )}
        </div>
      )}

      <div className="p-5 flex items-center gap-4 border-b border-gray-100">
        <div className={`flex items-center justify-center rounded-xl shadow-sm ${offer.logoBg} ${offer.logoColor} font-extrabold ${isLarge ? 'w-16 h-16 text-xl' : 'w-14 h-14 text-lg'}`}>
          {offer.logoText || offer.merchant.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-0.5">{offer.merchant}</p>
          <p className="text-2xl font-extrabold text-emerald-600 leading-none">{offer.discount}</p>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-2 leading-snug">{offer.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{offer.description}</p>

        <div className="space-y-3">
          <Link
            href={offer.ctaUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold px-4 py-2.5 shadow-md shadow-emerald-500/20 transition-all"
          >
            Get this deal
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700 select-none">Terms & expiry</summary>
            <div className="mt-2 space-y-1">
              <p>{offer.terms}</p>
              {offer.expires && <p className="text-gray-400">Expires {new Date(offer.expires).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            </div>
          </details>
        </div>
      </div>
    </article>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/perks/categories'
import { OFFERS } from '@/lib/perks/data'

export function CategoryGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => {
        const count = OFFERS.filter((o) => o.category === cat.slug).length
        return (
          <Link
            key={cat.slug}
            href={`/employee-discounts/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-lg hover:border-emerald-300 transition-all"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${cat.accent}`} />
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{cat.emoji}</span>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
            <p className="text-xs text-gray-500 mb-2 leading-relaxed line-clamp-2">{cat.description}</p>
            <p className="text-xs font-semibold text-emerald-600">{count} {count === 1 ? 'offer' : 'offers'}</p>
          </Link>
        )
      })}
    </div>
  )
}

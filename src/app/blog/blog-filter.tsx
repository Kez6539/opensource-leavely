'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Post {
  slug: string
  title: string
  description: string
  category: string
  readTime: string
  featured?: boolean
}

export function BlogFilter({ posts }: { posts: Post[] }) {
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({posts.filter((p) => p.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border bg-white p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 flex-1">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{post.description}</p>
            <span className="inline-flex items-center text-sm font-semibold text-emerald-600">
              Read article <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No articles in this category yet.</p>
      )}
    </>
  )
}

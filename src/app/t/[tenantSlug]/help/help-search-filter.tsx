'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Users, User } from 'lucide-react'

interface GuideCard {
  slug: string
  title: string
  description: string
  category: 'manager' | 'employee' | 'both'
}

interface HelpSearchFilterProps {
  tenantSlug: string
  managerGuides: GuideCard[]
  employeeGuides: GuideCard[]
}

export function HelpSearchFilter({ tenantSlug, managerGuides, employeeGuides }: HelpSearchFilterProps) {
  const [search, setSearch] = useState('')

  const query = search.toLowerCase().trim()

  const filterGuides = (guides: GuideCard[]) =>
    guides.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query)
    )

  const filteredManager = filterGuides(managerGuides)
  const filteredEmployee = filterGuides(employeeGuides)

  const noResults = query && filteredManager.length === 0 && filteredEmployee.length === 0

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search guides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-card pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {noResults && (
        <div className="text-center py-12">
          <BookOpen className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No guides found matching &ldquo;{search}&rdquo;</p>
        </div>
      )}

      {/* Manager Guides */}
      {filteredManager.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Manager Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredManager.map((guide) => (
              <GuideCardLink
                key={guide.slug}
                guide={guide}
                tenantSlug={tenantSlug}
              />
            ))}
          </div>
        </section>
      )}

      {/* Employee Guides */}
      {filteredEmployee.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Employee Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployee.map((guide) => (
              <GuideCardLink
                key={guide.slug}
                guide={guide}
                tenantSlug={tenantSlug}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function GuideCardLink({ guide, tenantSlug }: { guide: GuideCard; tenantSlug: string }) {
  return (
    <Link
      href={`/t/${tenantSlug}/help/${guide.slug}`}
      className="rounded-lg border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
            guide.category === 'manager'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300'
              : guide.category === 'employee'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300'
          }`}
        >
          {guide.category === 'manager' ? 'Manager' : guide.category === 'employee' ? 'Employee' : 'Everyone'}
        </span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{guide.description}</p>
    </Link>
  )
}

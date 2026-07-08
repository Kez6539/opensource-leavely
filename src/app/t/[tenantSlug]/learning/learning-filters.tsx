'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'wellbeing', label: 'Wellbeing' },
  { value: 'skills', label: 'Skills' },
  { value: 'onboarding', label: 'Onboarding' },
]

interface LearningFiltersProps {
  currentCategory?: string
  tenantSlug: string
}

export function LearningFilters({ currentCategory, tenantSlug }: LearningFiltersProps) {
  const active = currentCategory ?? 'all'

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.value}
          href={
            cat.value === 'all'
              ? `/t/${tenantSlug}/learning`
              : `/t/${tenantSlug}/learning?category=${cat.value}`
          }
          className={cn(
            'inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
            active === cat.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  )
}

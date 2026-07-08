'use client'

import { useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

export function ProfileTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')

  return (
    <div>
      <div className="border-b mb-6 overflow-x-auto">
        <nav className="flex gap-6 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                'pb-3 text-sm font-medium border-b-2 transition-colors shrink-0',
                active === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {tabs.find((t) => t.id === active)?.content}
    </div>
  )
}

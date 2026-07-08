'use client'

import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown, Check } from 'lucide-react'

export interface TenantOption {
  slug: string
  name: string
}

interface TenantSwitcherProps {
  currentSlug: string
  tenants: TenantOption[]
}

export function TenantSwitcher({ currentSlug, tenants }: TenantSwitcherProps) {
  const router = useRouter()
  const current = tenants.find(t => t.slug === currentSlug)

  if (tenants.length <= 1) {
    return <div className="font-semibold">{current?.name ?? currentSlug}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 font-semibold">
          {current?.name ?? currentSlug}
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {tenants.map(t => (
          <DropdownMenuItem
            key={t.slug}
            onClick={() => {
              if (t.slug !== currentSlug) {
                router.push(`/t/${t.slug}`)
              }
            }}
          >
            {t.slug === currentSlug && <Check className="h-4 w-4 mr-2" />}
            {t.slug !== currentSlug && <span className="w-4 mr-2" />}
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

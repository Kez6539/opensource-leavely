'use client'

import { Button } from '@/components/ui/button'
import { Zap, X, AlertTriangle, Clock } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface PaywallBannerProps {
  tenantSlug: string
  message?: string
  variant?: 'trial' | 'upgrade' | 'limit'
  actionLabel?: string
}

const variantConfig = {
  trial: {
    bg: 'bg-blue-50 border-blue-200/60',
    text: 'text-blue-800',
    icon: Clock,
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white border-0',
  },
  upgrade: {
    bg: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200/60',
    text: 'text-amber-800',
    icon: Zap,
    btnClass: 'bg-amber-600 hover:bg-amber-700 text-white border-0',
  },
  limit: {
    bg: 'bg-red-50 border-red-200/60',
    text: 'text-red-800',
    icon: AlertTriangle,
    btnClass: 'bg-red-600 hover:bg-red-700 text-white border-0',
  },
}

export function PaywallBanner({
  tenantSlug,
  message = 'Upgrade your plan to unlock this feature.',
  variant = 'upgrade',
  actionLabel,
}: PaywallBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div className={`flex items-center justify-between rounded-xl border p-4 mb-4 ${config.bg} ${config.text}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60 flex-shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/t/${tenantSlug}/settings/billing`}>
          <Button size="sm" className={config.btnClass}>
            {actionLabel || 'Upgrade now'}
          </Button>
        </Link>
        <button onClick={() => setDismissed(true)} className="p-1 hover:opacity-70 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function TrialBanner({ tenantSlug, daysLeft }: { tenantSlug: string; daysLeft: number }) {
  return (
    <PaywallBanner
      tenantSlug={tenantSlug}
      variant="trial"
      message={`Your free trial ends in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. Upgrade to keep your data.`}
    />
  )
}

export function LimitBanner({ tenantSlug, feature }: { tenantSlug: string; feature: string }) {
  return (
    <PaywallBanner
      tenantSlug={tenantSlug}
      variant="limit"
      message={`You've reached the limit for ${feature}. Upgrade to add more.`}
    />
  )
}

'use client'

import { useEffect } from 'react'
import { trackOAuthFailed } from '@/lib/analytics'

export function OAuthErrorTracker({ error, intent }: { error: string; intent: 'login' | 'register' }) {
  useEffect(() => {
    trackOAuthFailed('google', intent, error)
  }, [error, intent])
  return null
}

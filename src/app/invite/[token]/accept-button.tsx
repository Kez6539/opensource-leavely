'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { acceptInvite } from './actions'
import { Button } from '@/components/ui/button'

export function InviteAcceptButton({ token }: { token: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleAccept() {
    setLoading(true)
    setError('')
    try {
      const result = await acceptInvite(token)
      router.push(`/t/${result.tenantSlug}/dashboard`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {error && <p className="text-sm text-destructive mb-2">{error}</p>}
      <Button onClick={handleAccept} disabled={loading}>
        {loading ? 'Joining...' : 'Accept Invite'}
      </Button>
    </div>
  )
}

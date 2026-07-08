'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared'
import { AlertTriangle } from 'lucide-react'
import { captureError } from '@/lib/analytics'

// (#164) Scoped error boundary for the /performance subtree.
export default function PerformanceError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ tenantSlug: string }>()
  const tenantSlug = params?.tenantSlug

  useEffect(() => {
    captureError(error, { boundary: 'performance', digest: error.digest })
  }, [error])

  return (
    <div className="py-16">
      <EmptyState
        icon={<AlertTriangle className="h-10 w-10" />}
        title="Couldn't load performance"
        description="Something went wrong loading the performance page. Try again, or head back to the dashboard."
        action={
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={reset}>Try again</Button>
            {tenantSlug && (
              <Button asChild>
                <Link href={`/t/${tenantSlug}/dashboard`}>Back to dashboard</Link>
              </Button>
            )}
          </div>
        }
      />
    </div>
  )
}

'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared'
import { AlertTriangle } from 'lucide-react'
import { captureError } from '@/lib/analytics'

// (#164) Scoped error boundary for the /reports subtree.
export default function ReportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ tenantSlug: string }>()
  const tenantSlug = params?.tenantSlug

  useEffect(() => {
    captureError(error, { boundary: 'reports', digest: error.digest })
  }, [error])

  return (
    <div className="py-16">
      <EmptyState
        icon={<AlertTriangle className="h-10 w-10" />}
        title="Couldn't load report"
        description="Something went wrong rendering this report. Try again, or head back to the dashboard."
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

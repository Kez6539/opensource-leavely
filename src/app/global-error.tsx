'use client'

/**
 * Catastrophic crash boundary — only triggered when the root layout itself
 * throws (e.g. font loading explodes, providers crash). Must include its own
 * <html> + <body> because the regular layout never rendered.
 *
 * Keep this dependency-free: no Tailwind config, no shared components, no
 * imports that could themselves fail. Inline styles only.
 */

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Best-effort PostHog ping. Never throw from telemetry.
    try {
      const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      if (apiKey) {
        fetch('https://eu.i.posthog.com/i/v0/e/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: apiKey,
            event: '$exception',
            distinct_id: 'global-error-boundary',
            properties: {
              $exception_message: error.message,
              $exception_type: error.name,
              $exception_stack_trace_raw: error.stack,
              boundary: 'global',
              digest: error.digest,
            },
          }),
        }).catch(() => {})
      }
    } catch {
      // ignore
    }
  }, [error])

  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            padding: '32px',
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px' }}>
            Leavely is having trouble loading
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>
            We hit an unexpected error. Please try again — if it keeps happening, contact
            support@leavely.online.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffff',
              background: '#0f172a',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

/**
 * Server-side error capture to PostHog.
 *
 * Why a separate file from `analytics.ts`: `posthog-js` is browser-only and
 * doesn't run on Cloudflare Workers. PostHog has an HTTP API we can POST to
 * directly. This helper lets server actions and API routes report errors
 * that would otherwise vanish into a CF Workers log.
 *
 * Usage:
 *   import { captureServerError } from '@/lib/error-capture'
 *   .catch((err) => captureServerError(err, { where: 'sendLeaveApprovedEmail' }))
 *
 * Fails silently — error capture must NEVER throw. The caller's actual flow
 * is more important than our telemetry.
 */

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

export async function captureServerError(
  error: unknown,
  context?: Record<string, unknown>
): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!apiKey) return
  try {
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack : undefined
    const errorType = error instanceof Error ? error.name : 'UnknownError'
    await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        event: '$exception',
        distinct_id: (context?.userId as string) || 'server',
        properties: {
          $exception_message: message,
          $exception_type: errorType,
          $exception_stack_trace_raw: stack,
          $process: 'server',
          ...context,
        },
      }),
    }).catch(() => {})
  } catch {
    // never throw from telemetry
  }
}

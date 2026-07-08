/**
 * Server-side PostHog event capture for product funnel events.
 *
 * `posthog-js` is browser-only, so server actions and cron routes use the
 * PostHog HTTP capture endpoint directly. This helper never throws: analytics
 * must not affect user-facing writes.
 */

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'

export type ServerAnalyticsEvent =
  | 'trial_requested'
  | 'signup'
  | 'org_created'
  | 'employee_added'
  | 'leave_created'
  | 'leave_approved'
  | 'trial_milestone_completed'
  | 'trial_at_risk'
  | 'trial_expired'
  | 'payment_attempt'

type ServerAnalyticsProperties = Record<string, unknown>

type TrackServerEventInput = {
  distinctId?: string
  tenantId?: string
  userId?: string
  properties?: ServerAnalyticsProperties
}

export async function trackServerEvent(
  event: ServerAnalyticsEvent,
  input: TrackServerEventInput = {},
): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!apiKey) return

  try {
    const distinctId = input.distinctId || input.userId || input.tenantId || 'server'
    const properties: ServerAnalyticsProperties = {
      $process: 'server',
    }
    if (input.tenantId) properties.tenant_id = input.tenantId
    if (input.userId) properties.user_id = input.userId
    if (input.properties) Object.assign(properties, input.properties)

    await fetch(`${POSTHOG_HOST}/i/v0/e/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        distinct_id: distinctId,
        properties,
      }),
    }).catch(() => {})
  } catch {
    // never throw from analytics
  }
}

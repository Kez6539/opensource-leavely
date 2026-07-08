/**
 * Server-side Google Ads offline conversion upload.
 *
 * Mirrors the ctn-redirects worker pattern: exchange refresh token for an
 * access token, POST a single conversion to uploadClickConversions. Runs
 * fire-and-forget — failure must never block the user's signup flow.
 *
 * Secrets required in the Worker env (set via `wrangler secret put`):
 *   GADS_DEVELOPER_TOKEN
 *   GADS_CLIENT_ID
 *   GADS_CLIENT_SECRET
 *   GADS_REFRESH_TOKEN
 *   GADS_CUSTOMER_ID         (Google Ads customer id, no dashes — 2782172035)
 *   GADS_CONVERSION_ACTION_ID (the conversion action id — 7583666846 for Leavely Try Signup)
 *
 * Server actions in App Router cannot read Cloudflare bindings via `env`,
 * so the secrets must be exposed as plain environment variables in
 * wrangler.toml. opennextjs-cloudflare hoists `[vars]` into process.env.
 */

const GADS_API_VERSION = 'v23'

type GadsEnv = {
  developerToken: string
  clientId: string
  clientSecret: string
  refreshToken: string
  customerId: string
  conversionActionId: string
}

function readEnv(): GadsEnv | null {
  const e = process.env
  const developerToken = e.GADS_DEVELOPER_TOKEN
  const clientId = e.GADS_CLIENT_ID
  const clientSecret = e.GADS_CLIENT_SECRET
  const refreshToken = e.GADS_REFRESH_TOKEN
  const customerId = e.GADS_CUSTOMER_ID
  const conversionActionId = e.GADS_CONVERSION_ACTION_ID
  if (
    !developerToken ||
    !clientId ||
    !clientSecret ||
    !refreshToken ||
    !customerId ||
    !conversionActionId
  ) {
    return null
  }
  return {
    developerToken,
    clientId,
    clientSecret,
    refreshToken,
    customerId,
    conversionActionId,
  }
}

export async function uploadGoogleAdsConversion(
  gclid: string,
  opts: { value?: number; currency?: string } = {},
): Promise<void> {
  if (!gclid) return
  const env = readEnv()
  if (!env) {
    console.warn('[gads] secrets missing — skipping conversion upload')
    return
  }
  try {
    const tokRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.clientId,
        client_secret: env.clientSecret,
        refresh_token: env.refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    })
    if (!tokRes.ok) {
      console.error('[gads] token failed', tokRes.status, await tokRes.text())
      return
    }
    const { access_token } = (await tokRes.json()) as { access_token: string }

    const nowIso = new Date()
      .toISOString()
      .replace('T', ' ')
      .replace(/\.\d+Z$/, '+00:00')

    const body = {
      conversions: [
        {
          gclid,
          conversion_action: `customers/${env.customerId}/conversionActions/${env.conversionActionId}`,
          conversion_date_time: nowIso,
          conversion_value: opts.value ?? 8,
          currency_code: opts.currency ?? 'GBP',
        },
      ],
      partial_failure: true,
      validate_only: false,
    }

    const convRes = await fetch(
      `https://googleads.googleapis.com/${GADS_API_VERSION}/customers/${env.customerId}:uploadClickConversions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'developer-token': env.developerToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
    const respText = await convRes.text()
    if (!convRes.ok) {
      console.error('[gads] upload failed', convRes.status, respText)
      return
    }
    console.log('[gads] upload ok', respText)
  } catch (e) {
    console.error('[gads] error', e)
  }
}

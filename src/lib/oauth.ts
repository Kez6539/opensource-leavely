import * as arctic from 'arctic'

export const google = new arctic.Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!,
)

export const linkedin = new arctic.LinkedIn(
  process.env.LINKEDIN_CLIENT_ID!,
  process.env.LINKEDIN_CLIENT_SECRET!,
  process.env.LINKEDIN_REDIRECT_URI!,
)

/**
 * Microsoft Entra ID (Azure AD) provider.
 *
 * Uses the multi-tenant `common` endpoint so both work-school accounts and
 * personal Microsoft accounts can sign in — UK SMEs frequently run on
 * Microsoft 365 and expect a "Continue with Microsoft" button.
 *
 * Gated by env vars: if MICROSOFT_CLIENT_ID is unset the export is null
 * and the marketing UI hides the button. To enable in prod:
 *   1. Register an Azure app at https://entra.microsoft.com → App registrations
 *   2. Add redirect URI: https://leavely.online/api/auth/microsoft/callback
 *   3. Set MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_REDIRECT_URI
 *      in Cloudflare Workers env (or .env for local).
 */
export const microsoftEnabled = !!(
  process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_REDIRECT_URI
)

export const microsoft = microsoftEnabled
  ? new arctic.MicrosoftEntraId(
      'common',
      process.env.MICROSOFT_CLIENT_ID!,
      process.env.MICROSOFT_CLIENT_SECRET ?? null,
      process.env.MICROSOFT_REDIRECT_URI!,
    )
  : null

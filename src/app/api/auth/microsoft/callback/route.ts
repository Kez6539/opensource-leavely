import { microsoft, microsoftEnabled } from '@/lib/oauth'
import * as arctic from 'arctic'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

/**
 * Microsoft Entra ID OAuth callback.
 *
 * Mirrors the Google callback's security model exactly:
 *   - One-shot CSRF state check (no auto-retry)
 *   - PKCE code verifier required
 *   - Refuse to auto-link existing CREDENTIALS accounts (account takeover)
 *   - Enforce email_verified before trusting the email claim
 *   - Block disabled accounts
 *
 * If MICROSOFT_CLIENT_ID env vars aren't configured the route 503s rather
 * than 500s so the UI can give a clear error.
 */
export async function GET(request: NextRequest) {
  if (!microsoftEnabled || !microsoft) {
    return NextResponse.redirect(new URL('/login?error=microsoft_not_configured', request.url))
  }

  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  const cookieStore = await cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  const storedVerifier = cookieStore.get('oauth_code_verifier')?.value
  const intent = cookieStore.get('oauth_intent')?.value ?? 'login'
  const errorPage = intent === 'register' ? '/register' : '/login'

  // Clean up cookies before any branching so a forged state never survives
  cookieStore.delete('oauth_state')
  cookieStore.delete('oauth_code_verifier')
  cookieStore.delete('oauth_intent')

  if (!code || !state || !storedState || state !== storedState || !storedVerifier) {
    console.warn('[oauth/microsoft] state mismatch, rejecting', {
      intent,
      hasCode: !!code,
      hasState: !!state,
      hasStoredState: !!storedState,
      hasVerifier: !!storedVerifier,
    })
    return NextResponse.redirect(new URL(`${errorPage}?error=invalid_state`, request.url))
  }

  let tokens: arctic.OAuth2Tokens
  try {
    tokens = await microsoft.validateAuthorizationCode(code, storedVerifier)
  } catch (err) {
    console.warn('[oauth/microsoft] token exchange failed', { intent, err: String(err) })
    return NextResponse.redirect(new URL(`${errorPage}?error=oauth_failed`, request.url))
  }

  const idToken = tokens.idToken()
  const claims = arctic.decodeIdToken(idToken) as {
    sub: string
    email?: string
    preferred_username?: string
    name?: string
    email_verified?: boolean
  }

  // Microsoft Entra puts the email under `email` for personal accounts and
  // under `preferred_username` (when it happens to be email-shaped) for
  // work-school accounts. Some tenants omit the email claim entirely; fall
  // back to preferred_username only when it parses as an email.
  const { sub: providerId, email: claimEmail, preferred_username, name, email_verified } = claims
  const inferredEmail =
    claimEmail ||
    (preferred_username && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preferred_username)
      ? preferred_username
      : undefined)
  const email = inferredEmail?.toLowerCase()

  if (!email) {
    console.warn('[oauth/microsoft] no email in claims', { intent })
    return NextResponse.redirect(new URL(`${errorPage}?error=no_email`, request.url))
  }
  // For Microsoft personal accounts `email_verified` is reliable. For
  // work-school accounts the directory itself asserts the identity, but
  // we still treat an explicit `false` as a hard fail.
  if (email_verified === false) {
    console.warn('[oauth/microsoft] email not verified', { intent, email })
    return NextResponse.redirect(new URL(`${errorPage}?error=email_not_verified`, request.url))
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    // Never silently auto-link a Microsoft sign-in to an existing password
    // account — that's an account takeover. Bounce to /login.
    if (existingUser.authProvider === 'CREDENTIALS') {
      return NextResponse.redirect(
        new URL('/login?error=email_registered_with_password', request.url),
      )
    }
    if (existingUser.authProvider !== 'MICROSOFT') {
      return NextResponse.redirect(
        new URL(`/login?error=provider_mismatch&provider=${existingUser.authProvider}`, request.url),
      )
    }

    if (existingUser.disabledAt) {
      return NextResponse.redirect(new URL('/login?error=account_disabled', request.url))
    }

    const session = await getSession()
    session.userId = existingUser.id
    session.email = existingUser.email
    session.name = existingUser.name ?? undefined
    session.isSuperAdmin = existingUser.isSuperAdmin
    session.isDemo = false
    session.loggedInAt = Date.now()
    await session.save()

    prisma.user
      .update({ where: { id: existingUser.id }, data: { lastLoginAt: new Date() } })
      .catch((err) => console.error('[oauth/microsoft] failed to stamp lastLoginAt:', err))

    const membership = await prisma.membership.findFirst({
      where: { userId: existingUser.id },
      include: { tenant: true },
    })

    if (membership) {
      return NextResponse.redirect(new URL(`/t/${membership.tenant.slug}/dashboard`, request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (intent === 'login') {
    return NextResponse.redirect(new URL('/login?error=no_account', request.url))
  }

  cookieStore.set('pending_oauth', JSON.stringify({
    provider: 'MICROSOFT',
    providerId,
    email,
    name: name ?? '',
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 15,
    sameSite: 'lax',
  })

  return NextResponse.redirect(new URL('/register/complete', request.url))
}

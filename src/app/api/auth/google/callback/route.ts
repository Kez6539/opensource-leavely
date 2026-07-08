import { google } from '@/lib/oauth'
import * as arctic from 'arctic'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  const cookieStore = await cookies()
  const storedState = cookieStore.get('oauth_state')?.value
  const storedVerifier = cookieStore.get('oauth_code_verifier')?.value
  const intent = cookieStore.get('oauth_intent')?.value ?? 'login'
  const errorPage = intent === 'register' ? '/register' : '/login'

  // Clean up cookies
  cookieStore.delete('oauth_state')
  cookieStore.delete('oauth_code_verifier')
  cookieStore.delete('oauth_intent')

  if (!code || !state || !storedState || state !== storedState || !storedVerifier) {
    // (#170) Hard-fail on state mismatch with no retry. The previous
    // implementation auto-retried by redirecting back to /api/auth/google,
    // which defeated the CSRF guard — a forged `state` only had to survive
    // one retry to bypass it. State verification should be one-shot.
    console.warn('[oauth/google] state mismatch, rejecting', {
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
    tokens = await google.validateAuthorizationCode(code, storedVerifier)
  } catch (err) {
    console.warn('[oauth/google] token exchange failed', { intent, err: String(err) })
    return NextResponse.redirect(new URL(`${errorPage}?error=oauth_failed`, request.url))
  }

  const idToken = tokens.idToken()
  const claims = arctic.decodeIdToken(idToken) as {
    sub: string
    email: string
    name?: string
    email_verified?: boolean
  }

  const { sub: providerId, email, name, email_verified } = claims
  if (!email) {
    console.warn('[oauth/google] no email in claims', { intent })
    return NextResponse.redirect(new URL(`${errorPage}?error=no_email`, request.url))
  }
  // Google must confirm the email is verified before we trust it as an
  // identity claim — otherwise an attacker could create a Google account
  // with any email they don't own.
  if (email_verified !== true) {
    console.warn('[oauth/google] email not verified', { intent, email })
    return NextResponse.redirect(new URL(`${errorPage}?error=email_not_verified`, request.url))
  }

  // Check if user exists by email
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    // Never silently auto-link a Google sign-in to an existing password
    // account — that's an account takeover. The owner must sign in with
    // their password and link Google from settings.
    if (existingUser.authProvider === 'CREDENTIALS') {
      // Always bounce to /login here — the user has a password account,
      // so signing in (not registering) is the correct next action even
      // if they clicked "Continue with Google" on the register page.
      return NextResponse.redirect(
        new URL('/login?error=email_registered_with_password', request.url),
      )
    }
    if (existingUser.authProvider !== 'GOOGLE') {
      return NextResponse.redirect(
        new URL(`/login?error=provider_mismatch&provider=${existingUser.authProvider}`, request.url),
      )
    }

    if (existingUser.disabledAt) {
      return NextResponse.redirect(new URL('/login?error=account_disabled', request.url))
    }

    // Sign in
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
      .catch((err) => console.error('[oauth/google] failed to stamp lastLoginAt:', err))

    const membership = await prisma.membership.findFirst({
      where: { userId: existingUser.id },
      include: { tenant: true },
    })

    if (membership) {
      return NextResponse.redirect(new URL(`/t/${membership.tenant.slug}/dashboard`, request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  // No existing user
  if (intent === 'login') {
    return NextResponse.redirect(new URL('/login?error=no_account', request.url))
  }

  // Store pending OAuth data for registration completion
  cookieStore.set('pending_oauth', JSON.stringify({
    provider: 'GOOGLE',
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

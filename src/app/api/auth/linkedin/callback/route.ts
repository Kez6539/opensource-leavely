import { linkedin } from '@/lib/oauth'
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
  const intent = cookieStore.get('oauth_intent')?.value ?? 'login'

  // Clean up cookies
  cookieStore.delete('oauth_state')
  cookieStore.delete('oauth_intent')

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL('/login?error=invalid_state', request.url))
  }

  let tokens: arctic.OAuth2Tokens
  try {
    tokens = await linkedin.validateAuthorizationCode(code)
  } catch {
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
  }

  const idToken = tokens.idToken()
  const claims = arctic.decodeIdToken(idToken) as {
    sub: string
    email: string
    name?: string
    email_verified?: boolean
  }

  const { sub: providerId, email, name, email_verified } = claims
  const errorPage = intent === 'register' ? '/register' : '/login'
  if (!email) {
    return NextResponse.redirect(new URL(`${errorPage}?error=no_email`, request.url))
  }
  // LinkedIn must confirm the email is verified before we trust it as an
  // identity claim — otherwise an attacker could create a LinkedIn account
  // with any email they don't own and use it to claim a Leavely account.
  if (email_verified !== true) {
    return NextResponse.redirect(new URL(`${errorPage}?error=email_not_verified`, request.url))
  }

  // Check if user exists by email
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    // Never silently auto-link a LinkedIn sign-in to an existing password
    // account — that's an account takeover. Mirror Google's behaviour:
    // bounce to /login and tell them to sign in with their password first.
    if (existingUser.authProvider === 'CREDENTIALS') {
      return NextResponse.redirect(
        new URL('/login?error=email_registered_with_password', request.url),
      )
    }
    if (existingUser.authProvider !== 'LINKEDIN') {
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
      .catch((err) => console.error('[oauth/linkedin] failed to stamp lastLoginAt:', err))

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
    provider: 'LINKEDIN',
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

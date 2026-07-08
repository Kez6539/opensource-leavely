import { linkedin } from '@/lib/oauth'
import * as arctic from 'arctic'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const intent = request.nextUrl.searchParams.get('intent') ?? 'login'

  // Note: Arctic's LinkedIn provider doesn't support PKCE (createAuthorizationURL
  // takes 2 args, no codeVerifier). The state cookie below provides CSRF
  // protection. If LinkedIn is misused as a vector this should be revisited.
  const state = arctic.generateState()
  const url = linkedin.createAuthorizationURL(state, ['openid', 'profile', 'email'])

  const cookieStore = await cookies()
  const secure = process.env.NODE_ENV === 'production'

  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure,
    path: '/',
    maxAge: 60 * 10,
    sameSite: 'lax',
  })
  cookieStore.set('oauth_intent', intent, {
    httpOnly: true,
    secure,
    path: '/',
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return NextResponse.redirect(url)
}

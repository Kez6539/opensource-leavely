import { microsoft, microsoftEnabled } from '@/lib/oauth'
import * as arctic from 'arctic'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (!microsoftEnabled || !microsoft) {
    return NextResponse.redirect(new URL('/login?error=microsoft_not_configured', request.url))
  }

  const intent = request.nextUrl.searchParams.get('intent') ?? 'login'

  const state = arctic.generateState()
  const codeVerifier = arctic.generateCodeVerifier()
  const url = microsoft.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
    'User.Read',
  ])

  const cookieStore = await cookies()
  const secure = process.env.NODE_ENV === 'production' || request.nextUrl.protocol === 'https:'

  cookieStore.set('oauth_state', state, {
    httpOnly: true,
    secure,
    path: '/',
    maxAge: 60 * 10,
    sameSite: 'lax',
  })
  cookieStore.set('oauth_code_verifier', codeVerifier, {
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

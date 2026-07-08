import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Content-Security-Policy. We use 'unsafe-inline' for styles because Tailwind +
// Next.js inline critical CSS, and 'unsafe-inline' for scripts is unfortunately
// required for Next.js's hydration boot script. Everything else is locked down.
//
// We do NOT allow 'unsafe-eval' — Next.js 16 + React 19 + opennextjs-cloudflare
// don't require it in production, and allowing it massively expands the blast
// radius of any reflected/stored XSS to include dynamic code execution. Dropped
// as part of the sell-ready sign-off pass.
//
// Allowed third parties:
//   - PostHog (analytics + error tracking) — eu.i.posthog.com + eu-assets
//   - Google Fonts — fonts.googleapis.com / fonts.gstatic.com
//   - Stripe.js — js.stripe.com (only loaded on billing/checkout pages)
//   - Crisp live chat — client.crisp.chat + relay/settings endpoints
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.i.posthog.com https://*.posthog.com https://js.stripe.com https://client.crisp.chat",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://client.crisp.chat",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com https://client.crisp.chat data:",
  "connect-src 'self' https://*.i.posthog.com https://*.posthog.com https://api.stripe.com https://*.crisp.chat wss://*.crisp.chat",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://client.crisp.chat",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': csp,
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('cc-session')

  // Redirect dead paths to correct destinations (preserving query params)
  if (pathname === '/affiliates' || pathname === '/partners') {
    const url = request.nextUrl.clone()
    url.pathname = '/partners/register'
    return NextResponse.redirect(url)
  }
  if (pathname === '/clock') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (pathname === '/solutions') {
    return NextResponse.redirect(new URL('/features', request.url), 301)
  }
  if (pathname.startsWith('/locations')) {
    return NextResponse.redirect(new URL('/', request.url), 301)
  }

  // Protect /t/* routes — check for session cookie. (#176) Preserve the
  // intended destination as `?redirect=<path>` so the user lands where
  // they meant to after signing in. Without this, deep-link emails and
  // notification permalinks all degrade to "your default dashboard".
  if (pathname.startsWith('/t/') || pathname.startsWith('/admin')) {
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      // Same-origin path only — never echo a full URL into the redirect
      // param. The login action also re-validates this.
      const target = pathname + (request.nextUrl.search || '')
      if (target.startsWith('/') && !target.startsWith('//')) {
        loginUrl.searchParams.set('redirect', target)
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  // Forward the pathname so server components can read the active route
  // (Next 16 doesn't expose this directly to layouts). Used by the tenant
  // layout's onboarding-redirect guard. (#175)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Persist attribution for the OAuth round-trip. This MUST happen here, not in
  // the /register page render — Next.js forbids cookies().set() during a Server
  // Component render and throws (a 500), which silently broke every
  // /register?ref=… partner link and every /register?utm_campaign=… discount
  // funnel (charities/education/nhs land here). Middleware can set cookies
  // safely. The email/password form already carries ref + utm_campaign + gclid
  // as hidden fields; these cookies are only needed to survive the OAuth redirect.
  if (pathname === '/register') {
    const ref = request.nextUrl.searchParams.get('ref')
    const utmCampaign = request.nextUrl.searchParams.get('utm_campaign')
    const utmSource = request.nextUrl.searchParams.get('utm_source')
    const utmMedium = request.nextUrl.searchParams.get('utm_medium')
    const utmContent = request.nextUrl.searchParams.get('utm_content')
    const gclid = request.nextUrl.searchParams.get('gclid')
    const cookieOpts = { httpOnly: true, path: '/', maxAge: 60 * 30, sameSite: 'lax' as const }
    if (ref) response.cookies.set('referral_code', ref, cookieOpts)
    if (utmCampaign) response.cookies.set('utm_campaign', utmCampaign, cookieOpts)
    if (utmSource) response.cookies.set('utm_source', utmSource, cookieOpts)
    if (utmMedium) response.cookies.set('utm_medium', utmMedium, cookieOpts)
    if (utmContent) response.cookies.set('utm_content', utmContent, cookieOpts)
    if (gclid) response.cookies.set('gclid', gclid, cookieOpts)
  }

  // Add security headers to all responses
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)'],
}

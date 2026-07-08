'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SUPPRESS_ON = new Set(['/try'])

// Routes the banner is suppressed under (prefix match). Authed app pages
// don't need a marketing-style cookie banner — the user already has session
// cookies set, and the banner was overlaying primary CTAs at the bottom of
// short pages like /t/[slug]/leave/new (Playwright caught the click-block).
const SUPPRESS_PREFIXES = ['/t/', '/admin', '/demo', '/clock/']

// localStorage as an external store (react-hooks/set-state-in-effect —
// the old useState + read-in-effect pattern is exactly what the rule
// forbids). The storage event keeps multiple tabs in sync; same-tab
// accepts re-render via the `dismissed` state set in the click handler.
function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()

  // Server snapshot says 'accepted' so SSR/hydration renders nothing —
  // identical to the previous initial `visible = false` behaviour.
  const consent = useSyncExternalStore(
    subscribeToStorage,
    () => localStorage.getItem('cookie-consent'),
    () => 'accepted'
  )

  // Route suppression is derived during render. CookieConsent lives in
  // RootLayout so it survives client-side navigation — a visitor who sees
  // the banner on a marketing page and clicks "Sign in" / "Demo" lands on
  // a suppressed route and the guard below hides it; it reappears when
  // they navigate back to a non-suppressed page.
  const suppressed =
    !pathname ||
    SUPPRESS_ON.has(pathname) ||
    SUPPRESS_PREFIXES.some((p) => pathname.startsWith(p))

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setDismissed(true)
  }

  if (suppressed || dismissed || consent === 'accepted') return null

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-900/85 text-white backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/75 shadow-[0_-4px_16px_-8px_rgba(0,0,0,0.3)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:py-2.5">
        <p className="flex-1 text-xs sm:text-sm leading-snug text-slate-100/90">
          We use cookies to keep you signed in and improve our product.{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-2 decoration-slate-400/60 hover:decoration-white text-white"
          >
            Privacy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

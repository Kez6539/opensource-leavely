'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CRISP_SCRIPT_ID = 'leavely-crisp-chat'
const LIVE_CHAT_PREFIXES = [
  '/pricing',
  '/try',
  '/demo',
  '/register',
]
const PROACTIVE_CHAT_PREFIXES = ['/pricing', '/demo']
const PROACTIVE_CHAT_DELAY_MS = 30_000
const PROACTIVE_CHAT_STORAGE_PREFIX = 'leavely:crisp-proactive'
const SUPPRESS_PREFIXES = [
  '/t/',
  '/admin',
  '/setup',
  '/register/complete',
  '/partners/dashboard',
  '/clock/',
  '/api/',
]

function isLiveChatPath(pathname: string | null): boolean {
  if (!pathname) return false

  return LIVE_CHAT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function isProactiveChatPath(pathname: string | null): boolean {
  if (!pathname) return false

  return PROACTIVE_CHAT_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function isSuppressedPath(pathname: string | null): boolean {
  if (!pathname) return true

  return (
    !isLiveChatPath(pathname) ||
    SUPPRESS_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

function ensureCrispScript() {
  if (document.getElementById(CRISP_SCRIPT_ID)) return

  const script = document.createElement('script')
  script.id = CRISP_SCRIPT_ID
  script.src = 'https://client.crisp.chat/l.js'
  script.async = true
  document.head.appendChild(script)
}

function getProactiveChatMessage(pathname: string | null): string {
  if (pathname?.startsWith('/demo')) {
    return 'Want to see how Leavely would work for your team? Ask us anything about setup, leave policies, or switching from spreadsheets.'
  }

  return 'Need help choosing a plan? Ask us about pricing, setup, or whether Leavely fits your team.'
}

function getProactiveChatStorageKey(pathname: string | null): string {
  const route = pathname?.startsWith('/demo') ? 'demo' : 'pricing'

  return `${PROACTIVE_CHAT_STORAGE_PREFIX}:${route}`
}

function hasShownProactiveChat(pathname: string | null): boolean {
  try {
    return window.sessionStorage.getItem(getProactiveChatStorageKey(pathname)) === 'shown'
  } catch {
    return false
  }
}

function markProactiveChatShown(pathname: string | null) {
  try {
    window.sessionStorage.setItem(getProactiveChatStorageKey(pathname), 'shown')
  } catch {
    // Ignore storage failures; the proactive prompt can still display.
  }
}

export function PreSaleChatWidget() {
  const pathname = usePathname()
  const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim() ?? ''
  const hasLiveChat = crispWebsiteId.length > 0
  const suppressed = isSuppressedPath(pathname)
  const shouldShowProactiveMessage = !suppressed && isProactiveChatPath(pathname)

  useEffect(() => {
    if (!hasLiveChat) return

    window.$crisp = window.$crisp ?? []
    window.CRISP_WEBSITE_ID = crispWebsiteId

    if (suppressed) {
      window.$crisp.push(['do', 'chat:hide'])
      return
    }

    ensureCrispScript()
    window.$crisp.push(['do', 'chat:show'])
  }, [crispWebsiteId, hasLiveChat, suppressed])

  useEffect(() => {
    if (!hasLiveChat || !shouldShowProactiveMessage || hasShownProactiveChat(pathname)) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      if (!window.$crisp) return

      window.$crisp.push(['do', 'chat:show'])
      window.$crisp.push(['do', 'message:show', ['text', getProactiveChatMessage(pathname)]])
      markProactiveChatShown(pathname)
    }, PROACTIVE_CHAT_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [hasLiveChat, pathname, shouldShowProactiveMessage])

  return null
}

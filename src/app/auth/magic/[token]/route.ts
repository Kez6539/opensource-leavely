import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

// Magic links used to be consumed on the first bare GET. Outlook SafeLinks /
// Mimecast scanners pre-fetch every URL inside drip emails (observed as the
// majority of /try traffic), which set usedAt before the human ever clicked —
// the real prospect then landed on /login?error=invalid_state. The fix is the
// standard one: GET only validates and renders an interstitial with a button,
// and the actual consume + session issue happens on the POST that the button
// submits. Link scanners do not submit forms.

function invalidRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL('/login?error=invalid_state', request.url))
}

async function findValidLink(token: string) {
  if (!token || typeof token !== 'string') return null
  const link = await prisma.magicLink.findUnique({
    where: { token },
    include: { user: true },
  })
  if (!link) return null
  if (link.usedAt || link.expiresAt < new Date()) return null
  return link
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params
  const link = await findValidLink(token)
  if (!link) {
    return invalidRedirect(request)
  }

  // Render a tiny self-contained interstitial. The token is NOT consumed
  // here, so any number of scanner prefetches are harmless. The form posts
  // back to this same URL.
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Sign in to Leavely</title>
</head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <main style="max-width:400px;width:100%;margin:24px;padding:40px 32px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
    <div style="display:inline-block;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;font-weight:700;font-size:18px;padding:10px 18px;border-radius:10px;margin-bottom:24px;">Leavely</div>
    <h1 style="margin:0 0 8px;font-size:20px;color:#111827;">You're nearly signed in</h1>
    <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">Click the button below to finish signing in to your Leavely workspace.</p>
    <form method="POST">
      <button type="submit" style="width:100%;padding:12px 16px;border:0;border-radius:10px;background:linear-gradient(90deg,#059669,#0d9488);color:#fff;font-size:15px;font-weight:600;cursor:pointer;">Continue to Leavely</button>
    </form>
    <p style="margin:24px 0 0;color:#9ca3af;font-size:12px;">This link can only be used once and expires shortly.</p>
  </main>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Never cache: the page is per-token and the token state changes.
      'Cache-Control': 'no-store',
    },
  })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params
  const link = await findValidLink(token)
  if (!link) {
    return invalidRedirect(request)
  }

  // Mark used first, atomically — a second submit (or a race between two
  // tabs) should never grant a second session from the same token. If the
  // downstream session save fails, the user can request a fresh link rather
  // than the same token re-logging them in.
  const claimed = await prisma.magicLink.updateMany({
    where: { id: link.id, usedAt: null },
    data: { usedAt: new Date() },
  })
  if (claimed.count === 0) {
    return invalidRedirect(request)
  }

  const user = link.user

  // No tenant provisioning here. Today's /try magic-link sign-ups were almost
  // entirely Microsoft / Mimecast safe-link scanners pre-fetching the magic
  // URL from inside drip emails — every prefetch was leaving a ghost
  // Tenant + Membership + Employee + TenantBilling chain behind. We now defer
  // provisioning to /setup, which requires a real human form submit (country
  // pick + click), gating tenant creation behind a non-trivial interaction
  // that scanners don't perform.
  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { tenant: true },
  })

  const session = await getSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name ?? undefined
  session.isSuperAdmin = user.isSuperAdmin
  session.isDemo = false
  session.loggedInAt = Date.now()
  await session.save()

  // 303 so the redirect after a POST is followed as a GET.
  if (!membership) {
    return NextResponse.redirect(new URL('/setup', request.url), 303)
  }

  const dest = membership.tenant.onboardedAt
    ? `/t/${membership.tenant.slug}/dashboard`
    : `/t/${membership.tenant.slug}/onboarding`
  return NextResponse.redirect(new URL(dest, request.url), 303)
}

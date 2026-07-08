import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export interface SessionData {
  userId?: string
  email?: string
  name?: string
  isDemo?: boolean
  isSuperAdmin?: boolean
  impersonatingFrom?: string
  // Unix-ms timestamp stamped at login time. requireUser() compares this
  // against User.passwordChangedAt and invalidates the session if a
  // password reset (or any forced-logout flow) ran after the cookie was
  // issued. iron-session has no remote revocation, so this is how we
  // honour rotated credentials. (#171)
  loggedInAt?: number
}

function getSessionOptions(): SessionOptions {
  // Fail loudly if SESSION_SECRET is missing in production. The dev fallback
  // is a publicly-known string — if it ever ships to prod, every session
  // cookie is forgeable. Better to crash on first request than silently
  // sign cookies with a known secret.
  if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required in production')
  }
  const pw = process.env.SESSION_SECRET || 'this-is-a-dev-secret-that-is-at-least-32-characters-long-ok'
  return {
    password: pw,
    cookieName: 'cc-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      // Explicit sameSite (rather than relying on browser default) to mitigate
      // CSRF on state-changing requests.
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
    },
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, getSessionOptions())
}

export async function requireUser() {
  const session = await getSession()
  if (!session.userId) {
    throw new Error('UNAUTHORIZED')
  }

  // Reject sessions that pre-date the user's most recent password change,
  // and reject any session belonging to a disabled account. Without these
  // checks a stolen iron-session cookie would still be valid after the
  // owner reset their password, and a super-admin disabling a user
  // wouldn't actually kick them out until their cookie expired.
  // Also re-read isSuperAdmin from the DB on every request so a stale
  // cookie carrying a true flag (e.g. signing up a fresh account in a
  // browser that already had a super-admin session) can't keep showing
  // the See Clients UI to a non-super-admin. We reconcile the cookie
  // back to DB-truth in-place so any callers reading session.isSuperAdmin
  // also get the correct value on this request.
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { passwordChangedAt: true, disabledAt: true, isSuperAdmin: true },
  })
  // Three reasons to destroy the session and reject:
  //   1) the user row was deleted (admin hard-delete) — without this guard we
  //      were returning stale cookie data as if authenticated
  //   2) the user was disabled after the cookie was issued
  //   3) the user reset their password after the cookie was issued
  if (
    !user ||
    user.disabledAt ||
    (session.loggedInAt && user.passwordChangedAt && user.passwordChangedAt.getTime() > session.loggedInAt)
  ) {
    await session.destroy()
    throw new Error('UNAUTHORIZED')
  }

  // Return DB-true isSuperAdmin so callers (notably the tenant layout)
  // never trust a stale cookie. Intentionally do NOT call session.save()
  // here — Next.js App Router forbids cookie mutation from a Server
  // Component, and requireUser is reached from layout/page render paths.
  // Touching session.isSuperAdmin and saving threw silently and caused
  // an infinite /login redirect loop. The cookie value drifts harmlessly
  // — every caller now reads the DB-true value via this return.
  const dbSuperAdmin = !!user?.isSuperAdmin

  return {
    userId: session.userId,
    email: session.email!,
    name: session.name,
    isSuperAdmin: dbSuperAdmin,
  }
}

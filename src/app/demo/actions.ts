'use server'

import { neon } from '@neondatabase/serverless'
import { getSession } from '@/lib/session'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function startDemo() {
  // Rate-limit demo logins per IP so the shared demo session (and the
  // queries behind it) can't be hammered by a script. Matches the
  // established rateLimit() usage elsewhere (try/login/register).
  const h = await headers()
  const ip =
    h.get('cf-connecting-ip') ||
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  try {
    await rateLimit(`demo:ip:${ip}`, 5, 60_000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      redirect('/login?error=demo_rate_limited')
    }
    throw e
  }

  const sql = neon(process.env.DATABASE_URL!)

  let user
  try {
    const rows = await sql`SELECT id, email, name FROM "User" WHERE email = 'owner@acme.test' LIMIT 1`
    user = rows[0]
  } catch (e) {
    console.error('[demo] DB error:', e instanceof Error ? e.message : e)
    redirect('/login?error=demo_db_error')
  }

  if (!user) {
    redirect('/login?error=demo_unavailable')
  }

  try {
    const session = await getSession()
    session.userId = user.id
    session.email = user.email
    session.name = user.name ?? undefined
    session.isDemo = true
    session.loggedInAt = Date.now()
    await session.save()
  } catch (e) {
    console.error('[demo] session error:', e instanceof Error ? e.message : e)
    redirect('/login?error=demo_session_error')
  }

  redirect('/t/acme/dashboard')
}

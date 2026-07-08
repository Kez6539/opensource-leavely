import { sweepRateLimitBuckets } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

/**
 * Nightly cron that drops RateLimitBucket rows older than 1 hour. The
 * rate limiter only ever reads the bucket for the current window, so
 * anything past the longest window we use (5 minutes for password reset)
 * is dead weight. We give it an hour of headroom for clock skew.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const deleted = await sweepRateLimitBuckets()
    return NextResponse.json({ ok: true, deleted })
  } catch (err) {
    console.error('[sweep-rate-limit] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

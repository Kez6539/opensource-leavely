// Persistent rate limiter backed by Postgres. The previous implementation
// used an in-process `Map` which is useless on Cloudflare Workers — every
// isolate has its own map, so requests fanned out to fresh isolates always
// saw `count === 1` and the '5/60s' guard never fired. (#172)
//
// Bucket keys are quantised to the start of each `windowMs` window so that
// concurrent requests within the same window all hit the same row, and
// expired buckets fall off naturally (a separate cron sweeps them).

import { prisma } from '@/lib/db'

export class RateLimitError extends Error {
  constructor(message = 'Too many attempts. Please try again later.') {
    super(message)
    this.name = 'RateLimitError'
  }
}

/**
 * Increment the request counter for `key` within the current `windowMs`
 * window. Throws RateLimitError if the count would exceed `limit`.
 *
 * Async — call sites must `await`. We `upsert` so concurrent first-hits
 * race safely on the (key, windowStart) primary key.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<void> {
  const now = Date.now()
  const windowStart = new Date(Math.floor(now / windowMs) * windowMs)

  // Atomic upsert: insert with count=1, or increment existing row by 1.
  // The single statement is concurrency-safe — Postgres serialises the
  // update under the row lock.
  const bucket = await prisma.rateLimitBucket.upsert({
    where: { key_windowStart: { key, windowStart } },
    create: { key, windowStart, count: 1 },
    update: { count: { increment: 1 } },
  })

  if (bucket.count > limit) {
    throw new RateLimitError()
  }
}

/**
 * Best-effort cleanup of buckets older than `olderThanMs`. Called from the
 * nightly cron. Failures are non-fatal — buckets eventually fall out of
 * the lookup window even if cleanup is delayed.
 */
export async function sweepRateLimitBuckets(olderThanMs = 60 * 60 * 1000) {
  const cutoff = new Date(Date.now() - olderThanMs)
  const result = await prisma.rateLimitBucket.deleteMany({
    where: { windowStart: { lt: cutoff } },
  })
  return result.count
}

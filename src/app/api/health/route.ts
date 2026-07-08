import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * Liveness + readiness check. Cloudflare uptime monitoring and external
 * uptime services hit this to verify the worker is up and the database is
 * reachable. Returns 200 + JSON when healthy, 500 when DB is unreachable.
 *
 * Don't include any sensitive info — this is unauthenticated.
 */
export async function GET() {
  const start = Date.now()
  try {
    // Cheapest possible DB round-trip — confirms the worker can talk to Neon.
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({
      ok: true,
      db: 'ok',
      latencyMs: Date.now() - start,
      ts: new Date().toISOString(),
    })
  } catch (e) {
    // This endpoint is unauthenticated. Raw driver/DB error messages can leak
    // connection strings, hostnames, or schema details, so only surface them
    // in development. In production callers get a generic marker.
    const detail = e instanceof Error ? e.message : 'unknown'
    return NextResponse.json(
      {
        ok: false,
        db: 'error',
        latencyMs: Date.now() - start,
        ts: new Date().toISOString(),
        error: process.env.NODE_ENV === 'production' ? 'unavailable' : detail,
      },
      { status: 500 }
    )
  }
}

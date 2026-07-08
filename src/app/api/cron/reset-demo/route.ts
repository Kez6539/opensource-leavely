import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { Pool } from '@neondatabase/serverless'
import type { PoolClient } from '@neondatabase/serverless'
import { DEMO_TENANT_SLUG, seedDemoTenant, type SqlTag } from '@/lib/demo-seed'

/**
 * Constant-time string comparison. Same helper as the other cron routes —
 * kept local so this route is self-contained.
 */
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

/**
 * Every table that hangs off Tenant via a `tenantId` column (derived from
 * the relation list on the Tenant model in prisma/schema.prisma). Tables
 * WITHOUT a tenantId column are covered by ON DELETE CASCADE from these:
 *   WorkingTimePattern, RotaEntry, TeamMember (← Employee/Rota/Team)
 *   GoalUpdate (← Goal), ReturnToWork (← LeaveRequest)
 *   OnboardingTemplateItem (← OnboardingTemplate)
 *   OnboardingTask (← OnboardingChecklist), CourseModule (← Course)
 *
 * Deliberately NOT deleted: the Tenant row itself, User rows, MagicLink /
 * PasswordReset (user-scoped — existing demo magic links must keep
 * working), and global tables (Partner, SignupLead, DemoLead,
 * RateLimitBucket, ProcessedStripeEvent).
 *
 * Identifiers can't be parameterised, so this hardcoded allowlist is the
 * only source of table names interpolated into SQL below.
 */
const TENANT_CHILD_TABLES = [
  'Notification',
  'PushSubscription',
  'CalendarToken',
  'CourseEnrollment',
  'Course',
  'Commission',
  'Review',
  'ReviewCycle',
  'ApprovalDelegate',
  'BlackoutDate',
  'ClockEntry',
  'Location',
  'Rota',
  'ShiftTemplate',
  'ExpenseClaim',
  'EmergencyContact',
  'Goal',
  'ToilAccrual',
  'Announcement',
  'OnboardingChecklist',
  'OnboardingTemplate',
  'EmployeeNote',
  'Invite',
  'AuditLog',
  'Document',
  'LeaveRequest',
  'LeaveBalance',
  'CompanyLeave',
  'LeavePolicy',
  'PublicHoliday',
  'Team',
  'Employee',
  'Membership',
  'TenantBilling',
] as const

/**
 * Adapt a Pool client to the tagged-template signature seedDemoTenant
 * expects, so the reseed runs on the same connection (and therefore inside
 * the same transaction) as the deletes.
 */
function makeSqlTag(client: PoolClient): SqlTag {
  return async (strings, ...values) => {
    let text = strings[0]
    for (let i = 0; i < values.length; i++) {
      text += `$${i + 1}` + strings[i + 1]
    }
    const res = await client.query(text, values)
    return res.rows
  }
}

/**
 * Weekly demo-tenant reset.
 *
 * Wipes every tenant-scoped row belonging to the shared `acme` demo tenant
 * and reseeds it from the canonical seed data (src/lib/demo-seed.ts), all
 * inside one transaction — a prospect mid-click-around either sees the old
 * data or the fresh data, never a half-wiped tenant.
 *
 * Hard guards:
 *  - the tenant is looked up by the hardcoded DEMO_TENANT_SLUG and its slug
 *    is re-checked before any DELETE runs; there is no way to point this
 *    route at another tenant (no params are read from the request).
 *  - the Tenant row and the demo User rows are never deleted — sessions and
 *    magic links that reference them keep working. The seed upserts reset
 *    the owner's profile fields (name, password hash, disabled flag) back
 *    to seed values.
 *
 * Triggered every Monday at 03:15 UTC by .github/workflows/demo-reset.yml with
 * `Authorization: Bearer ${CRON_SECRET}` (same auth pattern as the other
 * /api/cron/* routes).
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
  let client: PoolClient | null = null
  let inTransaction = false

  try {
    client = await pool.connect()

    const tenantRes = await client.query(
      'SELECT id, slug FROM "Tenant" WHERE slug = $1 LIMIT 1',
      [DEMO_TENANT_SLUG],
    )
    const tenant = tenantRes.rows[0] as { id: string; slug: string } | undefined

    // Hard guard: only ever operate on the demo tenant. The lookup above is
    // already keyed on the hardcoded slug; this re-check is belt-and-braces
    // against future refactors making the slug dynamic.
    if (tenant && tenant.slug !== DEMO_TENANT_SLUG) {
      return NextResponse.json({ error: 'Refusing to reset a non-demo tenant' }, { status: 400 })
    }

    await client.query('BEGIN')
    inTransaction = true

    const deleted: Record<string, number> = {}
    if (tenant) {
      for (const table of TENANT_CHILD_TABLES) {
        // `table` comes from the hardcoded allowlist above, never from input.
        const res = await client.query(`DELETE FROM "${table}" WHERE "tenantId" = $1`, [tenant.id])
        deleted[table] = res.rowCount ?? 0
      }
    }

    // Reseed on the same connection so the wipe + reseed commit atomically.
    const { tenantId } = await seedDemoTenant(makeSqlTag(client))

    await client.query('COMMIT')
    inTransaction = false

    return NextResponse.json({
      ok: true,
      tenantId,
      recreated: !tenant,
      deleted,
    })
  } catch (err) {
    console.error('[reset-demo] cron failed:', err)
    if (client && inTransaction) {
      try {
        await client.query('ROLLBACK')
      } catch (rollbackErr) {
        console.error('[reset-demo] rollback failed:', rollbackErr)
      }
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  } finally {
    client?.release()
    try {
      await pool.end()
    } catch {
      // Pool teardown failures are non-fatal — the worker isolate is
      // short-lived anyway.
    }
  }
}

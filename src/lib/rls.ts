import { Prisma } from '@/generated/prisma/client'
import { prisma } from '@/lib/db'

/**
 * Set the current tenant context for RLS policies.
 * Must be called within a transaction (SET LOCAL scopes to the transaction).
 *
 * Usage:
 *   await withTenantContext(tenantId, async (tx) => {
 *     return tx.employee.findMany()
 *   })
 *
 * Audit follow-up: previously used `$executeRawUnsafe` with manual
 * single-quote escaping. The escaping worked given today's CUID
 * tenantIds, but the antipattern is exactly the kind of thing that
 * grows teeth when an upstream caller starts passing a different value
 * format. Rewritten using Postgres' `set_config()` function via the
 * tagged-template `$executeRaw` form, which Prisma parameterises
 * automatically. SQL injection is structurally impossible now.
 *
 * `set_config(name, value, is_local)` is the documented Postgres
 * equivalent of `SET LOCAL`, and unlike `SET LOCAL` it can take a
 * parameterised value.
 */
export async function withTenantContext<T>(
  tenantId: string,
  fn: (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw(
      Prisma.sql`SELECT set_config('app.current_tenant_id', ${tenantId}, true)`,
    )
    return fn(tx)
  })
}

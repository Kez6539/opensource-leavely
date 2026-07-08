-- #143: Commission had a tenantId column but no foreign key to Tenant.
-- Add a proper FK with ON DELETE CASCADE (partner commission rows must be
-- removed when the referenced tenant is deleted).

-- Clean up orphans first: any Commission row whose tenantId no longer
-- points at a real Tenant would prevent the FK being added.
DELETE FROM "Commission"
  WHERE "tenantId" NOT IN (SELECT "id" FROM "Tenant");

-- Also create the supporting btree index on tenantId (Prisma expects
-- @@index([tenantId]) on the model).
CREATE INDEX IF NOT EXISTS "Commission_tenantId_idx" ON "Commission"("tenantId");

-- Idempotent ADD CONSTRAINT via DROP IF EXISTS.
ALTER TABLE "Commission" DROP CONSTRAINT IF EXISTS "Commission_tenantId_fkey";
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

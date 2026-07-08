-- #141: EmergencyContact.tenant and ClockEntry.tenant previously had no
-- onDelete action declared. Upgrade both to ON DELETE CASCADE so a tenant
-- can actually be fully deleted without dangling rows.

-- EmergencyContact.tenantId
ALTER TABLE "EmergencyContact" DROP CONSTRAINT IF EXISTS "EmergencyContact_tenantId_fkey";
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ClockEntry.tenantId
ALTER TABLE "ClockEntry" DROP CONSTRAINT IF EXISTS "ClockEntry_tenantId_fkey";
ALTER TABLE "ClockEntry" ADD CONSTRAINT "ClockEntry_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

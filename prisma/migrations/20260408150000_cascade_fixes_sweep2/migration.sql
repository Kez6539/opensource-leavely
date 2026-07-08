-- Sweep 2 cascade fixes:
--   1. Location.tenantId: RESTRICT -> CASCADE (so a tenant can actually be deleted)
--   2. Review.reviewerId: make nullable + add FK with ON DELETE SET NULL (preserve audit trail when reviewer leaves)
--   3. CourseEnrollment.userId: add FK with ON DELETE CASCADE (prevent orphan enrollments)
--   4. CalendarToken.userId + .tenantId: add FKs with ON DELETE CASCADE (no FKs existed)

-- 1. Location.tenantId: RESTRICT -> CASCADE
ALTER TABLE "Location" DROP CONSTRAINT IF EXISTS "Location_tenantId_fkey";
ALTER TABLE "Location" ADD CONSTRAINT "Location_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE;

-- 2. Review.reviewerId: make nullable + add FK SET NULL
ALTER TABLE "Review" ALTER COLUMN "reviewerId" DROP NOT NULL;
ALTER TABLE "Review" DROP CONSTRAINT IF EXISTS "Review_reviewerId_fkey";
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey"
  FOREIGN KEY ("reviewerId") REFERENCES "Employee"("id") ON DELETE SET NULL;

-- 3. CourseEnrollment.userId: add FK CASCADE
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT IF EXISTS "CourseEnrollment_userId_fkey";
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;

-- 4. CalendarToken.userId + .tenantId: add FKs CASCADE
ALTER TABLE "CalendarToken" DROP CONSTRAINT IF EXISTS "CalendarToken_userId_fkey";
ALTER TABLE "CalendarToken" ADD CONSTRAINT "CalendarToken_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "CalendarToken" DROP CONSTRAINT IF EXISTS "CalendarToken_tenantId_fkey";
ALTER TABLE "CalendarToken" ADD CONSTRAINT "CalendarToken_tenantId_fkey"
  FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE;

-- (#156) Drop the dead Tenant.charityNumber column. It was added in
-- 20260326120000_add_charity_number for a half-implemented charity discount
-- verification flow that never shipped — written once at registration, never
-- read or displayed anywhere. The discount campaign decision is captured by
-- planKey instead, so the column is genuinely unused.
ALTER TABLE "Tenant" DROP COLUMN IF EXISTS "charityNumber";

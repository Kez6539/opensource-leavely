-- Fix incorrectly seeded Easter bank holidays (issue #27).
--
-- The PublicHoliday table had three dates off-by-one (landing on Easter
-- Sunday instead of the Monday / on Good Thursday instead of Friday).
-- Anonymous Gregorian algorithm confirms the correct dates:
--
--   Good Friday   2026: 2026-04-03  (was 2026-04-02)
--   Easter Monday 2026: 2026-04-06  (was 2026-04-05)
--   Easter Monday 2027: 2027-03-29  (was 2027-03-28)
--
-- The `date` column stores a timestamp and tenants have a storage
-- asymmetry: older rows are at UTC 00:00 of the intended day, newer rows
-- are at UTC 23:00 of the previous day (BST midnight). The WHERE clauses
-- below match both conventions by doing a ranged comparison against the
-- full calendar day (in UTC).
--
-- Idempotent: each UPDATE matches only the *wrong* date, so re-running is
-- a no-op.

-- Good Friday 2026: 2026-04-02 → 2026-04-03
UPDATE "PublicHoliday"
SET "date" = TIMESTAMP '2026-04-03 00:00:00'
WHERE "name" ILIKE '%good friday%'
  AND "date" >= TIMESTAMP '2026-04-01 22:00:00'
  AND "date" <  TIMESTAMP '2026-04-02 22:00:00';

-- Easter Monday 2026: 2026-04-05 → 2026-04-06
UPDATE "PublicHoliday"
SET "date" = TIMESTAMP '2026-04-06 00:00:00'
WHERE "name" ILIKE '%easter monday%'
  AND "date" >= TIMESTAMP '2026-04-04 22:00:00'
  AND "date" <  TIMESTAMP '2026-04-05 22:00:00';

-- Easter Monday 2027: 2027-03-28 → 2027-03-29
UPDATE "PublicHoliday"
SET "date" = TIMESTAMP '2027-03-29 00:00:00'
WHERE "name" ILIKE '%easter monday%'
  AND "date" >= TIMESTAMP '2027-03-27 22:00:00'
  AND "date" <  TIMESTAMP '2027-03-28 22:00:00';

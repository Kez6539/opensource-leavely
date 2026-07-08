-- (#145) Convert Employee.workingStatus and Employee.salaryFrequency from
-- free-form text columns to native Postgres enums. The legacy columns
-- silently accepted any case ("office", "Office", "OFFICE") and any value
-- at all — over the lifetime of the table that produced messy data that
-- broke the working-status pills in the profile header. The migration:
--   1. Creates the two enum types.
--   2. Normalises any case-variant or unknown value to the canonical
--      lowercase form (or NULL when truly unknown).
--   3. Swaps the column type with USING to cast the now-clean strings.
-- contractType is genuinely free-form (the UI is a text input) and
-- covidVaccinated has display-formatted values with spaces — both are
-- left as String columns intentionally, with covidVaccinated guarded by
-- a CHECK constraint instead.

-- 1. Enum types
CREATE TYPE "WorkingStatus" AS ENUM ('office', 'home', 'hybrid', 'away', 'sick', 'leave');
CREATE TYPE "SalaryFrequency" AS ENUM ('annual', 'monthly', 'weekly', 'hourly');

-- 2a. Normalise workingStatus
UPDATE "Employee" SET "workingStatus" = LOWER("workingStatus")
  WHERE "workingStatus" IS NOT NULL;

UPDATE "Employee" SET "workingStatus" = NULL
  WHERE "workingStatus" IS NOT NULL
    AND "workingStatus" NOT IN ('office', 'home', 'hybrid', 'away', 'sick', 'leave');

-- 2b. Normalise salaryFrequency
UPDATE "Employee" SET "salaryFrequency" = LOWER("salaryFrequency")
  WHERE "salaryFrequency" IS NOT NULL;

UPDATE "Employee" SET "salaryFrequency" = NULL
  WHERE "salaryFrequency" IS NOT NULL
    AND "salaryFrequency" NOT IN ('annual', 'monthly', 'weekly', 'hourly');

-- 3. Swap the column types. The default has to be dropped first because
-- the existing default is the text literal 'office', which Postgres won't
-- coerce mid-ALTER.
ALTER TABLE "Employee"
  ALTER COLUMN "workingStatus" DROP DEFAULT;

ALTER TABLE "Employee"
  ALTER COLUMN "workingStatus" TYPE "WorkingStatus" USING "workingStatus"::"WorkingStatus",
  ALTER COLUMN "workingStatus" SET DEFAULT 'office';

ALTER TABLE "Employee"
  ALTER COLUMN "salaryFrequency" TYPE "SalaryFrequency" USING "salaryFrequency"::"SalaryFrequency";

-- 4. Guard covidVaccinated with a CHECK constraint instead of an enum
-- (the values are display strings with spaces). Drop and re-add so the
-- migration is idempotent.
ALTER TABLE "Employee" DROP CONSTRAINT IF EXISTS "Employee_covidVaccinated_check";

UPDATE "Employee" SET "covidVaccinated" = 'Not Specified'
  WHERE "covidVaccinated" IS NOT NULL
    AND "covidVaccinated" NOT IN ('Yes', 'No', 'Partially', 'Prefer not to say', 'Not Specified');

ALTER TABLE "Employee"
  ADD CONSTRAINT "Employee_covidVaccinated_check"
  CHECK ("covidVaccinated" IS NULL OR "covidVaccinated" IN ('Yes', 'No', 'Partially', 'Prefer not to say', 'Not Specified'));

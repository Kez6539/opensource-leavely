-- Commission.amount and Commission.revenue: Float (double precision) -> Decimal(10,2).
-- IEEE-754 drift made affiliate payouts stop reconciling — £8.10 × 3 became
-- £24.299999... in Postgres, then displayed as £24.30 but exported as £24.30
-- in some places and £24.29 in others. Decimal eliminates the drift.
-- USING avoids data loss for the in-flight rows; ROUND() pulls anything
-- already drifted onto the nearest 1p before the type swap. (#142)
ALTER TABLE "Commission"
  ALTER COLUMN "amount"  TYPE DECIMAL(10, 2) USING ROUND("amount"::numeric, 2),
  ALTER COLUMN "revenue" TYPE DECIMAL(10, 2) USING ROUND("revenue"::numeric, 2);

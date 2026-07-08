-- Audit follow-up (2026-05-21 / code-review P0-5): close the createLeaveRequest
-- and reportSickness race window. Two concurrent identical submissions
-- (double-tap on mobile, retried POST on bad connection) both saw the
-- overlap check pass — neither row existed yet — and both inserted, then
-- both incremented `pending` on the balance row.
--
-- We can't enforce true date-range overlap exclusion without the
-- btree_gist extension, but the actual reported race is *identical*
-- (employeeId, startDate, endDate) submissions. A unique partial index
-- catches those at the database level — the second INSERT raises P2002,
-- the application code translates it back to a friendly OVERLAPPING_LEAVE
-- message.
--
-- The WHERE clause is critical: cancelled / rejected requests can legally
-- coexist with a new request for the same dates, so the constraint only
-- applies to active states.
--
-- BEFORE creating the index, deduplicate any existing active rows that
-- already violate the constraint (one such pair was found in prod on the
-- first apply attempt — confirming the race was actually happening). For
-- each (tenantId, employeeId, startDate, endDate) cluster of active
-- duplicates we keep the OLDEST row and reject the rest with a recorded
-- reason so the audit trail explains what happened.
UPDATE "LeaveRequest"
SET
  status = 'REJECTED',
  "declineReason" = COALESCE("declineReason", '') ||
    CASE WHEN COALESCE("declineReason", '') = '' THEN '' ELSE E'\n' END ||
    '[Auto-cleanup 2026-05-21] Duplicate of an earlier request with identical dates — kept the original.'
WHERE id IN (
  SELECT id FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (
        PARTITION BY "tenantId", "employeeId", "startDate", "endDate"
        ORDER BY "createdAt" ASC, id ASC
      ) AS rn
    FROM "LeaveRequest"
    WHERE status IN ('PENDING', 'APPROVED')
  ) ranked
  WHERE ranked.rn > 1
);

CREATE UNIQUE INDEX IF NOT EXISTS "LeaveRequest_no_duplicate_active"
  ON "LeaveRequest" ("tenantId", "employeeId", "startDate", "endDate")
  WHERE status IN ('PENDING', 'APPROVED');

-- #144: Invite had no uniqueness constraint on (tenantId, email). A single
-- tenant could therefore accumulate dozens of invites for the same address.
-- Add a (tenantId, email) unique index.
--
-- BEFORE adding the index we must collapse any existing duplicates,
-- keeping the most recently created row for each (tenantId, LOWER(email))
-- pair. Email is matched case-insensitively because the invite flow is
-- case-preserving but semantically case-insensitive.

DELETE FROM "Invite" a USING "Invite" b
  WHERE a."createdAt" < b."createdAt"
    AND a."tenantId" = b."tenantId"
    AND LOWER(a."email") = LOWER(b."email");

CREATE UNIQUE INDEX IF NOT EXISTS "Invite_tenantId_email_key" ON "Invite"("tenantId", "email");

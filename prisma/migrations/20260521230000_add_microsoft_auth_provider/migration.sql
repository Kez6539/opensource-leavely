-- AlterEnum
-- Additive only — no existing rows reference MICROSOFT yet, so this is safe
-- to run on a live tenant. Postgres ALTER TYPE ADD VALUE is non-transactional
-- in the same transaction block that USES the new value; running it on its
-- own statement (as Prisma's migrate deploy does) is fine.
ALTER TYPE "AuthProvider" ADD VALUE 'MICROSOFT';

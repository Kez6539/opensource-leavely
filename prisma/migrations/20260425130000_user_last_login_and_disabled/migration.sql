-- User.lastLoginAt: stamped on every successful login (credentials + OAuth)
-- so the super-admin /admin/users page can show recent activity.
-- User.disabledAt: when non-null the account is locked out — login is blocked
-- and any existing session is invalidated by requireUser(). Set by super
-- admins to off-board leavers without deleting historical records.
ALTER TABLE "User" ADD COLUMN "lastLoginAt" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "disabledAt" TIMESTAMP(3);

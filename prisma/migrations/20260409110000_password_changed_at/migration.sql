-- User.passwordChangedAt: nullable timestamp bumped on every password reset
-- (and any other forced-logout flow). requireUser() compares this against
-- the session's loggedInAt and invalidates pre-change sessions, so a stolen
-- iron-session cookie can no longer outlive a reset. (#171)
ALTER TABLE "User" ADD COLUMN "passwordChangedAt" TIMESTAMP(3);

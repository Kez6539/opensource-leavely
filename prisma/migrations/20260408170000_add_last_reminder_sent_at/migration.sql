-- Dedupe column for the approval-reminders cron. Lets the nightly cron fan out
-- to managers without spamming the same reminder on retried / overlapping runs.
-- Nullable because existing rows haven't been reminded yet.
ALTER TABLE "LeaveRequest" ADD COLUMN "lastReminderSentAt" TIMESTAMP(3);

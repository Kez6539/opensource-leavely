-- ProcessedStripeEvent: idempotency ledger for Stripe webhook retries.
-- The webhook handler inserts `event.id` on entry; a unique-violation means
-- Stripe already delivered this event and we return 200 without re-applying
-- state. Prevents double-credit on invoice.payment_succeeded retries, double
-- audit rows on subscription.updated retries, and resurrected subscriptions
-- when Stripe replays out-of-order.

CREATE TABLE "ProcessedStripeEvent" (
  "eventId"     TEXT         NOT NULL,
  "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ProcessedStripeEvent_pkey" PRIMARY KEY ("eventId")
);

CREATE INDEX "ProcessedStripeEvent_processedAt_idx"
  ON "ProcessedStripeEvent" ("processedAt");

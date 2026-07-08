-- RateLimitBucket: persistent shared counter for the rate limiter. The old
-- in-memory `Map` rate limit didn't survive Cloudflare Worker isolate
-- recycling — every fresh isolate started counting from zero. This table
-- holds one row per (key, windowStart) bucket and a small nightly cron
-- sweeps stale buckets. (#172)
CREATE TABLE "RateLimitBucket" (
  "key"         TEXT         NOT NULL,
  "windowStart" TIMESTAMP(3) NOT NULL,
  "count"       INTEGER      NOT NULL DEFAULT 1,
  "updatedAt"   TIMESTAMP(3) NOT NULL,

  CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key", "windowStart")
);

CREATE INDEX "RateLimitBucket_windowStart_idx"
  ON "RateLimitBucket" ("windowStart");

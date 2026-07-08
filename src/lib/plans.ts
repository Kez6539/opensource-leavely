/** Single per-seat plan key stored in TenantBilling.planKey */
export const PLAN_KEY = 'per_seat' as const

/** 50% off plan keys — charity, education, NHS, social enterprise */
export const CHARITY_PLAN_KEY = 'charity_per_seat' as const
export const EDUCATION_PLAN_KEY = 'education_per_seat' as const
export const NHS_PLAN_KEY = 'nhs_per_seat' as const
export const SOCIAL_ENTERPRISE_PLAN_KEY = 'social_enterprise_per_seat' as const

/** 25% off plan key — startups */
export const STARTUP_PLAN_KEY = 'startup_per_seat' as const

/** Price per active employee per month (GBP) */
export const PRICE_PER_SEAT_GBP = 8

/** 50% off price (charity, education, NHS, social enterprise) */
export const DISCOUNT_50_PRICE_PER_SEAT_GBP = 4

/** 25% off price (startups) */
export const STARTUP_PRICE_PER_SEAT_GBP = 6

/** Free trial duration in days */
export const TRIAL_DAYS = 14

/** Discount campaign types mapped to plan keys */
export const DISCOUNT_CAMPAIGNS = {
  charity: CHARITY_PLAN_KEY,
  education: EDUCATION_PLAN_KEY,
  nhs: NHS_PLAN_KEY,
  social_enterprise: SOCIAL_ENTERPRISE_PLAN_KEY,
  startup: STARTUP_PLAN_KEY,
} as const

export type DiscountCampaign = keyof typeof DISCOUNT_CAMPAIGNS

/** Check if a campaign qualifies for any discount */
export function isDiscountCampaign(campaign: string | null): campaign is DiscountCampaign {
  return !!campaign && campaign in DISCOUNT_CAMPAIGNS
}

/** Get the per-seat price for a plan key */
export function getPriceForPlanKey(planKey: string | null): number {
  if (!planKey) return PRICE_PER_SEAT_GBP
  if (planKey === STARTUP_PLAN_KEY) return STARTUP_PRICE_PER_SEAT_GBP
  if (FIFTY_OFF_KEYS.includes(planKey)) {
    return DISCOUNT_50_PRICE_PER_SEAT_GBP
  }
  return PRICE_PER_SEAT_GBP
}

/** Get a human-readable plan label */
export function getPlanLabel(planKey: string | null): string {
  switch (planKey) {
    case CHARITY_PLAN_KEY: return 'Charity'
    case EDUCATION_PLAN_KEY: return 'Education'
    case NHS_PLAN_KEY: return 'NHS'
    case SOCIAL_ENTERPRISE_PLAN_KEY: return 'Social Enterprise'
    case STARTUP_PLAN_KEY: return 'Startup'
    default: return 'Per-seat'
  }
}

const FIFTY_OFF_KEYS: string[] = [CHARITY_PLAN_KEY, EDUCATION_PLAN_KEY, NHS_PLAN_KEY, SOCIAL_ENTERPRISE_PLAN_KEY]

/** Whether a plan key uses the 50% discount Stripe price */
export function is50PercentDiscount(planKey: string | null): boolean {
  return FIFTY_OFF_KEYS.includes(planKey ?? '')
}

/**
 * Resolve a Stripe price ID back to the Leavely planKey that uses it.
 * Used by the Stripe webhook to reconcile `TenantBilling.planKey` with the
 * price on the actual subscription item — owners can change plans in the
 * Stripe Portal and the DB needs to catch up.
 *
 * The map is built lazily at call time so env vars set at runtime (Cloudflare
 * Workers bindings) are picked up. Unknown price IDs return null — callers
 * should fall back to the previous planKey rather than overwriting with null.
 */
export function resolvePlanKeyFromPriceId(priceId: string | null | undefined): string | null {
  if (!priceId) return null
  const map: Record<string, string> = {}
  const defaultPrice = process.env.STRIPE_PRICE_ID
  if (defaultPrice) map[defaultPrice] = PLAN_KEY
  const charityPrice = process.env.STRIPE_CHARITY_PRICE_ID
  if (charityPrice) {
    // One Stripe price backs all four 50%-off plan keys. Default to CHARITY
    // since it's the canonical label; UI reads getPlanLabel which is cosmetic.
    map[charityPrice] = CHARITY_PLAN_KEY
  }
  const startupPrice = process.env.STRIPE_STARTUP_PRICE_ID
  if (startupPrice) map[startupPrice] = STARTUP_PLAN_KEY
  return map[priceId] ?? null
}

/**
 * Shared formatters used everywhere money or counts are rendered. (#198)
 *
 * Before this lib existed, the codebase had three different ways to
 * format GBP (Intl.NumberFormat in expenses, hardcoded "£X" in billing,
 * a duplicate `formatGBP` helper in pricing-calculator) — billing showed
 * "£10" while expenses showed "£10.00". One source of truth.
 */

const GBP = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

const GBP_NO_DECIMALS = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

/** Format a number as a GBP currency string with two decimal places. */
export function formatGBP(amount: number | string | null | undefined): string {
  if (amount == null) return '—'
  const n = typeof amount === 'string' ? Number(amount) : amount
  if (!Number.isFinite(n)) return '—'
  return GBP.format(n)
}

/** Format a number as a GBP currency string with NO decimal places. */
export function formatGBPWhole(amount: number | string | null | undefined): string {
  if (amount == null) return '—'
  const n = typeof amount === 'string' ? Number(amount) : amount
  if (!Number.isFinite(n)) return '—'
  return GBP_NO_DECIMALS.format(n)
}

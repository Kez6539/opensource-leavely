/**
 * Calculate how many days to carry over from a previous year's balance.
 *
 * @param prevAllowance  - Previous year's total allowance
 * @param prevUsed       - Previous year's used days
 * @param maxCarryover   - Policy cap on carryover days (0 = no carryover)
 * @param prevPending    - Previous year's pending days (treated as used for carryover)
 * @returns Number of days to add to the new year's allowance
 */
export function calculateCarryover(
  prevAllowance: number,
  prevUsed: number,
  maxCarryover: number,
  prevPending: number = 0
): number {
  if (maxCarryover <= 0) return 0
  const unused = prevAllowance - prevUsed - prevPending
  return Math.min(Math.max(unused, 0), maxCarryover)
}

/**
 * Calculate the date when carried-over days expire.
 * Expiry = leave year start + carryoverExpiryMonths.
 *
 * @param leaveYearStartMonth  - Month the leave year starts (1-12)
 * @param leaveYear            - The leave year integer
 * @param expiryMonths         - Months after year start when carryover expires
 * @returns The expiry date, or null if no expiry
 */
export function getCarryoverExpiryDate(
  leaveYearStartMonth: number,
  leaveYear: number,
  expiryMonths: number | null
): Date | null {
  if (!expiryMonths || expiryMonths <= 0) return null
  return new Date(leaveYear, leaveYearStartMonth - 1 + expiryMonths, 1)
}

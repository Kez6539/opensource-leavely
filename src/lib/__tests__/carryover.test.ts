import { describe, it, expect } from 'vitest'
import { calculateCarryover, getCarryoverExpiryDate } from '../carryover'

describe('calculateCarryover', () => {
  it('returns 0 when maxCarryover is 0', () => {
    expect(calculateCarryover(25, 20, 0)).toBe(0)
  })

  it('returns 0 when maxCarryover is negative', () => {
    expect(calculateCarryover(25, 20, -5)).toBe(0)
  })

  it('carries over unused days up to the cap', () => {
    expect(calculateCarryover(25, 20, 3)).toBe(3)
  })

  it('carries over all unused when under the cap', () => {
    expect(calculateCarryover(25, 23, 5)).toBe(2)
  })

  it('returns 0 when all days were used', () => {
    expect(calculateCarryover(25, 25, 5)).toBe(0)
  })

  it('returns 0 when more days were used than allowance', () => {
    expect(calculateCarryover(25, 27, 5)).toBe(0)
  })

  it('carries over exact cap when unused equals cap', () => {
    expect(calculateCarryover(25, 20, 5)).toBe(5)
  })

  it('carries over exact cap when unused exceeds cap', () => {
    expect(calculateCarryover(25, 10, 5)).toBe(5)
  })

  it('handles fractional used days from half-days', () => {
    expect(calculateCarryover(25, 22.5, 5)).toBe(2.5)
  })

  it('handles zero allowance', () => {
    expect(calculateCarryover(0, 0, 5)).toBe(0)
  })
})

describe('getCarryoverExpiryDate', () => {
  it('returns null when expiryMonths is null', () => {
    expect(getCarryoverExpiryDate(4, 2025, null)).toBeNull()
  })

  it('returns null when expiryMonths is 0', () => {
    expect(getCarryoverExpiryDate(4, 2025, 0)).toBeNull()
  })

  it('returns null when expiryMonths is negative', () => {
    expect(getCarryoverExpiryDate(4, 2025, -1)).toBeNull()
  })

  it('calculates expiry date for April start + 3 months', () => {
    const result = getCarryoverExpiryDate(4, 2025, 3)
    expect(result).toEqual(new Date(2025, 6, 1)) // July 1st 2025
  })

  it('calculates expiry date for January start + 6 months', () => {
    const result = getCarryoverExpiryDate(1, 2026, 6)
    expect(result).toEqual(new Date(2026, 6, 1)) // July 1st 2026
  })

  it('handles expiry that crosses year boundary', () => {
    // Leave year starts Oct 2025, expiry +6 months = Apr 2026
    const result = getCarryoverExpiryDate(10, 2025, 6)
    expect(result).toEqual(new Date(2026, 3, 1)) // April 1st 2026
  })

  it('handles 1 month expiry', () => {
    const result = getCarryoverExpiryDate(4, 2025, 1)
    expect(result).toEqual(new Date(2025, 4, 1)) // May 1st 2025
  })

  it('handles 12 month expiry (full year)', () => {
    const result = getCarryoverExpiryDate(4, 2025, 12)
    expect(result).toEqual(new Date(2026, 3, 1)) // April 1st 2026
  })
})

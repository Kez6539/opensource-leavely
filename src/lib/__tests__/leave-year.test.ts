import { describe, it, expect } from 'vitest'
import { getLeaveYear, getLeaveYearRange, formatLeaveYearLabel } from '../leave-year'

describe('getLeaveYear', () => {
  it('returns calendar year when startMonth is January', () => {
    expect(getLeaveYear(1, new Date('2026-06-15'))).toBe(2026)
  })

  it('returns calendar year when startMonth is January and date is Jan 1', () => {
    expect(getLeaveYear(1, new Date('2026-01-01'))).toBe(2026)
  })

  it('returns calendar year when startMonth is January and date is Dec 31', () => {
    expect(getLeaveYear(1, new Date('2026-12-31'))).toBe(2026)
  })

  it('returns previous year for dates before startMonth (UK fiscal April)', () => {
    // March 2026 is before April, so belongs to leave year 2025 (Apr 2025 - Mar 2026)
    expect(getLeaveYear(4, new Date('2026-03-15'))).toBe(2025)
  })

  it('returns current year for dates on or after startMonth (UK fiscal April)', () => {
    // April 2026 starts leave year 2026
    expect(getLeaveYear(4, new Date('2026-04-01'))).toBe(2026)
  })

  it('handles December startMonth', () => {
    // November 2026 is before December, belongs to leave year 2025
    expect(getLeaveYear(12, new Date('2026-11-30'))).toBe(2025)
    // December 2026 starts leave year 2026
    expect(getLeaveYear(12, new Date('2026-12-01'))).toBe(2026)
  })
})

describe('getLeaveYearRange', () => {
  it('returns Jan 1 to Dec 31 for startMonth 1', () => {
    const { start, end } = getLeaveYearRange(1, 2026)
    // getLeaveYearRange now constructs boundaries in UTC to avoid local-DST
    // drift on a BST server, so tests read UTC components.
    expect(start.getUTCFullYear()).toBe(2026)
    expect(start.getUTCMonth()).toBe(0)
    expect(start.getUTCDate()).toBe(1)
    expect(end.getUTCFullYear()).toBe(2026)
    expect(end.getUTCMonth()).toBe(11)
    expect(end.getUTCDate()).toBe(31)
  })

  it('returns Apr 1 to Mar 31 for startMonth 4', () => {
    const { start, end } = getLeaveYearRange(4, 2025)
    expect(start.getUTCFullYear()).toBe(2025)
    expect(start.getUTCMonth()).toBe(3) // April (0-indexed)
    expect(start.getUTCDate()).toBe(1)
    expect(end.getUTCFullYear()).toBe(2026)
    expect(end.getUTCMonth()).toBe(2) // March (0-indexed)
    expect(end.getUTCDate()).toBe(31)
  })
})

describe('formatLeaveYearLabel', () => {
  it('returns just the year for January start', () => {
    expect(formatLeaveYearLabel(1, 2026)).toBe('2026')
  })

  it('returns date range for non-January start', () => {
    const label = formatLeaveYearLabel(4, 2025)
    expect(label).toContain('2025')
    expect(label).toContain('2026')
    expect(label).toContain('Apr')
    expect(label).toContain('Mar')
  })
})

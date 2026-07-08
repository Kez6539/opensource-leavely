import { describe, it, expect } from 'vitest'
import { countBusinessDays } from '../business-days'

describe('countBusinessDays', () => {
  const noHolidays = new Set<string>()

  it('counts weekdays for a Monday to Friday range', () => {
    // Mon Mar 2 to Fri Mar 6, 2026
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), noHolidays)).toBe(5)
  })

  it('excludes weekends', () => {
    // Mon Mar 2 to Sun Mar 8, 2026 (5 weekdays + 2 weekend days)
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-08'), noHolidays)).toBe(5)
  })

  it('returns 1 for a single weekday', () => {
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-02'), noHolidays)).toBe(1)
  })

  it('returns 0 for a weekend-only range', () => {
    // Sat Mar 7 to Sun Mar 8, 2026
    expect(countBusinessDays(new Date('2026-03-07'), new Date('2026-03-08'), noHolidays)).toBe(0)
  })

  it('excludes public holidays', () => {
    const holidays = new Set(['2026-03-03'])
    // Mon Mar 2 to Fri Mar 6, minus Tue Mar 3 holiday = 4 days
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), holidays)).toBe(4)
  })

  it('subtracts 0.5 for half-day start', () => {
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), noHolidays, true, false)).toBe(4.5)
  })

  it('subtracts 0.5 for half-day end', () => {
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), noHolidays, false, true)).toBe(4.5)
  })

  it('subtracts 1.0 for both half-day start and end', () => {
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), noHolidays, true, true)).toBe(4)
  })

  it('counts 0.5 for a single-day half-day request', () => {
    // Single day with both half-day flags = one half-day = 0.5
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-02'), noHolidays, true, true)).toBe(0.5)
  })

  it('handles half-day start on a zero-day range', () => {
    // Weekend only + half-day shouldn't go negative
    expect(countBusinessDays(new Date('2026-03-07'), new Date('2026-03-08'), noHolidays, true, false)).toBe(0)
  })

  it('handles two-week span correctly', () => {
    // Mon Mar 2 to Fri Mar 13, 2026 = 10 weekdays
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-13'), noHolidays)).toBe(10)
  })

  it('handles multiple holidays in range', () => {
    const holidays = new Set(['2026-03-03', '2026-03-05'])
    // Mon-Fri (5 days) minus 2 holidays = 3 days
    expect(countBusinessDays(new Date('2026-03-02'), new Date('2026-03-06'), holidays)).toBe(3)
  })
})

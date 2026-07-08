import { describe, it, expect } from 'vitest'
import { calendarDays, computeFromRequests, getRisk } from '../bradford-factor'

describe('calendarDays', () => {
  it('same day = 0', () => {
    expect(calendarDays(new Date('2024-03-15'), new Date('2024-03-15'))).toBe(0)
  })

  it('next day = 1', () => {
    expect(calendarDays(new Date('2024-03-15'), new Date('2024-03-16'))).toBe(1)
  })

  it('month boundary (Jan 31 to Feb 1)', () => {
    expect(calendarDays(new Date('2024-01-31'), new Date('2024-02-01'))).toBe(1)
  })

  it('year boundary (Dec 31 to Jan 1)', () => {
    expect(calendarDays(new Date('2024-12-31'), new Date('2025-01-01'))).toBe(1)
  })

  it('DST spring forward stability (March 9-10, 2024 US)', () => {
    expect(calendarDays(new Date('2024-03-09'), new Date('2024-03-10'))).toBe(1)
  })

  it('DST fall back stability (Nov 2-3, 2024 US)', () => {
    expect(calendarDays(new Date('2024-11-02'), new Date('2024-11-03'))).toBe(1)
  })
})

describe('computeFromRequests', () => {
  it('zero requests returns score 0, spells 0, totalDays 0, riskLevel Low', () => {
    const result = computeFromRequests([])
    expect(result.score).toBe(0)
    expect(result.spells).toBe(0)
    expect(result.totalDays).toBe(0)
    expect(result.riskLevel).toBe('Low')
  })

  it('single 1-day request (same start/end) gives spells 1, totalDays 1, score 1', () => {
    const result = computeFromRequests([
      { startDate: new Date('2024-06-10'), endDate: new Date('2024-06-10') },
    ])
    expect(result.spells).toBe(1)
    expect(result.totalDays).toBe(1)
    expect(result.score).toBe(1)
  })

  it('single 5-day request gives spells 1, totalDays 5, score 5', () => {
    const result = computeFromRequests([
      { startDate: new Date('2024-06-10'), endDate: new Date('2024-06-14') },
    ])
    expect(result.spells).toBe(1)
    expect(result.totalDays).toBe(5)
    expect(result.score).toBe(5)
  })

  it('two spells with 5-day gap gives spells 2, score = S*S*D', () => {
    const result = computeFromRequests([
      // Mon 2024-06-03 → Wed 2024-06-05, 3 working days
      { startDate: new Date('2024-06-03'), endDate: new Date('2024-06-05') },
      // Mon 2024-06-10 → Wed 2024-06-12, 3 working days
      { startDate: new Date('2024-06-10'), endDate: new Date('2024-06-12') },
    ])
    // gap = June 5 -> June 10 = 5 days > 1, so 2 spells
    // totalDays = 3 + 3 = 6 (business days, weekend-skipping)
    // score = 2 * 2 * 6 = 24
    expect(result.spells).toBe(2)
    expect(result.totalDays).toBe(6)
    expect(result.score).toBe(24)
  })

  it('adjacent requests (gap=1 day, same spell) gives spells 1', () => {
    const result = computeFromRequests([
      { startDate: new Date('2024-06-10'), endDate: new Date('2024-06-12') },
      { startDate: new Date('2024-06-13'), endDate: new Date('2024-06-14') },
    ])
    // gap = June 12 -> June 13 = 1 day, not > 1, so same spell
    // totalDays = 3 + 2 = 5
    // score = 1 * 1 * 5 = 5
    expect(result.spells).toBe(1)
    expect(result.totalDays).toBe(5)
    expect(result.score).toBe(5)
  })

  it('three separate spells gives spells 3', () => {
    const result = computeFromRequests([
      // All three on weekdays so each contributes 1 working day
      { startDate: new Date('2024-01-10'), endDate: new Date('2024-01-10') }, // Wed
      { startDate: new Date('2024-03-11'), endDate: new Date('2024-03-11') }, // Mon
      { startDate: new Date('2024-06-10'), endDate: new Date('2024-06-10') }, // Mon
    ])
    // 3 spells, 3 total days
    // score = 3 * 3 * 3 = 27
    expect(result.spells).toBe(3)
    expect(result.totalDays).toBe(3)
    expect(result.score).toBe(27)
  })
})

describe('getRisk thresholds', () => {
  it('score 0 returns Low', () => {
    expect(getRisk(0).riskLevel).toBe('Low')
  })

  it('score 49 returns Low', () => {
    expect(getRisk(49).riskLevel).toBe('Low')
  })

  it('score 50 returns Medium', () => {
    expect(getRisk(50).riskLevel).toBe('Medium')
  })

  it('score 124 returns Medium', () => {
    expect(getRisk(124).riskLevel).toBe('Medium')
  })

  it('score 125 returns High', () => {
    expect(getRisk(125).riskLevel).toBe('High')
  })

  it('score 399 returns High', () => {
    expect(getRisk(399).riskLevel).toBe('High')
  })

  it('score 400 returns Critical', () => {
    expect(getRisk(400).riskLevel).toBe('Critical')
  })

  it('score 1000 returns Critical', () => {
    expect(getRisk(1000).riskLevel).toBe('Critical')
  })
})

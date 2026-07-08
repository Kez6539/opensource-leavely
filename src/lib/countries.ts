export interface CountryConfig {
  code: string
  name: string
  flag: string
  defaultLeaveYear: number // month 1-12
  leaveYearLabel: string
  defaultAllowance: number
  includesBankHols: boolean
  publicHolidayCount: number
  publicHolidayTerm: string // "bank holidays" or "federal holidays"
  /** Statutory minimum total paid days off per year for full-time staff. */
  statutoryMinimumDays: number
  holidays2026: { name: string; date: string }[]
  holidays2027: { name: string; date: string }[]
  holidays2028: { name: string; date: string }[]
}

export const COUNTRIES: Record<string, CountryConfig> = {
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    flag: '\u{1F1EC}\u{1F1E7}',
    defaultLeaveYear: 4,
    leaveYearLabel: 'April (UK tax year)',
    defaultAllowance: 28,
    includesBankHols: true,
    publicHolidayCount: 8,
    publicHolidayTerm: 'bank holidays',
    statutoryMinimumDays: 28, // UK: 5.6 weeks for a 5-day worker (incl. bank holidays)
    holidays2026: [
      { name: "New Year's Day", date: '2026-01-01' },
      { name: 'Good Friday', date: '2026-04-03' },
      { name: 'Easter Monday', date: '2026-04-06' },
      { name: 'Early May Bank Holiday', date: '2026-05-04' },
      { name: 'Spring Bank Holiday', date: '2026-05-25' },
      { name: 'Summer Bank Holiday', date: '2026-08-31' },
      { name: 'Christmas Day', date: '2026-12-25' },
      { name: 'Boxing Day (substitute)', date: '2026-12-28' },
    ],
    holidays2027: [
      { name: "New Year's Day", date: '2027-01-01' },
      { name: 'Good Friday', date: '2027-03-26' },
      { name: 'Easter Monday', date: '2027-03-29' },
      { name: 'Early May Bank Holiday', date: '2027-05-03' },
      { name: 'Spring Bank Holiday', date: '2027-05-31' },
      { name: 'Summer Bank Holiday', date: '2027-08-30' },
      { name: 'Christmas Day (substitute)', date: '2027-12-27' },
      { name: 'Boxing Day (substitute)', date: '2027-12-28' },
    ],
    holidays2028: [
      { name: "New Year's Day (substitute)", date: '2028-01-03' },
      { name: 'Good Friday', date: '2028-04-14' },
      { name: 'Easter Monday', date: '2028-04-17' },
      { name: 'Early May Bank Holiday', date: '2028-05-01' },
      { name: 'Spring Bank Holiday', date: '2028-05-29' },
      { name: 'Summer Bank Holiday', date: '2028-08-28' },
      { name: 'Christmas Day', date: '2028-12-25' },
      { name: 'Boxing Day', date: '2028-12-26' },
    ],
  },
  US: {
    code: 'US',
    name: 'United States',
    flag: '\u{1F1FA}\u{1F1F8}',
    defaultLeaveYear: 1,
    leaveYearLabel: 'January (calendar year)',
    defaultAllowance: 15,
    includesBankHols: false,
    publicHolidayCount: 11,
    publicHolidayTerm: 'federal holidays',
    statutoryMinimumDays: 0, // US has no federal statutory leave minimum
    holidays2026: [
      { name: "New Year's Day", date: '2026-01-01' },
      { name: 'Martin Luther King Jr. Day', date: '2026-01-19' },
      { name: "Presidents' Day", date: '2026-02-16' },
      { name: 'Memorial Day', date: '2026-05-25' },
      { name: 'Juneteenth', date: '2026-06-19' },
      { name: 'Independence Day (observed)', date: '2026-07-03' },
      { name: 'Labor Day', date: '2026-09-07' },
      { name: 'Columbus Day', date: '2026-10-12' },
      { name: 'Veterans Day', date: '2026-11-11' },
      { name: 'Thanksgiving Day', date: '2026-11-26' },
      { name: 'Christmas Day', date: '2026-12-25' },
    ],
    holidays2027: [
      { name: "New Year's Day", date: '2027-01-01' },
      { name: 'Martin Luther King Jr. Day', date: '2027-01-18' },
      { name: "Presidents' Day", date: '2027-02-15' },
      { name: 'Memorial Day', date: '2027-05-31' },
      { name: 'Juneteenth (observed)', date: '2027-06-18' },
      { name: 'Independence Day (observed)', date: '2027-07-05' },
      { name: 'Labor Day', date: '2027-09-06' },
      { name: 'Columbus Day', date: '2027-10-11' },
      { name: 'Veterans Day', date: '2027-11-11' },
      { name: 'Thanksgiving Day', date: '2027-11-25' },
      { name: 'Christmas Day (observed)', date: '2027-12-24' },
    ],
    holidays2028: [
      { name: "New Year's Day", date: '2028-01-01' },
      { name: 'Martin Luther King Jr. Day', date: '2028-01-17' },
      { name: "Presidents' Day", date: '2028-02-21' },
      { name: 'Memorial Day', date: '2028-05-29' },
      { name: 'Juneteenth (observed)', date: '2028-06-19' },
      { name: 'Independence Day', date: '2028-07-04' },
      { name: 'Labor Day', date: '2028-09-04' },
      { name: 'Columbus Day', date: '2028-10-09' },
      { name: 'Veterans Day (observed)', date: '2028-11-10' },
      { name: 'Thanksgiving Day', date: '2028-11-23' },
      { name: 'Christmas Day', date: '2028-12-25' },
    ],
  },
}

export const COUNTRY_LIST = Object.values(COUNTRIES)

export function getCountryConfig(code: string): CountryConfig {
  return COUNTRIES[code] ?? COUNTRIES.GB
}

/**
 * Return all standard public holidays for a country covering the given calendar years
 * (inclusive). Years outside what we have data for are silently skipped.
 */
export function getStandardHolidaysForYears(
  countryCode: string,
  years: number[]
): { name: string; date: string }[] {
  const config = getCountryConfig(countryCode)
  const out: { name: string; date: string }[] = []
  for (const y of years) {
    const key = `holidays${y}` as keyof CountryConfig
    const list = config[key]
    if (Array.isArray(list)) {
      out.push(...(list as { name: string; date: string }[]))
    }
  }
  return out
}

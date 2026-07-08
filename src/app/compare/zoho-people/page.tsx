import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Zoho People — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Zoho People for leave management. Standalone simplicity vs Zoho ecosystem dependency. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/zoho-people` },
  keywords: [
    'Zoho People alternative',
    'Zoho People vs Leavely',
    'Zoho People competitor',
    'Zoho People pricing',
    'Zoho People alternative UK',
    'Zoho HR alternative',
    'better than Zoho People',
    'Zoho People leave management',
  ],
  openGraph: {
    title: 'Leavely vs Zoho People — Which Is Better for UK Leave Management?',
    description: 'Compare Leavely and Zoho People: standalone leave tool vs Zoho ecosystem dependency.',
    url: `${SITE_URL}/compare/zoho-people`,
  },
}

const data: ComparisonData = {
  competitor: 'Zoho People',
  tagline: 'Part of the Zoho suite. Affordable HR module but works best within the broader Zoho ecosystem.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £1.50/user/mo',
  intro: 'Zoho People is the HR module within Zoho\'s massive software ecosystem. While its headline price is low, it works best when paired with other Zoho products — and its global, one-size-fits-all approach means UK-specific features often require manual workarounds. Leavely is a standalone tool built specifically for UK leave management: no ecosystem lock-in, no configuration headaches, and every feature included from day one.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays (auto)', leavely: true, competitor: 'Manual setup' },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: 'Higher tier' },
    { name: 'Works standalone (no ecosystem)', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No contract lock-in', leavely: true, competitor: 'Annual' },
  ],
  whySwitch: [
    'Standalone simplicity — Leavely works perfectly on its own. Zoho People is designed as part of the Zoho ecosystem, and many features work best (or only) with other Zoho apps like Zoho CRM, Zoho Payroll, and Zoho Projects.',
    'UK-first, not global — Leavely is built specifically for UK employment law, statutory leave, and bank holidays. Zoho People takes a global approach that requires manual setup for UK-specific requirements.',
    'Faster setup — get your team tracking leave in under 5 minutes. Zoho People\'s extensive configuration options and ecosystem integrations mean a longer time-to-value.',
    'Purpose-built for leave management — Leavely focuses on doing one thing brilliantly. Zoho People tries to be a full HR platform, spreading its features thin across attendance, timesheets, performance, and more.',
    'Bradford Factor built in — automatically monitor absence patterns using the UK-standard scoring method. Zoho People doesn\'t offer this feature.',
    'No ecosystem dependency — switch or cancel without losing access to your other business tools. With Zoho, leaving People can mean reconsidering your entire Zoho stack.',
  ],
  disclaimer: 'Based on publicly available information from Zoho People\'s website as of March 2026. Zoho and Zoho People are registered trademarks of Zoho Corporation Pvt. Ltd. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Sage HR', slug: 'sage-hr' },
    { name: 'BambooHR', slug: 'bamboohr' },
    { name: 'Personio', slug: 'personio' },
    { name: 'Factorial', slug: 'factorial' },
  ],
}

export default function ZohoPeopleComparison() {
  return <ComparisonPage data={data} />
}

import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Factorial — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Factorial for leave management. Purpose-built leave tool vs bloated HR suite. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/factorial` },
  keywords: [
    'Factorial alternative',
    'Factorial vs Leavely',
    'Factorial competitor',
    'Factorial pricing',
    'Factorial alternative UK',
    'cheaper than Factorial',
    'Factorial HR alternative',
    'Factorial alternative for small business',
  ],
  openGraph: {
    title: 'Leavely vs Factorial — Which Is Better for UK Leave Management?',
    description: 'Compare Leavely and Factorial: focused leave tool vs sprawling HR platform for UK SMBs.',
    url: `${SITE_URL}/compare/factorial`,
  },
}

const data: ComparisonData = {
  competitor: 'Factorial',
  tagline: 'Spanish HR platform growing in the UK market. Offers leave management as part of a broader HR suite.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £4.50/user/mo',
  intro: 'Factorial is a Spanish-built HR platform that\'s been expanding into the UK market. It bundles leave management with payroll, recruitment, and document management — but that means you\'re paying for a bloated suite when all you need is leave tracking. Leavely is purpose-built for leave management: faster to set up, UK-first by design, and includes every feature in a single plan with no tiers or add-ons.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: 'Higher tier' },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: 'Higher tier' },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: false },
    { name: 'No contract lock-in', leavely: true, competitor: 'Annual' },
    { name: 'GBP pricing', leavely: true, competitor: 'EUR-based' },
  ],
  whySwitch: [
    'Purpose-built for leave — Leavely does one thing brilliantly. Factorial bundles leave with payroll, recruitment, and expenses, adding complexity you don\'t need.',
    'Faster setup — get your team tracking leave in under 5 minutes. Factorial\'s full HR suite requires significantly more configuration before you\'re up and running.',
    'UK-first, not EU-first — Leavely is built specifically for UK employment law, statutory leave, and bank holidays. Factorial was built for the Spanish and European market.',
    'All features included — every Leavely feature is available on a single plan. Factorial gates advanced features like audit trails and TOIL behind higher-priced tiers.',
    'Bradford Factor monitoring — automatically track absence patterns with the UK-standard Bradford Factor score. Factorial doesn\'t offer this.',
    'No annual lock-in — pay monthly and cancel anytime. Factorial typically requires annual billing for the best rates.',
  ],
  disclaimer: 'Based on publicly available information from Factorial\'s website as of March 2026. Factorial is a registered trademark of Everyday Software S.L. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Charlie HR', slug: 'charlie-hr' },
    { name: 'Personio', slug: 'personio' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'BambooHR', slug: 'bamboohr' },
  ],
}

export default function FactorialComparison() {
  return <ComparisonPage data={data} />
}

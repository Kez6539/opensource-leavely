import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs BambooHR — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and BambooHR for leave management. UK-focused transparent pricing vs US-centric quote-based enterprise plans. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/bamboohr` },
  keywords: [
    'BambooHR alternative',
    'BambooHR vs Leavely',
    'BambooHR competitor',
    'BambooHR pricing',
    'BambooHR alternative UK',
    'cheaper than BambooHR',
    'BambooHR alternative for small business',
    'BambooHR too expensive',
  ],
  openGraph: {
    title: 'Leavely vs BambooHR — Which Is Better for Your UK Business?',
    description: 'Compare Leavely and BambooHR: UK-focused simplicity vs US-centric enterprise HR suite.',
    url: `${SITE_URL}/compare/bamboohr`,
  },
}

const data: ComparisonData = {
  competitor: 'BambooHR',
  tagline: 'US-based full HR suite popular with larger companies. Enterprise-focused with quote-based pricing.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'Quote-based (est. £5-15/user)',
  intro: 'BambooHR is a well-known US-based HR platform covering everything from hiring to performance management. It\'s powerful for enterprise teams, but its quote-based pricing, US-centric design, and complex setup make it overkill for UK SMBs that just need leave management. Leavely offers transparent per-seat pricing, UK-first compliance, and a focused tool you can set up in minutes — not weeks.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: 'Manual setup' },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Transparent pricing', leavely: true, competitor: false },
    { name: 'No sales call required', leavely: true, competitor: false },
    { name: 'Self-service signup', leavely: true, competitor: false },
    { name: 'No contract lock-in', leavely: true, competitor: 'Annual' },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
  ],
  whySwitch: [
    'UK-focused, not US-centric — Leavely is built from the ground up for UK employment law, statutory leave, and bank holidays. BambooHR is designed for the US market.',
    'Transparent pricing — £8/user/month, clearly listed. BambooHR requires a sales call and custom quote, with estimates ranging from £5-15 per user.',
    'Simpler setup — get your team running in minutes. BambooHR\'s enterprise onboarding process can take days or weeks of configuration.',
    'No annual contract — pay monthly, cancel anytime. BambooHR typically locks you into an annual commitment.',
    'Bradford Factor built in — automatically monitor absence patterns with the UK-standard Bradford Factor. BambooHR doesn\'t offer this natively.',
    'Purpose-built for leave — you won\'t pay for recruitment, performance reviews, and payroll modules your small team doesn\'t need.',
  ],
  disclaimer: 'Based on publicly available information from BambooHR\'s website as of March 2026. BambooHR is a registered trademark of BambooHR LLC. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Personio', slug: 'personio' },
    { name: 'Sage HR', slug: 'sage-hr' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
  ],
}

export default function BambooHRComparison() {
  return <ComparisonPage data={data} />
}

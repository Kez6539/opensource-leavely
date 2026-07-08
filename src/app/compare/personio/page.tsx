import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Personio — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Personio side by side. See which UK leave management solution offers better value for small businesses — features, pricing, setup time, and more.',
  alternates: { canonical: `${SITE_URL}/compare/personio` },
  keywords: [
    'Personio alternative',
    'Personio vs Leavely',
    'Personio competitor',
    'better than Personio',
    'Personio alternative UK',
    'leave management software vs Personio',
    'Personio alternative for small business',
    'Personio too expensive',
  ],
  openGraph: {
    title: 'Leavely vs Personio — Which Leave Tracker Is Better for UK SMBs?',
    description: 'Feature-by-feature comparison of Leavely and Personio for UK teams.',
    url: `${SITE_URL}/compare/personio`,
  },
}

const data: ComparisonData = {
  competitor: 'Personio',
  tagline: 'German-based all-in-one HR platform popular in the UK mid-market.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From ~£3.50/user/mo (bundle required)',
  intro: 'Personio is a comprehensive HR platform built in Germany, now widely used in the UK mid-market. It covers recruitment, onboarding, payroll, and leave — but that breadth comes with complexity and cost. For SMBs that just need leave management, Personio often means paying for features you\'ll never use. Leavely is purpose-built for leave management: simpler to set up, faster to learn, and more affordable for small UK teams.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: 'Add-on' },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Document management', leavely: true, competitor: true },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: true },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: false },
    { name: 'No bundled modules required', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Purpose-built for leave management — you get exactly what you need without paying for recruitment, payroll, and onboarding modules you won\'t use.',
    'Set up in minutes, not days — Personio requires significant configuration for its full HR suite. Leavely gets your team running in under 5 minutes.',
    'Bradford Factor monitoring included — automatically track absence patterns that Personio doesn\'t offer natively.',
    'TOIL tracking built in at no extra cost — Personio requires add-ons or manual workarounds for time off in lieu.',
    'Transparent, simple pricing — one plan with everything included. No bundles, no modules, no surprises.',
    'UK-focused from the ground up — built specifically for UK employment law, statutory leave, and bank holidays.',
  ],
  disclaimer: 'Based on publicly available information from Personio\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Sage HR', slug: 'sage-hr' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
    { name: 'Natural HR', slug: 'natural-hr' },
  ],
}

export default function PersonioComparison() {
  return <ComparisonPage data={data} />
}

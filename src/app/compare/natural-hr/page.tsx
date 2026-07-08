import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Natural HR — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Natural HR side by side. See which UK leave management software offers better value — transparent pricing, features, Bradford Factor, TOIL tracking, and more.',
  alternates: { canonical: `${SITE_URL}/compare/natural-hr` },
  keywords: [
    'Natural HR alternative',
    'Natural HR vs Leavely',
    'Natural HR competitor',
    'better than Natural HR',
    'Natural HR alternative UK',
    'leave management software vs Natural HR',
    'Natural HR pricing',
    'Natural HR leave management alternative',
  ],
  openGraph: {
    title: 'Leavely vs Natural HR — Which Leave Tracker Is Better?',
    description: 'Feature-by-feature comparison of Leavely and Natural HR for UK teams.',
    url: `${SITE_URL}/compare/natural-hr`,
  },
}

const data: ComparisonData = {
  competitor: 'Natural HR',
  tagline: 'UK-based HR platform for growing businesses with a broad feature set.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'Quote-based (no public pricing)',
  intro: 'Natural HR is a UK-based HR platform aimed at growing businesses. It offers a wide feature set covering leave, performance, expenses, and more. However, its leave management isn\'t its primary focus — it\'s one module among many. Pricing isn\'t transparent (you need to request a quote), and the platform is designed for broader HR needs. Leavely is leave-first: transparent pricing, faster setup, and deeper leave management features like Bradford Factor and TOIL tracking included as standard.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Document management', leavely: true, competitor: true },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: true },
    { name: 'Transparent public pricing', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: 'Unknown' },
  ],
  whySwitch: [
    'Transparent pricing — Leavely publishes its pricing upfront. Natural HR requires you to request a quote, which often means a sales process before you can even try the product.',
    'Leave-first focus — Natural HR spreads its attention across HR, performance, and expenses. Leavely is built specifically for leave management, so every feature is optimised for tracking time off.',
    'Bradford Factor monitoring included — automatically track absence patterns and flag concerns. Natural HR doesn\'t offer this as a native feature.',
    'TOIL tracking built in — manage time off in lieu without workarounds. Natural HR doesn\'t include dedicated TOIL tracking.',
    'Faster setup — Natural HR is designed for growing businesses with complex needs. Leavely gets your team running in under 5 minutes.',
    'Return-to-work forms digitised — complete RTW interviews within the platform after any absence, keeping everything in one place.',
  ],
  disclaimer: 'Based on publicly available information from Natural HR\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Sage HR', slug: 'sage-hr' },
    { name: 'Personio', slug: 'personio' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
  ],
}

export default function NaturalHRComparison() {
  return <ComparisonPage data={data} />
}

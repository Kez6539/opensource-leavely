import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Breathe HR — Leave Management Comparison 2026',
  description:
    'Compare Leavely and Breathe HR for managing employee leave. Per-seat pricing vs tiered plans, Bradford Factor, TOIL tracking, and which is better for UK SMBs.',
  alternates: { canonical: `${SITE_URL}/compare/breathe-hr` },
  keywords: [
    'Breathe HR alternative',
    'Breathe HR vs Leavely',
    'Breathe HR competitor',
    'Breathe HR pricing',
    'Breathe alternative UK',
    'cheaper than Breathe HR',
  ],
  openGraph: {
    title: 'Leavely vs Breathe HR — Which Leave Tool Is Better?',
    description: 'Compare Leavely and Breathe HR: features, pricing, and leave management capabilities.',
    url: `${SITE_URL}/compare/breathe-hr`,
  },
}

const data: ComparisonData = {
  competitor: 'Breathe HR',
  tagline: 'Breathe is a UK HR platform for SMBs with leave management, performance tracking, and document storage.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £13/mo (up to 10)',
  intro: 'Breathe is a broader HR platform that includes leave management alongside performance reviews, expense tracking, and more. If you only need leave management, Leavely offers a more focused solution with features like Bradford Factor monitoring and TOIL tracking that Breathe doesn\'t include in its core plans.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'Custom leave policies', leavely: true, competitor: true },
    { name: 'Bradford Factor', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: 'Manual' },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No tiered pricing', leavely: true, competitor: false },
    { name: 'Full audit trail', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Bradford Factor monitoring built in — automatically track absence patterns for every employee.',
    'TOIL tracking included — Breathe requires manual workarounds for time off in lieu.',
    'Return-to-work forms digitised — complete RTW interviews within the platform.',
    'No tiered pricing — every customer gets every feature. Breathe charges more for advanced features.',
    'Purpose-built for leave — focused and fast, without the complexity of a full HR suite.',
    'Company-wide leave blocks — set Christmas shutdowns automatically for all employees.',
  ],
  disclaimer: 'Based on publicly available information from Breathe\'s website as of March 2026. Breathe is a registered trademark of Breathe Technology Ltd. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'BrightHR', slug: 'brighthr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
    { name: 'WhosOff', slug: 'whosoff' },
  ],
}

export default function BreatheHRComparison() {
  return <ComparisonPage data={data} />
}

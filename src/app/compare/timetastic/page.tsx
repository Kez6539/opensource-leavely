import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Timetastic — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Timetastic side by side. See which UK leave management software offers better value — features, pricing, Bradford Factor, TOIL tracking, and more.',
  alternates: { canonical: `${SITE_URL}/compare/timetastic` },
  keywords: [
    'Timetastic alternative',
    'Timetastic vs Leavely',
    'Timetastic competitor',
    'better than Timetastic',
    'Timetastic alternative UK',
    'leave management software vs Timetastic',
  ],
  openGraph: {
    title: 'Leavely vs Timetastic — Which Leave Tracker Is Better?',
    description: 'Feature-by-feature comparison of Leavely and Timetastic for UK teams.',
    url: `${SITE_URL}/compare/timetastic`,
  },
}

const data: ComparisonData = {
  competitor: 'Timetastic',
  tagline: 'Timetastic is a popular UK-based leave tracker focused on simplicity and calendar views.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £1.50/user/mo',
  intro: 'Timetastic is a well-known leave tracker used by thousands of UK businesses. It does one thing well — tracking who\'s off. Leavely goes further with Bradford Factor monitoring, TOIL tracking, return-to-work forms, employee directory, and a full audit trail — all included in one plan.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: 'Limited' },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: false },
    { name: 'Document management', leavely: true, competitor: false },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: 'Basic' },
    { name: 'Full audit trail', leavely: true, competitor: false },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'All features in one plan', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Bradford Factor monitoring included — automatically track absence patterns without spreadsheets.',
    'TOIL (time off in lieu) tracking built in — Timetastic doesn\'t support TOIL natively.',
    'Return-to-work forms digitised — complete RTW interviews within the platform after any absence.',
    'Full employee directory with profiles, departments, and leave history — not just a leave calendar.',
    'Complete audit trail — every action is logged for compliance and HR records.',
    'Company-wide leave blocks — set Christmas shutdowns that apply to everyone automatically.',
  ],
  disclaimer: 'Based on publicly available information from Timetastic\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'BrightHR', slug: 'brighthr' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
    { name: 'WhosOff', slug: 'whosoff' },
  ],
}

export default function TimetasticComparison() {
  return <ComparisonPage data={data} />
}

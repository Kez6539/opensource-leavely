import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs WhosOff — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and WhosOff for leave management. Feature comparison including Bradford Factor, TOIL, employee directory, audit trail, and pricing for UK businesses.',
  alternates: { canonical: `${SITE_URL}/compare/whosoff` },
  keywords: [
    'WhosOff alternative',
    'WhosOff vs Leavely',
    'WhosOff competitor',
    'WhosOff pricing',
    'WhosOff alternative UK',
    'better than WhosOff',
  ],
  openGraph: {
    title: 'Leavely vs WhosOff — Which Leave Tracker Should You Choose?',
    description: 'Feature comparison: Leavely vs WhosOff for UK leave management.',
    url: `${SITE_URL}/compare/whosoff`,
  },
}

const data: ComparisonData = {
  competitor: 'WhosOff',
  tagline: 'WhosOff is a straightforward online leave management tool focused on tracking who\'s off work.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £1.55/user/mo',
  intro: 'WhosOff is a budget-friendly leave tracker that handles the basics well. If you need more than just leave tracking — such as Bradford Factor monitoring, TOIL, employee profiles, return-to-work forms, and an audit trail — Leavely offers a more complete solution for growing teams.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory & profiles', leavely: true, competitor: false },
    { name: 'Document management', leavely: true, competitor: false },
    { name: 'Full audit trail', leavely: true, competitor: false },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: 'Basic' },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'All features in one plan', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Bradford Factor monitoring — automatically calculate absence scores. Not available in WhosOff.',
    'TOIL tracking — manage time off in lieu alongside regular leave.',
    'Employee directory — full profiles with roles, departments, and complete leave history.',
    'Return-to-work forms — digitise your RTW process and keep records attached to leave requests.',
    'Full audit trail — every approval, rejection, and change is logged for compliance.',
    'Document management — upload and store HR documents within the platform.',
  ],
  disclaimer: 'Based on publicly available information from WhosOff\'s website as of March 2026. WhosOff is a registered trademark of its respective owner. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'BrightHR', slug: 'brighthr' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
  ],
}

export default function WhosOffComparison() {
  return <ComparisonPage data={data} />
}

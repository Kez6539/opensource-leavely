import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Holiday Tracker — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Holiday Tracker side by side. See which UK leave management software offers better features — Bradford Factor, TOIL, approval workflows, and more.',
  alternates: { canonical: `${SITE_URL}/compare/holiday-tracker` },
  keywords: [
    'Holiday Tracker alternative',
    'Holiday Tracker vs Leavely',
    'Holiday Tracker competitor',
    'better than Holiday Tracker',
    'Holiday Tracker alternative UK',
    'leave management software vs Holiday Tracker',
    'Holiday Tracker upgrade',
    'Holiday Tracker features',
  ],
  openGraph: {
    title: 'Leavely vs Holiday Tracker — Which Leave Tracker Offers More?',
    description: 'Feature-by-feature comparison of Leavely and Holiday Tracker for UK teams.',
    url: `${SITE_URL}/compare/holiday-tracker`,
  },
}

const data: ComparisonData = {
  competitor: 'Holiday Tracker',
  tagline: 'Simple UK leave tracking tool with a basic feature set at an affordable price.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £1.50/user/mo',
  intro: 'Holiday Tracker is a straightforward UK leave tracking tool that does the basics well at an affordable price point. However, if your team is growing or you need more than simple holiday booking — like Bradford Factor monitoring, TOIL tracking, approval workflows, or return-to-work forms — you\'ll quickly outgrow it. Leavely offers significantly more features while remaining simple to use, giving you room to grow without switching platforms again.',
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
    { name: 'Custom leave policies', leavely: true, competitor: 'Limited' },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'Advanced reporting', leavely: true, competitor: 'Basic' },
    { name: 'No credit card for trial', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Bradford Factor monitoring included — automatically track and score absence patterns to identify issues early. Holiday Tracker doesn\'t offer this.',
    'TOIL tracking built in — manage time off in lieu without spreadsheets. Not available in Holiday Tracker.',
    'Return-to-work forms digitised — complete RTW interviews within the platform for better compliance.',
    'Full employee directory — Leavely includes employee profiles, departments, and leave history. Holiday Tracker is just a leave calendar.',
    'Advanced approval workflows — role-based access with 4 levels (Owner, Admin, Manager, Employee) for proper delegation. Holiday Tracker offers only basic permissions.',
    'Complete audit trail — every action is logged for compliance and HR records, giving you the paper trail you need.',
    'Custom leave policies — create detailed policies for different teams, departments, or contract types. Holiday Tracker offers limited customisation.',
    'Modern, intuitive UI — Leavely is built with a modern design that\'s enjoyable to use daily, not just functional.',
  ],
  disclaimer: 'Based on publicly available information from Holiday Tracker\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'WhosOff', slug: 'whosoff' },
    { name: 'absence.io', slug: 'absence-io' },
    { name: 'BrightHR', slug: 'brighthr' },
  ],
}

export default function HolidayTrackerComparison() {
  return <ComparisonPage data={data} />
}

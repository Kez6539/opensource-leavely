import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs absence.io — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and absence.io side by side. See which leave management software is better for UK businesses — UK bank holidays, statutory leave, pricing in GBP, and more.',
  alternates: { canonical: `${SITE_URL}/compare/absence-io` },
  keywords: [
    'absence.io alternative',
    'absence.io vs Leavely',
    'absence.io competitor',
    'better than absence.io',
    'absence.io alternative UK',
    'leave management software vs absence.io',
    'absence.io UK alternative',
    'absence io pricing UK',
  ],
  openGraph: {
    title: 'Leavely vs absence.io — Which Leave Tracker Is Better for UK Teams?',
    description: 'Feature-by-feature comparison of Leavely and absence.io for UK businesses.',
    url: `${SITE_URL}/compare/absence-io`,
  },
}

const data: ComparisonData = {
  competitor: 'absence.io',
  tagline: 'German-based absence management tool with a focus on calendar views and reporting.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From ~£2.50/user/mo (EUR pricing)',
  intro: 'absence.io is a German-built absence management tool known for its clean calendar interface and reporting capabilities. It\'s popular across Europe but was designed with the German and EU market in mind — not the UK. That means UK-specific features like statutory leave calculations, UK bank holidays, and Bradford Factor monitoring are either missing or require workarounds. Leavely is built from the ground up for UK businesses, with GBP pricing and full compliance with UK employment law.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays built in', leavely: true, competitor: 'Manual setup' },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Document management', leavely: true, competitor: 'Limited' },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: 'Basic' },
    { name: 'Full audit trail', leavely: true, competitor: 'Limited' },
    { name: 'UK employment law compliance', leavely: true, competitor: false },
    { name: 'GBP pricing (no FX fees)', leavely: true, competitor: false },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Built for UK businesses — Leavely is designed around UK employment law, statutory leave entitlements, and UK bank holidays. absence.io was built for the EU market.',
    'GBP pricing with no currency conversion — absence.io prices in EUR, which means UK businesses pay foreign exchange fees and deal with fluctuating costs.',
    'Bradford Factor monitoring included — automatically track and flag absence patterns. This is a UK-specific HR metric that absence.io doesn\'t support.',
    'TOIL tracking built in — manage time off in lieu natively. absence.io doesn\'t offer dedicated TOIL tracking.',
    'UK bank holidays pre-loaded — absence.io requires manual configuration of UK bank holidays. Leavely has them built in from day one.',
    'Return-to-work forms digitised — complete RTW interviews within the platform, a key UK HR compliance requirement.',
  ],
  disclaimer: 'Based on publicly available information from absence.io\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'WhosOff', slug: 'whosoff' },
    { name: 'Holiday Tracker', slug: 'holiday-tracker' },
    { name: 'Personio', slug: 'personio' },
  ],
}

export default function AbsenceIOComparison() {
  return <ComparisonPage data={data} />
}

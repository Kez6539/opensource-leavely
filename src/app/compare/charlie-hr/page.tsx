import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Charlie HR — Leave Management Comparison 2026',
  description:
    'Compare Leavely and Charlie HR for leave management. See which UK HR tool offers better leave tracking — Bradford Factor, TOIL, pricing, and features compared.',
  alternates: { canonical: `${SITE_URL}/compare/charlie-hr` },
  keywords: [
    'Charlie HR alternative',
    'Charlie HR vs Leavely',
    'Charlie HR competitor',
    'Charlie HR pricing',
    'CharlieHR alternative UK',
    'better than Charlie HR',
  ],
  openGraph: {
    title: 'Leavely vs Charlie HR — Which Is Right for Your Team?',
    description: 'Feature comparison: Leavely vs Charlie HR for UK leave management.',
    url: `${SITE_URL}/compare/charlie-hr`,
  },
}

const data: ComparisonData = {
  competitor: 'Charlie HR',
  tagline: 'Charlie HR is a modern people management platform for small UK companies, covering leave, onboarding, and engagement.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £5/user/mo',
  intro: 'Charlie HR is a slick, modern HR platform popular with startups and small companies. It covers time off, onboarding, and team engagement. If you need dedicated leave management with advanced features like Bradford Factor, TOIL tracking, and return-to-work forms, Leavely offers more depth at a competitive price.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'Custom leave policies', leavely: true, competitor: true },
    { name: 'Bradford Factor', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Company-wide leave blocks', leavely: true, competitor: false },
    { name: 'Document management', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: false },
    { name: 'Role-based access (4 levels)', leavely: true, competitor: 'Basic' },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'Stripe billing integration', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Bradford Factor monitoring — automatically flags frequent short-term absences. Charlie HR doesn\'t offer this.',
    'TOIL tracking — track time off in lieu alongside regular leave. Not available in Charlie HR.',
    'Return-to-work forms — digitise your RTW process within the platform after any absence.',
    'Full audit trail — every action is logged for compliance. Charlie HR lacks a dedicated audit log.',
    'All features in one plan — no feature gates or premium tiers. Charlie HR charges more for advanced features.',
    'Company-wide leave blocks — set shutdown periods that apply automatically to all employees.',
  ],
  disclaimer: 'Based on publicly available information from Charlie HR\'s website as of March 2026. CharlieHR is a registered trademark of CharlieHR Ltd. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'BrightHR', slug: 'brighthr' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'WhosOff', slug: 'whosoff' },
  ],
}

export default function CharlieHRComparison() {
  return <ComparisonPage data={data} />
}

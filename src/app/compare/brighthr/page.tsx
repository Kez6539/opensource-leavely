import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs BrightHR — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and BrightHR for leave management. Transparent per-seat pricing vs quote-based plans. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/brighthr` },
  keywords: [
    'BrightHR alternative',
    'BrightHR vs Leavely',
    'BrightHR competitor',
    'BrightHR pricing',
    'BrightHR alternative UK',
    'cheaper than BrightHR',
  ],
  openGraph: {
    title: 'Leavely vs BrightHR — Which Is Better for Your Business?',
    description: 'Compare Leavely and BrightHR: transparent pricing vs quote-based, features, and ease of use.',
    url: `${SITE_URL}/compare/brighthr`,
  },
}

const data: ComparisonData = {
  competitor: 'BrightHR',
  tagline: 'BrightHR is a full HR software suite by Peninsula Group, offering leave management as part of a broader platform.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'Quote-based',
  intro: 'BrightHR is a comprehensive HR platform with leave management, shift scheduling, and HR document storage. It\'s powerful but quote-based pricing means you won\'t know the cost until you speak to sales. Leavely offers transparent per-seat pricing with every feature included from day one.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'Bradford Factor', leavely: true, competitor: true },
    { name: 'TOIL tracking', leavely: true, competitor: 'Add-on' },
    { name: 'Return-to-work forms', leavely: true, competitor: true },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Transparent pricing', leavely: true, competitor: false },
    { name: 'No sales call required', leavely: true, competitor: false },
    { name: 'Self-service signup', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: false },
    { name: 'No contract lock-in', leavely: true, competitor: 'Annual' },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'Set up in under 2 minutes', leavely: true, competitor: false },
    { name: 'UK bank holidays', leavely: true, competitor: true },
  ],
  whySwitch: [
    'Transparent pricing — £8/user/month, no need to call sales or wait for a quote.',
    'Self-service signup — create your account and start using Leavely in 2 minutes. No demos required.',
    'No contract lock-in — pay monthly, cancel anytime. BrightHR typically requires annual commitment.',
    'All features included — TOIL, Bradford Factor, audit trail, and everything else. No add-on fees.',
    'Free 14-day trial without a credit card — test everything before deciding.',
    'Purpose-built for leave management — focused tool without the complexity of a full HR suite.',
  ],
  disclaimer: 'Based on publicly available information from BrightHR\'s website as of March 2026. BrightHR is a product of the Peninsula Group. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Charlie HR', slug: 'charlie-hr' },
    { name: 'WhosOff', slug: 'whosoff' },
  ],
}

export default function BrightHRComparison() {
  return <ComparisonPage data={data} />
}

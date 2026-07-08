import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Sage HR — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Sage HR side by side. See which UK leave management software offers better value — features, pricing, Bradford Factor, TOIL tracking, and more.',
  alternates: { canonical: `${SITE_URL}/compare/sage-hr` },
  keywords: [
    'Sage HR alternative',
    'Sage HR vs Leavely',
    'Sage HR competitor',
    'better than Sage HR',
    'Sage HR alternative UK',
    'leave management software vs Sage HR',
    'Sage HR leave module alternative',
    'Sage HR too complex',
  ],
  openGraph: {
    title: 'Leavely vs Sage HR — Which Leave Management Tool Is Better?',
    description: 'Feature-by-feature comparison of Leavely and Sage HR for UK teams.',
    url: `${SITE_URL}/compare/sage-hr`,
  },
}

const data: ComparisonData = {
  competitor: 'Sage HR',
  tagline: 'Part of the Sage ecosystem — a well-known UK brand with a broad HR suite.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £5/user/mo (core HR + leave)',
  intro: 'Sage HR is one module in the wider Sage business software ecosystem. It\'s a recognisable name in UK business, but its leave management is just one piece of a larger HR suite — meaning you may end up paying for core HR features you don\'t need. Leavely is purpose-built for leave management: faster to configure, simpler to use, and more affordable when all you need is a great leave tracker with Bradford Factor, TOIL, and return-to-work forms included.',
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
    { name: 'Company-wide leave blocks', leavely: true, competitor: 'Limited' },
    { name: 'All features in one plan', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: false },
  ],
  whySwitch: [
    'Purpose-built for leave — Sage HR bundles leave management inside a broader HR platform. Leavely gives you a focused, powerful leave tool without the overhead.',
    'Bradford Factor monitoring included — automatically flag absence patterns so you can intervene early. Sage HR doesn\'t include this natively.',
    'TOIL tracking built in — manage time off in lieu without spreadsheets or workarounds. Not available in Sage HR\'s leave module.',
    'Return-to-work forms digitised — complete RTW interviews within the platform. Sage HR relies on separate processes.',
    'Simpler configuration — Sage HR can take significant time to set up across its modules. Leavely is ready in under 5 minutes.',
    'More affordable for leave-only needs — why pay for a full HR suite when you just need leave management done properly?',
  ],
  disclaimer: 'Based on publicly available information from Sage HR\'s website as of March 2026. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'BrightHR', slug: 'brighthr' },
    { name: 'Personio', slug: 'personio' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
    { name: 'Natural HR', slug: 'natural-hr' },
  ],
}

export default function SageHRComparison() {
  return <ComparisonPage data={data} />
}

import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs HiBob — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and HiBob (Bob) for leave management. SMB-focused transparent pricing vs mid-market enterprise platform. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/hibob` },
  keywords: [
    'HiBob alternative',
    'HiBob vs Leavely',
    'HiBob competitor',
    'Bob HR alternative',
    'HiBob alternative UK',
    'cheaper than HiBob',
    'HiBob alternative for small business',
    'HiBob too expensive',
  ],
  openGraph: {
    title: 'Leavely vs HiBob — Which Is Better for UK Small Businesses?',
    description: 'Compare Leavely and HiBob: affordable SMB leave tool vs mid-market HR platform.',
    url: `${SITE_URL}/compare/hibob`,
  },
}

const data: ComparisonData = {
  competitor: 'HiBob',
  tagline: 'Modern HR platform targeting mid-market companies. Known for its slick UI but enterprise-level pricing.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'Quote-based',
  intro: 'HiBob (also known as Bob) is a modern HR platform designed for mid-market and enterprise companies. It offers a sleek interface and covers everything from onboarding to performance — but its quote-based pricing, complex onboarding, and mid-market focus make it a poor fit for small UK teams that just need leave management. Leavely gives you transparent pricing at £8/user/month, self-service signup, and a simple tool you can set up in minutes.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays', leavely: true, competitor: true },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: true },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Transparent pricing', leavely: true, competitor: false },
    { name: 'No sales call required', leavely: true, competitor: false },
    { name: 'Self-service signup', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: false },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: false },
    { name: 'All features in one plan', leavely: true, competitor: false },
  ],
  whySwitch: [
    'Built for SMBs, not mid-market — Leavely is designed for small UK teams. HiBob targets companies with 100+ employees and prices accordingly.',
    'Transparent pricing — £8/user/month, clearly listed on the website. HiBob requires a sales call and won\'t share pricing until you\'ve been through their qualification process.',
    'Simple setup, not complex onboarding — get your team running in under 5 minutes. HiBob\'s enterprise onboarding typically involves implementation calls, data migration, and weeks of configuration.',
    'No annual contract — pay monthly, cancel anytime. HiBob typically requires an annual commitment with enterprise-level minimums.',
    'Bradford Factor built in — automatically monitor absence patterns using the UK-standard scoring method. HiBob doesn\'t offer this natively.',
    'Purpose-built for leave — Leavely focuses purely on leave management without the overhead of performance reviews, onboarding workflows, and compensation management you don\'t need.',
  ],
  disclaimer: 'Based on publicly available information from HiBob\'s website as of March 2026. HiBob and Bob are registered trademarks of HiBob Ltd. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Personio', slug: 'personio' },
    { name: 'BambooHR', slug: 'bamboohr' },
    { name: 'Factorial', slug: 'factorial' },
    { name: 'Sage HR', slug: 'sage-hr' },
  ],
}

export default function HiBobComparison() {
  return <ComparisonPage data={data} />
}

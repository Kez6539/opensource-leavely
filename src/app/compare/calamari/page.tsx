import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Calamari — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely and Calamari for leave management. UK-built with Bradford Factor and bank holidays vs EU-built tool. See which is better for your UK small business.',
  alternates: { canonical: `${SITE_URL}/compare/calamari` },
  keywords: [
    'Calamari alternative',
    'Calamari vs Leavely',
    'Calamari competitor',
    'Calamari pricing',
    'Calamari alternative UK',
    'Calamari leave management',
    'Calamari HR alternative',
    'better than Calamari',
  ],
  openGraph: {
    title: 'Leavely vs Calamari — Which Leave Tracker Is Better for UK Teams?',
    description: 'Compare Leavely and Calamari: UK-built leave management vs EU-built tool for small businesses.',
    url: `${SITE_URL}/compare/calamari`,
  },
}

const data: ComparisonData = {
  competitor: 'Calamari',
  tagline: 'Polish leave management and attendance tool. Affordable but built for the European market, not the UK.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'From £1.70/user/mo',
  intro: 'Calamari is a Polish-built leave management and clock-in/clock-out tool used across Europe. While it\'s affordable, it\'s designed for the European market rather than the UK specifically — meaning you may find gaps in UK compliance features like the Bradford Factor, automatic bank holiday handling, and GBP pricing. Leavely is purpose-built for UK teams with full UK compliance, native bank holiday support, and pricing in pounds.',
  features: [
    { name: 'Visual leave calendar', leavely: true, competitor: true },
    { name: 'One-click approvals', leavely: true, competitor: true },
    { name: 'Automatic balance tracking', leavely: true, competitor: true },
    { name: 'UK bank holidays (auto)', leavely: true, competitor: 'Manual setup' },
    { name: 'Custom leave types', leavely: true, competitor: true },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: false },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Employee directory', leavely: true, competitor: true },
    { name: 'Full audit trail', leavely: true, competitor: true },
    { name: 'GBP pricing', leavely: true, competitor: 'USD/EUR only' },
    { name: 'UK-based support', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
    { name: 'Set up in under 5 minutes', leavely: true, competitor: true },
    { name: 'All features in one plan', leavely: true, competitor: false },
  ],
  whySwitch: [
    'UK-built, not EU-built — Leavely is designed from the ground up for UK employment law, statutory entitlements, and working patterns. Calamari was built for the Polish and European market.',
    'Better UK compliance — Bradford Factor monitoring, automatic UK bank holidays, and statutory leave calculations are built in. Calamari requires manual configuration for UK-specific requirements.',
    'GBP pricing — pay in pounds without exchange rate uncertainty. Calamari prices in USD or EUR, meaning your costs fluctuate with currency markets.',
    'UK-based support — get help from a team that understands UK employment law and leave regulations. Calamari\'s support team is based in Poland.',
    'TOIL tracking included — track time off in lieu natively. Calamari doesn\'t offer dedicated TOIL tracking.',
    'All features in one plan — every Leavely feature is available without upgrading. Calamari separates leave management and clock-in modules with separate pricing.',
  ],
  disclaimer: 'Based on publicly available information from Calamari\'s website as of March 2026. Calamari is a registered trademark of Calamari sp. z o.o. Features and pricing may have changed since publication. All trademarks belong to their respective owners.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'WhosOff', slug: 'whosoff' },
    { name: 'Absence.io', slug: 'absence-io' },
    { name: 'Holiday Tracker', slug: 'holiday-tracker' },
  ],
}

export default function CalamariComparison() {
  return <ComparisonPage data={data} />
}

import type { Metadata } from 'next'
import { ComparisonPage, type ComparisonData } from '../comparison-page'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Leavely vs Spreadsheets — Leave Management Software Comparison 2026',
  description:
    'Compare Leavely with Excel and Google Sheets for staff holiday tracking. See why manual spreadsheets create admin work, balance errors, missed clashes, and weak audit trails.',
  alternates: { canonical: `${SITE_URL}/compare/spreadsheets` },
  keywords: [
    'spreadsheet leave tracker alternative',
    'Excel holiday tracker alternative',
    'Google Sheets holiday tracker alternative',
    'Leavely vs spreadsheets',
    'replace holiday spreadsheet',
    'annual leave spreadsheet alternative',
    'leave management software vs spreadsheet',
    'manual leave tracking alternative',
  ],
  openGraph: {
    title: 'Leavely vs Spreadsheets — Stop Tracking Leave Manually',
    description:
      'Manual holiday spreadsheets break as teams grow. Compare spreadsheets with Leavely for approvals, balances, clash detection, sickness tracking, and audit trails.',
    url: `${SITE_URL}/compare/spreadsheets`,
  },
}

const data: ComparisonData = {
  competitor: 'Spreadsheets',
  tagline: 'Excel and Google Sheets feel free until leave tracking becomes a weekly admin job.',
  leavelyPrice: '£8/user/mo',
  competitorPrice: 'Free + admin time',
  intro:
    'Spreadsheets are fine when there are three people and one manager. Once your team grows, manual leave tracking turns into formula checks, copied rows, missed clashes, stale balances, and approval trails buried in email or chat. Leavely replaces the spreadsheet with live balances, one-click approvals, a team calendar, sickness tracking, Bradford Factor monitoring, TOIL, and a proper audit trail.',
  features: [
    { name: 'Employee leave requests', leavely: true, competitor: 'Manual' },
    { name: 'Manager approvals', leavely: true, competitor: 'Email/chat' },
    { name: 'Automatic balance tracking', leavely: true, competitor: 'Formula risk' },
    { name: 'Pro-rata entitlement calculations', leavely: true, competitor: 'Manual' },
    { name: 'UK bank holidays built in', leavely: true, competitor: 'Manual' },
    { name: 'Team leave calendar', leavely: true, competitor: 'Static view' },
    { name: 'Department clash detection', leavely: true, competitor: false },
    { name: 'Sickness absence tracking', leavely: true, competitor: 'Manual' },
    { name: 'Bradford Factor monitoring', leavely: true, competitor: false },
    { name: 'TOIL tracking', leavely: true, competitor: 'Manual' },
    { name: 'Return-to-work forms', leavely: true, competitor: false },
    { name: 'Role-based access control', leavely: true, competitor: false },
    { name: 'Full audit trail', leavely: true, competitor: false },
    { name: 'Employee self-service', leavely: true, competitor: false },
    { name: 'No credit card for trial', leavely: true, competitor: true },
  ],
  whySwitch: [
    'No more broken formulas. Leavely calculates balances, pro-rata entitlement, carry over, and deductions automatically.',
    'Approvals stop living in inboxes and chat threads. Employees request leave in Leavely and managers approve in one click.',
    'Clashes are easier to spot because everyone works from the same live team calendar instead of copied spreadsheet versions.',
    'Sickness absence is tracked properly, with Bradford Factor monitoring and return-to-work records included.',
    'HR records have a real audit trail. You can see who requested, approved, changed, or cancelled leave without digging through files.',
    'Employees can check their own balances and leave history, so managers stop answering the same spreadsheet questions every week.',
  ],
  disclaimer:
    'Comparison based on common manual leave tracking workflows in Excel, Google Sheets, and similar spreadsheet tools. Spreadsheet capabilities vary by template, configuration, and internal process.',
  relatedComparisons: [
    { name: 'Timetastic', slug: 'timetastic' },
    { name: 'Holiday Tracker', slug: 'holiday-tracker' },
    { name: 'WhosOff', slug: 'whosoff' },
    { name: 'Breathe HR', slug: 'breathe-hr' },
  ],
}

export default function SpreadsheetsComparison() {
  return <ComparisonPage data={data} />
}

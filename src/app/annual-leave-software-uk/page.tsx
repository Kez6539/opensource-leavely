import type { Metadata } from 'next'
import {
  AlertCircle,
  BarChart3,
  CalendarDays,
  Calculator,
  CheckCircle2,
  Clock,
  FileText,
  RefreshCw,
  Users,
} from 'lucide-react'
import { HighIntentSeoPage, type SeoLandingPageData } from '@/components/high-intent-seo-page'
import { SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/annual-leave-software-uk`

export const metadata: Metadata = {
  title: 'Annual Leave Software UK: Track Entitlement, Carry Over & Holidays',
  description:
    'Annual leave software for UK businesses. Automate entitlement, pro rata, carry over, bank holidays, approvals, and staff balances. £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'annual leave software UK',
    'annual leave management software',
    'annual leave system UK',
    'annual leave booking software',
    'annual leave entitlement software',
    'annual leave tracking system',
  ],
  openGraph: {
    title: 'Annual Leave Software UK — Leavely',
    description:
      'Automate annual leave entitlement, pro rata, carry over, bank holidays, approvals, and staff balances.',
    url: pageUrl,
    type: 'website',
  },
}

const data: SeoLandingPageData = {
  pageUrl,
  campaign: 'annual_leave_software_uk',
  eyebrow: 'Annual leave software UK',
  title: 'Annual Leave Software',
  highlightedTitle: 'for UK Businesses',
  description:
    'Track annual leave entitlement, carry over, pro rata adjustments, bank holidays, approvals, and balances with one simple UK leave platform.',
  searchIntent:
    'Buyers searching for annual leave software often need more than a calendar. They need entitlement rules, balances, part-time calculations, carry over, and approvals to work correctly every time.',
  stats: [
    { value: '5.6', label: 'weeks supported' },
    { value: 'Auto', label: 'pro rata rules' },
    { value: '£8', label: 'per user/month' },
  ],
  painPoints: [
    {
      icon: AlertCircle,
      title: 'Wrong entitlement',
      description: 'Part-time staff, starters, leavers, and carry over make manual annual leave calculations fragile.',
    },
    {
      icon: FileText,
      title: 'No single record',
      description: 'Approvals and balance changes get lost in email threads, spreadsheets, and calendar notes.',
    },
    {
      icon: Clock,
      title: 'Year end is painful',
      description: 'Carry over, expired leave, and new allowances become a manual clean-up task every leave year.',
    },
  ],
  features: [
    {
      icon: Calculator,
      title: 'Entitlement calculations',
      description: 'Set policies once and let Leavely calculate allowance, usage, pending days, and remaining balance.',
    },
    {
      icon: Users,
      title: 'Part-time pro rata',
      description: 'Calculate entitlement for employees with different working patterns and mid-year start dates.',
    },
    {
      icon: RefreshCw,
      title: 'Carry over rules',
      description: 'Configure carry over limits and keep unused leave controlled when the leave year changes.',
    },
    {
      icon: CalendarDays,
      title: 'Bank holiday handling',
      description: 'Use UK bank holidays by region and choose how they interact with employee allowance.',
    },
    {
      icon: BarChart3,
      title: 'Balance reporting',
      description: 'See remaining annual leave across the company and identify employees with high unused balances.',
    },
    {
      icon: CheckCircle2,
      title: 'Approval records',
      description: 'Keep a clear history of every annual leave request, approval, decline, and cancellation.',
    },
  ],
  proofPoints: [
    'Supports statutory UK annual leave workflows.',
    'Keeps employee balances visible without manager spreadsheet checks.',
    'Works for full-time, part-time, and mid-year joiner patterns.',
    'Combines holiday requests with wider absence tracking when needed.',
    'Gives owners a clear record of approved leave.',
    'Simple enough for teams moving from Excel.',
  ],
  faqs: [
    {
      q: 'Does annual leave software calculate entitlement automatically?',
      a: 'Yes. Leavely calculates annual leave entitlement from your policy settings, working patterns, start dates, approved leave, pending requests, and carry over rules.',
    },
    {
      q: 'Can Leavely handle UK bank holidays?',
      a: 'Yes. UK bank holidays are built in, including regional handling for Scotland and Northern Ireland. You can decide whether they are deducted from allowance.',
    },
    {
      q: 'Can staff see their annual leave balance?',
      a: 'Yes. Employees can view their own allowance, used days, pending days, and remaining balance at any time.',
    },
    {
      q: 'Is this different from a spreadsheet template?',
      a: 'Yes. A spreadsheet template still needs manual updates and checks. Leavely updates balances automatically when requests are approved, cancelled, or changed.',
    },
  ],
}

export default function AnnualLeaveSoftwareUKPage() {
  return <HighIntentSeoPage data={data} />
}

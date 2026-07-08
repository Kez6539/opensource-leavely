import type { Metadata } from 'next'
import {
  AlertTriangle,
  CalendarDays,
  Calculator,
  CheckCircle2,
  Clock,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react'
import { HighIntentSeoPage, type SeoLandingPageData } from '@/components/high-intent-seo-page'
import { SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/holiday-tracker-small-business`

export const metadata: Metadata = {
  title: 'Holiday Tracker for Small Business UK: Simple Staff Leave Tracking',
  description:
    'Holiday tracker for UK small businesses. Track staff holidays, approvals, balances, bank holidays, and clashes without spreadsheets. £8/user/month. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'holiday tracker small business',
    'small business holiday tracker',
    'holiday tracker for small business UK',
    'staff holiday tracker small business',
    'employee holiday tracker small business',
    'small company holiday tracker',
  ],
  openGraph: {
    title: 'Holiday Tracker for Small Business UK — Leavely',
    description:
      'Simple staff holiday tracking for UK small businesses. Automatic balances, approvals, and team calendar. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const data: SeoLandingPageData = {
  pageUrl,
  campaign: 'holiday_tracker_small_business',
  eyebrow: 'Holiday tracker for small business',
  title: 'Holiday Tracker',
  highlightedTitle: 'for Small Business',
  description:
    'A simple holiday tracker for UK small businesses that need accurate balances, fast approvals, and a clear team calendar without spreadsheet admin.',
  searchIntent:
    'People searching for a small business holiday tracker usually need a practical replacement for spreadsheets, WhatsApp messages, or shared calendars. Leavely focuses on that job: staff request time off, managers approve it, and holiday balances update automatically.',
  stats: [
    { value: '2 min', label: 'setup time' },
    { value: '£8', label: 'per user/month' },
    { value: '14', label: 'day free trial' },
  ],
  painPoints: [
    {
      icon: AlertTriangle,
      title: 'Spreadsheet errors',
      description: 'Manual formulas break, balances drift, and nobody is fully sure how many days each employee has left.',
    },
    {
      icon: Users,
      title: 'Clashing holidays',
      description: 'Two people book the same week off and the issue only appears when the rota is already thin.',
    },
    {
      icon: Clock,
      title: 'Too many admin questions',
      description: 'Managers keep answering balance checks and chasing approvals instead of letting the system handle it.',
    },
  ],
  features: [
    {
      icon: CalendarDays,
      title: 'Team holiday calendar',
      description: 'See approved and pending holidays in one place, filtered by team or department.',
    },
    {
      icon: Calculator,
      title: 'Automatic balances',
      description: 'Track allowance, used days, pending requests, carry over, and remaining balance in real time.',
    },
    {
      icon: Zap,
      title: 'One-click approvals',
      description: 'Managers approve or decline requests quickly, with notifications sent to employees automatically.',
    },
    {
      icon: CheckCircle2,
      title: 'UK bank holidays',
      description: 'Bank holidays are built in, with regional handling for Scotland and Northern Ireland.',
    },
    {
      icon: Users,
      title: 'Self-service employees',
      description: 'Employees can request holiday and check their own balance without asking the office manager.',
    },
    {
      icon: Smartphone,
      title: 'Works anywhere',
      description: 'Leavely runs in the browser on desktop, tablet, and mobile with no app rollout needed.',
    },
  ],
  proofPoints: [
    'Built for teams without a dedicated HR department.',
    'Simple monthly pricing with all leave features included.',
    'Supports pro rata entitlement for part-time staff and mid-year starters.',
    'Keeps every request and approval in an audit trail.',
    'Helps managers spot coverage gaps before approving time off.',
    'Replaces spreadsheet tracking without a long implementation project.',
  ],
  faqs: [
    {
      q: 'What is the best holiday tracker for a small business?',
      a: 'The best holiday tracker for a small business is one that is quick to set up, easy for employees to use, and accurate enough to replace spreadsheets. Leavely handles requests, approvals, balances, and team visibility for £8 per user per month.',
    },
    {
      q: 'Can Leavely handle part-time staff?',
      a: 'Yes. Leavely calculates pro rata holiday entitlement for part-time employees and mid-year starters, so balances stay accurate without manual calculations.',
    },
    {
      q: 'Do employees need training?',
      a: 'No. Employees can log in, see their balance, and submit a holiday request in a few clicks. Managers approve requests from their dashboard or notification flow.',
    },
    {
      q: 'Can I try it before paying?',
      a: 'Yes. Every workspace starts with a free 14-day trial and no credit card is required.',
    },
  ],
}

export default function HolidayTrackerSmallBusinessPage() {
  return <HighIntentSeoPage data={data} />
}

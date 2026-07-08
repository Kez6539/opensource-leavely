import type { Metadata } from 'next'
import {
  AlertTriangle,
  Ban,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'
import { HighIntentSeoPage, type SeoLandingPageData } from '@/components/high-intent-seo-page'
import { SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/leave-planner-software-uk`

export const metadata: Metadata = {
  title: 'Leave Planner Software UK: Plan Staff Holidays & Absences',
  description:
    'Leave planner software for UK businesses. Visual staff calendar, clash detection, approvals, blackout dates, and leave balances. £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'leave planner software UK',
    'staff leave planner software',
    'employee leave planner',
    'team leave planner UK',
    'holiday leave planner software',
    'online leave planner',
  ],
  openGraph: {
    title: 'Leave Planner Software UK — Leavely',
    description:
      'Plan staff holidays and absences with a visual calendar, clash detection, approvals, blackout dates, and automatic balances.',
    url: pageUrl,
    type: 'website',
  },
}

const data: SeoLandingPageData = {
  pageUrl,
  campaign: 'leave_planner_software_uk',
  eyebrow: 'Leave planner software UK',
  title: 'Leave Planner Software',
  highlightedTitle: 'for UK Businesses',
  description:
    'Plan holidays, sickness, TOIL, and custom absence types with a visual leave planner that keeps managers ahead of coverage gaps.',
  searchIntent:
    'Leave planner software searches usually come from teams that want visibility before approving time off. Leavely gives managers a planning view as well as the request, approval, and balance workflow behind it.',
  stats: [
    { value: 'Live', label: 'team calendar' },
    { value: 'Auto', label: 'balance updates' },
    { value: '£8', label: 'per user/month' },
  ],
  painPoints: [
    {
      icon: AlertTriangle,
      title: 'Poor planning visibility',
      description: 'Managers cannot make good approval decisions if they cannot see existing leave and team coverage.',
    },
    {
      icon: Ban,
      title: 'Peak dates exposed',
      description: 'Busy periods get booked up when there is no way to guide or block leave requests.',
    },
    {
      icon: Users,
      title: 'Team capacity risk',
      description: 'A simple approval can create operational problems when too many people are away together.',
    },
  ],
  features: [
    {
      icon: CalendarDays,
      title: 'Visual leave planner',
      description: 'View approved and pending leave across the team, department, or company.',
    },
    {
      icon: Eye,
      title: 'Clash visibility',
      description: 'Spot overlapping leave before approving new requests and creating coverage gaps.',
    },
    {
      icon: Ban,
      title: 'Blackout dates',
      description: 'Mark periods where leave should not be requested, such as seasonal peaks or key deadlines.',
    },
    {
      icon: Zap,
      title: 'Fast approvals',
      description: 'Approve or decline leave requests quickly once the planner shows the full context.',
    },
    {
      icon: BarChart3,
      title: 'Leave reporting',
      description: 'Monitor usage, remaining balances, absence patterns, and team availability.',
    },
    {
      icon: ShieldCheck,
      title: 'Role-based views',
      description: 'Managers see their own teams while admins and owners keep broader planning visibility.',
    },
  ],
  proofPoints: [
    'Helps managers plan leave instead of reacting after approvals.',
    'Combines the planner with requests, balances, and absence records.',
    'Supports team-level visibility for growing UK businesses.',
    'Includes custom leave types alongside annual leave.',
    'Keeps every approval and cancellation traceable.',
    'Offers a practical replacement for shared calendars and spreadsheets.',
  ],
  faqs: [
    {
      q: 'What is leave planner software?',
      a: 'Leave planner software helps businesses view, approve, and manage employee time off. It usually includes a team calendar, request workflow, balance tracking, and reporting.',
    },
    {
      q: 'Can Leavely show who is off across a team?',
      a: 'Yes. Leavely includes a visual team calendar so managers can see approved and pending leave before making approval decisions.',
    },
    {
      q: 'Does Leavely support blackout dates?',
      a: 'Yes. Leavely supports blackout dates so businesses can protect busy periods or dates where leave should not normally be requested.',
    },
    {
      q: 'Can it track more than annual leave?',
      a: 'Yes. Leavely can track annual leave, sickness, TOIL, unpaid leave, compassionate leave, and custom leave types.',
    },
  ],
}

export default function LeavePlannerSoftwareUKPage() {
  return <HighIntentSeoPage data={data} />
}

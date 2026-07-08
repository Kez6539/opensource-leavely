import type { Metadata } from 'next'
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react'
import { HighIntentSeoPage, type SeoLandingPageData } from '@/components/high-intent-seo-page'
import { SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/staff-leave-management-software`

export const metadata: Metadata = {
  title: 'Staff Leave Management Software UK: Holidays, Sickness & Absence',
  description:
    'Staff leave management software for UK businesses. Manage holidays, sick leave, approvals, balances, reports, and audit trails in one system. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'staff leave management software',
    'staff leave management system',
    'employee leave management software UK',
    'staff absence management software',
    'leave management software for staff',
    'staff time off management',
  ],
  openGraph: {
    title: 'Staff Leave Management Software UK — Leavely',
    description:
      'Manage staff holidays, sick leave, approvals, balances, and reports in one simple UK leave system.',
    url: pageUrl,
    type: 'website',
  },
}

const data: SeoLandingPageData = {
  pageUrl,
  campaign: 'staff_leave_management_software',
  eyebrow: 'Staff leave management software',
  title: 'Staff Leave Management',
  highlightedTitle: 'Software for UK Teams',
  description:
    'Leavely brings staff holidays, sick leave, TOIL, approvals, balances, and reports into one clear leave management system for UK businesses.',
  searchIntent:
    'This search usually comes from managers who have outgrown basic holiday tracking and now need a proper staff leave management process. Leavely covers the whole workflow without forcing teams into an enterprise HR suite.',
  stats: [
    { value: 'All', label: 'leave types' },
    { value: '£8', label: 'per user/month' },
    { value: '1', label: 'clear system' },
  ],
  painPoints: [
    {
      icon: AlertTriangle,
      title: 'Leave data is scattered',
      description: 'Holiday requests, sick notes, TOIL, and approvals live in different inboxes and spreadsheets.',
    },
    {
      icon: Clock,
      title: 'Approvals are slow',
      description: 'Employees wait for decisions while managers manually check calendars and remaining balances.',
    },
    {
      icon: FileText,
      title: 'Reporting is manual',
      description: 'Owners need absence and holiday reports, but the source data is inconsistent and hard to trust.',
    },
  ],
  features: [
    {
      icon: CalendarDays,
      title: 'All leave in one calendar',
      description: 'Track holidays, sickness, TOIL, compassionate leave, unpaid leave, and custom absence types together.',
    },
    {
      icon: Zap,
      title: 'Approval workflows',
      description: 'Route requests to the right manager and keep employees updated without manual chasing.',
    },
    {
      icon: BarChart3,
      title: 'Absence reporting',
      description: 'See leave usage, sickness patterns, remaining balances, and team coverage from one dashboard.',
    },
    {
      icon: ShieldCheck,
      title: 'Audit trail',
      description: 'Every request, approval, cancellation, and balance change is recorded for clarity.',
    },
    {
      icon: Users,
      title: 'Manager permissions',
      description: 'Managers see their own teams while owners and admins keep full company visibility.',
    },
    {
      icon: CheckCircle2,
      title: 'UK leave rules',
      description: 'Handle bank holidays, pro rata entitlement, part-time staff, carry over, and leave year settings.',
    },
  ],
  proofPoints: [
    'Designed around UK leave workflows and small business teams.',
    'Keeps holidays and sickness visible without exposing unnecessary employee data.',
    'Lets employees self-serve requests and balances.',
    'Gives managers the context they need before approving time off.',
    'Includes all features at one monthly price.',
    'Can be adopted without changing payroll or finance systems.',
  ],
  faqs: [
    {
      q: 'What does staff leave management software include?',
      a: 'Staff leave management software usually includes holiday requests, approvals, balance tracking, sickness recording, team calendars, reporting, and audit history. Leavely includes these features in one monthly price.',
    },
    {
      q: 'Can Leavely track sickness as well as holidays?',
      a: 'Yes. Leavely tracks annual leave, sick leave, TOIL, unpaid leave, compassionate leave, and custom leave types in one system.',
    },
    {
      q: 'Is it suitable for managers without HR experience?',
      a: 'Yes. Leavely is designed so owners, office managers, and team leads can manage leave without needing a dedicated HR department.',
    },
    {
      q: 'How much does it cost?',
      a: 'Leavely costs £8 per user per month with all features included. There are no setup fees and no annual contract requirement.',
    },
  ],
}

export default function StaffLeaveManagementSoftwarePage() {
  return <HighIntentSeoPage data={data} />
}

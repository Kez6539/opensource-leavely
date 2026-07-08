import type { Metadata } from 'next'
import {
  AlertTriangle,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  Smartphone,
  Users,
} from 'lucide-react'
import { HighIntentSeoPage, type SeoLandingPageData } from '@/components/high-intent-seo-page'
import { SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/employee-holiday-booking-system`

export const metadata: Metadata = {
  title: 'Employee Holiday Booking System UK: Online Leave Requests',
  description:
    'Employee holiday booking system for UK teams. Staff request holidays online, managers approve in one click, and balances update automatically. Free trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'employee holiday booking system',
    'holiday booking system UK',
    'staff holiday booking system',
    'online holiday booking system',
    'employee leave booking system',
    'holiday request system',
  ],
  openGraph: {
    title: 'Employee Holiday Booking System UK — Leavely',
    description:
      'Staff request holidays online, managers approve in one click, and balances update automatically.',
    url: pageUrl,
    type: 'website',
  },
}

const data: SeoLandingPageData = {
  pageUrl,
  campaign: 'employee_holiday_booking_system',
  eyebrow: 'Employee holiday booking system',
  title: 'Employee Holiday Booking',
  highlightedTitle: 'System for UK Teams',
  description:
    'Give employees a simple online holiday booking system while managers get approval controls, clash visibility, and automatic balance updates.',
  searchIntent:
    'This keyword signals a team that wants employees to submit holiday requests online instead of sending messages to managers. Leavely turns that request flow into a reliable approval and balance system.',
  stats: [
    { value: '1 click', label: 'manager approvals' },
    { value: '24/7', label: 'employee access' },
    { value: '£8', label: 'per user/month' },
  ],
  painPoints: [
    {
      icon: Mail,
      title: 'Requests get buried',
      description: 'Holiday emails and chat messages are easy to miss, especially when managers are busy.',
    },
    {
      icon: AlertTriangle,
      title: 'No clash warning',
      description: 'Managers approve requests without seeing who else is already off at the same time.',
    },
    {
      icon: Clock,
      title: 'Employees wait too long',
      description: 'Staff need a quick answer before booking travel, but manual checks slow everything down.',
    },
  ],
  features: [
    {
      icon: CalendarCheck,
      title: 'Online holiday requests',
      description: 'Employees request holiday through Leavely with dates, notes, and half-day options.',
    },
    {
      icon: Bell,
      title: 'Approval notifications',
      description: 'Managers are alerted when requests arrive, and employees are updated when decisions are made.',
    },
    {
      icon: CheckCircle2,
      title: 'Automatic balance updates',
      description: 'Approved, pending, and cancelled requests flow into each employee balance automatically.',
    },
    {
      icon: Users,
      title: 'Team visibility',
      description: 'Managers can check the team calendar before approving a holiday booking.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-friendly booking',
      description: 'Employees can request time off from their phone without installing a separate app.',
    },
    {
      icon: CalendarDays,
      title: 'Calendar sync',
      description: 'Approved leave can be synced into shared calendars so holidays stay visible.',
    },
  ],
  proofPoints: [
    'Moves holiday booking out of inboxes and chat threads.',
    'Gives staff self-service access to requests and balances.',
    'Lets managers approve with the right context.',
    'Supports annual leave, half days, TOIL, and custom leave types.',
    'Works for small teams and growing multi-manager businesses.',
    'Keeps a clear history of every booking decision.',
  ],
  faqs: [
    {
      q: 'How does an employee holiday booking system work?',
      a: 'Employees choose their holiday dates online and submit a request. Managers review the request, check team availability, and approve or decline. Leavely then updates the employee balance automatically.',
    },
    {
      q: 'Can managers see clashes before approving?',
      a: 'Yes. Managers can view team leave and coverage before making a decision, which helps avoid approving too many people off at once.',
    },
    {
      q: 'Can employees request holidays on mobile?',
      a: 'Yes. Leavely is browser-based and works on phones, tablets, and desktop devices.',
    },
    {
      q: 'Does the system send notifications?',
      a: 'Yes. Managers receive request notifications, and employees are notified when their request is approved or declined.',
    },
  ],
}

export default function EmployeeHolidayBookingSystemPage() {
  return <HighIntentSeoPage data={data} />
}

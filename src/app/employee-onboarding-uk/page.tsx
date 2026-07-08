import type { Metadata } from 'next'
import { SeoPillarPage, type PillarPageProps } from '@/components/shared/seo-pillar-page'
import { SITE_URL } from '@/lib/seo'

const path = '/employee-onboarding-uk'
const pageUrl = `${SITE_URL}${path}`

export const metadata: Metadata = {
  title: 'Employee Onboarding UK: Checklist for Small Businesses | Leavely',
  description:
    'A practical UK employee onboarding and offboarding checklist covering right to work, contracts, payroll, policies, leave setup, equipment, access, and exit records.',
  alternates: { canonical: pageUrl },
  keywords: [
    'employee onboarding UK',
    'onboarding checklist UK',
    'offboarding checklist UK',
    'new starter checklist UK',
    'small business HR onboarding',
  ],
  openGraph: {
    title: 'Employee Onboarding UK: Checklist for Small Businesses',
    description:
      'Right to work, contracts, payroll, policies, leave setup, systems access, and offboarding records for UK small businesses.',
    url: pageUrl,
    type: 'article',
  },
}

const page: PillarPageProps = {
  badge: 'HR Checklist',
  title: 'Employee Onboarding UK: Checklist for Small Businesses',
  description:
    'Good onboarding is not only a welcome email and a laptop. For UK employers, it is the moment to complete right-to-work checks, issue documents, set payroll up correctly, explain leave rules, and give the new starter a clear first month.',
  path,
  readTime: '9 min read',
  published: '2026-06-27',
  modified: '2026-06-27',
  template: {
    href: '/templates/onboarding-offboarding-checklist-uk.txt',
    title: 'Downloadable onboarding and offboarding checklist',
    description:
      'A text checklist covering pre-start, day one, week one, month one, and leaver actions.',
  },
  sections: [
    {
      title: 'Before the employee starts',
      intro:
        'Pre-start tasks reduce first-day friction and lower compliance risk. The basics should be complete before the person does any work.',
      bullets: [
        'Complete a compliant right-to-work check and keep the required evidence.',
        'Issue the employment contract or written statement of particulars.',
        'Collect payroll details, tax starter declaration, pension information, and emergency contact details.',
        'Prepare equipment, software access, role-specific training, and any uniform or site pass.',
      ],
    },
    {
      title: 'Day one checklist',
      intro:
        'Day one should confirm the essentials and make the employee productive without overwhelming them.',
      table: {
        headers: ['Area', 'What to cover'],
        rows: [
          ['Welcome', 'Manager intro, team intro, role expectations, first-week plan'],
          ['Policies', 'Holiday, sickness, absence reporting, conduct, data protection'],
          ['Systems', 'Email, HR system, rota, clock-in, shared drives, password setup'],
          ['Health and safety', 'Workstation, fire safety, first aid, workplace risks'],
        ],
      },
    },
    {
      title: 'Leave and absence setup',
      intro:
        'Set annual leave, working pattern, approver, location, and absence reporting rules at onboarding. This prevents payroll and holiday disputes later.',
      links: [
        { href: '/part-time-worker-leave-entitlement', label: 'Part-time worker leave entitlement' },
        { href: '/sick-leave-uk', label: 'Sick leave UK employer guide' },
        { href: '/blog/annual-leave-entitlement-uk', label: 'Annual leave entitlement UK' },
      ],
    },
    {
      title: 'Week one and month one',
      intro:
        'The first month should build clarity. Schedule check-ins rather than waiting for probation issues to surface.',
      bullets: [
        'Confirm the employee understands the role, working pattern, rota, and reporting lines.',
        'Check training completion and any gaps in system access.',
        'Document probation goals and dates for review conversations.',
        'Ask whether any adjustments, equipment, or workload changes are needed.',
      ],
    },
    {
      title: 'Offboarding checklist',
      intro:
        'Offboarding should protect access, payroll, records, and team continuity. It also gives you useful feedback about why people leave.',
      bullets: [
        'Confirm final working day, notice, accrued holiday, deductions, and final pay.',
        'Remove access to email, HR systems, finance tools, documents, and physical premises.',
        'Recover equipment, keys, cards, uniforms, and company property.',
        'Complete handover notes and optional exit interview.',
      ],
    },
    {
      title: 'How Leavely helps',
      intro:
        'Leavely keeps onboarding practical by connecting employees to their leave allowance, working pattern, manager, location, and team calendar from the start.',
      bullets: [
        'Set working patterns and pro-rata leave for each new starter.',
        'Give employees self-service access to request leave and view balances.',
        'Keep managers aligned on absence, holidays, and team coverage during probation.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What documents should a UK new starter receive?',
      answer:
        'At minimum, employers should provide the required written employment particulars and relevant policies. Many also provide a handbook, privacy notice, payroll forms, pension information, and role-specific procedures.',
    },
    {
      question: 'Should holiday entitlement be set up before day one?',
      answer:
        'Yes. Setting the working pattern, leave year, approver, and starting balance early avoids confusion when the employee makes their first holiday request.',
    },
    {
      question: 'What should offboarding include?',
      answer:
        'Offboarding should cover final pay, accrued holiday, equipment return, access removal, handover, record retention, and an optional exit interview.',
    },
  ],
  cta: {
    title: 'Set new starters up cleanly',
    body:
      'Use Leavely to configure leave, working patterns, approvals, and team visibility from day one. Start a free 14-day trial.',
  },
  related: [
    { href: '/blog/employee-onboarding-checklist-uk', label: 'Employee onboarding checklist UK' },
    { href: '/employee-onboarding-software-uk', label: 'Employee onboarding software UK' },
    { href: '/blog/return-to-work-interview-questions', label: 'Return-to-work interview questions' },
    { href: '/uk-hr-compliance-small-business', label: 'UK HR compliance checklist' },
  ],
}

export default function EmployeeOnboardingUkPage() {
  return <SeoPillarPage {...page} />
}

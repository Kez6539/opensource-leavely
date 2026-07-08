import type { Metadata } from 'next'
import { SeoPillarPage, type PillarPageProps } from '@/components/shared/seo-pillar-page'
import { SITE_URL } from '@/lib/seo'

const path = '/uk-hr-compliance-small-business'
const pageUrl = `${SITE_URL}${path}`

export const metadata: Metadata = {
  title: 'UK HR Compliance Checklist for Small Businesses | Leavely',
  description:
    'A practical UK HR compliance checklist for small businesses covering contracts, right to work, leave, sickness, payroll, policies, data protection, and records.',
  alternates: { canonical: pageUrl },
  keywords: [
    'UK HR compliance checklist',
    'small business HR compliance UK',
    'HR checklist for small business',
    'employment law checklist UK',
    'SME HR compliance',
  ],
  openGraph: {
    title: 'UK HR Compliance Checklist for Small Businesses',
    description:
      'Contracts, right to work, annual leave, sick leave, payroll, policies, GDPR, and record-keeping for UK SMEs.',
    url: pageUrl,
    type: 'article',
  },
}

const page: PillarPageProps = {
  badge: 'HR Checklist',
  title: 'UK HR Compliance Checklist for Small Businesses',
  description:
    'Small businesses do not need enterprise HR process, but they do need the essentials done consistently. This master checklist covers the employment records, policies, leave rules, absence workflows, and payroll touchpoints UK SMEs should keep under control.',
  path,
  readTime: '12 min read',
  published: '2026-06-27',
  modified: '2026-06-27',
  template: {
    href: '/templates/uk-hr-compliance-checklist-small-business.txt',
    title: 'Downloadable HR compliance checklist',
    description:
      'A practical text checklist for contracts, right to work, payroll, leave, sickness, policies, data, and leavers.',
  },
  sections: [
    {
      title: 'Hiring and right-to-work checks',
      intro:
        'Before anyone starts work, confirm they have the legal right to work and keep the right evidence. Missing checks can create immigration and record-keeping risk.',
      bullets: [
        'Run the correct right-to-work check before employment begins.',
        'Keep evidence securely for the required period.',
        'Issue the employment contract or written statement on time.',
        'Collect payroll, pension, tax, emergency contact, and policy acknowledgement details.',
      ],
    },
    {
      title: 'Core HR policies',
      intro:
        'Policies should be practical enough for managers to follow. A short, consistent policy beats a long document nobody uses.',
      links: [
        { href: '/blog/absence-management-policy-uk', label: 'Absence management policy UK' },
        { href: '/blog/compassionate-leave-uk', label: 'Compassionate leave UK' },
        { href: '/blog/employee-handbook-uk', label: 'Employee handbook UK' },
      ],
    },
    {
      title: 'Holiday and absence compliance',
      intro:
        'Leave compliance is a common source of disputes because it changes with working pattern, family leave, sickness, bank holidays, and leavers.',
      bullets: [
        'Track statutory annual leave and contractual leave separately where useful.',
        'Calculate part-time, zero-hours, and irregular-hours entitlement consistently.',
        'Keep sickness records, SSP decisions, fit notes, and return-to-work notes.',
        'Record maternity, paternity, compassionate, unpaid, and other leave separately.',
      ],
      links: [
        { href: '/blog/annual-leave-entitlement-uk', label: 'Annual leave entitlement UK' },
        { href: '/part-time-worker-leave-entitlement', label: 'Part-time worker leave entitlement' },
        { href: '/sick-leave-uk', label: 'Sick leave UK' },
        { href: '/maternity-leave-uk', label: 'Maternity leave UK' },
      ],
    },
    {
      title: 'Payroll, pensions, and statutory payments',
      intro:
        'HR and payroll data need to agree. Statutory payments, leave deductions, final pay, and pension changes should all have a clear record.',
      table: {
        headers: ['Area', 'Compliance record'],
        rows: [
          ['Payroll', 'Starter details, tax status, pay changes, deductions, final pay'],
          ['Pensions', 'Auto-enrolment status, postponement, opt-outs, contributions'],
          ['Statutory pay', 'SSP, SMP, SPP, parental bereavement pay, evidence and dates'],
          ['Leavers', 'Notice, accrued holiday, equipment return, access removal'],
        ],
      },
    },
    {
      title: 'Data protection and employee records',
      intro:
        'Employee records contain sensitive data. Store only what you need, restrict access, and keep retention periods clear.',
      bullets: [
        'Use a privacy notice for employees and applicants.',
        'Limit access to medical, absence, performance, and disciplinary records.',
        'Avoid storing sensitive notes in manager inboxes or spreadsheets.',
        'Delete or archive records according to your retention schedule.',
      ],
    },
    {
      title: 'Manager process and audit trail',
      intro:
        'Many compliance failures happen because managers use different informal processes. Give managers simple workflows for approving leave, recording sickness, holding return-to-work interviews, and escalating concerns.',
      callout: {
        title: 'The small-business rule',
        body:
          'If a process affects pay, employment rights, health, or dismissal risk, keep a dated record of what happened and who approved it.',
      },
    },
    {
      title: 'How Leavely helps',
      intro:
        'Leavely helps small businesses keep leave and absence records consistent without adding enterprise complexity.',
      bullets: [
        'One place for holiday, sickness, family leave, compassionate leave, and custom leave types.',
        'Manager approvals and audit trails for every request.',
        'Reports for balances, absence trends, Bradford Factor, and team coverage.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What HR records should a UK small business keep?',
      answer:
        'Core records include right-to-work evidence, contracts, payroll and pension information, holiday and sickness records, statutory pay evidence, policy acknowledgements, performance or disciplinary records, and leaver records.',
    },
    {
      question: 'Does a small business need an absence policy?',
      answer:
        'Yes. A simple absence policy helps employees know how to report sickness and helps managers handle SSP, fit notes, return-to-work interviews, and trigger points consistently.',
    },
    {
      question: 'How often should HR policies be reviewed?',
      answer:
        'Review policies at least annually and whenever employment law, payroll rules, working patterns, or business operations change materially.',
    },
  ],
  cta: {
    title: 'Put leave and absence compliance in one place',
    body:
      'Leavely gives UK SMEs clear leave records, approval trails, and absence reporting. Start a free 14-day trial.',
  },
  related: [
    { href: '/blog/hr-compliance-checklist-uk', label: 'HR compliance checklist UK' },
    { href: '/blog/absence-management-policy-uk', label: 'Absence management policy UK' },
    { href: '/blog/annual-leave-entitlement-uk', label: 'Annual leave entitlement UK' },
    { href: '/faq', label: 'Leavely FAQ' },
  ],
}

export default function UkHrComplianceSmallBusinessPage() {
  return <SeoPillarPage {...page} />
}

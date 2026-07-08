import type { Metadata } from 'next'
import { SeoPillarPage, type PillarPageProps } from '@/components/shared/seo-pillar-page'
import { SITE_URL } from '@/lib/seo'

const path = '/sick-leave-uk'
const pageUrl = `${SITE_URL}${path}`

export const metadata: Metadata = {
  title: 'Sick Leave UK: SSP 2026/27 Employer Guide | Leavely',
  description:
    'UK employer guide to sick leave, Statutory Sick Pay, day-one SSP rights, fit notes, self-certification, absence triggers, and return-to-work records.',
  alternates: { canonical: pageUrl },
  keywords: [
    'sick leave UK',
    'SSP employer guide',
    'statutory sick pay 2026',
    'day one sick pay UK',
    'fit note employer guide',
  ],
  openGraph: {
    title: 'Sick Leave UK: SSP 2026/27 Employer Guide',
    description:
      'SSP rates, eligibility, fit notes, self-certification, absence policy, and return-to-work records for UK employers.',
    url: pageUrl,
    type: 'article',
  },
}

const page: PillarPageProps = {
  badge: 'HR Guide',
  title: 'Sick Leave UK: SSP 2026/27 Employer Guide',
  description:
    'Sick leave is where HR compliance meets day-to-day management. Employers need to pay SSP correctly, handle evidence fairly, avoid disability discrimination, and keep absence records consistent enough to support return-to-work conversations.',
  path,
  readTime: '10 min read',
  published: '2026-06-27',
  modified: '2026-06-27',
  template: {
    href: '/templates/sick-leave-record-template-uk.txt',
    title: 'Downloadable sick leave record template',
    description:
      'Use this checklist to record notification, dates, evidence, SSP decision, RTW notes, and follow-up actions.',
  },
  sections: [
    {
      title: 'What counts as sick leave?',
      intro:
        'Sick leave is absence because the employee is too ill to work. It should be recorded separately from annual leave, compassionate leave, parental leave, and unpaid leave so payroll and absence reporting stay accurate.',
      bullets: [
        'Employees should tell their employer they are unable to work by the reporting deadline in the absence policy.',
        'For sickness lasting more than 7 calendar days, the employee must usually provide a fit note.',
        'Short-term, repeated, and long-term sickness should be managed through a consistent absence management process.',
      ],
    },
    {
      title: 'Statutory Sick Pay in 2026/27',
      intro:
        'The current SSP rate is GBP 123.25 per week or 80% of normal weekly earnings if lower. It is paid by the employer for up to 28 weeks to eligible employees.',
      table: {
        headers: ['SSP point', 'Employer action'],
        rows: [
          ['Rate', 'GBP 123.25 per week or 80% of normal weekly earnings if lower'],
          ['Maximum duration', 'Up to 28 weeks'],
          ['Eligibility', 'Employee, some work done for employer, and at least one full working day sick'],
          ['Evidence', 'Fit note usually required after more than 7 calendar days'],
        ],
      },
      callout: {
        title: 'Day-one practical point',
        body:
          'Build your process around the first full working day of sickness: capture the notification, normal working pattern, and whether SSP applies from that point.',
      },
    },
    {
      title: 'Self-certification and fit notes',
      intro:
        'For the first 7 calendar days of sickness, employees can normally self-certify. After that, ask for a fit note. Fit notes can be digital or printed and may say the employee is not fit for work or may be fit for work with adjustments.',
      bullets: [
        'Accept fit notes from authorised healthcare professionals, not only GPs.',
        'Record whether suggested adjustments are reasonable and what was agreed.',
        'Do not demand detailed medical information that is not needed for managing the absence.',
      ],
    },
    {
      title: 'Absence triggers and return-to-work interviews',
      intro:
        'Return-to-work interviews and trigger points help managers act consistently. They should prompt a welfare conversation, not an automatic warning.',
      links: [
        {
          href: '/blog/absence-management-policy-uk',
          label: 'Absence management policy UK',
        },
        {
          href: '/blog/return-to-work-interview-questions',
          label: 'Return-to-work interview questions',
        },
        {
          href: '/blog/bradford-factor-explained',
          label: 'Bradford Factor explained',
        },
      ],
    },
    {
      title: 'Disability, long-term sickness, and reasonable adjustments',
      intro:
        'If sickness may be disability-related, employers should consider reasonable adjustments before applying triggers or formal action. For long-term absence, regular contact, occupational health input, and phased-return planning are often more useful than repeated warning letters.',
      bullets: [
        'Separate disability-related absence where your policy requires it.',
        'Consider adjustments to duties, hours, location, equipment, or triggers.',
        'Document welfare conversations and agreed support without over-collecting medical details.',
      ],
    },
    {
      title: 'How Leavely helps',
      intro:
        'Leavely gives managers one place to record sick leave, fit note dates, RTW outcomes, Bradford Factor scores, and trend reports.',
      bullets: [
        'Track sickness separately from holiday and other leave types.',
        'Keep return-to-work notes attached to the absence record.',
        'Spot repeated short-term absence patterns before they become harder to manage.',
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is SSP in 2026/27?',
      answer:
        'The current rate is GBP 123.25 per week, or 80% of normal weekly earnings if lower, paid for up to 28 weeks where eligibility rules are met.',
    },
    {
      question: 'When is a fit note needed?',
      answer:
        'A fit note is usually needed when an employee is off sick for more than 7 calendar days in a row, including non-working days.',
    },
    {
      question: 'Should every sickness absence have a return-to-work interview?',
      answer:
        'Many employers do this because it creates a consistent record, checks welfare, and helps identify support needs or absence patterns early.',
    },
  ],
  cta: {
    title: 'Keep sick leave records clean and consistent',
    body:
      'Leavely tracks sickness, return-to-work notes, and absence patterns without spreadsheet drift. Try it free for 14 days.',
  },
  related: [
    { href: '/blog/absence-management-policy-uk', label: 'Absence management policy UK' },
    { href: '/blog/return-to-work-interview-questions', label: 'Return-to-work interview questions' },
    { href: '/blog/bradford-factor-explained', label: 'Bradford Factor explained' },
    { href: '/fit-note-rules-uk-employer', label: 'Fit note rules for UK employers' },
  ],
}

export default function SickLeaveUkPage() {
  return <SeoPillarPage {...page} />
}

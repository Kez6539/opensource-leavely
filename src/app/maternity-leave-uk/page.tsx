import type { Metadata } from 'next'
import { SeoPillarPage, type PillarPageProps } from '@/components/shared/seo-pillar-page'
import { SITE_URL } from '@/lib/seo'

const path = '/maternity-leave-uk'
const pageUrl = `${SITE_URL}${path}`

export const metadata: Metadata = {
  title: 'Maternity Leave UK: SMP 2026/27 Employer Guide | Leavely',
  description:
    'A practical UK employer guide to maternity leave, Statutory Maternity Pay for 2026/27, notice, KIT days, holiday accrual, return planning, and payroll records.',
  alternates: { canonical: pageUrl },
  keywords: [
    'maternity leave UK',
    'SMP 2026/27',
    'statutory maternity pay employer guide',
    'maternity leave policy UK',
    'maternity leave checklist',
  ],
  openGraph: {
    title: 'Maternity Leave UK: SMP 2026/27 Employer Guide',
    description:
      'Maternity leave, SMP rates, employer duties, notice, holiday accrual, KIT days, and return planning for UK employers.',
    url: pageUrl,
    type: 'article',
  },
}

const page: PillarPageProps = {
  badge: 'HR Guide',
  title: 'Maternity Leave UK: SMP 2026/27 Employer Guide',
  description:
    'Maternity leave is one of the highest-risk absence processes for UK employers because it touches pay, discrimination protection, holiday accrual, health and safety, and return-to-work planning. This guide gives small businesses a clear operational checklist for handling maternity leave confidently in 2026/27.',
  path,
  readTime: '11 min read',
  published: '2026-06-27',
  modified: '2026-06-27',
  template: {
    href: '/templates/maternity-leave-planner-uk.txt',
    title: 'Downloadable maternity leave planner',
    description:
      'A simple text checklist for key dates, SMP evidence, KIT days, accrued holiday, and return planning.',
  },
  sections: [
    {
      title: 'Maternity leave entitlement in the UK',
      intro:
        'Eligible employees can take up to 52 weeks of statutory maternity leave. The first 26 weeks are Ordinary Maternity Leave and the second 26 weeks are Additional Maternity Leave. The right to maternity leave applies from day one of employment, but Statutory Maternity Pay has separate qualifying rules.',
      bullets: [
        'Employees do not have to take the full 52 weeks, but they must take at least 2 weeks after birth, or 4 weeks if they work in a factory.',
        'The employee keeps employment rights during maternity leave, including holiday accrual and contractual benefits other than normal pay.',
        'Dismissal, selection for redundancy, or detriment because of pregnancy or maternity leave is a major legal risk.',
      ],
    },
    {
      title: 'Statutory Maternity Pay for 2026/27',
      intro:
        'Statutory Maternity Pay is paid for up to 39 weeks. For the first 6 weeks, SMP is 90% of average weekly earnings. For the next 33 weeks, the 2026/27 weekly rate is GBP 194.32 or 90% of average weekly earnings if that is lower.',
      table: {
        headers: ['SMP period', '2026/27 payment'],
        rows: [
          ['Weeks 1 to 6', '90% of average weekly earnings'],
          ['Weeks 7 to 39', 'GBP 194.32 per week or 90% of earnings if lower'],
          ['Weeks 40 to 52', 'Unpaid statutory maternity leave'],
          ['Payroll treatment', 'Tax and National Insurance apply'],
        ],
      },
      callout: {
        title: 'Payroll reminder',
        body:
          'Keep MATB1 evidence, average weekly earnings calculations, pay dates, and any enhanced maternity pay terms together. This makes payroll checks and HMRC queries easier to answer.',
      },
    },
    {
      title: 'Notice, evidence, and key dates',
      intro:
        'By the end of the 15th week before the expected week of childbirth, the employee should tell you they are pregnant, the expected week of childbirth, and when they want maternity leave to start. They normally provide a MATB1 certificate as evidence of the due date.',
      bullets: [
        'Confirm the maternity leave start date and expected return date in writing.',
        'Diary the 11th week before the expected week of childbirth, because leave can usually start from then.',
        'If the employee is off with a pregnancy-related illness in the 4 weeks before the due week, maternity leave and SMP can start automatically.',
      ],
    },
    {
      title: 'Health and safety duties',
      intro:
        'Once you know an employee is pregnant, has recently given birth, or is breastfeeding, review workplace risks. This matters in offices as well as physical workplaces.',
      subsections: [
        {
          title: 'Risk assessment areas',
          body:
            'Look at lifting, prolonged standing, lone working, travel, night work, exposure to chemicals, stress, workload, and suitable rest facilities. If a risk cannot be removed, consider altered duties, changed hours, or suspension on full pay where required.',
        },
        {
          title: 'Antenatal appointments',
          body:
            'Pregnant employees are entitled to paid time off for antenatal appointments. Partners may have unpaid time off for up to 2 appointments, which connects naturally with your wider paternity leave process.',
        },
      ],
    },
    {
      title: 'Holiday accrual and bank holidays',
      intro:
        'Annual leave continues to accrue during maternity leave. If the employee cannot take holiday because they are on maternity leave, you should normally allow it to be taken before or after maternity leave, or carried forward where needed.',
      links: [
        {
          href: '/blog/annual-leave-entitlement-uk',
          label: 'Annual leave entitlement UK',
        },
        {
          href: '/part-time-worker-leave-entitlement',
          label: 'Part-time and pro-rata holiday entitlement',
        },
      ],
    },
    {
      title: 'KIT days and returning to work',
      intro:
        'Employees can work up to 10 Keeping in Touch days during maternity leave without ending leave or SMP. KIT days must be agreed by both sides and should be documented clearly.',
      bullets: [
        'Agree the work to be done, pay rate, date, and hours before each KIT day.',
        'Plan accrued holiday, phased return requests, breastfeeding arrangements, and any flexible working request early.',
        'If the employee returns after Ordinary Maternity Leave, they normally have the right to the same job. After Additional Maternity Leave, extra rules apply if the same job is not reasonably practicable.',
      ],
    },
    {
      title: 'How Leavely helps',
      intro:
        'Leavely keeps family leave visible without losing privacy. You can track maternity leave dates, related holiday accrual, paternity leave overlap, compassionate leave, and return planning in one place.',
      bullets: [
        'Create maternity leave as a dedicated leave type with manager visibility.',
        'Track return dates and outstanding holiday balances alongside team cover.',
        'Keep an audit trail for requests, approvals, date changes, and notes.',
      ],
    },
  ],
  faqs: [
    {
      question: 'How much is SMP in 2026/27?',
      answer:
        'For 2026/27, SMP is 90% of average weekly earnings for the first 6 weeks, then GBP 194.32 per week or 90% of average weekly earnings if lower for the next 33 weeks.',
    },
    {
      question: 'Does annual leave accrue during maternity leave?',
      answer:
        'Yes. Statutory and contractual holiday continues to accrue during maternity leave, so employers should plan when the employee will take or carry forward unused holiday.',
    },
    {
      question: 'Can an employer refuse maternity leave?',
      answer:
        'No. If the employee gives the required information, statutory maternity leave is a legal right. The employer can clarify dates and evidence, but must not refuse the entitlement.',
    },
  ],
  cta: {
    title: 'Manage maternity leave without spreadsheets',
    body:
      'Track family leave, accrued holiday, return dates, and manager approvals in Leavely. Start a free 14-day trial.',
  },
  related: [
    { href: '/blog/paternity-leave-uk', label: 'Paternity leave UK' },
    { href: '/blog/shared-parental-leave-uk', label: 'Shared parental leave UK' },
    { href: '/blog/compassionate-leave-uk', label: 'Compassionate leave UK' },
    { href: '/uk-hr-compliance-small-business', label: 'UK HR compliance checklist' },
  ],
}

export default function MaternityLeaveUkPage() {
  return <SeoPillarPage {...page} />
}

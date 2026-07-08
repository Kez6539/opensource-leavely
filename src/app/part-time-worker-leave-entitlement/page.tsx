import type { Metadata } from 'next'
import { SeoPillarPage, type PillarPageProps } from '@/components/shared/seo-pillar-page'
import { SITE_URL } from '@/lib/seo'

const path = '/part-time-worker-leave-entitlement'
const pageUrl = `${SITE_URL}${path}`

export const metadata: Metadata = {
  title: 'Part-Time Worker Leave Entitlement UK: Pro-Rata Guide | Leavely',
  description:
    'UK guide to part-time, zero-hours, irregular-hours, and pro-rata holiday entitlement. Includes examples, common mistakes, and links to calculators.',
  alternates: { canonical: pageUrl },
  keywords: [
    'part-time worker leave entitlement',
    'pro-rata holiday entitlement UK',
    'zero-hours holiday entitlement',
    'irregular hours holiday pay',
    'part-time annual leave UK',
  ],
  openGraph: {
    title: 'Part-Time Worker Leave Entitlement UK: Pro-Rata Guide',
    description:
      'Pro-rata holiday, zero-hours contracts, irregular hours, bank holidays, and common UK employer mistakes.',
    url: pageUrl,
    type: 'article',
  },
}

const page: PillarPageProps = {
  badge: 'HR Guide',
  title: 'Part-Time Worker Leave Entitlement UK: Pro-Rata Guide',
  description:
    'Part-time workers are entitled to paid holiday, but the calculation depends on whether they work regular days, fixed hours, zero-hours, irregular hours, or only part of the year. This guide gives UK employers the practical rules and examples.',
  path,
  readTime: '10 min read',
  published: '2026-06-27',
  modified: '2026-06-27',
  template: {
    href: '/templates/pro-rata-leave-checklist-uk.txt',
    title: 'Downloadable pro-rata leave checklist',
    description:
      'A quick checklist for regular part-time, zero-hours, irregular-hours, bank holidays, and rounding decisions.',
  },
  sections: [
    {
      title: 'The statutory minimum',
      intro:
        'Almost all workers are legally entitled to 5.6 weeks of paid holiday each leave year. For a full-time worker on 5 days per week, that is 28 days. For part-time workers, the same 5.6 weeks applies, but it usually converts into fewer days or hours.',
      table: {
        headers: ['Working pattern', 'Minimum leave example'],
        rows: [
          ['5 days per week', '28 days'],
          ['4 days per week', '22.4 days'],
          ['3 days per week', '16.8 days'],
          ['2 days per week', '11.2 days'],
          ['1 day per week', '5.6 days'],
        ],
      },
    },
    {
      title: 'Regular part-time workers',
      intro:
        'For regular days, the usual formula is days worked per week multiplied by 5.6. For regular hours, many employers calculate entitlement in hours because it is fairer when shifts vary in length.',
      bullets: [
        'Do not round entitlement down below the statutory minimum.',
        'Include bank holidays within the statutory total only if your contract or policy says so.',
        'Use hours rather than days when employees work unequal shift lengths.',
      ],
    },
    {
      title: 'Zero-hours and irregular-hours workers',
      intro:
        'Workers with irregular hours or part-year patterns accrue leave based on hours worked in the relevant pay period. For leave years starting on or after 1 April 2024, this is commonly calculated at 12.07% of hours worked, capped at 5.6 weeks.',
      callout: {
        title: 'Retail and education teams',
        body:
          'Part-time and variable-hours calculations are especially important in retail, hospitality, education, care, and seasonal teams where working patterns change frequently.',
      },
      links: [
        { href: '/retail', label: 'Retail staff management software' },
        { href: '/education', label: 'Education staff absence management' },
        { href: '/tools/pro-rata-leave-calculator', label: 'Pro-rata leave calculator' },
      ],
    },
    {
      title: 'Bank holidays for part-time workers',
      intro:
        'Bank holidays do not have to be given as extra paid leave, but part-time workers must not be treated less favourably than comparable full-time workers. Many employers avoid unfairness by giving a pro-rata bank holiday allowance rather than only paying people who happen to work Mondays.',
      bullets: [
        'State clearly whether bank holidays are included in the annual allowance.',
        'Use a consistent pro-rata method for Monday and non-Monday workers.',
        'Track bank holiday deductions in the same units as the employee allowance.',
      ],
    },
    {
      title: 'Common mistakes',
      intro:
        'Most holiday disputes come from inconsistent methods, unclear policies, or spreadsheet drift.',
      bullets: [
        'Using full-time bank holiday rules for part-time workers without pro-rating.',
        'Calculating in days when employees work different shift lengths.',
        'Forgetting that workers continue to accrue holiday during sickness and family leave.',
        'Not keeping records of hours worked for irregular-hours workers.',
      ],
    },
    {
      title: 'How Leavely helps',
      intro:
        "Leavely calculates leave around each person's working pattern, so full-time, part-time, and variable-hours staff are managed in one system.",
      bullets: [
        'Set individual working patterns and allowances.',
        'Track pro-rata balances and approved leave in real time.',
        'Give managers a single calendar for staff cover across different contract types.',
      ],
    },
  ],
  faqs: [
    {
      question: 'How much holiday does a part-time worker get in the UK?',
      answer:
        'Part-time workers get at least 5.6 weeks of paid holiday per year, pro-rated to their working pattern. Someone working 3 days per week receives at least 16.8 days.',
    },
    {
      question: 'Do zero-hours workers get paid holiday?',
      answer:
        'Yes. Zero-hours workers are generally entitled to paid holiday. For irregular-hours workers, entitlement is usually accrued based on hours worked in the pay period.',
    },
    {
      question: 'Can bank holidays be included in part-time holiday entitlement?',
      answer:
        'Yes, if the contract or policy says so. Employers should apply bank holiday rules consistently and avoid treating part-time workers less favourably.',
    },
  ],
  cta: {
    title: 'Calculate pro-rata leave without spreadsheet errors',
    body:
      'Leavely handles part-time, zero-hours, and irregular-hours leave tracking for UK teams. Try it free for 14 days.',
  },
  related: [
    { href: '/blog/annual-leave-entitlement-uk', label: 'Annual leave entitlement UK' },
    { href: '/blog/zero-hour-contract-holiday-uk', label: 'Zero-hour contract holiday entitlement' },
    { href: '/blog/shift-worker-holiday-entitlement-uk', label: 'Shift worker holiday entitlement' },
    { href: '/tools/pro-rata-leave-calculator', label: 'Pro-rata leave calculator' },
  ],
}

export default function PartTimeWorkerLeaveEntitlementPage() {
  return <SeoPillarPage {...page} />
}

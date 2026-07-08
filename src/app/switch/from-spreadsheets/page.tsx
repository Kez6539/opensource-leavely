import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { SwitchPage } from '../switch-page'

const pageUrl = `${SITE_URL}/switch/from-spreadsheets`

export const metadata: Metadata = {
  title: 'Stop Tracking Holiday in a Spreadsheet — Switch to Leavely',
  description:
    'Still tracking annual leave in Excel or Google Sheets? Move your whole team to Leavely in minutes. Upload your spreadsheet, we map the columns and set up balances. Free trial, no card needed.',
  alternates: { canonical: pageUrl },
  keywords: [
    'holiday tracking spreadsheet',
    'replace excel leave tracker',
    'annual leave spreadsheet alternative',
    'google sheets holiday tracker',
    'leave management for small business',
    'import spreadsheet to HR system',
  ],
  openGraph: {
    title: 'Move your team off the spreadsheet — Leavely',
    description:
      'Upload the spreadsheet you already have. Leavely maps the columns, imports everyone, and sets up leave balances for you.',
    url: pageUrl,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} — Switch from a spreadsheet`,
      url: pageUrl,
      description:
        'Move from a holiday spreadsheet to Leavely in minutes with a CSV import.',
      datePublished: '2026-04-06',
      dateModified: '2026-04-06',
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SwitchPage variant="spreadsheet" />
    </>
  )
}

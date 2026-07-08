import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { SwitchPage } from './switch-page'

const pageUrl = `${SITE_URL}/switch`

export const metadata: Metadata = {
  title: 'Switch to Leavely: Import Your Team From a Spreadsheet in Minutes',
  description:
    'Moving from a spreadsheet or another HR tool? Upload the staff list you already have — Leavely maps the columns, imports everyone, and sets up leave balances for you. Free trial, no card needed.',
  alternates: { canonical: pageUrl },
  keywords: [
    'switch HR system',
    'import staff list',
    'CSV import leave management',
    'leave management migration',
    'replace spreadsheet holiday tracker',
    'switch from BrightHR',
  ],
  openGraph: {
    title: 'Switch to Leavely — import your team in minutes',
    description:
      'Upload the staff list you already have. Leavely maps the columns and imports everyone. No re-typing, no card needed to start.',
    url: pageUrl,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} — Switch to Leavely`,
      url: pageUrl,
      description:
        'Import your team from a spreadsheet or another HR tool into Leavely in minutes.',
      datePublished: '2026-04-06',
      dateModified: '2026-04-06',
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SwitchPage variant="default" />
    </>
  )
}

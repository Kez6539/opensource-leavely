import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { SwitchPage } from '../switch-page'

const pageUrl = `${SITE_URL}/switch/from-brighthr`

export const metadata: Metadata = {
  title: 'Switching From BrightHR? Move Your Team to Leavely in Minutes',
  description:
    'Leaving BrightHR? Export your staff list and import it into Leavely — we map the columns and set up leave balances for you. Leave-focused, so you pay only for leave management. Free trial, no card needed.',
  alternates: { canonical: pageUrl },
  keywords: [
    'switch from BrightHR',
    'BrightHR alternative',
    'BrightHR alternative UK',
    'leave management alternative',
    'simpler HR than BrightHR',
    'export from BrightHR',
  ],
  openGraph: {
    title: 'Switching from BrightHR? — Leavely',
    description:
      'Bring your people, balances and bookings across. Export your staff list and import it into Leavely in minutes.',
    url: pageUrl,
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: `${SITE_NAME} — Switch from BrightHR`,
      url: pageUrl,
      description:
        'Move from BrightHR to Leavely in minutes with a CSV import. Leave-focused, not a bundled suite.',
      datePublished: '2026-04-06',
      dateModified: '2026-04-06',
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SwitchPage variant="brighthr" />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Shield, Clock, AlertTriangle, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/fit-note-rules-uk-employer`

export const metadata: Metadata = {
  title: 'Fit Note Rules for UK Employers 2026: Complete Guide',
  description:
    'Fit note rules for UK employers in 2026. When you can ask for one, who can issue it, what to do when an employee is "may be fit for work", and how to record fit notes properly. Includes 2022 changes (nurses, OTs, physios + pharmacists can now sign).',
  alternates: { canonical: pageUrl },
  keywords: [
    'fit note rules UK employer',
    'fit note guidance employer',
    'fit note new rules 2022',
    'when can employer ask for fit note',
    'fit note 7 day rule',
    'fit note self-certification',
    'may be fit for work',
    'fit note recording software',
    'sickness absence record UK',
    'employer fit note obligations',
  ],
  openGraph: {
    title: 'Fit Note Rules for UK Employers 2026',
    description: 'When you can ask for a fit note, the 7-day self-cert rule, the 2022 changes, and how to record them properly.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'When can an employer ask for a fit note in the UK?',
    a: 'For absences of 7 calendar days or fewer (including weekends), employees can self-certify — no fit note needed. From the 8th calendar day onwards, employers can require a fit note from a registered healthcare professional. The 7-day rule includes the day the employee first became unwell.',
  },
  {
    q: 'Who can issue a fit note in 2026?',
    a: 'Since July 2022, fit notes can be issued by GPs, registered nurses, occupational therapists, pharmacists and physiotherapists. Before that change only doctors could sign one. The healthcare professional must record their profession on the form.',
  },
  {
    q: 'What does "may be fit for work" mean on a fit note?',
    a: 'It means the healthcare professional thinks the employee could return to work with adjustments. The fit note will suggest options like a phased return, altered hours, amended duties or workplace adaptations. Employers should consider whether the suggested adjustments are reasonable and feasible.',
  },
  {
    q: 'Can employers reject a fit note?',
    a: 'No. A fit note is a medical opinion and must be accepted at face value. If an employer believes the absence is not genuine they have other routes — Occupational Health referral, capability proceedings — but they cannot simply refuse to accept a fit note from a registered healthcare professional.',
  },
  {
    q: 'How long should employers keep fit notes?',
    a: 'Six years after the end of employment. Fit notes are health records and fall under data protection law — store them securely, restrict access, and delete after the retention period. Leavely stores fit notes against the employee record with role-based access by default.',
  },
  {
    q: 'Can an employee return to work before their fit note expires?',
    a: 'Yes. The fit note states the period the healthcare professional believes the employee will be unfit to work, but the employee can return earlier if they feel better. A new fit note is not required to come back, only to extend the period off.',
  },
  {
    q: 'Do you need a fit note for COVID absences in 2026?',
    a: 'COVID is now treated like any other illness. The standard 7-day self-certification rule applies, and a fit note is required from day 8 onwards if the employee is still unable to work. There are no special COVID-specific rules in 2026.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Fit Note Rules for UK Employers 2026: Complete Guide',
      description: 'When you can ask for a fit note, the 7-day self-cert rule, who can sign one in 2026, and how to record them.',
      url: pageUrl,
      datePublished: '2026-05-15',
      dateModified: '2026-05-15',
      author: { '@type': 'Organization', name: SITE_NAME },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    },
  ],
}

export default function FitNoteRulesPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=fit_note_rules'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-amber-100/40 to-orange-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
                <FileText className="h-4 w-4" />
                UK employer guide
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Fit note rules
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">for UK employers</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                When you can ask for one, who can issue it in 2026, what &ldquo;may be fit for work&rdquo; actually means, and how to record fit notes properly without breaking GDPR. Updated for the post-2022 rules.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl">
                    Track fit notes in Leavely <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sickness-absence-tracker">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">Sickness tracker</Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">14-day free trial. No credit card required.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">The 7-day self-certification rule</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              For sickness absences of <strong className="text-gray-900">7 calendar days or fewer</strong> (including weekends and bank holidays), employees can self-certify. They tell you they&rsquo;re unwell, fill in a self-certification form when they&rsquo;re back, and that&rsquo;s enough. No GP appointment, no fit note.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From the <strong className="text-gray-900">8th calendar day onwards</strong>, you can require a fit note from a registered healthcare professional. Day 1 is the first day the employee was unwell, even if it was a weekend. So if someone calls in sick on a Friday, day 8 is the following Friday.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You cannot ask for a fit note for short absences. You can require a self-certification form. Most employers ask for self-certs on return.
            </p>
          </div>
        </section>

        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Who can sign a fit note in 2026</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Until July 2022 only doctors could issue fit notes. Since the 2022 change, fit notes can also be signed by:
            </p>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex gap-3"><FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" /><span>Registered nurses</span></li>
              <li className="flex gap-3"><FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" /><span>Occupational therapists</span></li>
              <li className="flex gap-3"><FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" /><span>Pharmacists</span></li>
              <li className="flex gap-3"><FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" /><span>Physiotherapists</span></li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              All fit notes (whether on paper or sent digitally) carry the same weight regardless of which profession signed them. The healthcare professional must record their profession on the form, and an employer cannot reject a valid fit note on the basis of who signed it.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">&ldquo;Not fit for work&rdquo; vs &ldquo;may be fit for work&rdquo;</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every fit note has two boxes the healthcare professional ticks:
            </p>
            <div className="space-y-6 mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Not fit for work</h3>
                <p className="text-gray-600">Straightforward. The employee should not be at work for the period stated on the note. Pay SSP or company sick pay according to your policy.</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">May be fit for work</h3>
                <p className="text-gray-600">The healthcare professional thinks the employee could return with adjustments. The note will suggest a phased return, amended hours, altered duties, or workplace adaptations. As employer you must consider whether the suggested adjustments are reasonable and feasible — and have a conversation with the employee about it.</p>
                <p className="text-gray-600 mt-3">If you can&rsquo;t accommodate the adjustments, the fit note functions as a &ldquo;not fit for work&rdquo; note for the duration.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How to record fit notes properly</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Fit notes are health records. Mishandling them creates a GDPR liability and damages employee trust. The standard requirements:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { icon: Shield, title: 'Restricted access', description: 'Only HR and the relevant manager should be able to see fit note contents. Not the whole team.' },
                { icon: BarChart3, title: 'Linked to absence record', description: 'Each fit note should link to the specific absence period it covers, not float on its own.' },
                { icon: Clock, title: '6-year retention', description: 'Keep for 6 years after the end of employment, then delete. Diary the deletion.' },
                { icon: AlertTriangle, title: 'Audit trail', description: 'Log who viewed each fit note and when. Subject access requests need this.' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <f.icon className="h-7 w-7 text-amber-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              Leavely handles all four of these by default — fit notes upload against the employee record, only the employee + their manager + admin can view, retention is configurable, and access is logged in the audit trail.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-lg border border-gray-200 p-5">
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">{faq.q}</summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Track fit notes alongside sickness</h2>
            <p className="text-lg text-gray-500 mb-8">Fit notes, self-certifications, return-to-work forms and Bradford Factor — all in one place. £8 per user per month with a 14-day free trial.</p>
            <Link href={registerUrl}>
              <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

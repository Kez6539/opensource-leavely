import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/gp-surgery-staff-leave-uk`

export const metadata: Metadata = {
  title: "GP Surgery Staff Leave Management UK: A Practice Manager's Guide",
  description:
    'How GP surgeries can manage staff leave across GPs, nurses, receptionists, and practice managers. Covers NHS vs private terms, locum cover, and minimum staffing.',
  alternates: { canonical: articleUrl },
  keywords: [
    'GP surgery staff leave',
    'practice manager leave management',
    'GP practice staff rota',
    'NHS GP surgery HR',
    'GP surgery holiday policy',
    'practice nurse leave',
    'GP locum cover',
  ],
  openGraph: {
    title: "GP Surgery Staff Leave Management UK: A Practice Manager's Guide",
    description: 'How GP surgeries can manage staff leave across clinical and non-clinical roles.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "GP Surgery Staff Leave Management UK: A Practice Manager's Guide",
  description: 'How GP surgeries can manage staff leave across clinical and non-clinical roles.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function GPSurgeryLeaveArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Industry Guide</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            GP Surgery Staff Leave Management UK: A Practice Manager&apos;s Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Managing leave in a GP surgery is uniquely complex. You have GPs, practice nurses, healthcare assistants, phlebotomists, receptionists, and administrative staff, all with different contract terms, different working patterns, and different clinical requirements. When a GP is off, patient appointments disappear. When two receptionists are off on the same day, the front desk cannot function. This guide walks practice managers through the practical realities of leave management in primary care.
            </p>

            <h2>The mix of contract types</h2>
            <p>
              GP surgeries typically have a wider range of employment arrangements than most small businesses:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>GP partners.</strong> Partners are self-employed. They manage their own leave, but it affects surgery capacity. Their absence usually requires locum cover or reduced appointment availability.</li>
              <li><strong>Salaried GPs.</strong> Employed by the practice. Standard annual leave entitlement applies, often enhanced (many salaried GP contracts offer 30 days plus bank holidays plus study leave).</li>
              <li><strong>Practice nurses.</strong> Employed staff with standard entitlements. Often work part time across multiple days, making pro rata calculations important.</li>
              <li><strong>Healthcare assistants (HCAs).</strong> Employed, typically on standard NHS or practice terms.</li>
              <li><strong>Receptionists and admin.</strong> Employed, usually the largest group by headcount but often part time.</li>
              <li><strong>PCN (Primary Care Network) staff.</strong> Pharmacists, physiotherapists, social prescribers, and mental health practitioners who may be employed by the PCN rather than the practice, but work on your premises.</li>
            </ul>
            <p>Each group may have different leave entitlements, notice periods, and approval processes. This complexity is what makes leave management in GP surgeries so challenging.</p>

            <h2>NHS terms vs practice contracts</h2>
            <p>
              Some GP surgery staff are employed on NHS Agenda for Change (AfC) terms, while others are on practice specific contracts. The difference matters for leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>AfC terms</strong> offer 27 days annual leave (rising to 29 after 5 years and 33 after 10 years) plus 8 bank holidays. Total: 35 to 41 days per year.</li>
              <li><strong>Practice contracts</strong> can offer any entitlement at or above the statutory minimum of 28 days (including bank holidays).</li>
            </ul>
            <p>If your practice has a mix of AfC and non-AfC staff, you need to track different entitlement levels for different people. A receptionist on AfC terms may have 35 days while a receptionist on a practice contract has 28. This is legal, but it can cause friction if not handled transparently.</p>

            <h2>Minimum cover requirements</h2>
            <p>
              Patient safety means you cannot let staffing drop below certain levels. As a practice manager, you should define minimum cover for each role:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>GPs:</strong> How many GPs must be available per session (morning/afternoon)? Most practices need at least one GP per session as an absolute minimum, with a target of two for normal operations.</li>
              <li><strong>Nurses:</strong> If you run nurse clinics (chronic disease reviews, immunisations, cervical screening), you need the qualified nurse present. These clinics must be cancelled or rescheduled if the nurse is unavailable.</li>
              <li><strong>Reception:</strong> At least one receptionist (ideally two) during all opening hours. Phone lines, check-ins, and prescription queries cannot be left unattended.</li>
              <li><strong>Dispensary</strong> (if applicable): A qualified dispensary assistant must be present during all dispensing hours.</li>
            </ul>

            <h2>Planning for locum cover</h2>
            <p>
              When a GP takes leave, the standard approach is to book a locum. Locum GPs are expensive (typically £800 to £1,200 per day depending on the area and notice period) and good ones are booked weeks or months in advance.
            </p>
            <p>Best practice for locum planning:</p>
            <ol className="list-decimal pl-6">
              <li><strong>Request GP leave 8 to 12 weeks in advance.</strong> This gives you time to source and book a locum.</li>
              <li><strong>Build a locum pool.</strong> Keep a list of locums who have worked at your practice before and know your systems. They can hit the ground running.</li>
              <li><strong>Consider reducing appointments instead.</strong> For short absences (one or two days), it may be more cost effective to reduce appointment slots across remaining GPs rather than paying for a locum.</li>
              <li><strong>Budget for locum costs.</strong> Factor locum cover into your annual GP leave budget. If each partner takes 6 weeks off per year, that is 30 locum days to cover.</li>
            </ol>

            <h2>Study leave and CPD</h2>
            <p>
              All clinical staff have Continuing Professional Development (CPD) requirements. GPs need to maintain their appraisal and revalidation portfolio. Nurses need to meet NMC revalidation standards. This creates additional leave requirements beyond standard annual leave.
            </p>
            <p>Typical arrangements:</p>
            <ul className="list-disc pl-6">
              <li><strong>Salaried GPs:</strong> 10 days per year of paid study leave (standard in most BMA model contracts).</li>
              <li><strong>Practice nurses:</strong> 3 to 5 days per year, though this varies widely between practices.</li>
              <li><strong>HCAs and admin:</strong> Training is usually arranged internally, during working hours, rather than as study leave.</li>
            </ul>
            <p>Track study leave separately from annual leave. Staff should not feel they are &quot;using up&quot; their holiday for mandatory professional development.</p>

            <h2>School holiday pressure</h2>
            <p>
              Like any small workplace, GP surgeries face school holiday pressure. Receptionists with children all want half term off. Nurses want the summer holidays. The difference in healthcare is that you cannot simply reduce capacity. Patients do not stop getting ill in August.
            </p>
            <p>Use a rotation system: allocate school holiday weeks fairly across staff each year, and publish the allocation early so there are no surprises. Document the rotation so you can prove fairness if challenged.</p>

            <h2>Managing sickness absence in primary care</h2>
            <p>
              Short notice sickness causes real problems in a GP surgery. If a receptionist calls in sick at 7:30am and the surgery opens at 8am, you have 30 minutes to find cover. Some practices use a bank of trained volunteers or retired staff who can step in at short notice.
            </p>
            <p>For clinical staff, sickness absence is even more disruptive. A sick GP means cancelled appointments and potential patient safety risks if the remaining GPs are overloaded. Track absence carefully, conduct return to work interviews, and have a clear escalation process for repeated short term absence.</p>

            <h2>How Leavely helps GP surgeries</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is built for small UK teams with complex staffing needs. Here is how it helps GP surgeries:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Department filtering.</strong> View leave by role (GPs, nurses, reception, admin) so you can check cover for each group separately before approving requests.</li>
              <li><strong>Clash detection.</strong> The system warns you if approving a leave request would drop a department below minimum staffing. Set different thresholds for each role.</li>
              <li><strong>Multiple leave types.</strong> Track annual leave, study leave, sick leave, and TOIL separately with clear balances for each.</li>
              <li><strong>Different entitlements.</strong> Handle AfC and non-AfC staff in the same system with different allowance levels.</li>
              <li><strong>Calendar view.</strong> A colour coded calendar shows who is in and who is off at a glance, which is invaluable when patients phone asking for appointments.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Leave management built for GP surgeries</h3>
            <p className="text-emerald-100 mb-6">Leavely handles the complexity of primary care staffing with department filtering, clash detection, and multiple leave types.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/leave-clash-detection-software" className="block text-emerald-600 hover:underline font-medium">Leave Clash Detection: How to Prevent Understaffing &rarr;</Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Obligations &rarr;</Link>
              <Link href="/blog/study-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Study Leave UK: Employer Guide to Time Off for Training &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

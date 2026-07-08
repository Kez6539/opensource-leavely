import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/night-shift-workers-rights-uk`

export const metadata: Metadata = {
  title: 'Night Shift Workers\' Rights UK: Breaks, Holiday & Health (2026)',
  description:
    'Complete guide to night shift workers\' rights in the UK. Covers Working Time Regulations 1998, 8-hour maximum shifts, mandatory health assessments, rest breaks, holiday entitlement, pregnancy protections, and record-keeping.',
  alternates: { canonical: articleUrl },
  keywords: [
    'night shift workers rights UK',
    'night worker rest breaks',
    'night shift health assessment',
    'night shift holiday entitlement',
    'working time regulations night work',
    'night shift maximum hours UK',
  ],
  openGraph: {
    title: 'Night Shift Workers\' Rights UK — Rest Breaks, Holiday & Health Assessments',
    description:
      'Working Time Regulations 1998, 8-hour limits, mandatory health assessments, rest breaks, holiday entitlement, and protections for night workers explained.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Night Shift Workers\' Rights UK: Rest Breaks, Holiday & Health Assessments',
  description: 'A comprehensive guide to night shift workers\' rights in the UK, covering the Working Time Regulations 1998, maximum shift lengths, mandatory health assessments, rest breaks, holiday entitlement, pregnancy protections, young worker rules, and record-keeping requirements.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function NightShiftWorkersRightsArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Employment Law</span>
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Night Shift Workers&apos; Rights UK: Rest Breaks, Holiday &amp; Health Assessments
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Around 3.5 million people in the UK regularly work night shifts &mdash; in healthcare, logistics, manufacturing, hospitality, and emergency services. Night work carries specific health risks that daytime work does not, and the law reflects this by granting night workers a distinct set of protections. Yet many employers are unaware of the full scope of their obligations, and many night workers do not know their rights. This guide covers everything employers and employees need to know about night shift workers&apos; rights in the UK for 2026, from maximum shift lengths and mandatory health assessments to rest breaks, holiday entitlement, and record-keeping.
            </p>

            <h2>What counts as &quot;night work&quot; under UK law?</h2>
            <p>
              The <strong>Working Time Regulations 1998</strong> (WTR) define &quot;night time&quot; as any period of not less than seven hours that includes the hours between <strong>11pm and 6am</strong>. The default night time period is 11pm to 6am, but employers and workers can agree a different seven-hour window &mdash; provided it always includes the midnight-to-5am core.
            </p>
            <p>
              A <strong>night worker</strong> is someone who, as a normal course, works at least three hours of their daily working time during night time. &quot;As a normal course&quot; does not mean every single shift must be at night &mdash; the regulations apply to anyone whose pattern means they regularly work during night hours. ACAS guidance confirms that working night shifts on a rotating basis (for example, one week of nights every three weeks) is enough to qualify as a night worker.
            </p>
            <p>
              This definition matters because specific protections &mdash; including the 8-hour limit, health assessments, and enhanced record-keeping &mdash; only apply to workers who meet the &quot;night worker&quot; threshold. An employee who occasionally covers a late shift but does not regularly work during the 11pm&ndash;6am window is not a night worker for the purposes of the WTR.
            </p>

            <h2>The 8-hour maximum night shift length</h2>
            <p>
              Under Regulation 6 of the WTR, a night worker&apos;s normal hours of work must not exceed an average of <strong>8 hours in each 24-hour period</strong>. This is calculated over a reference period of 17 weeks by default, though a collective or workforce agreement can extend this to up to 52 weeks.
            </p>
            <p>
              There are important nuances to this limit:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Average, not absolute:</strong> The 8-hour limit is an average over the reference period. A worker can do a 10-hour night shift occasionally, provided their average across the 17-week (or agreed) reference period stays at or below 8 hours per 24 hours.</li>
              <li><strong>Special hazards or heavy strain:</strong> If the night work involves special hazards or heavy physical or mental strain (as identified by a risk assessment, collective agreement, or workforce agreement), the 8-hour limit becomes an <strong>absolute maximum per shift</strong>, not an average. This applies in many manufacturing, healthcare, and transport settings.</li>
              <li><strong>Includes overtime:</strong> &quot;Normal hours&quot; includes regular overtime that the worker is obliged to work under their contract. Voluntary overtime does not count towards the average, but compulsory overtime does.</li>
            </ul>
            <p>
              Employers who consistently roster night workers for 12-hour shifts need to check whether the average over the reference period remains compliant. In sectors where 12-hour nights are standard (such as nursing or security), this often works because workers have sufficient rest days between shifts to bring the average down. However, if the work involves special hazards, the absolute 8-hour cap per shift applies regardless of the average.
            </p>

            <h2>Mandatory free health assessments</h2>
            <p>
              One of the most distinctive protections for night workers is the right to a <strong>free health assessment</strong> before starting night work and at regular intervals thereafter &mdash; typically annually. This obligation is set out in Regulation 7 of the WTR and cannot be waived by agreement.
            </p>
            <p>
              The assessment is designed to identify health conditions that may be caused or worsened by night work, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Sleep disorders and chronic fatigue</li>
              <li>Cardiovascular problems (night work is linked to increased heart disease risk)</li>
              <li>Gastrointestinal issues (disrupted eating patterns)</li>
              <li>Mental health conditions, including depression and anxiety</li>
              <li>Diabetes management difficulties (irregular meal and medication schedules)</li>
            </ul>
            <p>
              The assessment does not have to be a full medical examination. Many employers use a <strong>two-stage process</strong>: first, the worker completes a health questionnaire; second, if the questionnaire reveals potential issues, the worker is referred to a qualified health professional for a more detailed assessment. The HSE provides a template questionnaire that employers can use.
            </p>
            <p>
              If a health assessment reveals that a night worker is suffering from health problems connected to night work, the employer must, where possible, <strong>transfer the worker to suitable daytime work</strong>. This is a statutory obligation, not a discretion. The transfer should be to work that is at the same rate of pay and with comparable terms, where such work is available.
            </p>
            <p>
              <strong>Key employer obligations:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>Offer the assessment before the worker starts night work (or as soon as reasonably practicable)</li>
              <li>Repeat the assessment at regular intervals (annually is the accepted standard)</li>
              <li>The assessment must be free of charge to the worker</li>
              <li>Keep records of assessments offered and completed</li>
              <li>Act on the results &mdash; transfer to day work if health problems are identified</li>
            </ul>

            <h2>Rest breaks for night workers</h2>
            <p>
              Night workers are entitled to the same statutory rest breaks as all workers under the WTR, but the practical application of these rights during night shifts requires careful attention.
            </p>

            <h3>In-shift rest break: 20 minutes per 6 hours</h3>
            <p>
              Under Regulation 12, any worker whose daily working time exceeds <strong>6 hours</strong> is entitled to an uninterrupted rest break of at least <strong>20 minutes</strong>. The break must be taken during the shift, not at the start or end of it. The worker is entitled to spend it away from their workstation.
            </p>
            <p>
              For a typical 8-hour night shift, this means at least one 20-minute break. For a 12-hour night shift, the statutory minimum is still 20 minutes (the regulation triggers at 6 hours, not per every additional 6 hours), though most employers provide longer or more frequent breaks for longer shifts as a matter of good practice and duty of care.
            </p>

            <h3>Daily rest: 11 hours between shifts</h3>
            <p>
              Under Regulation 10, workers are entitled to an uninterrupted rest period of at least <strong>11 consecutive hours</strong> between finishing one shift and starting the next. For night workers, this is particularly important when transitioning between night and day shifts in a rotating pattern.
            </p>
            <p>
              For example, if a worker finishes a night shift at 6am, they should not be expected to start a day shift before 5pm the same day. Employers who schedule shift changeovers without respecting the 11-hour gap are in breach of the regulations.
            </p>

            <h3>Weekly rest: 24 hours per 7 days</h3>
            <p>
              Workers are also entitled to an uninterrupted rest period of at least <strong>24 hours in each 7-day period</strong> (Regulation 11), or alternatively 48 hours in each 14-day period. Night workers on rotating patterns must have their rotas designed to accommodate this requirement.
            </p>

            <h3>Compensatory rest</h3>
            <p>
              The WTR recognise that some workers cannot take their rest breaks at the normal time due to the nature of their work. Where a night worker is unable to take their full daily or weekly rest &mdash; for example, because they are a security guard who cannot leave their post, or a care worker attending to an emergency &mdash; the employer must provide <strong>equivalent compensatory rest</strong> as soon as possible.
            </p>
            <p>
              Compensatory rest must be genuinely equivalent in duration. If a worker misses their 11-hour daily rest period, they should receive 11 hours of additional rest at the next available opportunity. This is not the same as overtime pay or a day off in lieu &mdash; it must be actual rest time. Employers should document when compensatory rest is provided and the reason the original rest was missed.
            </p>

            <h2>Holiday entitlement for night shift workers</h2>
            <p>
              Night shift workers are entitled to the same <strong>5.6 weeks</strong> of paid annual leave as any other worker. However, calculating and managing holiday for night workers raises practical questions that employers need to address clearly.
            </p>

            <h3>Which &quot;day&quot; counts when shifts straddle midnight?</h3>
            <p>
              A night shift typically crosses midnight, spanning two calendar dates. If a worker&apos;s shift runs from 10pm on Wednesday to 6am on Thursday, which day do they book off? The WTR do not prescribe a specific answer. Most employers adopt one of two conventions:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Start-date convention:</strong> The shift is treated as belonging to the day it starts. A Wednesday-night shift (10pm Wednesday to 6am Thursday) is booked as &quot;Wednesday.&quot; This is the most common approach and the simplest for workers to understand.</li>
              <li><strong>Majority-hours convention:</strong> The shift belongs to the day where most hours fall. A 10pm&ndash;6am shift has 2 hours on the start date and 6 hours on the end date, so it would be treated as &quot;Thursday.&quot;</li>
            </ul>
            <p>
              Either approach is legally acceptable, but the employer <strong>must be consistent</strong> and communicate the policy to all staff. Problems arise when different managers use different conventions, or when the policy is not documented. Workers need to know which date to select in the leave system to be absent from a particular night shift.
            </p>

            <h3>Hours-based tracking for night workers</h3>
            <p>
              For night workers, an hours-based leave system is generally fairer and more accurate than a days-based system. When leave is tracked in hours, the worker&apos;s entitlement is calculated as their average weekly hours multiplied by 5.6. Each time they take leave, the actual hours of the missed shift are deducted from their balance &mdash; eliminating the ambiguity of what constitutes a &quot;day.&quot;
            </p>
            <p>
              For example, a permanent night worker doing 4 &times; 10-hour shifts per week (40 hours) would have an annual holiday entitlement of 40 &times; 5.6 = <strong>224 hours</strong>. Each night off costs 10 hours from the balance, giving them 22.4 nights of leave per year.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Weekly hours</th>
                  <th>Holiday (hours)</th>
                  <th>Holiday (shifts)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>5 &times; 8-hour nights</td>
                  <td>40</td>
                  <td>224</td>
                  <td>28 shifts</td>
                </tr>
                <tr>
                  <td>4 &times; 10-hour nights</td>
                  <td>40</td>
                  <td>224</td>
                  <td>22.4 shifts</td>
                </tr>
                <tr>
                  <td>3 &times; 12-hour nights</td>
                  <td>36</td>
                  <td>201.6</td>
                  <td>16.8 shifts</td>
                </tr>
                <tr>
                  <td>4 &times; 12-hour nights</td>
                  <td>48</td>
                  <td>268.8</td>
                  <td>22.4 shifts</td>
                </tr>
              </tbody>
            </table>

            <h2>Special protections for young workers on night shifts</h2>
            <p>
              Workers aged 16 and 17 (&quot;young workers&quot; under the WTR) have significantly stricter protections around night work. Under Regulation 6A, young workers <strong>must not work during the restricted period</strong>, which runs from <strong>10pm to 6am</strong> (or 11pm to 7am if the contract provides for work after 10pm).
            </p>
            <p>
              There are very limited exceptions &mdash; young workers may work at night in specific industries (such as hospitals, hotels, or bakeries) where the work cannot be performed by adult workers, the training requires night work, and there is no adverse effect on the young worker&apos;s health and safety. Even where an exception applies, the young worker must be supervised by an adult and must be given a compensatory rest period of the same duration as the night work.
            </p>
            <p>
              Young workers are also entitled to enhanced rest breaks compared to adult workers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>30-minute rest break</strong> after 4.5 hours of work (compared to 20 minutes after 6 hours for adults)</li>
              <li><strong>12 hours of rest</strong> between shifts (compared to 11 hours for adults)</li>
              <li><strong>48 hours of uninterrupted weekly rest</strong> (compared to 24 hours for adults)</li>
            </ul>
            <p>
              Employers with apprentices or young staff should review their rota practices carefully to ensure compliance. The penalties for breaching young worker protections can be severe, and the restrictions cannot be opted out of.
            </p>

            <h2>Night work and pregnancy</h2>
            <p>
              Pregnant workers and new mothers who work night shifts have additional protections under the <strong>Management of Health and Safety at Work Regulations 1999</strong> and the WTR. If a medical practitioner or registered midwife provides a certificate stating that night work could affect the health or safety of a pregnant worker or new mother, the employer must take specific steps:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Offer suitable alternative daytime work</strong> on the same terms and conditions (including pay) as the night work.</li>
              <li>If no suitable alternative work is available, <strong>suspend the worker on full pay</strong> for as long as necessary to protect her health and safety.</li>
            </ol>
            <p>
              This is a mandatory obligation. The employer cannot simply require the pregnant worker to continue night shifts, nor can they reduce her pay because she has been moved to daytime work. Failure to comply is both a health and safety offence and a potential pregnancy discrimination claim under the Equality Act 2010.
            </p>
            <p>
              Employers should proactively conduct a <strong>night work risk assessment</strong> for pregnant employees and new mothers, considering factors such as fatigue, disrupted sleep, access to food and rest facilities during night shifts, and the physical demands of the role. The risk assessment should be reviewed as the pregnancy progresses, as risks may change at different stages.
            </p>

            <h2>Opting out of night work limits</h2>
            <p>
              The WTR allow workers to opt out of the <strong>48-hour weekly working time limit</strong> by signing an individual written agreement. This opt-out is well known and widely used. However, the rules for night work limits are different and more restrictive.
            </p>
            <p>
              <strong>The 8-hour average night work limit cannot be opted out of individually.</strong> Unlike the 48-hour weekly limit, there is no provision for individual opt-out from the night work restrictions. The only way to modify the 8-hour average is through a <strong>collective agreement</strong> (with a recognised trade union) or a <strong>workforce agreement</strong> (with elected workforce representatives). These agreements can extend the reference period for calculating the average but cannot remove the limit entirely.
            </p>
            <p>
              This is a point many employers get wrong. It is not uncommon to see employment contracts that include a general &quot;opt-out&quot; clause covering both the 48-hour weekly limit and the night work limit. Such clauses are ineffective for night work &mdash; the 8-hour average limit remains enforceable regardless of what the contract says.
            </p>
            <p>
              Workers who have opted out of the 48-hour weekly limit are still subject to the 8-hour night work average. The two limits operate independently.
            </p>

            <h2>Common employer mistakes with night shift workers</h2>
            <p>
              Based on the patterns we see across UK businesses, these are the most frequent errors when managing night shift workers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Not offering health assessments:</strong> Many employers are simply unaware of the obligation to provide free health assessments before night work begins and annually thereafter. This is one of the most commonly breached provisions of the WTR.</li>
              <li><strong>Assuming 12-hour night shifts are always legal:</strong> While 12-hour shifts can be compliant if the 17-week average stays below 8 hours per 24 hours, this fails immediately if the work involves special hazards &mdash; where the absolute 8-hour cap per shift applies.</li>
              <li><strong>Ignoring compensatory rest:</strong> When night workers miss their daily or weekly rest due to operational demands, employers often fail to provide equivalent compensatory rest, treating the situation as normal overtime instead.</li>
              <li><strong>No clear policy on which &quot;day&quot; a night shift belongs to:</strong> This creates confusion for leave booking, payroll, and absence records. Establish a consistent convention and communicate it.</li>
              <li><strong>Believing workers can individually opt out of the 8-hour night limit:</strong> Only collective or workforce agreements can modify the night work reference period. Individual opt-outs do not apply.</li>
              <li><strong>Failing to adjust rotas for pregnant night workers:</strong> Once a medical certificate is provided, the employer must offer daytime work or suspend on full pay. Delay or refusal risks discrimination claims.</li>
              <li><strong>Not including night shift premiums in holiday pay:</strong> If workers regularly receive a night shift premium, this must be included in their holiday pay calculation using the 52-week reference period. Paying only the basic rate during holidays underpays the worker.</li>
              <li><strong>Poor record-keeping:</strong> Employers must keep records showing that night work limits are being complied with. Failure to maintain adequate records is itself a breach of the regulations.</li>
            </ul>

            <h2>Record-keeping requirements</h2>
            <p>
              Regulation 9 of the WTR requires employers to keep records that are <strong>adequate to show</strong> that the night work limits are being observed. These records must be maintained for at least <strong>two years</strong> from the date they were made.
            </p>
            <p>
              While the regulations do not prescribe a specific format, employers should at minimum record:
            </p>
            <ul className="list-disc pl-6">
              <li>The start and end time of each night shift for every night worker</li>
              <li>The total hours worked per 24-hour period, calculated over the reference period</li>
              <li>Health assessments offered, accepted, and completed (with dates)</li>
              <li>Any transfers to daytime work following a health assessment</li>
              <li>Compensatory rest provided (with dates and reasons)</li>
              <li>Any applicable collective or workforce agreements modifying the reference period</li>
            </ul>
            <p>
              The Health and Safety Executive (HSE) and local authority enforcement officers have the power to inspect these records. If an employer cannot demonstrate compliance through their records, they may face an <strong>improvement notice</strong> or <strong>prohibition notice</strong>. In serious cases, criminal prosecution is possible, with fines of up to &pound;20,000 per offence in the magistrates&apos; court and unlimited fines in the Crown Court.
            </p>
            <p>
              Keeping manual records on spreadsheets is error-prone, especially for organisations with large numbers of night workers. A dedicated system that automatically logs shift times, calculates averages, and flags potential breaches is significantly more reliable and defensible.
            </p>

            <h2>How Leavely tracks night shift patterns and leave</h2>
            <p>
              Managing night shift workers&apos; leave with spreadsheets or generic HR software almost always leads to errors &mdash; particularly around straddling shifts, premium pay calculations, and rest break compliance. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is built to handle the complexity of night shift leave management automatically:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Hours-based leave tracking:</strong> Configure each night worker&apos;s shift pattern and Leavely calculates their statutory entitlement in hours. When leave is booked, the actual shift hours are deducted &mdash; no ambiguity about what counts as a &quot;day.&quot;</li>
              <li><strong>Night shift date convention:</strong> Set your policy (start-date or majority-hours) once, and Leavely applies it consistently across all bookings. Workers see exactly which shifts they are booking off.</li>
              <li><strong>Rotating pattern support:</strong> Define multi-week rotating patterns that include day shifts, night shifts, and rest days. Leavely calculates average hours and entitlements accurately across the full rotation cycle.</li>
              <li><strong>Night premium tracking:</strong> When night shift workers take leave, Leavely ensures their leave records reflect the correct shift type &mdash; making it easy for payroll to include night premiums in holiday pay calculations.</li>
              <li><strong>Health assessment reminders:</strong> Set up annual health assessment due dates for night workers and receive notifications when assessments are approaching or overdue.</li>
              <li><strong>Compliance reporting:</strong> Generate reports showing leave balances, shift patterns, and accrual calculations &mdash; giving you an auditable record that demonstrates WTR compliance.</li>
            </ul>
            <p>
              Whether you have a handful of night workers or hundreds across multiple sites, getting night shift leave right protects your business from underpayment claims and regulatory action. Leavely takes the manual calculation out of the equation and gives both managers and employees confidence that balances are always accurate and legally compliant.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage night shift leave with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely handles hours-based accrual, straddling shifts, and rotating night patterns automatically &mdash; so every balance is always right.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">
                Working Time Regulations UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/shift-worker-holiday-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Shift Worker Holiday Entitlement UK: How to Calculate Leave for Irregular Hours &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: Complete Guide for Employers &rarr;
              </Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">
                Sick Leave Policy UK: What Employers Must Know &rarr;
              </Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">
                Flexible Working UK: The Right to Request &amp; Employer Obligations &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/employee-handbook-uk`

export const metadata: Metadata = {
  title: 'Employee Handbook UK: What to Include (2026 Template Guide)',
  description:
    'Complete guide to creating an employee handbook for UK businesses. Covers legally required policies, recommended sections, a section-by-section template, common mistakes, and how to keep your handbook up to date.',
  alternates: { canonical: articleUrl },
  keywords: [
    'employee handbook UK',
    'employee handbook template UK',
    'staff handbook UK',
    'what to include employee handbook',
    'company handbook UK',
    'HR handbook template',
  ],
  openGraph: {
    title: 'Employee Handbook UK: What to Include (2026 Template Guide)',
    description: 'Everything you need to include in your UK employee handbook, with a section-by-section template and practical advice.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Employee Handbook UK: What to Include (2026 Template Guide)',
  description: 'Complete guide to creating an employee handbook for UK businesses with a section-by-section template.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function EmployeeHandbookUKArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">HR Guide</span>
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Employee Handbook UK: What to Include (2026 Template Guide)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              An employee handbook is one of the most important documents your business will ever produce. It sets expectations, communicates policies, protects you legally, and gives every employee a single place to find answers to their workplace questions. Yet most UK small businesses either don&apos;t have one, or have one that&apos;s gathering dust in a drawer &mdash; outdated, incomplete, and ignored. This guide walks you through exactly what to include in your employee handbook, with a section-by-section template you can follow, common pitfalls to avoid, and practical advice on keeping it current.
            </p>

            <h2>Why every UK business needs an employee handbook</h2>
            <p>
              There is no legal requirement for UK employers to produce an employee handbook. You won&apos;t be fined for not having one. But that doesn&apos;t mean it&apos;s optional in practice. Here&apos;s why:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Clarity for employees</strong> &mdash; a handbook answers the questions that come up every week: how do I book annual leave? What happens if I&apos;m sick? Can I work from home? Without a handbook, managers answer these questions inconsistently, creating confusion and resentment.</li>
              <li><strong>Legal protection</strong> &mdash; if an employee brings a tribunal claim, one of the first things a judge will ask is whether you had clear, documented policies. A well-written handbook demonstrates that expectations were communicated. Without one, it&apos;s your word against theirs.</li>
              <li><strong>Consistency</strong> &mdash; when policies live in people&apos;s heads rather than on paper, they get applied differently depending on who&apos;s asking and who&apos;s answering. A handbook ensures every employee is treated the same way.</li>
              <li><strong>Onboarding</strong> &mdash; handing new starters a handbook on day one gives them a reference point for everything they need to know. It reduces the number of basic questions hitting managers and HR in the first few weeks.</li>
              <li><strong>Culture</strong> &mdash; your handbook communicates who you are as an employer. The tone, the policies you choose to include, and how you describe them all signal your values and expectations.</li>
            </ul>
            <p>
              In short, while the law doesn&apos;t mandate a handbook, good business practice does. Every company with more than a handful of employees should have one.
            </p>

            <h2>Legally required policies</h2>
            <p>
              Although the handbook itself isn&apos;t a legal requirement, certain policies <strong>are</strong> required by UK law. If you have a handbook, these must be in it. If you don&apos;t, you still need to communicate them separately.
            </p>

            <h3>Health and safety policy</h3>
            <p>
              If you employ five or more people, you must have a written health and safety policy. This should cover your general approach to health and safety, the responsibilities of managers and employees, and the practical arrangements (fire procedures, first aiders, risk assessments, accident reporting). Even if you have fewer than five employees, it&apos;s good practice to include health and safety information in your handbook.
            </p>

            <h3>Disciplinary and dismissal procedures</h3>
            <p>
              Under the Employment Rights Act 1996, you must provide employees with details of your disciplinary rules and procedures as part of their written statement of terms. While you can reference a separate document, including the full procedure in the handbook is the most practical approach. Your disciplinary procedure should follow the Acas Code of Practice, covering investigation, notification, the right to be accompanied, the hearing, possible outcomes, and the appeal process.
            </p>

            <h3>Grievance procedure</h3>
            <p>
              Similarly, you must inform employees of the person they should raise a grievance with and how the process works. The Acas Code of Practice on disciplinary and grievance procedures is the benchmark &mdash; failing to follow it can result in tribunal awards being increased by up to 25%.
            </p>

            <h3>Whistleblowing (public interest disclosure)</h3>
            <p>
              While not strictly required in all cases, the Public Interest Disclosure Act 1998 protects employees who report wrongdoing. Having a clear whistleblowing policy in your handbook demonstrates that you take concerns seriously and provides a safe route for reporting. Organisations in regulated sectors (financial services, healthcare) are typically required to have formal whistleblowing procedures.
            </p>

            <h2>Recommended policies to include</h2>
            <p>
              Beyond the legal minimums, there are policies that any well-run UK business should include in their handbook. These aren&apos;t legally mandated, but omitting them creates confusion and risk.
            </p>

            <h3>Leave and absence policies</h3>
            <p>
              This is one of the most-referenced sections of any handbook. Cover <Link href="/blog/leave-policy-template-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement</Link>, how to request time off, notice requirements, and any restrictions on when leave can be taken (e.g. blackout periods). Also include your <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sickness absence policy</Link> &mdash; how to report sickness, when a fit note is required, your approach to return-to-work interviews, and any occupational sick pay you offer above SSP. You should also address other leave types: maternity, paternity, shared parental, compassionate, unpaid leave, and <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">flexible working requests</Link>.
            </p>

            <h3>Flexible and remote working</h3>
            <p>
              Since the Employment Relations (Flexible Working) Act 2023, all employees have the right to request flexible working from day one. Your handbook should explain how to make a request, how decisions are made, the timescale for a response, and your general approach to hybrid or remote working. Be specific about expectations for remote workers: core hours, communication norms, equipment, and data security.
            </p>

            <h3>Expenses policy</h3>
            <p>
              What expenses can employees claim? What evidence is needed? What&apos;s the approval process and turnaround time for reimbursement? Mileage rates, hotel limits, meal allowances &mdash; spell it all out. Vague expenses policies lead to either overspending or employees not claiming legitimate costs because they&apos;re unsure what&apos;s allowed.
            </p>

            <h3>Social media and communications policy</h3>
            <p>
              Define what&apos;s acceptable when it comes to personal use of social media during work hours, posting about the company online, and using company devices for personal purposes. This is increasingly important &mdash; a careless social media post by an employee can create significant reputational damage. Be clear about what constitutes a disciplinary matter without being overly restrictive.
            </p>

            <h3>Dress code</h3>
            <p>
              Whether your workplace is suits-and-ties or jeans-and-trainers, put it in writing. Include guidance on client-facing days versus internal days if applicable. Be careful to ensure your dress code doesn&apos;t indirectly discriminate on grounds of religion, gender, or disability.
            </p>

            <h3>Data protection and GDPR</h3>
            <p>
              Your handbook should explain how the company handles employee personal data, their rights under UK GDPR, and their obligations when handling company or customer data. Cover password policies, device security, data breach reporting, and the consequences of mishandling confidential information.
            </p>

            <h3>Equal opportunities and anti-discrimination</h3>
            <p>
              State your commitment to equality and explain what constitutes unlawful discrimination, harassment, and victimisation under the Equality Act 2010. Include examples of unacceptable behaviour and explain how to report concerns. This policy protects both your employees and your business.
            </p>

            <h3>Anti-bribery and corruption</h3>
            <p>
              The Bribery Act 2010 makes it an offence for UK companies to fail to prevent bribery. Having a clear policy on gifts, hospitality, and facilitation payments is an essential part of demonstrating &quot;adequate procedures.&quot;
            </p>

            <h2>Section-by-section template</h2>
            <p>
              Here&apos;s a practical template showing what to include in each section of your employee handbook. Adapt it to your business &mdash; not every section will apply to every organisation.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Section</th>
                  <th>What to include</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Welcome &amp; introduction</strong></td>
                  <td>CEO/founder welcome message, company history, mission and values, handbook purpose and how to use it</td>
                </tr>
                <tr>
                  <td><strong>2. Employment basics</strong></td>
                  <td>Probation periods, hours of work, timekeeping, attendance expectations, notice periods</td>
                </tr>
                <tr>
                  <td><strong>3. Pay &amp; benefits</strong></td>
                  <td>Pay dates, payslips, pension auto-enrolment, bonuses, salary reviews, other benefits (cycle to work, health insurance, etc.)</td>
                </tr>
                <tr>
                  <td><strong>4. Leave &amp; absence</strong></td>
                  <td>Annual leave entitlement, booking process, sickness absence, maternity/paternity/shared parental leave, compassionate leave, unpaid leave, jury service, time off for dependants</td>
                </tr>
                <tr>
                  <td><strong>5. Flexible working</strong></td>
                  <td>Right to request, application process, remote/hybrid working expectations, core hours</td>
                </tr>
                <tr>
                  <td><strong>6. Conduct &amp; behaviour</strong></td>
                  <td>Expected standards, examples of misconduct and gross misconduct, use of company property, alcohol and drugs, conflicts of interest</td>
                </tr>
                <tr>
                  <td><strong>7. Disciplinary procedure</strong></td>
                  <td>Investigation process, formal hearing, right to be accompanied, possible sanctions (verbal warning, written warning, final warning, dismissal), appeals</td>
                </tr>
                <tr>
                  <td><strong>8. Grievance procedure</strong></td>
                  <td>How to raise a grievance (informal and formal), investigation, hearing, outcome, appeal</td>
                </tr>
                <tr>
                  <td><strong>9. Health &amp; safety</strong></td>
                  <td>General policy statement, responsibilities, fire procedures, first aiders, accident reporting, DSE assessments, lone working (if applicable)</td>
                </tr>
                <tr>
                  <td><strong>10. Equal opportunities</strong></td>
                  <td>Commitment to equality, protected characteristics, anti-harassment, reporting mechanisms</td>
                </tr>
                <tr>
                  <td><strong>11. Data protection</strong></td>
                  <td>Employee data processing, UK GDPR rights, data handling responsibilities, breach reporting, IT and device security</td>
                </tr>
                <tr>
                  <td><strong>12. Social media &amp; communications</strong></td>
                  <td>Personal use of social media, posting about the company, email and internet use, monitoring</td>
                </tr>
                <tr>
                  <td><strong>13. Expenses</strong></td>
                  <td>What&apos;s claimable, receipts and evidence, approval process, mileage rates, reimbursement timescales</td>
                </tr>
                <tr>
                  <td><strong>14. Training &amp; development</strong></td>
                  <td>Learning opportunities, study leave, professional memberships, performance reviews</td>
                </tr>
                <tr>
                  <td><strong>15. Leaving the company</strong></td>
                  <td>Resignation process, notice periods, exit interviews, return of property, references, garden leave (if applicable)</td>
                </tr>
                <tr>
                  <td><strong>16. Acknowledgment</strong></td>
                  <td>Signature page confirming receipt and understanding</td>
                </tr>
              </tbody>
            </table>

            <p>
              You don&apos;t need to write a novel for each section. Keep it practical and clear. A good handbook is one people actually read &mdash; which means keeping the language plain and the content relevant.
            </p>

            <h2>Common mistakes to avoid</h2>
            <p>
              Even businesses that take the time to create a handbook often fall into these traps:
            </p>

            <h3>1. Making it too long</h3>
            <p>
              A 120-page handbook filled with legalese is a handbook nobody reads. Aim for clarity and brevity. Cover what employees need to know, not every conceivable edge case. If a policy runs to more than two pages, consider whether it needs its own separate document with a summary in the handbook.
            </p>

            <h3>2. Not updating it</h3>
            <p>
              Employment law changes regularly. The Employment Relations (Flexible Working) Act 2023, changes to statutory sick pay, updates to family leave rights &mdash; if your handbook still references the rules from 2019, it&apos;s not just unhelpful, it&apos;s actively misleading. Set a reminder to review the handbook at least once a year.
            </p>

            <h3>3. Treating it as a contract</h3>
            <p>
              This is one of the most dangerous mistakes. If your handbook is drafted in contractual language, a tribunal may treat its contents as contractual terms &mdash; which means you can&apos;t change them without the employee&apos;s agreement. Always include a clear statement that the handbook is <strong>not</strong> a contract of employment and that policies may be updated at the company&apos;s discretion. Use phrases like &quot;the company reserves the right to amend these policies&quot; rather than &quot;employees are entitled to.&quot;
            </p>

            <h3>4. Copy-pasting a generic template</h3>
            <p>
              Templates (including the one in this guide) are a starting point, not a finished product. Your handbook needs to reflect your actual policies, your industry, and your culture. A tech startup and a construction firm have very different health and safety requirements, dress codes, and working patterns. Don&apos;t just fill in the blanks &mdash; think about what each section means for your specific business.
            </p>

            <h3>5. Inconsistent enforcement</h3>
            <p>
              A policy is only as good as its enforcement. If the handbook says &quot;unauthorised absence will result in disciplinary action&quot; but managers regularly turn a blind eye, the policy becomes meaningless &mdash; and you lose the ability to rely on it when you genuinely need to. Train your managers on the handbook and hold everyone to the same standard.
            </p>

            <h3>6. Forgetting the tone</h3>
            <p>
              Your handbook is a reflection of your company culture. If your workplace is friendly and informal, but your handbook reads like a legal textbook, there&apos;s a disconnect. Write in plain English. Be direct. It&apos;s possible to be clear about rules and expectations without sounding like a Victorian headmaster.
            </p>

            <h2>Digital vs printed handbooks</h2>
            <p>
              The traditional approach was to print the handbook and hand a copy to every new starter. This still works for some businesses, but digital handbooks have significant advantages:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Easy to update</strong> &mdash; when a policy changes, you update one document and everyone immediately has the latest version. No printing, no distributing, no collecting old copies.</li>
              <li><strong>Searchable</strong> &mdash; employees can find what they need in seconds rather than flipping through pages.</li>
              <li><strong>Accessible anywhere</strong> &mdash; remote and hybrid workers can access it from home, on their phone, or wherever they&apos;re working.</li>
              <li><strong>Trackable</strong> &mdash; digital platforms can log who has read the handbook and when, which is useful for compliance.</li>
              <li><strong>Cost-effective</strong> &mdash; no printing costs, no storage, no waste when policies change.</li>
            </ul>
            <p>
              The best approach for most UK businesses is a digital handbook hosted on your HR platform or intranet, with the option to generate a PDF for anyone who wants a printable version. If you use <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link>, you can store your handbook as a company document that all employees can access from their dashboard.
            </p>

            <h2>Getting employees to sign an acknowledgment</h2>
            <p>
              Distributing the handbook isn&apos;t enough. You need employees to acknowledge that they&apos;ve received it, read it, and understood it. This acknowledgment is critical evidence if a dispute ever reaches a tribunal.
            </p>
            <p>
              Your acknowledgment form should state:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee has received a copy of the handbook (or been given access to it)</li>
              <li>They have read and understood its contents</li>
              <li>They agree to comply with the policies and procedures it contains</li>
              <li>They understand the handbook is not a contract of employment</li>
              <li>They understand the company may update the handbook from time to time</li>
            </ul>
            <p>
              Include this as the final page of the handbook and have every employee sign it &mdash; ideally during their <Link href="/blog/employee-onboarding-checklist-uk" className="text-emerald-600 hover:underline font-medium">onboarding process</Link>. For digital handbooks, an electronic signature or a tick-box confirmation within your HR system works just as well. Store the signed acknowledgment in the employee&apos;s personnel file.
            </p>
            <p>
              When you update the handbook significantly, re-issue the acknowledgment. Minor tweaks don&apos;t require a new signature, but substantial policy changes do.
            </p>

            <h2>When to update your handbook</h2>
            <p>
              A handbook that isn&apos;t kept current is worse than no handbook at all, because employees (and tribunals) may rely on outdated information. Review and update your handbook:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Annually</strong> &mdash; at minimum, do a full review once a year. Check every section against current legislation and current company practice.</li>
              <li><strong>When the law changes</strong> &mdash; employment law updates (new statutory rates, new rights like neonatal care leave, changes to flexible working rules) should be reflected promptly.</li>
              <li><strong>When company policies change</strong> &mdash; if you introduce a new benefit, change your expenses process, or update your remote working approach, the handbook should reflect it.</li>
              <li><strong>After a tribunal or dispute</strong> &mdash; if a case highlights a gap or ambiguity in your policies, fix it immediately.</li>
              <li><strong>When you grow</strong> &mdash; a handbook written for a team of 10 may not work for a team of 50. As your business scales, your policies need to evolve.</li>
            </ul>
            <p>
              Keep a version history so you can demonstrate which version was in force at any given time. This is straightforward with digital handbooks and almost impossible with printed copies.
            </p>

            <h2>How Leavely integrates with your leave and absence policies</h2>
            <p>
              Your handbook sets out the rules. Your HR software enforces them. When the two are aligned, everything works smoothly. When they&apos;re not, you get confusion, inconsistency, and disputes.
            </p>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is designed to be the operational counterpart to the leave and <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence management policies</Link> in your handbook:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Leave policies mirror your handbook</strong> &mdash; set up leave types in Leavely that match exactly what&apos;s in your handbook. Annual leave, sick leave, compassionate leave, study leave &mdash; if it&apos;s in the handbook, it&apos;s in the system. Employees see their entitlements in real time, eliminating disputes about balances.</li>
              <li><strong>Approval workflows follow your procedures</strong> &mdash; if your handbook says leave must be approved by a line manager with two weeks&apos; notice, Leavely enforces that. Requests go to the right approver, and the system tracks notice periods automatically.</li>
              <li><strong>Absence tracking supports your sickness policy</strong> &mdash; Leavely tracks sickness absence patterns, flags Bradford Factor triggers, and records return-to-work information &mdash; all aligned with the <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sickness policy</Link> in your handbook.</li>
              <li><strong>Team calendar prevents conflicts</strong> &mdash; when your handbook says &quot;we aim to ensure adequate cover at all times,&quot; the team calendar makes it easy to see who&apos;s off before approving requests.</li>
              <li><strong>Document storage</strong> &mdash; store your handbook as a company document in Leavely so every employee can access the latest version from their dashboard. No more &quot;I didn&apos;t know that was the policy&quot; conversations.</li>
              <li><strong>Audit trail</strong> &mdash; every leave request, approval, and policy change is logged. If a dispute reaches a tribunal, you have a complete, timestamped record that aligns with your documented procedures.</li>
            </ul>
            <p>
              The goal is simple: your handbook tells employees how things work, and Leavely makes it work that way in practice. No gaps, no inconsistencies, no manual tracking.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>Is an employee handbook a legal requirement in the UK?</h3>
            <p>
              No. There is no UK law that requires you to produce an employee handbook. However, certain individual policies (health and safety, disciplinary, grievance) are legally required, and a handbook is the most practical way to communicate them. From a risk management perspective, every business with employees should have one.
            </p>

            <h3>How long should an employee handbook be?</h3>
            <p>
              There&apos;s no ideal length, but shorter is almost always better. A handbook of 30&ndash;50 pages covers everything most small and medium businesses need. If yours is pushing past 80 pages, you&apos;re likely including too much detail &mdash; consider moving operational procedures to separate documents and keeping the handbook focused on policies and expectations.
            </p>

            <h3>Should the handbook be part of the employment contract?</h3>
            <p>
              No. The handbook should be a separate document, clearly stated as non-contractual. This gives you the flexibility to update policies without needing every employee&apos;s individual consent. If specific terms (like enhanced maternity pay) are contractual, they should be in the contract itself, not only in the handbook.
            </p>

            <h3>What&apos;s the difference between a handbook and a contract?</h3>
            <p>
              The employment contract is a legally binding agreement between employer and employee covering terms like salary, hours, notice period, and job title. The handbook is a guide to company policies and procedures &mdash; it supplements the contract but is not part of it (unless you accidentally make it contractual through poor drafting). The contract is individual; the handbook applies to everyone.
            </p>

            <h3>Do part-time employees get a different handbook?</h3>
            <p>
              No. The same handbook should apply to all employees. Where entitlements differ for part-time workers (e.g. <Link href="/blog/part-time-workers-rights-uk" className="text-emerald-600 hover:underline font-medium">pro-rata annual leave</Link>), explain the calculation in the relevant section. Under the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000, part-time workers must not be treated less favourably than full-time workers.
            </p>

            <h3>Can I have a digital-only handbook?</h3>
            <p>
              Yes. There is no requirement for the handbook to be printed. A digital handbook hosted on your HR platform or intranet is perfectly acceptable &mdash; and often preferable for the reasons outlined above. Just make sure every employee can access it and knows where to find it.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Your handbook policies, enforced automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely turns your leave and absence policies into real workflows &mdash; approvals, balances, and tracking that match your handbook. Try it free for 14 days.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: Complete Employer Guide &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Rights, Requests &amp; Policy Guide &rarr;</Link>
              <Link href="/blog/employee-onboarding-checklist-uk" className="block text-emerald-600 hover:underline font-medium">Employee Onboarding Checklist UK 2026: Complete HR Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

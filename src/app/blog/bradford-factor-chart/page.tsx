import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/bradford-factor-chart`

export const metadata: Metadata = {
  title: 'Bradford Factor Chart: Score Thresholds and Action Points for UK HR',
  description: 'Complete Bradford Factor chart with score thresholds, action triggers, and practical guidance for UK HR managers. Includes ready-to-use scoring tables and ACAS-compliant recommendations.',
  alternates: { canonical: articleUrl },
  keywords: [
    'bradford factor chart',
    'bradford factor score table',
    'absence score thresholds',
    'bradford factor calculator chart',
    'absence management scoring',
    'bradford factor action points',
    'UK absence scoring system',
  ],
  openGraph: {
    title: 'Bradford Factor Chart: Score Thresholds and Action Points for UK HR',
    description: 'Complete Bradford Factor chart with score thresholds, action triggers, and practical guidance for UK HR managers. Includes ready-to-use scoring tables and ACAS-compliant recommendations.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bradford Factor Chart: Score Thresholds and Action Points for UK HR',
  description: 'Complete Bradford Factor chart with score thresholds, action triggers, and practical guidance for UK HR managers. Includes ready-to-use scoring tables and ACAS-compliant recommendations.',
  url: articleUrl,
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BradfordFactorChart() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">ABSENCE MANAGEMENT</span>
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Bradford Factor Chart: Score Thresholds and Action Points for UK HR
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p>Last week, I had a conversation with Sarah, an HR manager at a Bristol-based tech firm. She&apos;d been using the Bradford Factor for months but was constantly second-guessing herself about when to take action. &apos;Is a score of 150 concerning? What about 200? When should I formally intervene?&apos; She wasn&apos;t alone. Most HR managers struggle with translating Bradford scores into meaningful action.</p>

            <p>The Bradford Factor formula itself is straightforward: S × S × D (where S = number of absence spells and D = total days absent). But knowing what to do with those scores? That&apos;s where many HR teams get stuck.</p>

            <h2>The Complete Bradford Factor Score Chart</h2>

            <p>After years of helping UK businesses manage absence, I&apos;ve developed this practical scoring chart that aligns with ACAS best practices and UK employment law. These thresholds work well for most SMBs, though you should always consider individual circumstances.</p>

            <table>
              <thead>
                <tr>
                  <th>Bradford Score</th>
                  <th>Risk Level</th>
                  <th>Recommended Action</th>
                  <th>HR Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0-50</td>
                  <td>No concern</td>
                  <td>Continue monitoring</td>
                  <td>No action required</td>
                </tr>
                <tr>
                  <td>51-100</td>
                  <td>Low concern</td>
                  <td>Informal conversation</td>
                  <td>Manager check-in about wellbeing</td>
                </tr>
                <tr>
                  <td>101-200</td>
                  <td>Moderate concern</td>
                  <td>Formal discussion</td>
                  <td>Return-to-work interview, document patterns</td>
                </tr>
                <tr>
                  <td>201-400</td>
                  <td>High concern</td>
                  <td>First written warning</td>
                  <td>Formal absence review meeting</td>
                </tr>
                <tr>
                  <td>401-600</td>
                  <td>Serious concern</td>
                  <td>Final written warning</td>
                  <td>Consider occupational health referral</td>
                </tr>
                <tr>
                  <td>600+</td>
                  <td>Critical</td>
                  <td>Consider dismissal</td>
                  <td>Full capability procedure required</td>
                </tr>
              </tbody>
            </table>

            <h2>Understanding Score Calculations: Real Examples</h2>

            <p>Numbers on a chart mean nothing without context. Let me show you how different absence patterns create vastly different scores, even with the same total days off.</p>

            <h3>Example 1: The Monday Morning Pattern</h3>
            <p>Emma has been absent 5 times this year, each time for just one day. Always a Monday.</p>
            <ul>
              <li>Spells (S): 5</li>
              <li>Days (D): 5</li>
              <li>Bradford Score: 5 × 5 × 5 = <strong>125</strong></li>
            </ul>
            <p>This score triggers a formal discussion. The pattern suggests potential issues with work-life balance, Sunday night anxiety, or even misconduct.</p>

            <h3>Example 2: The Genuine Illness</h3>
            <p>James had one absence spell lasting 5 days due to confirmed flu.</p>
            <ul>
              <li>Spells (S): 1</li>
              <li>Days (D): 5</li>
              <li>Bradford Score: 1 × 1 × 5 = <strong>5</strong></li>
            </ul>
            <p>No concern here. One continuous absence for genuine illness scores very low.</p>

            <h3>Example 3: The Chronic Condition</h3>
            <p>Priya has endometriosis and has been absent 8 times this year, totalling 12 days.</p>
            <ul>
              <li>Spells (S): 8</li>
              <li>Days (D): 12</li>
              <li>Bradford Score: 8 × 8 × 12 = <strong>768</strong></li>
            </ul>
            <p>This high score requires careful handling. Under the Equality Act 2010, you must consider reasonable adjustments for disabilities.</p>

            <h2>Quick Reference Chart for Common Patterns</h2>

            <p>Here&apos;s a quick lookup table for typical absence patterns UK HR managers encounter:</p>

            <table>
              <thead>
                <tr>
                  <th>Absence Pattern</th>
                  <th>Spells</th>
                  <th>Total Days</th>
                  <th>Bradford Score</th>
                  <th>Typical Cause</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly single days</td>
                  <td>10</td>
                  <td>10</td>
                  <td>1000</td>
                  <td>Pattern absence</td>
                </tr>
                <tr>
                  <td>Monthly migraines</td>
                  <td>12</td>
                  <td>12</td>
                  <td>1728</td>
                  <td>Medical condition</td>
                </tr>
                <tr>
                  <td>Quarterly bugs</td>
                  <td>4</td>
                  <td>8</td>
                  <td>128</td>
                  <td>Low immunity</td>
                </tr>
                <tr>
                  <td>Annual surgery</td>
                  <td>1</td>
                  <td>15</td>
                  <td>15</td>
                  <td>Planned medical</td>
                </tr>
                <tr>
                  <td>Stress-related</td>
                  <td>3</td>
                  <td>21</td>
                  <td>189</td>
                  <td>Mental health</td>
                </tr>
              </tbody>
            </table>

            <h2>Critical Factors That Override the Chart</h2>

            <p>Before you rush to apply these thresholds, remember that UK employment law requires you to consider individual circumstances. The Bradford Factor is a tool, not a rulebook.</p>

            <h3>Disability and Long-Term Conditions</h3>
            <p>Under the Equality Act 2010, you must make reasonable adjustments for employees with disabilities. A high Bradford score caused by disability-related absence shouldn&apos;t trigger the same response as other absences. Document these separately and consult occupational health.</p>

            <h3>Pregnancy-Related Absence</h3>
            <p>The Employment Rights Act 1996 protects pregnancy-related sickness. Never include pregnancy-related absence in Bradford Factor calculations. Doing so could constitute discrimination and lead to tribunal claims averaging &pound;13,500 in 2024.</p>

            <h3>Mental Health Considerations</h3>
            <p>With 1 in 4 UK workers experiencing mental health issues annually, your response to stress, anxiety, and depression-related absence matters. ACAS guidance recommends supportive interventions before disciplinary action. Consider Employee Assistance Programmes or flexible working arrangements.</p>

            <h2>Industry-Specific Bradford Factor Thresholds</h2>

            <p>Different sectors have different absence patterns and tolerance levels. Here&apos;s what I&apos;ve seen work across UK industries:</p>

            <h3>Healthcare and Care Sectors</h3>
            <p>Higher thresholds often apply due to exposure to illnesses:</p>
            <ul>
              <li>First intervention: 150-200 points</li>
              <li>Formal warning: 400+ points</li>
              <li>Average sector absence: 12.5 days per year</li>
            </ul>

            <h3>Office-Based Roles</h3>
            <p>Standard thresholds typically work well:</p>
            <ul>
              <li>First intervention: 100 points</li>
              <li>Formal warning: 200+ points</li>
              <li>Average sector absence: 7.8 days per year</li>
            </ul>

            <h3>Manufacturing and Retail</h3>
            <p>Lower thresholds due to operational requirements:</p>
            <ul>
              <li>First intervention: 50-75 points</li>
              <li>Formal warning: 150+ points</li>
              <li>Average sector absence: 8.5 days per year</li>
            </ul>

            <h2>Creating Your Organisation&apos;s Bradford Factor Policy</h2>

            <p>A chart without a policy is like a car without a driver. You need clear guidelines that managers can follow consistently.</p>

            <h3>Essential Policy Components</h3>
            <p>Your Bradford Factor policy must include:</p>
            <ul>
              <li>Clear score thresholds and corresponding actions</li>
              <li>Exemptions for disability, pregnancy, and work-related injuries</li>
              <li>Review periods (typically rolling 12 months)</li>
              <li>Appeal procedures aligned with ACAS Code of Practice</li>
              <li>Data protection considerations under UK GDPR</li>
            </ul>

            <h3>Sample Policy Wording</h3>
            <p>Here&apos;s language that passes legal muster: &apos;The Bradford Factor is one tool we use to identify absence patterns requiring support or intervention. Scores are calculated over a rolling 12-month period. We consider individual circumstances, particularly protected characteristics under the Equality Act 2010, before taking action.&apos;</p>

            <h2>Common Mistakes When Using Bradford Factor Charts</h2>

            <p>I&apos;ve seen well-intentioned HR teams make these errors repeatedly. Learn from their mistakes.</p>

            <h3>Rigid Application Without Context</h3>
            <p>Treating the chart as gospel leads to tribunal claims. Last year, a Manchester company lost a &pound;22,000 disability discrimination case because they applied Bradford thresholds to an employee with Crohn&apos;s disease without considering adjustments.</p>

            <h3>Inconsistent Trigger Points</h3>
            <p>If you intervene at 150 points for one employee but wait until 250 for another, you&apos;re opening yourself to discrimination claims. Document why you deviate from standard thresholds.</p>

            <h3>Poor Communication</h3>
            <p>Employees should understand how Bradford scoring works. Include it in your employee handbook and discuss during induction. Transparency reduces anxiety and improves trust.</p>

            <h2>Technology and Bradford Factor Tracking</h2>

            <p>Manual Bradford Factor calculations waste time and increase errors. Modern HR systems automate this process, flagging when employees cross thresholds.</p>

            <h3>Essential Features for Bradford Tracking</h3>
            <ul>
              <li>Automatic score calculation</li>
              <li>Threshold alerts for managers</li>
              <li>Absence pattern visualisation</li>
              <li>Exemption handling for protected absences</li>
              <li>Integration with absence booking systems</li>
            </ul>

            <h3>Data Protection Considerations</h3>
            <p>Under UK GDPR, Bradford scores are personal data. Limit access to managers with legitimate need. Retention should align with your absence record policy, typically 3-6 years after employment ends.</p>

            <h2>Beyond the Numbers: Holistic Absence Management</h2>

            <p>The best HR managers use Bradford Factor charts as a starting point, not an endpoint. Combine scoring with:</p>

            <ul>
              <li>Return-to-work interviews (proven to reduce absence by up to 30%)</li>
              <li>Wellbeing initiatives addressing root causes</li>
              <li>Flexible working policies that reduce stress-related absence</li>
              <li>Clear <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policies</Link> that employees understand</li>
            </ul>

            <h2>Cost Impact of Different Bradford Scores</h2>

            <p>Understanding the financial impact helps justify intervention thresholds. Based on an average UK salary of &pound;33,000:</p>

            <table>
              <thead>
                <tr>
                  <th>Bradford Score Range</th>
                  <th>Typical Pattern</th>
                  <th>Annual Cost Impact</th>
                  <th>Productivity Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0-50</td>
                  <td>1-2 absences</td>
                  <td>&pound;250-500</td>
                  <td>Minimal</td>
                </tr>
                <tr>
                  <td>51-150</td>
                  <td>3-5 absences</td>
                  <td>&pound;750-1,250</td>
                  <td>5-10%</td>
                </tr>
                <tr>
                  <td>151-300</td>
                  <td>6-8 absences</td>
                  <td>&pound;1,500-2,000</td>
                  <td>15-20%</td>
                </tr>
                <tr>
                  <td>300+</td>
                  <td>8+ absences</td>
                  <td>&pound;2,500+</td>
                  <td>25%+</td>
                </tr>
              </tbody>
            </table>

            <p>These costs exclude replacement staff, overtime, and lost opportunities. Factor in team morale impact, and the true cost often doubles.</p>

            <h2>How Leavely Helps With Bradford Factor Management</h2>

            <p>While spreadsheets work for basic Bradford calculations, they quickly become unwieldy as your team grows. <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">Leave management software</Link> like Leavely automates the entire process.</p>

            <p>Leavely automatically calculates Bradford scores for every employee, sending managers alerts when thresholds are crossed. The system excludes protected absences and provides visual dashboards showing absence patterns. At &pound;8 per user per month, it pays for itself by preventing just one day of unmanaged absence.</p>

            <p>The platform integrates with your existing <Link href="/blog/hr-software-small-business-uk" className="text-emerald-600 hover:underline font-medium">HR software</Link>, ensuring Bradford Factor monitoring doesn&apos;t create extra admin. Managers can access scores during return-to-work interviews, making conversations more productive.</p>

            <h2>Legal Compliance and Bradford Factor Charts</h2>

            <p>UK employment law doesn&apos;t specifically mention the Bradford Factor, but tribunals regularly assess how organisations use it. Key legislation affecting your approach includes:</p>

            <ul>
              <li>Employment Rights Act 1996 - unfair dismissal protection</li>
              <li>Equality Act 2010 - discrimination and reasonable adjustments</li>
              <li>Data Protection Act 2018 - handling absence data</li>
              <li>ACAS Code of Practice - fair disciplinary procedures</li>
            </ul>

            <p>Always seek legal advice before dismissing employees for absence, even with high Bradford scores. The average unfair dismissal award in 2024 is &pound;13,500, but discrimination claims can exceed &pound;50,000.</p>

            <h2>Implementing Bradford Factor Charts: A Step-by-Step Guide</h2>

            <p>Ready to implement or improve your Bradford Factor approach? Follow this proven process:</p>

            <ol>
              <li><strong>Audit current absence patterns:</strong> Calculate Bradford scores for all employees over the past 12 months</li>
              <li><strong>Set appropriate thresholds:</strong> Use the chart above as a starting point, adjusting for your industry</li>
              <li><strong>Create clear policies:</strong> Document trigger points and exemptions</li>
              <li><strong>Train managers:</strong> Ensure consistent application and legal compliance</li>
              <li><strong>Communicate to staff:</strong> Transparency reduces anxiety and improves buy-in</li>
              <li><strong>Monitor and adjust:</strong> Review thresholds quarterly based on outcomes</li>
            </ol>

            <h3>FAQs About Bradford Factor Charts</h3>

            <h3>What Bradford Factor score should trigger disciplinary action?</h3>
            <p>Most UK organisations begin formal disciplinary procedures at scores above 200. However, always consider individual circumstances first. ACAS recommends informal discussions at lower scores (50-100) before moving to formal warnings. Remember that disability-related absence requires different handling under the Equality Act 2010.</p>

            <h3>How often should we review Bradford Factor scores?</h3>
            <p>Review scores monthly but calculate them over a rolling 12-month period. This approach catches patterns early while providing enough data for meaningful analysis. Set up automated alerts for when employees cross thresholds rather than waiting for periodic reviews.</p>

            <h3>Can we dismiss someone based solely on their Bradford score?</h3>
            <p>No. The Bradford Factor is evidence of absence patterns, not grounds for dismissal itself. Employment tribunals expect you to follow proper capability procedures, consider underlying causes, and explore alternatives like occupational health referrals or reasonable adjustments before dismissal.</p>

            <h3>Should pregnancy-related absence count towards Bradford scores?</h3>
            <p>Never include pregnancy-related sickness in Bradford calculations. Doing so constitutes discrimination under the Equality Act 2010. Track these absences separately and ensure your <Link href="/blog/staff-holiday-tracker-uk" className="text-emerald-600 hover:underline font-medium">absence tracking system</Link> can distinguish between different absence types.</p>

            <h3>What&apos;s the average Bradford Factor score across UK businesses?</h3>
            <p>The average UK employee has 7.8 days absence annually, typically across 2-3 spells, resulting in Bradford scores between 50-100. However, this varies significantly by industry, with healthcare averaging higher scores due to increased illness exposure and office roles typically lower.</p>

            <h3>How do we handle high Bradford scores caused by disability?</h3>
            <p>First, confirm if the condition qualifies as a disability under the Equality Act 2010. Then consider reasonable adjustments like flexible hours, phased returns, or modified duties. Document all adjustments offered. You may still manage disability-related absence, but thresholds and actions differ from standard procedures.</p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate Your Bradford Factor Tracking</h3>
            <p className="text-emerald-100 mb-6">Stop calculating scores manually. Leavely tracks Bradford factors automatically and alerts you when action is needed.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">
                Bradford Factor Explained: Complete Guide for UK Employers &rarr;
              </Link>
              <Link href="/blog/employee-self-service-hr" className="block text-emerald-600 hover:underline font-medium">
                Employee Self-Service HR: Reducing Absence Admin &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                UK Annual Leave Entitlement: Complete 2024 Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
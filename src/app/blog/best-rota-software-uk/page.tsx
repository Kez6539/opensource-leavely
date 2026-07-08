import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/best-rota-software-uk`

export const metadata: Metadata = {
  title: 'Best Rota Software UK 2026: Top 8 Staff Scheduling Tools Compared',
  description:
    'Compare the best rota software for UK businesses in 2026. Staff scheduling, shift templates, mobile access, and pricing for Deputy, RotaCloud, Planday, Leavely, and more.',
  alternates: { canonical: articleUrl },
  keywords: [
    'best rota software uk',
    'staff rota app',
    'employee scheduling software uk',
    'shift planning software',
    'rota maker uk',
    'best staff scheduling app',
    'rota software for small business',
    'shift scheduling tool uk',
  ],
  openGraph: {
    title: 'Best Rota Software UK 2026: Top 8 Staff Scheduling Tools',
    description:
      'Compare the top rota and shift scheduling tools for UK businesses. Features, pricing, and honest pros and cons.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Rota Software UK 2026: Top 8 Staff Scheduling Tools Compared',
  description:
    'Compare the best rota software for UK businesses in 2026. Staff scheduling, shift templates, mobile access, and pricing.',
  url: articleUrl,
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free rota software in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most rota software offers free trials rather than permanently free plans. Leavely offers a 14-day free trial with full access to rotas, shift templates, and scheduling features. Findmyshift has a limited free tier for up to 5 employees.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does rota software cost per employee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UK rota software typically costs between £2 and £10 per user per month. Budget tools start around £2-3/user, while full-featured platforms like Leavely cost £8/user/month with rotas, leave management, expenses, and performance tracking all included.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can rota software handle different shift patterns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Good rota software supports custom shift templates (e.g. early, late, night), rotating patterns, split shifts, and variable hours. Look for tools that let you save templates with colour coding so building weekly rotas takes minutes rather than hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need separate software for rotas and leave management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Platforms like Leavely combine rota scheduling with leave management, so managers can see who is off before building the rota. This avoids scheduling conflicts and reduces the number of tools your team needs to use.',
      },
    },
  ],
}

export default function BestRotaSoftwareArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header>
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/features"><Button variant="ghost" size="sm" className="text-sm font-medium">Features</Button></Link>
              <Link href="/pricing"><Button variant="ghost" size="sm" className="text-sm font-medium">Pricing</Button></Link>
              <Link href="/register">
                <Button size="sm" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20">Start free trial</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Software Guide</span>
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Best Rota Software UK 2026: Top 8 Staff Scheduling Tools Compared
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Building staff rotas in spreadsheets or on paper is one of those tasks that feels manageable until it isn&apos;t. Missed shifts, last-minute swaps, and &quot;I didn&apos;t know I was working&quot; conversations eat into your week. Rota software fixes this by giving you a visual schedule builder, shift templates, and instant notifications — so everyone knows where they need to be and when.
            </p>
            <p>
              In this guide we compare the <strong>8 best rota software tools available in the UK in 2026</strong>, covering features, pricing, and honest pros and cons to help you pick the right one for your business.
            </p>

            <h2>Why UK businesses need rota software</h2>
            <p>
              If you manage shift workers, part-timers, or anyone who doesn&apos;t work a fixed 9–5, a dedicated scheduling tool pays for itself quickly. Here&apos;s why:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Time savings</strong> — drag-and-drop scheduling replaces hours of manual rota building each week.</li>
              <li><strong>Fewer errors</strong> — the software flags double bookings, understaffing, and shift conflicts automatically.</li>
              <li><strong>Better communication</strong> — published rotas reach employees via app, email, or SMS instantly.</li>
              <li><strong>Legal compliance</strong> — <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline">Working Time Regulations</Link> require adequate rest periods and record keeping. Software handles this for you.</li>
              <li><strong>Leave integration</strong> — see who is on <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline">annual leave</Link> or sick leave before you build the rota.</li>
              <li><strong>Employee satisfaction</strong> — staff can view their upcoming shifts, request swaps, and plan their lives around a clear schedule.</li>
            </ul>

            <h2>What to look for in rota software</h2>
            <p>
              Before comparing tools, here are the features that separate good rota software from great rota software:
            </p>

            <h3>Shift templates</h3>
            <p>
              Pre-built templates for common shifts (early, late, night, split) save time every week. The best tools let you create custom templates with colour coding, start/end times, and break durations so building a rota is as simple as clicking a cell.
            </p>

            <h3>Weekly and monthly grid views</h3>
            <p>
              A visual grid showing employees down the left and days across the top is the most intuitive layout. You should be able to see at a glance who is working, who is off, and where the gaps are.
            </p>

            <h3>Mobile access</h3>
            <p>
              Employees need to check their schedule on the go. A responsive web app or native mobile app is essential — especially for industries like hospitality, retail, and healthcare where staff rarely sit at a desktop.
            </p>

            <h3>Publish and share</h3>
            <p>
              Building the rota is only half the job. You need a clear workflow to publish it to your team with notifications so nobody misses their shifts.
            </p>

            <h3>Notifications and alerts</h3>
            <p>
              Email or push notifications when the rota is published, when shifts change, or when swaps are requested keep everyone in the loop without managers chasing people.
            </p>

            <h3>Reporting and cost tracking</h3>
            <p>
              Understanding hours worked, overtime, and labour costs helps you staff efficiently. Look for tools with built-in reporting or CSV export for payroll.
            </p>

            <h3>Leave management integration</h3>
            <p>
              The biggest scheduling headache is discovering someone is on leave after you&apos;ve published the rota. Tools that integrate with <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline">leave management software</Link> avoid this entirely.
            </p>

            <h2>Top 8 rota software tools for UK businesses (2026)</h2>

            <h3>1. Leavely — Best all-in-one HR + rota solution</h3>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is a UK-built HR platform that now includes a full <strong>Rotas &amp; Shifts</strong> module alongside leave management, expenses, and performance tracking. It&apos;s designed for SMBs who want one tool instead of four.
            </p>
            <p>
              The rota system uses a <strong>weekly grid view</strong> with employees listed down the left and days across the top. You create <strong>colour-coded shift templates</strong> (e.g. &quot;Early 06:00–14:00&quot; in blue, &quot;Late 14:00–22:00&quot; in orange) and assign them with a single click. When the rota is ready, hit <strong>Publish</strong> to notify the whole team. You can also <strong>export to CSV</strong> for payroll.
            </p>
            <p>
              Because Leavely already knows who is on annual leave, sick leave, or TOIL, the rota view shows availability in real time — no double booking someone who&apos;s off.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> £8/user/month — all features included (rotas, leave, expenses, performance).</li>
              <li><strong>Free trial:</strong> 14 days, no credit card required.</li>
              <li><strong>Pros:</strong> All-in-one platform; leave and rota in one view; shift templates with colours; UK bank holidays pre-loaded; simple UI.</li>
              <li><strong>Cons:</strong> No native mobile app yet (responsive web app works well on phones); no time clock feature.</li>
            </ul>

            <h3>2. Deputy</h3>
            <p>
              Deputy is a well-established scheduling platform popular in hospitality and retail. It offers shift scheduling, time and attendance tracking, and demand-based auto-scheduling.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £3.50/user/month (scheduling only) to £5/user/month (premium).</li>
              <li><strong>Pros:</strong> Strong mobile app; auto-scheduling based on demand; time clock with GPS.</li>
              <li><strong>Cons:</strong> Leave management is basic — you&apos;ll likely need a separate tool; US-focused features; premium pricing adds up.</li>
            </ul>

            <h3>3. RotaCloud</h3>
            <p>
              RotaCloud is a UK-built rota platform with a clean interface. It handles scheduling, time tracking, and basic HR features including holiday management.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £5/user/month. Pricing increases with additional modules.</li>
              <li><strong>Pros:</strong> UK company; intuitive drag-and-drop; good mobile app; time and attendance included.</li>
              <li><strong>Cons:</strong> No expense management or performance tracking; costs grow as you add modules; limited reporting on lower tiers.</li>
            </ul>

            <h3>4. Planday</h3>
            <p>
              Planday (owned by Xero) focuses on shift-based businesses and offers scheduling, time tracking, payroll integration, and communication tools.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £3/user/month (Starter) to £6/user/month (Pro).</li>
              <li><strong>Pros:</strong> Xero payroll integration; revenue-based scheduling; good for hospitality.</li>
              <li><strong>Cons:</strong> Minimum 15 users on some plans; no UK-specific leave management; setup can be complex.</li>
            </ul>

            <h3>5. Shiftie</h3>
            <p>
              Shiftie is a UK rota tool aimed at small teams in leisure, hospitality, and events. It&apos;s simple and affordable with a focus on core scheduling.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £1/user/month. Free plan available for up to 10 users with limited features.</li>
              <li><strong>Pros:</strong> Very affordable; simple to use; UK built; free tier for tiny teams.</li>
              <li><strong>Cons:</strong> Limited HR features beyond scheduling; no expense or performance management; reporting is basic.</li>
            </ul>

            <h3>6. Findmyshift</h3>
            <p>
              Findmyshift offers free scheduling for up to 5 employees, making it popular with micro-businesses. It covers scheduling, time tracking, and basic leave management.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> Free for up to 5 team members; paid plans from £1.50/user/month.</li>
              <li><strong>Pros:</strong> Free tier; straightforward interface; email and SMS notifications; decent reporting.</li>
              <li><strong>Cons:</strong> Interface feels dated; limited integrations; no mobile app (mobile web only); advanced features require paid plans.</li>
            </ul>

            <h3>7. BrightHR</h3>
            <p>
              <Link href="/compare/brighthr" className="text-emerald-600 hover:underline">BrightHR</Link> is a broader HR platform that includes rota scheduling alongside absence management, document storage, and employment law advice.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £5.60/user/month. Pricing varies by package and contract length.</li>
              <li><strong>Pros:</strong> Full HR suite; 24/7 employment law helpline; UK focused; BrightSafe health and safety add-on.</li>
              <li><strong>Cons:</strong> Rota features are not as deep as dedicated scheduling tools; annual contracts; pricing can be opaque.</li>
            </ul>

            <h3>8. When I Work</h3>
            <p>
              When I Work is a US-based scheduling platform used globally. It offers shift scheduling, time tracking, and team messaging with a polished mobile app.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From $2.50/user/month (approximately £2/user). Pricing in USD.</li>
              <li><strong>Pros:</strong> Excellent mobile app; team messaging built in; auto-scheduling; affordable.</li>
              <li><strong>Cons:</strong> US-centric (no UK bank holidays, no GBP pricing); no UK leave management; limited compliance features for UK businesses.</li>
            </ul>

            <h2>Comparison table</h2>
            <div className="overflow-x-auto not-prose my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border font-semibold text-gray-900">Tool</th>
                    <th className="text-left p-3 border font-semibold text-gray-900">Price/user/mo</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">Shift templates</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">Leave integration</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">Mobile app</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">UK bank holidays</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">Expenses</th>
                    <th className="text-center p-3 border font-semibold text-gray-900">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-emerald-50/50">
                    <td className="p-3 border font-semibold text-emerald-700">Leavely</td>
                    <td className="p-3 border">£8</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Web app</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Deputy</td>
                    <td className="p-3 border">From £3.50</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Basic</td>
                    <td className="p-3 border text-center">iOS/Android</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">RotaCloud</td>
                    <td className="p-3 border">From £5</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">iOS/Android</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Planday</td>
                    <td className="p-3 border">From £3</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Basic</td>
                    <td className="p-3 border text-center">iOS/Android</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Shiftie</td>
                    <td className="p-3 border">From £1</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Basic</td>
                    <td className="p-3 border text-center">Web app</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Findmyshift</td>
                    <td className="p-3 border">Free–£1.50</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Basic</td>
                    <td className="p-3 border text-center">Web only</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">BrightHR</td>
                    <td className="p-3 border">From £5.60</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">iOS/Android</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">When I Work</td>
                    <td className="p-3 border">~£2</td>
                    <td className="p-3 border text-center">Yes</td>
                    <td className="p-3 border text-center">Basic</td>
                    <td className="p-3 border text-center">iOS/Android</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                    <td className="p-3 border text-center">No</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>How Leavely&apos;s rota system works</h2>
            <p>
              Leavely&apos;s <strong>Rotas &amp; Shifts</strong> module was built to be fast and practical. Here&apos;s how it works in practice:
            </p>

            <h3>Step 1: Create shift templates</h3>
            <p>
              Go to the Rotas section and create your shift templates. Each template has a name, start time, end time, and colour. For example:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Early</strong> — 06:00 to 14:00 (blue)</li>
              <li><strong>Late</strong> — 14:00 to 22:00 (orange)</li>
              <li><strong>Night</strong> — 22:00 to 06:00 (purple)</li>
              <li><strong>Office</strong> — 09:00 to 17:30 (green)</li>
            </ul>
            <p>
              Templates are saved and reusable, so you only set them up once.
            </p>

            <h3>Step 2: Build the weekly rota</h3>
            <p>
              The rota screen shows a <strong>weekly grid</strong> with your team members listed vertically and the seven days of the week horizontally. Click any cell to assign a shift template. The cell fills with the template&apos;s colour and shows the shift times — giving you an instant visual overview of the week.
            </p>
            <p>
              Employees who are on approved leave are marked automatically, so you won&apos;t accidentally schedule someone who&apos;s off on holiday or sick leave.
            </p>

            <h3>Step 3: Publish and notify</h3>
            <p>
              Once the rota is complete, click <strong>Publish</strong>. All assigned employees are notified and can see their upcoming shifts in their Leavely dashboard. No WhatsApp groups, no pinning a printout to the wall.
            </p>

            <h3>Step 4: Export for payroll</h3>
            <p>
              At the end of the period, export the rota to <strong>CSV</strong> with one click. The export includes employee names, dates, shift times, and total hours — ready to feed into your payroll system.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Weekly grid view',
                'Colour-coded shift templates',
                'One-click publish',
                'CSV export for payroll',
                'Leave visibility in the rota',
                'UK bank holidays pre-loaded',
                '£8/user/month — everything included',
                '14-day free trial, no card',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <h2>Choosing the right rota software for your business</h2>
            <p>
              The best choice depends on your business type and what you already use:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>If you want an all-in-one HR platform</strong> — <Link href="/" className="text-emerald-600 hover:underline">Leavely</Link> combines rotas, leave, expenses, and performance in one tool at a single price.</li>
              <li><strong>If you only need scheduling and time clocks</strong> — Deputy or RotaCloud are solid choices for shift-heavy businesses.</li>
              <li><strong>If budget is the priority</strong> — Findmyshift&apos;s free tier or Shiftie&apos;s £1/user plan are the cheapest options.</li>
              <li><strong>If you&apos;re already using Xero</strong> — Planday&apos;s native integration is a natural fit.</li>
              <li><strong>If you need a broad HR suite with legal advice</strong> — BrightHR bundles scheduling with employment law support.</li>
            </ul>
            <p>
              For most UK SMBs, the biggest efficiency gain comes from having rotas and leave management in one place. Scheduling someone who is on annual leave, then scrambling to find cover, is a problem that disappears when both systems share the same data.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>What is the best free rota software in the UK?</h3>
            <p>
              Most rota software offers free trials rather than permanently free plans. <Link href="/register" className="text-emerald-600 hover:underline">Leavely offers a 14-day free trial</Link> with full access to rotas, shift templates, and scheduling features. Findmyshift has a limited free tier for up to 5 employees.
            </p>

            <h3>How much does rota software cost per employee?</h3>
            <p>
              UK rota software typically costs between £2 and £10 per user per month. Budget tools start around £2–3/user, while full-featured platforms like Leavely cost <Link href="/pricing" className="text-emerald-600 hover:underline">£8/user/month</Link> with rotas, leave management, expenses, and performance tracking all included.
            </p>

            <h3>Can rota software handle different shift patterns?</h3>
            <p>
              Yes. Good rota software supports custom shift templates (e.g. early, late, night), rotating patterns, split shifts, and variable hours. Look for tools that let you save templates with colour coding so building weekly rotas takes minutes rather than hours.
            </p>

            <h3>Do I need separate software for rotas and leave management?</h3>
            <p>
              Not necessarily. Platforms like Leavely combine rota scheduling with <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline">leave management</Link>, so managers can see who is off before building the rota. This avoids scheduling conflicts and reduces the number of tools your team needs to use.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Try Leavely free for 14 days</h3>
            <p className="text-emerald-100 mb-6">Rotas, leave management, expenses, and performance — all included. No credit card.</p>
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
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK 2026 &rarr;</Link>
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">Working Time Regulations UK: Employer Guide &rarr;</Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">HR Software for Small Businesses UK &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Right to Request Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

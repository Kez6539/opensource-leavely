import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CalendarDays,
  Users,
  Shield,
  ArrowRight,
  BarChart3,
  Globe,
  Zap,
  Clock,
  FileText,
  Bell,
  ClipboardList,
  Building2,
  UserCheck,
  Timer,
  TrendingUp,
  Ban,
  CalendarClock,
  UserCog,
  Award,
  CalendarSync,
  Smartphone,
  PiggyBank,
  AlertTriangle,
  Megaphone,
  EyeOff,
  Thermometer,
  UserMinus,
  GanttChart,
  SlidersHorizontal,
  Hourglass,
  BookOpen,
  AppWindow,
  LayoutDashboard,
  MousePointerClick,
  Star,
  Check,
  Plane,
  Lock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Features — Leave Management Software for UK Teams',
  description:
    'Explore all 35+ Leavely features: visual leave calendar, Gantt view, one-click approvals, smart approval cards, balance overview, broadcast alerts, sickness and turnover reports, privacy controls, employee termination, balance adjustments, help centre, PWA app, and more. Built for UK SMBs.',
  alternates: { canonical: `${SITE_URL}/features` },
  keywords: [
    'leave management features',
    'employee leave tracking features',
    'leave calendar software',
    'one-click leave approval',
    'leave balance tracker',
    'sick leave management',
    'TOIL tracking software',
    'Bradford Factor calculator',
    'absence management features',
    'staff holiday planner features',
    'leave clash detection',
    'blackout dates leave',
    'approval delegation software',
    'ical calendar sync leave',
    'accrual based leave tracking',
    'length of service entitlement',
  ],
  openGraph: {
    title: 'Leavely Features — Everything You Need to Manage Leave',
    description:
      '35+ features: visual leave calendar, Gantt view, smart approvals, balance overview, broadcast alerts, sickness reports, turnover analytics, privacy controls, and more. All included for £8/user/month.',
    url: `${SITE_URL}/features`,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Leavely Features',
      description: 'Complete list of Leavely leave management software features for UK businesses.',
      url: `${SITE_URL}/features`,
      isPartOf: { '@type': 'WebSite', name: 'Leavely', url: SITE_URL },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Leavely',
      url: SITE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leave management software for UK businesses with 35+ features including visual calendars, one-click approvals, sickness reports, turnover analytics, and more.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        'Visual leave calendar',
        'One-click leave approvals',
        'Automatic leave balance tracking',
        'Team directory and employee profiles',
        'Role-based access control',
        'UK public holidays built in',
        'Custom leave policies',
        'TOIL management',
        'Bradford Factor monitoring',
        'Return-to-work forms',
        'Email notifications',
        'Company-wide leave blocks',
        'Team invitations',
        'Full audit trail',
        'Department clash detection',
        'Blackout dates',
        'Minimum notice period',
        'Approval delegation',
        'Service-based entitlement',
        'Calendar sync (iCal)',
        'Employee self-service',
        'Accrual-based leave',
        'Balance overview with colour-coded bars',
        'Broadcast alerts to all staff',
        'Privacy controls',
        'Sickness absence reports',
        'Turnover and retention reports',
        'Smart approval cards',
        'Quick actions panel',
        'Employee termination and offboarding',
        'Gantt calendar view',
        'Balance adjustments with audit trail',
        'Length of service display',
        'Help centre with 14 guides',
        'PWA installable app',
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Leavely Features',
      description: 'Complete list of leave management features included with Leavely.',
      numberOfItems: 35,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Visual Leave Calendar' },
        { '@type': 'ListItem', position: 2, name: 'One-Click Leave Approvals' },
        { '@type': 'ListItem', position: 3, name: 'Automatic Leave Balance Tracking' },
        { '@type': 'ListItem', position: 4, name: 'Team Directory & Employee Profiles' },
        { '@type': 'ListItem', position: 5, name: 'Role-Based Access Control' },
        { '@type': 'ListItem', position: 6, name: 'UK Public Holidays Built In' },
        { '@type': 'ListItem', position: 7, name: 'Custom Leave Policies' },
        { '@type': 'ListItem', position: 8, name: 'TOIL Management' },
        { '@type': 'ListItem', position: 9, name: 'Bradford Factor Monitoring' },
        { '@type': 'ListItem', position: 10, name: 'Return-to-Work Forms' },
        { '@type': 'ListItem', position: 11, name: 'Email Notifications' },
        { '@type': 'ListItem', position: 12, name: 'Company-Wide Leave Blocks' },
        { '@type': 'ListItem', position: 13, name: 'Team Invitations' },
        { '@type': 'ListItem', position: 14, name: 'Full Audit Trail' },
        { '@type': 'ListItem', position: 15, name: 'Department Clash Detection' },
        { '@type': 'ListItem', position: 16, name: 'Blackout Dates' },
        { '@type': 'ListItem', position: 17, name: 'Minimum Notice Period' },
        { '@type': 'ListItem', position: 18, name: 'Approval Delegation' },
        { '@type': 'ListItem', position: 19, name: 'Service-Based Entitlement' },
        { '@type': 'ListItem', position: 20, name: 'Calendar Sync (iCal)' },
        { '@type': 'ListItem', position: 21, name: 'Employee Self-Service' },
        { '@type': 'ListItem', position: 22, name: 'Accrual-Based Leave' },
        { '@type': 'ListItem', position: 23, name: 'Balance Overview' },
        { '@type': 'ListItem', position: 24, name: 'Broadcast Alerts' },
        { '@type': 'ListItem', position: 25, name: 'Privacy Controls' },
        { '@type': 'ListItem', position: 26, name: 'Sickness Reports' },
        { '@type': 'ListItem', position: 27, name: 'Turnover Reports' },
        { '@type': 'ListItem', position: 28, name: 'Smart Approval Cards' },
        { '@type': 'ListItem', position: 29, name: 'Quick Actions' },
        { '@type': 'ListItem', position: 30, name: 'Employee Termination' },
        { '@type': 'ListItem', position: 31, name: 'Gantt Calendar' },
        { '@type': 'ListItem', position: 32, name: 'Balance Adjustments' },
        { '@type': 'ListItem', position: 33, name: 'Length of Service' },
        { '@type': 'ListItem', position: 34, name: 'Help Centre' },
        { '@type': 'ListItem', position: 35, name: 'PWA App' },
      ],
    },
  ],
}

// ---------- Feature data, grouped into four clusters ----------

type FeatureItem = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const leaveAndAbsence: FeatureItem[] = [
  {
    icon: CalendarDays,
    title: 'Visual Leave Calendar',
    description:
      "See who's off and when on an interactive team calendar. Spot coverage gaps before they happen. Filter by department, team, or leave type.",
  },
  {
    icon: GanttChart,
    title: 'Gantt Calendar',
    description:
      'Visual leave calendar with horizontal bars, employee names, month navigation, and today highlight. See your whole team at a glance.',
  },
  {
    icon: Zap,
    title: 'One-Click Leave Approvals',
    description:
      'Managers approve or decline leave requests in a single click. No more back-and-forth emails. Employees get notified instantly.',
  },
  {
    icon: MousePointerClick,
    title: 'Smart Approval Cards',
    description:
      'See remaining balance and department clashes before approving. Green, amber, red indicators make every decision instant.',
  },
  {
    icon: BarChart3,
    title: 'Automatic Leave Balance Tracking',
    description:
      'Leave allowances, used days, pending requests, and remaining balance are calculated automatically. No more spreadsheet formulas.',
  },
  {
    icon: ClipboardList,
    title: 'Custom Leave Policies',
    description:
      'Create unlimited leave types — holiday, sick, TOIL, compassionate, parental, study leave, and more. Set custom allowances per policy.',
  },
  {
    icon: PiggyBank,
    title: 'Accrual-Based Leave',
    description:
      'Choose between upfront or monthly accrual per policy. Monthly accrual builds up 1/12th each month — perfect for new starters.',
  },
  {
    icon: Timer,
    title: 'TOIL Management',
    description:
      'Track time off in lieu (TOIL) alongside regular leave. Employees earn and use TOIL hours with full audit trail visibility.',
  },
  {
    icon: Globe,
    title: 'UK Public Holidays Built In',
    description:
      'Pre-loaded bank holidays for England, Scotland, Wales, and Northern Ireland. Leave allowances are always calculated correctly around public holidays.',
  },
  {
    icon: Building2,
    title: 'Company-Wide Leave Blocks',
    description:
      'Set company shutdown periods (Christmas, summer) that automatically apply to all employees. No individual requests needed.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Balance Adjustments',
    description:
      'Managers adjust leave allowances inline with a reason. Full audit trail records who changed what and why.',
  },
  {
    icon: BarChart3,
    title: 'Balance Overview',
    description:
      "See every employee's leave balance on one page with colour-coded bars. Sort by who's running low and filter by department.",
  },
]

const sicknessAndAttendance: FeatureItem[] = [
  {
    icon: Thermometer,
    title: 'Sickness Reports',
    description:
      'Dedicated sickness absence report showing sick days, occurrences, and Bradford Factor per employee. Spot patterns at a glance.',
  },
  {
    icon: TrendingUp,
    title: 'Bradford Factor Monitoring',
    description:
      'Automatically calculate Bradford Factor scores to identify absence patterns. Spot frequent short-term absences before they become a problem.',
  },
  {
    icon: FileText,
    title: 'Return-to-Work Forms',
    description:
      'Built-in return-to-work interview forms after absence. Digitise your RTW process and keep records attached to each leave request.',
  },
  {
    icon: AlertTriangle,
    title: 'Department Clash Detection',
    description:
      'Real-time warnings when booking leave shows who else in the same department is already off. Prevents understaffing before it happens.',
  },
  {
    icon: Ban,
    title: 'Blackout Dates',
    description:
      'Block leave during critical business periods — quarter-end, peak season, audits. Employees see clear warnings when dates are restricted.',
  },
  {
    icon: CalendarClock,
    title: 'Minimum Notice Period',
    description:
      'Set per-policy notice requirements — e.g. 14 days for annual leave. Prevents last-minute bookings that leave teams scrambling.',
  },
]

const teamAndPeople: FeatureItem[] = [
  {
    icon: Users,
    title: 'Team Directory & Employee Profiles',
    description:
      'Manage your entire team in one place. Track roles, departments, start dates, employment details, and complete leave history.',
  },
  {
    icon: UserCheck,
    title: 'Team Invitations',
    description:
      'Invite employees via email with a single click. They set up their profile and start requesting leave immediately.',
  },
  {
    icon: Smartphone,
    title: 'Employee Self-Service',
    description:
      'Employees update their own contact details — phone, email, address — without waiting for HR. Managers still control sensitive fields.',
  },
  {
    icon: Award,
    title: 'Service-Based Entitlement',
    description:
      'Automatically award extra leave days based on length of service. Configure tiers — e.g. +1 day after 2 years, +3 after 5 years.',
  },
  {
    icon: Hourglass,
    title: 'Length of Service',
    description:
      'Prominent display showing years and months of service calculated from start date. Feeds into service-based entitlement tiers.',
  },
  {
    icon: UserCog,
    title: 'Approval Delegation',
    description:
      "Managers set a temporary delegate when they're away. The delegate sees and can approve leave requests for the manager's team.",
  },
  {
    icon: UserMinus,
    title: 'Employee Termination',
    description:
      'Offboard staff with termination date, reason, exit interview tracking, and remaining entitlement calculator. Clean, compliant exits.',
  },
]

const adminAndIntegrations: FeatureItem[] = [
  {
    icon: Shield,
    title: 'Role-Based Access Control',
    description:
      'Four roles — Owner, Admin, Manager, Employee — ensure everyone sees exactly what they should. Managers only see their direct reports.',
  },
  {
    icon: EyeOff,
    title: 'Privacy Controls',
    description:
      'Hide emails from employees, restrict the employee list, prevent leave cancellation, control status visibility. Your rules, enforced automatically.',
  },
  {
    icon: Clock,
    title: 'Full Audit Trail',
    description:
      'Every action is logged — who approved what, when, and why. Stay compliant with employment regulations and internal policies.',
  },
  {
    icon: Bell,
    title: 'Email Notifications',
    description:
      'Automatic email alerts for new leave requests, approvals, rejections, and upcoming leave. Keep everyone informed without chasing.',
  },
  {
    icon: Megaphone,
    title: 'Broadcast Alerts',
    description:
      'Send instant notifications to your whole team from the dashboard. Office closures, emergencies, updates — delivered in seconds.',
  },
  {
    icon: LayoutDashboard,
    title: 'Quick Actions',
    description:
      'Add leave, report sickness, record lateness, add employee, view calendar — all from one quick-action panel on the dashboard.',
  },
  {
    icon: CalendarSync,
    title: 'Calendar Sync (iCal)',
    description:
      "One-click iCal feed URLs for Google Calendar, Outlook, and Apple Calendar. Personal or team-wide — always see who's off.",
  },
  {
    icon: AppWindow,
    title: 'PWA App',
    description:
      "Install Leavely on your phone's home screen for a native app experience. Works offline-ready with push-style notifications.",
  },
  {
    icon: BookOpen,
    title: 'Help Centre',
    description:
      '14 searchable user guides for managers and employees, built into the app. No external knowledge base or support tickets needed.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* ============================================================ */}
        {/* HERO — rich emerald/teal gradient with frosted preview       */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-teal-700 text-white">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute top-1/3 -left-32 w-[360px] h-[360px] rounded-full bg-teal-300/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-1/4 w-[280px] h-[280px] rounded-full bg-emerald-300/15 blur-3xl"
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: copy */}
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                  <Sparkles className="h-3 w-3" />
                  35+ features · one flat price
                </div>
                <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
                  Everything you need to manage your team&rsquo;s time.
                </h1>
                <p className="mt-5 text-lg md:text-xl text-emerald-50/90 leading-relaxed max-w-xl">
                  Holidays, sickness, TOIL, approvals, clashes, reports — Leavely is the full toolkit for UK teams. No tiers. No upsells. £8 per user, per month.
                </p>

                {/* Social proof + CTA row */}
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="text-base font-semibold px-7 h-12 bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-black/20"
                    >
                      Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                    <div className="flex -space-x-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
                      ))}
                    </div>
                    <span>Rated 4.9 by UK teams</span>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-50/90">
                  {['14-day free trial', 'No credit card', 'Set up in 2 minutes'].map((t) => (
                    <li key={t} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-200" aria-hidden />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Hero product preview — frosted calendar */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-white/10 to-transparent blur-xl"
                />
                <div className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-2xl shadow-black/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-white/80" />
                      <span className="text-xs font-semibold text-white/80">This week</span>
                    </div>
                    <span className="text-[10px] tracking-wide text-white/60">APR 20 – 26</span>
                  </div>
                  <div className="space-y-2">
                    <HeroRow colour="bg-emerald-400" name="Sarah — Annual leave" days="Mon – Wed" icon={<Plane className="h-3 w-3" />} />
                    <HeroRow colour="bg-amber-400" name="Tom — Sickness" days="Tue" icon={<Thermometer className="h-3 w-3" />} />
                    <HeroRow colour="bg-teal-300" name="Priya — Half day" days="Fri PM" icon={<CalendarDays className="h-3 w-3" />} />
                    <HeroRow colour="bg-sky-300" name="James — WFH" days="Thu" icon={<Smartphone className="h-3 w-3" />} />
                  </div>

                  {/* Mini KPI strip */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { label: 'Pending', value: '3' },
                      { label: 'Approved', value: '11' },
                      { label: 'Off today', value: '2' },
                    ].map((k) => (
                      <div
                        key={k.label}
                        className="rounded-lg bg-white/10 border border-white/15 px-3 py-2"
                      >
                        <div className="text-[10px] uppercase tracking-wide text-white/60">{k.label}</div>
                        <div className="text-lg font-bold text-white">{k.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating chip */}
                <div className="hidden md:flex absolute -bottom-4 -left-4 items-center gap-2 rounded-xl bg-white text-emerald-700 px-3 py-2 shadow-xl border border-white/40">
                  <Check className="h-4 w-4" />
                  <span className="text-xs font-semibold">Approved · 1 click</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom curve divider */}
          <div aria-hidden className="relative h-10">
            <div className="absolute inset-x-0 bottom-0 h-10 bg-white [clip-path:ellipse(75%_100%_at_50%_100%)]" />
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLUSTER NAVIGATION PILLS                                     */}
        {/* ============================================================ */}
        <section className="max-w-5xl mx-auto px-6 pt-2 pb-10 -mt-4 relative">
          <div className="rounded-2xl bg-white shadow-lg shadow-emerald-900/5 border border-gray-100 p-3 flex flex-wrap justify-center gap-2">
            {[
              { href: '#leave', label: 'Leave & Absence' },
              { href: '#sickness', label: 'Sickness & Attendance' },
              { href: '#team', label: 'Team & People' },
              { href: '#admin', label: 'Admin & Integrations' },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {c.label}
              </a>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLUSTER 1: LEAVE & ABSENCE — white bg, preview on right      */}
        {/* ============================================================ */}
        <section id="leave" className="max-w-6xl mx-auto px-6 pt-12 pb-20 md:pb-28 scroll-mt-20">
          <ClusterHeader
            eyebrow="Leave & Absence"
            title="Book, approve, track — in one place."
            subtitle="Every leave type, every policy, every balance — calculated automatically. No more spreadsheets, no more guesswork."
          />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-2 lg:order-1">
              <FeatureList items={leaveAndAbsence} />
            </div>
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <WeekCalendarPreview />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLUSTER 2: SICKNESS & ATTENDANCE — emerald gradient bg       */}
        {/* ============================================================ */}
        <section
          id="sickness"
          className="relative overflow-hidden scroll-mt-20 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white"
        >
          <div aria-hidden className="absolute -top-20 right-10 w-[320px] h-[320px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute bottom-0 -left-16 w-[280px] h-[280px] rounded-full bg-teal-300/15 blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
            <ClusterHeader
              eyebrow="Sickness & Attendance"
              title="Spot absence patterns before they hurt."
              subtitle="Bradford Factor scoring, return-to-work forms, clash detection — everything UK HR actually needs."
              onDark
            />
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <BradfordChartPreview />
              </div>
              <div>
                <FeatureList items={sicknessAndAttendance} onDark />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLUSTER 3: TEAM & PEOPLE — white bg, preview on left         */}
        {/* ============================================================ */}
        <section id="team" className="max-w-6xl mx-auto px-6 py-20 md:py-28 scroll-mt-20">
          <ClusterHeader
            eyebrow="Team & People"
            title="Your whole team, beautifully organised."
            subtitle="Directory, invites, self-service, service-based entitlement, delegations, offboarding — the people side, handled."
          />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <TeamDirectoryPreview />
            </div>
            <div>
              <FeatureList items={teamAndPeople} />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLUSTER 4: ADMIN & INTEGRATIONS — subtle grey bg             */}
        {/* ============================================================ */}
        <section
          id="admin"
          className="scroll-mt-20 bg-gradient-to-b from-gray-50 to-emerald-50/40 border-y border-gray-100"
        >
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <ClusterHeader
              eyebrow="Admin & Integrations"
              title="Ship it, log it, sync it."
              subtitle="Role-based permissions, privacy controls, full audit trail, iCal sync, installable PWA — enterprise muscle in a small-team package."
            />
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <FeatureList items={adminAndIntegrations} />
              </div>
              <div className="lg:sticky lg:top-24">
                <AuditLogPreview />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECURITY & COMPLIANCE — white                                 */}
        {/* ============================================================ */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-emerald-700">
              <Lock className="h-3 w-3" />
              Security &amp; compliance
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Your employee data, properly protected.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              GDPR-ready, encrypted in transit, no third-party tracking.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Encryption in Transit', desc: 'TLS on every connection' },
              { label: 'Hashed Passwords', desc: 'bcrypt with salt rounds' },
              { label: 'GDPR Compliant', desc: 'Full data export & deletion' },
              { label: 'Minimal Cookies', desc: 'Session only — no tracking' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:shadow-md hover:border-emerald-100 transition-all"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-3 shadow-md shadow-emerald-500/20">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* FROM OUR BLOG — subtle grey                                  */}
        {/* ============================================================ */}
        <section className="bg-gray-50/70 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Learn more from our blog
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Practical guides on leave management, absence tracking, and HR compliance for UK businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: '/blog/bradford-factor-explained', title: "Bradford Factor Explained: A Manager's Guide", desc: 'How Bradford Factor scores work and how to use them to reduce absence.' },
                { href: '/blog/employee-turnover-uk', title: 'Employee Turnover in the UK: Causes & Fixes', desc: 'Track headcount, leavers, and retention rate with data-driven reports.' },
                { href: '/blog/managing-long-term-sickness-uk', title: 'Managing Long-Term Sickness in the UK', desc: 'Fit notes, return-to-work interviews, and sickness reporting best practices.' },
                { href: '/blog/leave-clash-detection-software', title: 'Leave Clash Detection: Prevent Understaffing', desc: 'Real-time warnings when overlapping leave risks coverage gaps.' },
                { href: '/blog/approval-delegation-leave-management', title: 'Approval Delegation for Leave Management', desc: 'Keep approvals flowing when managers are away with temporary delegates.' },
                { href: '/blog/employee-self-service-hr', title: 'Employee Self-Service in HR Software', desc: 'Reduce admin by letting employees manage their own details.' },
                { href: '/blog/blackout-dates-leave-management', title: 'Blackout Dates for Leave Management', desc: 'Block leave during critical business periods with automatic enforcement.' },
                { href: '/blog/ical-calendar-sync-leave-management', title: 'iCal Calendar Sync for Leave', desc: "See who's off in Google Calendar, Outlook, or Apple Calendar." },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md hover:border-emerald-100 transition-all flex flex-col"
                >
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm mb-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{post.desc}</p>
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                    Read article <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FINAL CTA — rich emerald gradient                            */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700">
          <div aria-hidden className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-teal-300/15 blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-white">
              <Sparkles className="h-3 w-3" />
              Try every feature, free
            </div>
            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Start your 14-day free trial.
            </h2>
            <p className="mt-4 text-lg text-emerald-50 max-w-xl mx-auto">
              No credit card. Full access to all 35+ features. Set up your workspace in 2 minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-black/20"
                >
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold px-8 h-12 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white hover:border-white/60"
                >
                  See pricing
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/85">
              <div className="flex -space-x-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span>Rated 4.9 · £8 per user/month · UK support</span>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

/* =================================================================== */
/* Building blocks                                                     */
/* =================================================================== */

function ClusterHeader({
  eyebrow,
  title,
  subtitle,
  onDark = false,
}: {
  eyebrow: string
  title: string
  subtitle: string
  onDark?: boolean
}) {
  return (
    <div className="mb-12 md:mb-16 max-w-3xl">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${
          onDark
            ? 'bg-white/15 backdrop-blur-sm border border-white/20 text-white'
            : 'bg-emerald-50 border border-emerald-100 text-emerald-700'
        }`}
      >
        {eyebrow}
      </div>
      <h2
        className={`mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] ${
          onDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-lg leading-relaxed ${
          onDark ? 'text-emerald-50/90' : 'text-gray-500'
        }`}
      >
        {subtitle}
      </p>
    </div>
  )
}

function FeatureList({ items, onDark = false }: { items: FeatureItem[]; onDark?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((f) => (
        <div
          key={f.title}
          className={`rounded-2xl p-5 transition-all ${
            onDark
              ? 'bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15'
              : 'bg-white border border-gray-100 hover:shadow-md hover:border-emerald-100'
          }`}
        >
          <div
            className={`inline-flex items-center justify-center h-10 w-10 rounded-xl mb-3 ${
              onDark
                ? 'bg-white/15 text-white'
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
            }`}
          >
            <f.icon className="h-5 w-5" />
          </div>
          <h3 className={`font-bold mb-1 text-[15px] ${onDark ? 'text-white' : 'text-gray-900'}`}>
            {f.title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              onDark ? 'text-emerald-50/80' : 'text-gray-500'
            }`}
          >
            {f.description}
          </p>
        </div>
      ))}
    </div>
  )
}

function HeroRow({
  colour,
  name,
  days,
  icon,
}: {
  colour: string
  name: string
  days: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 border border-white/10">
      <span
        className={`h-2 w-2 rounded-full ${colour} shadow-[0_0_0_3px_rgba(255,255,255,0.12)]`}
      />
      <span className="text-[13px] font-medium text-white flex-1 truncate">{name}</span>
      <span className="flex items-center gap-1 text-[11px] text-white/70 shrink-0">
        {icon}
        {days}
      </span>
    </div>
  )
}

/* ============ Pure-CSS / SVG product previews ============ */

function WeekCalendarPreview() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const rows: {
    name: string
    initials: string
    colour: string
    span: [number, number]
    type: string
  }[] = [
    { name: 'Sarah Kent', initials: 'SK', colour: 'bg-emerald-500', span: [0, 2], type: 'Annual' },
    { name: 'Tom Reyes', initials: 'TR', colour: 'bg-amber-500', span: [1, 1], type: 'Sick' },
    { name: 'Priya Shah', initials: 'PS', colour: 'bg-teal-500', span: [4, 4], type: 'Half day' },
    { name: 'James Park', initials: 'JP', colour: 'bg-sky-500', span: [3, 3], type: 'WFH' },
    { name: 'Ava Lee', initials: 'AL', colour: 'bg-violet-500', span: [2, 4], type: 'Parental' },
  ]
  return (
    <div className="relative rounded-3xl bg-white border border-gray-100 p-5 shadow-xl shadow-emerald-900/5">
      <div aria-hidden className="absolute -top-3 -right-3 w-24 h-24 rounded-full bg-emerald-100/70 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">This week</span>
          </div>
          <span className="text-[10px] tracking-wide text-gray-400">APR 20 – 26</span>
        </div>

        <div className="grid grid-cols-[96px_repeat(5,1fr)] gap-1 mb-2">
          <div />
          {days.map((d, i) => (
            <div
              key={d}
              className={`text-center text-[10px] font-semibold py-1 rounded ${
                i === 1 ? 'bg-emerald-50 text-emerald-700' : 'text-gray-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[96px_repeat(5,1fr)] gap-1 items-center">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-[9px] font-bold">
                  {r.initials}
                </span>
                <span className="text-[11px] font-medium text-gray-700 truncate">{r.name}</span>
              </div>
              {days.map((_, i) => {
                const inSpan = i >= r.span[0] && i <= r.span[1]
                return (
                  <div key={i} className="h-6 rounded bg-gray-50 relative overflow-hidden">
                    {inSpan && (
                      <div
                        className={`absolute inset-0 ${r.colour} opacity-90 flex items-center justify-center`}
                      >
                        {i === r.span[0] && (
                          <span className="text-[8px] font-bold text-white uppercase tracking-wide px-1 truncate">
                            {r.type}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-3 text-[10px] text-gray-500">
          <LegendDot colour="bg-emerald-500" label="Annual" />
          <LegendDot colour="bg-amber-500" label="Sick" />
          <LegendDot colour="bg-teal-500" label="Half day" />
          <LegendDot colour="bg-sky-500" label="WFH" />
          <LegendDot colour="bg-violet-500" label="Parental" />
        </div>
      </div>
    </div>
  )
}

function LegendDot({ colour, label }: { colour: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${colour}`} />
      <span>{label}</span>
    </div>
  )
}

function BradfordChartPreview() {
  const employees: { name: string; score: number; level: 'ok' | 'warn' | 'high' }[] = [
    { name: 'Sarah Kent', score: 12, level: 'ok' },
    { name: 'Tom Reyes', score: 48, level: 'warn' },
    { name: 'Priya Shah', score: 8, level: 'ok' },
    { name: 'James Park', score: 128, level: 'high' },
    { name: 'Ava Lee', score: 27, level: 'ok' },
    { name: 'Ben Wood', score: 72, level: 'warn' },
  ]
  const max = 160
  const levelColour = (l: 'ok' | 'warn' | 'high') =>
    l === 'high' ? 'bg-rose-500' : l === 'warn' ? 'bg-amber-500' : 'bg-emerald-500'
  const levelLabel = (l: 'ok' | 'warn' | 'high') =>
    l === 'high' ? 'High' : l === 'warn' ? 'Watch' : 'OK'
  const levelPill = (l: 'ok' | 'warn' | 'high') =>
    l === 'high'
      ? 'bg-rose-50 text-rose-700 border-rose-100'
      : l === 'warn'
        ? 'bg-amber-50 text-amber-700 border-amber-100'
        : 'bg-emerald-50 text-emerald-700 border-emerald-100'

  return (
    <div className="relative rounded-3xl bg-white border border-gray-100 p-5 shadow-xl shadow-black/10">
      <div aria-hidden className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-amber-200/60 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-rose-500" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Bradford Factor</span>
          </div>
          <span className="text-[10px] tracking-wide text-gray-400">LAST 12 MONTHS</span>
        </div>

        <div className="space-y-2.5">
          {employees.map((e) => {
            const pct = Math.min(100, (e.score / max) * 100)
            return (
              <div key={e.name} className="grid grid-cols-[90px_1fr_56px] gap-3 items-center">
                <span className="text-[11px] font-medium text-gray-700 truncate">{e.name}</span>
                <div className="h-4 rounded-full bg-gray-100 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${levelColour(e.level)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[11px] font-bold text-gray-900 tabular-nums">{e.score}</span>
                  <span
                    className={`text-[9px] font-semibold rounded-full border px-1.5 py-0.5 ${levelPill(e.level)}`}
                  >
                    {levelLabel(e.level)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150+</span>
        </div>

        <div className="mt-3 text-[11px] text-gray-500 leading-relaxed">
          Bradford = S² × D. One-click drill into any spike to see the underlying absences.
        </div>
      </div>
    </div>
  )
}

function TeamDirectoryPreview() {
  const people: {
    name: string
    role: string
    dept: string
    initials: string
    tint: string
    service: string
    status: 'active' | 'away'
  }[] = [
    { name: 'Sarah Kent', role: 'Managing Director', dept: 'Leadership', initials: 'SK', tint: 'from-emerald-500 to-teal-600', service: '6y 2m', status: 'away' },
    { name: 'Tom Reyes', role: 'HR Manager', dept: 'People', initials: 'TR', tint: 'from-amber-500 to-orange-600', service: '3y 7m', status: 'active' },
    { name: 'Priya Shah', role: 'Engineering Lead', dept: 'Engineering', initials: 'PS', tint: 'from-violet-500 to-purple-600', service: '4y 11m', status: 'active' },
    { name: 'James Park', role: 'Account Executive', dept: 'Sales', initials: 'JP', tint: 'from-sky-500 to-blue-600', service: '1y 3m', status: 'active' },
  ]
  return (
    <div className="relative rounded-3xl bg-white border border-gray-100 p-5 shadow-xl shadow-emerald-900/5">
      <div aria-hidden className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-teal-100/70 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Team directory</span>
          </div>
          <span className="text-[10px] tracking-wide text-gray-400">12 ACTIVE</span>
        </div>

        <div className="space-y-2">
          {people.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50/70 transition-colors"
            >
              <div className="relative shrink-0">
                <span
                  className={`inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${p.tint} text-white text-xs font-bold`}
                >
                  {p.initials}
                </span>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${
                    p.status === 'away' ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-gray-900 truncate">{p.name}</span>
                  <span className="text-[9px] font-semibold rounded-full border bg-gray-50 border-gray-100 text-gray-500 px-1.5 py-0.5">
                    {p.dept}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="truncate">{p.role}</span>
                  <span>·</span>
                  <span className="shrink-0">{p.service} service</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[10px] uppercase tracking-wide text-gray-400">Leave</div>
                <div className="text-[11px] font-semibold text-emerald-600">+3 days</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>1 pending invite</span>
          </div>
          <span className="font-semibold text-emerald-700">Invite teammate →</span>
        </div>
      </div>
    </div>
  )
}

function AuditLogPreview() {
  const entries: { who: string; action: string; target: string; when: string; tone: 'ok' | 'warn' | 'info' }[] = [
    { who: 'Sarah Kent', action: 'approved', target: "Tom's annual leave (Apr 22 – 26)", when: '2m ago', tone: 'ok' },
    { who: 'Bob Chen', action: 'updated policy', target: 'Annual Leave → 28 days', when: '14m ago', tone: 'info' },
    { who: 'Carol Williams', action: 'rejected', target: "Priya's leave (clashes with Ava)", when: '1h ago', tone: 'warn' },
    { who: 'System', action: 'synced', target: 'UK bank holidays · 2026', when: '3h ago', tone: 'info' },
    { who: 'Dave Kumar', action: 'requested', target: 'Sick leave · 1 day', when: '5h ago', tone: 'info' },
  ]
  const tonePill = (t: 'ok' | 'warn' | 'info') =>
    t === 'ok'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
      : t === 'warn'
        ? 'bg-rose-50 text-rose-700 border-rose-100'
        : 'bg-sky-50 text-sky-700 border-sky-100'
  return (
    <div className="relative rounded-3xl bg-white border border-gray-100 p-5 shadow-xl shadow-black/10">
      <div aria-hidden className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-emerald-100/70 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Audit log</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="space-y-2.5">
          {entries.map((e, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span
                className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  e.tone === 'ok' ? 'bg-emerald-500' : e.tone === 'warn' ? 'bg-rose-500' : 'bg-sky-500'
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-gray-700 leading-snug">
                  <span className="font-semibold text-gray-900">{e.who}</span>{' '}
                  <span
                    className={`font-semibold rounded px-1 py-0.5 text-[10px] border ${tonePill(e.tone)}`}
                  >
                    {e.action}
                  </span>{' '}
                  <span className="text-gray-600">{e.target}</span>
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">{e.when}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>Every action logged · immutable</span>
          </div>
          <span className="font-semibold text-emerald-700">Export CSV →</span>
        </div>
      </div>
    </div>
  )
}

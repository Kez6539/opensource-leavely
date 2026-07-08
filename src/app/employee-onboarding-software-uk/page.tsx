import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  ClipboardList,
  Users,
  ListChecks,
  Bell,
  FileCheck2,
  Repeat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/employee-onboarding-software-uk`

export const metadata: Metadata = {
  title: 'Employee Onboarding Software UK: Checklists & Task Assignment (2026)',
  description:
    'Employee onboarding software for UK businesses. Create onboarding templates, assign tasks to HR, managers, IT, and new starters. Track completion and never miss a step. Part of Leavely at £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'employee onboarding software UK',
    'onboarding checklist software',
    'new starter onboarding tool',
    'HR onboarding software',
    'onboarding task management',
    'staff onboarding software UK',
  ],
  openGraph: {
    title: 'Employee Onboarding Software UK — Leavely',
    description:
      'Create onboarding templates, assign tasks, and track completion. Part of Leavely at £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How do onboarding templates work in Leavely?',
    a: 'You create a reusable onboarding template with a list of tasks. Each task is assigned to a role (HR, manager, IT, or the new employee) and has a description and optional due date. When a new employee joins, you apply the template to them and Leavely creates all the tasks automatically. Each person assigned a task sees it in their dashboard.',
  },
  {
    q: 'Can I assign tasks to different people?',
    a: 'Yes. Onboarding tasks can be assigned to HR (e.g. send contract, set up payroll), the manager (e.g. schedule induction meeting, set first-week goals), IT (e.g. create email account, order laptop), or the new employee themselves (e.g. complete tax forms, read handbook). Each person only sees the tasks assigned to them.',
  },
  {
    q: 'How do I track onboarding completion?',
    a: 'Leavely shows a progress bar for each new starter. You can see which tasks are done, which are pending, and who is responsible for the outstanding items. This makes it easy to chase up anything that is running late before the employee s start date.',
  },
  {
    q: 'Is onboarding included in the £8/user/month price?',
    a: 'Yes. Onboarding checklists and task management are included in the standard Leavely plan. There are no add-on fees. You also get leave management, rota planning, time tracking, performance reviews, and expenses in the same price.',
  },
  {
    q: 'Can I use different templates for different roles?',
    a: 'Yes. You can create multiple onboarding templates for different departments, roles, or office locations. For example, a template for office staff might include desk setup and building access, while a template for remote workers might include VPN setup and equipment delivery tracking.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Employee Onboarding Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Employee onboarding software for UK businesses. Create templates, assign tasks to HR, managers, and IT, and track completion. Part of Leavely HR platform.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly. 14-day free trial included.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

const features = [
  {
    icon: ClipboardList,
    title: 'Reusable templates',
    description: 'Create onboarding templates once, use them every time someone joins. Different templates for different roles, departments, or locations. Update the template and all future onboardings use the new version.',
  },
  {
    icon: Users,
    title: 'Multi-person task assignment',
    description: 'Assign tasks to HR, the line manager, IT, or the new employee. Each person sees only their tasks and gets notified when something needs their attention.',
  },
  {
    icon: ListChecks,
    title: 'Completion tracking',
    description: 'See a progress bar for each new starter. Know exactly which tasks are done, which are pending, and who is responsible. No more chasing people to find out if the laptop was ordered.',
  },
  {
    icon: Bell,
    title: 'Deadline reminders',
    description: 'Set due dates on tasks and Leavely sends reminders when deadlines approach. Critical tasks like sending the contract or completing right-to-work checks never slip through the cracks.',
  },
  {
    icon: FileCheck2,
    title: 'Task descriptions and notes',
    description: 'Each task includes a description explaining what needs to be done and space for notes. The person who completes the task can add comments or confirmation details.',
  },
  {
    icon: Repeat,
    title: 'Part of your HR platform',
    description: 'Onboarding feeds into everything else. When onboarding is complete, the employee already has their leave policies set up, their rota assigned, and their manager linked. No duplicate data entry.',
  },
]

export default function EmployeeOnboardingSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=employee_onboarding_software_uk'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <Zap className="h-4 w-4" />
                Employee onboarding software
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Employee Onboarding Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Never forget a step when bringing a new employee on board. Create reusable onboarding templates, assign tasks to HR, managers, IT, and the new starter, and track completion from a single dashboard. Part of Leavely alongside leave management, rotas, and expenses at £8 per user per month.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Templates</p>
                  <p className="text-sm text-gray-500">reusable checklists</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Track</p>
                  <p className="text-sm text-gray-500">every task</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Everything you need for smooth onboarding
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Replace spreadsheets and email chains with structured onboarding that everyone can follow.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example checklist */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              Example onboarding checklist
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              Here is what a typical onboarding template looks like in Leavely. You can customise it to match your process.
            </p>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden max-w-2xl mx-auto">
              {[
                { task: 'Send employment contract', assignee: 'HR', done: true },
                { task: 'Complete right-to-work check', assignee: 'HR', done: true },
                { task: 'Set up payroll', assignee: 'HR', done: true },
                { task: 'Create email account', assignee: 'IT', done: true },
                { task: 'Order laptop and equipment', assignee: 'IT', done: false },
                { task: 'Schedule induction meeting', assignee: 'Manager', done: false },
                { task: 'Set up first-week goals', assignee: 'Manager', done: false },
                { task: 'Complete tax declaration form', assignee: 'Employee', done: false },
                { task: 'Read employee handbook', assignee: 'Employee', done: false },
                { task: 'Complete health and safety training', assignee: 'Employee', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3 border-b last:border-b-0">
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                    {item.done && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <span className={`text-sm flex-1 ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.task}</span>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{item.assignee}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">This is an example template. You can create your own with any tasks, assignments, and due dates.</p>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Never miss an onboarding step again
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Create your first onboarding template in minutes. Assign tasks. Track completion. All included at £8 per user per month.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-12">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why not standalone */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why onboarding works better inside your HR platform
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Onboarding connects to everything else', description: 'When onboarding is complete, the new employee already has their leave policies assigned, their manager linked, and their rota set up. There is no duplicate data entry and no gap between onboarding and day-to-day operations.' },
                { title: 'One tool instead of a project management app', description: 'Some businesses use Trello, Asana, or a spreadsheet for onboarding. That means another tool to learn, another login, and another subscription. Leavely handles onboarding inside the same platform your team uses for leave and rotas.' },
                { title: 'Consistency across every new hire', description: 'Templates ensure every new employee gets the same experience. Nothing gets forgotten because someone was busy that week. The checklist is the same whether you hire one person or ten.' },
                { title: 'Compliance tasks are tracked', description: 'Right-to-work checks, contract signing, tax declarations, and health and safety training are all tracked with due dates. If something is overdue, you see it immediately. This helps with audit trails and legal compliance.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white shadow-sm">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Onboarding checklists, leave management, rotas, and more. All for £8 per user per month. No credit card needed.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}

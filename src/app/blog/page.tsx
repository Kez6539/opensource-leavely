import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { BlogFilter } from './blog-filter'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Blog — Leave Management Guides & HR Resources for UK Employers',
  description:
    'Practical guides on UK leave management, annual leave entitlement, maternity & paternity leave, Bradford Factor, sick leave policies, TOIL, and HR best practices for small businesses.',
  alternates: { canonical: `${SITE_URL}/blog` },
  keywords: [
    'leave management blog',
    'HR guides UK',
    'annual leave guide',
    'absence management UK',
    'leave policy templates',
    'UK employment law guides',
  ],
  openGraph: {
    title: 'Leavely Blog — Leave Management Guides for UK Businesses',
    description:
      'Practical guides on annual leave, maternity leave, sick leave, Bradford Factor, TOIL, and more for UK employers.',
    url: `${SITE_URL}/blog`,
  },
}

const posts = [
  // Featured
  {
    slug: 'bank-holidays-uk-2026',
    title: 'UK Bank Holidays 2026: Complete List for Employers',
    description: 'Full list of 2026 bank holidays for England, Wales, Scotland, and Northern Ireland with employer guidance.',
    category: 'Reference',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'annual-leave-entitlement-uk',
    title: 'Annual Leave Entitlement in the UK: The Complete Guide for 2026',
    description: 'Statutory annual leave, pro-rata calculations, bank holidays, carry-over rules, and common employer mistakes.',
    category: 'HR Guide',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'maternity-leave-uk',
    title: 'Maternity Leave UK: Complete Employer Guide (2026)',
    description: 'SMP rates, eligibility, KIT days, employee rights, and managing maternity absence.',
    category: 'HR Guide',
    readTime: '10 min read',
    featured: true,
  },

  // Leave types
  {
    slug: 'paternity-leave-uk',
    title: 'Paternity Leave UK: Rights, Pay & Employer Guide (2026)',
    description: 'Paternity leave entitlement, statutory paternity pay, eligibility, and shared parental leave.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'shared-parental-leave-uk',
    title: 'Shared Parental Leave UK: How It Works (2026 Guide)',
    description: 'How SPL works, eligibility, ShPP rates, notice requirements, SPLIT days, and booking leave.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'adoption-leave-uk',
    title: 'Adoption Leave UK: Entitlement, Pay & Employer Guide (2026)',
    description: 'Adoption leave rights, SAP rates, eligibility, KIT days, and surrogacy leave.',
    category: 'HR Guide',
    readTime: '8 min read',
  },
  {
    slug: 'sick-leave-policy-uk',
    title: 'Sick Leave Policy UK: What Employers Must Know (2026 Guide)',
    description: 'SSP rates, fit notes, reporting procedures, Bradford Factor, and managing long-term sickness.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'compassionate-leave-uk',
    title: 'Compassionate Leave UK: Employer Guide (2026)',
    description: 'Compassionate leave rights, bereavement leave, and how to create a policy for your business.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'parental-bereavement-leave-uk',
    title: "Parental Bereavement Leave UK (Jack's Law): Complete Guide",
    description: "Jack's Law explained — entitlement, pay, notice, and employer obligations for child bereavement.",
    category: 'HR Guide',
    readTime: '6 min read',
  },
  {
    slug: 'toil-policy-uk',
    title: 'TOIL Policy UK: Time Off in Lieu Explained (2026 Guide)',
    description: 'How TOIL works in UK employment law, policy creation, tracking, and common pitfalls.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'unpaid-leave-uk',
    title: 'Unpaid Leave UK: Employer Guide to Rules & Policies',
    description: 'Statutory and discretionary unpaid leave, parental leave, time off for dependants, and policy design.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'study-leave-policy-uk',
    title: 'Study Leave UK: Employer Guide to Time Off for Training',
    description: 'Study leave entitlement, training rights, policy design, and clawback clauses.',
    category: 'HR Guide',
    readTime: '6 min read',
  },
  {
    slug: 'jury-service-leave-uk',
    title: 'Jury Service Leave UK: Employer Rights & Obligations',
    description: 'Legal obligations, pay, deferral, and how to manage jury duty absence.',
    category: 'HR Guide',
    readTime: '5 min read',
  },
  {
    slug: 'garden-leave-uk',
    title: 'Garden Leave UK: How It Works & What Employers Need to Know',
    description: 'Garden leave clauses, employee rights, holiday accrual, and restrictive covenants.',
    category: 'HR Guide',
    readTime: '6 min read',
  },

  // Absence & compliance
  {
    slug: 'bradford-factor-explained',
    title: 'Bradford Factor Explained: How to Calculate and Use It',
    description: 'What the Bradford Factor is, how to calculate it, trigger points, and best practices.',
    category: 'Absence Management',
    readTime: '6 min read',
  },
  {
    slug: 'absence-management-policy-uk',
    title: 'Absence Management Policy UK: Complete Guide & Template',
    description: 'How to create an absence management policy with trigger points, formal stages, and a free template.',
    category: 'HR Guide',
    readTime: '10 min read',
  },
  {
    slug: 'return-to-work-interview-questions',
    title: 'Return-to-Work Interview Questions: Free Template for UK Employers',
    description: 'Free RTW interview template with questions, best practices, and documentation tips.',
    category: 'HR Template',
    readTime: '6 min read',
  },
  {
    slug: 'phased-return-to-work-uk',
    title: 'Phased Return to Work UK: How to Manage It Properly',
    description: 'Phased return plans, fit notes, reasonable adjustments, and pay considerations.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'occupational-sick-pay-uk',
    title: 'Company Sick Pay UK: Should You Offer More Than SSP?',
    description: 'Occupational sick pay schemes, cost considerations, and designing an enhanced policy.',
    category: 'HR Guide',
    readTime: '7 min read',
  },

  // Calculations & entitlements
  {
    slug: 'pro-rata-annual-leave-calculator',
    title: 'How to Calculate Pro Rata Annual Leave UK (2026 Guide + Examples)',
    description: 'Step-by-step formulas and worked examples for part-time leave calculations.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'holiday-pay-calculation-uk',
    title: 'Holiday Pay Calculation UK: How to Get It Right (2026 Guide)',
    description: 'Holiday pay rules, variable hours, overtime, rolled-up holiday pay, and common mistakes.',
    category: 'HR Guide',
    readTime: '8 min read',
  },
  {
    slug: 'carry-over-annual-leave-uk',
    title: 'Carry Over Annual Leave UK: Rules Employers Must Know',
    description: 'Carry-over rules, use-it-or-lose-it policies, and payment in lieu calculations.',
    category: 'HR Guide',
    readTime: '6 min read',
  },
  {
    slug: 'annual-leave-during-notice-period-uk',
    title: 'Annual Leave During Notice Period UK: Rules for Employers',
    description: 'Can employees take leave during notice? Can you force them to? Rules and best practice.',
    category: 'HR Guide',
    readTime: '6 min read',
  },

  // Employment law & compliance
  {
    slug: 'working-time-regulations-uk',
    title: 'Working Time Regulations UK: Employer Guide (2026)',
    description: '48-hour week, rest breaks, opt-out agreements, night work, and record keeping.',
    category: 'HR Guide',
    readTime: '8 min read',
  },
  {
    slug: 'part-time-workers-rights-uk',
    title: "Part-Time Workers' Rights UK: Leave, Pay & Employer Obligations",
    description: 'Part-Time Workers Regulations, pro rata benefits, discrimination risks, and compliance.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'flexible-working-uk',
    title: 'Flexible Working UK: Right to Request Guide for Employers (2026)',
    description: 'Day-one right to request, types of flexible working, employer obligations, and handling requests.',
    category: 'HR Guide',
    readTime: '8 min read',
  },

  // Policies & templates
  {
    slug: 'leave-policy-template-uk',
    title: 'How to Create a Leave Policy UK: Free Template & Guide (2026)',
    description: 'Step-by-step guide with free leave policy template covering all leave types.',
    category: 'HR Guide',
    readTime: '10 min read',
  },

  // People strategy
  {
    slug: 'employee-wellbeing-strategy',
    title: 'Employee Wellbeing Strategy UK: A Practical Guide for SMBs',
    description: 'Physical, mental, and financial wellbeing — practical actions for small businesses.',
    category: 'People Strategy',
    readTime: '8 min read',
  },
  {
    slug: 'duvet-days-policy',
    title: 'Duvet Days: Should Your Business Offer Them? (UK Guide)',
    description: 'What duvet days are, pros and cons, and how to set up a policy.',
    category: 'People Strategy',
    readTime: '5 min read',
  },
  {
    slug: 'sabbatical-leave-uk',
    title: 'Sabbatical Leave UK: How to Create a Policy That Works',
    description: 'Sabbatical policies, paid vs unpaid, benefits, risks, and key policy elements.',
    category: 'People Strategy',
    readTime: '6 min read',
  },
  {
    slug: 'managing-remote-workers-leave',
    title: 'Managing Leave for Remote Workers: UK Employer Guide',
    description: 'Challenges, best practices, and tools for managing leave in remote and hybrid teams.',
    category: 'HR Guide',
    readTime: '6 min read',
  },

  // Seasonal & topical
  {
    slug: 'summer-holiday-management-uk',
    title: 'Managing Summer Holidays: How UK Employers Can Avoid Chaos',
    description: 'Peak leave season challenges, blackout periods, fairness, and communication tips.',
    category: 'HR Guide',
    readTime: '7 min read',
  },
  {
    slug: 'christmas-shutdown-leave-uk',
    title: 'Christmas Shutdown & Leave UK: Employer Guide (2026)',
    description: 'Can employers force leave during Christmas? Shutdown policies, notice requirements, and part-timer impact.',
    category: 'HR Guide',
    readTime: '6 min read',
  },
  {
    slug: 'mental-health-days-uk',
    title: 'Mental Health Days at Work UK: Should Employers Offer Them?',
    description: 'Growing trend, legal position, sick leave vs mental health days, and policy design.',
    category: 'People Strategy',
    readTime: '7 min read',
  },
  {
    slug: 'unlimited-leave-policy-uk',
    title: 'Unlimited Annual Leave UK: Does It Actually Work?',
    description: 'Pros, cons, UK legal considerations, and how to implement an unlimited leave policy.',
    category: 'People Strategy',
    readTime: '8 min read',
  },
  {
    slug: 'leave-management-for-startups',
    title: 'Leave Management for UK Startups: What You Need from Day One',
    description: 'Minimum legal requirements, when to move from spreadsheets, and common startup mistakes.',
    category: 'HR Guide',
    readTime: '6 min read',
  },

  // Software guides
  {
    slug: 'best-leave-management-software-uk',
    title: 'Best Leave Management Software UK 2026: What to Look For',
    description: 'Key features, pricing, red flags, and what separates good tools from great ones.',
    category: 'Software Guide',
    readTime: '7 min read',
  },
  {
    slug: 'hr-software-small-business-uk',
    title: 'HR Software for Small Businesses UK: What You Actually Need (2026)',
    description: 'Core features, pricing expectations, red flags, and how to evaluate HR platforms.',
    category: 'Software Guide',
    readTime: '8 min read',
  },
  {
    slug: 'best-rota-software-uk',
    title: 'Best Rota Software UK 2026: Top 8 Staff Scheduling Tools Compared',
    description: 'Compare the best rota and shift scheduling tools for UK businesses, including pricing, features, and pros and cons.',
    category: 'Software Guide',
    readTime: '10 min read',
  },
  {
    slug: 'expense-management-small-business-uk',
    title: 'Expense Management for Small Business UK: Complete 2026 Guide',
    description: 'HMRC rules, expense policies, receipt requirements, and the best expense management tools for UK SMBs.',
    category: 'Software Guide',
    readTime: '11 min read',
  },
  {
    slug: 'employee-performance-management-software-uk',
    title: 'Employee Performance Management Software UK 2026: Best Tools for SMBs',
    description: 'Goal setting, progress tracking, reviews, and the best performance management tools for UK small businesses.',
    category: 'Software Guide',
    readTime: '11 min read',
  },
  {
    slug: 'switch-from-brighthr',
    title: 'How to Switch from BrightHR: Migration Guide for UK Businesses (2026)',
    description: 'Step-by-step guide to migrating from BrightHR to Leavely, with cost comparisons and a switching checklist.',
    category: 'Migration Guide',
    readTime: '12 min read',
  },
  {
    slug: 'staff-holiday-tracker-uk',
    title: 'Staff Holiday Tracker UK 2026: Stop Using Spreadsheets',
    description: 'Why spreadsheets fail for leave tracking, what to look for in a holiday tracker, and how to switch.',
    category: 'Software Guide',
    readTime: '10 min read',
  },
  {
    slug: 'employee-onboarding-checklist-uk',
    title: 'Employee Onboarding Checklist UK 2026: Complete HR Guide + Free Template',
    description: 'Legal requirements, 5-phase checklist, common mistakes, and how to digitise onboarding for UK businesses.',
    category: 'HR Guide',
    readTime: '11 min read',
  },
  {
    slug: 'statutory-sick-pay-uk',
    title: 'Statutory Sick Pay (SSP) UK 2026: Complete Employer Guide',
    description: 'SSP rates, eligibility, the 3 waiting days rule, calculating SSP for part-time workers, and common employer mistakes.',
    category: 'Employment Law',
    readTime: '12 min read',
  },
  {
    slug: 'time-off-for-dependants-uk',
    title: 'Time Off for Dependants UK: Complete Employer Guide (2026)',
    description: 'Statutory rights under the Employment Rights Act, what counts as a dependant, reasonable time off, and the new Carer\'s Leave Act.',
    category: 'Employment Law',
    readTime: '10 min read',
  },
  {
    slug: 'shift-worker-holiday-entitlement-uk',
    title: 'Shift Worker Holiday Entitlement UK: How to Calculate Leave for Irregular Hours',
    description: 'Hours-based vs days-based accrual, the 12.07% method, night shift calculations, and the Harpur Trust ruling.',
    category: 'Leave Calculations',
    readTime: '11 min read',
  },
  {
    slug: 'agency-worker-holiday-rights-uk',
    title: 'Agency Worker Holiday Rights UK: Entitlement, Pay & The 12-Week Rule',
    description: 'Agency Workers Regulations 2010, the 12-week qualifying period, rolled-up holiday pay, and record-keeping obligations.',
    category: 'Employment Law',
    readTime: '10 min read',
  },
  {
    slug: 'fit-notes-employer-guide-uk',
    title: 'Fit Notes (Statement of Fitness for Work): Complete UK Employer Guide',
    description: 'When fit notes are needed, who can issue them, the 4 types of adjustments, digital fit notes, and GDPR considerations.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'disability-leave-adjustments-uk',
    title: 'Managing Leave for Employees with Disabilities: UK Employer Guide',
    description: 'Equality Act 2010, reasonable adjustments for leave, disability-related absence vs general sickness, and tribunal risks.',
    category: 'Employment Law',
    readTime: '10 min read',
  },
  {
    slug: 'zero-hour-contract-holiday-uk',
    title: 'Zero-Hour Contract Holiday Entitlement UK: Complete Calculation Guide',
    description: 'The 12.07% accrual method, rolled-up holiday pay, Harpur Trust ruling, and calculating leave for casual workers.',
    category: 'Leave Calculations',
    readTime: '10 min read',
  },
  {
    slug: 'night-shift-workers-rights-uk',
    title: 'Night Shift Workers\' Rights UK: Rest Breaks, Holiday & Health Assessments',
    description: 'Working Time Regulations for night workers, 8-hour maximum, mandatory health assessments, and rest break rules.',
    category: 'Employment Law',
    readTime: '10 min read',
  },
  {
    slug: 'holiday-pay-during-notice-period-uk',
    title: 'Holiday Pay During Notice Period UK: Calculation, Rights & Common Mistakes',
    description: 'Can employees take holiday during notice? Accrued holiday on termination, payment in lieu, and garden leave.',
    category: 'Leave Calculations',
    readTime: '9 min read',
  },
  {
    slug: 'bereavement-leave-policy-uk',
    title: 'Bereavement Leave Policy UK: Free Template, Legal Rights & Best Practice',
    description: 'Jack\'s Law, compassionate leave entitlements, policy template, and returning to work after bereavement.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'redundancy-annual-leave-uk',
    title: 'Annual Leave and Redundancy UK: Payment, Accrual & Employee Rights',
    description: 'Holiday accrual during notice, payment in lieu, forcing holiday during redundancy, and calculating pro-rata entitlement.',
    category: 'Employment Law',
    readTime: '10 min read',
  },
  {
    slug: 'employee-handbook-uk',
    title: 'Employee Handbook UK: What to Include (2026 Template Guide)',
    description: 'Legally required policies, recommended sections, common mistakes, and a section-by-section template for UK employers.',
    category: 'HR Guide',
    readTime: '12 min read',
  },
  {
    slug: 'hr-compliance-checklist-uk',
    title: 'HR Compliance Checklist UK 2026: The Complete Audit Guide for Small Businesses',
    description: 'Essential employment law checklist covering contracts, right to work, leave, pay, H&S, GDPR, and discrimination.',
    category: 'HR Guide',
    readTime: '11 min read',
  },
  {
    slug: 'acas-early-conciliation-uk',
    title: 'ACAS Early Conciliation: What Employers Need to Know (2026 Guide)',
    description: 'The mandatory pre-tribunal process, settlement agreements, costs of defending a claim, and how audit trails protect you.',
    category: 'Employment Law',
    readTime: '10 min read',
  },

  // Charity posts
  {
    slug: 'leave-management-for-charities-uk',
    title: 'Leave Management for UK Charities: A Complete Guide (2026)',
    description: 'How UK charities can manage staff leave effectively. Covers statutory entitlements, part-time pro-rating, volunteers, and charity leave management software.',
    category: 'Industry Guide',
    readTime: '10 min read',
  },
  {
    slug: 'charity-hr-software-uk',
    title: 'Best HR Software for UK Charities (2026 Guide)',
    description: 'Compare the best HR software for UK charities in 2026. Covers Leavely, BrightHR, Breathe HR, CharlieHR, and Bob with pricing, features, and charity discounts.',
    category: 'Software Guide',
    readTime: '10 min read',
  },
  {
    slug: 'charity-absence-management',
    title: 'Absence Management for Charities: Reducing Costs Without Losing Compassion',
    description: 'How charities can manage employee absence fairly and affordably. Bradford Factor, return-to-work interviews, flexible working, and charity-specific absence policies.',
    category: 'Industry Guide',
    readTime: '9 min read',
  },
  {
    slug: 'small-charity-staff-management',
    title: 'Staff Management for Small Charities: A Practical Guide (2026)',
    description: 'How to manage staff in a small charity with 5-50 employees. Leave tracking, absence monitoring, GDPR compliance, and affordable HR tools.',
    category: 'Industry Guide',
    readTime: '9 min read',
  },
  {
    slug: 'volunteer-vs-employee-leave-rights-uk',
    title: 'Volunteers vs Employees: Leave Rights Explained (UK 2026)',
    description: 'Do volunteers get annual leave? Understand the difference between volunteer, worker, and employee leave rights in UK charities and CICs.',
    category: 'Employment Law',
    readTime: '8 min read',
  },

  // New feature posts
  {
    slug: 'leave-clash-detection-software',
    title: 'Leave Clash Detection: How to Prevent Understaffing (2026 Guide)',
    description: 'How department-level leave clash detection prevents understaffing. Real-time warnings, self-overlap blocking, and UK duty of care considerations.',
    category: 'Feature Guide',
    readTime: '9 min read',
  },
  {
    slug: 'blackout-dates-leave-management',
    title: 'Blackout Dates for Leave Management: Block Leave During Busy Periods',
    description: 'How to use blackout dates to restrict leave during critical business periods. Legal position, communication tips, and automatic enforcement.',
    category: 'Feature Guide',
    readTime: '8 min read',
  },
  {
    slug: 'approval-delegation-leave-management',
    title: 'Leave Approval Delegation: Keep Approvals Moving When Managers Are Away',
    description: 'How approval delegation prevents leave request bottlenecks. Set temporary delegates, automatic routing, and best practices.',
    category: 'Feature Guide',
    readTime: '8 min read',
  },
  {
    slug: 'length-of-service-entitlement-uk',
    title: 'Length of Service Entitlement UK: Extra Holiday Days for Long-Serving Staff',
    description: 'How to award extra holiday days based on years of service. Common UK structures, legal position, retention benefits, and automated calculation.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'ical-calendar-sync-leave-management',
    title: 'iCal Calendar Sync for Leave Management: See Who\'s Off in Google Calendar & Outlook',
    description: 'How iCal calendar sync works for leave management. Subscribe to team absence feeds in Google Calendar, Outlook, or Apple Calendar.',
    category: 'Feature Guide',
    readTime: '8 min read',
  },
  {
    slug: 'accrual-based-leave-uk',
    title: 'Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance (2026 Guide)',
    description: 'How accrual-based leave works in the UK. Monthly leave accrual vs upfront allowance, worked examples, and legal position.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'employee-self-service-hr',
    title: 'Employee Self-Service in HR Software: Reduce Admin and Empower Your Team',
    description: 'What is employee self-service (ESS) in HR software? Benefits, security considerations, and how ESS reduces HR admin.',
    category: 'Feature Guide',
    readTime: '8 min read',
  },
  {
    slug: 'minimum-notice-period-leave-requests',
    title: 'Minimum Notice Period for Leave Requests: How Much Notice Should Employees Give?',
    description: 'UK rules on minimum notice periods for annual leave requests. Employment Rights Act 1996, typical policies, and fair enforcement.',
    category: 'HR Guide',
    readTime: '9 min read',
  },

  // HR compliance & how-to guides
  {
    slug: 'right-to-work-checks-uk',
    title: 'Right to Work Checks UK: Employer Guide (2026)',
    description: 'How to conduct right to work checks, acceptable documents, digital verification, and penalties for non-compliance.',
    category: 'HR Guide',
    readTime: '8 min read',
  },
  {
    slug: 'disciplinary-procedure-uk',
    title: 'Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)',
    description: 'ACAS code of practice, investigation, hearings, outcomes, appeals, and common mistakes employers make.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
  {
    slug: 'how-to-calculate-holiday-entitlement-uk',
    title: 'How to Calculate Holiday Entitlement UK: Step-by-Step (2026)',
    description: 'Statutory 5.6 weeks explained with worked examples for full-time, part-time, starters, and leavers.',
    category: 'HR Guide',
    readTime: '8 min read',
  },
  {
    slug: 'employment-contract-template-uk',
    title: 'Employment Contract Template UK: What Must Be Included (2026)',
    description: 'Legal requirements for UK employment contracts, key clauses, holiday entitlement, notice periods, and probation.',
    category: 'HR Guide',
    readTime: '9 min read',
  },
]

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      <main>
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-8 md:pt-28">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Practical guides on leave management, HR compliance, and absence tracking for UK businesses.
          </p>
        </section>

        {/* Featured articles */}
        <section className="max-w-5xl mx-auto px-6 pb-6">
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-6 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 flex-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-emerald-600">
                  Read article <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* All articles with category filter */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-xl font-bold text-gray-900 mb-6 mt-8">All articles</h2>
          <BlogFilter posts={rest} />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Ready to simplify leave management?
            </h2>
            <p className="mt-3 text-emerald-100">
              Try Leavely free for 14 days — no credit card required.
            </p>
            <div className="mt-6">
              <Link href="/register">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg">
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

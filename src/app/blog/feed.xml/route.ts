import { SITE_URL } from '@/lib/seo'

const posts = [
  { slug: 'bank-holidays-uk-2026', title: 'UK Bank Holidays 2026: Complete List for Employers', description: 'Full list of 2026 bank holidays for England, Wales, Scotland, and Northern Ireland with employer guidance.', date: '2026-03-12' },
  { slug: 'annual-leave-entitlement-uk', title: 'Annual Leave Entitlement in the UK: The Complete Guide for 2026', description: 'Statutory annual leave, pro-rata calculations, bank holidays, carry-over rules, and common employer mistakes.', date: '2026-03-12' },
  { slug: 'maternity-leave-uk', title: 'Maternity Leave UK: Complete Employer Guide (2026)', description: 'SMP rates, eligibility, KIT days, employee rights, and managing maternity absence.', date: '2026-03-12' },
  { slug: 'paternity-leave-uk', title: 'Paternity Leave UK: Rights, Pay & Employer Guide (2026)', description: 'Paternity leave entitlement, statutory paternity pay, eligibility, and shared parental leave.', date: '2026-03-12' },
  { slug: 'shared-parental-leave-uk', title: 'Shared Parental Leave UK: How It Works (2026 Guide)', description: 'How SPL works, eligibility, ShPP rates, notice requirements, and booking leave.', date: '2026-03-12' },
  { slug: 'adoption-leave-uk', title: 'Adoption Leave UK: Entitlement, Pay & Employer Guide (2026)', description: 'Adoption leave rights, SAP rates, eligibility, KIT days, and surrogacy leave.', date: '2026-03-12' },
  { slug: 'sick-leave-policy-uk', title: 'Sick Leave Policy UK: What Employers Must Know (2026 Guide)', description: 'SSP rates, fit notes, reporting procedures, Bradford Factor, and managing long-term sickness.', date: '2026-03-12' },
  { slug: 'compassionate-leave-uk', title: 'Compassionate Leave UK: Employer Guide (2026)', description: 'Compassionate leave rights, bereavement leave, and how to create a policy.', date: '2026-03-12' },
  { slug: 'parental-bereavement-leave-uk', title: "Parental Bereavement Leave UK (Jack's Law): Complete Guide", description: "Jack's Law explained — entitlement, pay, notice, and employer obligations.", date: '2026-03-12' },
  { slug: 'toil-policy-uk', title: 'TOIL Policy UK: Time Off in Lieu Explained (2026 Guide)', description: 'How TOIL works in UK employment law, policy creation, and tracking.', date: '2026-03-12' },
  { slug: 'unpaid-leave-uk', title: 'Unpaid Leave UK: Employer Guide to Rules & Policies', description: 'Statutory and discretionary unpaid leave, parental leave, and time off for dependants.', date: '2026-03-12' },
  { slug: 'study-leave-policy-uk', title: 'Study Leave UK: Employer Guide to Time Off for Training', description: 'Study leave entitlement, training rights, policy design, and clawback clauses.', date: '2026-03-12' },
  { slug: 'jury-service-leave-uk', title: 'Jury Service Leave UK: Employer Rights & Obligations', description: 'Legal obligations, pay, deferral, and managing jury duty absence.', date: '2026-03-12' },
  { slug: 'garden-leave-uk', title: 'Garden Leave UK: How It Works & What Employers Need to Know', description: 'Garden leave clauses, employee rights, holiday accrual, and restrictive covenants.', date: '2026-03-12' },
  { slug: 'bradford-factor-explained', title: 'Bradford Factor Explained: How to Calculate and Use It', description: 'What the Bradford Factor is, how to calculate it, trigger points, and best practices.', date: '2026-03-12' },
  { slug: 'absence-management-policy-uk', title: 'Absence Management Policy UK: Complete Guide & Template', description: 'How to create an absence management policy with trigger points and a free template.', date: '2026-03-12' },
  { slug: 'return-to-work-interview-questions', title: 'Return-to-Work Interview Questions: Free Template for UK Employers', description: 'Free RTW interview template with questions and best practices.', date: '2026-03-12' },
  { slug: 'phased-return-to-work-uk', title: 'Phased Return to Work UK: How to Manage It Properly', description: 'Phased return plans, fit notes, reasonable adjustments, and pay considerations.', date: '2026-03-12' },
  { slug: 'occupational-sick-pay-uk', title: 'Company Sick Pay UK: Should You Offer More Than SSP?', description: 'Occupational sick pay schemes, cost considerations, and policy design.', date: '2026-03-12' },
  { slug: 'pro-rata-annual-leave-calculator', title: 'How to Calculate Pro Rata Annual Leave UK (2026 Guide)', description: 'Step-by-step formulas and worked examples for part-time leave calculations.', date: '2026-03-12' },
  { slug: 'holiday-pay-calculation-uk', title: 'Holiday Pay Calculation UK: How to Get It Right (2026 Guide)', description: 'Holiday pay rules, variable hours, overtime, and rolled-up holiday pay.', date: '2026-03-12' },
  { slug: 'carry-over-annual-leave-uk', title: 'Carry Over Annual Leave UK: Rules Employers Must Know', description: 'Carry-over rules, use-it-or-lose-it policies, and payment in lieu.', date: '2026-03-12' },
  { slug: 'annual-leave-during-notice-period-uk', title: 'Annual Leave During Notice Period UK: Rules for Employers', description: 'Can employees take leave during notice? Rules and best practice.', date: '2026-03-12' },
  { slug: 'working-time-regulations-uk', title: 'Working Time Regulations UK: Employer Guide (2026)', description: '48-hour week, rest breaks, opt-out agreements, and record keeping.', date: '2026-03-12' },
  { slug: 'part-time-workers-rights-uk', title: "Part-Time Workers' Rights UK: Leave, Pay & Obligations", description: 'Part-Time Workers Regulations, pro rata benefits, and compliance.', date: '2026-03-12' },
  { slug: 'flexible-working-uk', title: 'Flexible Working UK: Right to Request Guide for Employers (2026)', description: 'Day-one right to request, types of flexible working, and employer obligations.', date: '2026-03-12' },
  { slug: 'leave-policy-template-uk', title: 'How to Create a Leave Policy UK: Free Template & Guide (2026)', description: 'Step-by-step guide with free leave policy template.', date: '2026-03-12' },
  { slug: 'employee-wellbeing-strategy', title: 'Employee Wellbeing Strategy UK: A Practical Guide for SMBs', description: 'Physical, mental, and financial wellbeing actions for small businesses.', date: '2026-03-12' },
  { slug: 'duvet-days-policy', title: 'Duvet Days: Should Your Business Offer Them? (UK Guide)', description: 'What duvet days are, pros and cons, and how to set up a policy.', date: '2026-03-12' },
  { slug: 'sabbatical-leave-uk', title: 'Sabbatical Leave UK: How to Create a Policy That Works', description: 'Sabbatical policies, paid vs unpaid, benefits, and risks.', date: '2026-03-12' },
  { slug: 'managing-remote-workers-leave', title: 'Managing Leave for Remote Workers: UK Employer Guide', description: 'Challenges, best practices, and tools for remote leave management.', date: '2026-03-12' },
  { slug: 'best-leave-management-software-uk', title: 'Best Leave Management Software UK 2026: What to Look For', description: 'Key features, pricing, and what separates good tools from great ones.', date: '2026-03-12' },
  { slug: 'hr-software-small-business-uk', title: 'HR Software for Small Businesses UK: What You Actually Need (2026)', description: 'Core features, pricing expectations, and how to evaluate HR platforms.', date: '2026-03-12' },
  { slug: 'summer-holiday-management-uk', title: 'Managing Summer Holidays: How UK Employers Can Avoid Chaos', description: 'Peak leave season challenges, blackout periods, fairness, and communication tips.', date: '2026-03-13' },
  { slug: 'christmas-shutdown-leave-uk', title: 'Christmas Shutdown & Leave UK: Employer Guide (2026)', description: 'Shutdown policies, notice requirements, and part-timer impact.', date: '2026-03-13' },
  { slug: 'mental-health-days-uk', title: 'Mental Health Days at Work UK: Should Employers Offer Them?', description: 'Growing trend, legal position, sick leave vs mental health days, and policy design.', date: '2026-03-13' },
  { slug: 'unlimited-leave-policy-uk', title: 'Unlimited Annual Leave UK: Does It Actually Work?', description: 'Pros, cons, UK legal considerations, and how to implement unlimited leave.', date: '2026-03-13' },
  { slug: 'leave-management-for-startups', title: 'Leave Management for UK Startups: What You Need from Day One', description: 'Minimum legal requirements, when to move from spreadsheets, and common mistakes.', date: '2026-03-13' },
  { slug: 'leave-clash-detection-software', title: 'Leave Clash Detection: How to Prevent Understaffing (2026 Guide)', description: 'How department-level leave clash detection prevents understaffing.', date: '2026-04-02' },
  { slug: 'blackout-dates-leave-management', title: 'Blackout Dates for Leave Management: Block Leave During Busy Periods', description: 'How to use blackout dates to restrict leave during critical business periods.', date: '2026-04-02' },
  { slug: 'approval-delegation-leave-management', title: 'Leave Approval Delegation: Keep Approvals Moving When Managers Are Away', description: 'How approval delegation prevents leave request bottlenecks.', date: '2026-04-02' },
  { slug: 'length-of-service-entitlement-uk', title: 'Length of Service Entitlement UK: Extra Holiday Days for Long-Serving Staff', description: 'How to award extra holiday days based on years of service in the UK.', date: '2026-04-02' },
  { slug: 'ical-calendar-sync-leave-management', title: 'iCal Calendar Sync for Leave Management: See Who\'s Off in Google Calendar & Outlook', description: 'How iCal calendar sync works for leave management with Google Calendar, Outlook, and Apple Calendar.', date: '2026-04-02' },
  { slug: 'accrual-based-leave-uk', title: 'Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance (2026 Guide)', description: 'Monthly leave accrual vs upfront allowance, worked examples, and legal position.', date: '2026-04-02' },
  { slug: 'employee-self-service-hr', title: 'Employee Self-Service in HR Software: Reduce Admin and Empower Your Team', description: 'What is employee self-service in HR software? Benefits, security, and how it reduces admin.', date: '2026-04-02' },
  { slug: 'minimum-notice-period-leave-requests', title: 'Minimum Notice Period for Leave Requests: How Much Notice Should Employees Give?', description: 'UK rules on minimum notice periods for annual leave requests and fair enforcement.', date: '2026-04-02' },
  { slug: 'acas-early-conciliation-uk', title: 'ACAS Early Conciliation: What Employers Need to Know (2026)', description: 'The mandatory pre-tribunal process, settlement agreements, and how audit trails protect you.', date: '2026-03-14' },
  { slug: 'agency-worker-holiday-rights-uk', title: 'Agency Worker Holiday Rights UK: What You Need to Know', description: 'Holiday entitlement for agency workers, AWR regulations, and compliance.', date: '2026-03-14' },
  { slug: 'bereavement-leave-policy-uk', title: 'Bereavement Leave Policy UK: Employer Guide (2026)', description: 'Bereavement leave rights, compassionate leave, and creating a fair policy.', date: '2026-03-14' },
  { slug: 'best-rota-software-uk', title: 'Best Rota Software UK 2026: Compare Top Scheduling Tools', description: 'Compare rota software for UK businesses. Features, pricing, and what to look for.', date: '2026-03-14' },
  { slug: 'charity-absence-management', title: 'Absence Management for Charities: Reducing Costs Without Losing Compassion', description: 'How charities can manage employee absence fairly and affordably.', date: '2026-03-14' },
  { slug: 'charity-hr-software-uk', title: 'Best HR Software for UK Charities (2026 Guide)', description: 'Compare HR software for UK charities with pricing, features, and charity discounts.', date: '2026-03-14' },
  { slug: 'disability-leave-adjustments-uk', title: 'Disability Leave Adjustments UK: Employer Obligations', description: 'Reasonable adjustments for disabled employees, Equality Act requirements, and leave policies.', date: '2026-03-14' },
  { slug: 'employee-handbook-uk', title: 'Employee Handbook UK: What to Include (2026 Guide)', description: 'Essential sections for a UK employee handbook with policies and legal requirements.', date: '2026-03-14' },
  { slug: 'employee-onboarding-checklist-uk', title: 'Employee Onboarding Checklist UK: Complete Guide', description: 'Step-by-step onboarding checklist for UK employers with templates.', date: '2026-03-14' },
  { slug: 'employee-performance-management-software-uk', title: 'Employee Performance Management Software UK (2026)', description: 'Compare performance management tools for UK businesses.', date: '2026-03-14' },
  { slug: 'expense-management-small-business-uk', title: 'Expense Management for Small Business UK: A Practical Guide', description: 'How to manage employee expenses in a small business with policies and tools.', date: '2026-03-14' },
  { slug: 'fit-notes-employer-guide-uk', title: 'Fit Notes UK: Employer Guide to Managing Them Properly', description: 'What fit notes are, when they are required, and how to process them.', date: '2026-03-14' },
  { slug: 'holiday-pay-during-notice-period-uk', title: 'Holiday Pay During Notice Period UK: Rules for Employers', description: 'Can employees take holiday during notice? Accrual, payment, and best practice.', date: '2026-03-14' },
  { slug: 'hr-compliance-checklist-uk', title: 'HR Compliance Checklist UK: What Every Employer Must Do (2026)', description: 'Essential HR compliance requirements for UK employers.', date: '2026-03-14' },
  { slug: 'leave-management-for-charities-uk', title: 'Leave Management for UK Charities: A Complete Guide (2026)', description: 'How UK charities can manage staff leave effectively.', date: '2026-03-14' },
  { slug: 'night-shift-workers-rights-uk', title: 'Night Shift Workers Rights UK: Leave and Rest Requirements', description: 'Night worker regulations, rest breaks, and leave entitlement.', date: '2026-03-14' },
  { slug: 'redundancy-annual-leave-uk', title: 'Redundancy and Annual Leave UK: What Happens to Unused Holiday?', description: 'How redundancy affects annual leave, payment in lieu, and employer obligations.', date: '2026-03-14' },
  { slug: 'shift-worker-holiday-entitlement-uk', title: 'Shift Worker Holiday Entitlement UK: How to Calculate It', description: 'Holiday calculations for shift workers, irregular hours, and statutory entitlement.', date: '2026-03-14' },
  { slug: 'small-charity-staff-management', title: 'Staff Management for Small Charities: A Practical Guide (2026)', description: 'How to manage staff in a small charity with 5-50 employees.', date: '2026-03-14' },
  { slug: 'staff-holiday-tracker-uk', title: 'Staff Holiday Tracker UK: Best Ways to Track Employee Leave', description: 'Compare holiday tracking methods from spreadsheets to dedicated software.', date: '2026-03-14' },
  { slug: 'statutory-sick-pay-uk', title: 'Statutory Sick Pay UK: Rates, Rules & Employer Guide (2026)', description: 'SSP rates, eligibility, qualifying days, and employer obligations.', date: '2026-03-14' },
  { slug: 'switch-from-brighthr', title: 'Switching from BrightHR to Leavely: What You Need to Know', description: 'How to migrate from BrightHR to Leavely with feature comparison.', date: '2026-03-14' },
  { slug: 'time-off-for-dependants-uk', title: 'Time Off for Dependants UK: Employer Guide (2026)', description: 'Emergency leave rights, who qualifies as a dependant, and employer obligations.', date: '2026-03-14' },
  { slug: 'volunteer-vs-employee-leave-rights-uk', title: 'Volunteers vs Employees: Leave Rights Explained (UK 2026)', description: 'Understanding the difference between volunteer, worker, and employee leave rights.', date: '2026-03-14' },
  { slug: 'zero-hour-contract-holiday-uk', title: 'Zero Hour Contract Holiday Entitlement UK: How to Calculate It', description: 'Holiday rights for zero-hour workers, accrual calculations, and rolled-up holiday pay.', date: '2026-03-14' },
  { slug: 'right-to-work-checks-uk', title: 'Right to Work Checks UK: Employer Guide (2026)', description: 'How to conduct right to work checks, acceptable documents, digital verification, and penalties for non-compliance.', date: '2026-04-04' },
  { slug: 'disciplinary-procedure-uk', title: 'Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)', description: 'ACAS code of practice, investigation, hearings, outcomes, appeals, and common mistakes employers make.', date: '2026-04-04' },
  { slug: 'how-to-calculate-holiday-entitlement-uk', title: 'How to Calculate Holiday Entitlement UK: Step-by-Step (2026)', description: 'Statutory 5.6 weeks explained with worked examples for full-time, part-time, starters, and leavers.', date: '2026-04-04' },
  { slug: 'employment-contract-template-uk', title: 'Employment Contract Template UK: What Must Be Included (2026)', description: 'Legal requirements for UK employment contracts, key clauses, holiday entitlement, and notice periods.', date: '2026-04-04' },
]

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Leavely Blog — Leave Management Guides for UK Employers</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical guides on leave management, HR compliance, and absence tracking for UK businesses.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

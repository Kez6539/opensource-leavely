import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/small-business-hr-checklist-uk`

export const metadata: Metadata = {
  title: 'HR Checklist for Small Businesses UK: Everything You Need (2026)',
  description:
    'Essential HR checklist for UK small businesses. Contracts, policies, leave tracking, pensions, payroll, health and safety, and what you can do yourself vs outsource.',
  alternates: { canonical: articleUrl },
  keywords: [
    'HR checklist small business UK',
    'HR requirements small business',
    'HR basics small business',
    'what HR do small businesses need',
    'small business HR essentials UK',
    'HR for small companies UK',
  ],
  openGraph: {
    title: 'HR Checklist for Small Businesses UK: Everything You Need (2026)',
    description: 'Essential HR from day one: contracts, policies, leave tracking, pensions, payroll, and health and safety.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HR Checklist for Small Businesses UK: Everything You Need (2026)',
  description: 'Essential HR checklist for UK small businesses from day one.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SmallBusinessHRChecklistArticle() {
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
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            HR Checklist for Small Businesses UK: Everything You Need (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When you hire your first employee, you take on a raft of legal obligations that did not exist when it was just you. Many small business owners assume HR is something only larger companies need to worry about. In reality, employment law applies from <strong>employee number one</strong>. This checklist covers everything you need to have in place, whether you have 1 employee or 50.
            </p>

            <h2>Before you hire: essential setup</h2>

            <h3>1. Employer&apos;s liability insurance</h3>
            <p>
              This is a legal requirement. You must have employer&apos;s liability insurance of at least <strong>&pound;5 million</strong> from the day you hire your first employee. The certificate must be displayed in the workplace (or made easily accessible to employees). Failure to hold this insurance carries a fine of &pound;2,500 per day.
            </p>

            <h3>2. Register as an employer with HMRC</h3>
            <p>
              You must register as an employer with HMRC before your first payday. This gives you a PAYE reference number, which you need to run payroll and submit Real Time Information (RTI) returns.
            </p>

            <h3>3. Right to work checks</h3>
            <p>
              Check every new employee&apos;s right to work in the UK <strong>before their first day</strong>. Keep copies of documents for the duration of employment plus two years.
            </p>

            <h2>Day one: employment contracts</h2>
            <p>
              Since April 2020, you must provide a <strong>written statement of employment particulars</strong> on or before the employee&apos;s first day. This document must include:
            </p>
            <ul className="list-disc pl-6">
              <li>Job title and description</li>
              <li>Start date</li>
              <li>Pay rate and frequency</li>
              <li>Working hours</li>
              <li>Holiday entitlement (and whether bank holidays are included)</li>
              <li>Place of work</li>
              <li>Notice periods</li>
              <li>Probation period details</li>
              <li>Sick pay arrangements</li>
            </ul>
            <p>
              Do not use a generic template downloaded from the internet without reviewing it carefully. It must reflect your actual terms.
            </p>

            <h2>Essential policies</h2>
            <p>
              There are certain policies that every UK employer should have, regardless of size:
            </p>

            <h3>Health and safety policy</h3>
            <p>
              If you have <strong>5 or more employees</strong>, you must have a written health and safety policy. Even if you have fewer than 5, you still have a duty of care and should document your approach. Carry out a risk assessment for your workplace.
            </p>

            <h3>Disciplinary and grievance procedure</h3>
            <p>
              The ACAS Code of Practice requires employers to have a clear disciplinary and grievance procedure. While not having one is not illegal, failing to follow the ACAS Code can increase tribunal compensation by up to 25%.
            </p>

            <h3>Equal opportunities policy</h3>
            <p>
              The Equality Act 2010 protects employees from discrimination based on 9 protected characteristics. Having a clear equal opportunities policy demonstrates your commitment and provides a defence if a claim is made.
            </p>

            <h3>Data protection and privacy policy</h3>
            <p>
              Under GDPR and the Data Protection Act 2018, you must have a privacy notice for employees explaining what personal data you collect, why, and how it is stored. If you have specific monitoring in place (such as CCTV or email monitoring), this must be disclosed.
            </p>

            <h3>Leave and absence policy</h3>
            <p>
              Document your rules for annual leave requests, sick absence reporting, and any additional leave types you offer. This prevents disputes and ensures consistency.
            </p>

            <h2>Leave tracking</h2>
            <p>
              From your very first employee, you need a system for tracking annual leave, sick absence, and any other time off. Many businesses start with spreadsheets, but these quickly become error-prone as the team grows.
            </p>
            <p>What you need to track:</p>
            <ul className="list-disc pl-6">
              <li>Annual leave entitlement, used, and remaining balance</li>
              <li>Sick absence (dates, reasons, fit notes)</li>
              <li>Other leave types (compassionate, parental, TOIL)</li>
              <li>Approval records showing who approved each request</li>
            </ul>

            <h2>Payroll</h2>
            <p>
              You must run payroll and submit RTI returns to HMRC on or before each payday. This includes calculating PAYE tax, National Insurance, student loan deductions, and pension contributions. Options for small businesses:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Do it yourself:</strong> Use HMRC Basic PAYE Tools (free, but limited to 9 employees)</li>
              <li><strong>Payroll software:</strong> Tools such as Xero, FreeAgent, or Sage handle calculations and RTI submissions</li>
              <li><strong>Outsource to an accountant:</strong> Many small businesses delegate payroll to their accountant for a monthly fee</li>
            </ul>

            <h2>Workplace pensions (auto-enrolment)</h2>
            <p>
              Every employer must provide a workplace pension scheme and automatically enrol eligible employees. Eligible employees are those aged 22 to state pension age who earn more than <strong>&pound;10,000 per year</strong>. The minimum contribution rates are:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employer:</strong> 3% of qualifying earnings</li>
              <li><strong>Employee:</strong> 5% of qualifying earnings (including tax relief)</li>
            </ul>
            <p>
              You must set up your pension scheme and enrol eligible staff from their first day of employment. Popular providers for small businesses include NEST, NOW: Pensions, and The People&apos;s Pension.
            </p>

            <h2>Health and safety</h2>
            <p>
              All employers, regardless of size, must:
            </p>
            <ul className="list-disc pl-6">
              <li>Carry out workplace risk assessments</li>
              <li>Provide information and training to employees</li>
              <li>Have arrangements for first aid</li>
              <li>Report certain injuries, diseases, and dangerous occurrences (RIDDOR)</li>
              <li>Display the Health and Safety Law poster (or provide each employee with a leaflet)</li>
            </ul>

            <h2>What you can DIY vs outsource</h2>
            <p>
              As a small business, you do not need to hire an HR manager. Here is a practical breakdown:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>DIY with software:</strong> Leave tracking, absence management, onboarding checklists, employee records</li>
              <li><strong>DIY with templates:</strong> Employment contracts, basic policies (use ACAS templates as a starting point)</li>
              <li><strong>Outsource:</strong> Payroll (to your accountant or payroll provider), complex employment law questions (to an HR consultant or solicitor)</li>
              <li><strong>Consider outsourcing:</strong> Health and safety risk assessments if your workplace has specific hazards</li>
            </ul>

            <h2>How Leavely covers the basics</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is built for small businesses that need to get HR right without hiring an HR team:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Leave tracking:</strong> Annual leave, sick absence, TOIL, compassionate leave, and custom types, all with automatic balance calculations.</li>
              <li><strong>Absence management:</strong> Bradford Factor scoring, return-to-work tracking, and absence pattern alerts.</li>
              <li><strong>Onboarding:</strong> Checklists ensure every new starter goes through the same steps before day one.</li>
              <li><strong>Employee profiles:</strong> Store contract details, working patterns, emergency contacts, and documents in one place.</li>
              <li><strong>Audit trail:</strong> Every action is logged, giving you evidence for compliance and disputes.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get HR right from day one</h3>
            <p className="text-emerald-100 mb-6">Leavely covers leave, absence, onboarding, and employee records in one affordable tool.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/employment-contract-template-uk" className="block text-emerald-600 hover:underline font-medium">Employment Contract Template UK: What Must Be Included &rarr;</Link>
              <Link href="/blog/hr-compliance-checklist-uk" className="block text-emerald-600 hover:underline font-medium">HR Compliance Checklist UK: The Complete Audit Guide &rarr;</Link>
              <Link href="/blog/leave-management-for-startups" className="block text-emerald-600 hover:underline font-medium">Leave Management for UK Startups: What You Need from Day One &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

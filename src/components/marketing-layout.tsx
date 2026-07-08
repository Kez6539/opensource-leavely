import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/shared/logo'
import { TrustBadges } from '@/components/shared/trust-badges'
import { TrustedLogoStrip } from '@/components/shared/trusted-logo-strip'

const MarketingMobileNav = dynamic(() =>
  import('@/app/_marketing-mobile-nav').then((mod) => mod.MarketingMobileNav)
)

export function MarketingNav({ showTrustBadges = false }: { showTrustBadges?: boolean }) {
  return (
    <header>
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-14" />
          </Link>
          {/* Desktop links. On phones these 7 buttons total ~700px and used to
              overflow the viewport on every marketing page — the landing page
              got the hidden/md:flex + hamburger treatment but this shared nav
              never did. Mirror that pattern here. */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/features">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Features</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Pricing</Button>
            </Link>
            <Link href="/compare">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Compare</Button>
            </Link>
            <Link href="/employee-discounts">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Perks</Button>
            </Link>
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Blog</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20">
                Start free trial
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <Link href="/register">
              <Button size="sm" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20">
                Try free
              </Button>
            </Link>
            <MarketingMobileNav />
          </div>
        </div>
        {showTrustBadges ? (
          <div className="border-t border-gray-100 bg-white/95 px-4 py-2">
            <TrustBadges compact className="mx-auto max-w-6xl" />
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export function MarketingFooter({ showTrustBadges = true }: { showTrustBadges?: boolean }) {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 mb-10">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/features" className="hover:text-gray-700">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-gray-700">Pricing</Link></li>
              <li><Link href="/compare" className="hover:text-gray-700">Compare</Link></li>
              <li><Link href="/register" className="hover:text-gray-700">Free Trial</Link></li>
              <li><Link href="/faq" className="hover:text-gray-700">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Solutions</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/leave-management-software-uk" className="hover:text-gray-700">Leave Management Software</Link></li>
              <li><Link href="/annual-leave-tracker" className="hover:text-gray-700">Annual Leave Tracker</Link></li>
              <li><Link href="/holiday-tracker-software" className="hover:text-gray-700">Holiday Tracker Software</Link></li>
              <li><Link href="/staff-holiday-planner" className="hover:text-gray-700">Staff Holiday Planner</Link></li>
              <li><Link href="/absence-management-software-uk" className="hover:text-gray-700">Absence Management Software</Link></li>
              <li><Link href="/hr-software-uk" className="hover:text-gray-700">HR Software UK</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Compare</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/why-uk-smes-choose-leavely" className="hover:text-gray-700">Why SMEs choose Leavely</Link></li>
              <li><Link href="/timetastic-alternative" className="hover:text-gray-700">vs Timetastic</Link></li>
              <li><Link href="/why-leavely-vs-excel-spreadsheets" className="hover:text-gray-700">vs Excel</Link></li>
              <li><Link href="/brighthr-alternative" className="hover:text-gray-700">vs BrightHR</Link></li>
              <li><Link href="/breathe-hr-alternative" className="hover:text-gray-700">vs Breathe HR</Link></li>
              <li><Link href="/charlie-hr-alternative" className="hover:text-gray-700">vs Charlie HR</Link></li>
              <li><Link href="/whosoff-alternative" className="hover:text-gray-700">vs WhosOff</Link></li>
              <li><Link href="/personio-alternative" className="hover:text-gray-700">vs Personio</Link></li>
              <li><Link href="/sage-hr-alternative" className="hover:text-gray-700">vs Sage HR</Link></li>
              <li><Link href="/natural-hr-alternative" className="hover:text-gray-700">vs Natural HR</Link></li>
              <li><Link href="/compare/absence-io" className="hover:text-gray-700">vs absence.io</Link></li>
              <li><Link href="/compare/holiday-tracker" className="hover:text-gray-700">vs Holiday Tracker</Link></li>
              <li><Link href="/compare/bamboohr" className="hover:text-gray-700">vs BambooHR</Link></li>
              <li><Link href="/factorial-alternative" className="hover:text-gray-700">vs Factorial</Link></li>
              <li><Link href="/hibob-alternative" className="hover:text-gray-700">vs HiBob</Link></li>
              <li><Link href="/compare/zoho-people" className="hover:text-gray-700">vs Zoho People</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Perks</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/employee-discounts" className="hover:text-gray-700 font-medium text-emerald-600">Employee Discounts</Link></li>
              <li><Link href="/employee-benefits" className="hover:text-gray-700">Employee Benefits</Link></li>
              <li><Link href="/staff-perks" className="hover:text-gray-700">Staff Perks</Link></li>
              <li><Link href="/deals" className="hover:text-gray-700">Live Deals</Link></li>
              <li><Link href="/guides" className="hover:text-gray-700">Perks Guides</Link></li>
              <li><Link href="/employee-discounts/gym-fitness" className="hover:text-gray-700">Gym &amp; Fitness</Link></li>
              <li><Link href="/employee-discounts/tech-electronics" className="hover:text-gray-700">Tech &amp; Electronics</Link></li>
              <li><Link href="/employee-discounts/food-drink" className="hover:text-gray-700">Food &amp; Drink</Link></li>
              <li><Link href="/employee-discounts/fuel-supermarket" className="hover:text-gray-700">Fuel &amp; Supermarket</Link></li>
              <li><Link href="/employee-discounts/family-kids" className="hover:text-gray-700">Family &amp; Kids</Link></li>
              <li><Link href="/employee-discounts/wellbeing-health" className="hover:text-gray-700">Wellbeing</Link></li>
              <li><Link href="/employee-discounts/mobile-broadband" className="hover:text-gray-700">Mobile &amp; Broadband</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Free Tools</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/tools/bradford-factor-calculator" className="hover:text-gray-700">Bradford Factor Calculator</Link></li>
              <li><Link href="/tools/pro-rata-leave-calculator" className="hover:text-gray-700">Pro Rata Leave Calculator</Link></li>
              <li><Link href="/blog/bank-holidays-uk-2026" className="hover:text-gray-700">Bank Holidays 2026</Link></li>
              <li><Link href="/blog/leave-policy-template-uk" className="hover:text-gray-700">Leave Policy Template</Link></li>
              <li><Link href="/blog/return-to-work-interview-questions" className="hover:text-gray-700">RTW Interview Template</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Leave Guides</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/blog/annual-leave-entitlement-uk" className="hover:text-gray-700">Annual Leave UK</Link></li>
              <li><Link href="/blog/maternity-leave-uk" className="hover:text-gray-700">Maternity Leave UK</Link></li>
              <li><Link href="/blog/paternity-leave-uk" className="hover:text-gray-700">Paternity Leave UK</Link></li>
              <li><Link href="/blog/sick-leave-policy-uk" className="hover:text-gray-700">Sick Leave Policy</Link></li>
              <li><Link href="/blog/compassionate-leave-uk" className="hover:text-gray-700">Compassionate Leave</Link></li>
              <li><Link href="/blog/toil-policy-uk" className="hover:text-gray-700">TOIL Policy</Link></li>
              <li><Link href="/blog/carry-over-annual-leave-uk" className="hover:text-gray-700">Carry Over Leave</Link></li>
              <li><Link href="/blog/statutory-sick-pay-uk" className="hover:text-gray-700">Statutory Sick Pay</Link></li>
              <li><Link href="/blog/time-off-for-dependants-uk" className="hover:text-gray-700">Dependant Leave</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/blog" className="hover:text-gray-700">Blog</Link></li>
              <li><Link href="/blog/bradford-factor-explained" className="hover:text-gray-700">Bradford Factor Guide</Link></li>
              <li><Link href="/blog/absence-management-policy-uk" className="hover:text-gray-700">Absence Management</Link></li>
              <li><Link href="/blog/flexible-working-uk" className="hover:text-gray-700">Flexible Working</Link></li>
              <li><Link href="/blog/hr-software-small-business-uk" className="hover:text-gray-700">HR Software Guide</Link></li>
              <li><Link href="/blog/best-leave-management-software-uk" className="hover:text-gray-700">Leave Software Guide</Link></li>
              <li><Link href="/blog/charity-hr-software-uk" className="hover:text-gray-700">Charity HR Guide</Link></li>
              <li><Link href="/blog/fit-notes-employer-guide-uk" className="hover:text-gray-700">Fit Notes Guide</Link></li>
              <li><Link href="/blog/shift-worker-holiday-entitlement-uk" className="hover:text-gray-700">Shift Worker Holidays</Link></li>
              <li><Link href="/blog/agency-worker-holiday-rights-uk" className="hover:text-gray-700">Agency Worker Rights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Industries</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/care-homes" className="hover:text-gray-700">Care Homes</Link></li>
              <li><Link href="/hospitality" className="hover:text-gray-700">Hospitality</Link></li>
              <li><Link href="/retail" className="hover:text-gray-700">Retail</Link></li>
              <li><Link href="/education" className="hover:text-gray-700">Education</Link></li>
              <li><Link href="/construction" className="hover:text-gray-700">Construction</Link></li>
              <li><Link href="/healthcare" className="hover:text-gray-700">Healthcare</Link></li>
              <li><Link href="/professional-services" className="hover:text-gray-700">Professional Services</Link></li>
              <li><Link href="/manufacturing" className="hover:text-gray-700">Manufacturing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Discounts</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/charities" className="hover:text-gray-700 font-medium text-purple-600">Charities (50% off)</Link></li>
              <li><Link href="/education-discount" className="hover:text-gray-700 font-medium text-blue-600">Education (50% off)</Link></li>
              <li><Link href="/nhs" className="hover:text-gray-700 font-medium text-cyan-600">NHS (50% off)</Link></li>
              <li><Link href="/social-enterprises" className="hover:text-gray-700 font-medium text-orange-600">Social Enterprises (50% off)</Link></li>
              <li><Link href="/startups" className="hover:text-gray-700 font-medium text-indigo-600">Startups (25% off)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-gray-700">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-700">Contact</Link></li>
              <li><Link href="/register" className="hover:text-gray-700">Free Trial</Link></li>
              <li><Link href="/login" className="hover:text-gray-700">Sign In</Link></li>
              <li><Link href="/how-leavely-perks-works" className="hover:text-gray-700">How Leavely Perks Works</Link></li>
              <li><Link href="/how-we-make-money" className="hover:text-gray-700">How We Make Money</Link></li>
              <li><Link href="/editorial-guidelines" className="hover:text-gray-700">Editorial Guidelines</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-gray-700">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-700">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-14" />
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-gray-400 md:flex-row md:gap-4">
            <p>&copy; {new Date().getFullYear()} Leavely. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-700">Terms</Link>
            </div>
          </div>
        </div>
        <TrustedLogoStrip className="mt-6 border-t border-gray-200 pt-6" />
        {showTrustBadges ? <TrustBadges className="mt-6 border-t border-gray-200 pt-6" /> : null}
      </div>
    </footer>
  )
}

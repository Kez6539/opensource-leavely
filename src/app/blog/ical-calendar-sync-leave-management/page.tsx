import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/ical-calendar-sync-leave-management`

export const metadata: Metadata = {
  title: 'iCal Calendar Sync for Leave Management: See Who\'s Off in Google Calendar & Outlook',
  description:
    'How iCal calendar sync works for leave management. Subscribe to team absence feeds in Google Calendar, Outlook, or Apple Calendar. Token-based authentication, personal vs team feeds, and step-by-step setup.',
  alternates: { canonical: articleUrl },
  keywords: [
    'ical leave calendar sync',
    'google calendar leave management',
    'outlook leave calendar',
    'team calendar sync',
    'leave management calendar integration',
    'ical feed leave tracker',
    'calendar subscription leave',
    'who is off calendar',
    'absence calendar sync',
  ],
  openGraph: {
    title: 'iCal Calendar Sync for Leave Management',
    description: 'See who\'s off directly in Google Calendar, Outlook, or Apple Calendar with iCal leave feeds.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'iCal Calendar Sync for Leave Management: See Who\'s Off in Google Calendar & Outlook',
  description: 'How iCal calendar sync works for leave management software.',
  url: articleUrl,
  datePublished: '2026-04-02',
  dateModified: '2026-04-02',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ICalCalendarSyncArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Feature Guide</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            iCal Calendar Sync for Leave Management: See Who&apos;s Off in Google Calendar &amp; Outlook
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              The biggest problem with leave management software is that nobody wants to open <em>another</em> app. Your team already lives in <strong>Google Calendar</strong>, <strong>Outlook</strong>, or <strong>Apple Calendar</strong>. If they have to log into a separate tool to see who&apos;s off today, they simply won&apos;t. Calendar sync solves this by pushing approved absences directly into the calendars your team already uses, using an open standard called <strong>iCal</strong>.
            </p>

            <h2>Why calendar sync matters for leave management</h2>
            <p>
              Without calendar sync, your team&apos;s leave data lives in a silo. The HR system knows that Sarah is off next Thursday, but the project manager scheduling a sprint review doesn&apos;t. The result is double-booked meetings, missed deadlines, and frustrated employees who have to explain &quot;I&apos;m on leave that day&quot; three times.
            </p>
            <p>Calendar sync creates a <strong>single source of truth</strong>. When a leave request is approved, it appears as an all-day event in the calendars people already check every morning. No context-switching, no logging into a second system, no surprises.</p>
            <p>The key benefits are:</p>
            <ul className="list-disc pl-6">
              <li><strong>Visibility without effort</strong> &mdash; team absences appear alongside regular meetings.</li>
              <li><strong>Fewer scheduling conflicts</strong> &mdash; you can see at a glance that two of your five developers are off next week before you commit to a deadline.</li>
              <li><strong>No extra logins</strong> &mdash; the calendar app is already open on everyone&apos;s screen.</li>
              <li><strong>Works across platforms</strong> &mdash; iCal is supported by virtually every calendar application.</li>
            </ul>

            <h2>What is iCal?</h2>
            <p>
              <strong>iCal</strong> (formally iCalendar, defined by RFC 5545) is an open standard for exchanging calendar data. It uses <code>.ics</code> files that describe events in a structured text format. Every major calendar application supports it &mdash; Google Calendar, Microsoft Outlook, Apple Calendar, Thunderbird, and dozens more.
            </p>
            <p>
              There are two ways to use iCal:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>File import</strong> &mdash; download an <code>.ics</code> file and import it. This is a one-time snapshot; it doesn&apos;t update.</li>
              <li><strong>Calendar subscription</strong> &mdash; subscribe to a URL that serves an <code>.ics</code> feed. The calendar app polls this URL periodically (typically every few hours) and updates automatically.</li>
            </ul>
            <p>
              For leave management, subscriptions are what you want. When a new absence is approved or a request is cancelled, the feed updates, and your calendar picks up the change on its next refresh.
            </p>

            <h2>Personal feeds vs team feeds</h2>
            <p>
              Good leave management software offers at least two types of calendar feed:
            </p>
            <h3>Personal feed</h3>
            <p>
              Shows only your own approved leave. Useful for employees who want to see their time off alongside personal events. This feed typically includes the leave type (annual leave, sick leave, TOIL) and the dates.
            </p>
            <h3>Team feed</h3>
            <p>
              Shows all approved leave for your team, department, or the entire company. This is what managers care about &mdash; seeing at a glance who&apos;s off on any given day. Team feeds usually show the employee&apos;s name and the leave type.
            </p>
            <p>
              Some systems also offer <strong>department-level feeds</strong> so a marketing manager only sees marketing absences, not the entire company.
            </p>

            <h2>How token-based authentication works</h2>
            <p>
              Calendar subscriptions present a security challenge. When Google Calendar fetches your iCal feed, it can&apos;t log in with a username and password &mdash; it just sends a plain HTTP GET request to the URL you gave it.
            </p>
            <p>
              The solution is <strong>token-based authentication</strong>. Each calendar feed URL contains a unique, random token &mdash; something like:
            </p>
            <p>
              <code>https://app.leavely.online/api/ical/team/abc123def456</code>
            </p>
            <p>
              This token acts as both the identifier and the password. Anyone with the URL can see the feed, but the token is long enough (typically 32+ characters) that it can&apos;t be guessed. If a token is compromised, you regenerate it &mdash; the old URL stops working instantly.
            </p>
            <p>
              The key security principle: <strong>no passwords are shared</strong>. The token is generated by the system and embedded in the URL. It doesn&apos;t grant access to anything else &mdash; just the calendar feed.
            </p>

            <h2>How to add an iCal feed to Google Calendar</h2>
            <ol className="list-decimal pl-6">
              <li>Copy your iCal feed URL from your leave management software.</li>
              <li>Open <strong>Google Calendar</strong> on the web (calendar.google.com).</li>
              <li>In the left sidebar, click the <strong>+</strong> next to &quot;Other calendars&quot;.</li>
              <li>Select <strong>&quot;From URL&quot;</strong>.</li>
              <li>Paste the iCal feed URL.</li>
              <li>Click <strong>&quot;Add calendar&quot;</strong>.</li>
            </ol>
            <p>
              Google Calendar will fetch the feed immediately and then refresh it roughly every 12&ndash;24 hours. You can&apos;t control the refresh interval &mdash; that&apos;s a Google limitation. New leave approved today will typically appear in your Google Calendar by tomorrow.
            </p>

            <h2>How to add an iCal feed to Outlook</h2>
            <h3>Outlook on the web (outlook.com / Microsoft 365)</h3>
            <ol className="list-decimal pl-6">
              <li>Copy your iCal feed URL.</li>
              <li>Go to <strong>Calendar</strong> &rarr; <strong>Add calendar</strong> &rarr; <strong>Subscribe from web</strong>.</li>
              <li>Paste the URL, give it a name (e.g., &quot;Team Leave&quot;), and choose a colour.</li>
              <li>Click <strong>Import</strong>.</li>
            </ol>
            <h3>Outlook desktop (Windows)</h3>
            <ol className="list-decimal pl-6">
              <li>Go to <strong>File</strong> &rarr; <strong>Account Settings</strong> &rarr; <strong>Internet Calendars</strong>.</li>
              <li>Click <strong>New</strong>, paste the URL, and click <strong>Add</strong>.</li>
              <li>Give the calendar a name and click <strong>OK</strong>.</li>
            </ol>
            <p>
              Outlook typically refreshes subscribed calendars more frequently than Google &mdash; roughly every 1&ndash;4 hours depending on the client.
            </p>

            <h2>Privacy considerations</h2>
            <p>
              Calendar feeds can expose sensitive information if not handled carefully. Consider these points:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Leave type visibility</strong> &mdash; should team feeds show &quot;sick leave&quot; or just &quot;absent&quot;? Many employees don&apos;t want colleagues knowing they&apos;re off sick versus on holiday.</li>
              <li><strong>Token security</strong> &mdash; treat feed URLs like passwords. Don&apos;t paste them in Slack channels or shared documents.</li>
              <li><strong>Regeneration</strong> &mdash; if someone leaves the company or a token leaks, regenerate it immediately.</li>
              <li><strong>Scope</strong> &mdash; managers should see their team&apos;s leave. Employees should only see their own or a limited team view, depending on company policy.</li>
            </ul>

            <h2>How Leavely implements calendar sync</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> provides iCal calendar feeds for both individuals and teams:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Personal feed</strong> &mdash; every employee gets their own iCal URL showing their approved leave.</li>
              <li><strong>Team feed</strong> &mdash; managers get a feed showing all approved absences for their team or the entire organisation.</li>
              <li><strong>Token-based security</strong> &mdash; each feed has a unique token. Regenerate it in one click if needed.</li>
              <li><strong>Privacy controls</strong> &mdash; admins choose whether team feeds show leave types or just &quot;absent&quot;.</li>
              <li><strong>Works everywhere</strong> &mdash; standard iCal format compatible with Google Calendar, Outlook, Apple Calendar, and any other iCal-compatible app.</li>
              <li><strong>Real-time updates</strong> &mdash; the feed reflects the latest approved leave whenever your calendar app refreshes.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">See who&apos;s off without leaving your calendar</h3>
            <p className="text-emerald-100 mb-6">Leavely syncs approved leave to Google Calendar, Outlook, and Apple Calendar via iCal feeds.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK &rarr;</Link>
              <Link href="/blog/managing-remote-workers-leave" className="block text-emerald-600 hover:underline font-medium">Managing Remote Workers&apos; Leave &rarr;</Link>
              <Link href="/blog/staff-holiday-tracker-uk" className="block text-emerald-600 hover:underline font-medium">Staff Holiday Tracker UK &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}

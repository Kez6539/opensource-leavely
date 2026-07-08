import { Badge } from '@/components/ui/badge'

type ChangelogCategory = 'New Feature' | 'Improvement' | 'Bug Fix'

interface ChangelogEntry {
  date: string
  title: string
  description: string
  category: ChangelogCategory
}

// (#157) Until we wire MDX up, the source of truth for "what shipped"
// is this array. Group by week so a prospect clicking back across months
// sees fresh entries instead of an unchanging "April 2026" wall. New
// entries should be added at the top of the array.
const CHANGELOG: ChangelogEntry[] = [
  {
    date: 'Week of 9 April 2026',
    title: '142 fixes across security, validation, and UX',
    description:
      'Sweep 3 closes 142 issues — persistent rate limiting, password-reset session invalidation, OAuth CSRF hardening, form validation across every form, alert()/confirm() replaced with toasts, loading + error boundaries on every sidebar destination.',
    category: 'Bug Fix',
  },
  {
    date: 'Week of 9 April 2026',
    title: 'Cleaner pricing answers',
    description:
      'Public pricing and FAQ no longer admit "not yet" to annual billing — invoices are available on request for procurement.',
    category: 'Improvement',
  },
  {
    date: 'Week of 9 April 2026',
    title: 'Stronger destructive-action guardrails',
    description:
      'Clearing notifications, regenerating calendar tokens, and terminating an employee now require an explicit confirmation. Termination uses a typed-name dialog.',
    category: 'Improvement',
  },
  {
    date: 'April 2026',
    title: 'All-employees balance overview',
    description:
      'See every employee\'s leave balance on one page with colour-coded bars.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'Broadcast alerts',
    description: 'Send instant notifications to your whole team.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'Sickness and turnover reports',
    description:
      'Dedicated reports for tracking sickness patterns and staff retention.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'Privacy controls',
    description:
      'Hide emails, restrict employee visibility, prevent leave cancellation.',
    category: 'Improvement',
  },
  {
    date: 'April 2026',
    title: 'Performance review cycles',
    description:
      'Create quarterly or annual review cycles with 1-5 star ratings.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'Smart approval cards',
    description:
      'See remaining balance and department clashes before approving.',
    category: 'Improvement',
  },
  {
    date: 'April 2026',
    title: 'Gantt-style leave calendar',
    description:
      'Visual calendar with horizontal bars and employee names.',
    category: 'Improvement',
  },
  {
    date: 'April 2026',
    title: 'Receipt file upload',
    description: 'Upload photos or PDFs for expense claims.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'Help centre',
    description: '14 user guides for managers and employees.',
    category: 'New Feature',
  },
  {
    date: 'April 2026',
    title: 'PWA installable app',
    description: 'Add Leavely to your home screen on iOS and Android.',
    category: 'Improvement',
  },
  {
    date: 'March 2026',
    title: 'Department clash detection',
    description:
      'Real-time warnings when booking overlapping leave.',
    category: 'New Feature',
  },
  {
    date: 'March 2026',
    title: 'Blackout dates',
    description: 'Block leave during critical business periods.',
    category: 'New Feature',
  },
  {
    date: 'March 2026',
    title: 'Approval delegation',
    description: 'Delegate approvals when you\'re away.',
    category: 'New Feature',
  },
  {
    date: 'March 2026',
    title: 'iCal calendar sync',
    description:
      'Subscribe to leave feeds in Google Calendar or Outlook.',
    category: 'New Feature',
  },
  {
    date: 'March 2026',
    title: 'Employee self-service',
    description: 'Update your own contact details.',
    category: 'Improvement',
  },
  {
    date: 'March 2026',
    title: 'Accrual-based leave',
    description: 'Monthly allowance accrual option.',
    category: 'Improvement',
  },
]

const categoryColors: Record<ChangelogCategory, string> = {
  'New Feature': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'Improvement': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Bug Fix': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
}

export default function ChangelogPage() {
  // Group entries by date
  const grouped: Record<string, ChangelogEntry[]> = {}
  for (const entry of CHANGELOG) {
    if (!grouped[entry.date]) grouped[entry.date] = []
    grouped[entry.date].push(entry)
  }

  const months = Object.keys(grouped)

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">What&apos;s New</h1>
        <p className="text-muted-foreground mt-1">
          The latest features and improvements in Leavely.
        </p>
      </div>

      <div className="space-y-10">
        {months.map((month) => (
          <div key={month}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              {month}
            </h2>
            <div className="space-y-4">
              {grouped[month].map((entry) => (
                <div
                  key={entry.title}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {entry.description}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`shrink-0 text-xs font-medium ${categoryColors[entry.category]}`}
                    >
                      {entry.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

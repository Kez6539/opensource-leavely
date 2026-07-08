export interface Guide {
  slug: string
  title: string
  category: 'manager' | 'employee' | 'both'
  description: string
  steps: GuideStep[]
  tips?: GuideTip[]
}

export interface GuideStep {
  title: string
  content: string
}

export interface GuideTip {
  type: 'info' | 'warning'
  content: string
}

export const guides: Guide[] = [
  // ── Manager Guides ──────────────────────────────────────────────────
  {
    slug: 'getting-started',
    title: 'Getting Started: Setting Up Your Workspace',
    category: 'manager',
    description: 'Learn how to create your workspace, add employees, configure leave policies, set up bank holidays, and invite your team.',
    steps: [
      {
        title: 'Create your workspace',
        content: 'When you first sign up, you will be asked to name your organisation. This creates your workspace with a unique URL. You can change the name later in Settings.',
      },
      {
        title: 'Add employees',
        content: 'Go to Employees and click "Add employee". Fill in their name, email, job title, department, start date, and working pattern. You can also bulk import employees from a CSV file.',
      },
      {
        title: 'Set up leave policies',
        content: 'Navigate to Settings > Leave Policies. Create policies for each type of leave (e.g. Annual Leave, Sick Leave, Compassionate Leave). Set the annual allowance, whether it accrues monthly, and any carry-over rules.',
      },
      {
        title: 'Configure bank holidays',
        content: 'Go to Settings > Bank Holidays. Load the default UK bank holidays for the current year, or add custom holidays for your region. Employees assigned to a policy that deducts bank holidays will have these applied automatically.',
      },
      {
        title: 'Invite your team',
        content: 'Head to Settings > Members and click "Invite". Enter each person\'s email address and choose their role (Employee, Manager, Admin, or Owner). They will receive an email invitation to create their account and join the workspace.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'You can complete onboarding in any order. The onboarding checklist on your dashboard tracks your progress.',
      },
      {
        type: 'warning',
        content: 'Make sure you set up leave policies before employees start booking time off, so balances are calculated correctly.',
      },
    ],
  },
  {
    slug: 'approving-leave',
    title: 'Approving and Rejecting Leave Requests',
    category: 'manager',
    description: 'Find pending requests, understand balance and clash indicators, approve or reject with a reason, and set up delegation.',
    steps: [
      {
        title: 'Find pending requests',
        content: 'Pending leave requests appear on your dashboard under "Pending approvals". You can also go to the Leave page and filter by status "Pending" to see all outstanding requests.',
      },
      {
        title: 'Review balance and clash indicators',
        content: 'Each pending request shows the employee\'s remaining balance after approval and highlights any date clashes with other team members. Green means no clashes; amber shows how many people are already off on those dates.',
      },
      {
        title: 'Approve a request',
        content: 'Click on a pending request to open it. Review the dates and details, then click "Approve". The employee will be notified by email and their balance will be updated automatically.',
      },
      {
        title: 'Reject a request',
        content: 'To reject, click "Decline" on the request. You will be asked to provide a reason, which the employee will see in their notification email. Be clear about why so the employee can rebook if needed.',
      },
      {
        title: 'Set up delegation',
        content: 'If you are going on leave yourself, go to Settings > Delegation and assign another manager to handle approvals while you are away. Pending requests will appear on their dashboard instead.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'You will receive an email notification whenever an employee submits a new leave request.',
      },
      {
        type: 'warning',
        content: 'Rejecting a request without a reason can be frustrating for employees. Always include a brief explanation.',
      },
    ],
  },
  {
    slug: 'managing-rotas',
    title: 'Managing Rotas and Shifts',
    category: 'manager',
    description: 'Create rotas, add shift templates, assign employees to shifts, handle conflicts, copy weeks, and publish schedules.',
    steps: [
      {
        title: 'Create a rota',
        content: 'Go to Rotas & Shifts and click "New rota". Give it a name (e.g. "Customer Support Rota") and select the start date. Choose which employees are included in this rota.',
      },
      {
        title: 'Add shift templates',
        content: 'Click "Add shift" to create shift templates with a name, start time, end time, and colour. Common templates include "Early (6am-2pm)", "Late (2pm-10pm)", and "Night (10pm-6am)".',
      },
      {
        title: 'Assign employees to shifts',
        content: 'Drag and drop shift templates onto the weekly grid for each employee. You can also click a cell and select the shift from a dropdown. Assigned shifts will show the shift colour and times.',
      },
      {
        title: 'Handle conflict warnings',
        content: 'If you assign a shift that overlaps with an existing shift or approved leave, a warning icon will appear. Click the warning to see details and resolve the conflict before publishing.',
      },
      {
        title: 'Copy weeks',
        content: 'To repeat a schedule, click "Copy week" and select which week to duplicate. This saves time for regular repeating patterns. You can copy to one or multiple future weeks at once.',
      },
      {
        title: 'Publish the rota',
        content: 'When your schedule is ready, click "Publish". Employees will be able to see their upcoming shifts. Any changes after publishing will be highlighted so employees can spot updates.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Employees can view their upcoming shifts from their dashboard once the rota is published.',
      },
    ],
  },
  {
    slug: 'performance-reviews',
    title: 'Running Performance Reviews',
    category: 'manager',
    description: 'Set up review cycles, understand auto-assignment, complete reviews with ratings, and track completion across your team.',
    steps: [
      {
        title: 'Create a review cycle',
        content: 'Go to Performance > Reviews and click "New cycle". Give it a name (e.g. "Q1 2026 Review"), set the review period dates, and choose the deadline for completion.',
      },
      {
        title: 'Understand auto-assignment',
        content: 'Reviews are automatically assigned to all active employees in the workspace when you create a cycle. Each employee\'s review is assigned to their line manager. You can reassign individual reviews if needed.',
      },
      {
        title: 'Complete a review',
        content: 'Open an assigned review and fill in the assessment sections. Add comments on goals, achievements, and areas for development. Select an overall rating from the scale provided.',
      },
      {
        title: 'Track completion',
        content: 'The review cycle overview shows how many reviews are completed, in progress, and not yet started. You can send reminders to managers who have not completed their reviews by the deadline.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Employees can view their completed reviews from their profile once a review is marked as finalised.',
      },
      {
        type: 'warning',
        content: 'Review data is sensitive. Only the employee, their reviewer, and admins can see individual reviews.',
      },
    ],
  },
  {
    slug: 'reports-exports',
    title: 'Reports and Data Exports',
    category: 'manager',
    description: 'Browse available report types, filter by date and employee, export CSV files, and understand absence data.',
    steps: [
      {
        title: 'Access reports',
        content: 'Navigate to Reports from the sidebar. You will see a selection of report types including Absence Summary, Bradford Factor, Leave Balances, Lateness, and more.',
      },
      {
        title: 'Filter your data',
        content: 'Each report allows you to filter by date range, department, and individual employee. Set your filters and click "Generate" to refresh the report with the selected criteria.',
      },
      {
        title: 'Export to CSV',
        content: 'Click the "Export CSV" button on any report to download the data as a spreadsheet. This is useful for payroll processing, audits, or sharing data with your HR team.',
      },
      {
        title: 'Understand absence data',
        content: 'The Absence Summary report shows total days taken by leave type, including a breakdown of how many were full days versus half days. The Bradford Factor report helps identify patterns of short, frequent absences.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Reports are generated in real time, so the data always reflects the current state of your workspace.',
      },
    ],
  },
  {
    slug: 'managing-employees',
    title: 'Managing Employee Profiles',
    category: 'manager',
    description: 'Add new employees, edit their details, adjust leave balances, record lateness, view Bradford Factor scores, and handle termination.',
    steps: [
      {
        title: 'Add a new employee',
        content: 'Go to Employees and click "Add employee". Fill in their personal details, job title, department, start date, and working pattern. Assign them to the correct leave policies.',
      },
      {
        title: 'Edit employee details',
        content: 'Click on an employee\'s name to open their profile. Use the "Edit" button to update their information such as job title, department, contact details, or working pattern.',
      },
      {
        title: 'Adjust leave balances',
        content: 'On an employee\'s profile, go to the Leave Balances tab. You can manually adjust their allowance for any policy, for example to add extra contractual days or to correct a mistake.',
      },
      {
        title: 'Record lateness',
        content: 'From the dashboard or an employee\'s profile, use the "Record lateness" action. Enter the date, duration, and optional notes. Lateness records feed into the lateness report.',
      },
      {
        title: 'View Bradford Factor',
        content: 'The Bradford Factor score appears on each employee\'s profile and in the Bradford Factor report. It measures the impact of short, frequent absences. Higher scores indicate a pattern that may need attention.',
      },
      {
        title: 'Terminate an employee',
        content: 'To mark an employee as no longer active, edit their profile and set a leaving date. They will be marked as inactive and excluded from rotas, reviews, and future leave calculations.',
      },
    ],
    tips: [
      {
        type: 'warning',
        content: 'Setting a leaving date does not delete the employee\'s data. Their historical records are preserved for reporting and compliance.',
      },
    ],
  },
  {
    slug: 'settings-guide',
    title: 'Configuring Settings',
    category: 'manager',
    description: 'Configure leave policies, allowances, notice periods, accrual, service bonuses, blackout dates, bank holidays, company leave, delegation, and calendar sync.',
    steps: [
      {
        title: 'Leave policy allowances',
        content: 'Go to Settings > Leave Policies. For each policy, set the annual allowance in days. You can also enable pro-rata calculation for employees who start mid-year.',
      },
      {
        title: 'Notice periods and restrictions',
        content: 'Set how many days\' notice employees must give before booking leave. You can also limit how far in advance they can book and set a maximum number of consecutive days.',
      },
      {
        title: 'Accrual settings',
        content: 'Enable monthly accrual if you want leave to build up gradually over the year rather than being available all at once. The accrued balance updates on the first of each month.',
      },
      {
        title: 'Service-based bonuses',
        content: 'Configure automatic extra leave days based on years of service. For example, add 1 extra day after 2 years and another after 5 years. These are applied automatically based on each employee\'s start date.',
      },
      {
        title: 'Blackout dates',
        content: 'Set dates when employees cannot book leave, such as busy periods or end-of-year deadlines. Employees will see a message explaining that these dates are blocked when they try to book.',
      },
      {
        title: 'Bank holidays and company leave',
        content: 'Manage your bank holiday calendar and create company-wide leave blocks (e.g. Christmas shutdown). Company leave is automatically applied to all employees without using their personal allowance.',
      },
      {
        title: 'Delegation',
        content: 'In Settings > Delegation, assign a backup approver for when you are on leave. All pending requests and notifications will be routed to your delegate.',
      },
      {
        title: 'Calendar sync',
        content: 'Enable calendar sync to export leave data to Google Calendar or Outlook. Go to Settings and look for the calendar subscription link. Copy the iCal URL and add it to your calendar app.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Changes to leave policies take effect immediately. Existing approved leave will not be retroactively affected.',
      },
      {
        type: 'warning',
        content: 'Be careful when reducing allowances mid-year. If employees have already used more than the new allowance, their balance will show as negative.',
      },
    ],
  },
  {
    slug: 'clock-in-setup',
    title: 'Setting Up Clock-In and Locations',
    category: 'manager',
    description: 'Enable clock-in tracking, create locations with QR codes, view timesheets, and export payroll data.',
    steps: [
      {
        title: 'Enable clock-in',
        content: 'Go to Settings and toggle on the Clock-In feature. This adds the Clock-ins section to the sidebar for all users in your workspace.',
      },
      {
        title: 'Create locations',
        content: 'Navigate to Clock-ins > Locations and click "Add location". Enter the location name and address. A unique QR code is generated automatically for each location.',
      },
      {
        title: 'Print and display QR codes',
        content: 'Click the QR code icon next to a location to download or print it. Display the printed QR code at the location entrance so employees can scan it when arriving and leaving.',
      },
      {
        title: 'View timesheets',
        content: 'Go to Clock-ins to see a live view of who is currently clocked in. Click on an employee\'s name to see their full timesheet with clock-in/out times, break durations, and total hours.',
      },
      {
        title: 'Export payroll data',
        content: 'Use the Export button on the timesheet view to download clock-in data as a CSV. Filter by date range and employee to get exactly the data you need for payroll processing.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Employees can clock in by scanning the QR code with their phone camera, or by using the Clock In button in the app.',
      },
      {
        type: 'warning',
        content: 'If an employee forgets to clock out, their session will remain open. Managers can manually add a clock-out time from the timesheet view.',
      },
    ],
  },

  // ── Employee Guides ─────────────────────────────────────────────────
  {
    slug: 'booking-leave',
    title: 'How to Book Leave',
    category: 'employee',
    description: 'Book leave, select dates, book half days, check your balance, and understand what happens after you submit.',
    steps: [
      {
        title: 'Start a new request',
        content: 'Go to Leave from the sidebar and click "Book leave". You can also click "Book leave" from the quick actions on your dashboard.',
      },
      {
        title: 'Select the leave type',
        content: 'Choose the type of leave from the dropdown (e.g. Annual Leave, TOIL). The available types depend on which policies your manager has set up for the workspace.',
      },
      {
        title: 'Choose your dates',
        content: 'Select the start and end dates for your leave. The calendar will highlight any blackout dates (blocked) and bank holidays. Weekends are automatically excluded from the calculation.',
      },
      {
        title: 'Book half days',
        content: 'If you only need a morning or afternoon off, tick the "Half day" option for the start or end date. Half days count as 0.5 days from your allowance.',
      },
      {
        title: 'Check your balance',
        content: 'Before submitting, the form shows your current balance and what it will be after this request is approved. Make sure you have enough remaining days.',
      },
      {
        title: 'Submit your request',
        content: 'Click "Submit request". Your manager will receive an email notification and the request will appear as Pending. You will get an email once it is approved or declined.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'You can cancel a pending request at any time before it is approved. Go to Leave and click "Cancel" on the request.',
      },
      {
        type: 'warning',
        content: 'Some workspaces require a minimum notice period. If your dates are too soon, you will see an error explaining the minimum notice required.',
      },
    ],
  },
  {
    slug: 'reporting-sick',
    title: 'Reporting Sickness',
    category: 'employee',
    description: 'Self-report sick leave, understand what your manager sees, learn about fit notes and return-to-work interviews.',
    steps: [
      {
        title: 'Report yourself as sick',
        content: 'Click "Report sickness" on your dashboard or go to Leave > Report Sickness. Select today as the start date (or the date you first felt unwell). You do not need to set an end date yet.',
      },
      {
        title: 'Add details',
        content: 'Optionally, add a brief note about the nature of your illness. This helps your manager understand the situation but you are not required to share detailed medical information.',
      },
      {
        title: 'What your manager sees',
        content: 'Your manager will receive a notification that you have reported sick. The leave request appears on the dashboard and calendar. They can see the start date and any notes you provided.',
      },
      {
        title: 'Fit notes for extended absence',
        content: 'If your sickness lasts more than 7 calendar days, you are required to provide a fit note (Statement of Fitness for Work) from your GP. Your manager will be alerted if a fit note is outstanding.',
      },
      {
        title: 'Return-to-work interview',
        content: 'When your sickness absence ends, your manager may schedule a return-to-work interview. This is a brief conversation to check you are well enough to resume work and discuss any support you might need.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Sickness absences are recorded separately from annual leave and do not reduce your holiday allowance.',
      },
      {
        type: 'warning',
        content: 'Report sickness as early as possible on the day. This helps your manager adjust workload and coverage.',
      },
    ],
  },
  {
    slug: 'your-balance',
    title: 'Understanding Your Leave Balance',
    category: 'employee',
    description: 'Find your balance, understand used, pending and remaining amounts, learn how accrual works, and carry-over rules.',
    steps: [
      {
        title: 'Find your balance',
        content: 'Your leave balance is displayed on your dashboard under "My Summary". It shows your balance for each leave type. You can also see a detailed breakdown on the Leave > Balances page.',
      },
      {
        title: 'Understand the breakdown',
        content: '"Allowance" is your total entitlement for the year. "Used" is days already taken and approved. "Pending" is days requested but not yet approved. "Remaining" is what you have left to book.',
      },
      {
        title: 'How accrual works',
        content: 'If your workplace uses monthly accrual, your balance builds up over the year. On the first of each month, a portion of your annual allowance becomes available. You cannot book more than your accrued amount.',
      },
      {
        title: 'Carry-over from last year',
        content: 'Some workspaces allow you to carry over unused days from the previous year. Carried-over days are added to your allowance at the start of the new leave year. Check with your manager for your workplace rules.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'If you started part-way through the year, your allowance may be pro-rated based on your start date.',
      },
    ],
  },
  {
    slug: 'updating-details',
    title: 'Updating Your Contact Details',
    category: 'employee',
    description: 'Learn what details you can edit yourself and what changes require a manager.',
    steps: [
      {
        title: 'Go to your profile',
        content: 'Click on your name or avatar in the top bar and select "Profile". This shows your personal and employment details as they are recorded in the system.',
      },
      {
        title: 'Edit your contact details',
        content: 'You can update your phone number, personal email, and home address directly. Click "Edit" next to your contact information, make your changes, and click "Save".',
      },
      {
        title: 'Changes that need a manager',
        content: 'Employment details like job title, department, working pattern, and start date can only be changed by a manager or admin. If these need updating, speak to your manager or HR team.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Keeping your contact details up to date ensures you receive important notifications and that your emergency contact information is current.',
      },
    ],
  },
  {
    slug: 'using-clock-in',
    title: 'Using Clock-In',
    category: 'employee',
    description: 'Clock in and out, scan QR codes, add break time, and view your timesheet.',
    steps: [
      {
        title: 'Clock in when you arrive',
        content: 'Open Clock-ins from the sidebar and tap "Clock In". If your workplace uses QR codes, scan the code at your location entrance using your phone camera. This records your start time.',
      },
      {
        title: 'Clock out when you leave',
        content: 'At the end of your shift, open Clock-ins and tap "Clock Out". Your total hours for the day will be calculated automatically.',
      },
      {
        title: 'Record break time',
        content: 'If you take a break, you can add it to your clock-in record. Enter the break duration in minutes. Break time is subtracted from your total working hours.',
      },
      {
        title: 'View your timesheet',
        content: 'Go to Clock-ins to see your recent clock-in history. Each entry shows your clock-in time, clock-out time, break duration, and total hours worked. You can view a weekly or monthly summary.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'If you forget to clock out, let your manager know. They can add the missing clock-out time on your behalf.',
      },
      {
        type: 'warning',
        content: 'QR code scanning requires camera access on your phone. Make sure you allow camera permissions when prompted.',
      },
    ],
  },
  {
    slug: 'submitting-expenses',
    title: 'Submitting Expense Claims',
    category: 'employee',
    description: 'Create expense claims, upload receipts, choose categories, and track the approval status of your submissions.',
    steps: [
      {
        title: 'Create a new claim',
        content: 'Go to Expenses from the sidebar and click "New expense". Enter a description, the amount, and the date of the expense.',
      },
      {
        title: 'Select a category',
        content: 'Choose the appropriate category for your expense (e.g. Travel, Meals, Equipment, Other). This helps your manager and the finance team process claims efficiently.',
      },
      {
        title: 'Upload your receipt',
        content: 'Attach a photo or scan of your receipt. Click "Upload receipt" and select the file from your device. Supported formats include JPEG, PNG, and PDF.',
      },
      {
        title: 'Submit for approval',
        content: 'Review the details and click "Submit". Your manager will receive a notification and can approve or reject the claim. You will be notified of the outcome by email.',
      },
      {
        title: 'Track your claims',
        content: 'On the Expenses page, you can see all your submitted claims with their current status: Pending, Approved, or Rejected. Click on any claim to see the full details and any comments from your manager.',
      },
    ],
    tips: [
      {
        type: 'info',
        content: 'Submit expenses as soon as possible after the purchase. Most workplaces have a deadline for submitting claims.',
      },
      {
        type: 'warning',
        content: 'Always include a clear receipt. Claims without receipts may be rejected.',
      },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug)
}

export function getGuidesByCategory(category: 'manager' | 'employee' | 'both'): Guide[] {
  return guides.filter((g) => g.category === category || g.category === 'both')
}

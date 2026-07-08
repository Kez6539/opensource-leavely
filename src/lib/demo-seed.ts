import bcrypt from 'bcryptjs'

/**
 * Shared demo-tenant seed logic.
 *
 * Used in two places:
 *  - `prisma/seed.ts` (Node, via tsx) — manual seeding with the neon HTTP
 *    driver's tagged-template function.
 *  - `src/app/api/cron/reset-demo/route.ts` (Cloudflare Workers) — the
 *    weekly demo reset, with a tagged-template adapter over a Pool client
 *    so the whole wipe-and-reseed runs in one transaction.
 *
 * Every statement is an upsert keyed on a deterministic id (or unique
 * column), so running it against a half-populated database is safe. The
 * demo tenant row and the demo user rows are never deleted by the reset —
 * they're updated in place so existing sessions and magic links keep
 * resolving — which is why the upserts here also reset profile fields
 * (name, password hash, disabled flag) back to seed values.
 */

/** The one and only tenant this seed (and the scheduled reset) may touch. */
export const DEMO_TENANT_SLUG = 'acme'

// ── Relative-date helpers ────────────────────────────────────────────────
// The demo used to hardcode early-2026 dates, so the scheduled reset
// faithfully re-seeded an increasingly stale workspace: pending requests
// from months ago, an empty current-month calendar, dead-looking KPIs.
// All seeded leave activity is now derived from "today" so every reset
// produces a current-looking demo.

const DAY_MS = 24 * 60 * 60 * 1000

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * DAY_MS)
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** The Monday strictly after `from` (UTC) — 1 to 7 days out. */
function nextMondayAfter(from: Date): Date {
  const dow = from.getUTCDay() // 0=Sun .. 6=Sat
  const add = ((8 - dow) % 7) || 7
  return addDays(from, add)
}

/**
 * Minimal tagged-template SQL executor. Matches the call signature of
 * `neon()(...)` from @neondatabase/serverless and of the Pool-client
 * adapter in the reset-demo cron route.
 */
export type SqlTag = (
  strings: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...values: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<Record<string, any>[]>

export async function seedDemoTenant(sql: SqlTag): Promise<{ tenantId: string }> {
  const hash = await bcrypt.hash('password123', 10)

  // Date anchors — everything time-sensitive hangs off these so the demo
  // stays evergreen across scheduled resets.
  const today = new Date()
  const fmt = isoDate
  const monNext = nextMondayAfter(today) // next Monday (1-7 days out)
  const monLast = addDays(monNext, -7) // Monday on or before today
  const onboardedAtIso = fmt(addDays(today, -120))

  // Upsert tenant — mark onboarding complete for demo
  const tenants = await sql`
    INSERT INTO "Tenant" (id, name, slug, "onboardingStep", "onboardedAt", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), 'Acme Corp', ${DEMO_TENANT_SLUG}, 4, ${onboardedAtIso}::timestamp, now(), now())
    ON CONFLICT (slug) DO UPDATE SET name = 'Acme Corp', "onboardingStep" = 4, "onboardedAt" = ${onboardedAtIso}::timestamp, "updatedAt" = now()
    RETURNING id
  `
  const tenantId = tenants[0].id as string

  // Users with realistic details
  const users = [
    { email: 'owner@acme.test', name: 'Alice Johnson', role: 'OWNER', title: 'Managing Director', dept: 'Leadership', dob: '1985-03-15', phone: '+44 7700 900100', address: '12 King Street, London SW1A 1AA', ecName: 'James Johnson', ecPhone: '+44 7700 900200' },
    { email: 'admin@acme.test', name: 'Bob Chen', role: 'ADMIN', title: 'HR Manager', dept: 'Human Resources', dob: '1990-07-22', phone: '+44 7700 900101', address: '45 Queens Road, Manchester M1 2AB', ecName: 'Mei Chen', ecPhone: '+44 7700 900201' },
    { email: 'manager@acme.test', name: 'Carol Williams', role: 'MANAGER', title: 'Engineering Lead', dept: 'Engineering', dob: '1988-11-05', phone: '+44 7700 900102', address: '8 Park Lane, Bristol BS1 3CD', ecName: 'Tom Williams', ecPhone: '+44 7700 900202' },
    { email: 'employee@acme.test', name: 'Dave Kumar', role: 'EMPLOYEE', title: 'Software Developer', dept: 'Engineering', dob: '1995-01-30', phone: '+44 7700 900103', address: '23 High Street, Cambridge CB2 1EF', ecName: 'Priya Kumar', ecPhone: '+44 7700 900203' },
  ]

  const createdUsers: Array<{ userId: string; employeeId: string; email: string; role: string }> = []

  for (const u of users) {
    const [firstName, ...rest] = u.name.split(' ')
    const lastName = rest.join(' ')

    // The ON CONFLICT branch deliberately resets name, password hash and
    // the disabled flag so the weekly demo reset restores the demo users
    // to a known-good state without ever deleting the User rows (existing
    // magic links / sessions reference these ids).
    const userRows = await sql`
      INSERT INTO "User" (id, email, name, "passwordHash", "authProvider", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${u.email}, ${u.name}, ${hash}, 'CREDENTIALS', now(), now())
      ON CONFLICT (email) DO UPDATE SET name = ${u.name}, "passwordHash" = ${hash}, "disabledAt" = NULL, "updatedAt" = now()
      RETURNING id
    `
    const userId = userRows[0].id as string

    await sql`
      INSERT INTO "Membership" (id, role, "tenantId", "userId", "createdAt")
      VALUES (gen_random_uuid(), ${u.role}::"Role", ${tenantId}, ${userId}, now())
      ON CONFLICT ("tenantId", "userId") DO UPDATE SET role = ${u.role}::"Role"
    `

    const empId = `${tenantId}-${userId}`
    await sql`
      INSERT INTO "Employee" (id, "firstName", "lastName", email, "jobTitle", department, "startDate", "dateOfBirth", phone, address, "emergencyContactName", "emergencyContactPhone", status, "tenantId", "userId", "createdAt", "updatedAt")
      VALUES (${empId}, ${firstName}, ${lastName}, ${u.email}, ${u.title}, ${u.dept}, '2024-01-15'::timestamp, ${u.dob}::timestamp, ${u.phone}, ${u.address}, ${u.ecName}, ${u.ecPhone}, 'ACTIVE', ${tenantId}, ${userId}, now(), now())
      ON CONFLICT (id) DO UPDATE SET "firstName" = ${firstName}, "lastName" = ${lastName}, "jobTitle" = ${u.title}, department = ${u.dept}, "dateOfBirth" = ${u.dob}::timestamp, phone = ${u.phone}, address = ${u.address}, "emergencyContactName" = ${u.ecName}, "emergencyContactPhone" = ${u.ecPhone}, "updatedAt" = now()
    `

    createdUsers.push({ userId, employeeId: empId, email: u.email, role: u.role })
  }

  // Super Admin
  await sql`
    INSERT INTO "User" (id, email, name, "passwordHash", "authProvider", "isSuperAdmin", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), 'superadmin@leavely.test', 'Super Admin', ${hash}, 'CREDENTIALS', true, now(), now())
    ON CONFLICT (email) DO UPDATE SET "isSuperAdmin" = true, "updatedAt" = now()
  `

  // Leave policies
  const holidayId = `${tenantId}-holiday`
  const sickId = `${tenantId}-sick`

  await sql`
    INSERT INTO "LeavePolicy" (id, name, unit, "allowHalfDay", "defaultAllowance", "tenantId", "createdAt", "updatedAt")
    VALUES (${holidayId}, 'Holiday', 'days', true, 28, ${tenantId}, now(), now())
    ON CONFLICT (id) DO UPDATE SET "defaultAllowance" = 28, "updatedAt" = now()
  `
  await sql`
    INSERT INTO "LeavePolicy" (id, name, unit, "allowHalfDay", "defaultAllowance", "tenantId", "createdAt", "updatedAt")
    VALUES (${sickId}, 'Sick Leave', 'days', false, 10, ${tenantId}, now(), now())
    ON CONFLICT (id) DO UPDATE SET "updatedAt" = now()
  `

  const alice = createdUsers.find(u => u.role === 'OWNER')!
  const bob = createdUsers.find(u => u.role === 'ADMIN')!
  const carol = createdUsers.find(u => u.role === 'MANAGER')!
  const dave = createdUsers.find(u => u.role === 'EMPLOYEE')!

  // Manager hierarchy: Carol → Alice, Dave → Carol
  await sql`UPDATE "Employee" SET "managerId" = ${alice.employeeId} WHERE id = ${carol.employeeId}`
  await sql`UPDATE "Employee" SET "managerId" = ${carol.employeeId} WHERE id = ${dave.employeeId}`

  // Emergency contacts — the scheduled reset wipes EmergencyContact but the
  // seed previously only populated the legacy emergencyContactName/Phone
  // columns on Employee, so the Emergencies tab rendered empty while the
  // Personal tab showed contact fields. Mirror each employee's contact
  // into the EmergencyContact table.
  for (let i = 0; i < users.length; i++) {
    const u = users[i]
    const created = createdUsers[i]
    await sql`
      INSERT INTO "EmergencyContact" (id, name, relationship, phone, "isPrimary", "employeeId", "tenantId", "createdAt", "updatedAt")
      VALUES (${`${created.employeeId}-ec`}, ${u.ecName}, 'Partner', ${u.ecPhone}, true, ${created.employeeId}, ${tenantId}, now(), now())
      ON CONFLICT (id) DO UPDATE SET name = ${u.ecName}, phone = ${u.ecPhone}, "updatedAt" = now()
    `
  }

  // Employee notes
  await sql`DELETE FROM "EmployeeNote" WHERE "tenantId" = ${tenantId}`

  const employeeNotes = [
    { empId: dave.employeeId, authorId: carol.userId, content: 'Completed 3-month probation successfully. Good performance across all areas.', at: '2024-04-15T10:00:00Z' },
    { empId: dave.employeeId, authorId: alice.userId, content: 'Promoted to mid-level developer following strong Q2 review.', at: '2024-07-01T09:00:00Z' },
    { empId: carol.employeeId, authorId: alice.userId, content: 'Completed management training programme. Now leading engineering team.', at: '2024-06-20T14:00:00Z' },
    { empId: bob.employeeId, authorId: alice.userId, content: 'Annual review completed. Exceeded targets in recruitment and employee satisfaction.', at: '2025-01-15T11:00:00Z' },
  ]

  for (const n of employeeNotes) {
    await sql`
      INSERT INTO "EmployeeNote" (id, content, "employeeId", "authorId", "tenantId", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${n.content}, ${n.empId}, ${n.authorId}, ${tenantId}, ${n.at}::timestamp, ${n.at}::timestamp)
    `
  }

  // Leave requests — all dates derived from today (Monday-aligned so the
  // multi-day spans are clean Mon-Fri business weeks).
  const leaveRequests = [
    // Pending holiday ~2-3 weeks out (Mon-Fri)
    { id: `${tenantId}-sample-1`, start: fmt(addDays(monNext, 14)), end: fmt(addDays(monNext, 18)), status: 'PENDING', empId: alice.employeeId, policyId: holidayId, reason: 'Holiday abroad', decidedBy: null as string | null, decidedAt: null as string | null },
    // Approved single sick day ~4 weeks ago (a Monday)
    { id: `${tenantId}-sample-2`, start: fmt(addDays(monLast, -21)), end: fmt(addDays(monLast, -21)), status: 'APPROVED', empId: alice.employeeId, policyId: sickId, reason: 'Doctor appointment', decidedBy: bob.userId, decidedAt: fmt(addDays(monLast, -21)) },
    // Pending sick report from the start of this week (Mon-Tue)
    { id: `${tenantId}-sample-3`, start: fmt(monLast), end: fmt(addDays(monLast, 1)), status: 'PENDING', empId: dave.employeeId, policyId: sickId, reason: 'Feeling unwell', decidedBy: null, decidedAt: null },
    // Approved holiday ~3-4 weeks out (Mon-Fri)
    { id: `${tenantId}-sample-4`, start: fmt(addDays(monNext, 21)), end: fmt(addDays(monNext, 25)), status: 'APPROVED', empId: carol.employeeId, policyId: holidayId, reason: 'Family trip', decidedBy: alice.userId, decidedAt: fmt(addDays(today, -7)) },
    // Rejected holiday ~5-6 weeks out (Mon-Fri)
    { id: `${tenantId}-sample-5`, start: fmt(addDays(monNext, 35)), end: fmt(addDays(monNext, 39)), status: 'REJECTED', empId: dave.employeeId, policyId: holidayId, reason: 'Holiday request', decidedBy: carol.userId, decidedAt: fmt(addDays(today, -10)) },
  ]

  for (const lr of leaveRequests) {
    await sql`
      INSERT INTO "LeaveRequest" (id, "startDate", "endDate", status, "tenantId", "employeeId", "policyId", reason, "decidedBy", "decidedAt", "createdAt", "updatedAt")
      VALUES (${lr.id}, ${lr.start}::timestamp, ${lr.end}::timestamp, ${lr.status}::"LeaveStatus", ${tenantId}, ${lr.empId}, ${lr.policyId}, ${lr.reason}, ${lr.decidedBy}, ${lr.decidedAt ? lr.decidedAt + 'T10:00:00Z' : null}::timestamp, now(), now())
      ON CONFLICT (id) DO UPDATE SET "startDate" = ${lr.start}::timestamp, "endDate" = ${lr.end}::timestamp, status = ${lr.status}::"LeaveStatus", "employeeId" = ${lr.empId}, "decidedBy" = ${lr.decidedBy}, "decidedAt" = ${lr.decidedAt ? lr.decidedAt + 'T10:00:00Z' : null}::timestamp, "updatedAt" = now()
    `
  }

  // Delete old non-GB holidays
  await sql`DELETE FROM "PublicHoliday" WHERE "tenantId" = ${tenantId} AND country != 'GB'`

  // UK Bank Holidays
  const ukHolidays = [
    { name: "New Year's Day", date: '2025-01-01' },
    { name: 'Good Friday', date: '2025-04-18' },
    { name: 'Easter Monday', date: '2025-04-21' },
    { name: 'Early May Bank Holiday', date: '2025-05-05' },
    { name: 'Spring Bank Holiday', date: '2025-05-26' },
    { name: 'Summer Bank Holiday', date: '2025-08-25' },
    { name: 'Christmas Day', date: '2025-12-25' },
    { name: 'Boxing Day', date: '2025-12-26' },
    { name: "New Year's Day", date: '2026-01-01' },
    { name: 'Good Friday', date: '2026-04-03' },
    { name: 'Easter Monday', date: '2026-04-06' },
    { name: 'Early May Bank Holiday', date: '2026-05-04' },
    { name: 'Spring Bank Holiday', date: '2026-05-25' },
    { name: 'Summer Bank Holiday', date: '2026-08-31' },
    { name: 'Christmas Day', date: '2026-12-25' },
    { name: 'Boxing Day (substitute)', date: '2026-12-28' },
  ]

  for (const h of ukHolidays) {
    await sql`
      INSERT INTO "PublicHoliday" (id, name, date, country, "tenantId", "createdAt")
      VALUES (${tenantId + '-' + h.date}, ${h.name}, ${h.date}::timestamp, 'GB', ${tenantId}, now())
      ON CONFLICT (id) DO UPDATE SET name = ${h.name}, country = 'GB'
    `
  }

  // Company Leave
  await sql`
    INSERT INTO "CompanyLeave" (id, name, "startDate", "endDate", "tenantId", "createdAt")
    VALUES (${tenantId + '-xmas-2026'}, 'Christmas Closure 2026', '2026-12-24'::timestamp, '2026-12-31'::timestamp, ${tenantId}, now())
    ON CONFLICT (id) DO NOTHING
  `

  // Clear and re-seed audit log
  await sql`DELETE FROM "AuditLog" WHERE "tenantId" = ${tenantId}`

  // Timestamps derived from the same anchors as the leave requests so the
  // audit trail tells a consistent, current story.
  const auditEntries = [
    { action: 'tenant.created', entity: 'Tenant', entityId: tenantId, userId: alice.userId, at: `${fmt(addDays(today, -120))}T09:00:00Z` },
    { action: 'employee.created', entity: 'Employee', entityId: alice.employeeId, userId: alice.userId, at: `${fmt(addDays(today, -120))}T09:05:00Z` },
    { action: 'employee.created', entity: 'Employee', entityId: bob.employeeId, userId: alice.userId, at: `${fmt(addDays(today, -120))}T09:10:00Z` },
    { action: 'employee.created', entity: 'Employee', entityId: carol.employeeId, userId: alice.userId, at: `${fmt(addDays(today, -119))}T10:00:00Z` },
    { action: 'employee.created', entity: 'Employee', entityId: dave.employeeId, userId: alice.userId, at: `${fmt(addDays(today, -119))}T10:05:00Z` },
    { action: 'leave_policy.created', entity: 'LeavePolicy', entityId: holidayId, userId: alice.userId, at: `${fmt(addDays(today, -118))}T11:00:00Z` },
    { action: 'leave_policy.created', entity: 'LeavePolicy', entityId: sickId, userId: alice.userId, at: `${fmt(addDays(today, -118))}T11:05:00Z` },
    { action: 'tenant.onboarding_completed', entity: 'Tenant', entityId: tenantId, userId: alice.userId, at: `${fmt(addDays(today, -118))}T11:30:00Z` },
    { action: 'leave_request.created', entity: 'LeaveRequest', entityId: `${tenantId}-sample-2`, userId: alice.userId, at: `${fmt(addDays(monLast, -21))}T08:30:00Z` },
    { action: 'leave_request.approved', entity: 'LeaveRequest', entityId: `${tenantId}-sample-2`, userId: bob.userId, at: `${fmt(addDays(monLast, -21))}T09:00:00Z` },
    { action: 'leave_request.created', entity: 'LeaveRequest', entityId: `${tenantId}-sample-1`, userId: alice.userId, at: `${fmt(addDays(today, -2))}T09:00:00Z` },
    { action: 'leave_request.created', entity: 'LeaveRequest', entityId: `${tenantId}-sample-4`, userId: carol.userId, at: `${fmt(addDays(today, -8))}T10:00:00Z` },
    { action: 'leave_request.approved', entity: 'LeaveRequest', entityId: `${tenantId}-sample-4`, userId: alice.userId, at: `${fmt(addDays(today, -7))}T10:30:00Z` },
    { action: 'leave_request.created', entity: 'LeaveRequest', entityId: `${tenantId}-sample-5`, userId: dave.userId, at: `${fmt(addDays(today, -11))}T08:00:00Z` },
    { action: 'leave_request.rejected', entity: 'LeaveRequest', entityId: `${tenantId}-sample-5`, userId: carol.userId, at: `${fmt(addDays(today, -10))}T09:00:00Z` },
    { action: 'leave_request.created', entity: 'LeaveRequest', entityId: `${tenantId}-sample-3`, userId: dave.userId, at: `${fmt(monLast)}T08:00:00Z` },
  ]

  for (const e of auditEntries) {
    await sql`
      INSERT INTO "AuditLog" (id, action, entity, "entityId", "userId", "tenantId", "createdAt")
      VALUES (gen_random_uuid(), ${e.action}, ${e.entity}, ${e.entityId}, ${e.userId}, ${tenantId}, ${e.at}::timestamp)
    `
  }

  // Onboarding Template
  const templateId = `${tenantId}-eng-template`
  await sql`
    INSERT INTO "OnboardingTemplate" (id, name, "tenantId", "createdAt", "updatedAt")
    VALUES (${templateId}, 'Engineering Starter Pack', ${tenantId}, now(), now())
    ON CONFLICT (id) DO UPDATE SET name = 'Engineering Starter Pack', "updatedAt" = now()
  `

  // Delete existing template items to re-seed
  await sql`DELETE FROM "OnboardingTemplateItem" WHERE "templateId" = ${templateId}`

  const templateItems = [
    { title: 'Set up development environment', description: 'Install IDE, Git, Node.js, and required tools', assignTo: 'IT', sort: 0 },
    { title: 'Complete HR paperwork', description: 'Tax forms, bank details, emergency contacts', assignTo: 'HR', sort: 1 },
    { title: 'Attend orientation session', description: 'Company overview, values, and policies', assignTo: 'HR', sort: 2 },
    { title: 'Set up Slack and email', description: 'Create accounts and join required channels', assignTo: 'IT', sort: 3 },
    { title: 'Read codebase documentation', description: 'Architecture docs, coding standards, and deployment guides', assignTo: 'EMPLOYEE', sort: 4 },
    { title: 'Schedule 1:1 with manager', description: 'Meet your manager to discuss role expectations and goals', assignTo: 'MANAGER', sort: 5 },
    { title: 'Complete security training', description: 'Information security and data protection training', assignTo: 'EMPLOYEE', sort: 6 },
    { title: 'Schedule probation review', description: 'Set date for 3-month probation review meeting', assignTo: 'MANAGER', sort: 7 },
  ]

  for (const item of templateItems) {
    await sql`
      INSERT INTO "OnboardingTemplateItem" (id, "templateId", title, description, "assignTo", "sortOrder", "createdAt")
      VALUES (gen_random_uuid(), ${templateId}, ${item.title}, ${item.description}, ${item.assignTo}::"OnboardingAssignTo", ${item.sort}, now())
    `
  }

  // Onboarding Checklist for Dave
  const checklistId = `${tenantId}-dave-checklist`
  await sql`
    INSERT INTO "OnboardingChecklist" (id, "employeeId", "templateId", "tenantId", "createdAt", "updatedAt")
    VALUES (${checklistId}, ${dave.employeeId}, ${templateId}, ${tenantId}, '2024-01-15'::timestamp, now())
    ON CONFLICT (id) DO UPDATE SET "updatedAt" = now()
  `

  // Delete existing tasks to re-seed
  await sql`DELETE FROM "OnboardingTask" WHERE "checklistId" = ${checklistId}`

  const checklistTasks = [
    { title: 'Set up development environment', description: 'Install IDE, Git, Node.js, and required tools', assignTo: 'IT', sort: 0, completed: true },
    { title: 'Complete HR paperwork', description: 'Tax forms, bank details, emergency contacts', assignTo: 'HR', sort: 1, completed: true },
    { title: 'Attend orientation session', description: 'Company overview, values, and policies', assignTo: 'HR', sort: 2, completed: true },
    { title: 'Set up Slack and email', description: 'Create accounts and join required channels', assignTo: 'IT', sort: 3, completed: true },
    { title: 'Read codebase documentation', description: 'Architecture docs, coding standards, and deployment guides', assignTo: 'EMPLOYEE', sort: 4, completed: true },
    { title: 'Schedule 1:1 with manager', description: 'Meet your manager to discuss role expectations and goals', assignTo: 'MANAGER', sort: 5, completed: true },
    { title: 'Complete security training', description: 'Information security and data protection training', assignTo: 'EMPLOYEE', sort: 6, completed: false },
    { title: 'Schedule probation review', description: 'Set date for 3-month probation review meeting', assignTo: 'MANAGER', sort: 7, completed: false },
  ]

  for (const task of checklistTasks) {
    await sql`
      INSERT INTO "OnboardingTask" (id, "checklistId", title, description, "assignTo", "completedAt", "completedBy", "sortOrder", "createdAt")
      VALUES (gen_random_uuid(), ${checklistId}, ${task.title}, ${task.description}, ${task.assignTo}::"OnboardingAssignTo", ${task.completed ? '2024-01-20T10:00:00Z' : null}::timestamp, ${task.completed ? carol.userId : null}, ${task.sort}, '2024-01-15'::timestamp)
    `
  }

  // Announcements
  await sql`DELETE FROM "Announcement" WHERE "tenantId" = ${tenantId}`

  const announcements = [
    { title: 'Welcome to Leavely!', content: 'We are excited to launch our new leave management platform. All employees can now submit leave requests, view their balances, and track approvals online. If you have any questions, please reach out to HR.', publishedAt: `${fmt(addDays(today, -118))}T09:00:00Z`, expiresAt: null as string | null, authorId: alice.userId },
    { title: 'Holiday planning reminder', content: 'Please submit any remaining holiday requests for the months ahead so we can plan cover in good time. Requests are reviewed within two working days.', publishedAt: `${fmt(addDays(today, -3))}T09:00:00Z`, expiresAt: null, authorId: bob.userId },
    { title: 'Updated Sick Leave Policy', content: 'We have updated our sick leave policy effective immediately. Employees are now entitled to 10 days of paid sick leave per year. Please review the full policy in the HR handbook or contact Bob Chen for any questions.', publishedAt: `${fmt(addDays(today, -14))}T09:00:00Z`, expiresAt: null, authorId: bob.userId },
  ]

  for (const a of announcements) {
    await sql`
      INSERT INTO "Announcement" (id, title, content, "publishedAt", "expiresAt", "authorId", "tenantId", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${a.title}, ${a.content}, ${a.publishedAt}::timestamp, ${a.expiresAt}::timestamp, ${a.authorId}, ${tenantId}, now(), now())
    `
  }

  // Sick leave requests for Dave (Bradford Factor demo: 4 spells x 7 days
  // = 4^2 x 7 = 112). Spread over the trailing ~30 weeks so all spells stay
  // inside the 52-week rolling window regardless of when the reset runs.
  const sickLeaveRequests = [
    { id: `${tenantId}-sick-1`, start: fmt(addDays(monLast, -210)), end: fmt(addDays(monLast, -210)), empId: dave.employeeId, decidedBy: carol.userId },
    { id: `${tenantId}-sick-2`, start: fmt(addDays(monLast, -140)), end: fmt(addDays(monLast, -139)), empId: dave.employeeId, decidedBy: carol.userId },
    { id: `${tenantId}-sick-3`, start: fmt(addDays(monLast, -70)), end: fmt(addDays(monLast, -70)), empId: dave.employeeId, decidedBy: carol.userId },
    { id: `${tenantId}-sick-4`, start: fmt(addDays(monLast, -28)), end: fmt(addDays(monLast, -26)), empId: dave.employeeId, decidedBy: carol.userId },
  ]

  for (const lr of sickLeaveRequests) {
    await sql`
      INSERT INTO "LeaveRequest" (id, "startDate", "endDate", status, "tenantId", "employeeId", "policyId", reason, "decidedBy", "decidedAt", "createdAt", "updatedAt")
      VALUES (${lr.id}, ${lr.start}::timestamp, ${lr.end}::timestamp, 'APPROVED'::"LeaveStatus", ${tenantId}, ${lr.empId}, ${sickId}, 'Feeling unwell', ${lr.decidedBy}, ${lr.start}::timestamp, ${lr.start}::timestamp, now())
      ON CONFLICT (id) DO UPDATE SET "startDate" = ${lr.start}::timestamp, "endDate" = ${lr.end}::timestamp, status = 'APPROVED'::"LeaveStatus", "decidedAt" = ${lr.start}::timestamp, "updatedAt" = now()
    `
  }

  // ── Leave balances ───────────────────────────────────────────────────
  // The scheduled reset wipes LeaveBalance; ensureBalances() then lazily
  // recreates rows with used=0 / pending=0 and nothing ever recomputes the
  // counters from LeaveRequest rows — so the demo showed Dave with a full
  // Bradford history next to a 0-used Sick Leave balance. Seed counters
  // that match the seeded requests: business days, excluding weekends and
  // the seeded GB bank holidays, grouped by calendar year (the demo tenant
  // uses the default January leave year).
  const holidayDateSet = new Set(ukHolidays.map((h) => h.date))
  const tallies = new Map<string, { used: number; pending: number }>()
  const addToTally = (
    empId: string,
    policyId: string,
    startIso: string,
    endIso: string,
    kind: 'used' | 'pending',
  ) => {
    let d = new Date(`${startIso}T00:00:00Z`)
    const end = new Date(`${endIso}T00:00:00Z`)
    while (d <= end) {
      const dow = d.getUTCDay()
      if (dow !== 0 && dow !== 6 && !holidayDateSet.has(isoDate(d))) {
        const key = `${empId}|${policyId}|${d.getUTCFullYear()}`
        const t = tallies.get(key) ?? { used: 0, pending: 0 }
        t[kind] += 1
        tallies.set(key, t)
      }
      d = addDays(d, 1)
    }
  }
  for (const lr of leaveRequests) {
    if (lr.status === 'APPROVED') addToTally(lr.empId, lr.policyId, lr.start, lr.end, 'used')
    else if (lr.status === 'PENDING') addToTally(lr.empId, lr.policyId, lr.start, lr.end, 'pending')
    // REJECTED requests never hit the counters.
  }
  for (const lr of sickLeaveRequests) {
    addToTally(lr.empId, sickId, lr.start, lr.end, 'used')
  }

  const currentYear = today.getUTCFullYear()
  const policyMeta = [
    { id: holidayId, allowance: 28 },
    { id: sickId, allowance: 10 },
  ]
  // Every employee gets a current-year row even with no seeded activity,
  // plus rows for any other (employee, policy, year) the tallies touched.
  const balanceKeys = new Set<string>()
  for (const cu of createdUsers) {
    for (const p of policyMeta) balanceKeys.add(`${cu.employeeId}|${p.id}|${currentYear}`)
  }
  for (const key of tallies.keys()) balanceKeys.add(key)

  for (const key of balanceKeys) {
    const [empId, policyId, yearStr] = key.split('|')
    const year = Number(yearStr)
    const allowance = policyMeta.find((p) => p.id === policyId)!.allowance
    const t = tallies.get(key) ?? { used: 0, pending: 0 }
    await sql`
      INSERT INTO "LeaveBalance" (id, "employeeId", "policyId", "tenantId", year, allowance, used, pending, "carryoverDays")
      VALUES (gen_random_uuid(), ${empId}, ${policyId}, ${tenantId}, ${year}, ${allowance}, ${t.used}, ${t.pending}, 0)
      ON CONFLICT ("employeeId", "policyId", year) DO UPDATE SET allowance = ${allowance}, used = ${t.used}, pending = ${t.pending}
    `
  }

  // ── Notifications ────────────────────────────────────────────────────
  // Wiped by the scheduled reset and previously never re-seeded. Demo sessions are
  // write-blocked, so nothing could ever regenerate them organically and
  // the notification bell sat permanently empty. Seed a few entries that
  // match the seeded leave activity.
  await sql`DELETE FROM "Notification" WHERE "tenantId" = ${tenantId}`
  const notifications = [
    { userId: carol.userId, type: 'sickness_reported', title: 'Sickness reported', message: `Dave Kumar reported sickness for ${fmt(monLast)} to ${fmt(addDays(monLast, 1))}`, link: `/t/${DEMO_TENANT_SLUG}/leave/${tenantId}-sample-3`, read: false, at: `${fmt(monLast)}T08:05:00Z` },
    { userId: carol.userId, type: 'leave_submitted', title: 'New leave request', message: `Alice Johnson submitted a Holiday request for ${fmt(addDays(monNext, 14))} to ${fmt(addDays(monNext, 18))}`, link: `/t/${DEMO_TENANT_SLUG}/leave/${tenantId}-sample-1`, read: false, at: `${fmt(addDays(today, -2))}T09:05:00Z` },
    { userId: carol.userId, type: 'leave_approved', title: 'Leave approved', message: `Your Holiday request for ${fmt(addDays(monNext, 21))} to ${fmt(addDays(monNext, 25))} has been approved`, link: `/t/${DEMO_TENANT_SLUG}/leave`, read: true, at: `${fmt(addDays(today, -7))}T10:35:00Z` },
    { userId: dave.userId, type: 'leave_rejected', title: 'Leave declined', message: `Your Holiday request for ${fmt(addDays(monNext, 35))} to ${fmt(addDays(monNext, 39))} has been declined`, link: `/t/${DEMO_TENANT_SLUG}/leave`, read: false, at: `${fmt(addDays(today, -10))}T09:05:00Z` },
  ]
  for (const n of notifications) {
    await sql`
      INSERT INTO "Notification" (id, "userId", "tenantId", type, title, message, link, read, "createdAt")
      VALUES (gen_random_uuid(), ${n.userId}, ${tenantId}, ${n.type}, ${n.title}, ${n.message}, ${n.link}, ${n.read}, ${n.at}::timestamp)
    `
  }

  // Billing — always refresh trial
  const trialEnd = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  await sql`
    INSERT INTO "TenantBilling" (id, "tenantId", status, "planKey", "trialEndsAt", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), ${tenantId}, 'TRIALING', 'per_seat', ${trialEnd}::timestamp, now(), now())
    ON CONFLICT ("tenantId") DO UPDATE SET status = 'TRIALING', "planKey" = 'per_seat', "trialEndsAt" = ${trialEnd}::timestamp, "updatedAt" = now()
  `

  return { tenantId }
}

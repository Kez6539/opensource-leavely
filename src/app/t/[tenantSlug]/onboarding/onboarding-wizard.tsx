'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/shared'
import { Check, Upload, Users, ChevronRight, CalendarDays, Mail, Plus, X, Settings2, LayoutDashboard } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { saveOnboardingStep, completeOnboarding, importEmployeesCsv, saveCountryAndLeaveYear, inviteEmployeesByEmail } from './actions'
import type { InviteRow } from './actions'
import { COUNTRY_LIST, getCountryConfig } from '@/lib/countries'
import { trackOnboardingStep, trackOnboardingCompleted, trackRegistrationCompleted, trackWizardStep } from '@/lib/analytics'

const STEPS = [
  { label: 'Invite team', icon: Users },
  { label: 'Set holiday year', icon: CalendarDays },
  { label: 'Done', icon: Check },
]

type CsvRow = { firstName: string; lastName: string; email?: string; jobTitle?: string; department?: string }
type ParseResult = { rows: CsvRow[]; skipped: number; invalidEmails: number }

// RFC 4180-aware CSV parser. Handles quoted fields with embedded commas and
// escaped quotes (e.g. "Smith, Jr.").
function parseCsvLine(line: string): string[] {
  const out: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        current += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      out.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  out.push(current.trim())
  return out
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseCsv(text: string): ParseResult {
  const lines = text.replace(/\r\n/g, '\n').trim().split('\n')
  if (lines.length < 2) return { rows: [], skipped: 0, invalidEmails: 0 }
  const headers = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase())
  let skipped = 0
  let invalidEmails = 0
  const rows: CsvRow[] = []
  for (const line of lines.slice(1)) {
    if (!line.trim()) continue
    const values = parseCsvLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      const v = (values[i] ?? '').trim()
      if (h === 'firstname' || h === 'first_name' || h === 'first name') row.firstName = v
      else if (h === 'lastname' || h === 'last_name' || h === 'last name') row.lastName = v
      else if (h === 'email') row.email = v
      else if (h === 'jobtitle' || h === 'job_title' || h === 'job title') row.jobTitle = v
      else if (h === 'department') row.department = v
    })
    if (!row.firstName || !row.lastName) {
      skipped++
      continue
    }
    if (row.email && !EMAIL_RE.test(row.email)) {
      invalidEmails++
      row.email = ''
    }
    rows.push(row as CsvRow)
  }
  return { rows, skipped, invalidEmails }
}

interface Props {
  tenantSlug: string
  initialStep: number
  initialCountry: string
  initialLeaveYearMonth: number
  authProvider: 'CREDENTIALS' | 'GOOGLE' | 'LINKEDIN' | 'MICROSOFT'
}

export function OnboardingWizard({
  tenantSlug,
  initialStep,
  initialCountry,
  initialLeaveYearMonth,
  authProvider,
}: Props) {
  const router = useRouter()
  const clampedInitialStep = Math.min(Math.max(initialStep, 0), STEPS.length - 1)
  const [step, setStep] = useState(clampedInitialStep)
  const [csvRows, setCsvRows] = useState<CsvRow[]>([])
  const [csvFile, setCsvFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState(initialCountry || 'GB')
  const countryConfig = getCountryConfig(country)
  const [leaveYearMonth, setLeaveYearMonth] = useState(initialLeaveYearMonth || countryConfig.defaultLeaveYear)
  const [pendingInvites, setPendingInvites] = useState<InviteRow[]>([])
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'MANAGER' | 'EMPLOYEE'>('EMPLOYEE')
  const trackedWizardStepsRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (initialStep === 0) {
      const method = authProvider === 'GOOGLE'
        ? 'google'
        : authProvider === 'LINKEDIN'
          ? 'linkedin'
          : authProvider === 'MICROSOFT'
            ? 'microsoft'
            : 'email'
      trackRegistrationCompleted(tenantSlug, method)
    }
  }, [initialStep, tenantSlug, authProvider])

  useEffect(() => {
    const stepNumber = step + 1
    if (trackedWizardStepsRef.current.has(stepNumber)) return

    trackedWizardStepsRef.current.add(stepNumber)
    trackWizardStep(stepNumber, STEPS[step]?.label ?? `Step ${stepNumber}`, tenantSlug)
  }, [step, tenantSlug])

  function handleCountryChange(code: string) {
    setCountry(code)
    setLeaveYearMonth(getCountryConfig(code).defaultLeaveYear)
  }

  async function goTo(next: number) {
    setStep(next)
    trackOnboardingStep(next, STEPS[next]?.label ?? `Step ${next}`)
    await saveOnboardingStep(tenantSlug, next)
  }

  async function handleComplete(targetPath = `/t/${tenantSlug}/dashboard`) {
    setLoading(true)
    trackOnboardingCompleted(tenantSlug, csvRows.length)
    try {
      const result = await completeOnboarding(tenantSlug)
      if (!result?.success) {
        toast.error(result?.error ?? 'Could not finish setup. Please complete the previous steps.')
        return
      }
      router.push(targetPath)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not finish setup')
    } finally {
      setLoading(false)
    }
  }

  async function handleCsvImport() {
    if (csvRows.length === 0) return
    setLoading(true)
    try {
      const res = await importEmployeesCsv(tenantSlug, csvRows)
      if (!res.success) {
        toast.error(res.error ?? 'Failed to import employees')
        return
      }
      await goTo(1)
    } catch {
      toast.error('Failed to import employees')
    } finally {
      setLoading(false)
    }
  }

  function addPendingInvite() {
    if (!inviteName.trim() || !inviteEmail.trim()) return
    setPendingInvites([
      ...pendingInvites,
      { name: inviteName.trim(), email: inviteEmail.trim().toLowerCase(), role: inviteRole },
    ])
    setInviteName('')
    setInviteEmail('')
    setInviteRole('EMPLOYEE')
  }

  function removePendingInvite(idx: number) {
    setPendingInvites(pendingInvites.filter((_, i) => i !== idx))
  }

  async function handleSendInvites() {
    if (pendingInvites.length === 0) return
    setLoading(true)
    try {
      const res = await inviteEmployeesByEmail(tenantSlug, pendingInvites)
      if (!res.success) {
        toast.error(res.error ?? 'Could not send invites')
        return
      }
      toast.success(
        `Added ${res.employeesCreated} ${res.employeesCreated === 1 ? 'person' : 'people'}` +
          (res.skipped.length > 0 ? ` - ${res.skipped.length} skipped (already exist)` : ''),
      )
      setPendingInvites([])
      await goTo(1)
    } catch {
      toast.error('Failed to send invites')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setCsvFile(file.name)
      const result = parseCsv(text)
      setCsvRows(result.rows)
      if (result.skipped > 0) {
        toast.warning(`${result.skipped} row${result.skipped === 1 ? '' : 's'} skipped (missing first/last name)`)
      }
      if (result.invalidEmails > 0) {
        toast.warning(`${result.invalidEmails} row${result.invalidEmails === 1 ? '' : 's'} had invalid email addresses - imported without email`)
      }
    }
    reader.readAsText(file)
  }, [])

  const progressPct = ((step + 1) / STEPS.length) * 100

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Quick start
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">
            Step {step + 1} of {STEPS.length} - {STEPS[step]?.label}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Invite your team, confirm the holiday year, then head into the app.
          </p>
        </div>
        <Button variant="outline" onClick={() => handleComplete()} disabled={loading}>
          <LayoutDashboard className="h-4 w-4" />
          {loading ? 'Opening...' : 'Skip to dashboard'}
        </Button>
      </div>

      <div className="mb-6">
        <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 overflow-x-auto -mx-2 px-2">
        {STEPS.map((s, i) => {
          const StepIcon = s.icon
          return (
            <div key={s.label} className="flex items-center shrink-0">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
                  i < step
                    ? 'bg-emerald-600 text-white'
                    : i === step
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-stone-100 text-stone-500'
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : <StepIcon className="h-3.5 w-3.5" />}
              </div>
              <span className={`ml-2 text-xs font-medium hidden sm:inline ${i <= step ? 'text-stone-900' : 'text-stone-400'}`}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <ChevronRight className="mx-2 h-3.5 w-3.5 text-stone-300" />
              )}
            </div>
          )
        })}
      </div>

      {step === 0 && (
        <CardSection title="Invite your team">
          <p className="text-sm text-muted-foreground mb-4">
            Add teammates now or skip this step and manage people from Employees later.
          </p>
          <div className="space-y-5">
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <h4 className="text-sm font-semibold">Invite by email</h4>
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto]">
                <Input
                  placeholder="Full name"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPendingInvite() } }}
                />
                <Input
                  placeholder="email@company.com"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPendingInvite() } }}
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'ADMIN' | 'MANAGER' | 'EMPLOYEE')}
                  className="rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPendingInvite}
                  disabled={!inviteName.trim() || !inviteEmail.trim()}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add
                </Button>
              </div>
              {pendingInvites.length > 0 && (
                <ul className="rounded-md border divide-y bg-muted/20">
                  {pendingInvites.map((p, i) => (
                    <li key={`${p.email}-${i}`} className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-medium truncate">{p.name}</span>
                        <span className="text-muted-foreground truncate">{p.email}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-background border rounded-full px-2 py-0.5">{p.role}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePendingInvite(i)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {pendingInvites.length > 0 && (
                <Button onClick={handleSendInvites} disabled={loading}>
                  {loading ? 'Adding...' : `Add ${pendingInvites.length} ${pendingInvites.length === 1 ? 'person' : 'people'} & continue`}
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 border-t" />
              or
              <div className="flex-1 border-t" />
            </div>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const file = e.dataTransfer.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (ev) => {
                    setCsvFile(file.name)
                    const result = parseCsv(ev.target?.result as string)
                    setCsvRows(result.rows)
                    if (result.skipped > 0) {
                      toast.warning(`${result.skipped} row${result.skipped === 1 ? '' : 's'} skipped (missing first/last name)`)
                    }
                    if (result.invalidEmails > 0) {
                      toast.warning(`${result.invalidEmails} row${result.invalidEmails === 1 ? '' : 's'} had invalid email addresses - imported without email`)
                    }
                  }
                  reader.readAsText(file)
                }
              }}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              {csvFile ? (
                <p className="text-sm font-medium">{csvFile} - {csvRows.length} employees found</p>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop a CSV here (firstName, lastName, email, jobTitle, department)
                  </p>
                  <label>
                    <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                    <Button variant="outline" size="sm" asChild>
                      <span>Browse</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {csvRows.length > 0 && (
                <Button onClick={handleCsvImport} disabled={loading}>
                  {loading ? 'Importing...' : `Import ${csvRows.length} employees`}
                </Button>
              )}
              <Button variant="outline" onClick={() => goTo(1)} disabled={loading}>
                Skip optional invites
              </Button>
            </div>
          </div>
        </CardSection>
      )}

      {step === 1 && (
        <CardSection title="Set holiday year">
          <p className="text-sm text-muted-foreground mb-6">
            Confirm where your company is based and when the leave year starts. Public holidays are loaded automatically.
          </p>

          <div className="mb-5">
            <p className="block text-sm font-medium mb-2">Where is your company based?</p>
            <div className="flex flex-wrap gap-2">
              {COUNTRY_LIST.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountryChange(c.code)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    country === c.code
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                      : 'border-muted bg-background text-muted-foreground hover:border-muted-foreground/30 dark:hover:border-muted-foreground/50'
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="leaveYearMonth" className="block text-sm font-medium mb-1">
              Leave year starts in
            </label>
            <select
              id="leaveYearMonth"
              value={leaveYearMonth}
              onChange={(e) => setLeaveYearMonth(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const m = i + 1
                const name = new Date(2026, i).toLocaleString('en', { month: 'long' })
                const isDefault = m === countryConfig.defaultLeaveYear
                return (
                  <option key={m} value={m}>
                    {name}{isDefault ? ` (${countryConfig.leaveYearLabel})` : ''}
                  </option>
                )
              })}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              We&apos;ll add {countryConfig.publicHolidayCount} {countryConfig.publicHolidayTerm} for {countryConfig.name} automatically.
            </p>
          </div>

          <div className="mb-5 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-900 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Holiday preview</p>
                <p className="text-sm font-semibold mt-0.5">{countryConfig.flag} {countryConfig.name}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider rounded-full bg-emerald-600 text-white px-2 py-0.5">Quick start</span>
            </div>
            <ul className="text-xs text-foreground/80 space-y-1">
              <li>Default leave allowance: <strong>{countryConfig.defaultAllowance} days/yr</strong></li>
              <li>Leave year starts: <strong>{new Date(2026, leaveYearMonth - 1).toLocaleString('en', { month: 'long' })}</strong></li>
              <li>Public holidays loaded: <strong>{countryConfig.publicHolidayCount}</strong></li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={async () => {
                setLoading(true)
                try {
                  await saveCountryAndLeaveYear(tenantSlug, country, leaveYearMonth)
                  await goTo(2)
                } catch {
                  toast.error('Failed to save holiday settings')
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & continue'}
            </Button>
            <Button variant="outline" onClick={() => goTo(2)} disabled={loading}>
              Skip optional changes
            </Button>
          </div>
        </CardSection>
      )}

      {step === 2 && (
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 sm:p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-2xl font-bold tracking-tight">You&rsquo;re ready to go</h3>
          <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
            Team invites and holiday-year setup are the only required quick-start steps. Policies and departments can be tuned whenever you need them.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            <NextStepTile
              onSelect={() => handleComplete(`/t/${tenantSlug}/employees`)}
              icon={<Users className="h-4 w-4" />}
              title="Departments"
              disabled={loading}
            />
            <NextStepTile
              onSelect={() => handleComplete(`/t/${tenantSlug}/settings/leave-policies`)}
              icon={<Settings2 className="h-4 w-4" />}
              title="Policies"
              disabled={loading}
            />
            <NextStepTile
              onSelect={() => handleComplete(`/t/${tenantSlug}/settings/holidays`)}
              icon={<CalendarDays className="h-4 w-4" />}
              title="Holidays"
              disabled={loading}
            />
          </div>

          <Button
            onClick={() => handleComplete()}
            disabled={loading}
            className="mt-8 h-12 px-8 text-base bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
          >
            <LayoutDashboard className="h-4 w-4" />
            {loading ? 'Opening...' : 'Go to dashboard'}
          </Button>
        </div>
      )}
    </div>
  )
}

function NextStepTile({
  disabled,
  icon,
  onSelect,
  title,
}: {
  disabled: boolean
  icon: ReactNode
  onSelect: () => void
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className="rounded-lg bg-white border border-stone-200 px-3 py-3 text-left transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div className="flex items-center gap-2 text-stone-700">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
          {icon}
        </span>
        <span className="text-xs font-semibold">{title}</span>
      </div>
    </button>
  )
}

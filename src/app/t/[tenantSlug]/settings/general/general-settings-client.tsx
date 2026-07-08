'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { CardSection } from '@/components/shared/card-section'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Upload, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { updateLeaveYearStartMonth, toggleClockIn, togglePrivacySetting, updateTenantLogo } from './actions'

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April (UK standard)' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

interface Props {
  tenantSlug: string
  leaveYearStartMonth: number
  clockInEnabled: boolean
  deductBankHolidays: boolean
  hideEmployeeEmails: boolean
  hideEmployeeList: boolean
  preventLeaveCancellation: boolean
  showWorkingStatus: boolean
  primaryAllowance: number | null
  primaryAllowanceUnit: string
  bankHolidayCount: number
  statutoryMinimumDays: number
  publicHolidayTerm: string
  countryCode: string
  logoDataUri: string | null
  isAdmin: boolean
}

type PrivacyKey = 'hideEmployeeEmails' | 'hideEmployeeList' | 'preventLeaveCancellation' | 'showWorkingStatus' | 'deductBankHolidays'

export function GeneralSettingsClient({
  tenantSlug,
  leaveYearStartMonth,
  clockInEnabled,
  deductBankHolidays: initialDeductBankHolidays,
  hideEmployeeEmails: initialHideEmails,
  hideEmployeeList: initialHideList,
  preventLeaveCancellation: initialPreventCancel,
  showWorkingStatus: initialShowStatus,
  primaryAllowance,
  primaryAllowanceUnit,
  bankHolidayCount,
  statutoryMinimumDays,
  publicHolidayTerm,
  countryCode,
  logoDataUri: initialLogo,
  isAdmin,
}: Props) {
  const router = useRouter()
  const [month, setMonth] = useState(leaveYearStartMonth)
  const [saving, setSaving] = useState(false)
  const [clockIn, setClockIn] = useState(clockInEnabled)
  const [savingClockIn, setSavingClockIn] = useState(false)
  const changed = month !== leaveYearStartMonth

  // Logo upload state
  const [logo, setLogo] = useState<string | null>(initialLogo)
  const [savingLogo, setSavingLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleLogoFile(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image (PNG, JPG, SVG, or WebP)')
      return
    }
    if (file.size > 60 * 1024) {
      toast.error('Logo must be under 60KB. Try a smaller image or compress it.')
      return
    }
    const dataUri = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
    setSavingLogo(true)
    const prev = logo
    setLogo(dataUri)
    try {
      await updateTenantLogo(tenantSlug, dataUri)
      toast.success('Logo updated')
      router.refresh()
    } catch (e) {
      setLogo(prev)
      toast.error(e instanceof Error ? e.message : 'Failed to upload logo')
    } finally {
      setSavingLogo(false)
    }
  }

  async function handleRemoveLogo() {
    setSavingLogo(true)
    const prev = logo
    setLogo(null)
    try {
      await updateTenantLogo(tenantSlug, null)
      toast.success('Logo removed')
      router.refresh()
    } catch (e) {
      setLogo(prev)
      toast.error(e instanceof Error ? e.message : 'Failed to remove logo')
    } finally {
      setSavingLogo(false)
    }
  }

  // Bank holiday deduction
  const [deductBankHolidays, setDeductBankHolidays] = useState(initialDeductBankHolidays)
  const [savingBankHol, setSavingBankHol] = useState(false)

  async function handleToggleBankHolidays(checked: boolean) {
    setSavingBankHol(true)
    const prev = deductBankHolidays
    setDeductBankHolidays(checked)
    try {
      await togglePrivacySetting(tenantSlug, 'deductBankHolidays', checked)
      toast.success('Bank holiday deduction setting updated')
    } catch {
      setDeductBankHolidays(prev)
      toast.error('Failed to update setting')
    } finally {
      setSavingBankHol(false)
    }
  }

  // Privacy & Permissions state
  const [privacySettings, setPrivacySettings] = useState({
    hideEmployeeEmails: initialHideEmails,
    hideEmployeeList: initialHideList,
    preventLeaveCancellation: initialPreventCancel,
    showWorkingStatus: initialShowStatus,
  })
  const [savingPrivacy, setSavingPrivacy] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    try {
      await updateLeaveYearStartMonth(tenantSlug, month)
      toast.success('Leave year start month updated')
    } catch {
      toast.error('Failed to update setting')
    } finally {
      setSaving(false)
    }
  }

  async function handleTogglePrivacy(key: PrivacyKey, checked: boolean) {
    setSavingPrivacy(key)
    const prev = { ...privacySettings }
    setPrivacySettings({ ...privacySettings, [key]: checked })
    try {
      await togglePrivacySetting(tenantSlug, key, checked)
      toast.success('Setting updated')
    } catch {
      setPrivacySettings(prev)
      toast.error('Failed to update setting')
    } finally {
      setSavingPrivacy(null)
    }
  }

  async function handleToggleClockIn(checked: boolean) {
    setSavingClockIn(true)
    try {
      await toggleClockIn(tenantSlug, checked)
      setClockIn(checked)
      toast.success(checked ? 'Clock-in & Locations enabled' : 'Clock-in & Locations disabled')
    } catch {
      toast.error('Failed to update setting')
    } finally {
      setSavingClockIn(false)
    }
  }

  return (
    <div className="space-y-6">
    <CardSection title="Company Logo">
      <p className="text-sm text-muted-foreground mb-4">
        Shown in the top-left of every page. PNG, JPG, SVG, or WebP — under 60KB.
      </p>
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white overflow-hidden">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="Company logo" className="max-h-full max-w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-xl">
              {/* Default fallback shown when no logo is set */}
              L
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-wrap gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleLogoFile(f)
              e.target.value = ''
            }}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={!isAdmin || savingLogo}
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            {savingLogo ? 'Saving…' : logo ? 'Replace' : 'Upload logo'}
          </Button>
          {logo && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveLogo}
              disabled={!isAdmin || savingLogo}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </CardSection>

    <CardSection title="Leave Year">
      <p className="text-sm text-muted-foreground mb-4">
        Choose which month your leave year begins. This affects how leave balances are calculated.
      </p>
      <div className="max-w-xs">
        <label htmlFor="leaveYearStart" className="block text-sm font-medium mb-1">
          Leave year starts in
        </label>
        <select
          id="leaveYearStart"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          disabled={!isAdmin}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      {isAdmin && changed && (
        <Button onClick={handleSave} disabled={saving} className="mt-4">
          {saving ? 'Saving\u2026' : 'Save'}
        </Button>
      )}
    </CardSection>

    <CardSection title={`${countryCode === 'GB' ? 'Bank' : 'Public'} Holidays`}>
      <p className="text-sm text-muted-foreground mb-4">
        Decide whether {publicHolidayTerm} are included in each employee&rsquo;s
        annual leave allowance or paid in addition to it. Both are legal
        under UK law &mdash; pick whichever matches your employment contracts.
      </p>
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <Label className="font-medium">{publicHolidayTerm[0].toUpperCase() + publicHolidayTerm.slice(1)} included in allowance</Label>
          <p className="text-xs text-muted-foreground mt-1">
            <strong>Off</strong> (most common): the allowance is what staff book themselves, and {publicHolidayTerm} are paid in addition.
            <br />
            <strong>On</strong>: the allowance is the total including {publicHolidayTerm}, and each one is auto-deducted on the day.
          </p>
        </div>
        <Switch
          checked={deductBankHolidays}
          onCheckedChange={handleToggleBankHolidays}
          disabled={!isAdmin || savingBankHol}
        />
      </div>

      {primaryAllowance !== null && (() => {
        // Preview only reflects the *active* mode. Showing the other mode's
        // "what if" math with the current allowance is misleading because
        // switching modes typically means changing the allowance too.
        const bookable = deductBankHolidays
          ? Math.max(primaryAllowance - bankHolidayCount, 0)
          : primaryAllowance
        const total = deductBankHolidays
          ? primaryAllowance
          : primaryAllowance + bankHolidayCount
        const bhWord = publicHolidayTerm.replace(/s$/, '') + (bankHolidayCount === 1 ? '' : 's')
        const belowMin = statutoryMinimumDays > 0 && total < statutoryMinimumDays
        return (
          <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Current setup
            </div>
            <p className="text-sm text-foreground">
              Staff can book <strong>{bookable} {primaryAllowanceUnit}</strong> themselves
              {deductBankHolidays ? (
                <>, with <strong>{bankHolidayCount} {bhWord}</strong> auto-deducted from the same allowance.</>
              ) : (
                <>, plus <strong>{bankHolidayCount} {bhWord}</strong> paid in addition.</>
              )}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Total paid time off</span>
              <strong className="text-sm text-foreground">{total} {primaryAllowanceUnit}</strong>
            </div>
            {belowMin && (
              <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
                Heads up: {total} {primaryAllowanceUnit} is below the UK statutory
                minimum of {statutoryMinimumDays} days for full-time 5-day workers.
                Check that the annual allowance in <em>Leave Policies</em> reflects
                your contracts.
              </p>
            )}
          </div>
        )
      })()}
    </CardSection>

    <CardSection title="Clock-in & Locations">
      <p className="text-sm text-muted-foreground mb-4">
        Enable QR-code based clock-in with GPS location tracking. Ideal for mobile carers,
        field workers, and multi-site teams. When enabled, a &ldquo;Clock-ins&rdquo; section appears in the sidebar
        and you can manage locations under Settings &rarr; Locations.
      </p>
      <div className="flex items-center gap-3">
        <Switch
          id="clockInEnabled"
          checked={clockIn}
          onCheckedChange={handleToggleClockIn}
          disabled={!isAdmin || savingClockIn}
        />
        <Label htmlFor="clockInEnabled" className="text-sm font-medium">
          {clockIn ? 'Enabled' : 'Disabled'}
        </Label>
      </div>
    </CardSection>

    <CardSection title="Privacy & Permissions">
      <p className="text-sm text-muted-foreground mb-4">
        Control what information employees can see and what actions they can take.
      </p>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Hide email addresses from employees</Label>
            <p className="text-xs text-muted-foreground">
              When enabled, employees cannot see other employees&apos; email addresses in the directory or profiles
            </p>
          </div>
          <Switch
            checked={privacySettings.hideEmployeeEmails}
            onCheckedChange={(checked) => handleTogglePrivacy('hideEmployeeEmails', checked)}
            disabled={!isAdmin || savingPrivacy === 'hideEmployeeEmails'}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Hide employee directory from employees</Label>
            <p className="text-xs text-muted-foreground">
              When enabled, employees can only see their own profile, not the full employee directory
            </p>
          </div>
          <Switch
            checked={privacySettings.hideEmployeeList}
            onCheckedChange={(checked) => handleTogglePrivacy('hideEmployeeList', checked)}
            disabled={!isAdmin || savingPrivacy === 'hideEmployeeList'}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Prevent employees cancelling approved leave</Label>
            <p className="text-xs text-muted-foreground">
              When enabled, employees cannot cancel their own approved leave requests. Only managers can cancel.
            </p>
          </div>
          <Switch
            checked={privacySettings.preventLeaveCancellation}
            onCheckedChange={(checked) => handleTogglePrivacy('preventLeaveCancellation', checked)}
            disabled={!isAdmin || savingPrivacy === 'preventLeaveCancellation'}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium">Show working status badges</Label>
            <p className="text-xs text-muted-foreground">
              Display working status (In Office, WFH, etc.) on employee profiles and the directory
            </p>
          </div>
          <Switch
            checked={privacySettings.showWorkingStatus}
            onCheckedChange={(checked) => handleTogglePrivacy('showWorkingStatus', checked)}
            disabled={!isAdmin || savingPrivacy === 'showWorkingStatus'}
          />
        </div>
      </div>
    </CardSection>
    </div>
  )
}

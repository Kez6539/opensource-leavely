'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pencil, ChevronDown, ChevronRight, Users, Briefcase, PoundSterling, Building2, FileText, Shield, XCircle, Calculator } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { updateEmploymentInfo, updateSalaryInfo, terminateEmployee, calculateRemainingEntitlement } from '../actions'

interface EmploymentTabProps {
  tenantSlug: string
  employeeId: string
  employee: {
    firstName: string
    lastName: string
    jobTitle: string | null
    department: string | null
    startDate: string | null
    contractType: string | null
    noticePeriod: string | null
    probationEndDate: string | null
    workingLocation: string | null
    hoursPerDay: number | null
    salary: string | null
    salaryFrequency: string | null
    payrollNumber: string | null
    taxCode: string | null
    niNumber: string | null
    pensionProvider: string | null
    pensionNumber: string | null
    bankName: string | null
    bankAccountNumber: string | null
    bankSortCode: string | null
    status: string
    managerId: string | null
    managerName: string | null
    terminationDate: string | null
    terminationReason: string | null
    exitInterview: boolean
  }
  workingDaysLabel: string
  leaveYearLabel: string
  canManage: boolean
  isAdmin: boolean
}

const TERMINATION_REASONS = [
  'Resignation',
  'Redundancy',
  'End of contract',
  'Dismissal',
  'Retirement',
  'Other',
] as const

function ExpandableSection({ title, icon, children, defaultOpen = false }: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full p-4 text-left hover:bg-accent/50 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2 flex-1">
          {icon}
          <span className="text-sm font-semibold">{title}</span>
        </div>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 border-t">{children}</div>}
    </div>
  )
}

function formatDate(iso: string | null) {
  if (!iso) return '\u2014'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function getLengthOfService(startDate: string | null): string {
  if (!startDate) return 'Not set'
  const start = new Date(startDate)
  const now = new Date()
  if (start > now) return 'Not started yet'

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  if (now.getDate() < start.getDate()) months--
  if (months < 0) { years--; months += 12 }

  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  if (parts.length === 0) return 'Less than 1 month'
  return parts.join(', ')
}

function maskValue(value: string | null) {
  if (!value) return '\u2014'
  if (value.length <= 4) return '****'
  return '*'.repeat(value.length - 4) + value.slice(-4)
}

export function EmploymentTab({
  tenantSlug,
  employeeId,
  employee,
  workingDaysLabel,
  leaveYearLabel,
  canManage,
  isAdmin,
}: EmploymentTabProps) {
  const router = useRouter()
  const [editingEmployment, setEditingEmployment] = useState(false)
  const [editingSalary, setEditingSalary] = useState(false)
  const [saving, setSaving] = useState(false)

  // Termination state
  const [termForm, setTermForm] = useState({
    terminationDate: employee.terminationDate ? new Date(employee.terminationDate).toISOString().split('T')[0] : '',
    terminationReason: (employee.terminationReason || 'Resignation') as typeof TERMINATION_REASONS[number],
    exitInterview: employee.exitInterview,
  })
  const [terminating, setTerminating] = useState(false)
  // (#152) Show a typed-name confirmation before actually terminating —
  // it's the most destructive action in the product, gating it on a real
  // dialog (rather than browser confirm()) makes accidental clicks
  // basically impossible. Type-the-name pattern means the user has to
  // physically read the name they're terminating.
  const [terminateConfirmOpen, setTerminateConfirmOpen] = useState(false)
  const [terminateNameEntry, setTerminateNameEntry] = useState('')
  const expectedFullName = `${employee.firstName} ${employee.lastName}`.trim()
  const nameMatches = terminateNameEntry.trim() === expectedFullName
  const [entitlementResult, setEntitlementResult] = useState<{
    leaveYear: string
    monthsWorked: number
    entitlements: Array<{
      policyName: string
      fullAllowance: number
      proRataAllowance: number
      used: number
      remaining: number
      unit: string
    }>
  } | null>(null)
  const [calculatingEntitlement, setCalculatingEntitlement] = useState(false)

  // Employment form state
  const [empForm, setEmpForm] = useState({
    contractType: employee.contractType || '',
    noticePeriod: employee.noticePeriod || '',
    probationEndDate: employee.probationEndDate ? new Date(employee.probationEndDate).toISOString().split('T')[0] : '',
    workingLocation: employee.workingLocation || '',
    jobTitle: employee.jobTitle || '',
    department: employee.department || '',
  })

  // Salary form state. salaryFrequency is now an enum on the Prisma side
  // (#145), so the local state union mirrors it.
  const [salForm, setSalForm] = useState<{
    salary: number
    salaryFrequency: 'annual' | 'monthly' | 'weekly' | 'hourly'
    payrollNumber: string
    taxCode: string
    niNumber: string
    pensionProvider: string
    pensionNumber: string
    bankName: string
    bankAccountNumber: string
    bankSortCode: string
  }>({
    salary: employee.salary ? parseFloat(employee.salary) : 0,
    salaryFrequency: (['annual', 'monthly', 'weekly', 'hourly'] as const).includes(
      (employee.salaryFrequency ?? 'annual') as 'annual' | 'monthly' | 'weekly' | 'hourly',
    )
      ? ((employee.salaryFrequency ?? 'annual') as 'annual' | 'monthly' | 'weekly' | 'hourly')
      : 'annual',
    payrollNumber: employee.payrollNumber || '',
    taxCode: employee.taxCode || '',
    niNumber: employee.niNumber || '',
    pensionProvider: employee.pensionProvider || '',
    pensionNumber: employee.pensionNumber || '',
    bankName: employee.bankName || '',
    bankAccountNumber: employee.bankAccountNumber || '',
    bankSortCode: employee.bankSortCode || '',
  })

  async function handleSaveEmployment() {
    setSaving(true)
    try {
      const result = await updateEmploymentInfo(tenantSlug, employeeId, empForm)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setEditingEmployment(false)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save employment details')
    } finally { setSaving(false) }
  }

  async function handleSaveSalary() {
    setSaving(true)
    try {
      const result = await updateSalaryInfo(tenantSlug, employeeId, salForm)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      setEditingSalary(false)
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save salary details')
    } finally { setSaving(false) }
  }

  const lengthOfService = getLengthOfService(employee.startDate)

  return (
    <div className="space-y-6">
      {/* Length of Service banner */}
      <div className="rounded-lg border bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-4 flex items-center gap-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
          <Briefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Length of Service</p>
          <p className="text-lg font-semibold text-foreground">{lengthOfService}</p>
          {employee.startDate && (
            <p className="text-xs text-muted-foreground">Started {formatDate(employee.startDate)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Contract Summary */}
        <CardSection
          title="Contract Summary"
          action={canManage && !editingEmployment ? (
            <Button variant="ghost" size="xs" onClick={() => setEditingEmployment(true)}>
              <Pencil className="h-3 w-3 mr-1" /> Edit
            </Button>
          ) : undefined}
        >
          {editingEmployment ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Contract Type</Label>
                <Input value={empForm.contractType} onChange={e => setEmpForm(f => ({ ...f, contractType: e.target.value }))} placeholder="e.g. Full-time, Part-time" />
              </div>
              <div>
                <Label className="text-xs">Hours per Day</Label>
                <p className="text-sm text-muted-foreground">{employee.hoursPerDay ?? 7.5}h (edit in main profile)</p>
              </div>
              <div>
                <Label className="text-xs">Working Location</Label>
                <Input value={empForm.workingLocation} onChange={e => setEmpForm(f => ({ ...f, workingLocation: e.target.value }))} placeholder="e.g. London Office" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveEmployment} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingEmployment(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <FieldRow label="Contract type" value={employee.contractType || '\u2014'} />
              <FieldRow label="Hours/day" value={employee.hoursPerDay ? `${employee.hoursPerDay}h` : '7.5h'} />
              <FieldRow label="Start date" value={formatDate(employee.startDate)} />
              <FieldRow
                label="Working pattern"
                value={
                  <span className="flex items-center gap-2">
                    {workingDaysLabel || 'Mon, Tue, Wed, Thu, Fri'}
                    {canManage && (
                      <Link href={`/t/${tenantSlug}/employees/${employeeId}/edit`} className="text-primary hover:underline text-xs">
                        Change
                      </Link>
                    )}
                  </span>
                }
              />
            </>
          )}
        </CardSection>

        {/* Place of Work */}
        <CardSection title="Place of Work">
          <FieldRow label="Location" value={employee.workingLocation || '\u2014'} />
        </CardSection>

        {/* Leave */}
        <CardSection title="Annual Leave Configuration">
          <FieldRow label="Leave year" value={leaveYearLabel} />
        </CardSection>

        {/* Employment Summary */}
        <CardSection title="Employment Summary">
          <FieldRow label="Status" value={<StatusBadge status={employee.status} />} />
          <FieldRow label="Started" value={formatDate(employee.startDate)} />
        </CardSection>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Role Info */}
        <CardSection
          title="Role Information"
          action={canManage && !editingEmployment ? (
            <Button variant="ghost" size="xs" onClick={() => setEditingEmployment(true)}>
              <Pencil className="h-3 w-3 mr-1" /> Edit
            </Button>
          ) : undefined}
        >
          {editingEmployment ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Job Title</Label>
                <Input value={empForm.jobTitle} onChange={e => setEmpForm(f => ({ ...f, jobTitle: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">Department</Label>
                <Input value={empForm.department} onChange={e => setEmpForm(f => ({ ...f, department: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">Notice Period</Label>
                <Input value={empForm.noticePeriod} onChange={e => setEmpForm(f => ({ ...f, noticePeriod: e.target.value }))} placeholder="e.g. 1 month" />
              </div>
              <div>
                <Label className="text-xs">Probation End Date</Label>
                <Input type="date" value={empForm.probationEndDate} onChange={e => setEmpForm(f => ({ ...f, probationEndDate: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveEmployment} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingEmployment(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <>
              <FieldRow label="Job title" value={employee.jobTitle || '\u2014'} />
              <FieldRow label="Department" value={employee.department || '\u2014'} />
              <FieldRow label="Contract type" value={employee.contractType || '\u2014'} />
              <FieldRow
                label="Reports to"
                value={
                  employee.managerName ? (
                    <Link href={`/t/${tenantSlug}/employees/${employee.managerId}`} className="text-primary hover:underline flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {employee.managerName}
                    </Link>
                  ) : '\u2014'
                }
              />
              <FieldRow label="Probation ends" value={formatDate(employee.probationEndDate)} />
              <FieldRow label="Notice period" value={employee.noticePeriod || '\u2014'} />
            </>
          )}
        </CardSection>

        {/* Expandable sections */}
        <ExpandableSection
          title="Salary Information"
          icon={<PoundSterling className="h-4 w-4 text-emerald-600" />}
        >
          {editingSalary ? (
            <div className="space-y-3 pt-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Salary</Label>
                  <Input type="number" step="0.01" value={salForm.salary || ''} onChange={e => setSalForm(f => ({ ...f, salary: parseFloat(e.target.value) || 0 }))} />
                </div>
                <div>
                  <Label className="text-xs">Frequency</Label>
                  <select
                    className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                    value={salForm.salaryFrequency}
                    onChange={e => setSalForm(f => ({ ...f, salaryFrequency: e.target.value as 'annual' | 'monthly' | 'weekly' | 'hourly' }))}
                  >
                    <option value="annual">Annual</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveSalary} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingSalary(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="pt-3">
              <FieldRow label="Salary" value={employee.salary ? `\u00A3${parseFloat(employee.salary).toLocaleString()}` : '\u2014'} />
              <FieldRow label="Frequency" value={employee.salaryFrequency || '\u2014'} />
              {canManage && (
                <Button variant="ghost" size="xs" className="mt-2" onClick={() => setEditingSalary(true)}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
              )}
            </div>
          )}
        </ExpandableSection>

        <ExpandableSection
          title="Payroll Information"
          icon={<Briefcase className="h-4 w-4 text-blue-600" />}
        >
          {editingSalary ? (
            <div className="space-y-3 pt-3">
              <div>
                <Label className="text-xs">Payroll Number</Label>
                <Input value={salForm.payrollNumber} onChange={e => setSalForm(f => ({ ...f, payrollNumber: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">Tax Code</Label>
                <Input value={salForm.taxCode} onChange={e => setSalForm(f => ({ ...f, taxCode: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">NI Number</Label>
                <Input value={salForm.niNumber} onChange={e => setSalForm(f => ({ ...f, niNumber: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveSalary} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingSalary(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="pt-3">
              <FieldRow label="Payroll no." value={employee.payrollNumber || '\u2014'} />
              <FieldRow label="Tax code" value={employee.taxCode || '\u2014'} />
              <FieldRow label="NI number" value={maskValue(employee.niNumber)} />
              <FieldRow label="Pension provider" value={employee.pensionProvider || '\u2014'} />
              <FieldRow label="Pension no." value={employee.pensionNumber || '\u2014'} />
              {canManage && (
                <Button variant="ghost" size="xs" className="mt-2" onClick={() => setEditingSalary(true)}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
              )}
            </div>
          )}
        </ExpandableSection>

        <ExpandableSection
          title="Bank Details"
          icon={<Building2 className="h-4 w-4 text-purple-600" />}
        >
          {editingSalary ? (
            <div className="space-y-3 pt-3">
              <div>
                <Label className="text-xs">Bank Name</Label>
                <Input value={salForm.bankName} onChange={e => setSalForm(f => ({ ...f, bankName: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">Account Number</Label>
                <Input value={salForm.bankAccountNumber} onChange={e => setSalForm(f => ({ ...f, bankAccountNumber: e.target.value }))} />
              </div>
              <div>
                <Label className="text-xs">Sort Code</Label>
                <Input value={salForm.bankSortCode} onChange={e => setSalForm(f => ({ ...f, bankSortCode: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveSalary} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
                <Button size="sm" variant="outline" onClick={() => setEditingSalary(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="pt-3">
              <FieldRow label="Bank" value={employee.bankName || '\u2014'} />
              <FieldRow label="Account no." value={maskValue(employee.bankAccountNumber)} />
              <FieldRow label="Sort code" value={maskValue(employee.bankSortCode)} />
              {canManage && (
                <Button variant="ghost" size="xs" className="mt-2" onClick={() => setEditingSalary(true)}>
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
              )}
            </div>
          )}
        </ExpandableSection>

        <ExpandableSection
          title="Notes"
          icon={<FileText className="h-4 w-4 text-gray-600" />}
        >
          <div className="pt-3">
            <p className="text-sm text-muted-foreground">View notes in the Notes section of this profile.</p>
          </div>
        </ExpandableSection>

        <ExpandableSection
          title="Sensitive Information"
          icon={<Shield className="h-4 w-4 text-red-600" />}
        >
          <div className="pt-3">
            <p className="text-xs text-muted-foreground mb-3">This information is only visible to admins and above.</p>
            <FieldRow label="NI number" value={maskValue(employee.niNumber)} />
            <FieldRow label="Tax code" value={employee.taxCode || '\u2014'} />
          </div>
        </ExpandableSection>

        {isAdmin && (
          <ExpandableSection
            title="Termination"
            icon={<XCircle className="h-4 w-4 text-red-500" />}
          >
            <div className="pt-3">
              {employee.status === 'INACTIVE' && employee.terminationDate ? (
                <div className="space-y-2">
                  <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 p-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">This employee has been terminated</p>
                  </div>
                  <FieldRow label="Termination date" value={formatDate(employee.terminationDate)} />
                  <FieldRow label="Reason" value={employee.terminationReason || '\u2014'} />
                  <FieldRow label="Exit interview" value={employee.exitInterview ? 'Completed' : 'Not completed'} />
                </div>
              ) : employee.status === 'INACTIVE' ? (
                <p className="text-sm text-muted-foreground">This employee has been deactivated.</p>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground">Terminating an employee will set their status to inactive and record the reason.</p>

                  <div>
                    <Label className="text-xs">Termination Date *</Label>
                    <Input
                      type="date"
                      value={termForm.terminationDate}
                      onChange={e => {
                        setTermForm(f => ({ ...f, terminationDate: e.target.value }))
                        setEntitlementResult(null)
                      }}
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Reason *</Label>
                    <select
                      className="w-full h-9 rounded-md border bg-transparent px-3 text-sm"
                      value={termForm.terminationReason}
                      onChange={e => setTermForm(f => ({ ...f, terminationReason: e.target.value as typeof TERMINATION_REASONS[number] }))}
                    >
                      {TERMINATION_REASONS.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="exitInterview"
                      checked={termForm.exitInterview}
                      onChange={e => setTermForm(f => ({ ...f, exitInterview: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="exitInterview" className="text-sm cursor-pointer">Exit interview completed</Label>
                  </div>

                  {/* Calculate remaining entitlement */}
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!termForm.terminationDate || calculatingEntitlement}
                      onClick={async () => {
                        if (!termForm.terminationDate) return
                        setCalculatingEntitlement(true)
                        try {
                          const result = await calculateRemainingEntitlement(tenantSlug, employeeId, termForm.terminationDate)
                          setEntitlementResult(result)
                        } catch (e) {
                          toast.error(e instanceof Error ? e.message : 'Failed to calculate')
                        } finally {
                          setCalculatingEntitlement(false)
                        }
                      }}
                    >
                      <Calculator className="h-3.5 w-3.5 mr-1.5" />
                      {calculatingEntitlement ? 'Calculating...' : 'Calculate remaining entitlement'}
                    </Button>
                  </div>

                  {entitlementResult && (
                    <div className="rounded-lg border bg-blue-50 dark:bg-blue-950/20 p-3 space-y-2">
                      <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                        Pro-rated entitlement ({entitlementResult.monthsWorked} of 12 months)
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Leave year: {entitlementResult.leaveYear}
                      </p>
                      {entitlementResult.entitlements.map((ent, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-blue-800 dark:text-blue-200">{ent.policyName}</span>
                          <div className="text-right">
                            <span className="font-medium text-blue-900 dark:text-blue-100">
                              {ent.remaining} {ent.unit === 'hours' ? 'hrs' : 'days'}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">
                              remaining ({ent.proRataAllowance} pro-rata, {ent.used} used)
                            </span>
                          </div>
                        </div>
                      ))}
                      {entitlementResult.entitlements.length === 0 && (
                        <p className="text-xs text-blue-600 dark:text-blue-400">No leave balances found for this period.</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={!termForm.terminationDate || terminating}
                      onClick={() => {
                        if (!termForm.terminationDate) {
                          toast.error('Please set a termination date')
                          return
                        }
                        setTerminateNameEntry('')
                        setTerminateConfirmOpen(true)
                      }}
                    >
                      {terminating ? 'Processing...' : 'Terminate employee'}
                    </Button>
                  </div>

                  <AlertDialog open={terminateConfirmOpen} onOpenChange={setTerminateConfirmOpen}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Terminate {expectedFullName}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This sets their status to <strong>inactive</strong> and records the termination
                          date and reason. They will no longer be able to log in or be assigned to rotas.
                          {' '}This cannot be undone from the UI.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-2 space-y-2">
                        <Label htmlFor="confirm-name" className="text-xs">
                          To confirm, type <strong>{expectedFullName}</strong> below.
                        </Label>
                        <Input
                          id="confirm-name"
                          autoComplete="off"
                          value={terminateNameEntry}
                          onChange={(e) => setTerminateNameEntry(e.target.value)}
                          placeholder={expectedFullName}
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={terminating}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={!nameMatches || terminating}
                          className="bg-destructive text-white hover:bg-destructive/90"
                          onClick={async () => {
                            if (!nameMatches) return
                            setTerminating(true)
                            try {
                              const result = await terminateEmployee(tenantSlug, employeeId, termForm)
                              if (!result.ok) {
                                toast.error(result.error)
                                return
                              }
                              toast.success('Employee terminated')
                              setTerminateConfirmOpen(false)
                              router.refresh()
                            } catch (e) {
                              toast.error(e instanceof Error ? e.message : 'Failed to terminate employee')
                            } finally {
                              setTerminating(false)
                            }
                          }}
                        >
                          {terminating ? 'Terminating…' : 'Terminate employee'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </ExpandableSection>
        )}
      </div>
    </div>
    </div>
  )
}

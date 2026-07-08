'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Upload, Loader2, CheckCircle2, AlertCircle, FileUp, X } from 'lucide-react'
import { importEmployeesFromCsv, type CsvEmployeeRow, type ImportResult } from './actions'

// ── CSV Parsing ──

const EXPECTED_HEADERS = [
  'first name',
  'last name',
  'email',
  'job title',
  'department',
  'start date',
  'phone',
]

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++ // skip escaped quote
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
  }
  result.push(current.trim())
  return result
}

function parseCsv(text: string): { rows: CsvEmployeeRow[]; errors: string[] } {
  const lines = text.split(/\r?\n/).filter((line) => line.trim())
  const errors: string[] = []

  if (lines.length < 2) {
    return { rows: [], errors: ['CSV file must have a header row and at least one data row.'] }
  }

  const headerLine = parseCsvLine(lines[0])
  const headers = headerLine.map((h) => h.toLowerCase().trim())

  // Map header positions
  const colMap: Record<string, number> = {}
  for (const expected of EXPECTED_HEADERS) {
    const idx = headers.findIndex((h) => h === expected)
    if (idx !== -1) {
      colMap[expected] = idx
    }
  }

  // Validate required headers
  if (colMap['first name'] === undefined && colMap['last name'] === undefined) {
    // Try alternative header names
    const firstIdx = headers.findIndex((h) => h === 'firstname' || h === 'first_name')
    const lastIdx = headers.findIndex((h) => h === 'lastname' || h === 'last_name')
    if (firstIdx !== -1) colMap['first name'] = firstIdx
    if (lastIdx !== -1) colMap['last name'] = lastIdx
  }

  if (colMap['first name'] === undefined) {
    errors.push('Missing required column: "First Name"')
  }
  if (colMap['last name'] === undefined) {
    errors.push('Missing required column: "Last Name"')
  }

  if (errors.length > 0) {
    return { rows: [], errors }
  }

  // Also check for alternative column names for other fields
  if (colMap['job title'] === undefined) {
    const idx = headers.findIndex((h) => h === 'jobtitle' || h === 'job_title' || h === 'title' || h === 'role')
    if (idx !== -1) colMap['job title'] = idx
  }
  if (colMap['start date'] === undefined) {
    const idx = headers.findIndex((h) => h === 'startdate' || h === 'start_date' || h === 'hire date' || h === 'hire_date')
    if (idx !== -1) colMap['start date'] = idx
  }

  const rows: CsvEmployeeRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    rows.push({
      firstName: values[colMap['first name']] || '',
      lastName: values[colMap['last name']] || '',
      email: colMap['email'] !== undefined ? values[colMap['email']] || '' : '',
      jobTitle: colMap['job title'] !== undefined ? values[colMap['job title']] || '' : '',
      department: colMap['department'] !== undefined ? values[colMap['department']] || '' : '',
      startDate: colMap['start date'] !== undefined ? values[colMap['start date']] || '' : '',
      phone: colMap['phone'] !== undefined ? values[colMap['phone']] || '' : '',
    })
  }

  return { rows, errors }
}

// ── Validation ──

type ValidatedRow = CsvEmployeeRow & {
  rowNum: number
  error: string | null
}

function validateRows(rows: CsvEmployeeRow[]): ValidatedRow[] {
  return rows.map((row, i) => {
    let error: string | null = null
    if (!row.firstName.trim()) {
      error = 'First name is required'
    } else if (!row.lastName.trim()) {
      error = 'Last name is required'
    } else if (row.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(row.email.trim())) {
        error = 'Invalid email format'
      }
    }
    if (!error && row.startDate.trim()) {
      const d = new Date(row.startDate.trim())
      if (isNaN(d.getTime())) {
        error = 'Invalid date format'
      }
    }
    return { ...row, rowNum: i + 1, error }
  })
}

// ── Component ──

type Step = 'upload' | 'preview' | 'result'

export function ImportCsvButton({ tenantSlug }: { tenantSlug: string }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('upload')
  const [importing, setImporting] = useState(false)
  const [parseErrors, setParseErrors] = useState<string[]>([])
  const [validatedRows, setValidatedRows] = useState<ValidatedRow[]>([])
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const reset = useCallback(() => {
    setStep('upload')
    setParseErrors([])
    setValidatedRows([])
    setImportResult(null)
    setFileName(null)
    setImporting(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    // Delay reset so dialog close animation completes
    setTimeout(reset, 200)
  }, [reset])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      const { rows, errors } = parseCsv(text)

      if (errors.length > 0) {
        setParseErrors(errors)
        setStep('upload')
        return
      }

      const validated = validateRows(rows)
      setValidatedRows(validated)
      setParseErrors([])
      setStep('preview')
    }
    reader.readAsText(file)
  }, [])

  const validCount = validatedRows.filter((r) => !r.error).length
  const errorCount = validatedRows.filter((r) => r.error).length

  const handleImport = useCallback(async () => {
    setImporting(true)
    try {
      const rowsToImport = validatedRows
        .filter((r) => !r.error)
        .map(({ firstName, lastName, email, jobTitle, department, startDate, phone }) => ({
          firstName,
          lastName,
          email,
          jobTitle,
          department,
          startDate,
          phone,
        }))

      const result = await importEmployeesFromCsv(tenantSlug, rowsToImport)
      setImportResult(result)
      setStep('result')
      router.refresh()
    } catch {
      setImportResult({
        imported: 0,
        skipped: 0,
        errors: [{ row: 0, message: 'Failed to import employees. Please try again.' }],
      })
      setStep('result')
    } finally {
      setImporting(false)
    }
  }, [validatedRows, tenantSlug, router])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Import CSV
      </Button>

      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose() }}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {step === 'upload' && 'Import employees from CSV'}
              {step === 'preview' && 'Preview import'}
              {step === 'result' && 'Import complete'}
            </DialogTitle>
            <DialogDescription>
              {step === 'upload' && 'Upload a CSV file with employee data. Required columns: First Name, Last Name.'}
              {step === 'preview' && `${validCount} valid row${validCount !== 1 ? 's' : ''} ready to import${errorCount > 0 ? `, ${errorCount} with errors` : ''}.`}
              {step === 'result' && 'Here are the results of your import.'}
            </DialogDescription>
          </DialogHeader>

          {/* Upload Step */}
          {step === 'upload' && (
            <div className="flex-1 py-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">
                  {fileName ? fileName : 'Click to upload or drag a CSV file'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  CSV files only
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {parseErrors.length > 0 && (
                <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Errors found</span>
                  </div>
                  <ul className="text-sm text-destructive/80 list-disc pl-6 space-y-0.5">
                    {parseErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 rounded-md bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Expected columns:</p>
                <p className="text-xs text-muted-foreground">
                  First Name*, Last Name*, Email, Job Title, Department, Start Date, Phone
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  * Required. Employees with existing emails will be skipped.
                </p>
              </div>
            </div>
          )}

          {/* Preview Step */}
          {step === 'preview' && (
            <div className="flex-1 overflow-auto min-h-0">
              <div className="rounded-md border overflow-auto max-h-[45vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="w-10">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {validatedRows.map((row) => (
                      <TableRow
                        key={row.rowNum}
                        className={row.error ? 'bg-destructive/5' : ''}
                      >
                        <TableCell className="text-xs text-muted-foreground">{row.rowNum}</TableCell>
                        <TableCell className="text-sm">{row.firstName || <span className="text-muted-foreground italic">empty</span>}</TableCell>
                        <TableCell className="text-sm">{row.lastName || <span className="text-muted-foreground italic">empty</span>}</TableCell>
                        <TableCell className="text-sm">{row.email || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell className="text-sm">{row.jobTitle || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell className="text-sm">{row.department || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell className="text-sm">{row.startDate || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell className="text-sm">{row.phone || <span className="text-muted-foreground">-</span>}</TableCell>
                        <TableCell>
                          {row.error ? (
                            <span className="flex items-center gap-1 text-destructive" title={row.error}>
                              <X className="h-3.5 w-3.5" />
                            </span>
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {errorCount > 0 && (
                <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950/30">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {errorCount} row{errorCount !== 1 ? 's' : ''} with errors will be skipped:
                  </p>
                  <ul className="text-xs text-amber-700 dark:text-amber-300 list-disc pl-5 mt-1 space-y-0.5">
                    {validatedRows
                      .filter((r) => r.error)
                      .map((r) => (
                        <li key={r.rowNum}>
                          Row {r.rowNum}: {r.error}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Result Step */}
          {step === 'result' && importResult && (
            <div className="flex-1 py-4 space-y-4">
              {importResult.imported > 0 && (
                <div className="flex items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                      {importResult.imported} employee{importResult.imported !== 1 ? 's' : ''} imported successfully
                    </p>
                  </div>
                </div>
              )}

              {importResult.skipped > 0 && (
                <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
                  <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      {importResult.skipped} skipped (duplicate email)
                    </p>
                  </div>
                </div>
              )}

              {importResult.errors.length > 0 && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    <p className="text-sm font-medium text-destructive">
                      {importResult.errors.length} error{importResult.errors.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ul className="text-sm text-destructive/80 list-disc pl-6 space-y-0.5 max-h-32 overflow-auto">
                    {importResult.errors.map((err, i) => (
                      <li key={i}>
                        {err.row > 0 ? `Row ${err.row}: ` : ''}{err.message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {importResult.imported === 0 && importResult.errors.length === 0 && importResult.skipped === 0 && (
                <div className="text-center py-6 text-muted-foreground text-sm">
                  No employees were imported.
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <DialogFooter>
            {step === 'upload' && (
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            )}

            {step === 'preview' && (
              <>
                <Button variant="outline" onClick={reset}>
                  Back
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={validCount === 0 || importing}
                >
                  {importing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    `Import ${validCount} employee${validCount !== 1 ? 's' : ''}`
                  )}
                </Button>
              </>
            )}

            {step === 'result' && (
              <Button onClick={handleClose}>Done</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

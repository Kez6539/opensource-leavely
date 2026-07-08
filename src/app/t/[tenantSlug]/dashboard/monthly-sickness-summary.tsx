'use client'

import { useState } from 'react'
import { Thermometer, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import type { MonthlySicknessSummary } from './dashboard-actions'

export function MonthlySicknessSummary({ data }: { data: MonthlySicknessSummary }) {
  const [copied, setCopied] = useState(false)

  const total = data.rows.reduce((sum, r) => sum + r.days, 0)

  async function handleCopy() {
    const today = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const header = `Sickness — ${data.monthLabel}`
    const lines = data.rows.length
      ? data.rows.map((r) => `${r.name} — ${r.days} ${r.days === 1 ? 'day' : 'days'}`)
      : ['No active employees']
    const text = [header, `Sent ${today}`, '', ...lines].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy — select and copy manually')
    }
  }

  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Thermometer className="h-4 w-4 text-red-500 shrink-0" />
          <h3 className="text-sm font-semibold truncate">
            Sickness this month — {data.monthLabel}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium hover:bg-accent transition-colors shrink-0"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy for payroll'}
        </button>
      </div>

      {data.rows.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">
          No active employees.
        </p>
      ) : (
        <>
          <ul className="divide-y">
            {data.rows.map((r) => (
              <li key={r.employeeId} className="flex items-center justify-between py-2 text-sm">
                <span className={`truncate ${r.days > 0 ? 'font-medium' : 'text-muted-foreground'}`}>
                  {r.name}
                </span>
                <span className={`tabular-nums shrink-0 ml-3 ${r.days > 0 ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                  {r.days} {r.days === 1 ? 'day' : 'days'}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-3 mt-2 border-t text-xs text-muted-foreground">
            <span>{data.rows.length} {data.rows.length === 1 ? 'person' : 'people'}</span>
            <span className="tabular-nums">
              Total: {Math.round(total * 10) / 10} {total === 1 ? 'day' : 'days'}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RotateCcw, Calculator, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RiskInfo {
  level: string
  label: string
  action: string
  bgClass: string
  textClass: string
  borderClass: string
  barClass: string
}

function getRiskInfo(score: number): RiskInfo {
  if (score === 0) return {
    level: 'none',
    label: 'No absences',
    action: 'Nothing to report',
    bgClass: 'bg-gray-50',
    textClass: 'text-gray-600',
    borderClass: 'border-gray-200',
    barClass: 'bg-gray-300',
  }
  if (score < 50) return {
    level: 'low',
    label: 'Low',
    action: 'No action required',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    barClass: 'bg-emerald-500',
  }
  if (score < 125) return {
    level: 'medium',
    label: 'Medium',
    action: 'Informal discussion with manager',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-200',
    barClass: 'bg-amber-500',
  }
  if (score < 400) return {
    level: 'high',
    label: 'High',
    action: 'Formal review meeting',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-200',
    barClass: 'bg-orange-500',
  }
  if (score < 650) return {
    level: 'very-high',
    label: 'Very High',
    action: 'Written warning',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    borderClass: 'border-red-200',
    barClass: 'bg-red-500',
  }
  return {
    level: 'critical',
    label: 'Critical',
    action: 'Final warning or disciplinary action',
    bgClass: 'bg-red-100',
    textClass: 'text-red-800',
    borderClass: 'border-red-300',
    barClass: 'bg-red-700',
  }
}

function getRiskIcon(level: string) {
  switch (level) {
    case 'none':
    case 'low':
      return <CheckCircle className="h-6 w-6" />
    case 'medium':
    case 'high':
      return <AlertTriangle className="h-6 w-6" />
    default:
      return <XCircle className="h-6 w-6" />
  }
}

export default function BradfordFactorCalculator() {
  const [spells, setSpells] = useState('')
  const [days, setDays] = useState('')

  const s = parseInt(spells) || 0
  const d = parseInt(days) || 0
  const score = s * s * d
  const risk = getRiskInfo(score)
  const hasInput = spells !== '' || days !== ''

  function handleReset() {
    setSpells('')
    setDays('')
  }

  // Calculate bar width as percentage (cap at 1000 for visual purposes)
  const barPercent = Math.min((score / 1000) * 100, 100)

  return (
    <div>
      {/* Calculator card */}
      <div className="rounded-2xl border bg-white shadow-lg shadow-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bradford Factor Calculator</h2>
              <p className="text-sm text-emerald-100">Enter absence data for a rolling 12-month period</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="spells" className="text-gray-700">
                Number of absence spells (S)
              </Label>
              <Input
                id="spells"
                type="number"
                min="0"
                max="365"
                placeholder="e.g. 4"
                value={spells}
                onChange={(e) => setSpells(e.target.value)}
                className="h-12 text-lg"
              />
              <p className="text-xs text-gray-400">Separate instances of absence, not individual days</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="days" className="text-gray-700">
                Total days absent (D)
              </Label>
              <Input
                id="days"
                type="number"
                min="0"
                max="365"
                placeholder="e.g. 10"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="h-12 text-lg"
              />
              <p className="text-xs text-gray-400">Total working days absent across all spells</p>
            </div>
          </div>

          {/* Formula breakdown */}
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Formula</p>
            <p className="text-center font-mono text-lg text-gray-800">
              <span className="text-emerald-600 font-bold">{s}</span>
              {' '}
              <span className="text-gray-400">&times;</span>
              {' '}
              <span className="text-emerald-600 font-bold">{s}</span>
              {' '}
              <span className="text-gray-400">&times;</span>
              {' '}
              <span className="text-teal-600 font-bold">{d}</span>
              {' '}
              <span className="text-gray-400">=</span>
              {' '}
              <span className="font-extrabold text-gray-900">{score.toLocaleString()}</span>
            </p>
            <p className="text-center text-xs text-gray-400 mt-1">
              S &times; S &times; D = Bradford Factor score
            </p>
          </div>

          {/* Result */}
          <div className={`rounded-xl border-2 ${risk.borderClass} ${risk.bgClass} p-6 mb-6 transition-all duration-300`}>
            <div className="flex items-start gap-4">
              <div className={`${risk.textClass} mt-0.5`}>
                {getRiskIcon(risk.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <p className="text-3xl font-extrabold text-gray-900">{score.toLocaleString()}</p>
                  <span className={`text-sm font-bold ${risk.textClass} px-2.5 py-0.5 rounded-full ${risk.bgClass} border ${risk.borderClass}`}>
                    {risk.label}
                  </span>
                </div>
                <p className={`text-sm ${risk.textClass} font-medium mt-1`}>
                  Recommended action: {risk.action}
                </p>
              </div>
            </div>

            {/* Score bar */}
            {hasInput && (
              <div className="mt-4">
                <div className="h-2.5 bg-white rounded-full overflow-hidden border border-gray-200">
                  <div
                    className={`h-full rounded-full ${risk.barClass} transition-all duration-500 ease-out`}
                    style={{ width: `${barPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
                  <span>0</span>
                  <span>50</span>
                  <span>125</span>
                  <span>400</span>
                  <span>650</span>
                  <span>1000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Reset button */}
          {hasInput && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset calculator
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Threshold reference table */}
      <div className="mt-10 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 sm:px-8 border-b bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">Bradford Factor trigger point thresholds</h3>
          <p className="text-sm text-gray-500 mt-1">Common thresholds used by UK businesses. Your organisation may set different levels.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Score range</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Risk level</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Recommended action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 font-mono">0 &ndash; 49</td>
                <td className="p-4"><span className="text-sm font-semibold text-emerald-600">Low</span></td>
                <td className="p-4 text-sm text-gray-600">No action required</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 font-mono">50 &ndash; 124</td>
                <td className="p-4"><span className="text-sm font-semibold text-amber-600">Medium</span></td>
                <td className="p-4 text-sm text-gray-600">Informal discussion with manager</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 font-mono">125 &ndash; 399</td>
                <td className="p-4"><span className="text-sm font-semibold text-orange-600">High</span></td>
                <td className="p-4 text-sm text-gray-600">Formal review meeting</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 font-mono">400 &ndash; 649</td>
                <td className="p-4"><span className="text-sm font-semibold text-red-600">Very High</span></td>
                <td className="p-4 text-sm text-gray-600">Written warning</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600 font-mono">650+</td>
                <td className="p-4"><span className="text-sm font-semibold text-red-800">Critical</span></td>
                <td className="p-4 text-sm text-gray-600">Final warning or disciplinary action</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational content */}
      <div className="mt-12 prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

        <h2>What is the Bradford Factor?</h2>
        <p>
          The <strong>Bradford Factor</strong> (also called the Bradford Formula or Bradford Index) is a widely used HR metric that measures the impact of employee absences on an organisation. It was developed at the Bradford University School of Management and is based on the principle that <strong>frequent, short-term absences are more disruptive</strong> to a business than fewer, longer absences.
        </p>
        <p>
          For example, an employee who takes ten separate single-day absences causes significantly more disruption than an employee who takes one ten-day absence. Each short absence requires last-minute cover, work redistribution, and management time &mdash; multiplied across every occurrence.
        </p>

        <h2>How the Bradford Factor formula works</h2>
        <p>The formula is:</p>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 not-prose">
          <p className="text-emerald-800 font-mono text-center text-xl font-bold mb-2">
            B = S &times; S &times; D
          </p>
          <div className="text-center text-sm text-emerald-700 space-y-0.5">
            <p><strong>B</strong> = Bradford Factor score</p>
            <p><strong>S</strong> = number of separate absence spells in a rolling 12-month period</p>
            <p><strong>D</strong> = total number of days absent in the same period</p>
          </div>
        </div>
        <p>
          The critical detail is that <strong>S is squared</strong>. This means the number of separate absence instances has a much greater impact on the score than the total number of days. Two employees can have the same number of days off but wildly different Bradford Factor scores depending on how those days are distributed.
        </p>

        <h3>Worked example</h3>
        <p>Consider two employees who have both been absent for 10 days over 12 months:</p>
        <ul className="list-disc pl-6">
          <li><strong>Employee A</strong> &mdash; 1 absence spell of 10 days: 1 &times; 1 &times; 10 = <strong>10</strong></li>
          <li><strong>Employee B</strong> &mdash; 10 separate single-day absences: 10 &times; 10 &times; 10 = <strong>1,000</strong></li>
        </ul>
        <p>
          Employee B scores 100 times higher despite the same total days absent. The Bradford Factor flags Employee B&apos;s pattern as far more disruptive.
        </p>

        <h2>How to use Bradford Factor scores</h2>
        <p>
          The Bradford Factor is a <strong>trigger tool</strong>, not a disciplinary tool. A high score should prompt a conversation, not an automatic penalty. Here is how most UK employers use it:
        </p>
        <ol className="list-decimal pl-6">
          <li><strong>Set clear trigger points</strong> &mdash; define thresholds in your absence policy (see the table above) and communicate them to all staff.</li>
          <li><strong>Monitor over a rolling 12-month period</strong> &mdash; calculate scores using the previous 12 months, not the calendar year.</li>
          <li><strong>Investigate context</strong> &mdash; when an employee hits a threshold, have a supportive conversation to understand the reasons behind their absences.</li>
          <li><strong>Exclude protected absences</strong> &mdash; disability-related absences, maternity/paternity leave, and other legally protected absences should not be included in the calculation.</li>
          <li><strong>Apply consistently</strong> &mdash; use the same thresholds and processes for every employee to avoid claims of discrimination.</li>
        </ol>

        <h2>Limitations to be aware of</h2>
        <p>
          The Bradford Factor is a useful tool but it has limitations that every employer should understand:
        </p>
        <ul className="list-disc pl-6">
          <li><strong>Disability discrimination risk</strong> &mdash; employees with chronic conditions (e.g. migraines, IBS, endometriosis) may have frequent short absences that inflate their score. Under the Equality Act 2010, employers must make reasonable adjustments and should consider excluding disability-related absences.</li>
          <li><strong>No context</strong> &mdash; the formula treats all absences equally. A genuine flu and a suspicious post-weekend absence both count the same.</li>
          <li><strong>Presenteeism risk</strong> &mdash; employees aware of the formula may come to work while unwell to avoid triggering thresholds, which can spread illness and reduce productivity.</li>
          <li><strong>Not a standalone tool</strong> &mdash; the Bradford Factor should be one component of a broader absence management approach, never the sole basis for disciplinary action.</li>
        </ul>

        <h2>Best practices for UK employers</h2>
        <ul className="list-disc pl-6">
          <li><strong>Document your policy</strong> &mdash; include the Bradford Factor, trigger thresholds, and the process that follows in your company absence policy.</li>
          <li><strong>Train managers</strong> &mdash; ensure line managers understand the formula, what scores mean, and how to conduct supportive absence conversations.</li>
          <li><strong>Use return-to-work interviews</strong> &mdash; pair the Bradford Factor with <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work interviews</Link> to get a fuller picture of absence patterns.</li>
          <li><strong>Automate the calculation</strong> &mdash; manual tracking in spreadsheets is error-prone and time-consuming. Leave management software calculates Bradford Factor scores automatically as absence records are updated.</li>
          <li><strong>Review thresholds annually</strong> &mdash; what works for a 10-person team may not suit a 100-person organisation. Review your trigger points as your business grows.</li>
        </ul>

      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 sm:p-10 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Automate Bradford Factor tracking</h3>
        <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
          Leavely calculates Bradford Factor scores automatically for every employee. No spreadsheets, no manual counting. Try it free for 14 days.
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
            Start free trial <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

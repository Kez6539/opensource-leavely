import { CardSection } from '@/components/shared/card-section'
import type { BradfordResult } from '../bradford-factor'

const RISK_BG: Record<string, string> = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-700',
}

export function BradfordFactorCard({ result }: { result: BradfordResult }) {
  return (
    <CardSection title="Bradford Factor">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className={`text-4xl font-bold ${result.riskColor}`}>
            {result.score}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${RISK_BG[result.riskLevel]}`}
          >
            {result.riskLevel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Spells (S)</p>
            <p className="font-medium">{result.spells}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total days (D)</p>
            <p className="font-medium">{result.totalDays}</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground border-t pt-3 space-y-1">
          <p className="font-medium">B = S² x D (last 52 weeks)</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1" />
              0-49 Low
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />
              50-124 Medium
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1" />
              125-399 High
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />
              400+ Critical
            </span>
          </div>
        </div>
      </div>
    </CardSection>
  )
}

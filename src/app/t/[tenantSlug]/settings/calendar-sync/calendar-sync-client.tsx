'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardSection } from '@/components/shared/card-section'
import { ConfirmDialog } from '@/components/shared'
import { ConversionPrompt } from '@/components/shared/conversion-prompt'
import { Calendar, Copy, RefreshCw, CheckCircle2, Clock } from 'lucide-react'
import { getOrCreateCalendarToken, regenerateCalendarToken } from './actions'

interface TokenView {
  id: string
  token: string
  createdAt: string
  lastFetchedAt: string | null
}

interface Props {
  tenantSlug: string
  personalToken: TokenView | null
  teamToken: TokenView | null
  canManage: boolean
  conversionPromptEnabled: boolean
}

function getCalendarUrl(token: string) {
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  return `${base}/api/calendar/${token}`
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const sec = Math.floor(diffMs / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} hr ago`
  const day = Math.floor(hr / 24)
  if (day < 30) return `${day} day${day === 1 ? '' : 's'} ago`
  return new Date(iso).toLocaleDateString('en-GB')
}

function TokenCard({
  label,
  description,
  token,
  tenantSlug,
  scope,
  onGenerated,
}: {
  label: string
  description: string
  token: TokenView | null
  tenantSlug: string
  scope: 'personal' | 'team'
  onGenerated: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [regenerating, setRegenerating] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      await getOrCreateCalendarToken(tenantSlug, scope)
      router.refresh()
      toast.success('Calendar feed URL generated')
      onGenerated()
    } catch {
      toast.error('Failed to generate calendar feed')
    } finally {
      setLoading(false)
    }
  }

  async function confirmRegenerate() {
    setRegenerating(true)
    try {
      await regenerateCalendarToken(tenantSlug, scope)
      router.refresh()
      toast.success('Calendar feed URL regenerated. Old URL will stop working.')
      setConfirmOpen(false)
    } catch {
      toast.error('Failed to regenerate calendar feed')
    } finally {
      setRegenerating(false)
    }
  }

  function handleCopy() {
    if (token) {
      navigator.clipboard.writeText(getCalendarUrl(token.token))
      toast.success('Copied to clipboard')
    }
  }

  return (
    <CardSection title={label}>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {token ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              readOnly
              value={getCalendarUrl(token.token)}
              className="font-mono text-xs"
            />
            <Button variant="outline" size="icon" onClick={handleCopy} title="Copy URL">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3 w-3" />
              Generated {new Date(token.createdAt).toLocaleDateString('en-GB')}
            </span>
            {token.lastFetchedAt ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Last fetched {timeAgo(token.lastFetchedAt)}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-500">
                <Clock className="h-3 w-3" />
                Never fetched yet — paste the URL into your calendar app
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmOpen(true)}
              disabled={regenerating}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              {regenerating ? 'Regenerating...' : 'Regenerate URL'}
            </Button>
            <p className="text-xs text-muted-foreground">
              Regenerating will invalidate the old URL.
            </p>
          </div>
        </div>
      ) : (
        <Button onClick={handleGenerate} disabled={loading}>
          <Calendar className="h-4 w-4 mr-2" />
          {loading ? 'Generating...' : 'Generate Feed URL'}
        </Button>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Regenerate calendar token?"
        description="Your existing calendar subscribers will stop receiving updates until you share the new link. This cannot be undone — anyone subscribed to the old URL will need the new one."
        confirmLabel="Regenerate"
        variant="default"
        onConfirm={confirmRegenerate}
        loading={regenerating}
      />
    </CardSection>
  )
}

export function CalendarSyncClient({
  tenantSlug,
  personalToken,
  teamToken,
  canManage,
  conversionPromptEnabled,
}: Props) {
  const [calendarPromptSignal, setCalendarPromptSignal] = useState(0)

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <p className="text-sm text-muted-foreground">
          Subscribe to your leave calendar in Google Calendar, Outlook, or Apple Calendar.
          Copy the URL below and add it as a calendar subscription.
        </p>
      </div>

      <TokenCard
        label="My Leave Calendar"
        description="Shows your own approved leave. Subscribe to this URL in your calendar app."
        token={personalToken}
        tenantSlug={tenantSlug}
        scope="personal"
        onGenerated={() => setCalendarPromptSignal((value) => value + 1)}
      />
      {canManage && (
        <TokenCard
          label="Team Leave Calendar"
          description="Shows all approved leave across the organisation. Only available for managers and above."
          token={teamToken}
          tenantSlug={tenantSlug}
          scope="team"
          onGenerated={() => setCalendarPromptSignal((value) => value + 1)}
        />
      )}

      <CardSection title="How to subscribe">
        <ol className="text-sm space-y-2 list-decimal pl-5 text-muted-foreground">
          <li><strong>Google Calendar:</strong> Settings → Add calendar → From URL → paste the link.</li>
          <li><strong>Outlook (web):</strong> Add calendar → Subscribe from web → paste the link.</li>
          <li><strong>Apple Calendar (Mac):</strong> File → New Calendar Subscription → paste the link.</li>
          <li><strong>iPhone:</strong> Settings → Calendar → Accounts → Add Account → Other → Add Subscribed Calendar.</li>
        </ol>
        <p className="text-xs text-muted-foreground mt-3">
          Calendar apps usually refresh every few hours. The &ldquo;last fetched&rdquo; timestamp above tells you when your app last pulled the feed.
        </p>
      </CardSection>
      <ConversionPrompt
        tenantSlug={tenantSlug}
        moment="calendar-setup"
        enabled={conversionPromptEnabled}
        openSignal={calendarPromptSignal}
      />
    </div>
  )
}

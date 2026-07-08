'use client'

import { useState, useTransition, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardSection } from '@/components/shared'
import { toast } from 'sonner'
import { updateEmailPreferences, updateTenantNotificationSettings } from './actions'
import type { TenantNotificationSettings } from './actions'
import { subscribeToPush, unsubscribeFromPush } from './push-actions'
import { Bell, BellOff, User, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type EmailType = { key: string; label: string; description: string }
type EmailGroup = { key: string; label: string; icon: LucideIcon; description: string; types: EmailType[] }

const EMAIL_GROUPS: EmailGroup[] = [
  {
    key: 'self',
    label: 'Just you',
    icon: User,
    description: 'Emails about your own activity in the system.',
    types: [
      { key: 'leaveUpdates', label: 'Leave updates', description: 'Approvals, rejections, and changes to your own requests.' },
    ],
  },
  {
    key: 'company',
    label: 'Company-wide',
    icon: Building2,
    description: 'Emails sent to everyone in the organisation.',
    types: [
      { key: 'announcements', label: 'Announcements', description: 'Company-wide announcement emails.' },
    ],
  },
  {
    key: 'account',
    label: 'Account & product',
    icon: Bell,
    description: 'Billing reminders and product updates from Leavely.',
    types: [
      { key: 'trialWarnings', label: 'Trial warnings', description: 'Trial expiry reminder emails.' },
      { key: 'marketing', label: 'Marketing', description: 'Product updates and tips.' },
    ],
  },
]

interface Props {
  tenantSlug: string
  initialPrefs: Record<string, boolean>
  initialPushSubscribed: boolean
  tenantNotifications: TenantNotificationSettings
  isAdmin: boolean
}

function getVapidPublicKey(): string | null {
  // This is injected by Next.js at build time
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || null
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function NotificationsClient({ tenantSlug, initialPrefs, initialPushSubscribed, tenantNotifications, isAdmin }: Props) {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(initialPrefs)
  const [isPending, startTransition] = useTransition()
  const [pushSupported, setPushSupported] = useState(false)
  const [pushSubscribed, setPushSubscribed] = useState(initialPushSubscribed)
  const [pushLoading, setPushLoading] = useState(false)
  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default')
  const [tenantSettings, setTenantSettings] = useState<TenantNotificationSettings>(tenantNotifications)
  const [tenantSaving, setTenantSaving] = useState(false)

  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
    setPushSupported(supported)
    if (supported) {
      setPushPermission(Notification.permission)
    }
  }, [])

  function handleToggle(key: string, checked: boolean) {
    const updated = { ...prefs, [key]: checked }
    setPrefs(updated)
    startTransition(async () => {
      try {
        await updateEmailPreferences(tenantSlug, updated)
        toast.success('Preferences saved')
      } catch {
        toast.error('Failed to save preferences')
        setPrefs(prefs)
      }
    })
  }

  async function handleEnablePush() {
    setPushLoading(true)
    try {
      const vapidKey = getVapidPublicKey()
      if (!vapidKey) {
        toast.error('Push notifications are not configured on this server')
        return
      }

      // Request permission
      const permission = await Notification.requestPermission()
      setPushPermission(permission)
      if (permission !== 'granted') {
        toast.error('Notification permission was denied. Please enable it in your browser settings.')
        return
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      // Subscribe to push
      const keyBytes = urlBase64ToUint8Array(vapidKey)
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyBytes.buffer.slice(keyBytes.byteOffset, keyBytes.byteOffset + keyBytes.byteLength) as ArrayBuffer,
      })

      const subJson = subscription.toJSON()
      if (!subJson.endpoint || !subJson.keys?.p256dh || !subJson.keys?.auth) {
        throw new Error('Invalid push subscription')
      }

      await subscribeToPush(tenantSlug, {
        endpoint: subJson.endpoint,
        p256dh: subJson.keys.p256dh,
        auth: subJson.keys.auth,
      })

      setPushSubscribed(true)
      toast.success('Push notifications enabled')
    } catch (err) {
      console.error('[push] Enable error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to enable push notifications')
    } finally {
      setPushLoading(false)
    }
  }

  async function handleDisablePush() {
    setPushLoading(true)
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        const subscription = await registration.pushManager.getSubscription()
        if (subscription) {
          await unsubscribeFromPush(tenantSlug, subscription.endpoint)
          await subscription.unsubscribe()
        }
      }
      setPushSubscribed(false)
      toast.success('Push notifications disabled')
    } catch (err) {
      console.error('[push] Disable error:', err)
      toast.error('Failed to disable push notifications')
    } finally {
      setPushLoading(false)
    }
  }

  async function handleTenantToggle(key: keyof TenantNotificationSettings, value: boolean | number) {
    const updated = { ...tenantSettings, [key]: value }
    setTenantSettings(updated)
    setTenantSaving(true)
    try {
      await updateTenantNotificationSettings(tenantSlug, { [key]: value })
      toast.success('Notification setting saved')
    } catch {
      setTenantSettings(tenantSettings)
      toast.error('Failed to save notification setting')
    } finally {
      setTenantSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Choose which emails you receive. In-app notifications are always enabled.
      </p>

      <CardSection title="Email Notifications">
        <div className="space-y-6">
          {EMAIL_GROUPS.map((group) => {
            const Icon = group.icon
            return (
              <div key={group.key}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold">{group.label}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-3 ml-6">{group.description}</p>
                <div className="ml-6 space-y-3">
                  {group.types.map(({ key, label, description }) => (
                    <div key={key} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Label className="font-medium">{label}</Label>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      <Switch
                        checked={prefs[key] !== false}
                        onCheckedChange={(checked) => handleToggle(key, checked)}
                        disabled={isPending}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardSection>

      {pushSupported && (
        <CardSection title="Push Notifications">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get instant browser notifications when someone submits a leave request or other important events happen.
            </p>

            {pushPermission === 'denied' ? (
              <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
                <p className="text-sm text-amber-800">
                  Push notifications are blocked in your browser. To enable them, update your notification settings in your browser for this site.
                </p>
              </div>
            ) : pushSubscribed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Push notifications are enabled</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisablePush}
                  disabled={pushLoading}
                >
                  <BellOff className="mr-2 h-4 w-4" />
                  {pushLoading ? 'Disabling...' : 'Disable'}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleEnablePush}
                disabled={pushLoading}
              >
                <Bell className="mr-2 h-4 w-4" />
                {pushLoading ? 'Enabling...' : 'Enable push notifications'}
              </Button>
            )}
          </div>
        </CardSection>
      )}

      {/* Tenant-level notification categories (admins only can edit) */}
      <CardSection title="Company Notification Categories">
        <p className="text-sm text-muted-foreground mb-4">
          {isAdmin
            ? 'Configure which automatic notifications are sent across your organisation. These settings apply to all users.'
            : 'These notification categories are configured by your organisation administrator.'}
        </p>
        <div className="space-y-4">
          {/* Probation ending */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Probation ending</Label>
              <p className="text-xs text-muted-foreground">
                Notify managers when an employee&apos;s probation period is about to end
              </p>
            </div>
            <Switch
              checked={tenantSettings.notifyProbationEnding}
              onCheckedChange={(checked) => handleTenantToggle('notifyProbationEnding', checked)}
              disabled={!isAdmin || tenantSaving}
            />
          </div>
          {tenantSettings.notifyProbationEnding && (
            <div className="ml-4 flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Days before</Label>
              <Input
                type="number"
                min={1}
                max={90}
                value={tenantSettings.notifyProbationDays}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (!isNaN(val) && val >= 1 && val <= 90) {
                    handleTenantToggle('notifyProbationDays', val)
                  }
                }}
                className="w-20 h-8 text-sm"
                disabled={!isAdmin || tenantSaving}
              />
            </div>
          )}

          {/* Work anniversaries */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Work anniversaries</Label>
              <p className="text-xs text-muted-foreground">
                Notify on employee work anniversaries
              </p>
            </div>
            <Switch
              checked={tenantSettings.notifyWorkAnniversaries}
              onCheckedChange={(checked) => handleTenantToggle('notifyWorkAnniversaries', checked)}
              disabled={!isAdmin || tenantSaving}
            />
          </div>

          {/* Birthdays */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Birthdays</Label>
              <p className="text-xs text-muted-foreground">
                Notify on employee birthdays
              </p>
            </div>
            <Switch
              checked={tenantSettings.notifyBirthdays}
              onCheckedChange={(checked) => handleTenantToggle('notifyBirthdays', checked)}
              disabled={!isAdmin || tenantSaving}
            />
          </div>

          {/* Document expiry */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Document expiry reminders</Label>
              <p className="text-xs text-muted-foreground">
                Notify when employee documents are approaching expiry
              </p>
            </div>
            <Switch
              checked={tenantSettings.notifyDocumentExpiry}
              onCheckedChange={(checked) => handleTenantToggle('notifyDocumentExpiry', checked)}
              disabled={!isAdmin || tenantSaving}
            />
          </div>
          {tenantSettings.notifyDocumentExpiry && (
            <div className="ml-4 flex items-center gap-2">
              <Label className="text-xs text-muted-foreground whitespace-nowrap">Days before expiry</Label>
              <Input
                type="number"
                min={1}
                max={180}
                value={tenantSettings.notifyDocumentExpiryDays}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (!isNaN(val) && val >= 1 && val <= 180) {
                    handleTenantToggle('notifyDocumentExpiryDays', val)
                  }
                }}
                className="w-20 h-8 text-sm"
                disabled={!isAdmin || tenantSaving}
              />
            </div>
          )}
        </div>
      </CardSection>
    </div>
  )
}

'use client'

import { useState, useTransition, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, LogIn, LogOut, CheckCircle2, XCircle, AlertTriangle, Clock, Navigation } from 'lucide-react'
import Link from 'next/link'
import { qrClockIn, qrClockOut } from './actions'

interface LocationInfo {
  id: string
  name: string
  address: string | null
  isActive: boolean
  tenantName: string
  tenantSlug: string
  clockInEnabled: boolean
}

type ClockStatus =
  | { authenticated: false }
  | {
      authenticated: true
      employee: { id: string; name: string } | null
      entry?: {
        id: string
        clockIn: string
        clockOut: string | null
        locationId: string | null
        totalHours: number | null
      } | null
    }

interface Props {
  token: string
  location: LocationInfo
  initialStatus: ClockStatus
}

type GpsState = 'idle' | 'requesting' | 'acquired' | 'denied' | 'unavailable'

export function ClockInClient({ token, location, initialStatus }: Props) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{
    type: 'clock_in' | 'clock_out'
    time: string
    totalHours?: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [gpsState, setGpsState] = useState<GpsState>('idle')
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null)

  const requestGps = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setGpsState('unavailable')
        resolve(null)
        return
      }
      setGpsState('requesting')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setGpsCoords(coords)
          setGpsState('acquired')
          resolve(coords)
        },
        () => {
          setGpsState('denied')
          resolve(null)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    })
  }, [])

  const isClockedIn =
    initialStatus.authenticated &&
    initialStatus.employee &&
    initialStatus.entry &&
    !initialStatus.entry.clockOut

  const isAlreadyClockedOut =
    initialStatus.authenticated &&
    initialStatus.employee &&
    initialStatus.entry &&
    !!initialStatus.entry.clockOut

  function handleClockIn() {
    setError(null)
    setResult(null)
    startTransition(async () => {
      try {
        const gps = await requestGps()
        const res = await qrClockIn(token, gps)
        setResult({ type: 'clock_in', time: res.clockIn })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to clock in')
      }
    })
  }

  function handleClockOut() {
    setError(null)
    setResult(null)
    startTransition(async () => {
      try {
        const gps = await requestGps()
        const res = await qrClockOut(token, gps)
        setResult({ type: 'clock_out', time: res.clockOut, totalHours: res.totalHours })
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to clock out')
      }
    })
  }

  // Error states
  if (!location.clockInEnabled) {
    return (
      <PageWrapper>
        <StatusCard
          icon={<XCircle className="h-12 w-12 text-red-500" />}
          title="Clock-in Disabled"
          description="Clock-in is not currently enabled for this organisation. Please contact your administrator."
        />
      </PageWrapper>
    )
  }

  if (!location.isActive) {
    return (
      <PageWrapper>
        <StatusCard
          icon={<XCircle className="h-12 w-12 text-amber-500" />}
          title="Location Inactive"
          description="This location is no longer active. Please contact your administrator."
        />
      </PageWrapper>
    )
  }

  // Not authenticated — show login prompt
  if (!initialStatus.authenticated) {
    const loginUrl = `/login?redirect=${encodeURIComponent(`/clock/${token}`)}`
    return (
      <PageWrapper>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border p-8 max-w-sm w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <MapPin className="h-7 w-7 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-xl font-bold mb-1">{location.name}</h1>
          {location.address && (
            <p className="text-sm text-muted-foreground mb-6">{location.address}</p>
          )}
          <p className="text-sm text-muted-foreground mb-2">{location.tenantName}</p>
          <hr className="my-6" />
          <p className="text-sm text-muted-foreground mb-4">
            Please sign in to clock in at this location.
          </p>
          <Button asChild className="w-full">
            <Link href={loginUrl}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In to Clock In
            </Link>
          </Button>
        </div>
      </PageWrapper>
    )
  }

  // Authenticated but no employee record
  if (!initialStatus.employee) {
    return (
      <PageWrapper>
        <LocationHeader name={location.name} address={location.address} tenantName={location.tenantName} />
        <StatusCard
          icon={<AlertTriangle className="h-12 w-12 text-amber-500" />}
          title="No Employee Record"
          description="Your account is not linked to an employee record in this organisation. Please contact your administrator."
        />
      </PageWrapper>
    )
  }

  // Success result
  if (result) {
    return (
      <PageWrapper>
        <LocationHeader name={location.name} address={location.address} tenantName={location.tenantName} />
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border p-8 max-w-sm w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">
            {result.type === 'clock_in' ? 'Clocked In' : 'Clocked Out'}
          </h2>
          <p className="text-sm text-muted-foreground mb-1">{initialStatus.employee.name}</p>
          <p className="text-2xl font-mono font-bold text-emerald-600 mb-2">
            {new Date(result.time).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>
          {result.totalHours !== undefined && (
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-semibold">{result.totalHours}h</span>
            </p>
          )}
          {gpsCoords && (
            <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
              <Navigation className="h-3 w-3" />
              <span>GPS: {gpsCoords.lat.toFixed(4)}, {gpsCoords.lng.toFixed(4)}</span>
            </div>
          )}
          <hr className="my-6" />
          <p className="text-xs text-muted-foreground">
            {location.name} &middot; {new Date(result.time).toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </PageWrapper>
    )
  }

  // Main clock-in/out UI
  return (
    <PageWrapper>
      <LocationHeader name={location.name} address={location.address} tenantName={location.tenantName} />
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Welcome,</p>
          <p className="text-lg font-semibold">{initialStatus.employee.name}</p>
        </div>

        {/* Already clocked out today */}
        {isAlreadyClockedOut && initialStatus.entry && (
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <p className="font-medium mb-1">Already clocked out today</p>
            <p className="text-sm text-muted-foreground">
              In: {new Date(initialStatus.entry.clockIn).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              {' '}&middot;{' '}
              Out: {new Date(initialStatus.entry.clockOut!).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
            {initialStatus.entry.totalHours !== null && (
              <p className="text-sm text-muted-foreground mt-1">
                Total: <span className="font-semibold">{initialStatus.entry.totalHours}h</span>
              </p>
            )}
          </div>
        )}

        {/* Clocked in — show clock out button */}
        {isClockedIn && initialStatus.entry && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Clocked in at{' '}
                <span className="font-semibold text-foreground">
                  {new Date(initialStatus.entry.clockIn).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </span>
            </div>
            <button
              onClick={handleClockOut}
              disabled={isPending}
              className="flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg transition-all duration-300 border-4 bg-gradient-to-br from-red-500 to-red-600 border-red-300 hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <LogOut className="h-8 w-8 mb-1" />
              <span className="text-base font-bold">
                {isPending ? 'Clocking out...' : 'Clock Out'}
              </span>
            </button>
            {gpsState === 'requesting' && (
              <p className="text-xs text-muted-foreground animate-pulse">Acquiring GPS...</p>
            )}
          </div>
        )}

        {/* Not clocked in — show clock in button */}
        {!isClockedIn && !isAlreadyClockedOut && (
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleClockIn}
              disabled={isPending}
              className="flex flex-col items-center justify-center rounded-full w-36 h-36 shadow-lg transition-all duration-300 border-4 bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-300 hover:from-emerald-600 hover:to-emerald-700 focus:ring-4 focus:ring-emerald-300 focus:outline-none text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <LogIn className="h-8 w-8 mb-1" />
              <span className="text-base font-bold">
                {isPending ? 'Clocking in...' : 'Clock In'}
              </span>
            </button>
            {gpsState === 'requesting' && (
              <p className="text-xs text-muted-foreground animate-pulse">Acquiring GPS...</p>
            )}
          </div>
        )}

        {/* GPS status */}
        {gpsState === 'denied' && (
          <p className="text-xs text-amber-600 text-center mt-4">
            GPS access was denied. Clock-in will still work but location won&apos;t be recorded.
          </p>
        )}
        {gpsState === 'unavailable' && (
          <p className="text-xs text-amber-600 text-center mt-4">
            GPS is not available on this device.
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-900 text-center">
            {error}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-background dark:to-emerald-950/10 flex flex-col items-center justify-center p-6 gap-4">
      {children}
      <p className="text-xs text-muted-foreground mt-4">
        Powered by{' '}
        <a href="https://leavely.online" className="text-emerald-600 hover:underline">
          Leavely
        </a>
      </p>
    </div>
  )
}

function LocationHeader({
  name,
  address,
  tenantName,
}: {
  name: string
  address: string | null
  tenantName: string
}) {
  return (
    <div className="text-center mb-2">
      <div className="flex justify-center mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <MapPin className="h-6 w-6 text-emerald-600" />
        </div>
      </div>
      <h1 className="text-xl font-bold">{name}</h1>
      {address && (
        <p className="text-sm text-muted-foreground mt-0.5">{address}</p>
      )}
      <p className="text-xs text-muted-foreground mt-1">{tenantName}</p>
    </div>
  )
}

function StatusCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border p-8 max-w-sm w-full text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

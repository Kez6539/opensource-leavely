'use client'

import { useState, useTransition } from 'react'
import { clockIn, clockOut } from './actions'
import { cn } from '@/lib/utils'
import { Timer, LogIn, LogOut } from 'lucide-react'

interface ClockButtonProps {
  tenantSlug: string
  isClockedIn: boolean
  clockInTime?: string | null
  /** When true, the client must capture GPS before calling the action. */
  requireLocation?: boolean
}

type Coords = { lat: number; lng: number }

/**
 * Ask the browser for the current position. Returns null when geolocation
 * is unavailable, denied, or times out.
 */
function getCurrentPosition(): Promise<Coords | null> {
  return new Promise((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve(null)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  })
}

export function ClockButton({
  tenantSlug,
  isClockedIn,
  clockInTime,
  requireLocation = false,
}: ClockButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticState, setOptimisticState] = useState<'idle' | 'clocking_in' | 'clocking_out'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleClick = () => {
    setError(null)
    if (isClockedIn) {
      setOptimisticState('clocking_out')
      startTransition(async () => {
        const coords = await getCurrentPosition()
        if (requireLocation && !coords) {
          setOptimisticState('idle')
          setError(
            'Location is required to clock out. Please allow location access and try again.'
          )
          return
        }
        const result = await clockOut(tenantSlug, {
          lat: coords?.lat,
          lng: coords?.lng,
        })
        setOptimisticState('idle')
        if (!result.ok) setError(result.error)
      })
    } else {
      setOptimisticState('clocking_in')
      startTransition(async () => {
        const coords = await getCurrentPosition()
        if (requireLocation && !coords) {
          setOptimisticState('idle')
          setError(
            'Location is required to clock in. Please allow location access and try again.'
          )
          return
        }
        const result = await clockIn(tenantSlug, {
          lat: coords?.lat,
          lng: coords?.lng,
        })
        setOptimisticState('idle')
        if (!result.ok) setError(result.error)
      })
    }
  }

  const showAsClockedIn = optimisticState === 'clocking_in' || (isClockedIn && optimisticState !== 'clocking_out')

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-full w-40 h-40 shadow-lg transition-all duration-300 border-4 focus:outline-none focus:ring-4 focus:ring-offset-2',
          showAsClockedIn
            ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-300 hover:from-red-600 hover:to-red-700 focus:ring-red-300 text-white'
            : 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-300 hover:from-emerald-600 hover:to-emerald-700 focus:ring-emerald-300 text-white',
          isPending && 'opacity-70 cursor-not-allowed animate-pulse'
        )}
      >
        {showAsClockedIn ? (
          <LogOut className="h-10 w-10 mb-1" />
        ) : (
          <LogIn className="h-10 w-10 mb-1" />
        )}
        <span className="text-lg font-bold">
          {isPending
            ? showAsClockedIn
              ? 'Clocking out...'
              : 'Clocking in...'
            : showAsClockedIn
              ? 'Clock Out'
              : 'Clock In'}
        </span>
      </button>

      <div className="text-center">
        {showAsClockedIn && clockInTime ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>
              Clocked in at{' '}
              <span className="font-semibold text-foreground">
                {new Date(clockInTime).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Not clocked in</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-md border border-red-200">
          {error}
        </p>
      )}
    </div>
  )
}

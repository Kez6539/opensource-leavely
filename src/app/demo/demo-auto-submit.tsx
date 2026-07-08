'use client'

import { useEffect, useRef } from 'react'
import { startDemo } from './actions'
import { trackDemoStarted } from '@/lib/analytics'

export function DemoAutoSubmit() {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    trackDemoStarted()
    formRef.current?.requestSubmit()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
        <p className="text-sm text-gray-500 font-medium">Loading demo...</p>
        <form ref={formRef} action={startDemo} />
      </div>
    </div>
  )
}

import { getLocationByToken, getClockStatusForLocation } from './actions'
import { ClockInClient } from './clock-in-client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  const location = await getLocationByToken(token)
  if (!location) return { title: 'Location Not Found' }
  return {
    title: `Clock In - ${location.name} | ${location.tenantName}`,
    robots: { index: false, follow: false },
  }
}

export default async function ClockInPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const location = await getLocationByToken(token)

  if (!location) notFound()

  const status = await getClockStatusForLocation(token)

  return (
    <ClockInClient
      token={token}
      location={location}
      initialStatus={status}
    />
  )
}

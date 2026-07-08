import { getOnboardingState } from './actions'
import { redirect } from 'next/navigation'
import { OnboardingWizard } from './onboarding-wizard'

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const state = await getOnboardingState(tenantSlug)

  if (state.isOnboarded) {
    redirect(`/t/${tenantSlug}/dashboard`)
  }

  return (
    <OnboardingWizard
      tenantSlug={tenantSlug}
      initialStep={state.step}
      initialCountry={state.country}
      initialLeaveYearMonth={state.leaveYearStartMonth}
      authProvider={state.authProvider}
    />
  )
}

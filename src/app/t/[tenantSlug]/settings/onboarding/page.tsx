import { getOnboardingTemplates, getStarterTemplates } from './actions'
import { OnboardingSettingsClient } from './onboarding-settings-client'

export default async function OnboardingSettingsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const [templates, starters] = await Promise.all([
    getOnboardingTemplates(tenantSlug),
    getStarterTemplates(),
  ])

  return (
    <OnboardingSettingsClient
      templates={templates}
      starters={starters}
      tenantSlug={tenantSlug}
    />
  )
}

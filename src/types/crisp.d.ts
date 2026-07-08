type CrispCommand = [string, ...unknown[]]

interface Window {
  $crisp?: CrispCommand[]
  CRISP_WEBSITE_ID?: string
}

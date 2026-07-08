import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 1,
  timeout: 30_000,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: process.env.CI
    ? undefined
    : {
        command: 'pnpm dev',
        port: 3000,
        reuseExistingServer: true,
        timeout: 30_000,
      },
})

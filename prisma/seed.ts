import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { seedDemoTenant, type SqlTag } from '../src/lib/demo-seed'

// The actual seed logic lives in src/lib/demo-seed.ts so the nightly
// demo-reset cron (src/app/api/cron/reset-demo/route.ts) can reuse it on
// Cloudflare Workers. This wrapper just wires up the neon HTTP driver for
// local/manual runs (`pnpm run prisma:seed`). The neon driver is used
// instead of Prisma because the generated client targets the Cloudflare
// WASM runtime and can't run under Node.
const sql = neon(process.env.DATABASE_URL!) as unknown as SqlTag

seedDemoTenant(sql)
  .then(() => {
    console.log('Seed completed successfully')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })

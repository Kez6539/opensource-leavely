// Loads .env via the `dotenv` package (which is a declared dependency)
// and then runs `prisma migrate <cmd>`. Replaces the old
// `dotenv -e .env -- prisma migrate deploy` invocation which depended on
// either the `dotenv-cli` package (declared but not installed on this
// machine — pnpm dedupe quirk) or `dotenvx` (a transitive dep that could
// disappear on a fresh install).
//
// Usage: node scripts/migrate-deploy.mjs [deploy|status|...]
//
// Defaults to `deploy` so the package script stays a one-liner.
import 'dotenv/config'
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const cmd = process.argv[2] || 'deploy'
const args = process.argv.slice(3)

// Resolve the local Prisma binary explicitly instead of relying on PATH
// (`prisma` isn't on PATH from a fresh shell) or `pnpm exec` (Windows exit
// codes don't always propagate cleanly through `pnpm.cmd → cmd → node`).
// node_modules/.bin/prisma is a generated shim that works in pnpm /
// npm / yarn layouts.
const binName = process.platform === 'win32' ? 'prisma.cmd' : 'prisma'
const binPath = path.resolve('node_modules', '.bin', binName)

if (!existsSync(binPath)) {
  console.error(`[migrate-deploy] cannot find ${binPath} — run pnpm install first`)
  process.exit(1)
}

// On Windows the `.cmd` shim can only be invoked through cmd.exe — Node's
// spawnSync with shell:false silently fails to launch .cmd files
// (returns status:null). shell:true delegates to the platform shell which
// handles the extension correctly.
const res = spawnSync(binPath, ['migrate', cmd, ...args], {
  stdio: 'inherit',
  shell: true,
})
process.exit(res.status ?? 1)

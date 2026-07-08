/**
 * Post-build script that patches the OpenNext handler to load WASM
 * modules natively on Cloudflare Workers instead of using fs.readFile.
 *
 * Run after `opennextjs-cloudflare build`:
 *   node scripts/patch-wasm.mjs
 */

import { readFileSync, writeFileSync, copyFileSync, readdirSync } from 'fs'
import { join } from 'path'

const OPEN_NEXT_DIR = '.open-next'
const NEXT_WASM_DIR = '.next/server/chunks/static/wasm'
const HANDLER_PATH = join(OPEN_NEXT_DIR, 'server-functions/default/handler.mjs')
const WORKER_PATH = join(OPEN_NEXT_DIR, 'worker.js')

// 1. Find all WASM files from the Next.js build
const wasmFiles = readdirSync(NEXT_WASM_DIR).filter(f => f.endsWith('.wasm'))
if (wasmFiles.length === 0) {
  console.log('No WASM files found, skipping patch.')
  process.exit(0)
}

console.log(`Found ${wasmFiles.length} WASM file(s):`, wasmFiles)

// 2. Deduplicate by content (they may be identical)
const wasmByHash = new Map()
const hashToFile = new Map()
for (const file of wasmFiles) {
  const hash = file.replace('.wasm', '')
  const content = readFileSync(join(NEXT_WASM_DIR, file))
  const key = content.toString('base64').slice(0, 64) // quick fingerprint
  if (!wasmByHash.has(key)) {
    const destName = `prisma_${wasmByHash.size}.wasm`
    wasmByHash.set(key, destName)
    // Copy WASM to .open-next/ for wrangler to pick up
    copyFileSync(join(NEXT_WASM_DIR, file), join(OPEN_NEXT_DIR, destName))
    console.log(`Copied ${file} -> ${OPEN_NEXT_DIR}/${destName}`)
  }
  hashToFile.set(hash, wasmByHash.get(key))
}

// 3. Patch worker.js to import WASM modules and expose them globally
let worker = readFileSync(WORKER_PATH, 'utf-8')

const imports = []
const mapEntries = []
let idx = 0
for (const [key, destName] of wasmByHash) {
  const varName = `prismaWasm${idx}`
  imports.push(`import ${varName} from "./${destName}";`)
  idx++
}

// Build the hash -> module mapping
const mappings = []
for (const [hash, destName] of hashToFile) {
  const wasmIdx = [...wasmByHash.values()].indexOf(destName)
  mappings.push(`"${hash}": prismaWasm${wasmIdx}`)
}

const preamble = `${imports.join('\n')}
globalThis.__NEXT_WASM_MODULES__ = { ${mappings.join(', ')} };
`

worker = preamble + worker
writeFileSync(WORKER_PATH, worker)
console.log('Patched worker.js with WASM imports')

// 4. Patch handler.mjs to use globalThis.__NEXT_WASM_MODULES__ instead of fs.readFile
let handler = readFileSync(HANDLER_PATH, 'utf-8')

// The webpack WASM loader pattern (minified):
// k2.v=(a3,b4,c3,d4)=>new Promise(function(a4,b5){try{var{readFile:d5}=require("fs"),{join:e8}=require("path");d5(e8("","static/wasm/"+c3+".wasm"),function(c4,d6){if(c4)return b5(c4);a4({arrayBuffer:()=>d6})})}catch(a5){b5(a5)}}).then(a4=>a4.arrayBuffer()).then(a4=>WebAssembly.instantiate(a4,d4)).then(b5=>Object.assign(a3,b5.instance.exports)
const wasmLoaderPattern = /(\w+)\.v=\(\w+,\w+,(\w+),(\w+)\)=>new Promise\(function\(\w+,\w+\)\{try\{var\{readFile:\w+\}=require\("fs"\).*?\.then\(\w+=>Object\.assign\((\w+),\w+\.instance\.exports\)/

const match = handler.match(wasmLoaderPattern)
if (match) {
  const [fullMatch, runtime, hashVar, importsVar, targetVar] = match
  // Get the variable names from the actual pattern for the replacement
  // Prisma expects {default: WebAssembly.Module} — it does its own instantiation.
  // Just expose the Module from globalThis as the default export on the webpack module.
  const replacement = `${runtime}.v=(${targetVar},b4,${hashVar},${importsVar})=>Promise.resolve(globalThis.__NEXT_WASM_MODULES__[${hashVar}]).then(r=>Object.assign(${targetVar},{default:r})`
  handler = handler.replace(fullMatch, replacement)
  console.log('Patched handler.mjs WASM loader')
} else {
  console.error('WARNING: Could not find WASM loader pattern in handler.mjs!')
  console.error('The pattern may have changed. Prisma queries will fail on Cloudflare Workers.')
  process.exit(1)
}

// 5. Patch @vercel/og WASM imports (resvg.wasm, yoga.wasm).
// OpenNext bundles handler.mjs with absolute Windows paths like
//   import resvg_wasm from "C:/.../@vercel/og/resvg.wasm?module";
// which wrangler can't resolve. Copy the wasm files next to handler.mjs and
// rewrite the imports to a simple relative path that wrangler does support.
const OG_WASM_NAMES = ['resvg.wasm', 'yoga.wasm']
const OG_SRC_DIR = join(
  OPEN_NEXT_DIR,
  'server-functions/default/node_modules/next/dist/compiled/@vercel/og'
)
const OG_DEST_DIR = join(OPEN_NEXT_DIR, 'server-functions/default')

for (const name of OG_WASM_NAMES) {
  const src = join(OG_SRC_DIR, name)
  const dest = join(OG_DEST_DIR, name)
  try {
    copyFileSync(src, dest)
    console.log(`Copied @vercel/og ${name} -> handler dir`)
  } catch (e) {
    console.warn(`Could not copy @vercel/og ${name}:`, e.message)
  }
}

// Replace any absolute path import of the @vercel/og wasm with a relative one.
const absImportRegex = /import\s+(\w+)\s+from\s*"[^"]*@vercel\/og\/(resvg|yoga)\.wasm\?module"/g
const beforeReplace = handler
handler = handler.replace(absImportRegex, (_match, varName, kind) => {
  return `import ${varName} from "./${kind}.wasm"`
})
if (handler !== beforeReplace) {
  console.log('Patched @vercel/og WASM imports to relative paths')
}

writeFileSync(HANDLER_PATH, handler)
console.log('Done! WASM patching complete.')

/**
 * Cloudflare Workers execution-context helpers.
 *
 * Why this exists: Next.js server actions that kick off async work with
 * `promise.then().catch()` and return immediately were silently dropping those
 * background promises on Cloudflare Workers. The Workers runtime terminates a
 * request's JavaScript context as soon as the response is returned, so any
 * unawaited promise (email sends, push fan-out, audit writes) was being
 * cancelled mid-flight before it could finish.
 *
 * `fireAndForget` wraps a background promise so it's either:
 *   1. Registered with the request's `ExecutionContext.waitUntil()` on
 *      Cloudflare (the runtime will keep the context alive until it settles),
 *      OR
 *   2. Simply awaited in Node.js dev where there's no execution context.
 *
 * Either way, the caller does NOT need to `await` the returned value, so the
 * user-facing action still returns promptly.
 */

let cachedGetContext: (() => {
  ctx: { waitUntil?: (p: Promise<unknown>) => void }
}) | null | undefined

/**
 * Lazily resolve `getCloudflareContext` from `@opennextjs/cloudflare`. If the
 * import fails (e.g. we're running under `next dev` in Node.js, or the package
 * shape changes), we fall back to synchronously awaiting the promise.
 */
async function tryGetWaitUntil(): Promise<((p: Promise<unknown>) => void) | null> {
  if (cachedGetContext === undefined) {
    try {
      const mod = await import('@opennextjs/cloudflare')
      // The export has historically been `getCloudflareContext` — if it ever
      // moves we catch the TypeError on the next line and fall through.
      cachedGetContext = (mod as unknown as {
        getCloudflareContext?: typeof cachedGetContext
      }).getCloudflareContext ?? null
    } catch {
      cachedGetContext = null
    }
  }
  if (!cachedGetContext) return null
  try {
    const cf = cachedGetContext()
    const waitUntil = cf?.ctx?.waitUntil
    if (typeof waitUntil === 'function') {
      // Bind so it retains its receiver when we invoke it later.
      return waitUntil.bind(cf.ctx)
    }
  } catch {
    // We're outside a request (e.g. during build prerender or local dev).
  }
  return null
}

/**
 * Register a background promise so it runs to completion without blocking the
 * current request's response. Errors are logged rather than surfaced — the
 * caller is explicitly saying "I don't care about the result, just make sure
 * it finishes".
 *
 * Usage:
 *   fireAndForget(
 *     sendWelcomeEmail(user.email, user.name, slug),
 *     'register.welcome-email',
 *   )
 */
export function fireAndForget(promise: Promise<unknown>, label = 'fireAndForget'): void {
  // Always attach a catch immediately so an unhandled rejection doesn't crash
  // the isolate before waitUntil() gets a chance to observe it.
  const guarded = Promise.resolve(promise).catch((err) => {
    console.error(`[${label}] background task failed:`, err)
  })

  // Hand it to the Workers runtime if we can; otherwise fall back to awaiting
  // synchronously so the dev path still exercises the code.
  tryGetWaitUntil()
    .then((waitUntil) => {
      if (waitUntil) {
        waitUntil(guarded)
      } else {
        // In Node.js dev there's no execution context — the promise will still
        // resolve in-process but we also don't want to block the caller.
        // Leaving it to the event loop is fine here because Node keeps the
        // process alive until the loop drains.
      }
    })
    .catch(() => {
      // Swallow; `guarded` already logs its own errors.
    })
}

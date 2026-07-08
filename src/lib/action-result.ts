/**
 * Structured server-action result type + a UserError class for surfacing
 * validation messages to clients.
 *
 * Why this exists: Next.js replaces every thrown server-action error message
 * with a generic "An error occurred in the Server Components render…" string
 * in production. That hides messages like "Insufficient balance" or "Leave
 * already booked" from users. The pattern below keeps those messages alive by
 * converting them into a structured response object that survives transport.
 *
 * Usage:
 *
 *   export async function myAction(...): Promise<ActionResult> {
 *     return withUserErrors(async () => {
 *       if (somethingBad) throw new UserError('Reason the user can read')
 *       // ... rest of action
 *     })
 *   }
 *
 *   // Or with data attached to the success result:
 *   export async function myAction(...): Promise<ActionResult<{ id: string }>> {
 *     return withUserErrors(async () => {
 *       const row = await prisma.thing.create({ ... })
 *       return { id: row.id }
 *     })
 *   }
 *
 *   // In the client form:
 *   const result = await myAction(...)
 *   if (!result.ok) {
 *     toast.error(result.error)
 *     return
 *   }
 *   // result.data?.id is available on the success branch
 */

export class UserError extends Error {
  readonly isUserError = true as const
  constructor(message: string) {
    super(message)
    this.name = 'UserError'
  }
}

export type ActionResult<T = undefined> =
  | (T extends undefined ? { ok: true } : { ok: true; data: T })
  | { ok: false; error: string }

/**
 * Wrap an async action body. UserError instances are converted to a
 * structured `{ ok: false, error }` response; any other thrown error
 * propagates normally so unexpected failures still hit logging/error pages.
 *
 * Two overloads:
 *  - void body → `{ ok: true }`
 *  - body returning T → `{ ok: true, data: T }`
 */
export function withUserErrors(fn: () => Promise<void>): Promise<ActionResult>
export function withUserErrors<T>(fn: () => Promise<T>): Promise<ActionResult<T>>
export async function withUserErrors<T>(
  fn: () => Promise<T | void>
): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    if (data === undefined) {
      return { ok: true } as ActionResult<T>
    }
    return { ok: true, data } as ActionResult<T>
  } catch (e) {
    if (e instanceof UserError) {
      return { ok: false, error: e.message }
    }
    throw e
  }
}

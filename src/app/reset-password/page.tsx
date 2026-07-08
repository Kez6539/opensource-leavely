import { ResetForm } from './reset-form'
import Link from 'next/link'

const SHELL_BG = 'min-h-[100svh] flex items-center justify-center bg-[#FAF8F4] text-stone-900 relative overflow-hidden p-6'
const SPOTLIGHT = 'pointer-events-none absolute inset-x-0 -top-40 h-[680px]'
const SPOTLIGHT_STYLE: React.CSSProperties = {
  background:
    'radial-gradient(60% 60% at 50% 30%, rgba(5, 150, 105, 0.10), rgba(5, 150, 105, 0) 70%)',
}

function Brand() {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md shadow-emerald-500/20">
          L
        </div>
      </div>
      <p className="text-sm font-semibold tracking-tight text-stone-900">Leavely</p>
    </div>
  )
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return (
      <div className={SHELL_BG}>
        <div aria-hidden className={SPOTLIGHT} style={SPOTLIGHT_STYLE} />
        <div className="w-full max-w-sm relative">
          <Brand />
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200 text-center space-y-4">
            <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-4 font-medium">
              Invalid reset link. Please request a new one.
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-700 hover:underline font-medium inline-block"
            >
              Request new reset link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={SHELL_BG}>
      <div aria-hidden className={SPOTLIGHT} style={SPOTLIGHT_STYLE} />
      <div className="w-full max-w-sm relative">
        <Brand />
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold tracking-tight text-stone-900">Set a new password</h2>
            <p className="text-sm text-stone-500 mt-1">
              Choose a new password for your account.
            </p>
          </div>
          <ResetForm token={token} />
        </div>
      </div>
    </div>
  )
}

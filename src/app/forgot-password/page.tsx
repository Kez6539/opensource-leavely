import type { Metadata } from 'next'
import { ForgotForm } from './forgot-form'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Reset Your Password — Leavely',
  description:
    'Forgot your Leavely password? Enter your email to receive a password reset link and get back to managing your team\'s leave.',
  alternates: { canonical: `${SITE_URL}/forgot-password` },
  robots: { index: false, follow: true },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-[#FAF8F4] text-stone-900 relative overflow-hidden p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[680px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(5, 150, 105, 0.10), rgba(5, 150, 105, 0) 70%)',
        }}
      />
      <div className="w-full max-w-sm relative">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md shadow-emerald-500/20">
              L
            </div>
          </div>
          <p className="text-sm font-semibold tracking-tight text-stone-900">Leavely</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold tracking-tight text-stone-900">Forgot your password?</h2>
            <p className="text-sm text-stone-500 mt-1">
              Enter your email and we&rsquo;ll send you a reset link.
            </p>
          </div>
          <ForgotForm />
        </div>
      </div>
    </div>
  )
}

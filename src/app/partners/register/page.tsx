import type { Metadata } from 'next'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo'
import { Logo } from '@/components/shared/logo'
import { PartnerRegisterForm } from './partner-register-form'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partner Programme — Leavely',
  description:
    'Earn 40% recurring commission for every client you refer to Leavely. Join our partner programme for accountants, HR consultants, and business advisors.',
  alternates: { canonical: `${SITE_URL}/partners/register` },
}

export default function PartnerRegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="flex items-center gap-3 mb-8">
            <Logo className="h-56" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
            Earn 40%<br />recurring commission
          </h1>
          <p className="text-purple-200 mt-4 text-lg max-w-md">
            Refer clients to Leavely and earn commission every month they stay subscribed.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { label: '40% recurring commission', desc: 'Earn on every monthly payment, not just the first' },
              { label: 'Dedicated partner dashboard', desc: 'Track referrals, clients, and earnings in real-time' },
              { label: 'Your clients get 14 days free', desc: 'Easy sell — no risk trial for your clients' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.label}</p>
                  <p className="text-purple-200 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-950 dark:via-background dark:to-purple-950/10 p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo className="h-56" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Partner Programme</p>
          </div>

          <Card className="shadow-xl rounded-2xl border-0 shadow-black/5">
            <CardHeader className="text-center pb-2 pt-8">
              <h2 className="text-xl font-bold tracking-tight">Become a partner</h2>
              <p className="text-sm text-muted-foreground">Start earning 40% recurring commission</p>
            </CardHeader>
            <CardContent className="pb-8">
              <PartnerRegisterForm />
              <p className="text-center text-sm text-muted-foreground mt-6">
                Already a partner?{' '}
                <Link href="/login" className="text-purple-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

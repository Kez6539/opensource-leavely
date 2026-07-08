import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CompleteRegistrationForm } from './complete-registration-form'
import { Logo } from '@/components/shared/logo'

export default async function CompleteRegistrationPage() {
  const cookieStore = await cookies()
  const pendingRaw = cookieStore.get('pending_oauth')?.value

  if (!pendingRaw) {
    redirect('/register')
  }

  let pending: { provider: string; providerId: string; email: string; name: string }
  try {
    pending = JSON.parse(pendingRaw)
  } catch {
    redirect('/register')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-background dark:to-emerald-950/10 p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo className="h-12" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Almost there!</h1>
          <p className="text-sm text-muted-foreground mt-1">Just one more step to set up your workspace</p>
        </div>

        <Card className="shadow-xl rounded-2xl border-0 shadow-black/5">
          <CardHeader className="text-center pb-2 pt-8">
            <h2 className="text-xl font-bold tracking-tight">Complete your account</h2>
            <p className="text-sm text-muted-foreground">Tell us about your company</p>
          </CardHeader>
          <CardContent className="pb-8">
            <CompleteRegistrationForm
              email={pending.email}
              name={pending.name}
              provider={pending.provider}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

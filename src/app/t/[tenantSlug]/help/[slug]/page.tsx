import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BackLink } from '@/components/shared'
import { getGuideBySlug } from '../guide-content'
import { Mail, Lightbulb, AlertTriangle } from 'lucide-react'

export default async function GuidePage({
  params,
}: {
  params: Promise<{ tenantSlug: string; slug: string }>
}) {
  const { tenantSlug, slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="max-w-3xl">
      <BackLink href={`/t/${tenantSlug}/help`} label="Back to Help Centre" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold tracking-tight">{guide.title}</h1>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              guide.category === 'manager'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300'
                : guide.category === 'employee'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300'
            }`}
          >
            {guide.category === 'manager' ? 'Manager' : guide.category === 'employee' ? 'Employee' : 'Everyone'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{guide.description}</p>
      </div>

      {/* Steps */}
      <div className="space-y-6 mb-8">
        {guide.steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tips and warnings */}
      {guide.tips && guide.tips.length > 0 && (
        <div className="space-y-3 mb-8">
          {guide.tips.map((tip, index) => (
            <div
              key={index}
              className={`flex gap-3 rounded-lg border p-4 ${
                tip.type === 'info'
                  ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800'
                  : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800'
              }`}
            >
              {tip.type === 'info' ? (
                <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm leading-relaxed ${
                  tip.type === 'info'
                    ? 'text-blue-800 dark:text-blue-200'
                    : 'text-amber-800 dark:text-amber-200'
                }`}
              >
                {tip.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Still need help footer */}
      <div className="rounded-lg border bg-card p-6 text-center">
        <Mail className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-sm font-semibold mb-1">Still need help?</h3>
        <p className="text-sm text-muted-foreground mb-3">
          If this guide didn&apos;t answer your question, our team is happy to help.
        </p>
        <Link
          href="mailto:hello@leavely.online"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Email hello@leavely.online
        </Link>
      </div>
    </div>
  )
}

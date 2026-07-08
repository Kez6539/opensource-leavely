import { getAdminTenantDetail } from '../../actions'
import { ImpersonateButton } from './impersonate-button'
import { DeleteTenantButton } from './delete-tenant-button'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function AdminTenantDetailPage({
  params,
}: {
  params: Promise<{ tenantId: string }>
}) {
  const { tenantId } = await params
  const tenant = await getAdminTenantDetail(tenantId)

  if (!tenant) notFound()

  return (
    <div>
      <Link href="/admin/tenants" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" />
        Back to tenants
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{tenant.name}</h1>
        <div className="flex gap-2">
          <ImpersonateButton tenantId={tenantId} />
          <DeleteTenantButton
            tenantId={tenantId}
            tenantSlug={tenant.slug}
            tenantName={tenant.name}
            memberCount={tenant.memberships.length}
          />
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold text-sm">Details</h2>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Slug</dt>
              <dd className="font-mono">{tenant.slug}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Created</dt>
              <dd>{tenant.createdAt.toLocaleDateString('en-GB')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Onboarded</dt>
              <dd>{tenant.onboardedAt ? tenant.onboardedAt.toLocaleDateString('en-GB') : 'No'}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border p-5 space-y-3">
          <h2 className="font-semibold text-sm">Billing</h2>
          {tenant.billing ? (
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="capitalize">{tenant.billing.planKey ?? 'none'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    tenant.billing.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' :
                    tenant.billing.status === 'TRIALING' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {tenant.billing.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Trial ends</dt>
                <dd>{tenant.billing.trialEndsAt?.toLocaleDateString('en-GB') ?? '—'}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">No billing record</p>
          )}
        </div>
      </div>

      {/* Members */}
      <div className="rounded-xl border mb-8">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold text-sm">Members ({tenant.memberships.length})</h2>
        </div>
        <div className="divide-y">
          {tenant.memberships.map((m) => (
            <div key={m.id} className="px-5 py-3 flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{m.user.name ?? m.user.email}</p>
                <p className="text-xs text-muted-foreground">{m.user.email}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                m.role === 'OWNER' ? 'bg-purple-50 text-purple-700' :
                m.role === 'ADMIN' ? 'bg-blue-50 text-blue-700' :
                'bg-muted text-muted-foreground'
              }`}>
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent audit logs */}
      <div className="rounded-xl border">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold text-sm">Recent Audit Logs</h2>
        </div>
        <div className="divide-y">
          {tenant.auditLogs.map((log) => (
            <div key={log.id} className="px-5 py-3 flex items-center justify-between text-sm">
              <span className="font-mono text-xs">{log.action}</span>
              <span className="text-xs text-muted-foreground">{log.createdAt.toLocaleString()}</span>
            </div>
          ))}
          {tenant.auditLogs.length === 0 && (
            <div className="px-5 py-6 text-center text-sm text-muted-foreground">
              No audit logs yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

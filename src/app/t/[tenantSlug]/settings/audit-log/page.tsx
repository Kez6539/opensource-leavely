import { PageHeader, Pagination, EmptyState } from '@/components/shared'
import { History } from 'lucide-react'
import { getAuditLogs } from './actions'
import { AuditLogFilters } from './audit-log-client'

export default async function AuditLogPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ page?: string; action?: string; entity?: string; from?: string; to?: string }>
}) {
  const { tenantSlug } = await params
  const sp = await searchParams
  const page = parseInt(sp.page || '1', 10)

  const { logs, total, totalPages, entityOptions, actionOptions } = await getAuditLogs(tenantSlug, {
    page,
    action: sp.action,
    entity: sp.entity,
    from: sp.from,
    to: sp.to,
  })

  const hasFilter = !!(sp.action || sp.entity || sp.from || sp.to)

  if (logs.length === 0 && !hasFilter) {
    return (
      <div className="space-y-6">
        <PageHeader title="Audit Log" description="0 entries" />
        <EmptyState
          icon={<History className="h-10 w-10" />}
          title="No audit log entries yet"
          description="Actions taken in this tenant — leave approvals, employee changes, billing events — will appear here."
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Audit Log" description={`${total} entr${total === 1 ? 'y' : 'ies'}${hasFilter ? ' (filtered)' : ''}`} />

      <AuditLogFilters
        tenantSlug={tenantSlug}
        actionOptions={actionOptions}
        entityOptions={entityOptions}
        current={{ action: sp.action, entity: sp.entity, from: sp.from, to: sp.to }}
      />

      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Time</th>
              <th className="px-4 py-3 text-left font-medium">Action</th>
              <th className="px-4 py-3 text-left font-medium">Entity</th>
              <th className="px-4 py-3 text-left font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b last:border-0">
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{log.action}</td>
                <td className="px-4 py-3">
                  {log.entity && (
                    <span className="text-muted-foreground">
                      {log.entity}
                      {log.entityId && <span className="ml-1 text-xs">#{log.entityId.slice(0, 8)}</span>}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">
                  {log.metadata ? JSON.stringify(log.metadata) : '—'}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No audit entries match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={`/t/${tenantSlug}/settings/audit-log`}
          searchParams={{ action: sp.action, entity: sp.entity, from: sp.from, to: sp.to }}
        />
      )}
    </div>
  )
}

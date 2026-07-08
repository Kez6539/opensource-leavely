import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmptyState } from '@/components/shared'
import { FileX2 } from 'lucide-react'

interface ReportTableProps {
  columns: { key: string; label: string; align?: 'left' | 'right' | 'center' }[]
  rows: Record<string, string | number | null>[]
  emptyMessage?: string
}

export function ReportTable({ columns, rows, emptyMessage }: ReportTableProps) {
  if (rows.length === 0) {
    return (
      <EmptyState
        icon={<FileX2 className="h-10 w-10" />}
        title="No data found"
        description={emptyMessage || 'Try adjusting the date range or filters.'}
      />
    )
  }

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="hover:bg-accent/50 transition-colors">
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={
                    col.align === 'right'
                      ? 'text-right tabular-nums'
                      : col.align === 'center'
                        ? 'text-center'
                        : ''
                  }
                >
                  {row[col.key] ?? '\u2014'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

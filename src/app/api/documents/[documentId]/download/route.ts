import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/session'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { safeContentDisposition } from '@/lib/file-headers'

const UPLOAD_DIR = join(process.cwd(), 'uploads')
// Document storage is not yet wired. The upload action only ever persisted
// metadata; the file bytes were never written to disk, and Cloudflare
// Workers has no `process.cwd()/uploads` directory anyway. Until we wire R2
// (or base64-in-DB like ExpenseClaim.receiptData), this route returns 404
// instead of throwing a 500 on `existsSync`. Re-enable by flipping the
// flag below and pointing the response at the new storage backend.
const DOCUMENTS_DOWNLOAD_ENABLED = false

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  if (!DOCUMENTS_DOWNLOAD_ENABLED) {
    return NextResponse.json(
      { error: 'Document downloads are temporarily unavailable.' },
      { status: 404 },
    )
  }
  try {
    const { documentId } = await params
    const { userId } = await requireUser()

    const doc = await prisma.document.findUnique({
      where: { id: documentId },
      include: { tenant: { include: { memberships: true } } },
    })

    if (!doc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Tenant guard: user must be a member
    const callerMembership = doc.tenant.memberships.find((m) => m.userId === userId)
    if (!callerMembership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Non-managers can only download their own docs or company-wide ones
    if (callerMembership.role === 'EMPLOYEE' && doc.employeeId) {
      const emp = await prisma.employee.findFirst({
        where: { tenantId: doc.tenantId, userId },
        select: { id: true },
      })
      if (!emp || emp.id !== doc.employeeId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const filePath = join(UPLOAD_DIR, doc.filePath)
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const buffer = await readFile(filePath)

    return new NextResponse(buffer, {
      headers: {
        // Force generic MIME so a stored HTML/SVG/JS file can't render as
        // active content in the browser. Documents are always downloaded.
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': safeContentDisposition('attachment', doc.name),
        'Content-Length': String(buffer.length),
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (msg === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

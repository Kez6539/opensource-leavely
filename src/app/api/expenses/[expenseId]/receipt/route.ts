import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/session'
import { safeContentDisposition, safeInlineDisposition } from '@/lib/file-headers'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ expenseId: string }> }
) {
  try {
    const { expenseId } = await params
    const { userId } = await requireUser()

    const claim = await prisma.expenseClaim.findUnique({
      where: { id: expenseId },
      select: {
        receiptData: true,
        receiptFilename: true,
        receiptMimeType: true,
        tenantId: true,
      },
    })

    if (!claim || !claim.receiptData) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Verify user has access to this tenant
    const membership = await prisma.membership.findFirst({
      where: { tenantId: claim.tenantId, userId },
    })
    if (!membership) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Employees can only view their own receipts
    if (membership.role === 'EMPLOYEE') {
      const emp = await prisma.employee.findFirst({
        where: { tenantId: claim.tenantId, userId },
        select: { id: true },
      })
      const fullClaim = await prisma.expenseClaim.findUnique({
        where: { id: expenseId },
        select: { employeeId: true },
      })
      if (!emp || !fullClaim || emp.id !== fullClaim.employeeId) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    // Decode base64 to binary
    const binaryString = atob(claim.receiptData)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const contentType = claim.receiptMimeType || 'application/octet-stream'
    const filename = claim.receiptFilename || 'receipt'
    // Only allow inline rendering for safe MIME types (jpeg/png/webp/gif/pdf).
    // Anything else is forced to download to prevent stored XSS via uploaded
    // HTML/SVG/JS labelled with a forged content type.
    const disposition = safeInlineDisposition(claim.receiptMimeType)

    return new NextResponse(bytes, {
      headers: {
        'Content-Type': disposition === 'inline' ? contentType : 'application/octet-stream',
        'Content-Disposition': safeContentDisposition(disposition, filename),
        'Content-Length': String(bytes.length),
        'Cache-Control': 'private, max-age=3600',
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

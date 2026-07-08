import { NextRequest, NextResponse } from 'next/server'
import {
  type CloudflareDnsRecordInput,
  type CloudflareDnsRecordType,
  listDnsRecords,
  upsertDnsRecord,
} from '@/lib/cloudflare'

const ALLOWED_TYPES: CloudflareDnsRecordType[] = ['A', 'AAAA', 'CNAME', 'TXT', 'MX']

function isAuthorised(request: NextRequest) {
  const adminSecret = process.env.CLOUDFLARE_ADMIN_SECRET

  if (!adminSecret) {
    return false
  }

  return request.headers.get('x-admin-secret') === adminSecret
}

function validateRecord(body: Partial<CloudflareDnsRecordInput>) {
  if (!body.type || !ALLOWED_TYPES.includes(body.type)) {
    return 'Invalid DNS record type'
  }

  if (!body.name || typeof body.name !== 'string') {
    return 'DNS record name is required'
  }

  if (!body.content || typeof body.content !== 'string') {
    return 'DNS record content is required'
  }

  if (body.ttl !== undefined && (typeof body.ttl !== 'number' || body.ttl < 1)) {
    return 'TTL must be a number greater than 0'
  }

  return null
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as CloudflareDnsRecordType | null
    const name = searchParams.get('name')

    const records = await listDnsRecords({
      type: type || undefined,
      name: name || undefined,
    })

    return NextResponse.json({ records })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to list DNS records' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const body = (await request.json()) as Partial<CloudflareDnsRecordInput>
    const validationError = validateRecord(body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const record = await upsertDnsRecord({
      type: body.type!,
      name: body.name!,
      content: body.content!,
      ttl: body.ttl,
      proxied: body.proxied,
      priority: body.priority,
      comment: body.comment,
    })

    return NextResponse.json({ record })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upsert DNS record' },
      { status: 500 },
    )
  }
}

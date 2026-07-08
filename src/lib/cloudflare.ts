const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4'

export type CloudflareDnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX'

export type CloudflareDnsRecordInput = {
  type: CloudflareDnsRecordType
  name: string
  content: string
  ttl?: number
  proxied?: boolean
  priority?: number
  comment?: string
}

export type CloudflareDnsRecord = CloudflareDnsRecordInput & {
  id: string
  zone_id: string
  zone_name: string
  created_on: string
  modified_on: string
}

type CloudflareResponse<T> = {
  success: boolean
  errors: Array<{ code: number; message: string }>
  result: T
}

function getCloudflareConfig() {
  const token = process.env.CLOUDFLARE_API_TOKEN
  const zoneId = process.env.CLOUDFLARE_ZONE_ID

  if (!token) throw new Error('Missing CLOUDFLARE_API_TOKEN environment variable')
  if (!zoneId) throw new Error('Missing CLOUDFLARE_ZONE_ID environment variable')

  return { token, zoneId }
}

async function cloudflareRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const { token } = getCloudflareConfig()

  const response = await fetch(`${CLOUDFLARE_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  const data = (await response.json()) as CloudflareResponse<T>

  if (!response.ok || !data.success) {
    const message = data.errors?.map((error) => error.message).join(', ') || 'Cloudflare API request failed'
    throw new Error(message)
  }

  return data.result
}

function normaliseRecord(record: CloudflareDnsRecordInput): CloudflareDnsRecordInput {
  const canProxy = record.type === 'A' || record.type === 'AAAA' || record.type === 'CNAME'

  return {
    ...record,
    ttl: record.ttl ?? 1,
    proxied: canProxy ? record.proxied ?? true : false,
  }
}

export async function listDnsRecords(params?: {
  type?: CloudflareDnsRecordType
  name?: string
}) {
  const { zoneId } = getCloudflareConfig()
  const searchParams = new URLSearchParams()

  if (params?.type) searchParams.set('type', params.type)
  if (params?.name) searchParams.set('name', params.name)

  const suffix = searchParams.toString() ? `?${searchParams.toString()}` : ''
  return cloudflareRequest<CloudflareDnsRecord[]>(`/zones/${zoneId}/dns_records${suffix}`)
}

export async function createDnsRecord(record: CloudflareDnsRecordInput) {
  const { zoneId } = getCloudflareConfig()

  return cloudflareRequest<CloudflareDnsRecord>(`/zones/${zoneId}/dns_records`, {
    method: 'POST',
    body: JSON.stringify(normaliseRecord(record)),
  })
}

export async function updateDnsRecord(recordId: string, record: CloudflareDnsRecordInput) {
  const { zoneId } = getCloudflareConfig()

  return cloudflareRequest<CloudflareDnsRecord>(`/zones/${zoneId}/dns_records/${recordId}`, {
    method: 'PUT',
    body: JSON.stringify(normaliseRecord(record)),
  })
}

export async function upsertDnsRecord(record: CloudflareDnsRecordInput) {
  const existing = await listDnsRecords({ type: record.type, name: record.name })
  const match = existing.find((item) => item.type === record.type && item.name === record.name)

  return match ? updateDnsRecord(match.id, record) : createDnsRecord(record)
}

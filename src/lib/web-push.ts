/**
 * Web Push notification helper for Cloudflare Workers.
 * Uses the Web Push Protocol directly via fetch (no web-push npm package needed).
 *
 * VAPID keys should be set as environment variables:
 *   VAPID_PUBLIC_KEY  — base64url encoded public key
 *   VAPID_PRIVATE_KEY — base64url encoded private key
 *
 * Generate keys once with:
 *   npx web-push generate-vapid-keys
 */

import { prisma } from '@/lib/db'

// ---------------------------------------------------------------------------
// VAPID key helpers
// ---------------------------------------------------------------------------

function getVapidPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY
  if (!key) throw new Error('VAPID_PUBLIC_KEY is not configured')
  return key
}

function getVapidPrivateKey(): string {
  const key = process.env.VAPID_PRIVATE_KEY
  if (!key) throw new Error('VAPID_PRIVATE_KEY is not configured')
  return key
}

// ---------------------------------------------------------------------------
// base64url helpers
// ---------------------------------------------------------------------------

function base64urlToUint8Array(base64url: string): Uint8Array {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  const pad = (4 - (base64.length % 4)) % 4
  const padded = base64 + '='.repeat(pad)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function uint8ArrayToBase64url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/** Helper to get an ArrayBuffer from a Uint8Array (TS strict compat) */
function toBuffer(arr: Uint8Array): ArrayBuffer {
  return arr.buffer.slice(arr.byteOffset, arr.byteOffset + arr.byteLength) as ArrayBuffer
}

// ---------------------------------------------------------------------------
// JWT / VAPID token creation
// ---------------------------------------------------------------------------

async function createVapidJwt(audience: string): Promise<string> {
  const privateKeyBytes = base64urlToUint8Array(getVapidPrivateKey())

  const key = await crypto.subtle.importKey(
    'pkcs8',
    toBuffer(privateKeyBytes),
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  ).catch(() => {
    // If pkcs8 fails, try jwk-style import for raw 32-byte keys
    return importRawECPrivateKey(privateKeyBytes)
  })

  const header = { typ: 'JWT', alg: 'ES256' }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    aud: audience,
    exp: now + 12 * 60 * 60, // 12 hours
    sub: 'mailto:hello@leavely.online',
  }

  const headerB64 = uint8ArrayToBase64url(new TextEncoder().encode(JSON.stringify(header)))
  const payloadB64 = uint8ArrayToBase64url(new TextEncoder().encode(JSON.stringify(payload)))
  const unsignedToken = `${headerB64}.${payloadB64}`

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' },
    key,
    new TextEncoder().encode(unsignedToken)
  )

  // Convert DER signature to raw r||s format if needed
  const sigBytes = new Uint8Array(signature)
  let rawSig: Uint8Array
  if (sigBytes.length === 64) {
    rawSig = sigBytes
  } else {
    rawSig = derToRaw(sigBytes)
  }

  const signatureB64 = uint8ArrayToBase64url(rawSig)
  return `${unsignedToken}.${signatureB64}`
}

async function importRawECPrivateKey(rawBytes: Uint8Array): Promise<CryptoKey> {
  // For 32-byte raw private keys, we need to construct a proper JWK
  // First get the public key from the env
  const pubKeyBytes = base64urlToUint8Array(getVapidPublicKey())

  // The public key is 65 bytes (uncompressed point: 0x04 || x || y)
  let x: Uint8Array, y: Uint8Array
  if (pubKeyBytes.length === 65) {
    x = pubKeyBytes.slice(1, 33)
    y = pubKeyBytes.slice(33, 65)
  } else {
    throw new Error('Invalid VAPID public key length')
  }

  const jwk = {
    kty: 'EC' as const,
    crv: 'P-256' as const,
    x: uint8ArrayToBase64url(x),
    y: uint8ArrayToBase64url(y),
    d: uint8ArrayToBase64url(rawBytes.length === 32 ? rawBytes : rawBytes.slice(0, 32)),
  }

  return crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'ECDSA', namedCurve: 'P-256' },
    false,
    ['sign']
  )
}

function derToRaw(der: Uint8Array): Uint8Array {
  // DER: 0x30 <len> 0x02 <rLen> <r> 0x02 <sLen> <s>
  const raw = new Uint8Array(64)
  let offset = 2 // skip 0x30 and total length
  // R
  const rLen = der[offset + 1]
  offset += 2
  const rStart = rLen > 32 ? offset + (rLen - 32) : offset
  const rDst = rLen < 32 ? 32 - rLen : 0
  raw.set(der.slice(rStart, rStart + Math.min(rLen, 32)), rDst)
  offset += rLen
  // S
  const sLen = der[offset + 1]
  offset += 2
  const sStart = sLen > 32 ? offset + (sLen - 32) : offset
  const sDst = sLen < 32 ? 64 - sLen : 32
  raw.set(der.slice(sStart, sStart + Math.min(sLen, 32)), sDst)
  return raw
}

// ---------------------------------------------------------------------------
// Encryption (RFC 8291 — aes128gcm)
// ---------------------------------------------------------------------------

async function encryptPayload(
  payload: string,
  p256dhKey: string,
  authSecret: string
): Promise<{ encrypted: Uint8Array; salt: Uint8Array; localPublicKey: Uint8Array }> {
  const subscriberPublicKey = base64urlToUint8Array(p256dhKey)
  const subscriberAuth = base64urlToUint8Array(authSecret)

  // Generate a local ECDH keypair
  const localKeyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' },
    true,
    ['deriveBits']
  )

  const localPublicKeyRaw = await crypto.subtle.exportKey('raw', localKeyPair.publicKey)
  const localPublicKey = new Uint8Array(localPublicKeyRaw)

  // Import subscriber's public key
  const subscriberKey = await crypto.subtle.importKey(
    'raw',
    toBuffer(subscriberPublicKey),
    { name: 'ECDH', namedCurve: 'P-256' },
    false,
    []
  )

  // ECDH shared secret
  const sharedSecretBits = await crypto.subtle.deriveBits(
    { name: 'ECDH', public: subscriberKey },
    localKeyPair.privateKey,
    256
  )
  const sharedSecret = new Uint8Array(sharedSecretBits)

  // Generate salt
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // HKDF to derive the content encryption key and nonce
  // auth_info = "WebPush: info" || 0x00 || subscriber_public || local_public
  const authInfo = new Uint8Array([
    ...new TextEncoder().encode('WebPush: info\0'),
    ...subscriberPublicKey,
    ...localPublicKey,
  ])

  // Per RFC 8291:
  //   PRK = HKDF-Extract(auth_secret, ecdh_secret)
  //   IKM = HKDF-Expand(PRK, auth_info, 32)
  const prkBits = await hkdfExtract(subscriberAuth, sharedSecret)
  const ikm = await hkdfExpand(prkBits, authInfo, 32)

  // CEK info = "Content-Encoding: aes128gcm" || 0x00
  const cekInfo = new TextEncoder().encode('Content-Encoding: aes128gcm\0')
  const nonceInfo = new TextEncoder().encode('Content-Encoding: nonce\0')

  const prk2 = await hkdfExtract(salt, ikm)
  const contentEncryptionKey = await hkdfExpand(prk2, cekInfo, 16)
  const nonce = await hkdfExpand(prk2, nonceInfo, 12)

  // Encrypt with AES-128-GCM
  const paddedPayload = new Uint8Array([
    ...new TextEncoder().encode(payload),
    2, // padding delimiter
  ])

  const aesKey = await crypto.subtle.importKey(
    'raw',
    toBuffer(contentEncryptionKey),
    'AES-GCM',
    false,
    ['encrypt']
  )

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: toBuffer(nonce) },
    aesKey,
    toBuffer(paddedPayload)
  )

  // Build the aes128gcm header: salt(16) || rs(4) || idlen(1) || keyid(65) || ciphertext
  const rs = new DataView(new ArrayBuffer(4))
  rs.setUint32(0, 4096)

  const header = new Uint8Array([
    ...salt,
    ...new Uint8Array(rs.buffer),
    localPublicKey.length,
    ...localPublicKey,
  ])

  const encrypted = new Uint8Array([...header, ...new Uint8Array(ciphertext)])

  return { encrypted, salt, localPublicKey }
}

async function hkdfExtract(salt: Uint8Array, ikm: Uint8Array): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', toBuffer(salt), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const result = await crypto.subtle.sign('HMAC', key, toBuffer(ikm))
  return new Uint8Array(result)
}

async function hkdfExpand(prk: Uint8Array, info: Uint8Array, length: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey('raw', toBuffer(prk), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const input = new Uint8Array([...info, 1])
  const result = await crypto.subtle.sign('HMAC', key, toBuffer(input))
  return new Uint8Array(result).slice(0, length)
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function sendPushNotification(
  userId: string,
  title: string,
  body: string,
  url?: string
): Promise<void> {
  // (#154) Silently skip when VAPID keys aren't configured. The previous
  // console.log spammed Workers logs on every notification dispatch.
  // Push is intentionally optional, so this branch is the steady state
  // for any tenant that hasn't enabled it.
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    return
  }

  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  })

  if (subscriptions.length === 0) return

  const payload = JSON.stringify({ title, body, url, tag: `leavely-${Date.now()}` })

  const staleEndpoints: string[] = []

  for (const sub of subscriptions) {
    try {
      const endpointUrl = new URL(sub.endpoint)
      const audience = `${endpointUrl.protocol}//${endpointUrl.host}`

      const jwt = await createVapidJwt(audience)
      const vapidPublicKey = getVapidPublicKey()

      const { encrypted } = await encryptPayload(payload, sub.p256dh, sub.auth)

      const response = await fetch(sub.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Encoding': 'aes128gcm',
          'Content-Length': String(encrypted.length),
          Authorization: `vapid t=${jwt}, k=${vapidPublicKey}`,
          TTL: '86400',
          Urgency: 'high',
        },
        body: toBuffer(encrypted),
      })

      if (response.status === 410 || response.status === 404) {
        // Subscription expired or invalid, mark for cleanup
        staleEndpoints.push(sub.endpoint)
      } else if (!response.ok) {
        console.error(`[push] Failed to send to ${sub.endpoint}: ${response.status} ${response.statusText}`)
      }
    } catch (err) {
      console.error(`[push] Error sending push to ${sub.endpoint}:`, err)
    }
  }

  // Clean up stale subscriptions
  if (staleEndpoints.length > 0) {
    await prisma.pushSubscription.deleteMany({
      where: {
        userId,
        endpoint: { in: staleEndpoints },
      },
    }).catch((err: unknown) => console.error('[push] Failed to clean stale subscriptions:', err))
  }
}

export async function sendPushToTenantManagers(
  tenantId: string,
  title: string,
  body: string,
  url?: string,
  options?: { excludeUserId?: string }
): Promise<void> {
  // Check if VAPID keys are configured before doing any DB work
  if (!process.env.VAPID_PRIVATE_KEY || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    return
  }

  // Exclude the actor from their own notification fan-out. Otherwise a
  // manager who submits leave for themselves gets a push alert on their own
  // phone — small papercut that feels buggy to end users.
  const managers = await prisma.membership.findMany({
    where: {
      tenantId,
      role: { in: ['OWNER', 'ADMIN', 'MANAGER'] },
      ...(options?.excludeUserId ? { userId: { not: options.excludeUserId } } : {}),
    },
    select: { userId: true },
  })

  await Promise.allSettled(
    managers.map((m) => sendPushNotification(m.userId, title, body, url))
  )
}

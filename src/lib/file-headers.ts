/**
 * RFC 5987 / RFC 6266 compliant Content-Disposition filename builder.
 *
 * Why this exists: a filename like  evil.pdf"\r\nContent-Type: text/html
 * naively interpolated into a Content-Disposition header would smuggle
 * additional headers and let an attacker corrupt the response. We:
 *  1. Strip CR/LF and quotes from the filename.
 *  2. Provide both a sanitised quoted-string fallback (Latin-1 only) and a
 *     UTF-8 encoded filename* parameter for clients that support it.
 */
export function safeContentDisposition(
  disposition: 'inline' | 'attachment',
  filename: string
): string {
  // Strip control characters, CR, LF, and quote characters that could escape
  // the quoted-string in the header value.
  // eslint-disable-next-line no-control-regex
  const stripped = filename.replace(/[\x00-\x1f\x7f"\\]/g, '_')
  // Latin-1 fallback: replace any non-ASCII with underscore.
  // eslint-disable-next-line no-control-regex
  const ascii = stripped.replace(/[^\x20-\x7e]/g, '_').slice(0, 200) || 'download'
  // RFC 5987 UTF-8 encoded version
  const utf8 = encodeURIComponent(stripped).slice(0, 400)
  return `${disposition}; filename="${ascii}"; filename*=UTF-8''${utf8}`
}

/**
 * Allow-list of MIME types that are safe to serve as `inline` (preview).
 * Anything else MUST be served as `attachment` to force download — otherwise
 * an HTML/SVG/JS file uploaded with a forged extension would render in the
 * user's browser context and execute as stored XSS.
 */
const SAFE_INLINE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
])

export function safeInlineDisposition(mimeType: string | null): 'inline' | 'attachment' {
  if (!mimeType) return 'attachment'
  return SAFE_INLINE_MIME_TYPES.has(mimeType.toLowerCase()) ? 'inline' : 'attachment'
}

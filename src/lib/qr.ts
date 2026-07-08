/**
 * QR code helper. Returns a URL for a server-rendered SVG QR code via
 * the goqr.me API — keeps Leavely free of native QR encoding while
 * still rendering a real, scannable code in the print/iframe contexts
 * where we need it. (#159 — previously two near-identical functions
 * lived here, both returning the same URL.)
 */
export function getQrCodeUrl(data: string, size = 300): string {
  const encoded = encodeURIComponent(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&format=svg`
}

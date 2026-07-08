import { ImageResponse } from 'next/og'

export const alt = 'Leavely Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Convert slug to readable title
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\buk\b/gi, 'UK')
    .replace(/\bhr\b/gi, 'HR')
    .replace(/\bical\b/gi, 'iCal')
    .replace(/\btoil\b/gi, 'TOIL')
    .replace(/\bess\b/gi, 'ESS')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Leavely Blog
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'white',
            }}
          >
            Leavely
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            leavely.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

import { ImageResponse } from 'next/og'

export const alt = 'Leavely — Leave Management Software for UK Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Leavely
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              lineHeight: 1.4,
              marginBottom: '40px',
            }}
          >
            Leave Management Software for UK Businesses
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Holiday Tracking', 'One-Click Approvals', 'Team Calendar', 'TOIL & Sick Leave'].map(
              (feature) => (
                <div
                  key={feature}
                  style={{
                    fontSize: 18,
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    padding: '8px 20px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                  }}
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          leavely.online — £8/user/month — 14-day free trial
        </div>
      </div>
    ),
    { ...size }
  )
}

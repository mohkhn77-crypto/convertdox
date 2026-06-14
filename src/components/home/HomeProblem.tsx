'use client'

export default function HomeProblem() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#fff'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#0F2A4A',
          textAlign: 'center',
          marginBottom: '16px',
          fontFamily: "'Space Grotesk',system-ui,sans-serif"
        }}>
          Why &quot;Free&quot; Online Tools Are Usually Anything But
        </h2>

        <p style={{
          fontSize: '18px',
          color: '#475569',
          textAlign: 'center',
          marginBottom: '48px',
          lineHeight: 1.6
        }}>
          Most &quot;free&quot; PDF converters, image editors, and online tools have
          a hidden cost. Here&apos;s what they don&apos;t tell you upfront.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            padding: '32px',
            background: '#FEF2F2',
            border: '1.5px solid #FECACA',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📤</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#991B1B',
              marginBottom: '8px'
            }}>
              Your Files Get Sold
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#7F1D1D',
              margin: 0
            }}>
              That tax document you &quot;converted&quot;? Many free sites sell file data
              to advertisers, scammers, and identity theft rings.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: '#FEF3C7',
            border: '1.5px solid #FCD34D',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#92400E',
              marginBottom: '8px'
            }}>
              Email Required Means Spam
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#78350F',
              margin: 0
            }}>
              &quot;Free with signup&quot; usually means free access in exchange for
              endless marketing emails and shared contact lists.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: '#EDE9FE',
            border: '1.5px solid #C4B5FD',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>👁️</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#5B21B6',
              marginBottom: '8px'
            }}>
              Trackers Everywhere
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#4C1D95',
              margin: 0
            }}>
              Most free tools embed dozens of trackers that follow you across
              the web, building detailed advertising profiles.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: '#DBEAFE',
            border: '1.5px solid #93C5FD',
            borderRadius: '16px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔓</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1E40AF',
              marginBottom: '8px'
            }}>
              Files Stored Forever
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#1E3A8A',
              margin: 0
            }}>
              Many sites quietly retain your uploaded files on cloud storage,
              creating massive privacy and security risks.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

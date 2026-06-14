'use client'

export default function HomeApproach() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#f8fafc'
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
          How ConvertDox Works Differently
        </h2>

        <p style={{
          fontSize: '18px',
          color: '#475569',
          textAlign: 'center',
          marginBottom: '48px',
          lineHeight: 1.6
        }}>
          Built from the ground up with privacy as the default, not an afterthought.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            padding: '32px',
            background: 'white',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            borderLeft: '4px solid #16A34A'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏱️</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F2A4A',
              marginBottom: '8px'
            }}>
              Files Deleted Automatically
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#475569',
              margin: 0
            }}>
              Every uploaded file is permanently deleted within an hour, often
              within minutes. There&apos;s no archive of your data.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: 'white',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            borderLeft: '4px solid #16A34A'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚫</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F2A4A',
              marginBottom: '8px'
            }}>
              No Account Walls
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#475569',
              margin: 0
            }}>
              No signup. No email collection. No &quot;verify your phone number.&quot;
              Just use the tools and leave.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: 'white',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            borderLeft: '4px solid #16A34A'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F2A4A',
              marginBottom: '8px'
            }}>
              No Third-Party Trackers
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#475569',
              margin: 0
            }}>
              Tool pages don&apos;t embed Facebook pixels, advertising scripts, or
              cross-site tracking technology. You&apos;re not the product.
            </p>
          </div>

          <div style={{
            padding: '32px',
            background: 'white',
            border: '1.5px solid #e2e8f0',
            borderRadius: '16px',
            borderLeft: '4px solid #16A34A'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔓</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F2A4A',
              marginBottom: '8px'
            }}>
              Open-Source Libraries
            </h3>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#475569',
              margin: 0
            }}>
              Built on auditable open-source code (pdf-lib, sharp, LibreOffice).
              No mysterious black-box APIs handling your files.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

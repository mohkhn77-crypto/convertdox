'use client'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const OTHER_CATS = [
  { label: 'Text Tools', href: '/tools/text' },
  { label: 'Calculators', href: '/tools/calculators' },
  { label: 'Developer Tools', href: '/tools/developer' },
  { label: 'Color Tools', href: '/tools/color' },
  { label: 'Security Tools', href: '/tools/security' },
  { label: 'Fun & Decision', href: '/tools/fun' },
] as const

const QR_TOOLS = [
  {
    title: 'QR Code Generator',
    desc: 'Create QR codes for URLs, WiFi, email, phone numbers and more — free, no account needed.',
    href: '/qr-generator',
    features: ['URL, WiFi, email, phone QR codes', 'Custom size and error correction', 'Download as PNG instantly'],
  },
] as const

export default function QRToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>FREE</span>
            QR Code Tools
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 18px' }}>
            Free Online <span style={{ color: '#F48C42' }}>QR Code Generator</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Generate QR codes for URLs, WiFi networks, email addresses, phone numbers and more — instantly, no sign-up required.
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* Tools grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>QR Code Tools</div>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>QR Code Generator</h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>Generate QR codes instantly — no account, no watermarks, completely free.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px', maxWidth: '640px', margin: '0 auto' }}>
          {QR_TOOLS.map(tool => (
            <a key={tool.href} href={tool.href}
              style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{tool.title}</div>
                <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5' }}>{tool.desc}</div>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc' }}>
                {tool.features.map(f => (
                  <li key={f} style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6' }}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E85D04', background: '#FFF7ED', padding: '5px 14px', borderRadius: '999px' }}>Use Tool →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px', textAlign: 'center' }}>Other Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {OTHER_CATS.map(cat => (
              <a key={cat.href} href={cat.href}
                style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#0F2A4A' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

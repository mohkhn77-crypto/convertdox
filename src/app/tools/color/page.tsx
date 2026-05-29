'use client'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const OTHER_CATS = [
  { label: 'Text Tools', href: '/tools/text' },
  { label: 'Calculators', href: '/tools/calculators' },
  { label: 'Developer Tools', href: '/tools/developer' },
  { label: 'Security Tools', href: '/tools/security' },
  { label: 'QR Code Tools', href: '/tools/qr' },
  { label: 'Fun & Decision', href: '/tools/fun' },
] as const

const COLOR_TOOLS = [
  {
    title: 'HEX ↔ RGB Converter',
    desc: 'Convert between HEX and RGB colour code formats instantly.',
    href: '/hex-rgb-converter',
    features: ['HEX to RGB and back', 'HSL conversion included', 'Real-time colour preview'],
  },
  {
    title: 'CSS Gradient Generator',
    desc: 'Build beautiful CSS gradients visually with live code output.',
    href: '/css-gradient',
    features: ['Linear and radial gradients', 'Custom colour stops', 'Copy-ready CSS output'],
  },
  {
    title: 'Color Palette Generator',
    desc: 'Generate 5 palette modes from any base colour.',
    href: '/color-palette',
    features: ['Complementary, analogous, triadic', 'Monochromatic palettes', 'HEX and RGB export'],
  },
  {
    title: 'CSS Box Shadow Generator',
    desc: 'Visual CSS box shadow generator with live preview.',
    href: '/box-shadow',
    features: ['Offset, blur, spread controls', 'Inset shadow option', 'Copy CSS instantly'],
  },
  {
    title: 'CSS Border Radius Generator',
    desc: 'Visual border radius generator with live shape preview.',
    href: '/border-radius',
    features: ['Individual corner control', 'Elliptical radius support', 'Copy CSS shorthand'],
  },
  {
    title: 'Color Blindness Simulator',
    desc: 'Test how your colours appear to users with colour blindness.',
    href: '/color-blindness',
    features: ['8 colour blindness types', 'Side-by-side comparison', 'Accessibility checking'],
  },
  {
    title: 'Random Color Generator',
    desc: 'Generate random colours with complementary palette mode.',
    href: '/random-color',
    features: ['Random single colour', 'Palette generation mode', 'HEX and RGB values'],
  },
  {
    title: 'Color Contrast Checker',
    desc: 'Check foreground/background color contrast ratios against WCAG AA and AAA accessibility standards.',
    href: '/color-contrast',
    features: ['WCAG AA & AAA', 'Live text preview', 'Contrast ratio display'],
  },
] as const

export default function ColorToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>8 TOOLS</span>
            Color Tools
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 18px' }}>
            Free Online <span style={{ color: '#F48C42' }}>Color Tools</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            HEX to RGB converters, CSS gradient generators, colour palette creators and more — for designers and developers.
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* Tools grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Color Tools</div>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>All Color Tools</h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>8 free colour tools for designers, developers, and creative professionals.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {COLOR_TOOLS.map(tool => (
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

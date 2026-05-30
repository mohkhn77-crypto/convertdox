import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const COMPARE: { feature: string; hex: string; rgb: string }[] = [
  { feature:'Format', hex:'#RRGGBB (6 hex digits)', rgb:'rgb(R, G, B)' },
  { feature:'Length', hex:'7 chars including #', rgb:'12–18 chars typically' },
  { feature:'Channels', hex:'3 implicit (R, G, B)', rgb:'3 explicit' },
  { feature:'Alpha support', hex:'8-digit #RRGGBBAA', rgb:'rgba(R, G, B, A)' },
  { feature:'Easy in JS math', hex:'Awkward — need parsing', rgb:'Native — values are numbers' },
  { feature:'Best for', hex:'CSS, design tools, brand specs', rgb:'JS animations, opacity work' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'Are HEX and RGB exactly equivalent?', a:'Yes — both formats describe an 8-bit-per-channel sRGB colour. Any hex value has a single RGB equivalent and vice versa. #E85D04 is rgb(232, 93, 4) — identical pixels on screen.' },
  { q:'Why does HEX use 6 digits?', a:'Two hex digits represent one byte (0–255), and three bytes encode the red, green, and blue channels. 2 × 3 = 6 digits per colour.' },
  { q:'What is HEXA?', a:'An eight-digit hex code that includes an alpha channel — #RRGGBBAA. The AA pair represents opacity from 00 (fully transparent) to FF (fully opaque). Supported in modern browsers.' },
  { q:'Which format is better for accessibility?', a:'Neither — accessibility depends on the colour contrast ratio between text and background, which is a property of the colours themselves, not the format you use to describe them. WCAG 2.1 specifies the contrast requirements.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background:'linear-gradient(135deg,#0F2A4A 0%,#1a3a5c 100%)',padding:'56px 24px 48px',textAlign:'center' }}>
        <div style={{ maxWidth:'780px',margin:'0 auto' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'5px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'18px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>COMPARE</span>
            Colour format showdown
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'white',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 12px' }}>
            HEX vs RGB Colors: When to Use Each
          </h1>
          <p style={{ fontSize:'16px',color:'rgba(255,255,255,0.7)',maxWidth:'620px',margin:'0 auto',lineHeight:1.6 }}>
            Same colour, two different representations. Knowing when to reach for each makes design and code go faster.
          </p>
        </div>
      </div>

      <article style={{ maxWidth:'820px',margin:'0 auto',padding:'48px 24px' }}>

        <h2 style={H2}>Quick Comparison</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Feature</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>HEX</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>RGB</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r,i) => (
                <tr key={r.feature} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.feature}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.hex}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.rgb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>What Are HEX Colors?</h2>
        <p style={P}>A HEX colour is a 6-digit hexadecimal number prefixed with <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>#</code>. Each pair of digits maps to a 0–255 value for one channel:</p>
        <pre style={PRE}><code>{`#FF5733
  ↑↑↑↑↑↑
  RR GG BB

FF = 255 (red)
57 = 87  (green)
33 = 51  (blue)`}</code></pre>
        <p style={P}>The first two digits encode red, the next two green, the last two blue. Hex codes are case-insensitive — <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>#FF5733</code> and <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>#ff5733</code> are identical.</p>

        <h2 style={H2}>What Is RGB?</h2>
        <p style={P}>RGB describes the same colour using three explicit decimal numbers:</p>
        <pre style={PRE}><code>{`rgb(255, 87, 51)

255 = red channel
 87 = green channel
 51 = blue channel`}</code></pre>
        <p style={P}>Each channel ranges from 0 (none of that colour) to 255 (maximum). The total possible combinations are 256³ = roughly 16.7 million colours.</p>

        <h2 style={H2}>Same Color in Both Formats</h2>
        <p style={P}>The orange used in the ConvertDox brand can be written either way:</p>
        <div style={{ display:'flex',alignItems:'center',gap:'14px',background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px 20px',marginBottom:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'#E85D04',borderRadius:'10px',flexShrink:0 }} />
          <div>
            <div style={{ fontFamily:'monospace',fontSize:'15px',color:'#0F2A4A',fontWeight:600 }}>#E85D04</div>
            <div style={{ fontFamily:'monospace',fontSize:'15px',color:'#0F2A4A',fontWeight:600,marginTop:'4px' }}>rgb(232, 93, 4)</div>
            <div style={{ fontSize:'13px',color:'#64748b',marginTop:'4px' }}>Pixel-identical on every screen.</div>
          </div>
        </div>

        <h2 style={H2}>When to Use HEX</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>CSS and HTML</strong> — shorter to type than rgb().</li>
          <li><strong style={STRONG}>Design tools</strong> — Figma, Sketch, Adobe XD all default to hex output.</li>
          <li><strong style={STRONG}>Brand specs and style guides</strong> — every brand book uses hex.</li>
          <li><strong style={STRONG}>Email templates</strong> — universally supported across email clients.</li>
          <li><strong style={STRONG}>Quick reference and code reviews</strong> — easier to memorize and recognise.</li>
        </ul>

        <h2 style={H2}>When to Use RGB</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>CSS animations or transitions</strong> involving partial transparency.</li>
          <li><strong style={STRONG}>JavaScript colour manipulation</strong> — channels are already numbers, no parsing needed.</li>
          <li><strong style={STRONG}>Photo editing software</strong> sliders work in RGB.</li>
          <li><strong style={STRONG}>Programmatic colour generation</strong> — interpolating between two colours is straightforward.</li>
          <li><strong style={STRONG}>When alpha (opacity) matters</strong> — rgba() is more readable than 8-digit hex for many developers.</li>
        </ul>

        <h2 style={H2}>RGBA and HEXA (Alpha Channel Variants)</h2>
        <p style={P}>Both formats have alpha-channel siblings that add opacity.</p>
        <pre style={PRE}><code>{`/* 50% opaque orange */
rgba(232, 93, 4, 0.5)
#E85D0480     // last 80 ≈ 50% opacity`}</code></pre>
        <p style={P}>The hex alpha pair (00–FF) maps to 0%–100%, so <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>80</code> in hex is roughly 0.5 (128 ÷ 255 ≈ 0.502) — close to 50% but not exactly.</p>

        <h2 style={H2}>Browser Support</h2>
        <p style={P}>Both formats work in every browser shipped this century. The 8-digit hex (#RRGGBBAA) is supported in all modern evergreen browsers (Chrome 62+, Firefox 49+, Safari 9.1+) — safe to use in 2026.</p>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>🎨</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Convert Between HEX and RGB</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Live two-way conversion with colour preview.</p>
          <a href="/hex-rgb-converter" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open HEX ↔ RGB Converter →</a>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'HEX vs RGB Colors: When to Use Each',
        'description': 'The practical differences between HEX and RGB colour formats with examples and use-case recommendations.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

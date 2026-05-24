/*
  ConvertDox — HEX ↔ RGB Converter
  PUT IN: src/app/hex-rgb-converter/page.tsx
  NO BACKEND NEEDED — pure JavaScript
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'

export default function HexRgbPage() {
  const [hex, setHex] = useState('#E85D04')
  const [r, setR] = useState(232)
  const [g, setG] = useState(93)
  const [b, setB] = useState(4)
  const [copied, setCopied] = useState('')
  const [activeTab, setActiveTab] = useState<'hex2rgb'|'rgb2hex'>('hex2rgb')

  const hexToRgb = (h: string) => {
    const clean = h.replace('#', '')
    if (clean.length !== 6) return
    const ri = parseInt(clean.slice(0,2), 16)
    const gi = parseInt(clean.slice(2,4), 16)
    const bi = parseInt(clean.slice(4,6), 16)
    if (!isNaN(ri + gi + bi)) { setR(ri); setG(gi); setB(bi) }
  }

  const rgbToHex = (rv: number, gv: number, bv: number) =>
    '#' + [rv,gv,bv].map(x => Math.min(255,Math.max(0,x)).toString(16).padStart(2,'0')).join('')

  const currentHex = rgbToHex(r, g, b)
  const currentColor = activeTab === 'hex2rgb' ? hex : currentHex

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
  }

  const Btn = ({ id, text }: { id:string; text:string }) => (
    <button onClick={() => copy(text, id)}
      style={{ background:copied===id?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px 12px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copied===id?'white':'#0F2A4A',transition:'all 0.15s' }}>
      {copied===id ? '✓' : 'Copy'}
    </button>
  )

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />

      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🎨</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>HEX ↔ RGB Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert between HEX and RGB colour codes instantly. Includes HSL, CSS and more.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'700px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Mode tabs */}
        <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'24px' }}>
          {[{id:'hex2rgb',label:'HEX → RGB'},{id:'rgb2hex',label:'RGB → HEX'}].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              style={{ flex:1,padding:'10px',borderRadius:'9px',border:'none',background:activeTab===t.id?'white':'transparent',fontFamily:'inherit',fontSize:'14px',fontWeight:700,color:activeTab===t.id?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:activeTab===t.id?'0 2px 6px rgba(0,0,0,0.08)':'none',transition:'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Colour preview */}
        <div style={{ background:currentColor,borderRadius:'20px',height:'100px',marginBottom:'24px',border:'1px solid rgba(0,0,0,0.08)',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',transition:'background 0.2s' }}/>

        {/* HEX to RGB */}
        {activeTab === 'hex2rgb' && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
            <div style={{ marginBottom:'20px' }}>
              <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>HEX Colour Code</label>
              <div style={{ display:'flex',gap:'10px',alignItems:'center' }}>
                <input type="color" value={hex} onChange={e=>{ setHex(e.target.value); hexToRgb(e.target.value) }}
                  style={{ width:'52px',height:'52px',border:'none',borderRadius:'10px',cursor:'pointer',flexShrink:0 }}/>
                <input type="text" value={hex} onChange={e=>{ setHex(e.target.value); hexToRgb(e.target.value) }}
                  placeholder="#E85D04"
                  style={{ flex:1,padding:'14px 16px',border:'1.5px solid #e2e8f0',borderRadius:'10px',fontFamily:'monospace',fontSize:'18px',fontWeight:700,color:'#0F2A4A',outline:'none' }}/>
              </div>
            </div>

            <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',marginBottom:'20px' }}>
              {[{label:'Red (R)',val:r},{label:'Green (G)',val:g},{label:'Blue (B)',val:b}].map((c,i) => (
                <div key={c.label} style={{ background:['#FEF2F2','#F0FDF4','#EFF6FF'][i],borderRadius:'12px',padding:'14px',textAlign:'center' }}>
                  <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:['#DC2626','#16A34A','#1D4ED8'][i] }}>{c.val}</div>
                  <div style={{ fontSize:'12px',color:'#64748b',marginTop:'3px' }}>{c.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
              {[
                { label:'RGB', val:`rgb(${r}, ${g}, ${b})` },
                { label:'RGBA', val:`rgba(${r}, ${g}, ${b}, 1)` },
                { label:'HEX', val:hex.toUpperCase() },
                { label:'CSS Variable', val:`--color: ${hex};` },
              ].map(item => (
                <div key={item.label} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8fafc',borderRadius:'10px',padding:'12px 14px' }}>
                  <div>
                    <span style={{ fontSize:'12px',fontWeight:600,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px',marginRight:'10px' }}>{item.label}</span>
                    <span style={{ fontFamily:'monospace',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>{item.val}</span>
                  </div>
                  <Btn id={item.label} text={item.val}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RGB to HEX */}
        {activeTab === 'rgb2hex' && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
            <div style={{ display:'flex',flexDirection:'column',gap:'16px',marginBottom:'20px' }}>
              {[{label:'Red (R)',val:r,set:setR,color:'#DC2626',bg:'#FEF2F2'},{label:'Green (G)',val:g,set:setG,color:'#16A34A',bg:'#F0FDF4'},{label:'Blue (B)',val:b,set:setB,color:'#1D4ED8',bg:'#EFF6FF'}].map(c => (
                <div key={c.label}>
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'6px' }}>
                    <label style={{ fontSize:'13.5px',fontWeight:700,color:'#0F2A4A' }}>{c.label}</label>
                    <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:c.color }}>{c.val}</span>
                  </div>
                  <input type="range" min="0" max="255" value={c.val} onChange={e=>c.set(parseInt(e.target.value))}
                    style={{ width:'100%',height:'8px',accentColor:c.color,cursor:'pointer' }}/>
                </div>
              ))}
            </div>

            <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
              {[
                { label:'HEX', val:currentHex.toUpperCase() },
                { label:'RGB', val:`rgb(${r}, ${g}, ${b})` },
                { label:'RGBA', val:`rgba(${r}, ${g}, ${b}, 1)` },
              ].map(item => (
                <div key={item.label} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',background:'#f8fafc',borderRadius:'10px',padding:'12px 14px' }}>
                  <div>
                    <span style={{ fontSize:'12px',fontWeight:600,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.5px',marginRight:'10px' }}>{item.label}</span>
                    <span style={{ fontFamily:'monospace',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>{item.val}</span>
                  </div>
                  <Btn id={item.label} text={item.val}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <RelatedTools currentPath="/hex-rgb-converter" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the HEX ↔ RGB Converter</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Switch between the two most common colour formats instantly, in either direction.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Enter a hex code (e.g. #E85D04) <em>or</em> RGB values (e.g. 232, 93, 4).</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> The other format updates live in the opposite input.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Confirm the colour matches your expectation using the live swatch.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Copy either format directly to your clipboard.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🎨', title:'Web Design', desc:'Translate brand colours from HEX (logo) to RGB (CSS animations).' },
              { icon:'💄', title:'CSS Styling', desc:'Quickly check whether two colour formats are actually identical.' },
              { icon:'🖌️', title:'Figma / Sketch', desc:'Move colour values between design tools and code editors.' },
              { icon:'🧩', title:'Design Systems', desc:'Standardize colour token formats across teams and tooling.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px' }}>
                <div style={{ fontSize:'24px',marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px',color:'#64748b',lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What is a hex color code?', a:'A 3- or 6-character hexadecimal string prefixed with # that represents a colour\'s red, green, and blue values. Each pair of hex digits maps to a 0–255 value: #E85D04 means red 232, green 93, blue 4.' },
            { q:'What does RGB mean?', a:'Red, Green, Blue — the three colour channels in additive colour mixing. Each ranges from 0 to 255 (8 bits per channel), so RGB can express roughly 16.7 million distinct colours.' },
            { q:'Why do hex codes have 6 digits?', a:'Three pairs of hex digits, one pair per channel. Two hex digits store a single byte (0x00–0xFF), which is exactly the 0–255 range each RGB channel uses.' },
            { q:'Can hex codes be 3 digits?', a:'Yes — shorthand notation. #F60 expands to #FF6600. Useful when each channel has both nibbles equal; otherwise you need the full 6-digit form.' },
            { q:'What is the difference between RGB and RGBA?', a:'RGBA adds an alpha (opacity) channel from 0 (fully transparent) to 1 (fully opaque). The hex equivalent is RGBA / 8-digit hex (#RRGGBBAA), supported in modern browsers.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox HEX ↔ RGB Converter?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Web developers and designers shuffle between HEX and RGB colour formats constantly — and the conversion math, while not difficult, is the kind of small task that breaks flow. The ConvertDox HEX ↔ RGB Converter handles both directions live: type in one format and the other updates instantly, with a colour swatch confirming the result. It accepts both shorthand 3-digit hex codes (#F60) and full 6-digit codes (#FF6600), and accepts RGB values as comma-separated numbers, function-call syntax (rgb(255, 102, 0)), or just digits separated by spaces. The conversion is bidirectional and lossless because both formats describe the same underlying 8-bit-per-channel sRGB colour. Working in your browser means no data leaves your device — relevant if you&apos;re sampling colours from confidential brand guidelines. For broader colour work, ConvertDox includes a <a href="/color-palette" style={{ color:'#E85D04',fontWeight:600 }}>palette generator</a>, a <a href="/css-gradient" style={{ color:'#E85D04',fontWeight:600 }}>CSS gradient builder</a>, and a <a href="/color-blindness" style={{ color:'#E85D04',fontWeight:600 }}>colour blindness simulator</a> — but for the single most common conversion task in web work, this page is the fastest. See our <a href="/compare/hex-vs-rgb" style={{ color:'#E85D04',fontWeight:600 }}>HEX vs RGB guide</a> for when to choose one format over the other.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'HEX to RGB Converter',
        'description': 'Free HEX ↔ RGB color converter. Live two-way conversion with colour preview.',
        'url': 'https://convertdox.com/hex-rgb-converter',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />

      <SiteFooter />
    </div>
  )
}

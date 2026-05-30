'use client'
import { useState, useRef, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Shape = 'square' | 'rounded' | 'circle'
type FontWeight = '400' | '700' | '900'

export default function LogoMakerPage() {
  const [text, setText] = useState('AB')
  const [subText, setSubText] = useState('')
  const [bgColor, setBgColor] = useState('#0F2A4A')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [shape, setShape] = useState<Shape>('rounded')
  const [fontSize, setFontSize] = useState(72)
  const [fontWeight, setFontWeight] = useState<FontWeight>('900')
  const [size, setSize] = useState(400)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const palettes = [
    { bg: '#0F2A4A', fg: '#FFFFFF' },
    { bg: '#E85D04', fg: '#FFFFFF' },
    { bg: '#1E293B', fg: '#F1F5F9' },
    { bg: '#7C3AED', fg: '#FFFFFF' },
    { bg: '#059669', fg: '#FFFFFF' },
    { bg: '#DC2626', fg: '#FFFFFF' },
    { bg: '#FFFFFF', fg: '#0F2A4A' },
    { bg: '#FEF3C7', fg: '#92400E' },
  ]

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)

    // Background shape
    ctx.fillStyle = bgColor
    const r = shape === 'circle' ? size / 2 : shape === 'rounded' ? size * 0.18 : size * 0.04
    ctx.beginPath()
    if (shape === 'circle') {
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    } else {
      ctx.roundRect(0, 0, size, size, r)
    }
    ctx.fill()

    // Main text
    const mainSize = Math.min(fontSize, size * 0.45)
    ctx.fillStyle = textColor
    ctx.font = `${fontWeight} ${mainSize}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const yOffset = subText.trim() ? -size * 0.08 : 0
    ctx.fillText(text.toUpperCase().slice(0, 4), size / 2, size / 2 + yOffset)

    // Sub text
    if (subText.trim()) {
      const subSize = Math.min(18, size * 0.05)
      ctx.font = `600 ${subSize}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`
      ctx.fillStyle = textColor
      ctx.globalAlpha = 0.75
      ctx.fillText(subText.toUpperCase(), size / 2, size / 2 + size * 0.18)
      ctx.globalAlpha = 1
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { draw() }, [text, subText, bgColor, textColor, shape, fontSize, fontWeight, size])

  function download() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `logo-${text.toLowerCase()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const inp = (label: string, value: string, onChange: (v: string) => void, placeholder = '') => (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
      />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Logo Maker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Create a simple text or initials logo. Download as PNG. Free, no signup needed.</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Controls */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F2A4A', margin: 0 }}>Logo Text</h2>
            {inp('Initials / Main Text', text, setText, 'AB')}
            {inp('Company Name (optional, shown small)', subText, setSubText, 'ACME Corp')}

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Color Palette</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {palettes.map(p => (
                  <button
                    key={p.bg}
                    onClick={() => { setBgColor(p.bg); setTextColor(p.fg) }}
                    style={{ width: '32px', height: '32px', borderRadius: '8px', background: p.bg, border: bgColor === p.bg ? '3px solid #E85D04' : '2px solid #e2e8f0', cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Background</label>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '2px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Text Color</label>
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1.5px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', padding: '2px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Shape</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['square', 'rounded', 'circle'] as Shape[]).map(s => (
                  <button key={s} onClick={() => setShape(s)}
                    style={{ flex: 1, padding: '8px', border: `1.5px solid ${shape === s ? '#E85D04' : '#e2e8f0'}`, borderRadius: '8px', background: shape === s ? '#FFF7ED' : 'white', color: shape === s ? '#E85D04' : '#0F2A4A', fontWeight: 600, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Font Size: {fontSize}px</label>
              <input type="range" min={24} max={120} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#E85D04' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Font Weight</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {([['400', 'Regular'], ['700', 'Bold'], ['900', 'Black']] as [FontWeight, string][]).map(([w, label]) => (
                  <button key={w} onClick={() => setFontWeight(w)}
                    style={{ flex: 1, padding: '8px', border: `1.5px solid ${fontWeight === w ? '#E85D04' : '#e2e8f0'}`, borderRadius: '8px', background: fontWeight === w ? '#FFF7ED' : 'white', color: fontWeight === w ? '#E85D04' : '#0F2A4A', fontWeight: w, fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>Export Size: {size}×{size}px</label>
              <select value={size} onChange={e => setSize(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }}>
                <option value={200}>200×200 px</option>
                <option value={400}>400×400 px</option>
                <option value={800}>800×800 px</option>
                <option value={1200}>1200×1200 px</option>
              </select>
            </div>
          </div>

          {/* Preview + Download */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Preview</div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc', borderRadius: '12px', padding: '24px', minHeight: '240px' }}>
                <canvas ref={canvasRef} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? '18%' : '4%' }} />
              </div>
            </div>

            <button onClick={download}
              style={{ background: '#E85D04', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              ⬇ Download PNG
            </button>

            <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#166534' }}>
              <strong>Tips:</strong> Keep initials to 2–3 characters for best results. Download at 800px or 1200px for print quality.
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Free Logo Maker — Create Your Logo in Seconds</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            A professional-looking logo doesn&apos;t have to cost hundreds of dollars. Our free logo maker lets you create a clean, modern logo using your company initials or short name — no design skills required. Simply type your initials, pick a color palette, choose a shape, and download your PNG logo instantly.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Text and monogram logos are used everywhere — app icons, email signatures, business cards, social media profiles, and letterheads. A simple two-letter logo in a bold color is often more memorable than a complex illustration. Companies like IBM, HP, LG, and GE have built globally recognized brands from their initials alone.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Our tool supports square, rounded-corner, and circular shapes — perfect for different contexts. Rounded squares work great on app stores. Circles are ideal for social media profile pictures. Squares suit favicon and watermark use. You can export at 200×200 for thumbnails or up to 1200×1200 for high-resolution print quality.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            Everything runs in your browser — nothing is uploaded to any server. Your logo is generated instantly on your device, and the PNG download is completely private. ConvertDox is 100% free with no account required.
          </p>
        </div>
      </div>
    </div>
  )
}

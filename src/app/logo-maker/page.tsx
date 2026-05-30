'use client'
import { useEffect, useRef, useState } from 'react'

export default function LogoMaker() {
  const [text, setText] = useState('YourBrand')
  const [font, setFont] = useState('Inter')
  const [textColor, setTextColor] = useState('#0F2A4A')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [fontSize, setFontSize] = useState(80)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 400

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize}px ${font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  }, [text, font, textColor, bgColor, fontSize])

  function downloadLogo() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${text.replace(/\s+/g, '-')}-logo.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>Free Logo Maker</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>Create simple text-based logos instantly. Free, no signup required.</p>

        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', border: '1.5px solid #e2e8f0', borderRadius: '8px', marginBottom: '24px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', marginBottom: '6px' }}>Logo Text</label>
              <input value={text} onChange={e => setText(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', marginBottom: '6px' }}>Font Family</label>
              <select value={font} onChange={e => setFont(e.target.value)} style={inputStyle}>
                <option value="Inter">Inter</option>
                <option value="Georgia">Georgia</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Courier New">Courier New</option>
                <option value="Impact">Impact</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', marginBottom: '6px' }}>Font Size</label>
              <input type="number" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', marginBottom: '6px' }}>Text Color</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ ...inputStyle, height: '40px', padding: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0F2A4A', marginBottom: '6px' }}>Background Color</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ ...inputStyle, height: '40px', padding: '4px' }} />
            </div>
          </div>

          <button onClick={downloadLogo} style={{ width: '100%', background: '#E85D04', color: 'white', border: 'none', padding: '16px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
            Download Logo as PNG
          </button>
        </div>

        <div style={{ marginTop: '48px', background: 'white', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>About This Logo Maker</h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>Create simple, professional text-based logos in seconds. Perfect for startups, side projects, or anyone needing a quick brand identity. Customize fonts, colors, and sizes to match your brand. Download as PNG ready to use anywhere. No signup, no watermarks, completely free.</p>
        </div>
      </div>
    </div>
  )
}

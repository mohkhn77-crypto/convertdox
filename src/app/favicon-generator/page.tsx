'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Shape = 'square' | 'rounded' | 'circle'
const FONTS = ['Arial', 'Georgia', 'Courier New', 'Impact', 'Verdana']

export default function FaviconGeneratorPage() {
  const [text, setText] = useState('CD')
  const [bg, setBg] = useState('#0F2A4A')
  const [fg, setFg] = useState('#FFFFFF')
  const [font, setFont] = useState('Arial')
  const [bold, setBold] = useState(true)
  const [shape, setShape] = useState<Shape>('rounded')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const size = 64
    canvas.width = size
    canvas.height = size
    ctx.clearRect(0, 0, size, size)
    const radius = shape === 'square' ? 0 : shape === 'rounded' ? size * 0.25 : size / 2
    ctx.fillStyle = bg
    ctx.beginPath()
    if (radius >= size / 2) {
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    } else {
      ctx.moveTo(radius, 0)
      ctx.lineTo(size - radius, 0)
      ctx.quadraticCurveTo(size, 0, size, radius)
      ctx.lineTo(size, size - radius)
      ctx.quadraticCurveTo(size, size, size - radius, size)
      ctx.lineTo(radius, size)
      ctx.quadraticCurveTo(0, size, 0, size - radius)
      ctx.lineTo(0, radius)
      ctx.quadraticCurveTo(0, 0, radius, 0)
    }
    ctx.fill()
    ctx.fillStyle = fg
    const fontSize = text.length === 1 ? 42 : text.length === 2 ? 32 : text.length === 3 ? 24 : 20
    ctx.font = `${bold ? 'bold ' : ''}${fontSize}px ${font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text || '?', size / 2, size / 2 + 2)
  }, [text, bg, fg, font, bold, shape])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicon.png'
    a.click()
  }

  const copyHtml = () => {
    navigator.clipboard.writeText('<link rel="icon" type="image/png" href="favicon.png">')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🖼️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Favicon Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate favicons from text or initials.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Text (1-4 chars)</label>
                <input value={text} onChange={e => setText(e.target.value.slice(0, 4))} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Background</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: '40px', height: '40px', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '2px', cursor: 'pointer', background: 'white' }} />
                  <input value={bg} onChange={e => setBg(e.target.value)} style={{ flex: 1, padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Text color</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input type="color" value={fg} onChange={e => setFg(e.target.value)} style={{ width: '40px', height: '40px', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '2px', cursor: 'pointer', background: 'white' }} />
                  <input value={fg} onChange={e => setFg(e.target.value)} style={{ flex: 1, padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'monospace', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Font</label>
                <select value={font} onChange={e => setFont(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', background: 'white' }}>
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', alignSelf: 'center' }}>Shape:</span>
              {(['square','rounded','circle'] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} style={{ padding: '8px 14px', background: shape === s ? '#E85D04' : 'white', color: shape === s ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 600, fontSize: '13px', cursor: 'pointer', textTransform: 'capitalize' }}>{s}</button>
              ))}
              <div style={{ width: '1px', background: '#e2e8f0' }} />
              <button onClick={() => setBold(!bold)} style={{ padding: '8px 14px', background: bold ? '#0F2A4A' : 'white', color: bold ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>B</button>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <canvas ref={canvasRef} style={{ width: '128px', height: '128px', imageRendering: 'pixelated' }} />
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <canvas style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }} ref={c => { if (c && canvasRef.current) { const ctx = c.getContext('2d'); if (ctx) { ctx.clearRect(0,0,16,16); ctx.drawImage(canvasRef.current, 0, 0, 16, 16) } } }} />
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>16×16</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <canvas style={{ width: '32px', height: '32px', imageRendering: 'pixelated' }} ref={c => { if (c && canvasRef.current) { const ctx = c.getContext('2d'); if (ctx) { ctx.clearRect(0,0,32,32); ctx.drawImage(canvasRef.current, 0, 0, 32, 32) } } }} />
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>32×32</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <canvas style={{ width: '64px', height: '64px' }} ref={c => { if (c && canvasRef.current) { const ctx = c.getContext('2d'); if (ctx) { ctx.clearRect(0,0,64,64); ctx.drawImage(canvasRef.current, 0, 0, 64, 64) } } }} />
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>64×64</div>
              </div>
            </div>
            <button onClick={download} style={{ width: '100%', padding: '12px', background: '#16A34A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>⬇ Download PNG</button>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#0F2A4A', borderRadius: '12px', padding: '20px', position: 'relative' }}>
          <button onClick={copyHtml} style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{copied ? '✓ Copied!' : '📋 Copy HTML'}</button>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', color: '#a5f3fc', whiteSpace: 'pre-wrap' }}>{`<link rel="icon" type="image/png" href="favicon.png">`}</pre>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

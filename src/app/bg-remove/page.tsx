'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'

export default function BgRemovePage() {
  const [file, setFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Only image files are accepted'); return }
    setFile(f); setError(''); setResultUrl(null)
  }

  const removeBg = async () => {
    if (!file) return
    setProcessing(true); setError(''); setResultUrl(null)
    setStatusMsg('Loading model (first run may take a moment)…')
    try {
      // Dynamic import so this only loads in the browser, never during SSR/build
      const { removeBackground } = await import('@imgly/background-removal')
      setStatusMsg('Removing background…')
      const blob = await removeBackground(file)
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
      setStatusMsg('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove background. Please try a different image.')
      setStatusMsg('')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'background-removed.png'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>✂️</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Background Remover</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Remove image backgrounds instantly — runs in your browser, your photo never leaves your device</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'100% private — runs on your device'},{icon:'🚫',text:'Nothing uploaded to any server'},{icon:'⚡',text:'No signup'},{icon:'🆓',text:'Free forever'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'24px auto 0', padding:'0 24px' }}>
        <div style={{ background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'12px', padding:'12px 16px', marginBottom:'16px' }}>
          <div style={{ fontSize:'13px', color:'#1E3A8A', lineHeight:'1.6' }}>
            ℹ️ This tool runs an AI model directly in your browser. The first time you use it, a one-time model download happens (this can take a few seconds). Your image is processed locally and never uploaded. Works best on photos with a clear subject and simple background.
          </div>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>✂️</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your image here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Image</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP · Output is a transparent PNG</div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#F0FDF4', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>🖼</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => { setFile(null); setResultUrl(null) }} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {processing && statusMsg && <div style={{ marginTop:'16px', background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'10px', padding:'12px 16px', color:'#1E40AF', fontSize:'14px', fontWeight:600 }}>⏳ {statusMsg}</div>}

        {!resultUrl && (
          <div style={{ marginTop:'24px', textAlign:'center' as const }}>
            <button onClick={removeBg} disabled={!file || processing}
              style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
              {processing ? '⏳ Working…' : '✂️ Remove Background'}
            </button>
          </div>
        )}

        {resultUrl && (
          <div style={{ marginTop:'24px' }}>
            <div style={{ fontSize:'15px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px', textAlign:'center' as const }}>✅ Background removed</div>
            <div style={{
              borderRadius:'14px', border:'1.5px solid #e2e8f0', padding:'16px', textAlign:'center' as const,
              backgroundImage:'linear-gradient(45deg,#e2e8f0 25%,transparent 25%),linear-gradient(-45deg,#e2e8f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2e8f0 75%),linear-gradient(-45deg,transparent 75%,#e2e8f0 75%)',
              backgroundSize:'20px 20px', backgroundPosition:'0 0,0 10px,10px -10px,-10px 0px'
            }}>
              <img src={resultUrl} alt="Background removed" style={{ maxWidth:'100%', maxHeight:'420px', borderRadius:'8px' }} />
            </div>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center', marginTop:'20px', flexWrap:'wrap' as const }}>
              <button onClick={download} style={{ background:'#E85D04', color:'white', padding:'14px 36px', borderRadius:'12px', border:'none', fontSize:'15px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>💾 Download PNG</button>
              <button onClick={() => { setResultUrl(null); setFile(null) }} style={{ background:'white', color:'#0F2A4A', padding:'14px 36px', borderRadius:'12px', border:'1.5px solid #e2e8f0', fontSize:'15px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>↻ Start Over</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Remove an Image Background</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Upload an image with a clear subject (a person, product, or object).','Click "Remove Background" — the AI model runs in your browser.','Preview the result on the transparent checkerboard.','Download your transparent PNG, ready to use anywhere.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Is my image uploaded anywhere?', a:'No. The entire process runs locally in your browser using an AI model. Your image never leaves your device — nothing is uploaded to any server.' },
            { q:'Why does the first run take a few seconds?', a:'The first time you use the tool, your browser downloads the AI model. After that, it is cached and runs faster. The model download is one-time.' },
            { q:'What format is the result?', a:'A PNG with a transparent background, so you can place your subject on any background, in any design tool, or on a website.' },
            { q:'Why isn\'t the cutout perfect?', a:'Browser-based removal works best with a clear subject and simple background. Fine details like loose hair or busy backgrounds can be harder. For tricky images, a clean, well-lit photo gives the best result.' },
            { q:'Is it really free?', a:'Yes, completely free with no signup and no watermark.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  )
}

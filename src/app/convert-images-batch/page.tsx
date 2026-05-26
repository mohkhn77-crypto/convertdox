'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'
type Format = 'jpg' | 'png' | 'webp'

export default function ConvertImagesBatchPage() {
  const [files, setFiles] = useState<File[]>([])
  const [format, setFormat] = useState<Format>('jpg')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fl: FileList | null) => {
    if (!fl) return
    setFiles(prev => [...prev, ...Array.from(fl)])
    setSuccess(false)
  }

  const convert = async () => {
    if (files.length === 0) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f))
      formData.append('format', format)
      const res = await fetch(`${BACKEND_URL}/api/image/convert-batch`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `converted-${format}.zip`
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert images. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const formats: { value: Format; label: string; desc: string }[] = [
    { value: 'jpg', label: 'JPG', desc: 'Best for photos' },
    { value: 'png', label: 'PNG', desc: 'Lossless, supports transparency' },
    { value: 'webp', label: 'WebP', desc: 'Modern web format, smaller size' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(245,158,11,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🔄</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Batch Convert Images</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert multiple images to JPG, PNG, or WebP — download as a ZIP</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'Files auto-deleted in 1 hour'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Fast processing'},{icon:'🆓',text:'100% free, no signup'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}</span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFiles(e.dataTransfer.files) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🔄</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop images here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Images</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>Any image format · Max 20 MB each</div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display:'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div style={{ marginTop:'16px', fontSize:'14px', color:'#64748b', fontWeight:600 }}>{files.length} image{files.length !== 1 ? 's' : ''} selected
            <button onClick={() => setFiles([])} style={{ marginLeft:'12px', background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'2px 10px', cursor:'pointer', fontWeight:700, fontSize:'12px' }}>Clear all</button>
          </div>
        )}

        <div style={{ marginTop:'24px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'20px' }}>
          <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Convert to</div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
            {formats.map(f => (
              <button key={f.value} onClick={() => setFormat(f.value)}
                style={{ padding:'12px 20px', borderRadius:'10px', border:`2px solid ${format === f.value ? '#E85D04' : '#e2e8f0'}`, background: format === f.value ? '#FFF7ED' : 'white', color: format === f.value ? '#E85D04' : '#0F2A4A', cursor:'pointer', fontFamily:'inherit', textAlign:'left' as const }}>
                <div style={{ fontSize:'15px', fontWeight:700 }}>{f.label}</div>
                <div style={{ fontSize:'12px', color: format === f.value ? '#E85D04' : '#64748b', marginTop:'2px' }}>{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Done! Your converted-{format}.zip has downloaded.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={files.length === 0 || processing}
            style={{ background: files.length === 0 || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: files.length === 0 || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Converting…' : `🔄 Convert to ${format.toUpperCase()}`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Batch Convert Images</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Select multiple images (any format).','Choose your target format: JPG, PNG, or WebP.','Click "Convert" — all images are converted server-side.','Download the ZIP file with all converted images.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Which format should I choose?', a:'JPG for photos with small file sizes. PNG for graphics, screenshots, or images with transparency. WebP for modern web use — typically 30% smaller than JPG.' },
            { q:'Is quality preserved during conversion?', a:'Yes — by default conversions use high quality settings. Some formats like JPG are inherently lossy, but the quality is maximized.' },
            { q:'Can I convert HEIC, BMP, or TIFF files?', a:'The server accepts most image formats as input. Consult the error message if a specific format is not supported.' },
            { q:'Are filenames updated in the ZIP?', a:'Yes — each file in the ZIP is renamed with the new extension (e.g., photo.png → photo.jpg).' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <SiteFooter />
    </div>
  )
}

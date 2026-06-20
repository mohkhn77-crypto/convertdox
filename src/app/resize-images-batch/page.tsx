'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'
const ACCEPTED = ['image/jpeg','image/png','image/webp']

export default function ResizeImagesBatchPage() {
  const [files, setFiles] = useState<File[]>([])
  const [width, setWidth] = useState('1200')
  const [mode, setMode] = useState<'pixels' | 'percent' | 'ratio'>('pixels')
  const [percent, setPercent] = useState('50')
  const [ratioW, setRatioW] = useState(1)
  const [ratioH, setRatioH] = useState(1)
  const [ratioWidth, setRatioWidth] = useState('1080')
  const [cropPosition, setCropPosition] = useState<'top' | 'center' | 'bottom'>('center')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fl: FileList | null) => {
    if (!fl) return
    const imgs = Array.from(fl).filter(f => ACCEPTED.includes(f.type))
    if (imgs.length !== fl.length) setError('Only JPG, PNG, and WebP files are accepted')
    else setError('')
    setFiles(prev => [...prev, ...imgs])
    setSuccess(false)
  }

  const resize = async () => {
    if (files.length === 0) return
    if (mode === 'pixels' && (!width || Number(width) < 1)) { setError('Please enter a valid width'); return }
    if (mode === 'percent' && (!percent || Number(percent) <= 0)) { setError('Please enter a percentage'); return }
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f))
      formData.append('mode', mode)
      if (mode === 'pixels') {
        formData.append('width', width)
      } else if (mode === 'percent') {
        formData.append('percent', percent)
      } else if (mode === 'ratio') {
        formData.append('ratioW', String(ratioW))
        formData.append('ratioH', String(ratioH))
        if (ratioWidth) formData.append('width', ratioWidth)
        formData.append('cropPosition', cropPosition)
      }
      const res = await fetch(`${BACKEND_URL}/api/image/resize-batch`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'resized-images.zip'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize images. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(16,185,129,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📦</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Batch Resize Images</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Resize multiple images to the same width — aspect ratio preserved automatically</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>📦</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop images here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Images</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP · Max 20 MB each</div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display:'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div style={{ marginTop:'16px', fontSize:'14px', color:'#64748b', fontWeight:600 }}>{files.length} image{files.length !== 1 ? 's' : ''} selected
            <button onClick={() => setFiles([])} style={{ marginLeft:'12px', background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'2px 10px', cursor:'pointer', fontWeight:700, fontSize:'12px' }}>Clear all</button>
          </div>
        )}

        <div style={{ marginTop:'24px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'20px' }}>
          {/* Mode tabs */}
          <div style={{ display:'flex', gap:'8px', marginBottom:'20px', borderBottom:'2px solid #e2e8f0' }}>
            {([['pixels','By Pixels'],['percent','By Percentage'],['ratio','By Aspect Ratio']] as const).map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)}
                style={{ padding:'10px 16px', border:'none', background:'transparent', borderBottom: mode === m ? '3px solid #E85D04' : '3px solid transparent', marginBottom:'-2px', color: mode === m ? '#E85D04' : '#64748b', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                {label}
              </button>
            ))}
          </div>

          {/* PIXELS MODE */}
          {mode === 'pixels' && (
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'10px' }}>Target Width (pixels)</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'12px' }}>
                {[1920, 1200, 800, 600].map(w => (
                  <button key={w} onClick={() => setWidth(String(w))}
                    style={{ padding:'8px 16px', borderRadius:'8px', border:`2px solid ${width === String(w) ? '#E85D04' : '#e2e8f0'}`, background: width === String(w) ? '#FFF7ED' : 'white', color: width === String(w) ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                    {w}px
                  </button>
                ))}
              </div>
              <input type="number" min="1" value={width} onChange={e => setWidth(e.target.value)} placeholder="Custom width"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }} />
              <div style={{ fontSize:'12px', color:'#64748b', marginTop:'8px' }}>Each image is resized to this width; height is calculated to preserve aspect ratio.</div>
            </div>
          )}

          {/* PERCENT MODE */}
          {mode === 'percent' && (
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'10px' }}>Scale to percentage of original</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'12px' }}>
                {['25','50','75'].map(p => (
                  <button key={p} onClick={() => setPercent(p)}
                    style={{ padding:'8px 16px', borderRadius:'8px', border:`2px solid ${percent === p ? '#E85D04' : '#e2e8f0'}`, background: percent === p ? '#FFF7ED' : 'white', color: percent === p ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                    {p}%
                  </button>
                ))}
              </div>
              <input type="number" min="1" max="100" value={percent} onChange={e => setPercent(e.target.value)} placeholder="Custom % (1–100)"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }} />
              <div style={{ fontSize:'12px', color:'#64748b', marginTop:'8px' }}>Each image is scaled to this percentage of its own original size.</div>
            </div>
          )}

          {/* RATIO MODE */}
          {mode === 'ratio' && (
            <div>
              <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'10px' }}>Aspect ratio</label>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' as const, marginBottom:'16px' }}>
                {([['1:1',1,1],['16:9',16,9],['4:3',4,3],['9:16',9,16],['3:2',3,2]] as const).map(([label, w, h]) => {
                  const active = ratioW === w && ratioH === h
                  return (
                    <button key={label} onClick={() => { setRatioW(w); setRatioH(h) }}
                      style={{ padding:'8px 16px', borderRadius:'8px', border:`2px solid ${active ? '#E85D04' : '#e2e8f0'}`, background: active ? '#FFF7ED' : 'white', color: active ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
                      {label}
                    </button>
                  )
                })}
              </div>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' as const, marginBottom:'12px' }}>
                <div style={{ flex:1, minWidth:'130px' }}>
                  <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'8px' }}>Target width (px)</label>
                  <input type="number" value={ratioWidth} onChange={e => setRatioWidth(e.target.value)} placeholder="e.g. 1080"
                    style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'14px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }} />
                </div>
                <div style={{ flex:1, minWidth:'130px' }}>
                  <label style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'8px' }}>Crop position</label>
                  <div style={{ display:'flex', gap:'6px' }}>
                    {(['top','center','bottom'] as const).map(pos => (
                      <button key={pos} onClick={() => setCropPosition(pos)}
                        style={{ flex:1, padding:'10px 4px', borderRadius:'8px', border:`2px solid ${cropPosition === pos ? '#E85D04' : '#e2e8f0'}`, background: cropPosition === pos ? '#FFF7ED' : 'white', color: cropPosition === pos ? '#E85D04' : '#0F2A4A', fontSize:'12px', fontWeight:700, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize' as const }}>
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize:'12px', color:'#64748b' }}>Every image is cropped to the chosen ratio. Crop position controls which part is kept.</div>
            </div>
          )}
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Done! Your resized-images.zip has downloaded.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={resize} disabled={files.length === 0 || processing}
            style={{ background: files.length === 0 || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: files.length === 0 || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Resizing…' : `📦 Resize ${files.length > 0 ? files.length + ' ' : ''}Image${files.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Batch Resize Images</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Select multiple images to resize.','Choose a preset width or enter a custom value.','Click "Resize Images" — each image is scaled to that width.','Download the ZIP with all resized images.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Will my images be stretched or distorted?', a:'No — height is calculated automatically based on each image\'s original aspect ratio.' },
            { q:'What if I want to resize to a specific height instead?', a:'Currently only width-based resizing is supported. If all your images share the same aspect ratio, you can calculate the equivalent height.' },
            { q:'What formats are supported?', a:'JPG, PNG, and WebP input images are supported.' },
            { q:'Are filenames preserved in the ZIP?', a:'Yes — each resized image keeps its original filename in the ZIP.' },
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

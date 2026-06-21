'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const COUNTRIES = [
  { key: 'us',        name: 'United States', size: '2×2 in (600×600px)',   bg: 'Plain white or off-white', note: 'Head 25–35mm (chin to crown). Off-white accepted.' },
  { key: 'uk',        name: 'United Kingdom', size: '35×45mm (413×531px)',  bg: 'Light grey (NOT pure white)', note: 'UK prefers a light grey background — pure white is a common rejection reason.' },
  { key: 'schengen',  name: 'Schengen / EU',  size: '35×45mm (413×531px)',  bg: 'Light grey or cream',        note: 'Used for Schengen visas and most EU passports. Germany requires light grey.' },
  { key: 'canada',    name: 'Canada',         size: '50×70mm (591×827px)',  bg: 'Plain white',                note: 'Unique larger size. Face 31–36mm chin to crown. Printed photos need a photographer stamp.' },
  { key: 'india',     name: 'India',          size: '51×51mm (600×600px)',  bg: 'Pure white only',            note: 'Off-white can be rejected. Online uploads often capped at 300KB — compress after.' },
  { key: 'australia', name: 'Australia',      size: '35×45mm (413×531px)',  bg: 'Plain white',                note: 'Head 32–36mm chin to crown. No glasses (strict since 2024).' },
  { key: 'china',     name: 'China',          size: '33×48mm (390×567px)',  bg: 'Plain white',                note: 'Narrower format. Visa uploads often need a specific small file size.' },
  { key: 'japan',     name: 'Japan',          size: '35×45mm (413×531px)',  bg: 'Plain white or light',       note: 'Head should fill roughly 70–80% of the photo height.' },
]

export default function PassportPhotoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [country, setCountry] = useState('us')
  const [cropPosition, setCropPosition] = useState<'top' | 'center' | 'bottom'>('top')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedCountry = COUNTRIES.find(c => c.key === country) || COUNTRIES[0]

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!f.type.startsWith('image/')) { setError('Only image files are accepted'); return }
    setFile(f); setError(''); setSuccess(false)
  }

  const convert = async () => {
    if (!file) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('country', country)
      formData.append('cropPosition', cropPosition)
      const res = await fetch(`${BACKEND_URL}/api/specialty/passport-photo`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'passport-photo.jpg'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create passport photo. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🛂</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Passport Photo Editor</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Crop & size photos to official passport dimensions for the US, UK, EU, Canada, India & more</p>
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

      <div style={{ maxWidth:'860px', margin:'20px auto 0', padding:'0 24px' }}>
          {/* Disclaimer banner */}
          <div style={{ background:'#FFFBEB', border:'1.5px solid #FDE68A', borderRadius:'12px', padding:'12px 16px', marginBottom:'16px' }}>
            <div style={{ fontSize:'13px', color:'#92400E', lineHeight:'1.6' }}>
              <strong>⚠️ Please read:</strong> This tool crops and sizes your photo to the official <strong>dimensions</strong> for the selected country. You are responsible for meeting the other requirements — background color, head size and position, neutral expression, and no glasses where required. Always verify against the official government source before submitting.
            </div>
          </div>

          {/* Country selector */}
          <div style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'18px' }}>
            <label style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'10px' }}>🌍 Select country</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', background:'white', boxSizing:'border-box' as const, marginBottom:'14px' }}>
              {COUNTRIES.map(c => <option key={c.key} value={c.key}>{c.name} — {c.size}</option>)}
            </select>

            {/* Per-country info */}
            <div style={{ background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'10px', padding:'12px 14px', marginBottom:'14px' }}>
              <div style={{ fontSize:'13px', color:'#1E3A8A', lineHeight:'1.7' }}>
                <div><strong>Size:</strong> {selectedCountry.size} · 300 DPI · JPEG</div>
                <div><strong>Background:</strong> {selectedCountry.bg}</div>
                <div style={{ marginTop:'4px', color:'#1E40AF' }}>{selectedCountry.note}</div>
              </div>
            </div>

            {/* Crop position */}
            <label style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', display:'block', marginBottom:'8px' }}>Crop position <span style={{ color:'#94a3b8', fontWeight:400 }}>— which part of the photo to keep</span></label>
            <div style={{ display:'flex', gap:'8px' }}>
              {(['top','center','bottom'] as const).map(pos => (
                <button key={pos} onClick={() => setCropPosition(pos)}
                  style={{ flex:1, padding:'10px 6px', borderRadius:'10px', border:'1.5px solid', borderColor: cropPosition === pos ? '#E85D04' : '#e2e8f0', background: cropPosition === pos ? '#FFF7ED' : 'white', color: cropPosition === pos ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize' as const }}>
                  {pos}
                </button>
              ))}
            </div>
            <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'8px' }}>Tip: &quot;Top&quot; usually works best for passport photos since the head sits near the top of the frame.</div>
          </div>
        </div>

      <div style={{ maxWidth:'860px', margin:'16px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🛂</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your photo here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Photo</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP · Max 20 MB</div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#F0FDF4', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>🖼</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Done! Your passport-photo.jpg has downloaded (600×600px, 300 DPI).</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Creating passport photo…' : '🛂 Create Passport Photo'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Make a Passport Photo</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Take a photo with your face centered against a plain background.','Upload the photo here.','Click "Create Passport Photo" — image is cropped to 600×600px at 300 DPI.','Download and print at 2×2 inches on photo paper.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Does this meet official passport requirements?', a:'The output dimensions match US standard (2×2 inches at 300 DPI). However, each country has specific requirements (white background, head position, expression). Always verify official requirements before submitting.' },
            { q:'What if my face is not centered?', a:'The tool applies a center crop. For best results, ensure your face is centered in the original photo before uploading.' },
            { q:'Can I use this for visa photos?', a:'Visa photos typically follow the same 2×2 inch format. Check the specific country\'s visa photo requirements for any additional rules.' },
            { q:'Is there a file size limit?', a:'Images up to 20 MB are supported.' },
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

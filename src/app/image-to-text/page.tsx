'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff']
const LANGUAGES = [
  { label: 'English', value: 'eng' },
  { label: 'Spanish', value: 'spa' },
  { label: 'French', value: 'fra' },
  { label: 'German', value: 'deu' },
  { label: 'Chinese (Simplified)', value: 'chi_sim' },
]

interface OcrResult {
  text?: string
  confidence?: number
}

export default function ImageToTextPage() {
  const [file, setFile] = useState<File | null>(null)
  const [lang, setLang] = useState('eng')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<OcrResult | null>(null)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type) && !f.name.match(/\.(jpe?g|png|webp|bmp|tiff?)$/i)) {
      setError('Only image files are accepted (JPG, PNG, WebP, BMP, TIFF)'); return
    }
    setFile(f); setError(''); setResult(null)
  }

  const extract = async () => {
    if (!file) return
    setProcessing(true); setError(''); setResult(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('lang', lang)
      const res = await fetch(`${BACKEND_URL}/api/ocr/image-to-text`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const data = await res.json() as OcrResult
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract text. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const copyText = async () => {
    if (!result?.text) return
    await navigator.clipboard.writeText(result.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadTxt = () => {
    if (!result?.text) return
    const blob = new Blob([result.text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'extracted-text.txt'
    document.body.appendChild(a); a.click()
    URL.revokeObjectURL(url); document.body.removeChild(a)
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🔤</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Image to Text (OCR)</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Extract text from images using optical character recognition</p>
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
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🔤</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your image here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Image</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP, BMP, TIFF · Max 10 MB · Best with clear, high-contrast text</div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/bmp,image/tiff" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEF3C7', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#92400E', fontWeight:700, fontSize:'10px', flexShrink:0 }}>IMG</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => { setFile(null); setResult(null) }} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        <div style={{ marginTop:'20px' }}>
          <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Language</label>
          <select value={lang} onChange={e => setLang(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', background:'white', boxSizing:'border-box' as const }}>
            {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={extract} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Extracting… (10–30 seconds)' : '🔤 Extract Text'}
          </button>
        </div>

        {result && result.text && (
          <div style={{ marginTop:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px', flexWrap:'wrap' as const, gap:'8px' }}>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'16px', fontWeight:700, color:'#0F2A4A' }}>
                Extracted Text
                {result.confidence !== undefined && (
                  <span style={{ fontSize:'13px', fontWeight:400, color: result.confidence > 70 ? '#16a34a' : '#f59e0b', marginLeft:'10px' }}>
                    {result.confidence.toFixed(0)}% confidence
                  </span>
                )}
              </div>
              <div style={{ display:'flex', gap:'8px' }}>
                <button onClick={copyText} style={{ background: copied ? '#D1FAE5' : '#f8fafc', color: copied ? '#166534' : '#0F2A4A', border:'1.5px solid #e2e8f0', borderRadius:'8px', padding:'8px 16px', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
                <button onClick={downloadTxt} style={{ background:'#E85D04', color:'white', border:'none', borderRadius:'8px', padding:'8px 16px', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  ⬇️ Download .txt
                </button>
              </div>
            </div>
            <textarea readOnly value={result.text}
              style={{ width:'100%', height:'320px', padding:'16px', borderRadius:'12px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'monospace', color:'#334155', lineHeight:'1.7', resize:'vertical' as const, boxSizing:'border-box' as const, outline:'none' }} />
          </div>
        )}
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What is OCR?', a:'Optical Character Recognition (OCR) is technology that reads text from images. It works by analysing pixel patterns and matching them to known character shapes.' },
            { q:'What images work best?', a:'Clear, high-contrast images with horizontal printed text yield the best results. Blurry, skewed, or handwritten text reduces accuracy.' },
            { q:'How accurate is it?', a:'For clean printed text, accuracy is typically 90-99%. Confidence score is shown after extraction. Handwriting and stylised fonts reduce accuracy.' },
            { q:'How long does it take?', a:'OCR usually takes 10–30 seconds depending on image size and complexity.' },
            { q:'Are my files kept private?', a:'Yes. Files are sent over HTTPS and deleted within 1 hour.' },
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

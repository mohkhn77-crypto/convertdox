'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

interface PdfInfo {
  pages?: number
  title?: string
  author?: string
  subject?: string
  creator?: string
  producer?: string
  creationDate?: string
  modDate?: string
  fileSize?: number
  encrypted?: boolean
  [key: string]: unknown
}

export default function PdfInfoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState<PdfInfo | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files are accepted'); return }
    setFile(f); setError(''); setInfo(null)
  }

  const analyze = async () => {
    if (!file) return
    setProcessing(true); setError(''); setInfo(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/pdf/info`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const data = await res.json() as PdfInfo
      setInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read PDF info. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  const infoCards = info ? [
    { label: 'Pages', value: info.pages ?? '—', icon: '📄' },
    { label: 'File Size', value: info.fileSize ? fmt(info.fileSize) : fmt(file?.size ?? 0), icon: '💾' },
    { label: 'Encrypted', value: info.encrypted ? 'Yes' : 'No', icon: '🔒' },
    { label: 'Title', value: (info.title as string) || '—', icon: '📝' },
    { label: 'Author', value: (info.author as string) || '—', icon: '👤' },
    { label: 'Subject', value: (info.subject as string) || '—', icon: '🏷️' },
    { label: 'Creator', value: (info.creator as string) || '—', icon: '🛠' },
    { label: 'Producer', value: (info.producer as string) || '—', icon: '⚙️' },
    { label: 'Created', value: (info.creationDate as string) || '—', icon: '📅' },
    { label: 'Modified', value: (info.modDate as string) || '—', icon: '✏️' },
  ] : []

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>ℹ️</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>PDF Info</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Inspect metadata — pages, author, creation date, encryption, and more</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>ℹ️</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your PDF here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select PDF</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>PDF files only · Max 100 MB · No download — metadata displayed here</div>
          <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEE2E2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'11px', flexShrink:0 }}>PDF</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => { setFile(null); setInfo(null) }} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={analyze} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'220px' }}>
            {processing ? '⏳ Analyzing…' : 'ℹ️ Get PDF Info'}
          </button>
        </div>

        {info && (
          <div style={{ marginTop:'28px' }}>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'18px', fontWeight:700, color:'#0F2A4A', marginBottom:'16px' }}>📋 PDF Metadata</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'12px' }}>
              {infoCards.map(card => (
                <div key={card.label} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
                  <div style={{ fontSize:'20px', marginBottom:'6px' }}>{card.icon}</div>
                  <div style={{ fontSize:'12px', color:'#94a3b8', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.5px', marginBottom:'4px' }}>{card.label}</div>
                  <div style={{ fontSize:'15px', fontWeight:700, color:'#0F2A4A', wordBreak:'break-word' as const }}>{String(card.value)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What information is shown?', a:'Page count, file size, encryption status, title, author, subject, creator application, PDF producer, creation date, and modification date.' },
            { q:'Is the PDF uploaded to a server?', a:'Yes — it is sent over HTTPS to extract metadata, then immediately deleted. No content is stored.' },
            { q:'Can it read encrypted PDFs?', a:'Basic metadata like page count can often be read without a password. Full metadata requires the correct password.' },
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

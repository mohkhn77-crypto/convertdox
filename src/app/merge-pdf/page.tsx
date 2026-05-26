'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const pdfFiles = Array.from(newFiles).filter(f => f.type === 'application/pdf')
    if (pdfFiles.length !== newFiles.length) setError('Only PDF files are accepted')
    else setError('')
    setFiles(prev => [...prev, ...pdfFiles])
    setSuccess(false)
  }

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx))

  const moveFile = (idx: number, dir: 'up' | 'down') => {
    const next = [...files]
    const target = dir === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= next.length) return
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setFiles(next)
  }

  const mergePdfs = async () => {
    if (files.length < 2) { setError('Please upload at least 2 PDFs'); return }
    setMerging(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f))
      const res = await fetch(`${BACKEND_URL}/api/pdf/merge`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'merged.pdf'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs. Please try again.')
    } finally {
      setMerging(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📑</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Merge PDF</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Combine multiple PDFs into a single document — free, fast, secure</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'14px', flexWrap:'wrap' as const, justifyContent:'center' }}>
          {[{icon:'🔒',text:'Files auto-deleted in 1 hour'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Fast processing'},{icon:'🆓',text:'100% free, no signup'}].map(item => (
            <span key={item.text} style={{ fontSize:'13px', color:'#166534', fontWeight:600, display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Main UI */}
      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px' }}>

        {/* Upload zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFiles(e.dataTransfer.files) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>📑</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop PDF files here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
            Select PDFs
          </button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>PDF files only · Max 100 MB each · Up to 20 files</div>
          <input ref={fileInputRef} type="file" accept="application/pdf" multiple style={{ display:'none' }}
            onChange={e => handleFiles(e.target.files)} />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div style={{ marginTop:'24px' }}>
            <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'12px', fontWeight:600 }}>
              {files.length} PDF{files.length !== 1 ? 's' : ''} added — use arrows to reorder
            </div>
            {files.map((file, idx) => (
              <div key={idx} style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 16px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ fontSize:'13px', fontWeight:700, color:'#94a3b8', width:'24px', textAlign:'center' as const }}>{idx + 1}</span>
                <div style={{ width:'36px', height:'36px', background:'#FEE2E2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'10px', flexShrink:0 }}>PDF</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
                  <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
                </div>
                <div style={{ display:'flex', gap:'4px' }}>
                  <button onClick={() => moveFile(idx, 'up')} disabled={idx === 0}
                    style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px 8px', cursor:idx===0?'not-allowed':'pointer', opacity:idx===0?0.3:1, fontSize:'14px' }}>↑</button>
                  <button onClick={() => moveFile(idx, 'down')} disabled={idx === files.length - 1}
                    style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px 8px', cursor:idx===files.length-1?'not-allowed':'pointer', opacity:idx===files.length-1?0.3:1, fontSize:'14px' }}>↓</button>
                  <button onClick={() => removeFile(idx)}
                    style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>
            ⚠️ {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>
            ✅ PDFs merged successfully! Your download has started.
          </div>
        )}

        {/* Merge button */}
        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={mergePdfs} disabled={files.length < 2 || merging}
            style={{
              background: files.length < 2 || merging ? '#cbd5e1' : '#E85D04',
              color: 'white', padding:'16px 48px', borderRadius:'12px', border:'none',
              fontSize:'16px', fontWeight:700,
              cursor: files.length < 2 || merging ? 'not-allowed' : 'pointer',
              fontFamily:'inherit', minWidth:'240px'
            }}>
            {merging ? '⏳ Merging PDFs…'
              : files.length < 2
                ? `Add ${2 - files.length} more PDF${files.length === 0 ? 's' : ''} to continue`
                : `🔗 Merge ${files.length} PDFs`}
          </button>
        </div>
      </div>

      {/* Educational content */}
      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Merge PDFs</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {[
              'Click "Select PDFs" or drag your PDF files into the upload area.',
              'Add at least 2 PDF files (up to 20 at a time).',
              'Reorder them using the ↑ and ↓ arrows — the order here becomes the page order in the merged file.',
              'Click the orange "Merge PDFs" button.',
              'Your merged PDF downloads automatically — no email, no signup required.',
            ].map((step, i) => (
              <li key={i} style={{ marginBottom:'10px' }}>
                <strong style={{ color:'#0F2A4A' }}>Step {i + 1}:</strong> {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'14px' }}>
            {[
              { icon:'📄', title:'Combine Reports', desc:'Merge monthly reports into one annual document.' },
              { icon:'📚', title:'Merge Study Notes', desc:'Combine lecture PDFs into one study guide.' },
              { icon:'🧾', title:'Invoice Batches', desc:'Send multiple invoices as a single attachment.' },
              { icon:'📋', title:'Contract Packages', desc:'Bundle agreements and annexures together.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'12px', padding:'16px' }}>
                <div style={{ fontSize:'24px', marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px', color:'#64748b', lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Is there a file size limit?', a:'Each PDF can be up to 100 MB. You can merge up to 20 PDFs in one go.' },
            { q:'Are my files kept private?', a:'Yes. Files are sent over HTTPS, processed immediately, and auto-deleted from our servers within 1 hour. We never share your files.' },
            { q:'Will merging reduce PDF quality?', a:'No. Merging is a lossless operation — original resolution, fonts, and formatting of every page are preserved exactly.' },
            { q:'Can I merge password-protected PDFs?', a:'Not yet. Password-protected PDFs need to be unlocked first. We plan to add an unlock feature soon.' },
            { q:'Why does it take a few seconds?', a:'Your files are uploaded to our server, processed by a PDF engine, then the merged file is sent back. Larger files naturally take a bit longer.' },
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

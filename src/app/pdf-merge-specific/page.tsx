'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const MAX_FILES = 5

interface PdfEntry {
  file: File
  pages: string
}

export default function PdfMergeSpecificPage() {
  const [entries, setEntries] = useState<PdfEntry[]>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const pdfs = Array.from(fileList).filter(f => f.type === 'application/pdf')
    if (pdfs.length !== fileList.length) setError('Only PDF files are accepted')
    else setError('')
    const toAdd = pdfs.slice(0, MAX_FILES - entries.length)
    setEntries(prev => [...prev, ...toAdd.map(file => ({ file, pages: '' }))])
    setSuccess(false)
  }

  const updatePages = (idx: number, pages: string) => {
    setEntries(prev => prev.map((e, i) => i === idx ? { ...e, pages } : e))
  }

  const removeEntry = (idx: number) => setEntries(prev => prev.filter((_, i) => i !== idx))

  const merge = async () => {
    if (entries.length < 2) { setError('Add at least 2 PDFs'); return }
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      entries.forEach((e, i) => {
        formData.append('files', e.file)
        formData.append(`pages_${i}`, e.pages.trim())
      })
      const res = await fetch(`${BACKEND_URL}/api/pdf/merge-specific`, { method: 'POST', body: formData })
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
      setSuccess(true); setEntries([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs. Please try again.')
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
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🔗</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Merge Specific PDF Pages</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Pick specific pages from multiple PDFs and merge them into one document</p>
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
        {entries.length < MAX_FILES && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
            onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
            onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFiles(e.dataTransfer.files) }}
            style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'40px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
            <div style={{ fontSize:'48px', marginBottom:'10px' }}>🔗</div>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'18px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Add PDF files</div>
            <div style={{ fontSize:'13px', color:'#64748b', marginBottom:'16px' }}>Up to {MAX_FILES} PDFs — specify pages for each</div>
            <button style={{ background:'#E85D04', color:'white', padding:'10px 28px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Add PDFs</button>
            <input ref={fileInputRef} type="file" accept="application/pdf" multiple style={{ display:'none' }} onChange={e => handleFiles(e.target.files)} />
          </div>
        )}

        {entries.length > 0 && (
          <div style={{ marginTop:'20px', display:'flex', flexDirection:'column' as const, gap:'12px' }}>
            <div style={{ fontSize:'14px', color:'#64748b', fontWeight:600 }}>{entries.length} PDF{entries.length !== 1 ? 's' : ''} added</div>
            {entries.map((entry, idx) => (
              <div key={idx} style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                  <div style={{ width:'36px', height:'36px', background:'#FEE2E2', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'10px', flexShrink:0 }}>PDF</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'13px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{entry.file.name}</div>
                    <div style={{ fontSize:'11px', color:'#94a3b8' }}>{fmt(entry.file.size)}</div>
                  </div>
                  <button onClick={() => removeEntry(idx)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'14px' }}>×</button>
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#64748b', display:'block', marginBottom:'4px' }}>Pages from this PDF (leave blank for all pages)</label>
                  <input type="text" value={entry.pages} onChange={e => updatePages(idx, e.target.value)} placeholder="e.g. 1,3-5"
                    style={{ width:'100%', padding:'8px 12px', border:'1.5px solid #e2e8f0', borderRadius:'6px', fontSize:'13px', fontFamily:'inherit', outline:'none', boxSizing:'border-box' as const }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Merged! Your PDF has downloaded.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={merge} disabled={entries.length < 2 || processing}
            style={{ background: entries.length < 2 || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: entries.length < 2 || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Merging…' : entries.length < 2 ? `Add ${2 - entries.length} more PDF${entries.length === 0 ? 's' : ''} to continue` : `🔗 Merge ${entries.length} PDFs`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Merge Specific Pages</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Add 2–5 PDF files.','For each PDF, enter which pages to include (leave blank to include all pages).','Click "Merge PDFs" — pages are combined in order.','Download your merged PDF.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What page format should I use?', a:'Use commas for individual pages (1,3,5) and hyphens for ranges (5-9). Combine both: 1,3,5-9. Leave blank to include all pages.' },
            { q:'What is the maximum number of PDFs?', a:'Up to 5 PDFs per merge. Run the tool again on the result to combine more.' },
            { q:'Will pages be merged in the order I added the files?', a:'Yes — pages are merged in the order the files appear in the list.' },
            { q:'Is there a file size limit?', a:'Each PDF can be up to 50 MB.' },
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

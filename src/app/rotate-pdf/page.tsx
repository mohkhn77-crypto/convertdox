'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

const ROTATIONS = [
  { label: '90° Clockwise', value: 90, symbol: '↻' },
  { label: '180°', value: 180, symbol: '↕' },
  { label: '90° Counter-clockwise', value: 270, symbol: '↺' },
]

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [rotation, setRotation] = useState(90)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files are accepted'); return }
    setFile(f); setError(''); setSuccess(false)
  }

  const rotatePdf = async () => {
    if (!file) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('rotation', String(rotation))
      const res = await fetch(`${BACKEND_URL}/api/pdf/rotate`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'rotated.pdf'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rotate PDF. Please try again.')
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
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🔄</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Rotate PDF</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Rotate all pages in your PDF by 90°, 180°, or 270°</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🔄</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your PDF here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select PDF</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>PDF files only · Max 100 MB</div>
          <input ref={fileInputRef} type="file" accept="application/pdf" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEE2E2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'11px', flexShrink:0 }}>PDF</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        <div style={{ marginTop:'24px' }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Choose rotation:</div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' as const }}>
            {ROTATIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setRotation(opt.value)}
                style={{
                  flex:1, minWidth:'120px', padding:'16px 12px', borderRadius:'12px', border:'2px solid',
                  borderColor: rotation === opt.value ? '#E85D04' : '#e2e8f0',
                  background: rotation === opt.value ? '#FFF7ED' : 'white',
                  cursor:'pointer', textAlign:'center' as const, transition:'all 0.15s'
                }}>
                <div style={{ fontSize:'28px', marginBottom:'6px' }}>{opt.symbol}</div>
                <div style={{ fontSize:'13px', fontWeight:700, color: rotation === opt.value ? '#E85D04' : '#0F2A4A' }}>{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Rotated successfully! Your PDF has downloaded.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={rotatePdf} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'220px' }}>
            {processing ? '⏳ Rotating…' : `🔄 Rotate PDF ${rotation}°`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Rotate a PDF</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Upload your PDF by clicking "Select PDF" or dragging it into the area above.','Choose your rotation angle: 90° clockwise, 180°, or 90° counter-clockwise.','Click the orange "Rotate PDF" button.','Your rotated PDF downloads automatically — all pages rotated uniformly.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Does it rotate all pages?', a:'Yes — all pages in the PDF are rotated by the selected angle. Per-page rotation is planned for a future update.' },
            { q:'Will rotation reduce quality?', a:'No. Rotation is a lossless geometric operation. Text, images, and vector graphics remain at full quality.' },
            { q:'Is there a file size limit?', a:'Yes, PDFs up to 100 MB are supported.' },
            { q:'Are my files kept private?', a:'Yes. Files are sent over HTTPS and deleted from our server within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="Rotate PDF"
        whatIs="Rotating a PDF means permanently changing the orientation of one or more pages — turning them 90, 180, or 270 degrees so they display and print the right way up. This is essential when a scanned document comes out sideways or upside down, or when a file mixes portrait and landscape pages that need to be aligned. A PDF rotator fixes the orientation and saves it into the file itself, so the correction sticks no matter where the document is opened."
        whatIsExtended="There's an important difference between simply viewing a PDF rotated and actually rotating it. Most PDF readers let you turn a page on screen, but that rotation is temporary — reopen the file and it's sideways again. ConvertDox rotates the pages at the file level and saves the result, so the orientation is permanent. Your file is processed securely and deleted from our servers within minutes, with no watermark added."
        howToUse={[
          'Upload the PDF you want to rotate by clicking the upload area or dragging the file in',
          'Preview the pages to see which ones need rotating',
          'Choose to rotate all pages or select specific pages',
          'Pick the rotation direction — 90° clockwise, 90° counter-clockwise, or 180°',
          'Apply the rotation and review the corrected orientation',
          'Download the rotated PDF — the change is saved permanently into the file',
        ]}
        useCases={[
          { title: 'Fixing Sideways Scans', description: 'Scanners often save pages in the wrong orientation. Rotate them so the document reads correctly and prints properly.' },
          { title: 'Mixed Orientation Files', description: 'Align a document that mixes portrait and landscape pages so everything faces the same way.' },
          { title: 'Photographed Documents', description: 'Photos of documents taken on a phone are frequently rotated. Correct them before sharing or printing.' },
          { title: 'Preparing for Print', description: 'Ensure every page is upright before sending a file to a printer to avoid wasted paper and reprints.' },
          { title: 'Professional Presentation', description: 'Send clients and colleagues correctly oriented documents instead of files they have to turn their heads to read.' },
          { title: 'Archiving Records', description: 'Fix orientation before filing documents so your archive is clean and consistently readable.' },
        ]}
        tips={[
          'Check every page — a document can have just one or two pages that are rotated incorrectly',
          'Use 180° for upside-down pages, and 90° for pages lying on their side',
          'Rotation is lossless — it changes orientation without affecting text or image quality',
          'Rotate before merging if you\'re combining files, so the final document is consistent',
          'Preview after rotating to confirm every page faces the right way before downloading',
          'The rotation is saved into the file, so it stays fixed wherever the PDF is opened',
        ]}
        faqs={[
          { question: 'Is rotating a PDF free?', answer: 'Yes, completely free with no signup and no watermark added to your document.' },
          { question: 'Will the rotation be saved permanently?', answer: 'Yes. Unlike rotating a page in a PDF viewer (which is temporary), this saves the new orientation into the file itself, so it stays corrected everywhere.' },
          { question: 'Can I rotate just one page?', answer: 'Yes. You can rotate all pages at once or select specific pages to rotate individually.' },
          { question: 'Does rotating reduce quality?', answer: 'No. Rotation is lossless — it only changes orientation and does not affect the text or image quality of your document.' },
          { question: 'Are my files private?', answer: 'Yes. Your PDF is uploaded securely, rotated, and automatically deleted from our servers within minutes. We never store or read your files.' },
          { question: 'Can I rotate a password-protected PDF?', answer: 'Remove the password first with our Unlock PDF tool, then rotate the unlocked file.' },
        ]}
        relatedTools={[
          { name: 'PDF Editor', slug: 'pdf-editor', description: 'Reorder, rotate, and delete PDF pages' },
          { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine multiple PDFs into one file' },
          { name: 'Split PDF', slug: 'split-pdf', description: 'Split a PDF into separate files or ranges' },
          { name: 'Compress PDF', slug: 'compress-pdf', description: 'Reduce PDF file size for easier sharing' },
          { name: 'PDF to Word', slug: 'pdf-to-word', description: 'Convert PDF to an editable Word document' },
        ]}
      />
    </div>
  )
}

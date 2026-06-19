'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (f.type !== 'application/pdf') { setError('Only PDF files are accepted'); return }
    setFile(f); setError(''); setResult(null)
  }

  const compress = async () => {
    if (!file) return
    setProcessing(true); setError(''); setResult(null)
    const originalSize = file.size
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/pdf/compress`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      setResult({ originalSize, compressedSize: blob.size })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'compressed.pdf'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`
  const savings = result ? Math.round((1 - result.compressedSize / result.originalSize) * 100) : 0

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🗜️</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Compress PDF</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Reduce PDF file size while keeping quality intact</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>🗜️</div>
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
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>Original size: {fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {result && (
          <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'12px', padding:'16px 20px' }}>
            <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'16px', fontWeight:700, color:'#166534', marginBottom:'12px' }}>✅ Compressed successfully! Download started.</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', textAlign:'center' as const }}>
              {[{label:'Original', value:fmt(result.originalSize)},{label:'Compressed', value:fmt(result.compressedSize)},{label:'Saved', value:`${savings}%`}].map(s => (
                <div key={s.label} style={{ background:'white', borderRadius:'8px', padding:'10px' }}>
                  <div style={{ fontSize:'18px', fontWeight:800, color:'#0F2A4A' }}>{s.value}</div>
                  <div style={{ fontSize:'12px', color:'#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={compress} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'220px' }}>
            {processing ? '⏳ Compressing…' : '🗜️ Compress PDF'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Compress a PDF</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Upload your PDF by clicking "Select PDF" or dragging it into the area above.','Click the orange "Compress PDF" button.','Our server optimises the file — removing redundant data and compressing images.','Your compressed PDF downloads automatically with a size comparison shown.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'How much compression can I expect?', a:'Results vary by PDF content. Image-heavy PDFs often shrink 50–80%. Text-only PDFs compress less, typically 10–30%.' },
            { q:'Will the quality be reduced?', a:'Slightly for image-heavy PDFs — we use balanced compression that preserves readability. Text and vector graphics are lossless.' },
            { q:'Is there a file size limit?', a:'Yes, the PDF can be up to 100 MB.' },
            { q:'Are my files safe?', a:'Yes. Files are sent over HTTPS and auto-deleted from our servers within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="Compress PDF"
        whatIs="Compressing a PDF means reducing its file size while keeping the document readable and intact. PDFs often balloon in size because of high-resolution images, embedded fonts, and scanned pages. A PDF compressor shrinks these elements — downsampling images, removing redundant data, and optimizing the file structure — so the document is small enough to email, upload, or store without hitting size limits."
        whatIsExtended="ConvertDox compresses PDFs on its server and deletes your file within minutes of processing. The goal is the best balance between smaller size and acceptable quality: text stays crisp and readable, while bulky images are optimized to cut the most weight. This is especially useful for email attachments (most providers cap at 25MB), web uploads, and government or job-application portals that enforce strict size limits."
        howToUse={[
          'Upload the PDF you want to shrink by clicking the upload area or dragging the file in',
          'Wait a moment while the file uploads and the compressor analyzes it',
          'The tool automatically optimizes images and removes redundant data',
          'Review the new file size compared to the original',
          'Download the compressed PDF — ready to email, upload, or archive',
          'Your original file is automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Email Attachments', description: 'Get a large PDF under the 25MB limit most email providers enforce, so your attachment actually sends.' },
          { title: 'Job & Government Portals', description: 'Many application portals reject files over a few megabytes. Compression brings your document within the allowed size.' },
          { title: 'Faster Website Uploads', description: 'Smaller PDFs upload and load faster, improving experience for anyone downloading documents from your site.' },
          { title: 'Saving Storage Space', description: 'Compress archives of scanned receipts, contracts, or records to free up disk and cloud storage.' },
          { title: 'Scanned Document Cleanup', description: 'Scans are notoriously heavy. Compression dramatically reduces the size of image-based PDFs.' },
          { title: 'Sharing Over Slow Connections', description: 'A lighter file is far quicker to send and receive on limited or mobile data.' },
        ]}
        tips={[
          'Image-heavy PDFs compress the most — text-only files are already small and shrink less',
          'If you need a specific target size, compress, check the result, and re-run if needed',
          'For scanned documents, compression makes the biggest difference in file size',
          'Compress AFTER merging if you\'re combining files, so the whole document is optimized at once',
          'Very high compression can soften image detail — review the output if image clarity matters',
          'Keep an original copy if you may need the full-resolution version later',
        ]}
        faqs={[
          { question: 'Is compressing PDFs free?', answer: 'Yes, completely free with no signup and no watermark added to your document.' },
          { question: 'Will compression ruin my document quality?', answer: 'Text remains sharp and readable. Images are optimized, which can slightly reduce their resolution, but the tool aims for a balance that keeps the document looking good.' },
          { question: 'Are my files private?', answer: 'Yes. Your PDF is uploaded securely, compressed, and automatically deleted from our servers within minutes. We never store or read your files.' },
          { question: 'How much smaller will my file get?', answer: 'It depends on the content. Image-heavy and scanned PDFs can shrink by 50% or more, while text-only files compress less because they\'re already small.' },
          { question: 'Can I compress a password-protected PDF?', answer: 'Remove the password first with our Unlock PDF tool, then compress the unlocked file.' },
          { question: 'Is there a file size limit?', answer: 'You can compress large files, though very large uploads take longer to process. If a file is extremely large, compress it in stages.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine multiple PDFs into one file' },
          { name: 'Split PDF', slug: 'split-pdf', description: 'Split a PDF into separate files or ranges' },
          { name: 'Compress Image', slug: 'compress-image', description: 'Reduce image file size online' },
          { name: 'PDF to Word', slug: 'pdf-to-word', description: 'Convert PDF to an editable Word document' },
          { name: 'Unlock PDF', slug: 'unlock-pdf', description: 'Remove passwords from PDF files' },
        ]}
      />
    </div>
  )
}

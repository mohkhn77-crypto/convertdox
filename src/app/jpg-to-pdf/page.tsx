'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp']

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const imgs = Array.from(newFiles).filter(f => ACCEPTED.includes(f.type))
    if (imgs.length !== newFiles.length) setError('Only image files (JPG, PNG, WebP, BMP) are accepted')
    else setError('')
    setFiles(prev => [...prev, ...imgs])
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

  const convert = async () => {
    if (files.length === 0) { setError('Please upload at least one image'); return }
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f))
      const res = await fetch(`${BACKEND_URL}/api/pdf/from-jpg`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'images.pdf'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert images. Please try again.')
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
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📷</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>JPG to PDF</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Combine one or more images into a single PDF document</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>📷</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop images here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Images</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP, BMP · Max 20 MB each · Up to 20 images</div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/bmp" multiple style={{ display:'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div style={{ marginTop:'20px' }}>
            <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'12px', fontWeight:600 }}>
              {files.length} image{files.length !== 1 ? 's' : ''} — each becomes one PDF page (use arrows to reorder)
            </div>
            {files.map((file, idx) => (
              <div key={idx} style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 16px', marginBottom:'8px', display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ fontSize:'13px', fontWeight:700, color:'#94a3b8', width:'24px', textAlign:'center' as const }}>{idx + 1}</span>
                <div style={{ width:'36px', height:'36px', background:'#FEF3C7', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#92400E', fontWeight:700, fontSize:'10px', flexShrink:0 }}>IMG</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
                  <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
                </div>
                <div style={{ display:'flex', gap:'4px' }}>
                  <button onClick={() => moveFile(idx, 'up')} disabled={idx === 0} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px 8px', cursor:idx===0?'not-allowed':'pointer', opacity:idx===0?0.3:1, fontSize:'14px' }}>↑</button>
                  <button onClick={() => moveFile(idx, 'down')} disabled={idx === files.length - 1} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px 8px', cursor:idx===files.length-1?'not-allowed':'pointer', opacity:idx===files.length-1?0.3:1, fontSize:'14px' }}>↓</button>
                  <button onClick={() => removeFile(idx)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Converted successfully! Your PDF download has started.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={files.length === 0 || processing}
            style={{ background: files.length === 0 || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: files.length === 0 || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'240px' }}>
            {processing ? '⏳ Converting…' : `📄 Convert ${files.length > 0 ? files.length : ''} Image${files.length !== 1 ? 's' : ''} to PDF`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Convert Images to PDF</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Upload your images by clicking "Select Images" or dragging them into the area above.','Reorder images using the ↑ ↓ arrows — the order here determines page order in the PDF.','Click "Convert to PDF".','Your PDF downloads automatically with each image on its own page.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Which image formats are supported?', a:'JPG, PNG, WebP, and BMP are all supported. Each image becomes one page in the PDF.' },
            { q:'How many images can I add?', a:'Up to 20 images per conversion, each up to 20 MB.' },
            { q:'Will image quality be preserved?', a:'Yes — images are embedded at their original resolution. No quality is lost during conversion.' },
            { q:'Are my files safe?', a:'Yes. Files are sent over HTTPS and deleted from our server within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="JPG to PDF"
        whatIs="Converting JPG to PDF means turning one or more image files into a single PDF document. Images are great for individual photos, but when you need to send a set of pictures as one organized file — scanned receipts, photographed documents, a portfolio — a PDF is far more practical. A JPG to PDF converter combines your images into a clean, ordered document that's easy to share, print, and archive."
        whatIsExtended="Beyond simple convenience, converting images to PDF solves real problems: PDFs keep pages in order, are universally viewable, and look professional. ConvertDox lets you combine multiple JPGs into one PDF with the pages in your chosen order. Your images are processed securely and deleted within minutes, and the output carries no watermark. The tool also handles PNG and other common image formats, not just JPG."
        howToUse={[
          'Upload one or more image files by clicking the upload area or dragging them in',
          'Arrange the images into the order you want them to appear in the PDF',
          'Choose page options if available (orientation, margins)',
          'Click Convert to combine the images into a single PDF',
          'Download your PDF — ready to share, print, or store',
          'Your uploaded images are automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Scanned Receipts', description: 'Combine photos of receipts into one PDF for expense reports, reimbursement, or tax records.' },
          { title: 'Photographed Documents', description: 'Turn phone photos of a multi-page document into a single, properly ordered PDF.' },
          { title: 'Portfolios', description: 'Compile design work, artwork, or photography into one polished PDF to send to clients.' },
          { title: 'ID and Application Documents', description: 'Combine images of IDs, certificates, or supporting documents into one file for applications.' },
          { title: 'Sharing Photo Sets', description: 'Send a group of related images as one organized document instead of many separate attachments.' },
          { title: 'Creating Simple Booklets', description: 'Turn a series of image pages into a shareable, printable PDF booklet.' },
        ]}
        tips={[
          'Arrange images before converting — the PDF follows the order you set',
          'Name files numerically (01, 02, 03) before uploading for predictable ordering',
          'Higher-resolution images make sharper PDFs but larger files — compress first if size matters',
          'Mixed orientations are fine; each image becomes its own page',
          'Combine with our Compress PDF tool afterward if the result is too large to email',
          'The output has no watermark — it\'s yours to use freely',
        ]}
        faqs={[
          { question: 'Is JPG to PDF free?', answer: 'Yes, completely free with no signup, no watermark, and no limit on how many images you can combine.' },
          { question: 'Can I combine multiple images into one PDF?', answer: 'Yes. Upload several images and they\'ll be combined into a single PDF, one image per page, in the order you arrange them.' },
          { question: 'Does it work with PNG and other formats?', answer: 'Yes. The tool handles JPG, PNG, and other common image formats, not just JPG.' },
          { question: 'Will image quality be reduced?', answer: 'Your images are placed into the PDF at their original quality. The file size depends on the resolution of the images you upload.' },
          { question: 'Are my images private?', answer: 'Yes. Your images are uploaded securely, converted, and automatically deleted from our servers within minutes. We never store or share them.' },
          { question: 'Can I choose the page order?', answer: 'Yes. Arrange the images into your preferred order before converting, and the PDF will follow that sequence.' },
        ]}
        relatedTools={[
          { name: 'PDF to JPG', slug: 'pdf-to-jpg', description: 'Convert PDF pages to JPG images' },
          { name: 'Merge PDF', slug: 'merge-pdf', description: 'Combine multiple PDFs into one file' },
          { name: 'Compress PDF', slug: 'compress-pdf', description: 'Reduce PDF file size for easier sharing' },
          { name: 'Compress Image', slug: 'compress-image', description: 'Reduce image file size before converting' },
          { name: 'PNG to PDF', slug: 'png-to-pdf', description: 'Convert PNG images to PDF' },
        ]}
      />
    </div>
  )
}

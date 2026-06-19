'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/bmp', 'image/gif']
const FORMATS = ['jpg', 'png', 'webp', 'avif'] as const
type Format = typeof FORMATS[number]

export default function ImageConvertPage() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<Format>('webp')
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type) && !f.name.match(/\.(jpe?g|png|webp|avif|bmp|gif)$/i)) {
      setError('Only image files are accepted (JPG, PNG, WebP, AVIF, BMP, GIF)'); return
    }
    setFile(f); setError(''); setSuccess(false)
  }

  const convert = async () => {
    if (!file) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('format', format)
      const res = await fetch(`${BACKEND_URL}/api/image/convert`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `converted.${format}`
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const fmt = (b: number) => b < 1_048_576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1_048_576).toFixed(1)} MB`

  const formatInfo: Record<Format, string> = {
    jpg: 'Best for photos. Lossy compression. Widely compatible.',
    png: 'Lossless. Supports transparency. Larger file size.',
    webp: 'Modern format. Great compression. Supported in all modern browsers.',
    avif: 'Next-gen format. Excellent quality at tiny sizes. Limited compatibility.',
  }

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>↔</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Convert Image Format</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert between JPG, PNG, WebP, and AVIF formats</p>
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
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>↔</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your image here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select Image</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>JPG, PNG, WebP, AVIF, BMP, GIF · Max 20 MB</div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#FEF3C7', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#92400E', fontWeight:700, fontSize:'10px', flexShrink:0 }}>IMG</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        <div style={{ marginTop:'24px' }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'12px' }}>Convert to:</div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' as const }}>
            {FORMATS.map(f => (
              <button key={f} onClick={() => setFormat(f)}
                style={{ flex:1, minWidth:'100px', padding:'14px 10px', borderRadius:'12px', border:'2px solid', borderColor: format === f ? '#E85D04' : '#e2e8f0', background: format === f ? '#FFF7ED' : 'white', cursor:'pointer', textAlign:'center' as const, transition:'all 0.15s' }}>
                <div style={{ fontSize:'15px', fontWeight:800, color: format === f ? '#E85D04' : '#0F2A4A', marginBottom:'4px' }}>{f.toUpperCase()}</div>
                <div style={{ fontSize:'11px', color:'#64748b', lineHeight:'1.4' }}>{formatInfo[f]}</div>
              </button>
            ))}
          </div>
        </div>

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Converted to {format.toUpperCase()}! Your download has started.</div>}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'240px' }}>
            {processing ? '⏳ Converting…' : `↔ Convert to ${format.toUpperCase()}`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Which format should I choose?', a:'WebP is usually the best choice — it offers excellent compression and is supported in all modern browsers. Use PNG for transparency, JPG for maximum compatibility, AVIF for cutting-edge size reduction.' },
            { q:'Will quality be lost?', a:'JPG and WebP conversions are lossy by default — some quality loss is expected. PNG is lossless. AVIF offers excellent lossy compression.' },
            { q:'Is there a file size limit?', a:'Yes, images up to 20 MB are supported.' },
            { q:'Are my files kept private?', a:'Yes. Files are sent over HTTPS and deleted within 1 hour.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="Image Converter"
        whatIs="An image converter changes a picture from one file format to another — for example JPG to PNG, PNG to WebP, or HEIC to JPG. Different formats are good at different things: JPG is small and universal for photos, PNG supports transparency and sharp graphics, and WebP and AVIF are modern formats that offer excellent quality at much smaller sizes. Converting lets you use the right format for the job, or change a file into something a particular app or website will accept."
        whatIsExtended="Choosing the right format matters more than people realize. JPG is ideal for photographs where small size matters. PNG is best for logos, screenshots, and anything needing transparency. WebP and AVIF deliver the same quality as JPG or PNG at a fraction of the size, which is why modern websites prefer them. ConvertDox converts between all of these formats in your browser-facing workflow, processing securely and deleting your file within minutes, with no watermark."
        howToUse={[
          'Upload the image you want to convert by clicking the upload area or dragging it in',
          'Choose the output format — JPG, PNG, WebP, or AVIF',
          'Adjust quality settings if available',
          'Convert the image to the new format',
          'Download the converted file, ready to use',
          'Your original file is automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Web Optimization', description: 'Convert JPG or PNG images to WebP or AVIF to make your website load faster without losing quality.' },
          { title: 'Adding Transparency', description: 'Convert a JPG to PNG when you need a transparent background for a logo or graphic.' },
          { title: 'Compatibility', description: 'Convert HEIC or WebP images to JPG so they open in apps that don\'t support newer formats.' },
          { title: 'Smaller Photos', description: 'Convert large PNG photos to JPG or WebP to dramatically reduce file size.' },
          { title: 'Print Preparation', description: 'Convert images to a format your print service requires.' },
          { title: 'Platform Requirements', description: 'Switch to the format a specific website, app, or upload form will accept.' },
        ]}
        tips={[
          'Use JPG for photos, PNG for graphics with text or transparency, WebP/AVIF for the web',
          'Converting PNG photos to JPG or WebP usually shrinks them a lot',
          'WebP and AVIF give the best size-to-quality ratio but aren\'t supported everywhere — use JPG for maximum compatibility',
          'Converting from a lossy format (JPG) to a lossless one (PNG) won\'t restore lost detail',
          'Check the output before relying on it for important uses',
          'Combine conversion with our compressor for the smallest final file',
        ]}
        faqs={[
          { question: 'Is the image converter free?', answer: 'Yes, completely free with no signup and no watermark added to your images.' },
          { question: 'Which formats can I convert between?', answer: 'You can convert between JPG, PNG, WebP, and AVIF. For HEIC files specifically, our HEIC to JPG tool is purpose-built.' },
          { question: 'Which format should I choose?', answer: 'Use JPG for photos and broad compatibility, PNG for graphics and transparency, and WebP or AVIF for the smallest size on modern websites.' },
          { question: 'Will converting reduce quality?', answer: 'Converting to a lossy format like JPG involves some compression. Converting to PNG is lossless but produces larger files. The tool aims to preserve quality.' },
          { question: 'Are my images private?', answer: 'Yes. Your image is uploaded securely, converted, and automatically deleted from our servers within minutes. We never store or share your files.' },
          { question: 'Can I convert many images at once?', answer: 'For multiple files, use our Batch Image Converter to convert them together.' },
        ]}
        relatedTools={[
          { name: 'HEIC to JPG', slug: 'heic-to-jpg', description: 'Convert iPhone HEIC photos to JPG' },
          { name: 'Compress Image', slug: 'compress-image', description: 'Reduce image file size' },
          { name: 'WebP to JPG', slug: 'webp-to-jpg', description: 'Convert WebP images to JPG' },
          { name: 'SVG to PNG', slug: 'svg-to-png', description: 'Convert SVG vector images to PNG' },
          { name: 'Resize Image', slug: 'resize-image', description: 'Change image dimensions' },
        ]}
      />
    </div>
  )
}

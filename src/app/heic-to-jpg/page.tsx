'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import FileAutoDeletedNotice from '@/components/FileAutoDeletedNotice'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function HeicToJpgPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    const name = f.name.toLowerCase()
    if (!name.endsWith('.heic') && !name.endsWith('.heif')) {
      setError('Only HEIC/HEIF files are accepted'); return
    }
    setFile(f); setError(''); setSuccess(false)
  }

  const convert = async () => {
    if (!file) return
    setProcessing(true); setError(''); setSuccess(false)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch(`${BACKEND_URL}/api/image/heic-to-jpg`, { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
        throw new Error(data.error ?? `Server error: ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'converted.jpg'
      document.body.appendChild(a); a.click()
      URL.revokeObjectURL(url); document.body.removeChild(a)
      setSuccess(true); setFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert. Please try again.')
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
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>📱</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>HEIC to JPG Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Convert iPhone HEIC photos to JPG — universally compatible format</p>
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
        <div style={{ background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:'12px', padding:'14px 18px' }}>
          <div style={{ fontSize:'14px', fontWeight:700, color:'#1E40AF', marginBottom:'4px' }}>📱 Why iPhones use HEIC</div>
          <div style={{ fontSize:'13px', color:'#1E3A8A', lineHeight:'1.6' }}>
            HEIC (High Efficiency Image Container) takes up half the space of JPG with the same quality — great for phone storage. However, Windows, Android, and many apps don&apos;t support HEIC natively. Converting to JPG makes photos universally viewable.
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'16px auto 0', padding:'0 24px' }}>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#E85D04'; (e.currentTarget as HTMLDivElement).style.background='#FFF7ED' }}
          onDragLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc' }}
          onDrop={e => { e.preventDefault(); (e.currentTarget as HTMLDivElement).style.borderColor='#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background='#f8fafc'; handleFile(e.dataTransfer.files[0] ?? null) }}
          style={{ background:'#f8fafc', border:'2px dashed #cbd5e1', borderRadius:'16px', padding:'48px 24px', textAlign:'center' as const, cursor:'pointer', transition:'all 0.2s' }}>
          <div style={{ fontSize:'56px', marginBottom:'12px' }}>📱</div>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'20px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }}>Drop your HEIC file here</div>
          <div style={{ fontSize:'14px', color:'#64748b', marginBottom:'18px' }}>or click to browse from your computer</div>
          <button style={{ background:'#E85D04', color:'white', padding:'12px 32px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Select HEIC File</button>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px' }}>.heic / .heif files only · Max 50 MB</div>
          <input ref={fileInputRef} type="file" accept=".heic,.heif" style={{ display:'none' }} onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        </div>

        {file && (
          <div style={{ marginTop:'20px', background:'white', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'40px', height:'40px', background:'#EFF6FF', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>📱</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{file.name}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8' }}>{fmt(file.size)}</div>
            </div>
            <button onClick={() => setFile(null)} style={{ background:'#FEE2E2', color:'#DC2626', border:'none', borderRadius:'6px', padding:'4px 10px', cursor:'pointer', fontWeight:700, fontSize:'16px' }}>×</button>
          </div>
        )}

        {error && <div style={{ marginTop:'16px', background:'#FEE2E2', border:'1.5px solid #FCA5A5', borderRadius:'10px', padding:'12px 16px', color:'#991B1B', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}
        {success && <div style={{ marginTop:'16px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', padding:'12px 16px', color:'#166534', fontSize:'14px', fontWeight:600 }}>✅ Converted! Your converted.jpg has downloaded.</div>}
        {success && <FileAutoDeletedNotice />}

        <div style={{ marginTop:'24px', textAlign:'center' as const }}>
          <button onClick={convert} disabled={!file || processing}
            style={{ background: !file || processing ? '#cbd5e1' : '#E85D04', color:'white', padding:'16px 48px', borderRadius:'12px', border:'none', fontSize:'16px', fontWeight:700, cursor: !file || processing ? 'not-allowed' : 'pointer', fontFamily:'inherit', minWidth:'260px' }}>
            {processing ? '⏳ Converting…' : '📱 Convert HEIC to JPG'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'48px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Convert HEIC to JPG</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['AirDrop or transfer your HEIC photo from iPhone to your computer.','Upload the .heic file here.','Click "Convert HEIC to JPG" — conversion happens on our server.','Download the JPG and use it anywhere.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'Will quality be lost in the conversion?', a:'Minimal quality loss. HEIC uses more efficient compression than JPG. The converted JPG will be slightly larger in file size but visually near-identical at high quality settings.' },
            { q:'Can I convert multiple HEIC files at once?', a:'Currently single-file conversion is supported. For batch conversion, try our Batch Convert Images tool.' },
            { q:'Why can\'t Windows open HEIC files?', a:'HEIC requires the HEVC codec which is not included in Windows by default. Converting to JPG is the easiest solution for cross-platform compatibility.' },
            { q:'Is there a file size limit?', a:'HEIC files up to 50 MB are supported.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <ToolPageSEO
        toolName="HEIC to JPG"
        whatIs="HEIC is the image format iPhones use by default to save photos — it stores high quality in a small file. The problem is that HEIC isn't widely supported outside Apple devices: many Windows PCs, websites, and apps can't open it. Converting HEIC to JPG turns your iPhone photos into the universal JPG format that works everywhere, so you can share, upload, edit, and view them on any device without compatibility issues."
        whatIsExtended="If you've ever emailed an iPhone photo to someone on Windows and they couldn't open it, HEIC was the reason. Apple adopted HEIC because it saves space while keeping quality, but the rest of the world still runs on JPG. ConvertDox converts HEIC (and HEIF) files to clean JPG images, preserving the quality of your photos. Files are processed securely and deleted within minutes, with no watermark — so you can convert personal photos with confidence."
        howToUse={[
          'Upload your HEIC photo by clicking the upload area or dragging it in',
          'Wait while the file uploads and converts',
          'The tool turns the HEIC image into a standard JPG',
          'Adjust quality if the option is available',
          'Download your JPG, ready to use on any device or platform',
          'Your original file is automatically deleted from our servers within minutes',
        ]}
        useCases={[
          { title: 'Sharing With Windows Users', description: 'Convert iPhone photos to JPG so friends, family, or colleagues on Windows can open them without special software.' },
          { title: 'Uploading to Websites', description: 'Many sites and forms reject HEIC. Convert to JPG so your photos upload successfully.' },
          { title: 'Editing in Any App', description: 'Get your photos into JPG so they open in any image editor, not just Apple apps.' },
          { title: 'Printing Photos', description: 'Print services often require JPG. Convert your iPhone photos before ordering prints.' },
          { title: 'Posting Online', description: 'Convert to JPG for platforms and forums that don\'t accept HEIC uploads.' },
          { title: 'Long-Term Storage', description: 'Save photos in the universal JPG format so they stay openable on any future device.' },
        ]}
        tips={[
          'You can stop the problem at the source: set your iPhone to capture in "Most Compatible" (JPG) under Camera settings',
          'JPG files are slightly larger than HEIC but work everywhere',
          'Convert before sharing important photos so the recipient can definitely open them',
          'Quality is preserved in conversion — your JPG looks the same as the HEIC original',
          'For many photos at once, convert in batches to save time',
          'Keep the HEIC originals if you want to preserve the smaller file size on your own device',
        ]}
        faqs={[
          { question: 'Is HEIC to JPG free?', answer: 'Yes, completely free with no signup and no watermark added to your photos.' },
          { question: 'Why won\'t my iPhone photos open on Windows?', answer: 'iPhones save photos as HEIC by default, which many Windows PCs and apps can\'t read. Converting to JPG fixes this — JPG opens on virtually any device.' },
          { question: 'Will I lose quality converting HEIC to JPG?', answer: 'The conversion preserves your photo\'s quality. JPG files are slightly larger than HEIC but look the same and work everywhere.' },
          { question: 'Can I stop my iPhone saving as HEIC?', answer: 'Yes. Go to Settings > Camera > Formats and choose "Most Compatible" to capture photos as JPG instead of HEIC.' },
          { question: 'Are my photos private?', answer: 'Yes. Your photo is uploaded securely, converted, and automatically deleted from our servers within minutes. We never store, view, or share your images.' },
          { question: 'Does it work with HEIF files too?', answer: 'Yes. HEIF files (closely related to HEIC) are also supported and convert to JPG the same way.' },
        ]}
        relatedTools={[
          { name: 'Image Converter', slug: 'image-convert', description: 'Convert between JPG, PNG, WebP, and AVIF' },
          { name: 'Compress Image', slug: 'compress-image', description: 'Reduce image file size' },
          { name: 'Resize Image', slug: 'resize-image', description: 'Change image dimensions' },
          { name: 'WebP to JPG', slug: 'webp-to-jpg', description: 'Convert WebP images to JPG' },
          { name: 'JPG to PDF', slug: 'jpg-to-pdf', description: 'Combine images into a PDF' },
        ]}
      />
    </div>
  )
}

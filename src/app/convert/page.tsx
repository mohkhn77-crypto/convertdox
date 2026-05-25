'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

interface FileInfo {
  name: string
  size: number
  type: string
  lastModified: number
}

interface FormatOption {
  id: string
  name: string
  desc: string
  color: string
  icon: string
  available: boolean
  href?: string
}

const FORMAT_OPTIONS: Record<string, FormatOption[]> = {
  pdf: [
    { id:'word',  name:'Word',       desc:'.docx file',     color:'#2B579A', icon:'W',   available:false },
    { id:'excel', name:'Excel',      desc:'.xlsx file',     color:'#217346', icon:'X',   available:false },
    { id:'jpg',   name:'JPG',        desc:'Image format',   color:'#F59E0B', icon:'J',   available:false },
    { id:'png',   name:'PNG',        desc:'With transparency', color:'#64748b', icon:'P', available:false },
    { id:'pptx',  name:'PowerPoint', desc:'.pptx file',     color:'#D24726', icon:'PP',  available:false },
  ],
  image: [
    { id:'base64', name:'Base64',  desc:'Encoded text',      color:'#9333EA', icon:'B64', available:true, href:'/image-to-base64' },
    { id:'jpg',    name:'JPG',     desc:'Standard image',    color:'#F59E0B', icon:'J',   available:false },
    { id:'png',    name:'PNG',     desc:'With transparency', color:'#64748b', icon:'P',   available:false },
    { id:'webp',   name:'WebP',    desc:'Modern format',     color:'#10B981', icon:'W',   available:false },
    { id:'pdf',    name:'PDF',     desc:'Document',          color:'#DC2626', icon:'PDF', available:false },
  ],
  document: [
    { id:'pdf',  name:'PDF',  desc:'Standard PDF', color:'#DC2626', icon:'PDF', available:false },
    { id:'txt',  name:'Text', desc:'Plain text',   color:'#64748b', icon:'T',   available:false },
    { id:'html', name:'HTML', desc:'Web format',   color:'#F59E0B', icon:'H',   available:false },
  ],
  spreadsheet: [
    { id:'pdf',  name:'PDF',  desc:'Standard PDF',     color:'#DC2626', icon:'PDF', available:false },
    { id:'csv',  name:'CSV',  desc:'Comma separated',  color:'#0EA5E9', icon:'CSV', available:false },
    { id:'json', name:'JSON', desc:'Data format',      color:'#16A34A', icon:'{}',  available:false },
  ],
  text: [
    { id:'json-format', name:'Format JSON',    desc:'Beautify JSON',    color:'#16A34A', icon:'{}',  available:true, href:'/json-formatter' },
    { id:'csv-json',    name:'CSV to JSON',    desc:'Convert format',   color:'#0EA5E9', icon:'CSV', available:true, href:'/csv-to-json' },
    { id:'count',       name:'Word Count',     desc:'Count words',      color:'#9333EA', icon:'W',   available:true, href:'/word-counter' },
    { id:'base64',      name:'Base64 Encode',  desc:'Encode text',      color:'#F59E0B', icon:'B64', available:true, href:'/base64-encoder' },
  ],
  other: [
    { id:'word',  name:'Word Counter',    desc:'Count words',     color:'#9333EA', icon:'W',   available:true, href:'/word-counter' },
    { id:'b64',   name:'Base64 Encode',   desc:'Encode file',     color:'#F59E0B', icon:'B64', available:true, href:'/base64-encoder' },
  ],
}

function ConvertContent() {
  const searchParams = useSearchParams()
  const fileType = searchParams.get('type') ?? 'pdf'
  const fileExt  = searchParams.get('ext')  ?? 'pdf'

  const [fileInfo, setFileInfo]           = useState<FileInfo | null>(null)
  const [selectedFormat, setSelectedFormat] = useState('')

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('convertdox-uploaded-file')
      if (s) setFileInfo(JSON.parse(s) as FileInfo)
    } catch { /* ignore */ }
  }, [])

  const options = FORMAT_OPTIONS[fileType] ?? FORMAT_OPTIONS.pdf
  const fileSizeMB = fileInfo ? (fileInfo.size / 1024 / 1024).toFixed(2) : '0'

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ maxWidth:'760px', margin:'0 auto', padding:'40px 24px' }}>

        <a href="/" style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#64748b', textDecoration:'none', marginBottom:'20px', fontWeight:500 }}>
          ← Back to home
        </a>

        {/* File info card */}
        {fileInfo && (
          <div style={{ background:'white', border:'1px solid #e2e8f0', borderRadius:'14px', padding:'16px 20px', display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
            <div style={{ width:'44px', height:'44px', background:'#FEE2E2', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', color:'#DC2626', fontWeight:700, fontSize:'11px', flexShrink:0 }}>
              {fileExt.toUpperCase()}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#0F2A4A', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{fileInfo.name}</div>
              <div style={{ fontSize:'12px', color:'#64748b' }}>{fileSizeMB} MB · Ready to convert</div>
            </div>
            <div style={{ background:'#F0FDF4', color:'#166534', padding:'5px 12px', borderRadius:'999px', fontSize:'12px', fontWeight:700, whiteSpace:'nowrap' as const }}>✓ Uploaded</div>
          </div>
        )}

        {/* Heading */}
        <div style={{ textAlign:'center' as const, marginBottom:'24px' }}>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'6px' }}>Great Job! 🎉</div>
          <div style={{ fontSize:'15px', color:'#64748b' }}>Which format do you want to convert to?</div>
        </div>

        {/* Format grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'12px', marginBottom:'24px' }}>
          {options.map(opt => (
            <div key={opt.id}
              onClick={() => { if (opt.available) { if (opt.href) window.location.href = opt.href; else setSelectedFormat(opt.id) } }}
              style={{
                background: selectedFormat === opt.id ? '#FFF7ED' : 'white',
                border: selectedFormat === opt.id ? '2px solid #E85D04' : '1.5px solid #e2e8f0',
                borderRadius:'12px', padding:'18px 12px', textAlign:'center' as const,
                cursor: opt.available ? 'pointer' : 'not-allowed',
                opacity: opt.available ? 1 : 0.55,
                position:'relative' as const, transition:'all 0.15s'
              }}>
              {!opt.available && (
                <span style={{ position:'absolute' as const, top:'7px', right:'7px', background:'#FEF3C7', color:'#92400E', fontSize:'9px', padding:'2px 5px', borderRadius:'3px', fontWeight:700 }}>SOON</span>
              )}
              <div style={{ width:'40px', height:'40px', background:opt.color, borderRadius:'9px', margin:'0 auto 9px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'12px' }}>{opt.icon}</div>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'3px' }}>{opt.name}</div>
              <div style={{ fontSize:'11px', color:'#64748b' }}>{opt.desc}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
          <a href="/" style={{ background:'white', color:'#0F2A4A', padding:'11px 28px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontWeight:600, textDecoration:'none' }}>Cancel</a>
          <button
            disabled={!selectedFormat}
            onClick={() => alert('Full conversion is coming in Phase 3!')}
            style={{ background: selectedFormat ? '#E85D04' : '#e2e8f0', color: selectedFormat ? 'white' : '#94a3b8', padding:'11px 28px', borderRadius:'10px', border:'none', fontSize:'14px', fontWeight:700, cursor: selectedFormat ? 'pointer' : 'not-allowed', fontFamily:'inherit' }}>
            Convert &amp; Download →
          </button>
        </div>

        {/* Available tools hint */}
        <div style={{ background:'white', border:'1px solid #e2e8f0', borderRadius:'14px', padding:'20px', marginTop:'32px' }}>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'15px', fontWeight:700, color:'#0F2A4A', marginBottom:'10px' }}>
            💡 Available now for {fileExt.toUpperCase()} files
          </div>
          <div style={{ display:'flex', flexWrap:'wrap' as const, gap:'8px' }}>
            {fileType === 'image' && <>
              <a href="/image-to-base64" style={{ background:'#FFF7ED', color:'#E85D04', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>Image to Base64 →</a>
              <a href="/favicon-generator" style={{ background:'#FFF7ED', color:'#E85D04', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>Favicon Generator →</a>
            </>}
            {fileType === 'text' && <>
              <a href="/word-counter" style={{ background:'#FFF7ED', color:'#E85D04', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>Word Counter →</a>
              <a href="/json-formatter" style={{ background:'#FFF7ED', color:'#E85D04', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>JSON Formatter →</a>
              <a href="/csv-to-json" style={{ background:'#FFF7ED', color:'#E85D04', padding:'7px 14px', borderRadius:'999px', fontSize:'12px', fontWeight:600, textDecoration:'none' }}>CSV to JSON →</a>
            </>}
            {(fileType === 'pdf' || fileType === 'document' || fileType === 'spreadsheet' || fileType === 'presentation') && (
              <span style={{ fontSize:'12px', color:'#94a3b8' }}>PDF processing tools coming in Phase 3. Check back soon!</span>
            )}
          </div>
        </div>

      </div>

      <SiteFooter />
    </div>
  )
}

export default function ConvertPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", color:'#64748b' }}>
        Loading...
      </div>
    }>
      <ConvertContent />
    </Suspense>
  )
}

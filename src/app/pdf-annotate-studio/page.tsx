'use client'
import dynamic from 'next/dynamic'
import NavBar from '@/components/NavBar'

// pdfjs + pdf-lib are browser-only — load the annotator with SSR disabled
const PdfAnnotator = dynamic(() => import('@/components/PdfAnnotator/PdfAnnotator'), { ssr: false })

export default function PdfAnnotateStudioPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '40px 24px 32px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: 'white', margin: 0 }}>PDF Annotator <span style={{ fontSize: '13px', fontWeight: 700, background: 'rgba(232,93,4,0.25)', color: '#F48C42', padding: '3px 10px', borderRadius: '999px', verticalAlign: 'middle' }}>Beta</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Draw on your PDF and download it — runs in your browser, nothing uploaded</p>
        </div>
      </div>
      <div style={{ padding: '24px 0 60px' }}>
        <PdfAnnotator />
      </div>
    </div>
  )
}

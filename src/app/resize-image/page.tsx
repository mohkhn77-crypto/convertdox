'use client'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

export default function ComingSoonPage() {
  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ maxWidth:'560px', margin:'80px auto', padding:'0 24px', textAlign:'center' as const }}>
        <div style={{ fontSize:'64px', marginBottom:'20px' }}>🚧</div>
        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'30px', fontWeight:800, color:'#0F2A4A', marginBottom:'10px' }}>
          Resize Image — Coming Soon!
        </h1>
        <p style={{ fontSize:'15px', color:'#64748b', lineHeight:'1.6', marginBottom:'24px' }}>
          We are building Resize Image right now. This tool requires backend processing and will launch in our next release. In the meantime, explore our 105 free browser-based tools.
        </p>
        <a href="/" style={{ background:'#E85D04', color:'white', padding:'12px 28px', borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'14px', display:'inline-block' }}>
          Browse 105 Free Tools →
        </a>
        <div style={{ marginTop:'28px', padding:'16px', background:'#FFF7ED', borderRadius:'12px', fontSize:'13px', color:'#92400E' }}>
          💡 Want to be notified when this launches?{' '}
          <a href="/contact" style={{ color:'#E85D04', fontWeight:700 }}>Contact us</a>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

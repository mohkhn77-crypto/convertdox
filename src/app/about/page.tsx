/*
  ConvertDox — About Page
  PUT IN: src/app/about/page.tsx
  URL: convertdox.com/about
  
  IMPORTANT: Google AdSense requires an About page.
  This page shows who you are and what your site does.
*/
'use client'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'64px 24px',textAlign:'center' }}>
        <div style={{ maxWidth:'640px',margin:'0 auto' }}>
          <div style={{ width:'72px',height:'72px',background:'rgba(232,93,4,0.2)',borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:'36px' }}>📄</div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,48px)',fontWeight:800,color:'white',margin:'0 0 16px' }}>
            About ConvertDox
          </h1>
          <p style={{ fontSize:'17px',color:'rgba(255,255,255,0.7)',lineHeight:'1.7',margin:0 }}>
            ConvertDox is a free online tool platform built for everyone — no sign-up required, no hidden fees, no data stored.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:'860px',margin:'0 auto',padding:'56px 24px' }}>

        {/* Mission */}
        <div style={{ textAlign:'center',marginBottom:'48px' }}>
          <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>Our Mission</div>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(22px,3vw,32px)',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>
            Every Online Tool You Need — Free, Fast, Private
          </h2>
          <p style={{ fontSize:'16px',color:'#64748b',lineHeight:'1.8',maxWidth:'600px',margin:'0 auto' }}>
            We believe powerful productivity tools should be accessible to everyone. ConvertDox provides 20+ free tools — from PDF conversion to calculators to developer utilities — with no sign-up, no ads interrupting your work, and no permanent storage of your files.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'48px' }}>
          {[
            { num:'20+', label:'Free Tools', icon:'🛠' },
            { num:'200+', label:'Coming Soon', icon:'🚀' },
            { num:'$0', label:'Cost to Use', icon:'💚' },
            { num:'0', label:'Files Stored', icon:'🔒' },
          ].map(s => (
            <div key={s.label} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'20px',textAlign:'center',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
              <div style={{ fontSize:'28px',marginBottom:'8px' }}>{s.icon}</div>
              <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A' }}>{s.num}</div>
              <div style={{ fontSize:'13px',color:'#64748b',marginTop:'4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* What we offer */}
        <div style={{ marginBottom:'48px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'24px',fontWeight:800,color:'#0F2A4A',marginBottom:'20px' }}>What ConvertDox Offers</h2>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px' }}>
            {[
              { icon:'📝', title:'Text Tools', desc:'Word Counter, Text Case Converter, Lorem Ipsum Generator, Markdown Editor' },
              { icon:'🔢', title:'Calculators', desc:'BMI, Tip, Percentage, Age, Discount, Unit Converter' },
              { icon:'💻', title:'Developer Tools', desc:'JSON Formatter, Base64 Encoder, URL Encoder, CSS Gradient Generator' },
              { icon:'📱', title:'QR & Utilities', desc:'QR Code Generator, Password Generator, Random Number Generator' },
              { icon:'🎲', title:'Fun Tools', desc:'Coin Flip, Dice Roller, Stopwatch, Countdown Timer' },
              { icon:'📄', title:'Coming Soon', desc:'PDF Converter, Image Compressor, Background Remover, AI Tools' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'18px',display:'flex',gap:'12px' }}>
                <div style={{ width:'40px',height:'40px',background:'#FFF7ED',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                  <div style={{ fontSize:'12.5px',color:'#94a3b8',lineHeight:'1.5' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy commitment */}
        <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'20px',padding:'32px',marginBottom:'48px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'24px',fontWeight:800,color:'white',marginBottom:'16px' }}>
            🔒 Our Privacy Commitment
          </h2>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            {[
              '✅ Files are never permanently stored',
              '✅ No sign-up required for most tools',
              '✅ HTTPS encryption on all transfers',
              '✅ No selling of user data',
              '✅ Auto-deletion after processing',
              '✅ GDPR & CCPA compliant practices',
            ].map(item => (
              <div key={item} style={{ fontSize:'14px',color:'rgba(255,255,255,0.85)',padding:'4px 0' }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ textAlign:'center',background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'36px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',marginBottom:'10px' }}>
            Questions or Suggestions?
          </h2>
          <p style={{ fontSize:'15px',color:'#64748b',marginBottom:'20px' }}>
            We'd love to hear from you. Request a tool, report a bug, or just say hello.
          </p>
          <div style={{ display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap' }}>
            <a href="/contact" style={{ background:'#E85D04',color:'white',padding:'12px 28px',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px' }}>
              📨 Contact Us
            </a>
            <a href="/" style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',padding:'12px 28px',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px' }}>
              🛠 Browse All Tools
            </a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

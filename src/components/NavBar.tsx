'use client'
import { useState } from 'react'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px',flexShrink:0 }}>
          <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
            <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
              <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
              <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
              <polygon points="20,20 24,22 20,24" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'#0F2A4A',letterSpacing:'-0.3px' }}>
            Convert<span style={{ color:'#E85D04' }}>Dox</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div style={{ display:'flex',gap:'4px',alignItems:'center' }} className="desktop-nav">
          <style>{`
            @media (max-width: 639px) { .desktop-nav { display: none !important; } .hamburger-btn { display: flex !important; } }
            @media (min-width: 640px) { .hamburger-btn { display: none !important; } }
          `}</style>
          {[
            { label:'Blog', href:'/blog' },
            { label:'About', href:'/about' },
            { label:'Contact', href:'/contact' },
            { label:'Legal', href:'/legal' },
            { label:'← Back to Tools', href:'/' },
          ].map(item => (
            <a key={item.href} href={item.href}
              style={{ padding:'6px 12px',borderRadius:'7px',fontSize:'13px',fontWeight:500,color:'#64748b',textDecoration:'none',whiteSpace:'nowrap' }}>
              {item.label}
            </a>
          ))}
        </div>

        <DarkModeToggle />

        {/* Hamburger button (mobile only) */}
        <button
          className="hamburger-btn"
          onClick={() => setOpen(o => !o)}
          style={{ display:'none',background:'none',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'8px',cursor:'pointer',flexDirection:'column',gap:'4px',alignItems:'center',justifyContent:'center',width:'40px',height:'40px' }}
          aria-label="Toggle menu"
        >
          <span style={{ display:'block',width:'18px',height:'2px',background:'#0F2A4A',borderRadius:'2px',transition:'all 0.2s' }}/>
          <span style={{ display:'block',width:'18px',height:'2px',background:'#0F2A4A',borderRadius:'2px',transition:'all 0.2s' }}/>
          <span style={{ display:'block',width:'18px',height:'2px',background:'#0F2A4A',borderRadius:'2px',transition:'all 0.2s' }}/>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ borderTop:'1px solid #e2e8f0',background:'white',padding:'12px 24px 16px' }}>
          {[
            { label:'← Back to Tools', href:'/' },
            { label:'Blog', href:'/blog' },
            { label:'About', href:'/about' },
            { label:'Contact', href:'/contact' },
            { label:'Legal', href:'/legal' },
          ].map(item => (
            <a key={item.href} href={item.href}
              style={{ display:'block',padding:'10px 0',fontSize:'15px',fontWeight:600,color:'#0F2A4A',textDecoration:'none',borderBottom:'1px solid #f1f5f9' }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

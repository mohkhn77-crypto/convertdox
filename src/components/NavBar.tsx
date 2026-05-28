'use client'
import { useState } from 'react'
import DarkModeToggle from '@/components/DarkModeToggle'

const Logo = () => (
  <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
      <polygon points="20,20 24,22 20,24" fill="white"/>
    </svg>
  </div>
)

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{ position:'sticky',top:0,zIndex:100,background:'white',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 3px rgba(15,42,74,0.04)' }}>
      <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'0 24px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>

        {/* Left: Brand + Menu */}
        <div style={{ display:'flex',alignItems:'center',gap:'28px' }}>
          <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
            <Logo/>
            <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',letterSpacing:'-0.5px' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
          </a>

          {/* Desktop menu */}
          <div style={{ display:'flex',alignItems:'center',gap:'20px' }}>
            {/* Simple links */}
            {[
              { label:'MERGE PDF', href:'/merge-pdf' },
              { label:'SPLIT PDF', href:'/split-pdf' },
              { label:'COMPRESS PDF', href:'/compress-pdf' },
              { label:'ROTATE PDF', href:'/rotate-pdf' },
            ].map(item => (
              <a key={item.href} href={item.href}
                style={{ fontSize:'12px',fontWeight:700,color:'#0F2A4A',textDecoration:'none',textTransform:'uppercase' as const,letterSpacing:'0.5px' }}>
                {item.label}
              </a>
            ))}

            {/* CONVERT PDF dropdown */}
            <div style={{ position:'relative' as const }}
              onMouseEnter={() => setOpenDropdown('convert')}
              onMouseLeave={() => setOpenDropdown(null)}>
              <span style={{ fontSize:'12px',fontWeight:700,color: openDropdown==='convert'?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px' }}>
                CONVERT PDF <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
              </span>
              {openDropdown === 'convert' && (
                <div style={{ position:'absolute' as const,top:'28px',left:'-20px',background:'white',borderRadius:'12px',boxShadow:'0 10px 40px rgba(15,42,74,0.15)',padding:'20px',display:'flex',gap:'36px',minWidth:'900px',zIndex:10 }}>
                  {[
                    { heading:'Convert to PDF', items:[
                      { name:'JPG to PDF', color:'#F59E0B', icon:'📷', href:'/jpg-to-pdf', live:true },
                      { name:'Word to PDF', color:'#2B579A', icon:'W', href:'/word-to-pdf', live:true },
                      { name:'PowerPoint to PDF', color:'#D24726', icon:'P', href:'/ppt-to-pdf', live:true },
                      { name:'Excel to PDF', color:'#217346', icon:'X', href:'/excel-to-pdf', live:true },
                      { name:'HTML to PDF', color:'#F59E0B', icon:'H', href:'/html-to-pdf', live:true },
                    ]},
                    { heading:'Convert from PDF', items:[
                      { name:'PDF to JPG', color:'#F59E0B', icon:'📷', href:'/pdf-to-jpg', live:true },
                      { name:'PDF to Word', color:'#2B579A', icon:'W', href:'/pdf-to-word', live:true },
                      { name:'PDF to PowerPoint', color:'#D24726', icon:'P', href:'/pdf-to-ppt', live:true },
                      { name:'PDF to Excel', color:'#217346', icon:'X', href:'/pdf-to-excel', live:true },
                      { name:'PDF to PDF/A', color:'#64748b', icon:'A', href:'/pdf-to-pdfa', live:true },
                    ]},
                  ].map(col => (
                    <div key={col.heading}>
                      <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>{col.heading}</div>
                      {col.items.map(item => (
                        <a key={item.name} href={item.href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'7px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                          <span style={{ width:'22px',height:'22px',background:item.color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{item.icon}</span>
                          <span style={{ flex:1 }}>{item.name}</span>
                          {!item.live && <span style={{ background:'#FEF3C7',color:'#92400E',fontSize:'9px',padding:'2px 5px',borderRadius:'3px',fontWeight:700 }}>SOON</span>}
                        </a>
                      ))}
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>PDF Tools</div>
                    {[
                      { name:'Unlock PDF', color:'#10B981', icon:'🔓', href:'/unlock-pdf' },
                      { name:'Protect PDF', color:'#0F2A4A', icon:'🔒', href:'/protect-pdf' },
                      { name:'Rotate PDF', color:'#E85D04', icon:'🔄', href:'/rotate-pdf' },
                      { name:'PDF Info', color:'#6366F1', icon:'ℹ', href:'/pdf-info' },
                      { name:'PDF to Text', color:'#0EA5E9', icon:'📝', href:'/pdf-to-text' },
                      { name:'Page Numbers', color:'#F59E0B', icon:'🔢', href:'/pdf-page-numbers' },
                      { name:'Header & Footer', color:'#8B5CF6', icon:'📋', href:'/pdf-header-footer' },
                      { name:'Delete Pages', color:'#EF4444', icon:'🗑', href:'/pdf-delete-pages' },
                      { name:'Reorder Pages', color:'#06B6D4', icon:'🔀', href:'/pdf-reorder-pages' },
                      { name:'Extract Pages', color:'#10B981', icon:'✂', href:'/pdf-extract-pages' },
                      { name:'Sign PDF', color:'#0F2A4A', icon:'✍', href:'/pdf-sign' },
                      { name:'Annotate PDF', color:'#F59E0B', icon:'💬', href:'/pdf-annotate' },
                    ].map(item => (
                      <a key={item.name} href={item.href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'7px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                        <span style={{ width:'22px',height:'22px',background:item.color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{item.icon}</span>
                        <span style={{ flex:1 }}>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* IMAGE TOOLS dropdown */}
            <div style={{ position:'relative' as const }}
              onMouseEnter={() => setOpenDropdown('image')}
              onMouseLeave={() => setOpenDropdown(null)}>
              <span style={{ fontSize:'12px',fontWeight:700,color: openDropdown==='image'?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px' }}>
                IMAGE TOOLS <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
              </span>
              {openDropdown === 'image' && (
                <div style={{ position:'absolute' as const,top:'28px',left:'-20px',background:'white',borderRadius:'12px',boxShadow:'0 10px 40px rgba(15,42,74,0.15)',padding:'20px',minWidth:'240px',zIndex:10 }}>
                  <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>Image Tools</div>
                  {[
                    { name:'Image to Base64', color:'#9333EA', icon:'B', href:'/image-to-base64', live:true },
                    { name:'Compress Image', color:'#0EA5E9', icon:'📐', href:'/compress-image', live:true },
                    { name:'Resize Image', color:'#10B981', icon:'⤢', href:'/resize-image', live:true },
                    { name:'Convert Format', color:'#F59E0B', icon:'↔', href:'/image-convert', live:true },
                    { name:'Crop Image', color:'#E85D04', icon:'✂', href:'/image-crop', live:true },
                    { name:'Rotate Image', color:'#8B5CF6', icon:'🔄', href:'/rotate-image', live:true },
                    { name:'Flip Image', color:'#06B6D4', icon:'⇄', href:'/flip-image', live:true },
                    { name:'Grayscale Image', color:'#64748b', icon:'⚫', href:'/grayscale-image', live:true },
                    { name:'Image Info', color:'#F59E0B', icon:'📊', href:'/image-info', live:true },
                    { name:'Background Remover', color:'#EC4899', icon:'✂', href:'/bg-remove', live:false },
                    { name:'Batch Compress', color:'#0EA5E9', icon:'📦', href:'/compress-images-batch', live:true },
                    { name:'Batch Resize', color:'#10B981', icon:'📦', href:'/resize-images-batch', live:true },
                    { name:'Batch Convert', color:'#F59E0B', icon:'🔄', href:'/convert-images-batch', live:true },
                    { name:'EXIF Stripper', color:'#10B981', icon:'🛡', href:'/exif-stripper', live:true },
                    { name:'Watermark Image', color:'#06B6D4', icon:'💧', href:'/watermark-image', live:true },
                    { name:'Color Picker', color:'#E85D04', icon:'🎨', href:'/image-color-picker', live:true },
                    { name:'Blur Image', color:'#64748b', icon:'🌫', href:'/blur-image', live:true },
                    { name:'HEIC to JPG', color:'#E85D04', icon:'📱', href:'/heic-to-jpg', live:true },
                    { name:'WebP to JPG', color:'#0EA5E9', icon:'🔄', href:'/webp-to-jpg', live:true },
                    { name:'SVG to PNG', color:'#F59E0B', icon:'🎨', href:'/svg-to-png', live:true },
                    { name:'PNG to ICO', color:'#F59E0B', icon:'🌟', href:'/png-to-ico', live:true },
                    { name:'Image to ICO', color:'#E85D04', icon:'⭐', href:'/image-to-ico', live:true },
                    { name:'Add BG to Image', color:'#8B5CF6', icon:'🎨', href:'/add-image-background', live:true },
                  ].map(item => (
                    <a key={item.name} href={item.href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'7px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                      <span style={{ width:'22px',height:'22px',background:item.color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{item.icon}</span>
                      <span style={{ flex:1 }}>{item.name}</span>
                      {!item.live && <span style={{ background:'#FEF3C7',color:'#92400E',fontSize:'9px',padding:'2px 5px',borderRadius:'3px',fontWeight:700 }}>SOON</span>}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* OCR TOOLS dropdown */}
            <div style={{ position:'relative' as const }}
              onMouseEnter={() => setOpenDropdown('ocr')}
              onMouseLeave={() => setOpenDropdown(null)}>
              <span style={{ fontSize:'12px',fontWeight:700,color: openDropdown==='ocr'?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px' }}>
                OCR TOOLS <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
              </span>
              {openDropdown === 'ocr' && (
                <div style={{ position:'absolute' as const,top:'28px',left:'-20px',background:'white',borderRadius:'12px',boxShadow:'0 10px 40px rgba(15,42,74,0.15)',padding:'20px',minWidth:'220px',zIndex:10 }}>
                  <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>OCR Tools</div>
                  {[
                    { name:'Image to Text', color:'#E85D04', icon:'🔤', href:'/image-to-text' },
                    { name:'PDF OCR', color:'#0F2A4A', icon:'📄', href:'/pdf-ocr' },
                  ].map(item => (
                    <a key={item.name} href={item.href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'7px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                      <span style={{ width:'22px',height:'22px',background:item.color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{item.icon}</span>
                      <span style={{ flex:1 }}>{item.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* SPECIALTY dropdown */}
            <div style={{ position:'relative' as const }}
              onMouseEnter={() => setOpenDropdown('specialty')}
              onMouseLeave={() => setOpenDropdown(null)}>
              <span style={{ fontSize:'12px',fontWeight:700,color: openDropdown==='specialty'?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px' }}>
                SPECIALTY <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
              </span>
              {openDropdown === 'specialty' && (
                <div style={{ position:'absolute' as const,top:'28px',left:'-20px',background:'white',borderRadius:'12px',boxShadow:'0 10px 40px rgba(15,42,74,0.15)',padding:'20px',minWidth:'220px',zIndex:10 }}>
                  <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>Specialty Tools</div>
                  {[
                    { name:'Passport Photo', color:'#E85D04', icon:'🛂', href:'/passport-photo' },
                    { name:'Favicon Generator', color:'#F59E0B', icon:'⭐', href:'/favicon-from-image' },
                    { name:'Social Media Crops', color:'#EC4899', icon:'📱', href:'/social-media-crops' },
                    { name:'Instagram Square', color:'#8B5CF6', icon:'📷', href:'/instagram-square' },
                    { name:'QR Reader', color:'#0F2A4A', icon:'📲', href:'/qr-reader' },
                  ].map(item => (
                    <a key={item.name} href={item.href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'7px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                      <span style={{ width:'22px',height:'22px',background:item.color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{item.icon}</span>
                      <span style={{ flex:1 }}>{item.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ALL TOOLS dropdown */}
            <div style={{ position:'relative' as const }}
              onMouseEnter={() => setOpenDropdown('all')}
              onMouseLeave={() => setOpenDropdown(null)}>
              <span style={{ fontSize:'12px',fontWeight:700,color: openDropdown==='all'?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px' }}>
                ALL TOOLS <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
              </span>
              {openDropdown === 'all' && (
                <div style={{ position:'absolute' as const,top:'28px',right:0,background:'white',borderRadius:'12px',boxShadow:'0 10px 40px rgba(15,42,74,0.15)',padding:'20px',minWidth:'280px',zIndex:10 }}>
                  <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'12px' }}>Browse by Category</div>
                  {[
                    { name:'Text Tools', count:'22 tools', icon:'📝', href:'/tools/text' },
                    { name:'Calculators', count:'29 tools', icon:'🧮', href:'/tools/calculators' },
                    { name:'Developer Tools', count:'28 tools', icon:'💻', href:'/tools/developer' },
                    { name:'Color Tools', count:'8 tools', icon:'🎨', href:'/tools/color' },
                    { name:'Security Tools', count:'4 tools', icon:'🔒', href:'/tools/security' },
                    { name:'QR Code Tools', count:'1 tool', icon:'📱', href:'/tools/qr' },
                    { name:'Fun Tools', count:'10 tools', icon:'🎲', href:'/tools/fun' },
                  ].map(item => (
                    <a key={item.href} href={item.href} style={{ display:'flex',alignItems:'center',gap:'10px',padding:'8px 6px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
                      <span style={{ fontSize:'16px' }}>{item.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600,fontSize:'13px' }}>{item.name}</div>
                        <div style={{ fontSize:'11px',color:'#94a3b8' }}>{item.count}</div>
                      </div>
                    </a>
                  ))}
                  <a href="/" style={{ display:'block',marginTop:'8px',padding:'9px',background:'#FFF7ED',color:'#E85D04',textAlign:'center' as const,borderRadius:'8px',fontSize:'13px',fontWeight:700,textDecoration:'none' }}>View all 175+ tools →</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Blog + DarkMode + Login + Pro */}
        <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
          <a href="/blog" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>Blog</a>
          <DarkModeToggle />
          <a href="#" style={{ background:'#E85D04',color:'white',padding:'8px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:700,textDecoration:'none' }}>Get Pro</a>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background:'none',border:'none',cursor:'pointer',padding:'4px',display:'flex',flexDirection:'column' as const,gap:'4px',marginLeft:'4px' }}
            aria-label="Menu">
            <span style={{ width:'22px',height:'2px',background:'#0F2A4A',borderRadius:'2px',display:'block' }}/>
            <span style={{ width:'22px',height:'2px',background:'#0F2A4A',borderRadius:'2px',display:'block' }}/>
            <span style={{ width:'22px',height:'2px',background:'#0F2A4A',borderRadius:'2px',display:'block' }}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background:'white',borderTop:'1px solid #e2e8f0',padding:'16px 24px' }}>
          {[
            { label:'Merge PDF', href:'/merge-pdf' },
            { label:'Split PDF', href:'/split-pdf' },
            { label:'Compress PDF', href:'/compress-pdf' },
            { label:'Image to Base64', href:'/image-to-base64' },
            { label:'All Text Tools', href:'/tools/text' },
            { label:'All Calculators', href:'/tools/calculators' },
            { label:'All Developer Tools', href:'/tools/developer' },
            { label:'Blog', href:'/blog' },
            { label:'About', href:'/about' },
            { label:'Contact', href:'/contact' },
          ].map(item => (
            <a key={item.href} href={item.href} style={{ display:'block',padding:'10px 0',fontSize:'14px',color:'#0F2A4A',textDecoration:'none',fontWeight:600,borderBottom:'1px solid #f1f5f9' }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

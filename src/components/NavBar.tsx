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

type NavItem = { name: string; color: string; icon: string; href: string; live?: boolean }

function Row({ name, color, icon, href, live = true }: NavItem) {
  return (
    <a href={href} style={{ display:'flex',alignItems:'center',gap:'8px',padding:'6px 4px',fontSize:'13px',color:'#0F2A4A',fontWeight:500,textDecoration:'none',borderRadius:'6px' }}>
      <span style={{ width:'20px',height:'20px',background:color,borderRadius:'4px',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'10px',fontWeight:700,flexShrink:0 }}>{icon}</span>
      <span style={{ flex:1 }}>{name}</span>
      {!live && <span style={{ background:'#FEF3C7',color:'#92400E',fontSize:'9px',padding:'2px 5px',borderRadius:'3px',fontWeight:700 }}>SOON</span>}
    </a>
  )
}

function ColHead({ label, mt = false }: { label: string; mt?: boolean }) {
  return <div style={{ fontSize:'10px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'10px',marginTop: mt ? '14px' : '0' }}>{label}</div>
}

function ViewAll({ href, label }: { href: string; label: string }) {
  return <a href={href} style={{ display:'block',marginTop:'10px',padding:'8px',background:'#FFF7ED',color:'#E85D04',textAlign:'center' as const,borderRadius:'8px',fontSize:'12px',fontWeight:700,textDecoration:'none' }}>{label}</a>
}

const PANEL_BASE: React.CSSProperties = {
  position: 'absolute',
  top: '34px',
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 40px rgba(15,42,74,0.15)',
  padding: '20px',
  zIndex: 10,
}

const PDF_OPS: NavItem[] = [
  { name:'Merge PDF',       color:'#E85D04', icon:'⊕', href:'/merge-pdf' },
  { name:'Split PDF',       color:'#F59E0B', icon:'✂', href:'/split-pdf' },
  { name:'Compress PDF',    color:'#10B981', icon:'📦', href:'/compress-pdf' },
  { name:'Rotate PDF',      color:'#8B5CF6', icon:'🔄', href:'/rotate-pdf' },
  { name:'Unlock PDF',      color:'#10B981', icon:'🔓', href:'/unlock-pdf' },
  { name:'Protect PDF',     color:'#0F2A4A', icon:'🔒', href:'/protect-pdf' },
  { name:'Watermark PDF',   color:'#06B6D4', icon:'💧', href:'/watermark-pdf' },
  { name:'Sign PDF',        color:'#0F2A4A', icon:'✍', href:'/pdf-sign' },
  { name:'Annotate PDF',    color:'#F59E0B', icon:'💬', href:'/pdf-annotate' },
  { name:'Page Numbers',    color:'#F59E0B', icon:'🔢', href:'/pdf-page-numbers' },
  { name:'Header & Footer', color:'#8B5CF6', icon:'📋', href:'/pdf-header-footer' },
  { name:'Delete Pages',    color:'#EF4444', icon:'🗑', href:'/pdf-delete-pages' },
  { name:'Reorder Pages',   color:'#06B6D4', icon:'🔀', href:'/pdf-reorder-pages' },
  { name:'Extract Pages',   color:'#10B981', icon:'✂', href:'/pdf-extract-pages' },
]

const PDF_CONVERT: NavItem[] = [
  { name:'PDF to Word',   color:'#2B579A', icon:'W', href:'/pdf-to-word' },
  { name:'PDF to Excel',  color:'#217346', icon:'X', href:'/pdf-to-excel' },
  { name:'PDF to PPT',    color:'#D24726', icon:'P', href:'/pdf-to-ppt' },
  { name:'PDF to JPG',    color:'#F59E0B', icon:'📷', href:'/pdf-to-jpg' },
  { name:'PDF to Text',   color:'#0EA5E9', icon:'📝', href:'/pdf-to-text' },
  { name:'PDF to PDF/A',  color:'#64748b', icon:'A', href:'/pdf-to-pdfa' },
  { name:'Word to PDF',   color:'#2B579A', icon:'W', href:'/word-to-pdf' },
  { name:'Excel to PDF',  color:'#217346', icon:'X', href:'/excel-to-pdf' },
  { name:'PPT to PDF',    color:'#D24726', icon:'P', href:'/ppt-to-pdf' },
  { name:'JPG to PDF',    color:'#F59E0B', icon:'📷', href:'/jpg-to-pdf' },
  { name:'HTML to PDF',   color:'#E85D04', icon:'H', href:'/html-to-pdf' },
]

const IMG_TRANSFORM: NavItem[] = [
  { name:'Compress Image',  color:'#0EA5E9', icon:'📦', href:'/compress-image' },
  { name:'Resize Image',    color:'#10B981', icon:'⤢',  href:'/resize-image' },
  { name:'Crop Image',      color:'#E85D04', icon:'✂',  href:'/image-crop' },
  { name:'Rotate Image',    color:'#8B5CF6', icon:'🔄', href:'/rotate-image' },
  { name:'Flip Image',      color:'#06B6D4', icon:'⇄',  href:'/flip-image' },
  { name:'Grayscale',       color:'#64748b', icon:'⚫', href:'/grayscale-image' },
  { name:'Blur Image',      color:'#64748b', icon:'🌫', href:'/blur-image' },
  { name:'Watermark Image', color:'#06B6D4', icon:'💧', href:'/watermark-image' },
  { name:'EXIF Stripper',   color:'#10B981', icon:'🛡', href:'/exif-stripper' },
  { name:'Color Picker',    color:'#E85D04', icon:'🎨', href:'/image-color-picker' },
]

const IMG_CONVERT: NavItem[] = [
  { name:'Convert Format',  color:'#F59E0B', icon:'↔',  href:'/image-convert' },
  { name:'HEIC to JPG',     color:'#E85D04', icon:'📱', href:'/heic-to-jpg' },
  { name:'WebP to JPG',     color:'#0EA5E9', icon:'🔄', href:'/webp-to-jpg' },
  { name:'SVG to PNG',      color:'#F59E0B', icon:'🎨', href:'/svg-to-png' },
  { name:'PNG to ICO',      color:'#F59E0B', icon:'🌟', href:'/png-to-ico' },
  { name:'Image to ICO',    color:'#E85D04', icon:'⭐', href:'/image-to-ico' },
  { name:'Add Background',  color:'#8B5CF6', icon:'🖼',  href:'/add-image-background' },
  { name:'Image to Base64', color:'#9333EA', icon:'B',  href:'/image-to-base64' },
  { name:'Batch Compress',  color:'#0EA5E9', icon:'📦', href:'/compress-images-batch' },
  { name:'Batch Resize',    color:'#10B981', icon:'📦', href:'/resize-images-batch' },
  { name:'Batch Convert',   color:'#F59E0B', icon:'🔄', href:'/convert-images-batch' },
]

const AI_ITEMS: NavItem[] = [
  { name:'AI Summarizer',   color:'#8B5CF6', icon:'✨', href:'/ai-summarizer',       live:false },
  { name:'Grammar Checker', color:'#10B981', icon:'✓',  href:'/ai-grammar',           live:false },
  { name:'Paraphraser',     color:'#E85D04', icon:'↺',  href:'/ai-paraphraser',       live:false },
  { name:'Resume Improver', color:'#2B579A', icon:'📄', href:'/ai-resume-improver',   live:false },
  { name:'Cover Letter',    color:'#0EA5E9', icon:'📝', href:'/ai-cover-letter',      live:false },
  { name:'Email Writer',    color:'#F59E0B', icon:'✉',  href:'/ai-email-writer',      live:false },
  { name:'AI Translator',   color:'#06B6D4', icon:'🌐', href:'/ai-translator',        live:false },
  { name:'Tone Changer',    color:'#EC4899', icon:'🎭', href:'/ai-tone-changer',      live:false },
]

const DOCS_ITEMS: NavItem[] = [
  { name:'Invoice Generator', color:'#10B981', icon:'🧾', href:'/invoice-generator' },
  { name:'Receipt Generator', color:'#0EA5E9', icon:'🧾', href:'/receipt-generator' },
  { name:'Quote Generator',   color:'#F59E0B', icon:'💬', href:'/quote-generator' },
  { name:'Purchase Order',    color:'#8B5CF6', icon:'📋', href:'/purchase-order-generator' },
  { name:'Letterhead',        color:'#2B579A', icon:'📃', href:'/letterhead-generator' },
  { name:'Resume Builder',    color:'#E85D04', icon:'📄', href:'/resume-builder' },
  { name:'Business Card',     color:'#06B6D4', icon:'🃏', href:'/business-card-generator' },
  { name:'Logo Maker',        color:'#EC4899', icon:'🎨', href:'/logo-maker' },
]

const CALC_HEALTH: NavItem[] = [
  { name:'BMI Calculator',     color:'#10B981', icon:'⚖',  href:'/bmi-calculator' },
  { name:'Age Calculator',     color:'#8B5CF6', icon:'🎂', href:'/age-calculator' },
  { name:'Calorie Calculator', color:'#E85D04', icon:'🔥', href:'/calorie-calculator' },
  { name:'Pregnancy Due Date', color:'#EC4899', icon:'🤱', href:'/pregnancy-due-date-calculator' },
  { name:'Water Intake',       color:'#0EA5E9', icon:'💧', href:'/water-intake' },
]

const CALC_TIME: NavItem[] = [
  { name:'Stopwatch',          color:'#F59E0B', icon:'⏱',  href:'/stopwatch' },
  { name:'Timestamp',          color:'#6366F1', icon:'⏰', href:'/timestamp-converter' },
  { name:'Timezone Converter', color:'#0EA5E9', icon:'🌍', href:'/timezone-converter' },
  { name:'Unit Converter',     color:'#10B981', icon:'📐', href:'/unit-converter' },
]

const CALC_FINANCE: NavItem[] = [
  { name:'Mortgage Calculator', color:'#0F2A4A', icon:'🏠', href:'/mortgage-calculator' },
  { name:'Loan EMI',            color:'#E85D04', icon:'💳', href:'/loan-emi-calculator' },
  { name:'Tip Calculator',      color:'#10B981', icon:'🍽', href:'/tip-calculator' },
  { name:'Percentage',          color:'#8B5CF6', icon:'%',  href:'/percentage-calculator' },
  { name:'Salary Calculator',   color:'#2B579A', icon:'💼', href:'/salary-calculator' },
  { name:'Tax Calculator',      color:'#EF4444', icon:'📊', href:'/tax-calculator' },
  { name:'Retirement',          color:'#F59E0B', icon:'🏦', href:'/retirement-calculator' },
]

const MORE_OCR: NavItem[] = [
  { name:'Image to Text', color:'#E85D04', icon:'🔤', href:'/image-to-text' },
  { name:'PDF OCR',       color:'#0F2A4A', icon:'📄', href:'/pdf-ocr' },
]

const MORE_SPECIALTY: NavItem[] = [
  { name:'Passport Photo',    color:'#E85D04', icon:'🛂', href:'/passport-photo' },
  { name:'Favicon Generator', color:'#F59E0B', icon:'⭐', href:'/favicon-from-image' },
  { name:'Social Media Crops',color:'#EC4899', icon:'📱', href:'/social-media-crops' },
  { name:'Instagram Square',  color:'#8B5CF6', icon:'📷', href:'/instagram-square' },
  { name:'QR Reader',         color:'#0F2A4A', icon:'📲', href:'/qr-reader' },
]

const MORE_TEXT: NavItem[] = [
  { name:'Word Counter',   color:'#0EA5E9', icon:'📝', href:'/word-counter' },
  { name:'Text Diff',      color:'#10B981', icon:'⊕',  href:'/text-diff' },
  { name:'Slug Generator', color:'#8B5CF6', icon:'🔗', href:'/slug-generator' },
  { name:'Case Converter', color:'#F59E0B', icon:'Aa', href:'/text-case-converter' },
]

const MORE_UTILITY: NavItem[] = [
  { name:'YouTube Thumbnail',   color:'#EF4444', icon:'▶',  href:'/youtube-thumbnail' },
  { name:'PDF Page Count',      color:'#6366F1', icon:'🔢', href:'/pdf-page-counter' },
  { name:'QR Generator',        color:'#0F2A4A', icon:'📱', href:'/qr-generator' },
  { name:'Meta Description',    color:'#F59E0B', icon:'🏷',  href:'/meta-description-generator' },
]

export default function NavBar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  const trigger = (id: string, label: string, badge?: string): React.ReactNode => (
    <span style={{ fontSize:'12px',fontWeight:700,color: open===id?'#E85D04':'#0F2A4A',cursor:'pointer',textTransform:'uppercase' as const,letterSpacing:'0.5px',display:'inline-flex',alignItems:'center',gap:'4px',whiteSpace:'nowrap' as const }}>
      {label}
      {badge && <span style={{ background:'#E85D04',color:'white',fontSize:'8px',padding:'1px 4px',borderRadius:'3px',fontWeight:700 }}>{badge}</span>}
      <span style={{ fontSize:'9px',opacity:0.6 }}>▼</span>
    </span>
  )

  const mobileSections = [
    { key:'pdf', title:'PDF Tools', links:[
      {label:'Merge PDF',href:'/merge-pdf'},{label:'Split PDF',href:'/split-pdf'},
      {label:'Compress PDF',href:'/compress-pdf'},{label:'PDF to Word',href:'/pdf-to-word'},
      {label:'Word to PDF',href:'/word-to-pdf'},{label:'Unlock PDF',href:'/unlock-pdf'},
      {label:'Sign PDF',href:'/pdf-sign'},{label:'Annotate PDF',href:'/pdf-annotate'},
    ]},
    { key:'img', title:'Image Tools', links:[
      {label:'Compress Image',href:'/compress-image'},{label:'Resize Image',href:'/resize-image'},
      {label:'Crop Image',href:'/image-crop'},{label:'Convert Format',href:'/image-convert'},
      {label:'EXIF Stripper',href:'/exif-stripper'},{label:'HEIC to JPG',href:'/heic-to-jpg'},
    ]},
    { key:'ai', title:'AI Tools', links:[
      {label:'AI Summarizer',href:'/ai-summarizer'},{label:'Grammar Checker',href:'/ai-grammar'},
      {label:'Paraphraser',href:'/ai-paraphraser'},{label:'Email Writer',href:'/ai-email-writer'},
    ]},
    { key:'docs', title:'Documents', links:[
      {label:'Invoice Generator',href:'/invoice-generator'},{label:'Resume Builder',href:'/resume-builder'},
      {label:'Quote Generator',href:'/quote-generator'},{label:'Business Card',href:'/business-card-generator'},
    ]},
    { key:'calc', title:'Calculators', links:[
      {label:'BMI Calculator',href:'/bmi-calculator'},{label:'Mortgage Calculator',href:'/mortgage-calculator'},
      {label:'Loan EMI',href:'/loan-emi-calculator'},{label:'Tip Calculator',href:'/tip-calculator'},
      {label:'Age Calculator',href:'/age-calculator'},{label:'Tax Calculator',href:'/tax-calculator'},
    ]},
    { key:'more', title:'More', links:[
      {label:'Image to Text',href:'/image-to-text'},{label:'PDF OCR',href:'/pdf-ocr'},
      {label:'Passport Photo',href:'/passport-photo'},{label:'QR Reader',href:'/qr-reader'},
      {label:'YouTube Thumbnail',href:'/youtube-thumbnail'},{label:'Word Counter',href:'/word-counter'},
    ]},
    { key:'pages', title:'Pages', links:[
      {label:'All Tools',href:'/'},{label:'Blog',href:'/blog'},
      {label:'About',href:'/about'},{label:'Contact',href:'/contact'},
    ]},
  ]

  return (
    <nav style={{ position:'sticky',top:0,zIndex:100,background:'white',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 3px rgba(15,42,74,0.04)' }}>
      <div style={{ maxWidth:'1280px',margin:'0 auto',padding:'0 20px',height:'68px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>

        {/* Left: Brand + Dropdowns */}
        <div style={{ display:'flex',alignItems:'center',gap:'4px' }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px',marginRight:'14px',flexShrink:0 }}>
            <Logo/>
            <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',letterSpacing:'-0.5px' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
          </a>

          {/* ── PDF TOOLS ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('pdf')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('pdf','PDF Tools')}</span>
            {open === 'pdf' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'560px' }}>
                <div style={{ display:'flex',gap:'28px' }}>
                  <div style={{ flex:1 }}>
                    <ColHead label="Operations" />
                    {PDF_OPS.map(item => <Row key={item.name} {...item} />)}
                  </div>
                  <div style={{ flex:1 }}>
                    <ColHead label="Convert PDF" />
                    {PDF_CONVERT.map(item => <Row key={item.name} {...item} />)}
                    <ViewAll href="/tools/pdf" label="View All PDF Tools →" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── IMAGE TOOLS ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('image')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('image','Image Tools')}</span>
            {open === 'image' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'500px' }}>
                <div style={{ display:'flex',gap:'28px' }}>
                  <div style={{ flex:1 }}>
                    <ColHead label="Transform" />
                    {IMG_TRANSFORM.map(item => <Row key={item.name} {...item} />)}
                  </div>
                  <div style={{ flex:1 }}>
                    <ColHead label="Convert & More" />
                    {IMG_CONVERT.map(item => <Row key={item.name} {...item} />)}
                    <ViewAll href="/tools/image" label="View All Image Tools →" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── AI TOOLS ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('ai')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('ai','AI Tools','NEW')}</span>
            {open === 'ai' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'240px' }}>
                <ColHead label="AI-Powered Tools" />
                {AI_ITEMS.map(item => <Row key={item.name} {...item} />)}
                <ViewAll href="/tools/ai" label="View All AI Tools →" />
              </div>
            )}
          </div>

          {/* ── DOCUMENTS ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('docs')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('docs','Documents')}</span>
            {open === 'docs' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'240px' }}>
                <ColHead label="Document Generators" />
                {DOCS_ITEMS.map(item => <Row key={item.name} {...item} />)}
                <ViewAll href="/tools/documents" label="View All Document Tools →" />
              </div>
            )}
          </div>

          {/* ── CALCULATORS ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('calc')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('calc','Calculators')}</span>
            {open === 'calc' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'400px' }}>
                <div style={{ display:'flex',gap:'28px' }}>
                  <div style={{ flex:1 }}>
                    <ColHead label="Health & Life" />
                    {CALC_HEALTH.map(item => <Row key={item.name} {...item} />)}
                    <ColHead label="Time & Units" mt />
                    {CALC_TIME.map(item => <Row key={item.name} {...item} />)}
                  </div>
                  <div style={{ flex:1 }}>
                    <ColHead label="Finance" />
                    {CALC_FINANCE.map(item => <Row key={item.name} {...item} />)}
                    <ViewAll href="/tools/calculators" label="View All Calculators →" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── MORE ── */}
          <div style={{ position:'relative' as const }} onMouseEnter={() => setOpen('more')} onMouseLeave={() => setOpen(null)}>
            <span style={{ padding:'8px 10px',display:'inline-block' }}>{trigger('more','More')}</span>
            {open === 'more' && (
              <div style={{ ...PANEL_BASE, left:0, minWidth:'480px' }}>
                <div style={{ display:'flex',gap:'28px' }}>
                  <div style={{ flex:1 }}>
                    <ColHead label="OCR" />
                    {MORE_OCR.map(item => <Row key={item.name} {...item} />)}
                    <ColHead label="Specialty" mt />
                    {MORE_SPECIALTY.map(item => <Row key={item.name} {...item} />)}
                  </div>
                  <div style={{ flex:1 }}>
                    <ColHead label="Text & Writing" />
                    {MORE_TEXT.map(item => <Row key={item.name} {...item} />)}
                    <ColHead label="Utility" mt />
                    {MORE_UTILITY.map(item => <Row key={item.name} {...item} />)}
                    <ViewAll href="/" label="All 176+ Tools →" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right: All Tools + Blog + Dark + Pro + Hamburger */}
        <div style={{ display:'flex',alignItems:'center',gap:'8px',flexShrink:0 }}>
          <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:600,whiteSpace:'nowrap' as const }}>All Tools</a>
          <a href="/blog" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>Blog</a>
          <DarkModeToggle />
          <a href="#" style={{ background:'#E85D04',color:'white',padding:'8px 14px',borderRadius:'8px',fontSize:'13px',fontWeight:700,textDecoration:'none',whiteSpace:'nowrap' as const }}>Get Pro</a>
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
        <div style={{ background:'white',borderTop:'1px solid #e2e8f0',padding:'8px 24px 16px',maxHeight:'80vh',overflowY:'auto' as const }}>
          {mobileSections.map(({ key, title, links }) => (
            <div key={key}>
              <button
                onClick={() => setMobileSection(mobileSection === key ? null : key)}
                style={{ width:'100%',textAlign:'left' as const,background:'none',border:'none',borderBottom:'1px solid #f1f5f9',padding:'12px 0',fontSize:'13px',fontWeight:700,color:'#0F2A4A',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                {title}
                <span style={{ fontSize:'10px',opacity:0.5 }}>{mobileSection === key ? '▲' : '▼'}</span>
              </button>
              {mobileSection === key && (
                <div style={{ paddingLeft:'12px',paddingBottom:'8px' }}>
                  {links.map(l => (
                    <a key={l.href} href={l.href} style={{ display:'block',padding:'9px 0',fontSize:'14px',color:'#475569',textDecoration:'none',fontWeight:500,borderBottom:'1px solid #f8fafc' }}>{l.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

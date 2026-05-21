export default function SiteFooter() {
  return (
    <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
      <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>
          Convert<span style={{ color:'#F48C42' }}>Dox</span>
        </span>
        <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
        <div style={{ display:'flex',gap:'16px',flexWrap:'wrap' }}>
          {[
            { label:'Privacy', href:'/legal#privacy' },
            { label:'Terms', href:'/legal#terms' },
            { label:'Contact', href:'/contact' },
            { label:'About', href:'/about' },
            { label:'All Tools', href:'/' },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

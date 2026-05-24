export default function SiteFooter() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: 'Resources',
      links: [
        { label:'Blog',            href:'/blog' },
        { label:'All Tools',       href:'/' },
        { label:'Text Tools',      href:'/tools/text' },
        { label:'Calculators',     href:'/tools/calculators' },
        { label:'Developer Tools', href:'/tools/developer' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label:'About',   href:'/about' },
        { label:'Contact', href:'/contact' },
        { label:'Privacy', href:'/legal#privacy' },
        { label:'Terms',   href:'/legal#terms' },
      ],
    },
  ]

  return (
    <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'40px 24px 24px' }}>
      <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'32px',marginBottom:'28px' }}>
          <div>
            <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'white',display:'block',marginBottom:'10px' }}>
              Convert<span style={{ color:'#F48C42' }}>Dox</span>
            </span>
            <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0,lineHeight:1.6 }}>
              Every online tool you need in one place. Free, fast, and private.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'12px' }}>{col.title}</div>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ display:'block',fontSize:'13.5px',color:'rgba(255,255,255,0.55)',textDecoration:'none',marginBottom:'8px' }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'16px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px' }}>
          <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
          <div style={{ display:'flex',gap:'16px',flexWrap:'wrap' }}>
            <a href="/blog" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>Blog</a>
            <a href="/legal#privacy" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>Privacy</a>
            <a href="/legal#terms" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>Terms</a>
            <a href="/contact" style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

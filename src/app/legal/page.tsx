import Link from 'next/link'
import NavBar from '@/components/NavBar'

export const metadata = {
  title: 'Legal & Policies - ConvertDox',
  description: 'ConvertDox legal centre: privacy policy, terms of service, cookie policy, file security, DMCA, acceptable use, and disclaimers.',
  alternates: { canonical: 'https://convertdox.com/legal' },
}

const LINKS = [
  { href: '/privacy-policy',    icon: '🔒', title: 'Privacy Policy',              desc: 'How we collect, use, and protect your information.' },
  { href: '/terms-of-service',  icon: '📋', title: 'Terms of Service',            desc: 'The terms governing your use of ConvertDox.' },
  { href: '/security',          icon: '🛡️', title: 'File Security & Auto-Delete', desc: 'How your files are secured and automatically deleted.' },
  { href: '/cookie-policy',     icon: '🍪', title: 'Cookie Policy',               desc: 'How we use cookies and how to manage them.' },
  { href: '/dmca',              icon: '©',  title: 'Copyright & DMCA',            desc: 'Copyright policy and how to submit takedown notices.' },
  { href: '/acceptable-use',    icon: '⚖️', title: 'Acceptable Use Policy',       desc: 'Permitted and prohibited uses of our tools.' },
  { href: '/disclaimer',        icon: '⚠️', title: 'Disclaimer',                  desc: 'Important disclaimers, including AI-generated content.' },
]

export default function LegalHub() {
  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'56px 24px 48px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'white', margin:'0 0 12px' }}>
            Legal &amp; Policies
          </h1>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.8)', lineHeight:1.6, margin:0, maxWidth:'640px' }}>
            ConvertDox is built with privacy and security at its core. Your files are never permanently stored. Browse our full policies below.
          </p>
        </div>
      </div>
      <main style={{ maxWidth:'900px', margin:'40px auto 80px', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'16px' }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'16px', padding:'24px', textDecoration:'none', display:'flex', flexDirection:'column', gap:'8px' }}>
              <div style={{ fontSize:'28px' }}>{l.icon}</div>
              <div style={{ fontSize:'17px', fontWeight:800, color:'#0F2A4A' }}>{l.title}</div>
              <div style={{ fontSize:'13.5px', color:'#64748b', lineHeight:1.5 }}>{l.desc}</div>
              <span style={{ marginTop:'4px', fontSize:'13px', fontWeight:700, color:'#E85D04' }}>Read more →</span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop:'32px', fontSize:'14px', color:'#94a3b8', textAlign:'center' }}>
          Questions about our policies? Contact <a href="mailto:info@convertdox.com" style={{ color:'#E85D04', fontWeight:600 }}>info@convertdox.com</a>
        </p>
      </main>
    </div>
  )
}

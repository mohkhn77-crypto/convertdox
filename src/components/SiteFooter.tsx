export default function SiteFooter() {
  const year = new Date().getFullYear()

  const cols = [
    {
      title: 'Tools',
      links: [
        { label: 'PDF Tools',       href: '/all-tools' },
        { label: 'Image Tools',     href: '/all-tools' },
        { label: 'Text Tools',      href: '/tools/text' },
        { label: 'Calculators',     href: '/tools/calculators' },
        { label: 'Developer Tools', href: '/tools/developer' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About',   href: '/about' },
        { label: 'Blog',    href: '/blog' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: 'mailto:support@convertdox.com' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy',   href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy',    href: '/cookie-policy' },
        { label: 'File Security',    href: '/security' },
        { label: 'DMCA',             href: '/dmca' },
        { label: 'Acceptable Use',   href: '/acceptable-use' },
        { label: 'Disclaimer',       href: '/disclaimer' },
      ],
    },
  ]

  return (
    <footer style={{ background: '#0F2A4A', marginTop: '60px', padding: '48px 24px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '36px', marginBottom: '36px' }}>

          {/* Brand */}
          <div>
            <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: 'white', display: 'block', marginBottom: '10px' }}>
              Convert<span style={{ color: '#E85D04' }}>Dox</span>
            </span>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
              176+ free online tools. No signup required. Files never stored.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: '14px' }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <a key={l.label} href={l.href} style={{ display: 'block', fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '9px' }}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '10px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>
            © {year} ConvertDox. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
            <a href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms-of-service" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Terms</a>
            <a href="/cookie-policy" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Cookies</a>
            <a href="/disclaimer" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Disclaimer</a>
            <a href="/dmca" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>DMCA</a>
            <a href="/contact" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

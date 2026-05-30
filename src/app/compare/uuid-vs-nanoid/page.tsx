import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const COMPARE: { feature: string; uuid: string; nanoid: string }[] = [
  { feature:'Length', uuid:'36 characters (with hyphens)', nanoid:'21 characters (default)' },
  { feature:'Charset', uuid:'Hex + hyphens (0-9, a-f, -)', nanoid:'URL-safe alphabet (A-Za-z0-9_-)' },
  { feature:'Bits of randomness', uuid:'122 bits', nanoid:'126 bits (default)' },
  { feature:'Collision odds', uuid:'~1 in 10¹⁸', nanoid:'Comparable at default size' },
  { feature:'Performance', uuid:'Standard', nanoid:'~2× faster generation' },
  { feature:'Storage size', uuid:'36 bytes as string', nanoid:'21 bytes as string' },
  { feature:'Standardized', uuid:'RFC 4122', nanoid:'Community spec' },
  { feature:'Configurable', uuid:'Multiple versions (v1, v4, v7)', nanoid:'Custom length and alphabet' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'Is NanoID really faster than UUID?', a:'Yes — the reference NanoID implementation is roughly twice as fast as the standard uuid library because the algorithm is simpler. In practice both are fast enough for application-level use; the difference matters at scale (millions per second).' },
  { q:'Can NanoID and UUID coexist in one app?', a:'Yes. They\'re both random opaque strings — your database doesn\'t care which format a primary key uses, so long as the column type fits. Most modern apps use UUID v4 or v7 for database PKs and NanoID for URL-facing short codes.' },
  { q:'What about UUID v7?', a:'UUID v7 (introduced in RFC 9562, 2024) is timestamp-prefixed and sortable — useful for database indexes. If you control your database and want UUIDs that sort by creation time, prefer v7 over v4.' },
  { q:'Are NanoIDs URL-safe?', a:'By default, yes. The default alphabet uses A-Z, a-z, 0-9, plus _ and - — all URL-safe. UUIDs are also URL-safe (no special characters) but the hyphens make them longer and harder to type.' },
  { q:'Should I use UUIDs for everything?', a:'No. Use UUID v4 or v7 for database primary keys when you need cryptographic uniqueness and standardized format. Use NanoID for user-visible IDs (URL slugs, share codes) where length and aesthetics matter.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background:'linear-gradient(135deg,#0F2A4A 0%,#1a3a5c 100%)',padding:'56px 24px 48px',textAlign:'center' }}>
        <div style={{ maxWidth:'780px',margin:'0 auto' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'5px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'18px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>COMPARE</span>
            ID format showdown
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'white',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 12px' }}>
            UUID vs NanoID: Which Should You Use?
          </h1>
          <p style={{ fontSize:'16px',color:'rgba(255,255,255,0.7)',maxWidth:'620px',margin:'0 auto',lineHeight:1.6 }}>
            Two ways to generate unique identifiers. One is the long-standing standard, the other is the modern challenger. Here&apos;s how they actually compare.
          </p>
        </div>
      </div>

      <article style={{ maxWidth:'820px',margin:'0 auto',padding:'48px 24px' }}>

        <h2 style={H2}>Quick Comparison</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Feature</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>UUID v4</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>NanoID</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r,i) => (
                <tr key={r.feature} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.feature}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.uuid}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.nanoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>What Is a UUID?</h2>
        <p style={P}>A Universally Unique Identifier (UUID) is a 128-bit value formatted as a 36-character string with hyphens. UUIDs have been an internet standard since the early 2000s (RFC 4122, with updates in RFC 9562) and ship with every major language.</p>
        <pre style={PRE}><code>{`550e8400-e29b-41d4-a716-446655440000
  ↑↑↑↑↑↑↑↑ ↑↑↑↑ ↑↑↑↑ ↑↑↑↑ ↑↑↑↑↑↑↑↑↑↑↑↑
    time     v4   ver  var       node`}</code></pre>
        <p style={P}>The most common variant is UUID v4 — 122 bits of cryptographically random data, plus 6 reserved bits identifying the version and variant. The newer UUID v7 prepends a timestamp, which makes them naturally sortable by creation time.</p>

        <h2 style={H2}>What Is NanoID?</h2>
        <p style={P}>NanoID is a tiny URL-friendly unique-ID library introduced in 2017. The default generates a 21-character string from a 64-character URL-safe alphabet, giving 126 bits of randomness — slightly more than UUID v4 in a smaller footprint.</p>
        <pre style={PRE}><code>{`V1StGXR8_Z5jdHi6B-myT
  ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  21 chars from [A-Za-z0-9_-]`}</code></pre>
        <p style={P}>NanoID is configurable — you can shorten the ID (with proportionally higher collision risk) or customize the alphabet, useful for IDs you want to look pronounceable or fit a specific charset constraint.</p>

        <h2 style={H2}>Performance Comparison</h2>
        <p style={P}>NanoID&apos;s reference implementation is roughly twice as fast as the standard <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>uuid</code> library in the same language, because the algorithm is simpler — pull random bytes, map to alphabet characters, done. UUID has version and variant bit-setting plus hyphen insertion.</p>
        <p style={P}>In real applications, both are fast enough that the difference is negligible. It matters only when you&apos;re generating millions of IDs per second (e.g. high-volume logging or telemetry pipelines).</p>

        <h2 style={H2}>Use Case Recommendations</h2>

        <h3 style={H3}>Choose UUID when</h3>
        <ul style={UL}>
          <li>You need a standardized format (RFC 4122) for interop with databases, message queues, or third-party APIs.</li>
          <li>You&apos;re using a database that has a native UUID column type (PostgreSQL, MS SQL).</li>
          <li>You want timestamp-based sorting in database indexes → use UUID v7.</li>
          <li>You&apos;re working in an enterprise context where UUIDs are the cultural default.</li>
        </ul>

        <h3 style={H3}>Choose NanoID when</h3>
        <ul style={UL}>
          <li>The ID appears in a URL — shorter IDs make for better URLs.</li>
          <li>The ID is shown to users (share codes, invitation codes).</li>
          <li>You want a custom alphabet — say, all-uppercase or letters only.</li>
          <li>You&apos;re building a modern web app with no legacy interop concerns.</li>
          <li>Storage footprint matters and you have many billions of IDs to persist.</li>
        </ul>

        <h2 style={H2}>Security Considerations</h2>
        <p style={P}>Both UUID v4 and NanoID are cryptographically random when generated by reputable libraries. The randomness comes from the OS or browser&apos;s secure random source — <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>/dev/urandom</code> on Unix, <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>BCryptGenRandom</code> on Windows, <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>window.crypto.getRandomValues()</code> in browsers.</p>
        <p style={P}>This means an attacker can&apos;t predict the next ID even if they have a long sequence of previous IDs. Both are suitable for security-sensitive contexts like password-reset tokens, session IDs, and one-time codes.</p>
        <p style={P}>Note: UUID v1 (timestamp + MAC address) and v3/v5 (deterministic hashes) are not cryptographically random and should never be used for security-sensitive identifiers.</p>

        <h2 style={H2}>How to Generate</h2>
        <p style={P}>For UUIDs, ConvertDox offers a <a href="/uuid-generator" style={A}>single-UUID generator</a> for one-off needs and a <a href="/uuid-bulk" style={A}>bulk UUID generator</a> that produces up to 1,000 IDs in one go — useful for seeding test data or pre-allocating identifiers.</p>
        <p style={P}>Both run entirely in your browser using the Web Crypto API, so the generated IDs never touch a server. If you need NanoID specifically, the official library is the <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>nanoid</code> npm package — under 200 bytes after gzip.</p>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center' }}>
          <a href="/uuid-generator" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 24px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Generate a UUID →</a>
          <a href="/uuid-bulk" style={{ display:'inline-block',background:'white',color:'#0F2A4A',padding:'12px 24px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none',border:'1.5px solid #0F2A4A' }}>Bulk UUID Generator →</a>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'UUID vs NanoID: Which Should You Use?',
        'description': 'A practical comparison of UUID and NanoID identifiers — length, performance, collision risk, and recommendations.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

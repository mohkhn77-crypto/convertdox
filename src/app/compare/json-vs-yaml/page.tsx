import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const COMPARE: { feature: string; json: string; yaml: string }[] = [
  { feature:'Syntax', json:'Braces, brackets, commas', yaml:'Indentation, dashes, colons' },
  { feature:'Readability', json:'Compact, machine-friendly', yaml:'More readable for humans' },
  { feature:'Comments', json:'Not supported', yaml:'Supported via #' },
  { feature:'Data types', json:'Strings, numbers, booleans, null, arrays, objects', yaml:'Same + dates, timestamps, references' },
  { feature:'File size', json:'Smaller (no indentation overhead)', yaml:'Slightly larger but more legible' },
  { feature:'Best for', json:'APIs, web payloads, JS apps', yaml:'Config files, CI/CD, infrastructure' },
]

const TOOLS_COMPARE: { tool: string; format: string }[] = [
  { tool:'GitHub Actions', format:'YAML' },
  { tool:'GitLab CI', format:'YAML' },
  { tool:'Docker Compose', format:'YAML' },
  { tool:'Kubernetes manifests', format:'YAML' },
  { tool:'Ansible playbooks', format:'YAML' },
  { tool:'package.json (Node)', format:'JSON' },
  { tool:'tsconfig.json', format:'JSON' },
  { tool:'REST API payloads', format:'JSON' },
  { tool:'OpenAPI spec', format:'Either' },
  { tool:'CircleCI config', format:'YAML' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'Is YAML a superset of JSON?', a:'YAML 1.2 was deliberately aligned so that every valid JSON document is also valid YAML. That means you can paste JSON into a YAML parser and it will work. The reverse isn\'t true — YAML\'s indentation-based blocks have no direct JSON equivalent.' },
  { q:'Which is faster to parse?', a:'JSON, by a comfortable margin. JSON parsers are simpler, ship in the standard library of every major language, and run faster on identical payloads. YAML parsers do more work because the grammar is more permissive.' },
  { q:'Why do config files use YAML instead of JSON?', a:'JSON forbids comments and trailing commas, which makes config files painful to maintain. YAML allows both, plus its indentation-based syntax is easier to read in diffs. Hence its dominance in CI/CD and infrastructure tooling.' },
  { q:'Are YAML files dangerous to parse?', a:'They can be — the default Python yaml.load() (until recent versions) could instantiate arbitrary Python objects, which is a remote-code-execution risk. Always use yaml.safe_load() or an equivalent safe loader.' },
  { q:'Can I convert between them?', a:'Yes — use our <a href="/yaml-to-json" style="color:#E85D04;font-weight:600">YAML to JSON converter</a> for bidirectional conversion. Programmatically, every major language has libraries that round-trip cleanly.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A 0%,#1a3a5c 100%)',padding:'56px 24px 48px',textAlign:'center' }}>
        <div style={{ maxWidth:'780px',margin:'0 auto' }}>
          <div style={{ display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'999px',padding:'5px 16px',fontSize:'13px',color:'rgba(255,255,255,0.85)',marginBottom:'18px' }}>
            <span style={{ background:'#E85D04',borderRadius:'999px',padding:'1px 8px',fontWeight:700,color:'white',fontSize:'11px' }}>COMPARE</span>
            Format showdown
          </div>
          <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'white',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 12px' }}>
            JSON vs YAML: Key Differences Explained
          </h1>
          <p style={{ fontSize:'16px',color:'rgba(255,255,255,0.7)',maxWidth:'620px',margin:'0 auto',lineHeight:1.6 }}>
            Same data, different syntax — and dramatically different ergonomics depending on the use case. Here&apos;s when each format wins.
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
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>JSON</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>YAML</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r,i) => (
                <tr key={r.feature} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.feature}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.json}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.yaml}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>What Is JSON?</h2>
        <p style={P}>JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. Defined in 2001 and standardized as ECMA-404, it&apos;s the dominant format for web APIs because every modern language can parse it without external dependencies.</p>
        <pre style={PRE}><code>{`{
  "user": "ada",
  "active": true,
  "score": 92,
  "tags": ["admin", "writer"]
}`}</code></pre>

        <h2 style={H2}>What Is YAML?</h2>
        <p style={P}>YAML (originally &ldquo;Yet Another Markup Language,&rdquo; later retconned to &ldquo;YAML Ain&apos;t Markup Language&rdquo;) is a human-friendly superset of JSON. Indentation indicates structure, comments are supported, and the syntax is generally lighter on punctuation.</p>
        <pre style={PRE}><code>{`user: ada
active: true
score: 92
tags:
  - admin
  - writer`}</code></pre>
        <p style={P}>The two examples above encode the same data.</p>

        <h2 style={H2}>Side-by-Side Syntax Examples</h2>

        <h3 style={H3}>Nested objects</h3>
        <pre style={PRE}><code>{`// JSON
{
  "server": {
    "host": "api.example.com",
    "port": 443,
    "ssl": true
  }
}

# YAML
server:
  host: api.example.com
  port: 443
  ssl: true`}</code></pre>

        <h3 style={H3}>Arrays of objects</h3>
        <pre style={PRE}><code>{`// JSON
{
  "users": [
    { "name": "Ada", "role": "admin" },
    { "name": "Linus", "role": "dev" }
  ]
}

# YAML
users:
  - name: Ada
    role: admin
  - name: Linus
    role: dev`}</code></pre>

        <h2 style={H2}>When to Use JSON</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>API request and response bodies.</strong> Every HTTP client and server speaks JSON natively.</li>
          <li><strong style={STRONG}>Simple, machine-generated config.</strong> Anywhere a human won&apos;t be hand-editing the file.</li>
          <li><strong style={STRONG}>JavaScript-native apps.</strong> JSON parses with <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>JSON.parse()</code> — no library needed.</li>
          <li><strong style={STRONG}>NoSQL document stores.</strong> MongoDB, Firestore, DynamoDB all use JSON-like documents.</li>
          <li><strong style={STRONG}>Browser-to-server payloads</strong> where parser performance matters at scale.</li>
        </ul>

        <h2 style={H2}>When to Use YAML</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Complex configuration files</strong> that engineers will edit by hand.</li>
          <li><strong style={STRONG}>CI/CD pipelines</strong> — GitHub Actions, GitLab CI, CircleCI, Bitbucket Pipelines all use YAML.</li>
          <li><strong style={STRONG}>Infrastructure-as-code</strong> — Docker Compose, Kubernetes, Helm, Ansible.</li>
          <li><strong style={STRONG}>Anywhere comments matter</strong> — and they almost always matter in config.</li>
          <li><strong style={STRONG}>Multi-document files</strong> — YAML supports multiple documents in one file (separated by <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>---</code>).</li>
        </ul>

        <h2 style={H2}>Pros & Cons</h2>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px',marginBottom:'24px' }}>
          <div style={{ background:'#f0fdf4',border:'1.5px solid #bbf7d0',borderRadius:'12px',padding:'18px' }}>
            <h3 style={{ ...H3,marginTop:0,color:'#166534' }}>JSON — Pros</h3>
            <ul style={UL}>
              <li>Fastest parsing in every language</li>
              <li>Strict spec — fewer edge cases</li>
              <li>Universal language and tool support</li>
              <li>Smaller wire size when minified</li>
            </ul>
            <h3 style={{ ...H3,color:'#7f1d1d' }}>JSON — Cons</h3>
            <ul style={UL}>
              <li>No comments</li>
              <li>Verbose for nested data</li>
              <li>Trailing commas forbidden — minor footgun</li>
              <li>Painful to hand-edit at scale</li>
            </ul>
          </div>
          <div style={{ background:'#fff7ed',border:'1.5px solid #fed7aa',borderRadius:'12px',padding:'18px' }}>
            <h3 style={{ ...H3,marginTop:0,color:'#9a3412' }}>YAML — Pros</h3>
            <ul style={UL}>
              <li>Comments supported</li>
              <li>Cleaner syntax for nested config</li>
              <li>Multi-document files</li>
              <li>Anchors and references to avoid repetition</li>
            </ul>
            <h3 style={{ ...H3,color:'#7f1d1d' }}>YAML — Cons</h3>
            <ul style={UL}>
              <li>Whitespace-sensitive — silent bugs from indent errors</li>
              <li>Slower to parse</li>
              <li>Type coercion surprises (e.g. <code>no</code> parsed as <code>false</code>)</li>
              <li>Less universal language support</li>
            </ul>
          </div>
        </div>

        <h2 style={H2}>JSON vs YAML in Popular Tools</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Tool</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Format used</th>
              </tr>
            </thead>
            <tbody>
              {TOOLS_COMPARE.map((r,i) => (
                <tr key={r.tool} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.tool}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>Interoperability</h2>
        <p style={P}>JSON is a subset of YAML 1.2, so a YAML parser will happily accept JSON input. Going the other way requires actual conversion — the <a href="/yaml-to-json" style={A}>ConvertDox YAML to JSON converter</a> handles this in both directions, all in your browser. Programmatically, every major language ships a YAML library that round-trips cleanly.</p>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }} dangerouslySetInnerHTML={{ __html: f.a }} />
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center' }}>
          <a href="/json-formatter" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 24px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Format JSON →</a>
          <a href="/yaml-to-json" style={{ display:'inline-block',background:'white',color:'#0F2A4A',padding:'12px 24px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none',border:'1.5px solid #0F2A4A' }}>Convert YAML ↔ JSON →</a>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'JSON vs YAML: Key Differences Explained (2026)',
        'description': 'Side-by-side syntax, pros and cons, and a clear recommendation for when to choose each format.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />

      <SiteFooter />
    </div>
  )
}

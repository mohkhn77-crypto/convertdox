import Link from 'next/link'
import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const FAQ: { q: string; a: string }[] = [
  { q:'Is JSON formatting the same as JSON validation?', a:'They go together but they\'re different jobs. Formatting adds indentation and line breaks; validation checks whether the JSON is syntactically correct. A good formatter does both — it will refuse to format invalid input and tell you where the error is.' },
  { q:'Is my JSON sent to a server when I use an online formatter?', a:'Not with ConvertDox — formatting happens entirely in your browser. Some other online tools do send data to a server, which is a problem if your payload contains tokens, PII, or trade secrets. Always check before pasting sensitive data.' },
  { q:'How big a JSON file can a browser formatter handle?', a:'Most modern browsers comfortably format files up to about 10–20 MB. For larger files, a CLI tool like jq is more reliable. ConvertDox handles typical API responses (under 1 MB) instantly.' },
  { q:'Can I format JSON inside a code editor?', a:'Yes — VS Code formats JSON via right-click → Format Document (Shift+Alt+F). The Prettier extension also auto-formats on save. For quick one-off checks, a web tool is usually faster.' },
  { q:'What is the difference between JSON and JSON5?', a:'JSON5 is a relaxed superset that allows comments, trailing commas, and unquoted keys. It\'s convenient for config files but isn\'t valid JSON — most APIs reject it. Stick with strict JSON unless your tooling specifically supports JSON5.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <article style={{ maxWidth:'780px',margin:'0 auto',padding:'48px 24px' }}>
        <Link href="/blog" style={{ color:'#E85D04',fontSize:'14px',fontWeight:600,textDecoration:'none' }}>← Back to Blog</Link>

        <div style={{ display:'flex',gap:'12px',alignItems:'center',marginTop:'24px',marginBottom:'18px',flexWrap:'wrap' }}>
          <span style={{ background:'#FFF7ED',color:'#C2410C',fontSize:'11.5px',fontWeight:700,padding:'4px 10px',borderRadius:'999px',textTransform:'uppercase',letterSpacing:'0.5px' }}>Developer Tools</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>8 min read</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>•</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>Jan 2026</span>
        </div>

        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 20px' }}>
          What Is a JSON Formatter and Why Every Developer Needs One
        </h1>

        <p style={{ fontSize:'18px',color:'#64748b',lineHeight:'1.7',paddingBottom:'24px',borderBottom:'1.5px solid #e2e8f0',marginBottom:'32px' }}>
          Anyone who has stared at a minified 30 KB API response knows the feeling. A JSON formatter turns that wall of characters into something a human can actually read — and it usually catches your bugs along the way.
        </p>

        <h2 style={H2}>What Is JSON?</h2>
        <p style={P}>JSON (JavaScript Object Notation) is the most common data interchange format on the web. It&apos;s plain text built from a few simple shapes: objects, arrays, strings, numbers, booleans, and null. Almost every API on the internet — Stripe, GitHub, OpenAI, your own backend — speaks JSON.</p>
        <pre style={PRE}><code>{`{
  "user": "ada",
  "active": true,
  "score": 92,
  "tags": ["admin", "writer"]
}`}</code></pre>

        <h2 style={H2}>The Problem: Minified JSON</h2>
        <p style={P}>To save bandwidth, most APIs send JSON without whitespace. It looks like this:</p>
        <pre style={PRE}><code>{`{"user":"ada","active":true,"score":92,"tags":["admin","writer"],"profile":{"city":"London","since":2019}}`}</code></pre>
        <p style={P}>Multiply that by a few hundred fields and a few levels of nesting and it&apos;s effectively unreadable. You can&apos;t see the structure, you can&apos;t spot the missing comma, you can&apos;t tell where one object ends and the next begins.</p>

        <h2 style={H2}>What Does a JSON Formatter Do?</h2>
        <p style={P}>A JSON formatter takes that minified blob and turns it into something you can read. The best ones do five things:</p>
        <ol style={UL}>
          <li><strong style={STRONG}>Indent</strong> nested objects and arrays so structure is visible at a glance.</li>
          <li><strong style={STRONG}>Validate</strong> the input and surface the exact line where it breaks.</li>
          <li><strong style={STRONG}>Highlight</strong> keys, strings, numbers, and booleans in different colours.</li>
          <li><strong style={STRONG}>Collapse</strong> deep objects so you can navigate large payloads.</li>
          <li><strong style={STRONG}>Search</strong> across keys and values to find a specific field.</li>
        </ol>

        <h2 style={H2}>Before & After Example</h2>
        <p style={P}>Here&apos;s the minified blob from earlier, run through a formatter:</p>
        <pre style={PRE}><code>{`{
  "user": "ada",
  "active": true,
  "score": 92,
  "tags": [
    "admin",
    "writer"
  ],
  "profile": {
    "city": "London",
    "since": 2019
  }
}`}</code></pre>
        <p style={P}>Same data, dramatically easier to scan. You can immediately see that <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>profile</code> is a nested object and <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>tags</code> is an array of two strings.</p>

        <h2 style={H2}>Real-World Use Cases</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Debugging API responses:</strong> paste the response from your browser&apos;s network tab, format it, and find the field that&apos;s misbehaving.</li>
          <li><strong style={STRONG}>Reading config files:</strong> <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>package.json</code>, <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>tsconfig.json</code>, ESLint rules — all easier to skim formatted.</li>
          <li><strong style={STRONG}>Learning a new REST API:</strong> formatting the example payloads in the docs helps you internalize the shape.</li>
          <li><strong style={STRONG}>Working with NoSQL databases:</strong> MongoDB, Firestore, and DynamoDB exports are full of JSON. Formatting them makes manual inspection possible.</li>
          <li><strong style={STRONG}>Code review:</strong> when a teammate ships a JSON fixture, a quick format check confirms it&apos;s well-formed before merge.</li>
        </ul>

        <h2 style={H2}>How to Use the ConvertDox JSON Formatter</h2>
        <p style={P}>The <a href="https://convertdox.com/json-formatter" style={A}>ConvertDox JSON Formatter</a> works in three steps:</p>
        <ol style={UL}>
          <li>Paste your JSON into the left panel.</li>
          <li>Click <strong style={STRONG}>Format</strong>. Errors appear with the offending line highlighted.</li>
          <li>Copy the formatted result, or click <strong style={STRONG}>Minify</strong> if you need the compact version back.</li>
        </ol>
        <p style={P}>Everything runs in your browser. Nothing is uploaded — important when the JSON contains auth tokens or user data.</p>

        <h2 style={H2}>Common JSON Validation Errors</h2>

        <h3 style={H3}>1. Missing comma</h3>
        <pre style={PRE}><code>{`{
  "user": "ada"
  "active": true
}`}</code></pre>
        <p style={P}>The parser expects a comma between key-value pairs. Add one after <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>&quot;ada&quot;</code>.</p>

        <h3 style={H3}>2. Unquoted keys</h3>
        <pre style={PRE}><code>{`{
  user: "ada"
}`}</code></pre>
        <p style={P}>JavaScript allows this. JSON does not. All keys must be wrapped in double quotes — not single quotes either.</p>

        <h3 style={H3}>3. Trailing comma</h3>
        <pre style={PRE}><code>{`{
  "user": "ada",
  "active": true,
}`}</code></pre>
        <p style={P}>Comma after the last item is forbidden in strict JSON. (It&apos;s allowed in JSON5 and modern JavaScript, which is why this is easy to miss.)</p>

        <h3 style={H3}>4. Single quotes</h3>
        <pre style={PRE}><code>{`{
  'user': 'ada'
}`}</code></pre>
        <p style={P}>JSON requires double quotes for both keys and string values.</p>

        <h3 style={H3}>5. Comments</h3>
        <pre style={PRE}><code>{`{
  // not allowed
  "user": "ada"
}`}</code></pre>
        <p style={P}>JSON does not support comments. If you need them, use a config format like YAML or JSON5.</p>

        <h2 style={H2}>JSON Best Practices</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Stick to one naming convention.</strong> Most APIs use <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>snake_case</code> or <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>camelCase</code>. Pick one and apply it everywhere.</li>
          <li><strong style={STRONG}>Don&apos;t nest more than 4–5 levels deep.</strong> Flatten data with explicit IDs when you can — deeply nested JSON is hard to query and traverse.</li>
          <li><strong style={STRONG}>Use arrays for ordered lists, objects for named lookups.</strong> Don&apos;t fake an array with numeric string keys.</li>
          <li><strong style={STRONG}>Be explicit about types.</strong> Don&apos;t mix <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>&quot;42&quot;</code> and <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>42</code> across responses. Pick number or string and be consistent.</li>
          <li><strong style={STRONG}>Use <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>null</code> deliberately.</strong> An absent key, a present <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>null</code>, and an empty string mean different things. Document which you use.</li>
        </ul>

        <h2 style={H2}>JSON vs Other Formats</h2>
        <p style={P}>JSON is dominant, but it&apos;s not the only option. YAML is more readable for config files but trickier to parse safely; XML is verbose but still common in legacy systems. For a deeper look, see our <a href="/compare/json-vs-yaml" style={A}>JSON vs YAML comparison</a>.</p>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>💻</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Format JSON Right Now</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Paste, format, validate — all in your browser. No sign-up, no upload.</p>
          <a href="/json-formatter" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open JSON Formatter →</a>
        </div>

        {/* Related */}
        <div style={{ marginTop:'48px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#0F2A4A',marginBottom:'14px' }}>Related Articles</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <Link href="/blog/how-to-convert-images-to-base64" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Developer Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>How to Convert Images to Base64</div>
            </Link>
            <Link href="/blog/how-to-count-words-online" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Text Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>How to Count Words Online: 5 Methods Compared</div>
            </Link>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'What Is a JSON Formatter and Why Every Developer Needs One',
        'description': 'Learn what JSON formatters do, the most common validation errors, and how to format any payload in seconds.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

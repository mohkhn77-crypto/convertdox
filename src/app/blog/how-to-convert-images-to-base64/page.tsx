import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const FAQ: { q: string; a: string }[] = [
  { q:'Does Base64 reduce image file size?', a:'No — the opposite. Base64 encoding adds roughly 33% to the size of the original binary because three bytes become four ASCII characters. Only use it when the convenience outweighs the size penalty.' },
  { q:'Can browsers cache Base64 images?', a:'They cache the HTML or CSS file that contains the data URI, but the image itself can\'t be cached separately. That means a Base64 image is re-downloaded every time the surrounding file changes, even if the image is unchanged.' },
  { q:'Is Base64 the same as encryption?', a:'No. Base64 is encoding — fully reversible, no key, no secret. Anyone can decode it. Never use Base64 to hide passwords or sensitive data.' },
  { q:'What image formats can be Base64-encoded?', a:'All of them. PNG, JPG, GIF, SVG, WebP, AVIF — Base64 is byte-level, so it doesn\'t care about the format. The MIME type in the data URI tells the browser how to render the decoded bytes.' },
  { q:'How big is too big for a Base64 image?', a:'A practical ceiling is around 5–10 KB. Past that, the size penalty, blocked caching, and slower HTML parsing outweigh the benefit of removing a single HTTP request. Use real image files for anything larger.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <article style={{ maxWidth:'780px',margin:'0 auto',padding:'48px 24px' }}>
        <a href="/blog" style={{ color:'#E85D04',fontSize:'14px',fontWeight:600,textDecoration:'none' }}>← Back to Blog</a>

        <div style={{ display:'flex',gap:'12px',alignItems:'center',marginTop:'24px',marginBottom:'18px',flexWrap:'wrap' }}>
          <span style={{ background:'#FFF7ED',color:'#C2410C',fontSize:'11.5px',fontWeight:700,padding:'4px 10px',borderRadius:'999px',textTransform:'uppercase',letterSpacing:'0.5px' }}>Developer Tools</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>9 min read</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>•</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>Jan 2026</span>
        </div>

        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 20px' }}>
          How to Convert Images to Base64: Complete Guide for Developers
        </h1>

        <p style={{ fontSize:'18px',color:'#64748b',lineHeight:'1.7',paddingBottom:'24px',borderBottom:'1.5px solid #e2e8f0',marginBottom:'32px' }}>
          Embedding an image directly in HTML, CSS, or an API payload sounds clever — until you remember the file size penalty. This guide explains how Base64 image encoding works, when it&apos;s the right call, and how to do it in every major language.
        </p>

        <h2 style={H2}>What Is Base64 Encoding?</h2>
        <p style={P}>Base64 is a way to represent binary data as ASCII text. It uses 64 safe characters — A-Z, a-z, 0-9, plus <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>+</code> and <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>/</code> — to ensure the data passes safely through systems that can&apos;t handle raw binary, like email or URL parameters.</p>
        <p style={P}>Three bytes of binary input become four characters of Base64 output. The result is always larger than the input, but it&apos;s always text-safe.</p>

        <h2 style={H2}>Why Convert Images to Base64?</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Embed in HTML or CSS</strong> via data URI — no separate HTTP request.</li>
          <li><strong style={STRONG}>Attach to email templates</strong> so the image renders inline regardless of the recipient&apos;s client.</li>
          <li><strong style={STRONG}>Send in JSON payloads</strong> for APIs that can&apos;t accept multipart uploads.</li>
          <li><strong style={STRONG}>Bundle into offline apps</strong> where the image must travel with the document.</li>
          <li><strong style={STRONG}>Generate from canvas or webcam</strong> on the client and POST as a string.</li>
        </ul>

        <h2 style={H2}>When TO Use Base64 Images</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Tiny icons</strong> (under ~2 KB) where saving the HTTP round-trip matters.</li>
          <li><strong style={STRONG}>HTML email templates</strong> where attachments aren&apos;t available.</li>
          <li><strong style={STRONG}>Single-file documents</strong> — a self-contained HTML or Markdown export.</li>
          <li><strong style={STRONG}>Critical above-the-fold imagery</strong> where you want zero network dependency.</li>
          <li><strong style={STRONG}>Generated client-side</strong> from canvas, screenshots, or webcam frames.</li>
        </ul>

        <h2 style={H2}>When NOT to Use Base64</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Large images.</strong> The 33% size overhead and lack of caching kills performance.</li>
          <li><strong style={STRONG}>Anything you want cached separately.</strong> Browsers cache the containing file, not the embedded image.</li>
          <li><strong style={STRONG}>Hot paths</strong> with many images. HTTP/2 multiplexing makes separate image requests very cheap now.</li>
          <li><strong style={STRONG}>Storage.</strong> Storing Base64 images in a database wastes 33% of disk space and bandwidth on every read.</li>
        </ul>

        <h2 style={H2}>How to Convert Using ConvertDox</h2>
        <p style={P}>The <a href="https://convertdox.com/image-to-base64" style={A}>ConvertDox Image to Base64 tool</a> handles the conversion entirely in your browser — no upload, no privacy compromise:</p>
        <ol style={UL}>
          <li>Drop your image (PNG, JPG, GIF, SVG, WebP) onto the upload area.</li>
          <li>The Base64 string and full data URI appear instantly.</li>
          <li>Click <strong style={STRONG}>Copy as Data URI</strong> to paste straight into HTML or CSS.</li>
        </ol>
        <p style={P}>Because the file never leaves your machine, this is safe to use with confidential or work-related assets.</p>

        <h2 style={H2}>Using Base64 in HTML</h2>
        <p style={P}>An <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>&lt;img&gt;</code> tag accepts a data URI as the <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>src</code> attribute. The format is <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>data:[mime-type];base64,[data]</code>.</p>
        <pre style={PRE}><code>{`<img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  alt="1x1 transparent pixel"
  width="20"
  height="20"
/>`}</code></pre>

        <h2 style={H2}>Using Base64 in CSS</h2>
        <p style={P}>Same idea, used as a CSS <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>background-image</code>:</p>
        <pre style={PRE}><code>{`.icon-check {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciLi4uLjwvc3ZnPg==");
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
}`}</code></pre>
        <p style={P}>This is the technique most CSS-in-JS libraries use for inline SVG icons.</p>

        <h2 style={H2}>Base64 in JavaScript</h2>
        <p style={P}>Browsers expose <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>btoa()</code> to encode and <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>atob()</code> to decode. For files, use the <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>FileReader</code> API:</p>
        <pre style={PRE}><code>{`function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// usage
const input = document.querySelector('input[type=file]')
input.addEventListener('change', async e => {
  const dataUri = await fileToBase64(e.target.files[0])
  console.log(dataUri) // "data:image/png;base64,iVBORw0KG..."
})`}</code></pre>

        <h2 style={H2}>Base64 in Python</h2>
        <p style={P}>Python&apos;s standard library has built-in Base64 support:</p>
        <pre style={PRE}><code>{`import base64

# Encode an image file
with open("logo.png", "rb") as f:
    encoded = base64.b64encode(f.read()).decode("ascii")
    data_uri = f"data:image/png;base64,{encoded}"

# Decode back to bytes
raw = base64.b64decode(encoded)
with open("logo-copy.png", "wb") as f:
    f.write(raw)`}</code></pre>

        <h2 style={H2}>Performance Considerations</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>+33% file size.</strong> A 12 KB PNG becomes a 16 KB Base64 string. Multiplied across a page, this adds up fast.</li>
          <li><strong style={STRONG}>No separate caching.</strong> If the HTML changes, the image re-downloads.</li>
          <li><strong style={STRONG}>Parser blocks rendering.</strong> Inline Base64 in the HTML head delays first paint.</li>
          <li><strong style={STRONG}>Lazy loading isn&apos;t possible</strong> the way it is for <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>&lt;img loading=&quot;lazy&quot;&gt;</code>.</li>
          <li><strong style={STRONG}>Better alternatives for icons:</strong> a sprite sheet, an icon font, or a single SVG sprite served once.</li>
        </ul>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>🖼️</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Convert an Image to Base64</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Drag, drop, copy the data URI — all locally, never uploaded.</p>
          <a href="/image-to-base64" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open Image to Base64 →</a>
        </div>

        {/* Related */}
        <div style={{ marginTop:'48px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#0F2A4A',marginBottom:'14px' }}>Related Articles</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <a href="/blog/what-is-json-formatter" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Developer Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>What Is a JSON Formatter and Why Every Developer Needs One</div>
            </a>
            <a href="/blog/best-free-password-generators-2026" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Security</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>10 Best Free Password Generators in 2026</div>
            </a>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'How to Convert Images to Base64: Complete Guide for Developers',
        'description': 'When and how to convert images to Base64 — with HTML, CSS, JavaScript, and Python examples.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

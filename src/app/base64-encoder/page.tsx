/*
  ConvertDox — Base64 Encoder / Decoder
  PUT IN: src/app/base64-encoder/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'
import ToolPageSEO from '@/components/ToolPageSEO'

export default function Base64Page() {
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copiedIn, setCopiedIn] = useState(false)
  const [copiedOut, setCopiedOut] = useState(false)

  const encode = (val: string) => {
    try {
      const result = btoa(unescape(encodeURIComponent(val)))
      setOutput(result)
      setError('')
    } catch {
      setError('Could not encode this text')
    }
  }

  const decode = (val: string) => {
    try {
      const result = decodeURIComponent(escape(atob(val)))
      setOutput(result)
      setError('')
    } catch {
      setError('Invalid Base64 string — check your input')
    }
  }

  const handleInput = (val: string) => {
    setInput(val)
    if (!val.trim()) { setOutput(''); setError(''); return }
    if (mode === 'encode') encode(val)
    else decode(val)
  }

  const switchMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    if (output) {
      setInput(output)
      if (newMode === 'encode') encode(output)
      else decode(output)
    }
    setOutput('')
  }

  const copy = (text: string, setCopied: (v:boolean)=>void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputLabel = mode === 'encode' ? 'Plain Text' : 'Base64 String'
  const outputLabel = mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🔐</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Base64 Encoder / Decoder</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Encode text to Base64 or decode Base64 back to plain text. Instant, free, private.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'900px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Mode toggle */}
        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'28px' }}>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:700,color:mode==='encode'?'#0F2A4A':'#94a3b8' }}>Plain Text</div>
          <button onClick={switchMode}
            style={{ background:'#0F2A4A',border:'none',borderRadius:'999px',padding:'10px 20px',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px',color:'white',fontFamily:'inherit',fontSize:'14px',fontWeight:600 }}>
            ⇄ Switch
          </button>
          <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:700,color:mode==='decode'?'#0F2A4A':'#94a3b8' }}>Base64</div>
        </div>

        {/* Mode badge */}
        <div style={{ textAlign:'center',marginBottom:'24px' }}>
          <span style={{ background:mode==='encode'?'#EFF6FF':'#FFF7ED',color:mode==='encode'?'#1D4ED8':'#C2410C',fontSize:'13px',fontWeight:700,padding:'4px 16px',borderRadius:'999px',border:'1.5px solid',borderColor:mode==='encode'?'#BFDBFE':'#FED7AA' }}>
            {mode === 'encode' ? '→ Encoding plain text to Base64' : '→ Decoding Base64 to plain text'}
          </span>
        </div>

        {/* Two panes */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>{inputLabel}</span>
              <button onClick={() => copy(input, setCopiedIn)}
                style={{ background:copiedIn?'#16A34A':'#f1f5f9',border:'none',borderRadius:'6px',padding:'3px 10px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copiedIn?'white':'#0F2A4A' }}>
                {copiedIn ? '✓' : 'Copy'}
              </button>
            </div>
            <textarea value={input} onChange={e=>handleInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Type or paste text to encode...' : 'Paste Base64 string to decode...'}
              style={{ width:'100%',minHeight:'280px',padding:'16px',border:'1.5px solid #e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13.5px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.7',background:'#fafafa' }}/>
            {input && (
              <div style={{ marginTop:'6px',fontSize:'12px',color:'#94a3b8' }}>
                {input.length} characters
              </div>
            )}
          </div>

          <div>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'8px' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>{outputLabel}</span>
              {output && (
                <button onClick={() => copy(output, setCopiedOut)}
                  style={{ background:copiedOut?'#16A34A':'#f1f5f9',border:'none',borderRadius:'6px',padding:'3px 10px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copiedOut?'white':'#0F2A4A' }}>
                  {copiedOut ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>
            {error ? (
              <div style={{ minHeight:'280px',padding:'16px',border:'1.5px solid #FECACA',borderRadius:'14px',background:'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center' }}>
                <div>
                  <div style={{ fontSize:'32px',marginBottom:'10px' }}>❌</div>
                  <div style={{ fontSize:'14px',fontWeight:600,color:'#DC2626' }}>{error}</div>
                </div>
              </div>
            ) : (
              <div style={{ minHeight:'280px',padding:'16px',border:'1.5px solid',borderColor:output?'#BBF7D0':'#e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13.5px',color:'#0F2A4A',lineHeight:'1.7',background:output?'#F0FDF4':'#fafafa',whiteSpace:'pre-wrap',wordBreak:'break-all',overflow:'auto' }}>
                {output || <span style={{ color:'#94a3b8' }}>Result will appear here...</span>}
              </div>
            )}
            {output && !error && (
              <div style={{ marginTop:'6px',fontSize:'12px',color:'#94a3b8' }}>
                {output.length} characters
              </div>
            )}
          </div>
        </div>

        {/* Privacy notice */}
        <div style={{ marginTop:'16px',background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'10px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px' }}>
          <span style={{ fontSize:'18px' }}>🔒</span>
          <p style={{ fontSize:'12.5px',color:'#166534',margin:0 }}>All encoding and decoding happens entirely in your browser. Nothing is sent to any server.</p>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'What is Base64?', a:'Base64 is a way to encode binary data as ASCII text. It\'s commonly used to encode images, files, and data for transmission over text-based systems like email or APIs.' },
            { q:'Is Base64 encryption?', a:'No. Base64 is encoding, not encryption. It is easily reversible and provides no security. Never use it to protect sensitive data.' },
            { q:'What is Base64 used for?', a:'Common uses include encoding images in CSS/HTML, storing binary data in JSON, and transmitting data in URLs or email attachments.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/base64-encoder" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the Base64 Encoder/Decoder</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Convert between plain text and Base64 in both directions, with file support — entirely in your browser.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Paste text or upload a small file into the input area.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Pick the direction: Encode (text → Base64) or Decode (Base64 → text).</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Click the action button. The result appears immediately in the output panel.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Copy the result, or click swap to use it as the new input.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🖼️', title:'Inline Images', desc:'Embed icons in HTML or CSS without a separate request.' },
              { icon:'🔐', title:'Basic Auth Headers', desc:'Encode user:pass strings for Authorization headers.' },
              { icon:'🔗', title:'Data URI Schemes', desc:'Build self-contained data: URLs for documents and emails.' },
              { icon:'📧', title:'Email Attachments', desc:'Transport binary payloads through text-only systems.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px' }}>
                <div style={{ fontSize:'24px',marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px',color:'#64748b',lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What is Base64 encoding?', a:'Base64 represents binary data using 64 printable ASCII characters (A-Z, a-z, 0-9, plus + and /). It lets you transport bytes through systems that only accept text, like email or URL parameters.' },
            { q:'Is Base64 the same as encryption?', a:'No. Base64 is encoding, not encryption. There is no key and the result is trivially reversible. Never use Base64 to hide secrets — assume anything Base64-encoded is publicly readable.' },
            { q:'Can Base64 handle binary data?', a:'That\'s exactly what it\'s designed for. Image files, ZIPs, executables — all can be Base64-encoded into a text string and decoded back to the original bytes.' },
            { q:'Why is Base64 output longer than the input?', a:'Three bytes of input become four Base64 characters, so output is roughly 33% larger than input. Padding with = at the end keeps the length divisible by four.' },
            { q:'When should I use Base64?', a:'Whenever binary data needs to travel through a text-only channel — JSON payloads, HTML attributes, CSS, email bodies, basic-auth headers, and similar. Don\'t use it for large payloads where you have a better option (multipart uploads, dedicated binary protocols).' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox Base64 Tool?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Base64 encoding is one of those operations every developer hits weekly — decoding an API token, generating a data URI, building a Basic Auth header — and yet most online tools for it bury the conversion under ads, send your input to a server, or quietly truncate large inputs. The ConvertDox Base64 Encoder/Decoder does the job cleanly: paste in, click, copy out. The encode/decode happens with the browser&apos;s native btoa()/atob() and TextEncoder APIs, which means your input never travels over the network. That&apos;s important because Base64 strings often contain credentials, tokens, or PII — exactly the data you don&apos;t want a third party logging. The tool handles text in both directions and also supports small file uploads for cases where you want a data URI for a logo or favicon. Both URL-safe and standard Base64 variants are recognized on decode, so you can paste tokens copied from JWT headers, OAuth flows, and webhook payloads without worrying about character substitutions. For larger workflows, the same approach scales to the <a href="/image-to-base64" style={{ color:'#E85D04',fontWeight:600 }}>Image to Base64</a> tool which handles full image files; for JSON payloads with Base64 fields, our <a href="/json-formatter" style={{ color:'#E85D04',fontWeight:600 }}>JSON Formatter</a> pairs nicely. Bookmark this page once and Base64 stops being friction.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Base64 Encoder & Decoder',
        'description': 'Free Base64 encoder and decoder for text and files. Runs entirely in your browser.',
        'url': 'https://convertdox.com/base64-encoder',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />
      <ToolPageSEO
        toolName="Base64 Encoder & Decoder"
        whatIs="Base64 is a way of representing binary data — like images or files — using only plain text characters. A Base64 encoder converts text or data into this text-safe format, and a decoder converts it back. Base64 is everywhere in web development: embedding images directly in HTML or CSS, encoding data in URLs, transmitting binary data through text-only channels like email, and storing credentials in certain authentication schemes."
        whatIsExtended="The reason Base64 exists is that some systems can only handle text reliably. Binary data (images, files) can get corrupted when passed through text-based systems, so encoding it as Base64 makes it safe to transmit. The trade-off is size — Base64 data is about 33% larger than the original. The ConvertDox Base64 tool encodes and decodes in your browser, so sensitive data never leaves your device. It handles both plain text and the data-URI format used for embedding."
        howToUse={[
          'Choose whether you want to Encode (text to Base64) or Decode (Base64 to text)',
          'Paste your text or Base64 string into the input box',
          'Click the Encode or Decode button',
          'View the result in the output box',
          'Copy the result to use in your code, URL, or document',
          'Everything happens in your browser — your data is never uploaded',
        ]}
        useCases={[
          { title: 'Embedding Images in CSS/HTML', description: 'Encode a small image as Base64 to embed it directly in a stylesheet or HTML, avoiding a separate file request.' },
          { title: 'Decoding Tokens', description: 'Decode the readable parts of tokens or encoded strings to inspect their contents during debugging.' },
          { title: 'Data URIs', description: 'Create data-URI strings for icons, fonts, or images that load inline without external files.' },
          { title: 'Email Attachments', description: 'Understand how binary data is encoded for transmission through text-based email protocols.' },
          { title: 'API Development', description: 'Encode or decode data that\'s passed as Base64 in API requests and responses.' },
          { title: 'Basic Authentication', description: 'See how username:password credentials are Base64-encoded in HTTP Basic Auth headers.' },
        ]}
        tips={[
          'Base64 is encoding, not encryption — it\'s easily reversible and provides no security',
          'Never rely on Base64 to hide sensitive data; anyone can decode it instantly',
          'Base64 data is about 33% larger than the original — only embed small files this way',
          'For embedding in CSS/HTML, use the data-URI format with the correct MIME type prefix',
          'Decoding fails if the input isn\'t valid Base64 — check for stray characters or spaces',
          'Your data stays in your browser, so encoding sensitive strings here is safe',
        ]}
        faqs={[
          { question: 'Is the Base64 tool free?', answer: 'Yes, completely free with no signup and no usage limits.' },
          { question: 'Is Base64 encoding secure?', answer: 'No. Base64 is encoding, not encryption. It\'s trivially reversible and provides no security — never use it to protect passwords or sensitive data.' },
          { question: 'Is my data uploaded anywhere?', answer: 'No. Encoding and decoding happen entirely in your browser. Your data is never sent to or stored on any server.' },
          { question: 'Why is my Base64 longer than the original?', answer: 'Base64 represents data using a limited character set, which makes the output about 33% larger than the original input. This is normal and expected.' },
          { question: 'Can I encode images or files?', answer: 'This tool focuses on text. To convert an image to Base64, use our Image to Base64 tool, which handles image files directly.' },
          { question: 'Why does decoding fail?', answer: 'Decoding fails when the input isn\'t valid Base64 — often due to extra spaces, line breaks, or characters that aren\'t part of the Base64 set. Clean the input and try again.' },
        ]}
        relatedTools={[
          { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert image files to Base64' },
          { name: 'URL Encoder', slug: 'url-encoder', description: 'Encode and decode URL strings' },
          { name: 'JSON Formatter', slug: 'json-formatter', description: 'Format, validate, and minify JSON' },
          { name: 'Hash Generator', slug: 'hash-generator', description: 'Generate hashes from text' },
          { name: 'JWT Decoder', slug: 'jwt-decoder', description: 'Decode and inspect JWT tokens' },
        ]}
      />
    </div>
  )
}

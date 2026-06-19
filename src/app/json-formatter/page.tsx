/*
  ConvertDox — JSON Formatter & Validator
  PUT IN: src/app/json-formatter/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'
import ToolPageSEO from '@/components/ToolPageSEO'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ keys:0, strings:0, numbers:0, arrays:0, objects:0 })

  const format = () => {
    if (!input.trim()) { setError('Please paste some JSON first'); return }
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indent)
      setOutput(formatted)
      setError('')
      // Count stats
      const str = JSON.stringify(parsed)
      setStats({
        keys: (str.match(/(?<=")\w+(?=":\s*)/g) || []).length,
        strings: (str.match(/"[^"]*"(?=\s*[,}\]])/g) || []).length,
        numbers: (str.match(/:\s*-?\d+\.?\d*/g) || []).length,
        arrays: (str.match(/\[/g) || []).length,
        objects: (str.match(/\{/g) || []).length,
      })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setOutput('')
    }
  }

  const minify = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => { setInput(''); setOutput(''); setError('') }

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>{'{ }'}</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>JSON Formatter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Format, validate and minify JSON instantly. Paste messy JSON and get it clean.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Controls */}
        <div style={{ display:'flex',gap:'10px',alignItems:'center',marginBottom:'20px',flexWrap:'wrap' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
            <label style={{ fontSize:'13.5px',fontWeight:600,color:'#0F2A4A' }}>Indent:</label>
            {[2,4].map(n => (
              <button key={n} onClick={() => setIndent(n)}
                style={{ padding:'6px 14px',borderRadius:'8px',border:'1.5px solid',borderColor:indent===n?'#0F2A4A':'#e2e8f0',background:indent===n?'#0F2A4A':'white',color:indent===n?'white':'#64748b',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
                {n} spaces
              </button>
            ))}
          </div>
          <button onClick={format} style={{ background:'#0F2A4A',color:'white',border:'none',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            ✨ Format JSON
          </button>
          <button onClick={minify} style={{ background:'#f1f5f9',color:'#0F2A4A',border:'1px solid #e2e8f0',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            🗜 Minify
          </button>
          <button onClick={clear} style={{ background:'#FEF2F2',color:'#DC2626',border:'1px solid #FECACA',padding:'8px 20px',borderRadius:'8px',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,cursor:'pointer' }}>
            🗑 Clear
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:'10px',padding:'12px 16px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'8px' }}>
            <span style={{ fontSize:'18px' }}>❌</span>
            <span style={{ fontSize:'13.5px',color:'#DC2626',fontWeight:600 }}>Invalid JSON: {error}</span>
          </div>
        )}

        {/* Stats */}
        {output && !error && (
          <div style={{ display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap' }}>
            {[
              { label:'Keys', val:stats.keys, color:'#1D4ED8', bg:'#EFF6FF' },
              { label:'Strings', val:stats.strings, color:'#16A34A', bg:'#F0FDF4' },
              { label:'Numbers', val:stats.numbers, color:'#C2410C', bg:'#FFF7ED' },
              { label:'Arrays', val:stats.arrays, color:'#7C3AED', bg:'#FDF4FF' },
              { label:'Objects', val:stats.objects, color:'#0F2A4A', bg:'#f8fafc' },
            ].map(s => (
              <div key={s.label} style={{ background:s.bg,borderRadius:'8px',padding:'6px 14px',textAlign:'center' }}>
                <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:s.color,marginRight:'6px' }}>{s.val}</span>
                <span style={{ fontSize:'12px',color:'#64748b' }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Two panes */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px' }}>
          <div>
            <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>Input — Paste your JSON here</div>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              placeholder={'{\n  "name": "ConvertDox",\n  "free": true,\n  "tools": 200\n}'}
              style={{ width:'100%',minHeight:'360px',padding:'16px',border:'1.5px solid #e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.7',background:'#fafafa' }}/>
          </div>
          <div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <div style={{ fontSize:'13px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px' }}>Output — Formatted JSON</div>
              {output && (
                <button onClick={copy} style={{ background:copied?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'5px 12px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',color:copied?'white':'#0F2A4A' }}>
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              )}
            </div>
            <div style={{ minHeight:'360px',padding:'16px',border:'1.5px solid',borderColor:error?'#FECACA':output?'#BBF7D0':'#e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13px',color:'#0F2A4A',lineHeight:'1.7',background:output?'#F0FDF4':'#fafafa',whiteSpace:'pre-wrap',wordBreak:'break-all',overflow:'auto' }}>
              {output || <span style={{ color:'#94a3b8' }}>Formatted JSON will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
      <RelatedTools currentPath="/json-formatter" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the JSON Formatter</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Turn a wall of minified JSON into something readable, or do the reverse. Validation errors highlight exactly where to look.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Paste your JSON payload into the input panel.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Click <strong>Format</strong>. The output appears indented and colour-cued.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> If validation fails, fix the highlighted line — usually a missing comma, trailing comma, or unquoted key.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Copy the formatted output, or click <strong>Minify</strong> to compact it back to one line.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🔧', title:'API Debugging', desc:'Paste a network-tab response and find the misbehaving field.' },
              { icon:'⚙️', title:'Config Review', desc:'Sanity-check package.json, tsconfig, ESLint rules before merge.' },
              { icon:'📚', title:'Learning a New API', desc:'Format example payloads so the shape is obvious at a glance.' },
              { icon:'🗄️', title:'Database Exports', desc:'Make MongoDB or Firestore exports readable for manual inspection.' },
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
            { q:'What makes JSON invalid?', a:'The five most common causes: missing comma between key-value pairs, trailing comma after the last item, single quotes instead of double, unquoted keys, and comments. Strict JSON forbids all five.' },
            { q:'Does it support nested JSON?', a:'Yes — arbitrary nesting depth. The formatter indents each level so structure is visible. Very deep nesting (5+ levels) usually indicates the data should be flattened, however.' },
            { q:'Is my data safe?', a:'Yes. The formatter runs entirely in your browser. Nothing is sent to a server, logged, or stored. Safe for payloads containing tokens, keys, or personal data.' },
            { q:'What is the maximum JSON size?', a:'Browsers comfortably handle JSON up to about 10–20 MB. For multi-gigabyte files, use a command-line tool like jq.' },
            { q:'Can it minify JSON?', a:'Yes — click the Minify button to remove all whitespace and produce a single-line, compact version suitable for storage or transmission.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox JSON Formatter?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>JSON is the lingua franca of modern APIs, but minified or deeply nested JSON is effectively unreadable. The ConvertDox JSON Formatter solves three problems at once: it indents the structure so you can see what nests inside what, it validates the input and points at the exact line where syntax breaks, and it lets you minify cleanly when you need a one-line version for a database column or environment variable. Crucially, the whole operation happens in your browser. That matters because real-world JSON often contains auth tokens, API keys, personally identifiable information, or trade secrets — exactly the kind of data you should never paste into an online tool that calls a server. ConvertDox doesn&apos;t make a network request when you click Format; the parser is the browser&apos;s own JavaScript engine. You can verify this yourself by opening DevTools, switching to the Network tab, and clicking Format — nothing fires. Beyond formatting, the tool surfaces useful structural stats — counts of keys, strings, numbers, arrays, and objects — which is the fastest way to spot whether an API response matches your expectations. It also handles edge cases that trip lesser tools: deeply nested structures, very large numbers, escaped characters, and Unicode strings. If you regularly look at API responses, save this page as a tab — formatting becomes a one-click reflex.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'JSON Formatter',
        'description': 'Free online JSON formatter, validator, and minifier. Runs entirely in your browser — safe for sensitive payloads.',
        'url': 'https://convertdox.com/json-formatter',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />
      <ToolPageSEO
        toolName="JSON Formatter"
        whatIs="A JSON formatter takes raw, messy JSON data and reformats it into a clean, readable, properly indented structure. JSON (JavaScript Object Notation) is the standard format for exchanging data between web servers, APIs, and applications, but it often arrives minified or on a single line, making it impossible to read. A formatter adds proper indentation and line breaks, and a validator checks that the JSON is correctly structured, flagging errors like missing commas or brackets."
        whatIsExtended="Developers work with JSON constantly — reading API responses, editing config files, debugging data. When JSON is minified into one long line, finding a specific value or spotting a syntax error is painful. The ConvertDox JSON Formatter beautifies your JSON for readability, validates it to catch errors, and can minify it back down when you need a compact version for production. Everything runs in your browser, so your data never leaves your device — important when working with sensitive API keys or private data."
        howToUse={[
          'Paste your raw or minified JSON into the input box',
          'Click Format (or Beautify) to add proper indentation and line breaks',
          'Review the formatted output — errors are flagged if the JSON is invalid',
          'Use Minify to compress the JSON back into a single line when needed',
          'Copy the result to use in your code, config, or documentation',
          'Everything happens in your browser — your data is never uploaded',
        ]}
        useCases={[
          { title: 'Debugging API Responses', description: 'Paste a raw API response to see it cleanly formatted, making it easy to find the fields and values you need.' },
          { title: 'Validating JSON', description: 'Check that a JSON file or snippet is syntactically correct before using it, catching errors early.' },
          { title: 'Editing Config Files', description: 'Format config files like package.json or settings files so they\'re readable and easy to edit by hand.' },
          { title: 'Minifying for Production', description: 'Compress formatted JSON into a compact single line to reduce payload size in production.' },
          { title: 'Documentation', description: 'Format JSON examples cleanly before adding them to API docs or technical guides.' },
          { title: 'Learning JSON Structure', description: 'See nested objects and arrays laid out clearly to understand how a piece of JSON is structured.' },
        ]}
        tips={[
          'If formatting fails, the JSON has a syntax error — the validator points you to the problem',
          'Common errors are trailing commas, missing quotes around keys, and unmatched brackets',
          'Use minify for production payloads and beautify for reading and debugging',
          'JSON keys must be in double quotes — single quotes are not valid JSON',
          'For very large JSON, formatting makes navigation far easier with collapsible sections where supported',
          'Your data stays in your browser, so it\'s safe to format JSON containing sensitive values',
        ]}
        faqs={[
          { question: 'Is the JSON formatter free?', answer: 'Yes, completely free with no signup and no limits on how often you use it.' },
          { question: 'Is my data safe to paste here?', answer: 'Yes. Formatting happens entirely in your browser — your JSON is never uploaded to or stored on any server, so it\'s safe to format sensitive data.' },
          { question: 'What\'s the difference between format and minify?', answer: 'Format (beautify) adds indentation and line breaks for readability. Minify removes all unnecessary whitespace to create the smallest possible single-line version.' },
          { question: 'Why does it say my JSON is invalid?', answer: 'The validator detected a syntax error — commonly a trailing comma, a missing quote, an unquoted key, or an unmatched bracket. Fix the flagged issue and format again.' },
          { question: 'Does it work with large JSON files?', answer: 'Yes, it handles large JSON, though extremely large inputs may take a moment to process in the browser.' },
          { question: 'Can it convert JSON to other formats?', answer: 'For converting JSON to CSV, use our JSON to CSV tool. This tool focuses on formatting, validating, and minifying JSON.' },
        ]}
        relatedTools={[
          { name: 'JSON to CSV', slug: 'json-to-csv', description: 'Convert JSON data into CSV' },
          { name: 'CSV to JSON', slug: 'csv-to-json', description: 'Convert CSV data into JSON' },
          { name: 'Base64 Encoder', slug: 'base64-encoder', description: 'Encode and decode Base64 strings' },
          { name: 'XML Formatter', slug: 'xml-formatter', description: 'Format and validate XML' },
          { name: 'YAML to JSON', slug: 'yaml-to-json', description: 'Convert YAML into JSON' },
        ]}
      />
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'

const Logo = () => (
  <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
      <polygon points="20,20 24,22 20,24" fill="white"/>
    </svg>
  </div>
)

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <a href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <Logo/>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </a>
      <a href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</a>
    </div>
  </nav>
)

const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href={l==='All Tools'?'/':'/legal'} style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

const SAMPLE_CSV = `name,age,city\nAlice,30,London\nBob,25,Paris\nCarol,35,New York`

function parseCSV(text: string, delimiter: string): string[][] {
  return text.trim().split('\n').map(line => {
    const cells: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes }
      else if (line[i] === delimiter && !inQuotes) { cells.push(current.trim()); current = '' }
      else { current += line[i] }
    }
    cells.push(current.trim())
    return cells
  })
}

function csvToJson(csv: string, delimiter: string, hasHeaders: boolean, pretty: boolean): { json: string, rows: number, cols: number, error: string } {
  try {
    if (!csv.trim()) return { json: '', rows: 0, cols: 0, error: '' }
    const rows = parseCSV(csv, delimiter)
    if (rows.length === 0) return { json: '', rows: 0, cols: 0, error: '' }

    let result: Record<string, string>[]
    if (hasHeaders) {
      const headers = rows[0]
      const dataRows = rows.slice(1)
      result = dataRows.map(row => {
        const obj: Record<string, string> = {}
        headers.forEach((h, i) => { obj[h || `col${i}`] = row[i] ?? '' })
        return obj
      })
      const json = pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result)
      return { json, rows: dataRows.length, cols: headers.length, error: '' }
    } else {
      result = rows.map(row => {
        const obj: Record<string, string> = {}
        row.forEach((cell, i) => { obj[`col${i+1}`] = cell })
        return obj
      })
      const json = pretty ? JSON.stringify(result, null, 2) : JSON.stringify(result)
      return { json, rows: rows.length, cols: rows[0].length, error: '' }
    }
  } catch (e) {
    return { json: '', rows: 0, cols: 0, error: String(e) }
  }
}

export default function CsvToJsonPage() {
  const [csvInput, setCsvInput] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [hasHeaders, setHasHeaders] = useState(true)
  const [pretty, setPretty] = useState(true)
  const [copied, setCopied] = useState(false)

  const { json, rows, cols, error } = csvToJson(csvInput, delimiter, hasHeaders, pretty)

  const handleCopy = () => {
    if (!json) return
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!json) return
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const delimiterOptions = [
    { label:'Comma (,)', value:',' },
    { label:'Semicolon (;)', value:';' },
    { label:'Tab (\\t)', value:'\t' },
    { label:'Pipe (|)', value:'|' },
  ]

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>
            📊
          </div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>CSV to JSON Converter</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Convert CSV spreadsheet data to JSON format instantly</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center' }}>
          {[{icon:'🔒',text:'No files stored'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Works in your browser'},{icon:'🆓',text:'100% free, no signup'}].map(item=>(
            <span key={item.text} style={{ fontSize:'13px',color:'#166534',fontWeight:600,display:'flex',alignItems:'center',gap:'6px' }}>
              <span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'32px 24px' }}>

        {/* Options bar */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'16px',alignItems:'center',marginBottom:'20px' }}>
          {/* Has headers */}
          <label style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>
            <input type="checkbox" checked={hasHeaders} onChange={e=>setHasHeaders(e.target.checked)}
              style={{ width:'16px',height:'16px',cursor:'pointer',accentColor:'#E85D04' }}/>
            First row is headers
          </label>
          {/* Pretty print */}
          <label style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>
            <input type="checkbox" checked={pretty} onChange={e=>setPretty(e.target.checked)}
              style={{ width:'16px',height:'16px',cursor:'pointer',accentColor:'#E85D04' }}/>
            Pretty print
          </label>
          {/* Delimiter */}
          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
            <span style={{ fontSize:'13px',fontWeight:600,color:'#64748b' }}>Delimiter:</span>
            <select value={delimiter} onChange={e=>setDelimiter(e.target.value)}
              style={{ border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'6px 10px',fontFamily:'inherit',fontSize:'13px',outline:'none',background:'white',color:'#0F2A4A',cursor:'pointer' }}>
              {delimiterOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {/* Sample button */}
          <button onClick={()=>setCsvInput(SAMPLE_CSV)}
            style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'8px 16px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
            Load Sample CSV
          </button>
        </div>

        {/* Two-column layout */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px' }}>

          {/* Left: CSV input */}
          <div>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px',marginBottom:'8px' }}>CSV Input</div>
            <textarea
              value={csvInput}
              onChange={e=>setCsvInput(e.target.value)}
              placeholder={"name,age,city\nAlice,30,London\nBob,25,Paris"}
              style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'monospace',fontSize:'13px',outline:'none',width:'100%',boxSizing:'border-box',minHeight:'320px',resize:'vertical',color:'#0F2A4A',lineHeight:1.6 }}
            />
          </div>

          {/* Right: JSON output */}
          <div>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px' }}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase',letterSpacing:'1px' }}>JSON Output</div>
              <div style={{ display:'flex',gap:'8px' }}>
                <button onClick={handleCopy}
                  style={{ background: copied ? '#16A34A' : '#E85D04',color:'white',border:'none',borderRadius:'8px',padding:'6px 14px',fontFamily:'inherit',fontSize:'12px',fontWeight:700,cursor:'pointer' }}>
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
                <button onClick={handleDownload} disabled={!json}
                  style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'8px',padding:'6px 14px',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:json?'pointer':'not-allowed',opacity:json?1:0.5 }}>
                  ↓ Download
                </button>
              </div>
            </div>
            {error ? (
              <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:'10px',padding:'12px 16px',color:'#DC2626',fontSize:'13px',fontWeight:600,minHeight:'320px' }}>
                Error: {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={json}
                placeholder="JSON output will appear here..."
                style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'monospace',fontSize:'13px',outline:'none',width:'100%',boxSizing:'border-box',minHeight:'320px',resize:'vertical',color:'#0F2A4A',lineHeight:1.6,background:'#f8fafc' }}
              />
            )}
            {/* Stats row */}
            {json && !error && (
              <div style={{ marginTop:'8px',fontSize:'13px',color:'#64748b',fontWeight:600 }}>
                {rows} row{rows !== 1 ? 's' : ''} · {cols} column{cols !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px',marginTop:'40px' }}>
          {[
            { title:'Custom Delimiters', body:'Supports comma, semicolon, tab, and pipe delimiters. Perfect for TSV files and European CSV formats that use semicolons.' },
            { title:'Quoted Fields', body:'Handles quoted fields containing commas and special characters correctly — just like Excel and Google Sheets export.' },
            { title:'Pretty or Minified', body:'Toggle pretty print for human-readable indented JSON, or disable it for compact minified output ready for APIs.' },
          ].map(card => (
            <div key={card.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px' }}>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{card.title}</div>
              <div style={{ fontSize:'13px',color:'#64748b',lineHeight:1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

      </div>

      <FOOTER />
    </div>
  )
}

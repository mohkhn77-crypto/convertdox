'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Lang = 'json' | 'html' | 'css' | 'js' | 'sql' | 'xml'
type IndentType = '2' | '4' | 'tab'

const SQL_KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ON', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'LIMIT', 'OFFSET', 'UNION', 'AS']

function getIndent(type: IndentType): string {
  if (type === 'tab') return '\t'
  return ' '.repeat(parseInt(type))
}

function beautifyJSON(code: string, indent: IndentType): string {
  try {
    return JSON.stringify(JSON.parse(code), null, getIndent(indent))
  } catch (e) {
    throw new Error('Invalid JSON: ' + (e as Error).message)
  }
}

function minifyJSON(code: string): string {
  try {
    return JSON.stringify(JSON.parse(code))
  } catch (e) {
    throw new Error('Invalid JSON: ' + (e as Error).message)
  }
}

function beautifyCSS(code: string): string {
  return code
    .replace(/\s*\{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*\}\s*/g, '\n}\n')
    .replace(/,\s*/g, ',\n')
    .trim()
}

function minifyCSS(code: string): string {
  return code.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/;\s*/g, ';').replace(/\s*}\s*/g, '}').trim()
}

function beautifyJS(code: string): string {
  let result = ''
  let indent = 0
  const ind = '  '
  let i = 0
  while (i < code.length) {
    const ch = code[i]
    if (ch === '{' || ch === '[') {
      result += ch + '\n' + ind.repeat(++indent)
    } else if (ch === '}' || ch === ']') {
      result += '\n' + ind.repeat(--indent) + ch
    } else if (ch === ';') {
      result += ch + '\n' + ind.repeat(indent)
    } else {
      result += ch
    }
    i++
  }
  return result.replace(/\n\s*\n/g, '\n').trim()
}

function minifyJS(code: string): string {
  return code.replace(/\s+/g, ' ').replace(/\s*([{}();,])\s*/g, '$1').trim()
}

function beautifyHTML(code: string, indent: IndentType): string {
  const ind = getIndent(indent)
  let level = 0
  return code
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map(line => {
      line = line.trim()
      if (!line) return ''
      if (line.startsWith('</')) { level-- }
      const result = ind.repeat(Math.max(0, level)) + line
      if (line.startsWith('<') && !line.startsWith('</') && !line.startsWith('<!') && !line.endsWith('/>') && !line.includes('</')) { level++ }
      return result
    })
    .filter(l => l)
    .join('\n')
}

function minifyHTML(code: string): string {
  return code.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
}

function beautifySQL(code: string): string {
  let result = code.toUpperCase()
  SQL_KEYWORDS.forEach(kw => {
    result = result.replace(new RegExp('\\b' + kw + '\\b', 'g'), '\n' + kw)
  })
  return result.replace(/\n\s*\n/g, '\n').trim()
}

function beautifyXML(code: string, indent: IndentType): string {
  const ind = getIndent(indent)
  let level = 0
  return code
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map(line => {
      line = line.trim()
      if (!line) return ''
      if (line.startsWith('</')) level--
      const result = ind.repeat(Math.max(0, level)) + line
      if (line.startsWith('<') && !line.startsWith('</') && !line.startsWith('<?') && !line.endsWith('/>') && !line.includes('</')) level++
      return result
    })
    .filter(l => l)
    .join('\n')
}

function minifyXML(code: string): string {
  return code.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
}

export default function CodeBeautifierPage() {
  const [lang, setLang] = useState<Lang>('json')
  const [indent, setIndent] = useState<IndentType>('2')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function process(action: 'beautify' | 'minify') {
    setError('')
    try {
      let result = ''
      if (lang === 'json') result = action === 'beautify' ? beautifyJSON(input, indent) : minifyJSON(input)
      else if (lang === 'css') result = action === 'beautify' ? beautifyCSS(input) : minifyCSS(input)
      else if (lang === 'js') result = action === 'beautify' ? beautifyJS(input) : minifyJS(input)
      else if (lang === 'html') result = action === 'beautify' ? beautifyHTML(input, indent) : minifyHTML(input)
      else if (lang === 'sql') result = action === 'beautify' ? beautifySQL(input) : input.replace(/\s+/g, ' ').trim()
      else if (lang === 'xml') result = action === 'beautify' ? beautifyXML(input, indent) : minifyXML(input)
      setOutput(result)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const inputLines = input.split('\n').length
  const outputLines = output.split('\n').length

  const LANGS: { id: Lang; label: string }[] = [
    { id: 'json', label: 'JSON' },
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
    { id: 'sql', label: 'SQL' },
    { id: 'xml', label: 'XML' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Code Beautifier</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Format and beautify HTML, CSS, JS, SQL, XML, and JSON</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {LANGS.map(l => (
              <button key={l.id} onClick={() => { setLang(l.id); setOutput(''); setError('') }}
                style={{ padding: '9px 16px', borderRadius: '8px', border: '2px solid', borderColor: lang === l.id ? '#0F2A4A' : '#e2e8f0', background: lang === l.id ? '#0F2A4A' : 'white', color: lang === l.id ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
            {(['2', '4', 'tab'] as IndentType[]).map(i => (
              <button key={i} onClick={() => setIndent(i)}
                style={{ padding: '8px 14px', borderRadius: '8px', border: '1.5px solid', borderColor: indent === i ? '#E85D04' : '#e2e8f0', background: indent === i ? '#fff7ed' : 'white', color: indent === i ? '#c2410c' : '#64748b', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                {i === 'tab' ? 'Tab' : `${i} spaces`}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <button onClick={() => process('beautify')} style={{ flex: 1, padding: '14px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>
            ✨ Beautify
          </button>
          <button onClick={() => process('minify')} style={{ flex: 1, padding: '14px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            🗜️ Minify
          </button>
        </div>

        {/* Editor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Input</span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{inputLines} lines</span>
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={`Paste ${lang.toUpperCase()} here...`}
              rows={20}
              style={{ width: '100%', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', color: '#374151', background: '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Output</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{outputLines} lines</span>
                {output && <button onClick={copy} style={{ padding: '4px 12px', background: copied ? '#dcfce7' : '#0F2A4A', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>{copied ? '✓ Copied' : 'Copy'}</button>}
              </div>
            </div>
            {error && <div style={{ background: '#fee2e2', border: '1.5px solid #fca5a5', borderRadius: '10px', padding: '12px', marginBottom: '8px', color: '#dc2626', fontSize: '13px' }}>{error}</div>}
            <textarea
              readOnly
              value={output}
              rows={20}
              placeholder="Output will appear here..."
              style={{ width: '100%', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', color: '#374151', background: output ? '#f0fdf4' : '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

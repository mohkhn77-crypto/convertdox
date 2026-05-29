'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function formatXML(xml: string): { result: string; error: string | null } {
  // Validate using DOMParser
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xml.trim(), 'text/xml')
    const parseError = doc.querySelector('parsererror')
    if (parseError) {
      return { result: '', error: parseError.textContent || 'XML parse error' }
    }
  } catch {
    return { result: '', error: 'XML parse error' }
  }

  let formatted = ''
  let indent = 0
  const INDENT = '  '

  // Simple token-based formatter
  const tokens = xml.trim()
    .replace(/>\s*</g, '><')
    .split(/(<[^>]+>)/)
    .filter(t => t.trim())

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].trim()
    if (!token) continue

    if (token.startsWith('</')) {
      // Closing tag
      indent--
      formatted += INDENT.repeat(Math.max(0, indent)) + token + '\n'
    } else if (token.startsWith('<?') || token.startsWith('<!')) {
      // Declaration or comment
      formatted += INDENT.repeat(indent) + token + '\n'
    } else if (token.startsWith('<') && !token.endsWith('/>')) {
      // Opening tag
      formatted += INDENT.repeat(indent) + token + '\n'
      indent++
    } else if (token.startsWith('<') && token.endsWith('/>')) {
      // Self-closing tag
      formatted += INDENT.repeat(indent) + token + '\n'
    } else {
      // Text content
      if (token.trim()) {
        formatted += INDENT.repeat(indent) + token.trim() + '\n'
      }
    }
  }

  return { result: formatted.trim(), error: null }
}

function minifyXML(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
}

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore><book category="fiction"><title lang="en">Harry Potter</title><author>J K. Rowling</author><year>2005</year><price>29.99</price></book><book category="children"><title lang="en">Learning XML</title><author>Erik T. Ray</author><year>2003</year><price>39.95</price></book></bookstore>`

export default function XMLFormatterPage() {
  const [input, setInput] = useState(SAMPLE)
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function format() {
    const { result, error: err } = formatXML(input)
    setOutput(result)
    setError(err)
  }

  function minify() {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input.trim(), 'text/xml')
      const parseError = doc.querySelector('parsererror')
      if (parseError) { setError(parseError.textContent || 'Parse error'); return }
      setOutput(minifyXML(input))
      setError(null)
    } catch {
      setError('XML parse error')
    }
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📋</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>XML Formatter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Format, validate and minify XML code online</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button onClick={format}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Format XML
          </button>
          <button onClick={minify}
            style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Minify XML
          </button>
          {output && (
            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 'auto' }}>
              {copied ? 'Copied!' : 'Copy Output'}
            </button>
          )}
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#DC2626', fontSize: '13px', fontFamily: 'monospace' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>XML Input</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={24}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Formatted Output</div>
            <textarea value={output} readOnly rows={24}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

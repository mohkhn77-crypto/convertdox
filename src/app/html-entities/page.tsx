'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const NAMED_ENTITIES: Record<string, string> = {
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '…': '&hellip;',
  '—': '&mdash;',
  '–': '&ndash;',
  '“': '&ldquo;',
  '”': '&rdquo;',
  '‘': '&lsquo;',
  '’': '&rsquo;',
  '£': '&pound;',
  '€': '&euro;',
  '¥': '&yen;',
  '°': '&deg;',
  '±': '&plusmn;',
  '×': '&times;',
  '÷': '&divide;',
  '½': '&frac12;',
  '¼': '&frac14;',
  '¾': '&frac34;',
  '§': '&sect;',
  '¶': '&para;',
  '†': '&dagger;',
  '‡': '&Dagger;',
}

const NAMED_DECODE: Record<string, string> = Object.fromEntries(
  Object.entries(NAMED_ENTITIES).map(([char, entity]) => [entity, char])
)

function encodeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/[©®™…—–""''£€¥°±×÷½¼¾§¶†‡]/g, char => NAMED_ENTITIES[char] || char)
}

function decodeHTML(str: string): string {
  let result = str
  // Decode named entities
  for (const [entity, char] of Object.entries(NAMED_DECODE)) {
    result = result.split(entity).join(char)
  }
  // Decode basic entities
  result = result
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
  return result
}

const REFERENCE = [
  { char: '<', entity: '&lt;', desc: 'Less than' },
  { char: '>', entity: '&gt;', desc: 'Greater than' },
  { char: '&', entity: '&amp;', desc: 'Ampersand' },
  { char: '"', entity: '&quot;', desc: 'Double quote' },
  { char: "'", entity: '&#39;', desc: 'Single quote' },
  { char: '©', entity: '&copy;', desc: 'Copyright' },
  { char: '®', entity: '&reg;', desc: 'Registered' },
  { char: '™', entity: '&trade;', desc: 'Trademark' },
  { char: '€', entity: '&euro;', desc: 'Euro' },
  { char: '£', entity: '&pound;', desc: 'Pound' },
  { char: '°', entity: '&deg;', desc: 'Degree' },
  { char: '—', entity: '&mdash;', desc: 'Em dash' },
  { char: '…', entity: '&hellip;', desc: 'Ellipsis' },
  { char: '×', entity: '&times;', desc: 'Multiplication' },
  { char: '÷', entity: '&divide;', desc: 'Division' },
  { char: '½', entity: '&frac12;', desc: 'One half' },
]

export default function HTMLEntitiesPage() {
  const [input, setInput] = useState('<h1>Hello & "World"</h1>\n© 2024 — All Rights Reserved™')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  function process() {
    setOutput(mode === 'encode' ? encodeHTML(input) : decodeHTML(input))
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
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, fontFamily: 'monospace', color: '#E85D04' }}>&amp;</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>HTML Entity Encoder</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Encode and decode HTML entities instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {([['encode', 'Encode'], ['decode', 'Decode']] as const).map(([key, label]) => (
              <button key={key} onClick={() => { setMode(key); setOutput('') }}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: mode === key ? '#0F2A4A' : '#e2e8f0', background: mode === key ? '#0F2A4A' : 'white', color: mode === key ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={process}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          {output && (
            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Input</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={12}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Output</div>
            <textarea value={output} readOnly rows={12}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>

        {/* Reference table */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Common HTML Entities Reference</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#0F2A4A' }}>
                  {['Character', 'Entity', 'Description'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'white', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REFERENCE.map((row, i) => (
                  <tr key={row.entity} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', fontSize: '18px', color: '#E85D04', fontWeight: 700 }}>{row.char}</td>
                    <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#374151', cursor: 'pointer' }}
                      onClick={() => setInput(prev => prev + row.entity)}>{row.entity}</td>
                    <td style={{ padding: '6px 12px', color: '#64748b' }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

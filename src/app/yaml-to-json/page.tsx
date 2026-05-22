'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

// Simple YAML parser
function parseYAML(yaml: string): unknown {
  const lines = yaml.split('\n')

  function parseValue(val: string): unknown {
    const v = val.trim()
    if (v === 'true' || v === 'yes') return true
    if (v === 'false' || v === 'no') return false
    if (v === 'null' || v === '~' || v === '') return null
    if (/^-?\d+$/.test(v)) return parseInt(v)
    if (/^-?\d*\.\d+$/.test(v)) return parseFloat(v)
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      return v.slice(1, -1)
    }
    return v
  }

  function getIndent(line: string): number {
    return line.match(/^(\s*)/)?.[1].length ?? 0
  }

  function parseBlock(startIdx: number, baseIndent: number): [unknown, number] {
    const firstLine = lines[startIdx]
    const firstTrimmed = firstLine.trim()

    // Check if it's a list
    if (firstTrimmed.startsWith('- ') || firstTrimmed === '-') {
      const arr: unknown[] = []
      let i = startIdx
      while (i < lines.length) {
        const line = lines[i]
        if (line.trim() === '' || line.trim().startsWith('#')) { i++; continue }
        const indent = getIndent(line)
        if (indent < baseIndent) break
        const trimmed = line.trim()
        if (trimmed.startsWith('- ')) {
          const rest = trimmed.slice(2).trim()
          if (rest) {
            arr.push(parseValue(rest))
          } else if (i + 1 < lines.length) {
            const nextIndent = getIndent(lines[i + 1])
            const [val, nextI] = parseBlock(i + 1, nextIndent)
            arr.push(val)
            i = nextI
            continue
          }
        }
        i++
      }
      return [arr, i]
    }

    // Object
    const obj: Record<string, unknown> = {}
    let i = startIdx
    while (i < lines.length) {
      const line = lines[i]
      if (line.trim() === '' || line.trim().startsWith('#')) { i++; continue }
      const indent = getIndent(line)
      if (indent < baseIndent) break
      const trimmed = line.trim()
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) { i++; continue }
      const key = trimmed.slice(0, colonIdx).trim()
      const rest = trimmed.slice(colonIdx + 1).trim()

      if (rest) {
        obj[key] = parseValue(rest)
      } else if (i + 1 < lines.length) {
        const nextIndent = getIndent(lines[i + 1])
        if (nextIndent > indent) {
          const [val, nextI] = parseBlock(i + 1, nextIndent)
          obj[key] = val
          i = nextI
          continue
        } else {
          obj[key] = null
        }
      } else {
        obj[key] = null
      }
      i++
    }
    return [obj, i]
  }

  // Find first non-empty line
  let startIdx = 0
  while (startIdx < lines.length && (lines[startIdx].trim() === '' || lines[startIdx].trim().startsWith('#'))) {
    startIdx++
  }
  if (startIdx >= lines.length) return null
  const baseIndent = getIndent(lines[startIdx])
  const [result] = parseBlock(startIdx, baseIndent)
  return result
}

// JSON to YAML converter
function jsonToYAML(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (obj === null || obj === undefined) return 'null'
  if (typeof obj === 'boolean') return obj ? 'true' : 'false'
  if (typeof obj === 'number') return String(obj)
  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(':') || obj.includes('#') || obj.includes('"') || obj.includes("'")) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return obj
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    return obj.map(item => {
      const val = jsonToYAML(item, indent + 1)
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const lines = val.split('\n')
        return `${pad}- ${lines[0]}\n${lines.slice(1).join('\n')}`
      }
      return `${pad}- ${val}`
    }).join('\n')
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    return entries.map(([k, v]) => {
      if (typeof v === 'object' && v !== null) {
        return `${pad}${k}:\n${jsonToYAML(v, indent + 1)}`
      }
      return `${pad}${k}: ${jsonToYAML(v, indent)}`
    }).join('\n')
  }
  return String(obj)
}

const SAMPLE_YAML = `name: John Doe
age: 30
active: true
address:
  street: 123 Main St
  city: New York
  zip: "10001"
hobbies:
  - reading
  - coding
  - hiking
scores:
  math: 95
  english: 88`

export default function YAMLToJSONPage() {
  const [direction, setDirection] = useState<'yaml2json' | 'json2yaml'>('yaml2json')
  const [input, setInput] = useState(SAMPLE_YAML)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function convert() {
    setError('')
    try {
      if (direction === 'yaml2json') {
        const parsed = parseYAML(input)
        setOutput(JSON.stringify(parsed, null, 2))
      } else {
        const parsed = JSON.parse(input)
        setOutput(jsonToYAML(parsed))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error')
      setOutput('')
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
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>↔️</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>YAML ↔ JSON Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between YAML and JSON formats instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {([['yaml2json', 'YAML → JSON'], ['json2yaml', 'JSON → YAML']] as const).map(([key, label]) => (
              <button key={key} onClick={() => { setDirection(key); setOutput(''); setError('') }}
                style={{ padding: '10px 18px', borderRadius: '10px', border: '1.5px solid', borderColor: direction === key ? '#0F2A4A' : '#e2e8f0', background: direction === key ? '#0F2A4A' : 'white', color: direction === key ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={convert}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Convert
          </button>
          {output && (
            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#DC2626', fontSize: '13px' }}>
            Error: {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              {direction === 'yaml2json' ? 'YAML Input' : 'JSON Input'}
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={22}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              {direction === 'yaml2json' ? 'JSON Output' : 'YAML Output'}
            </div>
            <textarea value={output} readOnly rows={22}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

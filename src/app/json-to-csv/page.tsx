'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function escapeCSV(val: unknown): string {
  const str = val === null || val === undefined ? '' : String(val)
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"'
  }
  return str
}

function jsonToCSV(json: string): { csv: string; rows: number; cols: number; error: string } {
  try {
    const data = JSON.parse(json)
    if (!Array.isArray(data)) return { csv: '', rows: 0, cols: 0, error: 'Input must be a JSON array of objects' }
    if (data.length === 0) return { csv: '', rows: 0, cols: 0, error: 'Array is empty' }
    const headers = Object.keys(data[0])
    const lines = [headers.map(escapeCSV).join(',')]
    for (const row of data) {
      lines.push(headers.map(h => escapeCSV((row as Record<string, unknown>)[h])).join(','))
    }
    return { csv: lines.join('\n'), rows: data.length, cols: headers.length, error: '' }
  } catch {
    return { csv: '', rows: 0, cols: 0, error: 'Invalid JSON input' }
  }
}

function csvToJSON(csv: string): { json: string; error: string } {
  try {
    const lines = csv.trim().split('\n').filter(l => l.trim())
    if (lines.length < 2) return { json: '[]', error: '' }

    function parseCSVLine(line: string): string[] {
      const result: string[] = []
      let current = ''
      let inQuotes = false
      for (let i = 0; i < line.length; i++) {
        const ch = line[i]
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
          else inQuotes = !inQuotes
        } else if (ch === ',' && !inQuotes) {
          result.push(current); current = ''
        } else {
          current += ch
        }
      }
      result.push(current)
      return result
    }

    const headers = parseCSVLine(lines[0])
    const rows = lines.slice(1).map(line => {
      const vals = parseCSVLine(line)
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => { obj[h] = vals[i] ?? '' })
      return obj
    })
    return { json: JSON.stringify(rows, null, 2), error: '' }
  } catch {
    return { json: '', error: 'Invalid CSV input' }
  }
}

const SAMPLE_JSON = JSON.stringify([
  { name: 'Alice', age: 30, city: 'New York', email: 'alice@example.com' },
  { name: 'Bob', age: 25, city: 'London', email: 'bob@example.com' },
  { name: 'Carol', age: 35, city: 'Tokyo', email: 'carol@example.com' },
], null, 2)

export default function JSONToCSVPage() {
  const [direction, setDirection] = useState<'json2csv' | 'csv2json'>('json2csv')
  const [input, setInput] = useState(SAMPLE_JSON)
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState<{ rows: number; cols: number } | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function convert() {
    setError('')
    if (direction === 'json2csv') {
      const { csv, rows, cols, error: err } = jsonToCSV(input)
      setOutput(csv)
      setStats(csv ? { rows, cols } : null)
      setError(err)
    } else {
      const { json, error: err } = csvToJSON(input)
      setOutput(json)
      setStats(null)
      setError(err)
    }
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function download() {
    const blob = new Blob([output], { type: direction === 'json2csv' ? 'text/csv' : 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = direction === 'json2csv' ? 'output.csv' : 'output.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📊</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>JSON ↔ CSV Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert JSON arrays to CSV spreadsheets and back</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {([['json2csv', 'JSON → CSV'], ['csv2json', 'CSV → JSON']] as const).map(([key, label]) => (
              <button key={key} onClick={() => { setDirection(key); setOutput(''); setError(''); setStats(null) }}
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
            <>
              <button onClick={copy}
                style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={download}
                style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                Download
              </button>
            </>
          )}
        </div>

        {stats && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', color: '#64748b' }}>{stats.rows} rows</span>
            <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', color: '#64748b' }}>{stats.cols} columns</span>
          </div>
        )}

        {error && (
          <div style={{ background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#DC2626', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Input</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={20}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Output</div>
            <textarea value={output} readOnly rows={20}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

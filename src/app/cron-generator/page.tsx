'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const PRESETS = [
  { label: 'Every Minute', value: '* * * * *' },
  { label: 'Every Hour', value: '0 * * * *' },
  { label: 'Daily (midnight)', value: '0 0 * * *' },
  { label: 'Daily 9 AM', value: '0 9 * * *' },
  { label: 'Weekdays 9 AM', value: '0 9 * * 1-5' },
  { label: 'Weekly (Sunday)', value: '0 0 * * 0' },
  { label: 'Monthly (1st)', value: '0 0 1 * *' },
  { label: 'Yearly (Jan 1)', value: '0 0 1 1 *' },
]

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return 'Invalid cron expression'
  const [min, hour, dom, month, dow] = parts

  function descField(val: string, unit: string, names?: string[]): string {
    if (val === '*') return `every ${unit}`
    if (val.startsWith('*/')) return `every ${val.slice(2)} ${unit}s`
    if (val.includes('-')) {
      const [s, e] = val.split('-')
      if (names) return `${names[parseInt(s)]} through ${names[parseInt(e)]}`
      return `${unit} ${s} through ${e}`
    }
    if (val.includes(',')) {
      const vals = val.split(',').map(v => names ? names[parseInt(v)] : v)
      return vals.join(', ')
    }
    if (names) return names[parseInt(val)] || val
    return `${unit} ${val}`
  }

  const parts2: string[] = []
  const timeStr = min === '0' && hour !== '*'
    ? `At ${parseInt(hour) === 0 ? '12:00 AM' : parseInt(hour) < 12 ? `${hour}:00 AM` : parseInt(hour) === 12 ? '12:00 PM' : `${parseInt(hour) - 12}:00 PM`}`
    : min === '*' && hour === '*' ? 'Every minute' : `At minute ${min}${hour !== '*' ? ` past hour ${hour}` : ''}`

  parts2.push(timeStr)
  if (dom !== '*') parts2.push(`on day ${dom} of the month`)
  if (month !== '*') parts2.push(`in ${descField(month, 'month', MONTHS)}`)
  if (dow !== '*') parts2.push(`on ${descField(dow, 'day', DAYS)}`)

  return parts2.join(', ')
}

type FieldType = 'any' | 'every' | 'specific' | 'range'

interface CronField {
  type: FieldType
  val: string
  every: string
  from: string
  to: string
}

function fieldToExpr(field: CronField): string {
  if (field.type === 'any') return '*'
  if (field.type === 'every') return `*/${field.every || '1'}`
  if (field.type === 'specific') return field.val || '0'
  if (field.type === 'range') return `${field.from || '0'}-${field.to || '1'}`
  return '*'
}

const defaultField = (): CronField => ({ type: 'any', val: '0', every: '1', from: '0', to: '1' })

export default function CronGeneratorPage() {
  const [fields, setFields] = useState<CronField[]>([
    { ...defaultField(), type: 'specific', val: '0' }, // min
    { ...defaultField(), type: 'specific', val: '9' }, // hour
    defaultField(), // dom
    defaultField(), // month
    { ...defaultField(), type: 'range', from: '1', to: '5' }, // dow
  ])
  const [rawCron, setRawCron] = useState('')
  const [parseError, setParseError] = useState('')

  const fieldNames = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']
  const fieldRanges = ['0-59', '0-23', '1-31', '1-12', '0-6']
  const fieldExamples = ['0-59', '0-23', '1-31', '1-12 (or Jan-Dec)', '0-6 (Sun-Sat)']

  const expr = fields.map(fieldToExpr).join(' ')
  const description = describeCron(expr)

  function updateField(i: number, update: Partial<CronField>) {
    setFields(prev => prev.map((f, idx) => idx === i ? { ...f, ...update } : f))
  }

  function applyPreset(value: string) {
    const parts = value.split(' ')
    if (parts.length !== 5) return
    setFields(parts.map(p => {
      if (p === '*') return { ...defaultField(), type: 'any' as const }
      if (p.startsWith('*/')) return { ...defaultField(), type: 'every' as const, every: p.slice(2) }
      if (p.includes('-')) {
        const [from, to] = p.split('-')
        return { ...defaultField(), type: 'range' as const, from, to }
      }
      return { ...defaultField(), type: 'specific' as const, val: p }
    }))
    setRawCron('')
    setParseError('')
  }

  function parseRaw() {
    const parts = rawCron.trim().split(/\s+/)
    if (parts.length !== 5) { setParseError('Cron expression must have exactly 5 fields'); return }
    setParseError('')
    applyPreset(rawCron.trim())
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⏰</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Cron Expression Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Build and explain cron job schedules visually</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Result display */}
        <div style={{ background: '#0F2A4A', borderRadius: '14px', padding: '20px 24px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Generated Expression</div>
          <div style={{ fontFamily: 'monospace', fontSize: '28px', fontWeight: 800, color: '#F48C42', marginBottom: '8px' }}>{expr}</div>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{description}</div>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Quick Presets</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => applyPreset(p.value)}
                style={{ padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual builder */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>Visual Builder</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
            {fields.map((field, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>
                  {fieldNames[i]}
                  <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: '4px' }}>({fieldRanges[i]})</span>
                </div>
                <select value={field.type} onChange={e => updateField(i, { type: e.target.value as FieldType })}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', outline: 'none', background: 'white', marginBottom: '6px' }}>
                  <option value="any">Any (*)</option>
                  <option value="every">Every N</option>
                  <option value="specific">Specific</option>
                  <option value="range">Range</option>
                </select>
                {field.type === 'every' && (
                  <input type="number" value={field.every} onChange={e => updateField(i, { every: e.target.value })}
                    placeholder="N"
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                )}
                {field.type === 'specific' && (
                  <input value={field.val} onChange={e => updateField(i, { val: e.target.value })}
                    placeholder={fieldExamples[i]}
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                )}
                {field.type === 'range' && (
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <input value={field.from} onChange={e => updateField(i, { from: e.target.value })}
                      style={{ width: '50%', padding: '6px 6px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>-</span>
                    <input value={field.to} onChange={e => updateField(i, { to: e.target.value })}
                      style={{ width: '50%', padding: '6px 6px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const }} />
                  </div>
                )}
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#E85D04', marginTop: '6px', fontWeight: 700 }}>{fieldToExpr(field)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Parse cron */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Parse Existing Cron</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={rawCron} onChange={e => setRawCron(e.target.value)}
              placeholder="0 9 * * 1-5"
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const }} />
            <button onClick={parseRaw}
              style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
              Parse
            </button>
          </div>
          {parseError && <div style={{ color: '#DC2626', fontSize: '13px', marginTop: '8px' }}>{parseError}</div>}
        </div>
      </div>
    </div>
  )
}

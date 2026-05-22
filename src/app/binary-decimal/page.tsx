'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

type Base = 'binary' | 'decimal' | 'hex' | 'octal'

const VALIDATORS: Record<Base, RegExp> = {
  binary: /^[01]*$/,
  decimal: /^\d*$/,
  hex: /^[0-9a-fA-F]*$/,
  octal: /^[0-7]*$/,
}

const RADIX: Record<Base, number> = { binary: 2, decimal: 10, hex: 16, octal: 8 }

function convertFrom(value: string, from: Base): Record<Base, string> {
  if (!value || !VALIDATORS[from].test(value)) return { binary: '', decimal: '', hex: '', octal: '' }
  const decimal = parseInt(value, RADIX[from])
  if (isNaN(decimal)) return { binary: '', decimal: '', hex: '', octal: '' }
  return {
    binary: decimal.toString(2),
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
    octal: decimal.toString(8),
  }
}

export default function BinaryDecimalPage() {
  const [values, setValues] = useState<Record<Base, string>>({ binary: '', decimal: '', hex: '', octal: '' })
  const [source, setSource] = useState<Base>('decimal')

  const handleChange = (base: Base, val: string) => {
    if (!VALIDATORS[base].test(val) && val !== '') return
    setSource(base)
    const converted = convertFrom(val, base)
    setValues({ ...converted, [base]: val })
  }

  const loadExample = (dec: string) => {
    setSource('decimal')
    setValues(convertFrom(dec, 'decimal'))
  }

  const fields: { base: Base; label: string; placeholder: string }[] = [
    { base: 'decimal', label: 'Decimal (Base 10)', placeholder: '255' },
    { base: 'binary', label: 'Binary (Base 2)', placeholder: '11111111' },
    { base: 'hex', label: 'Hexadecimal (Base 16)', placeholder: 'FF' },
    { base: 'octal', label: 'Octal (Base 8)', placeholder: '377' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💻</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Binary ↔ Decimal Converter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert between binary, decimal, hexadecimal, and octal</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Quick examples */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px', display: 'block' }}>Quick Examples</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
            {['10', '255', '1024', '65535'].map(ex => (
              <button key={ex} onClick={() => loadExample(ex)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: 'white', color: '#0F2A4A', fontFamily: 'monospace', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion fields */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px', marginBottom: '32px' }}>
          {fields.map(({ base, label, placeholder }) => (
            <div key={base}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px', display: 'block' }}>{label}</label>
              <input
                value={values[base]}
                onChange={e => handleChange(base, e.target.value)}
                placeholder={placeholder}
                style={{ width: '100%', padding: '14px 16px', border: `1.5px solid ${source === base ? '#E85D04' : '#e2e8f0'}`, borderRadius: '10px', fontSize: '18px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const, letterSpacing: '1px', color: '#0F2A4A' }}
              />
            </div>
          ))}
        </div>

        {/* Educational card */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>How Binary Works</div>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7, margin: 0 }}>
            Binary is a base-2 number system using only 0 and 1. Each bit position represents a power of 2.
            For example, <strong>1101</strong> in binary = 8 + 4 + 0 + 1 = <strong>13</strong> in decimal.
            Computers use binary internally because transistors have two states: on (1) and off (0).
            Hexadecimal (base 16) is often used as a shorthand for binary, with each hex digit representing 4 bits.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

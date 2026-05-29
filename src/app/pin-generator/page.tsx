'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function secureRandInt(max: number): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] % max
}

function generatePin(length: number, noRepeat: boolean, noSequential: boolean): string {
  let attempts = 0
  while (attempts < 1000) {
    attempts++
    let pin = ''
    for (let i = 0; i < length; i++) {
      pin += secureRandInt(10).toString()
    }
    if (noRepeat) {
      let valid = true
      for (let i = 1; i < pin.length; i++) {
        if (pin[i] === pin[i - 1]) { valid = false; break }
      }
      if (!valid) continue
    }
    if (noSequential) {
      let valid = true
      for (let i = 1; i < pin.length; i++) {
        const diff = parseInt(pin[i]) - parseInt(pin[i - 1])
        if (diff === 1 || diff === -1) { valid = false; break }
      }
      if (!valid) continue
    }
    return pin
  }
  return Array.from({ length }, () => secureRandInt(10).toString()).join('')
}

export default function PinGeneratorPage() {
  const [pinLength, setPinLength] = useState(4)
  const [count, setCount] = useState(10)
  const [noRepeat, setNoRepeat] = useState(false)
  const [noSequential, setNoSequential] = useState(false)
  const [pins, setPins] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    const newPins = Array.from({ length: count }, () => generatePin(pinLength, noRepeat, noSequential))
    setPins(newPins)
  }

  const copyPin = (pin: string, i: number) => {
    navigator.clipboard.writeText(pin)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const downloadTxt = () => {
    const a = document.createElement('a')
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(pins.join('\n'))
    a.download = 'pins.txt'
    a.click()
  }

  const checkStyle = (checked: boolean): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', background: checked ? '#FFF7ED' : '#f8fafc', border: `1.5px solid ${checked ? '#E85D04' : '#e2e8f0'}`, fontSize: '13px', fontWeight: 600, color: checked ? '#E85D04' : '#64748b', userSelect: 'none' as const
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔢</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>PIN Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate cryptographically secure random PINs</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Length selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px', display: 'block' }}>PIN Length</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[4, 6, 8].map(l => (
              <button key={l} onClick={() => setPinLength(l)}
                style={{ padding: '12px 28px', borderRadius: '10px', border: '1.5px solid', borderColor: pinLength === l ? '#E85D04' : '#e2e8f0', background: pinLength === l ? '#E85D04' : 'white', color: pinLength === l ? 'white' : '#0F2A4A', fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>
                {l} digits
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px', display: 'block' }}>Number of PINs: {count}</label>
          <input type="range" min={1} max={50} value={count} onChange={e => setCount(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#E85D04' }} />
        </div>

        {/* Options */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, marginBottom: '24px' }}>
          <label style={checkStyle(noRepeat)}>
            <input type="checkbox" checked={noRepeat} onChange={e => setNoRepeat(e.target.checked)} style={{ display: 'none' }} />
            {noRepeat ? '☑' : '☐'} Avoid adjacent repeated digits
          </label>
          <label style={checkStyle(noSequential)}>
            <input type="checkbox" checked={noSequential} onChange={e => setNoSequential(e.target.checked)} style={{ display: 'none' }} />
            {noSequential ? '☑' : '☐'} Avoid sequential digits (123, 321)
          </label>
        </div>

        <button onClick={generate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '14px 40px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '24px' }}>
          Generate PINs
        </button>

        {pins.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '10px', marginBottom: '16px' }}>
              {pins.map((pin, i) => (
                <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 800, color: '#0F2A4A', letterSpacing: '4px' }}>{pin}</span>
                  <button onClick={() => copyPin(pin, i)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: copiedIdx === i ? '#16A34A' : '#94a3b8' }}>
                    {copiedIdx === i ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={downloadTxt}
              style={{ background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Download all as .txt
            </button>
          </>
        )}
      </div>
    </div>
  )
}

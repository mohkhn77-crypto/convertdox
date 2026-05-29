'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type HistoryEntry = { question: string; result: string; mode: string }

export default function DecisionMakerPage() {
  const [mode, setMode] = useState<'yesno' | 'multi'>('yesno')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<string[]>(['', ''])
  const [result, setResult] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  function decide() {
    if (spinning || !question.trim()) return
    setResult(null)
    setSpinning(true)
    setTimeout(() => {
      let r = ''
      if (mode === 'yesno') {
        r = Math.random() < 0.5 ? 'YES' : 'NO'
      } else {
        const valid = options.filter(o => o.trim())
        if (!valid.length) { setSpinning(false); return }
        r = valid[Math.floor(Math.random() * valid.length)]
      }
      setResult(r)
      setSpinning(false)
      setHistory(prev => [{ question: question.trim(), result: r, mode }, ...prev])
    }, 700)
  }

  function addOption() {
    if (options.length < 10) setOptions(prev => [...prev, ''])
  }

  function removeOption(i: number) {
    if (options.length > 2) setOptions(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateOption(i: number, val: string) {
    setOptions(prev => prev.map((o, idx) => idx === i ? val : o))
  }

  const isYes = result === 'YES'
  const isNo = result === 'NO'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎯</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Decision Maker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Let randomness make the tough calls for you</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Mode tabs */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          {([{ id: 'yesno', label: '✅ Yes / No' }, { id: 'multi', label: '🔢 Multiple Options' }] as const).map(t => (
            <button key={t.id} onClick={() => { setMode(t.id); setResult(null) }}
              style={{ flex: 1, padding: '11px', borderRadius: '9px', border: 'none', background: mode === t.id ? 'white' : 'transparent', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, color: mode === t.id ? '#0F2A4A' : '#64748b', cursor: 'pointer', boxShadow: mode === t.id ? '0 2px 6px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Question input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Your Question</label>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Should I go to the gym today?"
            rows={3}
            style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
          />
        </div>

        {/* Options for multi mode */}
        {mode === 'multi' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '10px' }}>Options</label>
            {options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={opt}
                  onChange={e => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  style={{ flex: 1, padding: '12px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                />
                {options.length > 2 && (
                  <button onClick={() => removeOption(i)} style={{ padding: '12px', background: '#fee2e2', border: 'none', borderRadius: '10px', color: '#dc2626', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>×</button>
                )}
              </div>
            ))}
            {options.length < 10 && (
              <button onClick={addOption} style={{ padding: '10px 18px', background: '#f1f5f9', border: '1.5px dashed #cbd5e1', borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: '#64748b', cursor: 'pointer', marginTop: '4px' }}>
                + Add Option
              </button>
            )}
          </div>
        )}

        {/* Decide button */}
        <button
          onClick={decide}
          disabled={spinning || !question.trim()}
          style={{ width: '100%', background: '#E85D04', color: 'white', border: 'none', padding: '16px', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: spinning || !question.trim() ? 'not-allowed' : 'pointer', opacity: spinning || !question.trim() ? 0.6 : 1, marginBottom: '24px' }}
        >
          {spinning ? 'Deciding...' : '🎯 Decide!'}
        </button>

        {/* Result */}
        {result && !spinning && (
          <div style={{ background: isYes ? '#dcfce7' : isNo ? '#fee2e2' : '#eff6ff', border: `2px solid ${isYes ? '#16a34a' : isNo ? '#dc2626' : '#3b82f6'}`, borderRadius: '20px', padding: '36px', textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '10px' }}>{question}</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(32px,6vw,64px)', fontWeight: 900, color: isYes ? '#15803d' : isNo ? '#dc2626' : '#1d4ed8', letterSpacing: '1px' }}>
              {result}
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Decision History</div>
              <button onClick={() => setHistory([])} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Reset</button>
            </div>
            {history.map((h, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < history.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '13px', color: '#374151', flex: 1 }}>{h.question}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: h.result === 'YES' ? '#15803d' : h.result === 'NO' ? '#dc2626' : '#1d4ed8', background: h.result === 'YES' ? '#dcfce7' : h.result === 'NO' ? '#fee2e2' : '#dbeafe', padding: '4px 12px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{h.result}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

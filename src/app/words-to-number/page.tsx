'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const ONES: Record<string, number> = {
  zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,
  ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19
}
const TENS: Record<string, number> = { twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90 }
const MULTIPLIERS: Record<string, number> = { hundred:100,thousand:1000,million:1000000,billion:1000000000,trillion:1000000000000 }

function wordsToNumber(words: string): number | null {
  const tokens = words.toLowerCase().replace(/-/g, ' ').replace(/\band\b/g, '').split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return null
  let total = 0
  let current = 0
  for (const token of tokens) {
    if (token in ONES) {
      current += ONES[token]
    } else if (token in TENS) {
      current += TENS[token]
    } else if (token === 'hundred') {
      current *= 100
    } else if (token in MULTIPLIERS && token !== 'hundred') {
      total += current * MULTIPLIERS[token]
      current = 0
    } else {
      return null // unknown token
    }
  }
  return total + current
}

const EXAMPLES = [
  'one thousand',
  'five hundred and twenty-three',
  'one million two hundred thousand',
  'forty-two',
  'nine hundred ninety-nine trillion',
]

export default function WordsToNumberPage() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const result = input.trim() ? wordsToNumber(input.trim()) : null
  const formatted = result !== null ? result.toLocaleString() : null

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔢</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Words to Number</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert written number words to digits instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Examples */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Examples</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => setInput(ex)}
                style={{ padding: '8px 14px', background: '#dbeafe', border: '1.5px solid #93c5fd', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', cursor: 'pointer' }}>
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Type your number in words</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. five hundred and twenty-three"
            rows={4}
            style={{ width: '100%', padding: '16px', border: '2px solid #e2e8f0', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', lineHeight: '1.5', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
          />
        </div>

        {/* Result */}
        {input.trim() && (
          <div style={{ background: result !== null ? '#0F2A4A' : '#fee2e2', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
            {result !== null ? (
              <>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Numeric Value</div>
                <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, color: '#F48C42', marginBottom: '8px' }}>
                  {formatted}
                </div>
                <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', marginBottom: '16px' }}>
                  = {result.toString()}
                </div>
                <button onClick={() => copy(formatted ?? '')} style={{ padding: '10px 24px', background: copied ? '#dcfce7' : 'rgba(255,255,255,0.1)', color: copied ? '#15803d' : 'white', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  {copied ? '✅ Copied!' : '📋 Copy Number'}
                </button>
              </>
            ) : (
              <div style={{ color: '#dc2626', fontWeight: 700, fontSize: '16px' }}>
                Could not parse &quot;{input.trim()}&quot; — check spelling and try again.
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontWeight: 700, color: '#0F2A4A', marginBottom: '10px', fontSize: '14px' }}>Supported Formats</div>
          <ul style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
            <li>Zero through nine hundred ninety-nine trillion</li>
            <li>Handles &quot;and&quot; (e.g. &quot;five hundred and twenty&quot;)</li>
            <li>Handles hyphens (e.g. &quot;twenty-three&quot;)</li>
            <li>Case insensitive</li>
          </ul>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

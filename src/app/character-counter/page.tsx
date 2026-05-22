'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const STOP_WORDS = new Set(['the','a','an','is','in','it','to','of','and','or','that','this','was','for','on','are','with','as','at','be','by','from','has','had','he','she','they','we','you','i','but'])

export default function CharacterCounterPage() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const chars = text.length
  const charsNoSpace = text.replace(/\s/g, '').length
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(w => w.length > 0).length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0)
  const lines = text === '' ? 0 : text.split('\n').length
  const readTime = words < 200 ? '< 1 min' : `${Math.ceil(words / 200)} min`
  const speakTime = words < 130 ? '< 1 min' : `${Math.ceil(words / 130)} min`

  const wordArr = text.trim() === '' ? [] : text.trim().split(/\s+/).filter(w => w.length > 0)
  const avgWordLen = wordArr.length > 0 ? (wordArr.reduce((s, w) => s + w.replace(/[^a-zA-Z]/g, '').length, 0) / wordArr.length).toFixed(1) : '0'

  const freq: Record<string, number> = {}
  wordArr.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '')
    if (clean.length > 1 && !STOP_WORDS.has(clean)) freq[clean] = (freq[clean] || 0) + 1
  })
  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10)

  const twitterRemaining = 280 - chars
  const smsRemaining = 160 - chars

  const copyStats = () => {
    const stats = `Characters (with spaces): ${chars}\nCharacters (no spaces): ${charsNoSpace}\nWords: ${words}\nSentences: ${sentences}\nParagraphs: ${paragraphs}\nLines: ${lines}\nReading time: ${readTime}\nSpeaking time: ${speakTime}`
    navigator.clipboard.writeText(stats)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📊</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Character Counter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Live character, word, sentence, and reading time stats</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Characters (with spaces)', val: chars },
            { label: 'Characters (no spaces)', val: charsNoSpace },
            { label: 'Words', val: words },
            { label: 'Sentences', val: sentences },
            { label: 'Paragraphs', val: paragraphs },
            { label: 'Lines', val: lines },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px', textAlign: 'center' as const }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '28px', fontWeight: 800, color: '#0F2A4A' }}>{s.val.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reading/Speaking time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: '#0F2A4A', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>📖</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: 'white' }}>{readTime}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>Reading time · 200 wpm</div>
            </div>
          </div>
          <div style={{ background: '#E85D04', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🎙</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: 'white' }}>{speakTime}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Speaking time · 130 wpm</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
          <div>
            {/* Textarea */}
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px', display: 'block' }}>Your Text</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const, outline: 'none', boxSizing: 'border-box' as const, minHeight: '280px' }}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
              {/* Twitter limit */}
              <div style={{ background: twitterRemaining < 0 ? '#FEE2E2' : '#f0f9ff', border: `1.5px solid ${twitterRemaining < 0 ? '#EF4444' : '#bae6fd'}`, borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '160px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0891B2' }}>Twitter / X</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: twitterRemaining < 0 ? '#DC2626' : '#0369A1' }}>
                  {twitterRemaining < 0 ? `${Math.abs(twitterRemaining)} over` : `${twitterRemaining} left`}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>280 char limit</div>
              </div>
              {/* SMS limit */}
              <div style={{ background: smsRemaining < 0 ? '#FEE2E2' : '#f0fdf4', border: `1.5px solid ${smsRemaining < 0 ? '#EF4444' : '#86efac'}`, borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '160px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A' }}>SMS</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: smsRemaining < 0 ? '#DC2626' : '#15803D' }}>
                  {smsRemaining < 0 ? `${Math.abs(smsRemaining)} over` : `${smsRemaining} left`}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>160 char limit</div>
              </div>
              {/* Avg word length */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #d8b4fe', borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '160px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#7C3AED' }}>Avg Word Length</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#6D28D9' }}>{avgWordLen}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>characters</div>
              </div>
            </div>
          </div>

          {/* Right: top words */}
          <div>
            <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px' }}>Top 10 Words</div>
              {topWords.length === 0 ? (
                <div style={{ textAlign: 'center' as const, padding: '24px', color: '#94a3b8', fontSize: '13px' }}>Type some text to see word frequency</div>
              ) : (
                topWords.map(([word, count], i) => (
                  <div key={word} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8', width: '16px' }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{word}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{count}x</span>
                      </div>
                      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '999px' }}>
                        <div style={{ height: '100%', width: `${Math.min((count / (topWords[0]?.[1] || 1)) * 100, 100)}%`, background: '#E85D04', borderRadius: '999px' }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
              <button onClick={copyStats} style={{ width: '100%', marginTop: '12px', background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? '✓ Copied!' : 'Copy Stats'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}

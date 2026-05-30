'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function analyze(text: string) {
  if (!text.trim()) return null

  const words = text.trim().split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const charCount = text.length
  const charNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || 1
  const lines = text.split('\n').length
  const avgWordLen = wordCount > 0 ? (words.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, '').length, 0) / wordCount).toFixed(1) : '0'
  const readingTime = Math.max(1, Math.round(wordCount / 250))
  const speakingTime = Math.max(1, Math.round(wordCount / 130))

  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''))).size

  // Frequency map
  const freq: Record<string, number> = {}
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '')
    if (clean.length > 2) freq[clean] = (freq[clean] || 0) + 1
  })
  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8)

  // Flesch-Kincaid readability estimate
  const syllables = words.reduce((sum, w) => {
    const s = w.toLowerCase().replace(/[^a-z]/g, '').replace(/[aeiouy]{2,}/g, 'a').match(/[aeiouy]/g)
    return sum + Math.max(1, s ? s.length : 1)
  }, 0)
  const fk = sentences > 0 ? 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount) : 0
  const readabilityLabel = fk >= 70 ? 'Easy' : fk >= 50 ? 'Standard' : fk >= 30 ? 'Difficult' : 'Very Difficult'
  const readabilityColor = fk >= 70 ? '#16a34a' : fk >= 50 ? '#d97706' : '#dc2626'

  return { wordCount, charCount, charNoSpaces, sentences, paragraphs, lines, avgWordLen, readingTime, speakingTime, uniqueWords, topWords, fk: Math.round(fk), readabilityLabel, readabilityColor }
}

const SAMPLE = `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet, making it a popular pangram used by typographers and keyboard testers.

Pangrams have been used historically to display typefaces, test equipment, and practice handwriting. A perfect pangram uses each letter exactly once, while a typical pangram like this one repeats letters for readability.

ConvertDox makes text analysis simple and fast. Paste any content to get an instant breakdown of your writing statistics.`

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#0F2A4A', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '6px' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>{sub}</div>}
    </div>
  )
}

export default function DetailedWordCounterPage() {
  const [text, setText] = useState('')

  const stats = analyze(text)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📊</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Detailed Word Counter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Full text analysis — words, sentences, readability, frequency, and more</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '32px auto 0', padding: '0 20px 60px' }}>
        {/* Input */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>Paste or type your text</label>
            <button onClick={() => setText(SAMPLE)}
              style={{ background: 'white', color: '#E85D04', border: '1.5px solid #E85D04', borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Load Sample
            </button>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your essay, article, or any text here…"
            style={{ width: '100%', minHeight: '200px', padding: '14px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7 }}
          />
          {text && (
            <button onClick={() => setText('')}
              style={{ marginTop: '8px', background: 'none', color: '#94a3b8', border: 'none', fontSize: '12px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
              Clear text ×
            </button>
          )}
        </div>

        {stats ? (
          <>
            {/* Primary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <StatCard label="Words" value={stats.wordCount.toLocaleString()} />
              <StatCard label="Characters" value={stats.charCount.toLocaleString()} sub="with spaces" />
              <StatCard label="No Spaces" value={stats.charNoSpaces.toLocaleString()} sub="characters" />
              <StatCard label="Sentences" value={stats.sentences.toLocaleString()} />
              <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
              <StatCard label="Lines" value={stats.lines.toLocaleString()} />
            </div>

            {/* Secondary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <StatCard label="Reading Time" value={`~${stats.readingTime} min`} sub="@ 250 WPM" />
              <StatCard label="Speaking Time" value={`~${stats.speakingTime} min`} sub="@ 130 WPM" />
              <StatCard label="Unique Words" value={stats.uniqueWords.toLocaleString()} />
              <StatCard label="Avg Word Length" value={`${stats.avgWordLen} chars`} />
              <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: stats.readabilityColor, lineHeight: 1 }}>{stats.readabilityLabel}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '6px' }}>Readability</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>Flesch score: {stats.fk}</div>
              </div>
            </div>

            {/* Top words */}
            {stats.topWords.length > 0 && (
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>Top Words</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stats.topWords.map(([word, count]) => {
                    const pct = stats.topWords[0][1] > 0 ? Math.round((count / stats.topWords[0][1]) * 100) : 0
                    return (
                      <div key={word} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, color: '#0F2A4A', fontSize: '14px' }}>{word}</span>
                        <span style={{ background: '#E85D04', color: 'white', borderRadius: '20px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>{count}×</span>
                        <div style={{ width: `${pct * 0.5}px`, height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#E85D04', borderRadius: '2px' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '15px', padding: '40px' }}>
            Paste your text above to see detailed statistics
          </div>
        )}

        {/* SEO Section */}
        <div style={{ marginTop: '60px', background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1.5px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '16px' }}>Detailed Word Counter — Full Text Analysis</h2>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Our detailed word counter goes far beyond basic word counting. Whether you&apos;re a student checking essay length, a content marketer analyzing SEO readability, or a developer testing text, this tool gives you everything you need instantly.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            The Flesch Reading Ease score estimates how difficult your text is to read. Scores of 70–100 are considered easy (5th grade level), 50–70 is standard (plain English), 30–50 is fairly difficult (college level), and below 30 is very difficult (professional/academic). Most web content targets a score of 60–70 for broad audience accessibility.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8, marginBottom: '14px' }}>
            Reading time is calculated at 250 words per minute — the average adult reading speed. Speaking time uses 130 words per minute, typical for a conversational presentation pace. These estimates help you gauge podcast length, video script duration, or how long a speech will take.
          </p>
          <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.8 }}>
            The top words frequency analysis shows which words you repeat most — useful for identifying keyword density in SEO content or spotting overused words in creative writing. All analysis is done locally in your browser; your text is never sent to any server.
          </p>
        </div>
      </div>
    </div>
  )
}

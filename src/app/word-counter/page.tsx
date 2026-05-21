/*
  ConvertDox — Tool 01: Word & Character Counter
  REDESIGNED: White background, Navy + Orange theme
  WHERE TO PUT: src/app/word-counter/page.tsx
  REPLACE your existing page.tsx with this file
*/

'use client'

import { useState, useCallback } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'counter' | 'density' | 'readability'>('counter')

  // ── Calculate all stats ──────────────────────────────────────
  const stats = useCallback(() => {
    if (!text.trim()) return {
      words: 0, chars: 0, charsNoSpace: 0,
      sentences: 0, paragraphs: 0, lines: 0,
      readTime: '< 1 min', speakTime: '< 1 min',
      longestWord: '—', avgWordLen: '0',
      uniqueWords: 0, topWords: []
    }

    const words      = text.trim().split(/\s+/).filter(w => w.length > 0)
    const wordCount  = words.length
    const chars      = text.length
    const charsNoSp  = text.replace(/\s/g, '').length
    const sentences  = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0)
    const lines      = text.split('\n').length
    const readMins   = wordCount / 200
    const speakMins  = wordCount / 130
    const readTime   = readMins < 1 ? '< 1 min' : `${Math.ceil(readMins)} min`
    const speakTime  = speakMins < 1 ? '< 1 min' : `${Math.ceil(speakMins)} min`
    const longestWord = words.reduce((a, b) => a.length >= b.length ? a : b, '')
    const avgWordLen = wordCount > 0 ? (charsNoSp / wordCount).toFixed(1) : '0'
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''))).size

    // Word frequency
    const freq: Record<string, number> = {}
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '')
      if (clean.length > 2) freq[clean] = (freq[clean] || 0) + 1
    })
    const topWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({ word, count, pct: Math.round((count / wordCount) * 100) }))

    return {
      words: wordCount, chars, charsNoSpace: charsNoSp,
      sentences, paragraphs, lines,
      readTime, speakTime, longestWord, avgWordLen,
      uniqueWords, topWords
    }
  }, [text])

  const s = stats()

  const handleCopy = () => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── STYLES (shared) ──────────────────────────────────────────
  const page: React.CSSProperties = {
    minHeight: '100vh',
    background: '#ffffff',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  }

  const statCard = (big?: boolean): React.CSSProperties => ({
    background: '#ffffff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '14px',
    padding: big ? '18px 20px' : '14px 16px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(15,42,74,0.06)',
    transition: 'all 0.2s',
  })

  return (
    <div style={page}>

      <NavBar />
      <TrustStrip />

      {/* ── Hero Header ──────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #0F2A4A 0%, #1a3a5c 100%)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>📝</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.5px' }}>
              Word & Character Counter
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0', lineHeight: 1.5 }}>
              Paste your text below — word count, reading time, and more update instantly.
            </p>
          </div>
          <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px 16px', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🔒 Text stays in your browser — never uploaded
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Top Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { num: s.words.toLocaleString(),        label: 'Words',       color: '#0F2A4A', accent: '#EFF6FF' },
            { num: s.chars.toLocaleString(),         label: 'Characters',  color: '#0F2A4A', accent: '#F8FAFC' },
            { num: s.charsNoSpace.toLocaleString(),  label: 'No Spaces',   color: '#0F2A4A', accent: '#F8FAFC' },
            { num: s.sentences.toLocaleString(),     label: 'Sentences',   color: '#0F2A4A', accent: '#FFF7ED' },
            { num: s.paragraphs.toLocaleString(),    label: 'Paragraphs',  color: '#0F2A4A', accent: '#F0FDF4' },
            { num: s.lines.toLocaleString(),         label: 'Lines',       color: '#0F2A4A', accent: '#FDF4FF' },
          ].map(item => (
            <div key={item.label} style={{ ...statCard(), background: item.accent }}>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 800, color: item.color, lineHeight: 1 }}>
                {item.num}
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Reading + Speaking time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: '#0F2A4A', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>📖</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '22px', fontWeight: 800, color: 'white' }}>{s.readTime}</div>
              <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>Reading time · 200 words/min</div>
            </div>
          </div>
          <div style={{ background: '#E85D04', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>🎙</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '22px', fontWeight: 800, color: 'white' }}>{s.speakTime}</div>
              <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Speaking time · 130 words/min</div>
            </div>
          </div>
        </div>

        {/* Textarea + Tabs side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>

          {/* LEFT: Text Area */}
          <div>
            <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,42,74,0.07)' }}>
              {/* Toolbar above textarea */}
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>Your Text</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={handleCopy} style={{ background: copied ? '#16A34A' : 'white', border: '1px solid', borderColor: copied ? '#16A34A' : '#e2e8f0', color: copied ? 'white' : '#64748b', padding: '5px 12px', borderRadius: '7px', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button onClick={() => setText('')} style={{ background: 'white', border: '1px solid #e2e8f0', color: '#DC2626', padding: '5px 12px', borderRadius: '7px', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                    🗑 Clear
                  </button>
                </div>
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste or type your text here...&#10;&#10;Word count, character count, reading time, and more will update instantly as you type."
                style={{ width: '100%', minHeight: '320px', padding: '20px', border: 'none', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '15px', color: '#0F2A4A', lineHeight: '1.75', background: 'transparent' }}
              />
              {/* Bottom status bar */}
              <div style={{ padding: '8px 16px', borderTop: '1px solid #f1f5f9', background: '#fafafa', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Longest word: <strong style={{ color: '#0F2A4A' }}>{s.longestWord}</strong></span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Avg word length: <strong style={{ color: '#0F2A4A' }}>{s.avgWordLen}</strong> chars</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Unique words: <strong style={{ color: '#0F2A4A' }}>{s.uniqueWords}</strong></span>
              </div>
            </div>
          </div>

          {/* RIGHT: Tabs Panel */}
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15,42,74,0.07)' }}>

            {/* Tab buttons */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              {([
                { id: 'counter',     label: '📊 Stats' },
                { id: 'density',     label: '🔤 Words' },
                { id: 'readability', label: '📈 Details' },
              ] as const).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: 1, padding: '12px 6px', border: 'none', borderBottom: '2px solid', borderBottomColor: activeTab === tab.id ? '#E85D04' : 'transparent', background: activeTab === tab.id ? '#FFF7ED' : 'transparent', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, color: activeTab === tab.id ? '#E85D04' : '#64748b', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ padding: '16px' }}>

              {/* TAB 1 — Stats */}
              {activeTab === 'counter' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Total Words',      val: s.words.toLocaleString(),        icon: '📝', color: '#0F2A4A', bg: '#EFF6FF' },
                    { label: 'Characters',        val: s.chars.toLocaleString(),         icon: '🔢', color: '#6B21A8', bg: '#FDF4FF' },
                    { label: 'Without Spaces',    val: s.charsNoSpace.toLocaleString(),  icon: '✂️', color: '#0369A1', bg: '#F0F9FF' },
                    { label: 'Sentences',         val: s.sentences.toLocaleString(),     icon: '📖', color: '#C2410C', bg: '#FFF7ED' },
                    { label: 'Paragraphs',        val: s.paragraphs.toLocaleString(),    icon: '¶',  color: '#166534', bg: '#F0FDF4' },
                    { label: 'Unique Words',      val: s.uniqueWords.toLocaleString(),   icon: '🌟', color: '#92400E', bg: '#FFFBEB' },
                  ].map(item => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{item.icon}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{item.label}</span>
                      </div>
                      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '18px', fontWeight: 800, color: item.color }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2 — Word Density */}
              {activeTab === 'density' && (
                <div>
                  {s.topWords.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94a3b8' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
                      <p style={{ fontSize: '13px' }}>Type some text to see word frequency</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Top words used</div>
                      {s.topWords.map((item, i) => (
                        <div key={item.word}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A' }}>{item.word}</span>
                            <span style={{ fontSize: '12.5px', color: '#64748b' }}>{item.count}x · {item.pct}%</span>
                          </div>
                          <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(item.pct * 4, 100)}%`, background: i === 0 ? '#E85D04' : '#0F2A4A', borderRadius: '999px', opacity: 1 - i * 0.08 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3 — Readability Details */}
              {activeTab === 'readability' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Reading Time',   val: s.readTime,     icon: '📖', desc: 'At 200 words/min' },
                    { label: 'Speaking Time',  val: s.speakTime,    icon: '🎙', desc: 'At 130 words/min' },
                    { label: 'Longest Word',   val: s.longestWord,  icon: '🏆', desc: 'Characters' },
                    { label: 'Avg Word Length',val: `${s.avgWordLen} chars`, icon: '📏', desc: 'Average' },
                    { label: 'Unique Words',   val: `${s.uniqueWords}`, icon: '🌟', desc: 'Distinct words' },
                    { label: 'Lines',          val: `${s.lines}`,   icon: '↵', desc: 'Line breaks' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', background: '#f8fafc', borderRadius: '9px', border: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '18px', width: '24px', textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.label}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F2A4A' }}>{item.val}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Related Tools ────────────────────────────────── */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '14px' }}>
            Related Tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { href: '/text-case-converter', icon: '🔤', name: 'Text Case Converter',  desc: 'UPPER, lower, Title case' },
              { href: '/lorem-ipsum',          icon: '📄', name: 'Lorem Ipsum Generator', desc: 'Placeholder text' },
              { href: '/remove-spaces',        icon: '🧹', name: 'Remove Extra Spaces',   desc: 'Clean messy text' },
              { href: '/password-generator',   icon: '🔑', name: 'Password Generator',    desc: 'Secure passwords' },
            ].map(tool => (
              <a key={tool.href} href={tool.href} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'flex-start', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ width: '36px', height: '36px', background: '#FFF7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{tool.icon}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A' }}>{tool.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{tool.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <div style={{ marginTop: '40px', maxWidth: '720px' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', marginBottom: '14px' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Is this word counter free?', a: 'Yes, 100% free. No account, no sign-up, no limits. Works instantly in your browser.' },
            { q: 'Is my text saved or sent to a server?', a: 'No. Your text stays entirely in your browser. Nothing is sent to any server. Complete privacy.' },
            { q: 'How is reading time calculated?', a: 'Based on the average adult reading speed of 200 words per minute. Speaking time uses 130 words per minute.' },
            { q: 'What does "unique words" mean?', a: 'The number of different words in your text, ignoring duplicates. High unique word count means more varied vocabulary.' },
          ].map((item, i) => (
            <details key={i} style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px 18px', marginBottom: '8px', background: 'white' }}>
              <summary style={{ fontWeight: 700, fontSize: '14px', color: '#0F2A4A', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.q}
                <span style={{ color: '#E85D04', fontSize: '20px', fontWeight: 300 }}>+</span>
              </summary>
              <p style={{ marginTop: '10px', fontSize: '14px', color: '#64748b', lineHeight: '1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <SiteFooter />

    </div>
  )
}

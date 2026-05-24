'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!w) return 0
  if (w.length <= 3) return 1
  const groups = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').match(/[aeiouy]{1,2}/g)
  return Math.max(1, groups ? groups.length : 1)
}

function readingLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Very Easy', color: '#16A34A' }
  if (score >= 80) return { label: 'Easy', color: '#22C55E' }
  if (score >= 70) return { label: 'Fairly Easy', color: '#84CC16' }
  if (score >= 60) return { label: 'Standard', color: '#EAB308' }
  if (score >= 50) return { label: 'Fairly Difficult', color: '#F97316' }
  if (score >= 30) return { label: 'Difficult', color: '#EF4444' }
  return { label: 'Very Difficult', color: '#DC2626' }
}

export default function SentenceCounterPage() {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a second sentence. And a third one for good measure!')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0) : []
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0
    const allWords = trimmed ? trimmed.split(/\s+/).filter(Boolean) : []
    const totalWords = allWords.length
    const totalChars = trimmed.length
    const totalSyllables = allWords.reduce((s, w) => s + countSyllables(w), 0)
    const sentCount = sentences.length
    const avgWordsPerSent = sentCount > 0 ? totalWords / sentCount : 0
    const avgCharsPerSent = sentCount > 0 ? totalChars / sentCount : 0
    const syllPerWord = totalWords > 0 ? totalSyllables / totalWords : 0
    const flesch = sentCount > 0 && totalWords > 0 ? 206.835 - 1.015 * avgWordsPerSent - 84.6 * syllPerWord : 0
    const grade = sentCount > 0 && totalWords > 0 ? 0.39 * avgWordsPerSent + 11.8 * syllPerWord - 15.59 : 0
    const sentenceData = sentences.map(s => {
      const ws = s.trim().split(/\s+/).filter(Boolean)
      return { text: s.trim(), words: ws.length }
    })
    const sorted = [...sentenceData].sort((a, b) => b.words - a.words)
    const longest = sorted[0]?.text
    const shortest = sorted[sorted.length - 1]?.text
    return {
      sentCount, paragraphs, totalWords, totalChars,
      avgWordsPerSent: avgWordsPerSent.toFixed(1),
      avgCharsPerSent: avgCharsPerSent.toFixed(1),
      flesch: flesch.toFixed(1),
      grade: grade.toFixed(1),
      sentenceData, longest, shortest,
    }
  }, [text])

  const flesch = Number(stats.flesch)
  const readLabel = readingLabel(flesch)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📝</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Sentence Counter</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Sentence stats and readability scores.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here..."
          style={{ width: '100%', minHeight: '200px', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '12px', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', color: '#0F2A4A', lineHeight: 1.6 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px', marginTop: '20px' }}>
          {[
            { label: 'Sentences', val: stats.sentCount },
            { label: 'Paragraphs', val: stats.paragraphs },
            { label: 'Avg words/sent', val: stats.avgWordsPerSent },
            { label: 'Avg chars/sent', val: stats.avgCharsPerSent },
          ].map(s => (
            <div key={s.label} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '26px', fontWeight: 800, color: '#0F2A4A' }}>{s.val}</div>
              <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
          <div style={{ background: '#fff', border: `2px solid ${readLabel.color}`, borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Flesch Reading Ease</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '38px', fontWeight: 800, color: readLabel.color, marginTop: '4px' }}>{stats.flesch}</div>
            <div style={{ fontSize: '14px', color: readLabel.color, fontWeight: 700, marginTop: '4px' }}>{readLabel.label}</div>
          </div>
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Grade Level</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '38px', fontWeight: 800, color: '#0F2A4A', marginTop: '4px' }}>{stats.grade}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Flesch-Kincaid</div>
          </div>
        </div>

        {stats.sentenceData.length > 0 && (
          <div style={{ marginTop: '24px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '18px', fontWeight: 700, color: '#0F2A4A', margin: '0 0 14px' }}>Sentence breakdown</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stats.sentenceData.map((s, i) => {
                const isLongest = s.text === stats.longest && stats.sentenceData.length > 1
                const isShortest = s.text === stats.shortest && stats.sentenceData.length > 1 && stats.longest !== stats.shortest
                const borderColor = isLongest ? '#E85D04' : isShortest ? '#3B82F6' : '#f1f5f9'
                return (
                  <div key={i} style={{ padding: '12px 14px', background: '#fafafa', border: `2px solid ${borderColor}`, borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '14px', color: '#0F2A4A', lineHeight: 1.5 }}>{s.text}</span>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>{s.words} words {isLongest && '· longest'}{isShortest && '· shortest'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}

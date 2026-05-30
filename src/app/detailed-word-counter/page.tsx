'use client'
import { useMemo, useState } from 'react'

function StatCard({ label, value }: { label: string, value: string | number }) {
  return (
    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', textAlign: 'center' }}>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#E85D04' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>{label}</div>
    </div>
  )
}

export default function DetailedWordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length
    const charsWithSpaces = text.length
    const charsWithoutSpaces = text.replace(/\s/g, '').length
    const sentences = trimmed === '' ? 0 : (text.match(/[^.!?]+[.!?]+/g) || []).length || 1
    const paragraphs = trimmed === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim()).length
    const readingTime = Math.ceil(words / 200)
    const speakingTime = Math.ceil(words / 130)
    const avgWordLength = words === 0 ? 0 : (charsWithoutSpaces / words).toFixed(1)
    const avgSentenceLength = sentences === 0 ? 0 : (words / sentences).toFixed(1)

    return { words, charsWithSpaces, charsWithoutSpaces, sentences, paragraphs, readingTime, speakingTime, avgWordLength, avgSentenceLength }
  }, [text])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F2A4A', marginBottom: '8px' }}>Detailed Word Counter</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>Comprehensive text analysis: words, characters, sentences, reading time, and more.</p>

        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            style={{ width: '100%', minHeight: '250px', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginTop: '24px' }}>
            <StatCard label="Words" value={stats.words} />
            <StatCard label="Characters" value={stats.charsWithSpaces} />
            <StatCard label="No Spaces" value={stats.charsWithoutSpaces} />
            <StatCard label="Sentences" value={stats.sentences} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
            <StatCard label="Reading Time" value={`${stats.readingTime} min`} />
            <StatCard label="Speaking Time" value={`${stats.speakingTime} min`} />
            <StatCard label="Avg Word Length" value={stats.avgWordLength} />
            <StatCard label="Avg Sentence" value={`${stats.avgSentenceLength} words`} />
          </div>
        </div>

        <div style={{ marginTop: '48px', background: 'white', padding: '32px', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F2A4A', marginBottom: '16px' }}>About This Tool</h2>
          <p style={{ color: '#334155', lineHeight: 1.7 }}>Comprehensive text analyzer that provides word count, character count (with and without spaces), sentence count, paragraph count, reading time, speaking time, and average metrics. Perfect for writers, students, and content creators. All calculations happen instantly in your browser. No data sent anywhere.</p>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Response = { text: string; type: 'positive' | 'neutral' | 'negative' }
type HistoryItem = { q: string; a: Response }

const RESPONSES: Response[] = [
  { text: 'It is certain', type: 'positive' },
  { text: 'Without a doubt', type: 'positive' },
  { text: 'Yes definitely', type: 'positive' },
  { text: 'You may rely on it', type: 'positive' },
  { text: 'As I see it, yes', type: 'positive' },
  { text: 'Most likely', type: 'positive' },
  { text: 'Outlook good', type: 'positive' },
  { text: 'Yes', type: 'positive' },
  { text: 'Signs point to yes', type: 'positive' },
  { text: 'Reply hazy try again', type: 'neutral' },
  { text: 'Ask again later', type: 'neutral' },
  { text: 'Better not tell you now', type: 'neutral' },
  { text: 'Cannot predict now', type: 'neutral' },
  { text: 'Concentrate and ask again', type: 'neutral' },
  { text: "Don't count on it", type: 'negative' },
  { text: 'My reply is no', type: 'negative' },
  { text: 'My sources say no', type: 'negative' },
  { text: 'Outlook not so good', type: 'negative' },
  { text: 'Very doubtful', type: 'negative' },
]

export default function Magic8BallPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<Response | null>(null)
  const [shaking, setShaking] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (shaking) {
      const t = setTimeout(() => {
        const r = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
        setAnswer(r)
        setShaking(false)
      }, 800)
      return () => clearTimeout(t)
    }
  }, [shaking])

  function askQuestion() {
    if (!question.trim() || shaking) return
    setAnswer(null)
    setShaking(true)
    setTimeout(() => {
      const r = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
      setAnswer(r)
      setShaking(false)
      setHistory(prev => [{ q: question.trim(), a: r }, ...prev].slice(0, 5))
    }, 800)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') askQuestion()
  }

  const textColor = answer
    ? answer.type === 'positive' ? '#15803d' : answer.type === 'negative' ? '#dc2626' : '#b45309'
    : 'white'

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎱</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Magic 8 Ball</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Ask a yes/no question and reveal your fortune</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>

        {/* 8-ball SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{
            transition: 'transform 0.1s',
            // eslint-disable-next-line react-hooks/purity
            transform: shaking ? `rotate(${Math.sin(Date.now() / 50) * 8}deg)` : 'rotate(0deg)',
            animation: shaking ? 'shake 0.8s ease-in-out' : 'none',
          }}>
            <style>{`@keyframes shake { 0%,100%{transform:rotate(0deg)} 10%{transform:rotate(-6deg)} 20%{transform:rotate(6deg)} 30%{transform:rotate(-6deg)} 40%{transform:rotate(6deg)} 50%{transform:rotate(-6deg)} 60%{transform:rotate(6deg)} 70%{transform:rotate(-6deg)} 80%{transform:rotate(6deg)} 90%{transform:rotate(-4deg)} }`}</style>
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="115" fill="#111" stroke="#1a1a2e" strokeWidth="3" />
              <circle cx="120" cy="120" r="80" fill="#0a0a1a" />
              {/* Triangle */}
              <polygon points="120,58 166,138 74,138" fill="#1a1a5e" opacity="0.9" />
              {answer ? (
                <>
                  <text x="120" y="108" fontFamily="Arial" fontSize="11" fontWeight="700" fill={textColor} textAnchor="middle">{answer.text.split(' ').slice(0, 3).join(' ')}</text>
                  {answer.text.split(' ').length > 3 && (
                    <text x="120" y="122" fontFamily="Arial" fontSize="11" fontWeight="700" fill={textColor} textAnchor="middle">{answer.text.split(' ').slice(3).join(' ')}</text>
                  )}
                </>
              ) : (
                <text x="120" y="108" fontFamily="Arial" fontSize="28" fontWeight="900" fill="white" textAnchor="middle">8</text>
              )}
              {/* Shine */}
              <ellipse cx="90" cy="75" rx="22" ry="14" fill="white" opacity="0.06" />
            </svg>
          </div>
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a yes/no question..."
            style={{ flex: 1, padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', outline: 'none', boxSizing: 'border-box' as const }}
          />
          <button
            onClick={askQuestion}
            disabled={shaking || !question.trim()}
            style={{ padding: '14px 24px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: shaking || !question.trim() ? 'not-allowed' : 'pointer', opacity: shaking || !question.trim() ? 0.6 : 1, whiteSpace: 'nowrap' }}
          >
            {shaking ? 'Shaking...' : 'Ask!'}
          </button>
        </div>

        {/* Answer display */}
        {answer && !shaking && (
          <div style={{ background: '#0F2A4A', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>The 8-Ball says...</div>
            <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '28px', fontWeight: 800, color: textColor }}>
              {answer.text}
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
              {answer.type === 'positive' ? '✅ Positive' : answer.type === 'negative' ? '❌ Negative' : '🔮 Neutral'}
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>Recent Questions</div>
            {history.map((item, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < history.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ fontSize: '14px', color: '#374151', marginBottom: '4px' }}>Q: {item.q}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: item.a.type === 'positive' ? '#15803d' : item.a.type === 'negative' ? '#dc2626' : '#b45309' }}>
                  A: {item.a.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

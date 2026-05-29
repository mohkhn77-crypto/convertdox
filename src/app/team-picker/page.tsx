'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const TEAM_COLORS = [
  '#dbeafe', '#dcfce7', '#fef3c7', '#fce7f3', '#e0e7ff',
  '#cffafe', '#fee2e2', '#f3e8ff', '#ecfdf5', '#fff7ed',
]
const TEAM_BORDER_COLORS = [
  '#3b82f6', '#16a34a', '#d97706', '#db2777', '#6366f1',
  '#0891b2', '#ef4444', '#9333ea', '#10b981', '#ea580c',
]

export default function TeamPickerPage() {
  const [namesInput, setNamesInput] = useState('Alice\nBob\nCarol\nDave\nEve\nFrank')
  const [numTeams, setNumTeams] = useState(2)
  const [teams, setTeams] = useState<string[][]>([])
  const [copied, setCopied] = useState(false)

  function shuffle() {
    const names = namesInput.split('\n').map(n => n.trim()).filter(Boolean)
    if (names.length < 2) return
    const shuffled = [...names].sort(() => Math.random() - 0.5)
    const count = Math.min(numTeams, names.length)
    const result: string[][] = Array.from({ length: count }, () => [])
    shuffled.forEach((name, i) => result[i % count].push(name))
    setTeams(result)
  }

  function copyTeams() {
    const text = teams.map((team, i) => `Team ${i + 1}:\n${team.join('\n')}`).join('\n\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👥</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Team Picker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Shuffle names into random balanced teams instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

          {/* Names input */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>Names (one per line)</label>
            <textarea
              value={namesInput}
              onChange={e => setNamesInput(e.target.value)}
              rows={10}
              placeholder="Alice&#10;Bob&#10;Carol&#10;Dave"
              style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
            />
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              {namesInput.split('\n').filter(n => n.trim()).length} names entered
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>
                Number of Teams: <span style={{ color: '#E85D04' }}>{numTeams}</span>
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={numTeams}
                onChange={e => setNumTeams(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#E85D04', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                <span>2</span><span>10</span>
              </div>
              <input
                type="number"
                min="2"
                max="10"
                value={numTeams}
                onChange={e => setNumTeams(Math.min(10, Math.max(2, parseInt(e.target.value) || 2)))}
                style={{ width: '80px', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', marginTop: '8px', boxSizing: 'border-box' as const }}
              />
            </div>

            <button
              onClick={shuffle}
              style={{ padding: '16px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
            >
              🔀 Shuffle Teams
            </button>

            {teams.length > 0 && (
              <>
                <button
                  onClick={shuffle}
                  style={{ padding: '14px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  🔄 Regenerate
                </button>
                <button
                  onClick={copyTeams}
                  style={{ padding: '14px', background: copied ? '#dcfce7' : 'white', color: copied ? '#16a34a' : '#0F2A4A', border: '1.5px solid', borderColor: copied ? '#16a34a' : '#e2e8f0', borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {copied ? '✅ Copied!' : '📋 Copy Teams'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Teams display */}
        {teams.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '16px' }}>
            {teams.map((team, i) => (
              <div key={i} style={{ background: TEAM_COLORS[i % TEAM_COLORS.length], border: `2px solid ${TEAM_BORDER_COLORS[i % TEAM_BORDER_COLORS.length]}`, borderRadius: '16px', padding: '20px' }}>
                <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '16px', fontWeight: 800, color: TEAM_BORDER_COLORS[i % TEAM_BORDER_COLORS.length], marginBottom: '12px' }}>
                  Team {i + 1} <span style={{ fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>({team.length} members)</span>
                </div>
                {team.map((name, j) => (
                  <div key={j} style={{ padding: '6px 0', borderBottom: j < team.length - 1 ? `1px solid ${TEAM_BORDER_COLORS[i % TEAM_BORDER_COLORS.length]}22` : 'none', fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                    {name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

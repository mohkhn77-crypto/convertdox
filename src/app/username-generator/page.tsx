'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const ADJECTIVES = ['Cool','Fast','Bold','Dark','Neon','Swift','Brave','Wild','Calm','Epic','Fierce','Mighty','Royal','Sunny','Shadow','Silver','Golden','Iron','Stealth','Cyber','Mystic','Cosmic','Storm','Thunder','Crystal','Phantom','Omega','Alpha','Ultra','Hyper','Prime','Turbo','Quantum','Nova','Blaze','Frost','Ember','Jade','Violet','Azure']
const NOUNS = ['Wolf','Tiger','Eagle','Dragon','Phoenix','Panda','Lion','Hawk','Bear','Fox','Ninja','Pirate','Wizard','Knight','Ranger','Hunter','Warrior','Raven','Falcon','Cobra','Viper','Shark','Storm','Arrow','Blade','Cipher','Ghost','Pulse','Spark','Titan','Comet','Pixel','Byte','Code','Logic','Axiom','Nexus','Flux','Echo','Zenith']

type Format = 'adj-noun' | 'noun-num' | 'adj-noun-num' | 'gamer' | 'professional'

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }
function randNum(digits: number): string { return Math.floor(Math.random() * Math.pow(10, digits)).toString().padStart(digits, '0') }

function generateUsername(format: Format): string {
  const adj = rand(ADJECTIVES)
  const noun = rand(NOUNS)
  switch (format) {
    case 'adj-noun': return `${adj}${noun}`
    case 'noun-num': return `${noun}${randNum(3)}`
    case 'adj-noun-num': return `${adj}${noun}${randNum(2)}`
    case 'gamer': return `${adj.toLowerCase()}_${noun.toLowerCase()}${randNum(2)}`
    case 'professional': return `${adj.toLowerCase()}.${noun.toLowerCase()}`
    default: return `${adj}${noun}`
  }
}

export default function UsernameGeneratorPage() {
  const [format, setFormat] = useState<Format>('adj-noun')
  const [usernames, setUsernames] = useState<string[]>([])
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = () => {
    const names = Array.from({ length: 10 }, () => generateUsername(format))
    setUsernames(names)
  }

  const copy = (name: string, i: number) => {
    navigator.clipboard.writeText(name)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const formats: { id: Format; label: string; example: string }[] = [
    { id: 'adj-noun', label: 'Adjective + Noun', example: 'CoolWolf' },
    { id: 'noun-num', label: 'Noun + Number', example: 'Dragon42' },
    { id: 'adj-noun-num', label: 'Adj + Noun + Number', example: 'BoldEagle99' },
    { id: 'gamer', label: 'GamerTag', example: 'swift_ninja42' },
    { id: 'professional', label: 'Professional', example: 'iron.knight' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👤</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Username Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate creative unique usernames instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Format selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '12px', display: 'block' }}>Format</label>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
            {formats.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '12px 16px', borderRadius: '10px', border: `1.5px solid ${format === f.id ? '#E85D04' : '#e2e8f0'}`, background: format === f.id ? '#FFF7ED' : 'white' }}>
                <input type="radio" name="format" value={f.id} checked={format === f.id} onChange={() => setFormat(f.id)} style={{ accentColor: '#E85D04' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: format === f.id ? '#E85D04' : '#0F2A4A' }}>{f.label}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>e.g. {f.example}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button onClick={generate}
          style={{ background: '#E85D04', color: 'white', border: 'none', padding: '14px 40px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '24px' }}>
          Generate Usernames
        </button>

        {usernames.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
            {usernames.map((name, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 700, color: '#0F2A4A' }}>{name}</span>
                <button onClick={() => copy(name, i)}
                  style={{ background: copiedIdx === i ? '#16A34A' : '#E85D04', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '7px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {copiedIdx === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const CLASSIC_WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat']
const HIPSTER_WORDS = ['artisan','craft','organic','sustainable','typewriter','vinyl','cliche','echo','park','small','batch','pour','over','tattooed','beard','flannel','kombucha','kale','chips','vegan','pinterest','asymmetrical','wolf','hashtag','umami','listicle','chicharrones','actually','meggings','fixie','lumbersexual','cold','pressed','gluten','free','shoreditch','portland','brooklyn']
const CORPORATE_WORDS = ['synergize','leverage','paradigm','disruptive','scalable','agile','blockchain','innovative','ecosystem','bandwidth','deliverable','stakeholder','alignment','roadmap','pivot','ideation','holistic','framework','empower','optimize','granular','actionable','robust','seamless','circle','back','drill','down','boil','the','ocean','move','needle','bandwidth','thought','leadership']
const TECH_WORDS = ['algorithm','kernel','function','async','callback','promise','interface','component','module','container','kubernetes','microservice','API','REST','GraphQL','webhook','middleware','deployment','pipeline','repository','refactor','iterate','scaffold','boilerplate','dependency','inject','compile','runtime','binary','encode','decode','serialize']

type LoremType = 'classic' | 'hipster' | 'corporate' | 'tech'
type GenerateBy = 'words' | 'sentences' | 'paragraphs'
type Wrapper = 'none' | 'p' | 'li' | 'h2'

function getWords(type: LoremType): string[] {
  if (type === 'hipster') return HIPSTER_WORDS
  if (type === 'corporate') return CORPORATE_WORDS
  if (type === 'tech') return TECH_WORDS
  return CLASSIC_WORDS
}

function randomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

function generateWords(words: string[], count: number): string {
  return Array.from({ length: count }, () => randomWord(words)).join(' ')
}

function generateSentence(words: string[]): string {
  const len = 6 + Math.floor(Math.random() * 12)
  const w = generateWords(words, len)
  return w.charAt(0).toUpperCase() + w.slice(1) + '.'
}

function generateParagraph(words: string[]): string {
  const count = 3 + Math.floor(Math.random() * 4)
  return Array.from({ length: count }, () => generateSentence(words)).join(' ')
}

export default function LoremAdvancedPage() {
  const [type, setType] = useState<LoremType>('classic')
  const [by, setBy] = useState<GenerateBy>('paragraphs')
  const [quantity, setQuantity] = useState(3)
  const [wrapper, setWrapper] = useState<Wrapper>('none')
  const [startLorem, setStartLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function generate() {
    const words = getWords(type)
    let parts: string[] = []

    if (by === 'words') {
      parts = [generateWords(words, quantity)]
    } else if (by === 'sentences') {
      parts = Array.from({ length: quantity }, () => generateSentence(words))
    } else {
      parts = Array.from({ length: quantity }, () => generateParagraph(words))
    }

    if (type === 'classic' && startLorem && by !== 'words') {
      parts[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + parts[0]
    }

    let text = ''
    if (wrapper === 'p') text = parts.map(p => `<p>${p}</p>`).join('\n')
    else if (wrapper === 'li') text = parts.map(p => `<li>${p}</li>`).join('\n')
    else if (wrapper === 'h2') text = parts.map(p => `<h2>${p}</h2>`).join('\n')
    else text = parts.join('\n\n')

    setOutput(text)
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function download() {
    const blob = new Blob([output], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'lorem-ipsum.txt'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const maxQuantity = by === 'words' ? 500 : by === 'sentences' ? 50 : 20

  const TYPES: { id: LoremType; label: string }[] = [
    { id: 'classic', label: 'Classic' },
    { id: 'hipster', label: 'Hipster' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'tech', label: 'Tech' },
  ]
  const BYS: { id: GenerateBy; label: string }[] = [
    { id: 'words', label: 'Words' },
    { id: 'sentences', label: 'Sentences' },
    { id: 'paragraphs', label: 'Paragraphs' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Lorem Ipsum Advanced</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate placeholder text in classic, hipster, corporate, and tech styles</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>

          {/* Type selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Style</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setType(t.id)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '2px solid', borderColor: type === t.id ? '#0F2A4A' : '#e2e8f0', background: type === t.id ? '#0F2A4A' : 'white', color: type === t.id ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate by */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Generate By</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {BYS.map(b => (
                <button key={b.id} onClick={() => { setBy(b.id); setQuantity(b.id === 'words' ? 50 : b.id === 'sentences' ? 5 : 3) }}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '2px solid', borderColor: by === b.id ? '#E85D04' : '#e2e8f0', background: by === b.id ? '#fff7ed' : 'white', color: by === b.id ? '#c2410c' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Quantity</label>
              <input type="number" min="1" max={maxQuantity} value={quantity} onChange={e => setQuantity(Math.min(maxQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
                style={{ width: '70px', padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, textAlign: 'center', boxSizing: 'border-box' as const }} />
            </div>
            <input type="range" min="1" max={maxQuantity} value={quantity} onChange={e => setQuantity(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#E85D04', cursor: 'pointer' }} />
          </div>

          {/* HTML wrapper */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>HTML Wrapper</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['none', 'p', 'li', 'h2'] as const).map(w => (
                <button key={w} onClick={() => setWrapper(w)}
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1.5px solid', borderColor: wrapper === w ? '#6366f1' : '#e2e8f0', background: wrapper === w ? '#e0e7ff' : 'white', color: wrapper === w ? '#4338ca' : '#64748b', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  {w === 'none' ? 'None' : `<${w}>`}
                </button>
              ))}
            </div>
          </div>

          {/* Classic option */}
          {type === 'classic' && (
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="startLorem" checked={startLorem} onChange={e => setStartLorem(e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <label htmlFor="startLorem" style={{ fontSize: '14px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Start with &quot;Lorem ipsum...&quot;</label>
            </div>
          )}

          <button onClick={generate} style={{ width: '100%', padding: '16px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
            Generate Text
          </button>
        </div>

        {/* Output */}
        {output && (
          <div>
            <textarea
              readOnly
              value={output}
              rows={12}
              style={{ width: '100%', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.8', color: '#374151', background: '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const, marginBottom: '12px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={copy} style={{ flex: 1, padding: '13px', background: copied ? '#dcfce7' : '#0F2A4A', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
              <button onClick={download} style={{ flex: 1, padding: '13px', background: 'white', color: '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                ⬇️ Download .txt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

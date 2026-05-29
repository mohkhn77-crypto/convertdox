'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

interface EmojiItem { e: string; n: string; c: string }

const EMOJIS: EmojiItem[] = [
  // smileys
  {e:'😀',n:'Grinning Face',c:'smileys'},{e:'😂',n:'Face with Tears of Joy',c:'smileys'},{e:'🥰',n:'Smiling Face with Hearts',c:'smileys'},
  {e:'😍',n:'Heart Eyes',c:'smileys'},{e:'🤩',n:'Star-Struck',c:'smileys'},{e:'😎',n:'Cool',c:'smileys'},{e:'🤔',n:'Thinking',c:'smileys'},
  {e:'😴',n:'Sleeping',c:'smileys'},{e:'🥳',n:'Partying',c:'smileys'},{e:'😱',n:'Screaming',c:'smileys'},{e:'🤣',n:'ROFL',c:'smileys'},
  {e:'😊',n:'Smiling',c:'smileys'},{e:'😇',n:'Innocent',c:'smileys'},{e:'🤗',n:'Hugging',c:'smileys'},{e:'🙃',n:'Upside Down',c:'smileys'},
  {e:'😏',n:'Smirking',c:'smileys'},{e:'😒',n:'Unamused',c:'smileys'},{e:'😭',n:'Loudly Crying',c:'smileys'},{e:'😤',n:'Steam from Nose',c:'smileys'},
  {e:'🤯',n:'Exploding Head',c:'smileys'},{e:'🥺',n:'Pleading',c:'smileys'},{e:'😈',n:'Smiling Devil',c:'smileys'},{e:'👻',n:'Ghost',c:'smileys'},
  // animals
  {e:'🐶',n:'Dog',c:'animals'},{e:'🐱',n:'Cat',c:'animals'},{e:'🐭',n:'Mouse',c:'animals'},{e:'🐹',n:'Hamster',c:'animals'},
  {e:'🦊',n:'Fox',c:'animals'},{e:'🐻',n:'Bear',c:'animals'},{e:'🐼',n:'Panda',c:'animals'},{e:'🐨',n:'Koala',c:'animals'},
  {e:'🦁',n:'Lion',c:'animals'},{e:'🐯',n:'Tiger',c:'animals'},{e:'🦄',n:'Unicorn',c:'animals'},{e:'🐸',n:'Frog',c:'animals'},
  {e:'🐧',n:'Penguin',c:'animals'},{e:'🦋',n:'Butterfly',c:'animals'},{e:'🐙',n:'Octopus',c:'animals'},{e:'🦈',n:'Shark',c:'animals'},
  {e:'🐬',n:'Dolphin',c:'animals'},{e:'🦅',n:'Eagle',c:'animals'},{e:'🦉',n:'Owl',c:'animals'},{e:'🦜',n:'Parrot',c:'animals'},
  {e:'🐺',n:'Wolf',c:'animals'},{e:'🐗',n:'Boar',c:'animals'},{e:'🦝',n:'Raccoon',c:'animals'},{e:'🐢',n:'Turtle',c:'animals'},
  // food
  {e:'🍕',n:'Pizza',c:'food'},{e:'🍔',n:'Burger',c:'food'},{e:'🌮',n:'Taco',c:'food'},{e:'🍜',n:'Ramen',c:'food'},
  {e:'🍣',n:'Sushi',c:'food'},{e:'🍩',n:'Donut',c:'food'},{e:'🍦',n:'Soft Ice Cream',c:'food'},{e:'🎂',n:'Birthday Cake',c:'food'},
  {e:'🍎',n:'Apple',c:'food'},{e:'🍓',n:'Strawberry',c:'food'},{e:'🧁',n:'Cupcake',c:'food'},
  {e:'🍰',n:'Cake',c:'food'},{e:'🥑',n:'Avocado',c:'food'},{e:'🌯',n:'Wrap',c:'food'},{e:'🍟',n:'Fries',c:'food'},
  {e:'🥗',n:'Salad',c:'food'},{e:'🍱',n:'Bento',c:'food'},{e:'🥪',n:'Sandwich',c:'food'},{e:'☕',n:'Coffee',c:'food'},
  // travel
  {e:'✈️',n:'Airplane',c:'travel'},{e:'🚀',n:'Rocket',c:'travel'},{e:'🗼',n:'Eiffel Tower',c:'travel'},{e:'🏖️',n:'Beach',c:'travel'},
  {e:'🏔️',n:'Mountain',c:'travel'},{e:'🌍',n:'Earth',c:'travel'},{e:'🚢',n:'Ship',c:'travel'},{e:'🚂',n:'Train',c:'travel'},
  {e:'🏕️',n:'Camping',c:'travel'},{e:'🗽',n:'Statue of Liberty',c:'travel'},{e:'🏯',n:'Castle',c:'travel'},{e:'⛵',n:'Sailboat',c:'travel'},
  {e:'🚁',n:'Helicopter',c:'travel'},{e:'🌋',n:'Volcano',c:'travel'},{e:'🗺️',n:'Map',c:'travel'},{e:'🧭',n:'Compass',c:'travel'},
  // activities
  {e:'⚽',n:'Soccer',c:'activities'},{e:'🏀',n:'Basketball',c:'activities'},{e:'🎮',n:'Video Game',c:'activities'},{e:'🎸',n:'Guitar',c:'activities'},
  {e:'🎯',n:'Target',c:'activities'},{e:'🎲',n:'Dice',c:'activities'},{e:'♟️',n:'Chess',c:'activities'},{e:'🎻',n:'Violin',c:'activities'},
  {e:'🏋️',n:'Weightlifter',c:'activities'},{e:'🧘',n:'Yoga',c:'activities'},{e:'🏊',n:'Swimming',c:'activities'},{e:'🚴',n:'Cycling',c:'activities'},
  {e:'🎭',n:'Theater',c:'activities'},{e:'🎨',n:'Art',c:'activities'},{e:'📸',n:'Camera',c:'activities'},{e:'🎤',n:'Microphone',c:'activities'},
  // objects
  {e:'💡',n:'Light Bulb',c:'objects'},{e:'📱',n:'Phone',c:'objects'},{e:'💻',n:'Laptop',c:'objects'},{e:'🔑',n:'Key',c:'objects'},
  {e:'📚',n:'Books',c:'objects'},{e:'🔭',n:'Telescope',c:'objects'},{e:'🔬',n:'Microscope',c:'objects'},{e:'⌚',n:'Watch',c:'objects'},
  {e:'🎁',n:'Gift',c:'objects'},{e:'💎',n:'Diamond',c:'objects'},{e:'🔧',n:'Wrench',c:'objects'},{e:'🧲',n:'Magnet',c:'objects'},
  {e:'📦',n:'Package',c:'objects'},{e:'🗂️',n:'Folder',c:'objects'},{e:'📝',n:'Memo',c:'objects'},{e:'🖥️',n:'Desktop',c:'objects'},
  // nature
  {e:'🌸',n:'Cherry Blossom',c:'nature'},{e:'🌺',n:'Hibiscus',c:'nature'},{e:'🌻',n:'Sunflower',c:'nature'},{e:'🌿',n:'Herb',c:'nature'},
  {e:'🌈',n:'Rainbow',c:'nature'},{e:'⛄',n:'Snowman',c:'nature'},{e:'🌊',n:'Wave',c:'nature'},{e:'🔥',n:'Fire',c:'nature'},
  {e:'⭐',n:'Star',c:'nature'},{e:'🌙',n:'Moon',c:'nature'},{e:'☀️',n:'Sun',c:'nature'},{e:'❄️',n:'Snowflake',c:'nature'},
  {e:'🌩️',n:'Lightning',c:'nature'},{e:'🌵',n:'Cactus',c:'nature'},{e:'🍀',n:'Four Leaf Clover',c:'nature'},{e:'🌴',n:'Palm',c:'nature'},
  // symbols
  {e:'❤️',n:'Heart',c:'symbols'},{e:'💯',n:'100',c:'symbols'},{e:'✅',n:'Check Mark',c:'symbols'},{e:'⚡',n:'Lightning',c:'symbols'},
  {e:'🎵',n:'Music',c:'symbols'},{e:'💰',n:'Money Bag',c:'symbols'},{e:'🏆',n:'Trophy',c:'symbols'},
  {e:'🚨',n:'Alarm',c:'symbols'},{e:'💬',n:'Speech Bubble',c:'symbols'},{e:'❓',n:'Question',c:'symbols'},{e:'🎊',n:'Confetti',c:'symbols'},
  {e:'🆕',n:'New',c:'symbols'},{e:'🔝',n:'Top',c:'symbols'},{e:'⭕',n:'Circle',c:'symbols'},{e:'🔴',n:'Red Circle',c:'symbols'},
]

const CATS = ['all', 'smileys', 'animals', 'food', 'travel', 'activities', 'objects', 'nature', 'symbols']

export default function EmojiPickerPage() {
  const [cat, setCat] = useState('all')
  const [selected, setSelected] = useState<EmojiItem | null>(null)
  const [batch, setBatch] = useState<EmojiItem[]>([])
  const [recent, setRecent] = useState<EmojiItem[]>([])
  const [copied, setCopied] = useState(false)

  const filtered = cat === 'all' ? EMOJIS : EMOJIS.filter(e => e.c === cat)

  function pickRandom() {
    const pool = filtered
    const e = pool[Math.floor(Math.random() * pool.length)]
    setSelected(e)
    setRecent(prev => [e, ...prev.filter(r => r.e !== e.e)].slice(0, 20))
  }

  function pickBatch() {
    const pool = [...filtered].sort(() => Math.random() - 0.5).slice(0, 10)
    setBatch(pool)
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function selectEmoji(e: EmojiItem) {
    setSelected(e)
    setRecent(prev => [e, ...prev.filter(r => r.e !== e.e)].slice(0, 20))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>😄</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Random Emoji Picker</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Pick random emojis by category and copy instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding: '8px 16px', borderRadius: '999px', border: '2px solid', borderColor: cat === c ? '#0F2A4A' : '#e2e8f0', background: cat === c ? '#0F2A4A' : 'white', color: cat === c ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize' }}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
          {/* Selected emoji */}
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '12px' }}>{selected ? selected.e : '🎲'}</div>
            {selected ? (
              <>
                <div style={{ fontWeight: 700, color: '#0F2A4A', marginBottom: '4px' }}>{selected.n}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px', textTransform: 'capitalize' }}>{selected.c}</div>
                <button onClick={() => copy(selected.e)} style={{ padding: '10px 24px', background: copied ? '#dcfce7' : '#E85D04', color: copied ? '#16a34a' : 'white', border: 'none', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  {copied ? '✅ Copied!' : '📋 Copy Emoji'}
                </button>
              </>
            ) : (
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>Click &quot;Random Emoji&quot; to get started</div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={pickRandom} style={{ padding: '16px', background: '#E85D04', color: 'white', border: 'none', borderRadius: '14px', fontFamily: 'inherit', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}>
              🎲 Random Emoji
            </button>
            <button onClick={pickBatch} style={{ padding: '16px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '14px', fontFamily: 'inherit', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              🎰 Batch of 10
            </button>
            {batch.length > 0 && (
              <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>Batch</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {batch.map((e, i) => (
                    <span key={i} onClick={() => selectEmoji(e)} style={{ fontSize: '28px', cursor: 'pointer', padding: '4px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0' }} title={e.n}>{e.e}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent picks */}
        {recent.length > 0 && (
          <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Recent Picks</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {recent.map((e, i) => (
                <span key={i} onClick={() => selectEmoji(e)} style={{ fontSize: '28px', cursor: 'pointer', padding: '6px', borderRadius: '10px', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} title={e.n}>{e.e}</span>
              ))}
            </div>
          </div>
        )}

        {/* All emojis grid */}
        <div style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '14px' }}>Browse {filtered.length} emojis</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {filtered.map((e, i) => (
              <span key={i} onClick={() => selectEmoji(e)} style={{ fontSize: '28px', cursor: 'pointer', padding: '6px', borderRadius: '10px', background: '#f8fafc', border: '1.5px solid #e2e8f0' }} title={e.n}>{e.e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

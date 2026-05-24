'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const WORD_SET = new Set<string>([
  'create','listen','silent','inlets','enlist','tinsel','stone','notes','tones','onset','senor','snore','parse','reaps','spare','pears','paste','tapes','crate','trace','caret','acres','care','race','pace','cape','repost','poster','tropes','repots','strop','sport','ports','ropes','prose','pores','spore','repos','store','tores','roset','rotes','torse','stope','pesto','estop','poets','topes','slope','poles','lopes','pelts','slept',
  'east','eats','seat','sate','teas','etas','ates','tea','eat','ate','eta','ets','aet','set','sea',
  'cat','act','arc','car','rat','tar','art','tap','pat','apt','pet','tea','ate','eat',
  'hat','that','tath','math','team','meat','mate','tame','meta','time','mite','item','emit','mile','lime','idle','lied','deli','tile','site','ties','rite','tier','tire','isle','lies','seli',
  'won','now','own','wow','two','tow','wot','sow','sown','snow','town','town','grown','wrong','sword','words','swords','rowed','wider','wired','weird','rider','dries','sired','rides','sider',
  'star','rats','arts','tars','tsar','stab','bats','tabs','baste','beats','beast','abets','betas','basted','debits','bedims','bidet','debit','bides','sided','dines','snide','nides',
  'angel','angle','glean','genal','panel','penal','plane','plena','nepal','laser','lares','rales','reals','seral','aster','rates','tares','tears','resat','stare','dread','adder','reads','dares','dears','rased','sared','tread','trade','rated','tared','derat','dater',
  'least','steal','stale','tales','teals','setal','slate','stela','rouse','euros','roues','dotes','toted','dotes','tosed','sered','reeds','redes','seder','deres','aides','aside','ideas','disable','blades','sabled','beards','breads','debars','sabred','serdab',
  'tipped','spites','stipes','sopite','poetic','copies','copses','scopes','corpse','corps','crops','swarms','smarts','strums','strums','sliced','decide','clouds','could','cloud','cued','duce',
  'dares','dears','reads','rased','sared','plate','petal','pleat','plead','pedal','paled','dealt','delta','laden','elands','nailed','denial','aliened','alined','idealist',
  'married','admirer','airframe','reframe','farmer','framed','fader','dares','feared','faced','decaf','faces','cafes','fates','feats','faked','flake','leaf','feel','flee','fled',
  'planet','platen','arrest','rarest','raster','tarres','garret','garter','tagger','gather','gather','sigh','sigh','heights','eighths',
  'evil','live','veil','vile','levi','elf','fed','def','red','der','toe','too','our','out','two','low','owl','our',
  'no','on','of','if','is','it','at','as','an','am','be','by','do','go','he','hi','ho','in','me','my','so','to','up','us','we','ye',
  'and','the','for','but','not','was','are','can','her','his','one','our','out','put','say','she','too','top','try','two','use','way','who','why','you','use','tow','sow','low','row','bow','cow','how','jaw','law','mow','now','paw','raw','saw','vow','wow','yaw',
  'all','any','bad','bag','bar','bat','bed','bee','bet','big','bit','box','boy','bud','bug','bun','bus','cab','cap','car','cat','cop','cot','cow','cry','cub','cup','cut','dad','dam','day','den','dew','did','die','dig','dim','dip','dog','dot','dry','due','dug','dye','ear','eat','egg','eye','far','fat','few','fig','fin','fit','fix','fly','fog','for','fox','fry','fun','fur','gap','gas','gel','get','gin','god','got','gum','gun','guy','gym','had','ham','has','hat','hay','her','hey','hid','him','hip','his','hit','hog','hop','hot','how','hub','hug','hum','hut','ice','ink','inn','ion','jam','jar','jaw','jet','job','jog','joy','key','kid','kin','kit','lab','lad','lag','lap','law','lay','led','leg','let','lid','lie','lip','log','lot','low','mad','man','map','mat','men','met','mid','mix','mob','mom','mud','mug','mum','nap','net','new','nod','not','now','nut','oak','oar','odd','off','oil','old','one','our','out','owe','owl','own','pad','pal','pan','pat','paw','pay','pea','pen','pet','pie','pig','pin','pit','pop','pot','pub','pup','put','rag','ran','rap','rat','raw','ray','red','rib','rid','rim','rip','rob','rod','rot','rub','rug','run','sad','sag','sap','sat','saw','say','sea','see','set','sew','she','shy','sin','sip','sir','sit','six','ski','sky','sly','sob','son','soy','spa','spy','sum','sun','tab','tad','tag','tan','tap','tar','tax','tea','ten','the','tie','tin','tip','toe','too','top','tow','toy','try','tub','two','use','van','vet','via','vow','war','was','wax','way','wed','wet','who','why','wig','win','wit','won','woo','yam','yap','yes','yet','you','zip','zoo',
])

function permute(arr: string[]): string[] {
  if (arr.length <= 1) return [arr.join('')]
  const set = new Set<string>()
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    permute(rest).forEach(p => set.add(arr[i] + p))
  }
  return Array.from(set)
}

export default function AnagramGeneratorPage() {
  const [input, setInput] = useState('listen')
  const [onlyReal, setOnlyReal] = useState(true)
  const [minLen, setMinLen] = useState(3)
  const [copied, setCopied] = useState<string | null>(null)

  const results = useMemo(() => {
    const cleaned = input.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8)
    if (cleaned.length < 2) return []
    const perms = permute(cleaned.split(''))
    let list = perms.filter(w => w.length >= minLen && w !== cleaned)
    if (onlyReal) list = list.filter(w => WORD_SET.has(w))
    return Array.from(new Set(list)).slice(0, 100)
  }, [input, onlyReal, minLen])

  const copy = (w: string) => {
    navigator.clipboard.writeText(w)
    setCopied(w)
    setTimeout(() => setCopied(null), 1500)
  }

  const examples = ['listen', 'stone', 'parse', 'create', 'pears']

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🔤</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Anagram Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Generate all possible letter rearrangements — filter to real English words.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(15,42,74,0.07)' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '8px' }}>Enter a word (up to 8 letters)</label>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="listen"
            style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '18px', fontFamily: 'inherit', color: '#0F2A4A', outline: 'none', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>Try:</span>
            {examples.map(ex => (
              <button key={ex} onClick={() => setInput(ex)} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit' }}>{ex}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0F2A4A', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={onlyReal} onChange={e => setOnlyReal(e.target.checked)} />
              Real English words only
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#0F2A4A', fontWeight: 600 }}>
              Min length:
              <input type="number" min={2} max={8} value={minLen} onChange={e => setMinLen(Math.max(2, Math.min(8, Number(e.target.value) || 2)))}
                style={{ width: '60px', padding: '4px 8px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontFamily: 'inherit', fontSize: '13px' }} />
            </label>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '20px', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>Results</h2>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{results.length} {onlyReal ? 'real words' : 'permutations'} found</span>
          </div>
          {results.length === 0 ? (
            <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
              <p style={{ fontSize: '14px', margin: 0 }}>No results. Try a different word or untick &ldquo;real words only&rdquo;.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: '10px' }}>
              {results.map(w => (
                <button key={w} onClick={() => copy(w)} style={{
                  background: copied === w ? '#16A34A' : 'white',
                  color: copied === w ? 'white' : '#0F2A4A',
                  border: '1.5px solid', borderColor: copied === w ? '#16A34A' : '#e2e8f0',
                  borderRadius: '10px', padding: '12px', fontSize: '15px', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  {copied === w ? '✓ Copied!' : w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

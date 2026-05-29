'use client'
import { useState, useMemo, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
type Direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

interface Keyframe { translateX: number; translateY: number; rotate: number; scale: number; opacity: number }

const initialFrames: Keyframe[] = [
  { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
  { translateX: 0, translateY: -30, rotate: 0, scale: 1, opacity: 1 },
  { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
]

function frameTransform(f: Keyframe): string {
  return `translate(${f.translateX}px, ${f.translateY}px) rotate(${f.rotate}deg) scale(${f.scale})`
}

const PRESETS: Record<string, Keyframe[]> = {
  bounce: [
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
    { translateX: 0, translateY: -30, rotate: 0, scale: 1, opacity: 1 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
  ],
  shake: [
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
    { translateX: -10, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
    { translateX: 10, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
  ],
  pulse: [
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1.1, opacity: 1 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
  ],
  fadein: [
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 0 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 0.5 },
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
  ],
  spin: [
    { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 },
    { translateX: 0, translateY: 0, rotate: 180, scale: 1, opacity: 1 },
    { translateX: 0, translateY: 0, rotate: 360, scale: 1, opacity: 1 },
  ],
}

export default function AnimationGeneratorPage() {
  const [name, setName] = useState('myAnim')
  const [duration, setDuration] = useState(1)
  const [easing, setEasing] = useState<Easing>('ease-in-out')
  const [iter, setIter] = useState('infinite')
  const [direction, setDirection] = useState<Direction>('normal')
  const [frames, setFrames] = useState<Keyframe[]>(initialFrames)
  const [copied, setCopied] = useState(false)

  const keyframesCSS = useMemo(() => {
    const labels = ['0%', '50%', '100%']
    return `@keyframes ${name} {\n${frames.map((f, i) =>
      `  ${labels[i]} { transform: ${frameTransform(f)}; opacity: ${f.opacity}; }`
    ).join('\n')}\n}`
  }, [name, frames])

  const animProp = `animation: ${name} ${duration}s ${easing} ${iter} ${direction};`

  useEffect(() => {
    const styleId = 'anim-gen-style'
    let el = document.getElementById(styleId) as HTMLStyleElement | null
    if (!el) {
      el = document.createElement('style')
      el.id = styleId
      document.head.appendChild(el)
    }
    el.textContent = keyframesCSS
    return () => {
      const e = document.getElementById(styleId)
      if (e) e.remove()
    }
  }, [keyframesCSS])

  const copy = () => {
    navigator.clipboard.writeText(`${keyframesCSS}\n\n.element {\n  ${animProp}\n}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const updateFrame = (i: number, key: keyof Keyframe, val: number) => {
    setFrames(prev => prev.map((f, idx) => idx === i ? { ...f, [key]: val } : f))
  }

  const previewStyle: React.CSSProperties = {
    width: '80px', height: '80px', background: '#E85D04', borderRadius: '12px',
    animation: `${name} ${duration}s ${easing} ${iter} ${direction}`,
    margin: '0 auto',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✨</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>CSS Animation Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Build CSS keyframe animations visually.</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', alignSelf: 'center' }}>Presets:</span>
          {Object.keys(PRESETS).map(k => (
            <button key={k} onClick={() => setFrames(PRESETS[k])} style={{ padding: '6px 12px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#C2410C', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' }}>{k}</button>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Animation name</label>
              <input value={name} onChange={e => setName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, '') || 'myAnim')} style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Duration ({duration.toFixed(1)}s)</label>
              <input type="range" min={0.1} max={5} step={0.1} value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F2A4A', display: 'block', marginBottom: '6px' }}>Iteration</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input value={iter} onChange={e => setIter(e.target.value)} style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', boxSizing: 'border-box' }} />
                <button onClick={() => setIter('infinite')} style={{ padding: '6px 10px', background: iter === 'infinite' ? '#E85D04' : 'white', color: iter === 'infinite' ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>∞</button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Easing</label>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {(['linear','ease','ease-in','ease-out','ease-in-out'] as const).map(e => (
                <button key={e} onClick={() => setEasing(e)} style={{ padding: '6px 10px', background: easing === e ? '#E85D04' : 'white', color: easing === e ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontFamily: 'inherit', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>{e}</button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '14px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Direction</label>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {(['normal','reverse','alternate','alternate-reverse'] as const).map(d => (
                <button key={d} onClick={() => setDirection(d)} style={{ padding: '6px 10px', background: direction === d ? '#E85D04' : 'white', color: direction === d ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontFamily: 'inherit', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '14px' }}>Keyframe editor</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '14px' }}>
            {frames.map((f, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F2A4A', marginBottom: '8px' }}>{['0%','50%','100%'][i]}</div>
                {[
                  { k: 'translateX' as const, l: `translateX (${f.translateX}px)`, min: -200, max: 200, step: 1 },
                  { k: 'translateY' as const, l: `translateY (${f.translateY}px)`, min: -200, max: 200, step: 1 },
                  { k: 'rotate' as const, l: `rotate (${f.rotate}°)`, min: 0, max: 360, step: 1 },
                  { k: 'scale' as const, l: `scale (${f.scale.toFixed(2)})`, min: 0.1, max: 3, step: 0.05 },
                  { k: 'opacity' as const, l: `opacity (${f.opacity.toFixed(2)})`, min: 0, max: 1, step: 0.05 },
                ].map(field => (
                  <div key={field.k} style={{ marginBottom: '6px' }}>
                    <label style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>{field.l}</label>
                    <input type="range" min={field.min} max={field.max} step={field.step} value={f[field.k]} onChange={e => updateFrame(i, field.k, Number(e.target.value))} style={{ width: '100%' }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '30px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px', textAlign: 'center' }}>Live preview</div>
          <div style={previewStyle} />
        </div>

        <div style={{ marginTop: '20px', background: '#0F2A4A', borderRadius: '12px', padding: '20px', position: 'relative' }}>
          <button onClick={copy} style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', background: copied ? '#16A34A' : '#E85D04', color: 'white', border: 'none', borderRadius: '6px', fontFamily: 'inherit', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', color: '#a5f3fc', whiteSpace: 'pre-wrap' }}>{keyframesCSS}{'\n\n.element {\n  ' + animProp + '\n}'}</pre>
        </div>
      </div>
    </div>
  )
}

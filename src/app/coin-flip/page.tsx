/*
  ConvertDox — Coin Flip & Dice Roller
  PUT IN: src/app/coin-flip/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'

const DICE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

export default function CoinFlipPage() {
  const [activeTab, setActiveTab] = useState<'coin'|'dice'>('coin')

  // Coin state
  const [coinResult, setCoinResult] = useState<'heads'|'tails'|null>(null)
  const [coinFlipping, setCoinFlipping] = useState(false)
  const [coinHistory, setCoinHistory] = useState<('heads'|'tails')[]>([])
  const [coinStats, setCoinStats] = useState({ heads:0, tails:0 })

  // Dice state
  const [diceCount, setDiceCount] = useState(1)
  const [diceSides, setDiceSides] = useState(6)
  const [diceResults, setDiceResults] = useState<number[]>([])
  const [diceRolling, setDiceRolling] = useState(false)
  const [diceHistory, setDiceHistory] = useState<number[][]>([])

  const flipCoin = () => {
    if (coinFlipping) return
    setCoinFlipping(true)
    setTimeout(() => {
      const result = Math.random() < 0.5 ? 'heads' : 'tails'
      setCoinResult(result)
      setCoinFlipping(false)
      setCoinHistory(prev => [result, ...prev.slice(0, 19)])
      setCoinStats(prev => ({ ...prev, [result]: prev[result] + 1 }))
    }, 600)
  }

  const rollDice = () => {
    if (diceRolling) return
    setDiceRolling(true)
    setTimeout(() => {
      const results = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceSides) + 1)
      setDiceResults(results)
      setDiceRolling(false)
      setDiceHistory(prev => [results, ...prev.slice(0, 9)])
    }, 400)
  }

  const totalFlips = coinStats.heads + coinStats.tails
  const diceTotal = diceResults.reduce((a,b)=>a+b, 0)

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🪙</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Coin Flip & Dice Roller</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Flip a coin or roll any dice instantly. Perfect for games, decisions, and fun.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'720px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Tab selector */}
        <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'28px' }}>
          {([{id:'coin',label:'🪙 Coin Flip'},{id:'dice',label:'🎲 Dice Roller'}] as const).map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ flex:1,padding:'11px',borderRadius:'9px',border:'none',background:activeTab===t.id?'white':'transparent',fontFamily:'inherit',fontSize:'14px',fontWeight:700,color:activeTab===t.id?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:activeTab===t.id?'0 2px 6px rgba(0,0,0,0.08)':'none',transition:'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── COIN FLIP ── */}
        {activeTab === 'coin' && (
          <div>
            {/* Coin display */}
            <div onClick={flipCoin} style={{ cursor:'pointer',userSelect:'none' }}>
              <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'24px',padding:'48px 24px',textAlign:'center',marginBottom:'20px',boxShadow:'0 12px 40px rgba(15,42,74,0.2)',transition:'all 0.2s' }}>
                <div style={{ fontSize:'100px',lineHeight:1,marginBottom:'16px',transition:'all 0.3s',transform:coinFlipping?'rotateY(90deg)':'rotateY(0deg)',opacity:coinFlipping?0.3:1 }}>
                  {coinFlipping ? '🪙' : coinResult === 'heads' ? '🟡' : coinResult === 'tails' ? '⚪' : '🪙'}
                </div>
                {!coinFlipping && coinResult && (
                  <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'42px',fontWeight:800,color:'white',textTransform:'uppercase',letterSpacing:'2px' }}>
                    {coinResult}
                  </div>
                )}
                {coinFlipping && (
                  <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:'rgba(255,255,255,0.5)' }}>
                    Flipping...
                  </div>
                )}
                {!coinResult && !coinFlipping && (
                  <div style={{ fontSize:'16px',color:'rgba(255,255,255,0.5)' }}>Click to flip!</div>
                )}
              </div>
            </div>

            <button onClick={flipCoin} disabled={coinFlipping}
              style={{ width:'100%',background:'#E85D04',color:'white',border:'none',padding:'16px',borderRadius:'14px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:coinFlipping?'not-allowed':'pointer',boxShadow:'0 4px 16px rgba(232,93,4,0.3)',opacity:coinFlipping?0.7:1,marginBottom:'20px' }}>
              {coinFlipping ? 'Flipping...' : '🪙 Flip Coin'}
            </button>

            {/* Stats */}
            {totalFlips > 0 && (
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',marginBottom:'20px' }}>
                {[
                  { label:'Heads', val:coinStats.heads, color:'#C2410C', bg:'#FFF7ED' },
                  { label:'Tails', val:coinStats.tails, color:'#1D4ED8', bg:'#EFF6FF' },
                  { label:'Total Flips', val:totalFlips, color:'#0F2A4A', bg:'#f8fafc' },
                ].map(s => (
                  <div key={s.label} style={{ background:s.bg,borderRadius:'12px',padding:'14px',textAlign:'center' }}>
                    <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'28px',fontWeight:800,color:s.color }}>{s.val}</div>
                    <div style={{ fontSize:'12px',color:'#64748b',marginTop:'3px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* History */}
            {coinHistory.length > 0 && (
              <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px' }}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Flip History</div>
                <div style={{ display:'flex',flexWrap:'wrap',gap:'6px' }}>
                  {coinHistory.map((r,i) => (
                    <span key={i} style={{ background:r==='heads'?'#FFF7ED':'#EFF6FF',color:r==='heads'?'#C2410C':'#1D4ED8',borderRadius:'6px',padding:'3px 10px',fontSize:'12px',fontWeight:700,textTransform:'uppercase' }}>{r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DICE ROLLER ── */}
        {activeTab === 'dice' && (
          <div>
            <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',marginBottom:'20px',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>

              {/* Dice type */}
              <div style={{ marginBottom:'20px' }}>
                <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'10px' }}>Dice Type</label>
                <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
                  {[4,6,8,10,12,20,100].map(n => (
                    <button key={n} onClick={() => setDiceSides(n)}
                      style={{ padding:'8px 14px',borderRadius:'9px',border:'2px solid',borderColor:diceSides===n?'#0F2A4A':'#e2e8f0',background:diceSides===n?'#0F2A4A':'white',color:diceSides===n?'white':'#64748b',fontFamily:'inherit',fontSize:'14px',fontWeight:700,cursor:'pointer',minWidth:'52px' }}>
                      d{n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of dice */}
              <div style={{ marginBottom:'24px' }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
                  <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>Number of dice</label>
                  <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:800,color:'#E85D04' }}>{diceCount}</span>
                </div>
                <input type="range" min="1" max="10" value={diceCount} onChange={e=>setDiceCount(parseInt(e.target.value))}
                  style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
              </div>

              <button onClick={rollDice} disabled={diceRolling}
                style={{ width:'100%',background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',color:'white',border:'none',padding:'15px',borderRadius:'12px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:diceRolling?'not-allowed':'pointer',opacity:diceRolling?0.7:1 }}>
                {diceRolling ? 'Rolling...' : `🎲 Roll ${diceCount}d${diceSides}`}
              </button>
            </div>

            {/* Dice results */}
            {diceResults.length > 0 && (
              <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'20px',padding:'28px',textAlign:'center',marginBottom:'20px' }}>
                <div style={{ display:'flex',justifyContent:'center',flexWrap:'wrap',gap:'12px',marginBottom:'16px' }}>
                  {diceResults.map((n,i) => (
                    <div key={i} style={{ width:'60px',height:'60px',background:'white',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column' }}>
                      {diceSides === 6
                        ? <span style={{ fontSize:'32px' }}>{DICE_FACES[n]}</span>
                        : <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A' }}>{n}</span>
                      }
                    </div>
                  ))}
                </div>
                {diceCount > 1 && (
                  <div>
                    <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.5)',marginBottom:'4px' }}>Total</div>
                    <div style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'42px',fontWeight:800,color:'#F48C42' }}>{diceTotal}</div>
                  </div>
                )}
              </div>
            )}

            {/* Dice history */}
            {diceHistory.length > 1 && (
              <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'16px' }}>
                <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'10px' }}>Roll History</div>
                {diceHistory.slice(1).map((rolls,i) => (
                  <div key={i} style={{ padding:'7px 12px',borderRadius:'8px',background:'#f8fafc',marginBottom:'5px',fontSize:'13px',color:'#64748b',display:'flex',justifyContent:'space-between' }}>
                    <span>{rolls.join(' + ')} {rolls.length > 1 && `= ${rolls.reduce((a,b)=>a+b,0)}`}</span>
                    <span style={{ fontSize:'11px',color:'#94a3b8' }}>d{diceSides}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  )
}

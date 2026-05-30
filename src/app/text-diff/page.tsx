'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Logo = () => (
  <div style={{ width:'44px',height:'44px',background:'#0F2A4A',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
    <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
      <rect x="6" y="10" width="13" height="17" rx="2" fill="white" opacity="0.95"/>
      <rect x="25" y="17" width="13" height="17" rx="2" fill="#E85D04"/>
      <polygon points="20,20 24,22 20,24" fill="white"/>
    </svg>
  </div>
)

const NAV = () => (
  <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #e2e8f0',boxShadow:'0 1px 8px rgba(15,42,74,0.06)' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'0 24px',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
      <Link href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:'9px' }}>
        <Logo/>
        <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'30px',fontWeight:800,color:'#0F2A4A' }}>Convert<span style={{ color:'#E85D04' }}>Dox</span></span>
      </Link>
      <Link href="/" style={{ fontSize:'13px',color:'#64748b',textDecoration:'none',fontWeight:500 }}>← All Tools</Link>
    </div>
  </nav>
)

const FOOTER = () => (
  <footer style={{ background:'#0F2A4A',marginTop:'60px',padding:'28px 24px' }}>
    <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px' }}>
      <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'16px',fontWeight:800,color:'white' }}>Convert<span style={{ color:'#F48C42' }}>Dox</span></span>
      <p style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',margin:0 }}>© 2025 ConvertDox — Every Online Tool You Need</p>
      <div style={{ display:'flex',gap:'16px' }}>{['Privacy','Terms','All Tools'].map(l=><a key={l} href={l==='All Tools'?'/':'/legal'} style={{ color:'rgba(255,255,255,0.4)',fontSize:'13px',textDecoration:'none' }}>{l}</a>)}</div>
    </div>
  </footer>
)

type DiffLine = { type: 'add' | 'remove' | 'same'; text: string }

function computeDiff(original: string, modified: string, ignoreWs: boolean, ignoreCase: boolean): DiffLine[] {
  const norm = (s: string) => {
    const r = ignoreWs ? s.trim() : s
    return ignoreCase ? r.toLowerCase() : r
  }
  const a = original.split('\n')
  const b = modified.split('\n')
  const m = Math.min(a.length, 300)
  const n = Math.min(b.length, 300)
  const aSlice = a.slice(0, m)
  const bSlice = b.slice(0, n)

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (norm(aSlice[i - 1]) === norm(bSlice[j - 1])) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && norm(aSlice[i - 1]) === norm(bSlice[j - 1])) {
      result.unshift({ type: 'same', text: aSlice[i - 1] }); i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'add', text: bSlice[j - 1] }); j--
    } else {
      result.unshift({ type: 'remove', text: aSlice[i - 1] }); i--
    }
  }
  return result
}

const SAMPLE_ORIGINAL = `The quick brown fox jumps over the lazy dog.
Pack my box with five dozen liquor jugs.
How vexingly quick daft zebras jump.
The five boxing wizards jump quickly.`

const SAMPLE_MODIFIED = `The quick brown fox leaps over the lazy cat.
Pack my box with five dozen liquor jugs.
How vexingly quick daft zebras jump!
The five boxing wizards jump quickly.
A new line was added at the end.`

export default function TextDiffPage() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [ignoreWs, setIgnoreWs] = useState(false)
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [copiedDiff, setCopiedDiff] = useState(false)
  const [tooLarge, setTooLarge] = useState(false)

  useEffect(() => {
    const aLen = original.split('\n').length
    const bLen = modified.split('\n').length
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTooLarge(aLen > 300 || bLen > 300)
  }, [original, modified])

  const diff = computeDiff(original, modified, ignoreWs, ignoreCase)

  const added = diff.filter(l => l.type === 'add').length
  const removed = diff.filter(l => l.type === 'remove').length
  const unchanged = diff.filter(l => l.type === 'same').length

  const handleCopyDiff = () => {
    const text = diff.map(l => {
      const prefix = l.type === 'add' ? '+ ' : l.type === 'remove' ? '- ' : '  '
      return prefix + l.text
    }).join('\n')
    navigator.clipboard.writeText(text)
    setCopiedDiff(true)
    setTimeout(() => setCopiedDiff(false), 2000)
  }

  const handleSwap = () => {
    setOriginal(modified)
    setModified(original)
  }

  const handleClear = () => {
    setOriginal('')
    setModified('')
  }

  const handleLoadSample = () => {
    setOriginal(SAMPLE_ORIGINAL)
    setModified(SAMPLE_MODIFIED)
  }

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NAV />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>
            🔄
          </div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Text Diff Checker</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Compare two texts side by side and highlight every difference</p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'16px 24px 0' }}>
        <div style={{ background:'#F0FDF4',border:'1.5px solid #BBF7D0',borderRadius:'12px',padding:'12px 16px',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center' }}>
          {[{icon:'🔒',text:'No files stored'},{icon:'🛡',text:'HTTPS encrypted'},{icon:'⚡',text:'Works in your browser'},{icon:'🆓',text:'100% free, no signup'}].map(item=>(
            <span key={item.text} style={{ fontSize:'13px',color:'#166534',fontWeight:600,display:'flex',alignItems:'center',gap:'6px' }}>
              <span style={{ fontSize:'16px' }}>{item.icon}</span>{item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth:'1100px',margin:'0 auto',padding:'32px 24px' }}>

        {/* Action bar */}
        <div style={{ display:'flex',flexWrap:'wrap',gap:'12px',alignItems:'center',marginBottom:'20px' }}>
          <label style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>
            <input type="checkbox" checked={ignoreWs} onChange={e=>setIgnoreWs(e.target.checked)}
              style={{ width:'16px',height:'16px',cursor:'pointer',accentColor:'#E85D04' }}/>
            Ignore whitespace
          </label>
          <label style={{ display:'flex',alignItems:'center',gap:'8px',cursor:'pointer',fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>
            <input type="checkbox" checked={ignoreCase} onChange={e=>setIgnoreCase(e.target.checked)}
              style={{ width:'16px',height:'16px',cursor:'pointer',accentColor:'#E85D04' }}/>
            Ignore case
          </label>
          <div style={{ marginLeft:'auto',display:'flex',gap:'8px',flexWrap:'wrap' }}>
            <button onClick={handleLoadSample}
              style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'9px 18px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
              Load Sample
            </button>
            <button onClick={handleSwap}
              style={{ background:'white',color:'#0F2A4A',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'9px 18px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
              ⇄ Swap
            </button>
            <button onClick={handleClear}
              style={{ background:'white',color:'#DC2626',border:'1.5px solid #FECACA',borderRadius:'10px',padding:'9px 18px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer' }}>
              Clear All
            </button>
          </div>
        </div>

        {/* Two-column textareas */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'28px' }}>
          <div>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'8px' }}>
              Original Text
            </div>
            <textarea
              value={original}
              onChange={e=>setOriginal(e.target.value)}
              placeholder="Paste original text here..."
              style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'monospace',fontSize:'13px',outline:'none',width:'100%',boxSizing:'border-box' as const,minHeight:'240px',resize:'vertical',color:'#0F2A4A',lineHeight:1.6 }}
            />
          </div>
          <div>
            <div style={{ fontSize:'12px',fontWeight:700,color:'#E85D04',textTransform:'uppercase' as const,letterSpacing:'1px',marginBottom:'8px' }}>
              Modified Text
            </div>
            <textarea
              value={modified}
              onChange={e=>setModified(e.target.value)}
              placeholder="Paste modified text here..."
              style={{ border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'12px 16px',fontFamily:'monospace',fontSize:'13px',outline:'none',width:'100%',boxSizing:'border-box' as const,minHeight:'240px',resize:'vertical',color:'#0F2A4A',lineHeight:1.6 }}
            />
          </div>
        </div>

        {/* Warning for large texts */}
        {tooLarge && (
          <div style={{ background:'#FFFBEB',border:'1.5px solid #FCD34D',borderRadius:'10px',padding:'12px 16px',color:'#92400E',fontSize:'13px',fontWeight:600,marginBottom:'16px' }}>
            Warning: Input exceeds 300 lines. Only the first 300 lines of each text will be compared.
          </div>
        )}

        {/* Diff output */}
        {(original || modified) && (
          <div>
            {/* Stats + copy bar */}
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',marginBottom:'12px' }}>
              <div style={{ display:'flex',gap:'16px',flexWrap:'wrap' }}>
                <span style={{ fontSize:'13px',fontWeight:700,color:'#166534',background:'#DCFCE7',padding:'4px 12px',borderRadius:'999px' }}>
                  +{added} added
                </span>
                <span style={{ fontSize:'13px',fontWeight:700,color:'#B91C1C',background:'#FEE2E2',padding:'4px 12px',borderRadius:'999px' }}>
                  −{removed} removed
                </span>
                <span style={{ fontSize:'13px',fontWeight:700,color:'#475569',background:'#f1f5f9',padding:'4px 12px',borderRadius:'999px' }}>
                  {unchanged} unchanged
                </span>
              </div>
              <button onClick={handleCopyDiff}
                style={{ background: copiedDiff ? '#16A34A' : '#E85D04',color:'white',border:'none',borderRadius:'10px',padding:'9px 18px',fontFamily:'inherit',fontSize:'13px',fontWeight:700,cursor:'pointer' }}>
                {copiedDiff ? '✓ Copied!' : '📋 Copy Diff'}
              </button>
            </div>

            {/* Diff lines */}
            <div style={{ border:'1.5px solid #e2e8f0',borderRadius:'14px',overflow:'hidden' }}>
              <div style={{ fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase' as const,letterSpacing:'1px',padding:'10px 16px',borderBottom:'1px solid #e2e8f0',background:'#f8fafc' }}>
                Differences
              </div>
              <div style={{ maxHeight:'480px',overflowY:'auto' }}>
                {diff.length === 0 ? (
                  <div style={{ padding:'32px',textAlign:'center',color:'#94a3b8',fontSize:'14px' }}>
                    No differences found — the texts are identical.
                  </div>
                ) : (
                  diff.map((line, idx) => (
                    <div key={idx} style={{
                      padding:'6px 16px',
                      background: line.type === 'add' ? '#DCFCE7' : line.type === 'remove' ? '#FEE2E2' : '#f8fafc',
                      borderBottom:'1px solid',
                      borderBottomColor: line.type === 'add' ? '#BBF7D0' : line.type === 'remove' ? '#FECACA' : '#f1f5f9',
                      display:'flex',
                      gap:'12px',
                      alignItems:'flex-start',
                    }}>
                      <span style={{
                        fontFamily:'monospace',
                        fontSize:'13px',
                        fontWeight:700,
                        flexShrink:0,
                        width:'16px',
                        color: line.type === 'add' ? '#166534' : line.type === 'remove' ? '#B91C1C' : '#94a3b8',
                      }}>
                        {line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '}
                      </span>
                      <span style={{
                        fontFamily:'monospace',
                        fontSize:'13px',
                        color: line.type === 'add' ? '#166534' : line.type === 'remove' ? '#B91C1C' : '#64748b',
                        wordBreak:'break-all',
                        whiteSpace:'pre-wrap',
                        flex:1,
                      }}>
                        {line.text || ' '}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Info cards */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'16px',marginTop:'40px' }}>
          {[
            { title:'LCS Algorithm', body:'Uses the Longest Common Subsequence (LCS) algorithm — the same approach used by git diff — to accurately identify changed lines.' },
            { title:'Ignore Options', body:'Toggle "Ignore whitespace" to treat indentation changes as equal. Toggle "Ignore case" to treat uppercase and lowercase as the same.' },
            { title:'Swap & Compare', body:'Use the Swap button to flip the original and modified texts, or Load Sample to see the diff tool in action with example content.' },
          ].map(card => (
            <div key={card.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'20px' }}>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>{card.title}</div>
              <div style={{ fontSize:'13px',color:'#64748b',lineHeight:1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

      </div>

      <FOOTER />
    </div>
  )
}

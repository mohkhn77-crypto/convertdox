'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'

const TROY_OZ_G = 31.1035
const GOLD_NISAB_G = 87.48
const SILVER_NISAB_G = 612.36
const ZAKAT_RATE = 0.025

const CURRENCIES = [
  { code: 'USD', symbol: '$',   name: 'US Dollar' },
  { code: 'PKR', symbol: '₨',   name: 'Pakistani Rupee' },
  { code: 'INR', symbol: '₹',   name: 'Indian Rupee' },
  { code: 'GBP', symbol: '£',   name: 'British Pound' },
  { code: 'EUR', symbol: '€',   name: 'Euro' },
  { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham' },
  { code: 'BDT', symbol: '৳',   name: 'Bangladeshi Taka' },
  { code: 'CAD', symbol: 'C$',  name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$',  name: 'Australian Dollar' },
  { code: 'MYR', symbol: 'RM',  name: 'Malaysian Ringgit' },
  { code: 'TRY', symbol: '₺',   name: 'Turkish Lira' },
]

export default function ZakatCalculatorPage() {
  // Holdings
  const [cash, setCash] = useState('')
  const [goldGrams, setGoldGrams] = useState('')
  const [silverGrams, setSilverGrams] = useState('')
  // Prices per gram (editable; auto-filled from live fetch when available)
  const [goldPrice, setGoldPrice] = useState('')   // per gram
  const [silverPrice, setSilverPrice] = useState('') // per gram
  const [priceStatus, setPriceStatus] = useState<'loading' | 'live' | 'manual'>('loading')
  const [nisabBasis, setNisabBasis] = useState<'gold' | 'silver'>('gold')
  const [currency, setCurrency] = useState('USD')
  const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]
  const sym = selectedCurrency.symbol

  // Fetch live prices in the selected currency. Defensive: fall back to manual.
  // gold-api.com gives USD per troy ounce (no key). For non-USD, convert via
  // open.er-api.com (free, no key). If either fails, drop to manual entry.
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setPriceStatus('loading')
      try {
        const [g, s] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU').then(r => r.json()),
          fetch('https://api.gold-api.com/price/XAG').then(r => r.json()),
        ])
        const goldOzUsd = Number(g?.price)
        const silverOzUsd = Number(s?.price)
        if (!(goldOzUsd > 0 && silverOzUsd > 0)) { if (!cancelled) setPriceStatus('manual'); return }

        let fx = 1
        if (currency !== 'USD') {
          try {
            const fxData = await fetch('https://open.er-api.com/v6/latest/USD').then(r => r.json())
            const rate = Number(fxData?.rates?.[currency])
            if (rate > 0) { fx = rate } else { if (!cancelled) setPriceStatus('manual'); return }
          } catch {
            if (!cancelled) setPriceStatus('manual'); return
          }
        }

        if (!cancelled) {
          setGoldPrice(((goldOzUsd / TROY_OZ_G) * fx).toFixed(2))
          setSilverPrice(((silverOzUsd / TROY_OZ_G) * fx).toFixed(2))
          setPriceStatus('live')
        }
      } catch {
        if (!cancelled) setPriceStatus('manual')
      }
    }
    load()
    return () => { cancelled = true }
  }, [currency])

  const num = (v: string) => { const n = parseFloat(v); return isNaN(n) || n < 0 ? 0 : n }

  const gp = num(goldPrice)
  const sp = num(silverPrice)
  const goldValue = num(goldGrams) * gp
  const silverValue = num(silverGrams) * sp
  const cashValue = num(cash)
  const totalWealth = cashValue + goldValue + silverValue

  const goldNisabValue = GOLD_NISAB_G * gp
  const silverNisabValue = SILVER_NISAB_G * sp
  const activeNisab = nisabBasis === 'gold' ? goldNisabValue : silverNisabValue
  const meetsNisab = activeNisab > 0 && totalWealth >= activeNisab
  const zakatDue = meetsNisab ? totalWealth * ZAKAT_RATE : 0

  const money = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const inputStyle = { width:'100%', padding:'12px 14px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'14px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', boxSizing:'border-box' as const }
  const labelStyle = { display:'block', fontSize:'13px', fontWeight:700, color:'#0F2A4A', marginBottom:'6px' }

  return (
    <div style={{ minHeight:'100vh', background:'#fff', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>🕌</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>Zakat Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Calculate Zakat on cash, gold, and silver — with live metal prices and both nisab thresholds</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'720px', margin:'28px auto 0', padding:'0 24px' }}>
        {/* Price status */}
        <div style={{ background: priceStatus === 'live' ? '#F0FDF4' : '#FFFBEB', border: `1.5px solid ${priceStatus === 'live' ? '#BBF7D0' : '#FDE68A'}`, borderRadius:'10px', padding:'10px 14px', fontSize:'13px', color: priceStatus === 'live' ? '#166534' : '#92400E', marginBottom:'18px' }}>
          {priceStatus === 'loading' && '⏳ Loading live gold & silver prices…'}
          {priceStatus === 'live' && `✅ Live gold & silver prices loaded (${currency} per gram). You can adjust them below if needed.`}
          {priceStatus === 'manual' && `⚠️ Couldn't load live prices for ${currency}. Please enter today's gold & silver price per gram (in ${currency}) manually below.`}
        </div>

        {/* Holdings */}
        <div style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'14px', padding:'20px', marginBottom:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px', gap:'12px', flexWrap:'wrap' as const }}>
            <div style={{ fontSize:'15px', fontWeight:800, color:'#0F2A4A' }}>Your holdings</div>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              style={{ padding:'8px 12px', borderRadius:'10px', border:'1.5px solid #e2e8f0', fontSize:'13px', fontFamily:'inherit', color:'#0F2A4A', outline:'none', background:'white', fontWeight:700, cursor:'pointer' }}>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:'14px' }}>
            <label style={labelStyle}>💵 Cash & savings ({currency})</label>
            <input type="number" min="0" value={cash} onChange={e => setCash(e.target.value)} placeholder="0.00" style={inputStyle} />
          </div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' as const }}>
            <div style={{ flex:1, minWidth:'140px' }}>
              <label style={labelStyle}>🥇 Gold (grams)</label>
              <input type="number" min="0" value={goldGrams} onChange={e => setGoldGrams(e.target.value)} placeholder="0" style={inputStyle} />
            </div>
            <div style={{ flex:1, minWidth:'140px' }}>
              <label style={labelStyle}>🥈 Silver (grams)</label>
              <input type="number" min="0" value={silverGrams} onChange={e => setSilverGrams(e.target.value)} placeholder="0" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Prices (editable) */}
        <div style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'14px', padding:'20px', marginBottom:'16px' }}>
          <div style={{ fontSize:'15px', fontWeight:800, color:'#0F2A4A', marginBottom:'14px' }}>Metal prices (per gram, {currency})</div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' as const }}>
            <div style={{ flex:1, minWidth:'140px' }}>
              <label style={labelStyle}>Gold price / gram</label>
              <input type="number" min="0" value={goldPrice} onChange={e => { setGoldPrice(e.target.value); setPriceStatus('manual') }} placeholder="0.00" style={inputStyle} />
            </div>
            <div style={{ flex:1, minWidth:'140px' }}>
              <label style={labelStyle}>Silver price / gram</label>
              <input type="number" min="0" value={silverPrice} onChange={e => { setSilverPrice(e.target.value); setPriceStatus('manual') }} placeholder="0.00" style={inputStyle} />
            </div>
          </div>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'8px' }}>Prices are in {currency} per gram. You can adjust them to match your local market rate.</div>
        </div>

        {/* Nisab basis */}
        <div style={{ background:'white', border:'1.5px solid #e2e8f0', borderRadius:'14px', padding:'20px', marginBottom:'16px' }}>
          <label style={labelStyle}>Nisab threshold to apply</label>
          <div style={{ display:'flex', gap:'8px' }}>
            {([['gold', 'Gold (87.48g)'], ['silver', 'Silver (612.36g)']] as const).map(([k, lbl]) => (
              <button key={k} onClick={() => setNisabBasis(k)}
                style={{ flex:1, padding:'10px', borderRadius:'10px', border:'1.5px solid', borderColor: nisabBasis === k ? '#E85D04' : '#e2e8f0', background: nisabBasis === k ? '#FFF7ED' : 'white', color: nisabBasis === k ? '#E85D04' : '#0F2A4A', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                {lbl}
              </button>
            ))}
          </div>
          <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'10px', lineHeight:'1.6' }}>
            Gold nisab ≈ {gp > 0 ? `${sym}${money(goldNisabValue)}` : '—'} · Silver nisab ≈ {sp > 0 ? `${sym}${money(silverNisabValue)}` : '—'}. Many scholars recommend the silver nisab (lower threshold) so more wealth benefits recipients; others use gold. Choose per your guidance.
          </div>
        </div>

        {/* Result */}
        <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', borderRadius:'16px', padding:'24px', color:'white', marginBottom:'20px' }}>
          <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', marginBottom:'6px' }}>Total zakatable wealth</div>
          <div style={{ fontSize:'24px', fontWeight:800, marginBottom:'16px' }}>{sym}{money(totalWealth)}</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:'16px' }}>
            <div>
              <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)' }}>{meetsNisab ? 'Zakat due (2.5%)' : 'Below nisab — no Zakat due'}</div>
              {!meetsNisab && activeNisab > 0 && <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', marginTop:'2px' }}>You need {sym}{money(activeNisab)} to reach the {nisabBasis} nisab.</div>}
            </div>
            <div style={{ fontSize:'30px', fontWeight:800, color:'#F48C42' }}>{sym}{money(zakatDue)}</div>
          </div>
        </div>

        {/* Religious disclaimer */}
        <div style={{ background:'#FFFBEB', border:'1.5px solid #FDE68A', borderRadius:'12px', padding:'14px 16px', marginBottom:'8px' }}>
          <div style={{ fontSize:'13px', color:'#92400E', lineHeight:'1.7' }}>
            <strong>Please note:</strong> This calculator provides a general estimate using the standard 2.5% rate and common nisab values. Zakat rulings differ between schools of thought (for example, on which nisab to use and how to treat certain assets like jewellery in regular use). For your specific situation, please consult a qualified scholar. This tool covers cash, gold, and silver — it does not include business assets, investments, debts owed, or liabilities, which may affect your final Zakat.
          </div>
        </div>
      </div>

      {/* SEO content */}
      <div style={{ maxWidth:'720px', margin:'40px auto 0', padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>How to Calculate Your Zakat</h2>
          <ol style={{ paddingLeft:'24px', fontSize:'15px', color:'#64748b', lineHeight:'1.8' }}>
            {['Enter your cash and savings, plus the grams of gold and silver you own.','Live gold and silver prices load automatically — adjust them or enter your local prices if needed.','Choose which nisab threshold to apply (gold or silver).','If your total wealth meets the nisab, your Zakat is calculated at 2.5%.','Review the result and consult a scholar for your specific circumstances.'].map((s,i) => (
              <li key={i} style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step {i+1}:</strong> {s}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'26px', fontWeight:800, color:'#0F2A4A', marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What is nisab?', a:'Nisab is the minimum amount of wealth a Muslim must hold before Zakat becomes obligatory. It is set at the value of 87.48 grams of gold or 612.36 grams of silver. If your total qualifying wealth is below the nisab, no Zakat is due.' },
            { q:'Should I use the gold or silver nisab?', a:'Both are valid. The silver nisab is a lower threshold, so using it means more people pay Zakat and more wealth reaches recipients — many scholars recommend it for this reason. Others use the gold nisab. Follow the guidance of a scholar you trust.' },
            { q:'How much Zakat do I pay?', a:'Zakat is 2.5% of your qualifying wealth, provided that wealth meets or exceeds the nisab and has been held for one lunar year (hawl).' },
            { q:'Does this include jewellery I wear?', a:'Scholars differ on whether gold and silver jewellery in regular personal use is subject to Zakat. This calculator includes any gold and silver grams you enter — consult a scholar on how to treat jewellery in your case.' },
            { q:'Can I calculate Zakat in my own currency?', a:'Yes. Choose your currency from the dropdown (USD, PKR, INR, GBP, EUR, SAR, AED and more). Live gold and silver prices are converted to your currency automatically. If live conversion is unavailable, you can enter today\'s local gold and silver price per gram manually — the calculation works the same way.' },
            { q:'Does this cover all my assets?', a:'This tool covers cash, gold, and silver. It does not include business inventory, shares, rental income, debts owed to you, or liabilities you owe, all of which can affect your total Zakat. Consult a scholar for a complete assessment.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'14px 18px', marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px', fontWeight:600, color:'#0F2A4A', cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:'1.7', marginTop:'10px', marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  )
}

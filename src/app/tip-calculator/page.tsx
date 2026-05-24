/*
  ConvertDox — Tip Calculator
  PUT IN: src/app/tip-calculator/page.tsx
  URL: localhost:3000/tip-calculator
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'

export default function TipCalculatorPage() {
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState(15)
  const [custom, setCustom] = useState('')
  const [people, setPeople] = useState(1)

  const pct    = custom !== '' ? parseFloat(custom)||0 : tipPct
  const b      = parseFloat(bill)||0
  const tip    = b*(pct/100)
  const total  = b+tip
  const perP   = people>0 ? total/people : total
  const tipPer = people>0 ? tip/people : tip

  const presets = [10,15,18,20,25]

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>🍽</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Tip Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Calculate tip and split the bill instantly. Never do restaurant math again.</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'32px',boxShadow:'0 8px 32px rgba(15,42,74,0.08)' }}>

          {/* Bill */}
          <div style={{ marginBottom:'22px' }}>
            <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>💵 Bill Amount</label>
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',fontSize:'18px',fontWeight:700,color:'#94a3b8' }}>$</span>
              <input type="number" value={bill} onChange={e=>setBill(e.target.value)} placeholder="0.00"
                style={{ width:'100%',padding:'14px 16px 14px 34px',border:'1.5px solid #e2e8f0',borderRadius:'12px',fontFamily:'inherit',fontSize:'22px',fontWeight:700,color:'#0F2A4A',outline:'none',transition:'border 0.15s' }}
                onFocus={e=>e.target.style.borderColor='#0F2A4A'}
                onBlur={e=>e.target.style.borderColor='#e2e8f0'}
              />
            </div>
          </div>

          {/* Tip % */}
          <div style={{ marginBottom:'22px' }}>
            <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>💡 Tip Percentage</label>
            <div style={{ display:'flex',gap:'8px',marginBottom:'10px',flexWrap:'wrap' }}>
              {presets.map(p=>(
                <button key={p} onClick={()=>{setTipPct(p);setCustom('')}}
                  style={{ flex:'1',minWidth:'56px',padding:'12px 8px',borderRadius:'10px',border:'2px solid',borderColor:tipPct===p&&custom===''?'#0F2A4A':'#e2e8f0',background:tipPct===p&&custom===''?'#0F2A4A':'#f8fafc',color:tipPct===p&&custom===''?'white':'#0F2A4A',fontFamily:'inherit',fontSize:'15px',fontWeight:700,cursor:'pointer',transition:'all 0.15s' }}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Custom % (e.g. 22)"
              style={{ width:'100%',padding:'12px 16px',border:'2px solid',borderColor:custom!==''?'#E85D04':'#e2e8f0',borderRadius:'10px',fontFamily:'inherit',fontSize:'15px',color:'#0F2A4A',outline:'none' }}/>
          </div>

          {/* Split */}
          <div style={{ marginBottom:'28px' }}>
            <label style={{ display:'block',fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'8px' }}>👥 Split Between</label>
            <div style={{ display:'flex',alignItems:'center',gap:'16px' }}>
              <button onClick={()=>setPeople(Math.max(1,people-1))} style={{ width:'44px',height:'44px',borderRadius:'50%',border:'2px solid #e2e8f0',background:'white',fontSize:'22px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,transition:'all 0.15s' }}>−</button>
              <div style={{ textAlign:'center',minWidth:'60px' }}>
                <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'32px',fontWeight:800,color:'#0F2A4A',lineHeight:1 }}>{people}</div>
                <div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'3px' }}>{people===1?'person':'people'}</div>
              </div>
              <button onClick={()=>setPeople(people+1)} style={{ width:'44px',height:'44px',borderRadius:'50%',border:'2px solid #e2e8f0',background:'white',fontSize:'22px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,transition:'all 0.15s' }}>+</button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop:'2px dashed #e2e8f0',margin:'0 0 24px' }}/>

          {/* Results */}
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <div style={{ background:'#FFF7ED',border:'2px solid #FED7AA',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
              <div style={{ fontSize:'13px',color:'#C2410C',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Tip Amount</div>
              <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'32px',fontWeight:800,color:'#C2410C' }}>${tip.toFixed(2)}</div>
            </div>
            <div style={{ background:'#F0FDF4',border:'2px solid #BBF7D0',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
              <div style={{ fontSize:'13px',color:'#166534',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Total Bill</div>
              <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'32px',fontWeight:800,color:'#166534' }}>${total.toFixed(2)}</div>
            </div>
            {people>1 && <>
              <div style={{ background:'#EFF6FF',border:'2px solid #BFDBFE',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
                <div style={{ fontSize:'13px',color:'#1D4ED8',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Tip / Person</div>
                <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'28px',fontWeight:800,color:'#1D4ED8' }}>${tipPer.toFixed(2)}</div>
              </div>
              <div style={{ background:'#0F2A4A',borderRadius:'14px',padding:'18px',textAlign:'center' }}>
                <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Each Person Pays</div>
                <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'28px',fontWeight:800,color:'white' }}>${perP.toFixed(2)}</div>
              </div>
            </>}
            {people===1 && (
              <div style={{ gridColumn:'1/-1',background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'14px',padding:'20px',textAlign:'center' }}>
                <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>You Pay Total</div>
                <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'40px',fontWeight:800,color:'white' }}>${total.toFixed(2)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop:'36px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>Related Tools</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px' }}>
            {[{href:'/percentage-calculator',icon:'%',name:'Percentage Calculator',desc:'Quick % math'},{href:'/discount-calculator',icon:'🏷',name:'Discount Calculator',desc:'Sale price finder'},{href:'/bmi-calculator',icon:'⚖️',name:'BMI Calculator',desc:'Body mass index'}].map(t=>(
              <a key={t.href} href={t.href} style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px',textDecoration:'none',display:'flex',gap:'10px',alignItems:'flex-start',boxShadow:'0 2px 8px rgba(15,42,74,0.04)' }}>
                <div style={{ width:'36px',height:'36px',background:'#FFF7ED',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0 }}>{t.icon}</div>
                <div><div style={{ fontSize:'13px',fontWeight:700,color:'#0F2A4A' }}>{t.name}</div><div style={{ fontSize:'12px',color:'#94a3b8',marginTop:'2px' }}>{t.desc}</div></div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop:'36px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[{q:'How much should I tip?',a:'Standard in the US is 15-20% for sit-down restaurants. 10% for takeout. 20-25% for exceptional service.'},{q:'How does the bill split work?',a:'Enter the number of people and we divide the total (bill + tip) equally among everyone.'},{q:'Is this calculator free?',a:'Yes, 100% free forever. No sign-up needed.'}].map((item,i)=>(
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/tip-calculator" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the Tip Calculator</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Settle the bill in seconds — tip, split, and per-person totals, all live.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Enter the bill total (pre-tip).</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Choose a preset tip percentage (15%, 18%, 20%) or enter a custom number.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Set the number of people splitting the bill.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> See the tip amount, total, and each person&apos;s share update live.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🍽️', title:'Restaurant Dining', desc:'Quick math at the end of a group meal.' },
              { icon:'🥡', title:'Food Delivery', desc:'Figure out a fair tip for delivery drivers.' },
              { icon:'🚕', title:'Taxi / Uber', desc:'Round up the fare and add a fair driver tip.' },
              { icon:'🏨', title:'Hotel Service', desc:'Bellhop, housekeeping, room service totals.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px' }}>
                <div style={{ fontSize:'24px',marginBottom:'8px' }}>{c.icon}</div>
                <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',marginBottom:'4px' }}>{c.title}</div>
                <div style={{ fontSize:'13px',color:'#64748b',lineHeight:'1.6' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Frequently Asked Questions</h2>
          {[
            { q:'What is the standard tip percentage?', a:'In the US, 15% is the floor for acceptable service, 18–20% is standard, and 25%+ signals exceptional service. In Europe and most of Asia, service charges are usually included and a 5–10% top-up suffices when warranted.' },
            { q:'Should I tip on tax?', a:'Strictly speaking, tip is calculated on the pre-tax subtotal. In practice many people tip on the post-tax total because the math is easier and the difference is small.' },
            { q:'How do I tip for takeout?', a:'A flat 10% is customary for takeout where staff bagged and packaged your order. No tip is acceptable for simple counter pickup, especially at quick-service restaurants.' },
            { q:'Is a 20% tip mandatory?', a:'No — tips are gratuities by definition. That said, in tipping cultures (US, Canada) less than 15% for sit-down service is generally read as a complaint. Large parties often have an automatic service charge already added.' },
            { q:'How do I split a bill unevenly?', a:'Use itemized splitting: each person pays their own items plus a proportional share of tax and tip. For a quick fix, sort the bill into rough thirds (cheap / medium / expensive eaters) and assign accordingly.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox Tip Calculator?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>End-of-meal mental arithmetic is one of those small everyday tasks that quietly causes friction. The ConvertDox Tip Calculator removes the friction: enter the bill, pick a tip percentage, set how many people are splitting, and the per-person share appears immediately. Preset tip buttons at the most common percentages (15%, 18%, 20%) handle the typical case; the custom field handles everything else, including the increasingly common scenario of paying through a kiosk that suggests 22%. The calculator updates live as you change any input, which is faster than typing on a phone keypad and confirming each digit. Because the whole thing runs in your browser, there&apos;s no sign-up, no app to install, and no data leaves your device — useful if you don&apos;t want a restaurant chain&apos;s analytics service knowing what you ate. The tool is responsive and works on phones, so you can pull it up at the table without an awkward delay. If you split bills regularly with the same group, save the page to your home screen and the calculator launches like an app. Beyond meals, it&apos;s useful for taxi fares, delivery orders, salon visits, hotel housekeeping, and any other service where tipping is customary — anywhere you&apos;d otherwise be doing percentage math in your head while five people stare at you.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Tip Calculator',
        'description': 'Free tip calculator with bill splitting. Calculates tip amount, total, and per-person share instantly.',
        'url': 'https://convertdox.com/tip-calculator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />

      <SiteFooter />
    </div>
  )
}

/*
  ConvertDox — Percentage Calculator
  PUT IN: src/app/percentage-calculator/page.tsx
  URL: localhost:3000/percentage-calculator
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import ToolPageSEO from '@/components/ToolPageSEO'

type CalcType = 'whatpct'|'pctof'|'change'|'increase'|'decrease'

export default function PercentageCalculatorPage() {
  const [active, setActive] = useState<CalcType>('pctof')
  // pctof: X% of Y
  const [pctA, setPctA] = useState(''); const [pctB, setPctB] = useState('')
  // whatpct: X is what % of Y
  const [wpA, setWpA] = useState(''); const [wpB, setWpB] = useState('')
  // change: % change from X to Y
  const [chA, setChA] = useState(''); const [chB, setChB] = useState('')
  // increase/decrease
  const [iA, setIA] = useState(''); const [iB, setIB] = useState('')

  const calc = () => {
    if (active==='pctof') { const r=(parseFloat(pctA)/100)*parseFloat(pctB); return isNaN(r)?null:{val:r.toFixed(4),label:`${pctA}% of ${pctB}`,display:r%1===0?r.toString():r.toFixed(2)} }
    if (active==='whatpct') { const r=(parseFloat(wpA)/parseFloat(wpB))*100; return isNaN(r)?null:{val:r.toFixed(4),label:`${wpA} is what % of ${wpB}`,display:r.toFixed(2)+'%'} }
    if (active==='change') { const r=((parseFloat(chB)-parseFloat(chA))/parseFloat(chA))*100; return isNaN(r)?null:{val:r.toFixed(2),label:`Change from ${chA} to ${chB}`,display:(r>0?'+':'')+r.toFixed(2)+'%',positive:r>0} }
    if (active==='increase') { const r=parseFloat(iA)*(1+parseFloat(iB)/100); return isNaN(r)?null:{val:r.toFixed(2),label:`${iA} increased by ${iB}%`,display:r.toFixed(2)} }
    if (active==='decrease') { const r=parseFloat(iA)*(1-parseFloat(iB)/100); return isNaN(r)?null:{val:r.toFixed(2),label:`${iA} decreased by ${iB}%`,display:r.toFixed(2)} }
    return null
  }
  const result = calc()

  const tabs = [
    { id:'pctof',    label:'% of Number',     desc:'What is 15% of 200?' },
    { id:'whatpct',  label:'What % is X of Y', desc:'45 is what % of 180?' },
    { id:'change',   label:'% Change',         desc:'Change from 80 to 100?' },
    { id:'increase', label:'% Increase',       desc:'200 increased by 15%?' },
    { id:'decrease', label:'% Decrease',       desc:'200 decreased by 15%?' },
  ] as const

  const inp = (val:string,set:(v:string)=>void,ph:string,label:string) => (
    <div>
      <label style={{ display:'block',fontSize:'13px',fontWeight:700,color:'#0F2A4A',marginBottom:'6px' }}>{label}</label>
      <input type="number" value={val} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{ width:'100%',padding:'13px 16px',border:'1.5px solid #e2e8f0',borderRadius:'11px',fontFamily:'inherit',fontSize:'16px',fontWeight:600,color:'#0F2A4A',outline:'none' }}/>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>%</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Percentage Calculator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Five different percentage calculations in one tool.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'680px',margin:'0 auto',padding:'36px 24px' }}>

        {/* Tab selector */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'6px',marginBottom:'24px' }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActive(t.id)}
              style={{ padding:'10px 6px',borderRadius:'10px',border:'2px solid',borderColor:active===t.id?'#0F2A4A':'#e2e8f0',background:active===t.id?'#0F2A4A':'white',color:active===t.id?'white':'#64748b',fontFamily:'inherit',fontSize:'11.5px',fontWeight:600,cursor:'pointer',lineHeight:'1.3',transition:'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <div style={{ background:'#FFF7ED',border:'1.5px solid #FED7AA',borderRadius:'12px',padding:'12px 16px',marginBottom:'20px',fontSize:'14px',color:'#C2410C',fontWeight:500 }}>
          💡 Example: {tabs.find(t=>t.id===active)?.desc}
        </div>

        {/* Inputs */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>
          <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
            {active==='pctof'    && <>{inp(pctA,setPctA,'e.g. 15','Percentage (%)') }{inp(pctB,setPctB,'e.g. 200','Of this number')}</>}
            {active==='whatpct'  && <>{inp(wpA,setWpA,'e.g. 45','This number') }{inp(wpB,setWpB,'e.g. 180','Is what % of this')}</>}
            {active==='change'   && <>{inp(chA,setChA,'e.g. 80','From (original)') }{inp(chB,setChB,'e.g. 100','To (new value)')}</>}
            {active==='increase' && <>{inp(iA,setIA,'e.g. 200','Starting number') }{inp(iB,setIB,'e.g. 15','Increase by (%)')}</>}
            {active==='decrease' && <>{inp(iA,setIA,'e.g. 200','Starting number') }{inp(iB,setIB,'e.g. 15','Decrease by (%)')}</>}
          </div>
        </div>

        {/* Result */}
        {result ? (
          <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',borderRadius:'16px',padding:'28px',textAlign:'center',boxShadow:'0 8px 32px rgba(15,42,74,0.2)' }}>
            <div style={{ fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px' }}>{result.label}</div>
            <div style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'52px',fontWeight:800,color: (result as { positive?: boolean }).positive===false?'#FCA5A5':(result as { positive?: boolean }).positive===true?'#86EFAC':'#F48C42',lineHeight:1 }}>
              {result.display}
            </div>
          </div>
        ) : (
          <div style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'16px',padding:'32px',textAlign:'center' }}>
            <div style={{ fontSize:'36px',marginBottom:'8px' }}>%</div>
            <p style={{ color:'#94a3b8',fontSize:'14px' }}>Fill in the numbers above to see the result</p>
          </div>
        )}

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk', system-ui, sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[{q:'How do I calculate 20% of a number?',a:'Multiply the number by 0.20. Example: 20% of 150 = 150 × 0.20 = 30. Or use the "% of Number" tab above.'},{q:'How do I find percentage change?',a:'Percentage change = ((New Value − Old Value) / Old Value) × 100. Use the "% Change" tab for instant results.'},{q:'What is percentage increase?',a:'Percentage increase = Original + (Original × Rate/100). Example: 200 increased by 25% = 200 + 50 = 250.'}].map((item,i)=>(
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <ToolPageSEO
        toolName="Percentage Calculator"
        whatIs="A percentage calculator works out percentage-based math quickly and accurately. Percentages come up constantly in everyday life — calculating a discount, working out a tip, figuring a tax amount, finding what fraction one number is of another, or seeing how much something increased or decreased. Rather than remembering the formulas and doing the arithmetic by hand, a percentage calculator gives you the answer instantly across several common types of percentage problems."
        whatIsExtended="There isn't just one percentage calculation — there are several distinct types, and people often mix them up. What is X% of Y? X is what percent of Y? What is the percentage increase or decrease from one number to another? The ConvertDox Percentage Calculator handles each of these as a separate, clearly-labeled calculation, so you pick the question you're actually asking and get the right answer. Everything is computed in your browser, instantly, with no signup."
        howToUse={[
          'Choose the type of percentage calculation you need from the options',
          'Enter your numbers into the relevant fields',
          'The result is calculated automatically as you type',
          'Read the answer, along with the formula used where shown',
          'Adjust the numbers to try different scenarios instantly',
          'No signup needed — the calculation happens right in your browser',
        ]}
        useCases={[
          { title: 'Shopping Discounts', description: 'Work out the sale price when something is 20%, 30%, or 50% off so you know what you\'ll actually pay.' },
          { title: 'Tips at Restaurants', description: 'Calculate a 15%, 18%, or 20% tip on a bill quickly and accurately.' },
          { title: 'Tax Amounts', description: 'Find the tax portion of a price, or the total including a given tax percentage.' },
          { title: 'Grades and Scores', description: 'Convert a score like 42 out of 50 into a percentage to understand a result.' },
          { title: 'Price Changes', description: 'Calculate the percentage increase or decrease between an old price and a new one.' },
          { title: 'Statistics and Reports', description: 'Express one figure as a percentage of another for reports, budgets, or comparisons.' },
        ]}
        tips={[
          'Be clear which question you\'re asking — "X% of Y" is different from "X is what percent of Y"',
          'For discounts, "30% off" means you pay 70% of the original price',
          'Percentage increase and decrease use the original value as the baseline',
          'To add a percentage (like tax), multiply by 1 plus the rate as a decimal — e.g. 1.08 for 8%',
          'Double-check whether a figure is a percentage or a percentage-point change — they\'re not the same',
          'Use the tool to sanity-check mental math before making a decision',
        ]}
        faqs={[
          { question: 'Is the percentage calculator free?', answer: 'Yes, completely free with no signup and no limits on how often you use it.' },
          { question: 'How do I calculate a percentage of a number?', answer: 'Multiply the number by the percentage expressed as a decimal. For example, 20% of 150 is 150 × 0.20 = 30. The calculator does this for you.' },
          { question: 'How do I work out percentage increase or decrease?', answer: 'Subtract the old value from the new value, divide by the old value, and multiply by 100. A positive result is an increase, a negative one is a decrease. The tool calculates it automatically.' },
          { question: 'What does "X is what percent of Y" mean?', answer: 'It finds what proportion one number is of another. For example, 30 is what percent of 150? The answer is 20%. Divide X by Y and multiply by 100.' },
          { question: 'Is my data stored?', answer: 'No. All calculations happen in your browser. Nothing you enter is uploaded or stored.' },
          { question: 'Can it handle discounts and tips?', answer: 'Yes. Use the "percent of" calculation for tips and the discount logic for sale prices — both are common percentage problems the tool covers.' },
        ]}
        relatedTools={[
          { name: 'Discount Calculator', slug: 'discount-calculator', description: 'Find sale prices and savings' },
          { name: 'Tip Calculator', slug: 'tip-calculator', description: 'Calculate tips and split bills' },
          { name: 'Tax Calculator', slug: 'tax-calculator', description: 'Estimate tax amounts' },
          { name: 'Unit Converter', slug: 'unit-converter', description: 'Convert between units of measure' },
        ]}
      />
    </div>
  )
}

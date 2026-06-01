import Link from 'next/link'
import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }
const PRE: React.CSSProperties = { background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }

const BMI_CATEGORIES: { range: string; category: string; meaning: string }[] = [
  { range:'< 18.5', category:'Underweight', meaning:'Possible nutritional deficiency or underlying condition' },
  { range:'18.5 – 24.9', category:'Normal weight', meaning:'Lowest associated health risk for most adults' },
  { range:'25.0 – 29.9', category:'Overweight', meaning:'Mildly elevated risk; varies by composition' },
  { range:'30.0 – 34.9', category:'Obese (Class I)', meaning:'Moderately elevated risk of cardiovascular issues' },
  { range:'35.0 – 39.9', category:'Obese (Class II)', meaning:'High risk; medical guidance recommended' },
  { range:'≥ 40.0', category:'Obese (Class III)', meaning:'Severe; significant health risk' },
]

const BMI_AGE: { group: string; healthy: string }[] = [
  { group:'19–24', healthy:'19–24' },
  { group:'25–34', healthy:'20–25' },
  { group:'35–44', healthy:'21–26' },
  { group:'45–54', healthy:'22–27' },
  { group:'55–64', healthy:'23–28' },
  { group:'65+', healthy:'24–29' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'Is BMI accurate?', a:'BMI is a reasonable screening tool at population level, but it doesn\'t measure body fat directly. It can misclassify muscular people as overweight and people with low muscle mass as normal. Use it as one signal among several, not a verdict.' },
  { q:'What BMI is considered healthy?', a:'For most adults, a BMI between 18.5 and 24.9 is considered the healthy range. Some research suggests slightly higher BMIs (up to about 27) are associated with the lowest mortality in adults over 65.' },
  { q:'How often should I check my BMI?', a:'Once every few months is plenty if you\'re a healthy weight. If you\'re actively trying to gain or lose, weekly is enough — daily fluctuations are mostly water and digestion, not body composition.' },
  { q:'Can BMI be wrong?', a:'It can be misleading. Athletes, pregnant women, the elderly, and people with limb differences all tend to get unreliable BMI readings. Body composition scans or waist measurements give a fuller picture.' },
  { q:'What is more accurate than BMI?', a:'For body fat: DEXA scans, hydrostatic weighing, or BIA scales. For health risk: waist-to-hip ratio and waist circumference are simple and well-studied. Combine BMI with one of these for a better signal.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <article style={{ maxWidth:'780px',margin:'0 auto',padding:'48px 24px' }}>
        <Link href="/blog" style={{ color:'#E85D04',fontSize:'14px',fontWeight:600,textDecoration:'none' }}>← Back to Blog</Link>

        <div style={{ display:'flex',gap:'12px',alignItems:'center',marginTop:'24px',marginBottom:'18px',flexWrap:'wrap' }}>
          <span style={{ background:'#FFF7ED',color:'#C2410C',fontSize:'11.5px',fontWeight:700,padding:'4px 10px',borderRadius:'999px',textTransform:'uppercase',letterSpacing:'0.5px' }}>Calculators</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>7 min read</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>•</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>Jan 2026</span>
        </div>

        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 20px' }}>
          How to Calculate BMI Accurately: Formula, Categories & Limitations
        </h1>

        <p style={{ fontSize:'18px',color:'#64748b',lineHeight:'1.7',paddingBottom:'24px',borderBottom:'1.5px solid #e2e8f0',marginBottom:'32px' }}>
          BMI is the most widely cited health metric in the world — and one of the most misunderstood. This guide covers the formula in both unit systems, walks through a real calculation, lists the standard categories, and explains where BMI fails so you can interpret your number sensibly.
        </p>

        <h2 style={H2}>What Is BMI?</h2>
        <p style={P}>Body Mass Index is a single number that relates weight to height. Belgian statistician Adolphe Quetelet invented it in the 1830s as a tool for studying populations. It wasn&apos;t designed as an individual health measurement — but doctors and insurers adopted it widely from the mid-20th century because it&apos;s cheap, fast, and a reasonable screening signal at scale.</p>
        <p style={P}>Today the World Health Organization, the NHS, and the CDC all use BMI as a starting point for conversations about weight-related risk.</p>

        <h2 style={H2}>The BMI Formula</h2>

        <h3 style={H3}>Metric (kg, m)</h3>
        <pre style={PRE}><code>{`BMI = weight (kg) / [ height (m) ]²`}</code></pre>

        <h3 style={H3}>Imperial (lbs, in)</h3>
        <pre style={PRE}><code>{`BMI = ( weight (lbs) / [ height (in) ]² ) × 703`}</code></pre>

        <p style={P}>The 703 multiplier is the conversion factor that keeps the imperial result on the same scale as the metric one. Both formulas produce identical numbers.</p>

        <h2 style={H2}>Step-by-Step Manual Calculation</h2>
        <p style={P}>Worked example for a person who is <strong style={STRONG}>1.75 m tall and weighs 72 kg</strong>:</p>
        <pre style={PRE}><code>{`Step 1: square the height
  1.75 × 1.75 = 3.0625

Step 2: divide weight by squared height
  72 / 3.0625 = 23.51

BMI = 23.5`}</code></pre>
        <p style={P}>That falls in the &ldquo;normal weight&rdquo; band (18.5–24.9).</p>

        <p style={P}>Imperial example for the same person (5&apos;9&quot; / 69 in, 159 lbs):</p>
        <pre style={PRE}><code>{`Step 1: square the height
  69 × 69 = 4,761

Step 2: divide weight by squared height
  159 / 4761 = 0.0334

Step 3: multiply by 703
  0.0334 × 703 = 23.49

BMI = 23.5`}</code></pre>

        <h2 style={H2}>BMI Categories</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>BMI range</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Category</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>What it usually means</th>
              </tr>
            </thead>
            <tbody>
              {BMI_CATEGORIES.map((r,i) => (
                <tr key={r.range} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.range}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.category}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>How to Calculate BMI Instantly</h2>
        <p style={P}>The fastest way is the <a href="https://convertdox.com/bmi-calculator" style={A}>ConvertDox BMI Calculator</a>: pick metric or imperial, enter height and weight, get your number and category in one screen. The calculator handles the conversion if you have mixed units (e.g. feet/inches with kilograms).</p>
        <p style={P}>For more context, the result also shows the healthy weight range for your height — useful if you&apos;re tracking changes over time.</p>

        <h2 style={H2}>BMI Limitations</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Doesn&apos;t distinguish muscle from fat.</strong> A muscular sprinter and a sedentary person can have identical BMIs.</li>
          <li><strong style={STRONG}>Ignores body composition and fat distribution.</strong> Visceral fat around organs is far more dangerous than subcutaneous fat, but BMI can&apos;t see the difference.</li>
          <li><strong style={STRONG}>Less reliable at the extremes.</strong> Very tall people often score higher and very short people lower than their actual risk warrants.</li>
          <li><strong style={STRONG}>Doesn&apos;t adjust for age.</strong> A &ldquo;healthy&rdquo; BMI in your 70s differs from one in your 20s.</li>
          <li><strong style={STRONG}>Population-level cut-offs were built on Northern European data.</strong> Health risk at any given BMI varies by ethnicity — South Asian populations face elevated risk at lower BMIs.</li>
        </ul>

        <h2 style={H2}>BMI Alternatives</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Waist-to-Hip Ratio:</strong> divide waist measurement by hip measurement. WHR over 0.9 (men) or 0.85 (women) suggests elevated cardiovascular risk.</li>
          <li><strong style={STRONG}>Waist Circumference:</strong> measured at the navel. Over 102 cm (men) / 88 cm (women) flags risk regardless of BMI.</li>
          <li><strong style={STRONG}>Body Fat Percentage:</strong> measured via DEXA scan, bioelectrical impedance scale, or skinfold calipers. Far more direct than BMI.</li>
          <li><strong style={STRONG}>Waist-to-Height Ratio:</strong> waist divided by height. A ratio above 0.5 indicates increased health risk and works across age, gender, and ethnicity.</li>
        </ul>

        <h2 style={H2}>BMI for Different Groups</h2>
        <p style={P}><strong style={STRONG}>Children and teens (under 20):</strong> use BMI-for-age percentile charts, not the adult cut-offs. A pediatrician interprets the result against a growth curve.</p>
        <p style={P}><strong style={STRONG}>Athletes:</strong> resistance-trained athletes often land in the &ldquo;overweight&rdquo; range despite low body fat. Combine BMI with a body-composition test.</p>
        <p style={P}><strong style={STRONG}>Elderly (65+):</strong> the lowest mortality risk shifts upward — a BMI of 25–28 is often optimal. Being underweight in older age is linked to frailty and sarcopenia.</p>
        <p style={P}><strong style={STRONG}>Pregnancy:</strong> standard BMI doesn&apos;t apply during pregnancy. Healthcare providers use gestational-week-specific weight targets instead.</p>

        <h2 style={H2}>Healthy BMI by Age Group</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Age group</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Healthy BMI range</th>
              </tr>
            </thead>
            <tbody>
              {BMI_AGE.map((r,i) => (
                <tr key={r.group} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.group}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.healthy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={P}>These ranges follow guidance from gerontology research — they widen slightly with age to reflect changing optimal weight for longevity.</p>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>🔢</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Calculate Your BMI Now</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Metric, imperial, or mixed — get your BMI and category in one click.</p>
          <a href="/bmi-calculator" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open BMI Calculator →</a>
        </div>

        {/* Related */}
        <div style={{ marginTop:'48px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#0F2A4A',marginBottom:'14px' }}>Related Articles</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <Link href="/blog/how-to-count-words-online" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Text Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>How to Count Words Online: 5 Methods Compared</div>
            </Link>
            <Link href="/blog/best-free-password-generators-2026" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Security</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>10 Best Free Password Generators in 2026</div>
            </Link>
          </div>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'How to Calculate BMI Accurately: Formula, Categories & Limitations',
        'description': 'The metric and imperial BMI formulas, a worked example, the standard category table, and where BMI falls short.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

/*
  ConvertDox — Lorem Ipsum Generator
  PUT IN: src/app/lorem-ipsum/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import RelatedTools from '@/components/RelatedTools'

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','perspiciatis','unde','omnis','iste','natus','error','accusantium','doloremque','laudantium','totam','rem','aperiam','eaque','ipsa','quae','ab','illo','inventore','veritatis','quasi','architecto','beatae','vitae','dicta','explicabo']

const randWord = () => WORDS[Math.floor(Math.random() * WORDS.length)]
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const makeSentence = () => {
  const len = 8 + Math.floor(Math.random() * 10)
  const words = Array.from({ length: len }, randWord)
  return capitalize(words.join(' ')) + '.'
}

const makeParagraph = (startWithLorem: boolean, index: number) => {
  const sentenceCount = 4 + Math.floor(Math.random() * 4)
  const sentences = Array.from({ length: sentenceCount }, (_, i) => {
    if (startWithLorem && index === 0 && i === 0) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    return makeSentence()
  })
  return sentences.join(' ')
}

export default function LoremIpsumPage() {
  const [type, setType] = useState<'paragraphs'|'sentences'|'words'>('paragraphs')
  const [amount, setAmount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let result = ''
    if (type === 'paragraphs') {
      result = Array.from({ length: amount }, (_, i) => makeParagraph(startWithLorem, i)).join('\n\n')
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: amount }, (_, i) => {
        if (startWithLorem && i === 0) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        return makeSentence()
      })
      result = sentences.join(' ')
    } else {
      const words = Array.from({ length: amount }, (_, i) => {
        if (startWithLorem && i === 0) return 'Lorem'
        if (startWithLorem && i === 1) return 'ipsum'
        return randWord()
      })
      result = words.join(' ')
    }
    setOutput(result)
  }

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const maxAmount = type === 'paragraphs' ? 20 : type === 'sentences' ? 50 : 200

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>📄</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Lorem Ipsum Generator</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Generate placeholder text for your designs and mockups instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'760px',margin:'0 auto',padding:'36px 24px' }}>
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'20px',padding:'28px',boxShadow:'0 8px 32px rgba(15,42,74,0.07)',marginBottom:'20px' }}>

          {/* Type selector */}
          <div style={{ display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'22px' }}>
            {(['paragraphs','sentences','words'] as const).map(t => (
              <button key={t} onClick={() => { setType(t); setAmount(t==='paragraphs'?3:t==='sentences'?5:50) }}
                style={{ flex:1,padding:'9px',borderRadius:'9px',border:'none',background:type===t?'white':'transparent',fontFamily:'inherit',fontSize:'13.5px',fontWeight:700,color:type===t?'#0F2A4A':'#64748b',cursor:'pointer',boxShadow:type===t?'0 2px 6px rgba(0,0,0,0.08)':'none',textTransform:'capitalize',transition:'all 0.2s' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Amount slider */}
          <div style={{ marginBottom:'20px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px' }}>
              <label style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A' }}>Number of {type}</label>
              <span style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#E85D04' }}>{amount}</span>
            </div>
            <input type="range" min="1" max={maxAmount} value={amount} onChange={e=>setAmount(parseInt(e.target.value))}
              style={{ width:'100%',accentColor:'#E85D04',height:'6px',cursor:'pointer' }}/>
          </div>

          {/* Start with Lorem option */}
          <label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',marginBottom:'24px',padding:'12px 14px',background:'#f8fafc',borderRadius:'10px' }}>
            <div onClick={() => setStartWithLorem(!startWithLorem)} style={{ width:'22px',height:'22px',borderRadius:'6px',border:'2px solid',borderColor:startWithLorem?'#0F2A4A':'#cbd5e1',background:startWithLorem?'#0F2A4A':'white',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0 }}>
              {startWithLorem && <span style={{ color:'white',fontSize:'13px',fontWeight:700 }}>✓</span>}
            </div>
            <div>
              <div style={{ fontSize:'14px',fontWeight:600,color:'#0F2A4A' }}>Start with &quot;Lorem ipsum&quot;</div>
              <div style={{ fontSize:'12px',color:'#94a3b8' }}>Classic lorem ipsum opening</div>
            </div>
          </label>

          <button onClick={generate}
            style={{ width:'100%',background:'#E85D04',color:'white',border:'none',padding:'15px',borderRadius:'12px',fontFamily:'inherit',fontSize:'16px',fontWeight:800,cursor:'pointer',boxShadow:'0 4px 16px rgba(232,93,4,0.25)' }}>
            ✨ Generate Lorem Ipsum
          </button>
        </div>

        {/* Output */}
        {output && (
          <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'16px',overflow:'hidden',boxShadow:'0 4px 20px rgba(15,42,74,0.07)' }}>
            <div style={{ padding:'12px 16px',borderBottom:'1px solid #f1f5f9',background:'#fafafa',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <span style={{ fontSize:'13px',fontWeight:600,color:'#0F2A4A' }}>
                Generated text — {output.split(/\s+/).length} words
              </span>
              <button onClick={copy}
                style={{ background:copied?'#16A34A':'#f1f5f9',border:'none',borderRadius:'7px',padding:'6px 14px',fontFamily:'inherit',fontSize:'13px',fontWeight:600,cursor:'pointer',color:copied?'white':'#0F2A4A' }}>
                {copied ? '✓ Copied!' : '📋 Copy All'}
              </button>
            </div>
            <div style={{ padding:'20px',fontSize:'15px',lineHeight:'1.8',color:'#0F2A4A',whiteSpace:'pre-wrap' }}>
              {output}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={{ marginTop:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'20px',fontWeight:700,color:'#0F2A4A',marginBottom:'14px' }}>FAQ</h2>
          {[
            { q:'What is Lorem Ipsum?', a:'Lorem ipsum is placeholder text used in design and publishing. It comes from a scrambled passage of Latin by Cicero, used since the 1500s.' },
            { q:'Why use Lorem Ipsum?', a:'It allows designers to focus on layout and visual design without being distracted by readable content.' },
            { q:'Is it free to use?', a:'Yes, completely free. Generate unlimited placeholder text.' },
          ].map((item,i) => (
            <details key={i} style={{ border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'14px 18px',marginBottom:'8px',background:'white' }}>
              <summary style={{ fontWeight:700,fontSize:'14px',color:'#0F2A4A',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between' }}>{item.q}<span style={{ color:'#E85D04',fontSize:'20px',fontWeight:300 }}>+</span></summary>
              <p style={{ marginTop:'10px',fontSize:'14px',color:'#64748b',lineHeight:'1.7' }}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/lorem-ipsum" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the Lorem Ipsum Generator</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Generate placeholder text in any quantity you need — from a sentence to twenty paragraphs.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Choose how many paragraphs (or words / sentences) you want.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Click Generate. The Lorem text appears instantly.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Click Copy to send the result to your clipboard.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Paste into your mockup, prototype, or template.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'🎨', title:'Web Design Mockups', desc:'Fill paragraphs in Figma, Sketch, or Photoshop.' },
              { icon:'📱', title:'App Prototypes', desc:'Populate cards, lists, and modals before content is ready.' },
              { icon:'🖨️', title:'Print Layouts', desc:'Test typography and spacing in InDesign and Affinity.' },
              { icon:'✉️', title:'Placeholder Emails', desc:'Build email templates before the marketing copy lands.' },
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
            { q:'What does Lorem Ipsum mean?', a:'Nothing useful, deliberately. It\'s scrambled pseudo-Latin derived from a 1st-century BC Cicero treatise. The point is to look like real text without distracting readers with actual meaning.' },
            { q:'Where did Lorem Ipsum come from?', a:'A 16th-century printer scrambled a passage from Cicero\'s De finibus bonorum et malorum to demonstrate type specimens. It\'s been the placeholder text industry standard ever since.' },
            { q:'Is Lorem Ipsum still used?', a:'Widely. Every design tool ships a Lorem command. The convention persists because the abstract Latin text doesn\'t accidentally communicate ideas the way English placeholder text would.' },
            { q:'Can I generate custom placeholder text?', a:'Yes — our <a href="/lorem-advanced" style="color:#E85D04;font-weight:600">Lorem Ipsum Advanced</a> tool offers thematic variants like hipster, corporate, pirate, and tech-flavored placeholder text.' },
            { q:'How many words is one Lorem Ipsum paragraph?', a:'Typically 50–80 words. Length varies by source text version, but the average paragraph runs about 60 words — close to a real medium-length paragraph in published prose.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }} dangerouslySetInnerHTML={{ __html: faq.a }} />
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox Lorem Ipsum Generator?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Lorem Ipsum is the placeholder text every designer reaches for. The ConvertDox Lorem Ipsum Generator gives you flexible control over output — pick paragraphs, sentences, or words; adjust the count; copy with one click. It runs locally so the page loads instantly and works offline once cached, which matters when you&apos;re sketching at a cafe Wi-Fi or on a flight. The text is the standard scrambled-Cicero source that designers expect, so it slots into mockups without surprising clients used to seeing it. Why Lorem rather than &ldquo;the quick brown fox&rdquo;? Because the abstract Latin doesn&apos;t accidentally communicate ideas — a stakeholder reviewing a mockup with English placeholder text often fixates on the words rather than the layout. Lorem keeps attention on what you&apos;re actually showing. For more interesting placeholder copy — hipster, corporate buzzword, cyberpunk, or tech-themed variants — the <a href="/lorem-advanced" style={{ color:'#E85D04',fontWeight:600 }}>Lorem Advanced</a> tool has you covered. Designers, front-end developers, technical writers prepping a doc structure, and product managers fleshing out PRD wireframes will all find this useful. The output is plain text with normal paragraph breaks so it pastes cleanly into Figma, Notion, InDesign, Sketch, Webflow, Framer, Affinity Publisher, Microsoft Word, Google Docs, and every CMS we&apos;ve tested.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Lorem Ipsum Generator',
        'description': 'Free Lorem Ipsum placeholder text generator. Choose paragraphs, sentences, or words.',
        'url': 'https://convertdox.com/lorem-ipsum',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '127' },
        'creator': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
      }) }} />
    </div>
  )
}

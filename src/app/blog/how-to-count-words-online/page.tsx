import Link from 'next/link'
import NavBar from '@/components/NavBar'

const H2: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginTop:'40px',marginBottom:'14px',letterSpacing:'-0.3px' }
const H3: React.CSSProperties = { fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'19px',fontWeight:700,color:'#0F2A4A',marginTop:'24px',marginBottom:'10px' }
const P: React.CSSProperties = { fontSize:'16px',color:'#334155',lineHeight:'1.75',marginBottom:'14px' }
const STRONG: React.CSSProperties = { color:'#0F2A4A',fontWeight:700 }
const A: React.CSSProperties = { color:'#E85D04',fontWeight:600,textDecoration:'underline' }
const UL: React.CSSProperties = { paddingLeft:'24px',marginBottom:'16px',color:'#334155',fontSize:'16px',lineHeight:'1.8' }

const TABLE_ROWS: { method: string; speed: string; accuracy: string; extras: string; free: string }[] = [
  { method:'Online Word Counter', speed:'Instant', accuracy:'Excellent', extras:'Reading time, density, sentences', free:'Yes' },
  { method:'Microsoft Word', speed:'Fast', accuracy:'Excellent', extras:'Characters, paragraphs, pages', free:'Paid' },
  { method:'Google Docs', speed:'Fast', accuracy:'Excellent', extras:'Live counting, no spaces option', free:'Yes' },
  { method:'Command Line (wc)', speed:'Instant', accuracy:'Good', extras:'Scriptable, bulk files', free:'Yes' },
  { method:'AI Writing Tools', speed:'Slow', accuracy:'Variable', extras:'Suggestions, edits', free:'Limited' },
]

const FAQ: { q: string; a: string }[] = [
  { q:'Does the ConvertDox Word Counter count punctuation?', a:'Yes — the character counter includes punctuation, spaces, and special characters. The word counter treats anything separated by whitespace as a word, so hyphenated words count as one and "1,000" counts as a single word.' },
  { q:'What is the word limit for Twitter/X?', a:'X (formerly Twitter) uses a character limit, not a word limit. Standard accounts get 280 characters per post; X Premium subscribers can post up to 25,000 characters.' },
  { q:'How many words is a 5-minute speech?', a:'At a comfortable speaking pace of around 130 words per minute, a 5-minute speech is roughly 650 words. A fast speaker may hit 800 words, while a slower, more deliberate delivery lands closer to 550.' },
  { q:'Does Google Docs count words automatically?', a:'Google Docs shows a live word count if you turn it on. Go to Tools → Word count and tick "Display word count while typing." Otherwise press Ctrl+Shift+C (Cmd+Shift+C on Mac) any time.' },
  { q:'What is a good word count for a blog post?', a:'Posts that rank well in 2026 tend to land between 1,200 and 2,200 words for evergreen guides, and 600–900 words for news or commentary. The best length is the length that fully answers the search intent — no padding.' },
]

export default function Page() {
  return (
    <div style={{ minHeight:'100vh',background:'#ffffff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <article style={{ maxWidth:'780px',margin:'0 auto',padding:'48px 24px' }}>
        <Link href="/blog" style={{ color:'#E85D04',fontSize:'14px',fontWeight:600,textDecoration:'none' }}>← Back to Blog</Link>

        <div style={{ display:'flex',gap:'12px',alignItems:'center',marginTop:'24px',marginBottom:'18px',flexWrap:'wrap' }}>
          <span style={{ background:'#FFF7ED',color:'#C2410C',fontSize:'11.5px',fontWeight:700,padding:'4px 10px',borderRadius:'999px',textTransform:'uppercase',letterSpacing:'0.5px' }}>Text Tools</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>6 min read</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>•</span>
          <span style={{ fontSize:'13px',color:'#94a3b8' }}>Jan 2026</span>
        </div>

        <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(28px,4vw,42px)',fontWeight:800,color:'#0F2A4A',lineHeight:1.2,letterSpacing:'-0.5px',margin:'0 0 20px' }}>
          How to Count Words Online: 5 Methods Compared (2026 Guide)
        </h1>

        <p style={{ fontSize:'18px',color:'#64748b',lineHeight:'1.7',paddingBottom:'24px',borderBottom:'1.5px solid #e2e8f0',marginBottom:'32px' }}>
          Whether you&apos;re hitting an essay limit, optimizing a blog post for search, or squeezing a caption under 280 characters, you need an accurate word count fast. Here are the five most reliable ways to count words online — and which one to pick for each situation.
        </p>

        <h2 style={H2}>Why Word Count Matters</h2>
        <p style={P}>Word count isn&apos;t just an academic curiosity — it shapes how your writing performs across almost every channel.</p>
        <ul style={UL}>
          <li><strong style={STRONG}>Writers and journalists</strong> work to strict word budgets. A magazine feature might run 1,500 words; a blog post lands somewhere between 800 and 2,500.</li>
          <li><strong style={STRONG}>SEO professionals</strong> use word count as a rough proxy for depth. Pages that rank for competitive queries tend to be longer because they cover the topic more completely.</li>
          <li><strong style={STRONG}>Students</strong> face hard upper and lower limits — go 10% under or over an essay limit and you can lose marks.</li>
          <li><strong style={STRONG}>Social media managers</strong> live with character limits: 280 on X, 2,200 in an Instagram caption, 3,000 on LinkedIn.</li>
        </ul>

        <h2 style={H2}>Method 1: Online Word Counter Tools</h2>
        <p style={P}>The fastest option is a dedicated browser tool. Paste your text and you get word count, character count, sentences, paragraphs, and reading time in a single screen.</p>
        <p style={P}>The <a href="https://convertdox.com/word-counter" style={A}>ConvertDox Word Counter</a> is a good example: it runs entirely in your browser, never uploads your text anywhere, and updates live as you type. It also surfaces extras like longest word, average word length, unique words, and a word-density table — the kind of detail you&apos;d normally need a separate tool for.</p>
        <p style={P}><strong style={STRONG}>Best for:</strong> quick checks, social posts, blog drafts, and any time you need more than a raw number. Bookmark a good word counter and you&apos;ll reach for it weekly.</p>

        <h3 style={H3}>Pros</h3>
        <ul style={UL}>
          <li>Instant, live updates</li>
          <li>Works on any device with a browser</li>
          <li>Often includes extras (reading time, density)</li>
          <li>Nothing to install</li>
        </ul>

        <h3 style={H3}>Cons</h3>
        <ul style={UL}>
          <li>Requires an internet connection (unless cached as a PWA)</li>
          <li>Quality varies — some sites bury the count under ads</li>
        </ul>

        <h2 style={H2}>Method 2: Microsoft Word</h2>
        <p style={P}>If your document already lives in Word, you don&apos;t need a separate tool. The status bar at the bottom of the window shows a live word count by default. Click it to see characters (with and without spaces), paragraphs, and lines.</p>
        <p style={P}><strong style={STRONG}>How to do it:</strong> Open your document → look at the bottom-left of the status bar → click the &ldquo;Words&rdquo; field for the full breakdown. To count a selection only, highlight the text first.</p>
        <p style={P}><strong style={STRONG}>Limitation:</strong> Word counts footnotes, headers, and text boxes by default. If your assignment excludes those, you need to tick the &ldquo;Include footnotes and endnotes&rdquo; box manually in the Word Count dialog.</p>

        <h2 style={H2}>Method 3: Google Docs</h2>
        <p style={P}>Google Docs hides word count by default but it&apos;s one click away.</p>
        <p style={P}><strong style={STRONG}>How to do it:</strong> Tools → Word count, or press <strong style={STRONG}>Ctrl+Shift+C</strong> (Windows) / <strong style={STRONG}>Cmd+Shift+C</strong> (Mac). Tick &ldquo;Display word count while typing&rdquo; to keep it on screen.</p>
        <p style={P}><strong style={STRONG}>Tip:</strong> select a paragraph before opening the dialog to see word counts for both the selection and the whole document.</p>

        <h2 style={H2}>Method 4: Command Line (for Developers)</h2>
        <p style={P}>If you&apos;re a developer or sysadmin, the Unix <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>wc</code> command is the fastest tool of all. It works on Linux, macOS, and Windows (via WSL or Git Bash).</p>
        <pre style={{ background:'#0F2A4A',color:'#e2e8f0',padding:'16px 20px',borderRadius:'10px',fontSize:'14px',overflowX:'auto',lineHeight:'1.7',marginBottom:'16px' }}><code>{`# Count words in a single file
wc -w article.txt

# Count words across many files
wc -w *.md

# Count lines, words, and characters
wc article.txt`}</code></pre>
        <p style={P}>Output looks like <code style={{ background:'#f1f5f9',padding:'2px 6px',borderRadius:'4px',fontFamily:'monospace',fontSize:'14px' }}>423 article.txt</code> — that&apos;s 423 words. Perfect for scripting, CI checks, or running over a folder of drafts.</p>

        <h2 style={H2}>Method 5: AI Writing Tools (ChatGPT, Claude, etc.)</h2>
        <p style={P}>Modern chat assistants will count words on request — useful when you&apos;re already mid-conversation with one. The trade-off is reliability: AI tools sometimes miscount short passages and add a confident-but-wrong number.</p>
        <p style={P}><strong style={STRONG}>How to do it:</strong> paste the text and ask &ldquo;How many words is this?&rdquo; You&apos;ll get an answer, but no live counting as you edit.</p>
        <p style={P}><strong style={STRONG}>Best for:</strong> casual checks during an editing chat. Not recommended when accuracy matters.</p>

        <h2 style={H2}>Comparison Table</h2>
        <div style={{ overflowX:'auto',marginBottom:'24px' }}>
          <table style={{ width:'100%',borderCollapse:'collapse',fontSize:'14px' }}>
            <thead>
              <tr style={{ background:'#0F2A4A' }}>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Method</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Speed</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Accuracy</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Extra stats</th>
                <th style={{ color:'white',padding:'10px 14px',textAlign:'left' }}>Free?</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((r,i) => (
                <tr key={r.method} style={{ background: i%2===0?'#f8fafc':'white',borderBottom:'1px solid #e2e8f0' }}>
                  <td style={{ padding:'10px 14px',color:'#0F2A4A',fontWeight:600 }}>{r.method}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.speed}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.accuracy}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.extras}</td>
                  <td style={{ padding:'10px 14px',color:'#334155' }}>{r.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={H2}>Pro Tips for Writers</h2>
        <ul style={UL}>
          <li><strong style={STRONG}>Reading time:</strong> divide word count by 200 for a comfortable adult reading speed. A 1,000-word post takes about 5 minutes to read.</li>
          <li><strong style={STRONG}>Speaking time:</strong> use 130 words per minute. A 10-minute keynote should be around 1,300 words of script.</li>
          <li><strong style={STRONG}>Keyword density:</strong> aim for 0.5–1.5% on your primary keyword. Above 2% looks spammy to both readers and search engines.</li>
          <li><strong style={STRONG}>Edit ruthlessly:</strong> if you can cut 10% without losing meaning, the piece will read better. Use <a href="https://convertdox.com/word-counter" style={A}>the word counter</a> as a target, not a goal.</li>
          <li><strong style={STRONG}>Track over time:</strong> writers who hit a daily word target — even a small one — finish more projects. 500 words a day is a book a year.</li>
        </ul>

        <h2 style={H2}>Frequently Asked Questions</h2>
        {FAQ.map(f => (
          <details key={f.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
            <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{f.q}</summary>
            <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{f.a}</p>
          </details>
        ))}

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)',border:'1.5px solid #FED7AA',borderRadius:'16px',padding:'28px',marginTop:'40px',textAlign:'center' }}>
          <div style={{ fontSize:'32px',marginBottom:'8px' }}>📝</div>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'22px',fontWeight:800,color:'#0F2A4A',margin:'0 0 8px' }}>Try the ConvertDox Word Counter</h3>
          <p style={{ fontSize:'15px',color:'#64748b',margin:'0 0 18px' }}>Free, instant, browser-only — with reading time and word density built in.</p>
          <a href="/word-counter" style={{ display:'inline-block',background:'#E85D04',color:'white',padding:'12px 26px',borderRadius:'10px',fontSize:'15px',fontWeight:700,textDecoration:'none' }}>Open Word Counter →</a>
        </div>

        {/* Related */}
        <div style={{ marginTop:'48px' }}>
          <h3 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'18px',fontWeight:800,color:'#0F2A4A',marginBottom:'14px' }}>Related Articles</h3>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
            <Link href="/blog/what-is-json-formatter" style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'12px',padding:'16px',textDecoration:'none' }}>
              <div style={{ fontSize:'12px',color:'#E85D04',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px' }}>Developer Tools</div>
              <div style={{ fontSize:'14px',fontWeight:700,color:'#0F2A4A',lineHeight:1.4 }}>What Is a JSON Formatter and Why Every Developer Needs One</div>
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
        'headline': 'How to Count Words Online: 5 Methods Compared (2026 Guide)',
        'description': 'Five reliable ways to count words online — dedicated tools, Word, Google Docs, the command line, and AI chat.',
        'image': 'https://convertdox.com/og-image.png',
        'datePublished': '2026-01-15',
        'dateModified': '2026-01-15',
        'author': { '@type': 'Organization', 'name': 'ConvertDox', 'url': 'https://convertdox.com' },
        'publisher': { '@type': 'Organization', 'name': 'ConvertDox', 'logo': { '@type': 'ImageObject', 'url': 'https://convertdox.com/og-image.png' } },
      }) }} />
    </div>
  )
}

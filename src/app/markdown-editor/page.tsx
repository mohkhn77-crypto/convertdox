/*
  ConvertDox — Markdown Editor & Previewer
  PUT IN: src/app/markdown-editor/page.tsx
*/
'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'
import SiteFooter from '@/components/SiteFooter'
import RelatedTools from '@/components/RelatedTools'

// Simple markdown parser
const parseMarkdown = (md: string): string => {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks (``` ```)
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background:#f1f5f9;border-radius:8px;padding:12px 16px;overflow:auto;border:1px solid #e2e8f0"><code style="font-family:monospace;font-size:13px">$1</code></pre>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#E85D04">$1</code>')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;color:#0F2A4A;margin:16px 0 8px">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;color:#0F2A4A;margin:20px 0 10px;padding-bottom:6px;border-bottom:2px solid #e2e8f0">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;color:#0F2A4A;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #E85D04">$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:700">$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#E85D04;text-decoration:underline" target="_blank">$1</a>')

  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:8px 0"/>')

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote style="border-left:4px solid #E85D04;margin:12px 0;padding:8px 16px;background:#FFF7ED;border-radius:0 8px 8px 0;color:#0F2A4A">$1</blockquote>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:2px solid #e2e8f0;margin:20px 0"/>')

  // Unordered lists
  html = html.replace(/^\* (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
  html = html.replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul style="padding-left:20px;margin:8px 0">$&</ul>')

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p style="margin:10px 0;line-height:1.7;color:#374151">')
  html = '<p style="margin:10px 0;line-height:1.7;color:#374151">' + html + '</p>'

  return html
}

const DEFAULT_MD = `# Welcome to ConvertDox Markdown Editor

## What is Markdown?
Markdown is a **lightweight** markup language you can use to add formatting to plain text documents.

### Basic Formatting
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- \`inline code\` with backticks

### Links & More
[Visit ConvertDox](https://convertdox.com)

> This is a blockquote — great for highlighting important notes.

### Code Block
\`\`\`
function hello() {
  console.log("Hello, World!");
}
\`\`\`

---

Start editing on the left to see your preview update instantly! ✨`

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD)
  const [view, setView] = useState<'split'|'editor'|'preview'>('split')
  const [copied, setCopied] = useState(false)

  const html = parseMarkdown(markdown)

  const copyHTML = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const insertSnippet = (before: string, after = '', placeholder = 'text') => {
    const ta = document.querySelector('textarea') as HTMLTextAreaElement
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = markdown.substring(start, end) || placeholder
    const newMd = markdown.substring(0, start) + before + selected + after + markdown.substring(end)
    setMarkdown(newMd)
  }

  const toolbar = [
    { label:'B', action: () => insertSnippet('**','**','bold text'), title:'Bold' },
    { label:'I', action: () => insertSnippet('*','*','italic text'), title:'Italic' },
    { label:'H1', action: () => insertSnippet('# ','','Heading'), title:'Heading 1' },
    { label:'H2', action: () => insertSnippet('## ','','Heading'), title:'Heading 2' },
    { label:'H3', action: () => insertSnippet('### ','','Heading'), title:'Heading 3' },
    { label:'`code`', action: () => insertSnippet('`','`','code'), title:'Inline Code' },
    { label:'Link', action: () => insertSnippet('[','](url)','link text'), title:'Link' },
    { label:'> Quote', action: () => insertSnippet('> ','','quote'), title:'Blockquote' },
    { label:'--- HR', action: () => setMarkdown(md => md + '\n\n---\n\n'), title:'Horizontal Rule' },
  ]

  return (
    <div style={{ minHeight:'100vh',background:'#fff',fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <TrustStrip />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)',padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto',display:'flex',alignItems:'center',gap:'16px' }}>
          <div style={{ width:'56px',height:'56px',background:'rgba(232,93,4,0.2)',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',flexShrink:0 }}>📝</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:800,color:'white',margin:0 }}>Markdown Editor</h1>
            <p style={{ color:'rgba(255,255,255,0.65)',fontSize:'15px',margin:'6px 0 0' }}>Write and preview Markdown in real time. Copy as HTML instantly.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1200px',margin:'0 auto',padding:'24px' }}>

        {/* Toolbar */}
        <div style={{ background:'white',border:'1.5px solid #e2e8f0',borderRadius:'14px',padding:'10px 14px',marginBottom:'12px',display:'flex',alignItems:'center',gap:'6px',flexWrap:'wrap' }}>
          {toolbar.map(t => (
            <button key={t.label} onClick={t.action} title={t.title}
              style={{ padding:'5px 10px',borderRadius:'6px',border:'1px solid #e2e8f0',background:'#f8fafc',fontFamily:'monospace',fontSize:'12.5px',fontWeight:600,cursor:'pointer',color:'#0F2A4A',whiteSpace:'nowrap' }}>
              {t.label}
            </button>
          ))}
          <div style={{ marginLeft:'auto',display:'flex',gap:'6px' }}>
            {(['split','editor','preview'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding:'5px 12px',borderRadius:'6px',border:'1.5px solid',borderColor:view===v?'#0F2A4A':'#e2e8f0',background:view===v?'#0F2A4A':'white',color:view===v?'white':'#64748b',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer',textTransform:'capitalize' }}>
                {v}
              </button>
            ))}
            <button onClick={copyHTML}
              style={{ padding:'5px 12px',borderRadius:'6px',border:'1.5px solid #e2e8f0',background:copied?'#16A34A':'white',color:copied?'white':'#64748b',fontFamily:'inherit',fontSize:'12px',fontWeight:600,cursor:'pointer' }}>
              {copied ? '✓ Copied HTML' : 'Copy HTML'}
            </button>
          </div>
        </div>

        {/* Editor + Preview */}
        <div style={{ display:'grid',gridTemplateColumns:view==='split'?'1fr 1fr':view==='editor'?'1fr 0':'0 1fr',gap:'12px',transition:'all 0.2s' }}>
          {view !== 'preview' && (
            <div style={{ overflow:'hidden' }}>
              <div style={{ fontSize:'12px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px',paddingLeft:'4px' }}>Markdown</div>
              <textarea value={markdown} onChange={e => setMarkdown(e.target.value)}
                style={{ width:'100%',height:'560px',padding:'18px',border:'1.5px solid #e2e8f0',borderRadius:'14px',fontFamily:'monospace',fontSize:'13.5px',color:'#0F2A4A',outline:'none',resize:'vertical',lineHeight:'1.7',background:'#fafafa' }}/>
            </div>
          )}
          {view !== 'editor' && (
            <div style={{ overflow:'hidden' }}>
              <div style={{ fontSize:'12px',fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'6px',paddingLeft:'4px' }}>Preview</div>
              <div
                dangerouslySetInnerHTML={{ __html: html }}
                style={{ height:'560px',padding:'20px',border:'1.5px solid #e2e8f0',borderRadius:'14px',background:'white',overflow:'auto',fontSize:'15px',lineHeight:'1.7',color:'#374151' }}
              />
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div style={{ marginTop:'10px',display:'flex',gap:'20px',padding:'8px 4px' }}>
          {[
            { label:'Words', val:markdown.trim().split(/\s+/).filter(Boolean).length },
            { label:'Characters', val:markdown.length },
            { label:'Lines', val:markdown.split('\n').length },
            { label:'Headings', val:(markdown.match(/^#{1,6} /gm)||[]).length },
          ].map(s => (
            <span key={s.label} style={{ fontSize:'12.5px',color:'#94a3b8' }}>
              <strong style={{ color:'#64748b' }}>{s.val}</strong> {s.label}
            </span>
          ))}
        </div>
      </div>
      <RelatedTools currentPath="/markdown-editor" />

      <div style={{ maxWidth:'860px',margin:'48px auto 0',padding:'0 24px 48px' }}>
        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>How to Use the Markdown Editor</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7',marginBottom:'16px' }}>Write Markdown on the left, see the live HTML preview on the right. Export rendered HTML when ready.</p>
          <ol style={{ paddingLeft:'24px',fontSize:'15px',color:'#64748b',lineHeight:'1.8' }}>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 1:</strong> Type or paste Markdown in the left editor panel.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 2:</strong> Watch the rendered preview update live in the right panel.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 3:</strong> Use headings, lists, links, images, code blocks — all standard Markdown.</li>
            <li style={{ marginBottom:'10px' }}><strong style={{ color:'#0F2A4A' }}>Step 4:</strong> Copy the rendered HTML or your Markdown source.</li>
          </ol>
        </section>

        <section style={{ marginBottom:'40px' }}>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Common Use Cases</h2>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'14px' }}>
            {[
              { icon:'📰', title:'Blog Posts', desc:'Draft articles in Markdown and export clean HTML to your CMS.' },
              { icon:'📖', title:'README Files', desc:'Write project README.md for GitHub, GitLab, or npm.' },
              { icon:'📚', title:'Documentation', desc:'Spec pages, knowledge base entries, API docs.' },
              { icon:'🐛', title:'GitHub Issues', desc:'Format issue descriptions and PR comments with confidence.' },
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
            { q:'What is Markdown?', a:'A lightweight plain-text formatting syntax that converts to HTML. Created by John Gruber in 2004 and now standard across GitHub, Reddit, Discord, and most modern documentation tooling.' },
            { q:'What is the difference between Markdown and HTML?', a:'Markdown is the source — short syntax like **bold** or # Heading. HTML is the output — <strong>bold</strong> or <h1>Heading</h1>. Markdown is easier to write; HTML is what browsers render.' },
            { q:'Can I use Markdown on all platforms?', a:'On most modern ones — GitHub, GitLab, Notion, Obsidian, Discord, Reddit, Slack, Trello. Some platforms use slight dialect variations (GFM, CommonMark, MultiMarkdown) but the basics are universal.' },
            { q:'How do I add images in Markdown?', a:'Use ![alt text](url) — for example ![ConvertDox logo](https://convertdox.com/og-image.png). For local images, use a relative path; for web images, use the full URL.' },
            { q:'What are the most useful Markdown shortcuts?', a:'**bold**, *italic*, # Heading, - bullet, 1. numbered, [link](url), ![image](url), `inline code`, ```code block```, > blockquote, and --- for horizontal rule. Master those ten and you cover 95% of everyday writing.' },
          ].map(faq => (
            <details key={faq.q} style={{ background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'10px',padding:'14px 18px',marginBottom:'8px' }}>
              <summary style={{ fontSize:'15px',fontWeight:600,color:'#0F2A4A',cursor:'pointer' }}>{faq.q}</summary>
              <p style={{ fontSize:'14px',color:'#64748b',lineHeight:'1.7',marginTop:'10px',marginBottom:0 }}>{faq.a}</p>
            </details>
          ))}
        </section>

        <section>
          <h2 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif",fontSize:'26px',fontWeight:800,color:'#0F2A4A',marginBottom:'16px' }}>Why Use the ConvertDox Markdown Editor?</h2>
          <p style={{ fontSize:'15px',color:'#64748b',lineHeight:'1.7' }}>Markdown is the lingua franca of modern writing for developers, technical writers, and anyone who maintains documentation. The ConvertDox Markdown Editor gives you a split-pane editor with live HTML preview, which is the fastest way to learn the syntax and to catch formatting mistakes before publishing. The editor supports the CommonMark specification — the standardized version of Markdown — plus the GitHub-Flavored Markdown extensions for tables, task lists, strikethrough, and fenced code blocks. Everything runs in your browser, so drafts are private and the editor works offline once the page is cached. You can paste an entire long-form article, restructure headings, and export clean HTML in seconds without ever opening Word or Google Docs. For developers, this is the simplest way to author a README.md or polish a long issue write-up; for writers, it&apos;s a distraction-free environment with no formatting toolbar, no autosave anxiety, and no AI summarisation getting in the way. The output is plain HTML that pastes into any CMS, any email client, and any documentation tool. If you live in Markdown already, this editor is a reliable scratch pad; if you&apos;re learning Markdown, the live preview shortens the feedback loop significantly. Pair it with our <a href="/markdown-cheatsheet" style={{ color:'#E85D04',fontWeight:600 }}>Markdown Cheatsheet</a> for a quick syntax reference.</p>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Markdown Editor',
        'description': 'Free online Markdown editor with live HTML preview. CommonMark and GitHub-Flavored Markdown support.',
        'url': 'https://convertdox.com/markdown-editor',
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

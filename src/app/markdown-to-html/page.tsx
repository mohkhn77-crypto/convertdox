'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const parseMarkdown = (md: string): string => {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background:#f1f5f9;border-radius:8px;padding:12px 16px;overflow:auto;border:1px solid #e2e8f0"><code style="font-family:monospace;font-size:13px">$1</code></pre>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#E85D04">$1</code>')

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4 style="font-size:16px;font-weight:700;color:#0F2A4A;margin:14px 0 6px">$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;color:#0F2A4A;margin:16px 0 8px">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;color:#0F2A4A;margin:20px 0 10px;padding-bottom:6px;border-bottom:2px solid #e2e8f0">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;color:#0F2A4A;margin:24px 0 12px;padding-bottom:8px;border-bottom:2px solid #E85D04">$1</h1>')

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:700">$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#E85D04;text-decoration:underline">$1</a>')

  // Images
  html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px;margin:8px 0"/>')

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote style="border-left:4px solid #E85D04;margin:12px 0;padding:8px 16px;background:#FFF7ED;border-radius:0 8px 8px 0;color:#0F2A4A">$1</blockquote>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:2px solid #e2e8f0;margin:20px 0"/>')

  // Lists
  html = html.replace(/^[*-] (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul style="padding-left:20px;margin:8px 0">$&</ul>')
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p style="margin:10px 0;line-height:1.7;color:#374151">')
  html = '<p style="margin:10px 0;line-height:1.7;color:#374151">' + html + '</p>'

  return html
}

const SAMPLE_MD = `# Welcome to Markdown to HTML

This tool converts **Markdown** to *HTML* instantly.

## Features

- Real-time conversion
- HTML source view
- Visual preview

### Code Example

\`\`\`
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote with important info.

Visit [ConvertDox](https://convertdox.com) for more tools!

---

Made with **love** by the ConvertDox team.`

export default function MarkdownToHTMLPage() {
  const [markdown, setMarkdown] = useState(SAMPLE_MD)
  const [tab, setTab] = useState<'html' | 'preview'>('preview')
  const [copied, setCopied] = useState(false)

  const html = parseMarkdown(markdown)

  function copy() {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🌐</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Markdown to HTML</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert Markdown to HTML with live preview</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Markdown Input</div>
            <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} rows={24}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'center' }}>
              {(['preview', 'html'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ padding: '4px 14px', borderRadius: '6px', border: '1.5px solid', borderColor: tab === t ? '#0F2A4A' : '#e2e8f0', background: tab === t ? '#0F2A4A' : 'white', color: tab === t ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize' }}>
                  {t === 'html' ? 'HTML Source' : 'Preview'}
                </button>
              ))}
              <button onClick={copy}
                style={{ marginLeft: 'auto', background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '4px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            {tab === 'html' ? (
              <textarea value={html} readOnly rows={24}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: html }}
                style={{ height: '540px', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', overflowY: 'auto', fontSize: '15px', lineHeight: '1.7', color: '#374151' }} />
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

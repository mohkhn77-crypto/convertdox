'use client'
import { useState, useRef } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function parseMarkdown(md: string): string {
  let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/```([\s\S]*?)```/g, '<pre style="background:#f1f5f9;padding:12px;border-radius:8px;overflow:auto"><code>$1</code></pre>')
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-family:monospace">$1</code>')
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;margin:16px 0 8px">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;margin:20px 0 10px">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;margin:24px 0 12px">$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#3b82f6;text-decoration:underline">$1</a>')
  html = html.replace(/^- (.+)$/gm, '<li style="margin:4px 0">$1</li>')
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #e2e8f0;padding-left:12px;color:#64748b;margin:8px 0">$1</blockquote>')
  html = html.replace(/---/g, '<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">')
  html = html.replace(/\n\n/g, '</p><p style="margin:10px 0">')
  return '<p style="margin:10px 0">' + html + '</p>'
}

const CHEATSHEET = [
  { category: 'Headings', items: [
    { syntax: '# Heading 1', desc: 'H1' },
    { syntax: '## Heading 2', desc: 'H2' },
    { syntax: '### Heading 3', desc: 'H3' },
  ]},
  { category: 'Text Formatting', items: [
    { syntax: '**bold text**', desc: 'Bold' },
    { syntax: '*italic text*', desc: 'Italic' },
    { syntax: '**_bold italic_**', desc: 'Bold Italic' },
  ]},
  { category: 'Links', items: [
    { syntax: '[Link text](https://example.com)', desc: 'Hyperlink' },
  ]},
  { category: 'Lists', items: [
    { syntax: '- Item one\n- Item two\n- Item three', desc: 'Unordered list' },
  ]},
  { category: 'Code', items: [
    { syntax: '`inline code`', desc: 'Inline code' },
    { syntax: '```\ncode block\n```', desc: 'Code block' },
  ]},
  { category: 'Blockquote', items: [
    { syntax: '> This is a quote', desc: 'Blockquote' },
  ]},
  { category: 'Divider', items: [
    { syntax: '---', desc: 'Horizontal rule' },
  ]},
]

const INITIAL_MD = `# Welcome to Markdown Cheatsheet

Write **bold**, *italic*, or \`inline code\` text.

## Links & Lists

[Visit ConvertDox](https://convertdox.com)

- Item one
- Item two
- Item three

> This is a blockquote

---

\`\`\`
const greeting = "Hello, World!"
console.log(greeting)
\`\`\``

export default function MarkdownCheatsheetPage() {
  const [md, setMd] = useState(INITIAL_MD)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function insertSyntax(syntax: string) {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const newMd = md.slice(0, start) + '\n' + syntax + '\n' + md.slice(end)
    setMd(newMd)
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + syntax.length + 2, start + syntax.length + 2)
    }, 10)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📋</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Markdown Cheatsheet</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Live editor with interactive syntax reference</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Editor + Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Editor</div>
            <textarea
              ref={textareaRef}
              value={md}
              onChange={e => setMd(e.target.value)}
              rows={20}
              style={{ width: '100%', padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', color: '#374151', background: '#f8fafc', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
            />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Preview</div>
            <div
              style={{ padding: '16px', border: '1.5px solid #e2e8f0', borderRadius: '14px', background: 'white', minHeight: '400px', lineHeight: '1.7', color: '#374151', fontSize: '14px' }}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }}
            />
          </div>
        </div>

        {/* Cheatsheet */}
        <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 700, color: '#0F2A4A', marginBottom: '20px' }}>Interactive Cheatsheet</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Click &quot;Insert&quot; to add any syntax to the editor above.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '16px' }}>
          {CHEATSHEET.map(cat => (
            <div key={cat.category} style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
              <div style={{ fontWeight: 700, color: '#0F2A4A', marginBottom: '12px', fontSize: '15px' }}>{cat.category}</div>
              {cat.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: i < cat.items.length - 1 ? '12px' : 0, paddingBottom: i < cat.items.length - 1 ? '12px' : 0, borderBottom: i < cat.items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#5B21B6', background: '#ede9fe', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'pre', marginBottom: '4px' }}>{item.syntax}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.desc}</div>
                  </div>
                  <button onClick={() => insertSyntax(item.syntax)}
                    style={{ padding: '6px 14px', background: '#0F2A4A', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', flexShrink: 0, marginLeft: '8px' }}>
                    Insert
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

function htmlToMarkdown(html: string): string {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    function processNode(node: Node): string {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || ''
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return ''
      const el = node as HTMLElement
      const tag = el.tagName.toLowerCase()
      const children = Array.from(el.childNodes).map(processNode).join('')

      switch (tag) {
        case 'h1': return `# ${children}\n\n`
        case 'h2': return `## ${children}\n\n`
        case 'h3': return `### ${children}\n\n`
        case 'h4': return `#### ${children}\n\n`
        case 'h5': return `##### ${children}\n\n`
        case 'h6': return `###### ${children}\n\n`
        case 'strong':
        case 'b': return `**${children}**`
        case 'em':
        case 'i': return `*${children}*`
        case 'a': return `[${children}](${el.getAttribute('href') || ''})`
        case 'img': return `![${el.getAttribute('alt') || ''}](${el.getAttribute('src') || ''})`
        case 'code': {
          const parent = el.parentElement
          if (parent && parent.tagName.toLowerCase() === 'pre') return children
          return `\`${children}\``
        }
        case 'pre': {
          const code = el.querySelector('code')
          const text = code ? code.textContent || '' : children
          return '```\n' + text + '\n```\n\n'
        }
        case 'blockquote': return children.split('\n').map(l => l ? `> ${l}` : '').join('\n') + '\n\n'
        case 'hr': return '---\n\n'
        case 'br': return '\n'
        case 'p': return `${children}\n\n`
        case 'ul': {
          return Array.from(el.querySelectorAll(':scope > li')).map(li => {
            const text = processNode(li).trim()
            return `- ${text}`
          }).join('\n') + '\n\n'
        }
        case 'ol': {
          return Array.from(el.querySelectorAll(':scope > li')).map((li, i) => {
            const text = processNode(li).trim()
            return `${i + 1}. ${text}`
          }).join('\n') + '\n\n'
        }
        case 'li': return children
        case 'div': return `${children}\n`
        case 'html':
        case 'body':
        case 'head': return children
        default: return children
      }
    }

    let result = processNode(doc.body)
    // Clean up excessive newlines
    result = result.replace(/\n{4,}/g, '\n\n').trim()
    return result
  } catch {
    return 'Error converting HTML to Markdown'
  }
}

const SAMPLE_HTML = `<h1>Welcome to ConvertDox</h1>
<p>This is a <strong>free online tool</strong> to convert <em>HTML</em> to <a href="https://convertdox.com">Markdown</a>.</p>
<h2>Features</h2>
<ul>
  <li>Convert headings, bold, italic</li>
  <li>Handle links and images</li>
  <li>Support code blocks</li>
</ul>
<h3>Code Example</h3>
<pre><code>function hello() {
  console.log("Hello World!");
}</code></pre>
<blockquote>This is a blockquote with important information.</blockquote>
<hr/>
<p>Footer text with <code>inline code</code>.</p>`

export default function HTMLToMarkdownPage() {
  const [input, setInput] = useState(SAMPLE_HTML)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  function convert() {
    setOutput(htmlToMarkdown(input))
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>📝</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>HTML to Markdown</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>Convert HTML code to clean Markdown format instantly</p>
          </div>
        </div>
      </div>
      <TrustStrip />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button onClick={convert}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            Convert to Markdown
          </button>
          {output && (
            <button onClick={copy}
              style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {copied ? 'Copied!' : 'Copy Output'}
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>HTML Input</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={22}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const }} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Markdown Output</div>
            <textarea value={output} readOnly rows={22}
              style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontFamily: 'monospace', resize: 'vertical', outline: 'none', boxSizing: 'border-box' as const, background: '#f8fafc' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

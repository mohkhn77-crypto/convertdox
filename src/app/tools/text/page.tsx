'use client'
import NavBar from '@/components/NavBar'
import TrustStrip from '@/components/TrustStrip'

const OTHER_CATS = [
  { label: 'Calculators', href: '/tools/calculators' },
  { label: 'Developer Tools', href: '/tools/developer' },
  { label: 'Color Tools', href: '/tools/color' },
  { label: 'Security Tools', href: '/tools/security' },
  { label: 'QR Code Tools', href: '/tools/qr' },
  { label: 'Fun & Decision', href: '/tools/fun' },
] as const

const TEXT_TOOLS = [
  {
    title: 'Word Counter',
    desc: 'Count words, characters, sentences, paragraphs and reading time instantly.',
    href: '/word-counter',
    features: ['Real-time word & character count', 'Reading & speaking time estimate', 'Word frequency analysis'],
  },
  {
    title: 'Character Counter',
    desc: 'Count characters, words, sentences and more with detailed statistics.',
    href: '/character-counter',
    features: ['Character count with & without spaces', 'Sentence and paragraph count', 'Social media limit tracker'],
  },
  {
    title: 'Text Case Converter',
    desc: 'Convert text between UPPER, lower, Title, camelCase, snake_case and more.',
    href: '/text-case-converter',
    features: ['8 case formats supported', 'Instant conversion preview', 'One-click copy to clipboard'],
  },
  {
    title: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text for designs, mockups and wireframes.',
    href: '/lorem-ipsum',
    features: ['Paragraphs, sentences or words', 'Classic Lorem Ipsum text', 'Customisable output length'],
  },
  {
    title: 'Markdown Editor',
    desc: 'Write and preview Markdown live with syntax highlighting.',
    href: '/markdown-editor',
    features: ['Live preview side-by-side', 'Full GitHub Markdown support', 'Export to HTML'],
  },
  {
    title: 'Reverse Text',
    desc: 'Reverse characters, words, or flip text upside down.',
    href: '/reverse-text',
    features: ['Reverse characters or words', 'Upside-down text mode', 'Instant copy to clipboard'],
  },
  {
    title: 'Remove Duplicates',
    desc: 'Remove duplicate lines from any list or block of text.',
    href: '/remove-duplicates',
    features: ['Remove exact duplicate lines', 'Case-insensitive dedup option', 'Sort output alphabetically'],
  },
  {
    title: 'Sort Lines',
    desc: 'Sort lines alphabetically, numerically, or randomly.',
    href: '/sort-lines',
    features: ['Alphabetical & numeric sort', 'Reverse sort option', 'Random shuffle mode'],
  },
  {
    title: 'Find & Replace',
    desc: 'Multi-pattern text find and replace with live preview.',
    href: '/find-replace',
    features: ['Plain text and regex support', 'Multiple replacement rules', 'Case-sensitive option'],
  },
  {
    title: 'Text to Slug',
    desc: 'Batch convert text to URL-friendly slugs.',
    href: '/text-to-slug',
    features: ['URL-safe slug output', 'Custom separator options', 'Bulk slug conversion'],
  },
  {
    title: 'Strip HTML Tags',
    desc: 'Extract plain text from HTML — remove all tags instantly.',
    href: '/strip-html',
    features: ['Remove all HTML tags', 'Preserve line breaks option', 'Works with any HTML input'],
  },
  {
    title: 'Quote Generator',
    desc: 'Famous quotes by category — inspiration at a click.',
    href: '/quote-generator',
    features: ['Hundreds of curated quotes', 'Filter by category or author', 'Copy or share instantly'],
  },
  {
    title: 'Lorem Ipsum Advanced',
    desc: 'Generate hipster, corporate and tech-themed placeholder text.',
    href: '/lorem-advanced',
    features: ['Multiple Lorem styles', 'Hipster, corporate, tech themes', 'Paragraph or sentence output'],
  },
  {
    title: 'Words to Number',
    desc: '"five hundred" converts to 500 — spoken English to digits.',
    href: '/words-to-number',
    features: ['Full English number words', 'Handles large numbers', 'Instant conversion'],
  },
  {
    title: 'Text Diff Checker',
    desc: 'Compare two texts and highlight differences side by side.',
    href: '/text-diff',
    features: ['Line-by-line diff view', 'Added and removed highlighting', 'Character-level diff support'],
  },
  {
    title: 'Anagram Generator',
    desc: 'Generate all possible letter rearrangements from any word or phrase, filtered to real English words.',
    href: '/anagram-generator',
    features: ['Real word filtering', 'Up to 100 results', 'Word length filter'],
  },
  {
    title: 'Palindrome Checker',
    desc: 'Check if text reads the same forwards and backwards, with options to ignore spaces and punctuation.',
    href: '/palindrome-checker',
    features: ['Case-sensitive option', 'Ignore spaces/punctuation', 'Famous examples'],
  },
  {
    title: 'Word Frequency Counter',
    desc: 'Count how often each word appears in your text and visualize the frequency as a bar chart.',
    href: '/word-frequency',
    features: ['Stop word exclusion', 'Bar chart visualization', 'CSV export'],
  },
  {
    title: 'Text to Speech',
    desc: 'Convert any text to spoken audio directly in your browser using the Web Speech API.',
    href: '/text-to-speech',
    features: ['Voice selector', 'Speed & pitch control', 'No download needed'],
  },
  {
    title: 'Speech to Text',
    desc: 'Transcribe your voice to text in real-time using browser speech recognition.',
    href: '/speech-to-text',
    features: ['Multiple languages', 'Live transcription', 'Edit & copy'],
  },
  {
    title: 'Letter Spacing Generator',
    desc: 'Add spaces, dots, dashes, or underscores between letters for social media bios and design.',
    href: '/letter-spacing',
    features: ['5 spacing styles', 'Custom separator', 'Copy instantly'],
  },
  {
    title: 'Sentence Counter',
    desc: 'Count sentences, calculate readability scores, and analyze your writing at the sentence level.',
    href: '/sentence-counter',
    features: ['Flesch reading score', 'Grade level', 'Per-sentence breakdown'],
  },
] as const

export default function TextToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '5px 16px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
            <span style={{ background: '#E85D04', borderRadius: '999px', padding: '1px 8px', fontWeight: 700, color: 'white', fontSize: '11px' }}>22 TOOLS</span>
            Text Utilities
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,5vw,52px)', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.5px', margin: '0 0 18px' }}>
            Free Online <span style={{ color: '#F48C42' }}>Text Tools</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.65)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Word counters, case converters, lorem ipsum generators, markdown editors, and more — all free, no sign-up required.
          </p>
        </div>
      </div>

      <TrustStrip />

      {/* Tools grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Text Tools</div>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#0F2A4A', margin: '0 0 12px' }}>All Text Tools</h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>15 free tools for writers, students, developers, and everyone in between.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '20px' }}>
          {TEXT_TOOLS.map(tool => (
            <a key={tool.href} href={tool.href}
              style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(15,42,74,0.04)', transition: 'box-shadow 0.15s' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F2A4A', marginBottom: '6px' }}>{tool.title}</div>
                <div style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.5' }}>{tool.desc}</div>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px', listStyle: 'disc' }}>
                {tool.features.map(f => (
                  <li key={f} style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6' }}>{f}</li>
                ))}
              </ul>
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#E85D04', background: '#FFF7ED', padding: '5px 14px', borderRadius: '999px' }}>Use Tool →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: '22px', fontWeight: 800, color: '#0F2A4A', marginBottom: '20px', textAlign: 'center' }}>Other Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {OTHER_CATS.map(cat => (
              <a key={cat.href} href={cat.href}
                style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, color: '#0F2A4A' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

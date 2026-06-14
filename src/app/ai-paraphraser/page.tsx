'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import ToolPageSEO from '@/components/ToolPageSEO'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://convertdox-backend-production.up.railway.app'

export default function AIParaphraser() {
  const [text, setText] = useState('')
  const [style, setStyle] = useState('standard')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (text.trim().length < 20) { setError('Please enter at least 20 characters'); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch(`${BACKEND}/api/ai/paraphrase`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style }),
      })
      const data = await res.json() as { paraphrased?: string; error?: string }
      if (!res.ok) throw new Error(data.error || 'Failed to paraphrase')
      setResult(data.paraphrased ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally { setLoading(false) }
  }

  function copy() { navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }) }

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />
      <div style={{ background:'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto', display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'56px', height:'56px', background:'rgba(232,93,4,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px' }}>↺</div>
          <div>
            <h1 style={{ fontFamily:"'Space Grotesk',system-ui,sans-serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'white', margin:0 }}>AI Paraphraser</h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'15px', margin:'6px 0 0' }}>Rewrite text in different styles while keeping the meaning.</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'860px', margin:'32px auto 0', padding:'0 24px 48px' }}>
        <div style={{ background:'white', padding:'32px', borderRadius:'16px', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
          <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Text to paraphrase</label>
          <textarea
            value={text} onChange={e => { setText(e.target.value); setError('') }}
            placeholder="Enter the text you want to rewrite..."
            style={{ width:'100%', minHeight:'200px', padding:'16px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'15px', fontFamily:'inherit', outline:'none', resize:'vertical', boxSizing:'border-box' as const }}
          />
          <div style={{ fontSize:'13px', color:'#94a3b8', marginTop:'4px' }}>{text.length.toLocaleString()} characters</div>

          <div style={{ marginTop:'20px' }}>
            <label style={{ display:'block', fontSize:'14px', fontWeight:700, color:'#0F2A4A', marginBottom:'8px' }}>Writing style</label>
            <select value={style} onChange={e => setStyle(e.target.value)}
              style={{ padding:'10px 14px', border:'1.5px solid #e2e8f0', borderRadius:'10px', fontSize:'14px', fontFamily:'inherit', background:'white', outline:'none' }}>
              <option value="standard">Standard</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="academic">Academic</option>
            </select>
          </div>

          <button onClick={handleSubmit} disabled={loading || text.trim().length < 20}
            style={{ marginTop:'24px', background: loading || text.trim().length < 20 ? '#cbd5e1' : '#E85D04', color:'white', border:'none', padding:'14px 32px', borderRadius:'10px', fontSize:'15px', fontWeight:700, cursor: loading || text.trim().length < 20 ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
            {loading ? '⏳ Paraphrasing…' : '↺ Paraphrase'}
          </button>

          {error && <div style={{ marginTop:'20px', padding:'14px 18px', background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:'10px', color:'#DC2626', fontSize:'14px', fontWeight:600 }}>⚠️ {error}</div>}

          {result && (
            <div style={{ marginTop:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                <h3 style={{ fontSize:'16px', fontWeight:700, color:'#0F2A4A', margin:0 }}>Paraphrased Text</h3>
                <button onClick={copy} style={{ background:'white', border:'1.5px solid #e2e8f0', padding:'6px 14px', borderRadius:'8px', fontSize:'13px', cursor:'pointer', fontWeight:600, color: copied ? '#166534' : '#0F2A4A', fontFamily:'inherit' }}>
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ padding:'20px', background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:'10px', whiteSpace:'pre-wrap' as const, lineHeight:1.7, fontSize:'15px', color:'#166534' }}>
                {result}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToolPageSEO
        toolName="AI Paraphraser"
        whatIs="An AI paraphraser is a tool that rewrites text in different words while preserving its original meaning. It uses advanced language models to understand context, identify key concepts, and express them using alternative vocabulary and sentence structures. The result is content that says the same thing differently — useful for avoiding repetition, evading plagiarism detection, improving readability, or adapting tone for different audiences."
        whatIsExtended="Unlike a simple thesaurus that just swaps individual words, modern AI paraphrasers rephrase entire sentences and paragraphs, restructuring grammar and rephrasing concepts naturally. This produces more readable, human-sounding text than older word-substitution methods. The ConvertDox AI Paraphraser uses OpenAI's GPT models to deliver high-quality rewrites in multiple styles."
        howToUse={[
          'Paste or type the text you want to rewrite in the input box (minimum 20 characters)',
          'Select your preferred writing style — Standard for general use, Formal for business, Casual for blogs, Creative for narratives, or Academic for research',
          'Click the Paraphrase button and wait a few seconds for processing',
          'Review the rewritten text in the output box',
          'Click Copy to use the paraphrased version, or run it again with a different style',
          'Edit the output to match your voice — AI is a starting point, not the final word',
        ]}
        useCases={[
          {
            title: 'Academic Writing',
            description: 'Students and researchers can rewrite quoted text to integrate ideas into their own work while maintaining proper attribution and avoiding plagiarism flags.',
          },
          {
            title: 'Content Creation',
            description: 'Bloggers and writers create unique versions of similar content for different audiences, platforms, or content calendars.',
          },
          {
            title: 'Email Rewriting',
            description: 'Soften or formalize draft emails to match the recipient\'s communication style and improve clarity before sending.',
          },
          {
            title: 'SEO Variations',
            description: 'Marketers generate multiple variations of product descriptions, ad copy, or meta descriptions for A/B testing and avoiding duplicate content.',
          },
          {
            title: 'Language Practice',
            description: 'Language learners see how the same meaning can be expressed multiple ways, expanding vocabulary and sentence pattern recognition.',
          },
          {
            title: 'Clarity Improvement',
            description: 'Anyone struggling with awkward phrasing can get a cleaner, more readable version that flows naturally.',
          },
        ]}
        tips={[
          'Provide context — longer text (50+ words) typically produces better results than single sentences',
          'Try different styles — Formal, Casual, and Creative produce very different results from the same input',
          'Review and edit — AI gets the gist right but may miss nuance specific to your topic or industry',
          'Fact-check key terms — paraphrasing technical or scientific content can occasionally change meaning subtly',
          'Use it iteratively — paraphrase, edit, paraphrase again for the best final output',
          'Maintain your voice — don\'t blindly accept AI rewrites; make them sound like your natural writing',
          'Don\'t paraphrase quotes — direct quotes should stay verbatim with proper attribution',
        ]}
        faqs={[
          {
            question: 'Is the AI Paraphraser free?',
            answer: 'Yes, completely free with no signup required. There are reasonable usage limits to ensure the service stays available for everyone, but typical use cases like rewriting essays, emails, or blog posts work fine within free limits.',
          },
          {
            question: 'Will this help me pass plagiarism checkers?',
            answer: 'AI paraphrasing significantly changes wording and sentence structure, which usually helps with plagiarism detection. However, the best practice is always to cite sources and write in your own voice rather than relying solely on paraphrasing tools.',
          },
          {
            question: 'How is this different from a thesaurus?',
            answer: 'A thesaurus only swaps individual words with synonyms. AI paraphrasing rewrites entire sentences and paragraphs, restructuring grammar and rephrasing concepts naturally. This produces much more readable, human-sounding text than word-swapping methods.',
          },
          {
            question: 'Is my text stored or used to train AI?',
            answer: 'No. Your input text is processed and immediately discarded. We don\'t store, log, or use your text to train any models. The conversion happens in real-time and nothing persists after you close the page.',
          },
          {
            question: 'What writing styles are available?',
            answer: 'Five styles: Standard (balanced), Formal (business and professional), Casual (conversational and friendly), Creative (varied vocabulary and structure), and Academic (scholarly tone with precise language).',
          },
          {
            question: 'Can I paraphrase very long text?',
            answer: 'The tool works best with text under 5000 characters per request. For longer documents, paraphrase in sections of 1-2 paragraphs at a time, then combine the results.',
          },
          {
            question: 'Does it work for non-English languages?',
            answer: 'Currently the tool is optimized for English. It can process other languages but quality varies. We\'re working on dedicated support for additional languages.',
          },
        ]}
        relatedTools={[
          {
            name: 'AI Summarizer',
            slug: 'ai-summarizer',
            description: 'Condense long articles into key points',
          },
          {
            name: 'AI Grammar Checker',
            slug: 'ai-grammar',
            description: 'Fix grammar and writing errors',
          },
          {
            name: 'AI Tone Changer',
            slug: 'ai-tone-changer',
            description: 'Adjust the tone of your writing',
          },
          {
            name: 'Word Counter',
            slug: 'word-counter',
            description: 'Count words and characters in text',
          },
          {
            name: 'AI Translator',
            slug: 'ai-translator',
            description: 'Translate between languages',
          },
        ]}
      />
    </div>
  )
}

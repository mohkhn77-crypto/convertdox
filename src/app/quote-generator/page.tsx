'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import SiteFooter from '@/components/SiteFooter'
import TrustStrip from '@/components/TrustStrip'

const QUOTES = [
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs", cat: "success" },
  { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", cat: "motivation" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", cat: "motivation" },
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon", cat: "life" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", cat: "motivation" },
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", cat: "wisdom" },
  { quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa", cat: "love" },
  { quote: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", cat: "motivation" },
  { quote: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead", cat: "humor" },
  { quote: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson", cat: "wisdom" },
  { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", cat: "wisdom" },
  { quote: "An unexamined life is not worth living.", author: "Socrates", cat: "wisdom" },
  { quote: "Spread love everywhere you go.", author: "Mother Teresa", cat: "love" },
  { quote: "When you change the way you look at things, the things you look at change.", author: "Wayne Dyer", cat: "wisdom" },
  { quote: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt", cat: "life" },
  { quote: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey", cat: "motivation" },
  { quote: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron", cat: "success" },
  { quote: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou", cat: "life" },
  { quote: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", cat: "success" },
  { quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", cat: "motivation" },
  { quote: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith", cat: "success" },
  { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", cat: "life" },
  { quote: "Not how long, but how well you have lived is the main thing.", author: "Seneca", cat: "life" },
  { quote: "If life were predictable, it would cease to be life.", author: "Eleanor Roosevelt", cat: "life" },
  { quote: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou", cat: "motivation" },
  { quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", cat: "motivation" },
  { quote: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", cat: "life" },
  { quote: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", cat: "success" },
  { quote: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", cat: "life" },
  { quote: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison", cat: "success" },
  { quote: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss", cat: "motivation" },
  { quote: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs", cat: "success" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain", cat: "success" },
  { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi", cat: "motivation" },
  { quote: "We generate fears while we sit. We overcome them by action.", author: "Dr. Henry Link", cat: "motivation" },
  { quote: "Whether you think you can or think you can't, you're right.", author: "Henry Ford", cat: "motivation" },
  { quote: "Security is mostly a superstition. Life is either a daring adventure or nothing.", author: "Helen Keller", cat: "life" },
  { quote: "The man who has confidence in himself gains the confidence of others.", author: "Hasidic Proverb", cat: "wisdom" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs", cat: "success" },
  { quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein", cat: "humor" },
  { quote: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde", cat: "humor" },
  { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", cat: "humor" },
  { quote: "A day without sunshine is like, you know, night.", author: "Steve Martin", cat: "humor" },
  { quote: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", cat: "success" },
  { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", cat: "success" },
  { quote: "Opportunities don't happen. You create them.", author: "Chris Grosser", cat: "success" },
  { quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", cat: "success" },
  { quote: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney", cat: "motivation" },
  { quote: "The real test is not whether you avoid this failure, but whether you let it harden or shame you.", author: "Barack Obama", cat: "wisdom" },
  { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", cat: "success" },
  { quote: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer", cat: "success" },
  { quote: "Technology is best when it brings people together.", author: "Matt Mullenweg", cat: "technology" },
  { quote: "It's not a faith in technology. It's faith in people.", author: "Steve Jobs", cat: "technology" },
  { quote: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", cat: "technology" },
  { quote: "The science of today is the technology of tomorrow.", author: "Edward Teller", cat: "technology" },
  { quote: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates", cat: "technology" },
  { quote: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", cat: "love" },
  { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", cat: "love" },
  { quote: "Love yourself first and everything else falls into line.", author: "Lucille Ball", cat: "love" },
  { quote: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt", cat: "wisdom" },
  { quote: "In wisdom gathered over time I have found that every experience is a form of exploration.", author: "Ansel Adams", cat: "wisdom" },
]

const CATS = ['all', 'motivation', 'success', 'wisdom', 'life', 'humor', 'love', 'technology']
const CAT_COLORS: Record<string, string> = {
  all: '#0F2A4A', motivation: '#E85D04', success: '#16A34A', wisdom: '#7C3AED',
  life: '#0891B2', humor: '#D97706', love: '#DB2777', technology: '#2563EB'
}

export default function QuoteGeneratorPage() {
  const [cat, setCat] = useState('all')
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const filtered = cat === 'all' ? QUOTES : QUOTES.filter(q => q.cat === cat)
  const current = filtered[idx % filtered.length] ?? QUOTES[0]

  const newQuote = () => setIdx(i => {
    let next = Math.floor(Math.random() * filtered.length)
    if (filtered.length > 1 && next === i % filtered.length) next = (next + 1) % filtered.length
    return next
  })

  const changeCat = (c: string) => {
    setCat(c)
    setIdx(0)
  }

  const copy = () => {
    navigator.clipboard.writeText(`"${current.quote}" — ${current.author}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${current.quote}" — ${current.author}`)}`

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Plus Jakarta Sans',system-ui,sans-serif" }}>
      <NavBar />

      <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(232,93,4,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💬</div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: 'white', margin: 0 }}>Quote Generator</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: '6px 0 0' }}>60+ famous quotes filtered by category</p>
          </div>
        </div>
      </div>
      <TrustStrip />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '28px' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => changeCat(c)}
              style={{ padding: '8px 18px', borderRadius: '999px', border: '1.5px solid', borderColor: cat === c ? CAT_COLORS[c] : '#e2e8f0', background: cat === c ? CAT_COLORS[c] : 'white', color: cat === c ? 'white' : '#64748b', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' as const }}>
              {c}
            </button>
          ))}
        </div>

        {/* Quote card */}
        <div style={{ background: 'linear-gradient(135deg,#0F2A4A,#1a3a5c)', borderRadius: '20px', padding: '48px 40px', marginBottom: '24px', position: 'relative' as const }}>
          <div style={{ fontSize: '80px', color: 'rgba(255,255,255,0.1)', fontFamily: 'serif', lineHeight: 1, marginBottom: '16px' }}>&ldquo;</div>
          <p style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 600, color: 'white', lineHeight: 1.6, margin: '0 0 24px' }}>
            {current.quote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#F48C42' }}>— {current.author}</div>
            <span style={{ background: CAT_COLORS[current.cat] ?? '#0F2A4A', color: 'white', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' as const }}>{current.cat}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
          <button onClick={newQuote}
            style={{ background: '#E85D04', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            New Quote
          </button>
          <button onClick={copy}
            style={{ background: copied ? '#16A34A' : 'white', color: copied ? 'white' : '#0F2A4A', border: '1.5px solid #e2e8f0', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {copied ? '✓ Copied!' : '📋 Copy Quote'}
          </button>
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
            style={{ background: '#1DA1F2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            🐦 Share on Twitter
          </a>
        </div>

        <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '16px' }}>{filtered.length} quotes in &ldquo;{cat}&rdquo; category</p>
      </div>

      <SiteFooter />
    </div>
  )
}

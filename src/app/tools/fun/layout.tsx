import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fun & Decision Tools — Coin Flip, Magic 8 Ball, Random & More | ConvertDox',
  description: 'Free online fun tools: random number generator, coin flip, stopwatch, magic 8 ball, decision maker, team picker, emoji picker, yes/no picker, morse code, and ASCII art.',
  alternates: { canonical: 'https://convertdox.com/tools/fun' },
  openGraph: {
    title: 'Fun & Decision Tools | ConvertDox',
    description: 'Free online fun tools — 10 tools for entertainment and decisions.',
    url: 'https://convertdox.com/tools/fun',
  },
}

export default function FunToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HEX vs RGB Colors: When to Use Each | ConvertDox',
  description: 'HEX vs RGB colours compared — what each format actually represents, when to use each, and how the alpha-channel variants (HEXA, RGBA) fit in.',
  alternates: { canonical: 'https://convertdox.com/compare/hex-vs-rgb' },
  openGraph: {
    title: 'HEX vs RGB Colors: When to Use Each',
    description: 'The practical differences between HEX and RGB, with examples.',
    url: 'https://convertdox.com/compare/hex-vs-rgb',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

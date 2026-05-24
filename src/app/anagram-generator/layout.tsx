import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Anagram Generator — Free Online Tool | ConvertDox',
  description: 'Generate all possible letter rearrangements from any word or phrase. Filter to real English words. Free, browser-based, no signup.',
  alternates: { canonical: 'https://convertdox.com/anagram-generator' },
  openGraph: {
    title: 'Anagram Generator — Free Online Tool | ConvertDox',
    description: 'Generate letter rearrangements from any word — filtered to real English words.',
    url: 'https://convertdox.com/anagram-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

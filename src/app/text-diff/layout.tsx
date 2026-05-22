import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Text Diff Checker — Compare Two Texts Online | ConvertDox',
  description: 'Compare two texts side by side and see exactly what changed. Highlights additions in green and removals in red. Free online text diff tool.',
  keywords: 'text diff, text compare, diff checker, compare text online, text comparison',
  openGraph: { title: 'Text Diff Checker | ConvertDox', description: 'Compare two texts and highlight differences.', url: 'https://convertdox.com/text-diff', siteName: 'ConvertDox', type: 'website' },
  twitter: { card: 'summary', title: 'Text Diff | ConvertDox', description: 'Compare two texts and highlight differences.' },
  alternates: { canonical: 'https://convertdox.com/text-diff' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }

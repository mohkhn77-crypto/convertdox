import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Markdown Cheatsheet — Live Editor & Interactive Reference | ConvertDox',
  description: 'Interactive Markdown cheatsheet with live editor and preview. Click any syntax example to insert it. Covers headings, formatting, links, lists, code, and more.',
  alternates: { canonical: 'https://convertdox.com/markdown-cheatsheet' },
  openGraph: { title: 'Markdown Cheatsheet — Live Editor & Interactive Reference | ConvertDox', description: 'Live Markdown editor with interactive cheatsheet. Click examples to insert them. Free tool.', url: 'https://convertdox.com/markdown-cheatsheet', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }

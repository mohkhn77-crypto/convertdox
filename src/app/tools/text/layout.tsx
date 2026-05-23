import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Tools — Word Counter, Case Converter, Lorem Ipsum & More | ConvertDox',
  description: 'Free online text tools: word counter, character counter, text case converter, lorem ipsum generator, markdown editor, reverse text, remove duplicates, sort lines, find & replace, and more.',
  alternates: { canonical: 'https://convertdox.com/tools/text' },
  openGraph: {
    title: 'Text Tools | ConvertDox',
    description: 'Free online text tools — 15+ tools for writers, developers, and creators.',
    url: 'https://convertdox.com/tools/text',
  },
}

export default function TextToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

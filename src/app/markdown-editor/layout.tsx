import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Online Markdown Editor — Live Preview | ConvertDox',
  description: 'Write and preview Markdown live in your browser. Free online Markdown editor with real-time HTML preview. No signup needed.',
  keywords: 'markdown editor, markdown preview, online markdown, markdown to html',
  openGraph: {
    title: 'Free Online Markdown Editor | ConvertDox',
    description: 'Write and preview Markdown with live HTML rendering in your browser.',
    url: 'https://convertdox.com/markdown-editor',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Markdown Editor | ConvertDox', description: 'Write and preview Markdown live in your browser.' },
  alternates: { canonical: 'https://convertdox.com/markdown-editor' },
}
export default function MarkdownEditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

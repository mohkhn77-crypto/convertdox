import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter — Free Online Tool | ConvertDox',
  description: 'Convert Markdown to HTML with live preview. See raw HTML output and visual preview side by side. Copy HTML with one click.',
  alternates: { canonical: 'https://convertdox.com/markdown-to-html' },
  openGraph: {
    title: 'Markdown to HTML Converter — Free Online Tool | ConvertDox',
    description: 'Convert Markdown to HTML with live preview. See raw HTML and visual preview.',
    url: 'https://convertdox.com/markdown-to-html',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

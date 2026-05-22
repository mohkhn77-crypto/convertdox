import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML to Markdown Converter — Free Online Tool | ConvertDox',
  description: 'Convert HTML code to clean Markdown format online for free. Supports headings, bold, italic, links, images, lists, and code blocks.',
  alternates: { canonical: 'https://convertdox.com/html-to-markdown' },
  openGraph: {
    title: 'HTML to Markdown Converter — Free Online Tool | ConvertDox',
    description: 'Convert HTML code to clean Markdown format online. Supports all common HTML elements.',
    url: 'https://convertdox.com/html-to-markdown',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

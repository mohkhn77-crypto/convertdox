import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is a JSON Formatter? Complete Developer Guide (2026) | ConvertDox',
  description: 'Learn what JSON formatters do, the most common JSON validation errors, before/after examples, and how to format any payload in seconds.',
  alternates: { canonical: 'https://convertdox.com/blog/what-is-json-formatter' },
  openGraph: {
    title: 'What Is a JSON Formatter and Why Every Developer Needs One',
    description: 'Format, validate, and understand JSON in seconds.',
    url: 'https://convertdox.com/blog/what-is-json-formatter',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

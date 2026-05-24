import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON vs YAML: Key Differences Explained (2026) | ConvertDox',
  description: 'JSON vs YAML, head to head — syntax, readability, comments, data types, file size, and when to use each. With side-by-side examples and a clear recommendation.',
  alternates: { canonical: 'https://convertdox.com/compare/json-vs-yaml' },
  openGraph: {
    title: 'JSON vs YAML: Key Differences Explained (2026)',
    description: 'Side-by-side syntax, pros and cons, and when to use which.',
    url: 'https://convertdox.com/compare/json-vs-yaml',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

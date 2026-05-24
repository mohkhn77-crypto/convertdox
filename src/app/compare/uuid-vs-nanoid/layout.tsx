import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UUID vs NanoID: Which Should You Use? | ConvertDox',
  description: 'UUID v4 vs NanoID — length, performance, collision risk, and the practical reasons to choose one over the other in modern applications.',
  alternates: { canonical: 'https://convertdox.com/compare/uuid-vs-nanoid' },
  openGraph: {
    title: 'UUID vs NanoID: Which Should You Use?',
    description: 'A practical comparison of UUID and NanoID identifiers.',
    url: 'https://convertdox.com/compare/uuid-vs-nanoid',
    siteName: 'ConvertDox',
    type: 'article',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

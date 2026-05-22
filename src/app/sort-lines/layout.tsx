import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sort Lines — Free Online Tool | ConvertDox',
  description: 'Sort lines alphabetically A-Z or Z-A, by length, or shuffle randomly. Options for case sensitivity, numeric sort, and removing duplicates while sorting.',
  alternates: { canonical: 'https://convertdox.com/sort-lines' },
  openGraph: {
    title: 'Sort Lines — Free Online Tool | ConvertDox',
    description: 'Sort lines alphabetically A-Z or Z-A, by length, or shuffle randomly. Options for case sensitivity, numeric sort, and removing duplicates while sorting.',
    url: 'https://convertdox.com/sort-lines',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

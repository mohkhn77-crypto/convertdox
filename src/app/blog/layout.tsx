import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Tools, Tips & Tutorials | ConvertDox',
  description: 'Practical guides on online tools, productivity tips, and tutorials for developers, writers, and creators. Free resources from ConvertDox.',
  alternates: { canonical: 'https://convertdox.com/blog' },
  openGraph: {
    title: 'Blog | ConvertDox',
    description: 'Tools, Tips & Tutorials',
    url: 'https://convertdox.com/blog',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

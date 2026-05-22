import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Username Generator — Free Online Tool | ConvertDox',
  description: 'Generate creative random usernames instantly. Choose from Adjective+Noun, GamerTag, Professional, and more formats. Get 10 unique username ideas at once.',
  alternates: { canonical: 'https://convertdox.com/username-generator' },
  openGraph: {
    title: 'Username Generator — Free Online Tool | ConvertDox',
    description: 'Generate creative random usernames instantly. Choose from Adjective+Noun, GamerTag, Professional, and more formats. Get 10 unique username ideas at once.',
    url: 'https://convertdox.com/username-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

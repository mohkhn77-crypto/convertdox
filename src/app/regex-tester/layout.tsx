import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regex Tester — Free Online Tool | ConvertDox',
  description: 'Test and debug regular expressions live with real-time match highlighting. See match count, captured groups, and use common pattern shortcuts.',
  alternates: { canonical: 'https://convertdox.com/regex-tester' },
  openGraph: {
    title: 'Regex Tester — Free Online Tool | ConvertDox',
    description: 'Test and debug regular expressions live with real-time match highlighting.',
    url: 'https://convertdox.com/regex-tester',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

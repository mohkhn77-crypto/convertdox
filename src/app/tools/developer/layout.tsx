import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Tools — JSON, Base64, UUID, Regex & More | ConvertDox',
  description: 'Free online developer tools: JSON formatter, Base64 encoder, URL encoder, CSV to JSON, UUID generator, JWT decoder, hash generator, XML formatter, YAML converter, regex tester, and more.',
  alternates: { canonical: 'https://convertdox.com/tools/developer' },
  openGraph: {
    title: 'Developer Tools | ConvertDox',
    description: 'Free online developer tools — 24+ tools for developers and engineers.',
    url: 'https://convertdox.com/tools/developer',
  },
}

export default function DeveloperToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

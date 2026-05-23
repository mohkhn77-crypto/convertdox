import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Tools — Password Generator, PIN Generator & More | ConvertDox',
  description: 'Free online security tools: cryptographically secure password generator, password strength checker, PIN generator, and username generator.',
  alternates: { canonical: 'https://convertdox.com/tools/security' },
  openGraph: {
    title: 'Security Tools | ConvertDox',
    description: 'Free online security tools — 4 tools to keep your accounts safe.',
    url: 'https://convertdox.com/tools/security',
  },
}

export default function SecurityToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Password Generator — Cryptographically Secure | ConvertDox',
  description: 'Generate strong, cryptographically secure passwords instantly. Customise length, characters, symbols. Free password generator, no signup.',
  keywords: 'password generator, secure password, strong password, random password generator',
  openGraph: {
    title: 'Free Password Generator | ConvertDox',
    description: 'Generate cryptographically secure passwords with custom settings instantly.',
    url: 'https://convertdox.com/password-generator',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Password Generator | ConvertDox', description: 'Generate strong, secure passwords instantly.' },
  alternates: { canonical: 'https://convertdox.com/password-generator' },
}
export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

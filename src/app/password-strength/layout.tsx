import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password Strength Checker — Free Online Tool | ConvertDox',
  description: 'Check password strength instantly. See score, crack time estimate, checklist of security criteria, and tips to improve. 100% private — no data sent.',
  alternates: { canonical: 'https://convertdox.com/password-strength' },
  openGraph: {
    title: 'Password Strength Checker — Free Online Tool | ConvertDox',
    description: 'Check password strength instantly. See score, crack time estimate, checklist of security criteria, and tips to improve. 100% private — no data sent.',
    url: 'https://convertdox.com/password-strength',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

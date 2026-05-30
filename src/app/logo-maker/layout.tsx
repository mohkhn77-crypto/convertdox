import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Logo Maker - Create Text Logos Instantly | ConvertDox',
  description: 'Design a simple text or initials logo in seconds. Choose colors, shape, and font. Download as PNG. Free, no signup needed.',
  alternates: { canonical: 'https://convertdox.com/logo-maker' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

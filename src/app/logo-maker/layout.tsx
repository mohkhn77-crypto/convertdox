import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Logo Maker - Create Simple Text Logos Online | ConvertDox',
  description: 'Create simple text-based logos instantly. Customize colors, fonts, and styles. Free download as PNG. No signup required.',
  alternates: { canonical: 'https://convertdox.com/logo-maker' },
  robots: { index: true, follow: true }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

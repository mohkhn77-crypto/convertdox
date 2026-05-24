import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Color Contrast Checker — Free Online Tool | ConvertDox',
  description: 'Check foreground/background color contrast against WCAG AA and AAA accessibility standards. Live text preview. Free, in-browser.',
  alternates: { canonical: 'https://convertdox.com/color-contrast' },
  openGraph: {
    title: 'Color Contrast Checker — Free Online Tool | ConvertDox',
    description: 'WCAG accessibility contrast ratio checker.',
    url: 'https://convertdox.com/color-contrast',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

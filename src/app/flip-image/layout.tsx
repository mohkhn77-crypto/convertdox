import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Flip Image — Mirror Photos Online Free | ConvertDox',
  description: 'Flip images horizontally or vertically online. Mirror photos in one click. Free image flipper, no signup.',
  alternates: { canonical: 'https://convertdox.com/flip-image' },
  openGraph: {
    title: 'Flip Image — Mirror Photos Online Free',
    description: 'Flip and mirror images online. Free, no signup.',
    url: 'https://convertdox.com/flip-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

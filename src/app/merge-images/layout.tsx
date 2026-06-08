import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Merge Images — Combine Images Online Free | ConvertDox',
  description: 'Combine multiple images into one. Stack vertically or place side by side horizontally. Free online image merger, no signup required.',
  alternates: { canonical: 'https://convertdox.com/merge-images' },
  openGraph: {
    title: 'Merge Images — Combine Images Online Free',
    description: 'Combine multiple images into one vertically or horizontally. Free, no signup.',
    url: 'https://convertdox.com/merge-images',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

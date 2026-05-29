import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Background Remover — Remove Image Background Free | ConvertDox',
  description: 'Remove backgrounds from images automatically online. Get a transparent PNG in seconds. Free, no signup required.',
  alternates: { canonical: 'https://convertdox.com/bg-remove' },
  openGraph: {
    title: 'Background Remover — Remove Image Background Free',
    description: 'Remove image backgrounds automatically online. Free.',
    url: 'https://convertdox.com/bg-remove',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

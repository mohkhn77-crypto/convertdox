import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Favicon Generator — Create Favicon from Image Free | ConvertDox',
  description: 'Create favicons for your website from any image online. Generate ICO and PNG favicon files. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/favicon-from-image' },
  openGraph: {
    title: 'Favicon Generator — Create Favicon from Image Free',
    description: 'Create website favicons from images online. Free.',
    url: 'https://convertdox.com/favicon-from-image',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

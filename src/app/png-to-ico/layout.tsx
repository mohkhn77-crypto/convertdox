import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PNG to ICO — Convert PNG to Icon Free | ConvertDox',
  description: 'Convert PNG images to ICO icon files for websites and applications. Free PNG to ICO converter, no signup.',
  alternates: { canonical: 'https://convertdox.com/png-to-ico' },
  openGraph: {
    title: 'PNG to ICO — Convert PNG to Icon Free',
    description: 'Convert PNG to ICO icon files online. Free, no signup.',
    url: 'https://convertdox.com/png-to-ico',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

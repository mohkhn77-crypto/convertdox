import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'PDF to PowerPoint — Convert PDF to PPTX Free | ConvertDox',
  description: 'Convert PDF presentations to editable PowerPoint files online. Preserve slides and layout. Free PDF to PPTX converter.',
  alternates: { canonical: 'https://convertdox.com/pdf-to-ppt' },
  openGraph: {
    title: 'PDF to PowerPoint — Convert PDF to PPTX Free',
    description: 'Convert PDF to PowerPoint slides online. Free, no signup.',
    url: 'https://convertdox.com/pdf-to-ppt',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

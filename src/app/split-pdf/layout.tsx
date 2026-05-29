import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Split PDF — Split PDF Pages Online Free | ConvertDox',
  description: 'Split PDF files into separate pages or custom ranges online. Free PDF splitter, no signup, instant download.',
  alternates: { canonical: 'https://convertdox.com/split-pdf' },
  openGraph: {
    title: 'Split PDF — Split PDF Pages Online Free',
    description: 'Split PDF into separate pages online. Free, no signup.',
    url: 'https://convertdox.com/split-pdf',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

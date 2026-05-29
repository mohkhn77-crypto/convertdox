import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Cover Letter Generator — Free Professional Letters | ConvertDox',
  description: 'Generate professional cover letters in seconds with AI. Enter job title and skills, get a polished letter. Free, no signup.',
  alternates: { canonical: 'https://convertdox.com/ai-cover-letter' },
  openGraph: {
    title: 'AI Cover Letter Generator — Free Professional Letters',
    description: 'Generate professional cover letters in seconds with AI. Free.',
    url: 'https://convertdox.com/ai-cover-letter',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

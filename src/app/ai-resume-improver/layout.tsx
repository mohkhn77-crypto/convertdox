import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Resume Improver — Enhance Resume Bullets | ConvertDox',
  description: 'Transform basic resume bullets into powerful achievement statements with AI. Free resume optimizer, no signup required.',
  alternates: { canonical: 'https://convertdox.com/ai-resume-improver' },
  openGraph: {
    title: 'AI Resume Improver — Enhance Resume Bullets',
    description: 'Transform resume bullets into powerful achievements with AI. Free.',
    url: 'https://convertdox.com/ai-resume-improver',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI Email Writer — Write Professional Emails Free | ConvertDox',
  description: 'Generate professional emails for any purpose with AI. Choose tone, recipient, and context. Free email writer, no signup.',
  alternates: { canonical: 'https://convertdox.com/ai-email-writer' },
  openGraph: {
    title: 'AI Email Writer — Write Professional Emails Free',
    description: 'Generate professional emails instantly with AI. Free, no signup.',
    url: 'https://convertdox.com/ai-email-writer',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

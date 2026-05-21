import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact ConvertDox — Get in Touch | ConvertDox',
  description: 'Contact the ConvertDox team. Report a bug, suggest a tool, or ask a question. We respond to all messages.',
  keywords: 'contact convertdox, support, feedback, tool request',
  openGraph: {
    title: 'Contact ConvertDox',
    description: 'Get in touch with the ConvertDox team — feedback, bug reports, tool requests.',
    url: 'https://convertdox.com/contact',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Contact ConvertDox', description: 'Get in touch — bug reports, feedback or tool requests.' },
  alternates: { canonical: 'https://convertdox.com/contact' },
}
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

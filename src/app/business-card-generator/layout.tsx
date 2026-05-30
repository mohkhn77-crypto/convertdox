import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Business Card Generator - Create Business Cards Online | ConvertDox',
  description: 'Design and download professional business cards as PDF. Free business card maker with your name, title, company, and contact details. Print-ready 2-up layout.',
  alternates: { canonical: 'https://convertdox.com/business-card-generator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

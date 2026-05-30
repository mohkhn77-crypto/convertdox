import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Resume Builder - Create Professional Resumes Online | ConvertDox',
  description: 'Build a professional resume with work experience, education, and skills. Download as PDF instantly. Free resume maker — no signup, no templates to pay for.',
  alternates: { canonical: 'https://convertdox.com/resume-builder' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

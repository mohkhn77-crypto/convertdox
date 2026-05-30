import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator - EDD Calculator | ConvertDox',
  description: 'Calculate your pregnancy due date from your last menstrual period. Find current week, trimester, conception date, and key pregnancy milestones.',
  alternates: { canonical: 'https://convertdox.com/pregnancy-due-date-calculator' },
  robots: { index: true, follow: true },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

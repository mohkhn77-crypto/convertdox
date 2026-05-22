import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pomodoro Timer — Free Online Tool | ConvertDox',
  description: 'Free online Pomodoro timer with work, short break, and long break modes. Boost productivity with the proven 25-minute focus technique.',
  alternates: { canonical: 'https://convertdox.com/pomodoro-timer' },
  openGraph: {
    title: 'Pomodoro Timer — Free Online Tool | ConvertDox',
    description: 'Free online Pomodoro timer with work and break modes to boost your productivity.',
    url: 'https://convertdox.com/pomodoro-timer',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

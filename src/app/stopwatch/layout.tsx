import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Free Online Stopwatch & Countdown Timer | ConvertDox',
  description: 'Free online stopwatch and countdown timer. Lap timer, pause, reset. Works in your browser with no installation. No signup required.',
  keywords: 'stopwatch, countdown timer, online timer, lap timer, free stopwatch',
  openGraph: {
    title: 'Free Online Stopwatch & Timer | ConvertDox',
    description: 'Free stopwatch and countdown timer. Lap times, pause, reset — works in your browser.',
    url: 'https://convertdox.com/stopwatch',
    siteName: 'ConvertDox',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Free Stopwatch & Timer | ConvertDox', description: 'Free online stopwatch and countdown timer in your browser.' },
  alternates: { canonical: 'https://convertdox.com/stopwatch' },
}
export default function StopwatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

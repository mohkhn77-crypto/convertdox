import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Words to Number — Convert Written Numbers to Digits | ConvertDox',
  description: 'Convert written number words to digits. "five hundred and twenty-three" becomes 523. Supports up to trillions. Instant real-time conversion. Free tool.',
  alternates: { canonical: 'https://convertdox.com/words-to-number' },
  openGraph: { title: 'Words to Number — Convert Written Numbers to Digits | ConvertDox', description: 'Convert written number words to digits instantly. Supports up to trillions. Free online tool.', url: 'https://convertdox.com/words-to-number', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }

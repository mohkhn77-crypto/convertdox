import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'ASCII Art Generator — Convert Text to ASCII Art | ConvertDox',
  description: 'Convert text to ASCII art online. Choose from Big and Small font styles. Copy or download your ASCII art as a text file. Free online tool.',
  alternates: { canonical: 'https://convertdox.com/ascii-art' },
  openGraph: { title: 'ASCII Art Generator — Convert Text to ASCII Art | ConvertDox', description: 'Type text and convert it to ASCII art instantly. Multiple font styles. Copy or download. Free.', url: 'https://convertdox.com/ascii-art', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }

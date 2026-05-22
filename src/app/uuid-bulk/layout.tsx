import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'UUID Bulk Generator — Generate up to 1000 UUIDs | ConvertDox',
  description: 'Generate up to 1000 UUIDs at once. Choose uppercase/lowercase, with/without hyphens, or braces. Export as TXT, JSON, CSV, or JavaScript array.',
  alternates: { canonical: 'https://convertdox.com/uuid-bulk' },
  openGraph: { title: 'UUID Bulk Generator — Generate up to 1000 UUIDs | ConvertDox', description: 'Bulk generate UUIDs with formatting options. Export as TXT, JSON, CSV, or JS array.', url: 'https://convertdox.com/uuid-bulk', siteName: 'ConvertDox', type: 'website' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }

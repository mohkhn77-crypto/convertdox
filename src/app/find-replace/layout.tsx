import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find & Replace Text — Free Online Tool | ConvertDox',
  description: 'Multi-pattern text find and replace tool. Supports regex, case sensitive, whole word matching. Live preview with highlighted replacements and match count.',
  alternates: { canonical: 'https://convertdox.com/find-replace' },
  openGraph: {
    title: 'Find & Replace Text — Free Online Tool | ConvertDox',
    description: 'Multi-pattern text find and replace tool. Supports regex, case sensitive, whole word matching. Live preview with highlighted replacements and match count.',
    url: 'https://convertdox.com/find-replace',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

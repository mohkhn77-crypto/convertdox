import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Palindrome Checker — Free Online Tool | ConvertDox',
  description: 'Check if text reads the same forwards and backwards. Options to ignore spaces, case, and punctuation. Free in your browser.',
  alternates: { canonical: 'https://convertdox.com/palindrome-checker' },
  openGraph: {
    title: 'Palindrome Checker — Free Online Tool | ConvertDox',
    description: 'Check if any word or phrase is a palindrome.',
    url: 'https://convertdox.com/palindrome-checker',
    siteName: 'ConvertDox',
    type: 'website',
  },
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

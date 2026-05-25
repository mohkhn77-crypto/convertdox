import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Convert File — Choose Output Format | ConvertDox',
  description: 'Select your desired output format after uploading a file to ConvertDox. Free online file converter.',
  alternates: { canonical: 'https://convertdox.com/convert' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

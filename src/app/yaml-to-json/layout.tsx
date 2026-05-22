import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YAML to JSON Converter — Free Online Tool | ConvertDox',
  description: 'Convert YAML to JSON and JSON to YAML online for free. Bidirectional conversion with error detection and formatted output.',
  alternates: { canonical: 'https://convertdox.com/yaml-to-json' },
  openGraph: {
    title: 'YAML to JSON Converter — Free Online Tool | ConvertDox',
    description: 'Convert YAML to JSON and JSON to YAML online with error detection.',
    url: 'https://convertdox.com/yaml-to-json',
    siteName: 'ConvertDox',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

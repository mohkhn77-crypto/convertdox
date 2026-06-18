import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'File Security & Auto-Delete Policy - ConvertDox',
  description: 'How ConvertDox secures your files: HTTPS encryption, isolated processing, and automatic deletion after conversion. Files are never permanently stored.',
  alternates: { canonical: 'https://convertdox.com/security' },
}

export default function Page() {
  return (
    <LegalPage
      title="File Security & Auto-Delete Policy"
      fileName="security"
      description="How we secure and auto-delete your files"
    />
  )
}

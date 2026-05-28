import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Privacy Policy - ConvertDox',
  description: 'Learn how ConvertDox collects, uses, and protects your data. GDPR and CCPA compliant privacy-first online tools platform.',
}

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      fileName="privacy-policy"
      description="How we handle your data"
    />
  )
}

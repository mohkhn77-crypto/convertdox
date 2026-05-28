import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Cookie Policy - ConvertDox',
  description: 'How ConvertDox uses cookies. Manage your cookie preferences.',
}

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      fileName="cookie-policy"
      description="How we use cookies"
    />
  )
}

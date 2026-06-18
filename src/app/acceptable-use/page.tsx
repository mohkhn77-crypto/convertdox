import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Acceptable Use Policy - ConvertDox',
  description: 'Permitted and prohibited uses of ConvertDox tools. Our acceptable use policy covering security, legal content, fraud, AI misuse, and enforcement.',
  alternates: { canonical: 'https://convertdox.com/acceptable-use' },
}

export default function Page() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      fileName="acceptable-use"
      description="Permitted and prohibited uses of ConvertDox"
    />
  )
}

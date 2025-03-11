import type { Metadata } from 'next'
import { ContactForm } from '@/components/email/form'
import { metaData } from '@/config'

export const metadata: Metadata = {
  title: `${metaData.title} - Contato`,
  description: 'Entre em contato comigo'
}

export default async function ContactPage() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-medium tracking-tight">Contato</h2>
      <div>
        <ContactForm />
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { ContactForm } from '@/components/email/form'
import { site } from '@/config'
import { PageTransition } from '@/components/transition'

export const metadata: Metadata = {
  title: `${site.title} - Contato`,
  description: 'Entre em contato comigo'
}

export default async function ContactPage() {
  return (
    <PageTransition>
      <section>
        <h2 className="mb-4 text-xl font-medium tracking-tight">Contato</h2>
        <div>
          <ContactForm />
        </div>
      </section>
    </PageTransition>
  )
}

import Link from 'next/link'
import { metaData } from '@/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${metaData.title} - 404`,
  description: 'Página não encontrada'
}

export default function NotFound() {
  return (
    <div>
      <h2>Erro - 404</h2>
      <p>Página não encontrada</p>
      <p>
        <Link href="/" className="inline-block px-3 py-2 bg-indigo-600 rounded-md decoration-none">Voltar</Link>
      </p>
    </div>
  )
}

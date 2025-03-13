import Link from 'next/link'
import { projects } from './data'
import { metaData } from '@/config'
import { Card } from '@/components/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${metaData.title} - Projetos`,
  description: 'Alguns de meus projetos'
}

export default function Projects() {
  return (
    <section>
      <h2 className="text-xl font-medium tracking-tight mb-2">Projetos</h2>
      <div>
        {projects.map((project, index) => (
          <Link
            href={project.url}
            target='_blank'
            key={index}
            className="hover:underline-0 hover:decoration-0"
           >
            <Card
              title={project.title}
              description={project.description}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

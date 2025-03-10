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
      <h2 className="text-xl font-medium tracking-tight">Projetos</h2>
      <div>
        {projects.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </section>
  )
}

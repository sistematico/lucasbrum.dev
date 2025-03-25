import { projects } from './data'
import { site } from '@/config'
import { Card } from '@/components/card'
import type { Metadata } from 'next'
import { PageTransition } from '@/components/transition'

export const metadata: Metadata = {
  title: `${site.title} - Projetos`,
  description: 'Alguns de meus projetos'
}

export default function Projects() {
  return (
    <PageTransition>
      <section>
        <h2 className="text-xl font-medium tracking-tight mb-2">Projetos</h2>
        <div>
          {projects.map((project, index) => (
            <Card project={project} key={index} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}

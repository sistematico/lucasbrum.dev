import React from 'react'
import type { Metadata } from 'next'
import { projects } from './data'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Meus projetos'
}

export default function Projects() {
  return (
    <section>
      <h2 className="mb-16 text-xl font-medium tracking-tight">Projetos</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="projetos block group hover:opacity-80 transition-all duration-200 rounded-md bg-zinc-900 px-5 py-8"
          >
            <div className="flex flex-col">
              <div className="w-full flex justify-between items-baseline">
                <span className="text-black dark:text-white font-medium tracking-tight">
                  {project.title}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {project.year}
                </span>
              </div>
              <p className="prose prose-neutral dark:prose-invert pt-3">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

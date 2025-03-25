import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types'

export function Card({ project }: { project: Project }) {
  return (
    <Link
      href={project.url}
      target="_blank"
      className="hover:underline-0 hover:decoration-0"
    >
      <div className="text-black/80 dark:text-white/80 mx-auto w-full rounded-md border-2 border-black/20 hover:bg-black/10 hover:shadow-md transition-all duration-500 p-4">
        <div className="flex space-x-4">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={50}
              height={50}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="size-20 rounded-full bg-gray-200"></div>
          )}
          <div className="flex-1 space-y-6 py-1">
            {project.title}
            <div className="space-y-3 text-sm italic">
              {project.description}
              {/* <div className="text-sm"></div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme'
import { metaData } from '@/config'
import { usePathname } from 'next/navigation'

const navItems = {
  '/posts': { name: 'Blog' },
  '/projetos': { name: 'Projetos' },
  '/favoritos': { name: 'Favoritos' },
  '/contato': { name: 'Contato' }
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="logo text-3xl font-semibold tracking-tight">
            {metaData.title}
          </Link>
        </div>
        <div className="flex flex-row flex-wrap gap-4 mt-6 md:mt-0 md:ml-auto justify-center items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className={
                pathname === path
                  ? 'transition-all text-blue-600 hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative'
                  : 'transition-all text-black dark:text-white hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative'
              }
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  )
}

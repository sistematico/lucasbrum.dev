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
        {/* Aplicando um container com overflow para rolagem horizontal */}
        <div className="overflow-x-auto scrollbar-hide mt-6 md:mt-0 md:ml-auto">
          <div className="flex flex-row flex-nowrap gap-4 justify-start items-center min-w-max px-0.5 py-1">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className={
                  pathname === path
                    ? 'transition-all whitespace-nowrap text-blue-600 hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative'
                    : 'transition-all whitespace-nowrap text-black dark:text-white hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative'
                }
              >
                {name}
              </Link>
            ))}
            <div className="flex-shrink-0">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme'
import { site } from '@/config'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Briefcase, Heart, MailPlus } from 'lucide-react'

// Objeto com informações dos itens de navegação
const navItems = {
  '/': { name: 'Home', icon: Home, color: 'blue-500' },
  '/posts': { name: 'Blog', icon: BookOpen, color: 'green-500' },
  '/projetos': { name: 'Projetos', icon: Briefcase, color: 'purple-500' },
  '/favoritos': { name: 'Favoritos', icon: Heart, color: 'red-500' },
  '/contato': { name: 'Contato', icon: MailPlus, color: 'amber-500' }
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo/título do site */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          <Link href="/" className="logo text-3xl font-semibold tracking-tight whitespace-nowrap">
            {site.title}
          </Link>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-x-4 gap-y-2 px-2 flex-wrap">
          {Object.entries(navItems).map(([path, { name, icon: Icon, color }]) => (
            <Link
              key={path}
              href={path}
              className={`
                nav-item relative py-1 px-2
                flex items-center gap-1.5
                text-neutral-800 dark:text-neutral-300 
                hover:text-neutral-900 dark:hover:text-neutral-100
                transition-colors duration-300
                nav-item-${color}
                ${pathname === path ? 'is-active' : ''}
              `}
            >
              {Icon && <Icon size={18} className="inline-block" />}
              <span>{name}</span>
            </Link>
          ))}
          <div className="flex-none py-1 px-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  )
}
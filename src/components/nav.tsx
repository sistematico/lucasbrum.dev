'use client'

import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme'
import { site } from '@/config'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Briefcase, Heart, MailPlus, Scroll } from 'lucide-react'

// Objeto com informações dos itens de navegação
const navItems = {
  '/': { name: 'Home', icon: Home, color: 'blue-500' },
  '/posts': { name: 'Blog', icon: BookOpen, color: 'green-500' },
  '/snippets': { name: 'Snippets', icon: Scroll, color: 'cyan-500' },
  '/projetos': { name: 'Projetos', icon: Briefcase, color: 'purple-500' },
  '/favoritos': { name: 'Favoritos', icon: Heart, color: 'red-500' },
  '/contato': { name: 'Contato', icon: MailPlus, color: 'amber-500' }
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <div className="flex flex-wrap items-center justify-between">
        {/* Logo/título do site */}
        <div className="flex mr-4">
          <Link href="/" className="logo text-3xl font-semibold tracking-tight whitespace-nowrap">
            {site.title}
          </Link>
        </div>
        
        {/* Menu de navegação */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 py-2">
          {Object.entries(navItems).map(([path, { name, icon: Icon, color }]) => (
            <Link
              key={path}
              href={path}
              prefetch={true}
              className={`
                nav-item relative text-sm py-1 px-1
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
          
          {/* Theme switcher como um item de menu */}
          <div className="py-1 px-1 cursor-pointer">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  )
}
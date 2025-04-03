'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface TagLinkProps {
  href: string
  className: string
  children: ReactNode
}

export function TagLink({ href, className, children }: TagLinkProps) {
  return (
    <Link 
      href={href}
      className={className}
      onClick={(e) => e.stopPropagation()}
      suppressHydrationWarning={true}
    >
      {children}
    </Link>
  )
}
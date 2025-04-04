'use client'

import Link from 'next/link'
import { Navbar } from '@/components/nav'
import { site } from '@/config'
import { HardHat } from 'lucide-react'

export function Header() {
  return (
    <nav className="w-full">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex mr-4">
          <Link href="/" className="group logo text-3xl font-semibold tracking-tight whitespace-nowrap">
            <HardHat size={38} className="inline-block mr-1 -mt-2 transition group-hover:rotate-[.42rad]" />
            {site.title}
          </Link>
        </div>
        <Navbar />
      </div>
    </nav>
  )
}
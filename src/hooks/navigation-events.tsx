'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function useNavigationEvent(callback: (url: string) => void) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    callback(`${pathname}${searchParams ? `?${searchParams}` : ''}`)
  }, [pathname, searchParams, callback])
}
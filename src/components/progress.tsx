'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [pathname, searchParams])
  
  if (!isLoading) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* <div className="h-1 w-full bg-blue-100 dark:bg-blue-900"> */}
      <div className="h-1 w-full">
        <div className="h-1 bg-blue-600 animate-[loader_1s_ease-in-out_infinite]"></div>
      </div>
    </div>
  )
}
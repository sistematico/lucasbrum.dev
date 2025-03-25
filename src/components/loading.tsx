'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export function LoadingIndicator() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    // Quando a rota muda, mostra o loading
    setIsLoading(true)
    
    // Define um tempo máximo de loading (3 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    
    // Esconde o loading depois de um pequeno delay para dar tempo da página renderizar
    const hideLoader = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(hideLoader)
    }
  }, [pathname, searchParams])
  
  if (!isLoading) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-b-md shadow-md flex items-center space-x-2">
        <Loader2 className="animate-spin h-4 w-4" />
        <span>Carregando...</span>
      </div>
    </div>
  )
}
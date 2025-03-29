'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'

export function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const prevPathnameRef = useRef(pathname)
  const prevSearchParamsRef = useRef(searchParams)
  
  // Função para resetar o estado do loader
  const resetLoader = useCallback(() => {
    setProgress(0)
    setLoading(false)
  }, [])
  
  // Função para iniciar o carregamento
  const startLoading = useCallback(() => {
    setLoading(true)
    setProgress(0)
  }, [])
  
  // Função para completar o carregamento
  const completeLoading = useCallback(() => {
    setProgress(100)
    // Espera um pouco para a animação terminar antes de esconder o loader
    const timeout = setTimeout(() => {
      resetLoader()
    }, 500)
    return () => clearTimeout(timeout)
  }, [resetLoader])
  
  // Detectar mudanças de rota
  useEffect(() => {
    if (
      pathname !== prevPathnameRef.current || 
      searchParams.toString() !== prevSearchParamsRef.current.toString()
    ) {
      prevPathnameRef.current = pathname
      prevSearchParamsRef.current = searchParams
      startLoading()
    }
  }, [pathname, searchParams, startLoading])
  
  // Efeito para simular o progresso
  useEffect(() => {
    if (!loading) return
    
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 100
        const remaining = 100 - prevProgress
        const increment = Math.max(0.5, (remaining / 10) * 0.5)
        return Math.min(90, prevProgress + increment)
      })
    }, 100)
    
    return () => clearInterval(progressInterval)
  }, [loading])
  
  // Efeito para finalizar o carregamento
  useEffect(() => {
    if (!loading) return
    
    const minLoadingTimeout = setTimeout(() => {
      if (document.readyState === 'complete') {
        completeLoading()
      } else {
        const handleComplete = () => completeLoading()
        window.addEventListener('load', handleComplete)
        return () => window.removeEventListener('load', handleComplete)
      }
    }, 500)
    
    const maxLoadingTimeout = setTimeout(() => {
      completeLoading()
    }, 3000)
    
    return () => {
      clearTimeout(minLoadingTimeout)
      clearTimeout(maxLoadingTimeout)
    }
  }, [loading, completeLoading])
  
  if (!loading && progress === 0) return null
  
  return (
    <div 
      className="fixed top-0 left-0 z-50 h-1 bg-blue-600 transition-transform duration-150 ease-out origin-left"
      style={{ 
        transform: `scaleX(${progress / 100})`,
        opacity: (loading || progress < 100) ? 1 : 0,
        transition: progress === 100 ? 'transform 0.2s ease-out, opacity 0.4s ease-out 0.2s' : 'transform 0.2s ease-out'
      }}
    />
  )
}
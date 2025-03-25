'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Loader2 } from 'lucide-react'

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
    // Verifica se a rota realmente mudou para evitar triggers desnecessários
    if (
      pathname !== prevPathnameRef.current || 
      searchParams.toString() !== prevSearchParamsRef.current.toString()
    ) {
      // Atualiza as referências
      prevPathnameRef.current = pathname
      prevSearchParamsRef.current = searchParams
      
      // Inicia o carregamento apenas quando a rota muda
      startLoading()
    }
  }, [pathname, searchParams, startLoading])
  
  // Efeito para simular o progresso
  useEffect(() => {
    if (!loading) return
    
    // Simula o progresso de carregamento
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 100
        
        // Algoritmo para progresso não-linear
        const remaining = 100 - prevProgress
        const increment = Math.max(0.5, (remaining / 10) * 0.5)
        
        // Limita a 90% para esperar o carregamento real
        return Math.min(90, prevProgress + increment)
      })
    }, 100)
    
    return () => {
      clearInterval(progressInterval)
    }
  }, [loading])
  
  // Efeito para finalizar o carregamento
  useEffect(() => {
    if (!loading) return
    
    // Simula o tempo de carregamento mínimo
    const minLoadingTimeout = setTimeout(() => {
      // Detecta quando o documento está pronto
      if (document.readyState === 'complete') {
        completeLoading()
      } else {
        // Espera o documento completar
        const handleComplete = () => {
          completeLoading()
        }
        window.addEventListener('load', handleComplete)
        return () => window.removeEventListener('load', handleComplete)
      }
    }, 500) // Tempo mínimo de carregamento para feedback visual
    
    // Tempo máximo de carregamento (fallback)
    const maxLoadingTimeout = setTimeout(() => {
      completeLoading()
    }, 5000) // 5 segundos no máximo
    
    return () => {
      clearTimeout(minLoadingTimeout)
      clearTimeout(maxLoadingTimeout)
    }
  }, [loading, completeLoading])
  
  // Não renderize nada se não estiver carregando e o progresso for zero
  if (!loading && progress === 0) return null
  
  return (
    <>
      {/* Barra de progresso estilo YouTube */}
      <div 
        className="fixed top-0 left-0 z-50 h-1 bg-red-600 transition-transform duration-150 ease-out origin-left"
        style={{ 
          transform: `scaleX(${progress / 100})`,
          opacity: (loading || progress < 100) ? 1 : 0,
          transition: progress === 100 ? 'transform 0.2s ease-out, opacity 0.4s ease-out 0.2s' : 'transform 0.2s ease-out'
        }}
      />
      
      {/* Indicador de carregamento (opcional) */}
      {loading && progress < 100 && (
        <div className="fixed top-2 right-2 z-50 flex items-center gap-2 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 px-3 py-1 rounded-full text-sm shadow-md">
          <Loader2 className="animate-spin h-4 w-4" />
          <span>Carregando</span>
        </div>
      )}
    </>
  )
}
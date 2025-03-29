// src/components/PersistentVideo.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'
import { RefreshCw } from 'lucide-react'

// Lista de vídeos disponíveis
const VIDEOS = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA']

// Chave para localStorage
const STORAGE_KEY = 'youtube_persistent_state'

export default function PersistentVideo() {
  const pathname = usePathname()
  const [videoId, setVideoId] = useState('')
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)
  const initialLoadRef = useRef(false)

  // Inicializar o componente
  useEffect(() => {
    if (typeof window === 'undefined' || mounted) return

    try {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        const { id, timestamp } = JSON.parse(storedData)
        // Verificar se o vídeo foi armazenado nas últimas 2 horas
        if (Date.now() - timestamp < 2 * 60 * 60 * 1000) {
          setVideoId(id)
          setMounted(true)
          return
        }
      }
    } catch (error) {
      console.error('Erro ao carregar vídeo:', error)
    }

    // Selecionar vídeo aleatório
    const randomIndex = Math.floor(Math.random() * VIDEOS.length)
    const newVideoId = VIDEOS[randomIndex]
    
    setVideoId(newVideoId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      id: newVideoId,
      timestamp: Date.now()
    }))
    
    setMounted(true)
  }, [mounted])

  // Preservar o player quando a rota mudar
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    // Encontrar o elemento iframe gerado pelo YouTubeEmbed
    const findYouTubeIframe = () => {
      if (!containerRef.current) return null
      const iframe = containerRef.current.querySelector('iframe')
      return iframe
    }

    // Preservar o player existente durante a navegação
    if (playerRef.current) return

    // Verifica se precisamos inicializar o player pela primeira vez
    if (!initialLoadRef.current) {
      initialLoadRef.current = true
      return
    }

    // Encontrar o iframe do YouTube
    const iframe = findYouTubeIframe()
    if (iframe) {
      // Armazenar referência ao player
      if (iframe.parentElement instanceof HTMLDivElement) {
        playerRef.current = iframe.parentElement
      }

      // Mover para um elemento fixo no DOM que não será afetado pela navegação
      if (playerRef.current && typeof document !== 'undefined') {
        // Criar um container fixo se não existir
        let fixedContainer = document.getElementById('fixed-youtube-container')
        if (!fixedContainer) {
          fixedContainer = document.createElement('div')
          fixedContainer.id = 'fixed-youtube-container'
          fixedContainer.style.position = 'fixed'
          fixedContainer.style.bottom = '0'
          fixedContainer.style.left = '0'
          fixedContainer.style.width = '100%'
          fixedContainer.style.zIndex = '50'
          document.body.appendChild(fixedContainer)
        }

        // Mover o player para o container fixo
        fixedContainer.appendChild(playerRef.current)
      }
    }
  }, [pathname, mounted])
  
  // Função para carregar um novo vídeo
  const refreshVideo = () => {
    // Filtrar o vídeo atual para não repetir
    const availableVideos = VIDEOS.filter(id => id !== videoId)
    const randomIndex = Math.floor(Math.random() * availableVideos.length)
    const newVideoId = availableVideos[randomIndex]
    
    setVideoId(newVideoId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      id: newVideoId,
      timestamp: Date.now()
    }))
  }

  if (!videoId || !mounted) return null

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute top-3 right-3 z-10">
        <button 
          onClick={refreshVideo}
          className="bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 p-2 rounded-full text-black dark:text-white hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-300 shadow-md"
          title="Carregar novo vídeo"
          aria-label="Carregar novo vídeo"
        >
          <RefreshCw size={16} />
        </button>
      </div>
      <YouTubeEmbed
        videoid={videoId}
        height={400}
        params="rel=0&color=white&autoplay=1"
      />
    </div>
  )
}
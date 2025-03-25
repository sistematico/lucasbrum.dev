'use client'

import { Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'

export function YoutubeVideo() {
  const [videoId, setVideoId] = useState('')
  
  useEffect(() => {
    const videos = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA']
    
    const storedData = localStorage.getItem('youtubeVideoData')
    let shouldLoadNewVideo = true
    
    if (storedData) {
      try {
        const { id, timestamp } = JSON.parse(storedData)
        const currentTime = Date.now()
        // const expirationTime = 1000 * 60 * 60 * 2 // 2 horas em milissegundos
        const expirationTime = 1000 * 60 * 5 // 5 minutos para testes
        
        // Verificar se o timestamp ainda é válido
        if (id && timestamp && currentTime - timestamp < expirationTime) {
          setVideoId(id)
          shouldLoadNewVideo = false
        }
      } catch (error) {
        console.error('Erro ao processar dados do vídeo:', error)
      }
    }
    
    // Se precisamos carregar um novo vídeo (dados expirados ou primeira visita)
    if (shouldLoadNewVideo) {
      const videoIndex = Math.floor(Math.random() * videos.length)
      const newVideoId = videos[videoIndex]
      
      // Salvar o novo ID e timestamp atual
      localStorage.setItem('youtubeVideoData', JSON.stringify({
        id: newVideoId,
        timestamp: Date.now()
      }))
      
      setVideoId(newVideoId)
    }
  }, [])

  if (!videoId) return null
  
  return (
    <YouTubeEmbed 
      videoid={videoId} 
      height={400} 
      params="rel=0&color=white" 
    />
  )
}

export function YoutubeSkeleton({ className = '' }: { className: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative overflow-hidden rounded-md bg-muted pb-[56.25%]">
        {/* Video thumbnail area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Play button */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-md transition-transform hover:scale-105">
            <Play className="h-8 w-8" />
          </div>
        </div>

        {/* Loading shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-[shimmer_1.5s_infinite]" />

        {/* Bottom controls bar */}
        <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center justify-between bg-background/80 px-4">
          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-muted-foreground/20">
            <div className="h-full w-0 rounded-full bg-muted-foreground/40 animate-[progress_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Video title placeholder */}
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
      </div>
    </div>
  )
}

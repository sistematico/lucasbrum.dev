'use client'

import { useEffect, useState } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'

export function RandomVideo() {
  const [videoId, setVideoId] = useState<string>('')
  
  useEffect(() => {
    const videos = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y']
    
    // Tentar obter o videoId e timestamp do localStorage
    const storedData = localStorage.getItem('youtubeVideoData')
    let shouldLoadNewVideo = true
    
    if (storedData) {
      try {
        const { id, timestamp } = JSON.parse(storedData)
        const currentTime = Date.now()
        // const expirationTime = 1000 * 60 * 60 * 2 // 2 horas em milissegundos
        const expirationTime = 1000 * 60 * 5 // 5 minutos para testes
        
        // Verificar se o timestamp ainda é válido (menos de 2 horas)
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
      const randomSeed = Math.random()
      const newVideoId = videos[Math.floor(randomSeed * videos.length)]
      
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
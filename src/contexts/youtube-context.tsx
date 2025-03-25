'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type YoutubeContextType = {
  videoId: string;
  loadNewVideo: () => void;
}

const YoutubeContext = createContext<YoutubeContextType>({ 
  videoId: '', 
  loadNewVideo: () => {} 
})

export function YoutubeProvider({ children }: { children: ReactNode }) {
  const [videoId, setVideoId] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const videos = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA']
  
  const loadNewVideo = () => {
    // Selecionar um vídeo aleatório diferente do atual
    const newVideos = videos.filter(id => id !== videoId)
    const videoIndex = Math.floor(Math.random() * newVideos.length)
    const newVideoId = newVideos[videoIndex]
    
    // Salvar no localStorage
    localStorage.setItem('youtubeVideoData', JSON.stringify({
      id: newVideoId,
      timestamp: Date.now()
    }))
    
    // Atualizar estado
    setVideoId(newVideoId)
  }

  useEffect(() => {
    // Este código só executará no cliente
    setIsMounted(true)
    
    const storedData = localStorage.getItem('youtubeVideoData')
    let selectedId = ''
    
    if (storedData) {
      try {
        const { id, timestamp } = JSON.parse(storedData)
        const currentTime = Date.now()
        // const expirationTime = 1000 * 60 * 60 * 2 // 2 horas
        const expirationTime = 1000 * 60 * 2 // 2 minutos
        
        if (id && timestamp && currentTime - timestamp < expirationTime) {
          selectedId = id
        }
      } catch (error) {
        console.error('Erro ao processar dados do vídeo:', error)
      }
    }
    
    if (!selectedId) {
      const videoIndex = Math.floor(Math.random() * videos.length)
      selectedId = videos[videoIndex]
      
      localStorage.setItem('youtubeVideoData', JSON.stringify({
        id: selectedId,
        timestamp: Date.now()
      }))
    }
    
    setVideoId(selectedId)
  }, [])

  return (
    <YoutubeContext.Provider value={{ videoId, loadNewVideo }}>
      {children}
    </YoutubeContext.Provider>
  )
}

export function useYoutube() {
  return useContext(YoutubeContext)
}

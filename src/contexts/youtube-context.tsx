'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type YoutubeContextType = {
  videoId: string
}

const YoutubeContext = createContext<YoutubeContextType>({ videoId: '' })

export function YoutubeProvider({ children }: { children: ReactNode }) {
  const [videoId, setVideoId] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Este código só executará no cliente
    setIsMounted(true)
    
    const videos = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA']
    
    const storedData = localStorage.getItem('youtubeVideoData')
    let selectedId = ''
    
    if (storedData) {
      try {
        const { id, timestamp } = JSON.parse(storedData)
        const currentTime = Date.now()
        const expirationTime = 1000 * 60 * 60 * 2 // 2 horas
        
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
    <YoutubeContext.Provider value={{ videoId }}>
      {children}
    </YoutubeContext.Provider>
  )
}

export function useYoutube() {
  return useContext(YoutubeContext)
}
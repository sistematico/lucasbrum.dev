'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import { RefreshCw } from 'lucide-react'

const VIDEOS = ['BS46C2z5lVE', 'htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y', 'zTDeEJyCmNA']
const STORAGE_KEY = 'youtube_video_state'

type VideoState = {
  id: string
  timestamp: number
}

interface YouTubeContextType {
  videoId: string
  refreshVideo: () => void
}

const YouTubeContext = createContext<YouTubeContextType>({
  videoId: '',
  refreshVideo: () => {}
})

export function useYouTube() {
  return useContext(YouTubeContext)
}

function getRandomVideo(current: string | null): string {
  const availableVideos = current ? VIDEOS.filter(id => id !== current) : VIDEOS
  return availableVideos[Math.floor(Math.random() * availableVideos.length)]
}

// Componente provedor
export function YouTubeProvider({ children }: { children: ReactNode }) {
  const [videoId, setVideoId] = useState('')
  const [initialized, setInitialized] = useState(false)
  
  // Inicializar o estado do vídeo
  useEffect(() => {
    if (typeof window === 'undefined' || initialized) return
    
    try {
      // Tentar recuperar do localStorage
      const storedData = localStorage.getItem(STORAGE_KEY)
      
      if (storedData) {
        const data = JSON.parse(storedData) as VideoState
        const now = Date.now()
        const twoHoursInMs = 2 * 60 * 60 * 1000
        
        // Se o vídeo foi armazenado há menos de 2 horas, use-o
        if (now - data.timestamp < twoHoursInMs) {
          setVideoId(data.id)
          setInitialized(true)
          return
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar estado do vídeo:', error)
    }
    
    // Selecionar um novo vídeo aleatório
    const newId = getRandomVideo(null)
    setVideoId(newId)
    
    // Armazenar no localStorage
    const newState: VideoState = { id: newId, timestamp: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    
    setInitialized(true)
  }, [initialized])
  
  // Função para atualizar o vídeo
  const refreshVideo = () => {
    const newId = getRandomVideo(videoId)
    setVideoId(newId)
    
    // Armazenar no localStorage
    const newState: VideoState = { id: newId, timestamp: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  }
  
  return (
    <YouTubeContext.Provider value={{ videoId, refreshVideo }}>
      {children}
    </YouTubeContext.Provider>
  )
}

export function PersistentYouTube() {
  const { videoId, refreshVideo } = useYouTube()
  
  if (!videoId) return null
  
  return (
    <div className="relative">
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
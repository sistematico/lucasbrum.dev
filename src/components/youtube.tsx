'use client'

import { useYoutube } from '@/contexts/youtube-context'  // Importe do contexto diretamente
import { YouTubeEmbed } from '@next/third-parties/google'
import { RefreshCw, Play } from 'lucide-react'

export function YoutubeVideo() {
  const { videoId, loadNewVideo } = useYoutube()  // Use o contexto
  
  if (!videoId) {
    return <YoutubeSkeleton className="h-[400px]" />
  }
  
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 z-10">
        <button 
          onClick={loadNewVideo}
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
        params="rel=0&color=white" 
      />
    </div>
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
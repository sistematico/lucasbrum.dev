import { YouTubeEmbed } from '@next/third-parties/google'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function RandomVideo() {
  const videos = ['htgr3pvBr-I', 'XEjLoHdbVeE', 'Zi_XLOBDo_Y']
  const timestamp = Date.now()
  const randomSeed = Math.random()
  const video = videos[Math.floor(randomSeed * videos.length)]
  
  return (
    <YouTubeEmbed 
      key={timestamp} 
      videoid={video} 
      height={400} 
      params="rel=0&color=white" 
    />
  )
}
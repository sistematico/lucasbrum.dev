import { Station } from '@/types'

export const stations: Station[] = [
  { id: 1, name: 'Estação Rock', genre: 'Rock', streamUrl: 'http://stream.xrm.fm:8000/xrm-alt', logo: '/rock.png' },
  { id: 2, name: 'Estação Jazz', genre: 'Jazz', streamUrl: 'https://example.com/jazz-stream', logo: '/jazz.png' },
  { id: 3, name: 'Estação Pop', genre: 'Pop', streamUrl: 'https://example.com/pop-stream', logo: '/pop.png' },
  { id: 4, name: 'Estação Clássica', genre: 'Clássica', streamUrl: 'https://example.com/classical-stream', logo: '/classical.png' },
  { id: 5, name: 'Estação Eletrônica', genre: 'Eletrônica', streamUrl: 'https://example.com/electronic-stream', logo: '/electronic.png' }
]
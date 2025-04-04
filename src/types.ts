export interface Project {
  title: string
  year: number
  description: string
  url: string
  image?: string
}

export interface EmailResponse {
  message: string
  error?: unknown
  ok?: boolean
}

export interface SnippetsCardProps {
  slug: string
  title: string
  summary?: string
  publishDate: string
  category?: string
  tags?: string[]
  image?: string
}

export interface Station {
  id: number
  name: string
  genre: string
  streamUrl: string
  logo?: string
}

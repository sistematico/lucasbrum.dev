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
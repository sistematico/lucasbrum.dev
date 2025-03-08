export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://lucasbrum.dev' : 'http://localhost:3000'

export const metaData = {
  baseUrl,
  title: 'Lucas Brum',
  name: 'Lucas Saliés Brum',
  ogImage: '/images/avatar.jpg',
  description:
    'Desenvolvedor web desde 1999 usando TypeScript e com vasta experiência em Linux.'
}

export const socialLinks = {
  twitter: 'https://x.com/sistematico',
  github: 'https://github.com/sistematico/lucasbrum.dev',
  instagram: 'https://www.instagram.com/sistematico',
  linkedin: 'https://www.linkedin.com/in/sistematico',
  email: 'mailto:contato@lucasbrum.dev'
}
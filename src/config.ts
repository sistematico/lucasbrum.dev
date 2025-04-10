export const url =
  process.env.NODE_ENV === 'production'
    ? 'https://lucasbrum.dev'
    : 'http://localhost:3000'

export const site = {
  url,
  title: 'Lucas Brum',
  name: 'Lucas Saliés Brum',
  ogImage: '/images/avatar.jpg',
  description: 'Desenvolvedor web desde 1999, TypeScript, React, Next.js, Linux'
}

export const social = {
  twitter: 'https://x.com/sistematico',
  github: 'https://github.com/sistematico/lucasbrum.dev',
  instagram: 'https://www.instagram.com/sistematico',
  linkedin: 'https://www.linkedin.com/in/sistematico',
  email: 'mailto:contato@lucasbrum.dev'
}

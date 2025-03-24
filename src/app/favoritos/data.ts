// data.ts
export interface Bookmark {
  name: string
  category: string
  url: string
}

// Lista de favoritos
export const bookmarks: Bookmark[] = [
  { name: 'React Docs', category: 'Desenvolvimento', url: 'https://react.dev' },
  { name: 'Vue.js', category: 'Desenvolvimento', url: 'https://vuejs.org' },
  {
    name: 'MDN Web Docs',
    category: 'Referências',
    url: 'https://developer.mozilla.org'
  },
  { name: 'Next.js', category: 'Desenvolvimento', url: 'https://nextjs.org' },
  {
    name: 'CSS Tricks',
    category: 'Referências',
    url: 'https://css-tricks.com'
  },
  {
    name: 'Hacker News',
    category: 'Notícias',
    url: 'https://news.ycombinator.com'
  },
  {
    name: 'Tailwind CSS',
    category: 'Desenvolvimento',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'Reddit - r/webdev',
    category: 'Notícias',
    url: 'https://www.reddit.com/r/webdev'
  }
]

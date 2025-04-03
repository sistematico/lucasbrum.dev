import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/components/mdx'

const postsPath = path.join(process.cwd(), '_posts')
const snippetsPath = path.join(process.cwd(), '_snippets')

export async function getSnippet(slug: string) {
  return await getItem('snippets', slug)
}

export async function getPost(slug: string) {
  return await getItem('posts', slug)
}

export async function getPosts() {
  const files = fs.readdirSync(postsPath)
  const blogs = await Promise.all(
    files.map(async (file) => await getPost(path.parse(file).name))
  )
  return blogs
}

export async function getSnippets() {
  const files = fs.readdirSync(snippetsPath)
  return await Promise.all(
    files.map(async (file) => await getSnippet(path.parse(file).name))
  )
}

export function getSnippetsSlugs() {
  return getSlugs('snippets')
}

export function getPostsSlugs() {
  return getSlugs('posts')
}

// export async function getItem(type: string = 'posts', slug: string) {
//   const fileName = slug + '.mdx'
//   const filePath = type === 'snippets' ? path.join(snippetsPath, fileName) : path.join(postsPath, fileName)
//   const fileContent = fs.readFileSync(filePath, 'utf-8')

//   const { frontmatter, content } = await compileMDX<{
//     title: string
//     author: string
//     publishDate: string
//     summary: string
//     image: string
//     category?: string
//   }>({
//     source: fileContent,
//     options: { parseFrontmatter: true },
//     components
//   })

//   return {
//     frontmatter,
//     content,
//     slug: path.parse(fileName).name
//   }
// }

export async function getItem(type: string = 'posts', slug: string) {
  const fileName = slug + '.mdx'
  const filePath =
    type === 'snippets'
      ? path.join(snippetsPath, fileName)
      : path.join(postsPath, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const { frontmatter, content } = await compileMDX<{
    title: string
    author: string
    publishDate: string
    summary: string
    image: string
    category?: string
    tags?: string[] // Adicionando suporte para tags
  }>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components
  })

  return {
    frontmatter,
    content,
    slug: path.parse(fileName).name
  }
}

// export async function getItems(type: string) {
//   const files = type === 'snippets' ? fs.readdirSync(postsPath) : fs.readdirSync(snippetsPath)
//   const blogs = await Promise.all(
//     files.map(async (file) => await getPost(path.parse(file).name))
//   )
//   return blogs
// }

export async function getItems(type: string) {
  const files =
    type === 'snippets'
      ? fs.readdirSync(snippetsPath)
      : fs.readdirSync(postsPath)
  const items = await Promise.all(
    files.map(async (file) => {
      return type === 'snippets'
        ? await getSnippet(path.parse(file).name)
        : await getPost(path.parse(file).name)
    })
  )
  return items
}

// function getSlugs(type: string) {
//   const files = type === 'snippets' ? fs.readdirSync(postsPath) : fs.readdirSync(snippetsPath)
//   const slugs = files.map((file) => ({ slug: path.parse(file).name }))
//   return slugs
// }

function getSlugs(type: string) {
  const files =
    type === 'snippets'
      ? fs.readdirSync(snippetsPath)
      : fs.readdirSync(postsPath)
  const slugs = files.map((file) => ({ slug: path.parse(file).name }))
  return slugs
}

export function formatDate(date: string, includeRelative = true) {
  const currentDate = new Date()
  if (!date.includes('T')) date = `${date}T00:00:00`
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    if (yearsAgo === 1) formattedDate = 'ano passado'
    else formattedDate = `${yearsAgo} anos atrás`
  } else if (monthsAgo > 0) {
    if (monthsAgo === 1) formattedDate = `${monthsAgo} mês atrás`
    else formattedDate = `${monthsAgo} meses atrás`
  } else if (daysAgo > 0) {
    if (daysAgo === 1) formattedDate = 'ontem'
    else formattedDate = `${daysAgo} dias atrás`
  } else {
    formattedDate = 'hoje'
  }

  const fullDate = targetDate.toLocaleString('pt-br', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  if (!includeRelative) return fullDate

  return `${fullDate} (${formattedDate})`
}

// Adicionar esta função em src/lib/utils.ts

export async function getSnippetsByTag(tag: string) {
  const allSnippets = await getSnippets()

  // Filtrar snippets que contêm a tag (case insensitive)
  return allSnippets.filter((snippet) =>
    snippet.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

// Obter lista de todas as tags únicas
export async function getAllTags() {
  const snippets = await getSnippets()
  const tagsSet = new Set<string>()

  snippets.forEach((snippet) => {
    snippet.frontmatter.tags?.forEach((tag) => {
      tagsSet.add(tag.toLowerCase())
    })
  })

  return Array.from(tagsSet).sort()
}

// Função para gerar cores de fundo baseadas no nome da categoria
export function getCategoryColor(category: string): string {
  const colors = {
    typescript:
      'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    javascript:
      'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    react:
      'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
    nextjs:
      'bg-black/5 text-gray-800 border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-gray-700',
    css: 'bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
    html: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    node: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
  }

  return (
    colors[category.toLowerCase() as keyof typeof colors] ||
    'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
  )
}

// Função para gerar cores de tags (mais suaves que as de categorias)
export function getTagColor(tag: string): string {
  const colors = {
    typescript:
      'bg-blue-50/70 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    javascript:
      'bg-yellow-50/70 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    programming:
      'bg-purple-50/70 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    react: 'bg-cyan-50/70 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
    array:
      'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    random:
      'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    nextjs: 'bg-black/5 text-gray-700 dark:bg-white/5 dark:text-gray-300',
    css: 'bg-pink-50/70 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    html: 'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    node: 'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300'
  }

  return (
    colors[tag.toLowerCase() as keyof typeof colors] ||
    'bg-gray-50/70 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300'
  )
}

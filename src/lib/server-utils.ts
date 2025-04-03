// src/lib/server-utils.ts
import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/components/mdx'
// Importe as funções do client-utils
import { getTagColor, getCategoryColor } from './client-utils'

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
    tags?: string[]
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

function getSlugs(type: string) {
  const files =
    type === 'snippets'
      ? fs.readdirSync(snippetsPath)
      : fs.readdirSync(postsPath)
  const slugs = files.map((file) => ({ slug: path.parse(file).name }))
  return slugs
}

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

// Re-exportar as funções do client-utils
export { getTagColor, getCategoryColor }